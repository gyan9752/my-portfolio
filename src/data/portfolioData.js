// Single place to edit all portfolio content. Keep copy short — the design does the talking.

export const personal = {
  name: 'Gyanvendra',
  surname: 'Mishra',
  initials: 'GM',
  email: 'gyanvendram@gmail.com',
  phone: '+91 9026926216',
  location: 'New Delhi, IN',
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
  },
];

export const journey = [
  { year: '2025', title: 'Joined Scriza', note: 'Full Stack Developer' },
  { year: '2025–26', title: 'Shipped 5 live products', note: 'EdTech · HRMS · Travel · AI' },
  { year: 'Now', title: 'Open to new roles', note: 'Full-time · Remote / Delhi', live: true },
];
