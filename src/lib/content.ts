export const SITE = {
  name: 'G-TEC EDUCATION UK',
  legalName: 'G-TEC EDUCATION UK Limited',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtec.uk',
  phone: '+44 7311 225222',
  phoneHref: 'tel:+447311225222',
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
  ukprn: '10101903',
  hq: { name: 'House of G-TEC', street: 'Indus Avenue', locality: 'Calicut - 673002, India', phones: ['+91 495 408 8333', '+91 95269 93944'], email: 'info@gteceducation.com' },
  me: { name: 'Al Qusais G-TEC EDUCATION Institute', street: 'Villa 19', locality: 'Al Qusais 2, Dubai, United Arab Emirates', phones: ['+971 4 266 5884', '+971 50 398 0768'] },
  global: 'https://www.gteceducation.com',
  privacy: 'https://www.gteceducation.com/privacypolicy',
  verify: 'https://www.gtecadmin.com/validation/index.aspx',
};

export const NAV: [string, string][] = [
  ['/about', 'About'], ['#journey', 'Journey'], ['#courses', 'Courses'], ['/programmes', 'Programmes'], ['#why', 'Why G-TEC'], ['#network', 'Network'], ['#stories', 'Stories'], ['#software', 'Software'], ['#contact', 'Contact'],
];

export type Course = { slug: string; cat: string; title: string; desc: string; duration: string; level: string; img: string };

export const WORDS = ['London.', 'the UK.', 'you.'];
export const TICKER = ['Cohort 04 · AI & ML starts October', 'Open day · Crown House, Park Royal', 'Placement drive · London employers'];
export const STATS: { value: number; format: (v: number) => string; label: string }[] = [
  { value: 23, format: (v) => Math.round(v) + '+', label: 'Countries' },
  { value: 800, format: (v) => Math.round(v) + '+', label: 'Centres worldwide' },
  { value: 4.3, format: (v) => v.toFixed(1) + 'M', label: 'Alumni' },
  { value: 20, format: (v) => Math.round(v) + '+', label: 'Years of skilling' },
];

export const SCENES = [
  { n: '01', kicker: 'Assess', title: 'A proper chat, not a sales pitch.', caption: 'Talk through your goals with a consultant', body: 'First we find out where you are now and where you want to get to. Then one of our consultants helps you pick the right course, start date and way to pay for it.', tags: ['Free consultation', 'Skills assessment', 'Funding guidance'], img: '/media/interview.jpg' },
  { n: '02', kicker: 'Train', title: 'Learn by building, with instructors who work in tech.', caption: 'Live projects, real tools', body: 'Small classes at our Park Royal centre, taught by people who do this for a living. Every module ends with something you can show an employer, like a live app, a working model or a security audit.', tags: ['Live projects', 'Industry tools', 'Small cohorts'], img: '/media/train.jpg' },
  { n: '03', kicker: 'Place', title: 'A certificate that counts in 23+ countries, and help finding the job.', caption: 'Placement support and job fairs', body: 'You finish with a G-TEC certificate employers can check online. Then our placement team, vacancy board and job fairs help you find your first role.', tags: ['Placement desk', 'Job fairs', 'Global registry'], img: '/media/place.jpg' },
];

export const PILLARS = [
  { n: '01', title: 'Industry-aligned curricula', desc: 'We build our courses with employers and update them for every intake, so you learn what companies are hiring for right now.', img: '/media/curric.jpg', navy: false },
  { n: '02', title: 'University collaborations', desc: 'Want to keep studying? Our university partners in the UK and abroad offer routes into further study, and your credits come with you.', img: '/media/uni.jpg', navy: false },
  { n: '03', title: 'Corporate alliances', desc: 'We work with London businesses who help shape what we teach, and who hire our graduates.', img: '/media/london.jpg', navy: false },
  { n: '04', title: 'Placement support', desc: 'A placement team that knows you by name, a board of live vacancies and regular G-TEC job fairs.', img: '/media/assess.jpg', navy: true },
];

export const COUNTRIES: [string, number, number][] = [
  ['United Kingdom', 54, -2], ['India', 21, 78], ['UAE', 24, 54], ['Saudi Arabia', 24, 45], ['Qatar', 25, 51], ['Oman', 21, 57], ['Bahrain', 26, 50.5], ['Kuwait', 29, 47.5], ['Egypt', 27, 30], ['Iran', 32, 53], ['Malaysia', 4, 102], ['Singapore', 1.3, 103.8], ['Sri Lanka', 7.5, 80.7], ['Philippines', 12, 122], ['Australia', -25, 134], ['USA', 39, -98], ['Mexico', 23, -102], ['Kenya', 0.5, 37.5], ['Tanzania', -6, 35], ['Ghana', 7.9, -1], ['Zambia', -13, 28], ['Malawi', -13.5, 34], ['Zimbabwe', -19, 30],
];
export const NETWORK_TILES = [['23+', 'Countries'], ['800+', 'Centres'], ['4.3M', 'Alumni'], ['20+', 'Years']];

export const TESTIMONIALS = [
  { quote: 'Every interview I had asked about the AI and cloud work I did on FutureX. Three months after finishing I started a solutions role.', name: 'Aisha R.', role: 'FutureX graduate · Cloud Solutions Analyst' },
  { quote: 'My instructor was working in security at the same time as teaching us, and it showed. When I moved countries, my certificate still counted.', name: 'Daniel M.', role: 'Cyber Security & Ethical Hacking' },
  { quote: 'I was working in hospitality and wanted out. Having a clear plan and a placement team behind me made switching to development feel possible.', name: 'Priya S.', role: 'Full Stack Development · Junior Developer' },
  { quote: 'We were working with real data from week one. The dashboards I built on the course are what got me my first analyst job.', name: 'Tomasz K.', role: 'Data Science, Analytics & BI' },
];

export type FocusCourse = { slug: string; cat: string; img: string; level: string; kicker: string; title: string; blurb: string; duration: string; intro: string[]; modules: string[]; pdf: string };
export const FOCUS_COURSES: FocusCourse[] = [
  {
    slug: 'generative-ai-applied-tools', cat: 'Generative AI', blurb: 'Get fluent with modern AI tools, from prompting LLMs and vision models to building your first AI apps.', img: 'courses/generative-ai-applied-tools', level: 'Level 1', kicker: 'Certificate in', title: 'Generative AI & Applied AI Tools', duration: '120 hours',
    intro: ['Step into the world of AI with our Level 1 Generative AI for Beginners programme. Designed for undergraduates across Engineering, Science, Arts and Commerce, this 120-hour hands-on course lets you explore AI tools, build smart applications and master multimodal AI systems through labs, projects and assessments.'],
    modules: ['Introduction to AI & Digital Fluency', 'Basics of Generative AI', 'Prompt Engineering with LLMs', 'Prompt Engineering with Vision Models', 'AI with Audio & Speech Models', 'Ethical AI & Safety', 'AI Tools (ChatGPT, Gemini, Claude, Cursor)', 'Capstone Project', 'Assessments & Demo'],
    pdf: 'CERTIFICATE IN GENERATIVE AI & APPLIED AI TOOLS.pdf',
  },
  {
    slug: 'generative-ai-pipelines-rag', cat: 'Generative AI', blurb: 'Go deeper into ML, embeddings and RAG, and build end-to-end AI pipelines on real data.', img: 'courses/generative-ai-pipelines-rag', level: 'Level 2', kicker: 'Advanced Certificate in', title: 'Generative AI Pipelines & RAG Systems', duration: '2 months · 120 hours',
    intro: ['The Level 2 Advanced AI programme builds on the foundations of Level 1, taking you deeper into machine learning, deep learning, advanced prompt engineering, vector embeddings and Retrieval-Augmented Generation (RAG).', 'Across 120 hours of theory, hands-on labs, capstone projects and assessments, you move from designing prompts and small AI applications to building end-to-end AI pipelines, integrating APIs and developing domain-specific AI solutions.'],
    modules: ['Deep Dive into Machine Learning Concepts', 'Demystifying Deep Learning', 'Advanced Prompt Engineering & Context Engineering', 'Vector Embeddings & Semantic Search Applications', 'Deep Dive into RAG Systems', 'Implementing RAG Systems', 'Steps to Improve RAG Systems', 'Capstone Project', 'Assessments & Demo'],
    pdf: 'ADVANCED CERTIFICATE IN GENERATIVE AI PIPELINES & RAG SYSTEM.pdf',
  },
  {
    slug: 'ai-agents-automation-deployment', cat: 'Generative AI', blurb: 'Design, build and deploy autonomous agents with LangGraph, CrewAI, browser agents and MCP.', img: 'courses/ai-agents-automation-deployment', level: 'Level 3', kicker: 'Professional Certificate in', title: 'AI Agents, Automation & Deployment', duration: '120 hours',
    intro: ['This Level 3 programme is designed for advanced undergraduates preparing for AI internships and careers in agentic AI systems. The focus is on AI agents, multi-agent architectures, browser agents and the Model Context Protocol (MCP): the frontier of applied AI today.', 'You gain a strong theoretical foundation along with hands-on experience designing, building and deploying autonomous AI agents that can reason, plan, use tools and work effectively in digital environments.'],
    modules: ['Introduction to AI Agents', 'Building AI Agents with LangGraph & CrewAI', 'Browser Agents', 'MCP, Tool Calling & Function Calling', 'Capstone Project', 'Assessments & Demo'],
    pdf: 'PROFESSIONAL CERTIFICATE IN AI AGENTS, AUTOMATION & DEPLOYMENT.pdf',
  },
  {
    slug: 'generative-ai-foundation-models-fmops', cat: 'Generative AI', blurb: 'A career-switch programme: foundation models, FMOps and a portfolio of real AI projects.', img: 'courses/generative-ai-foundation-models-fmops', level: 'Career programme', kicker: 'Professional Certificate in', title: 'Generative AI, Foundation Models & FMOps', duration: '360 hours',
    intro: ['This programme is designed for graduates and career switchers aiming to enter the AI job market. It balances theory, hands-on labs and capstone projects within a manageable 15-hour-per-week commitment.', 'You build a FutureX-hosted portfolio of AI projects while gaining practical experience in Generative AI, Machine Learning & Deep Learning, AI Agents, Foundation Model Customisation and FMOps. The programme also prepares you for the AWS AI Practitioner Certification.'],
    modules: ['AI & ML Fundamentals', 'Building AI Applications with AWS', 'Common GenAI Patterns', 'Model Customisation & Evaluation', 'Bringing AI to Production', 'Responsible AI, Security & Governance', 'Exam Preparation & Mock Tests'],
    pdf: 'PROFESSIONAL CERTIFICATION IN GENERATIVE AI, FOUNDATION MODELS & FMOPS.pdf',
  },
  {
    slug: 'ai-machine-learning', cat: 'AI & Data', blurb: 'Master AI, machine learning, deep learning, computer vision, NLP and LLMs with Python.', img: 'courses/ai-machine-learning', level: 'Professional', kicker: 'Professional Certificate in', title: 'AI and Machine Learning', duration: '180 hours',
    intro: ['AI and Machine Learning teaches the core concepts of Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision and Natural Language Processing, with a focus on Python programming, Large Language Models (LLMs), Transformer architectures, Prompt Engineering and full-stack AI application deployment.', 'You gain high proficiency in Python for AI using industry-standard frameworks and cloud platforms, master LLMs and Transformers with the Hugging Face ecosystem, and learn practical prompt engineering, deployment and responsible AI ethics.'],
    modules: ['AI & ML Fundamentals: Introduction to AI & Python Programming', 'Supervised & Unsupervised Learning and Machine Learning Applications', 'Introduction to Deep Learning', 'Deep Learning & Neural Networks', 'Computer Vision (OpenCV, YOLO)', 'Natural Language Processing & LLMs (Transformers, Hugging Face)', 'Generative AI & Integration', 'Comprehensive Practical Training & Capstone Projects'],
    pdf: 'AI AND MACHINE LEARNING.pdf',
  },
  {
    slug: 'full-stack-ml-engineer', cat: 'AI & Data', blurb: 'Design, build, deploy and maintain end-to-end machine learning systems, from data to production.', img: 'courses/full-stack-ml-engineer', level: 'Professional', kicker: 'Professional Certificate in', title: 'Full-Stack ML Engineer', duration: '180 hours',
    intro: ['Full-Stack ML Engineer teaches you how to design, build, deploy and maintain end-to-end machine learning systems, covering data engineering, MLOps, LLMs, cloud deployment, model optimisation for edge and production environments, and responsible AI practices.', 'You master data engineering, cloud deployment and MLOps workflows, develop and fine-tune Large Language Models, and optimise models for edge devices and high-throughput production environments.'],
    modules: ['Python, Maths for ML, SQL, FastAPI & Software Engineering Principles', 'Cloud Storage, Data Lakes, Apache Spark & Feature Engineering', 'Classical ML, Deep Learning, NLP, LLMs & MLflow', 'MLOps, CI/CD, Infrastructure as Code & Cloud ML Platforms', 'Model Compression, ONNX, TensorRT and Edge & Mobile Deployment', 'ML System Design, Ethics & Governance and Capstone Project'],
    pdf: 'PROFESSIONAL CERTIFICATE IN FULL-STACK ML ENGINEER.pdf',
  },
  {
    slug: 'data-science-analytics-bi', cat: 'AI & Data', blurb: 'Master the end-to-end data stack with Excel, Power BI, Tableau, Python, R and machine learning.', img: 'courses/data-science-analytics-bi', level: 'Professional', kicker: 'Professional Certificate in', title: 'Data Science, Analytics & Business Intelligence', duration: '180 hours',
    intro: ['Data Science, Analytics & Business Intelligence teaches you to master the end-to-end data stack, covering data analysis, business intelligence and advanced data science using core tools like Excel, Power BI, Tableau, Python, R and machine learning frameworks to transform raw data into strategic insights.', 'You gain hands-on mastery of Excel, Power BI, Tableau, Python and R, build, train and deploy ML and neural network models, and turn raw datasets into interactive visual reports and strategic business guidance.'],
    modules: ['Intro to Data Science & Analytics: Data Lifecycle, Statistics, Visualisation Fundamentals', 'Advanced Excel: Formulas, Power Pivot, G Suite, MIS Dashboards', 'Power BI: Data Transformation, DAX, M Language, Executive Dashboards', 'Tableau: Visual Formatting, Storyboarding, Cloud Publishing', 'Data Analysis with Python: Syntax, NumPy, Pandas, Matplotlib, Seaborn', 'Basics of R: Data Structures, Loops, dplyr, ggplot2'],
    pdf: 'DATA SCIENCE, ANALYTICS  BUSINESS INTELLIGENCE.pdf',
  },
  {
    slug: 'cyber-security-ethical-hacking', cat: 'Security', blurb: 'Defence strategies, penetration testing, network security and SIEM, aligned to ISO 27001, NIST and MITRE ATT&CK.', img: 'courses/cyber-security-ethical-hacking', level: 'Professional', kicker: 'Certificate Course in', title: 'Cyber Security & Ethical Hacking', duration: '180 hours',
    intro: ['Cyber Security & Ethical Hacking teaches essential defence strategies, vulnerability assessment, penetration testing techniques, network security and SIEM systems to protect digital assets and cloud environments, while applying global frameworks like ISO 27001, NIST and MITRE ATT&CK.', 'You learn to protect networks, applications and cloud environments from unauthorised access, damage and data breaches, identify weaknesses using authorised penetration testing, and gain hands-on expertise with SIEM systems.'],
    modules: ['Networking & InfoSec: OSI/TCP-IP, IPv4/IPv6, CIA Triad, AAA', 'Threat Landscape: Phishing, Ransomware, APTs, AI Cyber Threats', 'Cryptography: Symmetric/Asymmetric, PKI, Digital Signatures', 'Governance: Risk Management, ISO 27001, NIST CSF, MITRE ATT&CK', 'Vulnerability Assessment: OSINT, Scanning, Enumeration', 'Network Security: Firewalls, DMZ, VPNs, WPA2/WPA3 Wireless', 'Web & App Security: OWASP Top 10, API Security, OS Hardening', 'Cloud & SOC Operations: Cloud Models, SIEM, Incident Detection & Log Analysis'],
    pdf: 'CYBER SECURITY & ETHICAL HACKING.pdf',
  },
  {
    slug: 'full-stack-python-generative-ai', cat: 'Development', blurb: 'Build AI-powered web apps with Python, Django, React.js, SQL/NoSQL and Generative AI tools.', img: 'courses/full-stack-python-generative-ai', level: 'Professional', kicker: 'Professional Certificate in', title: 'Full-Stack Developer: Python with Generative AI', duration: '180 hours',
    intro: ['Full-Stack Development – Python with Generative AI teaches the core concepts of both front-end and back-end programming, with technologies like Python, Django, React.js, SQL/NoSQL databases, API integration and Generative AI tools for AI-assisted software development.', 'You build interactive web applications, develop scalable back ends with Python, Django, MySQL and MongoDB, and apply prompt engineering and AI APIs to deploy intelligent web applications with Git, GitHub and modern AI workflows.'],
    modules: ['UI/UX, HTML, CSS, JavaScript & Bootstrap', 'AJAX & API Integration, React.js', 'Python, MySQL, MongoDB & Django', 'Git & GitHub, Generative AI, Working with Servers & APIs', 'Capstone Project: a real-world project integrating all skills learned'],
    pdf: 'FULL-STACK DEVELOPMENT – PYTHON.pdf',
  },
  {
    slug: 'full-stack-mern', cat: 'Development', blurb: 'Build complete web apps with MongoDB, Express.js, React.js and Node.js.', img: 'courses/full-stack-mern', level: 'Professional', kicker: 'Professional Certificate in', title: 'Full-Stack Developer: MERN', duration: '180 hours',
    intro: ['Full Stack Web Development – MERN teaches the core concepts of both front-end and back-end programming, with the latest web technologies including Express.js, React.js, Node.js and NoSQL databases, covering the complete web development process.', 'You build responsive, interactive applications with HTML, CSS, JavaScript, React.js and Bootstrap, develop scalable server-side applications with Node.js and Express.js, manage data in MongoDB, and ship end-to-end apps with REST APIs, Git/GitHub and cloud deployment.'],
    modules: ['User Interface (UI) Design Principles', 'HTML5 & CSS3 Fundamentals', 'Responsive Web Design', 'JavaScript ES6+, jQuery & Bootstrap', 'Introduction to NoSQL Databases & MongoDB', 'Server-side Scripting using Node.js', 'Front-end Frameworks & React.js', 'Introduction to Cloud Computing, Git & GitHub'],
    pdf: 'FULL-STACK WEB DEVELOPER – MERN.pdf',
  },
  {
    slug: 'full-stack-mean', cat: 'Development', blurb: 'Build complete web apps with MongoDB, Express.js, Angular and Node.js.', img: 'courses/full-stack-mean', level: 'Professional', kicker: 'Professional Certificate in', title: 'Full-Stack Developer: MEAN', duration: '180 hours',
    intro: ['Full Stack Web Development – MEAN teaches the core concepts of both front-end and back-end programming, with the latest web development technologies like Express.js, Angular and Node.js, NoSQL databases and the complete web development process.', 'You build responsive web interfaces with HTML, CSS, JavaScript, Bootstrap and Angular, develop scalable server-side applications with Node.js and Express.js, manage NoSQL databases with MongoDB, and build complete applications with REST APIs, Git/GitHub and server deployment.'],
    modules: ['User Interface (UI) Design Principles', 'HTML & CSS Fundamentals', 'JavaScript, jQuery & Bootstrap', 'Introduction to NoSQL Databases & MongoDB', 'Server-side Scripting using Node.js', 'Back-end Frameworks & Express.js', 'Front-end Frameworks & Angular', 'Introduction to Cloud Computing, Git & GitHub'],
    pdf: 'FULL-STACK WEB DEVELOPER – MEAN.pdf',
  },
];


// The professional courses section and enquiry form list the same brochure courses.
export const COURSES: Course[] = FOCUS_COURSES.map((c) => ({ slug: c.slug, cat: c.cat, title: c.title, desc: c.blurb, duration: c.duration, level: c.level, img: `/media/${c.img}.jpg` }));
export const CATS = ['All', 'Generative AI', 'AI & Data', 'Development', 'Security'];
