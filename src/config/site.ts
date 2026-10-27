// All real-world agency details live here. Change these before going live.

export const site = {
  name: 'The GrowthStep',
  shortName: 'GrowthStep',
  tagline: 'Websites & Digital Marketing that bring you enquiries',
  url: 'https://www.thegrowthstep.com',

  phone: '+91 92091 82909',
  phoneHref: 'tel:+919209182909',
  whatsappHref: 'https://wa.me/919209182909?text=' + encodeURIComponent('Hi GrowthStep, I would like to discuss a project.'),
  email: 'contact@thegrowthstep.com',
  city: 'Pune',
  address: 'Pune, Maharashtra, India',
  hours: 'Mon–Sat, 10:00–19:00',
  foundedYear: 2019,

  social: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
    youtube: '#',
  },

  // true = demo data on the page: shows the "Demo site" bar and tells search engines not to index.
  // Set to false ONLY after the numbers in src/data/content.ts are real.
  demoMode: true,
  // Shows the yellow "Demo site" bar at the top. Turned off at the owner's request.
  showDemoBar: false,
} as const;
