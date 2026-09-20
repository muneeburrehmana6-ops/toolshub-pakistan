import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import ToolLayout from '../../components/ToolLayout';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setWorking(true);
    setError('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const paragraphs = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        paragraphs.push(new Paragraph(pageText || ' '));
        if (i < pdf.numPages) paragraphs.push(new Paragraph(''));
      }

      const doc = new Document({ sections: [{ children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, file.name.replace(/\.pdf$/i, '') + '.docx');
    } catch (e) {
      setError('Could not read this PDF. Scanned (image-only) PDFs have no extractable text.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to Word"
      description="Extract text from a PDF into an editable .docx file."
      note="This pulls out plain text page by page \u2014 original layout, tables and images are not recreated. It also cannot extract text from scanned/image-only PDFs, since there's no text to read in those."
    >
      <label>Select a PDF file</label>
      <input type="file" accept="application/pdf" className="field" onChange={e => setFile(e.target.files[0])} />
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={!file || working}>
        {working ? 'Converting...' : 'Convert to Word'}
      </button>
      {error && <div className="result-box" style={{ borderColor: 'var(--danger)' }}>{error}</div>}
    </ToolLayout>
  );
}
