// Content for the homepage redesign. Everything here describes real Wazely
// products, real screenshots in /public/screenshots, and features that exist
// in the apps. There are deliberately no invented customer counts, reviews,
// or percentages: sections that use social proof on other sites use product
// facts here instead.
import {
  BarChart3,
  ImageIcon,
  BookOpenCheck,
  Bot,
  Boxes,
  CalendarClock,
  Coins,
  Contrast,
  CreditCard,
  FileSpreadsheet,
  FileText,
  Filter,
  Globe2,
  KeyRound,
  Landmark,
  LayoutGrid,
  Layers,
  LineChart,
  ListChecks,
  Megaphone,
  MessageCircleReply,
  MessagesSquare,
  Paintbrush,
  Palette,
  Receipt,
  ReceiptText,
  Rocket,
  Scale,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { siteConfig } from "@/data/site";

export type Tone = "brand" | "amber" | "violet" | "rose" | "sky";

/* Hero ------------------------------------------------------------------ */

export const heroWords = [
  "one workspace",
  "one inbox",
  "one ledger",
  "one dashboard",
] as const;

export type SearchEntry = {
  label: string;
  product: "CRM" | "ERP" | "Color";
  href: string;
};

// Feature index behind the hero search box. Every entry is a real feature
// and links to the product page that covers it.
export const searchIndex: readonly SearchEntry[] = [
  { label: "Shared WhatsApp inbox", product: "CRM", href: "/crm" },
  { label: "Contacts and tags", product: "CRM", href: "/crm" },
  { label: "Segments", product: "CRM", href: "/crm" },
  { label: "Broadcast campaigns", product: "CRM", href: "/crm" },
  { label: "Message templates", product: "CRM", href: "/crm" },
  { label: "Visual automation builder", product: "CRM", href: "/crm" },
  { label: "AI agents", product: "CRM", href: "/crm" },
  { label: "Agent assignment", product: "CRM", href: "/crm" },
  { label: "Appointment booking", product: "CRM", href: "/crm" },
  { label: "Quotations", product: "ERP", href: "/erp" },
  { label: "Sales invoices", product: "ERP", href: "/erp" },
  { label: "Purchase invoices", product: "ERP", href: "/erp" },
  { label: "Customer payments", product: "ERP", href: "/erp" },
  { label: "Vendor payments", product: "ERP", href: "/erp" },
  { label: "Multi-currency payments", product: "ERP", href: "/erp" },
  { label: "Chart of accounts", product: "ERP", href: "/erp" },
  { label: "Accounting and journals", product: "ERP", href: "/erp" },
  { label: "Warehouses and stock", product: "ERP", href: "/erp" },
  { label: "Invoice aging report", product: "ERP", href: "/erp" },
  { label: "Tax summary", product: "ERP", href: "/erp" },
  { label: "AI color palettes", product: "Color", href: siteConfig.colorUrl },
  { label: "Brand boards", product: "Color", href: siteConfig.colorUrl },
  { label: "WCAG contrast checker", product: "Color", href: siteConfig.colorUrl },
  { label: "Tailwind and Figma export", product: "Color", href: siteConfig.colorUrl },
];

export const heroChips = [
  "WhatsApp inbox",
  "Invoices",
  "Automation",
  "Accounting",
  "Palettes",
] as const;

/* Featured products card ------------------------------------------------- */

export type FeaturedProduct = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: Tone;
  tier: "Pro" | "Free";
};

export const featuredProducts: readonly FeaturedProduct[] = [
  {
    name: "Wazely CRM",
    description: "Shared WhatsApp inbox, contacts, campaigns, and automation.",
    href: "/crm",
    icon: MessagesSquare,
    tone: "brand",
    tier: "Pro",
  },
  {
    name: "Wazely ERP",
    description: "Quotations, invoices, payments, accounting, and reports.",
    href: "/erp",
    icon: ReceiptText,
    tone: "violet",
    tier: "Pro",
  },
  {
    name: "Wazely Color",
    description: "AI palettes, brand boards, contrast checks, and exports.",
    href: siteConfig.colorUrl,
    icon: Palette,
    tone: "rose",
    tier: "Free",
  },
];

/* Why Wazely --------------------------------------------------------------- */

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
};

export const reasons: readonly Reason[] = [
  {
    title: "One connected record",
    description:
      "A chat becomes a contact, a quotation, an invoice, and a payment without anyone retyping it.",
    icon: Layers,
    tone: "brand",
  },
  {
    title: "Built for GCC teams",
    description:
      "Designed for businesses in Qatar, Saudi Arabia, the UAE, Kuwait, Bahrain, and Oman.",
    icon: Globe2,
    tone: "amber",
  },
  {
    title: "WhatsApp at the center",
    description:
      "Your customers already message you on WhatsApp. Wazely gives the whole team one shared inbox for it.",
    icon: MessagesSquare,
    tone: "brand",
  },
  {
    title: "Multi-currency books",
    description:
      "Record payments in the customer's currency with an exchange rate, and keep your base currency accurate.",
    icon: Coins,
    tone: "amber",
  },
  {
    title: "Role-based access",
    description:
      "Give each teammate exactly the actions they need: view, create, update, or manage.",
    icon: ShieldCheck,
    tone: "brand",
  },
  {
    title: "Start with one product",
    description:
      "Use CRM or ERP on its own, run both together, and add the free Color toolkit any time.",
    icon: Rocket,
    tone: "amber",
  },
];

/* Product switcher -------------------------------------------------------- */

export type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ShowcaseProduct = {
  id: "crm" | "erp" | "color";
  name: string;
  tagline: string;
  url: string;
  href: string;
  appUrl: string;
  slides: readonly Slide[];
};

export const showcaseProducts: readonly ShowcaseProduct[] = [
  {
    id: "crm",
    name: "Wazely CRM",
    tagline: "Every customer conversation, campaign, and automation in one place.",
    url: "crm.wazely.io",
    href: "/crm",
    appUrl: siteConfig.crmUrl,
    slides: [
      { src: "/screenshots/crm-dashboard.png", alt: "Wazely CRM dashboard", width: 1672, height: 940, caption: "Dashboard" },
      { src: "/screenshots/crm-shared-inbox.png", alt: "Wazely CRM shared WhatsApp inbox", width: 1742, height: 903, caption: "Shared inbox" },
      { src: "/screenshots/crm-automation-builder.png", alt: "Wazely CRM visual automation builder", width: 1672, height: 940, caption: "Automation builder" },
      { src: "/screenshots/crm-campaigns.png", alt: "Wazely CRM broadcast campaigns", width: 1675, height: 939, caption: "Campaigns" },
      { src: "/screenshots/crm-contacts-directory.png", alt: "Wazely CRM contacts directory", width: 1917, height: 907, caption: "Contacts" },
      { src: "/screenshots/crm-agents.png", alt: "Wazely CRM AI agents", width: 1917, height: 908, caption: "AI agents" },
    ],
  },
  {
    id: "erp",
    name: "Wazely ERP",
    tagline: "Sales, purchases, payments, and accounting on one operational record.",
    url: "erp.wazely.io",
    href: "/erp",
    appUrl: siteConfig.erpUrl,
    slides: [
      { src: "/screenshots/erp/dashboard.png", alt: "Wazely ERP dashboard", width: 1920, height: 950, caption: "Dashboard" },
      { src: "/screenshots/erp/quotations-and-invoices.png", alt: "Wazely ERP quotations and invoices", width: 1920, height: 950, caption: "Quotations and invoices" },
      { src: "/screenshots/erp/payment-received.png", alt: "Wazely ERP payment received", width: 1917, height: 907, caption: "Payments" },
      { src: "/screenshots/erp/accounting-chart-of-accounts.png", alt: "Wazely ERP chart of accounts", width: 1920, height: 950, caption: "Chart of accounts" },
      { src: "/screenshots/erp/warehouses.png", alt: "Wazely ERP warehouses", width: 1917, height: 906, caption: "Warehouses" },
      { src: "/screenshots/erp/reports.png", alt: "Wazely ERP reports", width: 1920, height: 950, caption: "Reports" },
    ],
  },
  {
    id: "color",
    name: "Wazely Color",
    tagline: "A free AI brand color suite with boards, contrast checks, and exports.",
    url: "color.wazely.io",
    href: siteConfig.colorUrl,
    appUrl: siteConfig.colorUrl,
    slides: [
      { src: "/screenshots/color-hero-light.png", alt: "Wazely Color brand palette board", width: 1200, height: 630, caption: "Brand board" },
    ],
  },
];

/* Solutions tabs ------------------------------------------------------------ */

export type SolutionCard = {
  title: string;
  tags: readonly string[];
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Solution = {
  id: string;
  tab: string;
  icon: LucideIcon;
  script: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  bullets: readonly string[];
  banner: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  cards: readonly [SolutionCard, SolutionCard];
};

export const solutions: readonly Solution[] = [
  {
    id: "conversations",
    tab: "Conversations",
    icon: MessagesSquare,
    script: "Wazely CRM",
    titleLead: "Every WhatsApp chat",
    titleAccent: "in one shared inbox",
    description:
      "Agents reply from one business number with contact history, notes, and assignment visible to the whole team.",
    bullets: ["Shared WhatsApp inbox", "Agent assignment and notes", "Template-based broadcasts"],
    banner: "Connects with Facebook, Instagram, Telegram, and Google Sheets",
    primary: { label: "Try the demo", href: siteConfig.crmUrl },
    secondary: { label: "Explore CRM", href: "/crm" },
    cards: [
      { title: "Automation builder", tags: ["Triggers", "Conditions"], src: "/screenshots/crm-automation-builder.png", alt: "Wazely CRM automation builder", width: 1672, height: 940 },
      { title: "Message templates", tags: ["Broadcasts", "Media"], src: "/screenshots/crm-message-templates.png", alt: "Wazely CRM message templates", width: 1917, height: 905 },
    ],
  },
  {
    id: "accounting",
    tab: "Sales and accounting",
    icon: Receipt,
    script: "Wazely ERP",
    titleLead: "From quotation",
    titleAccent: "to paid invoice",
    description:
      "An accepted quotation converts straight into an invoice. Payments and accounts stay on one record.",
    bullets: ["Quotations and sales invoices", "Customer and vendor payments", "Chart of accounts and journals"],
    banner: "Includes invoice aging, bill aging, and tax summary reports",
    primary: { label: "Try the demo", href: siteConfig.erpUrl },
    secondary: { label: "Explore ERP", href: "/erp" },
    cards: [
      { title: "Purchase invoices", tags: ["Vendors", "Bills"], src: "/screenshots/erp/purchase-invoices.png", alt: "Wazely ERP purchase invoices", width: 1917, height: 905 },
      { title: "Vendor payments", tags: ["Multi-currency", "Vouchers"], src: "/screenshots/erp/vendor-payments.png", alt: "Wazely ERP vendor payments", width: 1917, height: 907 },
    ],
  },
  {
    id: "brand",
    tab: "Brand and design",
    icon: Palette,
    script: "Wazely Color",
    titleLead: "A brand palette",
    titleAccent: "in minutes, not days",
    description:
      "Describe your brand, get an AI palette, check WCAG contrast, and export it to the tools your team uses.",
    bullets: ["AI-generated palettes", "Professional brand boards", "WCAG contrast checks"],
    banner: "Exports to CSS, Tailwind, Figma, and SwiftUI. Free to use",
    primary: { label: "Open Wazely Color", href: siteConfig.colorUrl },
    secondary: { label: "See all products", href: "#products" },
    cards: [
      { title: "Brand board", tags: ["AI palette", "Typography"], src: "/screenshots/color-hero-light.png", alt: "Wazely Color brand board", width: 1200, height: 630 },
      { title: "Workspace view", tags: ["Dashboards", "Themes"], src: "/screenshots/crm-dashboard.png", alt: "A Wazely workspace using a generated brand palette", width: 1672, height: 940 },
    ],
  },
];

/* Business bento ------------------------------------------------------------- */

export type BentoTile = {
  title: string;
  description: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  tone: Tone;
  span: "hero" | "wide" | "single";
};

// Exactly 6 tiles: the grid in business-bento.tsx is planned for this count.
export const bentoTiles: readonly BentoTile[] = [
  {
    title: "Retail and trading",
    description: "Quotes, invoices, stock, and warehouses in one ERP.",
    href: "/erp",
    src: "/screenshots/erp/warehouses.png",
    alt: "Wazely ERP warehouses screen",
    width: 1917,
    height: 906,
    tone: "violet",
    span: "hero",
  },
  {
    title: "Clinics and services",
    description: "Bookings and patient chats in a shared inbox.",
    href: "/crm",
    src: "/screenshots/crm-shared-inbox.png",
    alt: "Wazely CRM shared inbox",
    width: 1742,
    height: 903,
    tone: "brand",
    span: "single",
  },
  {
    title: "Agencies",
    description: "Campaigns, segments, and brand palettes.",
    href: "/crm",
    src: "/screenshots/crm-campaigns.png",
    alt: "Wazely CRM campaigns",
    width: 1675,
    height: 939,
    tone: "rose",
    span: "single",
  },
  {
    title: "Distribution",
    description: "Purchases, vendors, and vendor payments.",
    href: "/erp",
    src: "/screenshots/erp/purchase-invoices.png",
    alt: "Wazely ERP purchase invoices",
    width: 1917,
    height: 905,
    tone: "amber",
    span: "single",
  },
  {
    title: "Finance teams",
    description: "Accounts, journals, and reports.",
    href: "/erp",
    src: "/screenshots/erp/accounting-chart-of-accounts.png",
    alt: "Wazely ERP chart of accounts",
    width: 1920,
    height: 950,
    tone: "sky",
    span: "single",
  },
  {
    title: "Sales and support teams",
    description: "Agents, AI assistants, and automations that answer around the clock.",
    href: "/crm",
    src: "/screenshots/crm-agents.png",
    alt: "Wazely CRM AI agents",
    width: 1917,
    height: 908,
    tone: "brand",
    span: "wide",
  },
];

/* How it works ------------------------------------------------------------------ */

export type FlowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const flowSteps: readonly FlowStep[] = [
  {
    title: "A customer messages",
    description: "The WhatsApp chat lands in the shared inbox, visible to the whole team.",
    icon: MessagesSquare,
  },
  {
    title: "An agent replies",
    description: "Contact details, tags, and segments update as the conversation continues.",
    icon: MessageCircleReply,
  },
  {
    title: "Quote becomes invoice",
    description: "One accepted quotation converts straight into a Wazely ERP invoice.",
    icon: FileText,
  },
  {
    title: "Payment is recorded",
    description: "Accounts, balances, and reports update without anyone retyping it.",
    icon: Wallet,
  },
];

/* Module wall ---------------------------------------------------------------------- */

export type Module = { label: string; icon: LucideIcon; tone: Tone };

// 44 cells surround the 4x4 center block in the 10x6 grid.
export const modules: readonly Module[] = [
  { label: "Shared inbox", icon: MessagesSquare, tone: "brand" },
  { label: "Contacts", icon: Users, tone: "brand" },
  { label: "Segments", icon: Filter, tone: "brand" },
  { label: "Tags", icon: Tags, tone: "brand" },
  { label: "Campaigns", icon: Megaphone, tone: "brand" },
  { label: "Templates", icon: FileText, tone: "brand" },
  { label: "Automation", icon: Workflow, tone: "brand" },
  { label: "AI agents", icon: Bot, tone: "brand" },
  { label: "Quick replies", icon: Zap, tone: "brand" },
  { label: "Appointments", icon: CalendarClock, tone: "brand" },
  { label: "Broadcasts", icon: Send, tone: "brand" },
  { label: "Media", icon: ImageIcon, tone: "brand" },
  { label: "Teams", icon: UserCog, tone: "sky" },
  { label: "Roles", icon: KeyRound, tone: "sky" },
  { label: "Permissions", icon: ShieldCheck, tone: "sky" },
  { label: "Quotations", icon: FileSpreadsheet, tone: "violet" },
  { label: "Invoices", icon: ReceiptText, tone: "violet" },
  { label: "Purchases", icon: ShoppingCart, tone: "violet" },
  { label: "Vendor bills", icon: Receipt, tone: "violet" },
  { label: "Payments", icon: CreditCard, tone: "violet" },
  { label: "Credit notes", icon: FileText, tone: "violet" },
  { label: "Multi-currency", icon: Coins, tone: "violet" },
  { label: "Bank", icon: Landmark, tone: "violet" },
  { label: "Journals", icon: BookOpenCheck, tone: "violet" },
  { label: "Accounts", icon: Scale, tone: "violet" },
  { label: "Items", icon: Boxes, tone: "amber" },
  { label: "Warehouses", icon: Warehouse, tone: "amber" },
  { label: "Vendors", icon: Truck, tone: "amber" },
  { label: "Invoice aging", icon: BarChart3, tone: "amber" },
  { label: "Bill aging", icon: LineChart, tone: "amber" },
  { label: "Tax summary", icon: ListChecks, tone: "amber" },
  { label: "Balances", icon: Wallet, tone: "amber" },
  { label: "Dashboards", icon: LayoutGrid, tone: "sky" },
  { label: "AI palettes", icon: Sparkles, tone: "rose" },
  { label: "Brand boards", icon: Paintbrush, tone: "rose" },
  { label: "Contrast", icon: Contrast, tone: "rose" },
  { label: "Gradients", icon: Palette, tone: "rose" },
  { label: "CSS export", icon: FileText, tone: "rose" },
  { label: "Tailwind", icon: Layers, tone: "rose" },
  { label: "Figma", icon: Paintbrush, tone: "rose" },
  { label: "Facebook", icon: Globe2, tone: "sky" },
  { label: "Instagram", icon: Globe2, tone: "sky" },
  { label: "Telegram", icon: Send, tone: "sky" },
  { label: "Google Sheets", icon: FileSpreadsheet, tone: "sky" },
];

/* Arches --------------------------------------------------------------------------- */

export type Arch = {
  big: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  tone: "sky" | "brand" | "amber";
};

export const arches: readonly Arch[] = [
  {
    big: "1 inbox",
    title: "For every WhatsApp chat",
    description: "No more personal phones",
    src: "/screenshots/crm-shared-inbox.png",
    alt: "Wazely CRM shared inbox",
    width: 1742,
    height: 903,
    tone: "sky",
  },
  {
    big: "1 record",
    title: "From quote to payment",
    description: "Nothing is retyped",
    src: "/screenshots/erp/quotations-and-invoices.png",
    alt: "Wazely ERP quotations and invoices",
    width: 1920,
    height: 950,
    tone: "brand",
  },
  {
    big: "Free",
    title: "Brand colors, forever",
    description: "Wazely Color costs nothing",
    src: "/screenshots/color-hero-light.png",
    alt: "Wazely Color brand board",
    width: 1200,
    height: 630,
    tone: "amber",
  },
];

/* Start paths (services) ---------------------------------------------------------------- */

export type Path = {
  title: string;
  description: string;
  cta: string;
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  accent: "brand" | "amber";
};

export const paths: readonly Path[] = [
  {
    title: "Try the CRM demo",
    description: "Open a live Wazely CRM workspace and click through the inbox.",
    cta: "Open demo",
    href: siteConfig.crmUrl,
    src: "/screenshots/crm-dashboard.png",
    alt: "Wazely CRM dashboard",
    width: 1672,
    height: 940,
    accent: "brand",
  },
  {
    title: "Explore the ERP",
    description: "See how quotations, invoices, and accounts connect.",
    cta: "Explore ERP",
    href: "/erp",
    src: "/screenshots/erp/dashboard.png",
    alt: "Wazely ERP dashboard",
    width: 1920,
    height: 950,
    accent: "amber",
  },
  {
    title: "Read the guides",
    description: "Setup, WhatsApp, payments, and reporting, step by step.",
    cta: "Knowledge base",
    href: "/knowledge-base",
    src: "/screenshots/erp/reports.png",
    alt: "Wazely ERP reports screen",
    width: 1920,
    height: 950,
    accent: "brand",
  },
];

/* Achievements (product facts, not customer metrics) -------------------------------------- */

export type Fact = { value: number; suffix: string; label: string; icon: LucideIcon; tone: Tone };

export const facts: readonly Fact[] = [
  { value: 3, suffix: "", label: "Connected products", icon: Layers, tone: "amber" },
  { value: 6, suffix: "", label: "GCC markets supported", icon: Globe2, tone: "sky" },
  { value: 44, suffix: "", label: "Features across the suite", icon: LayoutGrid, tone: "brand" },
];

/* Marquee (capabilities, not testimonials) -------------------------------------------------- */

export type Highlight = { product: "CRM" | "ERP" | "Color"; text: string };

// Replace with real customer testimonials when they exist. Until then this
// strip shows concrete things the products do, written as plain statements.
export const highlights: readonly Highlight[] = [
  { product: "CRM", text: "Three agents answer one WhatsApp number, and every reply is logged against the contact." },
  { product: "ERP", text: "An accepted quotation becomes a sales invoice with customer, items, and prices intact." },
  { product: "CRM", text: "A broadcast goes to one segment using an approved template, with media attached." },
  { product: "ERP", text: "A payment in a foreign currency is recorded with its exchange rate against base currency." },
  { product: "Color", text: "A one-line brand description turns into a full palette with WCAG contrast checks." },
  { product: "CRM", text: "An automation tags new leads and assigns them to the right agent without a click." },
  { product: "ERP", text: "Invoice aging shows exactly which customers owe what, and for how long." },
  { product: "Color", text: "A finished palette exports straight to Tailwind, CSS variables, or Figma." },
];

/* Contact quick links -------------------------------------------------------------------------- */

export const contactLinks = [
  { label: "CRM demo", href: siteConfig.crmUrl, icon: MessagesSquare },
  { label: "ERP demo", href: siteConfig.erpUrl, icon: ReceiptText },
  { label: "Knowledge base", href: "/knowledge-base", icon: BookOpenCheck },
  { label: "Wazely Color", href: siteConfig.colorUrl, icon: Palette },
] as const;
