import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

try {
  const docxFile = path.resolve(process.cwd(), '../আতরের বিক্রয় মূল্য & Attar Plan from chatgpt.docx');
  const tempDir = path.resolve(process.cwd(), '../scratch/docx_out');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Use powershell to unzip document.xml
  const psCmd = `powershell -NoProfile -Command "Expand-Archive -Path '${docxFile.replace(/'/g, "''")}' -DestinationPath '${tempDir.replace(/'/g, "''")}' -Force"`;
  execSync(psCmd);

  const xmlPath = path.join(tempDir, 'word', 'document.xml');
  const xmlContent = fs.readFileSync(xmlPath, 'utf8');

  // Parse paragraphs and table rows
  const cleanText = xmlContent
    .replace(/<\/w:p>/g, '\n')
    .replace(/<\/w:tr>/g, '\n---ROW---\n')
    .replace(/<\/w:tc>/g, ' | ')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');

  const outPath = path.resolve(process.cwd(), '../scratch/extracted_attars.txt');
  fs.writeFileSync(outPath, cleanText, 'utf8');

  console.log(`✅ Extracted text saved to ${outPath}`);
  console.log('--- Sample Output ---');
  console.log(cleanText.substring(0, 1500));
} catch (err) {
  console.error('Error reading docx:', err);
}
