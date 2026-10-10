'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function addToGoogleCalendar() {
  const start = config.muhuratDate.replace(/-/g, '') + 'T110700';
  const end = config.muhuratDate.replace(/-/g, '') + 'T160000';
  const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent('Meenal & Avinash Wedding')}&dates=${start}/${end}&details=${encodeURIComponent('Shubh Vivah — Hotel Rajmahal Palace, Jaipur')}&location=${encodeURIComponent('Hotel Rajmahal Palace, Jaipur, Rajasthan')}`;
  window.open(url, '_blank');
}

function downloadICS() {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Wedding Invite//EN\nBEGIN:VEVENT\nDTSTART:20270214T110700\nDTEND:20270214T160000\nSUMMARY:Meenal & Avinash Wedding\nDESCRIPTION:Shubh Vivah Muhurat at 11:07 AM\nLOCATION:Hotel Rajmahal Palace\\, Jaipur\\, Rajasthan\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'meenal-avinash-wedding.ics';
  link.click();
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Countdown() {
  const { t, isHi } = useLang();
  const target = useRef(new Date(`${config.muhuratDate}T${config.muhuratTime}:00`));
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });
  const [prevValues, setPrevValues] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });
  const [flipping, setFlipping] = useState({ days: false, hours: false, minutes: false, seconds: false });

  useEffect(() => {
    setMounted(true);
    const initialTimeLeft = getTimeLeft(target.current);
    setTimeLeft(initialTimeLeft);
    setPrevValues(initialTimeLeft);

    const timer = setInterval(() => {
      const next = getTimeLeft(target.current);
      // Detect changes for flip animation
      const changed = {
        days: next.days !== initialTimeLeft.days,
        hours: next.hours !== initialTimeLeft.hours,
        minutes: next.minutes !== initialTimeLeft.minutes,
        seconds: next.seconds !== initialTimeLeft.seconds,
      };
      
      setTimeLeft(current => {
        const diff = {
          days: next.days !== current.days,
          hours: next.hours !== current.hours,
          minutes: next.minutes !== current.minutes,
          seconds: next.seconds !== current.seconds,
        };
        if (Object.values(diff).some(Boolean)) {
          setPrevValues(current);
          setFlipping(diff);
          setTimeout(() => setFlipping({ days: false, hours: false, minutes: false, seconds: false }), 300);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { key: 'days' as const, value: timeLeft.days, label: t('countdown.days') },
    { key: 'hours' as const, value: timeLeft.hours, label: t('countdown.hours') },
    { key: 'minutes' as const, value: timeLeft.minutes, label: t('countdown.minutes') },
    { key: 'seconds' as const, value: timeLeft.seconds, label: t('countdown.seconds') },
  ];

  return (
    <section className="section" id="countdown" style={{ background: 'linear-gradient(180deg, var(--color-ivory) 0%, var(--color-ivory-dark) 100%)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('countdown.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('countdown.title_hi')}</span>
        </motion.div>

        {/* Muhurat badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <div className="muhurat-badge">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isHi ? config.muhuratLabel.hi : config.muhuratLabel.en} — {config.muhuratTime.replace(':', ':')} AM
          </div>
          <div style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: '0.9rem',
            color: 'var(--color-maroon)',
            opacity: 0.7,
            marginTop: 4,
          }}>
            {isHi ? '१४ फरवरी २०२७, जयपुर' : '14 February 2027, Jaipur'}
          </div>
        </motion.div>

        {/* Countdown grid */}
        {timeLeft.passed ? (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-gold)' }}
          >
            {t('countdown.passed')}
          </motion.p>
        ) : (
          <motion.div
            className="countdown-grid"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {units.map(({ key, value, label }) => (
              <div key={key} className="countdown-unit">
                <motion.span
                  className="countdown-number"
                  animate={flipping[key] ? { y: [-4, 0], opacity: [0.5, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {pad(value)}
                </motion.span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Calendar buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-primary" onClick={addToGoogleCalendar} id="btn-add-google-cal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {t('countdown.addToCalendar')} (Google)
          </button>
          <button className="btn-secondary" onClick={downloadICS} id="btn-add-apple-cal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M8 2v4M16 2v4M3 10h18M3 6h18v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Apple / .ics
          </button>
        </motion.div>
      </div>
    </section>
  );
}
