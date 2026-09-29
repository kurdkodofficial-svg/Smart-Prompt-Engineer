import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Bookmark, Cpu, Globe, ChevronDown, Check, CreditCard, Sparkles, Clock, Crown } from 'lucide-react';
import { SupportedLang, KurdishDialect } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  lang: SupportedLang;
  onSelectLang: (newLang: SupportedLang) => void;
  onOpenSubscription: () => void;
  subscriberStatus: 'inactive' | 'pending_approval' | 'active';
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  lang,
  onSelectLang,
  onOpenSubscription,
  subscriberStatus,
}) => {
  const [isDialectMenuOpen, setIsDialectMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const isKurdish = lang.startsWith('ku_');

  // Close dialect dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDialectMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const kurdishDialects: { id: SupportedLang; label: string; sub: string; dir: 'rtl' | 'ltr' }[] = [
    { id: 'ku_ckb', label: 'سۆرانی', sub: 'Central Kurdish (Sorani)', dir: 'rtl' },
    { id: 'ku_bad', label: 'بادینی / بەهدینی', sub: 'Northern Kurdish (Badîcan)', dir: 'rtl' },
    { id: 'ku_kmr', label: 'Kurmancî', sub: 'Northern Kurdish (Latin)', dir: 'ltr' },
    { id: 'ku_hwr', label: 'هەورامی', sub: 'Hawramî / Avromanî', dir: 'rtl' },
  ];

  const currentKurdishDialectLabel =
    kurdishDialects.find((d) => d.id === lang)?.label || 'سۆرانی';

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white shadow-xs shadow-amber-500/20">
            <Terminal className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-xl">
                {t.appName}
              </h1>
              <span className="hidden rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 sm:inline-block">
                {t.badge}
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Model Indicator */}
          <div className="hidden items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-xs font-medium text-stone-700 shadow-2xs dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-300 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Cpu className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t.modelEngine}</span>
          </div>

          {/* Subscription / Subscriber Dashboard Button */}
          <button
            id="header-subscription-btn"
            type="button"
            onClick={onOpenSubscription}
            className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all ${
              subscriberStatus === 'active'
                ? 'border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : subscriberStatus === 'pending_approval'
                ? 'border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                : 'border border-amber-300/80 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20'
            }`}
            title={t.subscriptionPlan}
          >
            {subscriberStatus === 'active' ? (
              <>
                <Crown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">{t.subscriberDashboardTitle}</span>
                <span className="rounded bg-emerald-200/60 px-1 py-0.2 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                  {t.statusActive}
                </span>
              </>
            ) : subscriberStatus === 'pending_approval' ? (
              <>
                <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">{t.statusPendingApproval}</span>
              </>
            ) : (
              <>
                <CreditCard className="h-3.5 w-3.5" />
                <span>{t.subscriptionPlan}</span>
                <span className="rounded bg-white/25 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                  7,500 IQD
                </span>
              </>
            )}
          </button>

          {/* Saved Prompts Button */}
          <button
            id="saved-prompts-btn"
            type="button"
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-2xs transition-all hover:border-stone-300 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
            title={t.savedPrompts}
          >
            <Bookmark className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">{t.archive}</span>
            {savedCount > 0 && (
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* Multilingual Selector: 1. English (Primary) | 2. Kurdish (All Dialects) | 3. Arabic */}
          <div className="relative" ref={menuRef}>
            <div className="inline-flex rounded-lg border border-stone-200/90 bg-stone-100/80 p-0.5 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
              {/* 1. English (Primary) */}
              <button
                id="lang-en-btn"
                type="button"
                onClick={() => {
                  onSelectLang('en');
                  setIsDialectMenuOpen(false);
                }}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  lang === 'en'
                    ? 'bg-white text-amber-700 shadow-xs dark:bg-stone-800 dark:text-amber-400'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                }`}
                title="Primary: English"
              >
                <span>English</span>
                {lang === 'en' && <span className="h-1 w-1 rounded-full bg-amber-500"></span>}
              </button>

              {/* 2. Kurdish (With dialect selector) */}
              <div className="relative">
                <button
                  id="lang-kurdish-btn"
                  type="button"
                  onClick={() => {
                    if (!isKurdish) {
                      onSelectLang('ku_ckb');
                    }
                    setIsDialectMenuOpen((prev) => !prev);
                  }}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    isKurdish
                      ? 'bg-white text-amber-700 shadow-xs dark:bg-stone-800 dark:text-amber-400'
                      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                  }`}
                  title="2nd: Kurdish (All Dialects)"
                >
                  <span>{isKurdish ? `کوردی (${currentKurdishDialectLabel})` : 'کوردی'}</span>
                  <ChevronDown
                    className={`h-3 w-3 text-stone-500 transition-transform ${
                      isDialectMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Kurdish Dialects Dropdown */}
                {isDialectMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-60 z-50 rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl dark:border-stone-800 dark:bg-stone-900 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1 text-[11px] font-bold text-stone-500 border-b border-stone-100 dark:border-stone-800 dark:text-stone-400 flex items-center justify-between">
                      <span>زاراوەکانی زمانی کوردی</span>
                      <span className="text-[10px] text-amber-600 font-normal">Kurdish Dialects</span>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {kurdishDialects.map((d) => {
                        const isCurrent = lang === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              onSelectLang(d.id);
                              setIsDialectMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-start transition ${
                              isCurrent
                                ? 'bg-amber-50 text-amber-900 font-bold dark:bg-amber-950/40 dark:text-amber-300'
                                : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold">{d.label}</span>
                              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-normal">
                                {d.sub}
                              </span>
                            </div>
                            {isCurrent && <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Arabic (العربية) */}
              <button
                id="lang-ar-btn"
                type="button"
                onClick={() => {
                  onSelectLang('ar');
                  setIsDialectMenuOpen(false);
                }}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  lang === 'ar'
                    ? 'bg-white text-amber-700 shadow-xs dark:bg-stone-800 dark:text-amber-400'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                }`}
                title="3rd: Arabic"
              >
                <span>العربية</span>
                {lang === 'ar' && <span className="h-1 w-1 rounded-full bg-amber-500"></span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
