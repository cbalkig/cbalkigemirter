const puppeteer = require('puppeteer');

const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
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
        .pub-item { margin-bottom: 8px; }
        .pub-title { font-weight: 600; color: #0F172A; }
        .pub-meta { color: #64748B; font-size: 10px; }
    </style>
</head>
<body>
    <h1>C. Balkı GEMİRTER ALAÇAM</h1>
    <div class="header-info">
        Yapay Zeka Yöneticisi (CAIO) & Ar-Ge Direktörü<br>
        <strong>Email:</strong> <a href="mailto:cbalkig@gmail.com">cbalkig@gmail.com</a> | 
        <strong>Tel:</strong> +90 539 293 77 07 | 
        <strong>Web:</strong> <a href="http://www.cavidebalki.com">www.cavidebalki.com</a> | 
        <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/cbalkig">linkedin.com/in/cbalkig</a>
    </div>

    <div class="summary">
        Yeditepe Üniversitesi Bilgisayar Mühendisliği bölümünde 4.00 ortalama ile Doktora (Ph.D.) tez aşamasında olan C. Balkı GEMİRTER ALAÇAM; yapay zeka, derin öğrenme ve inovasyon yönetimi alanlarında 19 yılı aşkın köklü bir kariyere sahiptir. CEIBA Health, Bayegan, Agada Tech, Yapı Kredi Teknoloji ve TEB gibi sektör öncüsü kurumlarda CAIO ve Ar-Ge Direktörü olarak görev yapmıştır. Ayrıca TÜBİTAK (1501, 1832, TEYDEB) ve EU Horizon 2020 tarafından desteklenen 15'ten fazla büyük ölçekli yüksek bütçeli Ar-Ge projesini başarıyla yönetmiş, hibe, teşvik ve teknik yazım süreçlerine süpervizörlük yapmıştır.
    </div>

    <h2>Deneyim</h2>
    
    <div class="item">
        <div class="item-header">
            <h3>Bağımsız Danışman & Fractional CAIO</h3>
            <span class="date">May 2026 - Devam Ediyor</span>
        </div>
        <h4>AI Strategy Consultant</h4>
        <p>Vizyoner organizasyonlar için yapay zeka yatırımlarının ölçülebilir ticari başarıya dönüştürülmesi. Büyük Dil Modelleri (LLM) ve tahmine dayalı analitik mimarilerinin tasarımı ve stratejik danışmanlık.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Yapay Zeka Direktörü</h3>
            <span class="date">Oca 2026 - Nis 2026</span>
        </div>
        <h4>CEIBA HEALTH</h4>
        <p>Yeni nesil sağlık çözümleri için yapay zeka stratejisinin liderliği. TÜBİTAK destekli görüntü işleme projelerinin yönetimi.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Chief AI Officer (CAIO)</h3>
            <span class="date">May 2025 - Tem 2025</span>
        </div>
        <h4>Bayegan</h4>
        <p>Emtia ticareti için yapay zeka destekli risk tahmin sistemlerinin ve öngörüsel modellerin tasarımı.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>VP of Artificial Intelligence</h3>
            <span class="date">Eyl 2024 - Oca 2025</span>
        </div>
        <h4>Agada Tech</h4>
        <p>Müşteri segmentasyon modelleri ve takviyeli öğrenme (RL) ile sadakat optimizasyonu süreçlerinin yönetimi.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>AI & Applied Data Science Manager</h3>
            <span class="date">May 2024 - Ağu 2024</span>
        </div>
        <h4>Yapı Kredi Teknoloji</h4>
        <p>Dolandırıcılık tespiti ve anomali algılama sistemlerinin tasarımı. Horizon 2020 projelerine katkı sağlayan Ar-Ge ekiplerinin liderliği.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Chief AI Officer (CAIO)</h3>
            <span class="date">Ağu 2023 - Şub 2024</span>
        </div>
        <h4>Vivoo</h4>
        <p>LLM tabanlı sağlık asistanı (Welly) ve yapay zeka odaklı beslenme analizi araçlarının geliştirilmesi.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Yapay Zeka & Ar-Ge Müdürü</h3>
            <span class="date">Ağu 2016 - Ağu 2023</span>
        </div>
        <h4>TEB</h4>
        <p>Bankacılık asistanlarının (NEURON) geliştirilmesi ve TÜBİTAK destekli uluslararası Ar-Ge projelerinin yönetimi.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Senior Software Design Engineer</h3>
            <span class="date">Tem 2007 - Oca 2013</span>
        </div>
        <h4>NORTEL Networks - NETAŞ</h4>
        <p>Java ve Oracle ile sistem yönetim yazılımlarının tasarımı. Kritik ağ altyapı bileşenleri için yüksek performanslı ve dayanıklı mimarilerin geliştirilmesi.</p>
    </div>

    <h2>Eğitim</h2>
    
    <div class="item">
        <div class="item-header">
            <h3>Doktora (Ph.D.) - Bilgisayar Mühendisliği</h3>
            <span class="date">2020 - Ekim 2026</span>
        </div>
        <h4>Yeditepe Üniversitesi</h4>
        <p>Not Ortalaması: 4.00/4.00 (Tam Burslu). Tez: Küçük kohort verileri ile görüntü tanıma ve tıbbi teşhis için Derin Öğrenme (DL) mimarisinde ön bilgi kullanımı.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Yüksek Lisans (M.Sc.) - Bilgisayar Mühendisliği</h3>
            <span class="date">2018 - 2020</span>
        </div>
        <h4>Yeditepe Üniversitesi</h4>
        <p>Not Ortalaması: 3.87/4.00 (Birincilik). Tez: Derin Öğrenme Ağlarına (BERT) dayalı Türkçe Soru Cevaplama Sistemi.</p>
    </div>

    <div class="item">
        <div class="item-header">
            <h3>Lisans (B.Sc.) - Bilgisayar Mühendisliği</h3>
            <span class="date">2002 - 2007</span>
        </div>
        <h4>Ege Üniversitesi</h4>
        <p>Not Ortalaması: 3.34/4.00 (Dördüncülük). Bilgisayar mühendisliği temel disiplinleri ve yazılım mimarisi eğitimi.</p>
    </div>

    <h2>Akademik Yayınlar</h2>
    <div class="pub-item">
        <div class="pub-title">CoDA: A Cognitive-Inspired Approach for Domain Adaptation</div>
        <div class="pub-meta">MDPI - Applied Sciences (2026) | C. Balkı GEMİRTER, E. Erkan KORKMAZ, Dionysis GOULARAS</div>
    </div>
    <div class="pub-item">
        <div class="pub-title">Location Proofing Using Video Similarity</div>
        <div class="pub-meta">Journal of Scientific Reports-A (2022) | C. Balkı GEMİRTER, Tacha SERIF</div>
    </div>
    <div class="pub-item">
        <div class="pub-title">A Turkish Question Answering System Based on Deep Learning Neural Networks</div>
        <div class="pub-meta">JISTA - Journal of Intelligent Systems (2021) | C. Balkı GEMİRTER, Dionysis GOULARAS</div>
    </div>
    <div class="pub-item">
        <div class="pub-title">Deep Learning Based Object Detection System for Autonomous Vehicles</div>
        <div class="pub-meta">International Conference on Control and Automation (2021) | C. Balkı GEMİRTER, E. Erkan KORKMAZ</div>
    </div>
    <div class="pub-item">
        <div class="pub-title">A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data</div>
        <div class="pub-meta">HONET (2020) | C. Balkı GEMİRTER, Tacha SERIF</div>
    </div>

</body>
</html>
`;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: 'public/C_Balki_Gemirter_Alacam_CV.pdf', format: 'A4', printBackground: true });
    await browser.close();
    console.log('PDF generated successfully!');
})();
