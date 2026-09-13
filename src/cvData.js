// Shared CV data and helpers used by both the website (src/Resume.jsx) and the PDF generator (generate-pdf.js).

export const PUBLICATIONS = [
  { title: 'CoDA: A Cognitive-Inspired Approach for Domain Adaptation', venue: 'MDPI - Applied Sciences (2026)', authors: 'C. Balkı GEMİRTER, E. Erkan KORKMAZ, Dionysis GOULARAS', badge: 'SCIE - Q2', color: '#10B981', url: 'https://www.mdpi.com/2076-3417/16/9/4115' },
  { title: 'Location Proofing Using Video Similarity', venue: 'Journal of Scientific Reports-A (2022)', authors: 'C. Balkı GEMİRTER, Tacha SERIF', badge: 'TR Dizin', color: '#3B82F6', url: 'https://dergipark.org.tr/en/download/article-file/2416256' },
  { title: 'A Turkish Question Answering System Based on Deep Learning Neural Networks', venue: 'JISTA - Journal of Intelligent Systems (2021)', authors: 'C. Balkı GEMİRTER, Dionysis GOULARAS', badge: 'TR Dizin', color: '#3B82F6', url: 'https://dergipark.org.tr/en/download/article-file/1361881' },
  { title: 'Fine-Tuning Throughput and QoS on SMT Cores', venue: 'UBMK 2021 - 6th International Conference on Computer Science and Engineering (2021)', authors: 'C. Balkı GEMİRTER, Gürhan KÜÇÜK', badge: 'IEEE', color: '#F59E0B', url: 'https://ieeexplore.ieee.org/abstract/document/9559021/' },
  { title: 'A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data', venue: 'UBMK 2021 - 6th International Conference on Computer Science and Engineering (2021)', authors: 'C. Balkı GEMİRTER, Çağatay ŞENTÜRCA, Şebnem BAYDERE', badge: 'IEEE', color: '#F59E0B', url: 'https://ieeexplore.ieee.org/document/9559032/' },
];

// Files live under public/images/. 'contain' = transparent logo on a white tile, 'fill' = square logo with its own background.
export const COMPANY_LOGOS = [
  { match: /turkish journal of electrical|t[üu]b[iİı]tak/i, file: 'logos/tubitak.png', mode: 'fill' },
  { match: /radiology|elsevier/i, file: 'logos/elsevier.jpg', mode: 'fill' },
  { match: /bili[şs]im vadisi|informatics valley/i, file: 'logos/bilisim-vadisi.png', mode: 'contain' },
  { match: /ceiba/i, file: 'logos/ceiba.png', mode: 'contain' },
  { match: /bayegan/i, file: 'logos/bayegan.png', mode: 'contain' },
  { match: /agada/i, file: 'logos/agada.jpg', mode: 'fill' },
  { match: /yap[ıi]\s?kredi/i, file: 'logos/yapikredi-teknoloji.jpg', mode: 'fill' },
  { match: /vivoo/i, file: 'vivoo-logo.png', mode: 'contain' },
  { match: /\bteb\b/i, file: 'logos/teb.jpg', mode: 'fill' },
  { match: /nortel|neta/i, file: 'netas-logo.png', mode: 'contain' },
  { match: /yeditepe/i, file: 'yeditepe-logo.png', mode: 'contain' },
  { match: /^ege/i, file: 'ege-logo.png', mode: 'contain' },
];

const MONOGRAMS = [
  [/ceiba/i, 'CH', '#111827'],
  [/bayegan/i, 'B', '#0E3A5B'],
  [/agada/i, 'A', '#1565FF'],
  [/yap[ıi]\s?kredi/i, 'YK', '#004990'],
  [/vivoo/i, 'V', '#0EA5B7'],
  [/\bteb\b/i, 'TEB', '#00875A'],
  [/nortel|neta/i, 'N', '#0F5F5A'],
  [/yeditepe/i, 'Y', '#1E3A8A'],
  [/^ege/i, 'E', '#4338CA'],
];

export const findLogo = (company) => COMPANY_LOGOS.find((l) => l.match.test(company)) || null;

export const monogram = (company) => {
  const m = MONOGRAMS.find(([re]) => re.test(company));
  return m ? { text: m[1], color: m[2] } : { text: company.charAt(0), color: '#E11D48' };
};

// Consecutive roles at the same company are shown as one company block.
export const groupByCompany = (items) => items.reduce((acc, it) => {
  const last = acc[acc.length - 1];
  if (last && last.company === it.company) last.roles.push(it);
  else acc.push({ company: it.company, roles: [it] });
  return acc;
}, []);

export const tenure = (roles) => `${roles[roles.length - 1].date.split(' - ')[0]} - ${roles[0].date.split(' - ')[1]}`;

// Turns a prose description into bullet points (split on sentences and semicolons).
export const splitBullets = (text, lang) => text
  .split(/;\s+|(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ"“])/)
  .map((x) => x.trim().replace(/[.;]+$/, ''))
  .filter(Boolean)
  .map((x) => x.charAt(0).toLocaleUpperCase(lang) + x.slice(1));

// "GPA: 4.00/4.00 (Ranked 1st). Thesis: ..." -> { gpa, max, note, thesis } ; anything else -> { rest }
export const parseEdu = (desc) => {
  const m = desc.match(/^[^:]+:\s*([\d.]+)\/([\d.]+)\s*\(([^)]+)\)\.\s*(.*)$/);
  if (!m) return { rest: desc };
  const th = m[4].match(/^(?:Tez|Thesis):\s*(.*)$/);
  return { gpa: m[1], max: m[2], note: m[3], thesis: th ? th[1] : null, rest: th ? null : m[4] };
};
