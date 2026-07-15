(() => {
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
