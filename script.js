// ================================
// SPLASH SCREEN - MATCHA WHISKING
// ================================
const splashScreen = document.getElementById('splash-screen');

const hideSplash = () => {
  if (!splashScreen) return;
  splashScreen.classList.add('splash-hidden');
  setTimeout(() => {
    splashScreen.remove();
  }, 500);
};

if (splashScreen) {
  let whiskCount = 0;
  const targetWhisks = 100;
  const progressBar = document.querySelector('.splash-progress-bar');
  
  const handleWhisk = (e) => {
    whiskCount++;
    const progress = Math.min((whiskCount / targetWhisks) * 100, 100);
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      splashScreen.removeEventListener('mousemove', handleWhisk);
      splashScreen.removeEventListener('touchmove', handleWhisk);
      document.querySelector('.splash-text').textContent = "Enjoy your stay! 🍵";
      setTimeout(hideSplash, 400); // Small delay to read text
    }
  };

  splashScreen.addEventListener('mousemove', handleWhisk);
  splashScreen.addEventListener('touchmove', handleWhisk);
  
  // Fallback timeout just in case they don't move the mouse and want to skip
  splashScreen.addEventListener('click', hideSplash);
}

// ================================
// MAIN SITE CODE
// ================================
const root = document.documentElement;
const themeToggle = document.querySelector('.toggle-theme');
const sections = document.querySelectorAll('.section, .card, .timeline-card, .small-card');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const contactForm = document.querySelector('[data-form]');
const formStatus = document.querySelector('.form-status');
const soundToggle = document.querySelector('[data-sound-toggle]');
const soundCaption = document.getElementById('sound-caption');
const cafeAudio = document.getElementById('cafe-audio');
const particlesCanvas = document.getElementById('matcha-particles');
const heroSection = document.getElementById('hero');
const ambientPlayer = document.querySelector('.ambient-player');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const storedTheme = localStorage.getItem('theme');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersFinePointer = window.matchMedia('(pointer: fine)');

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const setTheme = (mode) => {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
};

if (storedTheme) {
  setTheme(storedTheme);
} else if (prefersDark.matches) {
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const navObservers = (() => {
  if (!navLinks.length) return null;

  const targets = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (!id) return null;
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!targets.length) return null;

  let activeLink = null;
  const setActiveLink = (link) => {
    if (link === activeLink) return;
    navLinks.forEach((item) => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
    activeLink = link;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = targets.find((target) => target.section === entry.target);
        if (match) {
          setActiveLink(match.link);
        }
      });
    },
    { threshold: 0.5 }
  );

  setActiveLink(targets[0].link);
  targets.forEach(({ section }) => observer.observe(section));
  return observer;
})();

const heroTilt = (() => {
  if (!heroSection || prefersReducedMotion.matches || !prefersFinePointer.matches) return null;
  const maxTilt = 6;
  const updateTilt = (event) => {
    const rect = heroSection.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    root.style.setProperty('--hero-tiltX', `${normalizedX * maxTilt}deg`);
    root.style.setProperty('--hero-tiltY', `${normalizedY * -maxTilt}deg`);
  };
  const resetTilt = () => {
    root.style.setProperty('--hero-tiltX', '0deg');
    root.style.setProperty('--hero-tiltY', '0deg');
  };
  heroSection.addEventListener('pointermove', updateTilt);
  heroSection.addEventListener('pointerleave', resetTilt);
  return { destroy: resetTilt };
})();

const initBook = () => {
  const container = document.getElementById('menu-book-container');
  if (!container) return;

  const book = document.getElementById('menu-book');
  const pages = Array.from(book.querySelectorAll('.book-page'));
  const btnPrev = document.getElementById('book-prev');
  const btnNext = document.getElementById('book-next');

  if (!pages.length) return;

  let currentPage = 0;

  const updateBook = () => {
    pages.forEach((page, index) => {
      // Don't override z-index if actively flipping, as it's handled by 'is-flipping' class.
      if (!page.classList.contains('is-flipping')) {
        if (index < currentPage) {
          page.classList.add('flipped');
          page.style.zIndex = index + 1; 
        } else {
          page.classList.remove('flipped');
          page.style.zIndex = pages.length - index; 
        }
      } else {
        // Just add class, let it transition out/in cleanly
        if (index < currentPage) {
          page.classList.add('flipped');
        } else {
          page.classList.remove('flipped');
        }
      }
    });

    if (btnPrev) btnPrev.disabled = currentPage === 0;
    // Don't let users turn past the very last back cover.
    if (btnNext) btnNext.disabled = currentPage >= pages.length - 1; 
  };

  btnPrev?.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      const pageToFlip = pages[currentPage];
      pageToFlip.classList.add('is-flipping');
      pageToFlip.style.zIndex = 100; // Force to top during flip
      updateBook();
      setTimeout(() => {
        pageToFlip.classList.remove('is-flipping');
        updateBook(); // re-eval z-index securely
      }, 800);
    }
  });

  btnNext?.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      const pageToFlip = pages[currentPage];
      pageToFlip.classList.add('is-flipping');
      pageToFlip.style.zIndex = 100; // Force to top during flip
      currentPage++;
      updateBook();
      setTimeout(() => {
        pageToFlip.classList.remove('is-flipping');
        updateBook(); // re-eval z-index
      }, 800);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    initSkillsHighlight();
  });
}

// --- Interactive Skills Highlighting ---
const clearHighlights = () => {
  document.querySelectorAll('.label-row').forEach(row => {
    row.classList.remove('highlighted');
  });
};

const highlightSkills = (techString) => {
  if (!techString) return;
  const techs = techString.split(',').map(t => t.trim().toLowerCase());
  techs.forEach(tech => {
    const row = document.querySelector(`.label-row[data-skill="${tech}"]`);
    if (row) row.classList.add('highlighted');
  });
};

const initSkillsHighlight = () => {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => highlightSkills(card.getAttribute('data-tech')));
    card.addEventListener('mouseleave', clearHighlights);
  });
};

// Start everything
initBook();
initSkillsHighlight();



const updateSoundCaption = (playing) => {
  if (!soundCaption) return;
  soundCaption.textContent = playing
    ? 'Café ambience playing: gentle chatter, soft rain, lo-fi hum.'
    : 'Café ambience muted. Captions: gentle chatter, soft rain, subtle lo-fi.';
};

const setAmbientToggleState = (expanded) => {
  soundToggle?.setAttribute('aria-pressed', expanded ? 'true' : 'false');
  ambientPlayer?.classList.toggle('ambient-player--hidden', !expanded);
  updateSoundCaption(expanded);
};

const isAmbientExpanded = () => soundToggle?.getAttribute('aria-pressed') === 'true';

if (soundToggle) {
  setAmbientToggleState(isAmbientExpanded());
}

soundToggle?.addEventListener('click', async () => {
  const nextState = !isAmbientExpanded();
  if (cafeAudio) {
    try {
      if (nextState) {
        await cafeAudio.play();
      } else {
        cafeAudio.pause();
      }
    } catch (error) {
      console.error('Audio playback blocked', error);
    }
  }
  setAmbientToggleState(nextState);
});

const initParticles = () => {
  if (!particlesCanvas || !heroSection || prefersReducedMotion.matches) return;
  const ctx = particlesCanvas.getContext('2d');
  const particles = [];
  const particleCount = 28;

  const resize = () => {
    particlesCanvas.width = heroSection.clientWidth;
    particlesCanvas.height = heroSection.clientHeight;
  };

  const createParticles = () => {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(168, 214, 109, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      particle.y -= particle.speed;
      if (particle.y < -10) {
        particle.y = particlesCanvas.height + 10;
        particle.x = Math.random() * particlesCanvas.width;
      }
    });
    requestAnimationFrame(draw);
  };

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
};

initParticles();

const shouldSnapToHero = () => {
  const hash = window.location.hash;
  return !hash || hash === '#hero';
};

const snapHeroIntoView = () => {
  if (!shouldSnapToHero()) return;
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.location.hash !== '#hero') {
      history.replaceState(null, '', '#hero');
    }
  });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  snapHeroIntoView();
} else {
  window.addEventListener('DOMContentLoaded', snapHeroIntoView, { once: true });
}
window.addEventListener('load', snapHeroIntoView);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    snapHeroIntoView();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

sections.forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
});

const zoomButtons = document.querySelectorAll('[data-zoomable]');

zoomButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isZoomed = button.classList.toggle('is-zoomed');
    button.setAttribute('aria-pressed', String(isZoomed));
  });
});

modalTriggers.forEach((button) => {
  const modalId = button.getAttribute('data-modal');
  const modal = document.getElementById(modalId);
  if (!modal) return;
  button.addEventListener('click', () => {
    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modals.forEach((modal) => {
  const closeBtn = modal.querySelector('[data-close]');
  const closeModal = () => {
    modal.removeAttribute('data-open');
    modal.setAttribute('aria-hidden', 'true');
    const zoomed = modal.querySelectorAll('[data-zoomable].is-zoomed');
    zoomed.forEach((button) => {
      button.classList.remove('is-zoomed');
      button.setAttribute('aria-pressed', 'false');
    });
  };
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('data-open') === 'true') {
      closeModal();
    }
  });
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!formStatus) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  formStatus.textContent = 'Sending your note...';
  submitButton?.setAttribute('disabled', 'true');

  try {
    const response = await fetch('https://formsubmit.co/ajax/YOUR_UNIQUE_FORM_ID_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }

    formStatus.textContent = `Thanks${payload.name ? `, ${payload.name}` : ''}! Your note is on its way.`;
    contactForm.reset();
  } catch (error) {
    console.error(error);
    formStatus.textContent = 'Hmm, something went wrong. Feel free to email me directly instead!';
  } finally {
    submitButton?.removeAttribute('disabled');
    setTimeout(() => {
      formStatus.textContent = '';
    }, 6000);
  }
});

/* ================================
   EMPLOYEE CARD (FLIP CARD)
   ================================ */
const initFlipCard = () => {
  const card = document.getElementById('profile-card');
  const inner = card?.querySelector('.flip-card-inner');
  if (!inner) return;

  card.addEventListener('click', (e) => {
    // Prevent flip if clicking on links or buttons if any (though there are none inside currently)
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    inner.classList.toggle('is-flipped');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initFlipCard();
});
