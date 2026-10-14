// src/data/faq.ts
export interface FAQCategory {
  id: string;
  label: string;
}

export interface FAQItem {
  id: string;
  category: "governance" | "nri" | "legal" | "international" | "management";
  categoryLabel: string;
  question: string;
  answer: string;
  takeaway: string;
  highlights: string[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: "all", label: "All Topics" },
  { id: "governance", label: "Governance & Strategy" },
  { id: "nri", label: "NRI & Cross-Border" },
  { id: "legal", label: "Legal & Due Diligence" },
  { id: "international", label: "Global Corridors" },
  { id: "management", label: "Property & Leasing" },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "governance",
    categoryLabel: "Governance & Scope",
    question: "What types of investments does Aurixa Capital offer?",
    answer:
      "Aurixa Capital operates 10 specialized divisions spanning Real Estate Investment Advisory, Capital & Asset Management, End-to-End Property Management, Guaranteed Rental Assistance, Litigation-Free Property Verification, Property Buying & Selling, Interior Design & Property Enhancement, Mutual Fund Investment Solutions, International Investments (Dubai, Europe, Singapore, Malaysia), and Corporate Investments. We provide integrated solutions across both domestic and international markets.",
    takeaway: "10 dedicated divisions covering domestic and cross-border wealth solutions.",
    highlights: ["10 Specialized Divisions", "Domestic & Global Corridors", "Turnkey Institutional Management"],
  },
  {
    id: "faq-2",
    category: "governance",
    categoryLabel: "Client Onboarding",
    question: "How do I start investing with Aurixa Capital?",
    answer:
      "The process begins with an initial confidential financial discovery session. Our senior advisors analyze your capital deployment timeline, risk profile, cashflow objectives, and tax parameters to formulate a bespoke investment blueprint. You can reach our dedicated advisory lines at +91 99160 77741, +91 95389 97811, or submit an enquiry for a scheduled consultation.",
    takeaway: "Direct 1-on-1 strategy alignment with senior relationship directors.",
    highlights: ["Senior Advisory Access", "Bespoke Portfolio Blueprint", "Zero Upfront Obligation"],
  },
  {
    id: "faq-3",
    category: "governance",
    categoryLabel: "Capital Allocation",
    question: "What is the minimum investment amount?",
    answer:
      "Investment thresholds vary by asset class and target market. Domestic residential and commercial property opportunities start from accessible tier-1 entry valuations; mutual fund SIPs provide systematic monthly wealth compounding; while international acquisitions (such as Dubai freehold units qualifying for the 10-year Golden Visa) start at AED 2M+. Our advisors tailor allocations to fit your capital profile.",
    takeaway: "Flexible entry thresholds across residential, commercial, mutual funds, and global hubs.",
    highlights: ["Systematic Monthly Wealth Corridors", "Prime Commercial & Pre-Launch", "AED 2M+ Dubai Golden Visa"],
  },
  {
    id: "faq-4",
    category: "nri",
    categoryLabel: "NRI & Cross-Border",
    question: "Can NRIs invest through Aurixa Capital?",
    answer:
      "Yes, Non-Resident Indians (NRIs) represent a cornerstone client segment. We provide complete cross-border fiduciary advisory, including FEMA regulatory compliance, NRE/NRO banking alignment, Power of Attorney (PoA) facilitation, and full hands-off property management so overseas investors earn reliable rental yields in India without needing to travel.",
    takeaway: "100% remote passive wealth accumulation in India with complete legal and banking compliance.",
    highlights: ["FEMA & RBI Statutory Compliance", "NRE / NRO Account Coordination", "Power of Attorney (PoA) Facilitation"],
  },
  {
    id: "faq-5",
    category: "management",
    categoryLabel: "Property Management",
    question: "How does Aurixa Capital handle property management and rental assistance?",
    answer:
      "Under our core philosophy 'You invest. We manage.', our in-house leasing team handles every operational detail: tenant sourcing and background vetting, corporate leases, legally binding agreements, automated rent escrow collection, and ongoing property maintenance to ensure maximum occupancy and steady passive income.",
    takeaway: "Hands-off passive rental income with corporate tenant placement and rent escrow.",
    highlights: ["Strict Corporate Tenant Vetting", "Automated Monthly Rent Escrow", "End-to-End Asset Maintenance"],
  },
  {
    id: "faq-6",
    category: "governance",
    categoryLabel: "Fiduciary Pricing",
    question: "What are the fees and service charges?",
    answer:
      "Our practice operates with 100% fee transparency and zero hidden charges. Specific fee schedules are presented and agreed upon in writing during the initial planning phase, tailored to your exact engagement — whether advisory, acquisition, property leasing, or comprehensive family office asset management.",
    takeaway: "100% transparent fee architecture in writing with zero hidden markups.",
    highlights: ["Zero Hidden Markups", "Written Agreement Transparency", "Success & Alignment Focused"],
  },
  {
    id: "faq-7",
    category: "legal",
    categoryLabel: "Legal Due Diligence",
    question: "How do you ensure litigation-free property verification?",
    answer:
      "Before any asset is shortlisted or recommended, our in-house legal experts perform a rigorous 6-point forensic audit: 30-year title search, encumbrance certificate inspection, historical ownership chain verification, municipal and environmental approvals, RERA statutory compliance, and revenue land record scrutiny. We only recommend opportunities with undisputed title clarity.",
    takeaway: "6-point forensic legal title audit by in-house legal counsel before any capital commit.",
    highlights: ["30-Year Encumbrance Search", "Statutory & RERA Clearance", "Undisputed Title Certification"],
  },
  {
    id: "faq-8",
    category: "legal",
    categoryLabel: "Risk & Protection",
    question: "Is my capital protected?",
    answer:
      "Capital preservation is our highest fiduciary priority. Every investment is underpinned by tangible physical assets, legally verified contracts, and vetted institutional developers. We conduct downside stress-testing across liquidity, economic cycles, and regulatory shifts to safeguard your wealth.",
    takeaway: "Tangible asset backing, institutional contracts, and downside stress-testing.",
    highlights: ["Tangible Real Asset Backing", "Downside Stress-Testing", "Litigation-Free Legal Contracts"],
  },
  {
    id: "faq-9",
    category: "international",
    categoryLabel: "Global Corridors",
    question: "What international corridors does Aurixa Capital advise on?",
    answer:
      "We advise on five premier global investment hubs: Dubai (0% tax on capital gains and 10-year Golden Visa eligibility), London & Europe (blue-chip multi-generational asset preservation), Singapore (AAA-rated sovereign financial capital), and Malaysia (high rental yields and MM2H residency), as well as foundational tier-1 Indian metros.",
    takeaway: "Cross-border advisory across Dubai, London, Singapore, Kuala Lumpur, and Indian tier-1 metros.",
    highlights: ["Dubai 0% Capital Gains & Golden Visa", "Singapore AAA Sovereign Wealth Hub", "London Multi-Generational Wealth Hedge"],
  },
  {
    id: "faq-10",
    category: "management",
    categoryLabel: "Liquidity & Exit",
    question: "How do I exit an investment when I'm ready?",
    answer:
      "Exit planning is architected into your portfolio from day one. When optimal micro-market valuation is reached, our team coordinates the exit: cycle-timed pricing, institutional buyer sourcing, contract negotiation, and tax-efficient capital repatriation or seamless rollover into higher-yielding opportunities.",
    takeaway: "Planned cyclical exit execution with tax-efficient liquidation and reinvestment options.",
    highlights: ["Micro-Market Peak Cycle Timing", "Tax-Optimized Repatriation", "Seamless 1031 / Reinvestment Rollover"],
  },
];
