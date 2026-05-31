"use client";

export default function Privilege() {
  return (
    <section className="w-full py-[clamp(72px,9.5vw,122px)] px-[5%] text-center">
      <h2
        className="mx-auto max-w-[1010px] text-[#0fadf1] text-[28px] sm:text-[38px] md:text-[50px] font-black leading-tight tracking-[0.02em]"
        style={{
          fontFamily: "var(--font-urbanist), 'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
        }}
      >
        先行購買特典「DLC：P4G BGM套組」
      </h2>

      <p
        className="mx-auto mt-[14px] max-w-[646px] text-[#1d384a] text-[15px] sm:text-[18px] md:text-[22px] font-bold leading-relaxed"
        style={{
          fontFamily: "var(--font-urbanist), 'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
        }}
      >
        此DLC可供玩家聆聽《女神異聞錄4 黃金版》登場的樂曲
      </p>

      <div
        className="mx-auto mt-[42px] sm:mt-[50px] md:mt-[58px] mb-[30px] sm:mb-[36px] grid max-w-[1035px] grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3 text-left text-[#1d384a] text-[13px] sm:text-[15px] font-bold leading-[1.65]"
        style={{
          fontFamily: "var(--font-urbanist), 'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
        }}
      >
        {[
          "Reach Out To The Truth",
          "Time To Make History",
          "I’ll Face Myself -Battle-",
          "A New World Fool",
          "The Fog",
          "Results",
        ].map((track) => (
          <p key={track}>
            <span className="text-[#0fadf1]">♪</span> {track}
          </p>
        ))}
      </div>

      <p
        className="text-[#1d384a] text-[12px] leading-[1.6] opacity-80"
        style={{
          fontFamily: "var(--font-urbanist), 'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
        }}
      >
        ※盒裝版數量有限，售完即止。 ※數位版在本作品發售日前預購即可獲得。
      </p>
    </section>
  );
}
