// Quote form: validation, then email via sendEnquiry().
import { sendEnquiry, type Enquiry } from './enquiry';
import { url } from '../lib/url';

export function initQuoteForm() {
  const form = document.querySelector<HTMLFormElement>('#quote-form');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('.quote-form__status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const key = form.dataset.key ?? '';
  const email = form.dataset.email ?? '';

  const setStatus = (text: string, kind: 'ok' | 'error' | '' = '') => {
    status.textContent = text;
    status.className = 'quote-form__status' + (kind ? ` is-${kind}` : '');
  };

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity()) el.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');

    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea'));
    let firstInvalid: HTMLElement | null = null;
    for (const f of fields) {
      if (f.name === 'botcheck' || f.type === 'radio') continue;
      if (typeof f.value === 'string' && f.type !== 'checkbox') f.value = f.value.trim();
      const ok = f.checkValidity();
      if (ok) f.removeAttribute('aria-invalid');
      else f.setAttribute('aria-invalid', 'true');
      if (!ok && !firstInvalid) firstInvalid = f;
    }
    if (firstInvalid) {
      setStatus('Please fill in your name, a valid phone number, email and the service you need.', 'error');
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    if (data.get('botcheck')) return; // bot

    const enquiry: Enquiry = {
      name: String(data.get('name')),
      phone: String(data.get('phone')),
      email: String(data.get('email')),
      service: String(data.get('service')),
      budget: String(data.get('budget') ?? ''),
      message: String(data.get('message') ?? ''),
      source: 'Quote form',
    };

    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Sending…';
    try {
      const result = await sendEnquiry(enquiry, key, email);
      if (result === 'sent') {
        window.location.href = url('/thank-you/');
        return;
      }
      setStatus('Your email app should open now. Please press send there.', 'ok');
    } catch {
      setStatus('Sorry, the message could not be sent. Please call or WhatsApp us.', 'error');
    }
    button.disabled = false;
    button.textContent = label;
  });
}
