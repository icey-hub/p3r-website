# Lineup Specification

## Overview
- **Target file:** `src/components/Lineup.tsx`
- **Source URL:** https://asia.sega.com/p3r/cht/
- **Screenshot:** `docs/design-references/lineup.png`
- **Interaction model:** click-driven (tab switching between package/download editions)

## DOM Structure

```
section.lineup                                    (1282px x 2643.91px, position: relative)
  div.wrapper                                     (1280px, padding-top: 180px, margin: 0 1px)
    h2.buy-now                                    (1280px x 79px, margin-bottom: 120px, text-align: center)
      svg                                         (BUY NOW logo/icon)

    div.lineup-btn                                (1280px x 60px, display: flex, margin-bottom: 74px)
      a.nav-package.category.current              (640px x 60px, bg: rgb(29,56,74), color: white)
        p.current                                 "盒裝版"
      a.nav-dl.category                           (640px x 60px, bg: rgb(238,238,238), color: rgb(29,56,74))
        p                                         "下載版"

    div.product-content.show                      (盒裝版 - visible)
      div.package-limited                         (1280px x 736.359px)
        h3.package-limited-name                   (SVG image: "數量有限 PERSONA3 RELOAD LIMITED BOX")
        p.package-limited-text                    (SVG image: "內含粉絲必須收藏的物品，數量有限的豪華版！")
        div.price                                 (SVG image: "台灣 2,590 NT$ / 香港 648 HKD")
        div.flex-inner.limited                    (product image + bundled items)
          img                                     (product_limited-box.webp)
          div.item-list
            div.item                              (S.E.E.S. 制式戰鬥服臂章)
            div.item                              (PERSONA3 RELOAD ART BOOK)
            div.item                              (PERSONA3 RELOAD LIMITED BOX Original Sound Track)
            div.item                              (P4G 八十神高級中學服裝套組 & P4G人格面具套組 DLC)
        a.item-btn.remark.note                    "S.E.E.S.制式戰鬥服臂章 注意事項"
        div.item-text.remark                      (safety warnings text)

      div.package-dshop                           (1280px x 752.891px)
        h3.package-dshop-name                     (SVG: "數量有限 PERSONA3 RELOAD: Aigis Edition")
        p.package-dshop-text                      (SVG: "限定版內附穿戴S.E.E.S.制式戰鬥服臂章的「埃癸斯」模型！")
        div.price.v-pc                            (SVG: "台灣 2,590 NT$ / 香港 648 HKD")
        div.flex-inner                            (product image + bundled items)
          img                                     (product_aegis_figure.webp)
          div.item-list
            div.item                              (埃癸斯模型)
            div.item                              (PERSONA3 RELOAD ART BOOK)
            div.item                              (PERSONA3 RELOAD LIMITED BOX Original Sound Track)
            div.item                              (P4G 八十神高級中學服裝套組 & P4G人格面具套組 DLC)
        p.note.dshop                              (disclaimer text)

      div.package-normal                          (1280px x 247.656px)
        (SVG image: "普通盒裝版")
        img                                       (product_package.webp)
        div.store-btns                            (platform buttons)
          a.xbox-btn > img                        (xbox_btn.webp)
          a.windows-btn > img                     (windows_btn.webp)
          a.ps-btn > img                          (ps_btn.webp)
          a.steam-btn > img                       (steam_btn.webp)

      a.to-stores-btn                             (650px x 73px, href: /p3r/cht/stores/)

    div.product-content                           (下載版 - hidden by default)
      div.dl-limited.flex-inner                   (display: flex)
        div.dl-premium                            (數位高級版)
          SVG title                               "女神異聞錄３ Reload 數位高級版"
          SVG subtitle                            "下載版《P3R》最特別的版本..."
          SVG price                               "台灣 2,490 NT$ / 香港 608 HKD"
          div.item-list                           (DLC包 contents)
          div.store-btns                          (platform buttons x2)
        div.dl-dx                                 (數位豪華版)
          SVG title                               "女神異聞錄３ Reload 數位豪華版"
          SVG subtitle                            "下載版《P3R》的豪華版本..."
          SVG price                               "台灣 1,990 NT$ / 香港 468 HKD"
          div.item-list                           (Digital ART BOOK + OST)
          div.store-btns                          (platform buttons x2)
      div.dl-normal                               (普通下載版)
        img                                       (product_package.webp)
        div.store-btns                            (platform buttons)
```

## Computed Styles (exact values)

### Root: `section.lineup`
| Property | Value |
|---|---|
| width | 1282px |
| height | 2643.91px |
| display | block |
| position | relative |
| overflow | visible |

### Wrapper: `div.wrapper`
| Property | Value |
|---|---|
| width | 1280px |
| max-width | none |
| padding-top | 180px |
| margin | 0px 1px |

### Buy Now Header: `h2.buy-now`
| Property | Value |
|---|---|
| width | 1280px |
| height | 79px |
| margin | 0px 0px 120px |
| text-align | center |
| display | block |

### Tab Buttons: `div.lineup-btn`
| Property | Value |
|---|---|
| width | 1280px |
| height | 60px |
| display | flex |
| margin | 0px 0px 74px |

### Active Tab: `a.nav-package.category.current`
| Property | Value |
|---|---|
| width | 640px |
| height | 60px |
| background-color | rgb(29, 56, 74) |
| color | rgb(255, 255, 255) |
| font-size | 28px |
| font-weight | 700 |
| font-family | Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif |
| text-align | center |
| display | block |
| cursor | pointer |
| transition | all |

### Inactive Tab: `a.nav-dl.category`
| Property | Value |
|---|---|
| width | 640px |
| height | 60px |
| background-color | rgb(238, 238, 238) |
| color | rgb(29, 56, 74) |
| font-size | 28px |
| font-weight | 700 |
| text-align | center |
| cursor | pointer |
| transition | all |

### Store Button: `a.to-stores-btn`
| Property | Value |
|---|---|
| width | 650px |
| height | 73px |
| display | block |
| margin | 0px 315px 93px |
| cursor | pointer |
| transition | all |
| href | https://asia.sega.com/p3r/cht/stores/ |

## States & Behaviors

### Tab Switching
- Two tabs: "盒裝版" (Package) and "下載版" (Download)
- Active tab: `background-color: rgb(29, 56, 74)`, `color: white`
- Inactive tab: `background-color: rgb(238, 238, 238)`, `color: rgb(29, 56, 74)`
- Clicking a tab toggles visibility of `.product-content.show` class
- Tab text uses 28px bold font

### Product Content Sections
- `div.product-content.show` - visible (盒裝版 by default)
- `div.product-content` - hidden (下載版)
- JS toggles `.show` class on click

### Package Edition (盒裝版)
Contains 3 product tiers:
1. **LIMITED BOX** - Limited edition with physical collectibles (2,590 NT$ / 648 HKD)
2. **Aigis Edition** (D-Shop exclusive) - Includes Aigis figure (2,590 NT$ / 648 HKD)
3. **Standard Package** - Game software only

### Download Edition (下載版)
Contains 3 product tiers:
1. **數位高級版** (Digital Premium) - Includes DLC pack (2,490 NT$ / 608 HKD)
2. **數位豪華版** (Digital Deluxe) - Includes Digital Art Book + OST (1,990 NT$ / 468 HKD)
3. **Standard Download** - Base game

### Platform Buttons
Each product tier has platform store buttons for: XBOX, Windows, PS, STEAM
- PC version: 295px x 55px
- SP version: 311px x 73px

## Assets

### Product Images
| File | Dimensions | Usage |
|---|---|---|
| `product_limited-box_75e8384f8e13c5ee361878dbac9b15cc.webp` | 1200x675 | LIMITED BOX product photo |
| `product_aegis_figure_492a76d483eef5a0f9b2eb55d9226be4.webp` | 623x764 | Aigis figure photo |
| `product_package_f61469326582b9529ea38e7db333ab32.webp` | 204x296 | Standard package art |

### Platform Button Images (PC / SP variants)
| Platform | PC Image | SP Image |
|---|---|---|
| XBOX | `xbox_btn_5570ee02d347a46572bb888e0e1996db.webp` (295x55) | `xbox_btn_b551831d93f57fe803ff6cfa2d10cffb.webp` (311x73) |
| Windows | `windows_btn_dadc180f3be1a40d948951f5ef8722cd.webp` (295x55) | `windows_btn_afba7e644684d5692de62b64ca784b5b.webp` (311x73) |
| PS | `ps_btn_3de312d0e8adc7804f1b98ef469368a0.webp` (295x55) | `ps_btn_2cd1d6da071a8690a72b6c02c4fb5f18.webp` (311x73) |
| STEAM | `steam_btn_5453f2326be40f0b0ffe952c1366f57b.webp` (295x55) | `steam_btn_7f53bc51bc9125a2d71a276334199fe7.webp` (311x73) |

### SVG Assets (inline, base64)
- "數量有限 PERSONA3 RELOAD LIMITED BOX" title
- "數量有限 PERSONA3 RELOAD: Aigis Edition" title
- "內含粉絲必須收藏的物品，數量有限的豪華版！" subtitle
- "限定版內附穿戴S.E.E.S.制式戰鬥服臂章的「埃癸斯」模型！" subtitle
- Price tags (multiple, per region)
- "普通盒裝版" title
- "女神異聞錄３ Reload 數位高級版" title
- "女神異聞錄３ Reload 數位豪華版" title
- "下載版《P3R》最特別的版本..." subtitle
- "下載版《P3R》的豪華版本..." subtitle
- BUY NOW header icon

## Text Content (verbatim)

### Tab Labels
- 盒裝版
- 下載版

### LIMITED BOX Bundle Items
- S.E.E.S. 制式戰鬥服臂章 - 完全重現新設計的S.E.E.S.臂章！只能藉由此管道獲得的豪華臂章。 只要穿戴此臂章，您也能成為S.E.E.S.的一員！
- PERSONA3 RELOAD ART BOOK
- PERSONA3 RELOAD LIMITED BOX Original Sound Track - 收錄ATLUS Sound Team為本作品製作的樂曲。除了有將《女神異聞錄３》樂曲重新編曲的Reload版樂曲之外，也有收錄全新樂曲！總計60首樂曲、2張CD套組的豪華完整原聲帶。
- P4G 八十神高級中學服裝套組＆P4G人格面具套組 DLC - 此套組內含２種DLC，分別為可在本作品中穿著《女神異聞錄４ 黃金版》中登場的八十神高級中學制服，以及可召喚《女神異聞錄４ 黃金版》中登場的人格面具：伊邪那岐、禍津伊邪那岐、輝夜。

### Aigis Edition Bundle Items
- 埃癸斯模型 - 桐条集團製作的對陰影用特別鎮壓兵器七式「埃癸斯」的《女神異聞錄３ Reload》特別模型。「埃癸斯」以全新姿態再次登場！
- PERSONA3 RELOAD ART BOOK - 大量收錄本作品美術相關資料，包括角色插圖、設定畫、背景美術資料以及遊戲內插圖素材等等！總計64頁、B5硬殼封面的豪華美術書。
- PERSONA3 RELOAD LIMITED BOX Original Sound Track
- P4G 八十神高級中學服裝套組＆P4G人格面具套組 DLC

### Standard Package
- 『女神異聞錄３ Reload』遊戲軟件（盒裝版）

### Digital Premium (數位高級版) DLC Contents
- DLC包 - 內附額外販售的本作品DLC（約 台灣 850 NT$/香港 210 HKD）
  - P5R怪盜團服裝套組（台灣 90 NT$/香港 22 HKD）
  - P5R秀盡學園高校服裝套組（台灣 90 NT$/香港 22 HKD）
  - P5R人格面具套組１（台灣 180 NT$/香港 44 HKD）
  - P5R人格面具套組２（台灣 180 NT$/香港 44 HKD）

### Digital Deluxe (數位豪華版) Contents
- PERSONA3 RELOAD Digital ART BOOK - 大量收錄本作品美術相關資料，包括角色插圖、設定畫、背景美術資料以及遊戲內插圖素材等等！藉由此數位APP可盡情閱覽總計64頁的豪華美術書內容。
- PERSONA3 RELOAD Digital Original Sound Track

### Disclaimer Notes
- ※數量有限，售完即止。
- ※圖像均為製作中的示意圖。內容有可能未經預告進行變更。
- ※「PERSONA3 RELOAD LIMITED BOX Original Sound Track」所收錄的樂曲在遊戲發售一定期間之後有可能會以數位下載或另售的CD形式進行販售。
- ※「P4G八十神高級中學服裝套組」＆「P4G人格面具套組」DLC有預定個別發售。
- ※『PERSONA3 RELOAD: Aigis Edition』僅販售PS5版。

### Safety Warnings (S.E.E.S. Armband)
- 請勿交給未滿3歲的小孩子使用。
- 捆包材料請勿放入口中。另外，請收藏在小孩子無法靠近的地方，或是立刻丟棄。有可能意外造成窒息等危險。
- 此物品之設計為鑑賞用。
- 雖然設計為可穿戴的樣式，但若遇到不符合自身尺寸的尺寸時，請勿勉強穿戴。
- 穿戴本物品時請勿過度揮動手臂或進行激烈運動。
- 若以粗魯的方式使用將造成破損，還請務必留意。
- 請勿收藏於靠近火源、熱源、直射日光等高溫多濕之處，有可能因此造成褪色、變色，或是引起火災。
- 請勿使用於原本設計目的以外的用途。
- 如遇破損，請立刻停止使用。

## Pricing Summary

| Edition | TW Price | HK Price |
|---|---|---|
| LIMITED BOX (盒裝限量版) | 2,590 NT$ | 648 HKD |
| Aigis Edition (盒裝埃癸斯版) | 2,590 NT$ | 648 HKD |
| Digital Premium (數位高級版) | 2,490 NT$ | 608 HKD |
| Digital Deluxe (數位豪華版) | 1,990 NT$ | 468 HKD |

## Responsive Behavior

- Desktop width: 1280px (inside wrapper)
- PC/SP image variants exist (v-pc / v-sp classes)
- Platform buttons have both PC (295x55) and SP (311x73) variants
- Tab buttons are 50% width each (640px of 1280px)
- Product sections use flex layout for side-by-side display on desktop

## Implementation Notes

- No Swiper/carousel library detected - this is a tab-based layout, not a slider
- Tab switching is handled by toggling `.show` class on `.product-content` elements
- SVG images are used extensively for text elements (titles, descriptions, prices) to ensure consistent typography across platforms
- Real product images use `.webp` format with cache-busting hashes in filenames
- The "BUY NOW" header uses an SVG icon/image rather than text
- Platform store buttons repeat for each product tier (XBOX, Windows, PS, STEAM)
- The `.to-stores-btn` links to `/p3r/cht/stores/` for the full store listing
