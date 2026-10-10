'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';
import type { GalleryItem } from '@/config/types';
import { DividerMandala } from '@/components/ornaments/Ornaments';

type Category = 'all' | 'pre-wedding' | 'engagement' | 'family';

export default function Gallery() {
  const { t, isHi } = useLang();
  const [category, setCategory] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: isHi ? 'सभी' : 'All' },
    { id: 'pre-wedding', label: isHi ? 'प्री-वेडिंग' : 'Pre-Wedding' },
    { id: 'engagement', label: isHi ? 'सगाई' : 'Engagement' },
    { id: 'family', label: isHi ? 'परिवार' : 'Family' },
  ];

  const filtered = category === 'all'
    ? config.gallery
    : config.gallery.filter(g => g.category === category);

  return (
    <section className="section" id="gallery" style={{ background: 'var(--color-ivory-dark)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('gallery.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari)' }}>{t('gallery.title_hi')}</span>
        </motion.div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`event-tab ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
              id={`gallery-tab-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="gallery-grid">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setLightbox(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.alt}`}
                onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <DividerMandala />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: 44, height: 44,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={800}
                height={600}
                style={{ maxWidth: '90vw', maxHeight: '80vh', width: 'auto', height: 'auto', borderRadius: 16 }}
              />
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: 12, fontSize: '0.875rem' }}>
                {lightbox.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
