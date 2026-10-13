// Page content. Everything marked DEMO is sample data: replace with real data before setting demoMode to false.

export type IconName =
  | 'code' | 'megaphone' | 'pen' | 'search' | 'cart' | 'chart' | 'phone' | 'share' | 'video'
  | 'map' | 'wrench' | 'mail' | 'rocket' | 'target' | 'shield' | 'clock' | 'users' | 'spark';

export const heroPoints = [
  'Fast, mobile-first websites',
  'SEO, Google & Meta Ads',
  'Clear monthly reports',
];

// DEMO: fictional client names shown as text logos.
export const clients = [
  'Sahyadri Foods', 'NovaCare Clinic', 'Urban Nest Realty', 'Vidya Academy', 'Shree Agro',
  'Kraft & Co.', 'Pulse Fitness', 'Godavari Motors', 'Bloom Boutique', 'TechNova Labs',
];

export const mainServices = [
  {
    id: 'web',
    eyebrow: 'Website Design & Development',
    title: 'A website that works as your best salesperson',
    text: 'We design and build fast, secure websites that look good on every phone and turn visitors into enquiries. You get a site you can update yourself, with hosting and support handled for you.',
    points: ['Custom design, no ready-made themes', 'Loads in under 2 seconds', 'Booking, payments and WhatsApp built in', 'Admin panel to update content'],
    cta: 'Plan My Website',
    service: 'Website Design & Development',
    visual: 'browser',
  },
  {
    id: 'marketing',
    eyebrow: 'Digital Marketing',
    title: 'Reach people who are already searching for you',
    text: 'Search engine optimisation, Google Ads and Meta Ads planned around one number: qualified leads. Every rupee is tracked, and you get a simple report each month.',
    points: ['Local SEO & Google Business Profile', 'Google Search & Performance Max', 'Instagram & Facebook ads', 'Monthly report in plain language'],
    cta: 'Get More Leads',
    service: 'Google / Meta Ads',
    visual: 'chart',
  },
  {
    id: 'brand',
    eyebrow: 'Branding & Social Media',
    title: 'A brand people remember and trust',
    text: 'Logo, colours, brand voice and a monthly social media calendar with posts and reels that match your business, so you look consistent everywhere.',
    points: ['Logo & brand guidelines', 'Monthly content calendar', 'Reels, posts and stories', 'Brochures and print design'],
    cta: 'Build My Brand',
    service: 'Branding & Logo',
    visual: 'social',
  },
] as const;

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: 'code', title: 'Custom Websites', text: 'Business, portfolio and landing pages built for speed and enquiries.' },
  { icon: 'cart', title: 'E-commerce Stores', text: 'Online shops with payments, inventory and order tracking.' },
  { icon: 'wrench', title: 'Web Apps & Portals', text: 'Booking systems, dashboards, CRMs and customer portals.' },
  { icon: 'search', title: 'SEO', text: 'Rank on Google for the searches that bring you customers.' },
  { icon: 'target', title: 'Google & Meta Ads', text: 'Paid campaigns tuned for leads, not just clicks.' },
  { icon: 'share', title: 'Social Media Management', text: 'Planned posts, reels and community replies every month.' },
  { icon: 'map', title: 'Local Business Listing', text: 'Google Business Profile set-up, reviews and map visibility.' },
  { icon: 'pen', title: 'Logo & Branding', text: 'Identity, colours and guidelines that make you stand out.' },
  { icon: 'video', title: 'Video & Reels', text: 'Short videos and motion graphics for ads and social.' },
];

// DEMO numbers.
export const stats = [
  { value: 7, suffix: '+', label: 'Years of experience' },
  { value: 250, suffix: '+', label: 'Websites delivered' },
  { value: 180, suffix: '+', label: 'Happy clients' },
  { value: 12, suffix: '+', label: 'Industries served' },
];

export const industries: { icon: IconName; name: string; text: string; work: string[] }[] = [
  { icon: 'shield', name: 'Healthcare', text: 'Clinics, hospitals and diagnostic labs.', work: ['Appointment booking websites', 'Local SEO for "near me" searches', 'Patient-friendly content in simple language'] },
  { icon: 'map', name: 'Real Estate', text: 'Builders, brokers and property projects.', work: ['Project landing pages with floor plans', 'Lead ads with instant call-back', 'Virtual tour and brochure downloads'] },
  { icon: 'users', name: 'Education', text: 'Schools, coaching classes and colleges.', work: ['Admission enquiry campaigns', 'Course pages and fee forms', 'Parent and student portals'] },
  { icon: 'cart', name: 'Retail & E-commerce', text: 'Shops and D2C brands selling online.', work: ['Online stores with UPI and cards', 'Catalogue ads on Instagram and Google', 'Abandoned cart reminders'] },
  { icon: 'wrench', name: 'Manufacturing', text: 'Factories, exporters and B2B suppliers.', work: ['Product catalogue websites', 'B2B lead generation on Google', 'Export-ready multilingual pages'] },
  { icon: 'spark', name: 'Professional Services', text: 'Lawyers, CAs, consultants and agencies.', work: ['Trust-first websites with online booking', 'Content and blogs that answer client questions', 'Compliance-aware wording'] },
  { icon: 'clock', name: 'Hospitality', text: 'Hotels, restaurants and cafés.', work: ['Direct booking websites', 'Menus, offers and Google Maps visibility', 'Reels and influencer campaigns'] },
  { icon: 'rocket', name: 'Startups', text: 'New brands launching their first product.', work: ['Brand identity from scratch', 'MVP websites and web apps', 'Launch campaigns'] },
];

// Portfolio. Lexauraa is a real project; the others are DEMO.
export const portfolio = [
  {
    id: 'lexauraa',
    name: 'Lexauraa Law Firm',
    category: 'Website · Booking · CRM',
    color: '#6B4F3A',
    accent: '#EFE7DF',
    summary: 'A three-language (Marathi, Hindi, English) website for a law firm in Jalna with a privacy-first chatbot, online video consultation booking with Google Meet, a blog and a private admin panel with CRM.',
    tags: ['Astro', 'Express', 'PostgreSQL', 'AWS'],
    demo: false,
  },
  {
    id: 'novacare',
    name: 'NovaCare Clinic',
    category: 'Website · Local SEO',
    color: '#0E7C86',
    accent: '#DDF3F4',
    summary: 'Clinic website with doctor profiles, appointment requests and a Google Business Profile clean-up for local searches.',
    tags: ['Website', 'SEO', 'Google Business'],
    demo: true,
  },
  {
    id: 'urbannest',
    name: 'Urban Nest Realty',
    category: 'Landing Pages · Google Ads',
    color: '#1F3A93',
    accent: '#E3E9FA',
    summary: 'Project landing pages with floor plans and brochure downloads, connected to Google and Meta lead campaigns.',
    tags: ['Landing page', 'Google Ads', 'Meta Ads'],
    demo: true,
  },
  {
    id: 'bloom',
    name: 'Bloom Boutique',
    category: 'E-commerce · Social',
    color: '#B83B5E',
    accent: '#FBE4EB',
    summary: 'Online store with UPI payments, a product catalogue on Instagram and a monthly reels calendar.',
    tags: ['E-commerce', 'Instagram', 'Reels'],
    demo: true,
  },
  {
    id: 'vidya',
    name: 'Vidya Academy',
    category: 'Website · Admissions Campaign',
    color: '#E07A1F',
    accent: '#FDEEDD',
    summary: 'Coaching institute website with course pages and an admission season campaign on Google and Instagram.',
    tags: ['Website', 'Lead ads', 'SEO'],
    demo: true,
  },
  {
    id: 'shreeagro',
    name: 'Shree Agro',
    category: 'B2B Catalogue · Branding',
    color: '#3E7C3A',
    accent: '#E3F1E1',
    summary: 'New logo and brand guidelines, plus a product catalogue website for dealers and export enquiries.',
    tags: ['Branding', 'Catalogue', 'B2B'],
    demo: true,
  },
];

export const process: { title: string; text: string; icon: IconName }[] = [
  { icon: 'phone', title: 'Free discovery call', text: 'We understand your business, customers and goals in a 30-minute call.' },
  { icon: 'target', title: 'Plan & proposal', text: 'A clear plan with scope, timeline and a fixed quote. No hidden costs.' },
  { icon: 'pen', title: 'Design & build', text: 'You see designs first, give feedback, then we build and test on every device.' },
  { icon: 'rocket', title: 'Launch & grow', text: 'We go live, set up tracking and keep improving with monthly reports.' },
];

export const tools = [
  { group: 'Web', items: ['Astro', 'React', 'Next.js', 'WordPress', 'Shopify', 'Node.js'] },
  { group: 'Marketing', items: ['Google Ads', 'Meta Ads', 'Search Console', 'GA4', 'Semrush', 'Tag Manager'] },
  { group: 'Design & Content', items: ['Figma', 'Canva', 'Adobe Illustrator', 'Premiere Pro', 'CapCut'] },
  { group: 'Cloud & Tracking', items: ['AWS', 'Cloudflare', 'Vercel', 'Hotjar', 'Looker Studio'] },
];

// DEMO testimonials: fictional people. Never publish these as real.
export const testimonials = [
  { quote: 'They rebuilt our clinic website in three weeks. Patients now book from their phones and the calls to our front desk have come down a lot.', name: 'Dr. Priya Kulkarni', role: 'Founder, NovaCare Clinic' },
  { quote: 'Clear communication, honest advice and reports we can actually understand. Our Google Ads finally make sense.', name: 'Rahul Deshmukh', role: 'Director, Urban Nest Realty' },
  { quote: 'Our Instagram looks professional now and the online store runs without any trouble during festival sales.', name: 'Sneha Patil', role: 'Owner, Bloom Boutique' },
  { quote: 'From the logo to the website, everything feels like one brand. Dealers take us more seriously.', name: 'Amit Jadhav', role: 'Partner, Shree Agro' },
];

export const faqs = [
  { q: 'How much does a website cost?', a: 'It depends on the number of pages and features. After a short call we send a fixed quote, so you know the full cost before we start. Hosting and yearly renewal are listed separately.' },
  { q: 'How long does it take to build a website?', a: 'A business website usually takes 2 to 4 weeks. E-commerce stores and web apps take longer; we share a week-by-week timeline in the proposal.' },
  { q: 'Will I be able to update the website myself?', a: 'Yes. We set up an easy admin panel and show you how to change text, photos and blog posts. We are also available for changes whenever you need them.' },
  { q: 'When will I see results from SEO?', a: 'SEO usually shows clear movement in 3 to 6 months. Google and Meta ads can bring enquiries from the first week. We recommend a mix of both.' },
  { q: 'Do I need to sign a long contract for marketing?', a: 'No. Marketing plans are monthly. We suggest at least 3 months so there is enough data to improve campaigns, but you can stop with 30 days notice.' },
  { q: 'Who owns the website and the ad accounts?', a: 'You do. The domain, website code, Google and Meta ad accounts are set up in your name, and we work on them with your permission.' },
  { q: 'Do you work with businesses outside Jalna?', a: 'Yes. We work with clients across Maharashtra and India over calls, video meetings and WhatsApp.' },
  { q: 'What happens after I submit the form?', a: 'We call you back within one working day to understand your needs. There is no charge and no obligation for this first conversation.' },
];
