import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInputForm } from './components/PromptInputForm';
import { ClarificationCard } from './components/ClarificationCard';
import { PromptResultCard } from './components/PromptResultCard';
import { SavedPromptsDrawer } from './components/SavedPromptsDrawer';
import { Subscription } from './components/Subscription';
import { GeneratedPromptResult, SavedPromptItem, QuickTemplate, SupportedLang, SubscriberState, PromptSections } from './types';
import { TRANSLATIONS, isRtlLang } from './i18n/translations';
import {
  Code2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Layers,
  BookOpen,
  CreditCard,
  Crown,
  Database,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Primary: English ('en'), Second: Kurdish (Dialects), Third: Arabic ('ar')
  const [lang, setLang] = useState<SupportedLang>(() => {
    try {
      const saved = localStorage.getItem('smart_prompt_lang');
      if (saved && (saved === 'en' || saved === 'ar' || saved.startsWith('ku_'))) {
        return saved as SupportedLang;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const t = TRANSLATIONS[lang];
  const isRTL = isRtlLang(lang);

  const [roughRequest, setRoughRequest] = useState('');
  const [selectedTool, setSelectedTool] = useState('Claude 3.7 Sonnet / Cursor');
  const [endGoal, setEndGoal] = useState('');
  const [constraints, setConstraints] = useState('');
  const [autoDefault, setAutoDefault] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const [result, setResult] = useState<GeneratedPromptResult | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>(() => {
    try {
      const stored = localStorage.getItem('smart_prompt_engineer_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [subscriberState, setSubscriberState] = useState<SubscriberState>(() => {
    try {
      const stored = localStorage.getItem('smart_prompt_subscriber_state');
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return {
      isSubscribed: false,
      status: 'inactive',
      planName: 'Monthly 7,500 IQD Plan',
      priceIQD: 7500,
      subscriberName: '',
      subscriberPhone: '',
      paymentMethod: 'fastpay',
      receiptImage: null,
      submittedAt: null,
      approvedAt: null,
      expiresAt: null,
      note: 'ئەو پارە هی خزمەتگوزاری وێبە',
    };
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [promptSessionId, setPromptSessionId] = useState<string>(() => `session-${Date.now()}`);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Sync document direction and language code
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.startsWith('ku') ? 'ku' : lang;
    try {
      localStorage.setItem('smart_prompt_lang', lang);
    } catch {
      // Ignore
    }
  }, [lang, isRTL]);

  // Sync saved prompts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smart_prompt_engineer_saved', JSON.stringify(savedPrompts));
    } catch (e) {
      console.error('Failed to persist saved prompts', e);
    }
  }, [savedPrompts]);

  // Sync subscriber state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smart_prompt_subscriber_state', JSON.stringify(subscriberState));
    } catch (e) {
      console.error('Failed to persist subscriber state', e);
    }
  }, [subscriberState]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectLang = (newLang: SupportedLang) => {
    setLang(newLang);
    showToast(`${TRANSLATIONS[newLang].appName} — ${newLang.toUpperCase()}`, 'success');
  };

  const handleGenerate = async (overrideAutoDefault?: boolean) => {
    if (!roughRequest.trim()) return;
    setIsLoading(true);
    setTestOutput(null);

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughRequest,
          targetTool: selectedTool,
          endGoal,
          constraints,
          language: lang,
          autoDefault: overrideAutoDefault !== undefined ? overrideAutoDefault : autoDefault,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate prompt');
      }

      const data: GeneratedPromptResult = await res.json();
      setResult(data);

      if (data.status === 'ready') {
        setPromptSessionId(`session-${Date.now()}`);
        showToast(t.toastGenerated, 'success');
      }
    } catch (err: any) {
      console.error('Error generating prompt:', err);
      showToast(err.message || 'Error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClarificationSubmit = async (answers: Record<string, string>) => {
    if (answers.targetTool) setSelectedTool(answers.targetTool);
    if (answers.endGoal) setEndGoal(answers.endGoal);
    if (answers.constraints) setConstraints(answers.constraints);

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughRequest,
          targetTool: answers.targetTool || selectedTool,
          endGoal: answers.endGoal || endGoal,
          constraints: answers.constraints || constraints,
          language: lang,
          autoDefault: true,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to finalize prompt');
      }

      const data: GeneratedPromptResult = await res.json();
      setResult(data);
      setPromptSessionId(`session-${Date.now()}`);
      showToast(t.toastClarified, 'success');
    } catch (err: any) {
      showToast(err.message || 'Error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyDefaults = () => {
    handleGenerate(true);
  };

  const handleRevise = async (revisionInstruction: string, activePromptText?: string) => {
    const promptToRevise = activePromptText || result?.finalPrompt;
    if (!promptToRevise) return;
    setIsRevising(true);

    try {
      const res = await fetch('/api/revise-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPrompt: promptToRevise,
          revisionRequest: revisionInstruction,
          language: lang,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to revise prompt');
      }

      const data = await res.json();
      setResult((prev) => ({
        ...prev!,
        finalPrompt: data.revisedPrompt,
        sections: data.sections || prev?.sections,
        keyChoiceNote: data.keyChoiceNote || data.changesAppliedSummary,
        changesAppliedSummary: data.changesAppliedSummary,
      }));

      showToast(t.toastRevised, 'success');
    } catch (err: any) {
      showToast(err.message || 'Error occurred', 'error');
    } finally {
      setIsRevising(false);
    }
  };

  const handleTestPrompt = async (promptText: string) => {
    setIsTesting(true);
    setTestOutput(null);

    try {
      const res = await fetch('/api/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to test prompt');
      }

      const data = await res.json();
      setTestOutput(data.output);
    } catch (err: any) {
      showToast(err.message || 'Error occurred', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const isCurrentSaved =
    result?.finalPrompt &&
    savedPrompts.some((item) => item.promptText === result.finalPrompt);

  const handleSavePrompt = (customPromptText?: string, customSections?: PromptSections) => {
    const promptText = customPromptText || result?.finalPrompt;
    if (!promptText) return;

    const alreadySaved = savedPrompts.some((item) => item.promptText === promptText);
    if (alreadySaved) {
      // Unsave
      setSavedPrompts((prev) => prev.filter((item) => item.promptText !== promptText));
      showToast(t.toastUnsaved);
    } else {
      const newItem: SavedPromptItem = {
        id: `prompt-${Date.now()}`,
        title: roughRequest.slice(0, 70) || t.appName,
        createdAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'en' ? 'en-US' : 'ku', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        targetTool: result?.targetToolIdentified || selectedTool,
        category: 'code',
        promptText: promptText,
        sections: customSections || result?.sections,
        isFavorite: true,
      };
      setSavedPrompts((prev) => [newItem, ...prev]);
      showToast(t.toastSaved);
    }
  };

  const handleSelectTemplate = (tmpl: QuickTemplate) => {
    setRoughRequest(tmpl.roughRequest);
    setSelectedTool(tmpl.tool);
    setEndGoal(tmpl.endGoal);
    setConstraints(tmpl.constraints);
    showToast(`${t.appName}: ${tmpl.title}`, 'success');
  };

  const handleLoadSavedItem = (item: SavedPromptItem) => {
    setResult({
      status: 'ready',
      finalPrompt: item.promptText,
      sections: item.sections,
      targetToolIdentified: item.targetTool,
    });
    setSelectedTool(item.targetTool);
    setPromptSessionId(`session-${Date.now()}`);
    setIsDrawerOpen(false);
    showToast(t.toastLoaded);
  };

  const handleDeleteSavedItem = (id: string) => {
    setSavedPrompts((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAllSaved = () => {
    if (window.confirm(t.confirmClearAll)) {
      setSavedPrompts([]);
    }
  };

  return (
    <div
      className="min-h-screen bg-stone-100/70 text-stone-900 selection:bg-amber-500/20 dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-xs font-semibold text-white shadow-xl dark:bg-stone-100 dark:text-stone-900 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-400 dark:text-rose-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <Header
        savedCount={savedPrompts.length}
        onOpenSaved={() => setIsDrawerOpen(true)}
        lang={lang}
        onSelectLang={handleSelectLang}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        subscriberStatus={subscriberState.status}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
        {/* Subscription Plan & Dashboard Highlight Banner */}
        <div
          id="subscription-announcement-banner"
          className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all shadow-xs ${
            subscriberState.status === 'active'
              ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-teal-50/50 dark:border-emerald-900/60 dark:from-emerald-950/30 dark:via-stone-900 dark:to-stone-900'
              : subscriberState.status === 'pending_approval'
              ? 'border-amber-300 bg-gradient-to-r from-amber-50 via-white to-orange-50/40 dark:border-amber-900/60 dark:from-amber-950/30 dark:via-stone-900 dark:to-stone-900'
              : 'border-amber-200/90 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent dark:border-amber-900/50 dark:from-amber-950/40 dark:via-stone-900/80 dark:to-stone-900'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xs ${
                  subscriberState.status === 'active'
                    ? 'bg-emerald-600'
                    : 'bg-gradient-to-tr from-amber-600 to-orange-500'
                }`}
              >
                {subscriberState.status === 'active' ? (
                  <Crown className="h-5 w-5" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    {subscriberState.status === 'active'
                      ? t.subscriberDashboardTitle
                      : t.monthlyPlanTitle}
                  </span>
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-extrabold text-amber-800 dark:text-amber-300">
                    {t.subscriptionPrice}
                  </span>
                  {subscriberState.status === 'active' && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                      {t.statusActive}
                    </span>
                  )}
                  {subscriberState.status === 'pending_approval' && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                      {t.statusPendingApproval}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {subscriberState.status === 'active'
                    ? t.featureStorage
                    : `${t.monthlyPlanSubtitle} (${t.fastPayFIBTitle}: +9647504909260)`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              <button
                id="open-subscription-banner-btn"
                type="button"
                onClick={() => setIsSubscriptionOpen(true)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition ${
                  subscriberState.status === 'active'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-amber-500 hover:bg-amber-600'
                }`}
              >
                <span>
                  {subscriberState.status === 'active'
                    ? t.openDashboard
                    : `${t.subscriptionPlan} — 7,500 IQD`}
                </span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Intro Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 p-5 shadow-2xs backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/60 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="h-4 w-4" />
                <span>{t.heroPill}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-2xl">
                {t.heroTitle}
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Quick stats / pill features */}
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <div className="flex items-center gap-1.5 rounded-lg bg-stone-100/90 px-3 py-1.5 text-[11px] font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                <Code2 className="h-3.5 w-3.5 text-amber-600" />
                <span>{t.featCleanCode}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-stone-100/90 px-3 py-1.5 text-[11px] font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                <Layers className="h-3.5 w-3.5 text-orange-500" />
                <span>{t.featInPlace}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <PromptInputForm
          roughRequest={roughRequest}
          onChangeRoughRequest={setRoughRequest}
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
          endGoal={endGoal}
          onChangeEndGoal={setEndGoal}
          constraints={constraints}
          onChangeConstraints={setConstraints}
          autoDefault={autoDefault}
          onToggleAutoDefault={setAutoDefault}
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
          isLoading={isLoading}
          lang={lang}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* Clarification Step (If AI detected missing key details and requested clarification) */}
        {result?.status === 'needs_clarification' &&
          result.clarifyingQuestions &&
          result.clarifyingQuestions.length > 0 && (
            <ClarificationCard
              questions={result.clarifyingQuestions}
              onSubmitAnswers={handleClarificationSubmit}
              onApplyDefaults={handleApplyDefaults}
              isLoading={isLoading}
              lang={lang}
            />
          )}

        {/* Result Card (When ready) */}
        {result?.status === 'ready' && result.finalPrompt && (
          <PromptResultCard
            key={promptSessionId}
            result={result}
            onRevise={handleRevise}
            isRevising={isRevising}
            onTestPrompt={handleTestPrompt}
            isTesting={isTesting}
            testOutput={testOutput}
            onSavePrompt={handleSavePrompt}
            isSaved={Boolean(isCurrentSaved)}
            isPromptSaved={(text) => savedPrompts.some((item) => item.promptText === text)}
            lang={lang}
          />
        )}

        {/* Architecture & Prompt Crafting Guide Card */}
        <div className="rounded-2xl border border-stone-200/80 bg-white/60 p-5 dark:border-stone-800 dark:bg-stone-900/40">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-stone-700 dark:text-stone-300">
            <BookOpen className="h-4 w-4 text-amber-600" />
            <span>{t.pillarsTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-950/40">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">
                {t.pillar1Title}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-950/40">
              <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
                {t.pillar2Title}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-950/40">
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                {t.pillar3Title}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.pillar3Desc}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-950/40">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                {t.pillar4Title}
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.pillar4Desc}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-50/80 py-4 text-center text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.footerCopyright}</span>
          <span className="text-[11px] text-stone-400">{t.footerAudience}</span>
        </div>
      </footer>

      {/* Saved Prompts Drawer */}
      <SavedPromptsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        savedPrompts={savedPrompts}
        onSelectPrompt={handleLoadSavedItem}
        onDeletePrompt={handleDeleteSavedItem}
        onClearAll={handleClearAllSaved}
        lang={lang}
      />

      {/* Subscription Modal / Dashboard */}
      <Subscription
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        lang={lang}
        subscriberState={subscriberState}
        onUpdateSubscriberState={(newState) => {
          setSubscriberState(newState);
          if (newState.status === 'active') {
            showToast(t.statusActive, 'success');
          } else if (newState.status === 'pending_approval') {
            showToast(t.approvalSentTitle, 'success');
          }
        }}
        savedPrompts={savedPrompts}
        onLoadPrompt={(text) => {
          setResult({
            status: 'ready',
            finalPrompt: text,
            targetToolIdentified: selectedTool,
          });
          showToast(t.toastLoaded);
        }}
        onDeletePrompt={handleDeleteSavedItem}
      />
    </div>
  );
}
