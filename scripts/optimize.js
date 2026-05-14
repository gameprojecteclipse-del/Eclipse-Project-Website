import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const normalizeName = (name) => {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-zA-Z0-9.\-]/g, '-') // replace non-alphanumeric (except dots and dashes) with dash
    .replace(/-+/g, '-') // remove consecutive dashes
    .replace(/^-|-$/g, '') // remove leading/trailing dashes
    .toLowerCase();
};

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'videos') {
        await processDirectory(fullPath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        const baseName = path.basename(file, ext);
        const safeBaseName = normalizeName(baseName);
        const targetName = `${safeBaseName}.webp`;
        const targetPath = path.join(dir, targetName);

        if (fullPath !== targetPath || ext !== '.webp') {
          console.log(`Optimizing: ${file} -> ${targetName}`);
          try {
            await sharp(fullPath)
              .webp({ quality: 90, nearLossless: true })
              .toFile(targetPath + '.tmp');
            
            fs.renameSync(targetPath + '.tmp', targetPath);
            
            if (fullPath !== targetPath) {
              fs.unlinkSync(fullPath);
            }
          } catch (e) {
            console.error(`Failed to process ${file}`, e);
          }
        }
      }
    }
  }
};

const run = async () => {
  console.log("Starting image optimization...");
  await processDirectory(path.join(process.cwd(), 'public/assets'));
  console.log("Done!");
};

run();
