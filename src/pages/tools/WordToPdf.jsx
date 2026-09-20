import { useState } from 'react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import ToolLayout from '../../components/ToolLayout';

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setWorking(true);
    setError('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const pdf = new jsPDF();
      const margin = 15;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      const lineHeight = 7;
      let y = margin;

      pdf.setFontSize(11);
      const paragraphs = text.split('\n');
      paragraphs.forEach(paragraph => {
        const lines = pdf.splitTextToSize(paragraph || ' ', usableWidth);
        lines.forEach(line => {
          if (y > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin, y);
          y += lineHeight;
        });
      });

      pdf.save(file.name.replace(/\.docx?$/i, '') + '.pdf');
    } catch (e) {
      setError('Could not convert this file. Make sure it is a valid .docx document.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout
      title="Word to PDF"
      description="Convert a .docx document's text into a PDF file, directly in your browser."
      note="This converts the document's text content to PDF. Complex formatting \u2014 tables, images, columns, and precise styling \u2014 is not preserved. For pixel-perfect conversion of heavily formatted documents, a dedicated desktop tool (e.g. Microsoft Word's own 'Export as PDF') will give better results."
    >
      <label>Select a .docx file</label>
      <input type="file" accept=".docx" className="field" onChange={e => setFile(e.target.files[0])} />
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={!file || working}>
        {working ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <div className="result-box" style={{ borderColor: 'var(--danger)' }}>{error}</div>}
    </ToolLayout>
  );
}
