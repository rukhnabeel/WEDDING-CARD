'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { GaneshaIcon } from '@/components/ornaments/Ornaments';

interface OpeningGateProps {
  onOpen: () => void;
}

export default function OpeningGate({ onOpen }: OpeningGateProps) {
  const { t, lang, setLang } = useLang();
  const [phase, setPhase] = useState<'gate' | 'playing'>('gate');
  const [showShlok, setShowShlok] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    setPhase('playing');
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    // Show shlok after a short delay so it overlays on the video
    setTimeout(() => setShowShlok(true), 2000);
    
    // Also try to start global music if configured (handled in ClientLayout, but we can't easily trigger it from here without lifting state.
    // ClientLayout will handle it when it mounts or via a global store if needed. 
    // For now, we'll just let the user tap the music toggle later, or dispatch a custom event.)
    window.dispatchEvent(new CustomEvent('play-wedding-music'));
  };

  return (
    <AnimatePresence>
      <motion.div
        className="gate-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#000', overflow: 'hidden' }}
      >
        <video
          ref={videoRef}
          playsInline
          muted
          onEnded={onOpen}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        >
          <source src="/assets/video/opening-mobile.mp4" type="video/mp4" />
        </video>

        {phase === 'gate' && (
          <motion.div
            style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              background: 'rgba(0,0,0,0.4)', padding: 32, textAlign: 'center'
            }}
            onClick={handleTap}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lang-toggle" style={{ position: 'absolute', top: 16, right: 16 }} onClick={e => e.stopPropagation()}>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हिन्दी</button>
            </div>

            <GaneshaIcon width={60} height={75} color="#E7C873" />

            <h1 style={{
              fontFamily: 'Great Vibes, cursive',
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: '#E7C873',
              marginTop: 24,
              marginBottom: 8,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}>
              Meenal &amp; Avinash
            </h1>

            <p style={{
              fontFamily: 'var(--font-devanagari-display)',
              fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
              color: '#E7C873',
              marginBottom: 40,
            }}>
              मीनल &amp; अविनाश
            </p>

            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                border: '1.5px solid rgba(201,162,75,0.6)',
                borderRadius: 999,
                padding: '12px 32px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: 2,
                color: '#FFF8EC',
                background: 'rgba(201,162,75,0.1)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {t('gate.tap')}
            </motion.div>
          </motion.div>
        )}

        {phase === 'playing' && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={onOpen}
              style={{
                pointerEvents: 'auto', position: 'absolute', top: 20, right: 20,
                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(201,162,75,0.4)',
                borderRadius: 999, color: '#E7C873', padding: '6px 18px',
                fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', cursor: 'pointer'
              }}
            >
              {t('ganesh.skip')} →
            </button>

            <AnimatePresence>
              {showShlok && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{ textAlign: 'center', padding: '0 32px', marginTop: 120 }}
                >
                  <p style={{
                    fontFamily: 'var(--font-devanagari)',
                    fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                    color: '#E7C873',
                    marginBottom: 16,
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}>
                    ॥ श्री गणेशाय नमः ॥
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-devanagari)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    color: 'rgba(231, 200, 115, 0.95)',
                    lineHeight: 1.8,
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}>
                    वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
                    निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
