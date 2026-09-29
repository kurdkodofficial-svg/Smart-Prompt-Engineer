import React from 'react';
import { X, Trash2, Copy, Check, Bookmark, Calendar } from 'lucide-react';
import { SavedPromptItem, SupportedLang } from '../types';
import { TRANSLATIONS, isRtlLang } from '../i18n/translations';

interface SavedPromptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPromptItem[];
  onSelectPrompt: (prompt: SavedPromptItem) => void;
  onDeletePrompt: (id: string) => void;
  onClearAll: () => void;
  lang: SupportedLang;
}

export const SavedPromptsDrawer: React.FC<SavedPromptsDrawerProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onSelectPrompt,
  onDeletePrompt,
  onClearAll,
  lang,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const t = TRANSLATIONS[lang];
  const isRTL = isRtlLang(lang);

  if (!isOpen) return null;

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-200"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {t.drawerTitle}
            </h3>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {savedPrompts.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {savedPrompts.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium px-2 py-1 rounded"
              >
                {t.clearAll}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-stone-400 text-center px-4">
              <Bookmark className="h-10 w-10 stroke-[1.2] mb-3 text-stone-300 dark:text-stone-700" />
              <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                {t.drawerEmpty}
              </p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                {t.drawerEmptySub}
              </p>
            </div>
          ) : (
            savedPrompts.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectPrompt(item)}
                className="group relative cursor-pointer rounded-xl border border-stone-200/80 bg-stone-50/60 p-3.5 transition hover:border-amber-400 hover:bg-amber-50/30 dark:border-stone-800 dark:bg-stone-800/40 dark:hover:border-amber-700 dark:hover:bg-amber-950/20"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="rounded-md bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    {item.targetTool}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-stone-400">
                    <Calendar className="h-3 w-3" />
                    {item.createdAt}
                  </span>
                </div>

                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 line-clamp-2 leading-snug">
                  {item.title}
                </p>

                <p className="text-[11px] text-stone-500 font-mono line-clamp-2 mt-1.5 dark:text-stone-400">
                  {item.promptText}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                    {t.openPrompt}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, item.id, item.promptText)}
                      className="rounded-md p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                      title={t.copyPrompt}
                    >
                      {copiedId === item.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePrompt(item.id);
                      }}
                      className="rounded-md p-1.5 text-stone-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/40"
                      title={t.deletePrompt}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
