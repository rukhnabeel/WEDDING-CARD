// ─────────────────────────────────────────────────────────────────────────────
// SVG Ornament Components — All inline, no external assets needed
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  color?: string;
}

/** Minimal, elegant Ganesha line-art — respectful and symmetrical */
export function GaneshaIcon({ width = 80, height = 100, color = '#C9A24B', className = '', style }: SvgProps) {
  return (
    <svg viewBox="0 0 100 130" width={width} height={height} fill="none" className={className} style={style} aria-label="Ganesha" role="img">
      {/* Trunk */}
      <path d="M50 45 Q35 70 40 90 Q43 100 50 98" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Head */}
      <ellipse cx="50" cy="38" rx="22" ry="26" stroke={color} strokeWidth="2.5" fill="none"/>
      {/* Ears */}
      <ellipse cx="22" cy="38" rx="12" ry="16" stroke={color} strokeWidth="2" fill="none"/>
      <ellipse cx="78" cy="38" rx="12" ry="16" stroke={color} strokeWidth="2" fill="none"/>
      {/* Eyes */}
      <circle cx="42" cy="32" r="3" fill={color}/>
      <circle cx="58" cy="32" r="3" fill={color}/>
      {/* Third eye / bindi */}
      <circle cx="50" cy="26" r="2" fill={color} opacity="0.6"/>
      {/* Crown */}
      <path d="M32 14 L38 4 L50 10 L62 4 L68 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="50" cy="8" r="3" fill={color} opacity="0.5"/>
      {/* Body hint */}
      <path d="M30 64 Q28 80 35 95 Q42 108 50 110 Q58 108 65 95 Q72 80 70 64" stroke={color} strokeWidth="2" fill="none"/>
      {/* Modak (sweet) in hand */}
      <circle cx="68" cy="80" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Decorative lotus at bottom */}
      <path d="M40 120 Q45 112 50 115 Q55 112 60 120" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M44 120 Q48 114 50 118 Q52 114 56 120" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

/** Mandala / Paisley section divider line */
export function DividerMandala({ color = '#C9A24B', className = '' }: { color?: string; className?: string }) {
  return (
    <div className={`divider ${className}`} role="separator">
      <div className="divider-line" style={{ background: `linear-gradient(90deg, transparent, ${color}60, ${color}, ${color}60, transparent)` }} />
      <svg viewBox="0 0 60 60" width={44} height={44} className="divider-icon" aria-hidden="true">
        {/* Lotus */}
        <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="3" fill={color}/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <ellipse
            key={i}
            cx="30"
            cy="17"
            rx="3.5"
            ry="8"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            transform={`rotate(${deg} 30 30)`}
          />
        ))}
      </svg>
      <div className="divider-line" style={{ background: `linear-gradient(90deg, ${color}60, ${color}, ${color}60, transparent)` }} />
    </div>
  );
}

/** Paisley corner ornament */
export function PaisleyCorner({ size = 60, color = '#C9A24B', flip = false, className = '' }: SvgProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : {}}
      aria-hidden="true"
    >
      <path
        d="M5 5 Q30 5 40 20 Q55 40 40 60 Q30 75 10 70 Q5 60 10 50 Q20 35 35 35 Q25 20 5 20 Z"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        fillOpacity="0.08"
      />
      <path
        d="M15 15 Q30 18 37 28 Q44 40 35 52 Q27 62 15 58"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <circle cx="22" cy="30" r="3" fill={color} opacity="0.4"/>
      <circle cx="35" cy="20" r="2" fill={color} opacity="0.5"/>
      {/* Small dots */}
      {[0,1,2].map(i => (
        <circle key={i} cx={8 + i * 6} cy={72 - i * 4} r="1.5" fill={color} opacity="0.5"/>
      ))}
    </svg>
  );
}

/** Torana (marigold garland) SVG for section headers */
export function Torana({ color = '#F28C28', className = '' }: { color?: string; className?: string }) {
  const points = Array.from({ length: 11 }, (_, i) => i);
  const W = 400;
  const droopY = 50;

  return (
    <svg
      viewBox={`0 0 ${W} 90`}
      width="100%"
      height="90"
      className={`torana ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Main rope */}
      <path
        d={`M0,15 Q${W/2},${droopY + 20} ${W},15`}
        stroke="#8B6914"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Hanging threads */}
      {points.map(i => {
        const x = (i / 10) * W;
        const sag = Math.sin((i / 10) * Math.PI) * droopY + 15;
        return (
          <line key={i} x1={x} y1={sag} x2={x} y2={sag + 18} stroke="#8B6914" strokeWidth="1" opacity="0.6"/>
        );
      })}
      {/* Marigold flowers */}
      {points.map(i => {
        const x = (i / 10) * W;
        const sag = Math.sin((i / 10) * Math.PI) * droopY + 15 + 18;
        return (
          <g key={i} transform={`translate(${x},${sag})`}>
            {[0,60,120,180,240,300].map(deg => (
              <ellipse
                key={deg}
                cx="0"
                cy="-6"
                rx="4"
                ry="7"
                fill={i % 3 === 0 ? '#F28C28' : i % 3 === 1 ? '#F6C945' : '#E8702A'}
                transform={`rotate(${deg})`}
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="4.5" fill="#C9A24B"/>
          </g>
        );
      })}
      {/* Mango leaves */}
      {[1,3,5,7,9].map(i => {
        const x = (i / 10) * W;
        const sag = Math.sin((i / 10) * Math.PI) * droopY + 15;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={sag - 8}
            rx="8"
            ry="14"
            fill="#5B7F2B"
            opacity="0.7"
            transform={`rotate(-20 ${x} ${sag - 8})`}
          />
        );
      })}
    </svg>
  );
}

/** Diya (lamp) icon */
export function DiyaIcon({ size = 24, color = '#C9A24B', lit = true, className = '' }: SvgProps & { lit?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      {/* Flame */}
      {lit && (
        <>
          <ellipse cx="24" cy="10" rx="3" ry="6" fill="#F28C28" opacity="0.9"/>
          <ellipse cx="24" cy="12" rx="2" ry="4" fill="#F6C945"/>
        </>
      )}
      {/* Wick */}
      <line x1="24" y1="16" x2="24" y2="22" stroke="#8B6914" strokeWidth="1.5"/>
      {/* Oil */}
      <ellipse cx="24" cy="26" rx="10" ry="4" fill={color} opacity="0.4"/>
      {/* Diya body */}
      <path d="M14 26 Q12 34 24 36 Q36 34 34 26 Z" fill={color} opacity="0.8"/>
      <path d="M14 26 Q12 34 24 36 Q36 34 34 26 Z" stroke={color} strokeWidth="1" fill="none"/>
      {/* Spout */}
      <path d="M34 28 Q40 26 38 32" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/** Lotus icon for timeline nodes */
export function LotusIcon({ size = 24, color = '#C9A24B', className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <path d="M24 36 Q18 30 14 22 Q16 14 24 16 Q32 14 34 22 Q30 30 24 36Z" fill={color} opacity="0.3"/>
      <path d="M24 36 Q14 28 12 20 Q8 12 16 12 Q20 12 24 16" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M24 36 Q34 28 36 20 Q40 12 32 12 Q28 12 24 16" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M24 36 Q20 24 20 16 Q22 10 24 12 Q26 10 28 16 Q28 24 24 36Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
      <circle cx="24" cy="20" r="4" fill={color}/>
    </svg>
  );
}

/** Rings icon */
export function RingsIcon({ size = 24, color = '#C9A24B', className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="18" cy="24" r="10" stroke={color} strokeWidth="3" fill="none"/>
      <circle cx="30" cy="24" r="10" stroke={color} strokeWidth="3" fill="none"/>
      <circle cx="18" cy="16" r="2.5" fill={color}/>
      <circle cx="30" cy="16" r="2.5" fill={color}/>
    </svg>
  );
}

/** Kalash (sacred pot) icon */
export function KalashIcon({ size = 24, color = '#C9A24B', className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      {/* Mango leaves */}
      <path d="M20 12 Q18 6 22 8" stroke="#5B7F2B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M24 10 Q24 4 26 6" stroke="#5B7F2B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M28 12 Q30 6 26 8" stroke="#5B7F2B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Coconut */}
      <ellipse cx="24" cy="14" rx="5" ry="4" fill="#8B6914"/>
      {/* Neck */}
      <rect x="20" y="17" width="8" height="4" rx="1" fill={color}/>
      {/* Body */}
      <path d="M14 21 Q12 34 18 40 Q21 42 24 42 Q27 42 30 40 Q36 34 34 21 Z" fill={color} opacity="0.7"/>
      <path d="M14 21 Q12 34 18 40 Q21 42 24 42 Q27 42 30 40 Q36 34 34 21 Z" stroke={color} strokeWidth="1"/>
      {/* Base */}
      <rect x="18" y="40" width="12" height="3" rx="1.5" fill={color}/>
    </svg>
  );
}

/** Om symbol — used sparingly and respectfully */
export function OmSymbol({ size = 40, color = '#C9A24B', className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-label="Om" role="img">
      {/* ॐ character rendered as path approximation — using text element for accuracy */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fontSize="68"
        fill={color}
        fontFamily="serif"
        opacity="0.85"
      >
        ॐ
      </text>
    </svg>
  );
}

/** Flame/Fire icon for Pheras section */
export function FlameIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <path d="M24 44 Q12 40 12 30 Q12 20 20 16 Q18 24 24 26 Q22 18 28 12 Q32 20 32 28 Q36 22 34 16 Q40 22 38 32 Q36 42 24 44Z" fill="#F28C28" opacity="0.8"/>
      <path d="M24 44 Q16 40 16 32 Q16 24 22 20 Q20 26 24 28 Q28 24 28 18 Q34 24 32 34 Q30 42 24 44Z" fill="#F6C945" opacity="0.9"/>
      <path d="M24 44 Q20 40 20 34 Q20 28 24 26 Q28 30 26 36 Q25 42 24 44Z" fill="white" opacity="0.7"/>
    </svg>
  );
}

/** Gold frame component — wraps photos/cards with paisley corners */
export function GoldFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }} className={className}>
      <PaisleyCorner size={48} style={{ position: 'absolute', top: -8, left: -8, zIndex: 1 }} />
      <PaisleyCorner size={48} flip style={{ position: 'absolute', top: -8, right: -8, zIndex: 1 }} />
      <PaisleyCorner size={48} style={{ position: 'absolute', bottom: -8, left: -8, zIndex: 1, transform: 'scaleY(-1)' }} />
      <PaisleyCorner size={48} flip style={{ position: 'absolute', bottom: -8, right: -8, zIndex: 1, transform: 'scale(-1,-1)' }} />
      <div style={{ border: '1.5px solid rgba(201,162,75,0.5)', borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
