import React, { useState, useEffect } from 'react';
import { BrainCircuit, Activity, LineChart, Lightbulb, Target, Cpu, MessageSquare, Radio, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from './locales';
import SiteNav from './SiteNav';
import './App.css';
import './resume.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function App() {
  // Scrollspy: highlight the section currently in view in the shared navbar.
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      const contact = document.getElementById('contact');
      const services = document.getElementById('services');
      if (contact && pos >= contact.offsetTop) setActiveSection('contact');
      else if (services && pos >= services.offsetTop) setActiveSection('services');
      else setActiveSection('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl === 'en' || fromUrl === 'tr') return fromUrl;
    const browserLangs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    const prefersTurkish = browserLangs.some((l) => l.toLowerCase().startsWith('tr'));
    return prefersTurkish ? 'tr' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'tr'
      ? 'C. Balkı GEMİRTER | CAIO & Ar-Ge Lideri'
      : 'C. Balkı GEMİRTER | Chief AI Officer (CAIO)';
  }, [lang]);

  const toggleLanguage = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  const icons = {
    practiceAreas: [<BrainCircuit size={32} />, <Activity size={32} />, <LineChart size={32} />, <Lightbulb size={32} />, <MessageSquare size={32} />, <Radio size={32} />],
    services: [<Target size={32} color="#E11D48" />, <LineChart size={32} color="#E11D48" />, <Cpu size={32} color="#E11D48" />, <BrainCircuit size={32} color="#E11D48" />, <GraduationCap size={32} color="#E11D48" />]
  };

  const emailAddress = "cbalkig@gmail.com";
  const linkedIn = "https://www.linkedin.com/in/cbalkig/";

  return (
    <>
      <SiteNav lang={lang} active={activeSection} onToggleLang={toggleLanguage} />

      <section id="home" className="hero">
        <div className="container hero-inner">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUpVariant}>
              {t[lang].hero.title}
            </motion.h1>
            <motion.p variants={fadeUpVariant}>{t[lang].hero.subtitle}</motion.p>
            <motion.div className="hero-tags" variants={fadeUpVariant}>
              {t[lang].hero.tags.map((tag) => <span className="hero-tag" key={tag}>{tag}</span>)}
            </motion.div>

            <motion.div className="hero-btns" variants={fadeUpVariant}>
              <a href={`${import.meta.env.BASE_URL}career.html${lang === 'tr' ? '?lang=tr' : ''}`} className="btn btn-primary">{t[lang].hero.btnResume}</a>
              <a href={`${import.meta.env.BASE_URL}academic.html${lang === 'tr' ? '?lang=tr' : ''}`} className="btn btn-outline">{t[lang].nav.academic}</a>
              <a href="#services" className="btn btn-outline">{t[lang].hero.btnServices}</a>
              <a href="#contact" className="btn btn-outline">{t[lang].hero.btnContact}</a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <img src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt="C. Balkı GEMİRTER" />
            <div className="hero-badge">
              <div className="years">{t[lang].about.expYears}</div>
              <div className="text" style={{ whiteSpace: 'pre-line' }}>{t[lang].about.expText}</div>
            </div>
            <div className="hero-badge phd">
              <div className="years">{t[lang].about.phdLabel}</div>
              <div className="text" style={{ whiteSpace: 'pre-line' }}>{t[lang].about.phdText}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="expertise" className="section" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="container">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--primary-color)' }}>
            {t[lang].expertise.title}
          </motion.h3>
          <motion.div className="expertise-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            {t[lang].data.practiceAreas.map((area, index) => (
              <motion.div className="expertise-card" key={index} variants={fadeUpVariant}>
                <div className="expertise-icon">{icons.practiceAreas[index]}</div>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className="section services" style={{ backgroundColor: '#0B0F19', color: '#F8FAFC' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}>
            <h2 className="section-title" style={{ color: '#F8FAFC' }}>{t[lang].services.title}</h2>
            <p className="section-subtitle" style={{ color: '#CBD5E1' }}>{t[lang].services.subtitle}</p>
          </motion.div>

          <motion.div className="expertise-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            {t[lang].data.services.map((svc, index) => (
              <motion.div className="expertise-card" key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }} variants={fadeUpVariant}>
                <div className="expertise-icon">{icons.services[index]}</div>
                <h3 style={{ color: '#F8FAFC' }}>{svc.title}</h3>
                <p style={{ color: '#CBD5E1' }}>{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
            <h2 className="section-title">{t[lang].contact.title}</h2>
            <p className="section-subtitle">{t[lang].contact.subtitle}</p>
          </motion.div>

          <div className="contact-container">
            <motion.div className="contact-info" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              
              {[
                { logo: 'linkedin.svg', title: t[lang].contact.linkedin, desc: t[lang].contact.linkedinDesc, href: linkedIn, label: t[lang].contact.linkedinBtn, external: true },
                { logo: 'whatsapp.svg', title: t[lang].contact.phone, desc: `${t[lang].contact.phoneDesc} +90 539 293 77 07`, href: 'https://wa.me/905392937707', label: t[lang].contact.whatsappBtn, external: true },
                { logo: 'gmail.svg', title: t[lang].contact.email, desc: t[lang].contact.emailDesc, href: `mailto:${emailAddress}`, label: t[lang].contact.emailBtn, external: false },
              ].map(({ logo, title, desc, href, label, external }) => (
                <div className="contact-item contact-card" key={title}>
                  <img className="contact-icon contact-logo" src={`${import.meta.env.BASE_URL}images/profiles/${logo}`} alt="" />
                  <div className="contact-card-body">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <a href={href} className="btn btn-outline contact-btn" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem 0' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER. {t[lang].footer.rights}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
