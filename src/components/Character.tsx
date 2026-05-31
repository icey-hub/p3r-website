"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CharacterModal from "./CharacterModal";

interface CharacterData {
  name: string;
  on: string;
  off: string;
  bg: string;
  modalBg: string;
  title: string;
  profile: string;
}

const SEES_CHARACTERS: CharacterData[] = [
  { name: "Hero", on: "character1_badbd990dcbabe1f25c22de113f772a0.webp", off: "character1_off_c6e5fcab1669dd9cf66e96a871af304d.webp", bg: "rgb(134, 237, 252)", modalBg: "rgb(131, 233, 248)", title: "S.E.E.S. Leader", profile: "The protagonist of Persona 3 Reload. A transfer student who discovers the power of Persona during the Dark Hour. As the leader of S.E.E.S., he wields the unique ability to switch between multiple Personas, guiding his allies in their battle against the Shadows." },
  { name: "Yukari", on: "character2_35a3dc87ea1a02e2e3d6397d46e1cbf9.webp", off: "character2_off_ae2353448bb0b41a6d4bcee128ce7dd1.webp", bg: "rgb(252, 147, 255)", modalBg: "rgb(248, 143, 255)", title: "S.E.E.S. Member", profile: "A second-year student at Gekkoukan High School and member of S.E.E.S. Yukari wielded the Persona Io, specializing in healing and wind-based attacks. Her father was involved in the Kirijo Group's experiments, driving her determination to uncover the truth." },
  { name: "Junpei", on: "character3_cd155bb1faff87558813a0054f0f9436.webp", off: "character3_off_dce3dd1daf8a4d76ef754c63c526bf14.webp", bg: "rgb(152, 159, 251)", modalBg: "rgb(148, 155, 247)", title: "S.E.E.S. Member", profile: "The protagonist's best friend and classmate at Gekkoukan High. Junpei is cheerful and loyal, wielding the Persona Hermes. Despite his lighthearted exterior, he struggles with finding his purpose and grows significantly through his journey with S.E.E.S." },
  { name: "Akihiko", on: "character4_b11ad41cb7a01fef1d40aeb65d002471.webp", off: "character4_off_f3f7ad24a2724e732efa3f4f0b2638ed.webp", bg: "rgb(211, 218, 218)", modalBg: "rgb(207, 214, 214)", title: "S.E.E.S. Member", profile: "A third-year student and boxing champion at Gekkoukan High. Akihiko is a veteran member of S.E.E.S. who commands the Persona Polydeuces, specializing in physical and lightning attacks. He is driven by a desire to become stronger to protect those he cares about." },
  { name: "Mitsuru", on: "character5_fa07d2d06f3925eea4af9a91937506ba.webp", off: "character5_off_b487aeaab9cacea5f6d5d992f302edad.webp", bg: "rgb(246, 140, 168)", modalBg: "rgb(242, 136, 164)", title: "S.E.E.S. Leader", profile: "The elegant and intelligent daughter of the Kirijo Group's chairman. Mitsuru is a third-year student and the student council president. She wields the Persona Penthesilea and serves as the field leader of S.E.E.S., using her ice abilities and strategic mind." },
  { name: "Fuka", on: "character6_0e3115e9f6076da20973ac40ef045866.webp", off: "character6_off_7dad6fb4313cd40fea86ab9dc1b5ec3a.webp", bg: "rgb(149, 245, 220)", modalBg: "rgb(145, 241, 216)", title: "S.E.E.S. Navigator", profile: "A shy first-year student who serves as the navigator for S.E.E.S. during battles. Fuuka possesses the Persona Lucia, which provides invaluable support through enemy analysis, field scanning, and tactical guidance for her teammates." },
  { name: "Koromaru", on: "character7_532c5a12d64704763e5cac354fb3874c.webp", off: "character7_off_55056899b01c4bcd7bd1d9bcb3ecfa6a.webp", bg: "rgb(242, 244, 242)", modalBg: "rgb(242, 244, 242)", title: "S.E.E.S. Member", profile: "A remarkably intelligent Shiba Inu dog who is a loyal member of S.E.E.S. Koromaru can summon a Persona, making him a unique and invaluable companion. He is fiercely devoted to protecting his friends and fights alongside them against the Shadows." },
  { name: "Aegis", on: "character8_790cb89b62931cfe93f16d61c746464d.webp", off: "character8_off_3f02f0728d931c41cfa70de58e96ef83.webp", bg: "rgb(250, 246, 166)", modalBg: "rgb(250, 246, 166)", title: "S.E.E.S. Member", profile: "An anti-Shadow combat android created by the Kirijo Group. Aigis possesses the Persona Palladion and specializes in physical attacks and support. Over time, she develops human emotions and forms deep bonds with her S.E.E.S. companions." },
  { name: "Ken", on: "character9_a298bc6fd82a5d83fd4c04fa9c031f4f.webp", off: "character9_off_dc21e770c325edf90d9913721b8c4429.webp", bg: "rgb(250, 186, 128)", modalBg: "rgb(250, 186, 128)", title: "S.E.E.S. Member", profile: "An elementary school student and the youngest member of S.E.E.S. Ken joined the team driven by a personal vendetta. He wields the Persona Nemesis and demonstrates remarkable maturity and courage despite his young age." },
  { name: "Shinjiro", on: "character10_a301f968f599f0c8c5556d55da608f2d.webp", off: "character10_off_9beae43b67d90f05dbcd4b5c0b8ddea7.webp", bg: "rgb(206, 137, 152)", modalBg: "rgb(206, 137, 152)", title: "S.E.E.S. Member", profile: "A former S.E.E.S. member who left the group after a tragic incident. Shinjiro is a tough and brooding individual who wields the Persona Castor. Despite his rough exterior, he cares deeply for his friends and seeks redemption for past mistakes." },
];

const STREGA_CHARACTERS: CharacterData[] = [
  { name: "Takaya", on: "character11_4d8a7c2345cbb892172a28b62e258bd6.webp", off: "character11_off_baa1b252d3fed97cf47eed2e73a3e5c8.webp", bg: "rgb(147, 204, 150)", modalBg: "rgb(147, 204, 150)", title: "STREGA Leader", profile: "The charismatic and enigmatic leader of STREGA, a group that operates during the Dark Hour. Takaya is a formidable Persona user who embraces the power of the Shadows, viewing the Dark Hour as liberation rather than a threat." },
  { name: "Jin", on: "character12_f2b86e413b00e552aeca9b0960ca96d6.webp", off: "character12_off_8cc7ad1e47b92b0c15373879c66d14a3.webp", bg: "rgb(147, 204, 150)", modalBg: "rgb(147, 204, 150)", title: "STREGA Member", profile: "The technical expert and strategist of STREGA. Jin provides tactical support and intelligence for the group's operations. He is fiercely loyal to Takaya and shares STREGA's philosophy about the Dark Hour's potential." },
  { name: "Chidori", on: "character13_c47bbc2365b7492613827dd458c56138.webp", off: "character13_off_26b55d7b4417aee2b8b0f25e7adbc2bc.webp", bg: "rgb(147, 204, 150)", modalBg: "rgb(147, 204, 150)", title: "STREGA Member", profile: "A mysterious and artistic member of STREGA who possesses the Persona Medea. Chidori is an enigmatic figure with the ability to draw the future. Her complex relationship with Junpei reveals unexpected depths beneath her stoic exterior." },
];

const DEFAULT_BG = "rgb(91, 164, 215)";

export default function Character() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLUListElement>(null);
  const [bgColor, setBgColor] = useState(DEFAULT_BG);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);

  // IntersectionObserver for .run class animation triggers
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("run");
          }
        });
      },
      { threshold: 0.2 }
    );

    const animElements = section.querySelectorAll(
      ".chara-title, .chara-title2, .chara-text p span, .chara-text2 p span, .chara-list"
    );
    animElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll-driven horizontal carousel
  useEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;
    if (!section || !carousel) return;

    const allCharacters = [...SEES_CHARACTERS, ...STREGA_CHARACTERS];

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the section
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return;

      const scrollRange = Math.max(1, sectionHeight - windowHeight);
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / scrollRange));

      // Translate carousel horizontally
      const viewportWidth = section.clientWidth || window.innerWidth;
      const carouselWidth = Math.max(0, carousel.scrollWidth - viewportWidth);
      const translateX = -scrollProgress * carouselWidth;
      carousel.style.transform = `translateX(${translateX}px)`;

      // Determine which character slide is currently in view
      const slides = carousel.querySelectorAll(".chara-slide");
      const slideWidth = slides.length > 0 ? (slides[0] as HTMLElement).offsetWidth : 674;
      const currentSlideIndex = Math.round(Math.abs(translateX) / slideWidth);

      // Update background color based on active character
      // Offset by 2 to account for the two text-box slides before character slides
      const charIndex = currentSlideIndex - 2;
      if (charIndex >= 0 && charIndex < allCharacters.length) {
        setBgColor(allCharacters[charIndex].bg);
        setActiveIndex(charIndex);
      } else {
        setBgColor(DEFAULT_BG);
        setActiveIndex(-1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleCharacterClick = (character: CharacterData) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section
      id="character"
      ref={sectionRef}
      className="chara relative h-[clamp(560px,100svh,960px)] overflow-hidden"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease-out",
      }}
    >
      <ul
        ref={carouselRef}
        className="chara-carousel flex flex-row items-center absolute top-0 bottom-0 left-0 h-full will-change-transform"
      >
        {/* S.E.E.S. Intro Text Box */}
        <li className="chara-text-box mr-[clamp(24px,7vw,105px)] pl-[clamp(24px,8vw,120px)] w-[clamp(320px,64vw,824px)] h-[clamp(260px,30vw,387px)] shrink-0 flex flex-col justify-center">
          <h2 className="chara-title w-[clamp(270px,55vw,704px)] h-auto">
            <span className="sr-only">S.E.E.S.</span>
            <svg
              viewBox="0 0 747.37 211.14"
              className="w-full h-full"
              aria-hidden="true"
            >
              <text
                x="0"
                y="170"
                fill="white"
                fontFamily="var(--font-syncopate), sans-serif"
                fontSize="200"
                fontWeight="700"
                className="transition-all duration-1000 ease-out opacity-0 translate-y-[110px] [&.run]:opacity-100 [&.run]:translate-y-0"
              >
                S.E.E.S.
              </text>
            </svg>
          </h2>
          <div className="chara-text text-white text-[13px] sm:text-[14px] md:text-[15px] leading-[22px] sm:leading-[24px] md:leading-[26px]">
            <p>
              <span className="l1 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0s_both]">
                An aggregation vigilantly chosen to
              </span>
            </p>
            <p>
              <span className="l2 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0.3s_both]">
                vanquish the Shadows, will face Destiny.
              </span>
            </p>
            <p>
              <span className="l3 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0.6s_both]">
                Time won&apos;t wait for you, Destiny won&apos;t change for you.
              </span>
            </p>
          </div>
        </li>

        {/* S.E.E.S. Character List */}
        <li className="shrink-0">
          <ul className="chara-list flex flex-row opacity-0 [&.run]:animate-[fadeInRight_1s_ease_0s_both]">
            {SEES_CHARACTERS.map((char, i) => (
              <CharacterSlide
                key={char.name}
                character={char}
                isActive={activeIndex === i}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </ul>
        </li>

        {/* STREGA Intro Text Box */}
        <li className="chara-text-box mr-[clamp(24px,7vw,105px)] pl-[clamp(24px,8vw,120px)] w-[clamp(320px,64vw,824px)] h-[clamp(260px,30vw,387px)] shrink-0 flex flex-col justify-center">
          <h2 className="chara-title2 w-[clamp(270px,55vw,704px)] h-auto">
            <span className="sr-only">STREGA</span>
            <svg
              viewBox="0 0 1042.94 211.14"
              className="w-full h-full"
              aria-hidden="true"
            >
              <text
                x="0"
                y="170"
                fill="white"
                fontFamily="var(--font-syncopate), sans-serif"
                fontSize="200"
                fontWeight="700"
                className="transition-all duration-1000 ease-out opacity-0 translate-y-[110px] [&.run]:opacity-100 [&.run]:translate-y-0"
              >
                STREGA
              </text>
            </svg>
          </h2>
          <div className="chara-text2 text-white text-[13px] sm:text-[14px] md:text-[15px] leading-[22px] sm:leading-[24px] md:leading-[26px]">
            <p>
              <span className="l1 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0s_both]">
                每一天的夾縫之間存在著一般人無法察覺的時間「影時間」，
              </span>
            </p>
            <p>
              <span className="l2 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0.3s_both]">
                「史特雷加」就是利用這個「影時間」承接他人復仇委託的集團。
              </span>
            </p>
            <p>
              <span className="l3 inline-block opacity-0 [&.run]:animate-[fadeInText2_1s_ease-out_0.6s_both]">
                他們出現在追查影時間之謎的主人公們所屬的S.E.E.S.前，處於敵對狀態。
              </span>
            </p>
          </div>
        </li>

        {/* STREGA Character List */}
        <li className="shrink-0">
          <ul className="chara-list strega flex flex-row opacity-0 [&.run]:animate-[fadeInRight_1s_ease_0s_both]">
            {STREGA_CHARACTERS.map((char, i) => (
              <CharacterSlide
                key={char.name}
                character={char}
                isActive={activeIndex === SEES_CHARACTERS.length + i}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </ul>
        </li>
      </ul>

      {/* Character Detail Modal */}
      <CharacterModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </section>
  );
}

function CharacterSlide({
  character,
  isActive,
  onClick,
}: {
  character: CharacterData;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li className="chara-slide flex w-[clamp(250px,52vw,674px)] h-[clamp(500px,70svh,656px)] shrink-0 cursor-pointer flex-col justify-center px-[clamp(24px,7vw,100px)]" onClick={onClick}>
      <div
        className={`chara-image relative overflow-hidden w-[clamp(210px,42vw,520px)] h-[clamp(360px,72svh,720px)] max-h-[82%] transition-transform duration-500 hover:scale-110 ${isActive ? "active" : ""}`}
      >
        <div
          className={`on absolute inset-0 transition-opacity duration-500 ${isActive ? "z-5 opacity-100" : "z-1 opacity-0"}`}
        >
          <Image
            src={`/images/img/top/${character.on}`}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 474px"
          />
        </div>
        <div
          className={`off absolute inset-0 transition-opacity duration-500 ${isActive ? "z-1 opacity-0" : "z-5 opacity-100"}`}
        >
          <Image
            src={`/images/img/top/${character.off}`}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 474px"
          />
        </div>
      </div>
      <div className="chara-name flex items-center mt-2 text-[14px] sm:text-[15px] md:text-[16px] text-[rgb(29,56,74)]">
        {character.name}
        <span className="arrow ml-2 inline-block w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 hover:translate-x-1">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </span>
      </div>
    </li>
  );
}
