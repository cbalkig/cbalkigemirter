// Shared CV data and helpers used by both the website (src/Resume.jsx) and the PDF generator (generate-pdf.js).

// Abstracts, DOIs and BibTeX entries come from the publishers' records (Crossref/OpenAlex).
export const PUBLICATIONS = [
  {
    title: 'RP-Fuse: Development of an Adaptive Dose-Gated Multimodal Model for Predicting Radiation Pneumonitis in Non-Small Cell Lung Cancer',
    venue: 'MDPI - Applied Sciences (2026)', authors: 'C. Balkı GEMİRTER, Esra KORKMAZ KIRAKLI, Cemre Ceren ÖZDİLLİ, Ali Kadri ÇIRAK, E. Erkan KORKMAZ, Dionysis GOULARAS',
    badge: 'SCIE - Q2', color: '#10B981', url: 'https://www.mdpi.com/2076-3417/16/21/10497', doi: '10.3390/app162110497',
    abstract: 'Predicting radiation pneumonitis (RP) in non-small cell lung cancer (NSCLC) remains challenging due to complex dose–tissue interactions. Traditional dose-volume histograms (DVHs) are widely used but do not capture spatial dose distributions. In contrast, applying 3D deep learning to raw scans is prone to overfitting, particularly with small single-center datasets. We present RP-Fuse, a multimodal architecture featuring an adaptive dose gate that learns a continuous dose-response curve from the 3D dose map and uses it to weight spatial features from a computed tomography (CT) encoder. Independent expert networks process clinical records, dosimetrics, and a set of positron emission tomography (PET) uptake ratios. An attention layer combines these expert networks using only their out-of-fold (OOF) predictions. RP-Fuse was developed and internally validated using 5×5 nested cross-validation on a retrospective cohort of 87 NSCLC patients (30 developed grade ≥2 RP within six months). Our results show that integrating a dose-based prior facilitates spatial feature learning from raw imaging in small cohorts. With only CT and dose volumes, the adaptive gate increased the area under the receiver operating characteristic curve (AUC) from 0.550 to 0.704. Our final architecture recorded an AUC of 0.822 (95% confidence interval [CI] 0.74–0.91) with a positive Brier skill score of +0.218. Under an identical evaluation protocol, these were the highest values among fifteen reimplemented reference models; the margin over the strongest tabular model is +0.052 AUC (95% CI −0.03 to +0.13). Individually, the scalar and dose-gated configurations achieved identical pooled AUCs of 0.781. Averaging the two yielded a modest gain (+0.041 AUC, 95% CI −0.02 to +0.11) as their predictions exhibit complementary error patterns across patients. Given the relatively small cohort size and the fact that 92% of the participants are male, the RP-Fuse framework should be considered an exploratory proof of concept.',
    bibtex: `@article{gemirter2026rpfuse,
  author  = {Gemirter, Cavide Balkı and Korkmaz Kıraklı, Esra and Özdilli, Cemre Ceren and Çırak, Ali Kadri and Korkmaz, Emin Erkan and Goularas, Dionysis},
  title   = {RP-Fuse: Development of an Adaptive Dose-Gated Multimodal Model for Predicting Radiation Pneumonitis in Non-Small Cell Lung Cancer},
  journal = {Applied Sciences},
  year    = {2026},
  volume  = {16},
  number  = {21},
  pages   = {10497},
  doi     = {10.3390/app162110497}
}`,
  },
  {
    title: 'CoDA: A Cognitive-Inspired Approach for Domain Adaptation',
    venue: 'MDPI - Applied Sciences (2026)', authors: 'C. Balkı GEMİRTER, E. Erkan KORKMAZ, Dionysis GOULARAS',
    badge: 'SCIE - Q2', color: '#10B981', url: 'https://www.mdpi.com/2076-3417/16/9/4115', doi: '10.3390/app16094115',
    abstract: 'Modern neural networks have achieved remarkable success in visual recognition; however, due to their sensitivity to domain shifts, Unsupervised Domain Adaptation (UDA) remains an open research problem. A key reason for this limitation is that source-trained models rely primarily on texture, lacking the explicit geometric information required for object recognition. To overcome this problem, we introduce CoDA, an object-centric learning framework inspired by infant cognitive development, specifically the process of object individuation. By introducing a geometric prior, our approach employs a physically grounded generation pipeline that uses a textureless “Sculpture Mode” and object isolation to complement textural information with 3D geometric features, capturing shape information that is often ignored during training. To enable robust training from scratch, we further integrate two control mechanisms: a Network Stability Scheduler to orchestrate training progression based on convergence stability, and a Dynamic Top-K Pseudo-Labeling strategy that adapts confidence thresholds for each individual class. Extensive evaluations on three real-world target datasets (VegFru, Fruits-262, and Open Images v7) demonstrate that CoDA, trained on a source dataset of just 12,000 synthetic images, achieves comparable results to (and in specific domains surpasses) ImageNet-pretrained models (leveraging 1.2 million images), significantly outperforming state-of-the-art adversarial and semi-supervised domain adaptation methods.',
    bibtex: `@article{gemirter2026coda,
  author  = {Gemirter, Cavide Balkı and Korkmaz, Emin Erkan and Goularas, Dionysis},
  title   = {CoDA: A Cognitive-Inspired Approach for Domain Adaptation},
  journal = {Applied Sciences},
  year    = {2026},
  volume  = {16},
  number  = {9},
  pages   = {4115},
  doi     = {10.3390/app16094115}
}`,
  },
  {
    title: 'Location Proofing Using Video Similarity',
    venue: 'Journal of Scientific Reports-A (2022)', authors: 'C. Balkı GEMİRTER, Tacha SERIF',
    badge: 'TR Dizin', color: '#3B82F6', url: 'https://dergipark.org.tr/en/download/article-file/2416256',
    abstract: 'With the increasing availability of mobile devices and technological improvements, location-based services have become a vital part of our everyday lives. However, a layer of checks and verifications might be required to identify the user’s declared location authenticity, since it is possible to bypass GPS or any other indoor location detection solutions. Existing location proofing solutions mainly propose techniques requiring some sort of an infrastructure, such as access points and/or beacons, or a co-located prover, witnesses and verifier formation to prove the presence of the user. This paper proposes a location proofing solution using the video similarity technique, which is based on the comparison of visual similarities in video pairs to determine the surrounding environment without any infrastructural overhead. The indoor location test results of our prototype indicate that it can achieve a verification accuracy of 97.05% on average in 9.67 seconds.',
    bibtex: `@article{gemirter2022location,
  author  = {Gemirter, Cavide Balkı and Serif, Tacha},
  title   = {Location Proofing Using Video Similarity},
  journal = {Journal of Scientific Reports-A},
  year    = {2022},
  url     = {https://dergipark.org.tr/en/pub/jsr-a/issue/70909/1113837}
}`,
  },
  {
    title: 'A Turkish Question Answering System Based on Deep Learning Neural Networks',
    venue: 'JISTA - Journal of Intelligent Systems (2021)', authors: 'C. Balkı GEMİRTER, Dionysis GOULARAS',
    badge: 'TR Dizin', color: '#3B82F6', url: 'https://dergipark.org.tr/en/download/article-file/1361881', doi: '10.38016/jista.815823',
    abstract: 'In the domain of Natural Language Processing (NLP), despite the progress made for some common languages, difficulties persist for many others for the completion of particular NLP tasks. In this scope, the current study aims to explore these challenges by proposing a question answering (QA) system in the Turkish language. In particular, the system will generate the best answers in terms of content and length from questions that are based on a set of documents related to the banking sector. In order to achieve this goal, the system utilizes advanced artificial intelligence algorithms and large data sets. More specifically, BERT algorithm is used for the generation of the language model, followed by a fine-tuning procedure for performing a machine reading for question answering (MRQA) task. In this work, various experiments were conducted using original and translated data sets in an effort to solve the challenges that arise from morphologically complex languages as Turkish. Finally, the system achieved a performance that overall is applicable to a wider range than any other QA system in the Turkish language. The proposed methodology is not only proper to the Turkish language, but can also be adapted to any other language for performing various NLP tasks.',
    bibtex: `@article{gemirter2021turkish,
  author  = {Gemirter, Cavide Balkı and Goularas, Dionysis},
  title   = {A Turkish Question Answering System Based on Deep Learning Neural Networks},
  journal = {Journal of Intelligent Systems: Theory and Applications},
  year    = {2021},
  volume  = {4},
  number  = {2},
  pages   = {65--75},
  doi     = {10.38016/jista.815823}
}`,
  },
  {
    title: 'Fine-Tuning Throughput and QoS on SMT Cores',
    venue: 'UBMK 2021 - 6th International Conference on Computer Science and Engineering (2021)', authors: 'C. Balkı GEMİRTER, Gürhan KÜÇÜK',
    badge: 'IEEE', color: '#F59E0B', url: 'https://ieeexplore.ieee.org/abstract/document/9559021/', doi: '10.1109/UBMK52708.2021.9559021',
    abstract: 'The SMT (Simultaneous Multithreading) architecture is widely used in modern processors. It provides a performance gain in the system by running multiple threads simultaneously to better utilize datapath resources. In this architecture, one of the research areas is how to allocate common resources among threads. In the static approach, resources are allocated to threads equally or according to a specific predefined rule. In the dynamic approach, monitoring the system at runtime, the most appropriate allocation strategy is chosen. Hill-Climbing and Stretch are two examples of dynamic resource allocation methods. This paper proposes a hybrid approach that combines Stretch with the Hill-climbing method to improve both the throughput and the QoS metrics of the SMT processor. We compare our QoS-Oriented and Throughput-Oriented methods, showing that we can satisfy a target QoS on a latency-sensitive thread, while still achieving near-optimal (only an average of 0.6% worst performance over the Throughput-Oriented method) throughput with our QoS-Oriented approach.',
    bibtex: `@inproceedings{gemirter2021smt,
  author    = {Gemirter, Cavide Balkı and Küçük, Gürhan},
  title     = {Fine-Tuning Throughput and QoS on SMT Cores},
  booktitle = {2021 6th International Conference on Computer Science and Engineering (UBMK)},
  year      = {2021},
  publisher = {IEEE},
  doi       = {10.1109/UBMK52708.2021.9559021}
}`,
  },
  {
    title: 'A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data',
    venue: 'UBMK 2021 - 6th International Conference on Computer Science and Engineering (2021)', authors: 'C. Balkı GEMİRTER, Çağatay ŞENTÜRCA, Şebnem BAYDERE',
    badge: 'IEEE', color: '#F59E0B', url: 'https://ieeexplore.ieee.org/document/9559032/', doi: '10.1109/UBMK52708.2021.9559032',
    abstract: 'MQTT, AMQP and HTTP are messaging protocols that are commonly used for communicating with resource-constrained IoT devices. HTTP is the standard reference protocol for the REST transportation based on the request/response model, whereas both AMQP and MQTT are message-oriented protocols that use the publish/subscribe model. Message-oriented protocols enhance some of the shortcomings of the complex HTTP protocol by using asynchronous communication, changing the design from a document-centric to a data-centric approach and decreasing the header and message sizes. Although significant technical detail is present on these protocols, their real-time performance is insufficiently elaborated. In this paper, we present an experimental evaluation of these protocols conducted in a homogeneous IoT testbed using a real-time Smart City public data set. We provide the behavioral differences between messaging-based protocols and the REST-based HTTP protocol in terms of message latency and CPU usage for varying traffic loads and message sizes. The results showed that MQTT and AMQP are four times faster than HTTP protocol when comparing the message sent latencies. HTTP uses four times more CPU than the AMQP and MQTT protocols. In summary, message-oriented protocols give more stable and improved results as compared to the REST model-based HTTP protocol for all evaluation scenarios.',
    bibtex: `@inproceedings{gemirter2021amqp,
  author    = {Gemirter, Cavide Balkı and Şentürca, Çağatay and Baydere, Şebnem},
  title     = {A Comparative Evaluation of AMQP, MQTT and HTTP Protocols Using Real-Time Public Smart City Data},
  booktitle = {2021 6th International Conference on Computer Science and Engineering (UBMK)},
  year      = {2021},
  publisher = {IEEE},
  doi       = {10.1109/UBMK52708.2021.9559032}
}`,
  },
];

// Academic profile links shown on the academic page and the academic CV.
// Entries with an empty url are hidden until the link is filled in.
export const ACADEMIC_PROFILES = [
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=wSzQwWYAAAAJ', icon: 'images/profiles/googlescholar.svg' },
  { name: 'ORCID', url: 'https://orcid.org/0000-0003-3534-3129', icon: 'images/profiles/orcid.svg' },
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Cavide-Gemirter', icon: 'images/profiles/researchgate.svg' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/cbalkig/', icon: 'images/profiles/linkedin.svg' },
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
