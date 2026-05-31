# Character Section Spec

Source: https://asia.sega.com/p3r/cht/ (section#character)

## Overview

The Character section is a scroll-pinned horizontal carousel that displays two character groups (S.E.E.S. and STREGA) with 13 total characters. It uses a `.pin-spacer` wrapper created by a scroll-pinning mechanism (likely ScrollTrigger or custom JS in `top.23c7bfe8ea763027be1a.js`). The section background color transitions dynamically per character.

## Layout & Positioning

- **Pin-spacer**: `position: relative`, `width: 1282px`, `height: 11069px`, `padding-bottom: 10284px`
- **Section (.chara)**: `position: relative`, `height: 100vh` (785px), `display: block`
- **Carousel (.chara-carousel)**: `display: flex`, `flex-direction: row`, `align-items: center`, `position: absolute`, `top: 0`, `bottom: 0`, `left: 0`, `width: 100%`
- **Font**: `Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
- **Base font-size**: `16px`, **Color**: `rgb(255, 255, 255)` (white on colored bg)

## DOM Structure

```
.pin-spacer (11069px tall, creates scroll pin area)
  section#character.chara (100vh, bg-color transitions)
    ul.chara-carousel (flex row, absolute positioned)
      li.chara-text-box (S.E.E.S. intro)
        h2.chara-title.run
          span.disp-none "S.E.E.S."
          svg (viewBox="0 0 747.37 211.14") - vector title
        div.chara-text
          p > span.l1 "An aggregation vigilantly chosen to"
          p > span.l2 "vanquish the Shadows, will face Destiny."
          p > span.l3 "Time won't wait for you, Destiny won't change for you."
      li (S.E.E.S. character list wrapper)
        ul.chara-list (10 items, flex row, opacity: 0 until .run)
          li.chara-slide x10
            div.chara-image (position: relative, 474x632px)
              div.on > img (color portrait, z-index default)
              div.off > img (grayscale portrait, z-index default)
            div.chara-name chara[N]-name "Hero" etc.
              span.arrow
      li.chara-text-box (STREGA intro)
        h2.chara-title2
          span.disp-none "STREGA"
          svg (viewBox="0 0 1042.94 211.14")
        div.chara-text2
          p > span.l1 "每一天的夾縫之間存在著一般人無法察覺的時間「影時間」，"
          p > span.l2 "「史特雷加」就是利用這個「影時間」承接他人復仇委託的集團。"
          p > span.l3 "他們出現在追查影時間之謎的主人公們所屬的S.E.E.S.前，處於敵對狀態。"
      li (STREGA character list wrapper)
        ul.chara-list.strega (3 items)
          li.chara-slide x3 (Takaya, Jin, Chidori)
```

## Character Roster (13 total)

### S.E.E.S. (10 characters)

| # | Name | Image (on) | Image (off) | Dimensions |
|---|------|-----------|-------------|------------|
| 1 | Hero | character1_badbd990dcbabe1f25c22de113f772a0.webp | character1_off_c6e5fcab1669dd9cf66e96a871af304d.webp | 570x760 |
| 2 | Yukari | character2_35a3dc87ea1a02e2e3d6397d46e1cbf9.webp | character2_off_ae2353448bb0b41a6d4bcee128ce7dd1.webp | 570x760 |
| 3 | Junpei | character3_cd155bb1faff87558813a0054f0f9436.webp | character3_off_dce3dd1daf8a4d76ef754c63c526bf14.webp | 570x760 |
| 4 | Akihiko | character4_b11ad41cb7a01fef1d40aeb65d002471.webp | character4_off_f3f7ad24a2724e732efa3f4f0b2638ed.webp | 630x840 |
| 5 | Mitsuru | character5_fa07d2d06f3925eea4af9a91937506ba.webp | character5_off_b487aeaab9cacea5f6d5d992f302edad.webp | 630x840 |
| 6 | Fuka | character6_0e3115e9f6076da20973ac40ef045866.webp | character6_off_7dad6fb4313cd40fea86ab9dc1b5ec3a.webp | 630x840 |
| 7 | Koromaru | character7_532c5a12d64704763e5cac354fb3874c.webp | character7_off_55056899b01c4bcd7bd1d9bcb3ecfa6a.webp | 630x840 |
| 8 | Aegis | character8_790cb89b62931cfe93f16d61c746464d.webp | character8_off_3f02f0728d931c41cfa70de58e96ef83.webp | 630x840 |
| 9 | Ken | character9_a298bc6fd82a5d83fd4c04fa9c031f4f.webp | character9_off_dc21e770c325edf90d9913721b8c4429.webp | 630x840 |
| 10 | Shinjiro | character10_a301f968f599f0c8c5556d55da608f2d.webp | character10_off_9beae43b67d90f05dbcd4b5c0b8ddea7.webp | 630x840 |

### STREGA (3 characters)

| # | Name | Image (on) | Image (off) | Dimensions |
|---|------|-----------|-------------|------------|
| 11 | Takaya | character11_4d8a7c2345cbb892172a28b62e258bd6.webp | character11_off_baa1b252d3fed97cf47eed2e73a3e5c8.webp | 630x840 |
| 12 | Jin | character12_f2b86e413b00e552aeca9b0960ca96d6.webp | character12_off_8cc7ad1e47b92b0c15373879c66d14a3.webp | 630x840 |
| 13 | Chidori | character13_c47bbc2365b7492613827dd458c56138.webp | character13_off_26b55d7b4417aee2b8b0f25e7adbc2bc.webp | 630x840 |

All images are `.webp` format, stored at `resources/img/top/`.

## Scroll-Driven Behavior

### Pin Mechanism
- **Technology**: Custom JS (NOT GSAP ScrollTrigger, NOT Lenis, NOT LocomotiveScroll)
- **Script**: `top.23c7bfe8ea763027be1a.js` (single bundled JS file)
- **Pin-spacer**: Auto-generated wrapper, `height: 11069px` with `padding-bottom: 10284px`
- The `.chara` section is pinned at `position: relative` while the user scrolls through the 11069px pin-spacer area
- **Scroll range**: ~10284px of scroll distance mapped to horizontal carousel movement

### Background Color Transitions
Each character has a unique background color applied via CSS class on `.chara`:

| Class | Color |
|-------|-------|
| (default) | `rgb(91, 164, 215)` blue |
| .bg1 | `rgb(134, 237, 252)` cyan |
| .bg2 | `rgb(252, 147, 255)` pink |
| .bg3 | `rgb(152, 159, 251)` purple |
| .bg4 | `rgb(211, 218, 218)` grey |
| .bg5 | `rgb(246, 140, 168)` rose |
| .bg6 | `rgb(149, 245, 220)` mint |
| .bg7 | `rgb(242, 244, 242)` light grey |
| .bg8 | `rgb(250, 246, 166)` yellow |
| .bg9 | `rgb(250, 186, 128)` orange |
| .bg10 | `rgb(206, 137, 152)` mauve |
| .bg-strega | `rgb(147, 204, 150)` green |

- **Transition**: `background-color 0.5s ease-out`

### Character Image On/Off States
Each character slide has two image layers:
- `.on` div: Color portrait, `position: absolute`, default `opacity: 1`
- `.off` div: Grayscale/desaturated portrait, `position: absolute`, default `opacity: 0`
- **Transition**: `opacity 0.5s, transform 0.5s`
- On hover: `transform: scale3d(1.1, 1.1, 1.1)` (zoom effect)
- When `.active` class is on `.chara-image`: first img (on) gets `z-index: 5, opacity: 1`; last img (off) gets `z-index: 1, opacity: 0`
- When NOT active: reversed (off visible, on hidden)

### CSS Classes on .chara-image
- `.active` - toggles which portrait is visible
- `.chara1` through `.chara13` - character-specific styling

### Slide Layout
- `.chara-slide`: `display: flex`, `flex-direction: column`, `justify-content: center`, `padding: 0 100px`, `width: 674px`, `height: 656px`
- `.chara-image`: `width: calc(60.3814vh)`, `height: calc(80.5085vh)`, `position: relative`, `overflow: hidden`
- `.chara-name`: `display: flex`, `align-items: center`, `font-size: 16px`, `margin-top: 8px`, `color: rgb(29, 56, 74)`
- `.chara-name .arrow`: SVG arrow icon (inline base64 data URI), slides right on hover (`.slide` class)

### S.E.E.S. / STREGA Text Box Layout
- `.chara-text-box`: `margin-right: calc(8.22917vw)`, `padding-left: calc(9.32292vw)`, `width: 824px`, `height: 387px`
- `.chara-title` / `.chara-title2`: `width: 704px`, `height: 211px`
- SVG title characters animate in with staggered delays (0.05s increments per path)

## Animation System

### CSS Keyframe Animations Used

| Name | Effect |
|------|--------|
| `fadeInRight` | `translate(30px, 0)` to `translate(0, 0)` with opacity 0->1 |
| `fadeInText2` | `translateY(100%)` to `translateY(0)` with opacity 0->1 |

### SVG Title Animation
- Each SVG path in `.chara-title` starts at `opacity: 0; transform: translateY(110px)`
- When `.run` class is added, paths animate to `opacity: 1; transform: translateY(0px)`
- Staggered transition-delay: `calc(0.05s * N)` where N is the path index (1-8)

### Text Line Animation
- `.chara-text > p span` starts at `opacity: 0; transform: translateY(100%)`
- `.l1.run`: animation `fadeInText2 1s ease-out 0s`
- `.l2.run`: animation `fadeInText2 1s ease-out 0.3s`
- `.l3.run`: animation `fadeInText2 1s ease-out 0.6s`

### Character List Entrance
- `.chara-list` starts at `opacity: 0`
- `.chara-list.run`: animation `fadeInRight 1s ease 0s`

### IntersectionObserver
- `IntersectionObserver` API is available (detected in browser)
- The `.run` class is added via JS when elements enter viewport, triggering CSS animations
- No external animation libraries detected (no GSAP, ScrollTrigger, Lenis, LocomotiveScroll, anime.js, or scrollama)

## Character Modal

Clicking a character opens `.character-modal` (full-screen overlay):
- `position: fixed`, `z-index: 999999999`
- Slides up from `top: 100vh` to `top: -6.4vw` via `transition: top 0.8s ease-in-out`
- Contains `.modal-dialog` with character detail view
- Each character has a dedicated `.bg-wave.chara[N]-wave` background with SVG wave pattern
- Modal includes: character image (normal/battle toggle), name, CV info, profile text, content gallery
- Close button: `.modal-close-btn`, fixed position `top: 37px, right: 37px`

### Per-Character Modal Background Colors

| Character | Wave BG Color |
|-----------|--------------|
| chara1 (Hero) | `rgb(131, 233, 248)` |
| chara2 (Yukari) | `rgb(248, 143, 255)` |
| chara3 (Junpei) | `rgb(148, 155, 247)` |
| chara4 (Akihiko) | `rgb(207, 214, 214)` |
| chara5 (Mitsuru) | `rgb(242, 136, 164)` |
| chara6 (Fuka) | `rgb(145, 241, 216)` |
| chara7 (Koromaru) | `rgb(242, 244, 242)` |
| chara8 (Aegis) | `rgb(250, 246, 166)` |
| chara9 (Ken) | `rgb(250, 186, 128)` |
| chara10 (Shinjiro) | `rgb(206, 137, 152)` |
| chara11-13 (STREGA) | `rgb(147, 204, 150)` |

## Screenshot

See: `E:/claudecode/web/p3r/docs/research/character-section.png`
