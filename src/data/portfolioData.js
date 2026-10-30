// Single place to edit all portfolio content. Keep copy short — the design does the talking.

export const personal = {
  name: 'Gyanvendra',
  surname: 'Mishra',
  initials: 'GM',
  email: 'gyanvendram@gmail.com',
  phone: '+91 9026926216',
  location: 'Noida, IN',
  photo: '/gyanvendra.jpg',
  roles: ['Full Stack Developer', 'React & Next.js', 'Node.js APIs', 'UI Animator'],
  socials: {
    github: 'https://github.com/gyan9752',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919026926216',
  },
};

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const marqueeRows = [
  ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
  ['PostgreSQL', 'Tailwind', 'TypeScript', 'REST APIs', 'Git'],
];

export const stats = [
  { value: 1, suffix: 'yr', label: 'Experience' },
  { value: 12, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '', label: 'Live sites' },
  { value: 95, suffix: '+', label: 'Lighthouse' },
];

// Orbit rings for the Stack section (inner → outer)
export const orbitRings = [
  { radius: 120, duration: 28, items: ['React', 'Next.js', 'Redux'] },
  { radius: 205, duration: 42, reverse: true, items: ['Node', 'Express', 'REST', 'JWT', 'Redis'] },
  { radius: 290, duration: 60, items: ['MongoDB', 'PostgreSQL', 'Tailwind', 'TypeScript', 'Git', 'Vercel'] },
];

export const projects = [
  {
    id: 1,
    slug: 'scriza',
    number: '01',
    title: 'Scriza',
    category: 'Enterprise · AI',
    tagline: 'Enterprise web platform with AI automation.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    features: ['Solutions hub', 'Secured REST APIs', 'Lead pipeline'],
    liveUrl: 'https://www.scriza.in/',
    githubUrl: 'https://github.com/gyan9752',
    theme: { a: '#c8ff3d', b: '#12c2a0' },
    layout: 'dashboard',
    heroImage: '/projects/scriza/hero.png',
    gallery: [
      {
        url: '/projects/scriza/hero.png',
        title: 'Enterprise AI & Consultation Hub',
        caption: 'High-conversion hero with real-time lead qualification funnel and strategy booking.',
      },
      {
        url: '/projects/scriza/tech-stack.png',
        title: 'Full-Stack Engineering & Tech Stack',
        caption: 'Modern frontend & backend architectures (React, Angular, Node.js, Cloud DBs).',
      },
      {
        url: '/projects/scriza/solutions.png',
        title: 'Client Projects & Engineering Solutions',
        caption: 'Production portfolio displaying custom software, HRMS ecosystems, and web platforms.',
      },
      {
        url: '/projects/scriza/about.png',
        title: 'Agile Engineering Culture & ISO Standards',
        caption: 'Certified enterprise agile development workflows and cross-functional delivery team.',
      },
    ],
  },
  {
    id: 2,
    slug: 'thetechtraining',
    number: '02',
    title: 'TheTechTraining',
    category: 'EdTech',
    tagline: 'Course roadmaps and instant enrollment.',
    tags: ['React', 'Express', 'MongoDB', 'Tailwind'],
    features: ['Curriculum roadmaps', 'Batch seat tracker', 'Callback scheduler'],
    liveUrl: 'https://www.thetechtraining.in/',
    githubUrl: 'https://github.com/gyan9752',
    theme: { a: '#7c5cff', b: '#4fb7ff' },
    layout: 'cards',
    heroImage: '/projects/thetechtraining/hero.png',
    gallery: [
      {
        url: '/projects/thetechtraining/hero.png',
        title: 'Job-Ready Academy & Course Pathways',
        caption: 'Full-stack career programs, 1:1 mentorship, and 1200+ student enrollment portal.',
      },
      {
        url: '/projects/thetechtraining/curriculum.png',
        title: 'MERN Stack Training & Live Internship Funnel',
        caption: 'Detailed curriculum roadmap, seat reservation engine, and instant syllabus downloads.',
      },
      {
        url: '/projects/thetechtraining/partners.png',
        title: 'Enterprise Hiring Pipeline & Career Network',
        caption: '100+ hiring partners dashboard showcasing 80% placement rate and salary benchmarks.',
      },
      {
        url: '/projects/thetechtraining/contact.png',
        title: 'Student Support & Campus Operations',
        caption: 'Integrated Greater Noida campus location, 24/7 WhatsApp live support, and counseling team.',
      },
    ],
  },
  {
    id: 3,
    slug: 'hrvico',
    number: '03',
    title: 'HRVico',
    category: 'HRMS · SaaS',
    tagline: 'Attendance, payroll and leave in one place.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST'],
    features: ['Biometric sync', 'Payslip generator', 'Role-based access'],
    liveUrl: 'https://hrvico.com/',
    githubUrl: 'https://github.com/gyan9752',
    theme: { a: '#ff5d8f', b: '#ffb04f' },
    layout: 'table',
    heroImage: '/projects/hrvico/hero.png',
    gallery: [
      {
        url: '/projects/hrvico/hero.png',
        title: 'Cloud HRMS SaaS & Multi-Device Workspace',
        caption: 'Unified workforce management, attendance, leave tracking, and payroll on all viewports.',
      },
      {
        url: '/projects/hrvico/features.png',
        title: 'Workforce Operations & Real-Time HR Roster',
        caption: 'Eliminating spreadsheets with centralized employee profiles, biometrics, and leave approvals.',
      },
      {
        url: '/projects/hrvico/admin-panel.png',
        title: 'Multi-Role Architecture & Command Center',
        caption: 'Super admin dashboard, multi-company tenant provisioning, subscription billing, and telemetry.',
      },
      {
        url: '/projects/hrvico/about.png',
        title: 'Human-Centric HR Innovation & Analytics',
        caption: 'Product vision, scalable company profiles, and self-service employee portal ecosystem.',
      },
    ],
  },
  {
    id: 4,
    slug: 'edu2all',
    number: '04',
    title: 'Edu2All',
    category: 'Admissions',
    tagline: 'Find the right college in milliseconds.',
    tags: ['React', 'Express', 'MongoDB', 'Tailwind'],
    features: ['Multi-filter search', 'College compare', 'Counseling funnel'],
    liveUrl: 'https://edu2all.in/',
    githubUrl: 'https://github.com/gyan9752',
    theme: { a: '#4fb7ff', b: '#7c5cff' },
    layout: 'cards',
    heroImage: '/projects/edu2all/hero.png',
    gallery: [
      {
        url: '/projects/edu2all/hero.png',
        title: '20+ Module School ERP & Demo Engine',
        caption: 'All-in-one educational administration software with rapid demo request and enrollment funnel.',
      },
      {
        url: '/projects/edu2all/why-us.png',
        title: 'Enterprise Security & Intuitive Usability',
        caption: 'GDPR compliance, ISO/IEC 27001 data protection, and customer-centric school workflows.',
      },
      {
        url: '/projects/edu2all/erp-modules.png',
        title: 'Digital Campus Knowledge Hub & Insights',
        caption: 'Real-time updates, administrator operations, and student records management guides.',
      },
      {
        url: '/projects/edu2all/contact.png',
        title: 'School Onboarding & Direct Support Channel',
        caption: 'Direct campus inquiry form, operations schedule, and institutional communication center.',
      },
    ],
  },
  {
    id: 5,
    slug: 'jawai-safari',
    number: '05',
    title: 'Jawai Safari',
    category: 'Travel · Booking',
    tagline: 'Leopard safari booking, edge-fast.',
    tags: ['Next.js 14', 'Tailwind', 'Vercel Edge'],
    features: ['Live slot availability', 'WhatsApp booking', 'Lighthouse 99'],
    liveUrl: 'https://jawai-safari-nextjs-2.vercel.app/',
    githubUrl: 'https://github.com/gyan9752',
    theme: { a: '#ffb04f', b: '#ff5d5d' },
    layout: 'hero',
    heroImage: '/projects/jawai-safari/hero.png',
    gallery: [
      {
        url: '/projects/jawai-safari/hero.png',
        title: 'Wildlife Expedition & Granite Hills Hero',
        caption: 'Award-winning leopard tracking experience set in rugged Rajasthan granite wilderness.',
      },
      {
        url: '/projects/jawai-safari/hills.png',
        title: 'Conservation & Rabari Shepherd Heritage',
        caption: 'Zero-zoo ethos with 40+ wild leopards tracked alongside native shepherd communities.',
      },
      {
        url: '/projects/jawai-safari/sunrise-circuit.png',
        title: 'Sunrise Safari Circuit & 4x4 Gypsy Booking',
        caption: '3.5-hour dawn tracker expedition, naturalist-guided routes, and edge-fast booking slots.',
      },
      {
        url: '/projects/jawai-safari/tents-suites.png',
        title: 'Luxury Granite Camps & Boutique Suites',
        caption: 'Rock View Tents, Den Suites, and Watchtower Suites built into ancient natural stone ridges.',
      },
      {
        url: '/projects/jawai-safari/booking.png',
        title: 'Edge-Fast Jeep Reservation & Enquiry Funnel',
        caption: 'Strict 6-seat cap per vehicle, airport transfer logistics, and real-time reservation processing.',
      },
    ],
  },
];

export const journey = [
  { year: '2025', title: 'Joined Scriza', note: 'Full Stack Developer' },
  { year: '2025–26', title: 'Shipped 5 live products', note: 'EdTech · HRMS · Travel · AI' },
  { year: 'Now', title: 'Open to new roles', note: 'Full-time · Remote / Delhi', live: true },
];
