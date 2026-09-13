import React, { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit, Activity, LineChart, Lightbulb, Phone, Mail, CheckCircle2, Link, Target, Cpu, Briefcase, Users, MessageSquare, Radio, Download, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from './locales';
import Resume from './Resume';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      ? 'C. Balkı GEMİRTER ALAÇAM | Baş Yapay Zeka Yöneticisi (CAIO)'
      : 'C. Balkı GEMİRTER ALAÇAM | Chief AI Officer (CAIO)';
  }, [lang]);

  const toggleLanguage = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const icons = {
    practiceAreas: [<BrainCircuit size={32} />, <Activity size={32} />, <LineChart size={32} />, <Lightbulb size={32} />, <MessageSquare size={32} />, <Radio size={32} />],
    services: [<Target size={32} color="#E11D48" />, <LineChart size={32} color="#E11D48" />, <Cpu size={32} color="#E11D48" />, <Briefcase size={32} color="#E11D48" />, <Users size={32} color="#E11D48" />, <BrainCircuit size={32} color="#E11D48" />]
  };

  const emailAddress = "cbalkig@gmail.com";
  const linkedIn = "https://www.linkedin.com/in/cbalkig/";

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a href="#" className={`brand ${isScrolled || isMobileMenuOpen ? 'dark-text' : ''}`}>
            C. Balkı <span>GEMİRTER ALAÇAM</span>
          </a>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.home}</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.about}</a>
            <a href="#resume" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.resume}</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.services}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.contact}</a>
            
            <button className="lang-toggle" onClick={toggleLanguage}>
              <Globe size={16} /> {lang === 'tr' ? 'EN' : 'TR'}
            </button>
          </div>

          <button className={`mobile-toggle ${isMobileMenuOpen || isScrolled ? 'dark-text' : ''}`} onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUpVariant}>
              {t[lang].hero.title}
            </motion.h1>
            <motion.p variants={fadeUpVariant}>{t[lang].hero.subtitle}</motion.p>
            <motion.div className="hero-tags" variants={fadeUpVariant}>
              {t[lang].hero.tags.map((tag) => <span className="hero-tag" key={tag}>{tag}</span>)}
            </motion.div>

            <motion.div className="hero-btns" variants={fadeUpVariant}>
              <a href="#about" className="btn btn-primary">{t[lang].hero.btnAbout}</a>
              <a href="#resume" className="btn btn-outline">{t[lang].hero.btnResume}</a>
              <a href="#services" className="btn btn-outline">{t[lang].hero.btnServices}</a>
              <a href="#contact" className="btn btn-outline">{t[lang].hero.btnContact}</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="container about-container">
          <motion.div className="about-image" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="about-image-wrapper">
               <img src={`${import.meta.env.BASE_URL}images/portrait.jpg`} alt="C. Balkı GEMİRTER ALAÇAM" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div className="about-badge">
              <div className="years">{t[lang].about.expYears}</div>
              <div className="text" style={{ whiteSpace: 'pre-line' }}>{t[lang].about.expText}</div>
            </div>
          </motion.div>

          <motion.div className="about-content" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2>{t[lang].about.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t[lang].about.p1 }}></p>
            <p dangerouslySetInnerHTML={{ __html: t[lang].about.p2 }}></p>

            <div className="about-features">
              <div className="about-feature">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <h4>{t[lang].about.f1Title}</h4>
                  <p>{t[lang].about.f1Desc}</p>
                </div>
              </div>
              <div className="about-feature">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <h4>{t[lang].about.f2Title}</h4>
                  <p>{t[lang].about.f2Desc}</p>
                </div>
              </div>
              <div className="about-feature">
                <CheckCircle2 className="feature-icon" size={24} />
                <div className="feature-text">
                  <h4>{t[lang].about.f3Title}</h4>
                  <p>{t[lang].about.f3Desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="container" id="expertise" style={{ marginTop: '5rem' }}>
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

      <Resume lang={lang} />

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
                { Icon: Link, title: t[lang].contact.linkedin, desc: t[lang].contact.linkedinDesc, href: linkedIn, label: t[lang].contact.linkedinBtn, external: true },
                { Icon: Phone, title: t[lang].contact.phone, desc: `${t[lang].contact.phoneDesc} +90 539 293 77 07`, href: 'https://wa.me/905392937707', label: t[lang].contact.whatsappBtn, external: true },
                { Icon: Mail, title: t[lang].contact.email, desc: t[lang].contact.emailDesc, href: `mailto:${emailAddress}`, label: t[lang].contact.emailBtn, external: false },
              ].map(({ Icon, title, desc, href, label, external }) => (
                <div className="contact-item contact-card" key={title}>
                  <Icon className="contact-icon" size={32} />
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
          <a href={`${import.meta.env.BASE_URL}C_Balki_Gemirter_Alacam_CV_${lang}.pdf`} download={`C_Balki_Gemirter_Alacam_CV_${lang}.pdf`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={20} />
            {t[lang].resume.downloadCV}
          </a>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER ALAÇAM. {t[lang].footer.rights}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
