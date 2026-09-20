import { useState } from 'react';
import { jsPDF } from 'jspdf';
import ToolLayout from '../../components/ToolLayout';

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [working, setWorking] = useState(false);

  const handleFiles = (e) => setFiles(Array.from(e.target.files));

  const convert = async () => {
    if (files.length === 0) return;
    setWorking(true);
    try {
      const pdf = new jsPDF();
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await readAsDataURL(files[i]);
        const img = await loadImage(dataUrl);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', (pageWidth - w) / 2, (pageHeight - h) / 2, w, h);
      }
      pdf.save('images.pdf');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="Image to PDF" description="Combine one or more images into a single PDF file, right in your browser.">
      <label>Select images (you can pick multiple)</label>
      <input type="file" accept="image/*" multiple className="field" onChange={handleFiles} />
      {files.length > 0 && <p style={{ marginTop: 10, fontSize: '0.85rem' }}>{files.length} image(s) selected</p>}
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={files.length === 0 || working}>
        {working ? 'Converting...' : 'Convert to PDF'}
      </button>
    </ToolLayout>
  );
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
