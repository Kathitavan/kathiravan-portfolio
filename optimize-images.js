import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, dirname, basename } from 'path';

const folders = ['./public/assets/images', './public/assets/certificates'];;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const dir = dirname(filePath);
  const name = basename(filePath, ext);
  const outPath = join(dir, `${name}.webp`);

  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(outPath);

  console.log(`✅ ${filePath} → ${outPath}`);
}

async function processFolder(folder) {
  try {
    const files = readdirSync(folder);
    for (const file of files) {
      const fullPath = join(folder, file);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        await processFolder(fullPath);
      } else {
        await optimizeImage(fullPath);
      }
    }
  } catch (e) {
    console.log(`Skipping ${folder}`);
  }
}

for (const folder of folders) {
  await processFolder(folder);
}

console.log('🎉 All images optimized!');