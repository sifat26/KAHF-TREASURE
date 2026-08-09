import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

function parseDocxText(docxPath) {
  const buf = fs.readFileSync(docxPath);
  let offset = 0;
  let xmlContent = '';

  while (offset < buf.length - 30) {
    // Local file header signature: 0x04034b50
    if (buf.readUInt32LE(offset) === 0x04034b50) {
      const compMethod = buf.readUInt16LE(offset + 8);
      const compSize = buf.readUInt32LE(offset + 18);
      const uncompSize = buf.readUInt32LE(offset + 22);
      const fileNameLen = buf.readUInt16LE(offset + 26);
      const extraLen = buf.readUInt16LE(offset + 28);

      const fileName = buf.toString('utf8', offset + 30, offset + 30 + fileNameLen);
      const dataOffset = offset + 30 + fileNameLen + extraLen;

      if (fileName === 'word/document.xml') {
        const compData = buf.subarray(dataOffset, dataOffset + compSize);
        if (compMethod === 8) {
          const decomp = zlib.inflateRawSync(compData);
          xmlContent = decomp.toString('utf8');
        } else if (compMethod === 0) {
          xmlContent = compData.toString('utf8');
        }
        break;
      }
      offset = dataOffset + compSize;
    } else {
      offset++;
    }
  }
  return xmlContent;
}

const docxPath = path.resolve(process.cwd(), 'আতরের বিক্রয় মূল্য & Attar Plan from chatgpt.docx');
const xml = parseDocxText(docxPath);

const cleanText = xml
  .replace(/<\/w:tr>/g, '\n---ROW---\n')
  .replace(/<\/w:p>/g, '\n')
  .replace(/<\/w:tc>/g, ' | ')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"');

const outPath = path.resolve(process.cwd(), 'scratch_extracted.txt');
fs.writeFileSync(outPath, cleanText, 'utf8');
console.log('✅ Native DOCX Extracted to scratch_extracted.txt. Length:', cleanText.length);
