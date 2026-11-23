/* ==========================================================
   Gerador do site estático DesentopeJÁ
   Uso:  node src/build.js   (ou  npm run build)
   Gera todas as páginas HTML, sitemap.xml e robots.txt em /public
   ========================================================== */
const fs = require('fs');
const path = require('path');
const { site, services, cities, regions, testimonials, homeFaq } = require('./data');
const { icons: I } = require('./icons');

const OUT = path.join(__dirname, '..', 'public');
const TODAY = new Date().toISOString().slice(0, 10);
// Versão dos arquivos = hash do conteúdo: muda sempre que o arquivo muda,
// assim o navegador nunca usa um CSS/JS antigo guardado em cache.
const hashOf = (rel) => require('crypto').createHash('md5').update(fs.readFileSync(path.join(OUT, rel))).digest('hex').slice(0, 10);
const CSS_V = hashOf('assets/css/style.css');
const JS_V = hashOf('assets/js/main.js');
const isDesentupimento = (s) => s.slug.startsWith('desentupimento');

// Preenche campos padrão das cidades/regiões ("em Osasco", "na Zona Sul de São Paulo")
cities.forEach((c) => {
  c.short = c.short || c.name;
  c.em = c.em || `em ${c.name}`;
  c.de = c.de || `de ${c.name}`;
  c.prep = c.em.split(' ')[0];
  c.mapQuery = c.mapQuery || `${c.name}, SP`;
  c.title = c.title || `Desentupidora ${c.em} 24h | DesentopeJÁ`;
  c.description = c.description || `Desentupidora ${c.em} 24h: pia, ralo, vaso, esgoto, vazamentos e encanador. Atendimento rápido e orçamento grátis: 011 94541-6519.`;
});
const byRegion = regions.map((r) => ({ ...r, cities: cities.filter((c) => c.region === r.key) })).filter((r) => r.cities.length);
const spZones = cities.filter((c) => c.region === 'sp');
const placeSchema = (c) => (c.region === 'sp'
  ? { '@type': 'Place', name: c.name, containedInPlace: { '@type': 'City', name: 'São Paulo' } }
  : { '@type': 'City', name: c.name, containedInPlace: { '@type': 'State', name: 'São Paulo' } });
const desentupimentos = services.filter(isDesentupimento);

/* ---------------- helpers ---------------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const lower1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const abs = (p) => site.url + p;
const wa = (msg = site.whatsappMsg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
const svcUrl = (s) => `/${s.slug}/`;
const cityUrl = (c) => `/${c.slug}/`;
const list = (arr) => arr.length > 1 ? arr.slice(0, -1).join(', ') + ' e ' + arr[arr.length - 1] : arr.join('');

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

/* ---------------- botões ---------------- */
const btnWa = (label = 'Solicite um orçamento', msg, cls = 'btn btn-wa') =>
  `<a class="${cls}" href="${wa(msg)}" target="_blank" rel="noopener">${I.whatsapp}<span>${label}</span>${I.arrow}</a>`;
const btnCall = (cls = 'btn btn-call') =>
  `<a class="${cls}" href="${site.phoneHref}">${I.phone}<span>Ligar: ${site.phoneCallDisplay}</span></a>`;

/* ---------------- schema.org ---------------- */
const businessId = abs('/#empresa');
function businessSchema() {
  return {
    '@type': 'Plumber',
    '@id': businessId,
    name: site.fullName,
    alternateName: site.name,
    url: abs('/'),
    telephone: site.phoneSchema,
    image: abs('/assets/img/og-desentopeja.jpg'),
    logo: abs('/assets/img/logo-desentopeja.png'),
    priceRange: '$$',
    description: 'Desentupidora e encanador 24 horas em São Paulo, Grande SP e ABC: desentupimento de pia, ralo, vaso sanitário, esgoto, vazamentos e serviços de encanamento.',
    address: { '@type': 'PostalAddress', addressRegion: 'SP', addressCountry: 'BR' },
    areaServed: [{ '@type': 'City', name: 'São Paulo' }, ...cities.filter((c) => c.region !== 'sp').map((c) => ({ '@type': 'City', name: c.name }))],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00', closes: '23:59',
    }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de desentupimento e encanamento',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(svcUrl(s)) } })),
    },
    ...(site.instagram ? { sameAs: [site.instagram] } : {}),
  };
}
const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(url) })),
});
const faqSchema = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })),
});

/* ---------------- layout ---------------- */
/* Google Tag Manager + Google Ads (gtag.js) */
function trackingHead() {
  let out = '';
  if (site.gtmId) out += `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');</script>
<!-- End Google Tag Manager -->
`;
  if (site.googleAdsId) out += `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${site.googleAdsId}');
</script>`;
  return out;
}
function trackingBody() {
  return site.gtmId ? `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->` : '';
}
function head({ title, description, url, schema = [], ogImage = '/assets/img/og-desentopeja.jpg', noindex = false, preload }) {
  const ld = { '@context': 'https://schema.org', '@graph': [businessSchema(), ...schema] };
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
${trackingHead()}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${abs(url)}">
<meta name="geo.region" content="BR-SP">
<meta name="geo.placename" content="São Paulo">
<meta name="theme-color" content="#0b0b0b">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(site.fullName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(url)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/assets/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Permanent+Marker&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
${preload ? `<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : ''}
<link rel="stylesheet" href="/assets/css/style.css?v=${CSS_V}">
<script>if('scrollRestoration' in history)history.scrollRestoration='manual';</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;
}

const logoImg = (size = 64, lazy = false) =>
  `<img class="logo-badge" src="/assets/img/logo-desentopeja.webp" alt="Logo ${esc(site.fullName)}" width="${size}" height="${size}"${lazy ? ' loading="lazy"' : ''}>`;
const logo = (tag = 'a', href = '/', lazy = false) =>
  `<${tag} class="logo"${tag === 'a' ? ` href="${href}" aria-label="${esc(site.fullName)} — página inicial"` : ''}>${logoImg(64, lazy)}<span class="logo-text"><span class="logo-name">Desentope<span class="y">JÁ</span></span><span class="logo-sub">HIDRÁULICA <b>24h</b></span></span></${tag}>`;

function header(active) {
  const a = (key) => (active === key ? ' class="active" aria-current="page"' : '');
  const ddActive = (key) => (active === key ? ' active' : '');
  return `<header class="site-header">
  <div class="container header-inner">
    ${logo()}
    <nav class="main-nav" aria-label="Menu principal">
      <ul>
        <li><a href="/"${a('home')}>Início</a></li>
        <li class="has-dd">
          <button class="dd-toggle${ddActive('servicos')}" aria-expanded="false" aria-haspopup="true">Serviços ${I.chevron}</button>
          <div class="dropdown">
            ${services.map((s) => `<a href="${svcUrl(s)}">${I[s.icon]}${s.name}</a>`).join('\n            ')}
            <a class="dd-all" href="/servicos/">Ver todos os serviços</a>
          </div>
        </li>
        <li class="has-dd">
          <button class="dd-toggle${ddActive('cidades')}" aria-expanded="false" aria-haspopup="true">Cidades ${I.chevron}</button>
          <div class="dropdown">
            ${byRegion.map((r) => `<span class="dd-group">${r.name}</span>\n            ${r.cities.map((c) => `<a href="${cityUrl(c)}">${I.pinLine}${c.name}</a>`).join('\n            ')}`).join('\n            ')}
            <a class="dd-all" href="/areas-atendidas/">Todas as áreas atendidas</a>
          </div>
        </li>
        <li><a href="/sobre/"${a('sobre')}>Sobre nós</a></li>
        <li><a href="/#depoimentos">Depoimentos</a></li>
        <li><a href="/contato/"${a('contato')}>Contato</a></li>
      </ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener" aria-label="Chame no WhatsApp">${I.whatsapp}<span>Chame no WhatsApp</span></a>
      <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">${I.menu}</button>
    </div>
  </div>
</header>`;
}

function ctaBand() {
  return `<section class="cta-band" aria-label="Fale com a DesentopeJÁ">
  <div class="container cta-grid">
    <div class="cta-title">${I.whatsapp}<span>Precisou de hidráulica?<br>Chama a <span class="y">DesentopeJÁ</span>!</span></div>
    <div class="cta-info">
      <div class="cta-info-row">
        <span>${I.clock} Atendimento 24h</span>
        <a href="${wa()}" target="_blank" rel="noopener">${I.whatsapp} ${site.phoneDisplay}</a>
      </div>
      <small>Solicite um orçamento sem compromisso.</small>
    </div>
    <div class="cta-logo">${logoImg(110, true)}</div>
  </div>
</section>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      ${logo('a', '/', true)}
      <nav class="footer-nav" aria-label="Rodapé">
        <a href="/">Início</a><a href="/servicos/">Serviços</a><a href="/sobre/">Sobre nós</a><a href="/#depoimentos">Depoimentos</a><a href="/contato/">Contato</a>
      </nav>
      <div class="footer-social">
        ${site.instagram ? `<a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}</a>` : ''}
        <a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whatsapp}</a>
      </div>
      <div class="footer-area">${I.pin}<span>Atendemos São Paulo,<b>Grande SP e ABC</b></span></div>
    </div>
    <div class="footer-links">
      <div>
        <h4>Serviços</h4>
        <ul>${services.map((s) => `<li><a href="${svcUrl(s)}">${s.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Áreas atendidas</h4>
        ${byRegion.map((r) => `<p class="f-region">${r.name}</p><p class="f-cities">${r.cities.map((c) => `<a href="${cityUrl(c)}">${c.short}</a>`).join(' · ')}</p>`).join('\n        ')}
      </div>
      <div>
        <h4>Atendimento 24h</h4>
        <p>WhatsApp: <a href="${wa()}" target="_blank" rel="noopener">${site.phoneDisplay}</a></p>
        <p>Ligação: <a href="${site.phoneHref}">${site.phoneCallDisplay}</a></p>
        <p>Todos os dias, inclusive feriados.</p>
        <p>São Paulo (Centro e Zonas Sul, Oeste, Norte e Leste), ABC Paulista e Grande SP.</p>
        <p><a href="/areas-atendidas/">Ver todas as áreas atendidas</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>${site.fullName}</span>${site.cnpj ? `<span>CNPJ: ${site.cnpj}</span>` : ''}<span>© <span id="ano">${new Date().getFullYear()}</span> Todos os direitos reservados.</span>
    </div>
  </div>
</footer>
<a class="call-float" href="${site.phoneHref}" aria-label="Ligar para ${site.phoneCallDisplay}">${I.phone}</a>
<a class="wa-float" href="${wa()}" target="_blank" rel="noopener" aria-label="Fale conosco no WhatsApp">${I.whatsapp}</a>
<button class="to-top" aria-label="Voltar ao topo">${I.up}</button>
<div class="mobile-bar">
  <a class="mb-call" href="${site.phoneHref}">${I.phone} ${site.phoneCallDisplay}</a>
  <a class="mb-wa" href="${wa()}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a>
</div>
<script src="/assets/js/main.js?v=${JS_V}" defer></script>
</body>
</html>`;
}

const page = (meta, active, body) => `${head(meta)}
<body>
${trackingBody()}
${header(active)}
<main id="conteudo">
${body}
</main>
${ctaBand()}
${footer()}`;

/* ---------------- seções reutilizáveis ---------------- */
function heroBadges() {
  return `<div class="hero-badges">
          <div class="hero-badge">${I.clock}<span>Atendimento<b>24 horas</b></span></div>
          <div class="hero-badge">${I.house}<span>Residencial<br>e Comercial</span></div>
          <div class="hero-badge">${I.shield}<span>Não cobramos<br>orçamentos</span></div>
        </div>`;
}

function serviceStrip() {
  const labels = {
    'desentupimento-de-pia': 'Desentupimento<br>de pias',
    'desentupimento-de-ralo': 'Desentupimento<br>de ralos',
    'desentupimento-de-vaso-sanitario': 'Desentupimento<br>de vasos',
    'desentupimento-de-esgoto': 'Desentupimento<br>de esgoto',
    'instalacoes-hidraulicas': 'Instalações<br>hidráulicas',
    'troca-de-torneiras-e-registros': 'Torneiras<br>e registros',
    'limpeza-de-caixa-dagua': 'Limpeza de<br>caixa d’água',
    'reparos-e-vazamentos': 'Reparos e<br>vazamentos',
  };
  const items = services.filter((s) => labels[s.slug]).map((s) => [svcUrl(s), s.icon, labels[s.slug]]);
  return `<section class="service-strip" aria-label="Principais serviços">
  <div class="container strip-grid">
    ${items.map(([href, icon, label]) => `<a class="strip-item" href="${href}">${I[icon]}<span>${label}</span></a>`).join('\n    ')}
  </div>
</section>`;
}

function aboutSection(h = 'h2') {
  return `<section class="about" id="sobre" aria-labelledby="sobre-titulo">
  <div class="about-grid">
    <div class="about-media"><img src="/assets/img/equipe-desentopeja.webp" alt="Encanador da DesentopeJÁ com cinto de ferramentas ao lado da van de atendimento" width="900" height="528" loading="lazy"></div>
    <div class="about-text reveal">
      <span class="kicker">Sobre nós</span>
      <${h} id="sobre-titulo">Trabalho sério, <span class="y">com quem entende de hidráulica.</span></${h}>
      <p>Somos a <b>DesentopeJÁ</b>, uma empresa especializada em serviços hidráulicos, atuando com agilidade e equipe qualificada para resolver o seu problema, seja ele grande ou pequeno — em São Paulo, na Grande SP e no ABC Paulista, 24 horas por dia.</p>
    </div>
    <ul class="about-checks reveal">
      ${['Equipe experiente<br>e treinada', 'Equipamentos modernos', 'Atendimento rápido<br>e eficiente', 'Qualidade e garantia<br>nos serviços']
        .map((t) => `<li class="check-item"><span class="check-dot">${I.check}</span><span>${t}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function promoSection() {
  return `<section class="promo" aria-label="Brinde: trena DesentopeJÁ">
  <div class="promo-bg"></div>
  <div class="container promo-grid">
    <div class="promo-media"><img src="/assets/img/brinde-trena.webp" alt="Trena personalizada DesentopeJÁ dada de brinde" width="990" height="486" loading="lazy"></div>
    <div class="promo-text reveal">
      <span class="promo-pill">Orçamento de desentupimento</span>
      <span class="promo-big">APROVADO</span>
      <p class="promo-sub">o cliente ganha <span class="yd">uma trena.</span></p>
      <svg class="promo-swoosh" viewBox="0 0 520 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10C140 2 330 0 518 6" stroke="#ffd21f" stroke-width="6" fill="none" stroke-linecap="round"/></svg>
    </div>
    <div class="promo-side reveal">${I.gift}<span>Qualidade<br>no serviço<br>e um brinde<br>especial!</span></div>
  </div>
</section>`;
}

function serviceCard(s, { label, desc = true, city } = {}) {
  const media = s.img
    ? `<img src="/assets/img/${s.img}" alt="${esc(s.name)}${city ? ' ' + esc(city.em) : ''}" width="600" height="356" loading="lazy">`
    : `<div class="svc-card-illu">${I[s.icon]}</div>`;
  return `<a class="svc-card reveal" href="${svcUrl(s)}">
      <div class="svc-card-img">${media}</div>
      <div class="svc-card-body">${I[s.icon]}<span>${label || s.short}</span></div>
      ${desc ? `<p class="svc-card-desc">${s.cardDesc}</p>` : ''}
      <span class="svc-card-more">Saiba mais ${I.arrow}</span>
    </a>`;
}

function servicesSection({ exclude, title = ['Soluções completas', 'em hidráulica'], text, showAll = true, kicker = 'Nossos serviços', city } = {}) {
  const list = services.filter((s) => s.slug !== exclude);
  return `<section class="section section-dark" id="servicos" aria-labelledby="servicos-titulo">
  <div class="container">
    <div class="section-head">
      <div><span class="kicker">${kicker}</span><h2 class="section-title" id="servicos-titulo">${title[0]} <span class="y">${title[1]}</span></h2></div>
      <p>${text || 'Do simples ao complexo, cuidamos da sua rede hidráulica com profissionalismo e o melhor custo-benefício.'}</p>
      ${showAll ? `<a class="btn btn-outline btn-sm" href="/servicos/">Ver todos os serviços ${I.arrow}</a>` : '<span></span>'}
    </div>
    <div class="cards-grid${list.length === 4 ? ' cols-4' : ''}">
      ${list.map((s) => serviceCard(s, city ? { label: `${s.name} ${city.em}`, city } : {})).join('\n      ')}
    </div>
  </div>
</section>`;
}

function citiesSection({ service, exclude, title, text } = {}) {
  const t = title || ['Atendemos São Paulo,', 'Grande SP e ABC'];
  return `<section class="section section-black" id="cidades" aria-labelledby="cidades-titulo">
  <div class="container">
    <div class="section-head">
      <div><span class="kicker">Áreas atendidas</span><h2 class="section-title" id="cidades-titulo">${t[0]} <span class="y">${t[1]}</span></h2></div>
      <p>${text || 'Equipes posicionadas para chegar rápido em toda a capital, no ABC e nas cidades da Grande SP, 24 horas por dia, 7 dias por semana.'}</p>
      <a class="btn btn-outline btn-sm" href="/areas-atendidas/">Ver áreas atendidas ${I.arrow}</a>
    </div>
    <div class="region-grid">
      ${byRegion.map((r) => `<div class="region-block reveal">
        <h3>${I.pin}${r.name}</h3>
        <div class="city-pills">${r.cities.filter((c) => c.slug !== exclude).map((c) => `<a class="city-pill" href="${cityUrl(c)}"${service ? ` title="${esc(`${service.name} ${c.em}`)}"` : ''}>${c.short}</a>`).join('')}</div>
      </div>`).join('\n      ')}
      <a class="region-block region-wa reveal" href="${wa()}" target="_blank" rel="noopener">${I.whatsapp}<span><b>Não achou sua cidade?</b><small>Chame no WhatsApp e confirme o atendimento</small></span></a>
    </div>
  </div>
</section>`;
}

function stepsSection(title = ['Por que escolher a', 'DesentopeJÁ?']) {
  const steps = [
    ['clock', 'Atendimento 24 horas', 'Dia, noite, fim de semana e feriado. Emergência hidráulica não tem hora marcada.'],
    ['noBreak', 'Sem quebra-quebra', 'Máquinas rotativas e hidrojateamento que desentopem sem quebrar piso ou parede.'],
    ['shield', 'Orçamento grátis', 'Você conhece o valor antes de começar. Não cobramos pelo orçamento.'],
    ['check', 'Serviço com garantia', 'Equipe treinada, material de qualidade e garantia no serviço executado.'],
  ];
  return `<section class="section section-dark" aria-labelledby="dif-titulo">
  <div class="container">
    <div class="section-head simple">
      <span class="kicker">Diferenciais</span>
      <h2 class="section-title" id="dif-titulo">${title[0]} <span class="y">${title[1]}</span></h2>
    </div>
    <div class="steps">
      ${steps.map(([ic, t, d]) => `<div class="step reveal">${I[ic]}<h3>${t}</h3><p>${d}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function testimonialsSection() {
  const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);
  return `<section class="section section-light" id="depoimentos" aria-labelledby="depo-titulo">
  <div class="container">
    <div class="section-head simple">
      <span class="kicker">Depoimentos</span>
      <h2 class="section-title" id="depo-titulo">O que nossos clientes dizem</h2>
    </div>
    <div class="testimonials-grid">
      ${testimonials.map((t) => `<figure class="testimonial reveal">
        <div class="stars" aria-label="5 estrelas">${I.star.repeat(5)}</div>
        <blockquote>“${t.text}”</blockquote>
        <figcaption class="t-author"><span class="avatar" aria-hidden="true">${initials(t.name)}</span><span><b>${t.name}</b><small>${t.city}</small></span></figcaption>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function faqSection(faq, title = 'Perguntas frequentes', theme = 'section-light') {
  return `<section class="section ${theme}" id="duvidas" aria-labelledby="faq-titulo">
  <div class="container">
    <div class="section-head simple">
      <span class="kicker">Dúvidas</span>
      <h2 class="section-title" id="faq-titulo">${title}</h2>
    </div>
    <div class="faq">
      ${faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><div><p>${a}</p></div></details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function pageHero({ crumbs, eyebrow, h1, lead, waMsg, hand = true }) {
  return `<section class="hero page-hero">
  <div class="hero-media"><img src="/assets/img/hero-encanador.webp" alt="" width="991" height="686" fetchpriority="high"></div>
  <div class="container hero-inner">
    <div class="hero-content">
      <nav class="breadcrumb" aria-label="Você está em">${crumbs.map(([n, u], i) => (i === crumbs.length - 1 ? `<span aria-current="page">${n}</span>` : `<a href="${u}">${n}</a><span>›</span>`)).join('')}</nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${heroBadges()}
      <div class="hero-actions">
        ${btnWa('Solicite um orçamento', waMsg)}
        ${btnCall()}
      </div>
    </div>
  </div>
  ${hand ? '<p class="hero-hand" aria-hidden="true">Seu problema<br>é a nossa<br>prioridade!</p>' : ''}
</section>`;
}

function sideCta(waMsg, title = 'Orçamento grátis agora') {
  return `<div class="side-card">
        <h3>${title}</h3>
        <p>Fale direto com um técnico. Atendimento 24h em São Paulo, Grande SP e ABC.</p>
        <div class="side-meta">
          <div>${I.clock} Atendimento 24 horas</div>
          <div>${I.shield} Não cobramos orçamento</div>
          <div>${I.check} Serviço com garantia</div>
        </div>
        ${btnWa('Chamar no WhatsApp', waMsg)}
        ${btnCall()}
      </div>`;
}

/* ==========================================================
   PÁGINAS
   ========================================================== */

/* ---------- Home ---------- */
function buildHome() {
  const body = `<section class="hero">
  <div class="hero-media"><img src="/assets/img/hero-encanador.webp" alt="Encanador da DesentopeJÁ consertando o sifão de uma pia" width="991" height="686" fetchpriority="high"></div>
  <div class="container hero-inner">
    <div class="hero-content">
      <span class="eyebrow">Desentupidora e encanador 24h em SP e Grande SP</span>
      <h1>Problemas com vazamento? <span class="y">A gente resolve!</span></h1>
      <p class="lead">Conserto de vazamentos, desentupimento de pia, ralo, vaso sanitário e esgoto, instalações hidráulicas, troca de torneiras e registros e limpeza de caixa d’água com rapidez, segurança e profissionalismo.</p>
      ${heroBadges()}
      <div class="hero-actions">
        ${btnWa('Solicite um orçamento')}
        ${btnCall()}
      </div>
    </div>
  </div>
  <p class="hero-hand" aria-hidden="true">Seu problema<br>é a nossa<br>prioridade!</p>
</section>
${serviceStrip()}
${aboutSection()}
${promoSection()}
${servicesSection()}
${citiesSection()}
${stepsSection()}
${testimonialsSection()}
${faqSection(homeFaq)}`;
  write('index.html', page({
    title: 'Desentupidora 24h em São Paulo e Grande SP | DesentopeJÁ',
    description: 'Desentupidora e encanador 24h em SP, Grande SP e ABC: vazamentos, desentupimento de pia, ralo, vaso e esgoto e caixa d’água. Ligue 011 94541-6519.',
    url: '/',
    preload: '/assets/img/hero-encanador.webp',
    schema: [
      { '@type': 'WebSite', '@id': abs('/#site'), url: abs('/'), name: site.fullName, inLanguage: 'pt-BR', publisher: { '@id': businessId } },
      faqSchema(homeFaq),
    ],
  }, 'home', body));
}

/* ---------- Páginas de serviço ---------- */
function buildService(s) {
  const nameLow = lower1(s.name);
  const waMsg = `Olá, DesentopeJÁ! Vim pelo site e preciso de ${nameLow}.`;
  const isDes = isDesentupimento(s);
  const crumbs = [['Início', '/'], ['Serviços', '/servicos/'], [s.name, svcUrl(s)]];
  const otherSvcs = services.filter((x) => x.slug !== s.slug);

  const body = `${pageHero({
    crumbs,
    eyebrow: isDes ? 'Desentupidora 24 horas' : 'Hidráulica 24 horas',
    h1: `${s.h1[0]} <span class="y">${s.h1[1]}</span>`,
    lead: s.lead,
    waMsg,
  })}
${serviceStrip()}
<section class="section section-light">
  <div class="container content-grid">
    <article class="prose">
      <h2>${isDes ? `${s.name} rápido e sem quebra-quebra` : `${s.name} com qualidade e garantia`}</h2>
      ${s.intro.map((p) => `<p>${p}</p>`).join('\n      ')}

      <h2>${isDes ? `Sinais de que você precisa de ${nameLow}` : s.slug === 'encanador' ? 'Sinais de que você precisa de um encanador' : 'Quando chamar a DesentopeJÁ'}</h2>
      <ul class="ticks">${s.signs.map((x) => `<li>${x}</li>`).join('')}</ul>

      <div class="callout">
        <p><b>Está com esse problema agora?</b> Chame a DesentopeJÁ: atendemos 24 horas em São Paulo, na Grande SP e no ABC e não cobramos orçamento.</p>
        ${btnWa('Pedir orçamento pelo WhatsApp', waMsg)}
      </div>

      <h2>${isDes ? 'Principais causas do entupimento' : s.slug === 'encanador' ? 'O que o nosso encanador resolve' : 'O que está incluído no serviço'}</h2>
      ${s.causes.map(([t, d]) => `<h3>${t}</h3><p>${d}</p>`).join('\n      ')}

      <h2>Como fazemos ${isDes ? `o ${nameLow}` : 'o serviço'}</h2>
      <ol class="numbered">${s.steps.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ol>

      <h2>Dicas para evitar novos problemas</h2>
      <ul class="ticks">${s.prevention.map((x) => `<li>${x}</li>`).join('')}</ul>

      <h2>${s.name} em São Paulo, Grande SP e ABC</h2>
      <p>A DesentopeJÁ atende ${s.slug === 'encanador' ? 'com encanador 24h' : nameLow} em toda a cidade de São Paulo — ${list(spZones.map((c) => `<a href="${cityUrl(c)}">${c.short}</a>`))} —, no ABC Paulista e nas cidades da Grande SP, como ${list(['desentupidora-guarulhos', 'desentupidora-osasco', 'desentupidora-santo-andre', 'desentupidora-sao-bernardo-do-campo', 'desentupidora-barueri'].map((sl) => cities.find((c) => c.slug === sl)).filter(Boolean).map((c) => `<a href="${cityUrl(c)}">${c.name}</a>`))}. Nossa equipe chega rápido, com equipamentos profissionais e orçamento sem compromisso.</p>
    </article>
    <aside class="sidebar">
      ${sideCta(waMsg)}
      <div class="side-card">
        <h3>Outros serviços</h3>
        <ul class="side-list">${otherSvcs.map((x) => `<li><a href="${svcUrl(x)}">${I[x.icon]}${x.name}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>
${isDes ? promoSection() : ''}
${citiesSection({ service: s, title: [`${s.name} em`, 'SP, Grande SP e ABC'], text: `Escolha sua região e veja como funciona o atendimento de ${nameLow} perto de você.` })}
${stepsSection()}
${faqSection(s.faq, `Dúvidas sobre ${nameLow}`)}
${servicesSection({ exclude: s.slug, title: ['Conheça outros', 'serviços'], kicker: 'Mais serviços' })}`;

  write(`${s.slug}/index.html`, page({
    title: s.title,
    description: s.description,
    url: svcUrl(s),
    preload: '/assets/img/hero-encanador.webp',
    schema: [
      {
        '@type': 'Service',
        name: `${s.name} em São Paulo e Grande SP`,
        serviceType: s.name,
        url: abs(svcUrl(s)),
        description: s.description,
        provider: { '@id': businessId },
        areaServed: [{ '@type': 'City', name: 'São Paulo' }, ...cities.filter((c) => c.region !== 'sp').map((c) => ({ '@type': 'City', name: c.name }))],
        availableChannel: { '@type': 'ServiceChannel', servicePhone: { '@type': 'ContactPoint', telephone: site.phoneSchema, contactType: 'customer service', availableLanguage: 'Portuguese' } },
      },
      breadcrumbSchema(crumbs),
      faqSchema(s.faq),
    ],
  }, 'servicos', body));
}

/* ---------- Páginas de cidade ---------- */
function buildCity(c) {
  const waMsg = `Olá, DesentopeJÁ! Vim pelo site e preciso de atendimento ${c.em}.`;
  const crumbs = [['Início', '/'], ['Áreas atendidas', '/areas-atendidas/'], [`Desentupidora ${c.em}`, cityUrl(c)]];
  const faq = [
    c.faq,
    [`Vocês atendem 24 horas ${c.em}?`, `Sim. A DesentopeJÁ atende ${c.em} 24 horas por dia, inclusive madrugadas, finais de semana e feriados.`],
    [`Quanto custa um desentupimento ${c.em}?`, 'O valor depende do tipo de serviço, do local do entupimento e do equipamento necessário. Por isso fazemos um orçamento sem compromisso antes de iniciar — e não cobramos por ele.'],
    [`Quais serviços vocês fazem ${c.em}?`, `Desentupimento de pia, ralo, vaso sanitário e esgoto, hidrojateamento, conserto de vazamentos, instalações hidráulicas, troca de torneiras e registros, limpeza de caixa d’água e serviços de encanador em geral.`],
  ];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`;

  const body = `${pageHero({
    crumbs,
    eyebrow: `Desentupidora e encanador ${c.prep} ${c.short}`,
    h1: `Desentupidora ${c.prep} <span class="y">${c.name}</span> 24h`,
    lead: `Desentupimento de pia, ralo, vaso sanitário e esgoto e serviços de encanador ${c.em}. Chegamos rápido, sem quebra-quebra e com orçamento grátis.`,
    waMsg,
  })}
${serviceStrip()}
${servicesSection({ city: c, kicker: `Serviços ${c.prep} ${c.short}`, title: ['Nossos serviços', c.em], text: `Atendimento completo em hidráulica para casas, apartamentos, comércios e condomínios ${c.de}.`, showAll: false })}
<section class="section section-light">
  <div class="container content-grid">
    <article class="prose">
      <h2>Desentupidora 24 horas ${c.em}</h2>
      <p>${c.intro}</p>
      <p>${c.detail}</p>

      <h2>Serviços de desentupimento e encanamento ${c.em}</h2>
      <ul class="ticks">
        ${services.map((s) => `<li><a href="${svcUrl(s)}">${s.name} ${c.em}</a> — ${lower1(s.cardDesc)}</li>`).join('\n        ')}
      </ul>

      <div class="callout">
        <p><b>Precisa de uma desentupidora ${c.em} agora?</b> Fale com a DesentopeJÁ pelo WhatsApp ou telefone — informamos a previsão de chegada na hora.</p>
        ${btnWa('Chamar no WhatsApp', waMsg)}
      </div>

      <h2>Bairros atendidos ${c.em}</h2>
      <p>Atendemos todos os bairros ${c.de}, entre eles:</p>
      <div class="chips">${c.neighborhoods.map((b) => `<span class="chip">${b}</span>`).join('')}</div>
      <p>Não encontrou o seu bairro? Fique tranquilo: atendemos toda a região. É só chamar.</p>

      <h2>Como funciona o atendimento</h2>
      <ol class="numbered">
        <li><b>Você chama no WhatsApp ou liga</b>Conte o problema e o endereço ${c.em}. Se puder, envie uma foto.</li>
        <li><b>Orçamento sem compromisso</b>Passamos o valor e a previsão de chegada antes de sair para o atendimento.</li>
        <li><b>Técnico no local</b>Nossa equipe chega com máquinas e ferramentas para resolver na primeira visita.</li>
        <li><b>Problema resolvido, com garantia</b>Testamos tudo, deixamos o local limpo e o serviço sai com garantia.</li>
      </ol>
    </article>
    <aside class="sidebar">
      ${sideCta(waMsg, `Atendimento ${c.prep} ${c.short}`)}
      <div class="map-wrap"><iframe src="${mapSrc}" title="Mapa ${esc(c.de)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </aside>
  </div>
</section>
${promoSection()}
${stepsSection()}
${faqSection(faq, `Dúvidas sobre desentupidora ${c.em}`)}
${citiesSection({ exclude: c.slug, title: ['Atendemos também', 'outras regiões'] })}`;

  write(`${c.slug}/index.html`, page({
    title: c.title,
    description: c.description,
    url: cityUrl(c),
    preload: '/assets/img/hero-encanador.webp',
    schema: [
      {
        '@type': 'Service',
        name: `Desentupidora ${c.em}`,
        serviceType: 'Desentupimento e serviços de encanador',
        url: abs(cityUrl(c)),
        description: c.description,
        provider: { '@id': businessId },
        areaServed: placeSchema(c),
      },
      breadcrumbSchema(crumbs),
      faqSchema(faq),
    ],
  }, 'cidades', body));
}

/* ---------- Hub de serviços ---------- */
function buildServicesHub() {
  const crumbs = [['Início', '/'], ['Serviços', '/servicos/']];
  const body = `${pageHero({
    crumbs,
    eyebrow: 'Nossos serviços',
    h1: 'Desentupimento e encanamento <span class="y">em SP e Grande SP</span>',
    lead: 'Conheça todos os serviços da DesentopeJÁ: desentupimento de pia, ralo, vaso sanitário e esgoto, instalações hidráulicas, troca de torneiras e registros, limpeza de caixa d’água, reparos e vazamentos e encanador 24h.',
  })}
${serviceStrip()}
${servicesSection({ showAll: false, title: ['Soluções completas', 'em hidráulica'] })}
${promoSection()}
${stepsSection()}
${citiesSection()}
${faqSection(homeFaq)}`;
  write('servicos/index.html', page({
    title: 'Serviços de Desentupimento e Encanador em SP | DesentopeJÁ',
    description: 'Serviços da DesentopeJÁ em SP e Grande SP: desentupimento, instalações hidráulicas, torneiras e registros, caixa d’água e vazamentos. Ligue 11 94541-6519.',
    url: '/servicos/',
    preload: '/assets/img/hero-encanador.webp',
    schema: [breadcrumbSchema(crumbs), faqSchema(homeFaq)],
  }, 'servicos', body));
}

/* ---------- Hub de cidades ---------- */
function buildCitiesHub() {
  const crumbs = [['Início', '/'], ['Áreas atendidas', '/areas-atendidas/']];
  const body = `${pageHero({
    crumbs,
    eyebrow: 'Áreas atendidas',
    h1: 'Desentupidora em <span class="y">São Paulo, Grande SP e ABC</span>',
    lead: 'Atendemos 24 horas toda a capital — Centro e Zonas Sul, Oeste, Norte e Leste —, o ABC Paulista e as principais cidades da Grande São Paulo.',
  })}
${citiesSection({ title: ['Escolha a', 'sua região'] })}
<section class="section section-light">
  <div class="container content-grid">
    <article class="prose">
      <h2>Uma desentupidora perto de você em São Paulo e região</h2>
      <p>A DesentopeJÁ atende a capital paulista, o ABC e as cidades da Grande São Paulo com rapidez. Por conhecer bem cada região — dos prédios antigos do Centro às casas com quintal da Grande SP — sabemos quais problemas são mais comuns em cada lugar e chegamos preparados.</p>
      ${byRegion.map((r) => `<h3>${r.name}</h3>
      <ul class="ticks">
        ${r.cities.map((c) => `<li><a href="${cityUrl(c)}">Desentupidora ${c.em}</a> — bairros como ${list(c.neighborhoods.slice(0, 4))}.</li>`).join('\n        ')}
      </ul>`).join('\n      ')}
      <p>Em todas as cidades realizamos ${list(services.map((s) => `<a href="${svcUrl(s)}">${lower1(s.name)}</a>`))}.</p>
    </article>
    <aside class="sidebar">${sideCta()}</aside>
  </div>
</section>
${stepsSection()}`;
  write('areas-atendidas/index.html', page({
    title: 'Áreas Atendidas: Desentupidora em SP, Grande SP e ABC | DesentopeJÁ',
    description: 'Desentupidora 24h em toda São Paulo (Centro e Zonas Sul, Oeste, Norte e Leste), ABC e Grande SP: Guarulhos, Osasco, Barueri e mais. Ligue 011 94541-6519.',
    url: '/areas-atendidas/',
    preload: '/assets/img/hero-encanador.webp',
    schema: [breadcrumbSchema(crumbs)],
  }, 'cidades', body));
}

/* ---------- Sobre ---------- */
function buildAbout() {
  const crumbs = [['Início', '/'], ['Sobre nós', '/sobre/']];
  const body = `${pageHero({
    crumbs,
    eyebrow: 'Sobre a DesentopeJÁ',
    h1: 'Trabalho sério, <span class="y">com quem entende de hidráulica</span>',
    lead: 'Desentupidora e encanador 24 horas em São Paulo, Grande SP e ABC, com equipe treinada, equipamentos modernos e compromisso com o seu problema.',
  })}
${aboutSection('h2')}
<section class="section section-light">
  <div class="container content-grid">
    <article class="prose">
      <h2>Quem somos</h2>
      <p>A <b>DesentopeJÁ Hidráulica 24h</b> é especializada em desentupimento e serviços de encanamento para residências, comércios, condomínios e indústrias em São Paulo, na Grande SP e no ABC Paulista.</p>
      <p>Nosso foco é simples: chegar rápido, explicar o problema com clareza, passar um orçamento justo e resolver de forma limpa e definitiva. Trabalhamos com máquinas rotativas, hidrojateamento e ferramentas profissionais que evitam o quebra-quebra.</p>
      <h2>Nossos compromissos</h2>
      <ul class="ticks">
        <li>Atendimento 24 horas, todos os dias, inclusive feriados</li>
        <li>Orçamento sem compromisso antes de qualquer serviço</li>
        <li>Equipe uniformizada, educada e treinada</li>
        <li>Limpeza do local ao final do atendimento</li>
        <li>Garantia no serviço executado</li>
      </ul>
      <h2>O que fazemos</h2>
      <p>${list(services.map((s) => `<a href="${svcUrl(s)}">${lower1(s.name)}</a>`))} — em toda a cidade de São Paulo, no ABC Paulista e na Grande SP. Veja todas as <a href="/areas-atendidas/">áreas atendidas</a>.</p>
    </article>
    <aside class="sidebar">${sideCta()}</aside>
  </div>
</section>
${promoSection()}
${stepsSection()}
${testimonialsSection()}`;
  write('sobre/index.html', page({
    title: 'Sobre a DesentopeJÁ | Desentupidora 24h em SP e Grande SP',
    description: 'Conheça a DesentopeJÁ Hidráulica 24h: desentupidora e encanador em SP, Grande SP e ABC com equipe treinada, equipamentos modernos e garantia.',
    url: '/sobre/',
    preload: '/assets/img/hero-encanador.webp',
    schema: [breadcrumbSchema(crumbs)],
  }, 'sobre', body));
}

/* ---------- Contato ---------- */
function buildContact() {
  const crumbs = [['Início', '/'], ['Contato', '/contato/']];
  const body = `${pageHero({
    crumbs,
    eyebrow: 'Contato',
    h1: 'Fale com a <span class="y">DesentopeJÁ</span>',
    lead: 'Atendimento 24 horas pelo WhatsApp e telefone. Orçamento sem compromisso para São Paulo, Grande SP e ABC.',
  })}
<section class="section section-black">
  <div class="container contact-grid">
    <div>
      <span class="kicker">Atendimento imediato</span>
      <h2 class="section-title">Escolha como prefere <span class="y">falar com a gente</span></h2>
      <div class="contact-cards">
        <a class="contact-card" href="${wa()}" target="_blank" rel="noopener">${I.whatsapp}<span><small>WhatsApp</small><b>${site.phoneDisplay}</b></span></a>
        <a class="contact-card" href="${site.phoneHref}">${I.phone}<span><small>Ligação</small><b>${site.phoneCallDisplay}</b></span></a>
        <div class="contact-card">${I.clock}<span><small>Horário</small><b>24 horas, todos os dias</b></span></div>
        <div class="contact-card">${I.pin}<span><small>Área de atendimento</small><b>São Paulo, Grande SP e ABC</b></span></div>
      </div>
    </div>
    <form class="form" id="form-orcamento" data-wa="${site.whatsapp}">
      <h2>Solicite um orçamento</h2>
      <p>Preencha e envie: sua mensagem abre direto no nosso WhatsApp.</p>
      <div class="form-row">
        <label>Nome<input name="nome" required autocomplete="name" placeholder="Seu nome"></label>
        <label>Telefone<input name="telefone" required type="tel" autocomplete="tel" placeholder="(11) 90000-0000"></label>
      </div>
      <div class="form-row">
        <label>Serviço<select name="servico" required>${services.map((s) => `<option>${s.name}</option>`).join('')}<option>Outro serviço</option></select></label>
        <label>Cidade<select name="cidade" required>${byRegion.map((r) => `<optgroup label="${esc(r.name)}">${r.cities.map((c) => `<option>${c.name}</option>`).join('')}</optgroup>`).join('')}<option>Outra cidade</option></select></label>
      </div>
      <label>Bairro<input name="bairro" placeholder="Seu bairro"></label>
      <label>Descreva o problema<textarea name="mensagem" rows="4" placeholder="Ex.: a pia da cozinha está entupida desde ontem"></textarea></label>
      <button class="btn btn-wa" type="submit">${I.whatsapp} Enviar pelo WhatsApp</button>
      <small>Não cobramos orçamento.</small>
    </form>
  </div>
</section>
${faqSection(homeFaq)}`;
  write('contato/index.html', page({
    title: 'Contato | DesentopeJÁ Desentupidora 24h em SP',
    description: 'Fale com a DesentopeJÁ 24h pelo WhatsApp 11 94541-6519. Orçamento sem compromisso para desentupimento e encanador em São Paulo, Grande SP e ABC.',
    url: '/contato/',
    preload: '/assets/img/hero-encanador.webp',
    schema: [breadcrumbSchema(crumbs)],
  }, 'contato', body));
}

/* ---------- 404 ---------- */
function build404() {
  const body = `${pageHero({
    crumbs: [['Início', '/'], ['Página não encontrada', '/404.html']],
    eyebrow: 'Erro 404',
    h1: 'Ops! Essa página <span class="y">entupiu.</span>',
    lead: 'Não encontramos o endereço que você procurou. Veja nossos serviços abaixo ou fale direto com a gente.',
    hand: false,
  })}
${serviceStrip()}
${citiesSection()}`;
  write('404.html', page({ title: 'Página não encontrada | DesentopeJÁ', description: 'Página não encontrada.', url: '/404.html', noindex: true }, '', body));
}

/* ---------- sitemap / robots ---------- */
function buildSeoFiles() {
  const urls = [
    ['/', '1.0'], ['/servicos/', '0.9'], ['/areas-atendidas/', '0.9'],
    ...services.map((s) => [svcUrl(s), '0.9']),
    ...cities.map((c) => [cityUrl(c), '0.9']),
    ['/sobre/', '0.6'], ['/contato/', '0.7'],
  ];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p]) => `  <url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><priority>${p}</priority></url>`).join('\n')}
</urlset>
`);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
}

/* ---------- executar ---------- */
buildHome();
buildServicesHub();
services.forEach(buildService);
buildCitiesHub();
cities.forEach(buildCity);
buildAbout();
buildContact();
build404();
buildSeoFiles();
console.log(`OK: ${services.length} serviços + ${cities.length} cidades + páginas institucionais geradas em /public`);
