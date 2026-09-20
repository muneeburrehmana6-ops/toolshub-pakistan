import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ToolLayout from '../../components/ToolLayout';

export default function ZipExtract() {
  const [entries, setEntries] = useState([]);
  const [zipRef, setZipRef] = useState(null);
  const [working, setWorking] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setWorking(true);
    try {
      const zip = await JSZip.loadAsync(file);
      setZipRef(zip);
      const list = [];
      zip.forEach((path, entry) => { if (!entry.dir) list.push(path); });
      setEntries(list);
    } finally {
      setWorking(false);
    }
  };

  const downloadFile = async (path) => {
    const entry = zipRef.file(path);
    const blob = await entry.async('blob');
    saveAs(blob, path.split('/').pop());
  };

  const downloadAll = async () => {
    for (const path of entries) {
      await downloadFile(path);
    }
  };

  return (
    <ToolLayout title="ZIP Extractor" description="Open a ZIP archive in your browser and download the files inside it individually.">
      <label>Select a .zip file</label>
      <input type="file" accept=".zip" className="field" onChange={handleFile} />
      {working && <p style={{ marginTop: 10, fontSize: '0.85rem' }}>Reading archive...</p>}
      {entries.length > 0 && (
        <div className="result-box">
          <div style={{ marginBottom: 10, fontWeight: 600 }}>{entries.length} file(s) found</div>
          <div style={{ maxHeight: 240, overflow: 'auto' }}>
            {entries.map(path => (
              <div key={path} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem' }}>{path}</span>
                <button className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => downloadFile(path)}>Download</button>
              </div>
            ))}
          </div>
          <button className="btn" style={{ marginTop: 14 }} onClick={downloadAll}>Download all</button>
        </div>
      )}
    </ToolLayout>
  );
}
