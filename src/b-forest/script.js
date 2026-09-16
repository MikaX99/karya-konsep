/* ==========================================================================
   KARYA SISTEM — INTERACTIVE WIND SWAY & PARALLAX ENGINE (script.js)
   Cache-Buster Version: 20260827_V16_KARYA_SISTEM_CLEAN
   Features:
   - Interactive Mouse Parallax Depth on Fixed Stage
   - Organic Wind Spores / Foliage Breeze Canvas
   - 3D Magnetic Tilt Cards on Client Logos
   - Staggered Curtain Menu, Frosted Accordion & Consultation Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. FULL-SCREEN CINEMATIC MENU CURTAIN CONTROLLER
  // --------------------------------------------------------------------------
  const curtain = document.getElementById('cinematicMenuCurtain');
  const btnMenuTrigger = document.getElementById('btnMenuTrigger');
  const btnCurtainClose = document.getElementById('btnCurtainClose');
  const curtainLinks = document.querySelectorAll('.curtain-nav-link');

  if (btnMenuTrigger && curtain) {
    btnMenuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      curtain.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (btnCurtainClose && curtain) {
    btnCurtainClose.addEventListener('click', (e) => {
      e.preventDefault();
      curtain.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close curtain when clicking any menu link
  curtainLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (curtain) {
        curtain.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close curtain with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && curtain && curtain.classList.contains('active')) {
      curtain.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // --------------------------------------------------------------------------
  // 2. INTERACTIVE MOUSE PARALLAX & ORGANIC WIND BREEZE CANVAS
  // --------------------------------------------------------------------------
  const fixedStage = document.querySelector('.fixed-cinematic-stage');
  const windCanvas = document.getElementById('windCanvas');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Mouse Parallax on Background Stage (Hanya di desktop dengan mouse, hemat baterai & GPU)
  if (fixedStage && hasFinePointer) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isMoving = false;
    let rafId = null;

    function renderParallax() {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      fixedStage.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(1.05)`;

      if (Math.abs(dx) > 0.04 || Math.abs(dy) > 0.04) {
        rafId = requestAnimationFrame(renderParallax);
      } else {
        isMoving = false;
        rafId = null;
      }
    }

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = normX * -18;
      targetY = normY * -14;
      if (!isMoving) {
        isMoving = true;
        if (!rafId) rafId = requestAnimationFrame(renderParallax);
      }
    }, { passive: true });
  }

  // Wind Spores / Organic Breeze Simulation (Desktop only, tanpa shadowBlur yang boros GPU)
  if (windCanvas) {
    if (!hasFinePointer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      windCanvas.style.display = 'none';
    } else {
      const ctx = windCanvas.getContext('2d', { alpha: true });
      let width = windCanvas.width = window.innerWidth;
      let height = windCanvas.height = window.innerHeight;

      window.addEventListener('resize', () => {
        width = windCanvas.width = window.innerWidth;
        height = windCanvas.height = window.innerHeight;
      }, { passive: true });

      const spores = [];
      const sporeCount = 18; // optimal & ringan

      for (let i = 0; i < sporeCount; i++) {
        spores.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.6 + 0.25,
          vy: Math.random() * 0.3 - 0.15,
          size: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.35 + 0.15,
          oscillationSpeed: Math.random() * 0.02 + 0.01,
          angle: Math.random() * Math.PI * 2
        });
      }

      function animateWindSpores() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < sporeCount; i++) {
          const s = spores[i];
          s.angle += s.oscillationSpeed;
          s.x += s.vx + Math.sin(s.angle) * 0.35;
          s.y += s.vy + Math.cos(s.angle) * 0.25;

          if (s.x > width + 20) s.x = -20;
          if (s.y > height + 20) s.y = -20;
          if (s.y < -20) s.y = height + 20;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 242, 138, ${s.alpha})`;
          ctx.fill();
        }

        requestAnimationFrame(animateWindSpores);
      }
      animateWindSpores();
    }
  }

  // --------------------------------------------------------------------------
  // 3. 3D INTERACTIVE TILT ON CLIENT LOGO CARDS
  // --------------------------------------------------------------------------
  if (hasFinePointer) {
    const clientCards = document.querySelectorAll('.architectural-client-cell');
    clientCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(600px) rotateX(${(-y * 0.08).toFixed(2)}deg) rotateY(${(x * 0.08).toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. ALETHIA FROSTED GLASS ACCORDION
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.alethia-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.alethia-accordion-item').forEach(acc => {
        acc.classList.remove('active');
        const sym = acc.querySelector('.accordion-symbol');
        if (sym) sym.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        const sym = item.querySelector('.accordion-symbol');
        if (sym) sym.textContent = '−';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. CONSULTATION MODAL DIALOG
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

  // --------------------------------------------------------------------------
  // 6. CONSULTATION FORM SUBMISSION (DIRECT WHATSAPP DISPATCH)
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

      // Construct Clean Corporate WhatsApp Message
      const waText = encodeURIComponent(
        `Halo Tim Karya Sistem (sales@karyasistem.com),\n\n` +
        `Saya ingin mengajukan jadwal konsultasi IT:\n` +
        `• Nama: ${fullName}\n` +
        `• Perusahaan: ${companyName}\n` +
        `• Email: ${workEmail}\n` +
        `• Layanan yang Diminati: ${service}\n\n` +
        `Mohon info ketersediaan jadwal tim konsultan. Terima kasih!`
      );

      // WhatsApp Direct Link to +62 878-8120-0477
      const waUrl = `https://wa.me/6287881200477?text=${waText}`;

      // Open WhatsApp in a new window
      window.open(waUrl, '_blank');

      setTimeout(() => {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        consultationForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>LANJUT KE WHATSAPP</span> <span style="font-size:1.1rem; line-height:1;">&rarr;</span>';
      }, 500);
    });
  }

  // --------------------------------------------------------------------------
  // 7. DYNAMIC NAVBAR AUTO-CONTRAST (LIGHT / DARK BACKGROUND DETECTOR)
  // --------------------------------------------------------------------------
  const nav = document.querySelector('.clean-editorial-nav');
  const lightSections = document.querySelectorAll('.alethia-solutions-section');
  const navBrandLogo = document.getElementById('navBrandLogo');

  let navTicking = false;
  function updateNavContrast() {
    if (!nav || !lightSections.length) return;
    const navRect = nav.getBoundingClientRect();
    const navMidY = navRect.top + navRect.height / 2;
    let isOverLight = false;

    for (let i = 0; i < lightSections.length; i++) {
      const secRect = lightSections[i].getBoundingClientRect();
      if (navMidY >= secRect.top && navMidY <= secRect.bottom) {
        isOverLight = true;
        break;
      }
    }

    if (isOverLight) {
      nav.classList.add('theme-light-mode');
      if (navBrandLogo && !navBrandLogo.src.includes('kst-dark.png')) {
        navBrandLogo.src = '../shared/assets/kst-dark.png';
      }
    } else {
      nav.classList.remove('theme-light-mode');
      if (navBrandLogo && !navBrandLogo.src.includes('kst-light.png')) {
        navBrandLogo.src = '../shared/assets/kst-light.png';
      }
    }
    navTicking = false;
  }

  function requestNavUpdate() {
    if (!navTicking) {
      navTicking = true;
      requestAnimationFrame(updateNavContrast);
    }
  }

  window.addEventListener('scroll', requestNavUpdate, { passive: true });
  window.addEventListener('resize', requestNavUpdate, { passive: true });
  updateNavContrast();

  // --------------------------------------------------------------------------
  // 8. PRECISION ACCORDION DEEP LINKING (CARDS & FOOTER SOLUTIONS)
  // --------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.alethia-accordion-item');

  function openAccordionByIndex(targetIndex) {
    if (!accordionItems.length || targetIndex < 0 || targetIndex >= accordionItems.length) return;

    const targetItem = accordionItems[targetIndex];
    const credibilitySection = document.getElementById('credibility');

    // Scroll to the services section with offset
    if (credibilitySection) {
      const navHeight = document.querySelector('.clean-editorial-nav')?.offsetHeight || 80;
      const targetPos = targetItem.getBoundingClientRect().top + window.pageYOffset - navHeight - 30;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }

    // Collapse all items
    accordionItems.forEach(acc => {
      acc.classList.remove('active');
      const sym = acc.querySelector('.accordion-symbol');
      if (sym) sym.textContent = '+';
    });

    // Expand targeted item
    targetItem.classList.add('active');
    const sym = targetItem.querySelector('.accordion-symbol');
    if (sym) sym.textContent = '−';
  }

  // Listen to all elements with data-accordion-target (Footer Links & Section 4 Cards)
  document.querySelectorAll('[data-accordion-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(trigger.getAttribute('data-accordion-target'), 10);
      openAccordionByIndex(targetIndex);
    });
  });

  // --------------------------------------------------------------------------
  // 9. SMOOTH BACK-TO-TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.querySelector('.footer-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 10. GLOBAL SMOOTH ANCHOR LINK NAVIGATION WITH OFFSET
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
  // 11. DYNAMIC FULL-BLEED FOOTER GIANT LOGO RESPONSIVE FIT
  // --------------------------------------------------------------------------
  const footerGiantText = document.getElementById('footerGiantText');
  function resizeFooterGiantText() {
    if (!footerGiantText) return;
    const windowWidth = window.innerWidth;
    // Calculate optimal font size to maximize edge-to-edge width across all screens
    const targetSize = Math.min(Math.max(windowWidth * 0.134, 40), 280);
    footerGiantText.style.fontSize = `${targetSize.toFixed(1)}px`;
  }

  window.addEventListener('resize', resizeFooterGiantText, { passive: true });
  window.addEventListener('orientationchange', resizeFooterGiantText);
  resizeFooterGiantText();
});
