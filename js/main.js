/* ============================================================
   BIGDOG — Main JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Lightbox (gallery page) ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const items = document.querySelectorAll('.gallery-item');
    let currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      lbImg.src = items[idx].querySelector('img').src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox((currentIdx - 1 + items.length) % items.length);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox((currentIdx + 1) % items.length);
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox((currentIdx - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') openLightbox((currentIdx + 1) % items.length);
    });
  }

  // --- Hero slideshow ---
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 6000);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
