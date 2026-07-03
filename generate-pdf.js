import puppeteer from 'puppeteer';
import { t } from './src/locales.js';

const generateHTML = (lang) => {
    const data = t[lang];
    return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1E293B; margin: 0; padding: 40px; font-size: 11px; line-height: 1.5; }
        h1 { font-size: 24px; color: #E11D48; margin-bottom: 5px; font-weight: 700; }
        h2 { font-size: 14px; color: #0F172A; border-bottom: 2px solid #E11D48; padding-bottom: 4px; margin-top: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
        h3 { font-size: 12px; color: #0F172A; margin: 0 0 2px 0; font-weight: 600; }
        h4 { font-size: 11px; color: #64748B; margin: 0 0 4px 0; font-weight: 500; font-style: italic; }
        p { margin: 0 0 10px 0; color: #475569; }
        .header-info { color: #64748B; margin-bottom: 20px; font-size: 11px; }
        .header-info a { color: #E11D48; text-decoration: none; }
        .summary { font-size: 11px; margin-bottom: 20px; text-align: justify; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; }
        .date { color: #64748B; font-size: 10px; font-weight: 500; }
        .badge { background-color: #E2E8F0; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600; margin-left: 8px; color: white; display: inline-block; vertical-align: middle; }
    </style>
</head>
<body>
    <h1>C. Balkı GEMİRTER ALAÇAM</h1>
    <div class="header-info">
        ${data.about.title}<br>
        <strong>Email:</strong> <a href="mailto:cbalkig@gmail.com">cbalkig@gmail.com</a> | 
        <strong>${data.contact.phone}:</strong> +90 539 293 77 07 | 
        <strong>Web:</strong> <a href="http://www.cavidebalki.com">www.cavidebalki.com</a> | 
        <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/cbalkig">linkedin.com/in/cbalkig</a>
    </div>

    <div class="summary">
        ${data.about.p1} ${data.about.p2}
    </div>

    <h2>${data.resume.experience}</h2>
    ${data.data.experience.map(exp => `
    <div class="item">
        <div class="item-header">
            <h3>${exp.title}</h3>
            <span class="date">${exp.date}</span>
        </div>
        <h4>${exp.company}</h4>
        <p>${exp.desc}</p>
    </div>
    `).join('')}

    <h2>${data.resume.education}</h2>
    ${data.data.education.map(edu => `
    <div class="item">
        <div class="item-header">
            <h3>${edu.title}</h3>
            <span class="date">${edu.date}</span>
        </div>
        <h4>${edu.company}</h4>
        <p>${edu.desc}</p>
    </div>
    `).join('')}

    <h2>${data.resume.projects}</h2>
    ${data.data.projects.map(proj => `
    <div class="item">
        <div class="item-header">
            <h3 style="display:flex; align-items:center;">
                ${proj.title}
                ${proj.badge ? `<span class="badge" style="background-color: ${proj.badgeColor}">${proj.badge}</span>` : ''}
            </h3>
            <span class="date">${proj.date}</span>
        </div>
        <p>${proj.desc}</p>
    </div>
    `).join('')}

    <h2>${data.resume.pubs}</h2>
    <div class="item">
        <h3 style="margin-bottom:4px; display:flex; align-items:center;">CoDA: A Cognitive-Inspired Approach for Domain Adaptation <span class="badge" style="background-color: #10B981;">SCIE - Q2</span></h3>
        <span class="date">MDPI - Applied Sciences (2026) | C. Balkı GEMİRTER, E. Erkan KORKMAZ, Dionysis GOULARAS</span>
    </div>
    <div class="item">
        <h3 style="margin-bottom:4px; display:flex; align-items:center;">Location Proofing Using Video Similarity <span class="badge" style="background-color: #3B82F6;">TR Dizin</span></h3>
        <span class="date">Journal of Scientific Reports-A (2022) | C. Balkı GEMİRTER, Tacha SERIF</span>
    </div>
    <div class="item">
        <h3 style="margin-bottom:4px; display:flex; align-items:center;">A Turkish Question Answering System Based on Deep Learning Neural Networks <span class="badge" style="background-color: #3B82F6;">TR Dizin</span></h3>
        <span class="date">JISTA - Journal of Intelligent Systems (2021) | C. Balkı GEMİRTER, Dionysis GOULARAS</span>
    </div>
    <div class="item">
        <h3 style="margin-bottom:4px; display:flex; align-items:center;">Deep Learning Based Object Detection System for Autonomous Vehicles <span class="badge" style="background-color: #F59E0B;">IEEE</span></h3>
        <span class="date">International Conference on Control and Automation (2021) | C. Balkı GEMİRTER, E. Erkan KORKMAZ</span>
    </div>
    <div class="item">
        <h3 style="margin-bottom:4px; display:flex; align-items:center;">A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data <span class="badge" style="background-color: #F59E0B;">IEEE</span></h3>
        <span class="date">HONET (2020) | C. Balkı GEMİRTER, Tacha SERIF</span>
    </div>

</body>
</html>
    `;
};

(async () => {
    const browser = await puppeteer.launch();
    
    // TR version
    const pageTr = await browser.newPage();
    await pageTr.setContent(generateHTML('tr'));
    await pageTr.pdf({ path: 'public/C_Balki_Gemirter_Alacam_CV_tr.pdf', format: 'A4', printBackground: true });
    
    // EN version
    const pageEn = await browser.newPage();
    await pageEn.setContent(generateHTML('en'));
    await pageEn.pdf({ path: 'public/C_Balki_Gemirter_Alacam_CV_en.pdf', format: 'A4', printBackground: true });
    
    await browser.close();
    console.log('PDFs generated successfully!');
})();
