import { useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import ToolLayout from '../../components/ToolLayout';

export default function ExcelToPdf() {
  const [file, setFile] = useState(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    if (!file) return;
    setWorking(true);
    setError('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      const pdf = new jsPDF({ orientation: 'landscape' });
      const margin = 10;
      let y = margin;
      pdf.setFontSize(9);
      const pageHeight = pdf.internal.pageSize.getHeight();
      const colWidth = 35;

      rows.forEach((row) => {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        row.forEach((cell, colIndex) => {
          pdf.text(String(cell).substring(0, 20), margin + colIndex * colWidth, y);
        });
        y += 7;
      });

      pdf.save(file.name.replace(/\.xlsx?$/i, '') + '.pdf');
    } catch (e) {
      setError('Could not read this spreadsheet. Make sure it is a valid .xlsx or .xls file.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout
      title="Excel to PDF"
      description="Convert spreadsheet data from the first sheet of an .xlsx file into a PDF table."
      note="Only the first sheet is converted, as plain text rows and columns \u2014 cell formatting, colors, formulas and multiple sheets are not preserved. Very wide sheets may run off the page."
    >
      <label>Select an .xlsx or .xls file</label>
      <input type="file" accept=".xlsx,.xls" className="field" onChange={e => setFile(e.target.files[0])} />
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={!file || working}>
        {working ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <div className="result-box" style={{ borderColor: 'var(--danger)' }}>{error}</div>}
    </ToolLayout>
  );
}
