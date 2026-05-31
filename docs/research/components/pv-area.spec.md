# PV Area Specification

## Overview
- **Target file:** `src/components/PvArea.tsx`
- **Source URL:** https://asia.sega.com/p3r/cht/
- **Screenshot:** `docs/design-references/pv-area.png`
- **Interaction model:** click-driven (click to play YouTube trailer)

## DOM Structure

```
section.pv-area                          (1282px x 240px, overflow: hidden, position: relative)
  a.pv[0]                                (1282px x 240px, position: relative, z-index: 10, cursor: pointer)
    div#pv-player.pv-player              (1282px x 722px, position: absolute, top: -241px, left: 0, z-index: 0, filter: grayscale(1))
    div.cover                            (1282px x 240px, position: absolute, z-index: 20, bg: rgb(220,233,245), transition: 0.5s ease-out)
    p.headline-text.play                 (position: absolute, top: 120px, left: 641px, z-index: 50, transform: translate(-67.72px, -8.5px))
      span.arrow                         (18px x 17px, bg: SVG arrow icon, margin-left: 14px)
  a.pv[1..11]                            (1282px x 240px each, position: relative, z-index: 10, cursor: pointer)
    (no children - these are alternate trailer slides)
```

**Total child count:** 12 `<a.pv>` elements (1 with full player structure, 11 empty alternate slides)

## Computed Styles (exact values)

### Root: `section.pv-area`
| Property | Value |
|---|---|
| width | 1282px |
| height | 240px |
| display | block |
| position | relative |
| overflow | hidden |
| font-family | Urbanist, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Helvetica, Arial, sans-serif |
| font-size | 16px |
| font-weight | 400 |
| line-height | 16px |
| color | rgb(29, 56, 74) |
| margin-top | -1px |
| transition | all |

### Link: `a.pv`
| Property | Value |
|---|---|
| width | 1282px |
| height | 240px |
| display | block |
| position | relative |
| z-index | 10 |
| overflow | hidden |
| cursor | pointer |
| transition | all |

### Player: `div#pv-player.pv-player`
| Property | Value |
|---|---|
| width | 1282px |
| height | 722px |
| position | absolute |
| top | -241px |
| left | 0 |
| z-index | 0 |
| filter | grayscale(1) |
| overflow | visible |

### Cover Overlay: `div.cover`
| Property | Value |
|---|---|
| width | 1282px |
| height | 240px |
| position | absolute |
| z-index | 20 |
| background-color | rgb(220, 233, 245) |
| transition | 0.5s ease-out |

### Headline Text: `p.headline-text.play`
| Property | Value |
|---|---|
| font-family | Syncopate, sans-serif |
| font-size | 16px |
| font-weight | 400 |
| color | rgb(29, 56, 74) |
| display | flex |
| align-items | end |
| position | absolute |
| top | 120px |
| left | 641px |
| transform | matrix(1, 0, 0, 1, -67.7188, -8.5) |
| z-index | 50 |
| width | 135.438px |
| height | 17px |
| cursor | pointer |

### Arrow Icon: `span.arrow`
| Property | Value |
|---|---|
| width | 18px |
| height | 17px |
| display | block |
| margin-left | 14px |
| background | url("data:image/svg+xml;base64,...") - inline SVG arrow pointing right |
| transition | transform 0.3s linear, -webkit-transform 0.3s linear |
| cursor | pointer |

## States & Behaviors

### Default State
- Cover overlay (`.cover`) is visible with `background-color: rgb(220, 233, 245)` at z-index 20
- Player (`#pv-player`) is positioned above the visible area (`top: -241px`) with `filter: grayscale(1)`
- "PLAY TRAILER" text is centered vertically in the visible area

### Hover State (inferred)
- Cover overlay fades out (transition: 0.5s ease-out)
- Player grayscale filter likely removed
- Arrow icon animates (transform transition: 0.3s linear)

### Click Behavior
- First `<a.pv>` links to: `https://www.youtube.com/watch?v=TlToA-OjWMo?autoplay=1&mute=1`
- Each of the 12 `<a.pv>` slides links to a different YouTube trailer
- On click, the YouTube video opens/embeds with autoplay and muted

### Video Embedding
- No iframe/video element currently in DOM
- `#pv-player` div is an empty container (likely populated by JS on interaction)
- Videos are YouTube links with `?autoplay=1&mute=1` parameters

## Assets

### YouTube Video Links (12 trailers)
| Index | URL |
|---|---|
| 0 | https://www.youtube.com/watch?v=TlToA-OjWMo?autoplay=1&mute=1 |
| 1 | https://www.youtube.com/watch?v=iCkXVS-4uXo?autoplay=1&mute=1 |
| 2 | https://www.youtube.com/watch?v=V_G4VAmP2ms?autoplay=1&mute=1 |
| 3 | https://www.youtube.com/watch?v=Z9U-5zK9xsQ?autoplay=1&mute=1 |
| 4 | https://www.youtube.com/watch?v=5n2t-_GyNr4?autoplay=1&mute=1 |
| 5 | https://www.youtube.com/watch?v=mY8dXU5pGH4?autoplay=1&mute=1 |
| 6 | https://www.youtube.com/watch?v=GAgj2OyOTlQ?autoplay=1&mute=1 |
| 7 | https://www.youtube.com/watch?v=bUkWGPTIdyQ?autoplay=1&mute=1 |
| 8 | https://www.youtube.com/watch?v=27z-YcANm04?autoplay=1&mute=1 |
| 9 | https://www.youtube.com/watch?v=Axoq3eAOjEc?autoplay=1&mute=1 |
| 10 | https://www.youtube.com/watch?v=Lm4GVn46wZM?autoplay=1&mute=1 |
| 11 | https://www.youtube.com/watch?v=w0dyRdfIXS0?autoplay=1&mute=1 |

### Inline SVG Assets
- **Arrow icon** (span.arrow): 18x17px right-pointing arrow, stroke color #1d384a, stroke-width 2px

## Text Content (verbatim)

- `PLAY TRAILER` - headline text inside `p.headline-text.play`

## Responsive Behavior

- Component has a fixed width of 1282px (desktop)
- Player height is 722px (3x the visible 240px area), positioned to show only the center portion
- Cover overlay matches the full visible area dimensions
- The 12 `<a.pv>` slides are stacked (all 1282px x 240px) - likely controlled by JS for slide visibility/transitions

## Implementation Notes

- The PV area is a horizontal strip showing 240px of a taller video player
- The `#pv-player` div is 722px tall but only 240px is visible due to `overflow: hidden` on the parent
- The cover overlay (`div.cover`) sits on top of the player at z-index 20, hiding the video until interaction
- Only the first `<a.pv>` has children (player, cover, headline); the other 11 are empty slides
- Font "Syncopate" is used for the "PLAY TRAILER" text (external Google Font)
- All slides use YouTube URLs with autoplay+mute parameters
