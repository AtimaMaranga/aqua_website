/* Aqua & Agriculture Initiative — site interactions */
(function () {
  'use strict';

  /* nav shadow on scroll */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('solid');
      else nav.classList.remove('solid');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* mobile menu */
  var burger = document.querySelector('.burger');
  var sheet = document.querySelector('.mobile-sheet');
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      var open = sheet.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        sheet.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* scroll reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* count up */
  function animateNum(el) {
    var target = parseFloat(el.dataset.to), dur = 1600, start = null;
    var dec = (target % 1 !== 0) ? 1 : 0;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = target * (1 - Math.pow(1 - p, 3));
      el.firstChild.nodeValue = (dec ? v.toFixed(1) : Math.round(v)).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.firstChild.nodeValue = (dec ? target.toFixed(1) : Math.round(target)).toLocaleString();
    }
    requestAnimationFrame(step);
  }
  var numObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { animateNum(e.target); numObs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-to]').forEach(function (el) { numObs.observe(el); });

  /* rotating verbs */
  var rot = document.querySelector('.rot');
  if (rot) {
    var items = Array.prototype.slice.call(rot.querySelectorAll('span'));
    var i = 0;
    var widthTo = function () { rot.style.width = items[i].offsetWidth + 'px'; };
    widthTo();
    rot.style.transition = 'width .5s cubic-bezier(.2,.7,.3,1)';
    setInterval(function () {
      items[i].classList.remove('cur');
      i = (i + 1) % items.length;
      items[i].classList.add('cur');
      widthTo();
    }, 2200);
    window.addEventListener('resize', widthTo);
  }

  /* subtle hero parallax */
  var heroImg = document.querySelector('.hero-media img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) heroImg.style.transform = 'scale(1.06) translateY(' + (y * 0.1) + 'px)';
    }, { passive: true });
  }

  /* newsletter (demo) */
  var form = document.querySelector('.news');
  if (form) form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var btn = form.querySelector('button');
    btn.textContent = 'Subscribed ✓';
    form.querySelector('input').value = '';
    setTimeout(function () { btn.textContent = 'Subscribe'; }, 2600);
  });

  /* gallery filter */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var gcards = document.querySelectorAll('.gallery-grid .gcard');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.filter;
        gcards.forEach(function (c) {
          var show = (f === 'all' || c.dataset.category === f);
          c.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* gallery lightbox */
  var modal = document.querySelector('.gallery-modal');
  if (modal && gcards.length) {
    var modalImg = modal.querySelector('img');
    var close = modal.querySelector('.close');
    gcards.forEach(function (c) {
      c.addEventListener('click', function () {
        var img = c.querySelector('img');
        if (!img) return;
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    var closeModal = function () {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  /* back to top */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }, { passive: true });
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
