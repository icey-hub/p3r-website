"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("run");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animElements = footer.querySelectorAll(".animate");
    animElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer relative z-[99] px-[5%] pt-[50px] sm:pt-[80px] md:pt-[110px] pb-[40px] sm:pb-[55px] md:pb-[70px]"
    >
      {/* Footer Contents - 3 column layout */}
      <div className="footer-contents flex flex-col md:flex-row flex-wrap gap-6 md:gap-8 pt-[20px] sm:pt-[25px] md:pt-[30px] pb-[25px] sm:pb-[35px] md:pb-[45px]">
        {/* Column 1: Game Logo */}
        <div className="p3r-logo animate opacity-0 [&.run]:animate-[fadeInUp_0.8s_ease_0s_both]">
          <Image
            src="/images/img/common/logo_color_c0496c8e0a1e762a98ba0b21894eddcc.webp"
            alt="Persona 3 Reload"
            width={300}
            height={100}
            className="w-auto h-auto"
          />
        </div>

        {/* Column 2: Spec Table */}
        <div className="spec flex-1 min-w-0 md:min-w-[300px] animate opacity-0 [&.run]:animate-[fadeInUp_0.8s_ease_0.2s_both]">
          <h3 className="text-[14px] tracking-[0.3em] font-bold mb-6 font-[family-name:var(--font-syncopate)]">
            S P E C
          </h3>
          <table className="w-full table-fixed text-[13px] sm:text-[14px]">
            <tbody>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">遊戲名稱</td>
                <td className="py-2">女神異聞錄３ Reload</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">發售日期</td>
                <td className="py-2">好評發售中</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">遊戲分級</td>
                <td className="py-2">15+</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">遊戲類型</td>
                <td className="py-2">RPG</td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">建議售價</td>
                <td className="py-2">
                  普通盒裝版：台灣 1,890 NT$ / 香港 478 HKD
                  <br />
                  普通下載版：台灣 1,790 NT$ / 香港 438 HKD
                </td>
              </tr>
              <tr className="border-b border-white/20">
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">對應機種</td>
                <td className="py-2">
                  Xbox Series X|S / Xbox One / Windows / PlayStation 5 / PlayStation 4 / Steam
                </td>
              </tr>
              <tr>
                <td className="w-[7.5em] py-2 pr-3 font-bold align-top">對應語言</td>
                <td className="py-2">
                  PS5/PS4：語音日文，字幕韓文/繁中/簡中
                  <br />
                  Xbox/Windows/Steam：語音日文/英文，字幕多語言
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-[12px] leading-relaxed opacity-70">
            ※Xbox Series X|S、Xbox One、Windows、Steam僅販售下載版
            <br />
            ※PS4版可免費升級至PS5版
            <br />
            ※本遊戲情節涉及性,暴力,菸酒
          </p>
        </div>

        {/* Column 3: Links */}
        <div className="links min-w-[200px] animate opacity-0 [&.run]:animate-[fadeInUp_0.8s_ease_0.4s_both]">
          <h3 className="text-[14px] tracking-[0.3em] font-bold mb-6 font-[family-name:var(--font-syncopate)]">
            L I N K S
          </h3>
          <div className="link-items flex flex-col gap-3">
            <a
              href="https://www.youtube.com/user/SEGAasia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] hover:underline underline-offset-4 transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.facebook.com/Atlus.cht/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] hover:underline underline-offset-4 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Platform & Official Logos */}
      <div className="logos flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 sm:gap-6 mt-6 sm:mt-8">
        <div className="platforms flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
          <Image
            src="/images/img/common/xbox_xs_logo_716872195e3289c9541e980c543ef82a.webp"
            alt="XBOX SERIES X|S"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <Image
            src="/images/img/common/xbox_one_logo_81ff2c384596af3177ba3018ccfa7b48.webp"
            alt="XBOX ONE"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <Image
            src="/images/img/common/windows_logo_2149d9c4adabcad6a7f8534d96ba1a6d.webp"
            alt="Windows"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <Image
            src="/images/img/common/ps5_ps4_logo_edcdc8392c0fd9286e1187e973d21b89.webp"
            alt="PS5|PS4"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
          <Image
            src="/images/img/common/steam_logo_f359fba372b69c152feb76e4e2203d7a.webp"
            alt="STEAM"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
        </div>
        <div className="official flex items-center gap-4">
          <a
            href="https://www.atlus.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="atlus-logo"
          >
            <Image
              src="/images/img/common/atlus_logo_853c96f1dd3f1de2b369be4f9dd38b47.webp"
              alt="ATLUS"
              width={80}
              height={30}
              className="h-[30px] w-auto object-contain"
            />
          </a>
          <Image
            src="/images/img/common/p_studio_logo_309f72dd4c41c3616cc1eb2b576c2561.webp"
            alt="P-STUDIO"
            width={80}
            height={30}
            className="h-[30px] w-auto object-contain"
          />
        </div>
      </div>

      {/* Copyright */}
      <p className="copyright mt-8 text-[12px] text-center leading-relaxed opacity-70">
        <a
          href="https://www.sega.co.jp/tc/privacypolicy/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="license hover:underline mx-2"
        >
          Privacy policy
        </a>
        <a
          href="https://asia.sega.com/p3r/cht/license/"
          target="_blank"
          rel="noopener noreferrer"
          className="license hover:underline mx-2"
        >
          版權
        </a>
        <span className="mx-2">
          &copy;ATLUS &copy;SEGA All rights reserved.
        </span>
      </p>
    </footer>
  );
}
