"use client";

import { useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";

type Tab = "package" | "download";

const platformButtons = [
  { src: ASSETS.xboxBtn, alt: "Xbox" },
  { src: ASSETS.windowsBtn, alt: "Windows" },
  { src: ASSETS.psBtn, alt: "PlayStation" },
  { src: ASSETS.steamBtn, alt: "Steam" },
];

const packageItems = [
  {
    title: "S.E.E.S. 制式戰鬥服臂章",
    body: "完全重現新設計的S.E.E.S.臂章！只能藉由此管道獲得的豪華臂章。",
  },
  {
    title: "PERSONA3 RELOAD ART BOOK",
    body: "大量收錄本作品美術相關資料，包括角色插圖、設定畫、背景美術資料等內容。",
  },
  {
    title: "Original Sound Track",
    body: "收錄ATLUS Sound Team為本作品製作的樂曲，總計60首樂曲、2張CD套組。",
  },
  {
    title: "P4G DLC 套組",
    body: "八十神高級中學服裝套組與P4G人格面具套組DLC。",
  },
];

const digitalPremiumItems = [
  "P5R怪盜團服裝套組",
  "P5R秀盡學園高校服裝套組",
  "P5R人格面具套組1",
  "P5R人格面具套組2",
  "P5R BGM套組",
  "P4G八十神高級中學服裝套組",
];

function PlatformButtons() {
  return (
    <div className="grid grid-cols-2 gap-[8px] sm:flex sm:flex-wrap sm:gap-[10px]">
      {platformButtons.map((platform) => (
        <a
          key={platform.alt}
          href="/stores/"
          className="relative block h-[37px] w-full overflow-hidden transition-opacity hover:opacity-75 sm:h-[55px] sm:w-[148px] lg:w-[295px]"
        >
          <Image src={platform.src} alt={platform.alt} fill className="object-contain" />
        </a>
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[#1d384a] text-[24px] sm:text-[32px] md:text-[43px] font-black leading-tight tracking-[0.01em]"
      style={{ fontFamily: "var(--font-urbanist), 'Noto Sans TC', sans-serif" }}
    >
      {children}
    </h3>
  );
}

function Price({ tw, hk }: { tw: string; hk: string }) {
  return (
    <p
      className="mt-3 text-[#1d384a] text-[15px] sm:text-[18px] md:text-[24px] font-black"
      style={{ fontFamily: "var(--font-urbanist), 'Noto Sans TC', sans-serif" }}
    >
      台灣 {tw} / 香港 {hk}
    </p>
  );
}

function ItemList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="border-t border-[#1d384a]/25 pt-3">
          <h4 className="text-[#1d384a] text-[14px] sm:text-[16px] font-black leading-snug">
            {item.title}
          </h4>
          <p className="mt-1 text-[#1d384a] text-[12px] sm:text-[13px] leading-[1.7]">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function LimitedBox() {
  return (
    <article className="pb-[66px]">
      <SectionTitle>
        數量有限
        <br />
        PERSONA3 RELOAD LIMITED BOX
      </SectionTitle>
      <p className="mt-3 text-[#1d384a] text-[14px] sm:text-[18px] font-bold">
        內含粉絲必須收藏的物品，數量有限的豪華版！
      </p>
      <Price tw="2,590 NT$" hk="648 HKD" />
      <div className="mt-8 grid gap-8 md:grid-cols-[48%_1fr] md:items-start">
        <Image
          src={ASSETS.productLimitedBox}
          alt="PERSONA3 RELOAD LIMITED BOX"
          width={1200}
          height={675}
          className="w-full"
        />
        <ItemList items={packageItems} />
      </div>
      <p className="mt-5 text-[12px] leading-[1.7] text-[#1d384a]/75">
        ※數量有限，售完即止。※圖像均為製作中的示意圖，內容有可能未經預告進行變更。
      </p>
    </article>
  );
}

function AigisEdition() {
  return (
    <article className="border-t border-[#1d384a]/20 py-[66px]">
      <SectionTitle>
        數量有限
        <br />
        PERSONA3 RELOAD: Aigis Edition
      </SectionTitle>
      <p className="mt-3 text-[#1d384a] text-[14px] sm:text-[18px] font-bold">
        限定版內附穿戴S.E.E.S.制式戰鬥服臂章的「埃癸斯」模型！
      </p>
      <Price tw="2,590 NT$" hk="648 HKD" />
      <div className="mt-8 grid gap-8 md:grid-cols-[38%_1fr] md:items-center">
        <Image
          src={ASSETS.productAegisFigure}
          alt="Aigis Edition"
          width={623}
          height={764}
          className="mx-auto w-full max-w-[430px]"
        />
        <ItemList
          items={[
            {
              title: "埃癸斯模型",
              body: "桐条集團製作的對陰影用特別鎮壓兵器七式「埃癸斯」特別模型。",
            },
            ...packageItems.slice(1),
          ]}
        />
      </div>
      <p className="mt-5 text-[12px] leading-[1.7] text-[#1d384a]/75">
        ※「PERSONA3 RELOAD: Aigis Edition」僅販售PS5版。
      </p>
    </article>
  );
}

function StandardPackage() {
  return (
    <article className="border-t border-[#1d384a]/20 py-[66px]">
      <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
        <Image
          src={ASSETS.productPackage}
          alt="女神異聞錄３ Reload 普通盒裝版"
          width={204}
          height={296}
          className="mx-auto w-[180px] md:w-[204px]"
        />
        <div>
          <SectionTitle>普通盒裝版</SectionTitle>
          <p className="mt-4 text-[#1d384a] text-[15px] sm:text-[18px] font-bold">
            『女神異聞錄３ Reload』遊戲軟件（盒裝版）
          </p>
          <div className="mt-7">
            <PlatformButtons />
          </div>
        </div>
      </div>
      <div className="mt-[54px] text-center">
        <a
          href="/stores/"
          className="inline-flex h-[56px] w-full max-w-[650px] items-center justify-center bg-[#1d384a] px-8 text-white transition-opacity hover:opacity-80 sm:h-[73px]"
          style={{ fontFamily: "var(--font-syncopate), sans-serif", letterSpacing: "0.12em" }}
        >
          STORES
        </a>
      </div>
    </article>
  );
}

function PackageContent() {
  return (
    <div>
      <LimitedBox />
      <AigisEdition />
      <StandardPackage />
    </div>
  );
}

function DigitalCard({
  title,
  subtitle,
  price,
  items,
}: {
  title: string;
  subtitle: string;
  price: { tw: string; hk: string };
  items: string[];
}) {
  return (
    <article className="bg-[#eef5fb] p-5 sm:p-8">
      <SectionTitle>{title}</SectionTitle>
      <p className="mt-3 text-[#1d384a] text-[14px] sm:text-[16px] font-bold leading-[1.7]">
        {subtitle}
      </p>
      <Price tw={price.tw} hk={price.hk} />
      <ul className="mt-7 grid gap-2 text-[#1d384a] text-[13px] sm:text-[14px] font-bold leading-[1.55]">
        {items.map((item) => (
          <li key={item}>
            <span className="text-[#0fadf1]">■</span> {item}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <PlatformButtons />
      </div>
    </article>
  );
}

function DownloadContent() {
  return (
    <div className="pb-[66px]">
      <div className="grid gap-6 lg:grid-cols-2">
        <DigitalCard
          title="數位高級版"
          subtitle="下載版《P3R》最特別的版本。內含遊戲本篇、數位美術書、數位原聲帶與DLC包。"
          price={{ tw: "2,490 NT$", hk: "608 HKD" }}
          items={["PERSONA3 RELOAD Digital ART BOOK", "PERSONA3 RELOAD Digital Original Sound Track", ...digitalPremiumItems]}
        />
        <DigitalCard
          title="數位豪華版"
          subtitle="下載版《P3R》的豪華版本。內含遊戲本篇、數位美術書與數位原聲帶。"
          price={{ tw: "1,990 NT$", hk: "468 HKD" }}
          items={["PERSONA3 RELOAD Digital ART BOOK", "PERSONA3 RELOAD Digital Original Sound Track"]}
        />
      </div>

      <article className="mt-[66px] border-t border-[#1d384a]/20 pt-[66px]">
        <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
          <Image
            src={ASSETS.productPackage}
            alt="女神異聞錄３ Reload 普通下載版"
            width={204}
            height={296}
            className="mx-auto w-[180px] md:w-[204px]"
          />
          <div>
            <SectionTitle>普通下載版</SectionTitle>
            <p className="mt-4 text-[#1d384a] text-[15px] sm:text-[18px] font-bold">
              『女神異聞錄３ Reload』遊戲本篇下載版
            </p>
            <div className="mt-7">
              <PlatformButtons />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Lineup() {
  const [activeTab, setActiveTab] = useState<Tab>("package");

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-[min(1280px,calc(100vw-32px))] px-4 pt-[clamp(90px,14vw,180px)]">
        <h2 className="mb-[64px] text-center sm:mb-[90px] md:mb-[120px]">
          <span
            className="inline-block text-[#1d384a] text-[42px] sm:text-[58px] md:text-[76px] font-black leading-none"
            style={{ fontFamily: "var(--font-syncopate), Syncopate, sans-serif" }}
          >
            BUY NOW
          </span>
        </h2>

        <div className="mb-[48px] grid h-[54px] grid-cols-2 overflow-hidden sm:mb-[74px] sm:h-[60px]">
          {[
            ["package", "盒裝版"],
            ["download", "下載版"],
          ].map(([key, label]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key as Tab)}
                className="cursor-pointer border-0 text-[22px] sm:text-[28px] font-black transition-colors"
                style={{
                  backgroundColor: isActive ? "#1d384a" : "#eeeeee",
                  color: isActive ? "#ffffff" : "#1d384a",
                  fontFamily: "var(--font-urbanist), 'Noto Sans TC', sans-serif",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {activeTab === "package" ? <PackageContent /> : <DownloadContent />}
      </div>
    </section>
  );
}
