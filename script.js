document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const currentTheme = () => (document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', currentTheme() === 'light' ? 'true' : 'false');

    themeToggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      themeToggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
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
