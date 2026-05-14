import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public/assets');
const SRC_DIR = path.join(process.cwd(), 'src');

const DIRS = {
  eclipse: {
    logos: path.join(ASSETS_DIR, 'eclipse/logos'),
    backgrounds: path.join(ASSETS_DIR, 'eclipse/backgrounds'),
    sections: path.join(ASSETS_DIR, 'eclipse/sections'),
    gallery: path.join(ASSETS_DIR, 'eclipse/gallery'),
    videos: path.join(ASSETS_DIR, 'eclipse/videos'),
  },
  chroma: {
    logos: path.join(ASSETS_DIR, 'chroma/logos'),
    backgrounds: path.join(ASSETS_DIR, 'chroma/backgrounds'),
    sections: path.join(ASSETS_DIR, 'chroma/sections'),
  },
  portal: {
    backgrounds: path.join(ASSETS_DIR, 'portal/backgrounds'),
    ui: path.join(ASSETS_DIR, 'portal/ui'),
  }
};

// Create directories
Object.values(DIRS).forEach(domain => {
  Object.values(domain).forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
});

// Function to move folder contents recursively
const moveDirContents = (src, dest) => {
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src);
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      if (fs.statSync(srcPath).isFile()) {
        fs.renameSync(srcPath, destPath);
      }
    }
  }
};

// Move files
moveDirContents(path.join(ASSETS_DIR, 'images/logos'), DIRS.chroma.logos);
moveDirContents(path.join(ASSETS_DIR, 'images/gallery'), DIRS.eclipse.gallery);
moveDirContents(path.join(ASSETS_DIR, 'images/sections/chroma'), DIRS.chroma.sections);
moveDirContents(path.join(ASSETS_DIR, 'images/sections/eclipse'), DIRS.eclipse.sections);
moveDirContents(path.join(ASSETS_DIR, 'videos'), DIRS.eclipse.videos);

// Move backgrounds specifically
const backgroundsDir = path.join(ASSETS_DIR, 'images/backgrounds');
if (fs.existsSync(backgroundsDir)) {
  const bgFiles = fs.readdirSync(backgroundsDir);
  for (const file of bgFiles) {
    const srcPath = path.join(backgroundsDir, file);
    if (file.includes('eclipse')) {
      fs.renameSync(srcPath, path.join(DIRS.eclipse.backgrounds, file));
    } else if (file.includes('chroma')) {
      fs.renameSync(srcPath, path.join(DIRS.portal.backgrounds, file));
    } else {
      // Default to portal if unknown
      fs.renameSync(srcPath, path.join(DIRS.portal.backgrounds, file));
    }
  }
}

// Move UI (logo.svg is Eclipse)
const uiDir = path.join(ASSETS_DIR, 'images/ui');
if (fs.existsSync(uiDir)) {
  const uiFiles = fs.readdirSync(uiDir);
  for (const file of uiFiles) {
    if (file === 'logo.svg') {
      fs.renameSync(path.join(uiDir, file), path.join(DIRS.eclipse.logos, file));
    } else {
      fs.renameSync(path.join(uiDir, file), path.join(DIRS.portal.ui, file));
    }
  }
}

// Clean up old directories
const cleanEmptyDirs = (dir) => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        cleanEmptyDirs(fullPath);
      }
    }
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }
};
cleanEmptyDirs(path.join(ASSETS_DIR, 'images'));
if (fs.existsSync(path.join(ASSETS_DIR, 'videos')) && fs.readdirSync(path.join(ASSETS_DIR, 'videos')).length === 0) {
  fs.rmdirSync(path.join(ASSETS_DIR, 'videos'));
}

// Update imports/paths in SRC_DIR
const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace Chroma logos
  content = content.replace(/\/assets\/images\/logos\//g, '/assets/chroma/logos/');
  
  // Replace Eclipse gallery
  content = content.replace(/\/assets\/images\/gallery\//g, '/assets/eclipse/gallery/');
  
  // Replace sections
  content = content.replace(/\/assets\/images\/sections\/chroma\//g, '/assets/chroma/sections/');
  content = content.replace(/\/assets\/images\/sections\/eclipse\//g, '/assets/eclipse/sections/');

  // Replace backgrounds
  content = content.replace(/\/assets\/images\/backgrounds\/eclipse/g, '/assets/eclipse/backgrounds/eclipse');
  content = content.replace(/\/assets\/images\/backgrounds\/chroma/g, '/assets/portal/backgrounds/chroma');
  
  // Fix the old un-updated chroma portal image string in Crossroads
  content = content.replace(/\/assets\/chroma portal image\.webp/g, '/assets/portal/backgrounds/chroma-portal-image.webp');

  // Replace ui logo.svg -> eclipse logos
  content = content.replace(/\/assets\/images\/ui\/logo\.svg/g, '/assets/eclipse/logos/logo.svg');

  // Replace videos
  content = content.replace(/\/assets\/videos\/player-exp/g, '/assets/eclipse/videos/player-exp');

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
for (const file of srcFiles) {
  replaceInFile(file);
}

console.log("Domain reorganization complete.");
