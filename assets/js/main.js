// main.js — theme toggle + tiny helpers + improved navbar + mobile menu
(function(){
  const root = document.documentElement;
  const yearEl = document.getElementById('year');

  // Set current year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme helpers
  function getInitialTheme(){
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function updateIcons(theme){
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(i => { i.textContent = theme === 'dark' ? 'Light' : 'Dark'; });
  }

  function applyTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    updateIcons(t);
  }

  // Mobile menu helpers
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobile(){
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    if (mobileOverlay) mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded','true');
    if (mobileClose) mobileClose.focus();
  }
  function closeMobile(){
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    if (mobileOverlay) mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    if (mobileToggle) { mobileToggle.setAttribute('aria-expanded','false'); mobileToggle.focus(); }
  }

  // Activate current nav link (desktop + mobile)
  function markActiveLinks(){
    const links = document.querySelectorAll('.site-navbar .nav-link, #mobileMenu .nav-link');
    links.forEach(link => {
      try {
        const linkPath = new URL(link.href, location.origin).pathname.replace(/\/+$/,'') || '/';
        const locPath = location.pathname.replace(/\/+$/,'') || '/';
        if (linkPath === locPath) link.classList.add('active');
      } catch (e) {}
    });
  }

  // Scroll behavior: add .scrolled to navbar after small scroll
  function initNavbarScroll(){
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;
    const onScroll = () => {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  document.addEventListener('DOMContentLoaded', function(){
    // theme init
    const init = getInitialTheme();
    applyTheme(init);

    // wire up all theme buttons (desktop + mobile) using data-theme-toggle attribute
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(btn => btn.addEventListener('click', function(){
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }));

    // mobile menu wiring
    if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

    // escape to close mobile menu
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) closeMobile();
    });

    // init helpers
    initNavbarScroll();
    markActiveLinks();
  });
  // ...existing code...
  document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;
    function onScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // run on load
  });
  // ...existing code...
})();

