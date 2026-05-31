# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/header-screenshot.png`
- **Source URL:** https://asia.sega.com/p3r/cht/
- **Selector:** `header.top`
- **Interaction model:** click-driven (modal openers, language switcher)

## DOM Structure

```
header.top
  div.nav-box                        (position: absolute, top: 45px, left: 331px)
    ul.nav                           (display: flex, flex-direction: row)
      li > a.feature-modal-open      (78px wide, img: "Features")
      li > a.game-system-modal-open  (130px wide, img: "Game System")
      li > a                         (94px wide, img: "Character", href=#character)
      li > a                         (35px wide, img: "DLC", href=/dlc/)
      li > a                         (136px wide, img: "Expansion Pass", href=/expansion/)
      li > a                         (58px wide, img: "Stores", href=/stores/)
    div.news                         (position: absolute, top: -12px, left: 760.828px, z-index: 100)
      a                              (text: "NEWS", font-size: 14px)
    div.lang-box                     (position: absolute, top: -13px, left: 836px, z-index: 100)
      a.change-lang                  (65px x 44px, padding: 15px 10px)
        span.lang-arrow              (9x6px SVG arrow, positioned absolute at bottom-right)
      ul.lang-list                   (150px x 450px, hidden by default, opacity: 0, z-index: -1)
        li > a  x8                   (TC, JA, EN, SC, KO, FR, IT, DE, ES)
  a.menu-btn                         (display: none on desktop, hamburger icon)
    span x4                          (hamburger lines)
```

## Computed Styles (exact values)

### Container: `header.top`
- **position:** absolute
- **top:** 0px
- **left:** 0px
- **width:** 1282px
- **height:** 0px (content overflows via absolute children)
- **z-index:** 99
- **opacity:** 1
- **background:** transparent (rgba(0,0,0,0))
- **display:** block
- **transition:** all
- **font-family:** Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif
- **font-size:** 16px
- **font-weight:** 400
- **line-height:** 16px
- **color:** rgb(29, 56, 74)
- **overflow:** visible

### Nav Box: `div.nav-box`
- **position:** absolute
- **top:** 45px
- **left:** 331px
- **right:** 220px
- **width:** 731px
- **height:** 20.3438px
- **display:** block

### Nav List: `ul.nav`
- **display:** flex
- **flex-direction:** row
- **width:** 731px
- **height:** 20.3438px

### Nav Items: `li`
- **display:** list-item
- **height:** 20.3438px
- **margin-right:** 40px (except last item: 0px)
- **gap between items:** 40px

### Nav Links: `a`
- **display:** block
- **cursor:** pointer
- **font-size:** 16px
- **color:** rgb(29, 56, 74)

### News Badge: `div.news`
- **position:** absolute
- **top:** -12px
- **left:** 760.828px
- **z-index:** 100
- **padding:** 13px
- **font-size:** 14px
- **font-family:** Urbanist, sans-serif
- **line-height:** 14px

### Language Box: `div.lang-box`
- **position:** absolute
- **top:** -13px
- **left:** 836px
- **z-index:** 100
- **width:** 65px
- **height:** 44px
- **font-family:** Syncopate, sans-serif
- **font-size:** 14px

### Language Button: `a.change-lang`
- **display:** block
- **width:** 65px
- **height:** 44px
- **padding:** 15px 10px
- **position:** relative
- **cursor:** pointer

### Language Arrow: `span.lang-arrow`
- **width:** 9px
- **height:** 6px
- **position:** absolute
- **top:** 19px, **right:** 17px, **bottom:** 19px, **left:** 39px
- **background:** SVG chevron arrow (data:image/svg+xml;base64,...)
- **display:** block

### Language List (hidden state): `ul.lang-list`
- **position:** absolute
- **top:** 40px
- **left:** -85px
- **width:** 150px
- **height:** 450px
- **padding-right:** 30px
- **z-index:** -1
- **opacity:** 0
- **transform:** matrix(1, 0, 0, 0, 0, 0) (collapsed vertically)
- **transition:** 0.4s ease-out
- **overflow:** hidden
- **display:** block

### Language List Items: `li` (inside lang-list)
- **width:** 120px
- **height:** 34px
- **display:** list-item

### Menu Button (desktop): `a.menu-btn`
- **display:** none (hidden on desktop, visible on mobile)
- Contains 4 `<span>` elements for hamburger icon

## States & Behaviors

### Scroll-triggered changes
- **No scroll-triggered class changes detected.** The header remains `position: absolute; top: 0` with no class name changes on scroll.
- The header is always transparent (no background color) overlaying the hero section.
- `transition: all` is set, indicating any property changes would animate.

### Language Switcher
- **Default state:** Current language "TC" displayed with chevron arrow. Language list hidden (opacity: 0, scaleY: 0).
- **Open state:** Language list animates in with `transition: 0.4s ease-out`, scaleY expands, opacity goes to 1, z-index changes from -1 to active.
- Available languages: TC, JA, EN, SC, KO, FR, IT, DE, ES

### Navigation Links
- Features and Game System open modals (via `feature-modal-open` and `game-system-modal-open` classes)
- Character scrolls to anchor `#character`
- DLC, Expansion Pass, Stores navigate to sub-pages

## Assets

### Navigation Images (all SVG inline, data URIs)
| Index | Alt Text | Natural Size | Display Size |
|-------|----------|-------------|-------------|
| 0 | Features | 300x55 | 78x20px |
| 1 | Game System | 300x45 | 130x20px |
| 2 | Character | 300x49 | 94x20px |
| 3 | DLC | 35x16 | 35x16px |
| 4 | Expansion Pass | 136x19 | 136x19px |
| 5 | Stores | 300x76 | 58x20px |

### Language Arrow SVG
- 9x6px chevron arrow, inline data URI

### Menu Button
- Pure CSS hamburger (4 `<span>` elements)

## Text Content (verbatim)

| Element | Text |
|---------|------|
| `.news a` | NEWS |
| `.change-lang` | TC |
| `.lang-list li` | TC, JA, EN, SC, KO, FR, IT, DE, ES |

## Responsive Behavior

### Desktop (1282px+)
- Full nav bar visible with 6 navigation links
- NEWS badge positioned to the right of nav
- Language switcher positioned at far right
- Menu button hidden (`display: none`)
- Navigation images are SVG with natural sizes scaled down via CSS

### Mobile (inferred)
- Menu button visible (hamburger icon with 4 lines)
- Nav list hidden, revealed via menu toggle
- Language list likely accessible from mobile menu
- Navigation images have SP variants (class `v-sp`) hidden on desktop
