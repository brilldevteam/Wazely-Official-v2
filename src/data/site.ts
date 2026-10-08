export const siteConfig = {
  companyName: "Wazely",
  title: "CRM and ERP Software for GCC Businesses | Wazely",
  description:
    "Wazely builds connected CRM and ERP software for customer relationships, finance, sales, and everyday operations across Qatar, Saudi Arabia, and the GCC.",
  crmUrl: "https://crm.wazely.io",
  erpUrl: "https://erp.wazely.io",
  colorUrl: "https://color.wazely.io/",
  demoUrl: "https://crm.wazely.io",
  knowledgeBaseUrl: "https://help.wazely.io/enterprise/index.html",
  erpKnowledgeBaseUrl: "https://help.wazely.io/erp/",
  language: "en",
  locale: "en_GB",
  targetMarkets: [
    "Qatar",
    "Saudi Arabia",
    "United Arab Emirates",
    "Kuwait",
    "Bahrain",
    "Oman",
  ],
  socialLinks: {
    facebook: "https://www.facebook.com/wazely.io",
    instagram: "https://www.instagram.com/wazely.io/",
  },
  legalLinks: {},
  // Contact Us section (homepage). CONFIRM these before going live:
  // - email: the form opens the visitor's email app addressed to this inbox.
  // - whatsapp: international number, digits only (e.g. "97412345678").
  //   Leave empty to hide the WhatsApp card.
  // - phoneDisplay: how the number is shown on the card.
  // - location: office city and country.
  contact: {
    email: "hello@wazely.io",
    whatsapp: "",
    phoneDisplay: "",
    location: "Doha, Qatar",
  },
} as const;

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    return new URL(configured ?? "https://wazely.io");
  } catch {
    return new URL("https://wazely.io");
  }
}
