import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ToolLayout from '../../components/ToolLayout';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfToExcel() {
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
      const rows = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // Group text items by approximate Y position into rows
        const lineMap = new Map();
        content.items.forEach(item => {
          const y = Math.round(item.transform[5]);
          if (!lineMap.has(y)) lineMap.set(y, []);
          lineMap.get(y).push(item.str);
        });
        const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
        sortedY.forEach(y => {
          rows.push([lineMap.get(y).join(' ')]);
        });
      }

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), file.name.replace(/\.pdf$/i, '') + '.xlsx');
    } catch (e) {
      setError('Could not read this PDF. Scanned (image-only) PDFs have no extractable text.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to Excel"
      description="Pull text out of a PDF into an .xlsx spreadsheet, one line per row."
      note="This extracts text line by line \u2014 it does not detect table columns/borders precisely, so complex tables may need manual column splitting afterward. It cannot extract text from scanned/image-only PDFs."
    >
      <label>Select a PDF file</label>
      <input type="file" accept="application/pdf" className="field" onChange={e => setFile(e.target.files[0])} />
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={!file || working}>
        {working ? 'Converting...' : 'Convert to Excel'}
      </button>
      {error && <div className="result-box" style={{ borderColor: 'var(--danger)' }}>{error}</div>}
    </ToolLayout>
  );
}
