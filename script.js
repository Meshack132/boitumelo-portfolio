/* ==============================================================
   Portfolio interactions — lightbox + subtle scroll behaviours
   ============================================================== */

(function () {
  'use strict';

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  // Collect every zoom-in link into a single gallery, in DOM order
  const items = Array.from(document.querySelectorAll('a.lb'));
  let currentIndex = 0;

  function openAt(i) {
    if (i < 0 || i >= items.length) return;
    currentIndex = i;
    const a = items[i];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img')?.getAttribute('alt') || '';
    lbCap.textContent = a.getAttribute('data-title') || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function next() { openAt((currentIndex + 1) % items.length); }
  function prev() { openAt((currentIndex - 1 + items.length) % items.length); }

  items.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openAt(i);
    });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Click backdrop to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Small nicety: reveal-on-scroll for project cards
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project, .stat, .timeline li').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      io.observe(el);
    });
  }
})();
