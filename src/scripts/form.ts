// Sends the quote form by email through Web3Forms (https://web3forms.com).
// Without an access key, it opens the visitor's email app with the details filled in.

const ENDPOINT = 'https://api.web3forms.com/submit';

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

    const name = String(data.get('name'));
    const service = String(data.get('service'));
    const summary = [
      `Name: ${name}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Service: ${service}`,
      `Budget: ${data.get('budget') ?? '-'}`,
      `Message: ${data.get('message') || '-'}`,
    ].join('\n');

    if (!key) {
      const subject = `New enquiry: ${service}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
      setStatus('Your email app should open now. Please press send there.', 'ok');
      return;
    }

    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Sending…';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `New website enquiry: ${service}`,
          from_name: 'Website enquiry',
          name,
          phone: data.get('phone'),
          email: data.get('email'),
          replyto: data.get('email'),
          service,
          budget: data.get('budget'),
          message: data.get('message') || '-',
          botcheck: '',
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error('send failed');
      window.location.href = '/thank-you/';
    } catch {
      setStatus('Sorry, the message could not be sent. Please call or WhatsApp us.', 'error');
      button.disabled = false;
      button.textContent = label;
    }
  });
}
