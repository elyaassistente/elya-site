(() => {
  const consentKey = 'elya_cookie_consent';
  const measurementId = 'G-2ENXYD4RRR';
  let analyticsLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  const loadAnalytics = () => {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
  };

  const applyConsent = (choice) => {
    const accepted = choice === 'accepted';
    window.gtag('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    if (accepted) loadAnalytics();
  };

  const showCookieBanner = () => {
    document.querySelector('.cookie-banner')?.remove();

    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Preferências de privacidade');
    banner.innerHTML = `
      <div class="cookie-banner__content">
        <div>
          <strong>Privacidade e cookies</strong>
          <p>Usamos cookies de medição para entender, de forma anônima, como o site é utilizado. O Analytics só será carregado se você aceitar. <a href="privacidade.html">Leia a Política de Privacidade</a>.</p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-button cookie-button--secondary" data-cookie-choice="rejected">Recusar</button>
          <button type="button" class="cookie-button cookie-button--primary" data-cookie-choice="accepted">Aceitar</button>
        </div>
      </div>`;

    banner.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cookie-choice]');
      if (!button) return;

      const choice = button.dataset.cookieChoice;
      localStorage.setItem(consentKey, choice);
      applyConsent(choice);
      banner.remove();
    });

    document.body.appendChild(banner);
  };

  const savedConsent = localStorage.getItem(consentKey);
  if (savedConsent) {
    applyConsent(savedConsent);
  } else {
    showCookieBanner();
  }

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !footerBottom.querySelector('[data-privacy-link]')) {
    const privacy = document.createElement('p');
    privacy.className = 'footer-privacy-links';
    privacy.innerHTML = '<a href="privacidade.html" data-privacy-link>Política de Privacidade</a> <button type="button" class="cookie-settings-button" data-cookie-settings>Configurar cookies</button>';
    footerBottom.appendChild(privacy);
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-cookie-settings]')) return;
    localStorage.removeItem(consentKey);
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
    showCookieBanner();
  });

  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const links = document.querySelector('.nav-links');

  if (nav && toggle && links) {
    const closeMenu = () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    links.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('.faq-accordion .faq-question').forEach((question) => {
    const item = question.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');

    if (!item || !answer) {
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'faq-question-button';
    button.innerHTML = `<span>${question.innerHTML}</span><span class="faq-icon" aria-hidden="true">+</span>`;
    button.setAttribute('aria-expanded', 'false');

    answer.hidden = true;
    question.replaceChildren(button);

    button.addEventListener('click', () => {
      const isOpen = item.classList.toggle('faq-open');
      button.setAttribute('aria-expanded', String(isOpen));
      answer.hidden = !isOpen;
    });
  });

  const contactForm = document.querySelector('[data-whatsapp-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const businessSelect = contactForm.querySelector('[name="negocio"]');
      const businessLabel = businessSelect?.selectedOptions?.[0]?.textContent?.trim() || '';
      const message = [
        'Ola! Quero solicitar um diagnostico gratuito para meu negocio.',
        '',
        `Nome: ${formData.get('nome') || ''}`,
        `E-mail: ${formData.get('email') || ''}`,
        `Telefone/WhatsApp: ${formData.get('telefone') || ''}`,
        `Tipo de negocio: ${businessLabel}`,
        `Mensagem: ${formData.get('mensagem') || 'Nao informado'}`
      ].join('\n');

      window.open(`https://wa.me/5511913381160?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  }
})();
