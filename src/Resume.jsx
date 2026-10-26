import { motion } from 'framer-motion';
import { Award, BadgeCheck, Download } from 'lucide-react';
import { t } from './locales';
import { PUBLICATIONS, groupByCompany, tenure, splitBullets } from './cvData';
import { Logo, Heading, EduCard, Publication, inView } from './cvComponents';

function Bullets({ text, lang }) {
  return (
    <ul className="cv-bullets">
      {splitBullets(text, lang).map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  );
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
  const BASE = import.meta.env.BASE_URL;
  const academicUrl = `${BASE}academic.html${lang === 'tr' ? '?lang=tr' : ''}`;
  const stats = [
    [L.about.expYears, r.stats.years, '#cv-experience'],
    [PUBLICATIONS.length, r.stats.pubs, '#cv-publications'],
    [d.projects.length, r.stats.projects, '#cv-projects'],
    [certList.length, r.stats.certs, '#cv-certifications'],
  ];

  return (
    <section id="resume" className="section resume">
      <div className="container">
        <div className="cv-stats">
          {stats.map(([num, label, href]) => (
            <motion.a className="cv-stat" href={href} key={label} {...inView}>
              <span className="num">{num}</span>
              <span className="label">{label}</span>
            </motion.a>
          ))}
        </div>

        <Heading id="cv-experience">{r.experience}</Heading>
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
          {d.education.map((edu) => (
            <EduCard edu={edu} thesisLabel={r.thesis} thesisHref={`${academicUrl}#cv-theses`} key={edu.title} />
          ))}
        </div>
        <Heading id="cv-publications">{r.pubs}</Heading>
        <div className="cv-pubs">
          {PUBLICATIONS.map((pub, i) => <Publication pub={pub} index={i} key={pub.title} />)}
        </div>
        <motion.a className="cv-pubs-more" href={`${academicUrl}#cv-publications`} {...inView}>{r.pubsMore}</motion.a>

        <Heading id="cv-projects">{r.projects}</Heading>
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

        <Heading id="cv-certifications">{r.certs}</Heading>
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

        <motion.div className="academic-cta" {...inView}>
          <a href={`${BASE}C_Balki_Gemirter_CV_${lang}.pdf`} download={`C_Balki_Gemirter_CV_${lang}.pdf`} className="btn btn-primary">
            <Download size={20} /> {r.downloadCV}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
