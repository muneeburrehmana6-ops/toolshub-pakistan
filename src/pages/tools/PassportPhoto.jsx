import { useState, useRef, useEffect, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import ToolLayout from '../../components/ToolLayout';

const presets = {
  'pakistan-cnic': { label: 'Pakistan CNIC / Passport (35x45mm)', mm: [35, 45] },
  'us-visa': { label: 'US Visa / Passport (2x2 in)', mm: [50.8, 50.8] },
  'uk-passport': { label: 'UK Passport (35x45mm)', mm: [35, 45] },
  'schengen-visa': { label: 'Schengen Visa (35x45mm)', mm: [35, 45] },
};

const bgColors = {
  white: { label: 'White', value: '#FFFFFF' },
  blue: { label: 'Light Blue', value: '#4A90D9' },
  green: { label: 'Light Green', value: '#5FBF6B' },
  grey: { label: 'Grey', value: '#B0B0B0' },
};

const DPI = 300;
const mmToPx = (mm) => Math.round((mm / 25.4) * DPI);

export default function PassportPhoto() {
  const [file, setFile] = useState(null);
  const [originalImg, setOriginalImg] = useState(null); // image as uploaded
  const [cutoutImg, setCutoutImg] = useState(null); // background-removed (transparent) version
  const [useCutout, setUseCutout] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState('');
  const [preset, setPreset] = useState('pakistan-cnic');
  const [bgColor, setBgColor] = useState('white');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const [w, h] = presets[preset].mm.map(mmToPx);
  const aspect = w / h;
  const img = useCutout && cutoutImg ? cutoutImg : originalImg;

  const onFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setCutoutImg(null);
    setUseCutout(false);
    setRemoveError('');
    const dataUrl = await readAsDataURL(f);
    const image = await loadImage(dataUrl);
    setOriginalImg(image);
    setZoom(1.4);
    setOffset({ x: 0, y: 0 });
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    setRemoving(true);
    setRemoveError('');
    try {
      let blob;
      try {
        // Try the library's default CDN first.
        blob = await removeBackground(file, {
          device: 'cpu',
          output: { format: 'image/png' },
        });
      } catch (firstErr) {
        console.warn('Default CDN failed, retrying via jsDelivr:', firstErr?.message);
        // Fall back to jsDelivr's mirror, in case the default CDN is blocked/unreachable on this network.
        blob = await removeBackground(file, {
          device: 'cpu',
          output: { format: 'image/png' },
          publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal-data@1.4.5/dist/',
        });
      }
      const url = URL.createObjectURL(blob);
      const image = await loadImage(url);
      setCutoutImg(image);
      setUseCutout(true);
      setZoom(1.4);
      setOffset({ x: 0, y: 0 });
    } catch (err) {
      console.error('Background removal error (both attempts failed):', err);
      setRemoveError(
        `Background removal failed on this network: ${err?.message || 'unknown error'}. Both the default source and a backup source failed to load the AI model \u2014 this usually means the network/Wi-Fi you're on is blocking these download sources. Try switching to mobile data/hotspot or a VPN and try again.`
      );
    } finally {
      setRemoving(false);
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const previewW = 260;
    const previewH = previewW / aspect;
    canvas.width = previewW;
    canvas.height = previewH;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColors[bgColor].value;
    ctx.fillRect(0, 0, previewW, previewH);

    const baseScale = Math.max(previewW / img.width, previewH / img.height);
    const scale = baseScale * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (previewW - drawW) / 2 + offset.x;
    const dy = (previewH - drawH) / 2 + offset.y;
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, [img, aspect, zoom, offset, bgColor]);

  useEffect(() => { draw(); }, [draw]);

  const onPointerDown = (e) => { dragging.current = true; lastPos.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onPointerUp = () => { dragging.current = false; };

  const download = () => {
    if (!img) return;
    const outCanvas = document.createElement('canvas');
    outCanvas.width = w;
    outCanvas.height = h;
    const ctx = outCanvas.getContext('2d');
    ctx.fillStyle = bgColors[bgColor].value;
    ctx.fillRect(0, 0, w, h);

    const previewW = 260;
    const previewH = previewW / aspect;
    const ratio = w / previewW;

    const baseScale = Math.max(previewW / img.width, previewH / img.height);
    const scale = baseScale * zoom;
    const drawW = img.width * scale * ratio;
    const drawH = img.height * scale * ratio;
    const dx = ((previewW - img.width * scale) / 2 + offset.x) * ratio;
    const dy = ((previewH - img.height * scale) / 2 + offset.y) * ratio;

    ctx.drawImage(img, dx, dy, drawW, drawH);
    outCanvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `passport-photo-${preset}.jpg`;
      a.click();
    }, 'image/jpeg', 0.95);
  };

  return (
    <ToolLayout
      title="Passport Size Photo Maker"
      description="Crop, resize and swap the background of a photo to standard passport, CNIC or visa dimensions."
      note="AI background removal runs entirely in your browser \u2014 your photo is never uploaded anywhere. The first time you use it on a device, your browser downloads a small AI model (a one-time download, needs internet). Background, lighting and expression requirements vary by document type, so check your specific application's official guidelines before submitting."
    >
      <label>Select a photo</label>
      <input type="file" accept="image/*" className="field" onChange={onFile} />

      <div style={{ marginTop: 14 }}>
        <label>Photo size</label>
        <select className="field" value={preset} onChange={e => setPreset(e.target.value)}>
          {Object.entries(presets).map(([key, p]) => <option key={key} value={key}>{p.label}</option>)}
        </select>
      </div>

      {originalImg && (
        <div style={{ marginTop: 14 }}>
          <button className="btn" onClick={handleRemoveBackground} disabled={removing}>
            {removing ? 'Removing background\u2026 (first time can take 20\u201360s)' : cutoutImg ? 'Re-run background removal' : 'Remove Background (AI)'}
          </button>
          {cutoutImg && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, marginBottom: 0 }}>
              <input type="checkbox" checked={useCutout} onChange={e => setUseCutout(e.target.checked)} />
              Use background-removed version
            </label>
          )}
          {removeError && <div className="result-box" style={{ borderColor: 'var(--danger)' }}>{removeError}</div>}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <label>Background color</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(bgColors).map(([key, c]) => (
            <button
              key={key}
              onClick={() => setBgColor(key)}
              title={c.label}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: c.value,
                border: bgColor === key ? '3px solid var(--accent)' : '1px solid var(--border)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        {!useCutout && (
          <p style={{ fontSize: '0.8rem', marginTop: 6 }}>
            This color will only be visible behind the subject after you run "Remove Background (AI)" above \u2014
            right now the original photo's own background is still showing.
          </p>
        )}
      </div>

      {img && (
        <>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <canvas
              ref={canvasRef}
              style={{ border: '1px solid var(--border)', cursor: 'grab', touchAction: 'none' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
          </div>
          <div style={{ marginTop: 14 }}>
            <label>Zoom</label>
            <input type="range" min="1" max="3" step="0.05" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ width: '100%' }} />
          </div>
          <p style={{ fontSize: '0.8rem', marginTop: 6 }}>Drag the photo to reposition it inside the frame.</p>
          <button className="btn" style={{ marginTop: 10 }} onClick={download}>Download Photo</button>
        </>
      )}
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
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}
