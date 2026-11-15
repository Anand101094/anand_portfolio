/**
 * MATRIX OPERATING SYSTEM ◈ PORTFOLIO CONTROLLER
 * Candidate: ANAND KUMAR (Senior Frontend Developer & Tech Lead)
 */

// Sound Synthesizer via Web Audio API (No external audio files needed)
class CyberAudio {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playBeep(880, 0.05, 'sine');
    }
    return this.enabled;
  }

  playBeep(freq = 600, duration = 0.04, type = 'sine', volume = 0.03) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  playKeystroke() {
    const freqs = [350, 420, 520, 600];
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    this.playBeep(freq, 0.03, 'triangle', 0.02);
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.playBeep(520, 0.08, 'sine', 0.04);
    setTimeout(() => this.playBeep(780, 0.12, 'sine', 0.04), 80);
  }

  playGlitch() {
    if (!this.enabled || !this.ctx) return;
    this.playBeep(240, 0.1, 'sawtooth', 0.05);
    setTimeout(() => this.playBeep(480, 0.08, 'square', 0.04), 50);
  }
}

// Text Scrambler / Decrypt Effect
class TextScrambler {
  static chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ_#%*+=-~<>[]';

  static scramble(el, targetText, duration = 650) {
    if (!el) return;
    const originalText = targetText || el.getAttribute('data-scramble') || el.innerText;
    el.setAttribute('data-scramble', originalText);

    let start = null;
    const length = originalText.length;

    const frame = (time) => {
      if (!start) start = time;
      const progress = (time - start) / duration;

      if (progress < 1) {
        let output = '';
        const revealedChars = Math.floor(progress * length);

        for (let i = 0; i < length; i++) {
          if (originalText[i] === ' ' || originalText[i] === '\n') {
            output += originalText[i];
          } else if (i < revealedChars) {
            output += originalText[i];
          } else {
            output += TextScrambler.chars[Math.floor(Math.random() * TextScrambler.chars.length)];
          }
        }
        el.innerText = output;
        requestAnimationFrame(frame);
      } else {
        el.innerText = originalText;
      }
    };

    requestAnimationFrame(frame);
  }
}

// Detailed Project Database for Deep Dive Inspector
const PROJECT_SPECS = {
  't-mobile': {
    title: 'T-Mobile Digital Commerce & Cart Ecosystem',
    role: 'Senior Technical Lead (HCLTech)',
    period: '05/2021 – 09/2025',
    stack: ['TypeScript', 'Alpine.js', 'React.js', 'AEM (Adobe Experience Manager)', 'Docker', 'Pub/Sub Architecture', 'Node.js', 'HAPI', 'GraphQL'],
    metrics: [
      'Managed 20+ interconnected repositories under Pub/Sub architecture',
      '15% reduction in code defects across teams through QA specifications',
      '40% gain in overall task turnaround through mentorship & standards',
      '25% boost in site performance via AEM dynamic asset orchestration'
    ],
    overview: 'Spearheaded the frontend ecosystem architecture for one of T-Mobile’s flagship high-traffic digital initiatives. Solved complex cart, checkout, promo-banner, and real-time state orchestration across independent enterprise repositories.',
    architecture: 'Implemented asynchronous event streaming with a robust Pub/Sub bus connecting 20+ decoupled repositories. Created custom Alpine directives to load variables from authoring in real time, synchronizing seamlessly with GraphQL API endpoints powered by Node/HAPI.',
    keyContributions: [
      'Engineered reusable custom date range picker in pure Vanilla JS + custom JSX, boosting checkout conversion & UX efficiency by 15%.',
      'Authored custom Alpine.js directives to bridge enterprise AEM authoring configurations dynamically.',
      'Refactored core checkout pipelines, reducing regression defects and streamlining cross-team PR releases.'
    ]
  },
  'opentext': {
    title: 'OpenText ArcSight & Threat Detection Runtime (TDR)',
    role: 'Senior Software Engineer (OpenText)',
    period: '10/2025 – Present',
    stack: ['React.js', 'GitLab CI/CD', 'Kafka', 'Transformation Hub', 'YAML', 'Java', 'Fortify on Demand (FoD)', 'Black Duck CVE', 'AI Platform'],
    metrics: [
      'Zero unresolved critical CVEs in production pipelines',
      'GitLab CI/CD automation cutting deployment friction to zero',
      'Kafka-based real-time data streaming & Transformation Hub integration',
      'AI-driven skill enhancement improving workflow automation'
    ],
    overview: 'Mission-critical security and threat intelligence web infrastructure. Fortified enterprise compliance, automated CI/CD security gating, and integrated real-time Kafka event streaming for threat event telemetry.',
    architecture: 'Integrated Black Duck CVE automated scanning and Fortify on Demand (FoD) directly into GitLab CI/CD pipelines (`gitlab-ci.yaml`). Kafka event ingestion pipeline handles millions of security telemetry events transformed through high-throughput streaming nodes.',
    keyContributions: [
      'Automated pipeline build, scan, and deploy phases with custom GitLab CI configurations.',
      'Hardened mission-critical frontend against cross-site vulnerabilities and third-party dependency CVEs.',
      'Engineered AI platform features empowering automated enterprise triage and intelligent workflow generation.'
    ]
  },
  'amazon': {
    title: 'Amazon Employee Resource (ER) Portal',
    role: 'Lead Frontend Engineer (HCLTech / Client Delivery)',
    period: '2021 – 2022',
    stack: ['React.js', 'JavaScript (ES6+)', 'Adobe Experience Manager (AEM)', 'HTML5', 'SCSS'],
    metrics: [
      '35+ reusable enterprise components built within 6 months',
      'Load-tested and smoothly handled 20K+ concurrent employees',
      'Seamless dynamic integration with enterprise AEM content nodes'
    ],
    overview: 'Engineered Amazon’s high-traffic internal communication portal used by corporate employees globally to track updates, company initiatives, benefits, and critical HR broadcasts.',
    architecture: 'Decoupled component architecture designed for rapid content authoring within Adobe Experience Manager. Combined lightweight vanilla JavaScript utilities with React widgets for micro-interactions.',
    keyContributions: [
      'Architected 35+ resilient, responsive UI modules within strict 6-month deadline with near-zero defect rate.',
      'Conducted rigorous stress & load-testing, guaranteeing zero downtime under 20,000+ simultaneous concurrent enterprise user sessions.'
    ]
  },
  'flex': {
    title: 'Flex Global Logistics & Warehouse Portal',
    role: 'Senior Frontend & Gateway Engineer',
    period: '2020 – 2021',
    stack: ['React.js', 'TypeScript', 'Node.js', 'Microservices', 'Redis', 'Docker', 'Azure RBAC Services'],
    metrics: [
      'Powers warehouse shift management & live rosters for London logistics teams',
      'Redis cache integration cutting API query latency by 45%',
      'Strict role-based access control (RBAC) via Azure cloud services'
    ],
    overview: 'Comprehensive warehouse management web portal and mobile-responsive application built for high-throughput logistics staff and operational shift supervisors.',
    architecture: 'Microservices-backed architecture with Redis distributed caching for rapid shift scheduling, roster coordination, and worker role resolution.',
    keyContributions: [
      'Refactored API gateway logic to securely evaluate role permissions using Azure identity services.',
      'Designed high-density data tables and dynamic roster schedulers with real-time optimistic UI updates.'
    ]
  },
  'webmethods': {
    title: 'Webmethods.io Enterprise Integration Suite',
    role: 'Frontend Engineer (Software AG)',
    period: '2019 – 2020',
    stack: ['React.js', 'Flux / Redux', 'GraphQL', 'Webhooks', 'Chart.js', 'HTML5 / SCSS'],
    metrics: [
      'Complex connector ecosystem integrated seamlessly with GQL endpoints',
      'Automated webhook metric & log dumping system',
      'Real-time interactive session usage dashboard with Chart.js'
    ],
    overview: 'Enterprise cloud integration platform enabling businesses to connect third-party SaaS APIs, databases, and microservices into automated workflows.',
    architecture: 'Flux/Redux unidirectional data flow managing large configuration graphs, webhook logging subsystems, and GraphQL schema introspection.',
    keyContributions: [
      'Engineered analytics dashboard to visualize API session consumption and traffic spikes using Chart.js.',
      'Integrated webhook logging listeners to dump trace logs and operational diagnostics in real time.'
    ]
  }
};

// Main Portfolio Application Engine
class MatrixPortfolioApp {
  constructor() {
    this.audio = new CyberAudio();
    this.currentView = 'overview';
    this.currentReality = 'blue'; // 'blue' (The comfortable illusion - default) or 'red' (The desert of the real)
    this.terminalOpen = false;
    this.commandHistory = [];
    this.historyIndex = -1;

    this.initElements();
    this.bindEvents();
    this.bindStandoutFeatures();
    this.checkInitialRoute();
  }

  initElements() {
    this.terminalDrawer = document.getElementById('terminal-drawer');
    this.terminalOutput = document.getElementById('terminal-output');
    this.terminalInput = document.getElementById('terminal-input');
    this.modalBackdrop = document.getElementById('project-modal');
    this.modalBox = document.getElementById('modal-content-target');
    this.toast = document.getElementById('cyber-toast');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.rainToggleBtn = document.getElementById('rain-toggle-btn');
    this.themePicker = document.getElementById('theme-picker');
    this.glitchOverlay = document.getElementById('reality-glitch');
  }

  bindEvents() {
    // Navigation link clicks (Dock + Mobile Bottom)
    document.querySelectorAll('[data-view-target]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view-target');
        this.navigateTo(targetView);
        this.audio.playBeep(640, 0.04);
      });
    });

    // Scramble on hover for interactive titles
    document.querySelectorAll('.scramble-hover').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        TextScrambler.scramble(el);
        this.audio.playKeystroke();
      });
    });

    // Sound toggle button
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isSoundOn = this.audio.toggle();
        this.soundToggleBtn.innerHTML = isSoundOn ? '<span>🔊</span> SOUND: ON' : '<span>🔇</span> SOUND: OFF';
        this.soundToggleBtn.classList.toggle('active', isSoundOn);
        this.showToast(isSoundOn ? 'AUDIO_FEEDBACK: ENGAGED' : 'AUDIO_FEEDBACK: MUTED');
      });
    }

    // Rain toggle button (Dense -> Subtle -> Off)
    if (this.rainToggleBtn) {
      this.rainToggleBtn.addEventListener('click', () => {
        const body = document.body;
        if (!body.classList.contains('rain-dim') && !body.classList.contains('rain-off')) {
          body.classList.add('rain-dim');
          this.rainToggleBtn.innerHTML = '<span>⚡</span> RAIN: SUBTLE';
          this.showToast('MATRIX_RAIN: SUBTLE (HIGH CONTRAST)');
        } else if (body.classList.contains('rain-dim')) {
          body.classList.remove('rain-dim');
          body.classList.add('rain-off');
          this.rainToggleBtn.innerHTML = '<span>⚡</span> RAIN: OFF';
          this.showToast('MATRIX_RAIN: DISABLED');
        } else {
          body.classList.remove('rain-off');
          this.rainToggleBtn.innerHTML = '<span>⚡</span> RAIN: DENSE';
          this.showToast('MATRIX_RAIN: FULL DENSITY');
        }
        this.audio.playBeep(580, 0.04);
      });
    }

    // Theme Picker change
    if (this.themePicker) {
      this.themePicker.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Terminal toggle button
    const terminalToggleBtn = document.getElementById('terminal-toggle-btn');
    if (terminalToggleBtn) {
      terminalToggleBtn.addEventListener('click', () => this.toggleTerminal());
    }

    const terminalCloseBtn = document.getElementById('terminal-close-btn');
    if (terminalCloseBtn) {
      terminalCloseBtn.addEventListener('click', () => this.toggleTerminal(false));
    }

    // Terminal Input execution
    if (this.terminalInput) {
      this.terminalInput.addEventListener('keydown', (e) => {
        this.audio.playKeystroke();

        if (e.key === 'Enter') {
          const cmd = this.terminalInput.value.trim();
          if (cmd) {
            this.commandHistory.push(cmd);
            this.historyIndex = this.commandHistory.length;
            this.executeCommand(cmd);
            this.terminalInput.value = '';
          }
        } else if (e.key === 'ArrowUp') {
          if (this.historyIndex > 0) {
            this.historyIndex--;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
          } else {
            this.historyIndex = this.commandHistory.length;
            this.terminalInput.value = '';
          }
        }
      });
    }

    // Terminal quick chips
    document.querySelectorAll('.term-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          this.audio.playBeep(720, 0.04);
        }
      });
    });

    // Project Filter Buttons
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.filterProjects(filter);
        this.audio.playBeep(600, 0.04);
      });
    });

    // Project Deep-Dive Modal Triggers
    document.querySelectorAll('[data-inspect-project]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-inspect-project');
        this.openProjectModal(projectId);
        this.audio.playSuccess();
      });
    });

    // Modal Close
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeProjectModal());
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) this.closeProjectModal();
      });
    }

    // Quick Clipboard Copy Buttons (Email / Phone)
    document.querySelectorAll('[data-copy-val]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-copy-val');
        navigator.clipboard.writeText(val).then(() => {
          this.showToast(`COPIED_TO_CLIPBOARD: ${val}`);
          this.audio.playSuccess();
        }).catch(() => {
          prompt('Copy to clipboard: Ctrl+C, Enter', val);
        });
      });
    });

    // Live Encrypted Message Transmit Form (Delivers directly to anandkumar2991@gmail.com)
    const transmitForm = document.getElementById('transmit-form');
    if (transmitForm) {
      transmitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('sender-name');
        const emailInput = document.getElementById('sender-email');
        const subjectInput = document.getElementById('message-subject');
        const messageInput = document.getElementById('message-body');
        const submitBtn = transmitForm.querySelector('button[type="submit"]');

        const senderName = nameInput ? nameInput.value.trim() : 'Recruiter / Visitor';
        const senderEmail = emailInput ? emailInput.value.trim() : '';
        const messageSubject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
        const messageBody = messageInput ? messageInput.value.trim() : '';

        const origHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>⏳</span> TRANSMITTING DIRECT TO ANAND INBOX...';
        submitBtn.disabled = true;

        const payload = {
          name: senderName,
          email: senderEmail,
          _subject: `[Matrix Portfolio Transmission] ${messageSubject} - from ${senderName}`,
          message: messageBody,
          _replyto: senderEmail,
          _template: 'table',
          timestamp: new Date().toLocaleString()
        };

        // Dispatch via FormSubmit AJAX endpoint straight to Anand Kumar's inbox
        fetch('https://formsubmit.co/ajax/anandkumar2991@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
          this.audio.playSuccess();
          this.showToast('PACKET DELIVERED ◈ Transmission received by anandkumar2991@gmail.com');
          submitBtn.innerHTML = '<span>✓</span> TRANSMISSION DELIVERED TO INBOX';
          transmitForm.reset();
          setTimeout(() => {
            submitBtn.innerHTML = origHtml;
            submitBtn.disabled = false;
          }, 3500);
        })
        .catch(err => {
          // Fallback to mailto if browser extension / ad-blocker blocks cross-origin POST
          this.audio.playGlitch();
          this.showToast('DIRECT HANDSHAKE: Launching mail client...');
          const mailtoUri = `mailto:anandkumar2991@gmail.com?subject=${encodeURIComponent(messageSubject)}&body=${encodeURIComponent("Sender: " + senderName + "\nEmail: " + senderEmail + "\n\n" + messageBody)}`;
          window.location.href = mailtoUri;
          submitBtn.innerHTML = '<span>✉</span> OPENED IN EMAIL CLIENT';
          setTimeout(() => {
            submitBtn.innerHTML = origHtml;
            submitBtn.disabled = false;
          }, 3500);
        });
      });
    }

    // Global Keyboard Hotkeys
    window.addEventListener('keydown', (e) => {
      // Toggle Terminal via 'T' or '`' (when not typing in an input)
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === 't' || e.key === 'T' || e.key === '`') {
        e.preventDefault();
        this.toggleTerminal();
      } else if (e.key === 'Escape') {
        if (this.terminalOpen) this.toggleTerminal(false);
        this.closeProjectModal();
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const viewMap = {
          '1': 'overview',
          '2': 'experience',
          '3': 'projects',
          '4': 'arsenal',
          '5': 'dossier',
          '6': 'contact'
        };
        this.navigateTo(viewMap[e.key]);
      }
    });

    // Popstate / Hash change listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(`view-${hash}`)) {
        this.navigateTo(hash, false);
      }
    });
  }

  // Bind Red Pill / Blue Pill, Architecture Simulator & Component Lab
  bindStandoutFeatures() {
    // 1. Red Pill / Blue Pill Reality Switcher
    document.querySelectorAll('[data-reality-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetReality = btn.getAttribute('data-reality-target');
        this.switchReality(targetReality);
      });
    });

    // 2. Pub/Sub Bus Pulse Button
    const pulseBtn = document.getElementById('pulse-sim-btn');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => this.pulseBusPacket());
    }

    // Click on individual architecture nodes to inspect details
    document.querySelectorAll('.arch-node').forEach((node) => {
      node.addEventListener('click', () => {
        document.querySelectorAll('.arch-node').forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const nodeInfo = node.getAttribute('data-node-info') || 'Node Active';
        const feed = document.getElementById('sim-feed-text');
        if (feed) {
          feed.innerHTML = `<strong>NODE INSPECTION:</strong> ${nodeInfo}`;
        }
        this.audio.playBeep(720, 0.05);
      });
    });

    // 3. Component Lab: Preset Dates
    document.querySelectorAll('.picker-preset-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.picker-preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const rangeText = chip.getAttribute('data-range');
        const display = document.getElementById('picker-range-display');
        if (display && rangeText) {
          display.innerText = rangeText;
        }
        this.audio.playSuccess();
      });
    });
  }

  // Switch Reality (Blue Pill = The Beautiful Matrix Illusion, Red Pill = The Desert of the Real)
  switchReality(reality) {
    if (reality === this.currentReality) return;
    this.currentReality = reality;

    if (reality === 'red') {
      this.audio.playGlitch();
      this.startRedPillGlitches();
    } else {
      this.audio.playSuccess();
      this.stopRedPillGlitches();
    }

    // Trigger visual glitch flash
    if (this.glitchOverlay) {
      this.glitchOverlay.classList.add('flash');
      setTimeout(() => this.glitchOverlay.classList.remove('flash'), 350);
    }

    // Toggle body data attribute
    if (reality === 'red') {
      document.documentElement.setAttribute('data-reality', 'red');
      this.showToast('WARNING: YOU TOOK THE RED PILL ◈ WELCOME TO THE DESERT OF THE REAL');
    } else {
      document.documentElement.removeAttribute('data-reality');
      this.showToast('BLUE PILL ACTIVE ◈ THE MATRIX ILLUSION IS RESTORED');
    }

    // Update active state in pill buttons
    document.querySelectorAll('.pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-reality-target') === reality);
    });
  }

  // Recurring Electrical Glitch in Red Pill Mode (Random Intervals)
  startRedPillGlitches() {
    this.stopRedPillGlitches();
    this.scheduleNextGlitch();
  }

  stopRedPillGlitches() {
    if (this.glitchTimer) {
      clearTimeout(this.glitchTimer);
      this.glitchTimer = null;
    }
    if (this.glitchOverlay) {
      this.glitchOverlay.classList.remove('flash');
    }
    document.body.classList.remove('reality-screen-jitter');
  }

  scheduleNextGlitch() {
    if (this.currentReality !== 'red') return;

    // Random interval between 3.5s and 8.0s for authentic erratic glitching
    const randomDelay = Math.floor(3500 + Math.random() * 4500);
    this.glitchTimer = setTimeout(() => {
      this.triggerRandomGlitch();
      this.scheduleNextGlitch();
    }, randomDelay);
  }

  triggerRandomGlitch() {
    if (this.currentReality !== 'red') return;

    // Subtle audio electrical spark / static buzz
    this.audio.playGlitch();

    // Visual flicker on overlay & jitter on screen
    if (this.glitchOverlay) {
      this.glitchOverlay.classList.add('flash');
    }
    document.body.classList.add('reality-screen-jitter');

    // Rapid double micro-burst or single burst
    const burstDuration = Math.random() > 0.4 ? 140 : 260;

    setTimeout(() => {
      if (this.glitchOverlay) this.glitchOverlay.classList.remove('flash');
      document.body.classList.remove('reality-screen-jitter');

      // 35% chance of an immediate quick aftershock flicker
      if (Math.random() < 0.35 && this.currentReality === 'red') {
        setTimeout(() => {
          if (this.glitchOverlay) this.glitchOverlay.classList.add('flash');
          setTimeout(() => {
            if (this.glitchOverlay) this.glitchOverlay.classList.remove('flash');
          }, 80);
        }, 120);
      }
    }, burstDuration);
  }

  // Pulse data packet across Pub/Sub Bus Simulator
  pulseBusPacket() {
    const particle = document.getElementById('sim-particle');
    const feed = document.getElementById('sim-feed-text');
    const btn = document.getElementById('pulse-sim-btn');
    if (!particle || !btn) return;

    btn.disabled = true;
    btn.innerText = '⚡ PULSING PACKET...';
    this.audio.playBeep(450, 0.08, 'sawtooth');

    // Reset particle position
    particle.style.left = '4%';
    particle.classList.add('pulsing');

    // Simulate multi-node journey
    setTimeout(() => {
      particle.style.left = '28%';
      if (feed) feed.innerHTML = `<strong>EVENT DISPATCH:</strong> [AEM_AUTHORING_UPDATE] ➔ Pub/Sub Event Bus (20+ Repos)`;
      this.audio.playBeep(580, 0.04);
    }, 400);

    setTimeout(() => {
      particle.style.left = '52%';
      if (feed) feed.innerHTML = `<strong>STATE ORCHESTRATION:</strong> Pub/Sub ➔ Cart & Checkout Subsystem [15% Defect Reduction]`;
      this.audio.playBeep(700, 0.04);
    }, 900);

    setTimeout(() => {
      particle.style.left = '76%';
      if (feed) feed.innerHTML = `<strong>INGESTION &amp; STREAMING:</strong> Event Streaming ➔ Kafka Transformation Hub`;
      this.audio.playBeep(850, 0.04);
    }, 1400);

    setTimeout(() => {
      particle.style.left = '96%';
      if (feed) feed.innerHTML = `<strong>COMPLETE:</strong> GraphQL Gateway ACK ◈ Latency: 12ms ◈ Status: HEALTHY ✓`;
      this.audio.playSuccess();
      setTimeout(() => {
        particle.classList.remove('pulsing');
        btn.disabled = false;
        btn.innerText = '⚡ PULSE DATA PACKET';
      }, 500);
    }, 1900);
  }

  checkInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`view-${hash}`)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo('overview', false);
    }
  }

  navigateTo(viewId, updateHash = true) {
    const targetEl = document.getElementById(`view-${viewId}`);
    if (!targetEl) return;

    this.currentView = viewId;

    // Toggle active view container
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    targetEl.classList.add('active');

    // Update active state in navigation docks
    document.querySelectorAll('[data-view-target]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view-target') === viewId);
    });

    // Trigger scramble effect on view header title
    const titleEl = targetEl.querySelector('.view-title');
    if (titleEl) {
      TextScrambler.scramble(titleEl);
    }

    // Scroll stage to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHash) {
      history.pushState(null, null, `#${viewId}`);
    }
  }

  toggleTerminal(forceState) {
    this.terminalOpen = typeof forceState === 'boolean' ? forceState : !this.terminalOpen;
    this.terminalDrawer.classList.toggle('open', this.terminalOpen);

    const toggleBtn = document.getElementById('terminal-toggle-btn');
    if (toggleBtn) toggleBtn.classList.toggle('active', this.terminalOpen);

    if (this.terminalOpen) {
      this.audio.playBeep(750, 0.05);
      setTimeout(() => this.terminalInput && this.terminalInput.focus(), 150);
    } else {
      this.audio.playBeep(450, 0.04);
    }
  }

  executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    this.printToTerminal(`anand@matrix:~$ ${rawCmd}`, 'command');

    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    switch (mainCmd) {
      case 'help':
        this.printToTerminal('AVAILABLE MATRIX PROTOCOLS:', 'highlight');
        this.printToTerminal('  overview     - Inspect operator overview & core dossier');
        this.printToTerminal('  exp          - Inspect 7+ years career trajectory');
        this.printToTerminal('  projects     - Query operational enterprise projects');
        this.printToTerminal('  skills       - Display technical weapons & frameworks');
        this.printToTerminal('  contact      - Transmit connection handshake info');
        this.printToTerminal('  reality      - Switch reality: red or blue pill');
        this.printToTerminal('  theme <name> - Switch theme: green, cyan, crimson, amber, mono');
        this.printToTerminal('  sound        - Toggle audio synthesizer');
        this.printToTerminal('  matrix       - Trigger rain ripple disturbance');
        this.printToTerminal('  clear        - Flush terminal buffer');
        this.printToTerminal('  sudo hire    - Execute hiring recommendation handshake');
        break;

      case 'overview':
      case 'bio':
        this.navigateTo('overview');
        this.printToTerminal('Navigated to: [01 ◈ OVERVIEW]', 'system');
        break;

      case 'exp':
      case 'experience':
        this.navigateTo('experience');
        this.printToTerminal('Navigated to: [02 ◈ CAREER TIMELINE]', 'system');
        break;

      case 'projects':
        this.navigateTo('projects');
        this.printToTerminal('Navigated to: [03 ◈ OPERATIONAL PROJECTS]', 'system');
        break;

      case 'skills':
      case 'arsenal':
        this.navigateTo('arsenal');
        this.printToTerminal('Navigated to: [04 ◈ TECH ARSENAL]', 'system');
        break;

      case 'contact':
        this.navigateTo('contact');
        this.printToTerminal('Operator Contact Channels:', 'highlight');
        this.printToTerminal('  Email: anandkumar2991@gmail.com');
        this.printToTerminal('  Phone: +91 9158734603');
        this.printToTerminal('  Location: Bengaluru, India');
        break;

      case 'reality':
        if (arg === 'red' || arg === 'blue') {
          this.switchReality(arg);
          this.printToTerminal(`Reality shifted to: ${arg.toUpperCase()} PILL`, 'system');
        } else {
          const next = this.currentReality === 'red' ? 'blue' : 'red';
          this.switchReality(next);
          this.printToTerminal(`Reality shifted to: ${next.toUpperCase()} PILL`, 'system');
        }
        break;

      case 'theme':
        if (['green', 'cyan', 'crimson', 'amber', 'mono'].includes(arg)) {
          const themeId = arg === 'green' ? 'classic' : arg;
          this.setTheme(themeId);
          if (this.themePicker) this.themePicker.value = themeId;
          this.printToTerminal(`Theme protocol shifted to: ${arg.toUpperCase()}`, 'system');
        } else {
          this.printToTerminal('Invalid theme. Options: green, cyan, crimson, amber, mono', 'system');
        }
        break;

      case 'sound':
        const on = this.audio.toggle();
        this.printToTerminal(`Cyber Audio: ${on ? 'ONLINE' : 'MUTED'}`, 'system');
        if (this.soundToggleBtn) {
          this.soundToggleBtn.innerHTML = on ? '<span>🔊</span> SOUND: ON' : '<span>🔇</span> SOUND: OFF';
          this.soundToggleBtn.classList.toggle('active', on);
        }
        break;

      case 'matrix':
        if (window.matrixBg) {
          window.matrixBg.ripple.x = window.innerWidth / 2;
          window.matrixBg.ripple.y = window.innerHeight / 2;
          window.matrixBg.ripple.radius = 10;
          window.matrixBg.ripple.active = true;
          this.printToTerminal('3D Matrix energy surge released across coordinates.', 'highlight');
        }
        break;

      case 'clear':
        this.terminalOutput.innerHTML = '';
        break;

      case 'sudo':
        if (arg === 'hire') {
          this.printToTerminal('ACCESS GRANTED: HIRING SUBROUTINE INITIATED ✓', 'highlight');
          this.printToTerminal('Candidate Anand Kumar profile matches Senior Frontend & Tech Lead spec.');
          this.printToTerminal('Action required: Transmit offer letter to anandkumar2991@gmail.com');
          this.navigateTo('contact');
          this.audio.playSuccess();
        } else {
          this.printToTerminal('sudo: command not recognized. Try: sudo hire', 'system');
        }
        break;

      default:
        this.printToTerminal(`Command not recognized: '${rawCmd}'. Type 'help' for instructions.`, 'system');
        break;
    }

    this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
  }

  printToTerminal(msg, type = 'normal') {
    const line = document.createElement('div');
    line.className = `terminal-output-line ${type}`;
    line.innerText = msg;
    this.terminalOutput.appendChild(line);
  }

  setTheme(themeId) {
    if (themeId === 'classic') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }

    if (window.matrixBg) {
      window.matrixBg.setTheme(themeId);
    }

    this.showToast(`THEME_SHIFT: ${themeId.toUpperCase()}`);
    this.audio.playBeep(700, 0.05);
  }

  filterProjects(filter) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const categories = (card.getAttribute('data-category') || '').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  openProjectModal(projectId) {
    const data = PROJECT_SPECS[projectId];
    if (!data) return;

    this.modalBox.innerHTML = `
      <div style="font-size: 0.72rem; color: var(--matrix-core); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.3rem;">
        ◈ PROJECT DEEP DIVE SPECIFICATION
      </div>
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--matrix-bright); margin-bottom: 0.4rem;">
        ${data.title}
      </h2>
      <div style="display: flex; gap: 0.8rem; flex-wrap: wrap; font-size: 0.76rem; color: var(--matrix-text-muted); margin-bottom: 1.4rem;">
        <span><strong>Role:</strong> ${data.role}</span>
        <span>•</span>
        <span><strong>Period:</strong> ${data.period}</span>
      </div>

      <div style="margin-bottom: 1.4rem;">
        <h4 style="font-size: 0.85rem; color: var(--matrix-core); margin-bottom: 0.5rem; text-transform: uppercase;">
          [01 ◈ System Architecture &amp; Overview]
        </h4>
        <p style="font-size: 0.9rem; color: var(--matrix-text); line-height: 1.7; margin-bottom: 0.8rem;">
          ${data.overview}
        </p>
        <p style="font-size: 0.9rem; color: var(--matrix-text); line-height: 1.7;">
          ${data.architecture}
        </p>
      </div>

      <div style="margin-bottom: 1.4rem;">
        <h4 style="font-size: 0.85rem; color: var(--matrix-core); margin-bottom: 0.5rem; text-transform: uppercase;">
          [02 ◈ Key Engineering Impacts]
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.keyContributions.map(c => `
            <li style="position: relative; padding-left: 1.2rem; font-size: 0.86rem; color: var(--matrix-text); line-height: 1.6;">
              <span style="position: absolute; left: 0; color: var(--matrix-core); font-weight: 700;">▸</span>
              ${c}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.4rem;">
        <h4 style="font-size: 0.85rem; color: var(--matrix-core); margin-bottom: 0.5rem; text-transform: uppercase;">
          [03 ◈ Operational Metrics]
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem;">
          ${data.metrics.map(m => `
            <div style="background: var(--matrix-code-bg); border: 1px solid var(--matrix-border); padding: 0.6rem 0.8rem; border-radius: var(--radius); font-size: 0.78rem; color: var(--matrix-accent);">
              ✓ ${m}
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.85rem; color: var(--matrix-core); margin-bottom: 0.6rem; text-transform: uppercase;">
          [04 ◈ Weaponry &amp; Tech Stack]
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${data.stack.map(s => `<span class="tech-chip">${s}</span>`).join('')}
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('active');
  }

  closeProjectModal() {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('active');
    }
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.innerText = message;
    this.toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2800);
  }
}

// Bootstrap Portfolio Application
window.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new MatrixPortfolioApp();
});
