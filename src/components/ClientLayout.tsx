'use client';
import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { t, isHi } = useLang();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll progress and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);

      // Section spy
      const sections = ['home', 'countdown', 'events', 'rsvp', 'travel'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && winScroll >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio setup
  useEffect(() => {
    if (config.musicTrackUrl) {
      audioRef.current = new Audio(config.musicTrackUrl);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const navItems = [
    { id: 'home', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { id: 'events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', labelEn: 'Events', labelHi: 'उत्सव' },
    { id: 'rsvp', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', labelEn: 'RSVP', labelHi: 'उपस्थिति' },
    { id: 'travel', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', labelEn: 'Travel', labelHi: 'यात्रा' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />

      {/* Main Content */}
      <main className="pb-nav">
        {children}
      </main>

      {/* Floating Music Toggle */}
      {config.musicTrackUrl && (
        <button
          className={`music-toggle ${isPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? t('music.pause') : t('music.play')}
          id="btn-music-toggle"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M10 9v6m4-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path d="M9 18V5l12-2v13M9 9l12-2M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Main Navigation">
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`bottom-nav-item ${activeSection === item.id ? 'active' : ''}`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
              {item.id === 'travel' && <circle cx="12" cy="11" r="3" />}
            </svg>
            <span>{isHi ? item.labelHi : item.labelEn}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
