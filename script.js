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
  const APPEAR_DELAYS = [1500, 2000, 2550, 3100, 3650];
  // How long after appearing before each gets ticked ✓
  const TICK_OFFSETS = [400, 400, 400, 400, 500];
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

  const currentScreen = document.querySelector('.screen.active');
  if (currentScreen && currentScreen.id === targetId) return;

  // Play Paper Flick (Sound placeholder logic)
  playFlickSound();

  if (currentScreen) {
    currentScreen.classList.remove('active');
  }

  requestAnimationFrame(() => {
    targetScreen.classList.add('active');
  });

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
// TABBED MODAL SYSTEM
// ================================
let modalOverlay, portfolioModal, modalCloseBtn;

// DOM refs for the modal shell parts
let pmStickyEmoji, pmStickyTitle, pmStickyDiscipline,
  pmMetaRow, pmSnapProblem, pmSnapSolution, pmSnapImpact,
  pmTabNav, pmTabContent;

let currentProjectData = null;

function openModal(dataId) {
  const dataScript = document.getElementById(dataId);
  if (!dataScript) return;

  let project;
  try {
    project = JSON.parse(dataScript.textContent);
  } catch (e) {
    console.error('Modal JSON parse error:', e);
    return;
  }
  currentProjectData = project;

  // Populate sticky header
  pmStickyEmoji.textContent = project.emoji || '';
  pmStickyTitle.textContent = project.title || '';
  pmStickyDiscipline.textContent = project.discipline || '';

  // Meta pills
  pmMetaRow.innerHTML = '';
  if (project.role) {
    const rp = document.createElement('span');
    rp.className = 'pm-meta-pill role';
    rp.textContent = project.role;
    pmMetaRow.appendChild(rp);
  }
  if (project.timeline) {
    const tp = document.createElement('span');
    tp.className = 'pm-meta-pill timeline';
    tp.textContent = project.timeline;
    pmMetaRow.appendChild(tp);
  }

  // Snapshot bar
  pmSnapProblem.textContent = project.snapshot?.problem || '';
  pmSnapSolution.textContent = project.snapshot?.solution || '';
  pmSnapImpact.textContent = project.snapshot?.impact || '';

  // Build tab nav + render first tab
  pmTabNav.innerHTML = '';
  if (project.tabs && project.tabs.length) {
    project.tabs.forEach((tab, i) => {
      const btn = document.createElement('button');
      btn.className = 'pm-tab-btn' + (i === 0 ? ' active' : '');
      btn.textContent = tab.label;
      btn.dataset.tabId = tab.id;
      btn.addEventListener('click', () => switchTab(btn, tab.content));
      pmTabNav.appendChild(btn);
    });
    renderTabContent(project.tabs[0].content);
  }

  // Open
  modalOverlay.classList.add('open');
  portfolioModal.classList.add('open');
  portfolioModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';

  // Reset scroll
  pmTabContent.scrollTop = 0;
}

function switchTab(activeBtn, content) {
  // Update active state
  pmTabNav.querySelectorAll('.pm-tab-btn').forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');

  // Fade out → swap → fade in (via CSS animation on .pm-tab-panel)
  pmTabContent.style.opacity = '0';
  pmTabContent.style.transform = 'translateY(6px)';
  pmTabContent.style.transition = 'opacity 0.12s ease, transform 0.12s ease';

  setTimeout(() => {
    renderTabContent(content);
    pmTabContent.scrollTop = 0;
    pmTabContent.style.opacity = '1';
    pmTabContent.style.transform = 'translateY(0)';
  }, 120);
}

function renderTabContent(htmlContent) {
  pmTabContent.style.opacity = '1';
  pmTabContent.style.transform = 'translateY(0)';
  pmTabContent.style.transition = '';
  const panel = document.createElement('div');
  panel.className = 'pm-tab-panel';
  panel.innerHTML = htmlContent;
  pmTabContent.innerHTML = '';
  pmTabContent.appendChild(panel);
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  portfolioModal.classList.remove('open');
  portfolioModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentProjectData = null;
}

// Event delegation for project card clicks
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
// ACCORDION (Journey + Community)
// Groups are independent — only one open per group at a time
// ================================
function initAccordion() {
  document.querySelectorAll('[data-expand]').forEach(summary => {
    summary.addEventListener('click', () => {
      const targetId = summary.dataset.expand;
      const targetItem = document.getElementById(targetId);
      if (!targetItem) return;

      const isCurrentlyOpen = targetItem.classList.contains('is-open');
      const isCommunity = targetItem.classList.contains('community-accordion');

      if (isCommunity) {
        // Community group: close siblings, toggle target
        document.querySelectorAll('.community-accordion.is-open').forEach(item => {
          item.classList.remove('is-open');
        });
        if (!isCurrentlyOpen) targetItem.classList.add('is-open');

      } else {
        // Journey group: close siblings, toggle target
        document.querySelectorAll('.journey-accordion.is-open').forEach(item => {
          item.classList.remove('is-open');
        });
        if (!isCurrentlyOpen) targetItem.classList.add('is-open');

        // Drive the dim system: add has-active to timeline when something is open
        const timeline = document.querySelector('.journey-timeline');
        if (timeline) {
          const anyOpen = timeline.querySelector('.journey-accordion.is-open');
          timeline.classList.toggle('has-active', !!anyOpen);
        }
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
  modalOverlay = document.getElementById('modal-overlay');
  portfolioModal = document.getElementById('portfolio-modal');
  modalCloseBtn = document.getElementById('modal-close-btn');
  pmStickyEmoji = document.getElementById('pm-sticky-emoji');
  pmStickyTitle = document.getElementById('pm-sticky-title');
  pmStickyDiscipline = document.getElementById('pm-sticky-discipline');
  pmMetaRow = document.getElementById('pm-meta-row');
  pmSnapProblem = document.getElementById('pm-snap-problem');
  pmSnapSolution = document.getElementById('pm-snap-solution');
  pmSnapImpact = document.getElementById('pm-snap-impact');
  pmTabNav = document.getElementById('pm-tab-nav');
  pmTabContent = document.getElementById('pm-tab-content');
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
  // Project Filtering
  const projectBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-row-card[data-category]');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          // Small delay to allow display to apply before fading in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.98)';
          // Wait for transition before hiding from flow
          setTimeout(() => {
            // Verify state to prevent race conditions during fast clicking
            if (btn.classList.contains('active') && (filter !== 'all' && card.dataset.category !== filter)) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
});
