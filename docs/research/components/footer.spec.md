# Footer Spec

Source: https://asia.sega.com/p3r/cht/ (footer.footer)

## Overview

The footer contains game specification info, social media links, platform logos, a Switch 2 promotional banner, and copyright/legal notices. It sits below the Character section at `top: 18423px`, `height: 1192px`.

## Layout & Positioning

- **Element**: `footer.footer`
- **Position**: `relative`, `z-index: 99`
- **Padding**: `110px 5% 70px` (computed: `110px 64.09px 70px`)
- **Width**: `1153.81px` (content area)
- **Height**: `1012px` (computed)
- **Display**: `block`
- **Color**: `rgb(29, 56, 74)` (dark blue)
- **Font**: `Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
- **Font-size**: `16px`, **Line-height**: `16px`

## DOM Structure

```
footer.footer
  div.footer-contents (flex row, padding: 30px 0 45px)
    div.p3r-logo (game logo image)
    div.spec (game specification table)
      h3 "S P E C"
      table
        tr: "遊戲名稱" / "女神異聞錄３ Reload"
        tr: "發售日期" / "好評發售中"
        tr: "遊戲分級" / "15+"
        tr: "遊戲類型" / "RPG"
        tr: "建議售價" / price info
        tr: "遊玩人數" / (empty or "1")
        tr: "對應機種" / platform list
        tr: "對應語言" / language info
    div.links (social links)
      h3 "L I N K S"
      div.link-items
        a[href="https://www.youtube.com/user/SEGAasia"] "YouTube"
        a[href="https://www.facebook.com/Atlus.cht/?ref=page_internal"] "Facebook"
  a.spec-lp (Switch 2 promo banner)
    img[src="spec_lp_...png"] (two images)
    href="https://asia.sega.com/p3r/cht/switch2/"
  div.logos (platform & official logos)
    div.platforms (platform logos)
      img "XBOX SERIES X|S"
      img "XBOX ONE"
      img "Windows"
      img "PS5|PS4"
      img "STEAM"
    div.official (studio logos)
      a.atlus-logo[href="https://www.atlus.co.jp/"]
        img[alt="ATLUS"]
      img[alt="P-STUDIO"]
  p.copyright
    a.license[href="...privacypolicy..."] "Privacy policy"
    a.license[href="...license/"] "版權"
    "©ATLUS ©SEGA All rights reserved."
```

## Footer Contents Layout (3-column flex)

### Column 1: .p3r-logo
- Contains the game logo image (`logo_color_...webp`)

### Column 2: .spec
- Title: "S P E C" (letter-spaced heading)
- **Label style**: `font-family: Syncopate, sans-serif; font-size: 14px` (from footer CSS)
- **Value style**: `font-size: 14px` (from `.footer-contents ul li`)
- **Label-value spacing**: `margin-bottom: 26px` per row

**Game Info Table**:

| Field | Value |
|-------|-------|
| 遊戲名稱 | 女神異聞錄３ Reload |
| 發售日期 | 好評發售中 |
| 遊戲分級 | 15+ |
| 遊戲類型 | RPG |
| 建議售價 | 普通盒裝版：台灣 1,890 NT$ / 香港 478 HKD |
| | 普通下載版：台灣 1,790 NT$ / 香港 438 HKD |
| 遊玩人數 | (single player) |
| 對應機種 | Xbox Series X\|S / Xbox One / Windows / PlayStation 5 / PlayStation 4 / Steam |
| 對應語言 | PS5/PS4: 語音日文, 字幕韓文/繁中/簡中 |
| | Xbox/Windows/Steam: 語音日文/英文, 字幕多語言 |

**Notes**:
- "※Xbox Series X|S、Xbox One、Windows、Steam僅販售下載版"
- "※PS4版可免費升級至PS5版"
- "※本遊戲情節涉及性,暴力,菸酒"
- "※注意使用時間，避免沉迷於遊戲，遊戲虛擬情節勿模仿。"
- "※遊戲部分內容或服務需另行支付其他費用。"

### Column 3: .links
- Title: "L I N K S"
- **Social links** (inside `.link-items`):
  - YouTube: `https://www.youtube.com/user/SEGAasia`
  - Facebook: `https://www.facebook.com/Atlus.cht/?ref=page_internal`

## All Links

| Link Text | URL | Class | Context |
|-----------|-----|-------|---------|
| YouTube | https://www.youtube.com/user/SEGAasia | (none) | .link-items |
| Facebook | https://www.facebook.com/Atlus.cht/?ref=page_internal | (none) | .link-items |
| (Switch 2 promo) | https://asia.sega.com/p3r/cht/switch2/ | spec-lp | Banner images |
| (ATLUS logo) | https://www.atlus.co.jp/ | atlus-logo | .official |
| Privacy policy | https://www.sega.co.jp/tc/privacypolicy/index.html | license | .copyright |
| 版權 | https://asia.sega.com/p3r/cht/license/ | license | .copyright |

## Images

| Image | Alt | Location |
|-------|-----|----------|
| logo_color_...webp | (empty) | .p3r-logo |
| spec_lp_...png (x2) | (empty) | a.spec-lp |
| xbox_xs_logo_...webp | XBOX SERIES X\|S | .platforms |
| xbox_one_logo_...webp | XBOX ONE | .platforms |
| windows_logo_...webp | Windows | .platforms |
| ps5_ps4_logo_...webp | PS5\|PS4 | .platforms |
| steam_logo_...webp | STEAM | .platforms |
| p_studio_logo_...webp | P-STUDIO | .official |
| atlus_logo_...webp | ATLUS | .official (link) |

## CSS Rules

```css
footer {
  position: relative;
  z-index: 99;
  padding: 110px 5% 70px;
}

.footer-contents, .logos {
  position: relative;
  display: flex;
  box-sizing: border-box;
}

.footer-contents {
  padding: 30px 0px 45px;
}

.footer-contents .animate {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.footer-contents .spec p, .footer-contents .share p {
  margin-bottom: 26px;
}

.footer-contents ul li {
  font-size: 14px;
}
```

## Sub-component: a.spec-lp

- **Purpose**: Switch 2 promotional banner link
- **href**: `https://asia.sega.com/p3r/cht/switch2/`
- Contains two images (likely responsive or state-based)
- Positioned between footer-contents and logos

## Sub-component: .logos

Two child divs:
1. **.platforms**: Flex container with platform logos (Xbox, Windows, PS, Steam)
2. **.official**: Studio logos (ATLUS link, P-STUDIO)

## Sub-component: .copyright

- Contains legal text and links
- **License links**: Privacy policy and 版權 (copyright)
- **Copyright text**: "©ATLUS ©SEGA All rights reserved."
- Platform trademark notices for Microsoft, Sony, Valve

## Animation

- `.footer-contents .animate` elements use IntersectionObserver to add `.run` class
- Animations trigger when footer enters viewport (fadeInUp or similar)

## Screenshot

See: `E:/claudecode/web/p3r/docs/research/footer-section.png`
