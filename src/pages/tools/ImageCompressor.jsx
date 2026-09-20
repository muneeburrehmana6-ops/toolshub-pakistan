import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import ToolLayout from '../../components/ToolLayout';

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [maxSizeMB, setMaxSizeMB] = useState(0.5);
  const [working, setWorking] = useState(false);
  const [resultInfo, setResultInfo] = useState(null);

  const compress = async () => {
    if (!file) return;
    setWorking(true);
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: parseFloat(maxSizeMB) || 0.5,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      });
      const url = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compressed-' + file.name;
      a.click();
      setResultInfo({
        before: (file.size / 1024).toFixed(0),
        after: (compressedFile.size / 1024).toFixed(0),
      });
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="Image Compressor" description="Shrink an image's file size while keeping visual quality, right in your browser.">
      <label>Select an image</label>
      <input type="file" accept="image/*" className="field" onChange={e => { setFile(e.target.files[0]); setResultInfo(null); }} />
      <div style={{ marginTop: 14 }}>
        <label>Target size (MB)</label>
        <input type="number" step="0.1" min="0.05" className="field" style={{ maxWidth: 140 }} value={maxSizeMB} onChange={e => setMaxSizeMB(e.target.value)} />
      </div>
      <button className="btn" style={{ marginTop: 16 }} onClick={compress} disabled={!file || working}>
        {working ? 'Compressing...' : 'Compress & Download'}
      </button>
      {resultInfo && (
        <div className="result-box">
          {resultInfo.before} KB \u2192 {resultInfo.after} KB
        </div>
      )}
    </ToolLayout>
  );
}
