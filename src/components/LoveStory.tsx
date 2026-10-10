'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import { DiyaIcon, LotusIcon, RingsIcon, KalashIcon, DividerMandala } from '@/components/ornaments/Ornaments';

const icons = {
  diya: DiyaIcon,
  lotus: LotusIcon,
  rings: RingsIcon,
  kalash: KalashIcon,
  heart: LotusIcon,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function LoveStory() {
  const { t, isHi } = useLang();
  const milestones = config.loveStory;

  return (
    <section className="section" id="story" style={{ background: 'var(--color-ivory-dark)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('story.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('story.title_hi')}</span>
        </motion.div>

        {/* Timeline */}
        <div className="timeline">
          {milestones.map((milestone, i) => {
            const IconComp = icons[milestone.icon] ?? DiyaIcon;
            const isRight = i % 2 === 0;

            return (
              <motion.div
                key={milestone.id}
                className="timeline-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Left content */}
                <div style={{ textAlign: isRight ? 'right' : 'left' }}>
                  {isRight ? (
                    <TimelineContent milestone={milestone} isHi={isHi} />
                  ) : (
                    <div>
                      {milestone.image && (
                        <div style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          border: '2px solid rgba(201,162,75,0.3)',
                          maxWidth: 180,
                          aspectRatio: '1',
                          position: 'relative',
                          marginLeft: 'auto',
                        }}>
                          <Image
                            src={milestone.image}
                            alt={milestone.titleEn}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="180px"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Center node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div className="timeline-node">
                    <IconComp size={24} color="#5A0815" />
                  </div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-gold-dark)',
                    letterSpacing: 1,
                  }}>
                    {milestone.year}
                  </div>
                </div>

                {/* Right content */}
                <div style={{ textAlign: isRight ? 'left' : 'right' }}>
                  {!isRight ? (
                    <TimelineContent milestone={milestone} isHi={isHi} />
                  ) : (
                    <div>
                      {milestone.image && (
                        <div style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          border: '2px solid rgba(201,162,75,0.3)',
                          maxWidth: 180,
                          aspectRatio: '1',
                          position: 'relative',
                        }}>
                          <Image
                            src={milestone.image}
                            alt={milestone.titleEn}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="180px"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <DividerMandala />
      </div>
    </section>
  );
}

function TimelineContent({ milestone, isHi }: { milestone: typeof config.loveStory[0]; isHi: boolean }) {
  return (
    <div>
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.3rem',
        fontWeight: 600,
        color: 'var(--color-maroon)',
        marginBottom: 4,
      }}>
        {isHi ? milestone.titleHi : milestone.titleEn}
      </h3>
      {isHi && (
        <p style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--color-maroon)',
          opacity: 0.8,
          marginBottom: 4,
        }}>
          {milestone.descHi}
        </p>
      )}
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'var(--color-maroon)',
        opacity: isHi ? 0.65 : 0.85,
      }}>
        {milestone.descEn}
      </p>
    </div>
  );
}
