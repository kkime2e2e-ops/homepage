document.addEventListener('DOMContentLoaded', () => {
  const spotlight = document.querySelector('.spotlight');
  const canHover = window.matchMedia && window.matchMedia('(any-hover: hover)').matches;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (spotlight && canHover && !reducedMotion) {
    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false;
    let rafId = null;

    const step = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      root.style.setProperty('--mx', `${currentX}px`);
      root.style.setProperty('--my', `${currentY}px`);

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
        root.style.setProperty('--mx', `${currentX}px`);
        root.style.setProperty('--my', `${currentY}px`);
        spotlight.classList.add('is-visible');
      }

      if (!rafId) {
        rafId = requestAnimationFrame(step);
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.sidebar-nav a'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
});
