# Story Section Spec

## Overview
- **Selector**: `.story`
- **Tag**: `<section>`
- **Position**: top=4997px
- **Dimensions**: 1282px x 2358.5px
- **Background Color**: rgb(192, 213, 232) (medium blue-gray)
- **Display**: block
- **Position type**: relative

## Typography
- **Font Family**: Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif
- **Base Font Size**: 16px
- **Base Color**: rgb(29, 56, 74) (dark blue-gray)
- **Line Height**: 16px

## Structure

### Main Content (.wrapper)
- **Padding**: 195px top
- **Width**: 1282px
- **Height**: 1816px (content) + 253px (bg-text) = 2069px total
- **Max Width**: 1920px
- **Display**: block

### Content Blocks (4 major sections)

---

#### 1. Introduction (.introduction)
- **Display**: flex
- **Flex Direction**: row
- **Justify Content**: flex-end
- **Width**: 1282px
- **Height**: 425px

##### Text Box (.story-text-box.introduction-text)
- **Width**: 620px
- **Height**: 425px
- **Padding**: 56px top, 32px right, 0px bottom, 20px left

###### Title (.introduction-title) - H2
- **Width**: 365px
- **Height**: 56.3px
- **Max Width**: 525px
- **Min Width**: 365px
- **Margin**: 0px 0px 0px 2px
- **Content**: SVG (base64) - "Introduction"

###### Text (.story-text1)
- **Width**: 568px
- **Height**: 212px
- **Margin**: 35px top
- **Content**: 3 paragraphs of story text

**Text Content:**
```
少年主人公轉入位於港區港灣人工島的月光館學園高中部就讀，
在某次遭到怪物襲擊的契機之下，意外的使潛藏的心靈力量「人格面具」覺醒。
他加入了特別課外活動部」（S.E.E.S.），
和夥伴們一同討伐「影時間」中出現的神祕怪物「陰影」，持續不懈地戰鬥。
究竟最後等待著他的會是什麼樣的命運……
```

##### Image (.story-img.introduction-img)
- **PC Version**: 662px x 425px (display: block)
- **SP Version**: 667.7px x 425px (display: none)
- **Background Image**: `https://asia.sega.com/p3r/cht/resources/img/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png`
- **Background Size**: auto 100%
- **Background Position**: 50% 0%
- **Opacity**: 0 (animated on scroll)
- **Transition**: opacity 0.5s ease-in-out
- **Overflow**: hidden

---

#### 2. Features (.features)
- **Display**: flex
- **Flex Direction**: row
- **Width**: 1282px
- **Height**: 425px
- **Margin**: 162px top

##### Image (.story-img.features-img)
- **PC Version**: 601px x 425px (display: block)
- **SP Version**: 667.7px x 425px (display: none)
- **Background Image**: `https://asia.sega.com/p3r/cht/resources/img/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png`
- **Background Size**: auto 100%
- **Background Position**: 50% 0%
- **Opacity**: 0 (animated on scroll)
- **Transition**: opacity 0.5s ease-in-out

##### Text Box (.story-text-box.features-text)
- **Width**: 600px
- **Height**: 425px
- **Padding**: 31px top, 20px right
- **Margin**: 0px 0px 0px 81px

###### Title (.features-title) - H2
- **Width**: 248px
- **Height**: 53px
- **Max Width**: 354px
- **Min Width**: 248px
- **Margin**: 0px 0px 0px 3px
- **Content**: SVG (base64) - "Features"

###### Text (.story-text2)
- **Width**: 580px
- **Height**: 123px
- **Margin**: 65px top

**Text Content:**
```
提升了遊戲操作性，包含使用者介面在內，遊戲整體變得對玩家更加友善等等，在許多細節上進行了更易於遊玩的調整。
藉由最新的遊戲機種，將「那份感動」更加鮮明地重新喚起！
```

###### More Button (.more-btn) - A
- **Width**: 387px
- **Height**: 73.8px
- **Margin**: 58px top
- **Display**: block
- **Opacity**: 0 (animated)
- **Cursor**: pointer
- **Href**: `https://asia.sega.com/p3r/cht/#`
- **Content**: Image
  - **Src**: `https://asia.sega.com/p3r/cht/resources/img/top/more_btn_ff987f7519c7ea0308d5e576cc7a493d.webp`
  - **Alt**: "關於本作品的特色"
  - **Natural Size**: 388px x 73px

---

#### 3. Game System (.game-system)
- **Display**: flex
- **Flex Direction**: row
- **Justify Content**: flex-end
- **Width**: 1282px
- **Height**: 425px
- **Margin**: 162px top

##### Text Box (.story-text-box.game-system-text)
- **Width**: 600px
- **Height**: 425px
- **Padding**: 31px top, 20px right, 20px left

###### Title (.game-system-title) - H2
- **Width**: 365px
- **Height**: 66.7px
- **Max Width**: 535px
- **Min Width**: 365px
- **Margin**: 0px 0px 0px 2px
- **Content**: SVG (base64) - "Game System"

###### Text (.story-text4)
- **Width**: 560px
- **Height**: 103px
- **Margin**: 72px top

**Text Content:**
```
將原作的優點保留下來，讓《女神異聞錄３》的遊戲體驗更加舒適。
戰鬥系統變得更加爽快，藉由全新圖像表現與機關設計等等，
讓塔耳塔羅斯變得更加易於探索。宿舍生活與社群也有所進化！
```

###### Game System Button (.game-system-btn) - A
- **Width**: 387px
- **Height**: 73.6px
- **Margin**: 52px top
- **Display**: block
- **Opacity**: 0 (animated)
- **Cursor**: pointer
- **Href**: `https://asia.sega.com/p3r/cht/#`
- **Content**: Image
  - **Src**: `https://asia.sega.com/p3r/cht/resources/img/top/game_system_btn_93b79219b6b23d84aac594bf2c413d61.webp`
  - **Alt**: "詳細遊戲系統"
  - **Natural Size**: 389px x 73px

##### Image (.story-img.game-system-img)
- **PC Version**: 667.7px x 425px (display: block)
- **SP Version**: 667.7px x 425px (display: none)
- **Background Image**: `https://asia.sega.com/p3r/cht/resources/img/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg`
- **Background Size**: auto 100%
- **Background Position**: 50% 0%
- **Opacity**: 0 (animated on scroll)
- **Transition**: opacity 0.5s ease-in-out

---

#### 4. Bottom Text (.story-text3)
- **Width**: 1282px
- **Height**: 60px
- **Margin**: 157px top, 95px bottom
- **Position**: relative
- **Z-Index**: 5
- **Content**: 3 animated text lines

##### Animated Text Lines
| Class | Text | Animation | Delay |
|-------|------|-----------|-------|
| `.l1` | Dark Hour | fadeInText1 1s ease-out | 0.5s |
| `.l2` | While I breathe, I hope | fadeInText1 1s ease-out | 0.8s |
| `.l3` | Rise again | fadeInText1 1s ease-out | 1.1s |

**Style per line:**
- Font Size: 12px
- Line Height: 27.6px
- Letter Spacing: 0.8px
- Position: absolute
- Top: 34px

---

#### 5. Background Text (.bg-text)
- **Width**: 1282px
- **Height**: 253px
- **Padding Bottom**: 252.5px
- **Opacity**: 0.15
- **Position**: relative
- **Content**: Large SVG decorative text (6 path elements)
- **Purpose**: Watermark/decorative background element

## Images

### Background Images (CSS)
| Section | Class | URL | Size |
|---------|-------|-----|------|
| Introduction | .introduction-img.v-pc | ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png | 662 x 425 |
| Introduction | .introduction-img.v-sp | ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png | (hidden) |
| Features | .features-img.v-pc | ss_features_57a9f52b44e40f3709e529468cefbeb5.png | 601 x 425 |
| Features | .features-img.v-sp | ss_features_57a9f52b44e40f3709e529468cefbeb5.png | (hidden) |
| Game System | .game-system-img.v-pc | ss_game_system_810d5104e29a2e47e72286649713efda.jpg | 668 x 425 |
| Game System | .game-system-img.v-sp | ss_game_system_810d5104e29a2e47e72286649713efda.jpg | (hidden) |

### Button Images (IMG tags)
| Button | Src | Alt | Size |
|--------|-----|-----|------|
| More Button | more_btn_ff987f7519c7ea0308d5e576cc7a493d.webp | 關於本作品的特色 | 388 x 73 |
| Game System | game_system_btn_93b79219b6b23d84aac594bf2c413d61.webp | 詳細遊戲系統 | 389 x 73 |

## Links
1. **More Button**: https://asia.sega.com/p3r/cht/# (關於本作品的特色)
2. **Game System Button**: https://asia.sega.com/p3r/cht/# (詳細遊戲系統)

## CSS Classes
- `.story` - Section root
- `.wrapper` - Main container
- `.introduction` - First content block (flex row)
- `.story-text-box` - Text container base
- `.introduction-text` - Introduction text box
- `.introduction-title` - Introduction H2
- `.story-text1` - Introduction paragraphs
- `.introduction-img` - Introduction image
- `.features` - Features block (flex row)
- `.features-img` - Features image
- `.features-text` - Features text box
- `.features-title` - Features H2
- `.story-text2` - Features paragraphs
- `.more-btn` - Features CTA
- `.game-system` - Game System block (flex row)
- `.game-system-text` - Game System text box
- `.game-system-title` - Game System H2
- `.story-text4` - Game System paragraphs
- `.game-system-btn` - Game System CTA
- `.game-system-img` - Game System image
- `.story-text3` - Bottom animated text
- `.bg-text` - Decorative background
- `.v-pc` - PC-only visibility
- `.v-sp` - SP-only visibility (mobile)
- `.l1`, `.l2`, `.l3` - Animated text lines
- `.run` - Animation trigger class

## Animation & Interaction

### Scroll-Triggered Fade-In
- **Trigger**: Elements start with opacity: 0
- **Animation**: Fade in when scrolled into viewport
- **Elements affected**:
  - `.introduction-img` (both v-pc and v-sp)
  - `.features-img` (both v-pc and v-sp)
  - `.game-system-img` (both v-pc and v-sp)
  - `.more-btn`
  - `.game-system-btn`
- **Transition**: opacity 0.5s ease-in-out

### Text Animation (CSS Keyframes)
- **Animation Name**: fadeInText1
- **Duration**: 1s
- **Timing**: ease-out
- **Fill Mode**: both
- **Trigger**: `.run` class added on scroll

| Element | Delay | Description |
|---------|-------|-------------|
| .l1 | 0.5s | "Dark Hour" |
| .l2 | 0.8s | "While I breathe, I hope" |
| .l3 | 1.1s | "Rise again" |

### SVG Transitions
- All SVG elements have: transition: 1s ease-out
- Likely for path drawing or morphing animations

### Hover Effects
- CTA buttons have `cursor: pointer`
- No explicit :hover styles detected in computed styles

## Visual Design
1. Medium blue-gray background (#c0d5e8)
2. Alternating layout: text-left/image-right, then image-left/text-right
3. Each content block is 425px tall
4. 162px spacing between content blocks
5. Decorative watermark text at 15% opacity
6. Bottom tagline with staggered fade-in animation

## Key Design Notes
1. Section is very tall (2358.5px) with 4 major content blocks
2. Flexbox layout with alternating justify-content (flex-end vs default)
3. Background images use `auto 100%` sizing (maintain aspect ratio, fill height)
4. All title text rendered as SVG images (not live text)
5. Only body paragraphs and bottom tagline are live HTML text
6. Responsive images hidden/shown via display:none on .v-sp
7. Scroll-triggered animations for images and buttons
8. Staggered text animation creates cinematic reveal effect
9. Z-index 5 on bottom text ensures it appears above decorative elements
