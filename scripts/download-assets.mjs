import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import https from 'https';
import http from 'http';

const urls = JSON.parse(readFileSync('./scripts/asset-urls.json', 'utf-8'));
const outDir = './public/images';

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const file = join(outDir, dest);
    const dir = dirname(file);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`${res.statusCode} ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        writeFileSync(file, Buffer.concat(chunks));
        resolve(file);
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function getDest(url) {
  const match = url.match(/\/resources\/img\/(.+)$/);
  if (match) return match[1];
  const match2 = url.match(/\/([^\/]+)$/);
  return match2 ? match2[1] : `asset_${Math.random().toString(36).slice(2)}.webp`;
}

async function main() {
  const concurrency = 4;
  let done = 0;
  let failed = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(url => download(url, getDest(url)))
    );
    results.forEach((r, j) => {
      if (r.status === 'fulfilled') done++;
      else failed.push({ url: batch[j], error: r.reason?.message });
    });
    process.stdout.write(`\rDownloaded: ${done}/${urls.length} (failed: ${failed.length})`);
  }

  console.log(`\nDone! Downloaded: ${done}, Failed: ${failed.length}`);
  if (failed.length > 0) {
    writeFileSync('./scripts/failed-downloads.json', JSON.stringify(failed, null, 2));
  }
}

main().catch(console.error);
