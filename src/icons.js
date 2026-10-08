/* Ícones SVG (traço amarelo via currentColor) */
const S = (body, vb = '0 0 48 48', extra = '') =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${body}</svg>`;

const icons = {
  sink: S('<path d="M5 22h38v2a15 15 0 0 1-15 15h-8A15 15 0 0 1 5 24z"/><path d="M19 39v4h10v-4"/><path d="M22 22v-10a4 4 0 0 1 4-4h7a3 3 0 0 1 3 3v3"/><path d="M36 18v2M36 24v.5"/><path d="M15 6h10"/>'),
  toilet: S('<rect x="11" y="5" width="26" height="12" rx="2"/><path d="M7 17h34v2a17 17 0 0 1-11 16v7H18v-7A17 17 0 0 1 7 19z"/><path d="M19 11h10"/><path d="M14 22c2 5 6 8 10 8s8-3 10-8"/>'),
  drain: S('<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="11"/><g fill="currentColor" stroke="none"><circle cx="24" cy="24" r="2.4"/><circle cx="24" cy="17.5" r="2"/><circle cx="24" cy="30.5" r="2"/><circle cx="17.5" cy="24" r="2"/><circle cx="30.5" cy="24" r="2"/><circle cx="19.4" cy="19.4" r="1.7"/><circle cx="28.6" cy="28.6" r="1.7"/><circle cx="28.6" cy="19.4" r="1.7"/><circle cx="19.4" cy="28.6" r="1.7"/></g>'),
  sewer: S('<path d="M4 11h20a14 14 0 0 1 14 14v19"/><path d="M4 21h20a4 4 0 0 1 4 4v19"/><path d="M4 8v16M25 44h16"/><path d="M14 30c0 3-2 4-2 6a2 2 0 0 0 4 0c0-2-2-3-2-6z"/>'),
  pipes: S('<path d="M4 34h10V22a4 4 0 0 1 4-4h8v-6a4 4 0 0 1 4-4h6"/><path d="M4 42h14a4 4 0 0 0 4-4V26h8a4 4 0 0 0 4-4v-6h6"/><path d="M36 4v16M44 4v16M3 30v16M10 30v16" stroke-width="2.2"/>'),
  faucet: S('<path d="M10 20h16a6 6 0 0 1 6 6v4"/><path d="M10 13h16a13 13 0 0 1 13 13v4"/><path d="M6 10v14"/><path d="M18 13V6M13 6h10"/><path d="M35 36c0 3-2 4-2 6a2 2 0 0 0 4 0c0-2-2-3-2-6z"/>'),
  drop: S('<path d="M24 5s13 14 13 24a13 13 0 0 1-26 0C11 19 24 5 24 5z"/><path d="M18 30a6 6 0 0 0 6 6"/>'),
  tank: S('<path d="M8 15h32v24a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z"/><path d="M6 15c0-5 8-8 18-8s18 3 18 8"/><path d="M8 24h32"/><circle cx="24" cy="32" r="3"/>'),
  clock: S('<circle cx="24" cy="24" r="19" stroke-width="3.6"/><path d="M24 13v12l7 5" stroke-width="3.6"/>'),
  house: S('<path d="M5 23L24 7l19 16" stroke-width="3.4"/><path d="M10 19v22h28V19" stroke-width="3.4"/><path d="M20 41V29h8v12" stroke-width="3.4"/>'),
  shield: S('<path d="M24 4l17 6v12c0 11-7.5 18.5-17 22C14.5 40.5 7 33 7 22V10z" stroke-width="3.4"/><path d="M16 24l6 6 11-12" stroke-width="3.6"/>'),
  check: S('<path d="M10 25l9 9 19-20" stroke-width="5"/>'),
  arrow: S('<path d="M6 24h34M28 12l12 12-12 12" stroke-width="3.6"/>', '0 0 48 48', ' class="arrow"'),
  chevron: S('<path d="M12 18l12 12 12-12" stroke-width="4"/>'),
  up: S('<path d="M12 30l12-12 12 12" stroke-width="4.4"/>'),
  pin: S('<path d="M24 44s15-13.5 15-25a15 15 0 0 0-30 0c0 11.5 15 25 15 25z" fill="currentColor" stroke="none"/><circle cx="24" cy="19" r="5.5" fill="#111" stroke="none"/>'),
  pinLine: S('<path d="M24 44s15-13.5 15-25a15 15 0 0 0-30 0c0 11.5 15 25 15 25z"/><circle cx="24" cy="19" r="5.5"/>'),
  gift: S('<rect x="6" y="18" width="36" height="9" rx="1"/><path d="M9 27v16h30V27M24 18v25"/><path d="M24 18c-3-6-11-9-12-4s9 4 12 4zM24 18c3-6 11-9 12-4s-9 4-12 4z"/>'),
  phone: S('<path d="M13 5h-4a3 3 0 0 0-3 3c0 19 15 35 34 35a3 3 0 0 0 3-3v-5l-9-4-4 4C24 32 16 24 13 18l4-4-4-9z" stroke-width="3"/>'),
  menu: S('<path d="M7 13h34M7 24h34M7 35h34" stroke-width="3.6"/>'),
  close: S('<path d="M11 11l26 26M37 11L11 37" stroke-width="3.6"/>'),
  wrench: S('<path d="M30 6a10 10 0 0 0-9 14L6 35a4 4 0 0 0 7 7l15-15a10 10 0 0 0 14-9l-6 6-6-2-2-6 6-6c-1-1-3-4-4-4z"/>'),
  bolt: S('<path d="M27 4L9 28h14l-3 16 19-25H25z"/>'),
  noBreak: S('<rect x="6" y="6" width="36" height="36" rx="4"/><path d="M6 20h36M6 33h36M18 6v14M30 20v13M20 33v9"/><path d="M33 9l6 6" />'),
  calendar: S('<rect x="6" y="9" width="36" height="33" rx="4"/><path d="M6 19h36M15 5v8M33 5v8"/><path d="M15 28h4M22 28h4M29 28h4M15 35h4M22 35h4"/>'),
  money: S('<rect x="4" y="12" width="40" height="24" rx="3"/><circle cx="24" cy="24" r="6"/><path d="M10 18v0M38 30v0" stroke-width="4"/>'),
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3zm0 23.62c-1.98 0-3.92-.53-5.61-1.53l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64S26.66 10.13 26.66 16 21.9 26.62 16.04 26.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.08 1.3 3.3c.16.2 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z"/></svg>',
  instagram: S('<rect x="6" y="6" width="36" height="36" rx="10"/><circle cx="24" cy="24" r="8"/><circle cx="34.5" cy="13.5" r="1.6" fill="currentColor" stroke="none"/>'),
};

/* Ícone da marca (casa + cano + torneira + desentupidor) */
const logoIcon = `<svg class="logo-icon" viewBox="0 0 80 64" aria-hidden="true">
  <path d="M5 30L31 7l18 16" fill="none" stroke="#ffd21f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="40" y="8" width="7" height="12" rx="1" fill="#ffd21f"/>
  <path d="M11 26v20" stroke="#ffd21f" stroke-width="6" stroke-linecap="round"/>
  <rect x="5" y="45" width="44" height="13" rx="3" fill="#ffd21f"/>
  <rect x="22" y="42" width="9" height="19" rx="2" fill="#ffd21f" stroke="#0b0b0b" stroke-width="2"/>
  <path d="M24 30h11a4 4 0 0 1 4 4v4" fill="none" stroke="#ffd21f" stroke-width="5" stroke-linecap="round"/>
  <rect x="27" y="24" width="4" height="7" rx="1" fill="#ffd21f"/>
  <path d="M39 41.5c0 2-1.4 2.6-1.4 4a1.4 1.4 0 0 0 2.8 0c0-1.4-1.4-2-1.4-4z" fill="#ffd21f"/>
  <rect x="60" y="3" width="6" height="36" rx="3" fill="#fff"/>
  <path d="M52 58c0-11 4-18 11-18s11 7 11 18z" fill="#fff"/>
  <rect x="50" y="56" width="26" height="5" rx="2.5" fill="#fff"/>
</svg>`;

module.exports = { icons, logoIcon };
