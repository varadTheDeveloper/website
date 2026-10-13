// All real-world agency details live here. Change these before going live.

export const site = {
  name: 'Zentrova Digital',
  shortName: 'Zentrova',
  tagline: 'Websites & Digital Marketing that bring you enquiries',
  url: 'https://www.zentrova.in',

  // Placeholder contact details: replace with real ones.
  phone: '+91 90000 00000',
  phoneHref: 'tel:+919000000000',
  whatsappHref: 'https://wa.me/919000000000?text=' + encodeURIComponent('Hi Zentrova, I would like to discuss a project.'),
  email: 'hello@zentrova.in',
  city: 'Jalna',
  address: 'Jalna, Maharashtra, India',
  hours: 'Mon–Sat, 10:00–19:00',
  foundedYear: 2019,

  social: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
    youtube: '#',
  },

  // true = demo data on the page: shows the "Demo site" bar and tells search engines not to index.
  // Set to false ONLY after all clients, numbers and testimonials below are real.
  demoMode: true,
} as const;
