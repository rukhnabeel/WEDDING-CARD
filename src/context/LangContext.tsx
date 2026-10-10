'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import en from '@/i18n/en.json';
import hi from '@/i18n/hi.json';

type Lang = 'en' | 'hi';
type Strings = typeof en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  isHi: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
  isHi: false,
});

function getNestedValue(obj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return key;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : key;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('wedding-lang') as Lang | null;
    if (saved === 'en' || saved === 'hi') setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('wedding-lang', l);
  }, []);

  const t = useCallback((key: string): string => {
    const strings = lang === 'hi' ? hi : en;
    return getNestedValue(strings as unknown as Record<string, unknown>, key);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, isHi: lang === 'hi' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
