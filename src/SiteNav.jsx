import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { t } from './locales';

const BASE = import.meta.env.BASE_URL;

// Shared navigation bar. Transparent over the dark page header, white once the visitor scrolls.
// On the home page `active` is the section in view (home/services/contact); on subpages it is the page key.
export default function SiteNav({ lang, active, onToggleLang }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The mobile menu covers the page: lock scrolling behind it and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const L = t[lang];
  const langParam = lang === 'tr' ? '?lang=tr' : '';
  const onHome = active === 'home' || active === 'services' || active === 'contact';
  const links = [
    { label: L.nav.home, href: onHome ? '#home' : `${BASE}${langParam}`, key: 'home' },
    { label: L.nav.resume, href: `${BASE}career.html${langParam}`, key: 'career' },
    { label: L.nav.academic, href: `${BASE}academic.html${langParam}`, key: 'academic' },
    { label: L.nav.services, href: onHome ? '#services' : `${BASE}${langParam}#services`, key: 'services' },
  ];
  const close = () => setOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="container navbar-container">
        <a href={`${BASE}${langParam}`} className="brand" onClick={close}>C. Balkı <span>GEMİRTER</span></a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label={L.home.navLabel}>
          {links.map((l) => (
            <a href={l.href} className={l.key === active ? 'active' : ''} aria-current={l.key === active ? 'page' : undefined} key={l.key} onClick={close}>{l.label}</a>
          ))}
          <a href={onHome ? '#contact' : `${BASE}${langParam}#contact`} className="nav-cta" onClick={close}>{L.nav.contact}</a>
          <button type="button" className="lang-toggle" onClick={onToggleLang} aria-label={lang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}>
            <Globe size={16} /> {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </nav>
        <button type="button" className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? L.home.menuClose : L.home.menuOpen} aria-expanded={open}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}
