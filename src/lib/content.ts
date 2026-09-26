export const SITE = {
  name: 'G-TEC Education UK',
  legalName: 'G-TEC EDUCATION UK Limited',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtec.uk',
  phone: '+44 7859 731738',
  phoneHref: 'tel:+447859731738',
  email: 'ro.uk@gteceducation.com',
  address: {
    street: 'Office 718, Crown House Business Centre, North Circular Road',
    locality: 'London',
    postalCode: 'NW10 7PN',
    country: 'GB',
  },
  registered: { street: '115 London Road', locality: 'Morden, England', postalCode: 'SM4 5HP' },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61592236351449',
    instagram: 'https://www.instagram.com/gtec.uk/',
    linkedin: 'https://www.linkedin.com/company/g-tec-groupofinstitutions',
  },
  global: 'https://www.gteceducation.com',
  privacy: 'https://www.gteceducation.com/privacypolicy',
  verify: 'https://www.gtecadmin.com/validation/index.aspx',
};

export const NAV: [string, string][] = [
  ['#journey', 'Journey'], ['#courses', 'Courses'], ['#why', 'Why G-TEC'], ['#network', 'Network'], ['#stories', 'Stories'], ['#contact', 'Contact'],
];

export type Course = { slug: string; cat: string; title: string; desc: string; duration: string; level: string; img: string };
export const COURSES: Course[] = [
  { slug: 'futurex', cat: 'Emerging Tech', title: 'FutureX', desc: 'An advanced career acceleration programme integrating AI, cloud computing, automation, innovation and emerging technologies.', duration: '12 months', level: 'Career accelerator', img: '/futurex.png' },
  { slug: 'ai-ml', cat: 'AI & Data', title: 'AI & Machine Learning', desc: 'Artificial Intelligence, Machine Learning, Deep Learning and Generative AI using real-world projects and industry tools.', duration: '9 months', level: 'Intermediate', img: '/ai.png' },
  { slug: 'cyber', cat: 'Security', title: 'Cyber Security & Ethical Hacking', desc: 'Practical skills in cyber defence, penetration testing, ethical hacking and digital forensics.', duration: '8 months', level: 'Beginner to advanced', img: '/cyber.png' },
  { slug: 'fullstack', cat: 'Development', title: 'Full Stack Development', desc: 'Become a professional web developer by mastering frontend and backend technologies with live projects.', duration: '10 months', level: 'Job-ready', img: '/fullstack.png' },
  { slug: 'data', cat: 'AI & Data', title: 'Data Science, Analytics & BI', desc: 'Data analysis, visualisation, predictive modelling and business intelligence platforms.', duration: '9 months', level: 'Intermediate', img: '/data.png' },
];
export const CATS = ['All', 'Emerging Tech', 'AI & Data', 'Security', 'Development'];

export const WORDS = ['London.', 'the UK.', 'you.'];
export const TICKER = ['Cohort 04 · AI & ML starts October', 'Open day · Crown House, Park Royal', 'Placement drive · London employers'];
export const STATS: { value: number; format: (v: number) => string; label: string }[] = [
  { value: 23, format: (v) => Math.round(v) + '+', label: 'Countries' },
  { value: 800, format: (v) => Math.round(v) + '+', label: 'Centres worldwide' },
  { value: 4.3, format: (v) => v.toFixed(1) + 'M', label: 'Alumni' },
  { value: 20, format: (v) => Math.round(v) + '+', label: 'Years of skilling' },
];

export const SCENES = [
  { n: '01', kicker: 'Assess', title: 'A consultation, not a sales call.', caption: 'Map your goals with a consultant', body: 'We start by understanding where you are and where you want to be. A G-TEC education consultant maps your background to the right programme, intake and funding route.', tags: ['Free consultation', 'Skills assessment', 'Funding guidance'], img: '/students.png' },
  { n: '02', kicker: 'Train', title: 'Learn on live projects with industry instructors.', caption: 'Live projects, real tools', body: 'Small cohorts at our Park Royal centre, taught by practitioners. Every module ends in something you can show an employer: a deployed app, a model, a security audit.', tags: ['Live projects', 'Industry tools', 'Small cohorts'], img: '/ai.png' },
  { n: '03', kicker: 'Place', title: 'A certificate recognised in 23+ countries, and a job to use it in.', caption: 'Placement support and job fairs', body: 'Graduate with a globally verifiable G-TEC certificate, then use our placement desk, employer vacancy board and job fairs to land the role.', tags: ['Placement desk', 'Job fairs', 'Global registry'], img: '/fullstack.png' },
];

export const PILLARS = [
  { n: '01', title: 'Industry-aligned curricula', desc: 'Programmes designed with employers and refreshed every intake, so what you learn is what the market is hiring for this year.', img: '/data.png', navy: false },
  { n: '02', title: 'University collaborations', desc: 'Pathways into higher study in the UK and abroad, with credits and certifications that travel with you.', img: '/campus.png', navy: false },
  { n: '03', title: 'Corporate alliances', desc: 'Skilling partnerships with London businesses that shape our syllabus and hire from our cohorts.', img: '/cyber.png', navy: false },
  { n: '04', title: 'Placement support', desc: 'A dedicated placement desk, vacancy board and G-TEC job fairs across the network.', img: '/students.png', navy: true },
];

export const COUNTRIES: [string, number, number][] = [
  ['United Kingdom', 54, -2], ['India', 21, 78], ['UAE', 24, 54], ['Saudi Arabia', 24, 45], ['Qatar', 25, 51], ['Oman', 21, 57], ['Bahrain', 26, 50.5], ['Kuwait', 29, 47.5], ['Egypt', 27, 30], ['Iran', 32, 53], ['Malaysia', 4, 102], ['Singapore', 1.3, 103.8], ['Sri Lanka', 7.5, 80.7], ['Philippines', 12, 122], ['Australia', -25, 134], ['USA', 39, -98], ['Mexico', 23, -102], ['Kenya', 0.5, 37.5], ['Tanzania', -6, 35], ['Ghana', 7.9, -1], ['Zambia', -13, 28], ['Malawi', -13.5, 34], ['Zimbabwe', -19, 30],
];
export const NETWORK_TILES = [['23+', 'Countries'], ['800+', 'Centres'], ['4.3M', 'Alumni'], ['20+', 'Years']];

export const TESTIMONIALS = [
  { quote: 'The FutureX programme gave me hands-on AI and cloud experience employers actually asked about in interviews. I moved into a solutions role within three months.', name: 'Aisha R.', role: 'FutureX graduate · Cloud Solutions Analyst' },
  { quote: 'Small cohorts, live projects and instructors who work in the industry. The certificate is recognised across the network, which mattered when I relocated.', name: 'Daniel M.', role: 'Cyber Security & Ethical Hacking' },
  { quote: 'I retrained from hospitality into full-stack development. The structured path and placement support made the switch realistic.', name: 'Priya S.', role: 'Full Stack Development · Junior Developer' },
  { quote: 'The data science track was practical from week one. I built a portfolio of dashboards that got me my first analyst role.', name: 'Tomasz K.', role: 'Data Science, Analytics & BI' },
];
