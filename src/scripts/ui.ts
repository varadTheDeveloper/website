import { initQuoteForm } from './form';

document.documentElement.classList.add('js');

// Header shadow on scroll
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const nav = document.getElementById('site-nav');
const setNav = (open: boolean) => {
  nav?.classList.toggle('is-open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
toggle?.addEventListener('click', () => setNav(!nav?.classList.contains('is-open')));
nav?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setNav(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNav(false);
});

// Modals (native <dialog>)
document.querySelectorAll<HTMLElement>('[data-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const dialog = document.getElementById(btn.dataset.open!) as HTMLDialogElement | null;
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add('has-modal');
  });
});
document.querySelectorAll<HTMLDialogElement>('dialog.modal').forEach((dialog) => {
  dialog.addEventListener('close', () => document.body.classList.remove('has-modal'));
  dialog.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    // Click on the backdrop (the dialog itself) or on a close control.
    if (target === dialog || target.closest('[data-close]')) dialog.close();
  });
});

// Count-up numbers
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animateCount = (el: HTMLElement) => {
  const end = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1400;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(end * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// Reveal on scroll
const revealTargets = document.querySelectorAll<HTMLElement>(
  '.section-head, .feature, .service-card, .value__cards li, .work-grid > li, .industry-grid > li, .process__step, .tools__group, .testimonial, .faq__item',
);

if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (el.dataset.count) animateCount(el);
        else el.classList.add('is-visible');
        io.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  revealTargets.forEach((el, i) => {
    el.dataset.reveal = '';
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
  counters.forEach((el) => {
    el.textContent = '0';
    io.observe(el);
  });
}

// Buttons that pre-select a service in the quote form
document.querySelectorAll<HTMLElement>('[data-service]').forEach((el) => {
  el.addEventListener('click', () => {
    const select = document.querySelector<HTMLSelectElement>('#qf-service');
    if (select) select.value = el.dataset.service!;
  });
});

initQuoteForm();
