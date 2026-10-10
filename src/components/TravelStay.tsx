'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import { DividerMandala } from '@/components/ornaments/Ornaments';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TravelStay() {
  const { t, isHi } = useLang();
  const { travel } = config;

  return (
    <section className="section" id="travel" style={{ background: 'var(--color-ivory-dark)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('travel.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('travel.title_hi')}</span>
        </motion.div>

        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 40 }}>
          {/* Airport */}
          <motion.div
            className="card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ padding: 24, textAlign: 'center' }}
          >
            <div style={{ color: 'var(--color-gold)', marginBottom: 12 }}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" aria-hidden="true">
                <path d="M19.95 10.95a2.5 2.5 0 010 3.53l-3.53 3.54-6.37-1.42-3.54 3.54a1 1 0 01-1.41-1.42l1.41-1.41-2.12-2.12-2.12-2.12a1 1 0 011.41-1.41l2.12 2.12 2.12 2.12 1.42-1.41-3.54-3.54L7.54 7.41 8.95 6l1.42 6.37 3.53 3.53a2.5 2.5 0 013.54 0l2.5-2.5a2.5 2.5 0 01.01-2.45z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7, marginBottom: 4 }}>
              {t('travel.airport')}
            </div>
            <div style={{ fontFamily: isHi ? 'var(--font-devanagari)' : 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-maroon)', marginBottom: 4 }}>
              {isHi ? travel.nearestAirport.nameHi : travel.nearestAirport.nameEn}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {isHi ? travel.nearestAirport.distanceHi : travel.nearestAirport.distanceEn}
            </div>
          </motion.div>

          {/* Station */}
          <motion.div
            className="card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ padding: 24, textAlign: 'center' }}
          >
            <div style={{ color: 'var(--color-gold)', marginBottom: 12 }}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" aria-hidden="true">
                <path d="M4 8h16M4 16h16M5 22h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2zM9 12v0M15 12v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7, marginBottom: 4 }}>
              {t('travel.station')}
            </div>
            <div style={{ fontFamily: isHi ? 'var(--font-devanagari)' : 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-maroon)', marginBottom: 4 }}>
              {isHi ? travel.nearestStation.nameHi : travel.nearestStation.nameEn}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              {isHi ? travel.nearestStation.distanceHi : travel.nearestStation.distanceEn}
            </div>
          </motion.div>
        </div>

        {/* Coordinators */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-gold-dark)', marginBottom: 16 }}>
            {t('travel.contactPickup')}
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {travel.coordinators.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,248,236,0.8)',
                border: '1px solid rgba(201,162,75,0.3)',
                borderRadius: 16,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-maroon)' }}>{c.nameEn}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{c.phone}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${c.phone}`} aria-label={`Call ${c.nameEn}`} style={{ color: 'var(--color-gold)' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href={`https://wa.me/${c.whatsapp}`} aria-label={`WhatsApp ${c.nameEn}`} style={{ color: '#25D366' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L0 24l6.293-1.501A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 21.818a9.836 9.836 0 01-5.024-1.376l-.36-.214-3.735.892.938-3.626-.236-.374A9.811 9.811 0 012.18 12C2.18 6.562 6.562 2.18 12 2.18S21.818 6.562 21.818 12c0 5.437-4.382 9.818-9.819 9.818z" fillRule="evenodd" clipRule="evenodd"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <DividerMandala />
      </div>
    </section>
  );
}
