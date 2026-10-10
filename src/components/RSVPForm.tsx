'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';

interface RSVPData {
  name: string;
  phone: string;
  attending: 'yes' | 'no' | '';
  events: Record<string, boolean>;
  guests: number;
  adults: number;
  children: number;
  meal: 'veg' | 'jain' | 'no-onion' | '';
  arrivalDate: string;
  needStay: boolean;
  needPickup: boolean;
  notes: string;
}

const initial: RSVPData = {
  name: '', phone: '', attending: '',
  events: {},
  guests: 1, adults: 1, children: 0,
  meal: 'veg', arrivalDate: '', needStay: false, needPickup: false, notes: '',
};

// Local mock: store RSVPs in localStorage
function saveRSVP(data: RSVPData) {
  try {
    const existing = JSON.parse(localStorage.getItem('rsvps') || '[]');
    existing.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem('rsvps', JSON.stringify(existing));
  } catch {}
}

function buildWhatsAppMessage(data: RSVPData): string {
  const attending = data.attending === 'yes' ? 'Yes ✅' : 'No ❌';
  const events = Object.entries(data.events).filter(([, v]) => v).map(([k]) => k).join(', ') || 'N/A';
  return encodeURIComponent(
    `*RSVP — Meenal & Avinash Wedding* 💍\n\nName: ${data.name}\nPhone: ${data.phone}\nAttending: ${attending}\nFunctions: ${events}\nGuests: ${data.guests} (${data.adults} adults, ${data.children} children)\nMeal: ${data.meal}\nArrival: ${data.arrivalDate || 'TBD'}\nStay needed: ${data.needStay ? 'Yes' : 'No'}\nPickup needed: ${data.needPickup ? 'Yes' : 'No'}\nNotes: ${data.notes || 'None'}\n\n#MeenalWedsAvinash`
  );
}

export default function RSVPForm() {
  const { t, isHi } = useLang();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RSVPData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPData, string>>>({});

  const set = <K extends keyof RSVPData>(key: K, value: RSVPData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validateStep1 = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    if (!form.attending) errs.attending = 'Please select';
    return errs;
  };

  const handleNext = () => {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    setStep(s => Math.min(s + 1, 3));
  };

  const handleSubmit = () => {
    saveRSVP(form);
    setSubmitted(true);
  };

  const deadline = new Date(config.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const whatsappHost = config.contact.whatsappBride;

  return (
    <section className="section" id="rsvp" style={{ background: 'var(--color-ivory)' }}>
      <div className="section-inner">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gold-shimmer">{t('rsvp.title')}</h2>
          <span className="hi" style={{ fontFamily: 'var(--font-devanagari-display)' }}>{t('rsvp.title_hi')}</span>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: 8 }}>
            {isHi ? 'कृपया इस तारीख से पहले जवाब दें' : 'Kindly respond by'} <strong>{deadline}</strong>
          </p>
        </motion.div>

        <div className="card" style={{ maxWidth: 560, margin: '0 auto', padding: 32 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ─── Success Screen ─── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--color-gold)', marginBottom: 12 }}>
                  {t('rsvp.successTitle')}
                </h3>
                <p style={{ fontFamily: 'var(--font-devanagari)', lineHeight: 1.8, marginBottom: 8 }}>
                  {t('rsvp.successMsg_hi')}
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', opacity: 0.75, marginBottom: 24 }}>
                  {t('rsvp.successMsg')}
                </p>
                <a
                  href={`https://wa.me/${whatsappHost}?text=${buildWhatsAppMessage(form)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  id="btn-rsvp-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.854L0 24l6.293-1.501A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 21.818a9.836 9.836 0 01-5.024-1.376l-.36-.214-3.735.892.938-3.626-.236-.374A9.811 9.811 0 012.18 12C2.18 6.562 6.562 2.18 12 2.18S21.818 6.562 21.818 12c0 5.437-4.382 9.818-9.819 9.818z" fillRule="evenodd" clipRule="evenodd"/>
                  </svg>
                  {t('rsvp.whatsappConfirm')}
                </a>
              </motion.div>
            ) : (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                {/* Stepper */}
                <div className="rsvp-stepper" aria-label="Form progress">
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className={`rsvp-step ${s < step ? 'done' : s === step ? 'active' : 'pending'}`}>
                        {s < step ? '✓' : s}
                      </div>
                      {s < 3 && <div className={`rsvp-step-line ${s < step ? 'done' : ''}`} />}
                    </div>
                  ))}
                </div>

                {/* Step labels */}
                <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {step === 1 ? t('rsvp.step1') : step === 2 ? t('rsvp.step2') : t('rsvp.step3')}
                </div>

                {/* ─── Step 1: Details ─── */}
                {step === 1 && (
                  <div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="rsvp-name">{t('rsvp.name')}</label>
                      <input
                        id="rsvp-name"
                        className="form-input"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder={isHi ? 'आपका पूरा नाम' : 'e.g. Sharma Family'}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p style={{ color: 'crimson', fontSize: '0.75rem', marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="rsvp-phone">{t('rsvp.phone')}</label>
                      <input
                        id="rsvp-phone"
                        className="form-input"
                        type="tel"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p style={{ color: 'crimson', fontSize: '0.75rem', marginTop: 4 }}>{errors.phone}</p>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">{t('rsvp.attending')}</label>
                      {errors.attending && <p style={{ color: 'crimson', fontSize: '0.75rem', marginBottom: 4 }}>{errors.attending}</p>}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                          { value: 'yes', label: t('rsvp.yes'), emoji: '🎉' },
                          { value: 'no', label: t('rsvp.no'), emoji: '😔' },
                        ].map(opt => (
                          <label
                            key={opt.value}
                            className={`radio-card ${form.attending === opt.value ? 'selected' : ''}`}
                            htmlFor={`rsvp-attending-${opt.value}`}
                          >
                            <input
                              type="radio"
                              id={`rsvp-attending-${opt.value}`}
                              name="attending"
                              value={opt.value}
                              checked={form.attending === opt.value}
                              onChange={() => set('attending', opt.value as 'yes' | 'no')}
                              style={{ display: 'none' }}
                            />
                            <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
                            <span style={{ fontWeight: 500 }}>{opt.label}</span>
                            {form.attending === opt.value && (
                              <span style={{ marginLeft: 'auto', color: 'var(--color-gold)' }}>✓</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Step 2: Functions ─── */}
                {step === 2 && (
                  <div>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: 16 }}>
                      {isHi ? 'आप किन कार्यक्रमों में आएंगे?' : 'Which functions will you attend?'}
                    </p>
                    {config.events.map(evt => (
                      <label
                        key={evt.id}
                        className={`radio-card ${form.events[evt.id] ? 'selected' : ''}`}
                        htmlFor={`evt-${evt.id}`}
                        style={{ marginBottom: 8 }}
                      >
                        <input
                          type="checkbox"
                          id={`evt-${evt.id}`}
                          checked={!!form.events[evt.id]}
                          onChange={e => set('events', { ...form.events, [evt.id]: e.target.checked })}
                          style={{ display: 'none' }}
                        />
                        <div style={{ borderLeft: `3px solid ${evt.accentColor}`, paddingLeft: 10 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{isHi ? evt.nameHi : evt.nameEn}</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                            {evt.date} · {evt.startTime}
                          </div>
                        </div>
                        {form.events[evt.id] && <span style={{ marginLeft: 'auto', color: 'var(--color-gold)' }}>✓</span>}
                      </label>
                    ))}
                  </div>
                )}

                {/* ─── Step 3: Preferences ─── */}
                {step === 3 && (
                  <div>
                    {/* Guest count */}
                    <div className="form-field">
                      <label className="form-label">{t('rsvp.guests')}</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {(['adults', 'children'] as const).map(field => (
                          <div key={field}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: 6 }}>
                              {field === 'adults' ? t('rsvp.adults') : t('rsvp.children')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <button
                                className="btn-secondary"
                                style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => set(field, Math.max(0, form[field] - 1))}
                                aria-label={`Decrease ${field}`}
                              >−</button>
                              <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{form[field]}</span>
                              <button
                                className="btn-secondary"
                                style={{ width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => set(field, form[field] + 1)}
                                aria-label={`Increase ${field}`}
                              >+</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meal */}
                    <div className="form-field">
                      <label className="form-label">{t('rsvp.meal')}</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                          { value: 'veg', label: t('rsvp.veg'), emoji: '🥗' },
                          { value: 'jain', label: t('rsvp.jain'), emoji: '🌿' },
                          { value: 'no-onion', label: t('rsvp.noOnion'), emoji: '🧅' },
                        ].map(opt => (
                          <label key={opt.value} className={`radio-card ${form.meal === opt.value ? 'selected' : ''}`} htmlFor={`meal-${opt.value}`}>
                            <input type="radio" id={`meal-${opt.value}`} name="meal" value={opt.value} checked={form.meal === opt.value} onChange={() => set('meal', opt.value as RSVPData['meal'])} style={{ display: 'none' }}/>
                            <span>{opt.emoji}</span>
                            <span style={{ fontWeight: 500 }}>{opt.label}</span>
                            {form.meal === opt.value && <span style={{ marginLeft: 'auto', color: 'var(--color-gold)' }}>✓</span>}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Arrival date */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="rsvp-arrival">{t('rsvp.arrivalDate')}</label>
                      <input id="rsvp-arrival" type="date" className="form-input" value={form.arrivalDate} onChange={e => set('arrivalDate', e.target.value)} min="2027-02-11" max="2027-02-15"/>
                    </div>

                    {/* Stay & Pickup toggles */}
                    {[
                      { key: 'needStay' as const, label: t('rsvp.needStay') },
                      { key: 'needPickup' as const, label: t('rsvp.needPickup') },
                    ].map(({ key, label }) => (
                      <div key={key} className="form-field">
                        <label className={`radio-card ${form[key] ? 'selected' : ''}`} htmlFor={`toggle-${key}`} style={{ cursor: 'pointer' }}>
                          <input type="checkbox" id={`toggle-${key}`} checked={form[key]} onChange={e => set(key, e.target.checked)} style={{ display: 'none' }}/>
                          <span style={{ flex: 1, fontWeight: 500, fontSize: '0.9rem' }}>{label}</span>
                          <div style={{
                            width: 40, height: 22, borderRadius: 11,
                            background: form[key] ? 'var(--color-gold)' : 'rgba(0,0,0,0.1)',
                            position: 'relative', transition: '0.3s',
                          }}>
                            <div style={{
                              position: 'absolute', top: 3, left: form[key] ? 20 : 3,
                              width: 16, height: 16, borderRadius: '50%',
                              background: 'white', transition: '0.3s',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            }} />
                          </div>
                        </label>
                      </div>
                    ))}

                    {/* Notes */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="rsvp-notes">{t('rsvp.specialNeeds')}</label>
                      <textarea
                        id="rsvp-notes"
                        className="form-input"
                        rows={3}
                        value={form.notes}
                        onChange={e => set('notes', e.target.value)}
                        placeholder={isHi ? 'कोई विशेष आवश्यकता...' : 'Any special requirements or notes...'}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 24 }}>
                  {step > 1 && (
                    <button className="btn-secondary" onClick={() => setStep(s => s - 1)} id="btn-rsvp-back">
                      ← {t('rsvp.back')}
                    </button>
                  )}
                  <div style={{ flex: 1 }} />
                  {step < 3 ? (
                    <button className="btn-primary" onClick={handleNext} id="btn-rsvp-next">
                      {t('rsvp.next')} →
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={handleSubmit} id="btn-rsvp-submit">
                      🙏 {t('rsvp.submit')}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
