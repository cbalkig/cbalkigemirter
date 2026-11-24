import { t } from './locales';
import { ACADEMIC_PROFILES } from './cvData';

const BASE = import.meta.env.BASE_URL;

// Shared footer: brand, page links, profile links.
export default function SiteFooter({ lang }) {
  const L = t[lang];
  const langParam = lang === 'tr' ? '?lang=tr' : '';
  const links = [
    { label: L.nav.home, href: `${BASE}${langParam}` },
    { label: L.nav.resume, href: `${BASE}career.html${langParam}` },
    { label: L.nav.academic, href: `${BASE}academic.html${langParam}` },
    { label: L.nav.services, href: `${BASE}${langParam}#services` },
    { label: L.nav.contact, href: `${BASE}${langParam}#contact` },
  ];
  const sentence = (s) => s.toLocaleLowerCase(lang); // capitalized per word in CSS

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand">C. Balkı <span>GEMİRTER</span></span>
            <span className="tagline">{L.home.footerTagline}</span>
          </div>
          <nav className="footer-nav" aria-label={L.home.footerNav}>
            {links.map((l) => <a href={l.href} key={l.label}>{sentence(l.label)}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER. {L.footer.rights}</span>
          <div className="footer-profiles">
            {ACADEMIC_PROFILES.filter((p) => p.url && p.icon).map((p) => (
              <a href={p.url} key={p.name} target="_blank" rel="noopener noreferrer" aria-label={p.name} title={p.name}>
                <img src={`${BASE}${p.icon}`} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
