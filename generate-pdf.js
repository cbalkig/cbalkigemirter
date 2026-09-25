import puppeteer from 'puppeteer';
import fs from 'fs';
import { t } from './src/locales.js';
import { PUBLICATIONS, findLogo, monogram, groupByCompany, tenure, splitBullets, parseEdu } from './src/cvData.js';

const NAME = 'C. Balkı GEMİRTER';
const PORTRAIT = `data:image/jpeg;base64,${fs.readFileSync('public/images/portrait-pdf.jpg').toString('base64')}`;


const badge = (text, color) => text ? `<span class="badge" style="background:${color}">${text}</span>` : '';
const rows = (arr, render, n = 2) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) {
        const cells = [];
        for (let j = 0; j < n; j++) {
            const it = arr[i + j];
            cells.push(it ? `<div class="cell">${render(it)}</div>` : '<div class="cell empty"></div>');
        }
        out.push(`<div class="row">${cells.join('')}</div>`);
    }
    return out.join('');
};
const LOGO_DIR = 'public/images/';
const logoCache = new Map();
const dataUri = (file) => {
    if (!logoCache.has(file)) {
        const b = fs.readFileSync(file);
        const hex = b.subarray(0, 4).toString('hex');
        const mime = hex === '89504e47' ? 'image/png' : hex.startsWith('ffd8') ? 'image/jpeg' : 'image/webp';
        logoCache.set(file, `data:${mime};base64,${b.toString('base64')}`);
    }
    return logoCache.get(file);
};
const avatar = (company) => {
    const logo = findLogo(company);
    if (logo && fs.existsSync(LOGO_DIR + logo.file)) return `<div class="avatar logo ${logo.mode}"><img src="${dataUri(LOGO_DIR + logo.file)}" alt=""></div>`;
    const m = monogram(company);
    return `<div class="avatar${m.text.length > 2 ? ' sm' : ''}" style="background-color:${m.color}">${m.text}</div>`;
};

const generateHTML = (lang) => {
    const data = t[lang];
    const r = data.resume;
    const d = data.data;
    const languagesEntry = d.certs.find(c => c.date === r.languages);
    const award = d.certs[0];
    const certList = d.certs.filter(c => c !== languagesEntry && c !== award && c.pdf !== false);
    const summary = data.about.pdfSummary || `${data.about.p1} ${data.about.p2}`;
    const pubItem = (pub, i) => `
  <div class="pub">
    <div class="pub-idx">${String(i + 1).padStart(2, '0')}</div>
    <div>
      <h3>${pub.url ? `<a href="${pub.url}">${pub.title}</a>` : pub.title} ${badge(pub.badge, pub.color)}</h3>
      <div class="meta"><b>${pub.venue}</b> &nbsp;|&nbsp; ${pub.authors}</div>
    </div>
  </div>`;
    const ul = (text) => `<ul>${splitBullets(text, lang).map(b => `<li>${b}</li>`).join('')}</ul>`;
    const pos = (x) => `<div class="pos"><div class="pos-head"><span class="pos-name">${x.title}</span><span class="date light">${x.date}</span></div>${ul(x.desc)}</div>`;

    return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${NAME} - CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --primary: #0B0F19; --accent: #E11D48; --bg: #F8FAFC;
    --text: #0F172A; --muted: #64748B; --body: #475569; --line: #E2E8F0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; }
  html, body { background: #FFFFFF; }
  body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: var(--text); font-size: 10.2px; line-height: 1.5; padding: 0 34px 20px 34px; -webkit-font-smoothing: antialiased; -webkit-print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3, h4, .stat-num, .group-title { font-family: 'Outfit', 'Inter', sans-serif; }

  /* ---------- header ---------- */
  .header { position: relative; overflow: hidden; background: var(--primary); color: #F8FAFC; border-radius: 16px; padding: 22px 30px 20px 30px; }
  .header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(225,29,72,0.28) 0%, rgba(11,15,25,0) 55%); }
  .header-inner { position: relative; display: flex; align-items: center; gap: 26px; }
  .portrait { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; object-position: top; border: 3px solid rgba(255,255,255,0.12); box-shadow: 0 0 0 3px var(--accent); flex-shrink: 0; }
  .header h1 { font-size: 26px; font-weight: 700; letter-spacing: -0.3px; line-height: 1.1; color: #FFFFFF; }
  .header .role { margin-top: 5px; font-size: 11.5px; font-weight: 500; color: #FDA4AF; letter-spacing: 0.2px; }
  .contact { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 9.4px; color: #CBD5E1; }
  .contact b { color: #F8FAFC; font-weight: 600; }
  .tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: #E2E8F0; border-radius: 50px; padding: 3px 10px; font-size: 8.6px; font-weight: 500; letter-spacing: 0.2px; }

  /* ---------- stats ---------- */
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 12px 0 0 0; }
  .stat { background: #FFFFFF; border: 1px solid var(--line); border-radius: 10px; padding: 8px 12px; display: flex; align-items: baseline; gap: 8px; }
  .stat-num { font-size: 20px; font-weight: 700; color: var(--accent); line-height: 1; }
  .stat-label { font-size: 8.8px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

  /* ---------- sections ---------- */
  h2 { display: flex; align-items: center; gap: 10px; font-size: 12.5px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 2px; margin: 13px 0 7px 0; break-after: avoid; }
  h2::before { content: ''; width: 18px; height: 3px; background: var(--accent); border-radius: 2px; }
  h2::after { content: ''; flex: 1; height: 1px; background: var(--line); }
  .summary { color: var(--body); font-size: 10.2px; line-height: 1.55; }

  /* ---------- experience ---------- */
  .date { flex-shrink: 0; font-size: 8.6px; font-weight: 600; color: var(--muted); background: #F1F5F9; border-radius: 50px; padding: 2px 8px; white-space: nowrap; }
  .date.light { background: #FFFFFF; border: 1px solid var(--line); padding: 1px 7px; }
  .xgroup { margin-bottom: 8px; }
  .band { background: linear-gradient(90deg, rgba(225,29,72,0.08) 0%, rgba(225,29,72,0.025) 55%, rgba(225,29,72,0) 100%); border-left: 3px solid var(--accent); border-radius: 0 10px 10px 0; padding: 5px 12px 5px 11px; margin-bottom: 4px; }
  .group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1px; }
  .group-title { font-size: 11.2px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 1.2px; }
  .period { background: var(--accent); color: #FFFFFF; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 8.6px; border-radius: 50px; padding: 1.5px 9px; }
  .group-desc { font-size: 9px; color: var(--muted); font-style: italic; }

  .band { break-inside: avoid; break-after: avoid; }
  .co-head, .pos-head { break-after: avoid; }
  li { break-inside: avoid; }
  .entry { position: relative; padding: 5px 0 5px 40px; }
  .entry.start { border-top: 1px solid #EEF2F6; }
  .keep .entry.start { border-top: none; }
  .entry.single { break-inside: avoid; }
  .entry.lead { padding-bottom: 0; }
  .entry.cont { padding-top: 6px; padding-bottom: 0; break-inside: avoid; }
  .entry.cont.last { padding-bottom: 7px; }
  .entry.lead::after, .entry.cont::after { content: ''; position: absolute; left: 13px; width: 2px; background: rgba(225,29,72,0.22); }
  .entry.lead::after { top: 44px; bottom: 0; }
  .entry.cont::after { top: 0; bottom: 0; }
  .entry.cont.last::after { bottom: auto; height: 10px; }
  .avatar { position: absolute; left: 0; top: 6px; width: 28px; height: 28px; border-radius: 8px; color: #FFFFFF; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.3px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(145deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 60%); box-shadow: 0 2px 5px rgba(15,23,42,0.16); }
  .avatar.sm { font-size: 8.2px; letter-spacing: 0; }
  .avatar.logo { background-color: #FFFFFF; background-image: none; border: 1px solid var(--line); padding: 2.5px; overflow: hidden; box-sizing: border-box; box-shadow: 0 2px 5px rgba(15,23,42,0.10); }
  .avatar.logo.fill { padding: 0; border: none; }
  .avatar.logo img { display: block; width: 100%; height: 100%; object-fit: contain; }
  .avatar.logo.fill img { object-fit: cover; }
  .co-head { display: flex; align-items: center; gap: 8px; min-height: 15px; }
  .co-name { font-family: 'Outfit', 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: var(--text); line-height: 1.2; }
  .co-count { font-size: 8px; font-weight: 700; color: var(--accent); background: rgba(225,29,72,0.08); border-radius: 50px; padding: 1px 7px; }
  .co-head .date { margin-left: auto; }
  .pos-title { font-size: 10px; font-weight: 600; color: var(--accent); margin: 0 0 1px 0; }
  .pos { position: relative; }
  .entry.lead .pos { margin-top: 8px; }
  .pos::before { content: ''; position: absolute; left: -30px; top: 3px; width: 8px; height: 8px; border-radius: 50%; background: #FFFFFF; border: 2px solid var(--accent); box-sizing: border-box; }
  .pos-head { display: flex; align-items: center; gap: 8px; }
  .pos-name { font-size: 10.2px; font-weight: 600; color: var(--accent); }
  .pos-head .date { margin-left: auto; }
  ul { list-style: none; margin-top: 2px; }
  li { position: relative; padding-left: 10px; color: var(--body); font-size: 9.4px; line-height: 1.42; margin-top: 0; }
  li::before { content: ''; position: absolute; left: 1px; top: 5.3px; width: 4px; height: 4px; border-radius: 1px; background: var(--accent); opacity: 0.75; }

  /* ---------- education ---------- */
  .edu-row { display: flex; gap: 8px; break-inside: avoid; }
  .edu { flex: 1; min-width: 0; position: relative; overflow: hidden; background: #FFFFFF; border: 1px solid var(--line); border-radius: 10px; padding: 9px 11px 9px 11px; }
  .edu::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: linear-gradient(90deg, var(--accent), rgba(225,29,72,0.12)); }
  .edu-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .edu .avatar { position: static; }
  .edu h3 { font-size: 10.6px; font-weight: 700; line-height: 1.25; color: var(--text); }
  .edu-school { font-size: 9.2px; font-weight: 600; color: var(--accent); margin-top: 2px; }
  .edu-school .medium { margin-left: 5px; font-size: 7.4px; font-weight: 700; color: #1D4ED8; background: #DBEAFE; border-radius: 50px; padding: 1px 6px; vertical-align: 1px; }
  .exam-row { display: flex; gap: 8px; margin-top: 6px; break-inside: avoid; }
  .exam { flex: 1; display: flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 10px; padding: 5px 11px; }
  .exam .score { min-width: 24px; font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700; line-height: 1; color: var(--accent); }
  .exam .name { display: flex; align-items: center; gap: 6px; font-family: 'Outfit', sans-serif; font-size: 10.4px; font-weight: 700; color: var(--text); }
  .exam .desc { margin-top: 1px; font-size: 8.4px; color: var(--muted); }
  .gpa { display: flex; align-items: baseline; gap: 4px; margin: 5px 0 4px 0; }
  .gpa-num { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: var(--primary); line-height: 1; }
  .gpa-max { font-size: 9px; font-weight: 600; color: var(--muted); }
  .gpa-note { margin-left: auto; align-self: center; font-size: 7.8px; font-weight: 700; color: #B45309; background: #FEF3C7; border-radius: 50px; padding: 2px 7px; white-space: nowrap; }
  .thesis { border-top: 1px dashed var(--line); padding-top: 5px; font-size: 8.8px; line-height: 1.42; color: var(--body); }
  .thesis-label { display: block; font-size: 7.4px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1px; }

  /* ---------- cards ---------- */
  .row { display: flex; gap: 8px; break-inside: avoid; margin-bottom: 7px; }
  .cell { flex: 1; min-width: 0; display: flex; }
  .cell > * { flex: 1; }
  .card { background: #FFFFFF; border: 1px solid var(--line); border-left: 3px solid var(--accent); border-radius: 8px; padding: 7px 10px; }
  .card h3 { font-size: 10px; font-weight: 600; line-height: 1.3; color: var(--text); }
  .card .meta { margin-top: 3px; font-size: 8.6px; color: var(--muted); display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
  .card .meta .date { margin-left: auto; }
  .card .meta .co { font-weight: 600; color: var(--body); }
  .card p { margin-top: 3px; font-size: 9px; color: var(--body); line-height: 1.45; }
  .svc-rows .row, .svc-rows .cell { align-items: flex-start; }
  .card.svc { position: relative; padding-left: 48px; min-height: 46px; }
  .card.svc .avatar { left: 10px; top: 8px; }
  .proj-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 5px; }
  .proj-co { font-size: 8.8px; font-weight: 600; color: var(--accent); margin-top: 2px; }
  .card.proj h3 { font-size: 9.8px; }
  .card.proj p { font-size: 8.8px; }
  .badge { display: inline-block; color: #FFFFFF; font-size: 7.6px; font-weight: 700; padding: 1.5px 6px; border-radius: 4px; line-height: 1.4; vertical-align: middle; white-space: nowrap; }

  .pub { break-inside: avoid; display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; border-bottom: 1px solid var(--line); }
  .keep-pubs { break-inside: avoid; }
  .pub-idx { font-family: 'Outfit', sans-serif; font-weight: 700; color: var(--accent); font-size: 10px; width: 16px; flex-shrink: 0; padding-top: 1px; }
  .pub h3 { font-size: 10.2px; font-weight: 600; line-height: 1.3; }
  .pub .meta { font-size: 8.8px; color: var(--muted); margin-top: 2px; }
  .pub .meta b { color: var(--primary); font-weight: 600; }

  .cert-rows .row { gap: 14px; margin-bottom: 0; }
  .cert { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 4px 0; border-bottom: 1px dashed var(--line); }
  .cert .name { font-size: 9.2px; font-weight: 600; color: var(--text); line-height: 1.3; }
  .cert .issuer { font-size: 8.4px; color: var(--muted); }
  .cert .when { flex-shrink: 0; font-size: 8.2px; color: var(--muted); font-weight: 500; white-space: nowrap; }
  .award { display: flex; align-items: center; gap: 10px; background: linear-gradient(90deg, rgba(245,158,11,0.10), rgba(245,158,11,0)); border: 1px solid #FDE68A; border-radius: 8px; padding: 7px 10px; margin-bottom: 9px; break-inside: avoid; }
  .featured { display: flex; gap: 8px; margin-bottom: 9px; break-inside: avoid; }
  .featured .award { flex: 1; min-width: 0; margin-bottom: 0; }
  .award.scrum { border-color: #BAE6FD; background: linear-gradient(90deg, rgba(14,165,233,0.10), rgba(14,165,233,0)); }
  .award .name { font-size: 10px; font-weight: 600; }
  .award .issuer { font-size: 8.8px; color: var(--muted); }

</style>
</head>
<body>

  <div class="header">
    <div class="header-inner">
      <img class="portrait" src="${PORTRAIT}" alt="${NAME}">
      <div>
        <h1>${NAME}</h1>
        <div class="role">${data.about.title}</div>
        <div class="contact">
          <span><b>Email</b> <a href="mailto:cbalkig@gmail.com">cbalkig@gmail.com</a></span>
          <span><b>${data.contact.phone}</b> +90 539 293 77 07</span>
          <span><b>Web</b> <a href="https://www.cavidebalki.com">www.cavidebalki.com</a></span>
          <span><b>LinkedIn</b> <a href="https://linkedin.com/in/cbalkig">linkedin.com/in/cbalkig</a></span>
          <span><b>${r.location}</b> İstanbul, Türkiye</span>
          ${languagesEntry ? `<span><b>${r.languages}</b> ${languagesEntry.title}</span>` : ''}
        </div>
        <div class="tags">${d.practiceAreas.map(a => `<span class="tag">${a.title}</span>`).join('')}</div>
      </div>
    </div>
  </div>

  <div class="stats">
    <div class="stat"><span class="stat-num">${data.about.expYears}</span><span class="stat-label">${r.stats.years}</span></div>
    <div class="stat"><span class="stat-num">${d.projects.length}</span><span class="stat-label">${r.stats.projects}</span></div>
    <div class="stat"><span class="stat-num">${PUBLICATIONS.length}</span><span class="stat-label">${r.stats.pubs}</span></div>
    <div class="stat"><span class="stat-num">${d.certs.filter(c => c !== languagesEntry && c !== award).length}</span><span class="stat-label">${r.stats.certs}</span></div>
  </div>

  <h2>${r.summary}</h2>
  <p class="summary">${summary}</p>

  <h2>${r.experience}</h2>
  ${d.experienceGroups.map(group => {
    const band = `<div class="band"><div class="group-header"><span class="group-title">${group.title}</span><span class="period">${group.period}</span></div><div class="group-desc">${group.desc}</div></div>`;
    const entries = groupByCompany(group.items).flatMap(co => co.roles.length === 1
      ? [`<div class="entry single start">${avatar(co.company)}<div class="co-head"><span class="co-name">${co.company}</span><span class="date">${co.roles[0].date}</span></div><div class="pos-title">${co.roles[0].title}</div>${ul(co.roles[0].desc)}</div>`]
      : [`<div class="entry lead start">${avatar(co.company)}<div class="co-head"><span class="co-name">${co.company}</span><span class="co-count">${co.roles.length} ${r.roles}</span><span class="date">${tenure(co.roles)}</span></div>${pos(co.roles[0])}</div>`,
         ...co.roles.slice(1).map((x, i, arr) => `<div class="entry cont${i === arr.length - 1 ? ' last' : ''}">${pos(x)}</div>`)]);
    return `<div class="xgroup"><div class="keep">${band}${entries[0]}</div>${entries.slice(1).join('')}</div>`;
  }).join('')}

  <h2>${r.education}</h2>
  <div class="edu-row">
    ${d.education.map(edu => { const e = parseEdu(edu.desc); return `
    <div class="edu">
      <div class="edu-top">${avatar(edu.company)}<span class="date">${edu.date}</span></div>
      <h3>${edu.title}</h3>
      <div class="edu-school">${edu.company}${edu.medium ? `<span class="medium">${edu.medium}</span>` : ''}</div>
      ${e.gpa ? `<div class="gpa"><span class="gpa-num">${e.gpa}</span><span class="gpa-max">/ ${e.max}</span><span class="gpa-note">${e.note}</span></div>` : ''}
      ${e.thesis ? `<div class="thesis"><span class="thesis-label">${r.thesis}</span>${e.thesis}</div>` : (e.rest ? `<div class="thesis">${e.rest}</div>` : '')}
    </div>`; }).join('')}
  </div>
  <div class="exam-row">
    ${d.exams.map(x => `<div class="exam"><span class="score">${x.score}</span><div><div class="name">${x.name}<span class="date">${x.year}</span></div><div class="desc">${x.desc}</div></div></div>`).join('')}
  </div>

  <h2>${r.projects}</h2>
  ${rows(d.projects, proj => `
    <div class="card proj">
      <div class="proj-top">${badge(proj.badge, proj.badgeColor)}${proj.year ? `<span class="date">${proj.year}</span>` : ''}</div>
      <h3>${proj.title}</h3>
      <div class="proj-co">${proj.company}</div>
      <p>${proj.desc}</p>
    </div>`, 3)}

  <div class="keep-pubs">
    <h2>${r.pubs}</h2>
    ${PUBLICATIONS.slice(0, 2).map((pub, i) => pubItem(pub, i)).join('')}
  </div>
  ${PUBLICATIONS.slice(2).map((pub, i) => pubItem(pub, i + 2)).join('')}

  <h2>${r.service}</h2>
  <div class="svc-rows">
  ${rows(d.service, svc => `
    <div class="card svc">
      ${avatar(svc.org)}
      <h3>${svc.org}</h3>
      <div class="meta"><span class="co">${svc.role}</span>${badge(svc.badge, svc.badgeColor)}</div>
      ${svc.desc ? `<p>${svc.desc}</p>` : ''}
    </div>`)}
  </div>

  <h2>${r.certs}</h2>
  <div class="featured">
    <div class="award">
      ${badge(r.award, '#F59E0B')}
      <div><div class="name">${award.title}</div><div class="issuer">${award.company} · ${award.date}</div></div>
    </div>
    ${certList.filter(c => c.featured).map(c => `
    <div class="award scrum">
      ${badge(c.company, '#0EA5E9')}
      <div><div class="name">${c.title}</div><div class="issuer">${c.date}</div></div>
    </div>`).join('')}
  </div>
  <div class="cert-rows">
  ${rows(certList.filter(c => !c.featured), c => `
    <div class="cert">
      <div><div class="name">${c.title}</div><div class="issuer">${c.company}</div></div>
      <div class="when">${c.date}</div>
    </div>`)}
  </div>

</body>
</html>`;
};

// Plain single-column CV for applicant tracking systems (job portals that auto-fill forms from the PDF):
// system font (web fonts are embedded as unparseable Type 3), no columns, logos, photo or letter-spacing.
const generateATSHTML = (lang) => {
    const data = t[lang];
    const r = data.resume;
    const d = data.data;
    const a = data.ats;
    const languagesEntry = d.certs.find(c => c.date === r.languages);
    const award = d.certs[0];
    const certList = d.certs.filter(c => c !== languagesEntry && c !== award && c.pdf !== false);
    const ul = (items, cls = '') => `<ul${cls ? ` class="${cls}"` : ''}>${items.map(b => `<li>${b}</li>`).join('')}</ul>`;
    const entry = (title, sub, body) => `<div class="entry"><h3>${title}</h3><div class="sub">${sub.filter(Boolean).join(' | ')}</div>${body}</div>`;

    return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${NAME} - CV</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; color: #111827; font-size: 10pt; line-height: 1.4; }
  a { color: inherit; text-decoration: none; }
  h1 { font-size: 19pt; line-height: 1.2; }
  .headline { font-size: 11pt; font-weight: bold; color: #BE123C; margin-top: 2px; }
  .contact { margin-top: 3px; color: #374151; }
  h2 { font-size: 11.5pt; text-transform: uppercase; color: #BE123C; border-bottom: 1px solid #D1D5DB; padding-bottom: 2px; margin: 13px 0 6px 0; break-after: avoid; }
  h3 { font-size: 10pt; break-after: avoid; }
  .entry { margin-bottom: 7px; }
  .sub { color: #374151; break-after: avoid; }
  p { margin-top: 2px; }
  ul { margin: 2px 0 0 14px; list-style-type: '•  '; }
  li { margin-top: 1px; break-inside: avoid; }
  ul.list li { margin-top: 3px; }
</style>
</head>
<body>

  <h1>${NAME}</h1>
  <div class="headline">${data.about.title}</div>
  <div class="contact">cbalkig@gmail.com | +90 539 293 77 07 | İstanbul, Türkiye</div>
  <div class="contact"><a href="https://linkedin.com/in/cbalkig">linkedin.com/in/cbalkig</a> | <a href="https://www.cavidebalki.com">www.cavidebalki.com</a></div>

  <h2>${a.summary}</h2>
  <p>${data.about.pdfSummary}</p>

  <h2>${a.skills}</h2>
  ${a.skillGroups.map(g => `<p><b>${g.label}:</b> ${g.items}</p>`).join('')}

  <h2>${a.experience}</h2>
  ${d.experienceGroups.flatMap(g => g.items).map(x => entry(x.title, [x.company, x.date], ul(splitBullets(x.desc, lang)))).join('')}

  <h2>${a.education}</h2>
  ${d.education.map(e => entry(e.title, [e.company, e.medium, e.date], e.desc.split(/(?<=\.)\s+(?=(?:Tez|Thesis):)/).map(l => `<p>${l}</p>`).join(''))).join('')}
  ${d.exams.map(x => `<p><b>${x.name}:</b> ${x.score} (${x.year}) - ${x.desc}</p>`).join('')}

  <h2>${a.projects}</h2>
  ${d.projects.map(p => entry(p.title, [p.company, p.badge, p.year], `<p>${p.desc}</p>`)).join('')}

  <h2>${a.pubs}</h2>
  ${ul(PUBLICATIONS.map(p => `<b>${p.title}</b>. ${p.authors}. <i>${p.venue}</i>. ${p.badge}.`), 'list')}

  <h2>${a.service}</h2>
  ${ul(d.service.map(s => `<b>${s.role}</b>, ${s.org} | ${s.badge}${s.desc ? `<br>${s.desc}` : ''}`), 'list')}

  <h2>${a.certs}</h2>
  ${ul(certList.map(c => `${c.title} - ${c.company} (${c.date})`))}

  <h2>${a.awards}</h2>
  ${ul([`${award.title} - ${award.company} (${award.date})`])}

  ${languagesEntry ? `<h2>${a.languages}</h2><p>${languagesEntry.title.split('|').map(l => l.trim()).join(', ')}</p>` : ''}

</body>
</html>`;
};

const render = async (browser, html, path, margin) => {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await page.pdf({ path, format: 'A4', printBackground: true, margin });
    await page.close();
};

(async () => {
    const browser = await puppeteer.launch();
    for (const lang of ['tr', 'en']) {
        await render(browser, generateHTML(lang), `public/C_Balki_Gemirter_CV_${lang}.pdf`, { top: '28px', right: '0px', bottom: '28px', left: '0px' });
        await render(browser, generateATSHTML(lang), `public/C_Balki_Gemirter_CV_${lang}_ats.pdf`, { top: '44px', right: '52px', bottom: '44px', left: '52px' });
    }
    await browser.close();
    console.log('PDFs generated successfully!');
})();
