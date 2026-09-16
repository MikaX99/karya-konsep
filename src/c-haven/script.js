/* ==========================================================================
   KARYA SISTEM — KARYA SISTEM LUXURY EDITORIAL CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. FULL-SCREEN MENU CURTAIN CONTROLLER
  // --------------------------------------------------------------------------
  const curtain = document.getElementById('cinematicMenuCurtain');
  const btnMenuTrigger = document.getElementById('btnMenuTrigger');
  const btnFooterMenuTrigger = document.getElementById('btnFooterMenuTrigger');
  const btnCurtainClose = document.getElementById('btnCurtainClose');

  function openMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (curtain) {
      curtain.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (curtain) {
      curtain.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnMenuTrigger) btnMenuTrigger.addEventListener('click', openMenu);
  if (btnFooterMenuTrigger) btnFooterMenuTrigger.addEventListener('click', openMenu);
  if (btnCurtainClose) btnCurtainClose.addEventListener('click', closeMenu);

  // Close when clicking any link inside the curtain drawer
  if (curtain) {
    const allDrawerLinks = curtain.querySelectorAll('a, .drawer-nav-link, .btn-drawer-close');
    allDrawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && curtain && curtain.classList.contains('active')) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 1.5. FLOATING NAVBAR SCROLL STATE CONTROLLER
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');

  function handleNavbarScroll() {
    if (!mainHeader) return;
    const scrollY = window.scrollY;

    // Expand & highlight menu capsule after initial scroll
    if (scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }

  // --------------------------------------------------------------------------
  // 1.8. HERO SCROLL-DRIVEN CARD EXPANSION CONTROLLER (EXACT KARYA SISTEM PORTAL ZOOM)
  // --------------------------------------------------------------------------
  const heroTrack = document.querySelector('.ks-hero-expand-track');
  const expandingCard = document.getElementById('heroExpandingCard');
  const cardinalElements = document.querySelectorAll('.cardinal-tag, .cardinal-word');
  const heroOverlay = document.getElementById('heroCardOverlay');

  function handleHeroCardExpansion() {
    if (!heroTrack || !expandingCard) return;
    const rect = heroTrack.getBoundingClientRect();
    const trackHeight = heroTrack.offsetHeight - window.innerHeight;
    
    if (trackHeight <= 0) return;

    // Progress from 0 (at top of page) to 1 (when card is 100% full screen)
    const progress = Math.min(1, Math.max(0, -rect.top / trackHeight));

    // Calculate dimensions based on screen width
    const isMobile = window.innerWidth <= 768;
    const initialWidthVw = isMobile ? 84 : 35;
    const initialHeightVh = isMobile ? 44 : 44;

    const currentWidth = initialWidthVw + progress * (100 - initialWidthVw);
    const currentHeight = initialHeightVh + progress * (100 - initialHeightVh);
    const borderRadius = (1 - progress) * 6;

    expandingCard.style.width = `${currentWidth}vw`;
    expandingCard.style.height = `${currentHeight}vh`;
    expandingCard.style.borderRadius = `${borderRadius}px`;

    // Smoothly push outwards and fade cardinal words & tags
    cardinalElements.forEach(el => {
      const opacity = Math.max(0, 1 - progress * 2.8);
      el.style.opacity = opacity.toFixed(3);
      
      if (el.classList.contains('cardinal-left')) {
        el.style.transform = `translateX(-${progress * 80}px)`;
      } else if (el.classList.contains('cardinal-right')) {
        el.style.transform = `translateX(${progress * 80}px)`;
      } else if (el.classList.contains('cardinal-top')) {
        el.style.transform = `translateX(-50%) translateY(-${progress * 40}px)`;
      } else if (el.classList.contains('cardinal-bottom')) {
        el.style.transform = `translateX(-50%) translateY(${progress * 40}px)`;
      }
    });

    if (heroOverlay) {
      heroOverlay.style.opacity = `${Math.max(0, 1 - progress * 2.2).toFixed(3)}`;
    }
  }

  function onGlobalScroll() {
    handleNavbarScroll();
    handleHeroCardExpansion();
  }

  window.addEventListener('scroll', onGlobalScroll, { passive: true });
  window.addEventListener('resize', onGlobalScroll);
  onGlobalScroll();

  // --------------------------------------------------------------------------
  // 2. ARCHITECTURAL ACCORDION CONTROLLER
  // --------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.ks-accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.ks-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(i => {
          i.classList.remove('active');
          const glyph = i.querySelector('.acc-glyph-symbol');
          if (glyph) glyph.textContent = '+';
        });

        if (!isActive) {
          item.classList.add('active');
          const glyph = item.querySelector('.acc-glyph-symbol');
          if (glyph) glyph.textContent = '−';
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 3. PROJECT CARD DEEP LINKING TO EXPERTISE
  // --------------------------------------------------------------------------
  function openAccordionByIndex(targetIndex) {
    if (!accordionItems.length || targetIndex < 0 || targetIndex >= accordionItems.length) return;

    const targetItem = accordionItems[targetIndex];
    const expertiseSection = document.getElementById('expertise');

    if (expertiseSection) {
      const navHeight = document.querySelector('.ks-editorial-nav')?.offsetHeight || 80;
      const targetPos = targetItem.getBoundingClientRect().top + window.pageYOffset - navHeight - 30;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }

    accordionItems.forEach(i => {
      i.classList.remove('active');
      const glyph = i.querySelector('.acc-glyph-symbol');
      if (glyph) glyph.textContent = '+';
    });

    targetItem.classList.add('active');
    const glyph = targetItem.querySelector('.acc-glyph-symbol');
    if (glyph) glyph.textContent = '−';
  }

  document.querySelectorAll('[data-accordion-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(trigger.getAttribute('data-accordion-target'), 10);
      openAccordionByIndex(targetIndex);
    });
  });

  // --------------------------------------------------------------------------
  // 4. CONSULTATION MODAL DIALOG
  // --------------------------------------------------------------------------
  const modal = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');
  const closeModalBtn = document.querySelector('.modal-close-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (curtain) curtain.classList.remove('active');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. CONSULTATION FORM SUBMISSION (DIRECT WHATSAPP DISPATCH)
  // --------------------------------------------------------------------------
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>MEMBUKA WHATSAPP…</span>';

      const fullName = document.getElementById('fullName').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const workEmail = document.getElementById('workEmail').value.trim();
      const service = document.getElementById('servicePillar').value;

      const waText = encodeURIComponent(
        `Halo Tim Karya Sistem (sales@karyasistem.com),\n\n` +
        `Saya ingin mengajukan konsultasi arsitektur IT enterprise:\n` +
        `• Nama: ${fullName}\n` +
        `• Perusahaan: ${companyName}\n` +
        `• Email: ${workEmail}\n` +
        `• Pilar Layanan: ${service}\n\n` +
        `Mohon info jadwal konsultasi teknis. Terima kasih!`
      );

      const waUrl = `https://wa.me/6287881200477?text=${waText}`;
      window.open(waUrl, '_blank');

      setTimeout(() => {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        consultationForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>LANJUT KE WHATSAPP &rarr;</span>';
      }, 500);
    });
  }

  // --------------------------------------------------------------------------
  // 6. SMOOTH BACK-TO-TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.querySelector('.footer-back-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 7. GLOBAL SMOOTH ANCHOR LINK NAVIGATION
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]:not(.btn-open-modal)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. DYNAMIC FULL-BLEED FOOTER GIANT LOGO RESPONSIVE FIT
  // --------------------------------------------------------------------------
  const footerGiantText = document.getElementById('footerGiantText');
  function resizeFooterGiantText() {
    if (!footerGiantText) return;
    const windowWidth = window.innerWidth;
    const targetSize = Math.min(Math.max(windowWidth * 0.134, 40), 280);
    footerGiantText.style.fontSize = `${targetSize.toFixed(1)}px`;
  }

  window.addEventListener('resize', resizeFooterGiantText, { passive: true });
  window.addEventListener('orientationchange', resizeFooterGiantText);
  resizeFooterGiantText();
});
