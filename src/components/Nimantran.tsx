'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import { Torana, DividerMandala } from '@/components/ornaments/Ornaments';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function FamilyCard({ side, isHi }: { side: 'bride' | 'groom'; isHi: boolean }) {
  const [open, setOpen] = useState(false);
  const family = side === 'bride' ? config.brideFamily : config.groomFamily;
  const couple = config.couple;
  const title = side === 'bride'
    ? (isHi ? 'वधू पक्ष' : "Bride's Family")
    : (isHi ? 'वर पक्ष' : "Groom's Family");
  const accentColor = side === 'bride' ? 'var(--color-maroon)' : 'var(--color-emerald)';

  return (
    <div className="card" style={{ overflow: 'visible' }}>
      {/* Card header */}
      <div style={{
        background: accentColor,
        padding: '20px 24px',
        borderRadius: '24px 24px 0 0',
      }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.4rem',
          fontWeight: 600,
          color: 'var(--color-gold-light)',
          marginBottom: 4,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: '0.9rem',
          color: 'rgba(231,200,115,0.7)',
        }}>
          {side === 'bride' ? couple.bride.fullNameHi : couple.groom.fullNameHi}
        </div>
      </div>

      {/* Parents */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}>
          {[
            { role: isHi ? 'पिता' : 'Father', name: isHi ? family.father.nameHi : family.father.nameEn },
            { role: isHi ? 'माता' : 'Mother', name: isHi ? family.mother.nameHi : family.mother.nameEn },
          ].map(({ role, name }) => (
            <div key={role} style={{
              background: 'rgba(201,162,75,0.06)',
              borderRadius: 12,
              padding: '12px 14px',
              border: '1px solid rgba(201,162,75,0.2)',
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6, marginBottom: 4 }}>{role}</div>
              <div style={{
                fontFamily: isHi ? 'var(--font-devanagari)' : 'Cormorant Garamond, serif',
                fontSize: isHi ? '0.9rem' : '1rem',
                fontWeight: 600,
                color: 'var(--color-maroon)',
              }}>{name}</div>
            </div>
          ))}
        </div>

        {/* Grandparents */}
        {family.pGrandfather && (
          <div style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              {isHi ? 'दादा / नाना' : 'Late / Grandparents'}
            </span><br />
            <span style={{ fontFamily: isHi ? 'var(--font-devanagari)' : undefined }}>
              {isHi ? family.pGrandfather?.nameHi : family.pGrandfather?.nameEn}
              {family.pGrandmother && ` & ${isHi ? family.pGrandmother.nameHi : family.pGrandmother.nameEn}`}
            </span>
          </div>
        )}

        {/* City */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', opacity: 0.6, marginBottom: 12 }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
          </svg>
          {family.city}
        </div>

        {/* Siblings (collapsible) */}
        {family.siblings && family.siblings.length > 0 && (
          <>
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--color-gold-dark)',
                fontWeight: 600,
                padding: 0,
              }}
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: '0.2s' }} aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isHi ? (open ? 'भाई-बहन छुपाएं' : 'भाई-बहन') : (open ? 'Hide Siblings' : 'View Siblings')}
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {family.siblings!.map((s, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', opacity: 0.8, fontFamily: isHi ? 'var(--font-devanagari)' : undefined }}>
                        • {isHi ? s.nameHi : s.nameEn}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

export default function Nimantran() {
  const { t, isHi } = useLang();

  return (
    <section className="section" id="nimantran" style={{ background: 'var(--color-ivory-dark)' }}>
      {/* Torana at top of section */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' }}>
        <Torana color="#C9A24B" />
      </div>

      <div className="section-inner" style={{ paddingTop: 60 }}>
        {/* Section title */}
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            color: 'var(--color-gold)',
            marginBottom: 8,
          }}>
            || निमंत्रण ||
          </div>
          <h2 className="gold-shimmer">{t('nimantran.title')}</h2>
        </motion.div>

        {/* Main nimantran text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            textAlign: 'center',
            padding: '24px',
            background: 'rgba(201,162,75,0.06)',
            borderRadius: 20,
            border: '1px solid rgba(201,162,75,0.2)',
            marginBottom: 40,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.9,
            color: 'var(--color-maroon)',
            marginBottom: 16,
          }}>
            हमारे परिवार के इस मंगल अवसर पर आप सभी को सादर आमंत्रण है।
          </p>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            lineHeight: 1.9,
            color: 'var(--color-maroon)',
            opacity: 0.85,
          }}>
            {config.nimantranEn}
          </p>
        </motion.div>

        {/* Family cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
        >
          <FamilyCard side="bride" isHi={isHi} />
          <FamilyCard side="groom" isHi={isHi} />
        </motion.div>

        <DividerMandala />
      </div>
    </section>
  );
}
