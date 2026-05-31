# Hero (FV) Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshot:** `docs/design-references/header-screenshot.png` (hero is visible in the same screenshot)
- **Source URL:** https://asia.sega.com/p3r/cht/
- **Selector:** `section.fv`
- **Interaction model:** scroll-driven (parallax video, scroll indicator)

## DOM Structure

```
section.fv                           (785px height, position: relative)
  h1.title-logo                      (position: absolute, centered, z-index: 100)
    img                              (SVG logo: "PERSONA3 RELOAD", 302x227px display)
  div.fv-text.run                    (position: absolute, top: 78.5px, left: 51.2656px, z-index: 100)
    svg x2                           (decorative text SVGs: "PERSONA3 RELOAD NOW ON SALE")
    span.disp-none                   (screen-reader text: "PERSONA3 RELOAD NOW ON SALE")
  div.scroll-box                     (position: absolute, top: 690px, center-x, z-index: 100)
    span.scroll-text                 (text: "SCROLL")
  div.fv-movie.pc-fv-movie.v-pc     (position: absolute, full-size, overflow: hidden)
    video#pc-fv-movie1               (muted, playsinline, preload: auto)
      source                         (fv_movie1.mp4)
    video#pc-fv-movie2               (muted, playsinline, loop, preload: auto)
      source                         (fv_movie2.mp4)
  div.fv-overlay                     (position: absolute, full-size, overflow: hidden)
    img.particle.v-pc                (hologram effect, 1282x785px, display: inline)
    img.particle.v-sp                (mobile variant, display: none)
```

## Computed Styles (exact values)

### Container: `section.fv`
- **position:** relative
- **width:** 1282px
- **height:** 785px
- **display:** block
- **background:** none / transparent
- **overflow:** visible
- **opacity:** 1
- **font-family:** Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif
- **font-size:** 16px
- **font-weight:** 400
- **color:** rgb(29, 56, 74)

### Title Logo: `h1.title-logo`
- **position:** absolute
- **top:** 392.5px (center vertically: 785/2 = 392.5)
- **left:** 897.391px
- **transform:** matrix(1, 0, 0, 1, -151, -113.5) (centered: shifts left 151px, up 113.5px)
- **Effective position:** ~(746.4px, 279px)
- **width:** 302px
- **height:** 227px
- **z-index:** 100
- **opacity:** 1
- **display:** block
- **overflow:** visible

### Title Logo Image: `img`
- **alt:** PERSONA3 RELOAD
- **natural size:** 200x150 (SVG intrinsic)
- **display size:** 302x227px
- **src:** data:image/svg+xml;base64 (inline SVG with white fill, group id="FV_logo", id="TC")
- **SVG viewBox:** 0 0 302.4 227.12
- **fill:** white (#fff)

### FV Text: `div.fv-text.run`
- **position:** absolute
- **top:** 78.5px
- **left:** 51.2656px
- **width:** 240px
- **height:** 0px (SVG content overflows)
- **z-index:** 100
- **overflow:** visible
- Contains 2 SVG elements:
  - SVG 1: viewBox="0 0 318.02 86.82" (PERSONA3 RELOAD text)
  - SVG 2: viewBox="0 0 424.59 99.8" (NOW ON SALE text)

### Scroll Box: `div.scroll-box`
- **position:** absolute
- **top:** 690px
- **left:** 641px
- **transform:** matrix(1, 0, 0, 1, -18.4844, 0) (centered: shifts left ~18.5px)
- **Effective left:** ~622.5px
- **width:** 36.9688px
- **height:** 15px
- **z-index:** 100
- **overflow:** visible

### Scroll Text: `span.scroll-text`
- **font-family:** Syncopate, sans-serif
- **font-size:** 10px
- **font-weight:** 400
- **line-height:** 10px
- **color:** rgb(255, 255, 255) (white)
- **opacity:** 1

### FV Movie: `div.fv-movie.pc-fv-movie.v-pc`
- **position:** absolute
- **top:** 0px
- **left:** 0px
- **width:** 1282px
- **height:** 785px
- **overflow:** hidden
- **display:** block
- **opacity:** 1

### Video Elements
| Property | Video 1 (intro) | Video 2 (loop) |
|----------|-----------------|----------------|
| id | pc-fv-movie1 | pc-fv-movie2 |
| preload | auto | auto |
| muted | true | true |
| playsinline | true | true |
| loop | false | true |
| display size | 1396x785px | 1396x785px |
| left offset | -64.5px (centered crop) | -64.5px |

### FV Overlay: `div.fv-overlay`
- **position:** absolute
- **top:** 0px
- **left:** -102.547px (extends beyond viewport for parallax effect)
- **width:** 1282px
- **height:** 785px
- **overflow:** hidden
- **display:** block
- **opacity:** 1

### Particle Image (hologram): `img.particle.v-pc`
- **position:** absolute
- **top:** 0px
- **left:** 0px
- **width:** 1282px
- **height:** 785px
- **display:** inline
- **opacity:** 1
- **src:** /p3r/cht/resources/img/top/fv_hologram_623ce43cef503d4df8ac692f74547213.webp
- **alt:** (empty)

### Particle Image (mobile): `img.particle.v-sp`
- **display:** none (hidden on desktop)
- **src:** /p3r/cht/resources/img/sp/top/fv_hologram_e0a0ed590c03ee6de8200004c314bc31.webp

## States & Behaviors

### Video Playback
- **Video 1 (intro):** Plays once on page load, muted, playsinline. Does NOT loop.
- **Video 2 (loop):** After intro finishes, this loops continuously. Muted, playsinline.
- Videos are oversized (1396px wide for 1282px container) and offset by -64.5px to center-crop.

### Parallax / Overlay Effect
- The `fv-overlay` is positioned at `left: -102.547px`, extending beyond the viewport.
- The `particle` hologram image fills the overlay, creating a floating particle/hologram effect over the video.
- On desktop, the PC variant is visible; on mobile, the SP variant is shown.

### Scroll Indicator
- Positioned at bottom-center of hero (top: 690px)
- White text "SCROLL" in Syncopate font at 10px
- Likely has a CSS animation (bounce/pulse) not captured in static styles

### Screen Reader Accessibility
- `span.disp-none` contains "PERSONA3 RELOAD NOW ON SALE" for screen readers
- SVG text is decorative (no alt text on individual SVGs)

## Assets

### Videos
| File | URL | Type |
|------|-----|------|
| Intro video | https://asia.sega.com/p3r/cht/resources/img/top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4 | video/mp4 |
| Loop video | https://asia.sega.com/p3r/cht/resources/img/top/fv_movie2_1aaf21a0de60678450744da0dbaf9ef4.mp4 | video/mp4 |

### Images
| File | URL | Format | Size |
|------|-----|--------|------|
| Title logo | data:image/svg+xml;base64 (inline) | SVG | 302.4 x 227.12 viewBox |
| Hologram PC | https://asia.sega.com/p3r/cht/resources/img/top/fv_hologram_623ce43cef503d4df8ac692f74547213.webp | WebP | 1282x785px |
| Hologram SP | https://asia.sega.com/p3r/cht/resources/img/sp/top/fv_hologram_e0a0ed590c03ee6de8200004c314bc31.webp | WebP | (mobile) |

### SVG Content (inline)
- **Title logo SVG:** viewBox="0 0 302.4 227.12", white fill, group id="FV_logo", contains TC-specific sub-paths
- **FV text SVG 1:** viewBox="0 0 318.02 86.82" - "PERSONA3 RELOAD" decorative text
- **FV text SVG 2:** viewBox="0 0 424.59 99.8" - "NOW ON SALE" decorative text

## Text Content (verbatim)

| Element | Text | Notes |
|---------|------|-------|
| `.title-logo img alt` | PERSONA3 RELOAD | Logo alt text |
| `.disp-none` | PERSONA3 RELOAD NOW ON SALE | Screen reader only |
| `.scroll-text` | SCROLL | Scroll indicator |

## Responsive Behavior

### Desktop (1282px+)
- Full-width hero at 785px height
- Video displayed at 1396px width (center-cropped by 64.5px on each side)
- Title logo centered in right portion of hero
- FV text positioned at top-left
- Scroll indicator at bottom-center
- Hologram particle overlay visible (v-pc), v-sp hidden
- Menu button hidden

### Mobile (inferred)
- Hero height likely adapts to viewport
- Mobile video variant used
- v-sp hologram image shown instead of v-pc
- FV text SVGs may have different positioning
- Title logo may reposition for smaller screens
