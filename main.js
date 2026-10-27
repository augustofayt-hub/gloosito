// Interacciones al ritmo del tema (150 BPM = 400 ms por tiempo): entradas, flashes, stutter del título y loops.
(() => {
  const BEAT = 400;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const flash = document.querySelector('.flash');

  function doFlash() {
    if (calm || !flash) return;
    flash.classList.remove('on');
    void flash.offsetWidth; // reinicia la animación
    flash.classList.add('on');
  }

  // Entradas: cada bloque entra cuando aparece; la primera entrada de cada sección dispara un flash.
  const seen = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      const sec = e.target.closest('section');
      if (sec && !seen.has(sec)) { seen.add(sec); doFlash(); }
      io.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach((el) => (calm ? el.classList.add('in') : io.observe(el)));

  // Videos en loop: se reproducen solo cuando se ven (ahorra datos y batería).
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('video[data-auto]').forEach((v) => vio.observe(v));

  // Stutter del título: un golpe cada 4 compases, con flash, como el redoble del video.
  if (!calm) {
    const titles = document.querySelectorAll('[data-stutter]');
    const hit = () => titles.forEach((t) => {
      t.classList.remove('glitch');
      void t.offsetWidth;
      t.classList.add('glitch');
    });
    setTimeout(() => { hit(); doFlash(); }, BEAT * 2);
    setInterval(hit, BEAT * 16);
  }
})();
