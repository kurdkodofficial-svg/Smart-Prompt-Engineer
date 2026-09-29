import React, { useState } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Terminal,
  Zap,
} from 'lucide-react';
import { AI_TOOLS, getQuickTemplates } from '../data/constants';
import { QuickTemplate, SupportedLang } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface PromptInputFormProps {
  roughRequest: string;
  onChangeRoughRequest: (value: string) => void;
  selectedTool: string;
  onSelectTool: (tool: string) => void;
  endGoal: string;
  onChangeEndGoal: (value: string) => void;
  constraints: string;
  onChangeConstraints: (value: string) => void;
  autoDefault: boolean;
  onToggleAutoDefault: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  lang: SupportedLang;
  onSelectTemplate: (template: QuickTemplate) => void;
}

export const PromptInputForm: React.FC<PromptInputFormProps> = ({
  roughRequest,
  onChangeRoughRequest,
  selectedTool,
  onSelectTool,
  endGoal,
  onChangeEndGoal,
  constraints,
  onChangeConstraints,
  autoDefault,
  onToggleAutoDefault,
  onSubmit,
  isLoading,
  lang,
  onSelectTemplate,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const t = TRANSLATIONS[lang];
  const templates = getQuickTemplates(lang);

  return (
    <div
      id="prompt-input-card"
      className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs transition-all dark:border-stone-800 dark:bg-stone-900/90"
    >
      {/* Quick Templates bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            {t.quickTemplatesTitle}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl)}
              className="group flex shrink-0 items-center gap-1.5 rounded-lg border border-stone-200/90 bg-stone-50/80 px-2.5 py-1.5 text-xs text-stone-700 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 dark:border-stone-800 dark:bg-stone-800/60 dark:text-stone-300 dark:hover:border-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              <span className="font-medium">{tmpl.title}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Main Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="rough-request-input"
              className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5"
            >
              <Terminal className="h-3.5 w-3.5 text-amber-600" />
              <span>{t.inputLabel}</span>
            </label>
            <span className="text-[11px] text-stone-400">
              {t.inputHint}
            </span>
          </div>

          <textarea
            id="rough-request-input"
            rows={5}
            value={roughRequest}
            onChange={(e) => onChangeRoughRequest(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full rounded-xl border border-stone-200/90 bg-stone-50/50 p-3.5 text-sm text-stone-900 leading-relaxed placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/80 dark:bg-stone-950/40 dark:text-stone-100 dark:focus:bg-stone-900 font-mono"
            required
          />
        </div>

        {/* Target Tool Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
              {t.targetToolLabel}
            </label>
            <span className="text-[11px] text-stone-400">
              {t.targetToolHint}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AI_TOOLS.map((tool) => {
              const isSelected = selectedTool === tool.name;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => onSelectTool(tool.name)}
                  className={`flex flex-col items-start rounded-xl border p-2.5 text-start transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500 text-stone-900 dark:border-amber-400 dark:bg-amber-950/30 dark:text-stone-100'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex w-full items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      {tool.badge}
                    </span>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    )}
                  </div>
                  <span className="text-xs font-bold truncate w-full">
                    {tool.name}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                    {tool.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Advanced Refinements */}
        <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 dark:border-stone-800/80 dark:bg-stone-950/40">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-600" />
              <span>{t.advancedOptions}</span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showAdvanced && (
            <div className="space-y-3 border-t border-stone-200/80 p-3.5 dark:border-stone-800/80">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.endGoalLabel}
                </label>
                <input
                  type="text"
                  value={endGoal}
                  onChange={(e) => onChangeEndGoal(e.target.value)}
                  placeholder={t.endGoalPlaceholder}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  {t.constraintsLabel}
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => onChangeConstraints(e.target.value)}
                  placeholder={t.constraintsPlaceholder}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* Smart Defaults & Submit Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          {/* Checkbox auto default */}
          <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoDefault}
              onChange={(e) => onToggleAutoDefault(e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800"
            />
            <span className="font-medium">
              {t.autoDefaultLabel}
            </span>
          </label>

          {/* Submit Button */}
          <button
            id="generate-prompt-btn"
            type="submit"
            disabled={isLoading || !roughRequest.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-amber-600/20 transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                <span>{t.generatingButton}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>{t.generateButton}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
