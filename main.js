// =========================
// Sticky Navbar Shadow
// =========================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');

  if (!nav) return;

  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// =========================
// Scroll Animation
// =========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }

  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.anim, .anim-scale')
.forEach(el => observer.observe(el));


// =========================
// Toast Notification
// =========================
function showToast(message, type = 'success') {

  const oldToast = document.querySelector('.toast');

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement('div');

  toast.className = `toast ${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('show');

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 2500);
}


// =========================
// RFQ Form Demo
// =========================
document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form');

  if (!form) return;

  form.addEventListener('submit', function(e) {

    e.preventDefault();

    showToast(
      'Inquiry submitted successfully!',
      'success'
    );

    form.reset();

  });

});
// ============================================
// 前台商品管理 - 从 localStorage 读取
// ============================================

// 获取商品数据
function getProducts() {
  try {
    const data = localStorage.getItem('siyin_products');
    return data ? JSON.parse(data) : [];
  } catch(e) {
    console.error('读取商品失败:', e);
    return [];
  }
}

// 获取单个商品
function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

// 渲染首页产品（Featured Products 区域）
function renderHomeProducts() {
  const container = document.querySelector('.products-grid');
  if (!container) return;
  
  const allProducts = getProducts();
  
  // 优先显示 featured 商品，最多显示6个
  let displayProducts = allProducts.filter(p => p.status === 'active');
  
  // 按 featured 排序
  displayProducts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  // 只取前6个
  displayProducts = displayProducts.slice(0, 6);
  
  // 如果没有商品，显示默认占位内容
  if (displayProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)">
        <div style="font-size:40px;margin-bottom:12px">📦</div>
        <div>暂无商品，请在后台添加</div>
        <a href="admin/products.html" class="btn btn-outline" style="margin-top:16px">前往后台添加</a>
      </div>
    `;
    return;
  }
  
  // 渲染商品卡片
  container.innerHTML = displayProducts.map(p => `
    <a href="product-detail.html?id=${p.id}" class="prod-card">
      <div class="prod-img">
        ${p.images && p.images[0] 
          ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;font-size:32px">📦</div>`
        }
      </div>
      <div class="prod-body">
        <div class="prod-name">${escapeHtml(p.name)}</div>
        <div class="prod-spec">${p.grade || ''} ${p.thickness || ''} ${p.fabric || ''}</div>
      </div>
    </a>
  `).join('');
}

// 渲染产品页面（products.html 用）
function renderAllProducts() {
  const container = document.querySelector('.products-grid');
  if (!container) return;
  
  const products = getProducts();
  const activeProducts = products.filter(p => p.status === 'active');
  
  if (activeProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px">
        <div>暂无商品</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = activeProducts.map(p => `
    <a href="product-detail.html?id=${p.id}" class="prod-card">
      <div class="prod-img">
        ${p.images && p.images[0] 
          ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;font-size:32px">📦</div>`
        }
      </div>
      <div class="prod-body">
        <div class="prod-name">${escapeHtml(p.name)}</div>
        <div class="prod-spec">${p.grade || ''} ${p.thickness || ''}</div>
      </div>
    </a>
  `).join('');
}

// 转义 HTML 防止 XSS
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 页面加载时渲染
document.addEventListener('DOMContentLoaded', function() {
  // 根据当前页面决定渲染哪个
  if (document.querySelector('.products-grid')) {
    // 判断是否是首页（有 featured products 标志）
    const isHomePage = document.querySelector('.products-header .section-tag');
    if (isHomePage && isHomePage.textContent.includes('Featured')) {
      renderHomeProducts();
    } else {
      renderAllProducts();
    }
  }
});
