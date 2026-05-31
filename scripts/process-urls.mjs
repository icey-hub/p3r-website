import { writeFileSync, readFileSync } from 'fs';

// Read the raw extraction data
const rawData = readFileSync('E:/claudecode/web/p3r/scripts/raw-extract.json', 'utf-8');
const parsed = JSON.parse(rawData);
const data = JSON.parse(parsed.value);

const allUrls = new Set();

// Add images
if (data.images) {
  data.images.forEach(url => {
    if (url && !url.startsWith('data:')) allUrls.add(url);
  });
}

// Add background images
if (data.bgImages) {
  data.bgImages.forEach(url => {
    if (url && !url.startsWith('data:')) allUrls.add(url);
  });
}

// Add videos
if (data.videos) {
  data.videos.forEach(url => {
    if (url) allUrls.add(url);
  });
}

// Add favicons
if (data.favicons) {
  data.favicons.forEach(url => {
    if (url) allUrls.add(url);
  });
}

// Add CSS assets (manually extracted)
const cssAssets = [
  "../../resources/img/common/modal_close_6eebb1c694aba083fc06c16e60ff4b7e.png",
  "/resources/fonts/Syncopate-Bold.ttf",
  "/resources/fonts/Urbanist-VariableFont_wght.ttf",
  "/resources/fonts/Urbanist-Bold.ttf",
  "../../resources/img/common/footer_ps_logo_9cbc20290408a1a8cffa98865bfab899.png",
  "../../resources/img/common/footer_ps5_logo_b8ccb93a41ae8291ae68ce2a9a9fad99.png",
  "../../resources/img/common/footer_ps4_logo_12b9a036d064549b9b3fdf1d9a8d2605.png",
  "../../resources/img/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png",
  "../../resources/img/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png",
  "../../resources/img/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg",
  "../../resources/img/common/sp/menu_btn_d3afda2769ecbdf8d383793bedcaae82.png",
  "../../_/node_modules/slick-carousel/slick/ajax-loader_c5cd7f5300576ab4c88202b42f6ded62.gif"
];

cssAssets.forEach(raw => {
  let url = raw;
  if (url.startsWith('../../')) {
    url = 'https://asia.sega.com/p3r/cht/' + url.replace('../../', '');
  } else if (url.startsWith('/')) {
    url = 'https://asia.sega.com' + url;
  }
  allUrls.add(url);
});

const urlList = [...allUrls].sort();
console.log(`Total unique URLs: ${urlList.length}`);
console.log('Categories:');
const images = urlList.filter(u => /\.(webp|png|jpg|jpeg|gif|svg|ico)$/i.test(u));
const videos = urlList.filter(u => /\.(mp4|webm|ogg)$/i.test(u));
const fonts = urlList.filter(u => /\.(ttf|woff|woff2|otf)$/i.test(u));
const youtube = urlList.filter(u => u.includes('youtube'));
console.log(`  Images: ${images.length}`);
console.log(`  Videos: ${videos.length}`);
console.log(`  Fonts: ${fonts.length}`);
console.log(`  YouTube: ${youtube.length}`);

writeFileSync('E:/claudecode/web/p3r/scripts/asset-urls.json', JSON.stringify(urlList, null, 2));
console.log('Written to asset-urls.json');
