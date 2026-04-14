// ================================
// SPLASH SCREEN — CAFÉ RECEIPT
// ================================
const splashScreen = document.getElementById('splash-screen');

const hideSplash = (() => {
  let dismissed = false;
  return () => {
    if (dismissed || !splashScreen) return;
    dismissed = true;
    splashScreen.classList.add('splash-hidden');
    setTimeout(() => splashScreen.remove(), 700);
  };
})();

if (splashScreen) {
  // All 5 check items
  const checks = [
    document.getElementById('check-1'),
    document.getElementById('check-2'),
    document.getElementById('check-3'),
    document.getElementById('check-4'),
    document.getElementById('check-5'),
  ];

  // Staggered delays (ms) after page load before each line appears
  const APPEAR_DELAYS  = [1500, 2000, 2550, 3100, 3650];
  // How long after appearing before each gets ticked ✓
  const TICK_OFFSETS   = [400,  400,  400,  400,  500 ];
  // Auto-dismiss after the last tick + a short pause
  const AUTO_DISMISS_AFTER = 3650 + 500 + 800; // ~5s total

  checks.forEach((el, i) => {
    if (!el) return;
    const box = el.querySelector('.check-box');

    // 1. Slide in
    setTimeout(() => {
      el.classList.add('check-visible');
    }, APPEAR_DELAYS[i]);

    // 2. Tick ✓
    setTimeout(() => {
      if (box) box.textContent = '[✓]';
      el.classList.add('is-checked');
    }, APPEAR_DELAYS[i] + TICK_OFFSETS[i]);
  });

  // Auto-dismiss
  const autoTimer = setTimeout(hideSplash, AUTO_DISMISS_AFTER);

  // Click / tap to skip instantly
  splashScreen.addEventListener('click', () => {
    clearTimeout(autoTimer);
    hideSplash();
  });
}


// ================================
// MAIN SITE CODE — DASHBOARD SPA
// ================================
const dashboardContainer = document.querySelector('.dashboard-container');
const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');
const navLinkBtns = document.querySelectorAll('.nav-link-btn');
const root = document.documentElement;
const themeToggle = document.querySelector('.toggle-theme');
const soundToggle = document.querySelector('[data-sound-toggle]');
const particlesCanvas = document.getElementById('matcha-particles');
const heroSection = document.getElementById('hero');

// --- Screen Switching Logic ---
const switchScreen = (targetId) => {
  const targetScreen = document.getElementById(targetId);
  if (!targetScreen) return;

  // Play Paper Flick (Sound placeholder logic)
  playFlickSound();

  // Update Screens
  screens.forEach(s => s.classList.remove('active'));
  targetScreen.classList.add('active');

  // Update Nav
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.target === targetId);
  });

  // Update state/URL
  history.pushState(null, '', `#${targetId}`);
};

// Listen for Sidebar Nav
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.target) switchScreen(item.dataset.target);
  });
});

// Listen for In-Screen Buttons
navLinkBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.target) switchScreen(btn.dataset.target);
  });
});

// Sound Logic Placeholder
const flickAudio = document.getElementById('paper-flick-audio');
const playFlickSound = () => {
  if (flickAudio) {
    flickAudio.currentTime = 0;
    flickAudio.play().catch(e => console.log('Audio autoplay prevented.'));
  }
};

// --- Custom Cursor ---
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
});

// --- Theme Management ---
const setTheme = (mode) => {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
};

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}

// Initial direct link handling
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchScreen(hash);
  }
});



// --- Status Bar Ticker ---
const statusText = document.querySelector('.status-item span');
const vibes = [
  'Currently Brewing: New Projects',
  'Status: Open for Collaboration',
  'Vibe: Matcha-Powered Engineering 🍵',
  'Last Updated: Just Now',
  'Coffee Status: Refueling...'
];
let vibeIndex = 0;

setInterval(() => {
  if (statusText) {
    statusText.style.opacity = 0;
    setTimeout(() => {
      vibeIndex = (vibeIndex + 1) % vibes.length;
      statusText.textContent = vibes[vibeIndex];
      statusText.style.opacity = 1;
    }, 400);
  }
}, 5000);

// Start everything
// initSkillsHighlight(); // We'll update this next



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

screens.forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
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

// --- Contact Form & Stamp ---
const contactForm = document.getElementById('cafe-order-form');
const stampContainer = document.getElementById('order-stamp-container');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Trigger Stamp
  if (stampContainer) {
    stampContainer.classList.add('active');
    playFlickSound(); // Using same sound for feedback
  }

  // Simulate API call (Old logic)
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton?.setAttribute('disabled', 'true');
  
  setTimeout(() => {
    alert('Order Received! Victoria will get back to you soon. 🍵');
    contactForm.reset();
    stampContainer?.classList.remove('active');
    submitButton?.removeAttribute('disabled');
  }, 2000);
});

// --- Dynamic Clock ---
const updateTime = () => {
  const timeEl = document.getElementById('current-time');
  if (!timeEl) return;
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

setInterval(updateTime, 1000);
updateTime();


// ================================
// UNIFIED MODAL SYSTEM
// ================================
let modalOverlay, portfolioModal, modalBody, modalCloseBtn;

function openModal(templateId) {
  const tpl = document.getElementById(templateId);
  if (!tpl || !modalBody) return;
  modalBody.innerHTML = tpl.innerHTML;
  modalOverlay.classList.add('open');
  portfolioModal.classList.add('open');
  portfolioModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  portfolioModal.classList.remove('open');
  portfolioModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { if (modalBody) modalBody.innerHTML = ''; }, 300);
}

// Event delegation for all data-modal triggers (project cards)
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal]');
  if (trigger) {
    openModal(trigger.dataset.modal);
    return;
  }
  if (modalOverlay && e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


// ================================
// NUTRITION LABEL ROW HOVER
// highlights label-row.indent rows when hovering a project card
// ================================
const allSkillRows = () => document.querySelectorAll('.label-row.indent[data-skill]');
const allProjectCards = () => document.querySelectorAll('.project-row-card[data-tech]');

function resetSkillRows() {
  allSkillRows().forEach(row => {
    row.classList.remove('skill-highlighted', 'skill-dimmed');
  });
}

function highlightSkillRows(techList) {
  const techs = techList.split(',').map(t => t.trim().toLowerCase());
  allSkillRows().forEach(row => {
    const skill = row.dataset.skill.toLowerCase();
    if (techs.includes(skill)) {
      row.classList.add('skill-highlighted');
      row.classList.remove('skill-dimmed');
    } else {
      row.classList.add('skill-dimmed');
      row.classList.remove('skill-highlighted');
    }
  });
}

// ================================
// JOURNEY ACCORDION
// Click to expand inline — one open at a time
// ================================
function initAccordion() {
  document.querySelectorAll('[data-expand]').forEach(summary => {
    summary.addEventListener('click', () => {
      const targetId = summary.dataset.expand;
      const targetItem = document.getElementById(targetId);
      if (!targetItem) return;

      const isCurrentlyOpen = targetItem.classList.contains('is-open');

      // Close all (only one open at a time)
      document.querySelectorAll('.journey-accordion.is-open').forEach(item => {
        item.classList.remove('is-open');
      });

      // Open if it wasn't already open
      if (!isCurrentlyOpen) {
        targetItem.classList.add('is-open');
      }
    });
  });
}

// ================================
// COLLAGE LIGHTBOX
// Click a collage image to preview full-size
// ================================
function initCollageLightbox() {
  document.querySelectorAll('.collage-item[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.lightbox;
      const lb = document.createElement('div');
      lb.className = 'collage-lightbox';
      lb.innerHTML = `<img src="${src}" alt="Preview" />`;
      lb.addEventListener('click', () => lb.remove());
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', esc); }
      });
      document.body.appendChild(lb);
    });
  });
}

// Init all interactive features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Resolve modal elements
  modalOverlay   = document.getElementById('modal-overlay');
  portfolioModal = document.getElementById('portfolio-modal');
  modalBody      = document.getElementById('modal-body');
  modalCloseBtn  = document.getElementById('modal-close-btn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // Flip card
  initFlipCard();

  // Journey accordion
  initAccordion();

  // Collage lightbox
  initCollageLightbox();

  // Skill row hover — re-bind in case cards are in DOM
  allProjectCards().forEach(card => {
    card.addEventListener('mouseenter', () => {
      const tech = card.dataset.tech;
      if (tech) highlightSkillRows(tech);
    });
    card.addEventListener('mouseleave', resetSkillRows);
  });
});
