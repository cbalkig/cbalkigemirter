import React, { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit, Activity, LineChart, Lightbulb, MapPin, Phone, Mail, CheckCircle2, ChevronRight, BookOpen, FileText, ExternalLink, Link, Award, Target, Cpu, Briefcase, Users, MessageSquare, Radio, Download, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from './locales';
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
    return params.get('lang') === 'en' ? 'en' : 'tr';
  });

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
          <a href="#" className={`brand ${isScrolled ? 'dark-text' : ''}`}>
            C. Balkı <span>GEMİRTER ALAÇAM</span>
          </a>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.home}</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t[lang].nav.about}</a>
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

            <motion.div className="hero-btns" variants={fadeUpVariant}>
              <a href="#about" className="btn btn-primary">{t[lang].hero.btnAbout}</a>
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

      <section id="resume" className="section resume" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">{t[lang].resume.title}</h2>
            <p className="section-subtitle">{t[lang].resume.subtitle}</p>
          </motion.div>

          <div className="resume-container">
            <motion.div className="resume-column" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3><BrainCircuit className="resume-icon" /> {t[lang].resume.experience}</h3>
              <div className="timeline">
                {t[lang].data.experience.map((exp, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">{exp.date}</div>
                    <h4>{exp.title}</h4>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary-color)' }}>{exp.company}</h5>
                    <p>{exp.desc}</p>
                  </div>
                ))}
              </div>

              <div className="desktop-projects">
                <hr style={{ border: 'none', borderTop: '2px dashed var(--secondary-color)', opacity: '0.2', margin: '4rem 0' }} />
                <h3 style={{ marginTop: '0' }}><Target className="resume-icon" /> {t[lang].resume.projects}</h3>
                <div className="timeline">
                  {t[lang].data.projects.map((proj, idx) => (
                    <div className="timeline-item" key={idx}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-date">{proj.date}</div>
                      <h4>{proj.title}</h4>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        {proj.badge && <span className="q-badge" style={{ backgroundColor: proj.badgeColor }}>{proj.badge}</span>}
                      </h5>
                      <p>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="resume-column" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3><BookOpen className="resume-icon" /> {t[lang].resume.education}</h3>
              <div className="timeline">
                {t[lang].data.education.map((edu, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">{edu.date}</div>
                    <h4>{edu.title}</h4>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary-color)' }}>{edu.company}</h5>
                    <p>{edu.desc}</p>
                  </div>
                ))}
              </div>
              
              <hr style={{ border: 'none', borderTop: '2px dashed var(--secondary-color)', opacity: '0.2', margin: '4rem 0' }} />
              <h3 style={{ marginTop: '0' }}><FileText className="resume-icon" /> {t[lang].resume.pubs}</h3>
              <div className="publications-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div className="pub-item" style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <a href="https://www.mdpi.com/journal/applsci" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>CoDA: A Cognitive-Inspired Approach for Domain Adaptation</h4>
                      <p style={{ color: '#0284C7', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>MDPI - Applied Sciences (2026) <span className="q-badge" style={{ backgroundColor: '#10B981' }}>SCIE - Q2</span></p>
                      <p style={{ color: '#475569', fontSize: '0.85rem' }}>C. Balkı GEMİRTER, E. Erkan KORKMAZ, Dionysis GOULARAS</p>
                    </div>
                    <ExternalLink size={20} color="var(--secondary-color)" />
                  </a>
                </div>

                <div className="pub-item" style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Location Proofing Using Video Similarity</h4>
                      <p style={{ color: '#0284C7', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>Journal of Scientific Reports-A (2022) <span className="q-badge" style={{ backgroundColor: '#3B82F6' }}>TR Dizin</span></p>
                      <p style={{ color: '#475569', fontSize: '0.85rem' }}>C. Balkı GEMİRTER, Tacha SERIF</p>
                    </div>
                    <ExternalLink size={20} color="var(--secondary-color)" />
                  </a>
                </div>

                <div className="pub-item" style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <a href="https://dergipark.org.tr/en/pub/jista" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>A Turkish Question Answering System Based on Deep Learning Neural Networks</h4>
                      <p style={{ color: '#0284C7', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>JISTA - Journal of Intelligent Systems (2021) <span className="q-badge" style={{ backgroundColor: '#3B82F6' }}>TR Dizin</span></p>
                      <p style={{ color: '#475569', fontSize: '0.85rem' }}>C. Balkı GEMİRTER, Dionysis GOULARAS</p>
                    </div>
                    <ExternalLink size={20} color="var(--secondary-color)" />
                  </a>
                </div>

                <div className="pub-item" style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Deep Learning Based Object Detection System for Autonomous Vehicles</h4>
                      <p style={{ color: '#0284C7', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>Int. Conf. on Control and Automation (2021) <span className="q-badge" style={{ backgroundColor: '#F59E0B' }}>IEEE</span></p>
                      <p style={{ color: '#475569', fontSize: '0.85rem' }}>C. Balkı GEMİRTER, E. Erkan KORKMAZ</p>
                    </div>
                    <ExternalLink size={20} color="var(--secondary-color)" />
                  </a>
                </div>

                <div className="pub-item" style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data</h4>
                      <p style={{ color: '#0284C7', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>HONET (2020) <span className="q-badge" style={{ backgroundColor: '#F59E0B' }}>IEEE</span></p>
                      <p style={{ color: '#475569', fontSize: '0.85rem' }}>C. Balkı GEMİRTER, Tacha SERIF</p>
                    </div>
                    <ExternalLink size={20} color="var(--secondary-color)" />
                  </a>
                </div>

              </div>
              
              <div className="mobile-projects">
                <hr style={{ border: 'none', borderTop: '2px dashed var(--secondary-color)', opacity: '0.2', margin: '4rem 0' }} />
                <h3 style={{ marginTop: '0' }}><Target className="resume-icon" /> {t[lang].resume.projects}</h3>
                <div className="timeline">
                  {t[lang].data.projects.map((proj, idx) => (
                    <div className="timeline-item" key={`mobile-proj-${idx}`}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-date">{proj.date}</div>
                      <h4>{proj.title}</h4>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        {proj.badge && <span className="q-badge" style={{ backgroundColor: proj.badgeColor }}>{proj.badge}</span>}
                      </h5>
                      <p>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '2px dashed var(--secondary-color)', opacity: '0.2', margin: '4rem 0' }} />
              <h3 style={{ marginTop: '0' }}><Award className="resume-icon" /> {t[lang].resume.certs}</h3>
              <div className="timeline">
                {t[lang].data.certs.map((cert, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">{cert.date}</div>
                    <h4>{cert.title}</h4>
                    <p style={{ color: 'var(--secondary-color)', fontWeight: '500', marginBottom: '0.25rem' }}>{cert.company}</p>
                    <p>{cert.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>




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
              
              <div className="contact-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px' }}>
                <Link className="contact-icon" size={32} />
                <div>
                  <h4>{t[lang].contact.linkedin}</h4>
                  <p style={{ marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.4' }}>{t[lang].contact.linkedinDesc}</p>
                  <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>{t[lang].contact.linkedinBtn}</a>
                </div>
              </div>
              
              <div className="contact-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px' }}>
                <Phone className="contact-icon" size={32} />
                <div>
                  <h4>{t[lang].contact.phone}</h4>
                  <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>{t[lang].contact.phoneDesc} +90 539 293 77 07</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href="https://wa.me/905392937707" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem', fontSize: '0.8rem', flex: 1, textAlign: 'center' }}>{t[lang].contact.whatsappBtn}</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px' }}>
                <Mail className="contact-icon" size={32} />
                <div>
                  <h4>{t[lang].contact.email}</h4>
                  <p style={{ marginBottom: '1rem' }}>{t[lang].contact.emailDesc}</p>
                  <a href={`mailto:${emailAddress}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: '100%' }}>{t[lang].contact.emailBtn}</a>
                </div>
              </div>
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
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} C. Balkı GEMİRTER ALAÇAM. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
