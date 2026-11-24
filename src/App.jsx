import { useState, useEffect } from 'react';
import {
  BrainCircuit, Activity, LineChart, Lightbulb, Target, Cpu, MessageSquare, Radio, GraduationCap,
  ArrowRight, Check, Download, Briefcase, FlaskConical, Sparkles,
} from 'lucide-react';
import { motion, MotionConfig } from 'framer-motion';
import { t } from './locales';
import { PUBLICATIONS, groupByCompany } from './cvData';
import { Logo } from './cvComponents';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import './App.css';
import './resume.css';

const BASE = import.meta.env.BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } };

const practiceIcons = [BrainCircuit, Activity, LineChart, Lightbulb, MessageSquare, Radio];
const serviceIcons = [Target, LineChart, Cpu, BrainCircuit, GraduationCap];
const featureIcons = [FlaskConical, Sparkles, Briefcase];

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <motion.div className={`section-heading center ${light ? 'light' : ''}`} {...inView} variants={fadeUp}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function Track({ icon: Icon, data, dark = false, children }) {
  return (
    <motion.article className={`track ${dark ? 'dark' : ''}`} variants={fadeUp}>
      <div className="track-icon"><Icon size={28} strokeWidth={1.6} /></div>
      <span className="eyebrow">{data.kicker}</span>
      <h3>{data.title}</h3>
      <p>{data.text}</p>
      <ul className="track-list">
        {data.items.map((item) => <li key={item}><Check size={18} strokeWidth={2.5} /><span>{item}</span></li>)}
      </ul>
      <div className="track-actions">{children}</div>
    </motion.article>
  );
}

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

  // Arriving from a subpage via /#services or /#contact: the browser looks for the anchor
  // before React has rendered it, so it stays at the top. Scroll to it once rendered, and
  // again after images load (the hero portrait can shift the section offsets).
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const scrollToHash = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    requestAnimationFrame(scrollToHash);
    if (document.readyState !== 'complete') window.addEventListener('load', scrollToHash, { once: true });
    return () => window.removeEventListener('load', scrollToHash);
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

  const L = t[lang];
  const h = L.home;
  const d = L.data;
  const langParam = lang === 'tr' ? '?lang=tr' : '';
  const careerUrl = `${BASE}career.html${langParam}`;
  const academicUrl = `${BASE}academic.html${langParam}`;
  const emailAddress = 'cavide.balki@gmail.com';
  const linkedIn = 'https://www.linkedin.com/in/cbalkig/';

  // Organizations from the career history, industry first; "TEB - Türk Ekonomi Bankası" is shown as "TEB".
  const orgs = groupByCompany(d.experienceGroups.flatMap((g) => g.items))
    .map((c) => c.company)
    .filter((c, i, all) => all.indexOf(c) === i)
    .sort((a, b) => /yeditepe/i.test(a) - /yeditepe/i.test(b));
  const gpa = (d.education[0].desc.match(/\d\.\d\d/) || [''])[0];
  const facts = [
    [L.about.expYears, h.facts.years],
    [PUBLICATIONS.length, h.facts.pubs],
    [d.projects.length, h.facts.projects],
    [gpa, h.facts.gpa],
  ];
  const features = [1, 2, 3].map((n) => ({ title: L.about[`f${n}Title`], desc: L.about[`f${n}Desc`], Icon: featureIcons[n - 1] }));
  const contacts = [
    { logo: 'linkedin.svg', title: L.contact.linkedin, desc: L.contact.linkedinDesc, href: linkedIn, label: L.contact.linkedinBtn, external: true },
    { logo: 'whatsapp.svg', title: L.contact.phone, desc: `${L.contact.phoneDesc} +90 539 293 77 07`, href: 'https://wa.me/905392937707', label: L.contact.whatsappBtn, external: true },
    { logo: 'gmail.svg', title: L.contact.email, desc: emailAddress, href: `mailto:${emailAddress}`, label: L.contact.emailBtn, external: false },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="skip-link">{h.skip}</a>
      <SiteNav lang={lang} active={activeSection} onToggleLang={toggleLanguage} />

      <main>
        <section id="home" className="hero">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="container hero-grid">
            <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
              <motion.span className="eyebrow" variants={fadeUp}>{h.eyebrow}</motion.span>
              <motion.h1 variants={fadeUp}>{h.titlePre}<em>{h.titleEm}</em>{h.titlePost}</motion.h1>
              <motion.p variants={fadeUp}>{L.hero.subtitle}</motion.p>
              <motion.div className="hero-status" variants={fadeUp}>{h.status}</motion.div>
              <motion.div className="hero-actions" variants={fadeUp}>
                <a href={careerUrl} className="btn btn-primary">{h.ctaCareer} <ArrowRight className="arrow" size={18} /></a>
                <a href={academicUrl} className="btn btn-ghost">{h.ctaAcademic}</a>
                <a href="#contact" className="text-link">{h.ctaContact} <ArrowRight size={16} /></a>
              </motion.div>
              <motion.dl className="hero-facts" variants={fadeUp}>
                {facts.map(([num, label]) => (
                  <div key={label}>
                    <dt>{num}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>

            <motion.div
              className="hero-portrait"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="portrait-frame">
                <img src={`${BASE}images/portrait-hero.jpg`} alt="C. Balkı GEMİRTER" width="900" height="900" fetchPriority="high" />
              </div>
              <div className="portrait-caption">
                <strong>C. Balkı GEMİRTER</strong>
                <span>{h.portraitRole}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="orgs" aria-label={h.logos}>
          <div className="container orgs-inner">
            <span className="orgs-label">{h.logos}</span>
            <ul className="orgs-list">
              {orgs.map((company) => (
                <li className="org" key={company}><Logo company={company} />{company.split(' - ')[0]}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container about-grid">
            <motion.div className="about-text" {...inView} variants={fadeUp}>
              <span className="eyebrow">{h.aboutEyebrow}</span>
              <h2>{L.about.title}</h2>
              <p className="lead">{L.about.p1}</p>
              <p>{L.about.p2}</p>
            </motion.div>
            <motion.div className="about-features" {...inView} variants={stagger}>
              {features.map(({ title, desc, Icon }) => (
                <motion.div className="about-feature" key={title} variants={fadeUp}>
                  <div className="feature-icon"><Icon size={22} strokeWidth={1.7} /></div>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="profile" className="section tracks">
          <div className="container">
            <SectionHeading eyebrow={h.tracksEyebrow} title={h.tracksTitle} text={h.tracksText} />
            <motion.div className="tracks-grid" {...inView} variants={stagger}>
              <Track icon={Briefcase} data={h.industry} dark>
                <a href={careerUrl} className="btn btn-primary btn-sm">{h.industry.page} <ArrowRight className="arrow" size={16} /></a>
                <a href={`${BASE}C_Balki_Gemirter_CV_${lang}.pdf`} download className="btn btn-ghost btn-sm"><Download size={16} /> {h.industry.cv}</a>
                <a href={`${BASE}C_Balki_Gemirter_CV_${lang}_ats.pdf`} download className="text-link">{h.industry.ats}</a>
              </Track>
              <Track icon={GraduationCap} data={h.academicTrack}>
                <a href={academicUrl} className="btn btn-dark btn-sm">{h.academicTrack.page} <ArrowRight className="arrow" size={16} /></a>
                <a href={`${BASE}C_Balki_Gemirter_Academic_CV_${lang}.pdf`} download className="btn btn-light btn-sm"><Download size={16} /> {h.academicTrack.cv}</a>
              </Track>
            </motion.div>
          </div>
        </section>

        <section id="expertise" className="section expertise">
          <div className="container">
            <SectionHeading eyebrow={h.expertiseEyebrow} title={L.expertise.title} />
            <motion.div className="expertise-grid" {...inView} variants={stagger}>
              {d.practiceAreas.map((area, i) => {
                const Icon = practiceIcons[i];
                return (
                  <motion.article className="expertise-card" key={area.title} variants={fadeUp}>
                    <div className="expertise-icon"><Icon size={26} strokeWidth={1.6} /></div>
                    <h3>{area.title}</h3>
                    <p>{area.desc}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="container">
            <SectionHeading light eyebrow={h.servicesEyebrow} title={L.services.title} text={L.services.subtitle} />
            <motion.div className="services-grid" {...inView} variants={stagger}>
              {d.services.map((svc, i) => {
                const Icon = serviceIcons[i];
                return (
                  <motion.article className="service-card" key={svc.title} variants={fadeUp}>
                    <Icon size={30} strokeWidth={1.6} />
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                  </motion.article>
                );
              })}
              <motion.article className="service-card cta" variants={fadeUp}>
                <h3>{h.servicesCta.title}</h3>
                <p>{h.servicesCta.text}</p>
                <a href="#contact" className="btn btn-light btn-sm">{h.servicesCta.btn} <ArrowRight className="arrow" size={16} /></a>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container">
            <SectionHeading eyebrow={h.contactEyebrow} title={L.contact.title} text={h.contactSubtitle} />
            <motion.div className="contact-grid" {...inView} variants={stagger}>
              {contacts.map(({ logo, title, desc, href, label, external }) => (
                <motion.div className="contact-card" key={title} variants={fadeUp}>
                  <img className="contact-logo" src={`${BASE}images/profiles/${logo}`} alt="" width="38" height="38" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <a href={href} className="btn btn-outline btn-sm" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </MotionConfig>
  );
}

export default App;
