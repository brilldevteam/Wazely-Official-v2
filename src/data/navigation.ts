import { siteConfig } from "@/data/site";

export const productNavigation = [
  {
    label: "Wazely CRM",
    tier: "Pro",
    description: "Customer conversations, campaigns, and automation",
    href: "/crm",
  },
  {
    label: "Wazely ERP",
    tier: "Pro",
    description: "Sales, finance, accounting, and operations",
    href: "/erp",
  },
  {
    label: "Wazely Color",
    tier: "Free",
    description: "Free AI brand color suite: palettes, boards, exports",
    href: "https://color.wazely.io/",
  },
] as const;

export const navigation = [
  { label: "Solutions", sectionId: "solutions" },
  { label: "Resources", sectionId: "resources" },
  { label: "About", sectionId: "about" },
] as const;

export type NavigationItem = (typeof navigation)[number];

export const knowledgeBaseNavigation = [
  {
    label: "Wazely CRM",
    description: "Setup, WhatsApp, contacts, campaigns, and automation",
    href: siteConfig.knowledgeBaseUrl,
  },
  {
    label: "Wazely ERP",
    description: "Sales, purchases, payments, accounting, and reporting",
    href: siteConfig.erpKnowledgeBaseUrl,
  },
] as const;

export const footerGroups = [
  {
    title: "Products",
    links: [
      { label: "Wazely CRM", href: "/crm" },
      { label: "Wazely ERP", href: "/erp" },
      { label: "Wazely Color", href: "https://color.wazely.io/" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Knowledge Base", href: "/knowledge-base" }],
  },
  {
    title: "Company",
    links: [
      { label: "About Wazely", href: "/#about" },
      { label: "Our products", href: "/#products" },
      { label: "Contact us", href: "/#contact" },
    ],
  },
] as const;
