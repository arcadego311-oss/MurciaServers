const maps = [
  { name: 'Der Eisendrache', image: 'https://hgmserve.rs/images/zombies/t7/der-eisendrache.webp', round: 255, players: '12.8K', runs: '2,461' },
  { name: 'Shadows of Evil', image: 'https://hgmserve.rs/images/zombies/t7/shadows-of-evil.webp', round: 255, players: '18.4K', runs: '3,928' },
  { name: 'Revelations', image: 'https://hgmserve.rs/images/zombies/t7/revelations.webp', round: 255, players: '9.2K', runs: '1,774' },
  { name: 'Gorod Krovi', image: 'https://hgmserve.rs/images/zombies/t7/gorod-krovi.webp', round: 247, players: '7.7K', runs: '1,308' },
  { name: 'Origins', image: 'https://hgmserve.rs/images/zombies/t7/origins.webp', round: 255, players: '21.1K', runs: '4,882' }
];

const app = document.querySelector('#app');

function header() {
  return `
    <div class="announcement"><span class="announce-tag">⌁ Announcement</span><span>The archives are live. <b>Explore the new season records.</b></span></div>
    <header class="site-header">
      <div class="header-inner">
        <a class="logo" href="#/maps" aria-label="Murcia Servers home"><span class="logo-mark"><img src="assets/murcia-servers-logo-v2.gif" alt="" width="42" height="42"></span>Murcia Servers</a>
        <nav class="nav" id="primaryNav" aria-label="Primary">
          <a href="#/home">Home</a><a href="#/vip">VIP</a><a href="#/servers">Live Servers</a>
          <div class="menu-wrap"><button class="menu-trigger" aria-expanded="false">Leaderboards</button><div class="dropdown"><a href="#/records">Global records</a><a href="#/weekly">Weekly standings</a><a href="#/players">Player stats</a></div></div>
          <a href="https://discord.com" target="_blank" rel="noreferrer">Discord ↗</a><a href="#/webfront">Webfront ↗</a>
          <div class="menu-wrap"><button class="menu-trigger" aria-expanded="false">More</button><div class="dropdown"><a href="#/rules">Rules</a><a href="#/support">Support</a><a href="#/about">About</a></div></div>
        </nav>
        <a class="account" href="#/account" aria-label="My account">♙</a>
        <button class="hamburger" aria-label="Toggle navigation" aria-expanded="false">☰</button>
      </div>
    </header>`;
}

function mapsPage() {
  return `<main class="page">
    <section class="hero">
      <div><div class="eyebrow">⌁ T7 Maps</div><h1>Black Ops 3<span class="accent">zombies.</span></h1></div>
      <div class="hero-copy"><p>Select a map below to explore high-round records, stat leaderboards and weekly standings for Black Ops 3 Zombies.</p><a class="outline-button" href="#/games">← <span>Game selection</span></a></div>
    </section>
    <section aria-labelledby="map-title"><div class="section-head"><div class="section-title"><span class="section-index">01</span><h2 id="map-title">Select a map</h2></div><span class="map-count">5 maps</span></div>
      <div class="maps-grid">${maps.map((map, i) => `<a class="map-card" href="#/map/${encodeURIComponent(map.name)}" aria-label="View records for ${map.name}"><img src="${map.image}" alt="${map.name}" loading="${i > 2 ? 'lazy' : 'eager'}"><span class="card-index">${String(i + 1).padStart(2,'0')}</span><span class="card-arrow">→</span><span class="card-copy"><span class="card-kicker">View records</span><span class="card-title">${map.name}</span></span></a>`).join('')}</div>
    </section>
  </main>`;
}

function recordPage(name) {
  const map = maps.find(m => m.name === name) || maps[0];
  return `<main class="page records-view"><div class="records-top"><div class="eyebrow">⌁ T7 Records</div><a class="outline-button" href="#/maps">← All maps</a></div>
    <section class="record-hero"><img src="${map.image}" alt="${map.name}"><div><div class="eyebrow">Black Ops 3 Zombies</div><h1>${map.name}</h1></div></section>
    <div class="section-head"><div class="section-title"><span class="section-index">01</span><h2>Record overview</h2></div><span class="map-count">Live archive</span></div>
    <section class="stats-grid"><article class="stat"><span>Highest round</span><strong>${map.round}</strong></article><article class="stat"><span>Tracked players</span><strong>${map.players}</strong></article><article class="stat"><span>Verified runs</span><strong>${map.runs}</strong></article></section>
  </main>`;
}

function cookiePanel() {
  if (localStorage.getItem('nightfall-cookie-choice')) return '';
  return `<aside class="cookie-panel" role="dialog" aria-labelledby="cookie-title"><div class="cookie-icon">◌</div><button class="cookie-close" aria-label="Close cookie notice">×</button><h3 id="cookie-title">Cookies & Analytics</h3><p>We use optional analytics cookies to understand how the site is used. Game stats, leaderboards and your account session always work.</p><div class="cookie-actions"><button class="btn btn-primary" data-cookie="accept">Accept</button><button class="btn" data-cookie="decline">Decline</button><a class="privacy-link" href="#/privacy">What we track →</a></div></aside>`;
}

function render() {
  const route = location.hash.slice(1) || '/maps';
  let content = mapsPage();
  if (route.startsWith('/map/')) content = recordPage(decodeURIComponent(route.slice(5)));
  app.innerHTML = header() + content + cookiePanel();
  bind();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function bind() {
  document.querySelectorAll('.menu-trigger').forEach(button => button.addEventListener('click', e => {
    e.stopPropagation();
    const wrap = button.closest('.menu-wrap');
    document.querySelectorAll('.menu-wrap').forEach(item => { if (item !== wrap) item.classList.remove('open'); });
    wrap.classList.toggle('open');
    button.setAttribute('aria-expanded', String(wrap.classList.contains('open')));
  }));
  document.querySelector('.hamburger')?.addEventListener('click', e => {
    const nav = document.querySelector('#primaryNav');
    nav.classList.toggle('mobile-open');
    e.currentTarget.setAttribute('aria-expanded', String(nav.classList.contains('mobile-open')));
  });
  document.addEventListener('click', closeMenus, { once: true });
  document.querySelectorAll('[data-cookie]').forEach(btn => btn.addEventListener('click', () => {
    localStorage.setItem('nightfall-cookie-choice', btn.dataset.cookie);
    document.querySelector('.cookie-panel')?.remove();
  }));
  document.querySelector('.cookie-close')?.addEventListener('click', () => document.querySelector('.cookie-panel')?.remove());
}

function closeMenus(e) {
  if (!e.target.closest('.menu-wrap')) document.querySelectorAll('.menu-wrap').forEach(x => x.classList.remove('open'));
}

window.addEventListener('hashchange', render);
render();
