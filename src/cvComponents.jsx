import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { findLogo, monogram, parseEdu } from './cvData';

// Shared building blocks for the Resume and Academic sections.

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
export const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-60px' }, variants: fadeUp };
const BASE = import.meta.env.BASE_URL;

export function Logo({ company }) {
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

export function Heading({ id, children }) {
  return <motion.h3 id={id} className="cv-heading" {...inView}>{children}</motion.h3>;
}

// Education card; thesisLabel/thesisHref render the thesis line (omitted when the page has its own theses section).
export function EduCard({ edu, thesisLabel, thesisHref }) {
  const e = parseEdu(edu.desc);
  return (
    <motion.article className="cv-edu" {...inView}>
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
      {((e.thesis && thesisLabel) || e.rest) && (
        <div className="cv-thesis">
          {e.thesis && <span className="label">{thesisLabel}</span>}
          {e.thesis
            ? (thesisHref ? <a className="cv-thesis-link" href={thesisHref}>{e.thesis}</a> : e.thesis)
            : e.rest}
        </div>
      )}
    </motion.article>
  );
}

export function Publication({ pub, index }) {
  // The badge is tied to the title's last word so it never wraps to a line of its own.
  const words = pub.title.split(' ');
  const tail = words.pop();
  const body = (
    <>
      <span className="cv-pub-idx">{String(index + 1).padStart(2, '0')}</span>
      <div className="cv-pub-body">
        <h4>{words.join(' ')} <span className="cv-pub-tail">{tail} <span className="cv-badge" style={{ backgroundColor: pub.color }}>{pub.badge}</span></span></h4>
        <div className="cv-pub-meta"><strong>{pub.venue}</strong><span>{pub.authors}</span></div>
      </div>
      {pub.url && <ExternalLink size={18} className="cv-pub-link" />}
    </>
  );
  return pub.url
    ? <motion.a className="cv-pub" href={pub.url} target="_blank" rel="noopener noreferrer" {...inView}>{body}</motion.a>
    : <motion.div className="cv-pub" {...inView}>{body}</motion.div>;
}
