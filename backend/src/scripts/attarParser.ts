import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

export function parseAttarDocx(): void {
  const docxPath = path.resolve(process.cwd(), '../আতরের বিক্রয় মূল্য & Attar Plan from chatgpt.docx');
  const altPath = path.resolve(process.cwd(), 'আতরের বিক্রয় মূল্য & Attar Plan from chatgpt.docx');
  
  const targetPath = fs.existsSync(docxPath) ? docxPath : fs.existsSync(altPath) ? altPath : null;
  if (!targetPath) {
    console.error('❌ docx file not found at:', docxPath);
    return;
  }

  const buf = fs.readFileSync(targetPath);
  let offset = 0;
  let xmlContent = '';

  while (offset < buf.length - 30) {
    if (buf.readUInt32LE(offset) === 0x04034b50) {
      const compMethod = buf.readUInt16LE(offset + 8);
      const compSize = buf.readUInt32LE(offset + 18);
      const fileNameLen = buf.readUInt16LE(offset + 26);
      const extraLen = buf.readUInt16LE(offset + 28);

      const fileName = buf.toString('utf8', offset + 30, offset + 30 + fileNameLen);
      const dataOffset = offset + 30 + fileNameLen + extraLen;

      if (fileName === 'word/document.xml') {
        const compData = buf.subarray(dataOffset, dataOffset + compSize);
        if (compMethod === 8) {
          xmlContent = zlib.inflateRawSync(compData).toString('utf8');
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

  if (!xmlContent) return;

  const lines: string[] = [];
  const pRegex = /<w:p[^>]*>(.*?)<\/w:p>/g;
  let match;
  while ((match = pRegex.exec(xmlContent)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
    if (text) lines.push(text);
  }

  const debugFile = path.resolve(process.cwd(), '../extracted_doc_debug.txt');
  fs.writeFileSync(debugFile, lines.join('\n'), 'utf8');
  console.log('✅ Extracted docx lines saved to:', debugFile);
}
