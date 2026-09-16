// reveal-on-scroll bersama: IntersectionObserver, sekali tampil lalu dilepas.
// Cek ulang di DOMContentLoaded/load/timeout supaya elemen yang sudah di viewport
// (hero) tidak pernah tertinggal tersembunyi, apa pun urutan eksekusi skrip lain.
(function () {
  var SEL = '[data-reveal]';
  var io = null;

  function show(el) {
    el.classList.add('is-visible');
    if (io) io.unobserve(el);
  }

  function checkViewport() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll(SEL + ':not(.is-visible)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) show(el);
    });
  }

  function init() {
    var els = document.querySelectorAll(SEL);
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) show(en.target); });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
    checkViewport();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('load', checkViewport);
  window.addEventListener('resize', checkViewport, { passive: true });
  setTimeout(checkViewport, 400);
  setTimeout(checkViewport, 1500);
})();
