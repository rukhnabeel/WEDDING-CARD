'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { DividerMandala } from '@/components/ornaments/Ornaments';

interface Wish {
  id: string;
  name: string;
  message: string;
  rotation: number;
}

const initialWishes: Wish[] = [
  { id: '1', name: 'Sharma Family', message: 'Wishing you both a lifetime of love and happiness together! Can\'t wait to celebrate.', rotation: -2 },
  { id: '2', name: 'Rahul & Priya', message: 'Congratulations on finding your forever person. See you at the wedding!', rotation: 1 },
];

export default function WishesWall() {
  const { t, isHi } = useLang();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding-wishes');
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(initialWishes);
        localStorage.setItem('wedding-wishes', JSON.stringify(initialWishes));
      }
    } catch {
      setWishes(initialWishes);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now().toString(),
        name,
        message,
        rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 degrees
      };
      
      const newWishes = [newWish, ...wishes];
      setWishes(newWishes);
      try {
        localStorage.setItem('wedding-wishes', JSON.stringify(newWishes));
      } catch {}
      
      setName('');
      setMessage('');
      setIsSubmitting(false);
    }, 600); // Simulate network delay
  };

  return (
    <section className="section" id="wishes" style={{ background: 'var(--color-ivory)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('wishes.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari)' }}>{t('wishes.title_hi')}</span>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: 8 }}>
            {isHi ? 'जोड़े को अपना आशीर्वाद दें' : t('wishes.subtitle')}
          </p>
        </motion.div>

        {/* Wishes Input Form */}
        <div style={{ maxWidth: 500, margin: '0 auto 48px' }}>
          <form onSubmit={handleSubmit} style={{
            background: 'var(--gradient-card)',
            padding: 24,
            borderRadius: 16,
            border: '1px solid rgba(201,162,75,0.3)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div className="form-field">
              <input
                className="form-input"
                placeholder={isHi ? 'आपका नाम' : t('wishes.name')}
                value={name}
                onChange={e => setName(e.target.value)}
                required
                maxLength={40}
              />
            </div>
            <div className="form-field">
              <textarea
                className="form-input"
                placeholder={isHi ? 'अपना आशीर्वाद लिखें...' : t('wishes.placeholder')}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={3}
                maxLength={200}
                style={{ resize: 'none' }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={isSubmitting || !name.trim() || !message.trim()}
              id="btn-submit-wish"
            >
              {isSubmitting ? (isHi ? 'भेजा जा रहा है...' : 'Sending...') : (isHi ? 'आशीर्वाद भेजें' : t('wishes.submit'))}
            </button>
          </form>
        </div>

        {/* Wishes Grid */}
        <div className="wishes-grid">
          <AnimatePresence>
            {wishes.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', opacity: 0.5, padding: 32 }}>
                {isHi ? 'पहले आशीर्वाद भेजने वाले बनें!' : t('wishes.empty')}
              </div>
            ) : (
              wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                  className="wish-card"
                  style={{ '--rotation': `${wish.rotation}deg` } as React.CSSProperties}
                >
                  <p className="wish-text">"{wish.message}"</p>
                  <div className="wish-author">— {wish.name}</div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <DividerMandala />
      </div>
    </section>
  );
}
