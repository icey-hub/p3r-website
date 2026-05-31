# Privilege Section Spec

## Overview
- **Selector**: `.privilege`
- **Tag**: `<section>`
- **Position**: top=3761px
- **Dimensions**: 1282px x 541.5px
- **Background**: transparent (rgba(0,0,0,0))
- **Display**: block
- **Position type**: relative

## Typography
- **Font Family**: Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif
- **Base Font Size**: 16px
- **Base Color**: rgb(29, 56, 74) (dark blue-gray)
- **Line Height**: 16px (compact)

## Structure

### Wrapper (.wrapper)
- **Padding**: 122px top, 0px sides, 99px bottom
- **Width**: 1280px
- **Display**: block

### Children (4 elements)

#### 1. Title (.privilege-name) - H3
- **Width**: 1010px
- **Height**: 61px
- **Margin**: 0px 135px (centered)
- **Content**: SVG image (base64 encoded)
  - Alt text: "先行購買特典「DLC：P4G BGM套組」"
  - PC version: 1009.51px x 60.54px natural size
  - SP version: hidden (display:none)
- **Visual**: Cyan/teal colored text (#0fadf1 fill)

#### 2. Description (.privilege-text) - P
- **Width**: 646px
- **Height**: 25px
- **Margin**: 14px 317px 0px (centered)
- **Content**: SVG image (base64 encoded)
  - Alt text: "此DLC可供玩家聆聽《女神異聞錄4 黃金版》登場的樂曲"
  - PC version: 645.83px x 24.78px natural size
  - SP version: hidden (display:none)
- **Visual**: Dark blue-gray text (#1d384a fill)

#### 3. Music List (.music-list) - DIV
- **Width**: 1035px
- **Height**: 107px
- **Margin**: 58px 122.5px 36px (centered)
- **Content**: SVG image (base64 encoded)
  - Alt text: "收錄樂曲"
  - PC version: 1033.6px wide (responsive)
  - SP version: hidden (display:none)
- **Visual**: Track listing with cyan accents

#### 4. Note (.note) - P
- **Width**: 1280px (full width)
- **Height**: 19px
- **Font Size**: 12px
- **Line Height**: 19.2px
- **Text Content**:
  ```
  ※盒裝版數量有限，售完即止。
  ※數位版在本作品發售日前預購即可獲得。
  ```

## Images
Total: 6 images (all base64 SVG encoded)

| Image | Alt | Natural Size | Class |
|-------|-----|--------------|-------|
| SVG | 先行購買特典「DLC：P4G BGM套組」 | 1009.51 x 60.54 | v-pc |
| SVG | 先行購買特典「DLC：P4G BGM套組」 | 580.33 x 136.52 | v-sp |
| SVG | 此DLC可供玩家聆聽《女神異聞錄4 黃金版》登場的樂曲 | 645.83 x 24.78 | v-pc |
| SVG | 此DLC可供玩家聆聽《女神異聞錄4 黃金版》登場的樂曲 | 401.64 x 56.75 | v-sp |
| SVG | 收錄樂曲 | 1033.6 x 31 | v-pc |
| SVG | 收錄樂曲 | 650 x 83 | v-sp |

## CSS Classes
- `.wrapper` - Main container
- `.privilege-name` - Title (H3)
- `.v-pc` - PC-only visibility
- `.v-sp` - SP-only visibility (mobile)
- `.privilege-text` - Description text
- `.music-list` - Track listing
- `.note` - Footnotes

## Animation & Interaction
- **No CSS animations detected**
- **No scroll-triggered animations**
- **No hover effects**
- **No data attributes for animation**

## Responsive Behavior
- Uses `.v-pc` and `.v-sp` classes for responsive image switching
- PC images shown by default, SP images hidden (display:none)
- All text rendered as SVG images (not live text)

## Key Design Notes
1. All visual text is rendered as inline SVG images (base64 encoded), not as live HTML text
2. Only the note text at bottom is actual HTML text
3. Centered layout with symmetric margins
4. Cyan/teal (#0fadf1) used for title text
5. Dark blue-gray (#1d384a) used for description text
6. Compact spacing with 58px gap between music list and description
