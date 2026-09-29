import { SupportedLang, KurdishDialect } from '../types';

export interface TranslationSchema {
  // Brand & Header
  appName: string;
  tagline: string;
  badge: string;
  savedPrompts: string;
  archive: string;
  modelEngine: string;

  // Language Bar & Selector
  primaryLang: string;
  secondaryLang: string;
  thirdLang: string;
  dialectLabel: string;
  selectDialect: string;
  english: string;
  kurdish: string;
  arabic: string;
  sorani: string;
  badini: string;
  kurmanji: string;
  hawrami: string;

  // Hero
  heroPill: string;
  heroTitle: string;
  heroSubtitle: string;
  featCleanCode: string;
  featInPlace: string;

  // Templates
  quickTemplatesTitle: string;

  // Input Form
  inputLabel: string;
  inputHint: string;
  inputPlaceholder: string;
  targetToolLabel: string;
  targetToolHint: string;
  toolSelectPlaceholder: string;
  autoDefaultLabel: string;
  autoDefaultHint: string;
  advancedOptions: string;
  endGoalLabel: string;
  endGoalPlaceholder: string;
  constraintsLabel: string;
  constraintsPlaceholder: string;
  generateButton: string;
  generatingButton: string;

  // Clarification Step
  clarificationTitle: string;
  clarificationSubtitle: string;
  applyDefaultsNow: string;
  useDefaultButton: string;
  customAnswerPlaceholder: string;
  finalizeWithAnswers: string;

  // Result Card
  resultTitle: string;
  readyBadge: string;
  tabFullPrompt: string;
  tabStructure: string;
  tabTestPrompt: string;
  copyPrompt: string;
  copied: string;
  saveToArchive: string;
  savedInArchive: string;
  downloadMd: string;
  keyEngineeringChoice: string;
  reviseLabel: string;
  revisePlaceholder: string;
  reviseButton: string;
  revisingButton: string;
  runTestButton: string;
  runningTest: string;
  testOutputTitle: string;
  testNotice: string;

  // Structural Pillars
  pillarsTitle: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;

  // Saved Drawer
  drawerTitle: string;
  drawerEmpty: string;
  drawerEmptySub: string;
  clearAll: string;
  confirmClearAll: string;
  openPrompt: string;
  deletePrompt: string;

  // Toasts
  toastGenerated: string;
  toastClarified: string;
  toastRevised: string;
  toastSaved: string;
  toastUnsaved: string;
  toastCopied: string;
  toastLoaded: string;

  // Footer
  footerCopyright: string;
  footerAudience: string;

  // Subscription & Dashboard
  subscriptionPlan: string;
  subscriptionPrice: string;
  monthlyPlanTitle: string;
  monthlyPlanSubtitle: string;
  subscriberDashboardTitle: string;
  featureStorage: string;
  featureUnlimited: string;
  featureSupport: string;
  featureRevisions: string;
  paymentDetailsTitle: string;
  fastPayFIBTitle: string;
  accountNumberText: string;
  copyNumber: string;
  copiedNumber: string;
  paymentNoteRuleTitle: string;
  paymentNoteRuleBody: string;
  copyNote: string;
  copiedNote: string;
  whatsappSubmitTitle: string;
  whatsappSubmitDesc: string;
  openWhatsAppButton: string;
  attachReceiptTitle: string;
  attachReceiptHint: string;
  subscriberNameInput: string;
  subscriberPhoneInput: string;
  paymentMethodInput: string;
  requestApprovalButton: string;
  submittingApproval: string;
  approvalSentTitle: string;
  approvalSentDesc: string;
  statusPendingApproval: string;
  statusActive: string;
  statusInactive: string;
  activePlanBadge: string;
  validUntil: string;
  daysRemainingText: string;
  simulatedApprovalBtn: string;
  managePromptsTitle: string;
  searchPromptsPlaceholder: string;
  filterAllTools: string;
  exportAllPrompts: string;
  openDashboard: string;
  closeDashboard: string;
}

export const TRANSLATIONS: Record<SupportedLang, TranslationSchema> = {
  // 1. PRIMARY: English
  en: {
    appName: 'Smart Prompt Engineer',
    tagline: 'Turn casual ideas into elite, production-grade AI prompts',
    badge: 'Code & AI Specialist',
    savedPrompts: 'Saved Prompts',
    archive: 'Archive',
    modelEngine: 'Gemini 3.8 Engine',

    primaryLang: 'Primary: English',
    secondaryLang: '2nd: Kurdish (All Dialects)',
    thirdLang: '3rd: Arabic',
    dialectLabel: 'Dialect',
    selectDialect: 'Select Kurdish Dialect',
    english: 'English',
    kurdish: 'Kurdî (Kurdish)',
    arabic: 'العربية (Arabic)',
    sorani: 'سۆرانی (Sorani)',
    badini: 'بادینی (Badini)',
    kurmanji: 'Kurmancî (Latin)',
    hawrami: 'هەورامی (Hawrami)',

    heroPill: 'Prompt Engineering Engine - Production-Ready Output',
    heroTitle: 'Describe what you need casually, and get an elite, tailored AI prompt.',
    heroSubtitle:
      'Formulated with Role, Context, Task, Format, Negative Constraints, and Success Criteria so two different queries never produce generic, interchangeable answers.',
    featCleanCode: 'Clean & Secure Code',
    featInPlace: 'Direct In-place Revision',

    quickTemplatesTitle: 'Quick Coding & Engineering Templates:',

    inputLabel: 'Rough Casual Request or Code Snippet to Refine:',
    inputHint: 'English, Kurdish, Arabic or code',
    inputPlaceholder:
      'e.g. "I want a Python function that downloads files and organizes them by timestamp..." or paste messy code you want to refactor...',
    targetToolLabel: 'Target AI Tool & Model:',
    targetToolHint: 'Adapts format & system instructions to model capabilities',
    toolSelectPlaceholder: 'Choose Target Tool...',
    autoDefaultLabel: 'Auto-fill missing details with smart defaults',
    autoDefaultHint: 'Generates the prompt immediately without asking clarification questions',
    advancedOptions: 'Advanced Parameters (End Goal & Constraints)',
    endGoalLabel: 'End Goal (Who uses this, why it matters):',
    endGoalPlaceholder: 'e.g., Production microservice handling 10k requests/sec, must maintain 99.9% uptime...',
    constraintsLabel: 'Explicit Constraints & Requirements:',
    constraintsPlaceholder: 'e.g., Use standard libraries only, zero external heavy deps, add comprehensive error handling...',
    generateButton: 'Engineer & Generate Prompt',
    generatingButton: 'Engineering Prompt...',

    clarificationTitle: 'Clarifying Key Details (Fast Precision Step)',
    clarificationSubtitle: 'To avoid generic output, refine these details or accept smart defaults',
    applyDefaultsNow: 'Apply Smart Defaults Now',
    useDefaultButton: 'Use Default',
    customAnswerPlaceholder: 'Or enter custom answer...',
    finalizeWithAnswers: 'Finalize Prompt with My Answers',

    resultTitle: 'Engineered Prompt Ready for Deployment',
    readyBadge: 'Production Ready',
    tabFullPrompt: 'Complete Prompt',
    tabStructure: 'Architectural Breakdown',
    tabTestPrompt: 'Test Prompt (Live AI)',
    copyPrompt: 'Copy Prompt',
    copied: 'Copied!',
    saveToArchive: 'Save to Archive',
    savedInArchive: 'Saved in Archive',
    downloadMd: 'Download .md',
    keyEngineeringChoice: 'Key Engineering Decision:',
    reviseLabel: 'Request In-place Revision to this Prompt:',
    revisePlaceholder: 'e.g. "Add strict type validation, convert to async, and include unit test fixtures..."',
    reviseButton: 'Apply Revision In-place',
    revisingButton: 'Updating Prompt...',
    runTestButton: 'Simulate Prompt with Gemini',
    runningTest: 'Running Prompt Execution...',
    testOutputTitle: 'Sample Model Response Simulation:',
    testNotice: 'Executes this engineered prompt live through Gemini 3.8 to preview how target AI assistants will answer.',

    pillarsTitle: 'The 7 Structural Pillars Enforced by This Engine:',
    pillar1Title: '1. Role & Context',
    pillar1Desc: 'Anchor domain expertise and technical background for optimal depth.',
    pillar2Title: '2. Explicit Task',
    pillar2Desc: 'Direct, unambiguous instruction stating exactly what to build.',
    pillar3Title: '3. Negative Constraints',
    pillar3Desc: 'Explicit exclusions: no clichés, no filler intro, strict boundaries.',
    pillar4Title: '4. Success Criteria',
    pillar4Desc: 'A self-check validation benchmark for the target model.',

    drawerTitle: 'Saved Prompts Archive',
    drawerEmpty: 'No saved prompts yet',
    drawerEmptySub: 'Prompts you star will appear here for easy access and re-use.',
    clearAll: 'Clear All',
    confirmClearAll: 'Are you sure you want to clear all saved prompts?',
    openPrompt: 'Load Prompt',
    deletePrompt: 'Delete',

    toastGenerated: 'Prompt successfully engineered!',
    toastClarified: 'Prompt constructed with your clarifications.',
    toastRevised: 'Prompt updated in-place successfully.',
    toastSaved: 'Prompt saved to archive.',
    toastUnsaved: 'Prompt removed from archive.',
    toastCopied: 'Copied to clipboard!',
    toastLoaded: 'Saved prompt loaded.',

    footerCopyright: 'Smart Prompt Engineer © 2026 — Powered by Google Gemini 3.8',
    footerAudience: 'Built for developers, AI practitioners, and engineering teams',

    // Subscription & Dashboard
    subscriptionPlan: 'Monthly Subscription',
    subscriptionPrice: '7,500 IQD / month',
    monthlyPlanTitle: '7,500 IQD Monthly Plan',
    monthlyPlanSubtitle: 'Unlock your personal subscriber dashboard to store, organize, and engineer limitless prompts.',
    subscriberDashboardTitle: 'Subscriber Dashboard',
    featureStorage: 'Dedicated subscriber dashboard to store and manage your prompts',
    featureUnlimited: 'Production-ready prompts for Claude 3.7, Cursor, ChatGPT & Midjourney',
    featureSupport: 'Full multi-language and Kurdish dialect engine support',
    featureRevisions: 'Instant in-place prompt refinement and Gemini test execution',
    paymentDetailsTitle: 'Payment & Transfer Instructions',
    fastPayFIBTitle: 'FastPay & FIB (First Iraqi Bank)',
    accountNumberText: '+9647504909260',
    copyNumber: 'Copy Phone Number',
    copiedNumber: 'Phone Number Copied!',
    paymentNoteRuleTitle: 'Mandatory Transfer Note / Description:',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە (This payment is for web service)',
    copyNote: 'Copy Note Text',
    copiedNote: 'Note Copied!',
    whatsappSubmitTitle: 'Send Payment Receipt to WhatsApp',
    whatsappSubmitDesc: 'Send your receipt screenshot to WhatsApp at +9647504909260. Once approved by the administrator, your 1-month service will be unlocked immediately.',
    openWhatsAppButton: 'Send Receipt via WhatsApp',
    attachReceiptTitle: 'Attach Payment Receipt Image',
    attachReceiptHint: 'Click or drop payment receipt screenshot (FastPay or FIB)',
    subscriberNameInput: 'Your Name / Subscriber Identifier',
    subscriberPhoneInput: 'Your Phone Number',
    paymentMethodInput: 'Payment Channel Used',
    requestApprovalButton: 'Submit Receipt for Approval',
    submittingApproval: 'Submitting receipt...',
    approvalSentTitle: 'Receipt Submitted for Approval',
    approvalSentDesc: 'Your receipt was submitted. Please verify via WhatsApp (+9647504909260) to activate your 1-month subscription.',
    statusPendingApproval: 'Pending Approval',
    statusActive: 'Active Subscriber',
    statusInactive: 'Inactive',
    activePlanBadge: '30-Day Pro Plan',
    validUntil: 'Valid Until',
    daysRemainingText: 'Days Remaining',
    simulatedApprovalBtn: 'Admin Approve & Unlock (Test Mode)',
    managePromptsTitle: 'Saved Prompts Storage',
    searchPromptsPlaceholder: 'Search stored prompts...',
    filterAllTools: 'All AI Tools',
    exportAllPrompts: 'Export Prompts (.json)',
    openDashboard: 'Subscriber Dashboard',
    closeDashboard: 'Back to Prompt Engineer',
  },

  // 2. SECONDARY: Kurdish - Central / Sorani (سۆرانی)
  ku_ckb: {
    appName: 'ئەندازیاری فەرمانە زیرەکەکان',
    tagline: 'گۆڕینی بیرۆکە و داواکارییە ئاساییەکان بۆ فەرمانی پرۆفیشناڵ و ئامادەکراو بۆ ژیریی دەستکرد',
    badge: 'پسپۆڕی کۆد و AI',
    savedPrompts: 'فەرمانە پاشەکەوتکراوەکان',
    archive: 'ئەرشیف',
    modelEngine: 'ماتۆڕی Gemini 3.8',

    primaryLang: 'سەرەکی: ئینگلیزی',
    secondaryLang: 'دووەم: کوردی (هەموو زاراوەکان)',
    thirdLang: 'سێیەم: عەرەبی',
    dialectLabel: 'زاراوە',
    selectDialect: 'هەڵبژاردنی زاراوەی کوردی',
    english: 'English',
    kurdish: 'کوردی (سۆرانی)',
    arabic: 'العربية (عەرەبی)',
    sorani: 'سۆرانی (Sorani)',
    badini: 'بادینی (Badini)',
    kurmanji: 'Kurmancî (کرمانجی)',
    hawrami: 'هەورامی (Hawrami)',

    heroPill: 'ماتۆڕی ئەندازیاری فەرمانەکان - ئەنجامی پرۆفیشناڵ و بەهێز',
    heroTitle: 'داواکاری یا کۆدەکەت بە ئاسایی بنووسە... ئێمە فەرمانێکی تۆکمە و بێخەوشت بۆ دادەڕێژین.',
    heroSubtitle:
      'داڕێژراو بە: ڕۆڵ، دەق و پاشخان، ئەرک، فۆرمات، مەرجە قەدەغەکراوەکان، و پێوەرەکانی سەرکەوتن بۆ ڕێگریکردن لە وەڵامی گشتی و لاواز.',
    featCleanCode: 'کۆدی خاوێن و پارێزراو',
    featInPlace: 'دەستکاریکردنی ڕاستەوخۆ لە شوێنی خۆیدا',

    quickTemplatesTitle: 'داڕێژە و نموونە ئامادەکراوەکانی کۆدنووسین:',

    inputLabel: 'داواکاریی ئاسایی یان پارچە کۆدەکەت لێرە دابنێ:',
    inputHint: 'ئینگلیزی، کوردی، عەرەبی یاخود کۆد',
    inputPlaceholder:
      'نموونە: "دەمەوێت فەنکشنێکی پایسۆنم بۆ بنووسیت بۆ داگرتنی فایل و ناونانیان بەپێی کاتی دروستبوون..." یاخود کۆدێکی ئاڵۆز دابنێ تا ڕێکیبخەینەوە...',
    targetToolLabel: 'ئامراز و مۆدێلی ژیریی دەستکردی مەبەست:',
    targetToolHint: 'فۆرمات و داڕشتنەکە لەگەڵ تایبەتمەندی مۆدێلەکە دەگونجێنێت',
    toolSelectPlaceholder: 'ئامرازی مەبەست هەڵبژێرە...',
    autoDefaultLabel: 'پڕکردنەوەی کەموکوڕییەکان بە پێشنیاری خودکاری زیرەک',
    autoDefaultHint: 'ڕاستەوخۆ فەرمانەکە دروست دەکات بەبێ پرسیاری زۆر',
    advancedOptions: 'هەڵبژاردنە پێشکەوتووەکان (ئامانجی کۆتایی و بەربەستەکان)',
    endGoalLabel: 'ئامانجی کۆتایی (کێ بەکاری دەهێنێت و بۆچی گرنگە):',
    endGoalPlaceholder: 'نموونە: بەکارهێنان لە سیستمێکی ڕاستەقینەدا کە پێویستی بە خێرایی و پاراستن هەیە...',
    constraintsLabel: 'مەرج و بەربەستە ڕوونەکان:',
    constraintsPlaceholder: 'نموونە: بەبێ بەکارهێنانی کتێبخانەی دەرەکی، دەبێت هەڵەکان بەتەواوی بپشکنێت...',
    generateButton: 'ئەندازیاریکردن و دروستکردنی فەرمان',
    generatingButton: 'خەریکی ئەندازیاریکردنی فەرمانەکەیە...',

    clarificationTitle: 'ڕوونکردنەوەی وردەکارییە سەرەکییەکان (هەنگاوێکی خێرا بۆ ووردی)',
    clarificationSubtitle: 'بۆ ئەوەی وەڵامی سەرپێیی وەرنەگریت، ئەم خاڵانە دەستنیشان بکە یان پێشنیارە خودکارەکان پەسەند بکە',
    applyDefaultsNow: 'پەسەندکردنی پێشنیارە خودکارەکان یەکسەر',
    useDefaultButton: 'بەکارهێنانی پێشنیار',
    customAnswerPlaceholder: 'یان وەڵامی تایبەتی خۆت بنووسە...',
    finalizeWithAnswers: 'تەواوکردنی فەرمان بە وەڵامەکانی من',

    resultTitle: 'فەرمانی ئامادەکراو بۆ بەکارهێنان و کۆپیکردن',
    readyBadge: 'ئامادەی بەکارهێنانە',
    tabFullPrompt: 'فەرمانی تەواو',
    tabStructure: 'هەڵوەشاندنەوەی پێکهاتە',
    tabTestPrompt: 'تاقیکردنەوەی زیندوو (AI Test)',
    copyPrompt: 'کۆپیکردنی فەرمان',
    copied: 'کۆپی کرا!',
    saveToArchive: 'پاشەکەوتکردن لە ئەرشیف',
    savedInArchive: 'لە ئەرشیف پارێزراوە',
    downloadMd: 'داگرتن (.md)',
    keyEngineeringChoice: 'بڕیاری ئەندازیاریی سەرەکی لەم فەرمانەدا:',
    reviseLabel: 'داوای دەستکاریکردنی ڕاستەوخۆ بکە لەم فەرمانەدا:',
    revisePlaceholder: 'نموونە: "بیکە بە تایپ‌سکریپت، و شیکردنەوەی هەڵەکان و یۆنیت تێستی بۆ زیاد بکە..."',
    reviseButton: 'دەستکاریکردن لە شوێنی خۆیدا',
    revisingButton: 'خەریکی نوێکردنەوەیە...',
    runTestButton: 'تاقیکردنەوەی فەرمانەکە لەگەڵ Gemini',
    runningTest: 'خەریکی جێبەجێکردنی فەرمانەکەیە...',
    testOutputTitle: 'شێوازی وەڵامدانەوەی نموونەیی مۆدێلەکە:',
    testNotice: 'ئەم فەرمانە لە ڕێگەی Gemini 3.8 تاقی دەکرێتەوە تا ببینی چۆن وەڵامی دەداتەوە.',

    pillarsTitle: '٧ کۆڵەکەی سەرەکی ئەندازیاری فەرمان لەم ماتۆڕەدا:',
    pillar1Title: '١. ڕۆڵ و پاشخان',
    pillar1Desc: 'دیاریکردنی پسپۆڕی و باکگراوند بۆ قوڵایی تەکنیکی.',
    pillar2Title: '٢. ئەرکی دەستنیشانکراو',
    pillar2Desc: 'ڕێنمایی ڕوون و بێ دوودڵی بۆ ئەوەی چی دروست بکرێت.',
    pillar3Title: '٣. بەربەستە نەرێنییەکان',
    pillar3Desc: 'دیاریکردنی قەدەغەکراوەکان: قسەی زیادە و ناسەلامەت مەهێنە.',
    pillar4Title: '٤. پێوەری سەرکەوتن',
    pillar4Desc: 'پێوەرێک تا ژیری دەستکرد بتوانێت وەڵامەکەی خۆی پێ هەڵسەنگێنێت.',

    drawerTitle: 'ئەرشیفی فەرمانە پارێزراوەکان',
    drawerEmpty: 'هیچ فەرمانێکی پاشەکەوتکراو نییە',
    drawerEmptySub: 'هەر فەرمانێک ئەستێرە بکەیت لێرەدا دەمێنێتەوە بۆ دەستپێگەیشتنی خێرا.',
    clearAll: 'سڕینەوەی هەمووی',
    confirmClearAll: 'ئایا دڵنیایت دەتەوێت هەموو فەرمانە پاشەکەوتکراوەکان بسڕیتەوە؟',
    openPrompt: 'هێنانەوەی فەرمان',
    deletePrompt: 'سڕینەوە',

    toastGenerated: 'فەرمانەکە بە سەرکەوتوویی ئەندازیاری کرا!',
    toastClarified: 'فەرمانەکە بەپێی ڕوونکردنەوەکانت داڕێژرایەوە.',
    toastRevised: 'دەستکاری فەرمانەکە بە سەرکەوتوویی ئەنجامدرا.',
    toastSaved: 'فەرمانەکە لە ئەرشیفدا پاشەکەوت کرا.',
    toastUnsaved: 'فەرمانەکە لە ئەرشیف لادرا.',
    toastCopied: 'لەبەرگیرایەوە بۆ کلیپبۆرد!',
    toastLoaded: 'فەرمانی پاشەکەوتکراو بارکرا.',

    footerCopyright: 'ئەندازیاری فەرمانە زیرەکەکان © 2026 — پەرەپێدراو بە Google Gemini 3.8',
    footerAudience: 'دروستکراوە بۆ پەرەپێدەران، ئەندازیارانی کۆد، و بەکارهێنەرانی ژیری دەستکرد',

    // Subscription & Dashboard
    subscriptionPlan: 'بەشداریی مانگانە',
    subscriptionPrice: '٧،٥٠٠ دینار / مانگانە',
    monthlyPlanTitle: 'پلانی مانگانەی ٧،٥٠٠ دینار',
    monthlyPlanSubtitle: 'داشبۆردی تایبەت بە خۆت بۆ هەڵگرتن، ڕێکخستن، و ئەندازیاریکردنی پرۆمپتەکانت.',
    subscriberDashboardTitle: 'داشبۆردی بەشداربوو',
    featureStorage: 'داشبۆردی تایبەت بۆ هەڵگرتن و بەڕێوەبردنی پرۆمپتەکانت',
    featureUnlimited: 'ئەندازیاریکردنی پرۆمپتی پرۆفیشناڵ بۆ Claude، Cursor، ChatGPT و Midjourney',
    featureSupport: 'پشتگیری تەواوی هەموو زاراوەکانی کوردی و ئینگلیزی و عەرەبی',
    featureRevisions: 'دەستکاریکردنی ڕاستەوخۆ و تاقیکردنەوەی خێرای مۆدێلەکان لەگەڵ Gemini',
    paymentDetailsTitle: 'ڕێنمایی و زانیارییەکانی پارەدان',
    fastPayFIBTitle: 'فاستپەی (FastPay) یان ئێف ئای بی (FIB)',
    accountNumberText: '+9647504909260',
    copyNumber: 'کۆپیکردنی ژمارەی مۆبایل',
    copiedNumber: 'ژمارەی مۆبایل کۆپیکرا!',
    paymentNoteRuleTitle: 'تێبینی پێویست و ئیجباری لە ناو پسوولە (تێبینی / Note):',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە',
    copyNote: 'کۆپیکردنی تێبینی',
    copiedNote: 'تێبینی کۆپیکرا!',
    whatsappSubmitTitle: 'ناردنی پسوولە بۆ وەتس ئەپ (WhatsApp)',
    whatsappSubmitDesc: 'پسوولەی پارەدان بنێرن بۆ وەتس ئەپ بە هەمان ژمارە (+9647504909260). کە لەوێ ئەپروڤ کرا، یەکسەر بۆ یەک مانگ خزمەتگوزاریەکەتان بۆ دەکرێتەوە.',
    openWhatsAppButton: 'ناردنی پسوولە لە وەتس ئەپ',
    attachReceiptTitle: 'هاوپێچکردنی وێنەی پسوولەی پارەدان',
    attachReceiptHint: 'کلیک بکە یان وێنەی پسوولەی فاستپەی یان FIB لێرە دابنێ',
    subscriberNameInput: 'ناوی بەشداربوو',
    subscriberPhoneInput: 'ژمارەی مۆبایلی بەشداربوو',
    paymentMethodInput: 'شێوازی پارەدان (فاستپەی یان FIB)',
    requestApprovalButton: 'ناردنی پسوولە بۆ ئەپروڤ و پەسەندکردن',
    submittingApproval: 'ناردنی پسوولە...',
    approvalSentTitle: 'پسوولەکە تۆمارکرا و چاوەڕوانی ئەپروڤە لە وەتس ئەپ',
    approvalSentDesc: 'پسوولەکەت تۆمارکرا، تکایە لە وەتس ئەپیش (+9647504909260) بینێرە تاوەکو ئەپروڤ بکرێت و بۆ یەک مانگ چالاک بێت.',
    statusPendingApproval: 'چاوەڕوانی پەسەندکردنی وەتس ئەپ',
    statusActive: 'بەشداری چالاکە (١ مانگ)',
    statusInactive: 'بەشداری نەکراوە',
    activePlanBadge: 'پلانی مانگانەی ٣٠ ڕۆژە',
    validUntil: 'بەرواری بەسەرچوون',
    daysRemainingText: 'ڕۆژ ماوە',
    simulatedApprovalBtn: 'پەسەندکردنی بەڕێوەبەر لە وەتس ئەپ (تاقیکردنەوە)',
    managePromptsTitle: 'کۆگای پرۆمپتە پارێزراوەکانت',
    searchPromptsPlaceholder: 'گەڕان لەناو پرۆمپتەکان...',
    filterAllTools: 'هەموو مۆدێلەکان',
    exportAllPrompts: 'هەناردەکردنی پرۆمپتەکان (.json)',
    openDashboard: 'داشبۆردی بەشداربوو',
    closeDashboard: 'گەڕانەوە بۆ ئەندازیاری پرۆمپت',
  },

  // 2. SECONDARY: Kurdish - Badini / Bahdini (بادینی / بهدینی)
  ku_bad: {
    appName: 'ئەندازیارێ فەرمانێن ژیر',
    tagline: 'گوهۆڕینا هزر و داخازیێن سادە بۆ فەرمانێن ژیرییا دەستکرد یێن ب هێز و بەرهەڤ',
    badge: 'شەهرەزایێ کۆدی و AI',
    savedPrompts: 'فەرمانێن پاراستی',
    archive: 'ئەرشیف',
    modelEngine: 'ماتۆڕێ Gemini 3.8',

    primaryLang: 'سەرەکی: ئینگلیزی',
    secondaryLang: 'دووەم: کوردی (هەمی زارۆک/زاراڤە)',
    thirdLang: 'سێیەم: عەرەبی',
    dialectLabel: 'زاراڤ',
    selectDialect: 'هەلبژارتنا زاراڤێ کوردی',
    english: 'English',
    kurdish: 'کوردی (بادینی)',
    arabic: 'العربية (عەرەبی)',
    sorani: 'سۆرانی (Sorani)',
    badini: 'بادینی (Badini)',
    kurmanji: 'Kurmancî (کرمانجی)',
    hawrami: 'هەورامی (Hawrami)',

    heroPill: 'ماتۆڕێ ئەندازیارییا فەرمانان - بەرهەمێ بەرهەڤ و موکوم',
    heroTitle: 'داخازی یان کۆدێ خۆ بنڤیسە... ئەم دێ فەرمانەکا بهێز و بێ کێماسی بۆ تە دروست کەین.',
    heroSubtitle:
      'داڕشتی ب: دەستنیشانکرنا ڕۆلی، دەوربەر، ئەرک، فۆرمات، مەرجێن نەهێلانێ، و پیڤەرێن سەرکەفتنێ ژ بۆ ڕێگریکرن ل بەرسڤێن سادە.',
    featCleanCode: 'کۆدێ پاقژ و پاراستی',
    featInPlace: 'ڕاستڤەکرنا فەرمانێ ل جهێ خۆ',

    quickTemplatesTitle: 'قاڵب و نموونەیێن بەرهەڤ یێن کۆدنڤیسینێ:',

    inputLabel: 'داخازییا خۆ یا سادە یان پارچەکا کۆدی ل ڤێرە بنڤیسە:',
    inputHint: 'ئینگلیزی، کوردی، عەرەبی یان کۆد',
    inputPlaceholder:
      'نموونە: "من فەنکشنەکا پایسۆنی دڤێت بۆ داگرتنا فایلان و ناڤکرنا وان ل دویف دەمێ چێکرنێ..." یان ژی کۆدەکێ ئالۆز بینە دا ڕێکبێخین...',
    targetToolLabel: 'ئامراز و مۆدێلێ ژیرییا دەستکرد یێ مەبەست:',
    targetToolHint: 'فۆرمات و داڕشتنێ ل گەل شیانێن مۆدێلی دگونجینیت',
    toolSelectPlaceholder: 'ئامرازێ مەبەست هەلبژێرە...',
    autoDefaultLabel: 'تژیپێکرنا کێماسییان ب پێشنیارێن خودکار یێن ژیر',
    autoDefaultHint: 'ئێکسەر فەرمانێ چێدکەت بێی کو پسیارێن زێدە بکەت',
    advancedOptions: 'هەلبژارتنێن پێشکەفتی (ئارمانجا دووماهییێ و بەربەست)',
    endGoalLabel: 'ئارمانجا دووماهییێ (کێ دێ بکارئینیت و بۆچی یا گرنگە):',
    endGoalPlaceholder: 'نموونە: بکارئینان د سیستمەکێ بەرهەمدار دا کو لەزاتی و پاراستن یا گرنگە...',
    constraintsLabel: 'مەرج و بەربەستێن دیارکری:',
    constraintsPlaceholder: 'نموونە: بێی بکارئینانا کتێبخانەیێن دەرەکی، دڤێت خەلەتی بهێنە پشکنین...',
    generateButton: 'ئەندازیاریکرن و چێکرنا فەرمانێ',
    generatingButton: 'خەریکە فەرمانێ دروست دکەت...',

    clarificationTitle: 'ڕوونکرنا هویرکاریێن سەرەکی (گاڤەکا بلەز بۆ دروستیێ)',
    clarificationSubtitle: 'داکو بەرسڤەکا کێم وەرنەگری، ڤان خالان دیار بکە یان پێشنیارێن خودکار قەبوول بکە',
    applyDefaultsNow: 'قەبوولکرنا پێشنیارێن خودکار ئێکسەر',
    useDefaultButton: 'بکارئینانا پێشنیارێ',
    customAnswerPlaceholder: 'یان بەرسڤا تایبەتا خۆ بنڤیسە...',
    finalizeWithAnswers: 'تەمامکرنا فەرمانێ ب بەرسڤێن من',

    resultTitle: 'فەرمانا بەرهەڤ ژ بۆ کۆپیکرن و بکارئینانێ',
    readyBadge: 'یا بەرهەڤە بۆ بکارئینانێ',
    tabFullPrompt: 'فەرمانا تەمام',
    tabStructure: 'هەلوەشاندنا پێکهاتەی',
    tabTestPrompt: 'تاقیکرنا زندی (AI Test)',
    copyPrompt: 'کۆپیکرنا فەرمانێ',
    copied: 'هاتە کۆپیکرن!',
    saveToArchive: 'پاراستن د ئەرشیفی دا',
    savedInArchive: 'د ئەرشیفی دا هاتییە پاراستن',
    downloadMd: 'داگرتن (.md)',
    keyEngineeringChoice: 'بریارا ئەندازیارییا سەرەکی د ڤێ فەرمانێ دا:',
    reviseLabel: 'داخازییا ڕاستڤەکرنا ڕاستەوخۆ بکە د ڤێ فەرمانێ دا:',
    revisePlaceholder: 'نموونە: "بکە TypeScript، و تاقیکرنێن Unit Test بۆ زێدە بکە..."',
    reviseButton: 'ڕاستڤەکرن ل جهێ وێ',
    revisingButton: 'خەریکە نوی دکەت...',
    runTestButton: 'تاقیکرنا فەرمانێ ل گەل Gemini',
    runningTest: 'خەریکە فەرمانێ بجھدئینیت...',
    testOutputTitle: 'شێوازێ بەرسڤدانا نموونەیی یا مۆدێلی:',
    testNotice: 'ئەڤ فەرمانە د ناڤبەرا Gemini 3.8 دا دهێتە تاقیکرن دا بزانی دێ چەوا بەرسڤ هێت.',

    pillarsTitle: '٧ کۆلەکێن سەرەکی یێن ئەندازیارییا فەرمانێ د ڤی ماتۆڕی دا:',
    pillar1Title: '١. ڕۆڵ و جهـ',
    pillar1Desc: 'دەستنیشانکرنا پسپۆری و باکگراوندی ژ بۆ کویراتییا تەکنیکی.',
    pillar2Title: '٢. ئەرکێ دیارکری',
    pillar2Desc: 'ڕێنمایێن ئاشکرا و بێ گومان بۆ ئەوا دڤێت بهێتە چێکرن.',
    pillar3Title: '٣. بەربەست و نەهێلان',
    pillar3Desc: 'دیارکرنا تشتێن قەدەغە: گۆتنێن زێدە و نەپاراستی نەئینە.',
    pillar4Title: '٤. پیڤەرێ سەرکەفتنێ',
    pillar4Desc: 'پیڤەرەک کو ژیرییا دەستکرد بشێت بەرسڤا خۆ پێ بنرخینیت.',

    drawerTitle: 'ئەرشیفێ فەرمانێن پاراستی',
    drawerEmpty: 'چ فەرمان نەهاتینە پاراستن',
    drawerEmptySub: 'هەر فەرمانەکا تو ستێرک بکەی ل ڤێرە دێ مینیـت بۆ دەستگەهشتنا بلەز.',
    clearAll: 'ژێبرنا هەمییان',
    confirmClearAll: 'ما تو پشتڕاستی تە دڤێت هەمی فەرمانێن پاراستی ژێببەی؟',
    openPrompt: 'ئینانا فەرمانێ',
    deletePrompt: 'ژێبرن',

    toastGenerated: 'فەرمان ب سەرکەفتی هاتە ئەندازیاریکرن!',
    toastClarified: 'فەرمان ل دویف ڕوونکرنێن تە هاتە چێکرن.',
    toastRevised: 'ڕاستڤەکرنا فەرمانێ ل جهێ خۆ هاتە کرن.',
    toastSaved: 'فەرمان د ئەرشیفی دا هاتە پاراستن.',
    toastUnsaved: 'فەرمان ژ ئەرشیفی هاتە لادان.',
    toastCopied: 'هاتە کۆپیکرن بۆ کلیپبۆردێ!',
    toastLoaded: 'فەرمانا پاراستی هاتە بارکرن.',

    footerCopyright: 'ئەندازیارێ فەرمانێن ژیر © 2026 — ب هێزا Google Gemini 3.8',
    footerAudience: 'هاتییە دروستکرن بۆ گەشەپێدەران و بکارئینەرێن ژیرییا دەستکرد',

    // Subscription & Dashboard
    subscriptionPlan: 'پشکدارییا مەهانە',
    subscriptionPrice: '٧،٥٠٠ دینار / مەهانە',
    monthlyPlanTitle: 'پلانا مەهانە یا ٧،٥٠٠ دینار',
    monthlyPlanSubtitle: 'داشبۆردێ تایبەت ب تە بۆ پاراستن و ڕێکخستن و ئەندازیاریکرنا فەرمانان.',
    subscriberDashboardTitle: 'داشبۆردێ پشکداربووی',
    featureStorage: 'داشبۆردێ تایبەت بۆ پاراستن و برێڤەبرنا فەرمانێن تە',
    featureUnlimited: 'ئەندازیاریکرنا فەرمانێن بهێز بۆ Claude، Cursor، ChatGPT و هتد',
    featureSupport: 'پشتەڤانییا تەمام یا هەمی زاراڤێن کوردی، ئینگلیزی و عەرەبی',
    featureRevisions: 'ڕاستڤەکرنا بلەز و تاقیکرنا مۆدێلان ل گەل Gemini',
    paymentDetailsTitle: 'ڕێنمایی و پێزانینێن پارەدانی',
    fastPayFIBTitle: 'فاستپەی (FastPay) یان ئێف ئای بی (FIB)',
    accountNumberText: '+9647504909260',
    copyNumber: 'کۆپیکرنا هژمارا مۆبایلێ',
    copiedNumber: 'هژمارا مۆبایلێ هاتە کۆپیکرن!',
    paymentNoteRuleTitle: 'تێبینیا پێدڤی و فەرمی د پسوولێ دا (تێبینی / Note):',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە',
    copyNote: 'کۆپیکرنا تێبینیێ',
    copiedNote: 'تێبینی هاتە کۆپیکرن!',
    whatsappSubmitTitle: 'فرێکرنا پسوولێ بۆ وەتس ئەپێ (WhatsApp)',
    whatsappSubmitDesc: 'پسوولا پارەدانی فرێکەن بۆ وەتس ئەپێ ب هەمان ژمارە (+9647504909260). دەمێ ل وێرێ ئەپرووڤ کر، ئێکسەر بۆ ئێک مەهـ خزمەتگوزاری دێ هێتە ڤەکرن.',
    openWhatsAppButton: 'فرێکرنا پسوولێ د وەتس ئەپێ دا',
    attachReceiptTitle: 'لکاندنا وێنێ پسوولا پارەدانی',
    attachReceiptHint: 'کلیک بکە یان وێنێ پسوولا فاستپەی یان FIB ل ڤێرە دانە',
    subscriberNameInput: 'ناڤێ پشکداربووی',
    subscriberPhoneInput: 'هژمارا مۆبایلا پشکداربووی',
    paymentMethodInput: 'شێوازێ پارەدانی (فاستپەی یان FIB)',
    requestApprovalButton: 'فرێکرنا پسوولێ بۆ ئەپرووڤ و پەسەندکرنێ',
    submittingApproval: 'فرێکرنا پسوولێ...',
    approvalSentTitle: 'پسوولە هاتە تۆمارکرن و ل هیڤییا ئەپرووڤێ یە',
    approvalSentDesc: 'پسوولا تە هاتە تۆمارکرن، هیڤییە ل وەتس ئەپێ ژی فرێکەی تا ب ساناهی بۆ ئێک مەهـ بهێتە چالاککرن.',
    statusPendingApproval: 'ل هیڤییا پەسەندکرنا وەتس ئەپێ',
    statusActive: 'پشکداری یا چالاکە (١ مەهـ)',
    statusInactive: 'پشکداری نەهاتییە کرن',
    activePlanBadge: 'پلانا مەهانە یا ٣٠ ڕۆژان',
    validUntil: 'مێژوویا سەرڤەچوونێ',
    daysRemainingText: 'ڕۆژ ماینە',
    simulatedApprovalBtn: 'پەسەندکرنا بڕێڤەبەری ل وەتس ئەپێ (تاقیکرن)',
    managePromptsTitle: 'کۆگەها فەرمانێن پاراستی',
    searchPromptsPlaceholder: 'لێگەڕیان د ناڤ فەرمانان دا...',
    filterAllTools: 'هەمی مۆدێل',
    exportAllPrompts: 'هنارتنا فەرمانان (.json)',
    openDashboard: 'داشبۆردێ پشکداربووی',
    closeDashboard: 'ڤەگەڕیان بۆ ئەندازیارێ فەرمانان',
  },

  // 2. SECONDARY: Kurdish - Northern / Kurmanji (Kurdî Kurmancî - Latin script)
  ku_kmr: {
    appName: 'Endezyarê Fermanên Zîrek',
    tagline: 'Fikr û daxwazên xwe yên rojane bike fermanên hilberînî yên herî profesyonel ên AI',
    badge: 'Pisporê Kod û AI',
    savedPrompts: 'Fermanên Tomarkirî',
    archive: 'Arşîv',
    modelEngine: 'Motora Gemini 3.8',

    primaryLang: 'Serekî: Îngilîzî',
    secondaryLang: 'Duyemîn: Kurdî (Hemû zarava)',
    thirdLang: 'Sêyemîn: Erebî',
    dialectLabel: 'Zarava',
    selectDialect: 'Zaravayê Kurdî Hilbijêre',
    english: 'English',
    kurdish: 'Kurdî (Kurmancî)',
    arabic: 'العربية (Erebî)',
    sorani: 'سۆرانی (Sorani)',
    badini: 'بادینی (Badini)',
    kurmanji: 'Kurmancî (Latin)',
    hawrami: 'هەورامی (Hawrami)',

    heroPill: 'Motora Endezyariya Fermanan - Hilbera Hilberînê ya Xurt',
    heroTitle: 'Tiştê ku hewcedariya te pê heye bi awayekî hêsan binivîse, fermana herî bihêz a AI bistîne.',
    heroSubtitle:
      'Bi Rûl, Kontekst, Erx, Format, Qedexe û Pîvanên Serkeftinê hatiye pêşxistin da ku tu carî bersivên gelemperî û lawaz nestînî.',
    featCleanCode: 'Koda Paqij û Ewle',
    featInPlace: 'Sererastkirina Yekser li Cihê Xwe',

    quickTemplatesTitle: 'Şablon û Mînakên Amade yên Nivîsandina Kodê:',

    inputLabel: 'Daxwaza xwe ya xav an perçeyek kodê li vir binivîse:',
    inputHint: 'Îngilîzî, Kurdî, Erebî an kod',
    inputPlaceholder:
      'Mînak: "Ez dixwazim fonksiyonek Python ji bo daxistina pelan û binavkirina wan li gorî dema çêkirinê..." an koda tevlihev deyne da ku em sererast bikin...',
    targetToolLabel: 'Amûr û Modela AI a Armanckirî:',
    targetToolHint: 'Format û avahiyê li gorî taybetmendiyên modelê adapte dike',
    toolSelectPlaceholder: 'Amûra Armanc Hilbijêre...',
    autoDefaultLabel: 'Kêmasiyan bi pêşniyarên xweber ên zîrek tije bike',
    autoDefaultHint: 'Bêyî pirsên zêde fermanê rasterast diafirîne',
    advancedOptions: 'Vebijarkên Pêşkeftî (Armanca Dawî û Asteng)',
    endGoalLabel: 'Armanca Dawî (Kî wê bikar bîne û çima girîng e):',
    endGoalPlaceholder: 'Mînak: Bikaranîna di pergalek rastîn de ku bilezî û ewlehî girîng in...',
    constraintsLabel: 'Asteng û Mercên Eşkere:',
    constraintsPlaceholder: 'Mînak: Bê pirtûkxaneyên derve, divê xeletiyan bi temamî kontrol bike...',
    generateButton: 'Fermana Xwe Biafirîne',
    generatingButton: 'Ferman tê çêkirin...',

    clarificationTitle: 'Zelalkirina Kûrahiyên Serekî (Pêngava Lezgîn a Rastbûnê)',
    clarificationSubtitle: 'Ji bo ku encamên giştî nestînî, van xalan diyar bike an pêşniyarên xweber qebûl bike',
    applyDefaultsNow: 'Pêşniyarên Xweber Niha Bikar Bîne',
    useDefaultButton: 'Pêşniyara Xweber',
    customAnswerPlaceholder: 'An bersiva xwe ya taybet binivîse...',
    finalizeWithAnswers: 'Fermanê bi Bersivên Min Biqedîne',

    resultTitle: 'Fermana Amade ji bo Bikaranîn û Kopîkirinê',
    readyBadge: 'Amade ye',
    tabFullPrompt: 'Fermana Temam',
    tabStructure: 'Parçekirina Avahiyê',
    tabTestPrompt: 'Ceribandina Zindî (AI Test)',
    copyPrompt: 'Fermanê Kopî Bike',
    copied: 'Hat kopîkirin!',
    saveToArchive: 'Di Arşîvê de Tomar Bike',
    savedInArchive: 'Di Arşîvê de Tomarkirî ye',
    downloadMd: 'Daxistin (.md)',
    keyEngineeringChoice: 'Biryara Endezyariyê ya Serekî di vê Fermanê de:',
    reviseLabel: 'Daxwaza sererastkirina rasterast di vê fermanê de bike:',
    revisePlaceholder: 'Mînak: "Bike TypeScript, kontrolên xeletiyê û testên yekîneyê zêde bike..."',
    reviseButton: 'Li Cihê Xwe Sererast Bike',
    revisingButton: 'Tê nûkirin...',
    runTestButton: 'Fermanê bi Gemini biceribîne',
    runningTest: 'Ferman tê xebitandin...',
    testOutputTitle: 'Nimûneya Bersiva Modelê:',
    testNotice: 'Ev ferman bi riya Gemini 3.8 tê ceribandin da ku bibînî ka wê çawa bersiv bide.',

    pillarsTitle: '7 Stûnên Serekî yên Endezyariya Fermanê di vê Motorê de:',
    pillar1Title: '1. Rol û Kontekst',
    pillar1Desc: 'Zanîna pisporiyê û paşxaneyê ji bo kûrahiya teknîkî diyar dike.',
    pillar2Title: '2. Erka Eşkere',
    pillar2Desc: 'Rêbernameya zelal û rasterast bê dudilî ka çi divê were çêkirin.',
    pillar3Title: '3. Qedexe û Asteng',
    pillar3Desc: 'Diyarkirina tiştên qedexekirî: gotinên pûç û bê ewle neyîne.',
    pillar4Title: '4. Pîvana Serkeftinê',
    pillar4Desc: 'Pîvanek da ku AI bi xwe bersiva xwe kontrol bike.',

    drawerTitle: 'Arşîva Fermanên Tomarkirî',
    drawerEmpty: 'Hîç ferman nehatine tomarkirin',
    drawerEmptySub: 'Her fermana ku tu stêrk bikî dê li vir bimîne ji bo gihîştina lezgîn.',
    clearAll: 'Hemûyan Jê Bibe',
    confirmClearAll: 'Ma tu piştrast î ku dixwazî hemû fermanên tomarkirî jê bibî?',
    openPrompt: 'Fermanê Vegerîne',
    deletePrompt: 'Jê bibe',

    toastGenerated: 'Ferman bi serkeftî hate endezyarîkirin!',
    toastClarified: 'Ferman li gorî zelalkirinên te hate amadekirin.',
    toastRevised: 'Sererastkirina fermanê bi serkeftî pêk hat.',
    toastSaved: 'Ferman di arşîvê de hate tomarkirin.',
    toastUnsaved: 'Ferman ji arşîvê hate rakirin.',
    toastCopied: 'Li panoyê hate kopîkirin!',
    toastLoaded: 'Fermana tomarkirî hate barkirin.',

    footerCopyright: 'Endezyarê Fermanên Zîrek © 2026 — Bi piştgiriya Google Gemini 3.8',
    footerAudience: 'Ji bo pêşvebir, endezyarên kodê û bikarhênerên AI hatiye çêkirin',

    // Subscription & Dashboard
    subscriptionPlan: 'Beşdariya Mehane',
    subscriptionPrice: '7,500 IQD / meh',
    monthlyPlanTitle: 'Plana Mehane ya 7,500 IQD',
    monthlyPlanSubtitle: 'Dashborda xwe ya taybet veke ji bo hilanîn, rêkxistin û endezyarîkirina fermanan.',
    subscriberDashboardTitle: 'Dashborda Beşdarbûyî',
    featureStorage: 'Dashborda taybet bo hilanîn û birêvebirina fermanên te',
    featureUnlimited: 'Endezyarkirina fermanan bo Claude, Cursor, ChatGPT û yên din',
    featureSupport: 'Piştgiriya tam a hemû zaravayên Kurdî, Îngilîzî û Erebî',
    featureRevisions: 'Sererastkirina yekser û ceribandina fermanan ligel Gemini',
    paymentDetailsTitle: 'Talîmat û Agahiyên Dravdanê',
    fastPayFIBTitle: 'FastPay yan FIB (First Iraqi Bank)',
    accountNumberText: '+9647504909260',
    copyNumber: 'Hejmarê Kopî Bike',
    copiedNumber: 'Hejmara mobîlê hate kopîkirin!',
    paymentNoteRuleTitle: 'Nîşeya Pêwîst a Dravdanê (Note / تێبینی):',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە',
    copyNote: 'Nîşeyê Kopî Bike',
    copiedNote: 'Nîşe hate kopîkirin!',
    whatsappSubmitTitle: 'Şandina Wêneyê Weslê bo WhatsAppê',
    whatsappSubmitDesc: 'Wêneyê wesla dravdanê bi WhatsAppê bişînin bo heman hejmarê (+9647504909260). Piştî pejirandinê, karûbar bo 1 mehê yekser dê were vekirin.',
    openWhatsAppButton: 'Weslê bi WhatsAppê Bişîne',
    attachReceiptTitle: 'Pêvekirina Wêneyê Wesla Dravdanê',
    attachReceiptHint: 'Klîk bike yan wêneyê wesla FastPay/FIB li vir deyne',
    subscriberNameInput: 'Navê Beşdarbûyî',
    subscriberPhoneInput: 'Hejmara Mobîla Beşdarbûyî',
    paymentMethodInput: 'Rêbaza Dravdanê (FastPay yan FIB)',
    requestApprovalButton: 'Şandina Weslê bo Pejirandinê',
    submittingApproval: 'Wesil tê şandin...',
    approvalSentTitle: 'Wesil hate tomarkirin û li benda pejirandinê ye',
    approvalSentDesc: 'Wesla te hate wergirtin, ji kerema xwe li ser WhatsAppê jî (+9647504909260) bişîne da ku xizmeta 1 mehê were aktîvkirin.',
    statusPendingApproval: 'Li benda pejirandina WhatsAppê',
    statusActive: 'Beşdarî Çalak e (1 Meh)',
    statusInactive: 'Nehatiye Tomarkirin',
    activePlanBadge: 'Plana Mehane ya 30 Rojan',
    validUntil: 'Dîroka Dawîbûnê',
    daysRemainingText: 'Roj Man',
    simulatedApprovalBtn: 'Pejirandina Rêveber li WhatsAppê (Ceribandin)',
    managePromptsTitle: 'Embarkirina Fermanên Tomarkirî',
    searchPromptsPlaceholder: 'Lêgerîn di nav fermanan de...',
    filterAllTools: 'Hemû Model',
    exportAllPrompts: 'Deranîna Fermanan (.json)',
    openDashboard: 'Dashborda Beşdarbûyî',
    closeDashboard: 'Vegere Endezyarê Fermanan',
  },

  // 2. SECONDARY: Kurdish - Hawrami / Avromani (هەورامی)
  ku_hwr: {
    appName: 'ئەندازیارو فەرمانە ژیرەکا',
    tagline: 'فاڕای بیرۆکە و داواکارییە وێمانەکا پەی فەرمانە ورد و ئامادەکرییەکاو ژیری دەسکردی',
    badge: 'پسپۆڕو کۆدی و AI',
    savedPrompts: 'فەرمانە پارێزیایکۍ',
    archive: 'ئەرشیف',
    modelEngine: 'ماتۆڕو Gemini 3.8',

    primaryLang: 'سەرەکی: ئینگلیزی',
    secondaryLang: 'دووەم: کوردی (گشت شێوەزارەکۍ)',
    thirdLang: 'یەرەم: عەرەبی',
    dialectLabel: 'شێوەزار',
    selectDialect: 'هۆروچنیەی شێوەزارو کوردی',
    english: 'English',
    kurdish: 'کوردی (هەورامی)',
    arabic: 'العربية (عەرەبی)',
    sorani: 'سۆرانی (Sorani)',
    badini: 'بادینی (Badini)',
    kurmanji: 'Kurmancî (کرمانجی)',
    hawrami: 'هەورامی (Hawrami)',

    heroPill: 'ماتۆڕو ئەندازیاری فەرمانەکا - بەرهەمو بەهێز و تەمام',
    heroTitle: 'داواکاری یا کۊدەکەت بە سادەیی بنویسە... ئێمە فەرمانێوی قایم و بێ عەیبت پەی وەش کەرمۍ.',
    heroSubtitle:
      'ڕێکوزیابە: دەور، دەق، ئەرک، فۆرمات، مەرجە مەنعکرییەکۍ، و تەرازوو سەرکەوتەی پەی پێشگیری جە جوابە سەرپێییەکا.',
    featCleanCode: 'کۆدو خاوێن و پاریزیای',
    featInPlace: 'دەسکاری کەردەی یاگۍ وێشنە',

    quickTemplatesTitle: 'قاڵبۍ و نموونە ئامادەکرییەکۍ کۊدنویستەی:',

    inputLabel: 'داواکارییە وێمانەکێت یا کۊدە ڕەشنویسەکەت چێگەنە بنویسە:',
    inputHint: 'ئینگلیزی، کوردی، عەرەبی یا کۊد',
    inputPlaceholder:
      'نموونە: "فەنکشنێوی پایسۆنیم گەرەکەن پەی هۆرگێرتەی فایلا و نامێ نیایشان پی دەمەو وەشکەردەی..." یا کۊدێوی ئاڵۆز بارە تا ڕێکشبوزمۍ...',
    targetToolLabel: 'ئامراز و مۆدێلو ژیری دەسکردی ئامانجکریای:',
    targetToolHint: 'فۆرمات و داڕشتنەکەی چەنی تایبەتمەندی مۆدێلەکەی گونجنووز',
    toolSelectPlaceholder: 'ئامرازو ئامانجی هۆروچنە...',
    autoDefaultLabel: 'پڕکەردەی کەمایەسییەکا بە پێشنیازە وێکارە ژیرەکا',
    autoDefaultHint: 'ڕاسەوڕاس فەرمانەکەی وەش کەرۆ بێ پەرسیارە زیادەکا',
    advancedOptions: 'هۆروچنیە وەڵکەوتەکۍ (ئامانجو دمایینی و تەنگانەکۍ)',
    endGoalLabel: 'ئامانجو دمایینی (کۍ بەکارش مارۆ و پەی چێشی گرنگەن):',
    endGoalPlaceholder: 'نموونە: بەکارهۆردەی جە سیستمێوی گرنگەنە کە پارێزیای و خێرایی مەرجەنە...',
    constraintsLabel: 'مەرجۍ و تەنگانە ڕوونەکۍ:',
    constraintsPlaceholder: 'نموونە: بێ بەکارهۆردەی کیتابخانە دەسییەکا، گردو خەڵەتییا پوخت بکەرۆ...',
    generateButton: 'ئەندازیاریکەردەی و وەش کەردەی فەرمانی',
    generatingButton: 'خەریکەن فەرمانەکەی وەش کەرۆ...',

    clarificationTitle: 'ڕوون کەردەی ووردییا سەرەکییا (هەنگامێوە خێرا پەی ڕاستیی)',
    clarificationSubtitle: 'پەی ئانەی جوابێوی گشتی نەویەری، ئی خاڵا دیاری بکەرە یا پێشنیازە وێکارەکا قبووڵ بکەرە',
    applyDefaultsNow: 'قبووڵ کەردەی پێشنیازە وێکارەکا ڕاسەوڕاس',
    useDefaultButton: 'بەکارهۆردەی پێشنیازی',
    customAnswerPlaceholder: 'یا جوابو تایبەت بە وێت بنویسە...',
    finalizeWithAnswers: 'تەمام کەردەی فەرمانی بە جوابەکام',

    resultTitle: 'فەرمانو ئامادەکریای پەی کۊپیکەردەی و بەکارهۆردەی',
    readyBadge: 'ئامادەن پەی بەکارهۆردەی',
    tabFullPrompt: 'فەرمانو تەمام',
    tabStructure: 'هەڵوەشنای پێکهاتەی',
    tabTestPrompt: 'تاقیکەردەی زیننە (AI Test)',
    copyPrompt: 'کۊپیکەردەی فەرمانی',
    copied: 'کۊپی بی!',
    saveToArchive: 'پارێزنای جە ئەرشیفەنە',
    savedInArchive: 'جە ئەرشیفەنە پاریزیان',
    downloadMd: 'وارئاردەی (.md)',
    keyEngineeringChoice: 'بڕیارو ئەندازیاری سەرەکی ئی فەرمانەینە:',
    reviseLabel: 'داواو دەسکاری کەردەی یاگۍ وێشنە بکەرە چێگەنە:',
    revisePlaceholder: 'نموونە: "بکەرەش بە TypeScript، و جۆرو تێستەکا و فەحسەکا زیای بکەرە..."',
    reviseButton: 'دەسکاری کەردەی یاگۍ وێشنە',
    revisingButton: 'خەریکەن نۆ کەرۆوە...',
    runTestButton: 'تاقیکەردەی فەرمانەکەی چەنی Gemini',
    runningTest: 'خەریکەن فەرمانەکەی بەرۆ ڕاوە...',
    testOutputTitle: 'شێوازو جوابدایۆ نموونەییو مۆدێلەکەی:',
    testNotice: 'ئی فەرمانە جە ڕاو Gemini 3.8 تاقی کریووە تا بزانی چون جواب مدۆوە.',

    pillarsTitle: '٧ ڕکێنگێ سەرەکییێ ئەندازیاری فەرمانی چێگەنە:',
    pillar1Title: '١. دەور و دەق',
    pillar1Desc: 'دیاریکەردەی پسپۆڕی و باکگراوند پەی قوڵایی تەکنیکی.',
    pillar2Title: '٢. ئەرکو دیاریکریای',
    pillar2Desc: 'ڕێنمایی ئاشکرا و بێ دوودڵی پەی ئانەی چی وەشکریۆ.',
    pillar3Title: '٣. مەرجە مەنعکرییەکۍ',
    pillar3Desc: 'دیاریکەردەی چێشتە قەدەغەکرییاکا: واتە زیادەکا مەیاورە.',
    pillar4Title: '٤. تەرازوو سەرکەوتەی',
    pillar4Desc: 'تەرازوێ تا ژیری دەسکرد بتاوۆ جوابو وێش پێ بپێوۆ.',

    drawerTitle: 'ئەرشیفو فەرمانە پارێزیایەکا',
    drawerEmpty: 'هیچ فەرمانێوی پارێزیای نییا',
    drawerEmptySub: 'هەر فەرمانێوی ئەسارە بکەری چێگەنە مەنۆوە پەی دەسیاوای خێرا.',
    clearAll: 'پاککەردەی گشتێ',
    confirmClearAll: 'ئایا دڵنیای گشتو فەرمانە پارێزیایەکا پاک کەریۆ؟',
    openPrompt: 'ئاردەی فەرمانی',
    deletePrompt: 'پاککەردەی',

    toastGenerated: 'فەرمانەکە بە سەرکەوتوویی ئەندازیاری کریا!',
    toastClarified: 'فەرمانەکە پی ڕوونکەردەیەکات ڕێک وزیاوە.',
    toastRevised: 'دەسکاری کەردەی یاگۍ وێشنە سەرکەوت بی.',
    toastSaved: 'فەرمانەکە ئەرشیفەنە پاریزیا.',
    toastUnsaved: 'فەرمانەکە ئەرشیفەنە لابریا.',
    toastCopied: 'کۊپی بی پەی کلیپبۆردی!',
    toastLoaded: 'فەرمانو پاریزیای بار بی.',

    footerCopyright: 'ئەندازیارو فەرمانە ژیرەکا © 2026 — پەرەپێدریای بە Google Gemini 3.8',
    footerAudience: 'وەشکریای پەی گەشەپێدەران و بەکارهۆردەیێن ژیری دەسکردی',

    // Subscription & Dashboard
    subscriptionPlan: 'بەشداری مانگانە',
    subscriptionPrice: '٧،٥٠٠ دینار / مانگانە',
    monthlyPlanTitle: 'پلانو مانگانەو ٧،٥٠٠ دیناری',
    monthlyPlanSubtitle: 'داشبۆردی تایبەت بە وێت پەی پارێزنای و ڕێکوزیا و ئەندازیاری فەرمانەکا.',
    subscriberDashboardTitle: 'داشبۆردو بەشداربیەی',
    featureStorage: 'داشبۆردی تایبەت پەی پارێزنای و بەڕێوەبەرایەتی فەرمانەکات',
    featureUnlimited: 'ئەندازیاری فەرمانە قایمەکا پەی Claude، Cursor، ChatGPT و ئەوانی تر',
    featureSupport: 'پشتگیری تەمامو گشت شێوەزارەکاو کوردی و ئینگلیزی و عەرەبی',
    featureRevisions: 'دەسکاری کەردەی ڕاستەوخۆ و تاقیکەردەی خێرا چەنی Gemini',
    paymentDetailsTitle: 'ڕێنمایی و زانیارییەکاو پەرەدای',
    fastPayFIBTitle: 'فاستپەی (FastPay) یا ئێف ئای بی (FIB)',
    accountNumberText: '+9647504909260',
    copyNumber: 'کۆپیکەردەی ژمارەو مۆبایلی',
    copiedNumber: 'ژمارەو مۆبایلی کۆپی بی!',
    paymentNoteRuleTitle: 'تێبینی پێویسی و زەروری پسوولێنە (تێبینی / Note):',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە',
    copyNote: 'کۆپیکەردەی تێبینی',
    copiedNote: 'تێبینی کۆپی بی!',
    whatsappSubmitTitle: 'کیانای پسوولێ پەی وەتس ئەپی (WhatsApp)',
    whatsappSubmitDesc: 'پسوولەو پەرەدای کیانە پەی وەتس ئەپی بە هام ژمارە (+9647504909260). تا لەوێ پەسەند کریۆ و یەکسەر پەی یەک مانگی خزمەتگوزاریەکە کریۆوە.',
    openWhatsAppButton: 'کیانای پسوولێ وەتس ئەپەنە',
    attachReceiptTitle: 'هاوپێچکەردەی وێنەو پسوولەو پەرەدای',
    attachReceiptHint: 'کلیک بکەرە یا وێنەو پسوولەو فاستپەی یا FIB چێگەنە بنیە',
    subscriberNameInput: 'نامۍ بەشداربووی',
    subscriberPhoneInput: 'ژمارەو مۆبایلو بەشداربووی',
    paymentMethodInput: 'شێوازو پەرەدای (فاستپەی یا FIB)',
    requestApprovalButton: 'کیانای پسوولێ پەی پەسەندکەردەی',
    submittingApproval: 'خەریکو کیانای پسوولێنە...',
    approvalSentTitle: 'پسوولە کیانیا و چەمەڕاو پەسەندکەردەیەن وەتس ئەپەنە',
    approvalSentDesc: 'پسوولەکەت تۆمار کریا، تکاوە وەتس ئەپەنەچ (+9647504909260) بنیەرە تا ئەپرووڤ کریۆ پەی یەک مانگی.',
    statusPendingApproval: 'چەمەڕاو پەسەندکەردەو وەتس ئەپی',
    statusActive: 'بەشداری چالاکەن (١ مانگ)',
    statusInactive: 'بەشداری نەکرییا',
    activePlanBadge: 'پلانو مانگانەو ٣٠ ڕووا',
    validUntil: 'وەختو تەمام بیەی',
    daysRemainingText: 'ڕوێ مەنێنۍ',
    simulatedApprovalBtn: 'پەسەندکەردەو بەڕێوەبەری وەتس ئەپەنە (تاقیکەردەی)',
    managePromptsTitle: 'ئەمبارو فەرمانە پارێزیایەکا',
    searchPromptsPlaceholder: 'گێڵای فەرمانەکانە...',
    filterAllTools: 'گشتو مۆدێلەکانە',
    exportAllPrompts: 'هەناردە کەردەی فەرمانەکا (.json)',
    openDashboard: 'داشبۆردو بەشداربیەی',
    closeDashboard: 'ئەرەگێڵای پەی ئەندازیاری فەرمانەکا',
  },

  // 3. THIRD: Arabic (العربية)
  ar: {
    appName: 'كاتب الأوامر الذكي',
    tagline: 'تحويل الأفكار والطلبات العادية إلى أوامر برمجية احترافية ودقيقة',
    badge: 'مساعد الأكواد والذكاء الاصطناعي',
    savedPrompts: 'الأوامر المحفوظة',
    archive: 'الأرشيف',
    modelEngine: 'Gemini 3.8 Engine',

    primaryLang: 'الأولى: الإنجليزية',
    secondaryLang: 'الثانية: الكردية (بكافة لهجاتها)',
    thirdLang: 'الثالثة: العربية',
    dialectLabel: 'اللهجة',
    selectDialect: 'اختر اللهجة الكردية',
    english: 'English',
    kurdish: 'الكردية (Kurdî)',
    arabic: 'العربية',
    sorani: 'سۆرانی (سوراني)',
    badini: 'بادینی (بهديني)',
    kurmanji: 'Kurmancî (كرمانجي لاتيني)',
    hawrami: 'هەورامی (هورامي)',

    heroPill: 'مهندس الأوامر الذكي - تحويل الطلبات العادية إلى أوامر جاهزة',
    heroTitle: 'اكتب طلبك أو كودك ببساطة... وسنقوم بهندسة الأمر الأقوى للذكاء الاصطناعي',
    heroSubtitle:
      'صياغة هيكلية شاملة تتضمن: الدور، السياق، المهمة، التنسيق، الموانع الصريحة، ومعايير النجاح لمنع الأجوبة العامة أو السطحية.',
    featCleanCode: 'كود نظيف وآمن',
    featInPlace: 'تعديل مباشر في نفس المكان',

    quickTemplatesTitle: 'نماذج وأوامر برمجية جاهزة للبدء السريع:',

    inputLabel: 'طلبك العادي أو الكود المراد تحسينه (المدخلات الخام):',
    inputHint: 'عربي أو إنجليزي أو كردي أو كود',
    inputPlaceholder:
      'مثال: "أريد دالة بايثون لتحميل ملفات وتغيير أسمائها تلقائياً حسب تاريخ الإنشاء وتنسيقها..." أو الصق كوداً يحتاج إلى إعادة هيكلة...',
    targetToolLabel: 'أداة ونموذج الذكاء الاصطناعي المستهدف:',
    targetToolHint: 'يضبط الصياغة والتنسيق لتناسب نقاط قوة النموذج',
    toolSelectPlaceholder: 'اختر الأداة المستهدفة...',
    autoDefaultLabel: 'ملء التفاصيل الناقصة بمقترحات تلقائية ذكية',
    autoDefaultHint: 'ينشئ الأمر فوراً وبدقة دون التوقف لطرح أسئلة استيضاحية',
    advancedOptions: 'خيارات متقدمة (الهدف النهائي والقيود)',
    endGoalLabel: 'الهدف النهائي (من سيستخدم المخرجات ولماذا تهم):',
    endGoalPlaceholder: 'مثال: خدمة مصغرة في الإنتاج تعالج 10 آلاف طلب/ثانية وتتطلب استقراراً 99.9%...',
    constraintsLabel: 'القيود والشروط الصريحة:',
    constraintsPlaceholder: 'مثال: الاعتماد على المكتبات القياسية فقط، معالجة شاملة للأخطاء وحالات الحافة...',
    generateButton: 'هندسة وصياغة الأمر',
    generatingButton: 'جارٍ هندسة وصياغة الأمر...',

    clarificationTitle: 'تحسين وتحديد تفاصيل الأمر (خطوة استيضاح سريعة)',
    clarificationSubtitle: 'لضمان أمر دقيق خالي من العموميات، يمكنك الإجابة أو اعتماد المقترحات التلقائية فوراً',
    applyDefaultsNow: 'تطبيق المقترحات التلقائية فوراً',
    useDefaultButton: 'استخدام المقترح',
    customAnswerPlaceholder: 'أو اكتب إجابتك الخاصة...',
    finalizeWithAnswers: 'إنشاء الأمر النهائي باعتماد إجاباتي',

    resultTitle: 'الأمر البرمجي المهندس والجاهز للاستخدام المباشر',
    readyBadge: 'جاهز للاستخدام',
    tabFullPrompt: 'الأمر الكامل',
    tabStructure: 'تفكيك الهيكلية',
    tabTestPrompt: 'تجربة حية (Live AI)',
    copyPrompt: 'نسخ الأمر',
    copied: 'تم النسخ!',
    saveToArchive: 'حفظ في الأرشيف',
    savedInArchive: 'محفوظ في الأرشيف',
    downloadMd: 'تحميل (.md)',
    keyEngineeringChoice: 'القرار الهندسي الأساسي في هذا الأمر:',
    reviseLabel: 'طلب تعديل مباشر على هذا الأمر:',
    revisePlaceholder: 'مثال: "اجعله يستخدم TypeScript غير متزامن async/await مع إضافة اختبارات Vitest..."',
    reviseButton: 'تطبيق التعديل مباشرة',
    revisingButton: 'جارٍ تحديث الأمر...',
    runTestButton: 'محاكاة تشغيل الأمر مع Gemini',
    runningTest: 'جارٍ محاكاة تشغيل الأمر...',
    testOutputTitle: 'عينة من إجابة النموذج الافتراضية:',
    testNotice: 'يقوم هذا الاختبار بتشغيل الأمر مباشرة عبر Gemini 3.8 لمعاينة شكل المخرجات المتوقعة.',

    pillarsTitle: 'قواعد هندسة الأوامر الـ 7 المطبقة في هذا المساعد الذكي:',
    pillar1Title: '1. الدور والسياق (Role & Context)',
    pillar1Desc: 'تحديد شخصية الخبير وخلفية المشروع لتوفير عمق تقني مناسب.',
    pillar2Title: '2. المهمة المحددة (Explicit Task)',
    pillar2Desc: 'وصف المهمة المطلوبة بصيغة أمرية واضحة ومباشرة بدون مواربة.',
    pillar3Title: '3. الموانع والقيود (Negative Constraints)',
    pillar3Desc: 'منع العبارات الإنشائية والحلول الجاهزة المكررة أو غير الآمنة.',
    pillar4Title: '4. معايير النجاح (Success Criteria)',
    pillar4Desc: 'معيار قياس جودة يتيح للنموذج مراجعة إجابته ذاتياً قبل الرد.',

    drawerTitle: 'أرشيف الأوامر المحفوظة',
    drawerEmpty: 'لا توجد أوامر محفوظة بعد',
    drawerEmptySub: 'الأوامر التي تضع عليها نجمة ستظهر هنا لسهولة الرجوع إليها وإعادة استخدامها.',
    clearAll: 'مسح الكل',
    confirmClearAll: 'هل أنت متأكد من رغبتك في مسح كافة الأوامر المحفوظة؟',
    openPrompt: 'تحميل الأمر',
    deletePrompt: 'حذف',

    toastGenerated: 'تمت هندسة وصياغة الأمر بنجاح!',
    toastClarified: 'تم بناء الأمر النهائي بناءً على إجاباتك.',
    toastRevised: 'تم تعديل الأمر مباشرة بنجاح.',
    toastSaved: 'تم حفظ الأمر في الأرشيف بنجاح.',
    toastUnsaved: 'تمت إزالة الأمر من الأرشيف.',
    toastCopied: 'تم النسخ إلى الحافظة!',
    toastLoaded: 'تم تحميل الأمر المحفوظ.',

    footerCopyright: 'كاتب الأوامر الذكي © 2026 — مدعوم بنموذج Google Gemini 3.8',
    footerAudience: 'مصمم للمطورين وصناع المحتوى ومستخدمي أدوات الذكاء الاصطناعي',

    // Subscription & Dashboard
    subscriptionPlan: 'الاشتراك الشهري',
    subscriptionPrice: '7,500 دينار عراقي / شهرياً',
    monthlyPlanTitle: 'خطة الاشتراك الشهري (7,500 دينار)',
    monthlyPlanSubtitle: 'احصل على لوحة تحكم المشترك الخاصة بك لحفظ وتنظيم وهندسة الأوامر بلا حدود.',
    subscriberDashboardTitle: 'لوحة تحكم المشترك',
    featureStorage: 'لوحة تحكم خاصة لحفظ وتنظيم وتصنيف أوامرك البرمجية',
    featureUnlimited: 'صياغة أوامر فائقة الدقة لـ Claude و Cursor و ChatGPT و Midjourney',
    featureSupport: 'دعم شامل للغات الإنجليزية والكردية بكافة لهجاتها والعربية',
    featureRevisions: 'تعديل فوري في نفس المكان ومحاكاة تشغيل الأوامر مع Gemini',
    paymentDetailsTitle: 'تعليمات وبيانات الدفع والتحويل',
    fastPayFIBTitle: 'فاست باي (FastPay) أو بنك FIB (المصرف العراقي الأول)',
    accountNumberText: '+9647504909260',
    copyNumber: 'نسخ رقم الهاتف',
    copiedNumber: 'تم نسخ رقم الهاتف!',
    paymentNoteRuleTitle: 'ملاحظة إلزامية عند التحويل (Note / الوصف):',
    paymentNoteRuleBody: 'ئەو پارە هی خزمەتگوزاری وێبە (هذا المبلغ مخصص لخدمة الويب)',
    copyNote: 'نسخ نص الملاحظة',
    copiedNote: 'تم نسخ الملاحظة!',
    whatsappSubmitTitle: 'إرسال صورة الوصل عبر واتساب (WhatsApp)',
    whatsappSubmitDesc: 'يرجى إرسال صورة وصل الدفع عبر واتساب إلى نفس الرقم (+9647504909260). بمجرد الموافقة هناك، سيتم تفعيل الخدمة لحسابك مباشرة لمدة شهر كامل.',
    openWhatsAppButton: 'إرسال الوصل عبر واتساب',
    attachReceiptTitle: 'إرفاق صورة وصل الدفع',
    attachReceiptHint: 'اضغط هنا أو اسحب لقطة شاشة وصل الدفع (FastPay أو FIB)',
    subscriberNameInput: 'اسم المشترك',
    subscriberPhoneInput: 'رقم هاتف المشترك',
    paymentMethodInput: 'طريقة الدفع (FastPay أو FIB)',
    requestApprovalButton: 'إرسال الوصل للموافقة والتفعيل',
    submittingApproval: 'جارٍ إرسال الوصل...',
    approvalSentTitle: 'تم استلام الوصل وبانتظار التفعيل عبر واتساب',
    approvalSentDesc: 'تم حفظ تفاصيل وصلك، يرجى إرساله أيضاً عبر واتساب (+9647504909260) للتفعيل الفوري لمدة شهر.',
    statusPendingApproval: 'بانتظار الموافقة عبر واتساب',
    statusActive: 'الاشتراك مفعّل (شهر كامل)',
    statusInactive: 'غير مشترك',
    activePlanBadge: 'خطة المشترك الشهري 30 يوماً',
    validUntil: 'صالح لغاية',
    daysRemainingText: 'يوماً متبقياً',
    simulatedApprovalBtn: 'تفعيل المشترك (محاكاة موافقة واتساب)',
    managePromptsTitle: 'مستودع الأوامر المحفوظة',
    searchPromptsPlaceholder: 'بحث في الأوامر المحفوظة...',
    filterAllTools: 'كافة الأدوات',
    exportAllPrompts: 'تصدير الأوامر (.json)',
    openDashboard: 'لوحة تحكم المشترك',
    closeDashboard: 'العودة إلى مهندس الأوامر',
  },
};

export function isRtlLang(lang: SupportedLang): boolean {
  // Kurmanji is Latin script -> LTR. English -> LTR.
  // Sorani, Badini, Hawrami, Arabic -> RTL.
  return lang === 'ku_ckb' || lang === 'ku_bad' || lang === 'ku_hwr' || lang === 'ar';
}

export function getLanguageGroupName(lang: SupportedLang): 'en' | 'ku' | 'ar' {
  if (lang === 'en') return 'en';
  if (lang === 'ar') return 'ar';
  return 'ku';
}
