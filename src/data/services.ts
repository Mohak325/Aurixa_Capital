// src/data/services.ts
// Authentic services data directly sourced from Aurixia Capital Company Brochure (Pages 2–7)

export interface SubService {
  label: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  icon: string; // Phosphor icon name
  subtitle?: string;
  description: string;
  subServices: SubService[];
  callout: string;
  image: string; // Unsplash URL
  stat?: string;
}

export const SERVICES: Service[] = [
  {
    id: "real-estate",
    number: "01",
    title: "Real Estate Investment Advisory",
    icon: "Buildings",
    subtitle: "High-growth property acquisition across India and international corridors",
    description:
      "Whether you're a first-time investor or an experienced buyer, our experts help you identify high-growth investment opportunities across India and selected international markets. Every recommendation is backed by detailed market research, location analysis, and future appreciation potential.",
    subServices: [
      { label: "Residential Property Investments" },
      { label: "Commercial Property Investments" },
      { label: "Industrial Property Investments" },
      { label: "Luxury Property Investments" },
      { label: "Land & Plot Investments" },
      { label: "Pre-Launch Projects" },
      { label: "Ready-to-Move Properties" },
      { label: "Rental Income Properties" },
    ],
    callout: "Every recommendation is backed by detailed market research, location analysis, and future appreciation potential.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=75&auto=format&fit=crop",
    stat: "High-Growth Assets",
  },
  {
    id: "capital-management",
    number: "02",
    title: "Capital & Asset Management",
    icon: "ChartLine",
    subtitle: "Your money deserves professional, risk-mitigated wealth management",
    description:
      "Our Capital & Asset Management division helps investors multiply their wealth through carefully selected investment opportunities. Our primary objective is to create sustainable, resilient wealth while actively minimizing investment risks.",
    subServices: [
      { label: "Investment Planning" },
      { label: "Wealth Creation Strategies" },
      { label: "Portfolio Management" },
      { label: "Asset Diversification" },
      { label: "Long-Term Wealth Planning" },
      { label: "Passive Income Planning" },
      { label: "Capital Appreciation Strategies" },
      { label: "Strategic Exit Planning" },
    ],
    callout: "Our objective is to create sustainable wealth while minimizing investment risks.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=75&auto=format&fit=crop",
    stat: "Sustainable Wealth",
  },
  {
    id: "property-management",
    number: "03",
    title: "End-to-End Property Management",
    icon: "Key",
    subtitle: "Owning an investment property should be rewarding — not stressful",
    description:
      "Owning an investment property should be rewarding — not stressful. Aurixia Capital manages your property from start to finish, providing complete legal, operational, and maintenance solutions so you earn effortlessly.",
    subServices: [
      { label: "Property Purchase Assistance" },
      { label: "Documentation Verification" },
      { label: "Legal Due Diligence" },
      { label: "Registration Support" },
      { label: "Government Compliance Assistance" },
      { label: "Tenant Acquisition & Vetting" },
      { label: "Rental Agreement Management" },
      { label: "Rent Collection Support" },
      { label: "Property Maintenance Coordination" },
      { label: "Property Resale Assistance" },
    ],
    callout: "You invest. We manage. Complete end-to-end peace of mind.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=75&auto=format&fit=crop",
    stat: "You Invest. We Manage.",
  },
  {
    id: "rental-assistance",
    number: "04",
    title: "Guaranteed Rental Assistance",
    icon: "Handshake",
    subtitle: "Transforming properties into reliable income-generating assets",
    description:
      "One of the biggest concerns for investors is finding reliable tenants. Our dedicated leasing team assists clients in securing suitable rental opportunities, helping transform their investment into a consistent, hassle-free income-generating asset.",
    subServices: [
      { label: "Tenant Search & Screening" },
      { label: "Corporate Leasing Agreements" },
      { label: "Commercial Leasing" },
      { label: "Residential Leasing" },
      { label: "Rental Documentation & Legal Contracts" },
      { label: "Targeted Property Marketing" },
      { label: "Continuous Occupancy Support" },
    ],
    callout: "Our goal is to maximize occupancy and long-term rental yield potential.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=75&auto=format&fit=crop",
    stat: "Consistent Rental Yield",
  },
  {
    id: "litigation-free-verification",
    number: "05",
    title: "Litigation-Free Property Verification",
    icon: "ShieldCheck",
    subtitle: "Complete peace of mind through rigorous 6-point legal scrutiny",
    description:
      "Every investment deserves complete peace of mind. Before recommending any property, our in-house legal experts conduct thorough verification to guarantee pristine documentation, undisputed ownership, and airtight legal standing.",
    subServices: [
      { label: "Title Verification & Search Reports" },
      { label: "Encumbrance Certificate Verification" },
      { label: "Ownership History & Chain of Title" },
      { label: "Comprehensive Documentation Review" },
      { label: "Statutory Legal Due Diligence" },
      { label: "Municipal & Regulatory Compliance Checks" },
    ],
    callout: "We prioritize investments with clear documentation and undisputed legal standing.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=75&auto=format&fit=crop",
    stat: "100% Verified Titles",
  },
  {
    id: "buying-selling",
    number: "06",
    title: "Property Buying & Selling",
    icon: "Scales",
    subtitle: "Expert negotiation and transaction advisory from search to handover",
    description:
      "We assist buyers and sellers throughout every stage of the transaction. Whether purchasing your first investment property or liquidating an appreciated asset, we ensure a smooth, transparent, and profitable experience.",
    subServices: [
      { label: "Targeted Property Search & Selection" },
      { label: "Investment & Future Appreciation Analysis" },
      { label: "Aggressive Price Negotiation" },
      { label: "Legal Document Verification" },
      { label: "Sale Deed & Registration Support" },
      { label: "Strategic Resale & Liquidation Planning" },
      { label: "Exclusive Buyer & Seller Representation" },
    ],
    callout: "Whether purchasing your first property or liquidating an investment, we ensure a smooth and transparent experience.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=75&auto=format&fit=crop",
    stat: "Transparent Transactions",
  },
  {
    id: "interior-design",
    number: "07",
    title: "Interior Design & Property Enhancement",
    icon: "PaintBrush",
    subtitle: "Enhancing property value and rental appeal through turnkey design",
    description:
      "A well-designed property attracts better tenants and commands higher rental value. Our in-house design specialists provide turnkey interior solutions, space planning, and premium renovations that elevate both rental yield and asset valuation.",
    subServices: [
      { label: "Bespoke Interior Design" },
      { label: "Space Planning & Layout Optimization" },
      { label: "Turnkey Interior Solutions" },
      { label: "Renovation & Modernization Services" },
      { label: "Complete Furnishing Solutions" },
      { label: "Commercial Office Interiors" },
      { label: "Luxury Residential Interiors" },
    ],
    callout: "Enhance your property's value while commanding superior rental returns.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=75&auto=format&fit=crop",
    stat: "Higher Rental Yields",
  },
  {
    id: "mutual-funds",
    number: "08",
    title: "Mutual Fund Investment Solutions",
    icon: "Coins",
    subtitle: "Disciplined capital growth beyond real estate through managed portfolios",
    description:
      "Beyond real estate, we help clients diversify their portfolios through professionally managed mutual fund investments. Tailored for capital appreciation, tax efficiency, and long-term milestone planning.",
    subServices: [
      { label: "SIP Planning & Automated Inflow" },
      { label: "Lump Sum Strategic Deployments" },
      { label: "Goal-Based Wealth Investing" },
      { label: "Retirement Corpus Planning" },
      { label: "Child Education & Legacy Planning" },
      { label: "Tax-Efficient Investment Strategies" },
      { label: "Ongoing Quarterly Portfolio Review" },
    ],
    callout: "Invest. Grow. Prosper. Diversified wealth tailored for your future.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=75&auto=format&fit=crop",
    stat: "Invest · Grow · Prosper",
  },
  {
    id: "international",
    number: "09",
    title: "International Investment Opportunities",
    icon: "Globe",
    subtitle: "Expand your wealth footprint across premier global wealth corridors",
    description:
      "Expand your investment portfolio globally. Aurixia Capital assists clients in exploring premier international real estate and capital opportunities across Dubai (UAE), Europe, Singapore, and Malaysia.",
    subServices: [
      { label: "Dubai (UAE) Freehold Real Estate & Golden Visa" },
      { label: "Europe & UK Prime Property Advisory" },
      { label: "Singapore Financial Gateway Assets" },
      { label: "Malaysia & MM2H Investment Properties" },
      { label: "Holiday Homes & Luxury Villas" },
      { label: "Global Investment Apartments" },
      { label: "Cross-Border Wealth Advisory" },
    ],
    callout: "Expand your investment portfolio globally across Dubai, Europe, Singapore, and Malaysia.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=75&auto=format&fit=crop",
    stat: "4 Global Corridors",
  },
  {
    id: "corporate",
    number: "10",
    title: "Business & Corporate Investments",
    icon: "Briefcase",
    subtitle: "Facilitating investments in operational businesses and commercial assets",
    description:
      "We facilitate strategic investments in operational commercial assets, businesses, and enterprise transactions. We assist with acquisitions, mergers, and sales across both Indian and international business corridors.",
    subServices: [
      { label: "Hotels & Hospitality Resorts" },
      { label: "Restaurant Chains & Retail Outlets" },
      { label: "Commercial Buildings & Grade-A Offices" },
      { label: "Logistics Warehouses & Industrial Units" },
      { label: "Running Operational Businesses" },
      { label: "Company Acquisitions & Mergers" },
      { label: "Business Sales & Ownership Transfers" },
    ],
    callout: "We assist with both Indian and international business transactions.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=75&auto=format&fit=crop",
    stat: "Enterprise Scale",
  },
];
