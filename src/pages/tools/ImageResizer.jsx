import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [keepRatio, setKeepRatio] = useState(true);
  const [origRatio, setOrigRatio] = useState(1);
  const [working, setWorking] = useState(false);

  const onFile = async (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const dataUrl = await readAsDataURL(f);
      const img = await loadImage(dataUrl);
      setOrigRatio(img.width / img.height);
      setWidth(img.width);
      setHeight(img.height);
    }
  };

  const onWidthChange = (v) => {
    setWidth(v);
    if (keepRatio) setHeight(Math.round(v / origRatio));
  };

  const resize = async () => {
    if (!file) return;
    setWorking(true);
    try {
      const dataUrl = await readAsDataURL(file);
      const img = await loadImage(dataUrl);
      const canvas = document.createElement('canvas');
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-' + file.name;
        a.click();
      }, file.type || 'image/png', 0.92);
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="Image Resizer" description="Resize an image to exact pixel dimensions.">
      <label>Select an image</label>
      <input type="file" accept="image/*" className="field" onChange={onFile} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
        <div>
          <label>Width (px)</label>
          <input type="number" className="field" value={width} onChange={e => onWidthChange(e.target.value)} />
        </div>
        <div>
          <label>Height (px)</label>
          <input type="number" className="field" value={height} disabled={keepRatio}
            onChange={e => setHeight(e.target.value)} />
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 0 }}>
        <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} /> Keep aspect ratio
      </label>
      <button className="btn" style={{ marginTop: 16 }} onClick={resize} disabled={!file || working}>
        {working ? 'Resizing...' : 'Resize & Download'}
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
