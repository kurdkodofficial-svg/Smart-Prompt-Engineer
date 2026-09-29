import React, { useState } from 'react';
import { HelpCircle, ArrowRight, ArrowLeft, Wand2 } from 'lucide-react';
import { ClarifyingQuestion, SupportedLang } from '../types';
import { TRANSLATIONS, isRtlLang } from '../i18n/translations';

interface ClarificationCardProps {
  questions: ClarifyingQuestion[];
  onSubmitAnswers: (answers: Record<string, string>) => void;
  onApplyDefaults: () => void;
  isLoading: boolean;
  lang: SupportedLang;
}

export const ClarificationCard: React.FC<ClarificationCardProps> = ({
  questions,
  onSubmitAnswers,
  onApplyDefaults,
  isLoading,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const isRTL = isRtlLang(lang);

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    questions.forEach((q) => {
      initial[q.field] = q.sensibleDefault || '';
    });
    return initial;
  });

  const handleInputChange = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleUseDefault = (field: string, defaultValue: string) => {
    setAnswers((prev) => ({ ...prev, [field]: defaultValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAnswers(answers);
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      id="clarification-card"
      className="relative overflow-hidden rounded-xl border border-amber-200/90 bg-amber-50/50 p-5 shadow-xs dark:border-amber-900/60 dark:bg-amber-950/20"
    >
      {/* Top Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
          <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold">
              {t.clarificationTitle}
            </h3>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
              {t.clarificationSubtitle}
            </p>
          </div>
        </div>

        {/* 1-click apply smart defaults button */}
        <button
          type="button"
          onClick={onApplyDefaults}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-amber-700 disabled:opacity-50"
        >
          <Wand2 className="h-3.5 w-3.5" />
          <span>{t.applyDefaultsNow}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {questions.map((q, idx) => (
          <div
            key={q.field || idx}
            className="rounded-lg border border-amber-200/80 bg-white/90 p-3.5 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <label className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                {q.question}
              </label>
              {q.sensibleDefault && (
                <button
                  type="button"
                  onClick={() => handleUseDefault(q.field, q.sensibleDefault)}
                  className="text-[11px] text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 font-medium underline underline-offset-2 flex items-center gap-1"
                >
                  <span>{t.useDefaultButton}:</span>
                  <span className="max-w-[200px] truncate font-normal text-stone-600 dark:text-stone-400">
                    {q.sensibleDefault}
                  </span>
                </button>
              )}
            </div>

            <input
              type="text"
              value={answers[q.field] || ''}
              onChange={(e) => handleInputChange(q.field, e.target.value)}
              placeholder={q.sensibleDefault || t.customAnswerPlaceholder}
              className="w-full rounded-md border border-stone-200 bg-stone-50/60 px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-100"
            />
          </div>
        ))}

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            <span>{t.finalizeWithAnswers}</span>
            <ArrowIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
