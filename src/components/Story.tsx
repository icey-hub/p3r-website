"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

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

    // Observe images and buttons for fade-in
    const fadeElements = section.querySelectorAll(
      ".story-img, .more-btn, .game-system-btn"
    );
    fadeElements.forEach((el) => observer.observe(el));

    // Observe individual slogan lines for staggered animation
    const lineElements = section.querySelectorAll(".story-text3 .l1, .story-text3 .l2, .story-text3 .l3");
    lineElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="story relative w-full mx-auto"
      style={{ backgroundColor: "rgb(192, 213, 232)" }}
    >
      <div className="story-contents pt-[80px] sm:pt-[120px] md:pt-[195px]">
        {/* Introduction Block - image left, text right */}
        <div className="introduction flex flex-col md:flex-row justify-end w-full">
          <div className="story-img introduction-img relative overflow-hidden w-full md:w-[52%] h-[250px] sm:h-[320px] md:h-[425px] opacity-0 transition-opacity duration-500 ease-in-out [&.run]:opacity-100">
            <div
              className="v-pc w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png)",
              }}
            />
            <div
              className="v-sp hidden w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png)",
              }}
            />
          </div>
          <div className="story-text-box introduction-text w-full md:w-[48%] pt-[30px] sm:pt-[40px] md:pt-[56px] px-4 sm:pr-6 md:pr-8 md:pl-5 pb-8 md:pb-0">
            <h3 className="introduction-title w-full max-w-[365px] mb-0">
              <svg
                viewBox="0 0 365 56.3"
                className="w-full h-auto"
                aria-label="Introduction"
              >
                <text
                  x="0"
                  y="45"
                  fill="rgb(29, 56, 74)"
                  fontFamily="var(--font-syncopate), sans-serif"
                  fontSize="48"
                  fontWeight="700"
                >
                  Introduction
                </text>
              </svg>
            </h3>
            <p className="story-text1 mt-[20px] sm:mt-[28px] md:mt-[35px] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] text-[rgb(29,56,74)]">
              少年主人公轉入位於港區港灣人工島的月光館學園高中部就讀，
              <br className="hidden sm:block" />
              在某次遭到怪物襲擊的契機之下，意外的使潛藏的心靈力量「人格面具」覺醒。
              <br className="hidden sm:block" />
              他加入了「特別課外活動部」（S.E.E.S.），
              <br className="hidden sm:block" />
              和夥伴們一同討伐「影時間」中出現的神祕怪物「陰影」，持續不懈地戰鬥。
              <br className="hidden sm:block" />
              究竟最後等待著他的會是什麼樣的命運……
            </p>
          </div>
        </div>

        {/* Features Block - image right, text left */}
        <div className="features flex flex-col-reverse md:flex-row w-full mt-[60px] sm:mt-[100px] md:mt-[162px]">
          <div className="story-text-box features-text w-full md:w-[45%] pt-[30px] sm:pt-[31px] px-4 sm:pr-5 md:mr-[5%] pb-8 md:pb-0">
            <h3 className="features-title w-full max-w-[248px] mb-0">
              <svg
                viewBox="0 0 248 53"
                className="w-full h-auto"
                aria-label="Features"
              >
                <text
                  x="0"
                  y="42"
                  fill="rgb(29, 56, 74)"
                  fontFamily="var(--font-syncopate), sans-serif"
                  fontSize="48"
                  fontWeight="700"
                >
                  Features
                </text>
              </svg>
            </h3>
            <p className="story-text2 mt-[30px] sm:mt-[45px] md:mt-[65px] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] text-[rgb(29,56,74)]">
              提升了遊戲操作性，包含使用者介面在內，遊戲整體變得對玩家更加友善等等，在許多細節上進行了更易於遊玩的調整。
              <br className="hidden sm:block" />
              藉由最新的遊戲機種，將「那份感動」更加鮮明地重新喚起！
            </p>
            <a
              href="https://asia.sega.com/p3r/cht/#"
              className="more-btn block mt-[30px] sm:mt-[40px] md:mt-[58px] opacity-0 transition-opacity duration-500 ease-in-out [&.run]:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/img/top/more_btn_ff987f7519c7ea0308d5e576cc7a493d.webp"
                alt="關於本作品的特色"
                width={388}
                height={73}
                className="w-full max-w-[388px] h-auto"
              />
            </a>
          </div>
          <div className="story-img features-img relative overflow-hidden w-full md:w-[50%] h-[250px] sm:h-[320px] md:h-[425px] opacity-0 transition-opacity duration-500 ease-in-out [&.run]:opacity-100">
            <div
              className="v-pc w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png)",
              }}
            />
            <div
              className="v-sp hidden w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png)",
              }}
            />
          </div>
        </div>

        {/* Game System Block - image left, text right */}
        <div className="game-system flex flex-col md:flex-row justify-end w-full mt-[60px] sm:mt-[100px] md:mt-[162px]">
          <div className="story-img game-system-img relative overflow-hidden w-full md:w-[52%] h-[250px] sm:h-[320px] md:h-[425px] opacity-0 transition-opacity duration-500 ease-in-out [&.run]:opacity-100">
            <div
              className="v-pc w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg)",
              }}
            />
            <div
              className="v-sp hidden w-full h-full bg-cover bg-[position:50%_0%]"
              style={{
                backgroundImage:
                  "url(/images/img/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg)",
              }}
            />
          </div>
          <div className="story-text-box game-system-text w-full md:w-[48%] pt-[30px] sm:pt-[31px] px-4 sm:pr-5 sm:pl-5 pb-8 md:pb-0">
            <h3 className="game-system-title w-full max-w-[365px] mb-0">
              <svg
                viewBox="0 0 365 66.7"
                className="w-full h-auto"
                aria-label="Game System"
              >
                <text
                  x="0"
                  y="52"
                  fill="rgb(29, 56, 74)"
                  fontFamily="var(--font-syncopate), sans-serif"
                  fontSize="48"
                  fontWeight="700"
                >
                  Game System
                </text>
              </svg>
            </h3>
            <p className="story-text4 mt-[30px] sm:mt-[50px] md:mt-[72px] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] text-[rgb(29,56,74)]">
              將原作的優點保留下來，讓《女神異聞錄３》的遊戲體驗更加舒適。
              <br className="hidden sm:block" />
              戰鬥系統變得更加爽快，藉由全新圖像表現與機關設計等等，
              <br className="hidden sm:block" />
              讓塔耳塔羅斯變得更加易於探索。宿舍生活與社群也有所進化！
            </p>
            <a
              href="https://asia.sega.com/p3r/cht/#"
              className="game-system-btn block mt-[30px] sm:mt-[40px] md:mt-[52px] opacity-0 transition-opacity duration-500 ease-in-out [&.run]:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/img/top/game_system_btn_93b79219b6b23d84aac594bf2c413d61.webp"
                alt="詳細遊戲系統"
                width={389}
                height={73}
                className="w-full max-w-[389px] h-auto"
              />
            </a>
          </div>
        </div>

        {/* Bottom Slogan */}
        <div className="story-text3 relative w-full h-[60px] mt-[80px] sm:mt-[120px] md:mt-[157px] mb-[50px] sm:mb-[70px] md:mb-[95px] z-5">
          <p className="l1 absolute top-[34px] text-[11px] sm:text-[12px] leading-[27.6px] tracking-[0.8px] text-[rgb(29,56,74)] opacity-0 [&.run]:animate-[fadeInText1_1s_ease-out_0.5s_both]">
            &quot;Time won&apos;t wait for you,&quot;
          </p>
          <p className="l2 absolute top-[34px] text-[11px] sm:text-[12px] leading-[27.6px] tracking-[0.8px] text-[rgb(29,56,74)] opacity-0 [&.run]:animate-[fadeInText1_1s_ease-out_0.8s_both]">
            &quot;Destiny won&apos;t change for you.&quot;
          </p>
          <p className="l3 absolute top-[34px] text-[11px] sm:text-[12px] leading-[27.6px] tracking-[0.8px] text-[rgb(29,56,74)] opacity-0 [&.run]:animate-[fadeInText1_1s_ease-out_1.1s_both]">
            &quot;You must make a choice.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
