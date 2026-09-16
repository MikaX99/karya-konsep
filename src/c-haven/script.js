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
  function initHeroBrain() {
    const canvas = document.getElementById('heroBrainCanvas');
    const container = document.getElementById('heroExpandingCard');
    const heroTrack = document.querySelector('.ks-hero-expand-track');
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;
    let animFrame = null;

    const nodes = [];
    const edges = [];
    const pulses = [];

    // Domain Hub IT Karya Sistem
    const CORE_HUBS = [
      { name: "CORE INFRA", color: "#38BDF8", size: 5.5, hemi: -1 },
      { name: "SECURITY MESH", color: "#60A5FA", size: 5.0, hemi: 1 },
      { name: "DATA CENTER", color: "#2563EB", size: 5.2, hemi: -1 },
      { name: "CLOUD GATEWAY", color: "#38BDF8", size: 5.0, hemi: 1 },
      { name: "ENTERPRISE NET", color: "#60A5FA", size: 4.8, hemi: -1 },
      { name: "STORAGE MESH", color: "#93C5FD", size: 4.6, hemi: 1 },
    ];

    function updateSize() {
      const rect = container.getBoundingClientRect();
      const newW = Math.round(rect.width);
      const newH = Math.round(rect.height);
      if (newW !== width || newH !== height) {
        width = newW;
        height = newH;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    // Bangun struktur otak 3D (Dual-Hemisphere)
    function generateBrain() {
      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;

      // 1. Hub Utama
      CORE_HUBS.forEach((hub, i) => {
        const side = hub.hemi;
        const angle = (i / CORE_HUBS.length) * Math.PI * 2;
        nodes.push({
          x: side * (34 + Math.cos(angle) * 28),
          y: Math.sin(angle) * 34 - 4,
          z: Math.sin(angle * 2) * 22,
          baseSize: hub.size,
          color: hub.color,
          name: hub.name,
          isHub: true,
          birthDelay: i * 220, // Tumbuh berurutan
          grown: 0,
          pulseTimer: Math.random() * 100
        });
      });

      // 2. Lobus Kiri & Kanan (Bentuk Otak Organik)
      const TOTAL_NODES = 80;
      for (let i = nodes.length; i < TOTAL_NODES; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2 * Math.PI;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 0.95 + 0.05;

        // Radius elipsoid menyerupai dua belahan otak
        const radX = 38 * r;
        const radY = 48 * r;
        const radZ = 34 * r;

        const nx = side * 24 + radX * Math.sin(phi) * Math.cos(theta);
        const ny = radY * Math.sin(phi) * Math.sin(theta) - 2;
        const nz = radZ * Math.cos(phi);

        const isLeaf = Math.random() > 0.6;
        const baseSize = isLeaf ? (1.5 + Math.random() * 1.2) : (2.4 + Math.random() * 1.5);
        const birthDelay = 450 + Math.random() * 2400; // Tumbuh mencabang alami

        nodes.push({
          x: nx,
          y: ny,
          z: nz,
          baseSize: baseSize,
          color: Math.random() > 0.35 ? "#38BDF8" : (Math.random() > 0.5 ? "#60A5FA" : "#BAE6FD"),
          name: null,
          isHub: false,
          birthDelay: birthDelay,
          grown: 0,
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
        const maxConn = a.isHub ? 6 : (Math.random() > 0.5 ? 3 : 2);
        for (let k = 0; k < maxConn; k++) {
          const neighbor = connections[k];
          if (neighbor && neighbor.dist < 38) {
            const exists = edges.some(e => 
              (e.from === i && e.to === neighbor.index) || 
              (e.from === neighbor.index && e.to === i)
            );
            if (!exists) {
              edges.push({
                from: i,
                to: neighbor.index,
                growth: 0,
                birthDelay: Math.max(a.birthDelay, nodes[neighbor.index].birthDelay) + 120
              });
            }
          }
        }
      }
    }

    // Interaktivitas Rotasi 3D
    let rotX = 0.12;
    let rotY = 0;
    let targetRotX = 0.12;
    let targetRotY = 0;
    let isDragging = false;
    let lastMouseX = 0, lastMouseY = 0;
    const startTime = performance.now();

    window.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotY = normX * 0.85;
        targetRotX = -normY * 0.55 + 0.12;
      }
    }, { passive: true });

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        targetRotY += dx * 0.008;
        targetRotX += dy * 0.008;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        targetRotY = normX * 0.75;
      }
    }, { passive: true });

    function spawnPulse() {
      if (!edges.length) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      if (edge.growth > 0.8) {
        pulses.push({
          edge: edge,
          progress: 0,
          speed: 0.018 + Math.random() * 0.022,
          color: Math.random() > 0.4 ? "#38BDF8" : "#FFFFFF"
        });
      }
    }

    // Render loop 60fps
    function render(now) {
      if (!isVisible) {
        animFrame = null;
        return;
      }

      updateSize();
      const elapsed = now - startTime;

      // Rotasi kontinu halus
      targetRotY += 0.0032;
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const brainScale = Math.min(width, height) * 0.0036;
      const fov = 380;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // Proyeksi 3D simpul ke layar
      const projectedNodes = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mekanisme "Gerak Tumbuh" (Sprouting spring animation)
        if (elapsed > n.birthDelay) {
          const age = elapsed - n.birthDelay;
          const tNorm = Math.min(1, age / 700);
          n.grown = 1 - Math.exp(-4 * tNorm) * Math.cos(6 * tNorm);
        }

        const x1 = (n.x * brainScale) * cosY + (n.z * brainScale) * sinY;
        const z1 = -(n.x * brainScale) * sinY + (n.z * brainScale) * cosY;
        const y1 = (n.y * brainScale) * cosX - z1 * sinX;
        const z2 = (n.y * brainScale) * sinX + z1 * cosX;

        const persp = fov / (fov + z2 + 80);
        const screenX = centerX + x1 * persp;
        const screenY = centerY + y1 * persp;

        // Pendaran napas denyut
        const breath = 1 + 0.12 * Math.sin(elapsed * 0.003 + n.pulseTimer);
        const renderSize = Math.max(0.1, n.baseSize * n.grown * breath * persp);
        const depthAlpha = Math.max(0.18, Math.min(1, (z2 + 120) / 240));

        projectedNodes[i] = {
          sx: screenX,
          sy: screenY,
          sz: z2,
          radius: renderSize,
          alpha: depthAlpha * n.grown,
          color: n.color,
          isHub: n.isHub,
          name: n.name,
          grown: n.grown
        };
      }

      // Gambar garis penghubung yang tumbuh
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        if (elapsed > e.birthDelay) {
          e.growth = Math.min(1, e.growth + 0.025);
        }
        if (e.growth <= 0) continue;

        const pA = projectedNodes[e.from];
        const pB = projectedNodes[e.to];
        if (!pA || !pB || pA.grown < 0.1 || pB.grown < 0.1) continue;

        const lineAlpha = (pA.alpha + pB.alpha) * 0.32 * e.growth;
        if (lineAlpha < 0.04) continue;

        const targetX = pA.sx + (pB.sx - pA.sx) * e.growth;
        const targetY = pA.sy + (pB.sy - pA.sy) * e.growth;

        ctx.beginPath();
        ctx.moveTo(pA.sx, pA.sy);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha.toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Pulsa data listrik berjalan
      if (Math.random() < 0.16 && pulses.length < 20) {
        spawnPulse();
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
        const pulseAlpha = Math.min(pA.alpha, pB.alpha);

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#FFFFFF' 
          ? `rgba(255, 255, 255, ${pulseAlpha})` 
          : `rgba(56, 189, 248, ${pulseAlpha})`;
        ctx.fill();
      }

      // Gambar simpul urut kedalaman Z
      const sortedIndices = Array.from({ length: nodes.length }, (_, i) => i)
        .sort((i1, i2) => projectedNodes[i1].sz - projectedNodes[i2].sz);

      for (let idx of sortedIndices) {
        const pn = projectedNodes[idx];
        if (pn.radius <= 0.1 || pn.alpha <= 0.02) continue;

        // Pendaran aura hub utama
        if (pn.isHub && pn.alpha > 0.35) {
          ctx.beginPath();
          ctx.arc(pn.sx, pn.sy, pn.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${(pn.alpha * 0.2).toFixed(2)})`;
          ctx.fill();
        }

        // Lingkaran simpul utama
        ctx.beginPath();
        ctx.arc(pn.sx, pn.sy, pn.radius, 0, Math.PI * 2);
        ctx.fillStyle = pn.isHub 
          ? `rgba(255, 255, 255, ${pn.alpha.toFixed(2)})`
          : `rgba(56, 189, 248, ${pn.alpha.toFixed(2)})`;
        ctx.fill();

        // Label hub teknologi
        if (pn.isHub && pn.alpha > 0.55 && width > 380) {
          ctx.font = '600 9px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${(pn.alpha * 0.85).toFixed(2)})`;
          ctx.textAlign = 'center';
          ctx.fillText(pn.name, pn.sx, pn.sy + pn.radius + 12);
        }
      }

      animFrame = requestAnimationFrame(render);
    }

    // Pause otomatis saat hero keluar dari viewport
    if (heroTrack && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrame) {
          animFrame = requestAnimationFrame(render);
        }
      }, { threshold: 0.05 });
      io.observe(heroTrack);
    }

    updateSize();
    generateBrain();
    animFrame = requestAnimationFrame(render);
  }

  initHeroBrain();
});
