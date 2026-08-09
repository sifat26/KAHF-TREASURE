import fs from 'fs';
import path from 'path';

const artifactsDir = `C:\\Users\\sifat\\.gemini\\antigravity-ide\\brain\\8671b418-89c0-4231-90a4-2162cfc6471f`;
const targetDir = `g:\\kahf-treasure\\public\\images`;

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(artifactsDir);
for (const f of files) {
  if (f.startsWith('logo_gold_shield') && f.endsWith('.png')) {
    fs.copyFileSync(path.join(artifactsDir, f), path.join(targetDir, 'logo-shield.png'));
    console.log('Copied logo-shield.png');
  }
  if (f.startsWith('hero_banner_luxury_dark') && f.endsWith('.png')) {
    fs.copyFileSync(path.join(artifactsDir, f), path.join(targetDir, 'hero-banner-dark.png'));
    console.log('Copied hero-banner-dark.png');
  }
  if (f.startsWith('hero_banner_luxury_light') && f.endsWith('.png')) {
    fs.copyFileSync(path.join(artifactsDir, f), path.join(targetDir, 'hero-banner-light.png'));
    console.log('Copied hero-banner-light.png');
  }
}
