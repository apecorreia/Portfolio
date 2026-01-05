/**
 * Mobile Menu Controller
 * Requires GSAP to be loaded: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 */

class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');
        this.cta = document.querySelector('.mobile-cta');
        this.footerInfo = document.querySelector('.mobile-footer-info');
        this.decoration = document.querySelector('.menu-decoration');
        this.isOpen = false;
        this.openTimeline = null;
        this.rotationTween = null;

        // Only initialize if elements exist
        if (this.hamburger && this.mobileMenu) {
            this.init();
        } else {
            console.warn('Mobile menu elements not found. Make sure #hamburger and #mobileMenu exist.');
        }
    }

    init() {
        // Set initial states
        gsap.set(this.navLinks, { y: 60, opacity: 0 });
        gsap.set(this.cta, { y: 30, opacity: 0 });
        gsap.set(this.footerInfo, { opacity: 0 });
        gsap.set(this.decoration, { opacity: 0, scale: 0.8, rotation: -45 });

        // Hamburger click
        this.hamburger.addEventListener('click', () => this.toggle());

        // Close menu and scroll to section when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Get the section id from the link text
                const linkText = link.querySelector('.link-text').textContent.toLowerCase();

                // Map link text to section ids
                const sectionMap = {
                    'biografia': 'bio',
                    'serviços': 'services',
                    'projetos': 'projects'
                };

                const sectionId = sectionMap[linkText];
                const section = document.getElementById(sectionId);

                // Close menu first, then scroll
                this.close();

                if (section) {
                    // Wait for menu close animation, then scroll
                    setTimeout(() => {
                        const offsetTop = section.offsetTop;

                        // Use GSAP ScrollTo if available
                        if (gsap.plugins && gsap.plugins.scrollTo) {
                            gsap.to(window, {
                                scrollTo: { y: offsetTop, autoKill: false },
                                duration: 1,
                                ease: 'power3.inOut'
                            });
                        } else {
                            // Fallback smooth scroll
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }, 400);
                }
            });
        });

        // Close menu when clicking mobile CTA
        const mobileCta = document.getElementById('mobileCta');
        if (mobileCta) {
            mobileCta.addEventListener('click', () => this.close());
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Prevent body scroll when menu is open (touch devices)
        this.mobileMenu.addEventListener('touchmove', (e) => {
            if (this.isOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Kill any existing animations
        if (this.openTimeline) {
            this.openTimeline.kill();
        }

        // Create timeline for opening animation
        this.openTimeline = gsap.timeline();

        // Show overlay
        this.openTimeline.to(this.mobileMenu, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.4,
            ease: 'power2.out'
        });

        // Animate decoration
        if (this.decoration) {
            this.openTimeline.to(this.decoration, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.2');

            // Subtle continuous rotation
            this.rotationTween = gsap.to(this.decoration, {
                rotation: '+=360',
                duration: 60,
                ease: 'none',
                repeat: -1
            });
        }

        // Stagger nav links
        this.openTimeline.to(this.navLinks, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5');

        // Animate CTA
        if (this.cta) {
            this.openTimeline.to(this.cta, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.3');
        }

        // Animate footer info
        if (this.footerInfo) {
            this.openTimeline.to(this.footerInfo, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            }, '-=0.2');
        }
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Kill rotation animation
        if (this.rotationTween) {
            this.rotationTween.kill();
        }

        // Create timeline for closing animation
        const tl = gsap.timeline();

        // Fade out footer
        if (this.footerInfo) {
            tl.to(this.footerInfo, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
        }

        // Fade out CTA
        if (this.cta) {
            tl.to(this.cta, {
                opacity: 0,
                y: 20,
                duration: 0.2,
                ease: 'power2.in'
            }, '-=0.1');
        }

        // Stagger out nav links (reverse order)
        tl.to([...this.navLinks].reverse(), {
            opacity: 0,
            y: -30,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in'
        }, '-=0.1');

        // Fade out decoration
        if (this.decoration) {
            tl.to(this.decoration, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            }, '-=0.2');
        }

        // Hide overlay
        tl.to(this.mobileMenu, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                gsap.set(this.mobileMenu, { visibility: 'hidden' });
                // Reset positions for next open
                gsap.set(this.navLinks, { y: 60, opacity: 0 });
                if (this.cta) gsap.set(this.cta, { y: 30, opacity: 0 });
                if (this.decoration) gsap.set(this.decoration, { scale: 0.8, rotation: -45 });
            }
        }, '-=0.1');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is required for the mobile menu. Add: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>');
        return;
    }

    // Initialize mobile menu
    window.mobileMenu = new MobileMenu();
});