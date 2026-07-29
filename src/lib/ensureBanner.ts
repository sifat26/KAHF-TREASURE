import fs from 'fs';
import path from 'path';

export function ensureHeroBanner() {
  try {
    const src = `C:\\Users\\sifat\\.gemini\\antigravity-ide\\brain\\d59e758d-d131-4465-83fb-e191590cac2d\\media__1785275717880.png`;
    const destDir = path.join(process.cwd(), 'public', 'images');
    const dest = path.join(destDir, 'hero-banner.png');

    if (fs.existsSync(src)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    console.error('Failed to copy hero banner image:', err);
  }
}
