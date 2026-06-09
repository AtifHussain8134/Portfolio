/* ============================================================
   script.js — Atif Hussain Portfolio
============================================================ */

// ── Dark Mode Toggle ──────────────────────────────────────
const darkToggle = document.getElementById('dark-toggle');
const html = document.documentElement;

// Persist preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

darkToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Hamburger Menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ── Scroll Reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active Nav on Scroll ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#fff';
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth Scroll for all anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Contact Form ──────────────────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  const name = document.getElementById('cf-name').value.trim();

  note.textContent = `Thank you, ${name}! Your message has been noted. Please send it directly to engr.atif.134@gmail.com.`;
  note.style.color = '#16a34a';

  // Build mailto link as fallback
  const email = document.getElementById('cf-email').value.trim();
  const subject = encodeURIComponent(document.getElementById('cf-subject').value.trim() || 'Portfolio Inquiry');
  const body = encodeURIComponent(document.getElementById('cf-msg').value.trim());
  const mailto = `mailto:engr.atif.134@gmail.com?subject=${subject}&body=${body}`;

  // Open mail client
  window.location.href = mailto;
}

// ── Navbar scroll shadow ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.25)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });
