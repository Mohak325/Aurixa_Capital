// src/data/destinations.ts
// Authentic global destination data directly sourced from Aurixia Capital Company Brochure (Page 7)

export interface Destination {
  id: string;
  number: string;
  city: string;
  country: string;
  region: string;
  description: string;
  detail: string;
  highlights: string[];
  guidance: string[];
  coords: { lat: number; lng: number }; // For Three.js globe orientation
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "dubai",
    number: "01",
    city: "Dubai",
    country: "UAE",
    region: "Middle East Wealth Corridor",
    description: "100% Freehold Ownership · Zero Tax · Golden Visa",
    detail:
      "Dubai's freehold property market offers 100% foreign ownership, zero capital gains and rental income tax, world-class rental yields, and 10-year Golden Visa eligibility for property investments above AED 2M.",
    highlights: [
      "100% Foreign Ownership in Freehold Zones",
      "0% Tax on Capital Gains & Rental Income",
      "10-Year Golden Visa for AED 2M+ Purchases",
      "High Consistent Dollar-Pegged Rental Yields",
    ],
    guidance: [
      "Luxury Downtown & Marina Apartments",
      "Prime Off-Plan & Ready Freehold Assets",
      "Commercial Offices & Retail Spaces",
      "Holiday Homes & Managed Rentals",
    ],
    coords: { lat: 25.2048, lng: 55.2708 },
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=75&auto=format&fit=crop",
  },
  {
    id: "london",
    number: "02",
    city: "London & Europe",
    country: "Europe",
    region: "European Core Gateway",
    description: "Capital Preservation · Blue-Chip Stability",
    detail:
      "Prime Central London and European financial capitals offer unmatched multi-generational wealth preservation, stable long-term capital appreciation, and strong institutional liquidity under established rule of law.",
    highlights: [
      "Blue-Chip Multi-Generational Asset Security",
      "Stable Currency Hedge in GBP & EUR",
      "Transparent Legal & Conveyancing Systems",
      "High Institutional Global Liquidity",
    ],
    guidance: [
      "Prime Central London Residential",
      "Grade-A European Commercial Real Estate",
      "Investment Apartments & Townhouses",
      "Cross-Border Estate & Tax Advisory",
    ],
    coords: { lat: 51.5074, lng: -0.1278 },
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=75&auto=format&fit=crop",
  },
  {
    id: "singapore",
    number: "03",
    city: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific Financial Gateway",
    description: "Asia's Premier Wealth Hub · Sovereign Stability",
    detail:
      "Singapore's transparent legal framework, robust political stability, and preeminent standing as Asia's primary financial capital make it a vital cornerstone for sovereign wealth and high-net-worth portfolio diversification.",
    highlights: [
      "Triple-A (AAA) Sovereign Credit Rating",
      "World's Foremost Wealth Management Hub",
      "Transparent Corporate & Property Regulations",
      "Strategic Gateway to High-Growth Asia",
    ],
    guidance: [
      "Prime Luxury Condominiums",
      "Commercial Shophouses & Strata Offices",
      "High-Yield Institutional Real Estate",
      "Family Office & Asset Structuring",
    ],
    coords: { lat: 1.3521, lng: 103.8198 },
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=75&auto=format&fit=crop",
  },
  {
    id: "kuala-lumpur",
    number: "04",
    city: "Kuala Lumpur",
    country: "Malaysia",
    region: "Southeast Asia High-Yield Corridor",
    description: "High Rental Returns · MM2H Long-Term Visa",
    detail:
      "Malaysia represents one of the highest-yielding international property markets in Asia, featuring accessible luxury entry valuations in Kuala Lumpur, strong tourist tenancy, and long-term residency via the MM2H program.",
    highlights: [
      "One of Asia's Highest Rental Yield Rates",
      "MM2H (Malaysia My Second Home) Residency",
      "Accessible Entry Valuations in Prime KL",
      "Foreign Freehold Ownership Rights",
    ],
    guidance: [
      "Prime City-Center Serviced Apartments",
      "Holiday Homes in Penang & Langkawi",
      "Commercial Retail & Mixed-Use Units",
      "Retirement & Vacation Living Portfolios",
    ],
    coords: { lat: 3.1390, lng: 101.6869 },
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&q=75&auto=format&fit=crop",
  },
  {
    id: "india",
    number: "05",
    city: "Mumbai · Bangalore · Delhi",
    country: "India",
    region: "Foundational Domestic Market",
    description: "Deep Developer Relations · Off-Market Access",
    detail:
      "Our home market and core foundation. We leverage 20+ years of local expertise, deep developer relationships, and off-market access to deliver verified litigation-free investment opportunities across India's tier-1 economic corridors.",
    highlights: [
      "Direct Tier-1 Developer Off-Market Pricing",
      "100% Litigation-Free Title Verification",
      "End-to-End Rental Leasing & Property Care",
      "Coverage Across Mumbai, Bengaluru & Delhi NCR",
    ],
    guidance: [
      "Pre-Launch & Ready Residential Assets",
      "Commercial Grade-A Office Floors",
      "Industrial Warehouses & Commercial Plots",
      "Corporate Real Estate & Business Assets",
    ],
    coords: { lat: 20.5937, lng: 78.9629 },
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=900&q=75&auto=format&fit=crop",
  },
];
