/* ============================================
   SIYIN — Shared Components
   components.js — nav, footer, toast
   ============================================ */

// ── Active page detection ──
const currentPage = location.pathname.split('/').pop() || 'index.html';

// ── Inject Topbar ──
function renderTopbar() {
  return `
  <div class="topbar">
    <div class="topbar-inner">
      <div class="topbar-left">
        <div class="tb-item">
          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 10.5a19.79 19.79 0 01-3-8.59A2 2 0 012.68 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.69a16 16 0 006.4 6.4l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
          <a href="tel:+8607698281508">+86 0769-8281-5056</a>
        </div>
        <div class="tb-item">
          <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:sales@slyinsports.com">sales@slyinsports.com</a>
        </div>
      </div>
      <div class="topbar-right">
        <div class="tb-item">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Dongguan, Guangdong, China
        </div>
        <div class="tb-item" style="cursor:pointer">🌐 EN</div>
      </div>
    </div>
  </div>`;
}

// ── Inject Nav ──
function renderNav() {
  const pages = [
    { file: 'index.html', label: 'Home' },
    { file: 'products.html', label: 'Products', dropdown: [
      { href: 'products.html#neoprene-sheet', label: 'Neoprene Sheet (Raw)' },
      { href: 'products.html#laminated', label: 'Laminated Neoprene' },
      { href: 'products.html#printed', label: 'Printed Neoprene' },
      { href: 'products.html#embossed', label: 'Embossed Neoprene' },
      { href: 'products.html#perforated', label: 'Perforated Neoprene' },
    ]},
    { file: 'about.html', label: 'About Us' },
    { file: 'applications.html', label: 'Applications' },
    { file: 'contact.html', label: 'Contact' },
  ];

  const menuHTML = pages.map(p => {
    const isActive = currentPage === p.file ? 'active' : '';
    if (p.dropdown) {
      const dropItems = p.dropdown.map(d =>
        `<a href="${d.href}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="9 18 15 12 9 6"/></svg>${d.label}</a>`
      ).join('');
      return `<div class="nav-item">
        <div class="nav-link ${isActive}">${p.label}
          <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="dropdown">${dropItems}<div class="dropdown-divider"></div><a href="products.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="9 18 15 12 9 6"/></svg>View All Products →</a></div>
      </div>`;
    }
    return `<div class="nav-item"><a class="nav-link ${isActive}" href="${p.file}">${p.label}</a></div>`;
  }).join('');

  return `
  <nav class="nav" id="mainNav">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <div class="logo-box"><span>SY</span></div>
        <div class="logo-info"><strong>Dongguan Siyin</strong><em>Sports Goods Co., Ltd.</em></div>
      </a>
      <div class="nav-menu">${menuHTML}</div>
      <div class="nav-actions">
        <a href="contact.html?t=quote" class="btn btn-blue btn-sm">Get a Quote</a>
        <a href="contact.html?t=sample" class="btn btn-outline btn-sm">Free Sample</a>
      </div>
    </div>
  </nav>`;
}

// ── Inject Footer ──
function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo logo">
            <div class="logo-box"><span>SY</span></div>
            <div class="logo-info"><strong>Dongguan Siyin</strong><em>Sports Goods Co., Ltd.</em></div>
          </div>
          <p class="footer-about">Professional neoprene & laminated fabric manufacturer in Dongguan, China. 10+ years supplying CR/SBR/SCR neoprene to global brands in 30+ countries.</p>
          <div class="footer-socials">
            <div class="f-social">in</div>
            <div class="f-social">1688</div>
            <a class="f-social" href="https://wa.me/8613900000000" target="_blank">W</a>
          </div>
        </div>
        <div>
          <div class="f-col-title">Products</div>
          <ul class="f-links">
            <li><a href="products.html#neoprene-sheet">Neoprene Sheet</a></li>
            <li><a href="products.html#laminated">Laminated Fabric</a></li>
            <li><a href="products.html#printed">Printed Neoprene</a></li>
            <li><a href="products.html#embossed">Embossed Neoprene</a></li>
            <li><a href="products.html#perforated">Perforated Neoprene</a></li>
          </ul>
        </div>
        <div>
          <div class="f-col-title">Company</div>
          <ul class="f-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="about.html#factory">Factory Tour</a></li>
            <li><a href="about.html#capabilities">Capabilities</a></li>
            <li><a href="applications.html">Applications</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <div class="f-col-title">Contact</div>
          <div class="f-contact">
            <div class="f-contact-row"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Dongguan City, Guangdong, China</span></div>
            <div class="f-contact-row"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 10.5a19.79 19.79 0 01-3-8.59A2 2 0 012.68 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.69a16 16 0 006.4 6.4l1.06-1.06a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg><a href="tel:+8607698281508">+86 0769-8281-5056</a></div>
            <div class="f-contact-row"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:sales@slyinsports.com">sales@slyinsports.com</a></div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <p>© 2025 Dongguan Siyin Sports Goods Co., Ltd. All Rights Reserved.</p>
        <div class="footer-bar-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
  <a class="wa-btn" href="https://wa.me/8613900000000?text=Hello%2C%20I%27m%20interested%20in%20your%20neoprene%20products." target="_blank" title="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
  </a>`;
}

// ── Inject into page ──
document.addEventListener('DOMContentLoaded', () => {
  const topbarEl = document.getElementById('topbar');
  const navEl = document.getElementById('nav');
  const footerEl = document.getElementById('footer');
  if (topbarEl) topbarEl.innerHTML = renderTopbar();
  if (navEl) navEl.innerHTML = renderNav();
  if (footerEl) footerEl.innerHTML = renderFooter();
});

// ── Scroll animations ──
const animObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
document.querySelectorAll('.anim, .anim-scale').forEach(el => animObs.observe(el));

// Re-run after DOM injection
setTimeout(() => {
  document.querySelectorAll('.anim, .anim-scale').forEach(el => animObs.observe(el));
  // Sticky nav
  window.addEventListener('scroll', () => {
    document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}, 100);

// ── Counter animation ──
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = target >= 100 ? Math.floor(target * ease).toLocaleString() : (target * ease).toFixed(target % 1 !== 0 ? 1 : 0);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      animateCount(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// ── Toast ──
window.showToast = function(msg, type='') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'toast ' + type;
  requestAnimationFrame(() => { t.classList.add('show'); });
  setTimeout(() => t.classList.remove('show'), 3200);
};

// ── Form handling ──
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (!form.dataset.form) return;
  e.preventDefault();
  const data = new FormData(form);
  const lines = [...data.entries()].map(([k,v]) => `${k}: ${v}`).join('\n');
  const subj = encodeURIComponent('Inquiry – ' + (data.get('company') || data.get('name') || 'Website Visitor'));
  const body = encodeURIComponent(lines);
  window.location.href = `mailto:sales@slyinsports.com?subject=${subj}&body=${body}`;
  const btn = form.querySelector('[type=submit]');
  if (btn) { btn.textContent = '✓ Sent! We\'ll reply within 24h'; btn.disabled = true; btn.style.background = '#22c55e'; }
  showToast('Message sent! We will reply within 24 hours.', 'success');
});
/* ==========================================
   修复顶部栏和 Footer 图标大小（精致版）
   适用于动态注入的 SVG
   ========================================== */
.tb-item svg,
.f-contact-row svg,
.footer-bar svg {
    width: 13px !important;       /* 图标宽度 */
    height: 13px !important;      /* 图标高度 */
    vertical-align: middle !important; /* 保持和文字对齐 */
    margin-right: 5px !important; /* 图标和文字间距 */
}
