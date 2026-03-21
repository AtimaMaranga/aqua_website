/**
 * Aqua & Agriculture Initiative - Main JavaScript
 */
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    document.addEventListener('scroll', toggleBacktotop);
  }

  /**
   * Header scroll effect
   */
  const header = select('#header');
  if (header) {
    const toggleHeaderScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('load', toggleHeaderScroll);
    document.addEventListener('scroll', toggleHeaderScroll);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  /**
   * Close mobile nav on link click
   */
  on('click', '.navbar-mobile a:not(.dropdown > a)', function(e) {
    const navbar = select('#navbar');
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      const toggle = select('.mobile-nav-toggle');
      if (toggle) {
        toggle.classList.add('bi-list');
        toggle.classList.remove('bi-x');
      }
    }
  }, true);

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll (AOS)
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

  /**
   * PureCounter initialization
   */
  window.addEventListener('load', () => {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  });

  /**
   * Gallery filter
   */
  on('click', '.filter-btn', function() {
    const filter = this.getAttribute('data-filter');
    select('.filter-btn', true).forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    select('.gallery-item', true).forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }, true);

  /**
   * Gallery lightbox
   */
  on('click', '.gallery-lightbox', function(e) {
    e.preventDefault();
    const modal = select('#galleryModal');
    const modalImg = select('#modalImg');
    if (modal && modalImg) {
      modalImg.src = this.getAttribute('href');
      modal.classList.add('active');
    }
  }, true);

  on('click', '#modalClose', function() {
    const modal = select('#galleryModal');
    if (modal) modal.classList.remove('active');
  });

  on('click', '#galleryModal', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = select('#galleryModal');
      if (modal) modal.classList.remove('active');
    }
  });

})();
