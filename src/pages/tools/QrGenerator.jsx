import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import ToolLayout from '../../components/ToolLayout';

export default function QrGenerator() {
  const [text, setText] = useState('https://toolshub.pk');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, { width: 240, margin: 1 }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [text]);

  const download = () => {
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <ToolLayout title="QR Code Generator" description="Turn any link or text into a downloadable QR code.">
      <label>Text or URL</label>
      <input className="field" value={text} onChange={e => setText(e.target.value)} />
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <canvas ref={canvasRef} style={{ borderRadius: 8, background: '#fff', padding: 8 }} />
        <button className="btn" onClick={download}>Download PNG</button>
      </div>
    </ToolLayout>
  );
}
