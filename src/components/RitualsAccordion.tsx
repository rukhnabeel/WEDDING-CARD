'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { DividerMandala } from '@/components/ornaments/Ornaments';

interface Ritual {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  descEn: string;
  descHi: string;
}

const RITUALS: Ritual[] = [
  {
    id: 'haldi',
    nameEn: 'Haldi',
    nameHi: 'हल्दी',
    icon: '🌿',
    descEn: 'Turmeric paste (haldi) is applied to the bride and groom by family members for skin glow, health, and auspiciousness. The bright yellow marks the transition into married life.',
    descHi: 'परिवार के सदस्यों द्वारा वर और वधू को हल्दी का उबटन लगाया जाता है — त्वचा की चमक, स्वास्थ्य और शुभता के लिए। पीला रंग विवाहित जीवन की शुरुआत का प्रतीक है।',
  },
  {
    id: 'mehndi',
    nameEn: 'Mehndi',
    nameHi: 'मेहँदी',
    icon: '🌸',
    descEn: 'Intricate henna designs (mehndi) are applied to the bride\'s hands and feet. Traditionally, the deeper the color, the stronger the love of the groom. A joyous pre-wedding celebration with music and games.',
    descHi: 'वधू के हाथों और पैरों पर मेहँदी के जटिल डिज़ाइन बनाए जाते हैं। परंपरा अनुसार, रंग जितना गहरा, वर का प्यार उतना अधिक। संगीत और खेलों के साथ एक आनंदमय पूर्व-विवाह उत्सव।',
  },
  {
    id: 'sangeet',
    nameEn: 'Sangeet',
    nameHi: 'संगीत',
    icon: '🎶',
    descEn: 'An evening of music, dance, and performances by both families. Originally a gathering of women singing folk songs, today it\'s a grand celebration with choreographed performances and dinner.',
    descHi: 'संगीत, नृत्य और दोनों परिवारों के प्रदर्शन की एक शाम। मूलतः महिलाओं का लोकगीत गाने का मिलन, आज यह नृत्य प्रदर्शन और भोजन के साथ एक भव्य उत्सव है।',
  },
  {
    id: 'baraat',
    nameEn: 'Baraat & Milni',
    nameHi: 'बारात एवं मिलनी',
    icon: '🐴',
    descEn: 'The Baraat is the groom\'s wedding procession — he arrives on a decorated horse (ghodi), accompanied by dhol, dancing, and celebration. The Milni is the formal first meeting of both families, with garland exchanges.',
    descHi: 'बारात दूल्हे का विवाह जुलूस है — वह सजी हुई घोड़ी पर आते हैं, साथ में ढोल, नृत्य और उत्सव। मिलनी दोनों परिवारों की औपचारिक पहली मुलाकात है, जहाँ माला का आदान-प्रदान होता है।',
  },
  {
    id: 'jaimala',
    nameEn: 'Jaimala / Varmala',
    nameHi: 'जयमाला / वरमाला',
    icon: '💐',
    descEn: 'The garland exchange (varmala) between bride and groom, symbolizing mutual acceptance and the beginning of their union. Traditionally a playful and joyful moment as each side tries to lift their person higher!',
    descHi: 'वर और वधू के बीच माला का आदान-प्रदान, जो एक-दूसरे की स्वीकृति और उनके मिलन की शुरुआत का प्रतीक है। परंपरागत रूप से एक खेलपूर्ण और आनंदमय क्षण!',
  },
  {
    id: 'pheras',
    nameEn: 'Pheras / Saptapadi (Seven Vows)',
    nameHi: 'फेरे / सप्तपदी',
    icon: '🔥',
    descEn: 'The most sacred ritual — the couple takes seven steps (Saptapadi) around the holy fire (Agni), each step representing a vow: (1) Food & Nourishment, (2) Strength & Prosperity, (3) Wealth & Devotion, (4) Wisdom & Joy, (5) Children & Longevity, (6) Health & Seasons, (7) Friendship & Lifelong Love.',
    descHi: 'सबसे पवित्र रस्म — दंपती पवित्र अग्नि के सम्मुख सात फेरे (सप्तपदी) लेते हैं। प्रत्येक फेरा एक वचन है: (१) भोजन, (२) शक्ति, (३) धन, (४) ज्ञान, (५) संतान, (६) स्वास्थ्य, (७) मित्रता एवं सनातन प्रेम।',
  },
  {
    id: 'kanyadaan',
    nameEn: 'Kanyadaan',
    nameHi: 'कन्यादान',
    icon: '🙏',
    descEn: 'One of the holiest acts in Hindu tradition — the bride\'s parents place her hand in the groom\'s, giving their daughter in trust and love. It is considered the greatest gift (daan) a parent can give.',
    descHi: 'हिंदू परंपरा के सबसे पवित्र कार्यों में से एक — वधू के माता-पिता अपनी बेटी का हाथ वर के हाथ में देते हैं। इसे माता-पिता द्वारा दिया जाने वाला सबसे बड़ा दान माना जाता है।',
  },
  {
    id: 'sindoor',
    nameEn: 'Sindoor & Mangalsutra',
    nameHi: 'सिंदूर एवं मंगलसूत्र',
    icon: '❤️',
    descEn: 'The groom applies vermillion (sindoor) in the bride\'s hair parting, and ties the Mangalsutra (sacred black-and-gold necklace) around her neck — marking her as his wife. Deeply symbolic and emotional.',
    descHi: 'वर वधू की माँग में सिंदूर भरता है और उसके गले में मंगलसूत्र (पवित्र काला-सुनहरा हार) पहनाता है — उसे अपनी पत्नी का दर्जा देते हुए। अत्यंत भावपूर्ण और प्रतीकात्मक।',
  },
  {
    id: 'vidaai',
    nameEn: 'Vidaai',
    nameHi: 'विदाई',
    icon: '🌸',
    descEn: 'The emotional farewell as the bride leaves her parents\' home to start her new life. She throws rice backward over her head as she leaves, wishing prosperity to her birth family. Among the most moving moments of a Hindu wedding.',
    descHi: 'भावभीनी विदाई — जब वधू अपने माता-पिता का घर छोड़कर अपने नए जीवन की शुरुआत करती है। जाते समय वह पीछे की ओर चावल उड़ाती है, अपने मायके को समृद्धि का आशीर्वाद देती है।',
  },
];

export default function RitualsAccordion() {
  const { t, isHi } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className="section" id="rituals" style={{ background: 'var(--color-ivory)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('rituals.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('rituals.title_hi')}</span>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: 8 }}>
            {isHi ? 'हमारी पवित्र परंपराओं का परिचय' : t('rituals.subtitle')}
          </p>
        </motion.div>

        <div>
          {RITUALS.map((ritual, i) => (
            <motion.div
              key={ritual.id}
              className="ritual-item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                className="ritual-trigger"
                onClick={() => toggle(ritual.id)}
                aria-expanded={openId === ritual.id}
                aria-controls={`ritual-content-${ritual.id}`}
                id={`ritual-trigger-${ritual.id}`}
              >
                <div className="ritual-icon" aria-hidden="true">
                  <span style={{ fontSize: '1.2rem' }}>{ritual.icon}</span>
                </div>
                <div className="ritual-title">
                  <div className="ritual-title-en">{ritual.nameEn}</div>
                  <div className="ritual-title-hi" style={{ fontFamily: 'var(--font-devanagari)' }}>{ritual.nameHi}</div>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  className={`ritual-chevron ${openId === ritual.id ? 'open' : ''}`}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {openId === ritual.id && (
                  <motion.div
                    id={`ritual-content-${ritual.id}`}
                    role="region"
                    aria-labelledby={`ritual-trigger-${ritual.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="ritual-content">
                      <p>{ritual.descEn}</p>
                      <p className="hi" style={{ fontFamily: 'var(--font-devanagari)', marginTop: 10 }}>
                        {ritual.descHi}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <DividerMandala />
      </div>
    </section>
  );
}
