/**
 * Application Entrypoint
 * "Code & Cupcakes — thoughtfully crafted software."
 * 
 * Imports only specific Lucide icons, loads data, renders DOM safely,
 * and lazy-loads the procedural Three.js 3D cupcake scene.
 */

import './styles.css';
import { portfolioData } from './data.js';
import { PortfolioInteractions } from './interactions.js';

// Import only the exact Lucide icons used
import {
  createIcons,
  Sparkles,
  Terminal,
  Code2,
  FileCode,
  Layers,
  Layout,
  Palette,
  Server,
  Cpu,
  Database,
  Table,
  GitBranch,
  Github,
  Linkedin,
  Laptop,
  Boxes,
  Binary,
  HardDrive,
  Lightbulb,
  Landmark,
  BookMarked,
  Users2,
  GraduationCap,
  Trophy,
  Compass,
  Send,
  Copy,
  MapPin,
  Briefcase,
  FileText,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  Check,
  Info,
  Mail
} from 'lucide';

const iconSet = {
  Sparkles,
  Terminal,
  Code2,
  FileCode,
  Layers,
  Layout,
  Palette,
  Server,
  Cpu,
  Database,
  Table,
  GitBranch,
  Github,
  Linkedin,
  Laptop,
  Boxes,
  Binary,
  HardDrive,
  Lightbulb,
  Landmark,
  BookMarked,
  Users2,
  GraduationCap,
  Trophy,
  Compass,
  Send,
  Copy,
  MapPin,
  Briefcase,
  FileText,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  Check,
  Info,
  Mail
};

/**
 * Abstract SVG Banners for Projects (No Fake Screenshots)
 */
const projectAbstractGraphics = {
  "bank-management-system": `
    <svg viewBox="0 0 500 180" class="preview-graphic-svg" aria-hidden="true">
      <defs>
        <linearGradient id="bankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B4B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <linearGradient id="vaultGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="500" height="180" fill="url(#bankGrad)" />
      <!-- Grid pattern -->
      <path d="M0,45 H500 M0,90 H500 M0,135 H500" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
      <path d="M100,0 V180 M250,0 V180 M400,0 V180" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
      <!-- Vault Dial Motif -->
      <circle cx="250" cy="90" r="54" fill="none" stroke="url(#vaultGold)" stroke-width="3" stroke-dasharray="6 4" />
      <circle cx="250" cy="90" r="40" fill="rgba(16, 22, 37, 0.85)" stroke="#8B5CF6" stroke-width="2" />
      <circle cx="250" cy="90" r="14" fill="#06B6D4" />
      <!-- Radial spokes -->
      <line x1="250" y1="56" x2="250" y2="44" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" />
      <line x1="250" y1="124" x2="250" y2="136" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" />
      <line x1="216" y1="90" x2="204" y2="90" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" />
      <line x1="284" y1="90" x2="296" y2="90" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" />
      <!-- Binary Stream Indicators -->
      <text x="50" y="95" fill="#64748B" font-family="monospace" font-size="12" opacity="0.6">[BALANCE: O(1)]</text>
      <text x="340" y="95" fill="#06B6D4" font-family="monospace" font-size="12" opacity="0.8">JAVA_SWING::OK</text>
    </svg>
  `,
  "library-management-system": `
    <svg viewBox="0 0 500 180" class="preview-graphic-svg" aria-hidden="true">
      <defs>
        <linearGradient id="libGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#141926" />
          <stop offset="100%" stop-color="#080B14" />
        </linearGradient>
      </defs>
      <rect width="500" height="180" fill="url(#libGrad)" />
      <!-- Stacked Volumes Geometric Motif -->
      <path d="M190,135 L250,110 L310,135 L250,160 Z" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5" />
      <path d="M190,115 L250,90 L310,115 L250,140 Z" fill="#162035" stroke="#8B5CF6" stroke-width="1.5" />
      <path d="M190,95 L250,70 L310,95 L250,120 Z" fill="#1E1B4B" stroke="#A78BFA" stroke-width="1.5" />
      <!-- Bookmark ribbon -->
      <path d="M245,60 L245,100 L250,95 L255,100 L255,60 Z" fill="#F472B6" />
      <text x="60" y="95" fill="#94A3B8" font-family="monospace" font-size="12" opacity="0.7">INDEX &lt;ISBN, BOOK&gt;</text>
      <text x="340" y="95" fill="#A78BFA" font-family="monospace" font-size="12" opacity="0.7">COLLECTIONS_API</text>
    </svg>
  `,
  "smart-alumni-network": `
    <svg viewBox="0 0 500 180" class="preview-graphic-svg" aria-hidden="true">
      <defs>
        <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18132B" />
          <stop offset="100%" stop-color="#090D18" />
        </linearGradient>
      </defs>
      <rect width="500" height="180" fill="url(#networkGrad)" />
      <!-- Constellation Nodes & Connecting Rays -->
      <line x1="160" y1="90" x2="250" y2="55" stroke="rgba(139,92,246,0.4)" stroke-width="2" stroke-dasharray="4 4" />
      <line x1="250" y1="55" x2="340" y2="90" stroke="rgba(6,182,212,0.4)" stroke-width="2" stroke-dasharray="4 4" />
      <line x1="160" y1="90" x2="250" y2="135" stroke="rgba(6,182,212,0.4)" stroke-width="2" />
      <line x1="250" y1="135" x2="340" y2="90" stroke="rgba(139,92,246,0.4)" stroke-width="2" />
      <line x1="250" y1="55" x2="250" y2="135" stroke="rgba(244,114,182,0.3)" stroke-width="1.5" />
      <!-- Nodes -->
      <circle cx="250" cy="55" r="16" fill="#101625" stroke="#8B5CF6" stroke-width="2" />
      <circle cx="160" cy="90" r="14" fill="#101625" stroke="#06B6D4" stroke-width="2" />
      <circle cx="340" cy="90" r="14" fill="#101625" stroke="#06B6D4" stroke-width="2" />
      <circle cx="250" cy="135" r="14" fill="#101625" stroke="#F472B6" stroke-width="2" />
      <!-- Pulses -->
      <circle cx="250" cy="55" r="5" fill="#A78BFA" />
      <circle cx="160" cy="90" r="4" fill="#67E8F9" />
      <circle cx="340" cy="90" r="4" fill="#67E8F9" />
      <circle cx="250" cy="135" r="4" fill="#F472B6" />
      <text x="360" y="40" fill="#A78BFA" font-family="monospace" font-size="11">[HACKATHON CONCEPT]</text>
    </svg>
  `,
  "screen-text-translator": `
    <svg viewBox="0 0 500 180" class="preview-graphic-svg" aria-hidden="true">
      <defs>
        <linearGradient id="transGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#161F30" />
          <stop offset="100%" stop-color="#080B14" />
        </linearGradient>
      </defs>
      <rect width="500" height="180" fill="url(#transGrad)" />
      <!-- Screen Scanner Bounds -->
      <rect x="150" y="35" width="200" height="110" rx="10" fill="rgba(8,11,20,0.7)" stroke="#334155" stroke-width="1.5" />
      <!-- Crosshairs -->
      <path d="M145,50 L145,35 L160,35" stroke="#06B6D4" stroke-width="2" fill="none" />
      <path d="M355,50 L355,35 L340,35" stroke="#06B6D4" stroke-width="2" fill="none" />
      <path d="M145,130 L145,145 L160,145" stroke="#06B6D4" stroke-width="2" fill="none" />
      <path d="M355,130 L355,145 L340,145" stroke="#06B6D4" stroke-width="2" fill="none" />
      <!-- Scanning laser beam -->
      <line x1="150" y1="90" x2="350" y2="90" stroke="#F472B6" stroke-width="2" opacity="0.8" />
      <!-- Speech translation pill -->
      <rect x="180" y="70" width="60" height="20" rx="4" fill="#1E1B4B" stroke="#8B5CF6" stroke-width="1" />
      <text x="190" y="84" fill="#C4B5FD" font-family="sans-serif" font-size="10">Source</text>
      <path d="M245,80 L255,80" stroke="#06B6D4" stroke-width="1.5" marker-end="url(#arrow)" />
      <rect x="260" y="70" width="60" height="20" rx="4" fill="#0C2533" stroke="#06B6D4" stroke-width="1" />
      <text x="272" y="84" fill="#67E8F9" font-family="sans-serif" font-size="10">Target</text>
      <text x="50" y="95" fill="#64748B" font-family="monospace" font-size="12">PYTHON_AI_OCR</text>
    </svg>
  `
};

/**
 * Render Skills Grid
 */
function renderSkills() {
  const container = document.getElementById('skills-grid-container');
  if (!container) return;

  container.innerHTML = '';

  portfolioData.skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal-on-scroll';
    card.dataset.category = skill.category;

    const isLearning = skill.badge.toLowerCase().includes('learning');

    card.innerHTML = `
      <div class="skill-card-top">
        <div class="skill-icon-box" aria-hidden="true">
          <i data-lucide="${toKebabCase(skill.icon)}"></i>
        </div>
        <span class="skill-badge ${isLearning ? 'learning' : ''}">${escapeHtml(skill.badge)}</span>
      </div>
      <h3 class="skill-name">${escapeHtml(skill.name)}</h3>
      <p class="skill-desc">${escapeHtml(skill.description)}</p>
    `;

    container.appendChild(card);
  });
}

/**
 * Render Projects Grid
 */
function renderProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container) return;

  container.innerHTML = '';

  portfolioData.projects.forEach((proj, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal-on-scroll';

    const abstractGraphic = projectAbstractGraphics[proj.id] || '';
    const caseStudyId = `case-study-${proj.id}`;

    // Render tech tags
    const techTagsHtml = proj.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');

    // Render features list
    const featuresHtml = proj.caseStudy.mainFeatures.map(f => `
      <li>
        <i data-lucide="check-circle-2"></i>
        <span>${escapeHtml(f)}</span>
      </li>
    `).join('');

    // Determine status badge class
    let statusClass = 'completed';
    if (proj.statusType === 'concept') statusClass = 'concept';
    else if (proj.statusType === 'prototype') statusClass = 'prototype';

    card.innerHTML = `
      <div class="project-preview-banner">
        ${abstractGraphic}
        <span class="project-type-tag">${escapeHtml(proj.type)}</span>
        <span class="project-status-badge ${statusClass}">${escapeHtml(proj.status)}</span>
      </div>

      <div class="project-card-body">
        <h3 class="project-title">${escapeHtml(proj.title)}</h3>
        <p class="project-tagline">${escapeHtml(proj.tagline)}</p>

        <div class="project-tech-tags">
          ${techTagsHtml}
        </div>

        <div class="project-actions-row">
          <button type="button" class="btn-case-study" aria-expanded="false" aria-controls="${caseStudyId}">
            <span>Read Case Study</span>
            <i data-lucide="chevron-down"></i>
          </button>

          <div class="project-ext-links">
            ${proj.repoUrl ? `
              <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-link">
                <i data-lucide="github"></i>
                <span>Repository</span>
              </a>
            ` : `
              <button type="button" class="btn-project-link" data-honest-placeholder="repo" data-url="${proj.repoUrl}">
                <i data-lucide="folder-git-2"></i>
                <span>Repository</span>
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- Case Study Accordion Disclosure Panel -->
      <div id="${caseStudyId}" class="case-study-panel" role="region" aria-label="${escapeHtml(proj.title)} Case Study">
        <div class="case-study-inner">
          <div class="case-study-section">
            <h4 class="case-study-label"><i data-lucide="alert-circle"></i> The Problem</h4>
            <p class="case-study-desc">${escapeHtml(proj.caseStudy.problem)}</p>
          </div>

          <div class="case-study-section">
            <h4 class="case-study-label"><i data-lucide="cpu"></i> Engineering Approach</h4>
            <p class="case-study-desc">${escapeHtml(proj.caseStudy.approach)}</p>
          </div>

          <div class="case-study-section">
            <h4 class="case-study-label"><i data-lucide="layers"></i> Key Capabilities</h4>
            <ul class="features-list">
              ${featuresHtml}
            </ul>
          </div>

          <div class="case-study-section">
            <h4 class="case-study-label"><i data-lucide="compass"></i> Implementation Status</h4>
            <p class="case-study-desc">${escapeHtml(proj.caseStudy.implementationStatus)}</p>
          </div>

          <div class="case-study-section">
            <h4 class="case-study-label"><i data-lucide="lightbulb"></i> What I Learned</h4>
            <p class="case-study-desc">${escapeHtml(proj.caseStudy.whatILearned)}</p>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Render Journey Timeline
 */
function renderJourney() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = '';

  portfolioData.journey.forEach((item, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'timeline-item reveal-on-scroll';

    const isCurrent = item.period.toLowerCase().includes('current');
    const tagsHtml = item.tags.map(t => `<span class="timeline-tag">${escapeHtml(t)}</span>`).join('');

    itemEl.innerHTML = `
      <div class="timeline-node" aria-hidden="true">
        <div class="timeline-node-inner"></div>
      </div>

      <div class="timeline-card">
        <div class="timeline-card-header">
          <span class="timeline-period-badge ${isCurrent ? 'current' : ''}">${escapeHtml(item.period)}</span>
          <span style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--text-subtle);">
            <i data-lucide="${toKebabCase(item.icon)}" style="width: 14px; height: 14px;"></i>
          </span>
        </div>

        <h3 class="timeline-item-title">${escapeHtml(item.title)}</h3>
        <div class="timeline-item-subtitle">${escapeHtml(item.subtitle)}</div>
        <p class="timeline-item-desc">${escapeHtml(item.description)}</p>

        <div class="timeline-tags">
          ${tagsHtml}
        </div>
      </div>
    `;

    container.appendChild(itemEl);
  });
}

/**
 * Configure Profile Metadata & Placeholders
 */
function configureProfileMetadata() {
  // Update copyright year
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Update contact email display
  const emailEl = document.getElementById('contact-display-email');
  if (emailEl && portfolioData.links.email) {
    emailEl.textContent = portfolioData.links.email;
  }

  // Update internship badge visibility
  const internshipBadge = document.getElementById('internship-badge');
  if (internshipBadge && !portfolioData.profile.availableForInternships) {
    internshipBadge.style.display = 'none';
  }

  // Update hero profile links
  const heroGithub = document.getElementById('hero-github-link');
  if (heroGithub) {
    if (portfolioData.links.github) {
      heroGithub.href = portfolioData.links.github;
    } else {
      heroGithub.removeAttribute('href');
      heroGithub.setAttribute('data-honest-placeholder', 'social');
      heroGithub.setAttribute('data-network', 'GitHub');
    }
  }

  const heroLinkedin = document.getElementById('hero-linkedin-link');
  if (heroLinkedin) {
    if (portfolioData.links.linkedin) {
      heroLinkedin.href = portfolioData.links.linkedin;
    } else {
      heroLinkedin.removeAttribute('href');
      heroLinkedin.setAttribute('data-honest-placeholder', 'social');
      heroLinkedin.setAttribute('data-network', 'LinkedIn');
    }
  }

  const heroLeetcode = document.getElementById('hero-leetcode-link');
  if (heroLeetcode) {
    if (portfolioData.links.leetcode) {
      heroLeetcode.href = portfolioData.links.leetcode;
    } else {
      heroLeetcode.removeAttribute('href');
      heroLeetcode.setAttribute('data-honest-placeholder', 'social');
      heroLeetcode.setAttribute('data-network', 'LeetCode');
    }
  }
}

/**
 * Convert CamelCase or PascalCase to kebab-case for Lucide data attributes
 */
function toKebabCase(str) {
  if (!str) return 'code-2';
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^-/, '');
}

/**
 * Basic HTML escaping for safe DOM insertion
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Lazy Load Procedural Three.js 3D Cupcake Scene
 */
async function loadCupcakeScene() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 640;

  if (isReducedMotion || isMobile) {
    // Show static SVG fallback by default on mobile or reduced motion
    const canvas = document.getElementById('cupcake-canvas');
    const fallback = document.getElementById('cupcake-fallback');
    if (canvas) canvas.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  }

  try {
    const { CupcakeScene } = await import('./cupcake-scene.js');
    const scene = new CupcakeScene({
      canvas: document.getElementById('cupcake-canvas'),
      fallbackContainer: document.getElementById('cupcake-fallback'),
      flavorButtons: document.querySelectorAll('.flavor-btn'),
      pauseButton: document.getElementById('btn-pause-cupcake'),
      toggle3dButton: document.getElementById('btn-toggle-3d')
    });

    scene.init();

    if (isReducedMotion || isMobile) {
      scene.showFallback();
    }
  } catch (err) {
    console.warn('Could not load 3D scene, retaining 2D illustration:', err);
    const canvas = document.getElementById('cupcake-canvas');
    const fallback = document.getElementById('cupcake-fallback');
    if (canvas) canvas.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  }
}

/**
 * Application Bootstrap
 */
function initApp() {
  // 1. Render data into DOM
  renderSkills();
  renderProjects();
  renderJourney();
  configureProfileMetadata();

  // 2. Initialize Lucide icons
  createIcons({ icons: iconSet });

  // 3. Initialize interactive behavior
  const interactions = new PortfolioInteractions();
  interactions.init();

  // 4. Lazy-load 3D cupcake scene
  loadCupcakeScene();
}

// Start on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
