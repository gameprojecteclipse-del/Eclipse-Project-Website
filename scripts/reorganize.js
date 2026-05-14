import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public/assets');
const SRC_DIR = path.join(process.cwd(), 'src');

const DIRS = {
  logos: path.join(ASSETS_DIR, 'images/logos'),
  gallery: path.join(ASSETS_DIR, 'images/gallery'),
  chroma: path.join(ASSETS_DIR, 'images/sections/chroma'),
  eclipse: path.join(ASSETS_DIR, 'images/sections/eclipse'),
  backgrounds: path.join(ASSETS_DIR, 'images/backgrounds'),
  ui: path.join(ASSETS_DIR, 'images/ui'),
  other: path.join(ASSETS_DIR, 'other'),
  videos: path.join(ASSETS_DIR, 'videos'),
};

// Create directories
Object.values(DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Move mapping
const fileMapping = {
  'cinema-video.webp': DIRS.chroma,
  'design-editorial.webp': DIRS.chroma,
  'direction-artistique.webp': DIRS.chroma,
  'installations-immersives.webp': DIRS.chroma,

  'boss-00039.webp': DIRS.eclipse,
  'extraction.webp': DIRS.eclipse,
  'mutation.webp': DIRS.eclipse,
  'resonance.webp': DIRS.eclipse,

  'chroma-portal-image.webp': DIRS.backgrounds,
  'eclipse-concept-bg.webp': DIRS.backgrounds,
  'eclipse-mythology-bg.webp': DIRS.backgrounds,
};

// Function to move file and log
const moveFile = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
  }
};

// Move specific files from root assets
if (fs.existsSync(ASSETS_DIR)) {
  const files = fs.readdirSync(ASSETS_DIR);
  for (const file of files) {
    const fullPath = path.join(ASSETS_DIR, file);
    if (fs.statSync(fullPath).isFile()) {
      if (fileMapping[file]) {
        moveFile(fullPath, path.join(fileMapping[file], file));
      } else {
        // Move to other
        moveFile(fullPath, path.join(DIRS.other, file));
      }
    }
  }
}

// Move logos
const oldLogos = path.join(ASSETS_DIR, 'logos');
if (fs.existsSync(oldLogos)) {
  const logos = fs.readdirSync(oldLogos);
  for (const logo of logos) {
    moveFile(path.join(oldLogos, logo), path.join(DIRS.logos, logo));
  }
  fs.rmdirSync(oldLogos);
}

// Move gallery
const oldGallery = path.join(ASSETS_DIR, 'gallery');
if (fs.existsSync(oldGallery)) {
  const gallery = fs.readdirSync(oldGallery);
  for (const img of gallery) {
    moveFile(path.join(oldGallery, img), path.join(DIRS.gallery, img));
  }
  fs.rmdirSync(oldGallery);
}

// Move UI (if any in src/assets to public)
// We'll leave src/assets/logo.svg alone but replace references if needed, or better, move it to public
const srcAssets = path.join(SRC_DIR, 'assets');
if (fs.existsSync(srcAssets)) {
  const assets = fs.readdirSync(srcAssets);
  for (const item of assets) {
    moveFile(path.join(srcAssets, item), path.join(DIRS.ui, item));
  }
  fs.rmdirSync(srcAssets);
}

// Update imports/paths in SRC_DIR
const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace logos
  content = content.replace(/\/assets\/logos\//g, '/assets/images/logos/');
  
  // Replace gallery
  content = content.replace(/\/assets\/gallery\//g, '/assets/images/gallery/');
  
  // Replace chroma sections
  content = content.replace(/\/assets\/(cinema-video|design-editorial|direction-artistique|installations-immersives)\.webp/g, '/assets/images/sections/chroma/$1.webp');

  // Replace eclipse sections
  content = content.replace(/\/assets\/(boss-00039|extraction|mutation|resonance)\.webp/g, '/assets/images/sections/eclipse/$1.webp');

  // Replace backgrounds
  content = content.replace(/\/assets\/(chroma-portal-image|eclipse-concept-bg|eclipse-mythology-bg)\.webp/g, '/assets/images/backgrounds/$1.webp');
  // Also handle the boss_00039_ reference in Chroma.tsx/Eclipse.tsx -> actually it might be boss_00039_ or boss-00039. Let's fix that.
  content = content.replace(/\/assets\/boss_00039_/g, '/assets/images/sections/eclipse/boss-00039');

  // Replace src/assets references
  content = content.replace(/\/src\/assets\//g, '/assets/images/ui/');
  content = content.replace(/@\/assets\//g, '/assets/images/ui/');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.ts') || dirFile.endsWith('.tsx') || dirFile.endsWith('.css') || dirFile.endsWith('.html')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const srcFiles = walkSync(SRC_DIR);
srcFiles.push(path.join(process.cwd(), 'index.html'));
srcFiles.push(path.join(process.cwd(), 'tailwind.config.ts'));

for (const file of srcFiles) {
  replaceInFile(file);
}

console.log("Reorganization complete.");
