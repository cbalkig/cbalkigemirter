import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { t } from './locales';

const BASE = import.meta.env.BASE_URL;

// Full navigation bar for the career and academic subpages: same links as the home
// navbar (section links point back to the home page), with the current page highlighted.
// Transparent over the dark page header, white once the visitor scrolls, like the home page.
export default function SiteNav({ lang, active, onToggleLang }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const L = t[lang];
  const langParam = lang === 'tr' ? '?lang=tr' : '';
  // On the home page `active` is the section in view (home/services/contact); on subpages it is the page key.
  const onHome = active === 'home' || active === 'services' || active === 'contact';
  const links = [
    { label: L.nav.home, href: onHome ? '#home' : `${BASE}${langParam}`, key: 'home' },
    { label: L.nav.resume, href: `${BASE}career.html${langParam}`, key: 'career' },
    { label: L.nav.academic, href: `${BASE}academic.html${langParam}`, key: 'academic' },
    { label: L.nav.services, href: onHome ? '#services' : `${BASE}${langParam}#services`, key: 'services' },
    { label: L.nav.contact, href: onHome ? '#contact' : `${BASE}${langParam}#contact`, key: 'contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href={`${BASE}${langParam}`} className={`brand ${isScrolled || open ? 'dark-text' : ''}`}>C. Balkı <span>GEMİRTER</span></a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a href={l.href} className={l.key === active ? 'active' : ''} key={l.label} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button className="lang-toggle" onClick={onToggleLang}>
            <Globe size={16} /> {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
        <button className={`mobile-toggle ${open || isScrolled ? 'dark-text' : ''}`} onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
