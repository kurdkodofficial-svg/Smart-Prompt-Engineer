import React, { useState, useRef } from 'react';
import {
  CreditCard,
  Check,
  Copy,
  UploadCloud,
  FileImage,
  X,
  Send,
  MessageCircle,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Database,
  Search,
  Download,
  Trash2,
  Share2,
  Zap,
} from 'lucide-react';
import { SupportedLang, SubscriberState, SavedPromptItem } from '../types';
import { TRANSLATIONS, isRtlLang } from '../i18n/translations';

interface SubscriptionProps {
  lang: SupportedLang;
  isOpen: boolean;
  onClose: () => void;
  subscriberState: SubscriberState;
  onUpdateSubscriberState: (newState: SubscriberState) => void;
  savedPrompts: SavedPromptItem[];
  onLoadPrompt: (promptText: string) => void;
  onDeletePrompt: (id: string) => void;
}

export const Subscription: React.FC<SubscriptionProps> = ({
  lang,
  isOpen,
  onClose,
  subscriberState,
  onUpdateSubscriberState,
  savedPrompts,
  onLoadPrompt,
  onDeletePrompt,
}) => {
  const t = TRANSLATIONS[lang];
  const isRTL = isRtlLang(lang);

  // Form local state
  const [name, setName] = useState(subscriberState.subscriberName || '');
  const [phone, setPhone] = useState(subscriberState.subscriberPhone || '');
  const [paymentMethod, setPaymentMethod] = useState<'fastpay' | 'fib'>(
    subscriberState.paymentMethod || 'fastpay'
  );
  const [receiptPreview, setReceiptPreview] = useState<string | null>(
    subscriberState.receiptImage || null
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const ACCOUNT_PHONE = '+9647504909260';
  const RAW_PHONE = '9647504909260';
  const REQUIRED_NOTE = 'ئەو پارە هی خزمەتگوزاری وێبە';

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptPreview) {
      alert(lang === 'ar' ? 'يرجى إرفاق صورة وصل الدفع' : lang.startsWith('ku') ? 'تکایە وێنەی پسوولەی پارەدان هاوپێچ بکە' : 'Please attach the payment receipt image');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const now = new Date().toISOString();
      const updated: SubscriberState = {
        ...subscriberState,
        status: 'pending_approval',
        subscriberName: name || 'User',
        subscriberPhone: phone || ACCOUNT_PHONE,
        paymentMethod,
        receiptImage: receiptPreview,
        submittedAt: now,
        note: REQUIRED_NOTE,
      };
      onUpdateSubscriberState(updated);
    }, 600);
  };

  // Simulate instant admin approval for demo / test flow
  const handleApproveSubscription = () => {
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 30); // 30 Days (1 Month)

    const updated: SubscriberState = {
      isSubscribed: true,
      status: 'active',
      planName: 'Monthly 7,500 IQD Plan',
      priceIQD: 7500,
      subscriberName: name || 'Subscriber',
      subscriberPhone: phone || ACCOUNT_PHONE,
      paymentMethod,
      receiptImage: receiptPreview,
      submittedAt: subscriberState.submittedAt || now.toISOString(),
      approvedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      note: REQUIRED_NOTE,
    };
    onUpdateSubscriberState(updated);
  };

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `سڵاو، پسوولەی پارەدانی بەشداری مانگانەم (٧،٥٠٠ دینار) هاوپێچ کردووە بۆ خزمەتگوزاری وێب:\n• ناوی بەشداربوو: ${name || 'بەشداربوو'}\n• ژمارەی مۆبایل: ${phone || 'نادیار'}\n• ڕێگای پارەدان: ${paymentMethod.toUpperCase()}\n• تێبینیی پسوولە: ${REQUIRED_NOTE}\nتکایە ئەژمارەکەم ئەپروڤ بکەن بۆ ماوەی یەک مانگ.`
  );
  const whatsappUrl = `https://wa.me/${RAW_PHONE}?text=${whatsappMessage}`;

  // Filtered prompts for dashboard
  const filteredPrompts = savedPrompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTool = selectedToolFilter === 'all' || p.targetTool.includes(selectedToolFilter);
    return matchesSearch && matchesTool;
  });

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!subscriberState.expiresAt) return 30;
    const diff = new Date(subscriberState.expiresAt).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div
      id="subscription-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-900/60 p-4 backdrop-blur-xs transition-opacity duration-200 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="subscription-modal-panel"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 bg-stone-50/90 px-6 py-4 dark:border-stone-800 dark:bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white shadow-xs">
              <CreditCard className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                  {subscriberState.status === 'active'
                    ? t.subscriberDashboardTitle
                    : t.subscriptionPlan}
                </h2>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                  {t.subscriptionPrice}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.monthlyPlanSubtitle}
              </p>
            </div>
          </div>

          <button
            id="close-subscription-modal-btn"
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            title={t.closeDashboard}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Subscription View / Personal Dashboard */}
          {subscriberState.status === 'active' ? (
            <div className="space-y-6">
              {/* Active Plan Card */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 p-5 shadow-xs dark:border-emerald-900/60 dark:from-emerald-950/30 dark:via-stone-900 dark:to-stone-900">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {t.statusActive}
                      </span>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {t.activePlanBadge}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
                      {subscriberState.subscriberName || 'Valued Subscriber'}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {t.validUntil}:{' '}
                      <span className="font-semibold">
                        {subscriberState.expiresAt
                          ? new Date(subscriberState.expiresAt).toLocaleDateString()
                          : '30 days'}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-emerald-200 bg-white/80 px-4 py-2 text-center shadow-2xs dark:border-emerald-900/40 dark:bg-stone-900/80">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {calculateDaysRemaining()}
                      </div>
                      <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                        {t.daysRemainingText}
                      </div>
                    </div>

                    <button
                      id="renew-plan-btn"
                      type="button"
                      onClick={() =>
                        onUpdateSubscriberState({ ...subscriberState, status: 'inactive' })
                      }
                      className="rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                    >
                      {t.paymentDetailsTitle}
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Prompt Storage / Dashboard */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold flex items-center gap-2">
                      <Database className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span>{t.managePromptsTitle}</span>
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        {savedPrompts.length}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {t.featureStorage}
                    </p>
                  </div>

                  {/* Search and filter controls */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 rtl:right-3 rtl:left-auto" />
                      <input
                        id="dashboard-search-prompts"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPromptsPlaceholder}
                        className="h-9 w-44 sm:w-56 rounded-lg border border-stone-200 bg-stone-50 pl-8 pr-3 text-xs focus:border-amber-500 focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200 rtl:pr-8 rtl:pl-3"
                      />
                    </div>

                    {savedPrompts.length > 0 && (
                      <button
                        id="export-prompts-btn"
                        type="button"
                        onClick={() => {
                          const dataStr =
                            'data:text/json;charset=utf-8,' +
                            encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
                          const dl = document.createElement('a');
                          dl.setAttribute('href', dataStr);
                          dl.setAttribute(
                            'download',
                            `smart_prompts_${new Date().toISOString().slice(0, 10)}.json`
                          );
                          dl.click();
                        }}
                        className="flex h-9 items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-200"
                        title={t.exportAllPrompts}
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">{t.exportAllPrompts}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Stored Prompts List */}
                {filteredPrompts.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-stone-200 p-8 text-center dark:border-stone-800">
                    <Database className="mx-auto h-8 w-8 text-stone-300 dark:text-stone-700" />
                    <p className="mt-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                      {searchQuery ? 'No prompts matching search query' : t.drawerEmpty}
                    </p>
                    <p className="mt-1 text-[11px] text-stone-400 dark:text-stone-500">
                      {t.drawerEmptySub}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredPrompts.map((item) => (
                      <div
                        key={item.id}
                        id={`dashboard-prompt-${item.id}`}
                        className="group relative flex flex-col justify-between rounded-xl border border-stone-200 bg-stone-50/70 p-4 transition-all hover:border-amber-400 hover:bg-white dark:border-stone-800 dark:bg-stone-950/60 dark:hover:border-amber-600 dark:hover:bg-stone-900"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                              {item.targetTool}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {item.createdAt}
                            </span>
                          </div>
                          <h4 className="mt-2 text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 line-clamp-3 font-mono">
                            {item.promptText}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-stone-200/60 pt-3 dark:border-stone-800/60">
                          <button
                            id={`load-prompt-${item.id}`}
                            type="button"
                            onClick={() => {
                              onLoadPrompt(item.promptText);
                              onClose();
                            }}
                            className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                          >
                            <span>{t.openPrompt}</span>
                            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              id={`copy-prompt-btn-${item.id}`}
                              type="button"
                              onClick={() => copyToClipboard(item.promptText, `prompt-${item.id}`)}
                              className="rounded-md p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                              title={t.copyPrompt}
                            >
                              {copiedField === `prompt-${item.id}` ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <button
                              id={`delete-prompt-btn-${item.id}`}
                              type="button"
                              onClick={() => onDeletePrompt(item.id)}
                              className="rounded-md p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                              title={t.deletePrompt}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Non-Subscribed / Pending Flow */
            <div className="space-y-6">
              {/* Pending Approval Banner */}
              {subscriberState.status === 'pending_approval' && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50/90 p-5 dark:border-amber-800/80 dark:bg-amber-950/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                        <Clock className="h-5 w-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                          {t.approvalSentTitle}
                        </h4>
                        <p className="mt-1 text-xs text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
                          {t.approvalSentDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        id="pending-whatsapp-link"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{t.openWhatsAppButton}</span>
                      </a>

                      <button
                        id="demo-approve-btn"
                        type="button"
                        onClick={handleApproveSubscription}
                        className="rounded-xl border border-amber-400 bg-amber-100 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-900/60 dark:text-amber-200"
                        title="Simulate WhatsApp Approval"
                      >
                        {t.simulatedApprovalBtn}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Plan Features & Pricing Overview */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400 mb-2">
                    <Database className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {t.featureStorage}
                  </h4>
                  <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                    Personal dashboard to save, organize, tag and export all prompts.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-400 mb-2">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {t.featureUnlimited}
                  </h4>
                  <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                    Precision engineering for Claude 3.7 Sonnet, Cursor, ChatGPT, Midjourney.
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/60">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 mb-2">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {t.featureRevisions}
                  </h4>
                  <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                    Fast in-place revision loop and live Gemini 3.8 test execution.
                  </p>
                </div>
              </div>

              {/* Payment Instructions Section */}
              <div className="rounded-2xl border border-stone-200/90 bg-stone-50/90 p-5 dark:border-stone-800 dark:bg-stone-950/80 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-3 dark:border-stone-800/60">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-sm font-bold tracking-tight">
                      {t.paymentDetailsTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                    7,500 IQD / مانگانە ٧،٥٠٠ دینار
                  </span>
                </div>

                {/* FastPay & FIB Account Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* FastPay Card */}
                  <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600 text-[10px] font-black text-white">
                          FP
                        </span>
                        <span className="text-xs font-bold">FastPay (فاستپەی)</span>
                      </div>
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                        FastPay Wallet
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-stone-50 p-2 border border-stone-100 dark:bg-stone-950 dark:border-stone-800">
                      <span className="font-mono text-sm font-bold tracking-wider text-stone-800 dark:text-stone-200">
                        {ACCOUNT_PHONE}
                      </span>
                      <button
                        id="copy-fastpay-phone-btn"
                        type="button"
                        onClick={() => copyToClipboard(ACCOUNT_PHONE, 'fastpay')}
                        className="flex items-center gap-1 rounded-md bg-stone-200/70 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-300"
                        title={t.copyNumber}
                      >
                        {copiedField === 'fastpay' ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedField === 'fastpay' ? t.copiedNumber : t.copyNumber}</span>
                      </button>
                    </div>
                  </div>

                  {/* FIB Card */}
                  <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[10px] font-black text-white">
                          FIB
                        </span>
                        <span className="text-xs font-bold">FIB (First Iraqi Bank)</span>
                      </div>
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                        بانکی نێودەوڵەتی یەکەم
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-stone-50 p-2 border border-stone-100 dark:bg-stone-950 dark:border-stone-800">
                      <span className="font-mono text-sm font-bold tracking-wider text-stone-800 dark:text-stone-200">
                        {ACCOUNT_PHONE}
                      </span>
                      <button
                        id="copy-fib-phone-btn"
                        type="button"
                        onClick={() => copyToClipboard(ACCOUNT_PHONE, 'fib')}
                        className="flex items-center gap-1 rounded-md bg-stone-200/70 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-300"
                        title={t.copyNumber}
                      >
                        {copiedField === 'fib' ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span>{copiedField === 'fib' ? t.copiedNumber : t.copyNumber}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mandatory Transfer Note / Description Callout */}
                <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 dark:border-amber-900/60 dark:bg-amber-950/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        {t.paymentNoteRuleTitle}
                      </div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                        &quot;{REQUIRED_NOTE}&quot;
                      </div>
                    </div>

                    <button
                      id="copy-mandatory-note-btn"
                      type="button"
                      onClick={() => copyToClipboard(REQUIRED_NOTE, 'note')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-amber-600"
                    >
                      {copiedField === 'note' ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedField === 'note' ? t.copiedNote : t.copyNote}</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Instructions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                        {t.whatsappSubmitTitle} ({ACCOUNT_PHONE})
                      </h4>
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-snug">
                        {t.whatsappSubmitDesc}
                      </p>
                    </div>
                  </div>

                  <a
                    id="direct-whatsapp-btn"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 whitespace-nowrap"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.openWhatsAppButton}</span>
                  </a>
                </div>
              </div>

              {/* Receipt Image Upload & Submission Form */}
              <form
                onSubmit={handleSubmitReceipt}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>{t.attachReceiptTitle}</span>
                  </h3>
                  <span className="text-[11px] text-stone-500">FastPay / FIB Receipt</span>
                </div>

                {/* Inputs: Name, Phone, Payment Channel */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="subscriber-name-input"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1"
                    >
                      {t.subscriberNameInput}
                    </label>
                    <input
                      id="subscriber-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Heja Ahmed"
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscriber-phone-input"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1"
                    >
                      {t.subscriberPhoneInput}
                    </label>
                    <input
                      id="subscriber-phone-input"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0750 000 0000"
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="payment-method-select"
                      className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1"
                    >
                      {t.paymentMethodInput}
                    </label>
                    <select
                      id="payment-method-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'fastpay' | 'fib')}
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs focus:border-amber-500 focus:bg-white focus:outline-none dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
                    >
                      <option value="fastpay">FastPay (فاستپەی)</option>
                      <option value="fib">FIB (First Iraqi Bank)</option>
                    </select>
                  </div>
                </div>

                {/* Drag & Drop File Upload Field */}
                <div>
                  <input
                    ref={fileInputRef}
                    id="receipt-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {receiptPreview ? (
                    <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
                          <FileImage className="h-4 w-4 text-emerald-600" />
                          <span>Receipt Attached</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setReceiptPreview(null)}
                          className="rounded p-1 text-stone-400 hover:bg-stone-200 hover:text-red-600 dark:hover:bg-stone-800"
                          title="Remove receipt"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-center max-h-56 overflow-hidden rounded-lg bg-stone-900/10">
                        <img
                          src={receiptPreview}
                          alt="Receipt Preview"
                          className="max-h-56 object-contain rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 p-6 text-center cursor-pointer transition hover:border-amber-400 hover:bg-amber-50/20 dark:border-stone-700 dark:bg-stone-950/40 dark:hover:border-amber-500"
                    >
                      <UploadCloud className="h-8 w-8 text-amber-500 mb-2" />
                      <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {t.attachReceiptHint}
                      </p>
                      <p className="mt-1 text-[11px] text-stone-400">
                        PNG, JPG, JPEG or Screenshot up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions: Submit receipt + WhatsApp + Demo Simulation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      id="submit-receipt-btn"
                      type="submit"
                      disabled={isSubmitting || !receiptPreview}
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-amber-600 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{t.submittingApproval}</span>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4" />
                          <span>{t.requestApprovalButton}</span>
                        </>
                      )}
                    </button>

                    <a
                      id="form-whatsapp-btn"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      <span>{t.openWhatsAppButton}</span>
                    </a>
                  </div>

                  {/* Fast admin demo trigger to immediately activate 1 month */}
                  <button
                    id="quick-demo-approve-btn"
                    type="button"
                    onClick={handleApproveSubscription}
                    className="text-[11px] font-medium text-stone-400 underline decoration-dashed hover:text-amber-600 dark:hover:text-amber-400"
                    title="Simulate immediate admin approval to explore the Subscriber Dashboard"
                  >
                    {t.simulatedApprovalBtn}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
