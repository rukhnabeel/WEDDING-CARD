'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import type { WeddingEvent } from '@/config/types';
import { DividerMandala, FlameIcon } from '@/components/ornaments/Ornaments';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function addEventToCalendar(evt: WeddingEvent) {
  const dateClean = evt.date.replace(/-/g, '');
  const startH = evt.startTime.replace(':', '');
  const endH = evt.endTime.replace(':', '');
  const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(evt.nameEn)}&dates=${dateClean}T${startH}00/${dateClean}T${endH}00&location=${encodeURIComponent(evt.address)}`;
  window.open(url, '_blank');
}

function EventCardFull({ event, isHi }: { event: WeddingEvent; isHi: boolean }) {
  return (
    <div className="event-card" style={{ borderTop: `4px solid ${event.accentColor}` }}>
      {/* Image */}
      <div className="event-card-header">
        {event.image.endsWith('.mp4') ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={event.image} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={event.image}
            alt={event.nameEn}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}
        <div className="event-card-badge">{event.dayEn}, {formatDate(event.date)}</div>
        {event.isMain && (
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: event.accentColor,
            color: '#FFF8EC',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
            ⭐ Vivah
          </div>
        )}
        {event.familyOnly && (
          <div style={{
            position: 'absolute', bottom: 16, left: 16,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            color: '#F6C945',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: '0.7rem',
            fontWeight: 600,
          }}>
            👨‍👩‍👧 Family Only
          </div>
        )}
      </div>

      <div className="event-card-body">
        {/* Name */}
        <div className="event-name-en" style={{ color: event.accentColor }}>{event.nameEn}</div>
        <div className="event-name-hi" style={{ fontFamily: 'var(--font-devanagari)' }}>{event.nameHi}</div>

        {/* Muhurat */}
        {event.muhurat && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: `${event.accentColor}15`,
            border: `1px solid ${event.accentColor}40`,
            borderRadius: 999,
            padding: '4px 12px',
            marginBottom: 12,
            fontSize: '0.8rem',
            fontWeight: 600,
            color: event.accentColor,
          }}>
            <FlameIcon size={14} />
            {isHi ? 'मुहूर्त' : 'Muhurat'}: {event.muhurat}
          </div>
        )}

        {/* Date/time/venue info rows */}
        <div className="event-info-row">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>{isHi ? event.dayHi : event.dayEn}, {formatDate(event.date)}</span>
        </div>
        <div className="event-info-row">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>{formatTime(event.startTime)} – {formatTime(event.endTime)}</span>
        </div>
        <div className="event-info-row">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" opacity="0.7"/>
          </svg>
          <span>
            <strong style={{ display: 'block' }}>{isHi ? event.venueHi : event.venue}</strong>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{event.address}</span>
          </span>
        </div>

        {/* Description */}
        <p className="event-desc">{isHi ? event.description.hi : event.description.en}</p>

        {/* Dress code */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6, marginBottom: 6 }}>
            {isHi ? 'वस्त्र संहिता' : 'Dress Code'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="dress-swatches">
              {event.dressCode.colors.map((c, i) => (
                <div key={i} className="dress-swatch" style={{ background: c }} title={c} />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              {isHi ? event.dressCode.hi : event.dressCode.en}
            </span>
          </div>
        </div>

        {/* Map preview */}
        <div className="map-preview">
          <iframe
            title={`Map for ${event.nameEn}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.lng - 0.01},${event.lat - 0.01},${event.lng + 0.01},${event.lat + 0.01}&layer=mapnik&marker=${event.lat},${event.lng}`}
            loading="lazy"
            aria-label={`Map showing location of ${event.nameEn}`}
          />
        </div>

        {/* Action buttons */}
        <div className="event-card-actions">
          <a
            href={event.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id={`btn-directions-${event.id}`}
            style={{ background: event.accentColor === '#7A0C1E' ? 'var(--gradient-gold)' : `linear-gradient(135deg, ${event.accentColor}AA, ${event.accentColor})` }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isHi ? 'रास्ता देखें' : 'Get Directions'}
          </a>
          <button
            className="btn-secondary"
            onClick={() => addEventToCalendar(event)}
            id={`btn-cal-${event.id}`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {isHi ? 'कैलेंडर में जोड़ें' : 'Add to Calendar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventCards() {
  const { t, isHi } = useLang();
  const [activeId, setActiveId] = useState(config.events[0].id);
  const activeEvent = config.events.find(e => e.id === activeId) ?? config.events[0];

  return (
    <section className="section" id="events" style={{ background: 'var(--color-ivory)', paddingLeft: 0, paddingRight: 0 }}>
      <div className="section-inner" style={{ padding: '0 0 40px', maxWidth: '100%' }}>
        {/* Title */}
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: '0 20px 24px' }}
        >
          <h2 className="gold-shimmer">{t('events.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('events.title_hi')}</span>
        </motion.div>

        {/* Tabs */}
        <div className="events-tabs" role="tablist" aria-label="Wedding events">
          {config.events.map(evt => (
            <button
              key={evt.id}
              role="tab"
              aria-selected={evt.id === activeId}
              aria-controls={`event-panel-${evt.id}`}
              id={`event-tab-${evt.id}`}
              className={`event-tab ${evt.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(evt.id)}
            >
              {isHi ? evt.nameHi : evt.nameEn}
            </button>
          ))}
        </div>

        {/* Active event card */}
        <div style={{ padding: '0 20px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id={`event-panel-${activeId}`}
              aria-labelledby={`event-tab-${activeId}`}
            >
              <EventCardFull event={activeEvent} isHi={isHi} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <DividerMandala />
    </section>
  );
}
