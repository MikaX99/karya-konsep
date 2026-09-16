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

  // --------------------------------------------------------------------------
  // 9. LIVING OBSIDIAN NEURAL BRAIN GRAPH ENGINE (HERO EXPANDING CARD)
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 9. LIVING OBSIDIAN NEURAL BRAIN GRAPH ENGINE (HERO EXPANDING CARD)
  // --------------------------------------------------------------------------
  function initHeroBrain() {
    const canvas = document.getElementById('heroBrainCanvas');
    const container = document.getElementById('heroExpandingCard');
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animFrame = null;

    const nodes = [];
    const edges = [];
    const pulses = [];
    const stars = [];

    // Domain Hub IT Karya Sistem
    const CORE_HUBS = [
      { name: "CORE INFRA", color: "#38BDF8", size: 6.5, hemi: -1 },
      { name: "CYBER DEFENSE", color: "#60A5FA", size: 6.0, hemi: 1 },
      { name: "DATA CENTER", color: "#3B82F6", size: 6.0, hemi: -1 },
      { name: "CLOUD HYBRID", color: "#38BDF8", size: 5.5, hemi: 1 },
      { name: "OPTICAL NET", color: "#60A5FA", size: 5.5, hemi: -1 },
      { name: "AI INTEGRATION", color: "#93C5FD", size: 5.5, hemi: 1 },
    ];

    function updateSize() {
      const rect = container.getBoundingClientRect();
      const newW = Math.round(rect.width) || container.clientWidth || 420;
      const newH = Math.round(rect.height) || container.clientHeight || 420;
      if (newW !== width || newH !== height) {
        width = newW;
        height = newH;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    // Bangun struktur otak 3D (Dual-Hemisphere)
    function generateBrain() {
      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;
      stars.length = 0;

      // 0. Ambient background star dust
      for (let s = 0; s < 40; s++) {
        stars.push({
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 500,
          z: (Math.random() - 0.5) * 400,
          size: Math.random() * 1.5 + 0.5,
          twinkleSpeed: 0.002 + Math.random() * 0.004,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }

      // 1. Hub Utama IT
      CORE_HUBS.forEach((hub, i) => {
        const side = hub.hemi;
        const angle = (i / CORE_HUBS.length) * Math.PI * 2;
        nodes.push({
          x: side * (36 + Math.cos(angle) * 26),
          y: Math.sin(angle) * 32 - 2,
          z: Math.sin(angle * 2) * 20,
          baseSize: hub.size,
          color: hub.color,
          name: hub.name,
          isHub: true,
          pulseTimer: Math.random() * 100
        });
      });

      // 2. Lobus Kiri & Kanan (Bentuk Otak Organik 110 Nodes)
      const TOTAL_NODES = 110;
      for (let i = nodes.length; i < TOTAL_NODES; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2 * Math.PI;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 0.95 + 0.05;

        // Radius elipsoid menyerupai dua belahan otak
        const radX = 42 * r;
        const radY = 50 * r;
        const radZ = 36 * r;

        const nx = side * 22 + radX * Math.sin(phi) * Math.cos(theta);
        const ny = radY * Math.sin(phi) * Math.sin(theta) - 2;
        const nz = radZ * Math.cos(phi);

        const isLeaf = Math.random() > 0.5;
        const baseSize = isLeaf ? (1.8 + Math.random() * 1.4) : (2.8 + Math.random() * 1.6);
        const color = Math.random() > 0.35 ? "#38BDF8" : (Math.random() > 0.5 ? "#60A5FA" : "#BAE6FD");

        nodes.push({
          x: nx,
          y: ny,
          z: nz,
          baseSize: baseSize,
          color: color,
          name: null,
          isHub: false,
          pulseTimer: Math.random() * 200
        });
      }

      // 3. Hubungkan simpul terdekat membentuk sinapsis / mesh
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const connections = [];

        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          connections.push({ index: j, dist: dist });
        }

        connections.sort((p1, p2) => p1.dist - p2.dist);
        const maxConn = a.isHub ? 5 : (Math.random() > 0.4 ? 3 : 2);
        for (let k = 0; k < maxConn; k++) {
          const neighbor = connections[k];
          if (neighbor && neighbor.dist < 44) {
            const exists = edges.some(e => 
              (e.from === i && e.to === neighbor.index) || 
              (e.from === neighbor.index && e.to === i)
            );
            if (!exists) {
              edges.push({ from: i, to: neighbor.index });
            }
          }
        }
      }

      // 4. Inisialisasi pulsa sinapsis awal (20 pulsa aktif langsung)
      for (let p = 0; p < 20; p++) {
        spawnPulse(Math.random());
      }
    }

    // Interaktivitas Rotasi 3D
    let rotX = 0.12;
    let rotY = 0.25;
    let targetRotX = 0.12;
    let targetRotY = 0.25;
    let isDragging = false;
    let lastMouseX = 0, lastMouseY = 0;
    const startTime = performance.now();

    window.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotY += normX * 0.015;
        targetRotX = -normY * 0.35 + 0.12;
      }
    }, { passive: true });

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        targetRotY += dx * 0.007;
        targetRotX += dy * 0.007;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
    container.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    function spawnPulse(initialProgress = 0) {
      if (!edges.length) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({
        edge: edge,
        progress: initialProgress,
        speed: 0.012 + Math.random() * 0.018,
        color: Math.random() > 0.35 ? "#FFFFFF" : "#38BDF8"
      });
    }

    // Render loop 60fps
    function render(now) {
      animFrame = requestAnimationFrame(render);
      if (window.scrollY > window.innerHeight * 2.2) return;

      updateSize();
      const elapsed = Math.max(0, now - startTime);

      // Mekar Organik Pegas (Spring Sprouting): dari 38% mekar ke 100% dalam 1.2s
      const tNorm = Math.min(1, elapsed / 1200);
      const bloomScale = 0.38 + 0.62 * (1 - Math.exp(-3.5 * tNorm) * Math.cos(4.5 * tNorm));

      // Rotasi kontinu halus
      if (!isDragging) {
        targetRotY += 0.0035;
      }
      rotX += (targetRotX - rotX) * 0.07;
      rotY += (targetRotY - rotY) * 0.07;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const brainScale = Math.min(width, height) * 0.0055 * bloomScale;
      const fov = 400;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // Gambar debu bintang latar belakang (Constellation Dust)
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const sx1 = star.x * cosY + star.z * sinY;
        const sz1 = -star.x * sinY + star.z * cosY;
        const sy1 = star.y * cosX - sz1 * sinX;
        const sz2 = star.y * sinX + sz1 * cosX;

        const spersp = fov / (fov + sz2 + 250);
        const starSX = centerX + sx1 * spersp;
        const starSY = centerY + sy1 * spersp;

        if (starSX > 0 && starSX < width && starSY > 0 && starSY < height) {
          const twinkle = 0.35 + 0.35 * Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset);
          ctx.beginPath();
          ctx.arc(starSX, starSY, star.size * spersp, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${twinkle.toFixed(2)})`;
          ctx.fill();
        }
      }

      // Proyeksi 3D simpul ke layar
      const projectedNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const x1 = (n.x * brainScale) * cosY + (n.z * brainScale) * sinY;
        const z1 = -(n.x * brainScale) * sinY + (n.z * brainScale) * cosY;
        const y1 = (n.y * brainScale) * cosX - z1 * sinX;
        const z2 = (n.y * brainScale) * sinX + z1 * cosX;

        const persp = fov / (fov + z2 + 80);
        const screenX = centerX + x1 * persp;
        const screenY = centerY + y1 * persp;

        // Pendaran napas denyut
        const breath = 1 + 0.1 * Math.sin(elapsed * 0.0035 + n.pulseTimer);
        const renderSize = Math.max(1.5, n.baseSize * breath * persp);
        const depthAlpha = Math.max(0.28, Math.min(1, (z2 + 130) / 260));

        projectedNodes[i] = {
          sx: screenX,
          sy: screenY,
          sz: z2,
          radius: renderSize,
          alpha: depthAlpha,
          color: n.color,
          isHub: n.isHub,
          name: n.name
        };
      }

      // Gambar garis penghubung sinapsis
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const pA = projectedNodes[e.from];
        const pB = projectedNodes[e.to];
        if (!pA || !pB) continue;

        const lineAlpha = (pA.alpha + pB.alpha) * 0.28;
        if (lineAlpha < 0.05) continue;

        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(pB.sx, pB.sy);
        ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha.toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Pulsa data listrik berjalan sepanjang serabut sinapsis
      if (Math.random() < 0.2 && pulses.length < 26) {
        spawnPulse(0);
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const pA = projectedNodes[p.edge.from];
        const pB = projectedNodes[p.edge.to];
        if (!pA || !pB) continue;

        const px = pA.sx + (pB.sx - pA.sx) * p.progress;
        const py = pA.sy + (pB.sy - pA.sy) * p.progress;
        const pulseAlpha = Math.min(pA.alpha, pB.alpha) * 0.95;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#FFFFFF' 
          ? `rgba(255, 255, 255, ${pulseAlpha.toFixed(2)})` 
          : `rgba(56, 189, 248, ${pulseAlpha.toFixed(2)})`;
        ctx.fill();
      }

      // Gambar simpul diurutkan berdasarkan kedalaman Z (depth sort)
      const sortedIndices = Array.from({ length: nodes.length }, (_, i) => i)
        .sort((i1, i2) => projectedNodes[i1].sz - projectedNodes[i2].sz);

      for (let idx of sortedIndices) {
        const pn = projectedNodes[idx];

        // Pendaran aura hub teknologi
        if (pn.isHub) {
          ctx.beginPath();
          ctx.arc(pn.sx, pn.sy, pn.radius * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${(pn.alpha * 0.22).toFixed(2)})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pn.sx, pn.sy, pn.radius * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${(pn.alpha * 0.35).toFixed(2)})`;
          ctx.fill();
        }

        // Inti lingkaran simpul
        ctx.beginPath();
        ctx.arc(pn.sx, pn.sy, pn.radius, 0, Math.PI * 2);
        ctx.fillStyle = pn.isHub 
          ? `rgba(255, 255, 255, ${pn.alpha.toFixed(2)})`
          : `rgba(56, 189, 248, ${pn.alpha.toFixed(2)})`;
        ctx.fill();

        // Label hub teknologi
        if (pn.isHub && width > 340) {
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${(pn.alpha * 0.9).toFixed(2)})`;
          ctx.textAlign = 'center';
          ctx.fillText(pn.name, pn.sx, pn.sy + pn.radius + 14);
        }
      }
    }

    window.addEventListener('resize', updateSize, { passive: true });
    window.addEventListener('orientationchange', updateSize);

    updateSize();
    generateBrain();
    animFrame = requestAnimationFrame(render);
  }

  initHeroBrain();
});
