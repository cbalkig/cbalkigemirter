import { useState, useEffect } from 'react';
import { t } from './locales';
import Resume from './Resume';
import SiteNav from './SiteNav';
import './App.css';
import './resume.css';

export default function CareerPage() {
  // Same language pick as the home page: URL param first, then the browser preference.
  const [lang, setLang] = useState(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'tr') return fromUrl;
    const browserLangs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return browserLangs.some((l) => l.toLowerCase().startsWith('tr')) ? 'tr' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'tr' ? 'C. Balkı GEMİRTER | Kariyer & Eğitim' : 'C. Balkı GEMİRTER | Resume & Education';
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
      <SiteNav lang={lang} active="career" onToggleLang={toggleLanguage} />

      <header className="subpage-hero">
        <div className="container">
          <div className="cv-intro">
            <h2 className="section-title">{t[lang].resume.title}</h2>
            <p className="section-subtitle">{t[lang].resume.subtitle}</p>
          </div>
        </div>
      </header>

      <main className="subpage">
        <Resume lang={lang} />
      </main>

      <footer className="footer">
        <div className="container" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER. {t[lang].footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
