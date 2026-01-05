
/* ============================================
   PORTFOLIO SECTIONS - GSAP ANIMATIONS
   ============================================ */

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // OUTRO SECTION ANIMATIONS
    // ============================================
    
    // Create floating particles
    const createParticles = () => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    };
    createParticles();

    // Typing effect for tagline
    //const typeWriter = () => {
    //    const typingText = document.querySelector('.typing-text');
    //    if (!typingText) return;
    //    
    //    const phrases = [
    //        'Designer & Developer',
    //        'Criador de Experiências Digitais',
    //        'Inovador por Natureza',
    //        'Apaixonado por Código'
    //    ];
    //    let phraseIndex = 0;
    //    let charIndex = 0;
    //    let isDeleting = false;
    //    let typeSpeed = 100;
//
    //    const type = () => {
    //        const currentPhrase = phrases[phraseIndex];
    //        
    //        if (isDeleting) {
    //            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    //            charIndex--;
    //            typeSpeed = 50;
    //        } else {
    //            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    //            charIndex++;
    //            typeSpeed = 100;
    //        }
//
    //        if (!isDeleting && charIndex === currentPhrase.length) {
    //            typeSpeed = 2000;
    //            isDeleting = true;
    //        } else if (isDeleting && charIndex === 0) {
    //            isDeleting = false;
    //            phraseIndex = (phraseIndex + 1) % phrases.length;
    //            typeSpeed = 500;
    //        }
//
    //        setTimeout(type, typeSpeed);
    //    };
//
    //    type();
    //};
    //typeWriter();

    // Outro section entrance animation
    //const outroTl = gsap.timeline();
    //
    //outroTl.from('.glitch', {
    //    duration: 1.5,
    //    opacity: 0,
    //    y: 50,
    //    ease: 'power4.out'
    //})
    //.from('.tagline', {
    //    duration: 1,
    //    opacity: 0,
    //    y: 20,
    //    ease: 'power3.out'
    //}, '-=0.8')
    

    // ============================================
    // BIO SECTION ANIMATIONS
    // ============================================
    
    // Section header animation
    gsap.from('.bio .section-header', {
        scrollTrigger: {
            trigger: '.bio',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power3.out'
    });

    // Bio image frame animation
    gsap.from('.bio-image-frame', {
        scrollTrigger: {
            trigger: '.bio-image-frame',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        opacity: 0,
        scale: 0.9,
        ease: 'power3.out'
    });

    // Frame corners animation
    gsap.from('.frame-corner', {
        scrollTrigger: {
            trigger: '.bio-image-frame',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5
    });

    // Stats counter animation
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                duration: 2,
                innerText: target,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        });
    };
    animateCounters();

    //// Bio content stagger animation
    //gsap.from('.bio-content > *', {
    //    scrollTrigger: {
    //        trigger: '.bio-content',
    //        start: 'top 80%',
    //        toggleActions: 'play none none reverse'
    //    },
    //    duration: 0.8,
    //    opacity: 0,
    //    y: 30,
    //    stagger: 0.15,
    //    ease: 'power3.out'
    //});

    // Skills grid animation
    //gsap.from('.skill-item', {
    //    scrollTrigger: {
    //        trigger: '.skills-grid',
    //        start: 'top 85%',
    //        toggleActions: 'play none none reverse'
    //    },
    //    duration: 0.6,
    //    opacity: 0,
    //    y: 20,
    //    scale: 0.8,
    //    stagger: {
    //        each: 0.1,
    //        from: 'random'
    //    },
    //    ease: 'back.out(1.7)'
    //});
//
    //// Skill item hover effect
    //document.querySelectorAll('.skill-item').forEach(item => {
    //    item.addEventListener('mouseenter', () => {
    //        gsap.to(item, {
    //            duration: 0.3,
    //            scale: 1.05,
    //            boxShadow: '0 10px 30px rgba(7, 115, 204, 0.3)',
    //            ease: 'power2.out'
    //        });
    //    });
    //    
    //    item.addEventListener('mouseleave', () => {
    //        gsap.to(item, {
    //            duration: 0.3,
    //            scale: 1,
    //            boxShadow: '0 0 0 rgba(7, 115, 204, 0)',
    //            ease: 'power2.out'
    //        });
    //    });
    //});

    // ============================================
    // SERVICES SECTION ANIMATIONS
    // ============================================
    
    // Services section header
    gsap.from('.services .section-header', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power3.out'
    });

    // Services intro
    gsap.from('.services-intro', {
        scrollTrigger: {
            trigger: '.services-intro',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    });

    // Service cards stagger animation
    //gsap.from('.service-card', {
    //    scrollTrigger: {
    //        trigger: '.services-grid',
    //        start: 'top 80%',
    //        toggleActions: 'play none none reverse'
    //    },
    //    duration: 0.8,
    //    opacity: 0,
    //    y: 60,
    //    stagger: {
    //        each: 0.15,
    //        from: 'start'
    //    },
    //    ease: 'power3.out'
    //});

    // Service card hover animations
    document.querySelectorAll('.service-card').forEach(card => {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features li');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                duration: 0.5,
                rotation: 360,
                scale: 1.1,
                ease: 'power2.out'
            });
            
            gsap.to(features, {
                duration: 0.3,
                x: 5,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                duration: 0.5,
                rotation: 0,
                scale: 1,
                ease: 'power2.out'
            });
            
            gsap.to(features, {
                duration: 0.3,
                x: 0,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // PROJECTS SECTION ANIMATIONS
    // ============================================
    
    // Projects section header
    gsap.from('.projects .section-header', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power3.out'
    });


    // Project cards reveal animation
   // gsap.from('.project-card', {
   //     scrollTrigger: {
   //         trigger: '.projects-grid',
   //         start: 'top 80%',
   //         toggleActions: 'play none none reverse'
   //     },
   //     duration: 0.8,
   //     opacity: 0,
   //     y: 80,
   //     stagger: {
   //         each: 0.1,
   //         grid: 'auto',
   //         from: 'start'
   //     },
   //     ease: 'power3.out'
   // });

    // Project filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 1,
                        scale: 1,
                        display: 'block',
                        ease: 'power3.out'
                    });
                } else {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0.8,
                        display: 'none',
                        ease: 'power3.out'
                    });
                }
            });
        });
    });

    // Project card magnetic effect on hover
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
                duration: 0.3,
                rotationY: x / 20,
                rotationX: -y / 20,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });

    // CTA button animation
    gsap.from('.projects-cta', {
        scrollTrigger: {
            trigger: '.projects-cta',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    });

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    
    // Bio section parallax
    gsap.to('.bio-image img', {
        scrollTrigger: {
            trigger: '.bio',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: 0,
        ease: 'none'
    });

    // Services background glow parallax
    //gsap.to('.services::before', {
    //    scrollTrigger: {
    //        trigger: '.services',
    //        start: 'top bottom',
    //        end: 'bottom top',
    //        scrub: 1
    //    },
    //    scale: 1.5,
    //    opacity: 0.15,
    //    ease: 'none'
    //});

    // ============================================
    // SCROLL-TRIGGERED TEXT ANIMATIONS
    // ============================================
    
    // Split text reveal for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            title.appendChild(span);
        });
        
        gsap.to(title.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.5,
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: 'power3.out'
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 50
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // ============================================
    // REVEAL ON SCROLL - GENERAL UTILITY
    // ============================================
    
    // Add reveal class to elements
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        });
    });

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    
    document.querySelectorAll('.cta-button, .filter-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // ============================================
    // REFRESH SCROLL TRIGGER ON RESIZE
    // ============================================
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

});