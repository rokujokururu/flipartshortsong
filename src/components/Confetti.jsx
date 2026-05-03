import { useState, useEffect } from 'react';

const COLORS = ['#FF6B6B', '#4ECDC4', '#95E06C', '#FFD93D', '#FF8A8A', '#6ED9D2', '#C084FC'];

function ConfettiPiece({ index }) {
  const color = COLORS[index % COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 1.5;
  const duration = 1.5 + Math.random() * 2;
  const rotation = 360 + Math.random() * 720;
  const size = 6 + Math.random() * 8;
  const shape = Math.random() > 0.5 ? '50%' : '2px';

  return (
    <div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: shape,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--rotation': `${rotation}deg`,
      }}
    />
  );
}

export default function Confetti({ isActive }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (isActive) {
      setPieces(Array.from({ length: 60 }, (_, i) => i));

      // 自動消去
      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
}
