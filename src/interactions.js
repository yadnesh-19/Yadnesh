/**
 * Portfolio Interactive Controllers
 * "Code & Cupcakes — thoughtfully crafted software."
 * 
 * Accessible, zero external framework dependencies, native browser APIs.
 */

import { portfolioData } from './data.js';

export class PortfolioInteractions {
  constructor() {
    this.modalBackdrop = document.getElementById('accessible-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalBody = document.getElementById('modal-body');
    this.modalCallout = document.getElementById('modal-callout');
    this.lastFocusedElement = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.setupReadingProgressBar();
    this.setupActiveNavigation();
    this.setupMobileMenu();
    this.setupScrollReveals();
    this.setupSkillsFilter();
    this.setupCaseStudyAccordions();
    this.setupCardPerspectiveTilt();
    this.setupContactForm();
    this.setupModal();
    this.setupSmoothScrollActions();
  }

  /**
   * 1. Reading Progress Bar at Top of Page
   */
  setupReadingProgressBar() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * 2. Active Section Navigation Observer
   */
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${currentId}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * 3. Accessible Mobile Navigation Menu
   */
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    const openDrawer = () => {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    drawer.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /**
   * 4. Staggered Scroll Reveals
   */
  setupScrollReveals() {
    if (this.prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * 5. Interactive Skill Category Filters
   */
  setupSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!filterButtons.length || !skillCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        filterButtons.forEach(b => {
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });

        skillCards.forEach(card => {
          const cardCategory = card.dataset.category;
          const shouldShow = category === 'all' || cardCategory === category;

          if (shouldShow) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.classList.add('hidden');
            }, 200);
          }
        });
      });
    });
  }

  /**
   * 6. Case Study Accordion Disclosure Panels (One-Page Experience)
   */
  setupCaseStudyAccordions() {
    const accordionButtons = document.querySelectorAll('.btn-case-study');

    accordionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(targetId);
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        if (!panel) return;

        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          panel.classList.remove('expanded');
          const span = btn.querySelector('span');
          if (span) span.textContent = 'Read Case Study';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          panel.classList.add('expanded');
          const span = btn.querySelector('span');
          if (span) span.textContent = 'Close Case Study';
        }
      });
    });
  }

  /**
   * 7. Subtle 3D Card Tilt for Fine Pointer Devices
   */
  setupCardPerspectiveTilt() {
    if (this.prefersReducedMotion) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const tiltCards = document.querySelectorAll('.project-card, .about-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /**
   * 8. Contact Form with Honest Email Draft Trigger & Validation
   */
  setupContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const banner = document.getElementById('form-notification-banner');
    const copyDraftBtn = document.getElementById('btn-copy-draft');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      const nameError = document.getElementById('name-error');
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      // Validate Email
      const emailError = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailError.classList.remove('visible');
      }

      // Validate Message
      const messageError = document.getElementById('message-error');
      if (messageInput.value.trim().length < 10) {
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      const recipientEmail = portfolioData.links.email;
      if (!recipientEmail || recipientEmail.includes('example.com')) {
        // Honest notification: configured email is currently placeholder
        this.showModal({
          title: "Email Draft Notice",
          body: `Thank you, ${nameInput.value.trim()}! An email draft is ready. Note that the configured portfolio email (${recipientEmail || 'Unconfigured'}) is currently in placeholder mode in <code>src/data.js</code>.`,
          callout: "You can open your email application directly or copy the drafted inquiry to your clipboard below."
        });
      }

      // Construct honest mailto link
      const subject = encodeURIComponent(`Portfolio Inquiry from ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Yadnesh,\n\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}\n(${emailInput.value.trim()})`
      );

      const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

      if (banner) {
        banner.className = 'form-notification-banner visible success';
        banner.innerHTML = `<strong>Draft ready!</strong> Launching your default email client... If it doesn't open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 600;">click here to open draft</a> or use the copy button below.`;
      }

      // Trigger mailto link safely
      window.location.href = mailtoUrl;
    });

    if (copyDraftBtn) {
      copyDraftBtn.addEventListener('click', () => {
        const name = document.getElementById('contact-name')?.value.trim() || 'Visitor';
        const email = document.getElementById('contact-email')?.value.trim() || 'visitor@example.com';
        const message = document.getElementById('contact-message')?.value.trim() || 'Hello Yadnesh!';

        const draftText = `To: ${portfolioData.links.email || 'yadnesh@example.com'}\nSubject: Portfolio Inquiry from ${name}\n\nHi Yadnesh,\n\n${message}\n\nBest regards,\n${name} (${email})`;

        navigator.clipboard.writeText(draftText).then(() => {
          const originalText = copyDraftBtn.innerHTML;
          copyDraftBtn.innerHTML = `<span>Copied to Clipboard!</span>`;
          setTimeout(() => {
            copyDraftBtn.innerHTML = originalText;
          }, 2500);
        }).catch(() => {
          alert("Could not copy automatically. Please copy text manually from the form.");
        });
      });
    }
  }

  /**
   * 9. Accessible Modal Controller for Missing Links / Résumé
   */
  setupModal() {
    const backdrop = this.modalBackdrop;
    if (!backdrop) return;

    const closeBtn = document.getElementById('btn-close-modal');
    const dismissBtn = document.getElementById('btn-modal-dismiss');

    const closeModal = () => {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeModal();
      }
    });

    // Attach click listeners to all links with placeholder handlers
    document.querySelectorAll('[data-honest-placeholder]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const placeholderType = el.dataset.honestPlaceholder;
        this.handlePlaceholderNotice(placeholderType, el);
      });
    });
  }

  showModal({ title, body, callout }) {
    if (!this.modalBackdrop) return;
    this.lastFocusedElement = document.activeElement;

    if (this.modalTitle) this.modalTitle.textContent = title;
    if (this.modalBody) this.modalBody.innerHTML = body;
    if (this.modalCallout) {
      if (callout) {
        this.modalCallout.style.display = 'block';
        this.modalCallout.innerHTML = callout;
      } else {
        this.modalCallout.style.display = 'none';
      }
    }

    this.modalBackdrop.classList.add('open');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('btn-close-modal');
    if (closeBtn) closeBtn.focus();
  }

  handlePlaceholderNotice(type, triggerEl) {
    if (type === 'resume') {
      const resumeUrl = portfolioData.links.resumePdf;
      if (resumeUrl && resumeUrl.endsWith('.pdf')) {
        window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      this.showModal({
        title: "Résumé PDF Notice",
        body: `Yadnesh's official résumé PDF is set to a placeholder state. To link your real document, place your PDF inside <code>public/assets/resume.pdf</code> and update <code>portfolioData.links.resumePdf = "/assets/resume.pdf"</code> in <code>src/data.js</code>.`,
        callout: "In the meantime, all verified academic credentials (8.91 CGPA at Trinity Academy of Engineering, Pune), skills, and project case studies are fully documented on this page."
      });
    } else if (type === 'repo') {
      const repoUrl = triggerEl.getAttribute('data-url');
      if (repoUrl && repoUrl.startsWith('http')) {
        window.open(repoUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      this.showModal({
        title: "Repository Link Configuration",
        body: `This project repository URL is currently unconfigured. In accordance with honest developer portfolio standards, no dummy or broken link was triggered.`,
        callout: `To configure this repository URL, update the <code>repoUrl</code> property for this project in <code>src/data.js</code>.`
      });
    } else if (type === 'social') {
      const network = triggerEl.getAttribute('data-network') || 'External Profile';
      this.showModal({
        title: `${network} Profile Notice`,
        body: `This profile link is currently in placeholder mode.`,
        callout: `You can specify your verified profile URL in <code>src/data.js</code> under <code>portfolioData.links</code>.`
      });
    }
  }

  /**
   * 10. Smooth Scroll Actions & Back-to-Top
   */
  setupSmoothScrollActions() {
    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }
  }
}
