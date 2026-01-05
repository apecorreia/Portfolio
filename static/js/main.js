document.addEventListener('DOMContentLoaded', () => {



    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollToPlugin);

    /**
 * Scroll To Top Button Controller
 * Requires GSAP: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
 */

    class ScrollToTop {
        constructor(options = {}) {
            this.threshold = options.threshold || 300; // Show button after scrolling this many pixels
            this.scrollDuration = options.scrollDuration || 1; // Duration of scroll animation in seconds
            this.button = null;
            this.isVisible = false;
            this.chevronTimeline = null;

            this.init();
        }

        init() {
            // Find existing button or create one
            this.button = document.getElementById('scrollToTop');

            if (!this.button) {
                this.createButton();
            }

            // Set up scroll listener
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

            // Click handler
            this.button.addEventListener('click', () => this.scrollToTop());

            // Initial check
            this.handleScroll();

            // Start chevron animation
            this.animateChevron();
        }

        createButton() {
            // Create button HTML dynamically if not in DOM
            this.button = document.createElement('button');
            this.button.className = 'scroll-to-top';
            this.button.id = 'scrollToTop';
            this.button.setAttribute('aria-label', 'Scroll to top');
            this.button.innerHTML = `
            <div class="chevron">
                <span class="chevron-line"></span>
                <span class="chevron-line"></span>
            </div>
        `;

            // Append to body
            document.body.appendChild(this.button);
        }

        handleScroll() {
            const scrollY = window.scrollY || window.pageYOffset;

            if (scrollY > this.threshold && !this.isVisible) {
                this.show();
            } else if (scrollY <= this.threshold && this.isVisible) {
                this.hide();
            }
        }

        show() {
            this.isVisible = true;
            this.button.classList.add('visible');

            gsap.to(this.button, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        hide() {
            this.isVisible = false;
            this.button.classList.remove('visible');

            gsap.to(this.button, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(this.button, { visibility: 'hidden' });
                }
            });
        }

        animateChevron() {
            const chevron = this.button.querySelector('.chevron');

            // Continuous floating animation
            this.chevronTimeline = gsap.timeline({ repeat: -1, yoyo: true });
            this.chevronTimeline.to(chevron, {
                y: -3,
                duration: 0.6,
                ease: 'power1.inOut'
            });
        }

        scrollToTop() {
            // Get current scroll position
            const currentScroll = window.scrollY || window.pageYOffset;

            // Animate scroll to top
            gsap.to(window, {
                scrollTo: { y: 0, autoKill: false },
                duration: this.scrollDuration,
                ease: 'power3.inOut'
            });

            // Alternative if ScrollToPlugin is not loaded
            if (!gsap.plugins.scrollTo) {
                // Fallback using vanilla JS with GSAP timing
                const startTime = performance.now();
                const duration = this.scrollDuration * 1000;

                const animateScroll = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (easeInOutCubic)
                    const easeProgress = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                    window.scrollTo(0, currentScroll * (1 - easeProgress));

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                };

                requestAnimationFrame(animateScroll);
            }
        }

        // Method to destroy the button if needed
        destroy() {
            if (this.chevronTimeline) {
                this.chevronTimeline.kill();
            }
            if (this.button && this.button.parentNode) {
                this.button.parentNode.removeChild(this.button);
            }
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Check if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.error('GSAP is required. Add: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>');
            return;
        }

        // Initialize scroll to top button
        window.scrollToTopButton = new ScrollToTop({
            threshold: 300,      // Show after scrolling 300px
            scrollDuration: 1    // 1 second scroll animation
        });
    });

    // Canvas elements
    const nav = document.querySelector(".header-menu");
    const canvas = document.querySelector("canvas");
    const overlay = document.querySelector(".overlay");
    const robot = document.querySelector("spline-viewer");
    const context = canvas.getContext("2d");
    const dialogBallon = document.querySelector(".dialog-ballon");

    // Bio link
    const bioLink = document.getElementById("bioLink");
    const bioSection = document.querySelector(".bio");
    const servicesLink = document.getElementById("servicesLink");
    const servicesSection = document.querySelector(".services");
    const projectsLink = document.getElementById("projectsLink");
    const projectsSection = document.querySelector(".projects");

    bioLink.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 5, scrollTo: bioSection });
    });

    servicesLink.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 5, scrollTo: servicesSection });
    });

    projectsLink.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, { duration: 5, scrollTo: projectsSection });
    });

    // Accordion elements
    const accordion = document.querySelector('.accordion');
    const leftSlide = document.querySelector('.slide.left');
    const rightSlide = document.querySelector('.slide.right');
    const baseSlide = document.querySelector('.slide.base');
    const leftContent = document.querySelector('.accordion .left-content');
    const rightContent = document.querySelector('.accordion .right-content');
    const leftImg = document.querySelector('.slide.left img');
    const rightImg = document.querySelector('.slide.right img');
    const baseImg = document.querySelector('.slide.base img');

    // Accordion settings
    const revealMultiplier = 1.4;
    const maxTranslate = 50;
    const deadZone = 0.05;

    // Track if accordion is active (visible and interactive)
    let accordionActive = true;

    // Reset accordion to default state
    const resetAccordion = () => {
        gsap.set(leftSlide, { clipPath: `inset(0 50% 0 0)` });
        gsap.set(rightSlide, { clipPath: `inset(0 0 0 50%)` });
        gsap.set(baseSlide, { clipPath: `inset(0 0 0 0)` });
        gsap.set([leftImg, rightImg, baseImg], { x: 0 });
        gsap.set([leftContent, rightContent], { opacity: 0.5, x: 0 });
    };

    accordion.addEventListener('mousemove', (e) => {
        if (!accordionActive) return;

        const rect = accordion.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const width = rect.width;

        const position = mouseX / width;
        const translateX = (position - 0.5) * maxTranslate * 2;

        if (position < 0.5 - deadZone) {
            const distanceFromCenter = 0.5 - deadZone - position;
            const maxDistance = (0.5 - deadZone) * 2; // Animation completes at 25% position (near edge)

            // Clamp progress to max 1
            const progress = Math.min(distanceFromCenter / maxDistance, 1);

            const revealAmount = 50 + (progress * 50); // 50% to 100%
            const clipRight = Math.max(100 - revealAmount, 0);

            gsap.to(leftSlide, {
                clipPath: `inset(0 ${clipRight}% 0 0)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(rightSlide, {
                clipPath: `inset(0 0 0 100%)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(baseSlide, {
                clipPath: `inset(0 0 0 ${revealAmount}%)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(leftImg, {
                x: translateX,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(rightImg, {
                x: translateX * 0.5,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(baseImg, {
                x: translateX * 0.7,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(leftContent, {
                opacity: progress > 0.3 ? 1 : 0.5,
                x: translateX * 0.3,
                duration: 0.5
            });

            gsap.to(rightContent, {
                opacity: 0.5,
                duration: 0.4
            });

        } else if (position > 0.5 + deadZone) {
            const distanceFromCenter = position - (0.5 + deadZone);
            const maxDistance = (0.5 - deadZone) * 2; // Animation completes at 75% position (near edge)

            // Clamp progress to max 1
            const progress = Math.min(distanceFromCenter / maxDistance, 1);

            const revealAmount = 50 + (progress * 50); // 50% to 100%
            const clipLeft = Math.max(100 - revealAmount, 0);

            gsap.to(rightSlide, {
                clipPath: `inset(0 0 0 ${clipLeft}%)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(leftSlide, {
                clipPath: `inset(0 100% 0 0)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(baseSlide, {
                clipPath: `inset(0 ${revealAmount}% 0 0)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(rightImg, {
                x: translateX,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(leftImg, {
                x: translateX * 0.5,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(baseImg, {
                x: translateX * 0.5,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to(rightContent, {
                opacity: progress > 0.3 ? 1 : 0.5,
                x: translateX * 0.3,
                duration: 0.5
            });

            gsap.to(leftContent, {
                opacity: 0.5,
                duration: 0.4
            });

        } else {
            gsap.to(leftSlide, {
                clipPath: `inset(0 50% 0 0)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(rightSlide, {
                clipPath: `inset(0 0 0 50%)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to(baseSlide, {
                clipPath: `inset(0 0 0 0)`,
                duration: 0.1,
                ease: "power3.out"
            });

            gsap.to([leftImg, rightImg, baseImg], {
                x: translateX,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.to([leftContent, rightContent], {
                opacity: 0.5,
                duration: 0.4
            });
        }
    });

    accordion.addEventListener('mouseleave', () => {
        if (!accordionActive) return;

        gsap.to(leftSlide, {
            clipPath: `inset(0 50% 0 0)`,
            duration: 0.1,
            ease: "power3.out"
        });

        gsap.to(rightSlide, {
            clipPath: `inset(0 0 0 50%)`,
            duration: 0.1,
            ease: "power3.out"
        });

        gsap.to(baseSlide, {
            clipPath: `inset(0 0 0 0)`,
            duration: 0.1,
            ease: "power3.out"
        });

        gsap.to([leftImg, rightImg, baseImg], {
            x: 0,
            duration: 0.6,
            ease: "power3.out"
        });

        gsap.to([leftContent, rightContent], {
            opacity: 0.5,
            x: 0,
            duration: 0.4
        });
    });

    // Canvas setup
    const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        context.scale(pixelRatio, pixelRatio);
    };
    setCanvasSize();

    const frameCount = 200;
    let getFrameSrc = (index) =>
        `/static/assets/images/frames/frame_${(index + 1).toString().padStart(4, "000")}.jpg`;

    let images = [];
    let videoFrames = { frame: 0 };
    let imagesToLoad = frameCount;

    const onLoad = () => {
        imagesToLoad--;

        if (!imagesToLoad) {
            render();
            setUpScrollTrigger();
        }
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = onLoad;
        img.onerror = function () {
            onLoad.call(this);
        };
        img.src = getFrameSrc(i);
        images.push(img);
    }

    const render = () => {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        const img = images[videoFrames.frame];
        if (img && img.complete && img.naturalWidth > 0) {
            const imageAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, drawX, drawY;

            if (imageAspect > canvasAspect) {
                drawHeight = canvasHeight;
                drawWidth = canvasWidth;
                drawX = (canvasWidth - drawWidth) / 2;
                drawY = 0;
            } else {
                drawWidth = canvasWidth;
                drawHeight = drawWidth / imageAspect;
                drawX = 0;
                drawY = (canvasHeight - drawHeight) / 2;
            }

            context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
    };

    const mm = gsap.matchMedia();

    const setUpScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top top",
            end: `+=${window.innerHeight * 2}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                const animationProgress = Math.min(progress / 0.9, 1);
                const targetFrame = Math.round(animationProgress * (frameCount - 1));
                videoFrames.frame = targetFrame;
                render();

                //mm.add("(min-width: 1200px)", () => {
                const logoImg = document.querySelector('.logo img');

                if (progress <= 0.1) {
                    // Beginning - fade out
                    const navProgress = progress / 0.1;
                    const opacity = 1 - navProgress;

                    const scale = gsap.utils.mapRange(0, 2, 1, 100, progress);

                    gsap.set(nav, { opacity, translateY: 0 });
                    gsap.set(overlay, { opacity });
                    gsap.set(robot, {
                        xPercent: -50,
                        yPercent: -50,
                        scale,
                        opacity,
                        force3D: true
                    });
                    gsap.set(dialogBallon, {
                        xPercent: -50,
                        yPercent: -50,
                        scale,
                        opacity,
                        force3D: true
                    });
                    // } else if (progress >= 0.9) {
                    //  // End - fade back in with dark colors
                    //  const endProgress = (progress - 0.9) / 0.1;
                    //
                    //  gsap.to(nav, {
                    //      opacity: endProgress,
                    //      duration: 0.3,
                    //      ease: "power2.out"
                    //  });
                    //
                    //  // Change nav link colors to dark
                    //  gsap.to('.nav-link', {
                    //      duration: 0.3,
                    //      ease: "power2.out"
                    //  });
                    //
                    //  gsap.to('.nav-link span', {
                    //      duration: 0.3,
                    //      ease: "power2.out"
                    //  });
                    //
                    //  // Change the ::after pseudo element via CSS class
                    //  nav.classList.add('dark-mode');
                    //
                    //  // Change button style
                    //  gsap.to('.nav-buttons .btn', {
                    //      borderColor: '#000',
                    //      duration: 0.3,
                    //      ease: "power2.out"
                    //  });
                    //
                    //  // Change logo image
                    //  logoImg.src = "/static/assets/images/logos/3.png";
                    //
                    //  gsap.set(robot, { opacity: 0 });
                    //  gsap.set(dialogBallon, { opacity: 0 });
                } else {
                    // Middle - keep hidden
                    gsap.set(nav, { opacity: 0, translateY: -500 });
                    gsap.set(robot, { opacity: 0 });
                    gsap.set(dialogBallon, { opacity: 0 });

                    // Reset to light mode
                    nav.classList.remove('dark-mode');

                    // Reset logo to original
                    logoImg.src = "/static/assets/images/logos/António Correia.png";
                }
                //});

                //// Accordion section
                //if (progress >= 0.15 && progress <= 0.5) {
                //
                //    // Enable accordion interaction when fully visible
                //    if (progress >= 0.35 && progress <= 0.45) {
                //        if (!accordionActive) {
                //            accordionActive = true;
                //            resetAccordion();
                //        }
                //    } else {
                //        accordionActive = false;
                //    }
                //
                //    if (progress <= 0.4) {
                //        // Phase 1: 0.2 to 0.4 - Scale up from small to full viewport
                //        const localProgress = (progress - 0.15) / (0.4 - 0.15);
                //        const scale = 0.3 + (localProgress * 0.7);
                //        const opacity = localProgress;
                //
                //        gsap.set(accordion, {
                //            scale,
                //            opacity,
                //            force3D: true,
                //            display: 'flex',
                //            pointerEvents: accordionActive ? 'auto' : 'none'
                //        });
                //
                //    } else {
                //        // Phase 2: 0.4 to 0.5 - Continue scaling and fade out
                //        const localProgress = (progress - 0.4) / (0.5 - 0.4);
                //        const scale = 1 + (localProgress * 0.3);
                //        const opacity = 1 - localProgress;
                //
                //        gsap.set(accordion, {
                //            scale,
                //            opacity,
                //            force3D: true,
                //            display: 'flex',
                //            pointerEvents: accordionActive ? 'auto' : 'none'
                //        });
                //    }
                //
                //} else {
                //    // Outside the range - hide it
                //    accordionActive = false;
                //    resetAccordion();
                //    gsap.set(accordion, {
                //        opacity: 0,
                //        display: 'none',
                //        pointerEvents: 'none'
                //    });
                //}
            },
        });
    };

    window.addEventListener("resize", () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
    });
    new ScrollToTop({
        threshold: 500,      // Show after 500px scroll
        scrollDuration: 1.5  // 1.5 second scroll animation
    });

});