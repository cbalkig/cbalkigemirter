import { motion } from 'framer-motion';
import { Award, BadgeCheck, ExternalLink } from 'lucide-react';
import { t } from './locales';
import { PUBLICATIONS, findLogo, monogram, groupByCompany, tenure, splitBullets, parseEdu } from './cvData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-60px' }, variants: fadeUp };
const BASE = import.meta.env.BASE_URL;

function Logo({ company }) {
  const logo = findLogo(company);
  if (logo) {
    return (
      <div className={`cv-logo ${logo.mode}`}>
        <img src={`${BASE}images/${logo.file}`} alt={company} loading="lazy" />
      </div>
    );
  }
  const m = monogram(company);
  return <div className={`cv-logo mono${m.text.length > 2 ? ' sm-text' : ''}`} style={{ backgroundColor: m.color }}>{m.text}</div>;
}

function Heading({ children }) {
  return <motion.h3 className="cv-heading" {...inView}>{children}</motion.h3>;
}

function Bullets({ text, lang }) {
  return (
    <ul className="cv-bullets">
      {splitBullets(text, lang).map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  );
}

function Publication({ pub, index }) {
  const body = (
    <>
      <span className="cv-pub-idx">{String(index + 1).padStart(2, '0')}</span>
      <div className="cv-pub-body">
        <h4>{pub.title} <span className="cv-badge" style={{ backgroundColor: pub.color }}>{pub.badge}</span></h4>
        <div className="cv-pub-meta"><strong>{pub.venue}</strong><span>{pub.authors}</span></div>
      </div>
      {pub.url && <ExternalLink size={18} className="cv-pub-link" />}
    </>
  );
  return pub.url
    ? <motion.a className="cv-pub" href={pub.url} target="_blank" rel="noopener noreferrer" {...inView}>{body}</motion.a>
    : <motion.div className="cv-pub" {...inView}>{body}</motion.div>;
}

export default function Resume({ lang }) {
  const L = t[lang];
  const r = L.resume;
  const d = L.data;
  const languagesEntry = d.certs.find((c) => c.date === r.languages);
  const award = d.certs[0];
  const certList = d.certs.filter((c) => c !== languagesEntry && c !== award);
  const featuredCerts = certList.filter((c) => c.featured);
  const otherCerts = certList.filter((c) => !c.featured);
  const stats = [
    [L.about.expYears, r.stats.years],
    [d.projects.length, r.stats.projects],
    [PUBLICATIONS.length, r.stats.pubs],
    [certList.length, r.stats.certs],
  ];

  return (
    <section id="resume" className="section resume">
      <div className="container">
        <motion.div className="cv-intro" {...inView}>
          <h2 className="section-title">{r.title}</h2>
          <p className="section-subtitle">{r.subtitle}</p>
        </motion.div>

        <div className="cv-stats">
          {stats.map(([num, label]) => (
            <motion.div className="cv-stat" key={label} {...inView}>
              <span className="num">{num}</span>
              <span className="label">{label}</span>
            </motion.div>
          ))}
        </div>

        <Heading>{r.experience}</Heading>
        {d.experienceGroups.map((group) => (
          <div className="cv-xgroup" key={group.title}>
            <motion.aside className="cv-band" {...inView}>
              <span className="cv-period">{group.period}</span>
              <h4>{group.title}</h4>
              <p>{group.desc}</p>
            </motion.aside>
            <div className="cv-companies">
              {groupByCompany(group.items).map((co) => {
                const multi = co.roles.length > 1;
                return (
                  <motion.article className="cv-company" key={co.company} {...inView}>
                    <header className="cv-company-head">
                      <Logo company={co.company} />
                      <div className="cv-company-meta">
                        <div className="cv-company-line">
                          <h5>{co.company}</h5>
                          {multi && <span className="cv-count">{co.roles.length} {r.roles}</span>}
                        </div>
                        {!multi && <div className="cv-role-title">{co.roles[0].title}</div>}
                      </div>
                      <span className="cv-date">{multi ? tenure(co.roles) : co.roles[0].date}</span>
                    </header>
                    {multi ? (
                      <div className="cv-roles">
                        {co.roles.map((role) => (
                          <div className="cv-role" key={role.title}>
                            <div className="cv-role-head">
                              <span className="cv-role-name">{role.title}</span>
                              <span className="cv-date outline">{role.date}</span>
                            </div>
                            <Bullets text={role.desc} lang={lang} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Bullets text={co.roles[0].desc} lang={lang} />
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>
        ))}

        <Heading>{r.education}</Heading>
        <div className="cv-grid three">
          {d.education.map((edu) => {
            const e = parseEdu(edu.desc);
            return (
              <motion.article className="cv-edu" key={edu.title} {...inView}>
                <div className="cv-edu-top">
                  <Logo company={edu.company} />
                  <span className="cv-date">{edu.date}</span>
                </div>
                <h4>{edu.title}</h4>
                <div className="cv-edu-school">{edu.company}{edu.medium && <span className="cv-medium">{edu.medium}</span>}</div>
                {e.gpa && (
                  <div className="cv-gpa">
                    <span className="num">{e.gpa}</span>
                    <span className="max">/ {e.max}</span>
                    <span className="note">{e.note}</span>
                  </div>
                )}
                {(e.thesis || e.rest) && (
                  <div className="cv-thesis">
                    {e.thesis && <span className="label">{r.thesis}</span>}
                    {e.thesis || e.rest}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
        <div className="cv-exams">
          {d.exams.map((x) => (
            <motion.div className="cv-exam" key={x.name} {...inView}>
              <span className="score">{x.score}</span>
              <div>
                <div className="name">{x.name} <span className="cv-date">{x.year}</span></div>
                <div className="desc">{x.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <Heading>{r.projects}</Heading>
        <div className="cv-grid three">
          {d.projects.map((p) => (
            <motion.article className="cv-card" key={p.title} {...inView}>
              <div className="cv-card-top">
                {p.badge && <span className="cv-badge" style={{ backgroundColor: p.badgeColor }}>{p.badge}</span>}
                {p.year && <span className="cv-date">{p.year}</span>}
              </div>
              <h4>{p.title}</h4>
              <div className="cv-card-org">{p.company}</div>
              <p>{p.desc}</p>
            </motion.article>
          ))}
        </div>

        <Heading>{r.pubs}</Heading>
        <div className="cv-pubs">
          {PUBLICATIONS.map((pub, i) => <Publication pub={pub} index={i} key={pub.title} />)}
        </div>

        <Heading>{r.service}</Heading>
        <div className="cv-grid two align-start">
          {d.service.map((s) => (
            <motion.article className="cv-card cv-service" key={s.org} {...inView}>
              <div className="cv-service-head">
                <Logo company={s.org} />
                <div>
                  <h4>{s.org}</h4>
                  <div className="cv-service-role">
                    <span className="cv-card-org">{s.role}</span>
                    {s.badge && <span className="cv-badge" style={{ backgroundColor: s.badgeColor }}>{s.badge}</span>}
                  </div>
                </div>
              </div>
              {s.desc && <p>{s.desc}</p>}
            </motion.article>
          ))}
        </div>

        <Heading>{r.certs}</Heading>
        <div className="cv-featured">
          <motion.div className="cv-award" {...inView}>
            <div className="cv-award-icon"><Award size={24} /></div>
            <div>
              <span className="cv-badge amber">{r.award}</span>
              <h4>{award.title}</h4>
              <div className="cv-award-meta">{award.company} · {award.date}</div>
            </div>
          </motion.div>
          {featuredCerts.map((c) => (
            <motion.div className="cv-award scrum" key={c.title} {...inView}>
              <div className="cv-award-icon"><BadgeCheck size={24} /></div>
              <div>
                <span className="cv-badge scrum">{c.company}</span>
                <h4>{c.title}</h4>
                <div className="cv-award-meta">{c.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="cv-certs" {...inView}>
          {otherCerts.map((c) => (
            <div className="cv-cert" key={c.title}>
              <div>
                <div className="name">{c.title}</div>
                <div className="issuer">{c.company}</div>
              </div>
              <span className="when">{c.date}</span>
            </div>
          ))}
        </motion.div>
        {languagesEntry && (
          <motion.div className="cv-languages" {...inView}>
            <span className="label">{r.languages}</span>
            {languagesEntry.title.split('|').map((l) => <span className="cv-lang" key={l}>{l.trim()}</span>)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
