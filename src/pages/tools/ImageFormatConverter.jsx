import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function ImageFormatConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('image/png');
  const [working, setWorking] = useState(false);

  const convert = async () => {
    if (!file) return;
    setWorking(true);
    try {
      const dataUrl = await readAsDataURL(file);
      const img = await loadImage(dataUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const ext = format.split('/')[1];
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace(/\.[^.]+$/, '') + '.' + ext;
        a.click();
      }, format, 0.92);
    } finally {
      setWorking(false);
    }
  };

  return (
    <ToolLayout title="Image Format Converter" description="Convert images between JPG, PNG and WebP formats.">
      <label>Select an image</label>
      <input type="file" accept="image/*" className="field" onChange={e => setFile(e.target.files[0])} />
      <div style={{ marginTop: 14 }}>
        <label>Convert to</label>
        <select className="field" value={format} onChange={e => setFormat(e.target.value)}>
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <button className="btn" style={{ marginTop: 16 }} onClick={convert} disabled={!file || working}>
        {working ? 'Converting...' : 'Convert & Download'}
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
