

document.addEventListener('DOMContentLoaded', () => {

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);


    const nav = document.querySelector(".header-menu");
    const accordion = document.querySelector(".accordion");
    const canvas = document.querySelector("canvas");
    const overlay = document.querySelector(".overlay");
    const robot = document.querySelector("spline-viewer");
    const context = canvas.getContext("2d");
    const dialogBallon = document.querySelector(".dialog-ballon")

    const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        context.scale(pixelRatio, pixelRatio);
    };
    setCanvasSize();

    const frameCount = 480;
    let getFrameSrc = (index) =>
        `/static/assets/images/frames/jpg/frame_${(index + 1).toString().padStart(4, "000")}.jpg`;

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
    };

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
        };
    };

    const mm = gsap.matchMedia();

    const setUpScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top top",
            end: `+=${window.innerHeight * 7}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                const animationProgress = Math.min(progress / 0.9, 1);
                const targetFrame = Math.round(animationProgress * (frameCount - 1));
                videoFrames.frame = targetFrame;
                render();


                mm.add("(min-width: 1200px)", () => {
                    if (progress <= 0.1) {
                        const navProgress = progress / 0.1;
                        const opacity = 1 - navProgress;

                        const scale = gsap.utils.mapRange(0, 2, 1, 100, progress);

                        gsap.set(nav, { opacity });
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
                    } else {
                        gsap.set(nav, { opacity: 0 });
                        gsap.set(robot, { opacity: 0 });
                        gsap.set(dialogBallon, { opacity: 0 });

                    }
                });

                // Accordion section - appears at 0.2, full size at 0.4, fades out by 0.5
                if (progress >= 0.2 && progress <= 0.5) {

                    if (progress <= 0.4) {
                        // Phase 1: 0.2 to 0.4 - Scale up from small to full viewport
                        const localProgress = (progress - 0.2) / (0.4 - 0.2); // Maps 0.2-0.4 to 0-1
                        const scale = 0.3 + (localProgress * 0.7); // 0.3 to 1
                        const opacity = localProgress; // 0 to 1

                        gsap.set(accordion, {
                            scale,
                            opacity,
                            force3D: true,
                            display: 'flex'
                        });

                    } else {
                        // Phase 2: 0.4 to 0.5 - Continue scaling and fade out
                        const localProgress = (progress - 0.4) / (0.5 - 0.4); // Maps 0.4-0.5 to 0-1
                        const scale = 1 + (localProgress * 0.3); // 1 to 1.3
                        const opacity = 1 - localProgress; // 1 to 0

                        gsap.set(accordion, {
                            scale,
                            opacity,
                            force3D: true,
                            display: 'flex'
                        });
                    }

                } else {
                    // Outside the range - hide it
                    gsap.set(accordion, {
                        opacity: 0,
                        display: 'none'
                    });
                }






            },
        })
    };
    window.addEventListener("resize", () => {
        setCanvasSize();
        render();
        ScrollTrigger.refresh();
    });
});

function applyScrollFade3D({
    element,
    progress,
    start,
    end,
    fadeIn = 0.2,
    hold = 0.6,
    fadeOut = 0.2,
    zFrom = 1200,
    zTo = -200,
    xPercent = 0,
    yPercent = 0
}) {
    let opacity = 0;
    let z = zFrom;

    if (progress >= start && progress <= end) {
        const t = (progress - start) / (end - start); // normalized 0 → 1

        if (t <= fadeIn) {
            // FADE IN
            opacity = t / fadeIn;

        } else if (t <= fadeIn + hold) {
            // HOLD
            opacity = 1;

        } else {
            // FADE OUT
            const fadeOutT = (t - fadeIn - hold) / fadeOut;
            opacity = 1 - fadeOutT;
        }

        // Z interpolation
        z = zFrom + (zTo - zFrom) * t;
    }

    gsap.set(element, {
        xPercent,
        yPercent,
        z,
        opacity,
        force3D: true
    });
}

