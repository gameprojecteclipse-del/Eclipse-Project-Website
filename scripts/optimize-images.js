import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/assets/gallery');
const THUMB_WIDTH = 600; // Small size for carousel
const FULL_WIDTH = 1920; // Full HD for lightbox
const QUALITY = 80;

console.log('🌑 Eclipse Gallery Optimizer Initiated...');

if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Directory not found: ${INPUT_DIR}`);
    process.exit(1);
}

const files = fs.readdirSync(INPUT_DIR);
const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

if (imageFiles.length === 0) {
    console.log('⚠️ No images found to optimize.');
    process.exit(0);
}

console.log(`📸 Found ${imageFiles.length} images. Processing...`);

async function processImages() {
    for (const file of imageFiles) {
        const inputPath = path.join(INPUT_DIR, file);
        const filename = path.parse(file).name;

        // Output paths
        const thumbPath = path.join(INPUT_DIR, `${filename}_thumb.webp`);
        const fullPath = path.join(INPUT_DIR, `${filename}.webp`);

        try {
            // 1. Generate Thumbnail (WebP, Resize)
            await sharp(inputPath)
                .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(thumbPath);

            // 2. Generate Full Version (WebP, optimized)
            await sharp(inputPath)
                .resize(FULL_WIDTH, null, { withoutEnlargement: true })
                .webp({ quality: 85 }) // Slightly higher quality for full view
                .toFile(fullPath);

            console.log(`✅ Optimized: ${file} -> .webp & _thumb.webp`);
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error);
        }
    }
    console.log('✨ Optimization Complete. The Eclipse is ready.');
}

processImages();
