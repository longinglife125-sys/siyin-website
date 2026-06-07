/* ============================================
   SIYIN ADMIN — Core JavaScript
   admin.js — shared across all admin pages
   ============================================ */

// ── Auth Guard ──
(function(){
  if(sessionStorage.getItem('siyin_admin')!=='1' && !location.href.includes('index.html')){
    window.location.href='index.html';
  }
})();

// ── Data Store (localStorage) ──
const DB = {
  get(key){ try{ return JSON.parse(localStorage.getItem('siyin_'+key)||'null'); }catch(e){ return null; } },
  set(key,val){ localStorage.setItem('siyin_'+key, JSON.stringify(val)); },
  // Seed default data on first load
  init(){
    if(!this.get('products')) this.set('products', defaultProducts());
    if(!this.get('inquiries')) this.set('inquiries', defaultInquiries());
    if(!this.get('settings')) this.set('settings', defaultSettings());
    if(!this.get('pages')) this.set('pages', defaultPages());
  }
};

function defaultProducts(){
  return [
    {id:'p1',name:'Neoprene Sheet SBR',category:'sheet',grade:'SBR',thickness:'2–5mm',fabric:'N/A',price:'',moq:'50m',status:'active',featured:true,desc:'Premium SBR neoprene sheet for lamination or direct use.',img:'',created:Date.now()-86400000*10},
    {id:'p2',name:'Single Face Laminated CR/T',category:'laminated',grade:'CR',thickness:'3mm',fabric:'涤纶 (Polyester)',price:'',moq:'50m',status:'active',featured:true,desc:'CR neoprene laminated with polyester fabric on one side.',img:'',created:Date.now()-86400000*8},
    {id:'p3',name:'Double Face SBR/N/N',category:'laminated',grade:'SBR',thickness:'3mm',fabric:'Nylon both sides',price:'',moq:'100m',status:'active',featured:true,desc:'SBR neoprene with nylon jersey laminated on both sides.',img:'',created:Date.now()-86400000*6},
    {id:'p4',name:'Printed Neoprene Custom',category:'printed',grade:'SBR',thickness:'3mm',fabric:'Polyester',price:'',moq:'200m',status:'active',featured:false,desc:'Full-color custom printing on neoprene surface.',img:'',created:Date.now()-86400000*4},
    {id:'p5',name:'Perforated SBR Breathable',category:'perforated',grade:'SBR',thickness:'2–3mm',fabric:'Jersey',price:'',moq:'100m',status:'active',featured:false,desc:'Perforated neoprene for breathable sports applications.',img:'',created:Date.now()-86400000*2},
    {id:'p6',name:'Smooth Skin CR Wetsuit',category:'sheet',grade:'CR',thickness:'3–7mm',fabric:'Smooth skin',price:'',moq:'50m',status:'active',featured:true,desc:'Smooth skin CR neoprene for professional wetsuits.',img:'',created:Date.now()-86400000*1},
  ];
}
function defaultInquiries(){
  return [
    {id:'inq1',name:'James Wilson',company:'OceanGear Ltd',email:'james@oceangear.com',phone:'+1 604 555 0192',country:'Canada',product:'Wetsuit material',message:'Need 500m of 3mm CR/T per month. Can you provide samples?',type:'quote',status:'new',created:Date.now()-3600000*2,reply:''},
    {id:'inq2',name:'Sophie Laurent',company:'SportMax EU',email:'sophie@sportmax.eu',phone:'+33 6 12 34 56',country:'France',product:'Sports supports',message:'Looking for SBR laminated with 佳积布 for knee brace production.',type:'sample',status:'replied',created:Date.now()-3600000*8,reply:'Thanks Sophie, samples dispatched today via DHL.'},
    {id:'inq3',name:'Mike Tanaka',company:'Bottle Co Japan',email:'mike@bottleco.jp',phone:'+81 90 1234 5678',country:'Japan',product:'Bottle sleeve material',message:'Need 3mm SBR with full-color print. Annual volume 50,000 units.',type:'quote',status:'new',created:Date.now()-3600000*24,reply:''},
    {id:'inq4',name:'Anna Petrov',company:'FitBrands RU',email:'anna@fitbrands.ru',phone:'',country:'Russia',product:'Custom OEM',message:'Interested in private label neoprene sports wraps.',type:'drawing',status:'pending',created:Date.now()-3600000*48,reply:''},
  ];
}
function defaultSettings(){
  return {
    company:'Dongguan Siyin Sports Goods Co., Ltd.',
    phone:'+86 0769-8281-5056',
    email:'sales@slyinsports.com',
    whatsapp:'+8613900000000',
    address:'Dongguan City, Guangdong Province, China 523000',
    website:'https://www.siyin-neoprene.com',
    admin_user:'admin',
    admin_pass:'siyin2025',
    meta_title:'Dongguan Siyin Sports Goods – Neoprene & Laminated Fabric Manufacturer',
    meta_desc:'Professional neoprene and laminated fabric manufacturer in Dongguan China.',
    ga_id:'',
    banner_text:'🚀 Fast 3–7 day sampling · Low MOQ · ISO Certified',
    banner_show:true,
  };
}
function defaultPages(){
  return [
    {id:'home',name:'Homepage',status:'published',lastEdit:Date.now()-86400000*2},
    {id:'products',name:'Products',status:'published',lastEdit:Date.now()-86400000*1},
    {id:'about',name:'About Us',status:'published',lastEdit:Date.now()-86400000*3},
    {id:'applications',name:'Applications',status:'published',lastEdit:Date.now()-86400000*5},
    {id:'contact',name:'Contact',status:'published',lastEdit:Date.now()-86400000*1},
  ];
}

// Initialize DB
DB.init();

// ── Toast ──
function toast(msg, type='', duration=3000){
  let el = document.getElementById('toast');
  if(!el){ el=document.createElement('div'); el.id='toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.className = 'show ' + type;
  clearTimeout(el._timer);
  el._timer = setTimeout(()=>{ el.classList.remove('show'); }, duration);
}

// ── Sidebar active link ──
function setActiveNav(){
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.classList.toggle('active', item.dataset.page === path);
  });
}

// ── Generate ID ──
function genId(prefix='id'){
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

// ── Format date ──
function fmtDate(ts){
  return new Date(ts).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}
function fmtDateTime(ts){
  return new Date(ts).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
}

// ── Confirm modal ──
function confirmAction(msg, onYes){
  if(window.confirm(msg)) onYes();
}

// ── Logout ──
function logout(){
  sessionStorage.removeItem('siyin_admin');
  window.location.href='index.html';
}

// ── Current admin user ──
function currentUser(){
  return sessionStorage.getItem('siyin_admin_user') || 'Admin';
}

// ── Render sidebar nav ──
const NAV_ITEMS = [
  { section:'Main' },
  { page:'dashboard.html', icon:'grid', label:'Dashboard' },
  { page:'products.html', icon:'package', label:'Products', badge:'products' },
  { page:'inquiries.html', icon:'mail', label:'Inquiries', badge:'inquiries_new' },
  { section:'Content' },
  { page:'pages.html', icon:'file-text', label:'Pages' },
  { page:'media.html', icon:'image', label:'Media Library' },
  { section:'Settings' },
  { page:'settings.html', icon:'settings', label:'Site Settings' },
  { page:'seo.html', icon:'search', label:'SEO' },
];

const ICONS = {
  grid:'<polyline points="3 3 3 8 8 8 8 3 3 3"/><polyline points="14 3 14 8 19 8 19 3 14 3"/><polyline points="14 14 14 19 19 19 19 14 14 14"/><polyline points="3 14 3 19 8 19 8 14 3 14"/>',
  package:'<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  'file-text':'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'log-out':'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
};

function renderSidebar(){
  const products = DB.get('products')||[];
  const inquiries = DB.get('inquiries')||[];
  const newInq = inquiries.filter(i=>i.status==='new').length;

  let html = '';
  NAV_ITEMS.forEach(item => {
    if(item.section){
      html += `<div class="nav-section"><div class="nav-section-title">${item.section}</div>`;
    } else {
      let badge = '';
      if(item.badge==='products') badge = `<span class="badge green">${products.length}</span>`;
      if(item.badge==='inquiries_new' && newInq>0) badge = `<span class="badge">${newInq}</span>`;
      const ico = ICONS[item.icon]||'';
      html += `<a class="nav-item" href="${item.page}" data-page="${item.page}">
        <svg viewBox="0 0 24 24">${ico}</svg>${item.label}${badge}
      </a></div>`;
    }
  });

  // User + logout
  const user = currentUser();
  const sidebar = document.getElementById('sidebar');
  if(!sidebar) return;
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="sidebar-logo-inner">
        <div class="s-logo-box">SY</div>
        <div class="s-logo-text"><strong>Siyin Admin</strong><em>Management Panel</em></div>
      </div>
    </div>
    <nav class="sidebar-nav">${html}</nav>
    <div class="sidebar-bottom">
      <div class="sidebar-user" onclick="logout()">
        <div class="user-avatar">${user[0].toUpperCase()}</div>
        <div><div class="user-name">${user}</div><div class="user-role">Administrator</div></div>
        <svg style="margin-left:auto;width:14px;height:14px;stroke:rgba(255,255,255,.35);fill:none;stroke-width:2" viewBox="0 0 24 24">${ICONS['log-out']}</svg>
      </div>
    </div>`;
  setActiveNav();
}

// ── Modal helpers ──
function openModal(id){ document.getElementById(id)?.classList.add('open'); }
function closeModal(id){ document.getElementById(id)?.classList.remove('open'); }
// Close on overlay click
document.addEventListener('click', e => {
  if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});
// Close on Esc
document.addEventListener('keydown', e => {
  if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
});

// Run on load
document.addEventListener('DOMContentLoaded', ()=>{
  renderSidebar();
  if(typeof pageInit === 'function') pageInit();
});
