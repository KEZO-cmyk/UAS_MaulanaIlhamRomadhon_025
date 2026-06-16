/* ============================================
   BIODATA WEBSITE — JAVASCRIPT
   Maulana Ilham Romadhon
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR SCROLL ==========
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
    toggleBackToTop();
  });

  // ========== HAMBURGER MENU ==========
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ========== ACTIVE NAV LINK ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  // ========== DARK MODE TOGGLE ==========
  const toggleBtn = document.querySelector('.dark-toggle');
  const stored = localStorage.getItem('theme');
  if (stored) applyTheme(stored);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ========== BACK TO TOP ==========
  const btt = document.querySelector('.back-to-top');
  function toggleBackToTop() {
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ========== SCROLL ANIMATIONS (IntersectionObserver) ==========
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-left, .timeline-item').forEach(el => {
    animObserver.observe(el);
  });

  // Stagger delay for children
  document.querySelectorAll('.stagger').forEach(parent => {
    [...parent.children].forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  // ========== SKILL BARS ==========
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const target = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = target; }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillSection = document.querySelector('#skill');
  if (skillSection) skillObserver.observe(skillSection);

  // ========== GALERI TABS ==========
  const tabs = document.querySelectorAll('.galeri-tab');
  const items = document.querySelectorAll('.galeri-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat');
      items.forEach(item => {
        const show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // ========== FORM SUBMIT ==========
  const form = document.querySelector('.kontak-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Pesan Terkirim!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.textContent = 'Kirim Pesan';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== TYPING ANIMATION for Hero ==========
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const texts = ['Sains Data', 'Machine Learning', 'Web Development', 'Data Analysis'];
    let ti = 0, ci = 0, deleting = false;
    function type() {
      const current = texts[ti];
      if (!deleting) {
        typingEl.textContent = current.substring(0, ci++);
        if (ci > current.length) { deleting = true; setTimeout(type, 1500); return; }
      } else {
        typingEl.textContent = current.substring(0, ci--);
        if (ci < 0) { deleting = false; ti = (ti + 1) % texts.length; ci = 0; }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

});
