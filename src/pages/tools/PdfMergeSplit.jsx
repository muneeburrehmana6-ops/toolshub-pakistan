import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../components/ToolLayout';

export default function PdfMergeSplit() {
  const [mergeFiles, setMergeFiles] = useState([]);
  const [splitFile, setSplitFile] = useState(null);
  const [range, setRange] = useState('1-2');
  const [working, setWorking] = useState(false);

  const merge = async () => {
    if (mergeFiles.length < 2) return;
    setWorking(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of mergeFiles) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
      }
      const bytes = await mergedPdf.save();
      downloadBlob(bytes, 'merged.pdf', 'application/pdf');
    } finally {
      setWorking(false);
    }
  };

  const split = async () => {
    if (!splitFile) return;
    setWorking(true);
    try {
      const bytes = await splitFile.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const total = pdf.getPageCount();
      const [start, end] = range.split('-').map(n => parseInt(n.trim(), 10));
      const s = Math.max(1, start || 1) - 1;
      const e = Math.min(total, end || total) - 1;

      const newPdf = await PDFDocument.create();
      const indices = [];
      for (let i = s; i <= e; i++) indices.push(i);
      const pages = await newPdf.copyPages(pdf, indices);
      pages.forEach(p => newPdf.addPage(p));
      const outBytes = await newPdf.save();
      downloadBlob(outBytes, `pages-${range}.pdf`, 'application/pdf');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="PDF Merge / Split" description="Merge several PDFs into one, or extract a page range from a PDF.">
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1rem' }}>Merge PDFs</h3>
        <input type="file" accept="application/pdf" multiple className="field" onChange={e => setMergeFiles(Array.from(e.target.files))} />
        <button className="btn" style={{ marginTop: 12 }} onClick={merge} disabled={mergeFiles.length < 2 || working}>
          {working ? 'Working...' : `Merge ${mergeFiles.length || ''} PDFs`}
        </button>
      </div>

      <div>
        <h3 style={{ fontSize: '1rem' }}>Split / Extract Pages</h3>
        <input type="file" accept="application/pdf" className="field" onChange={e => setSplitFile(e.target.files[0])} />
        <div style={{ marginTop: 12 }}>
          <label>Page range (e.g. 1-3)</label>
          <input className="field" value={range} onChange={e => setRange(e.target.value)} style={{ maxWidth: 160 }} />
        </div>
        <button className="btn" style={{ marginTop: 12 }} onClick={split} disabled={!splitFile || working}>
          {working ? 'Working...' : 'Extract pages'}
        </button>
      </div>
    </ToolLayout>
  );
}

function downloadBlob(bytes, filename, type) {
  const blob = new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
