// Simple (non-AI) chatbot. All text is inserted with textContent, never as HTML.
// Nothing is stored: the chat lives only in this page until the visitor sends an enquiry.
import type { ChatLink, ChatTopic, chatText as ChatTextType } from '../data/chatbot';
import { PHONE_RE, sendEnquiry } from './enquiry';

type Text = typeof ChatTextType;
type Mode = 'chat' | 'name' | 'phone' | 'service' | 'confirm' | 'busy';
interface Chip { label: string; onClick?: () => void; link?: ChatLink; primary?: boolean }

export function initChat() {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  const dataEl = document.getElementById('chat-data');
  if (!root || !dataEl) return;

  const { topics, text } = JSON.parse(dataEl.textContent || '{}') as { topics: ChatTopic[]; text: Text };
  const key = root.dataset.key ?? '';
  const toEmail = root.dataset.email ?? '';

  const toggle = root.querySelector<HTMLButtonElement>('[data-chat-toggle]')!;
  const panel = root.querySelector<HTMLElement>('.chat__panel')!;
  const log = root.querySelector<HTMLElement>('[data-chat-log]')!;
  const chips = root.querySelector<HTMLElement>('[data-chat-chips]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLInputElement>('[data-chat-input]')!;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;
  let mode: Mode = 'chat';
  const lead = { name: '', phone: '', service: '' };
  const asked = new Set<string>();

  // ---------- open / close ----------
  const setOpen = (open: boolean) => {
    panel.hidden = !open;
    root.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close chat' : text.launcher);
    document.body.classList.toggle('chat-open', open);
    if (open) {
      if (!started) {
        started = true;
        void bot(text.greeting, menuChips());
      }
      // Avoid popping the phone keyboard up straight away.
      if (window.matchMedia('(min-width: 761px)').matches) input.focus();
    } else {
      toggle.focus();
    }
  };
  toggle.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  root.querySelector('[data-chat-close]')!.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) setOpen(false);
  });

  // ---------- rendering ----------
  const scrollDown = () => {
    log.scrollTop = log.scrollHeight;
  };

  const bubble = (who: 'bot' | 'user', content: string | Node) => {
    const el = document.createElement('div');
    el.className = `chat__msg chat__msg--${who}`;
    if (typeof content === 'string') el.textContent = content;
    else el.append(content);
    log.append(el);
    scrollDown();
    return el;
  };

  const wait = (ms: number) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));

  const bot = async (messages: string[], next: Chip[] = []) => {
    setChips([]);
    for (const m of messages) {
      const typing = bubble('bot', '');
      typing.classList.add('chat__msg--typing');
      typing.setAttribute('aria-hidden', 'true');
      typing.append(document.createElement('i'), document.createElement('i'), document.createElement('i'));
      await wait(Math.min(900, 300 + m.length * 6));
      typing.remove();
      bubble('bot', m);
    }
    setChips(next);
  };

  const setChips = (list: Chip[]) => {
    chips.replaceChildren();
    for (const c of list) {
      let el: HTMLElement;
      if (c.link) {
        const a = document.createElement('a');
        a.href = c.link.href;
        if (c.link.external) {
          a.target = '_blank';
          a.rel = 'noopener';
        }
        if (c.link.href.startsWith('/#')) a.addEventListener('click', () => setOpen(false));
        el = a;
      } else {
        const b = document.createElement('button');
        b.type = 'button';
        b.addEventListener('click', () => c.onClick?.());
        el = b;
      }
      el.className = 'chat__chip' + (c.primary ? ' chat__chip--primary' : '');
      el.textContent = c.label;
      chips.append(el);
    }
    scrollDown();
  };

  const setInputMode = (m: Mode) => {
    mode = m;
    const placeholders: Partial<Record<Mode, string>> = { name: text.placeholderName, phone: text.placeholderPhone };
    input.placeholder = placeholders[m] ?? text.placeholder;
    input.type = m === 'phone' ? 'tel' : 'text';
    input.inputMode = m === 'phone' ? 'tel' : 'text';
    input.autocomplete = m === 'name' ? 'name' : m === 'phone' ? 'tel' : 'off';
    input.disabled = m === 'busy' || m === 'confirm';
  };

  // ---------- chips ----------
  const leadChip = (): Chip => ({ label: text.leadStart, primary: true, onClick: startLead });

  const menuChips = (exclude?: string): Chip[] => [
    leadChip(),
    ...topics.filter((t) => t.menu && t.id !== exclude).map((t) => ({ label: t.label, onClick: () => pickTopic(t) })),
  ];

  const afterAnswerChips = (t: ChatTopic): Chip[] => {
    const links = (t.links ?? []).map((link) => ({ label: link.label, link }));
    return [...links, leadChip(), ...menuChips(t.id).slice(1, 4), { label: 'More topics', onClick: showMore }];
  };

  const showMore = () => {
    void bot([text.anythingElse], [leadChip(), ...topics.map((t) => ({ label: t.label, onClick: () => pickTopic(t) }))]);
  };

  // ---------- topics ----------
  const pickTopic = (t: ChatTopic, typed?: string) => {
    if (mode !== 'chat') setInputMode('chat');
    bubble('user', typed ?? t.label);
    asked.add(t.label);
    void bot(t.answer, afterAnswerChips(t));
  };

  const matchTopic = (raw: string): ChatTopic | undefined => {
    const q = ` ${raw.toLowerCase().replace(/[^\p{L}\p{N}₹ ]+/gu, ' ').replace(/\s+/g, ' ')} `;
    let best: ChatTopic | undefined;
    let bestScore = 0;
    for (const t of topics) {
      let score = 0;
      for (const k of t.keywords) {
        if (k.includes(' ') || k === '₹' ? q.includes(k) : q.includes(` ${k} `)) score += k.includes(' ') ? 2 : 1;
      }
      if (score > bestScore) {
        best = t;
        bestScore = score;
      }
    }
    return best;
  };

  const wantsQuote = (raw: string) => /\b(quote|call me|callback|call back|contact me|interested)\b/i.test(raw);

  // ---------- lead flow ----------
  function startLead() {
    bubble('user', text.leadStart);
    setInputMode('name');
    void bot([text.leadIntro]).then(() => input.focus());
  }

  const askService = () => {
    setInputMode('service');
    void bot(
      [text.askService],
      text.serviceOptions.map((s) => ({
        label: s,
        onClick: () => {
          bubble('user', s);
          lead.service = s;
          showConfirm();
        },
      })),
    );
  };

  const showConfirm = () => {
    setInputMode('confirm');
    const card = document.createElement('dl');
    card.className = 'chat__summary';
    for (const [k, v] of [['Name', lead.name], ['Phone', lead.phone], ['Service', lead.service]]) {
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      card.append(dt, dd);
    }
    void bot([text.confirm]).then(() => {
      bubble('bot', card);
      const note = bubble('bot', text.consent);
      note.classList.add('chat__msg--note');
      setChips([
        { label: text.send, primary: true, onClick: submitLead },
        { label: text.restart, onClick: () => { bubble('user', text.restart); startLeadAgain(); } },
      ]);
    });
  };

  const startLeadAgain = () => {
    lead.name = lead.phone = lead.service = '';
    setInputMode('name');
    void bot([text.leadIntro]);
  };

  const submitLead = async () => {
    setChips([]);
    setInputMode('busy');
    const status = bubble('bot', text.sending);
    try {
      const result = await sendEnquiry(
        {
          name: lead.name,
          phone: lead.phone,
          service: lead.service,
          message: asked.size ? `Asked about: ${[...asked].join(', ')}` : '',
          source: 'Chatbot',
        },
        key,
        toEmail,
      );
      status.textContent = result === 'sent' ? text.sent : text.mailto;
      setInputMode('chat');
      setChips([{ label: text.links.whatsapp.label, link: text.links.whatsapp }, { label: 'More topics', onClick: showMore }]);
    } catch {
      status.textContent = text.failed;
      setInputMode('confirm');
      setChips([
        { label: text.send, primary: true, onClick: submitLead },
        { label: text.links.call.label, link: text.links.call },
        { label: text.links.whatsapp.label, link: text.links.whatsapp },
      ]);
    }
  };

  // ---------- typed input ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim().replace(/\s+/g, ' ');
    if (!value) return;
    input.value = '';

    if (mode === 'name') {
      bubble('user', value);
      if (value.length < 2) {
        void bot(['Please type your name.']);
        return;
      }
      lead.name = value.slice(0, 60);
      setInputMode('phone');
      void bot([text.askPhone.replace('{name}', lead.name)]);
      return;
    }
    if (mode === 'phone') {
      bubble('user', value);
      const digits = value.replace(/\D/g, '');
      if (!PHONE_RE.test(value) || digits.length < 10) {
        void bot([text.badPhone]);
        return;
      }
      lead.phone = value;
      askService();
      return;
    }
    if (mode === 'service') {
      bubble('user', value);
      lead.service = value.slice(0, 80);
      showConfirm();
      return;
    }

    // Free chat
    const topic = matchTopic(value);
    if (wantsQuote(value) && (!topic || topic.id !== 'cost')) {
      bubble('user', value);
      setInputMode('name');
      void bot([text.leadIntro]);
      return;
    }
    if (topic) {
      pickTopic(topic, value);
      return;
    }
    bubble('user', value);
    void bot([text.fallback], menuChips());
  });
}
