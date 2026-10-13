/* ==============================================================
   Portfolio interactions — lightbox, auto-updating dates,
   subtle scroll behaviours
   ============================================================== */

(function () {
  'use strict';

  /* ---------- Dates that should never go stale ---------- */
  const PRACTICE_START = 2010;
  const now = new Date();
  const years = now.getFullYear() - PRACTICE_START;
  document.querySelectorAll('[data-years]').forEach((el) => { el.textContent = String(years); });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(now.getFullYear()); });

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  // Collect every zoom-in link into a single gallery, in DOM order
  const items = Array.from(document.querySelectorAll('a.lb'));
  let currentIndex = 0;
  let returnFocusTo = null;

  function openAt(i) {
    if (i < 0 || i >= items.length) return;
    currentIndex = i;
    const a = items[i];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img')?.getAttribute('alt') || '';
    lbCap.textContent = a.getAttribute('data-title') || '';

    if (!lb.classList.contains('open')) {
      returnFocusTo = document.activeElement;
      lb.hidden = false;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lb.hidden = true;
    document.body.style.overflow = '';
    // Remove the attribute rather than setting src="" — an empty src
    // makes some browsers re-request the current page.
    lbImg.removeAttribute('src');
    lbImg.alt = '';
    if (returnFocusTo && typeof returnFocusTo.focus === 'function') returnFocusTo.focus();
  }

  function next() { openAt((currentIndex + 1) % items.length); }
  function prev() { openAt((currentIndex - 1 + items.length) % items.length); }

  items.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      // Let modified clicks (new tab etc.) behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
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

  // Keyboard controls + keep focus inside the dialog while open
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Tab') {
      const focusables = [lbClose, lbPrev, lbNext];
      const idx = focusables.indexOf(document.activeElement);
      e.preventDefault();
      const step = e.shiftKey ? -1 : 1;
      focusables[(idx + step + focusables.length) % focusables.length].focus();
    }
  });

  /* ---------- Blueprint view toggle ---------- */
  const root = document.documentElement;
  const viewToggle = document.getElementById('viewToggle');
  function syncToggle() {
    const on = root.getAttribute('data-view') === 'blueprint';
    viewToggle.setAttribute('aria-pressed', String(on));
    viewToggle.title = on ? 'Switch to standard view' : 'Switch to blueprint view';
  }
  if (viewToggle) {
    syncToggle();
    viewToggle.addEventListener('click', () => {
      const on = root.getAttribute('data-view') !== 'blueprint';
      if (on) root.setAttribute('data-view', 'blueprint');
      else root.removeAttribute('data-view');
      try { localStorage.setItem('bm-view', on ? 'blueprint' : 'standard'); } catch (e) { /* storage unavailable */ }
      syncToggle();
    });
  }

  /* ---------- Before / after comparison ---------- */
  document.querySelectorAll('.compare-frame').forEach((frame) => {
    const range = frame.querySelector('.compare-range');
    if (!range) return;
    const update = () => frame.style.setProperty('--pos', range.value + '%');
    range.addEventListener('input', update);
    update();
  });

  /* ---------- Locality plan: link map pins and key ---------- */
  const locLinks = Array.from(document.querySelectorAll('.locality [data-pins]'));
  function setHot(ids, on) {
    locLinks.forEach((el) => {
      const mine = el.getAttribute('data-pins').split(',');
      if (mine.some((id) => ids.includes(id))) el.classList.toggle('is-hot', on);
    });
  }
  locLinks.forEach((el) => {
    const ids = el.getAttribute('data-pins').split(',');
    ['mouseenter', 'focus'].forEach((ev) => el.addEventListener(ev, () => setHot(ids, true)));
    ['mouseleave', 'blur'].forEach((ev) => el.addEventListener(ev, () => setHot(ids, false)));
  });

  /* ---------- Reveal-on-scroll for project cards ---------- */
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
