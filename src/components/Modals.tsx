"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import Image from "next/image";

// ─── Context ────────────────────────────────────────────────────────────────

type ModalType = "feature" | "game-system" | null;

interface ModalContextValue {
  openModal: (type: NonNullable<ModalType>) => void;
  closeModal: () => void;
  activeModal: ModalType;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [launchOpen, setLaunchOpen] = useState(true);

  const openModal = useCallback((type: NonNullable<ModalType>) => {
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Lock body scroll when a modal is open
  useEffect(() => {
    if (activeModal) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [activeModal]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && activeModal) {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
      {children}
      {launchOpen && <LaunchModal onClose={() => setLaunchOpen(false)} />}
      <ModalsOverlay />
    </ModalContext.Provider>
  );
}

function LaunchModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/35 px-[6vw]"
      role="dialog"
      aria-modal="true"
      aria-label="Nintendo Switch 2 announcement"
    >
      <div className="relative w-full max-w-[min(1110px,calc(100vw-32px))]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close announcement"
          className="absolute right-4 top-4 z-10 h-[34px] w-[34px] border-0 bg-transparent p-0 cursor-pointer sm:right-7 sm:top-7"
        >
          <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-white" />
          <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-white" />
        </button>
        <a
          href="https://asia.sega.com/p3r/cht/switch2/"
          className="block overflow-hidden rounded-[12px] shadow-[0_25px_60px_rgba(0,0,0,0.32)]"
        >
          <Image
            src="/images/top/lp_modal/lp_image_0ebaecb59715564edca43d646973c6c9.png"
            alt="Nintendo Switch 2 版好評發售中"
            width={1110}
            height={622}
            priority
            className="hidden max-h-[calc(100svh-48px)] w-full object-contain sm:block"
          />
          <Image
            src="/images/top/lp_modal/lp_image_sp_012a31f2aec1640a380c932707a0163a.png"
            alt="Nintendo Switch 2 版好評發售中"
            width={650}
            height={940}
            priority
            className="block max-h-[calc(100svh-48px)] w-full object-contain sm:hidden"
          />
        </a>
      </div>
    </div>
  );
}

// ─── Shared Overlay ─────────────────────────────────────────────────────────

function ModalsOverlay() {
  const { activeModal, closeModal } = useModal();

  return (
    <>
      {activeModal === "feature" && <FeatureModal onClose={closeModal} />}
      {activeModal === "game-system" && <GameSystemModal onClose={closeModal} />}
    </>
  );
}

// ─── Close Button ───────────────────────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close modal"
      style={{
        position: "absolute",
        top: 37,
        right: 37,
        width: 30,
        height: 30,
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <Image
        src="/images/img/common/modal_close_6eebb1c694aba083fc06c16e60ff4b7e.png"
        alt="Close"
        width={30}
        height={30}
        style={{ display: "block" }}
      />
    </button>
  );
}

// ─── Modal Base Wrapper ─────────────────────────────────────────────────────

function ModalBase({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-up animation on next frame
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(onClose, 800);
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100svh",
        zIndex: 99999,
        overflow: "auto",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100svh",
          backgroundColor: "#1D384A",
          color: "#fff",
          top: visible ? 0 : "100svh",
          transition: "top 0.8s ease-in-out",
        }}
      >
        <CloseButton onClick={handleClose} />
        {children}
      </div>
    </div>
  );
}

// ─── Feature Modal ──────────────────────────────────────────────────────────

function FeatureModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase onClose={onClose}>
      <div
        style={{
          maxWidth: "min(1100px, calc(100vw - 32px))",
          margin: "0 auto",
          padding: "clamp(72px, 8vw, 100px) clamp(18px, 4vw, 40px) clamp(56px, 7vw, 80px)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: "clamp(34px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
            lineHeight: 1.1,
          }}
        >
          Features
        </h2>

        <div
          style={{
            width: 80,
            height: 3,
            backgroundColor: "#5BA4D6",
            marginBottom: 50,
          }}
        />

        {/* Screenshot */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 960,
            margin: "0 auto 60px",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src="/images/img/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png"
            alt="Persona 3 Reload Features"
            width={960}
            height={540}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Description */}
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 24,
              fontFamily: "var(--font-noto-sans-tc), Noto Sans TC, sans-serif",
            }}
          >
            Persona 3 Reload brings a complete visual overhaul with stunning
            modernized graphics powered by Unreal Engine. Every character model,
            environment, and Persona has been meticulously rebuilt from the ground
            up while staying faithful to the beloved original.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 24,
              fontFamily: "var(--font-noto-sans-tc), Noto Sans TC, sans-serif",
            }}
          >
            The enhanced UI provides a sleek, intuitive interface that streamlines
            both daily life activities and combat encounters. New quality-of-life
            improvements include streamlined menus, improved map navigation, and
            an updated calendar system.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 50,
              fontFamily: "var(--font-noto-sans-tc), Noto Sans TC, sans-serif",
            }}
          >
            Experience the Dark Hour like never before with fully voiced social
            links, expanded story content, and new combat mechanics including the
            Shift system that adds deeper tactical options to every encounter.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="/features/"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              border: "2px solid #fff",
              color: "#fff",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#1D384A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Learn More
          </a>
        </div>
      </div>
    </ModalBase>
  );
}

// ─── Game System Modal ──────────────────────────────────────────────────────

function GameSystemModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase onClose={onClose}>
      <div
        style={{
          maxWidth: "min(1100px, calc(100vw - 32px))",
          margin: "0 auto",
          padding: "clamp(72px, 8vw, 100px) clamp(18px, 4vw, 40px) clamp(56px, 7vw, 80px)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: "clamp(34px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
            lineHeight: 1.1,
          }}
        >
          Game System
        </h2>

        <div
          style={{
            width: 80,
            height: 3,
            backgroundColor: "#5BA4D6",
            marginBottom: 50,
          }}
        />

        {/* Screenshot */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 960,
            margin: "0 auto 60px",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src="/images/img/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg"
            alt="Persona 3 Reload Game System"
            width={960}
            height={540}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* System Descriptions */}
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: 40,
          }}
        >
          <SystemCard
            title="Combat System"
            description="Master the all-out attack and exploit enemy weaknesses with the refined Press Turn system. The new Shift mechanic lets you swap party members mid-battle for devastating combo chains."
          />
          <SystemCard
            title="Tartarus Exploration"
            description="Explore the ever-changing tower of Tartarus with improved procedurally generated floors. New traversal mechanics and hidden areas reward thorough exploration."
          />
          <SystemCard
            title="Social Links"
            description="Deepen your bonds with classmates and townspeople through fully voiced Social Link events. Your relationships directly impact your combat abilities through Persona fusion bonuses."
          />
          <SystemCard
            title="Dorm Life"
            description="Manage your daily schedule between school, part-time jobs, and spending time with SEES teammates at the Iwatodai Dorm. Every choice shapes your journey through the Dark Hour."
          />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <a
            href="/game-system/"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              border: "2px solid #fff",
              color: "#fff",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#1D384A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Learn More
          </a>
        </div>
      </div>
    </ModalBase>
  );
}

// ─── System Card ────────────────────────────────────────────────────────────

function SystemCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div style={{ padding: "24px 0" }}>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 12,
          color: "#5BA4D6",
          fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.8)",
          fontFamily: "var(--font-noto-sans-tc), Noto Sans TC, sans-serif",
        }}
      >
        {description}
      </p>
    </div>
  );
}
