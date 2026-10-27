// Simple (non-AI) chatbot: fixed topics with ready answers, plus a short enquiry flow.
// Answers come from the FAQ in content.ts where possible, so they stay in one place.
import { site } from '../config/site';
import { url } from '../lib/url';
import { faqs, services } from './content';

const faq = (startsWith: string) => {
  const found = faqs.find((f) => f.q.startsWith(startsWith));
  if (!found) throw new Error(`FAQ not found: ${startsWith}`);
  return found.a;
};

export interface ChatLink { label: string; href: string; external?: boolean }
export interface ChatTopic {
  id: string;
  label: string; // quick-reply chip text
  keywords: string[]; // lower-case words matched against typed text
  answer: string[]; // one bubble per item
  links?: ChatLink[];
  menu?: boolean; // show in the main menu
}

const whatsapp: ChatLink = { label: 'WhatsApp us', href: site.whatsappHref, external: true };
const call: ChatLink = { label: `Call ${site.phone}`, href: site.phoneHref };

export const chatTopics: ChatTopic[] = [
  {
    id: 'cost',
    label: 'Website cost',
    keywords: ['cost', 'price', 'pricing', 'charge', 'fee', 'fees', 'rate', 'budget', 'quote', 'how much', 'kitna', 'paisa', 'rupees', '₹'],
    answer: [faq('How much does a website cost'), 'Want a fixed quote? I can take your details and our team will call you back.'],
    menu: true,
  },
  {
    id: 'time',
    label: 'How long it takes',
    keywords: ['long', 'time', 'days', 'weeks', 'timeline', 'deadline', 'fast', 'quick', 'when'],
    answer: [faq('How long does it take')],
    menu: true,
  },
  {
    id: 'services',
    label: 'What you offer',
    keywords: ['service', 'services', 'offer', 'provide', 'ecommerce', 'e-commerce', 'shop', 'store', 'app', 'logo', 'branding', 'video', 'listing'],
    answer: ['Here is what we do:', services.map((s) => `• ${s.title}`).join('\n'), 'Pick a topic below or tell me what you need.'],
    menu: true,
  },
  {
    id: 'seo',
    label: 'SEO & Google Ads',
    keywords: ['seo', 'google', 'rank', 'ranking', 'search', 'ads', 'advertising', 'ppc', 'meta', 'facebook ads', 'leads', 'marketing'],
    answer: [
      'We do local SEO, Google Business Profile, Google Search ads and Instagram/Facebook ads, all planned around qualified leads, with a plain-language report every month.',
      faq('When will I see results from SEO'),
    ],
    menu: true,
  },
  {
    id: 'social',
    label: 'Social media',
    keywords: ['social', 'instagram', 'insta', 'facebook', 'posts', 'post', 'reel', 'reels', 'content', 'calendar'],
    answer: ['We plan a monthly content calendar and create posts, reels and stories that match your brand, and reply to comments if you want.', faq('Do I need to sign a long contract')],
    menu: true,
  },
  {
    id: 'work',
    label: 'See your demos',
    keywords: ['work', 'demo', 'demos', 'portfolio', 'projects', 'examples', 'samples', 'case'],
    answer: ['You can see our demo websites on this page.'],
    links: [{ label: 'Show demos', href: url('/#work') }],
    menu: true,
  },
  {
    id: 'update',
    label: 'Can I update it myself?',
    keywords: ['update', 'edit', 'change', 'admin', 'cms', 'myself', 'manage'],
    answer: [faq('Will I be able to update')],
  },
  {
    id: 'own',
    label: 'Who owns the website?',
    keywords: ['own', 'owner', 'ownership', 'domain', 'hosting', 'account'],
    answer: [faq('Who owns the website')],
  },
  {
    id: 'where',
    label: 'Where are you?',
    keywords: ['where', 'location', 'address', 'office', 'city', 'pune', 'outside', 'remote', 'online'],
    answer: [`We are in ${site.address}. ${faq('Do you work with businesses outside')}`],
  },
  {
    id: 'human',
    label: 'Talk to a person',
    keywords: ['human', 'person', 'talk', 'call', 'phone', 'contact', 'whatsapp', 'number', 'email', 'agent', 'someone'],
    answer: [`You can reach our team ${site.hours}.`, 'Or leave your number here and we will call you back.'],
    links: [call, whatsapp],
    menu: true,
  },
];

export const chatText = {
  title: `${site.shortName} Assistant`,
  subtitle: 'Automated helper · replies instantly',
  launcher: 'Chat with us',
  greeting: [`Hi! 👋 I'm the ${site.shortName} assistant.`, 'I can answer common questions or pass your details to our team. What would you like to know?'],
  fallback: "Sorry, I'm a simple assistant and didn't catch that. Choose a topic below, or leave your number and a person will call you.",
  leadStart: 'Get a free quote',
  leadIntro: "Great! I'll ask 3 quick questions. What's your name?",
  askPhone: "Thanks, {name}. What's the best phone number to reach you?", // {name} is filled in by the chat script
  badPhone: 'That number does not look right. Please type a 10-digit mobile number (you can add +91).',
  askService: 'What do you need help with?',
  confirm: 'Please check your details:',
  consent: 'By sending, you agree that we may contact you about your enquiry (see our privacy policy).',
  send: 'Send to the team',
  restart: 'Start again',
  sending: 'Sending…',
  sent: 'Done! ✅ Our team will call you within one working day.',
  mailto: 'Your email app should open with your details. Please press send there.',
  failed: 'Sorry, that did not go through. Please call or WhatsApp us instead.',
  anythingElse: 'Anything else?',
  placeholder: 'Type your question…',
  placeholderName: 'Your name',
  placeholderPhone: 'Mobile number',
  serviceOptions: ['Website', 'E-commerce store', 'SEO / Google Ads', 'Social media', 'Branding & logo', 'Not sure yet'],
  links: { whatsapp, call },
};
