'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import { GaneshaIcon, Torana, DividerMandala } from '@/components/ornaments/Ornaments';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t, isHi } = useLang();
  const { couple, brideFamily, groomFamily, muhuratDate, familyBlessingsEn, familyBlessingsHi } = config;

  const weddingDateStr = new Date(muhuratDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <section className="hero" id="home" aria-label="Wedding Hero">
      {/* Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-bg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/assets/hero/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      {/* Torana garland at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Torana />
      </div>

      {/* Ganesha at very top — respectful placement */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 100,
          zIndex: 3,
          filter: 'drop-shadow(0 4px 20px rgba(201,162,75,0.4))',
        }}
        aria-label="Ganesha invocation"
      >
        <GaneshaIcon width={56} height={70} color="#E7C873" />
      </motion.div>

      {/* Main content */}
      <div className="hero-content" style={{ zIndex: 3, marginTop: 'max(100px, 15vh)' }}>
        {/* Couple names in script */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-names">
            {couple.bride.nameEn}
          </div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            color: 'rgba(231,200,115,0.7)',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            {isHi ? '—वेड्स—' : '—weds—'}
          </div>
          <div className="hero-names">
            {couple.groom.nameEn}
          </div>
        </motion.div>

        {/* Hindi names */}
        <motion.div
          className="hero-names-hi"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {couple.bride.nameHi} &amp; {couple.groom.nameHi}
        </motion.div>

        {/* Date and city */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="hero-date">{weddingDateStr}</div>
          <div className="hero-city">Jaipur, Rajasthan</div>
        </motion.div>

        {/* Family blessing */}
        <motion.p
          className="hero-blessing"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {isHi ? familyBlessingsHi : familyBlessingsEn}
        </motion.p>

        {/* Couple portrait */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            position: 'relative',
            display: 'inline-block',
            margin: '0 auto 32px',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: -3,
            borderRadius: 999,
            background: 'linear-gradient(135deg, #E7C873, #C9A24B, #B8892E)',
            zIndex: 0,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: 200,
            height: 240,
            borderRadius: 999,
            overflow: 'hidden',
            border: '4px solid rgba(231,200,115,0.5)',
          }}>
            <Image
              src="/assets/hero/couple-portrait.jpg"
              alt="Meenal and Avinash"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="200px"
              priority
            />
          </div>
        </motion.div>

        {/* Save the date badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(201,162,75,0.2)',
            border: '1.5px solid rgba(201,162,75,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: 999,
            padding: '8px 24px',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            letterSpacing: 2,
            color: '#E7C873',
            textTransform: 'uppercase',
          }}>
            {t('hero.saveTheDate')}
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,248,236,0.6)' }}>
          {t('hero.scrollCue')}
        </span>
      </div>
    </section>
  );
}
