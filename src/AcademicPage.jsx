import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, ExternalLink, FileText, GraduationCap } from 'lucide-react';
import SiteNav from './SiteNav';
import { t } from './locales';
import { PUBLICATIONS, ACADEMIC_PROFILES, parseEdu } from './cvData';
import { Logo, Heading, EduCard, inView } from './cvComponents';
import './App.css';
import './resume.css';

const BASE = import.meta.env.BASE_URL;

// Expanded publication card: abstract + one-click BibTeX, so visitors can cite with zero friction.
function PubCard({ pub, index, a }) {
  const [copied, setCopied] = useState(false);
  const copyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable (e.g. http); the BibTeX stays selectable via the paper link */ }
  };
  const words = pub.title.split(' ');
  const tail = words.pop();
  const titleBody = <>{words.join(' ')} <span className="cv-pub-tail">{tail} <span className="cv-badge" style={{ backgroundColor: pub.color }}>{pub.badge}</span></span></>;
  return (
    <motion.article className="cv-pub cv-pub-full" {...inView}>
      <span className="cv-pub-idx">{String(index + 1).padStart(2, '0')}</span>
      <div className="cv-pub-body">
        <h4>{pub.url
          ? <a className="cv-pub-title" href={pub.url} target="_blank" rel="noopener noreferrer">{titleBody}</a>
          : titleBody}</h4>
        <div className="cv-pub-meta"><strong>{pub.venue}</strong><span>{pub.authors}</span></div>
        {pub.abstract && (
          <details className="cv-abstract">
            <summary>{a.abstract}</summary>
            <p>{pub.abstract}</p>
          </details>
        )}
        <div className="cv-pub-actions">
          {pub.url && (
            <a className="cv-pub-action" href={pub.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> {pub.doi ? `DOI: ${pub.doi}` : 'PDF'}
            </a>
          )}
          {pub.bibtex && (
            <button type="button" className={`cv-pub-action${copied ? ' done' : ''}`} onClick={copyBibtex}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? a.copied : a.cite}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function AcademicPage() {
  // Academia's working language is English, so this page defaults to EN; ?lang=tr opts into Turkish.
  const [lang, setLang] = useState(() => (new URLSearchParams(window.location.search).get('lang') === 'tr' ? 'tr' : 'en'));
  const L = t[lang];
  const r = L.resume;
  const a = L.academic;
  const d = L.data;
  const theses = d.education
    .map((edu) => ({ edu, parsed: parseEdu(edu.desc) }))
    .filter(({ parsed }) => parsed.thesis);
  const isOngoing = (date) => /beklenen|expected/i.test(date);
  const profiles = ACADEMIC_PROFILES.filter((p) => p.url);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'tr' ? 'C. Balkı GEMİRTER | Akademik' : 'C. Balkı GEMİRTER | Academic';
  }, [lang]);

  const toggleLanguage = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  return (
    <>
      <SiteNav lang={lang} active="academic" onToggleLang={toggleLanguage} />

      <header className="subpage-hero">
        <div className="container">
          <motion.div className="cv-intro" initial="hidden" animate="visible" variants={inView.variants}>
            <h2 className="section-title">{a.title}</h2>
            <p className="section-subtitle">{a.role}</p>
            {profiles.length > 0 && (
              <div className="academic-profiles">
                {profiles.map((p) => (
                  <a className="academic-profile" href={p.url} key={p.name} target="_blank" rel="noopener noreferrer">
                    {p.icon ? <img src={`${BASE}${p.icon}`} alt="" /> : <ExternalLink size={14} />} {p.name}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <section className="section resume academic">
        <div className="container">
          <Heading id="cv-publications">{r.pubs}</Heading>
          <div className="cv-pubs">
            {PUBLICATIONS.map((pub, i) => <PubCard pub={pub} index={i} a={a} key={pub.title} />)}
          </div>

          <Heading id="cv-education">{r.education}</Heading>
          <div className="cv-grid three">
            {d.education.map((edu) => <EduCard edu={edu} key={edu.title} />)}
          </div>

          <Heading id="cv-theses">{a.theses}</Heading>
          <div className="cv-grid two align-start">
            {theses.map(({ edu, parsed }) => (
              <motion.article className="cv-card cv-thesis-card" key={edu.title} {...inView}>
                <div className="cv-card-top">
                  <span className="cv-badge" style={{ backgroundColor: isOngoing(edu.date) ? '#F59E0B' : '#8B5CF6' }}>
                    {isOngoing(edu.date) ? a.ongoing : a.completed}
                  </span>
                  <span className="cv-date">{edu.date}</span>
                </div>
                <h4><GraduationCap size={18} className="cv-thesis-icon" /> {parsed.thesis}</h4>
                <div className="cv-card-org">{edu.title} · {edu.company}</div>
                {edu.thesisUrl && (
                  <a className="cv-pub-action" href={`${BASE}${edu.thesisUrl}`} target="_blank" rel="noopener noreferrer">
                    <FileText size={14} /> {a.thesisPdf}
                  </a>
                )}
              </motion.article>
            ))}
          </div>

          <Heading id="cv-exams">{a.exams}</Heading>
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

          <Heading id="cv-service">{r.service}</Heading>
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
                {s.courses ? (
                  <div className="cv-courses">
                    {s.courses.map((c) => (
                      <span className="cv-course" key={c.code}>
                        {c.name} <span className="code">{c.code}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  s.desc && <p>{s.desc}</p>
                )}
              </motion.article>
            ))}
          </div>

          <motion.div className="academic-cta" {...inView}>
            <a href={`${BASE}C_Balki_Gemirter_Academic_CV_${lang}.pdf`} download={`C_Balki_Gemirter_Academic_CV_${lang}.pdf`} className="btn btn-primary">
              <Download size={20} /> {a.downloadCV}
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER. {L.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
