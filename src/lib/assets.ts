// Image path helpers for P3R website clone
export const img = (path: string) => `/images/${path}`;

// Top section images
export const ASSETS = {
  // Videos
  fvMovie1: '/images/top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4',
  fvMovie2: '/images/top/fv_movie2_1aaf21a0de60678450744da0dbaf9ef4.mp4',

  // Hero
  fvHologram: '/images/top/fv_hologram_623ce43cef503d4df8ac692f74547213.webp',

  // Products
  productLimitedBox: '/images/top/product_limited-box_75e8384f8e13c5ee361878dbac9b15cc.webp',
  productAegisFigure: '/images/top/product_aegis_figure_492a76d483eef5a0f9b2eb55d9226be4.webp',
  productPackage: '/images/top/product_package_f61469326582b9529ea38e7db333ab32.webp',

  // Platform buttons (PC version)
  xboxBtn: '/images/top/xbox_btn_5570ee02d347a46572bb888e0e1996db.webp',
  windowsBtn: '/images/top/windows_btn_dadc180f3be1a40d948951f5ef8722cd.webp',
  psBtn: '/images/top/ps_btn_3de312d0e8adc7804f1b98ef469368a0.webp',
  steamBtn: '/images/top/steam_btn_5453f2326be40f0b0ffe952c1366f57b.webp',

  // DLC
  dlcLinkBtn: '/images/top/dlc_link_btn_addfe47e2bf6efa45da9cc9a61e9b045.webp',
  ssDlc: '/images/top/ss_dlc_017f9d80702e1e259055495112f6d98b.webp',

  // Story screenshots
  ssIntroduction: '/images/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png',
  ssFeatures: '/images/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png',
  ssGameSystem: '/images/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg',

  // Game system
  gameSystemBtn: '/images/top/game_system_btn_93b79219b6b23d84aac594bf2c413d61.webp',
  moreBtn: '/images/top/more_btn_ff987f7519c7ea0308d5e576cc7a493d.webp',

  // Spec LP
  specLp: '/images/top/spec_lp_de8367019b6fd81974356e5358bda1ca.png',

  // Common
  logoColor: '/images/common/logo_color_c0496c8e0a1e762a98ba0b21894eddcc.webp',
  atlusLogo: '/images/common/atlus_logo_853c96f1dd3f1de2b369be4f9dd38b47.webp',
  pStudioLogo: '/images/common/p_studio_logo_309f72dd4c41c3616cc1eb2b576c2561.webp',
  modalClose: '/images/common/modal_close_6eebb1c694aba083fc06c16e60ff4b7e.png',

  // Platform logos
  xboxXsLogo: '/images/common/xbox_xs_logo_716872195e3289c9541e980c543ef82a.webp',
  xboxOneLogo: '/images/common/xbox_one_logo_81ff2c384596af3177ba3018ccfa7b48.webp',
  windowsLogo: '/images/common/windows_logo_2149d9c4adabcad6a7f8534d96ba1a6d.webp',
  ps5Ps4Logo: '/images/common/ps5_ps4_logo_edcdc8392c0fd9286e1187e973d21b89.webp',
  steamLogo: '/images/common/steam_logo_f359fba372b69c152feb76e4e2203d7a.webp',

  // Footer logos
  footerPsLogo: '/images/common/footer_ps_logo_9cbc20290408a1a8cffa98865bfab899.png',
  footerPs4Logo: '/images/common/footer_ps4_logo_12b9a036d064549b9b3fdf1d9a8d2605.png',
  footerPs5Logo: '/images/common/footer_ps5_logo_b8ccb93a41ae8291ae68ce2a9a9fad99.png',

  // Character images (on/off pairs)
  characters: Array.from({ length: 13 }, (_, i) => {
    const n = i + 1;
    const hashes: Record<number, { on: string; off: string }> = {
      1: { on: 'character1_badbd990dcbabe1f25c22de113f772a0', off: 'character1_off_c6e5fcab1669dd9cf66e96a871af304d' },
      2: { on: 'character2_35a3dc87ea1a02e2e3d6397d46e1cbf9', off: 'character2_off_ae2353448bb0b41a6d4bcee128ce7dd1' },
      3: { on: 'character3_cd155bb1faff87558813a0054f0f9436', off: 'character3_off_dce3dd1daf8a4d76ef754c63c526bf14' },
      4: { on: 'character4_b11ad41cb7a01fef1d40aeb65d002471', off: 'character4_off_f3f7ad24a2724e732efa3f4f0b2638ed' },
      5: { on: 'character5_fa07d2d06f3925eea4af9a91937506ba', off: 'character5_off_b487aeaab9cacea5f6d5d992f302edad' },
      6: { on: 'character6_0e3115e9f6076da20973ac40ef045866', off: 'character6_off_7dad6fb4313cd40fea86ab9dc1b5ec3a' },
      7: { on: 'character7_532c5a12d64704763e5cac354fb3874c', off: 'character7_off_55056899b01c4bcd7bd1d9bcb3ecfa6a' },
      8: { on: 'character8_790cb89b62931cfe93f16d61c746464d', off: 'character8_off_3f02f0728d931c41cfa70de58e96ef83' },
      9: { on: 'character9_a298bc6fd82a5d83fd4c04fa9c031f4f', off: 'character9_off_dc21e770c325edf90d9913721b8c4429' },
      10: { on: 'character10_a301f968f599f0c8c5556d55da608f2d', off: 'character10_off_9beae43b67d90f05dbcd4b5c0b8ddea7' },
      11: { on: 'character11_4d8a7c2345cbb892172a28b62e258bd6', off: 'character11_off_baa1b252d3fed97cf47eed2e73a3e5c8' },
      12: { on: 'character12_f2b86e413b00e552aeca9b0960ca96d6', off: 'character12_off_8cc7ad1e47b92b0c15373879c66d14a3' },
      13: { on: 'character13_c47bbc2365b7492613827dd458c56138', off: 'character13_off_26b55d7b4417aee2b8b0f25e7adbc2bc' },
    };
    const h = hashes[n];
    return {
      on: `/images/top/${h.on}.webp`,
      off: `/images/top/${h.off}.webp`,
    };
  }),
} as const;

// Character background colors
export const CHARA_BG_COLORS = [
  'rgb(91, 164, 215)',   // default
  'rgb(134, 237, 252)',  // bg1 - Hero
  'rgb(252, 147, 255)',  // bg2 - Yukari
  'rgb(152, 159, 251)',  // bg3 - Junpei
  'rgb(211, 218, 218)',  // bg4 - Akihiko
  'rgb(246, 140, 168)',  // bg5 - Mitsuru
  'rgb(149, 245, 220)',  // bg6 - Fuka
  'rgb(242, 244, 242)',  // bg7 - Koromaru
  'rgb(250, 246, 166)',  // bg8 - Aegis
  'rgb(250, 186, 128)',  // bg9 - Ken
  'rgb(206, 137, 152)',  // bg10 - Shinjiro
  'rgb(147, 204, 150)',  // bg-strega (shared by 11-13)
] as const;

// Character names
export const CHARA_NAMES = [
  'Hero', 'Yukari', 'Junpei', 'Akihiko', 'Mitsuru',
  'Fuka', 'Koromaru', 'Aegis', 'Ken', 'Shinjiro',
  'Takaya', 'Jin', 'Chidori',
] as const;

// YouTube trailer URLs
export const PV_URLS = [
  'https://www.youtube.com/watch?v=TlToA-OjWMo',
  'https://www.youtube.com/watch?v=iCkXVS-4uXo',
  'https://www.youtube.com/watch?v=V_G4VAmP2ms',
  'https://www.youtube.com/watch?v=Z9U-5zK9xsQ',
  'https://www.youtube.com/watch?v=5n2t-_GyNr4',
  'https://www.youtube.com/watch?v=mY8dXU5pGH4',
  'https://www.youtube.com/watch?v=GAgj2OyOTlQ',
  'https://www.youtube.com/watch?v=bUkWGPTIdyQ',
  'https://www.youtube.com/watch?v=27z-YcANm04',
  'https://www.youtube.com/watch?v=Axoq3eAOjEc',
  'https://www.youtube.com/watch?v=Lm4GVn46wZM',
  'https://www.youtube.com/watch?v=w0dyRdfIXS0',
] as const;
