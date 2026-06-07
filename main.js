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
