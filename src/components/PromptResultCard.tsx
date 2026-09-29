import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Edit3,
  Play,
  Bookmark,
  BookmarkCheck,
  Download,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Terminal,
  ShieldAlert,
  Target,
  FileText,
  History,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GeneratedPromptResult, PromptSections, SupportedLang } from '../types';
import { TRANSLATIONS, isRtlLang } from '../i18n/translations';

export interface PromptVersionItem {
  id: string;
  versionNumber: number;
  timestamp: string;
  finalPrompt: string;
  sections?: PromptSections;
  keyChoiceNote?: string;
  revisionNote?: string;
}

interface PromptResultCardProps {
  result: GeneratedPromptResult;
  onRevise: (revisionInstruction: string, activePromptText?: string) => void;
  isRevising: boolean;
  onTestPrompt: (promptText: string) => void;
  isTesting: boolean;
  testOutput: string | null;
  onSavePrompt: (promptText?: string, sections?: PromptSections) => void;
  isSaved: boolean;
  isPromptSaved?: (promptText: string) => boolean;
  lang: SupportedLang;
}

export const PromptResultCard: React.FC<PromptResultCardProps> = ({
  result,
  onRevise,
  isRevising,
  onTestPrompt,
  isTesting,
  testOutput,
  onSavePrompt,
  isSaved,
  isPromptSaved,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [activeTab, setActiveTab] = useState<'prompt' | 'sections' | 'test'>('prompt');

  // History state for single-session tracking of revisions
  const [history, setHistory] = useState<PromptVersionItem[]>(() => {
    if (result.finalPrompt) {
      return [
        {
          id: `v-1-${Date.now()}`,
          versionNumber: 1,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          finalPrompt: result.finalPrompt,
          sections: result.sections,
          keyChoiceNote: result.keyChoiceNote,
          revisionNote: 'Original Prompt',
        },
      ];
    }
    return [];
  });

  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(0);

  const t = TRANSLATIONS[lang];
  const isRTL = isRtlLang(lang);

  // Sync incoming revisions into history
  useEffect(() => {
    if (!result.finalPrompt) return;

    setHistory((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: `v-1-${Date.now()}`,
            versionNumber: 1,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            finalPrompt: result.finalPrompt!,
            sections: result.sections,
            keyChoiceNote: result.keyChoiceNote,
            revisionNote: 'Original Prompt',
          },
        ];
      }

      // Check if this finalPrompt is already the latest in history
      const latest = prev[prev.length - 1];
      if (latest.finalPrompt === result.finalPrompt) {
        return prev;
      }

      // Append new version
      const nextVerNum = prev.length + 1;
      const newVersion: PromptVersionItem = {
        id: `v-${nextVerNum}-${Date.now()}`,
        versionNumber: nextVerNum,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        finalPrompt: result.finalPrompt!,
        sections: result.sections,
        keyChoiceNote: result.keyChoiceNote,
        revisionNote: result.changesAppliedSummary || `Revision ${nextVerNum - 1}`,
      };

      return [...prev, newVersion];
    });
  }, [result.finalPrompt, result.sections, result.keyChoiceNote, result.changesAppliedSummary]);

  // When a new version is added, auto-select the latest revision
  useEffect(() => {
    if (history.length > 0) {
      setActiveVersionIndex(history.length - 1);
    }
  }, [history.length]);

  // Current active version data
  const currentVersion = history[activeVersionIndex] || {
    id: 'v-fallback',
    versionNumber: 1,
    timestamp: '',
    finalPrompt: result.finalPrompt || '',
    sections: result.sections,
    keyChoiceNote: result.keyChoiceNote,
    revisionNote: 'Original',
  };

  const activePromptText = currentVersion.finalPrompt || result.finalPrompt || '';
  const activeSections = currentVersion.sections || result.sections;
  const activeKeyChoice = currentVersion.keyChoiceNote || result.keyChoiceNote;

  // Determine saved state for active version
  const isCurrentlySaved = isPromptSaved ? isPromptSaved(activePromptText) : isSaved;

  // Web Clipboard API implementation with immediate feedback checkmark
  const handleCopy = async () => {
    if (!activePromptText) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(activePromptText);
      } else {
        // Fallback for restricted contexts
        const textarea = document.createElement('textarea');
        textarea.value = activePromptText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn('Clipboard API write failed, trying fallback execCommand', err);
      try {
        const textarea = document.createElement('textarea');
        textarea.value = activePromptText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch (fallbackErr) {
        console.error('All clipboard operations failed', fallbackErr);
      }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activePromptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engineered-prompt-v${currentVersion.versionNumber}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionText.trim()) return;
    onRevise(revisionText.trim(), activePromptText);
    setRevisionText('');
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      id="prompt-result-card"
      className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition-all dark:border-stone-800 dark:bg-stone-900"
    >
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 bg-stone-50/70 px-5 py-3.5 dark:border-stone-800/80 dark:bg-stone-950/40">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {t.resultTitle}
              </h2>
              {history.length > 1 && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  v{currentVersion.versionNumber} of {history.length}
                </span>
              )}
            </div>
            {result.targetToolIdentified && (
              <span className="text-xs text-stone-500 dark:text-stone-400">
                <strong className="text-amber-700 dark:text-amber-400">
                  {result.targetToolIdentified}
                </strong>
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Favorite button */}
          <button
            id="save-favorite-btn"
            type="button"
            onClick={() => onSavePrompt(activePromptText, activeSections)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              isCurrentlySaved
                ? 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
            }`}
            title={isCurrentlySaved ? t.savedInArchive : t.saveToArchive}
          >
            {isCurrentlySaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 text-amber-600" />
                <span className="hidden sm:inline">{t.savedInArchive}</span>
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">{t.saveToArchive}</span>
              </>
            )}
          </button>

          {/* Download Markdown */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 cursor-pointer"
            title={t.downloadMd}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">.md</span>
          </button>

          {/* Primary Copy to Clipboard Button with immediate checkmark feedback */}
          <button
            id="copy-prompt-btn"
            type="button"
            onClick={handleCopy}
            title={lang === 'en' ? 'Copy to Clipboard' : t.copyPrompt}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white animate-in zoom-in-75 duration-150" />
                <span>{lang === 'en' ? 'Copied to Clipboard!' : t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{lang === 'en' ? 'Copy to Clipboard' : t.copyPrompt}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Session Revision History Toolbar (Allows toggling between different revision states) */}
      {history.length > 0 && (
        <div className="border-b border-stone-200/70 bg-stone-100/70 px-5 py-2.5 dark:border-stone-800/70 dark:bg-stone-950/60">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
                <History className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Revision History</span>
              </div>
              <span className="rounded-md bg-stone-200/80 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                {history.length} {history.length === 1 ? 'state' : 'revisions'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Stepper buttons */}
              {history.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveVersionIndex((idx) => Math.max(0, idx - 1))}
                    disabled={activeVersionIndex === 0}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-50 disabled:opacity-30 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 cursor-pointer disabled:cursor-not-allowed"
                    title="Previous revision"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>

                  <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 px-1 min-w-[50px] text-center">
                    v{currentVersion.versionNumber} / {history.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveVersionIndex((idx) => Math.min(history.length - 1, idx + 1))}
                    disabled={activeVersionIndex >= history.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-50 disabled:opacity-30 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 cursor-pointer disabled:cursor-not-allowed"
                    title="Next revision"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Version Selector Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {history.map((ver, idx) => {
                  const isActive = activeVersionIndex === idx;
                  const isLatest = idx === history.length - 1;
                  const isOriginal = idx === 0;

                  return (
                    <button
                      key={ver.id}
                      type="button"
                      onClick={() => setActiveVersionIndex(idx)}
                      className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-xs font-bold'
                          : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                      }`}
                      title={`${ver.revisionNote || `Version ${ver.versionNumber}`} (${ver.timestamp})`}
                    >
                      <span>v{ver.versionNumber}</span>
                      {isOriginal && (
                        <span className={`text-[10px] ${isActive ? 'text-amber-100' : 'text-stone-400 dark:text-stone-400'}`}>
                          (Original)
                        </span>
                      )}
                      {isLatest && history.length > 1 && (
                        <span className={`text-[10px] ${isActive ? 'text-amber-100' : 'text-stone-400 dark:text-stone-400'}`}>
                          (Latest)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Historical notice when not on latest */}
          {activeVersionIndex < history.length - 1 && (
            <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  Viewing historical state <strong>v{currentVersion.versionNumber}</strong> created at{' '}
                  <span className="font-mono text-[11px]">{currentVersion.timestamp}</span>
                  {currentVersion.revisionNote && (
                    <span className="italic"> — &ldquo;{currentVersion.revisionNote}&rdquo;</span>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVersionIndex(history.length - 1)}
                className="font-bold underline text-amber-800 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100 cursor-pointer shrink-0"
              >
                Jump to Latest (v{history.length})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200/80 px-5 text-xs font-semibold dark:border-stone-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-3 transition cursor-pointer ${
            activeTab === 'prompt'
              ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>{t.tabFullPrompt}</span>
        </button>

        {activeSections && (
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-1.5 border-b-2 py-2.5 px-3 transition cursor-pointer ${
              activeTab === 'sections'
                ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-400 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{t.tabStructure}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('test')}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-3 transition cursor-pointer ${
            activeTab === 'test'
              ? 'border-amber-600 text-amber-700 dark:border-amber-400 dark:text-amber-400 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <Play className="h-3.5 w-3.5" />
          <span>{t.tabTestPrompt}</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === 'prompt' && (
          <div>
            {/* Key choice explanation if provided */}
            {activeKeyChoice && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/50 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-300">
                <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <span className="font-bold">{t.keyEngineeringChoice}: </span>
                  <span>{activeKeyChoice}</span>
                </div>
              </div>
            )}

            {/* Prompt Code Block with In-Card Copy to Clipboard Button */}
            <div className="relative group">
              {/* Floating Copy to Clipboard button inside prompt viewer */}
              <div className="absolute top-2.5 right-2.5 z-10">
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy to Clipboard"
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'border border-stone-700/80 bg-stone-900/90 text-stone-200 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white animate-in zoom-in-75 duration-150" />
                      <span>{lang === 'en' ? 'Copied!' : t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-stone-300" />
                      <span>{lang === 'en' ? 'Copy to Clipboard' : t.copyPrompt}</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-stone-200/90 bg-stone-950 p-4 pt-11 font-mono text-xs text-stone-100 leading-relaxed whitespace-pre-wrap dark:border-stone-800 selection:bg-amber-500/30">
                {activePromptText}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'sections' && activeSections && (
          <div className="space-y-3">
            {/* Role */}
            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
              <div className="flex items-center gap-2 mb-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                <Target className="h-3.5 w-3.5" />
                <span>Role:</span>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {activeSections.role}
              </p>
            </div>

            {/* Context */}
            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
              <div className="flex items-center gap-2 mb-1 text-xs font-bold text-blue-700 dark:text-blue-400">
                <Info className="h-3.5 w-3.5" />
                <span>Context:</span>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {activeSections.context}
              </p>
            </div>

            {/* Task */}
            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
              <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>Task:</span>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
                {activeSections.task}
              </p>
            </div>

            {/* Format & Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-purple-700 dark:text-purple-400">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Format:</span>
                </div>
                <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                  {activeSections.format}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Constraints:</span>
                </div>
                <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                  {activeSections.constraints}
                </p>
              </div>
            </div>

            {/* Example if exists */}
            {activeSections.example && (
              <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 dark:border-stone-800 dark:bg-stone-950/40">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Example:</span>
                </div>
                <pre className="font-mono text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap">
                  {activeSections.example}
                </pre>
              </div>
            )}

            {/* Success Criteria */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <Check className="h-3.5 w-3.5" />
                <span>Success Criteria:</span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                {activeSections.successCriteria}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-stone-50 p-3.5 dark:bg-stone-950/50">
              <div>
                <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  {t.tabTestPrompt}
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {t.testNotice}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onTestPrompt(activePromptText)}
                disabled={isTesting || !activePromptText}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
              >
                {isTesting ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                    <span>{t.runningTest}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{t.runTestButton}</span>
                  </>
                )}
              </button>
            </div>

            {testOutput ? (
              <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 dark:border-stone-800 dark:bg-stone-950/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 block">
                  {t.testOutputTitle}
                </span>
                <div className="text-xs leading-relaxed text-stone-800 dark:text-stone-200 prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{testOutput}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-stone-400">
                <Play className="h-8 w-8 stroke-[1.5] mb-2 opacity-60" />
                <p className="text-xs">
                  {t.testNotice}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Direct Revision Section (Mandatory requirement: Edit directly without rewriting from scratch) */}
        <div className="mt-5 border-t border-stone-200/80 pt-4 dark:border-stone-800/80">
          <form onSubmit={handleRevisionSubmit} className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="revision-input"
                className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5"
              >
                <Edit3 className="h-3.5 w-3.5 text-amber-600" />
                <span>{t.reviseLabel}</span>
              </label>
              {history.length > 1 && (
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Revising from <strong>v{currentVersion.versionNumber}</strong>
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <input
                id="revision-input"
                type="text"
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder={t.revisePlaceholder}
                className="flex-1 rounded-xl border border-stone-200 bg-stone-50/70 px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />

              <button
                type="submit"
                disabled={isRevising || !revisionText.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                {isRevising ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                    <span>{t.revisingButton}</span>
                  </>
                ) : (
                  <>
                    <span>{t.reviseButton}</span>
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
