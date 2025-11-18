(function () {
  const storageKey = 'lang';
  const defaultLang = localStorage.getItem(storageKey) || 'pt';

  function getLanguage() {
    return localStorage.getItem(storageKey) || 'pt';
  }

  function setLanguage(lang) {
    localStorage.setItem(storageKey, lang);
    applyLanguage();
  }

  function applyLanguage() {
    const lang = getLanguage();
    document.body.classList.remove('lang-pt', 'lang-en');
    document.body.classList.add(`lang-${lang}`);

    const buttons = document.querySelectorAll('[data-lang-button]');
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.langButton === lang);
    });
  }

  function buildHeader() {
    const header = document.querySelector('#site-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <div class="logo">
          <a href="index.html" aria-label="Rodrigo Kajioka">
            <img src="../assets/logo.png" alt="Rodrigo Kajioka" />
          </a>
        </div>
        <button class="nav-toggle" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="main-nav">
          <a class="nav-link" href="s1.html">S1 General Sportsbook Knowledge</a>
          <a class="nav-link" href="s2_1.html">S2 Modelling 1</a>
          <a class="nav-link" href="s2_2.html">S2 Modelling 2</a>
          <a class="nav-link" href="s2_3.html">S2 Modelling 3</a>
          <a class="nav-link" href="s2_4.html">S2 Modelling 4</a>
        </nav>
        <div class="lang-switch">
          <button type="button" data-lang-button="pt">🇧🇷</button>
          <span>|</span>
          <button type="button" data-lang-button="en">🇺🇸</button>
        </div>
      </div>
    `;
  }

  function buildFooter() {
    const footer = document.querySelector('#site-footer');
    if (!footer) return;
    footer.innerHTML = `
      <div class="lang lang-pt"><p>Desenvolvido por Rodrigo Kajioka Pantuffi</p></div>
      <div class="lang lang-en"><p>Developed by Rodrigo Kajioka Pantuffi</p></div>
    `;
  }

  function bindLanguageSwitch() {
    document.querySelectorAll('[data-lang-button]').forEach((button) => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.langButton);
      });
    });
  }

  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  function initQAAccordion() {
    const blocks = document.querySelectorAll('.qa-block');
    blocks.forEach((block) => {
      const header = block.querySelector('.qa-header');
      const body = block.querySelector('.qa-body');
      if (!header || !body || header.dataset.accordionReady === 'true') return;

      let arrow = header.querySelector('.qa-toggle-arrow');
      if (!arrow) {
        arrow = document.createElement('span');
        arrow.className = 'qa-toggle-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '▾';
        header.appendChild(arrow);
      }

      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
      header.dataset.accordionReady = 'true';

      const toggleBlock = () => {
        const isOpen = block.classList.toggle('open');
        header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };

      header.addEventListener('click', toggleBlock);
      header.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleBlock();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, defaultLang);
    }

    buildHeader();
    buildFooter();
    bindLanguageSwitch();
    initNavToggle();
    initQAAccordion();
    applyLanguage();
  });

  window.setLanguage = setLanguage;
  window.getLanguage = getLanguage;
  window.applyLanguage = applyLanguage;
})();
