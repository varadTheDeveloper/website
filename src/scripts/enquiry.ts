// Sends an enquiry by email through Web3Forms (https://web3forms.com).
// Without an access key, it opens the visitor's email app with the details filled in.

const ENDPOINT = 'https://api.web3forms.com/submit';

export interface Enquiry {
  name: string;
  phone: string;
  email?: string;
  service: string;
  budget?: string;
  message?: string;
  source: 'Quote form' | 'Chatbot';
}

export const PHONE_RE = /^[+0-9 ()-]{10,16}$/;

export function summarise(e: Enquiry): string {
  return [
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email || '-'}`,
    `Service: ${e.service}`,
    `Budget: ${e.budget || '-'}`,
    `Message: ${e.message || '-'}`,
    `Source: ${e.source}`,
  ].join('\n');
}

/** Returns 'sent' when delivered, 'mailto' when the email app was opened. Throws on failure. */
export async function sendEnquiry(e: Enquiry, key: string, toEmail: string): Promise<'sent' | 'mailto'> {
  if (!key) {
    const subject = `New enquiry: ${e.service}`;
    window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summarise(e))}`;
    return 'mailto';
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: `New website enquiry (${e.source}): ${e.service}`,
      from_name: 'Website enquiry',
      name: e.name,
      phone: e.phone,
      email: e.email || '-',
      ...(e.email ? { replyto: e.email } : {}),
      service: e.service,
      budget: e.budget || '-',
      message: e.message || '-',
      source: e.source,
      botcheck: '',
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  if (!res.ok || !json.success) throw new Error('send failed');
  return 'sent';
}
