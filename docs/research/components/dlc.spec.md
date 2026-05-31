# DLC Section Spec

## Overview
- **Selector**: `#dlc` (also `.dlc`)
- **Tag**: `<section>`
- **Position**: top=4302px
- **Dimensions**: 1282px x 694.2px
- **Background Color**: rgb(229, 238, 246) (light blue-gray)
- **Display**: block
- **Position type**: relative

## Typography
- **Font Family**: Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif
- **Base Font Size**: 16px
- **Base Color**: rgb(29, 56, 74) (dark blue-gray)
- **Line Height**: 16px

## Structure

### Wrapper (.wrapper)
- **Padding**: 108px top, 0px sides
- **Width**: 1282px
- **Height**: 586.2px
- **Max Width**: 1920px
- **Display**: block

### Children (4 elements)

#### 1. Title (.dlc-title) - H2
- **Width**: 150px
- **Height**: 64px
- **Margin**: 0px 566px (centered)
- **Max Width**: 218px
- **Min Width**: 150px
- **Content**:
  - Hidden text span: "DLC"
  - SVG icon: 149.95px x 62.97px (inline, overflow:hidden)

#### 2. Description (.dlc-text) - P
- **Width**: 1282px (full width)
- **Height**: 55px
- **Margin**: 30px top
- **Font Size**: 14px
- **Line Height**: 23.8px
- **Letter Spacing**: 0.8px
- **Overflow**: hidden
- **Text Content**:
  ```
  準備了以下DLC：能更改在塔耳塔羅斯探索與戰鬥時的外觀、BGM，
  還能解鎖特別人格面具的合體並可在戰鬥中使用。
  ```

#### 3. Image Container (.dlc-img) - DIV
- **Width**: 854.7px
- **Height**: 122.2px
- **Margin**: 37px 213.67px 0px (centered)
- **Overflow**: hidden
- **Position**: relative
- **Opacity**: 0 (initially hidden, animated on scroll)
- **Transition**: opacity 0.5s ease-in-out
- **Content**: Image
  - **Src**: `https://asia.sega.com/p3r/cht/resources/img/top/ss_dlc_017f9d80702e1e259055495112f6d98b.webp`
  - **Alt**: "DLC"
  - **Natural Size**: 1269px x 180px
  - **Display**: inline
  - **Computed Size**: 854.7px x 121.2px

#### 4. Link Button (.dlc-link-btn) - A
- **Width**: 387px
- **Height**: 74px
- **Margin**: 71px top, 133px bottom
- **Display**: inline-block
- **Opacity**: 0 (initially hidden, animated on scroll)
- **Transition**: all
- **Cursor**: pointer
- **Href**: `https://asia.sega.com/p3r/cht/dlc/`
- **Content**: Button image
  - **Src**: `https://asia.sega.com/p3r/cht/resources/img/top/dlc_link_btn_addfe47e2bf6efa45da9cc9a61e9b045.webp`
  - **Alt**: "DLC"
  - **Natural Size**: 387px x 73px

## Images

| Image | Src | Alt | Natural Size |
|-------|-----|-----|--------------|
| DLC Banner | ss_dlc_017f9d80702e1e259055495112f6d98b.webp | DLC | 1269 x 180 |
| Link Button | dlc_link_btn_addfe47e2bf6efa45da9cc9a61e9b045.webp | DLC | 387 x 73 |

## Links
- **DLC Link**: https://asia.sega.com/p3r/cht/dlc/
  - Button text: (image only)
  - Target: self (default)

## CSS Classes
- `.dlc` / `#dlc` - Section root
- `.wrapper` - Main container
- `.dlc-title` - Section title (H2)
- `.dlc-text` - Description paragraph
- `.dlc-img` - Image container
- `.dlc-link-btn` - CTA link button

## Animation & Interaction

### Scroll-Triggered Fade-In
- **Trigger**: Elements start with opacity: 0
- **Animation**: Fade in on scroll into viewport
- **Elements affected**:
  - `.dlc-img` - opacity 0 -> 1, transition: opacity 0.5s ease-in-out
  - `.dlc-link-btn` - opacity 0 -> 1, transition: all
- **SVG elements**: transition: 1s ease-out (title icon)

### Hover Effects
- Link button has `cursor: pointer`
- No explicit :hover styles detected in computed styles

## Visual Design
1. Light blue-gray background (#e5eef6)
2. Centered layout with symmetric margins
3. DLC banner image shows character DLC packs
4. CTA button at bottom links to full DLC page
5. SVG title with "DLC" text
6. Compact description with 0.8px letter spacing

## Key Design Notes
1. Background color distinguishes this section: rgb(229, 238, 246)
2. Scroll-triggered opacity animation on image and button
3. Full-width description text with hidden overflow
4. Button is image-based (not text)
5. Section has clear visual hierarchy: title -> description -> image -> CTA
