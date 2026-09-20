import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ToolLayout from '../../components/ToolLayout';

export default function ZipCreate() {
  const [files, setFiles] = useState([]);
  const [working, setWorking] = useState(false);

  const createZip = async () => {
    if (files.length === 0) return;
    setWorking(true);
    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, await file.arrayBuffer());
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'archive.zip');
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="ZIP File Creator" description="Select multiple files and download them as a single ZIP archive \u2014 no upload required.">
      <label>Select files to zip</label>
      <input type="file" multiple className="field" onChange={e => setFiles(Array.from(e.target.files))} />
      {files.length > 0 && <p style={{ marginTop: 10, fontSize: '0.85rem' }}>{files.length} file(s) selected</p>}
      <button className="btn" style={{ marginTop: 16 }} onClick={createZip} disabled={files.length === 0 || working}>
        {working ? 'Zipping...' : 'Create ZIP'}
      </button>
    </ToolLayout>
  );
}
