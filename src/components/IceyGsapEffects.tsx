"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IceyGsapEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1024px)",
          finePointer: "(pointer: fine)",
        },
        (context) => {
          const { reduceMotion, desktop, finePointer } = context.conditions ?? {};
          const cleanups: Array<() => void> = [];

          if (reduceMotion) {
            gsap.set(
              ".gsap-hero-kicker, .gsap-hero-title, .gsap-hero-copy, .gsap-hero-actions, .gsap-hero-logo, .gsap-hero-character, .gsap-hero-card, .gsap-frequency span, .gsap-post-card, .gsap-note, .gsap-mode-card, .gsap-newsletter",
              { autoAlpha: 1, clearProps: "transform" }
            );
            gsap.set(".gsap-scroll-progress", { scaleX: 1 });
            return;
          }

          gsap.defaults({ ease: "power3.out" });
          gsap.set(".gsap-scan", {
            backgroundImage:
              "linear-gradient(to bottom, rgba(134,237,252,.2) 0 1px, transparent 1px 7px)",
            backgroundSize: "100% 7px",
          });
          gsap.set(".gsap-post-card", {
            transformPerspective: 900,
            transformStyle: "preserve-3d",
          });

          const progress = document.querySelector<HTMLElement>(".gsap-scroll-progress");
          if (progress) {
            const progressTo = gsap.quickTo(progress, "scaleX", {
              duration: 0.18,
              ease: "power1.out",
            });
            const updateProgress = () => {
              const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
              progressTo(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
            };

            updateProgress();
            window.addEventListener("scroll", updateProgress, { passive: true });
            window.addEventListener("resize", updateProgress);

            cleanups.push(() => {
              window.removeEventListener("scroll", updateProgress);
              window.removeEventListener("resize", updateProgress);
            });
          }

          const hero = gsap.timeline({ defaults: { duration: 0.8 } });
          hero
            .to(
              ".gsap-hero-slice",
              { scaleX: 1, duration: 0.34, stagger: 0.12, ease: "power4.inOut" },
              0.1
            )
            .to(
              ".gsap-hero-slice",
              {
                autoAlpha: 0,
                duration: 0.72,
                ease: "power2.in",
                stagger: 0.1,
                xPercent: (index) => (index === 0 ? 130 : -130),
              },
              0.45
            )
            .from(".gsap-hero-kicker", { autoAlpha: 0, y: 28, skewX: -8 })
            .from(".gsap-hero-title", { autoAlpha: 0, y: 54, scale: 0.96 }, "-=0.5")
            .from(
              ".gsap-frequency span",
              {
                autoAlpha: 0,
                scaleY: 0.08,
                transformOrigin: "bottom",
                stagger: { amount: 0.5, from: "random" },
                duration: 0.7,
                ease: "expo.out",
              },
              "-=0.45"
            )
            .from(".gsap-hero-copy", { autoAlpha: 0, x: -42 }, "-=0.45")
            .from(".gsap-hero-actions > *", { autoAlpha: 0, y: 28, stagger: 0.08 }, "-=0.35")
            .from(".gsap-hero-character", { autoAlpha: 0, x: 70, y: 20, scale: 1.04 }, "-=0.75")
            .from(".gsap-hero-logo", { autoAlpha: 0, y: -24, rotation: -3, scale: 1.08 }, "-=0.75")
            .from(".gsap-hero-card", { autoAlpha: 0, x: 56, y: 26, rotation: 1.5 }, "-=0.55");

          gsap.to(".gsap-scan", {
            backgroundPosition: "0 70px",
            duration: 3.2,
            repeat: -1,
            ease: "none",
          });

          gsap.to(".gsap-frequency span", {
            scaleY: () => gsap.utils.random(0.25, 1.55),
            transformOrigin: "bottom",
            delay: 1.1,
            duration: () => gsap.utils.random(0.45, 1.15),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { each: 0.035, from: "random" },
          });

          gsap.to(".gsap-hologram", {
            xPercent: desktop ? 3 : 1.5,
            yPercent: desktop ? -4 : -2,
            scale: 1.04,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(".gsap-video", {
            scale: desktop ? 1.08 : 1.03,
            scrollTrigger: {
              trigger: ".gsap-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.to(".gsap-hero-card", {
            yPercent: desktop ? -18 : -7,
            rotation: desktop ? -2.5 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".gsap-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.to(".gsap-hero-character", {
            yPercent: desktop ? -8 : -3,
            xPercent: desktop ? 3 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".gsap-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.utils.toArray<HTMLElement>(".gsap-section-title").forEach((title) => {
            gsap.from(title, {
              autoAlpha: 0,
              y: 48,
              skewY: 2,
              duration: 0.75,
              scrollTrigger: {
                trigger: title,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          });

          ScrollTrigger.batch(".gsap-post-card", {
            start: "top 82%",
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 72, rotation: -1.5 },
                { autoAlpha: 1, y: 0, rotation: 0, duration: 0.75, stagger: 0.12, overwrite: true }
              );
            },
            onLeaveBack: (batch) => {
              gsap.to(batch, { autoAlpha: 0, y: 48, duration: 0.35, stagger: 0.04, overwrite: true });
            },
          });

          ScrollTrigger.batch(".gsap-note", {
            start: "top 88%",
            interval: 0.08,
            batchMax: 4,
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                { autoAlpha: 0, x: 64 },
                { autoAlpha: 1, x: 0, duration: 0.62, stagger: 0.08, overwrite: true }
              );
            },
            onLeaveBack: (batch) => {
              gsap.to(batch, { autoAlpha: 0, x: 42, duration: 0.28, overwrite: true });
            },
          });

          gsap.to(".gsap-notes-band", {
            xPercent: desktop ? -16 : -7,
            ease: "none",
            scrollTrigger: {
              trigger: ".gsap-notes-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.utils.toArray<HTMLElement>(".gsap-mode-card").forEach((card, index) => {
            gsap.fromTo(
              card,
              { y: index % 2 === 0 ? 42 : -30, rotation: index % 2 === 0 ? -1.5 : 1.5 },
              {
                y: index % 2 === 0 ? -18 : 18,
                rotation: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".gsap-modes",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          });

          if (desktop) {
            const modeTrack = document.querySelector<HTMLElement>(".gsap-mode-track");
            const modeViewport = document.querySelector<HTMLElement>(".gsap-mode-viewport");
            const modeSection = document.querySelector<HTMLElement>(".gsap-modes");

            if (modeTrack && modeViewport && modeSection) {
              gsap.to(modeTrack, {
                x: () => -Math.max(0, modeTrack.scrollWidth - modeViewport.clientWidth),
                ease: "none",
                scrollTrigger: {
                  trigger: modeSection,
                  start: "top top",
                  end: () => `+=${Math.max(720, modeTrack.scrollWidth - modeViewport.clientWidth + 560)}`,
                  pin: true,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });
            }
          }

          gsap.from(".gsap-newsletter", {
            autoAlpha: 0,
            y: 70,
            scale: 0.98,
            duration: 0.8,
            scrollTrigger: {
              trigger: ".gsap-newsletter",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to(".gsap-contact-strike", {
            scaleX: 1,
            duration: 0.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: ".gsap-newsletter",
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          });

          if (finePointer) {
            const glow = document.querySelector<HTMLElement>(".gsap-cursor-glow");
            const heroElement = document.querySelector<HTMLElement>(".gsap-hero");

            if (glow && heroElement) {
              const xTo = gsap.quickTo(glow, "x", { duration: 0.35, ease: "power3.out" });
              const yTo = gsap.quickTo(glow, "y", { duration: 0.35, ease: "power3.out" });
              const moveGlow = (event: PointerEvent) => {
                xTo(event.clientX);
                yTo(event.clientY);
              };
              const showGlow = () => gsap.to(glow, { autoAlpha: 1, scale: 1, duration: 0.25, overwrite: true });
              const hideGlow = () => gsap.to(glow, { autoAlpha: 0, scale: 0.72, duration: 0.3, overwrite: true });

              window.addEventListener("pointermove", moveGlow);
              heroElement.addEventListener("pointerenter", showGlow);
              heroElement.addEventListener("pointerleave", hideGlow);

              cleanups.push(() => {
                window.removeEventListener("pointermove", moveGlow);
                heroElement.removeEventListener("pointerenter", showGlow);
                heroElement.removeEventListener("pointerleave", hideGlow);
              });
            }

            gsap.utils.toArray<HTMLElement>(".gsap-post-card").forEach((card) => {
              const image = card.querySelector("img");
              const glint = card.querySelector<HTMLElement>(".gsap-card-glint");
              const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.42, ease: "power3.out" });
              const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.42, ease: "power3.out" });

              const moveCard = (event: PointerEvent) => {
                const rect = card.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width - 0.5;
                const relY = (event.clientY - rect.top) / rect.height - 0.5;

                rotateXTo(relY * -8);
                rotateYTo(relX * 9);
                gsap.to(card, { y: -12, duration: 0.35, overwrite: "auto" });

                if (image) {
                  gsap.to(image, {
                    x: relX * -14,
                    y: relY * -10,
                    scale: 1.08,
                    duration: 0.45,
                    overwrite: "auto",
                  });
                }

                if (glint) {
                  gsap.to(glint, {
                    xPercent: relX * 26,
                    yPercent: relY * 20,
                    autoAlpha: 1,
                    duration: 0.35,
                    overwrite: "auto",
                  });
                }
              };

              const leaveCard = () => {
                gsap.to(card, {
                  y: 0,
                  rotationX: 0,
                  rotationY: 0,
                  duration: 0.55,
                  ease: "power3.out",
                  overwrite: "auto",
                });

                if (image) {
                  gsap.to(image, { x: 0, y: 0, scale: 1, duration: 0.55, overwrite: "auto" });
                }

                if (glint) {
                  gsap.to(glint, { xPercent: 0, yPercent: 0, autoAlpha: 0, duration: 0.35, overwrite: "auto" });
                }
              };

              card.addEventListener("pointermove", moveCard);
              card.addEventListener("pointerleave", leaveCard);

              cleanups.push(() => {
                card.removeEventListener("pointermove", moveCard);
                card.removeEventListener("pointerleave", leaveCard);
              });
            });
          }

          requestAnimationFrame(() => ScrollTrigger.refresh());

          return () => {
            cleanups.forEach((cleanup) => cleanup());
          };
        }
      );

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return <span data-icey-gsap-effects className="hidden" aria-hidden="true" />;
}
