'use client';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';

export default function Footer() {
  const { t, isHi } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer aria-label="Footer">
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Decorative divider top */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <svg viewBox="0 0 100 20" width="100" height="20" fill="none">
            <path d="M0 10h40M60 10h40" stroke="rgba(201,162,75,0.4)" strokeWidth="1"/>
            <circle cx="50" cy="10" r="3" fill="var(--color-gold)"/>
            <circle cx="40" cy="10" r="1.5" fill="var(--color-gold)"/>
            <circle cx="60" cy="10" r="1.5" fill="var(--color-gold)"/>
          </svg>
        </div>

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          color: 'var(--color-gold-light)',
          marginBottom: 8,
        }}>
          {isHi ? 'प्रेम और आशीर्वाद के साथ,' : t('footer.love')}
        </p>
        <p style={{
          fontFamily: isHi ? 'var(--font-devanagari)' : 'Poppins, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 500,
          opacity: 0.8,
          marginBottom: 24,
        }}>
          {isHi ? 'मीनल, अविनाश और दोनों परिवारों की ओर से' : t('footer.families')}
        </p>

        <div className="hashtag">{config.couple.hashtag}</div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, marginBottom: 48 }}>
          <button
            onClick={handleCopyLink}
            className="btn-secondary"
            style={{ padding: '8px 20px', fontSize: '0.8rem', borderColor: 'rgba(201,162,75,0.5)' }}
            id="btn-copy-link"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true" style={{ marginRight: 6 }}>
              <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {copied ? (isHi ? 'कॉपी हो गया!' : t('footer.copied')) : (isHi ? 'लिंक कॉपी करें' : t('footer.copyLink'))}
          </button>
        </div>

        <div style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: 1 }}>
          {t('footer.credit')}
        </div>
      </div>
    </footer>
  );
}
