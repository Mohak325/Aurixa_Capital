// src/data/process.ts
// Authentic 10-step investment lifecycle directly sourced from Aurixia Capital Company Brochure (Page 8)

export interface ProcessPhase {
  id: "advisory" | "acquisition" | "management" | "exit";
  roman: string;
  number: string;
  title: string;
  tagline: string;
  scope: string;
  stepRange: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  phaseId: "advisory" | "acquisition" | "management" | "exit";
  phaseRoman: string;
  description: string;
  deliverables: string[];
  timeframe: string;
  metric: string;
  icon: string;
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    id: "advisory",
    roman: "Phase I",
    number: "01",
    title: "Strategic Advisory & Sourcing",
    tagline: "Discovery to Curated Allocation",
    scope: "Aligning your capital objectives, risk appetite, and wealth timeline with bespoke domestic and international asset corridors.",
    stepRange: "Steps 01 – 03",
  },
  {
    id: "acquisition",
    roman: "Phase II",
    number: "02",
    title: "Acquisition & Legal Fortification",
    tagline: "100% Litigation-Free Security & Closing",
    scope: "Executing forensic 6-point legal scrutiny, securing off-market developer pricing, and handling turnkey statutory registration.",
    stepRange: "Steps 04 – 06",
  },
  {
    id: "management",
    roman: "Phase III",
    number: "03",
    title: "Value Creation & Turnkey Stewardship",
    tagline: "You Invest. We Manage.",
    scope: "Transforming physical property into high-yield passive income through bespoke interior staging and end-to-end tenant management.",
    stepRange: "Steps 07 – 08",
  },
  {
    id: "exit",
    roman: "Phase IV",
    number: "04",
    title: "Alpha Compounding & Strategic Exit",
    tagline: "Active Oversight to Maximum Liquidation",
    scope: "Continuous micro-market performance monitoring, cyclical value capture, and planned, tax-efficient capital reinvestment.",
    stepRange: "Steps 09 – 10",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understanding Your Financial Goals",
    tagline: "Discovery & Alignment",
    phaseId: "advisory",
    phaseRoman: "Phase I",
    description:
      "We begin with a deep exploration of your financial objectives, capital deployment timeline, risk appetite, and wealth creation targets — whether seeking predictable monthly passive rental income, long-term capital appreciation, or international portfolio diversification.",
    deliverables: [
      "Capital Deployment Horizon",
      "Risk vs Yield Blueprint",
      "Cashflow vs Growth Modeling",
    ],
    timeframe: "Week 1",
    metric: "1-on-1 Discovery",
    icon: "Target",
  },
  {
    number: "02",
    title: "Investment Planning & Strategy",
    tagline: "Bespoke Blueprint",
    phaseId: "advisory",
    phaseRoman: "Phase I",
    description:
      "Our senior advisors formulate a bespoke investment strategy tailored to your capital profile, balancing domestic and international asset allocation, tax efficiency, liquidity, and wealth preservation across verified high-growth corridors.",
    deliverables: [
      "Asset Allocation Matrix",
      "Dual-Jurisdiction Tax Plan",
      "Liquidity & Capital Shield",
    ],
    timeframe: "Week 1–2",
    metric: "Bespoke Architecture",
    icon: "TreeStructure",
  },
  {
    number: "03",
    title: "Property Identification & Curation",
    tagline: "Curated Pipeline",
    phaseId: "advisory",
    phaseRoman: "Phase I",
    description:
      "We curate and shortlist prime, high-growth investment opportunities across India and international corridors — leveraging our deep 20+ year developer relationships and off-market access for pre-launch, ready-to-move, and commercial assets.",
    deliverables: [
      "Off-Market Deal Pipeline",
      "Comparative Rental Yield Audit",
      "Pre-Launch Tier-1 Access",
    ],
    timeframe: "Week 2–3",
    metric: "Top 3% Curated Deals",
    icon: "MagnifyingGlass",
  },
  {
    number: "04",
    title: "Legal Verification & Due Diligence",
    tagline: "100% Litigation-Free Security",
    phaseId: "acquisition",
    phaseRoman: "Phase II",
    description:
      "Before recommending any property, our in-house legal experts conduct rigorous 6-point verification — title searches, encumbrance checks, ownership history, and statutory compliance — ensuring complete peace of mind and undisputed legal standing.",
    deliverables: [
      "6-Point Title Scrutiny",
      "30-Year Encumbrance Search",
      "Statutory & RERA Clearance",
    ],
    timeframe: "Week 3–4",
    metric: "100% Litigation-Free",
    icon: "ShieldCheck",
  },
  {
    number: "05",
    title: "Negotiation & Acquisition",
    tagline: "Preferred Valuation",
    phaseId: "acquisition",
    phaseRoman: "Phase II",
    description:
      "We negotiate aggressively on your behalf to secure preferred off-market pricing and favorable payment structures, guiding you through purchase contracts with total transparency and institutional investor protections.",
    deliverables: [
      "Developer Off-Market Pricing",
      "Structured Milestones",
      "Investor Protection Clauses",
    ],
    timeframe: "Week 4",
    metric: "Preferred Valuation",
    icon: "Handshake",
  },
  {
    number: "06",
    title: "Registration & Compliance",
    tagline: "Seamless Execution",
    phaseId: "acquisition",
    phaseRoman: "Phase II",
    description:
      "Our legal and operations team manages the entire transaction paperwork, government compliance, stamp duty, registry execution, FEMA/RBI dual-jurisdiction filings, and statutory documentation for a smooth and compliant closing.",
    deliverables: [
      "Government Registry Filing",
      "Stamp Duty Optimization",
      "FEMA / RBI Documentation",
    ],
    timeframe: "Week 4–5",
    metric: "Turnkey Closing",
    icon: "FileText",
  },
  {
    number: "07",
    title: "Interior & Property Enhancement (Optional)",
    tagline: "Value & Rental Appeal",
    phaseId: "management",
    phaseRoman: "Phase III",
    description:
      "Our in-house design specialists provide turnkey interior solutions, space planning, and modern furnishings to maximize tenant appeal, command premium rental yields, and elevate overall asset valuation from day one.",
    deliverables: [
      "Turnkey Space Planning",
      "Executive Furnishing Pack",
      "High-Yield Tenant Staging",
    ],
    timeframe: "Post-Possession",
    metric: "+18–25% Yield Premium",
    icon: "PaintBrush",
  },
  {
    number: "08",
    title: "Rental & Property Management",
    tagline: "You Invest. We Manage.",
    phaseId: "management",
    phaseRoman: "Phase III",
    description:
      "Our dedicated leasing and property management team handles tenant search, background vetting, corporate leasing, rental agreements, automated rent escrow support, and ongoing maintenance coordination without demanding your time.",
    deliverables: [
      "Corporate Tenant Placement",
      "Background & Credit Vetting",
      "Automated Rent Escrow",
    ],
    timeframe: "Ongoing Care",
    metric: "Hands-Off Passive Yield",
    icon: "Key",
  },
  {
    number: "09",
    title: "Portfolio Monitoring & Yield Optimization",
    tagline: "Active Oversight",
    phaseId: "exit",
    phaseRoman: "Phase IV",
    description:
      "Continuous asset monitoring and regular performance reviews. We track micro-market appreciation, occupancy rates, rental yields, and emerging growth corridors to protect and compound your wealth across cycles.",
    deliverables: [
      "Quarterly Valuation Audits",
      "Micro-Market Trend Alerts",
      "Yield Compounding Reviews",
    ],
    timeframe: "Quarterly Reviews",
    metric: "Institutional Governance",
    icon: "ChartLine",
  },
  {
    number: "10",
    title: "Strategic Exit & Profit Realization",
    tagline: "Maximized Return",
    phaseId: "exit",
    phaseRoman: "Phase IV",
    description:
      "When your asset reaches optimal valuation, we execute a planned, tax-efficient exit strategy to liquidate at maximum market value — ready to reinvest capital into next-generation wealth opportunities.",
    deliverables: [
      "Peak-Cycle Market Timing",
      "Tax-Optimized Repatriation",
      "1031 / Reinvestment Ready",
    ],
    timeframe: "3–7 Year Horizon",
    metric: "Maximized Alpha",
    icon: "TrendUp",
  },
];
