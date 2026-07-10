// =========================================================
// Victoria Nguyen — matcha café portfolio
// Vanilla logic: work cards, project modal, journey timeline,
// draggable photo wall, director blob, music, easter eggs.
// =========================================================

/* ---------------- PROJECT DATA ---------------- */
const PROJECTS = [
  {
    id: 'acaso', title: 'ACASO', mono: 'Ac', type: 'product',
    meta: 'Startup · AI Financial Operations',
    role: 'Co-Founder & CEO', dates: 'May 2026 – Present',
    blurb: 'AI-powered financial operations platform — document processing, invoice & contract auditing.',
    tags: ['Product Strategy', 'AI', 'Full-stack', 'UX/UI'],
    snapshot: {
      problem: 'Finance teams audit invoices & contracts by hand — slow, costly, error-prone',
      solution: 'AI-powered document processing that automates invoice & contract auditing',
      impact: 'Product strategy, UX, and full-stack build led end-to-end from zero',
    },
    tabs: [
      { label: 'Situation', html: `<div class='pm-content-section'><h3>Overview</h3><p>ACASO is an AI-powered financial operations platform for processing, auditing, and understanding financial documents.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Co-founded the company and lead as <strong>CEO</strong></li><li>Drive product strategy and customer discovery</li><li>Design the UX/UI and build the platform full-stack</li></ul></div><div class='pm-content-section'><h3>Tools</h3><div class='pm-tag-row'><span>Product Strategy</span><span>Customer Discovery</span><span>AI Document Processing</span><span>UX/UI</span><span>Full-stack</span></div></div>` },
      { label: 'Product', html: `<div class='pm-content-section'><h3>What We Built</h3><p>An AI document pipeline for invoice and contract auditing — extracting, validating, and flagging financial documents so teams catch issues before they cost money.</p></div>` },
      { label: 'Building it', html: `<div class='pm-content-section'><h3>Startup Lessons</h3><p>Building from zero: talking to customers before writing code, shipping small, and letting discovery reshape the roadmap.</p></div>` },
    ],
  },
  {
    id: 'synthlab', title: 'SynthLab', mono: 'Sy', type: 'tech',
    meta: 'Healthcare AI · Python · FastAPI · React · FAISS · SDV',
    role: 'Full-Stack Engineer & Researcher', dates: 'Dec 2025 – Feb 2026',
    blurb: 'Privacy-preserving synthetic data for pediatric healthcare — multi-method generation, statistical validation, fairness testing.',
    tags: ['Python', 'FastAPI', 'React', 'FAISS'],
    snapshot: {
      problem: "Clinical researchers can't use real patient data for ML, blocking fairness testing",
      solution: 'Privacy-preserving synthetic data generation pipeline with statistical validation',
      impact: 'Multi-method generation · FAISS retrieval · Async FastAPI backend built',
    },
    tabs: [
      { label: 'Overview', html: `<div class='pm-content-section'><h3>Context</h3><p>Clinical researchers often can't use real patient data due to privacy constraints (HIPAA), which limits experimentation with machine learning models — especially for fairness and bias analysis in pediatric care.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Built the <strong>end-to-end synthetic data generation pipeline</strong></li><li>Designed statistical validation workflows for realism testing</li><li>Implemented FastAPI backend with caching and async processing</li><li>Integrated FAISS-based retrieval system for research queries</li></ul></div><div class='pm-content-section'><h3>Stack</h3><div class='pm-tag-row'><span>Python</span><span>FastAPI</span><span>React</span><span>FAISS</span><span>SDV</span><span>Pandas</span><span>Docker</span></div></div>` },
      { label: 'Build', html: `<div class='pm-content-section'><h3>What I Built</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>🔬</span><h4>Synthetic Data Pipeline</h4><p>Built using SDV models (CTGAN, TVAE) to generate realistic but privacy-safe patient data.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>📊</span><h4>Validation Workflows</h4><p>Statistical comparison of synthetic vs. real data distributions for realism and fairness.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>⚡</span><h4>FastAPI Backend</h4><p>Async processing with caching layer to reduce latency on expensive generation calls.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🔍</span><h4>FAISS Retrieval</h4><p>Vector-based search enabling researchers to query datasets and related research efficiently.</p></div></div></div><div class='pm-content-section'><h3>Demo Video</h3><div class='pm-video-frame'><iframe src='https://www.youtube.com/embed/2g5cvh6bRTM' title='SynthLab demo' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen loading='lazy'></iframe></div></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Outcome</h3><p>Helped enable safe dataset simulation and made ML experimentation more accessible without exposing sensitive patient data — a critical step toward fairer pediatric AI models.</p></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>Privacy constraints are <strong>design constraints</strong> — building around them requires creative architecture.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Statistical validation is as important as generation quality — realism must be measurable.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Async design patterns drastically improve UX for computationally expensive ML pipelines.</p></div></div></div>` },
    ],
  },
  {
    id: 'heartline', title: 'Heartline Care Companion', mono: 'He', type: 'tech',
    meta: 'Healthcare UX · React Native · Node.js · Figma',
    role: 'Full-Stack Engineer & Designer', dates: 'Nov 2025 – Dec 2025',
    blurb: 'Wellness mobile app built around hospital care routines — gentle reminders, mood check-ins, adaptive UI.',
    tags: ['React Native', 'Node.js', 'Figma'],
    snapshot: {
      problem: 'Wellness apps are disconnected from the actual rhythms of clinical care routines',
      solution: 'Adaptive mobile companion built around hospital care patterns and patient needs',
      impact: 'React Native app · Mood tracking · Gentle reminder engine built',
    },
    tabs: [
      { label: 'Overview', html: `<div class='pm-content-section'><h3>The Problem</h3><p>After working in clinical settings, I saw how disconnected wellness tools are from the actual rhythms of care. Apps don't adapt to how patients or care teams actually operate day to day — their energy levels, shift patterns, and recovery states.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Designed and built the <strong>full React Native mobile app</strong> with warm adaptive UI</li><li>Architected Node.js + Express backend with user session management</li><li>Led design decisions rooted in clinical workflow patterns</li></ul></div><div class='pm-content-section'><h3>Stack</h3><div class='pm-tag-row'><span>React Native</span><span>Node.js</span><span>Express</span><span>Figma</span><span>User Research</span></div></div>` },
      { label: 'Build', html: `<div class='pm-content-section'><h3>What I Built</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>📱</span><h4>Adaptive UI</h4><p>React Native mobile app with warm, comforting interface that adapts tone to user energy level.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>😌</span><h4>Mood Check-In System</h4><p>Pattern tracking over time to surface trends and trigger personalized support prompts.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🔔</span><h4>Reminder Engine</h4><p>Gentle, context-aware reminders that respect user energy levels and care routines.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🔒</span><h4>Session Management</h4><p>Node.js + Express backend with secure user sessions and persistent tracking data.</p></div></div></div><div class='pm-content-section'><h3>Demo Video</h3><div class='pm-video-frame'><iframe src='https://www.youtube.com/embed/hQRuj-UzGAA' title='Heartline demo' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen loading='lazy'></iframe></div></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Design Intent &amp; Outcome</h3><p>Borrowed patterns from clinical workflows — routine, consistency, and feedback loops — and wrapped them in an interface that feels comforting rather than clinical. The goal was to reduce friction around self-care, not add another source of obligation.</p></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>Clinical experience gave me <strong>real empathy for users</strong> — I had lived the problem before building the solution.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Comfort in UI is a <strong>design discipline</strong> — tone, color, and copy choices all contribute to emotional safety.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Full-stack ownership forces you to make better <strong>architecture decisions</strong> early.</p></div></div></div>` },
    ],
  },
  {
    id: 'smartrecord', title: 'Smart Record App', mono: 'Sm', type: 'tech',
    meta: 'Clinical Tool · React · Python · UX Design',
    role: 'Engineer & Designer', dates: 'Nov 2025 – Dec 2025',
    blurb: 'Clinical documentation simulator for care-team onboarding — walks through vitals flows & decision points.',
    tags: ['React', 'Python', 'Clinical Design'],
    snapshot: {
      problem: 'New care team members face a steep, fragmented EMR learning curve with no guided onboarding',
      solution: 'Interactive clinical documentation simulator walking through real patient vitals flows',
      impact: 'Vitals decision tree built · Clinical flagging system designed · React + Python full-stack',
    },
    tabs: [
      { label: 'Overview', html: `<div class='pm-content-section'><h3>The Problem</h3><p>New care team members and students face a steep learning curve with EMR systems. Existing training is fragmented, intimidating, and disconnected from real clinical decisions — driving errors and slowing onboarding.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Built a <strong>React app</strong> simulating realistic patient vitals flows</li><li>Designed clinical decision tree mapping vitals to care actions</li><li>Developed Python backend for case data management</li><li>Led UI design with clinical empathy and progressive disclosure</li></ul></div><div class='pm-content-section'><h3>Stack</h3><div class='pm-tag-row'><span>React</span><span>Python</span><span>Figma</span><span>HTML/CSS</span><span>Clinical Design</span></div></div>` },
      { label: 'Build', html: `<div class='pm-content-section'><h3>What I Built</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>📋</span><h4>Vitals Flow Simulator</h4><p>React app walking users through realistic patient vitals scenarios with step-by-step guidance.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>⚠️</span><h4>Clinical Flagging System</h4><p>Highlighting system that flags concerning values with contextual explanations and safe ranges.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🌳</span><h4>Decision Tree</h4><p>Maps vitals data to appropriate clinical actions — helping new staff develop correct mental models.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🐍</span><h4>Python Backend</h4><p>Case data management and scenario loading for flexible, multi-patient simulation.</p></div></div></div><div class='pm-content-section'><h3>Design Intent</h3><p>Learning care shouldn't feel intimidating. The UI is warm, progressive, and built around the actual mental model of a new care team member — not a developer's convenience.</p></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Outcome</h3><p>Created a training tool that makes clinical documentation learning accessible, contextual, and less intimidating — reducing the gap between classroom knowledge and bedside application.</p></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>Domain expertise is a <strong>design superpower</strong> — clinical experience made every decision more grounded.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Progressive disclosure reduces overwhelm — show only what's needed <strong>at the right moment</strong>.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Real empathy for users means <strong>living in their context</strong>, not just interviewing them.</p></div></div></div>` },
    ],
  },
  {
    id: 'hopper', title: 'Hopper', mono: 'Ho', type: 'product',
    meta: 'Product Research · UX Strategy · Prototyping',
    role: 'Lead Researcher & Designer', dates: 'Jan 2026 – Apr 2026',
    blurb: 'Real-time study space discovery — observational research, environment indicators, defined product direction.',
    tags: ['User Research', 'UX Strategy', 'Figma'],
    snapshot: {
      problem: 'Students waste time on trial-and-error with no real-time study space visibility',
      solution: 'Real-time environment discovery platform with crowd, noise & seating indicators',
      impact: 'Observational research across 5+ locations · Full product direction defined',
    },
    tabs: [
      { label: 'Situation', html: `<div class='pm-content-section'><h3>Overview</h3><p>Hopper is a real-time study space discovery platform that helps students make faster, more confident decisions about where to study.</p></div><div class='pm-content-section'><h3>Context</h3><p>Students rely on trial-and-error when selecting study spaces, often using static tools that don't reflect real-time conditions. This leads to wasted time, disrupted focus, and inconsistent productivity.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Led <strong>product research and behavioral analysis</strong> across multiple campus locations</li><li>Defined product direction and feature prioritization framework</li><li>Translated research insights into UX strategy and prototypes</li></ul></div><div class='pm-content-section'><h3>Tools</h3><div class='pm-tag-row'><span>Observational Research</span><span>Interviews</span><span>Behavioral Analysis</span><span>Figma</span></div></div>` },
      { label: 'Research', html: `<div class='pm-content-section'><h3>Problem Statement</h3><p class='pm-callout'>Students lack visibility into real-time study environments, forcing inefficient trial-and-error decision-making that breaks focus and wastes time.</p></div><div class='pm-content-section'><h3>Research Methods</h3><ul><li>In-person <strong>observational research</strong> across libraries, cafés, and common areas</li><li>Tracked decision hesitation patterns and space-switching behavior</li><li>Found students frequently leave quickly if a space doesn't meet expectations on arrival</li></ul></div><div class='pm-content-section'><h3>Key Insights</h3><div class='pm-insight-cards'><div class='pm-insight-card'><span class='pm-insight-num'>01</span><p>Students rarely know what a space <em>feels like</em> before arriving</p></div><div class='pm-insight-card'><span class='pm-insight-num'>02</span><p>Decision-making is driven by <strong>environment factors</strong> — not just location</p></div><div class='pm-insight-card'><span class='pm-insight-num'>03</span><p>Trial-and-error creates friction and <strong>breaks study flow</strong> before it starts</p></div><div class='pm-insight-card'><span class='pm-insight-num'>04</span><p>No existing tool surfaces real-time crowd, noise, or seating data</p></div></div></div><div class='pm-content-section'><h3>Target Users</h3><ul><li>Students studying in public and shared environments</li><li>Users sensitive to environmental conditions (noise, crowd)</li><li>Productivity-focused individuals with variable schedules</li></ul></div>` },
      { label: 'Design', html: `<div class='pm-content-section'><h3>Feature Decisions</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>👥</span><h4>Real-Time Crowd &amp; Seating</h4><p>Addresses biggest uncertainty. Reduces wasted trips before they happen.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🔊</span><h4>Noise Level Indicators</h4><p>Key factor in productivity. Visual indicators for quick, scannable interpretation.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>⚡</span><h4>Smart Filtering</h4><p>Enables fast narrowing of options. Designed to avoid overwhelming users with choices.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🗺️</span><h4>Map + List Hybrid</h4><p>Map supports discovery. List supports comparison and decision-making.</p></div></div></div><div class='pm-content-section'><h3>Site Map</h3><div class='pm-img-frame'><img src='assets/projects/p2_site.png' alt='Site map' loading='lazy'></div></div><div class='pm-content-section'><h3>Lo-Fidelity Exploration</h3><div class='pm-img-frame'><img src='assets/projects/lofi_p2.png' alt='Lo-fi wireframes' loading='lazy'></div></div><div class='pm-content-section'><h3>Hi-Fi Design</h3><div class='pm-img-frame'><img src='assets/projects/hifi_p2.png' alt='Hi-fi designs' loading='lazy'></div></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Final Outcome</h3><div class='pm-img-frame'><img src='assets/projects/hopper_prototype.png' alt='Final designs' loading='lazy'></div><p style='margin-top:.75rem'>A product direction that reduces decision time, minimizes trial-and-error, and improves study session consistency.</p></div><div class='pm-content-section'><h3>Working Prototype</h3><a class='pm-prototype-btn' href='https://www.figma.com/proto/5FR4OZzjIcEkWsQ1ADRFL9/Project-2---victoria-nguyen?node-id=126-1792&t=ZpxeV1erFJveLsFx-1&scaling=scale-down&content-scaling=fixed&page-id=126%3A439&starting-point-node-id=126%3A1786&show-proto-sidebar=1&fuid=1563092725869860287' target='_blank' rel='noopener'>View Prototype ↗</a></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>The core problem was <strong>uncertainty</strong>, not discovery — students knew where spaces existed.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Users prioritize <strong>better decisions</strong> over more options — reduce choice anxiety first.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Effective UX reduces <strong>hesitation</strong>, not just the number of steps in a flow.</p></div></div></div>` },
    ],
  },
  {
    id: 'betbuddies', title: 'BetBuddies', mono: 'Be', type: 'product',
    meta: 'Entrepreneurship · User Research · Behavioral Design',
    role: 'Product Founder & Chief Marketing Officer', dates: 'Sep 2025 – Apr 2026',
    blurb: 'Hybrid behavior-change platform — 100+ interviews combining sleep tracking with social accountability.',
    tags: ['Behavioral Design', 'User Research', 'Product Strategy'],
    snapshot: {
      problem: 'College students struggle to maintain consistent sleep habits — low awareness, motivation & accountability',
      solution: 'Hybrid platform combining sleep tracking, social accountability & low-stakes commitment',
      impact: '100+ interviews · 2 phases · Hybrid model validated · Go decision confirmed',
    },
    tabs: [
      { label: 'Situation', html: `<div class='pm-content-section'><div class='pm-img-frame' style='max-width:70%;margin:0 auto'><img src='assets/projects/betbuddies_prototype.png' alt='BetBuddies prototype' loading='lazy'></div></div><div class='pm-content-section'><h3>Overview</h3><p>BetBuddies is a behavior-change platform designed to help college students build consistent sleep habits. It combines sleep tracking, social accountability, and low-stakes commitment systems to drive awareness, motivation, and long-term consistency.</p></div><div class='pm-content-section'><h3>Context</h3><p>Most existing sleep and habit apps are easy to ignore. While students already use alarms, trackers, and routines, these tools fail to drive sustained behavior change because they lack engagement, accountability, and meaningful feedback. This is especially problematic for college students, whose schedules are inconsistent and highly influenced by academic and social pressures.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Designed and executed 2-phase research strategy (discovery + validation)</li><li>Conducted 100+ user interviews with college students</li><li>Led experiment design and analysis (social + tracking validation)</li><li>Synthesized insights into a go/no-go product decision framework</li><li>Defined product strategy and core feature set</li></ul></div><div class='pm-content-section'><h3>Tools</h3><div class='pm-tag-row'><span>User Interviews</span><span>Survey Design</span><span>Behavioral Analysis</span><span>Product Strategy</span><span>Figma</span></div></div>` },
      { label: 'Research', html: `<div class='pm-content-section'><h3>Problem Statement</h3><p class='pm-callout'>College students consistently fail to maintain 7–8 hours of sleep, not due to lack of tools, but due to lack of sustained motivation, accountability, and awareness.</p></div><div class='pm-content-section'><h3>Key Insights</h3><div class='pm-insight-cards'><div class='pm-insight-card'><span class='pm-insight-num'>01</span><p>Students already use sleep tools but abandon them due to low engagement</p></div><div class='pm-insight-card'><span class='pm-insight-num'>02</span><p>Social influence significantly increases adoption and consistency</p></div><div class='pm-insight-card'><span class='pm-insight-num'>03</span><p>Tracking and data insights are required for long-term engagement</p></div><div class='pm-insight-card'><span class='pm-insight-num'>04</span><p>High-risk financial penalties reduce adoption — users prefer low-stakes accountability</p></div></div></div><div class='pm-content-section'><h3>Research Method</h3><ul><li>Phase 1: Exploratory interviews to understand habit failure patterns</li><li>Phase 2: Concept validation through experiments (social + tracking)</li><li>Mixed-method approach combining qualitative interviews and survey data</li></ul></div>` },
      { label: 'Strategy', html: `<div class='pm-content-section'><h3>Solution</h3><p>BetBuddies uses a hybrid model that integrates tracking, social interaction, and accountability. Instead of relying on discipline alone, it aligns awareness (tracking), motivation (social), and consistency (accountability) into a single system.</p></div><div class='pm-content-section'><h3>Key Design Decisions</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>📊</span><h4>Tracking</h4><p>Provides sleep data, trends, and insights to increase awareness and perceived value</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>👥</span><h4>Social</h4><p>Friend groups, challenges, and shared progress drive engagement and accountability</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🎯</span><h4>Accountability</h4><p>Low-stakes bets or points increase commitment without introducing stress or risk</p></div></div></div><div class='pm-content-section'><h3>Experiments</h3><div class='pm-two-col'><div><p class='pm-col-label'>Experiment 1: Social Accountability</p><p>Users were significantly more likely to download and engage when friends were involved. <strong>Insight:</strong> Close social groups drive adoption and motivation.</p></div><div><p class='pm-col-label'>Experiment 2: Tracking vs Accountability</p><p>Users strongly preferred tracking + accountability over accountability alone. <strong>Insight:</strong> Data creates long-term engagement, not just motivation.</p></div></div></div><div class='pm-content-section'><h3>Prototype</h3><a class='pm-prototype-btn' href='https://grass-chrome-97636871.figma.site/home' target='_blank' rel='noopener'>View Prototype ↗</a></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Validated Outcomes</h3><ul><li>50+ user interviews conducted</li><li>2 experiments validated core assumptions</li><li>Clear preference for hybrid model (tracking + social + accountability)</li><li>Strong demand signal → GO decision confirmed</li></ul></div><div class='pm-content-section'><h3>Product Insight</h3><p class='pm-callout'>Behavior change is not driven by a single feature, but by the interaction of awareness, motivation, and accountability. The most effective solution was not maximizing one factor, but balancing all three.</p></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>Behavior change requires real engagement, not just tools.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Social accountability is most effective when paired with data.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Users prefer low-pressure systems over high-risk penalties.</p></div><div class='pm-reflection-item'><span>🚀</span><p>Strong product decisions come from iterative validation, not assumptions.</p></div></div></div>` },
      { label: 'Pitch', html: `<div class='pm-content-section'><h3>Pitch Deck</h3><a class='pm-prototype-btn' href='https://www.canva.com/design/DAHEPTcKAfc/fzSqf8wV50zCmIxYRihyLQ/view?utm_content=DAHEPTcKAfc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h327d0e9d93' target='_blank' rel='noopener' style='margin-bottom:1.2rem'>Click to see pitch ↗</a><div class='pm-img-frame'><img src='assets/projects/betbuddies_pitch.png' alt='BetBuddies pitch cover' loading='lazy'></div></div>` },
    ],
  },
  {
    id: 'betterschedule', title: 'betterSchedule', mono: 'bS', type: 'product',
    meta: 'Product Design · UX Research · Figma · Agile',
    role: 'Product Lead & Designer', dates: 'Sep 2025 – Dec 2025',
    blurb: 'Academic scheduling platform redesign from user interviews — adaptive time-blocking, syllabus sync, smart prioritization.',
    tags: ['Figma', 'UX Research', 'Agile'],
    snapshot: {
      problem: 'Tool fragmentation causes planning fatigue and missed deadlines',
      solution: 'One unified academic planning platform with intelligent scheduling',
      impact: '10+ interviews · 3 personas · Full PRD delivered',
    },
    tabs: [
      { label: 'Situation', html: `<div class='pm-content-section'><h3>Overview</h3><p>betterSchedule is an academic planning platform designed to reduce tool fragmentation and help students manage their workload in one place.</p></div><div class='pm-content-section'><h3>Context</h3><p>Students juggle platforms like Canvas, Google Calendar, and messaging apps to stay on top of assignments, deadlines, and group work. This scattered workflow leads to planning fatigue, missed deadlines, and inefficient coordination.</p></div><div class='pm-content-section'><h3>My Role</h3><ul><li>Led end-to-end product discovery as <strong>Product Lead &amp; Designer</strong></li><li>Defined PRD, product goals, and feature roadmap</li><li>Conducted research and translated insights into design decisions</li></ul></div><div class='pm-content-section'><h3>Tools</h3><div class='pm-tag-row'><span>Figma</span><span>User Interviews</span><span>Persona Mapping</span><span>Agile Iteration</span></div></div>` },
      { label: 'Problem', html: `<div class='pm-content-section'><h3>Problem Statement</h3><p class='pm-callout'>Students spend more time organizing their schedules than executing tasks due to fragmented tools and lack of intelligent planning support.</p></div><div class='pm-content-section'><h3>How I Got There</h3><ul><li>Conducted <strong>10+ interviews</strong> with U-M students</li><li>Observed reliance on multiple disconnected tools in real time</li><li>Identified a consistent pattern: planning overhead &gt; actual work</li></ul></div><div class='pm-content-section'><h3>Pain Points Uncovered</h3><ul><li>Constant switching between apps breaks focus and flow</li><li>No unified view of total workload across courses</li><li>Difficulty coordinating schedules with group members</li><li>No intelligent support to prioritize or distribute work</li></ul></div><div class='pm-content-section'><h3>Target Users</h3><ul><li>College students managing multiple simultaneous classes</li><li>Group-based learners coordinating schedules</li><li>High-workload users needing more structure</li></ul></div>` },
      { label: 'Actions', html: `<div class='pm-content-section'><h3>Product Strategy &amp; Feature Decisions</h3><div class='pm-feature-grid'><div class='pm-feature-card'><span class='pm-feature-icon'>📥</span><h4>Auto Syllabus Import</h4><p>Eliminates manual entry — the largest friction point. Tradeoff: technical complexity vs. major UX gain.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🧠</span><h4>Smart Scheduling Assistant</h4><p>Helps users distribute workload effectively. Assistive (not fully automated) to maintain user trust.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>📅</span><h4>Shared Availability</h4><p>Replaces fragmented coordination across messaging apps. Focused on scheduling, not communication.</p></div><div class='pm-feature-card'><span class='pm-feature-icon'>🍅</span><h4>Focus Tools</h4><p>Bridges planning and execution. Supports sustained productivity via Pomodoro and mindfulness prompts.</p></div></div></div><div class='pm-content-section'><h3>Site Map</h3><div class='pm-img-frame'><img src='assets/projects/p1_site.png' alt='Site map' loading='lazy'></div></div><div class='pm-content-section'><h3>Low-Fidelity Exploration</h3><div class='pm-img-frame'><img src='assets/projects/lofi_p1.png' alt='Lo-fi wireframes' loading='lazy'></div></div><div class='pm-content-section'><h3>High-Fidelity Design</h3><div class='pm-img-frame'><img src='assets/projects/hifi_p1.png' alt='Hi-fi designs' loading='lazy'></div></div>` },
      { label: 'Results', html: `<div class='pm-content-section'><h3>Final Outcome</h3><div class='pm-img-frame'><img src='assets/projects/betterschedule_prototype.png' alt='Final designs' loading='lazy'></div><p style='margin-top:.75rem'>A system that reduces planning friction, improves workload visibility, and supports both individual and collaborative productivity.</p></div><div class='pm-content-section'><h3>Working Prototype</h3><a class='pm-prototype-btn' href='https://www.figma.com/proto/BHBdNEiOi7MsnOvYYQCJDl/Project-1---victoria_nguyen?node-id=287-16635&p=f&t=j5KAQsBTreu8zi1B-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=287%3A16632&show-proto-sidebar=1' target='_blank' rel='noopener'>View Prototype ↗</a></div><div class='pm-content-section'><h3>Follow-Up Roadmap</h3><ul><li>Expand AI personalization based on individual patterns</li><li>Integrate deeper with platforms like Canvas and Atlas</li><li>Improve automation accuracy for syllabus parsing</li></ul></div><div class='pm-content-section'><h3>What I Learned</h3><div class='pm-reflection'><div class='pm-reflection-item'><span>💡</span><p>The core issue was <strong>system friction</strong>, not procrastination — students wanted to do the work.</p></div><div class='pm-reflection-item'><span>🎯</span><p>Simplicity is more impactful than feature quantity — cutting features improved usability.</p></div><div class='pm-reflection-item'><span>🔄</span><p>Good products <strong>reduce decision-making effort</strong>, not just the number of steps.</p></div></div></div>` },
    ],
  },
];

/* ---------------- JOURNEY DATA ---------------- */
const JOBS = [
  { id: 'gametime', dates: 'june 2026 – present', title: 'Gametime United', role: 'Full-Stack Software Intern', current: true,
    blurb: 'AI chatbot feedback systems for live products.',
    bullets: ['Building AI chatbot feedback systems with React Native and FastAPI', 'Working with DynamoDB and Braintrust for AI evaluation', 'Collaborating across product and engineering'],
    tools: 'React Native · FastAPI · DynamoDB · Braintrust' },
  { id: 'acaso', dates: 'may 2026 – present', title: 'ACASO', role: 'Co-Founder & CEO', current: true,
    blurb: 'Building an AI-powered financial operations platform from zero.',
    bullets: ['Product strategy and customer discovery', 'UX/UI design and full-stack development', 'AI document processing for invoice & contract auditing'],
    tools: 'Product strategy · UX/UI · Full-stack · AI' },
  { id: 'mmcompbio', dates: 'jan 2026 – present', title: 'Michigan Medicine — Dept. of Computational Biology', role: 'Research Assistant', current: true,
    blurb: 'Genomic Agent Platform Development.',
    bullets: ['Built V1 of an AI-powered genomic chat platform with a React/TypeScript interface and Supabase Postgres for session persistence and result visualization', 'Defined product requirements for a conversational AI system querying DNA binding predictions across the 3B+ base-pair human genome', 'Partnered with PhD researchers to turn model outputs into interpretable features (motif highlight maps, multi-layer genomic visualizations)'],
    tools: 'React · TypeScript · Supabase · Python · FastAPI' },
  { id: 'mmnursing', dates: 'may 2025 – jan 2026', title: 'Michigan Medicine University Hospital', role: 'Nursing Assistant II', current: false,
    blurb: 'MM Transplant / Gastrointestinal Surgery Inpatient Unit.',
    bullets: ['Monitored vitals and managed 30+ central lines/drains per shift, gaining direct insight into EMR workflows and clinical data requirements', 'Coordinated care documentation across departments using Epic EMR', 'Collaborated with interdisciplinary teams in high-acuity environments'],
    tools: 'Epic EMR · Clinical Documentation · Critical Care' },
  { id: 'mmpeds', dates: 'apr 2025 – feb 2026', title: 'Michigan Medicine — Dept. of Pediatrics', role: 'Research Assistant', current: false,
    blurb: 'Supported infant feeding behavior research with data collection and reporting.',
    bullets: ['Built Python data pipelines to clean and standardize large behavioral datasets, recovering 15+ hours of manual work per week', 'Achieved 90%+ inter-rater reliability in Observer XT behavioral coding', 'Analyzed 60+ pediatric feeding interaction recordings to extract behavioral metrics'],
    tools: 'Python · Pandas · NumPy · Observer XT' },
  { id: 'trinity', dates: 'oct 2024 – jul 2025', title: 'Trinity Health', role: 'Medical Assistant', current: false,
    blurb: "Domino's Farms Urgent Care.",
    bullets: ['Streamlined workflow and productivity by 30% and reduced average patient wait time by 15%', 'Assisted clinicians with lab work, recording vitals, and procedures', 'Contributed to improved patient care through accurate documentation'],
    tools: 'Epic EMR · Patient Services · Laboratory' },
  { id: 'urop', dates: 'aug 2024 – may 2025', title: 'Eastern Michigan University — UROP Program', role: 'Research Assistant', current: false,
    blurb: 'Asian American Health Equity and Resources.',
    bullets: ['Collected survey data and performed analysis with Excel', 'Contributed to writing 2+ research summaries and articles on community health and data representation', 'Created and translated 10+ community event flyers using Canva with CMS Navigator initiatives', 'Presented a project on Firearm Ownership at the U-M 2025 Spring Symposium'],
    tools: 'Survey Analysis · Excel · Canva · Community Research' },
];

/* ---------------- WORK: cards + filters ---------------- */
const grid = document.getElementById('card-grid');
let currentFilter = 'all';

function renderCards() {
  const cards = PROJECTS.filter(p => p.id !== 'acaso' && (currentFilter === 'all' || p.type === currentFilter));
  grid.innerHTML = cards.map(p => `
    <div class="pcard" data-project="${p.id}" role="button" tabindex="0">
      <div class="top">
        <span class="type ${p.type}">${p.type === 'tech' ? 'ENGINEERING' : 'PRODUCT'}</span>
        <span class="dates">${p.dates}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.blurb}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="cta">open the case study →</div>
    </div>`).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderCards();
  });
});
renderCards();

/* ---------------- PROJECT MODAL ---------------- */
const overlay = document.getElementById('modal-overlay');
const elMono = document.getElementById('modal-mono');
const elTitle = document.getElementById('modal-title');
const elMeta = document.getElementById('modal-meta');
const elRole = document.getElementById('modal-role');
const elDates = document.getElementById('modal-dates');
const elPsi = document.getElementById('modal-psi');
const elTabs = document.getElementById('modal-tabs');
const elBody = document.getElementById('modal-body');
let activeProject = null;

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProject = p;
  elMono.textContent = p.mono;
  elTitle.textContent = p.title;
  elMeta.textContent = p.meta;
  elRole.textContent = p.role;
  elDates.textContent = p.dates;
  elPsi.innerHTML = [
    ['PROBLEM', p.snapshot.problem],
    ['SOLUTION', p.snapshot.solution],
    ['IMPACT', p.snapshot.impact],
  ].map(([label, text]) => `<div class="psi"><div class="label">${label}</div><div class="text">${text}</div></div>`).join('');
  elTabs.innerHTML = p.tabs.map((t, i) =>
    `<button class="tab-btn${i === 0 ? ' active' : ''}" data-tab="${i}">[ ${t.label} ]</button>`).join('');
  showTab(0);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showTab(i) {
  if (!activeProject) return;
  elBody.innerHTML = activeProject.tabs[i].html;
  elBody.scrollTop = 0;
  elTabs.querySelectorAll('.tab-btn').forEach((b, bi) => b.classList.toggle('active', bi === i));
}

function closeModal() {
  overlay.classList.remove('open');
  activeProject = null;
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
elTabs.addEventListener('click', e => {
  const b = e.target.closest('.tab-btn');
  if (b) showTab(Number(b.dataset.tab));
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// open on card / featured click (event delegation)
document.addEventListener('click', e => {
  const el = e.target.closest('[data-project]');
  if (el) openModal(el.dataset.project);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.dataset?.project) {
    e.preventDefault();
    openModal(document.activeElement.dataset.project);
  }
});

/* ---------------- JOURNEY timeline ---------------- */
const timeline = document.getElementById('timeline');
timeline.innerHTML = JOBS.map(j => `
  <div class="tl-item" data-job="${j.id}">
    <div class="tl-dot${j.current ? ' current' : ''}"></div>
    <div class="tl-head">
      <div class="tl-dates">${j.dates}</div>
      <div class="tl-titleline"><div class="tl-title">${j.title}</div><span class="tl-chev">›</span></div>
      <div class="tl-role">${j.role}</div>
    </div>
    <div class="tl-detail">
      <div class="tl-blurb">${j.blurb}</div>
      ${j.bullets.map(b => `<div class="tl-bullet"><span class="b">•</span><span>${b}</span></div>`).join('')}
      <div class="tl-tools">tools: ${j.tools}</div>
    </div>
  </div>`).join('') + `
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-dates">2024 – may 2028</div>
    <div class="tl-title">B.S. Computer Science · University of Michigan</div>
    <p class="edu-note">Minor in Entrepreneurship · Ann Arbor · go blue.</p>
  </div>`;

timeline.addEventListener('click', e => {
  const head = e.target.closest('.tl-head');
  if (!head) return;
  const item = head.closest('.tl-item');
  const wasOpen = item.classList.contains('open');
  timeline.querySelectorAll('.tl-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
});

/* ---------------- DRAGGABLE PHOTO WALL ---------------- */
const STORE = 'vn-polaroid-offsets';
let offsets = {};
try { offsets = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { offsets = {}; }

document.querySelectorAll('.polaroid').forEach(pol => {
  const key = pol.dataset.key;
  const o = offsets[key];
  if (o) pol.style.transform = `translate(${o.x}px,${o.y}px)`;

  pol.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const base = offsets[key] || { x: 0, y: 0 };
    const startX = e.clientX, startY = e.clientY;
    const move = ev => {
      const x = base.x + ev.clientX - startX;
      const y = base.y + ev.clientY - startY;
      offsets[key] = { x, y };
      pol.style.transform = `translate(${x}px,${y}px)`;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      try { localStorage.setItem(STORE, JSON.stringify(offsets)); } catch (err) {}
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
});

/* ---------------- MUSIC PLAYER (Spotify embed) ---------------- */
const music = document.getElementById('music');
const musicToggle = document.getElementById('music-toggle');
const spotifyWrap = document.getElementById('spotify-embed');
const spotifyFrame = spotifyWrap.querySelector('iframe');
let musicOn = false;

musicToggle.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    if (!spotifyFrame.src) spotifyFrame.src = spotifyFrame.dataset.src;
    spotifyWrap.hidden = false;
    music.classList.add('playing');
    musicToggle.textContent = '❚❚';
  } else {
    spotifyWrap.hidden = true;
    // reload the iframe to stop playback
    spotifyFrame.src = '';
    music.classList.remove('playing');
    musicToggle.textContent = '▶';
  }
});

/* ---------------- DIRECTOR BLOB + section tracking ---------------- */
const SECTIONS = ['home', 'gallery', 'work', 'journey', 'contact'];
const BUBBLES = {
  home: 'hi again!! keep scrolling ♡',
  gallery: 'drag the polaroids around ♡',
  work: "everything here is handmade. the ACASO one's my favorite ✦",
  journey: 'the long steep... how I got here (still brewing)',
  contact: 'say hi!! I reply faster than you can say 11:11',
};
const FUN_FACTS = [
  'fun fact: I stop everything at 11:11 to make a wish ✦',
  "current obsession: finding Ann Arbor's best matcha",
  'I ask "why?" approximately 47 times a day',
  'airports + city skylines at night >>> everything',
  'boba order: taro, 50% sweet, extra pearls',
  'ok back to work — scroll on! ♡',
];

const director = document.getElementById('director');
const directorBubble = document.getElementById('director-bubble');
const directorText = document.getElementById('director-text');
const directorBlob = document.getElementById('director-blob');
const navLinks = document.querySelectorAll('.nav a[data-nav]');
let currentSection = 'home';
let funIdx = -1;
let sayTimer = null;

function say(text) {
  clearTimeout(sayTimer);
  directorText.textContent = text;
  directorBubble.hidden = false;
  sayTimer = setTimeout(() => { directorText.textContent = BUBBLES[currentSection] || BUBBLES.home; }, 4200);
}

directorBlob.addEventListener('click', () => {
  funIdx = (funIdx + 1) % FUN_FACTS.length;
  say(FUN_FACTS[funIdx]);
});

let rafPending = false;
function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    const probe = window.scrollY + window.innerHeight * 0.42;
    let current = 'home';
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= probe) current = id;
    });
    // director visibility (hidden on home)
    director.classList.toggle('show', current !== 'home');
    if (current !== currentSection) {
      currentSection = current;
      directorText.textContent = BUBBLES[current] || BUBBLES.home;
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === current));
    }
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------- DRAGGABLE STICKERS + easter eggs ---------------- */
// Stickers float/rotate via `transform`, so we drag them with left/top to avoid
// fighting the animation. Offsets persist in localStorage.
const STICKER_STORE = 'vn-sticker-offsets';
let stickerOffsets = {};
try { stickerOffsets = JSON.parse(localStorage.getItem(STICKER_STORE) || '{}'); } catch (e) { stickerOffsets = {}; }

document.querySelectorAll('.drag-sticker').forEach(el => {
  const key = el.dataset.skey;
  const o = stickerOffsets[key];
  if (o) { el.style.left = o.x + 'px'; el.style.top = o.y + 'px'; }

  el.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    const base = stickerOffsets[key] || { x: 0, y: 0 };
    const startX = e.clientX, startY = e.clientY;
    let moved = false;
    const move = ev => {
      if (Math.abs(ev.clientX - startX) > 3 || Math.abs(ev.clientY - startY) > 3) moved = true;
      const x = base.x + ev.clientX - startX;
      const y = base.y + ev.clientY - startY;
      stickerOffsets[key] = { x, y };
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (moved) {
        el.__dragged = true; // suppress the easter-egg click that follows a drag
        setTimeout(() => { el.__dragged = false; }, 250);
        try { localStorage.setItem(STICKER_STORE, JSON.stringify(stickerOffsets)); } catch (err) {}
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
});

// easter-egg click (skipped right after a drag)
document.querySelectorAll('.sticker[data-say]').forEach(s => {
  s.addEventListener('click', () => {
    if (s.__dragged) return;
    director.classList.add('show');
    say(s.dataset.say);
  });
});

/* ---------------- CONTACT FORM (Formspree) ---------------- */
const cform = document.getElementById('contact-form');
if (cform) {
  const status = document.getElementById('cf-status');
  const btn = cform.querySelector('.cf-send');
  cform.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    status.className = 'cf-status';
    status.textContent = 'sending... ☕';
    try {
      const res = await fetch(cform.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(cform),
      });
      if (res.ok) {
        status.className = 'cf-status ok';
        status.textContent = "sent! I'll be in touch ♡";
        cform.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const msg = json.errors ? json.errors.map(x => x.message).join(', ')
                                : "that didn't go through — try emailing me directly";
        status.className = 'cf-status err';
        status.textContent = msg;
      }
    } catch (err) {
      status.className = 'cf-status err';
      status.textContent = 'network hiccup — try again, or email me directly';
    }
    btn.disabled = false;
  });
}

/* 11:11 wish check */
setInterval(() => {
  const d = new Date();
  if (d.getMinutes() === 11 && (d.getHours() % 12) === 11 && d.getSeconds() < 2) {
    director.classList.add('show');
    say("it's 11:11 !! quick — make a wish ✦✦✦");
  }
}, 1000);
