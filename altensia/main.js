// ALTENSIA — main.js

// --- Mobile menu toggle ---
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll(
  '.parcours-item, .pq-card, .stat-item, .cons-left, .cons-right, .diag-text'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// --- Sticky nav shadow on scroll ---
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.borderBottomColor = 'rgba(11,25,41,0.15)';
  } else {
    nav.style.borderBottomColor = 'rgba(11,25,41,0.10)';
  }
});
