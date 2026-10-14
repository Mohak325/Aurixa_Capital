// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Phone, EnvelopeSimple, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import { PHONES, SITE, SOCIAL, NAV_LINKS } from "@/lib/constants";
import { Divider } from "@/components/ui/Divider";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="bg-transparent text-[var(--color-stone-400)] relative z-[2] border-t border-[var(--hairline)]"
      aria-label="Site footer"
    >
      {/* Skyline silhouette divider */}
      <div className="w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
          style={{ opacity: 0.12 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 L0 55 L20 55 L20 40 L30 40 L30 30 L40 30 L40 40 L50 40 L50 20 L60 20 L60 10 L70 10 L70 20 L80 20 L80 40 L100 40 L100 25 L110 25 L110 10 L120 10 L120 0 L130 0 L130 10 L140 10 L140 25 L150 25 L150 40 L170 40 L170 30 L185 30 L185 15 L195 15 L195 30 L210 30 L210 45 L230 45 L230 30 L245 30 L245 18 L258 18 L258 30 L270 30 L270 45 L290 45 L290 35 L305 35 L305 20 L320 20 L320 35 L335 35 L335 50 L360 50 L360 38 L375 38 L375 22 L390 22 L390 38 L405 38 L405 50 L430 50 L430 35 L450 35 L450 20 L465 20 L465 8 L478 8 L478 20 L490 20 L490 35 L510 35 L510 50 L540 50 L540 38 L558 38 L558 25 L572 25 L572 38 L585 38 L585 50 L610 50 L610 40 L628 40 L628 28 L642 28 L642 40 L655 40 L655 52 L680 52 L680 40 L698 40 L698 25 L714 25 L714 40 L728 40 L728 52 L752 52 L752 38 L768 38 L768 20 L782 20 L782 8 L795 8 L795 20 L808 20 L808 38 L825 38 L825 52 L848 52 L848 40 L865 40 L865 55 L888 55 L888 42 L905 42 L905 28 L920 28 L920 42 L935 42 L935 55 L960 55 L960 45 L978 45 L978 30 L995 30 L995 18 L1010 18 L1010 30 L1025 30 L1025 45 L1048 45 L1048 55 L1070 55 L1070 42 L1088 42 L1088 28 L1105 28 L1105 42 L1120 42 L1120 55 L1145 55 L1145 45 L1162 45 L1162 32 L1178 32 L1178 45 L1192 45 L1192 58 L1215 58 L1215 48 L1232 48 L1232 35 L1248 35 L1248 48 L1262 48 L1262 58 L1285 58 L1285 50 L1300 50 L1300 38 L1315 38 L1315 50 L1330 50 L1330 58 L1360 58 L1360 65 L1380 65 L1380 72 L1400 72 L1400 75 L1440 75 L1440 80 Z"
            fill="#C9A24D"
          />
        </svg>
      </div>

      <div className="container-au py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="33"
                viewBox="0 0 32 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 1L2 7v12c0 8.284 5.716 16.02 14 18C24.284 35.02 30 27.284 30 19V7L16 1Z"
                  stroke="#C9A24D"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8 L10 14 L14 18 L11 22 L16 28 L21 22 L18 18 L22 14 Z"
                  stroke="#E6C98A"
                  strokeWidth="1"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display font-light text-[1rem] text-[var(--color-ivory-50)] tracking-[0.08em] uppercase">
                Aurixia <span className="text-[var(--color-gold-300)]">Capital</span>
              </span>
            </div>

            <p className="font-body text-[0.875rem] leading-relaxed max-ch-40 text-[#D8D1C2]">
              {SITE.tagline}
            </p>
            <p className="font-body text-[0.8125rem] text-[var(--color-gold-300)] font-medium italic">
              &ldquo;Your Trust. Our Expertise. Your Wealth. Our Commitment.&rdquo;
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[var(--hairline)] rounded-full hover:border-[var(--hairline-strong)] text-[#D8D1C2] hover:text-[var(--color-gold-300)] bg-[#14110C] transition-all duration-200"
                aria-label="Aurixa Capital on Instagram"
              >
                <InstagramLogo size={14} weight="light" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[var(--hairline)] rounded-full hover:border-[var(--hairline-strong)] text-[#D8D1C2] hover:text-[var(--color-gold-300)] bg-[#14110C] transition-all duration-200"
                aria-label="Aurixa Capital on Facebook"
              >
                <FacebookLogo size={14} weight="light" />
              </a>
            </div>
          </div>

          {/* ── Quick links ── */}
          <nav aria-label="Footer navigation">
            <p className="font-body text-[0.75rem] text-[var(--color-gold-300)] uppercase tracking-[0.18em] mb-5 font-semibold">
              Navigation
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-[0.875rem] text-[#C2BAAB] hover:text-[var(--color-gold-300)] transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact ── */}
          <div>
            <p className="font-body text-[0.75rem] text-[var(--color-gold-300)] uppercase tracking-[0.18em] mb-5 font-semibold">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              {PHONES.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex items-center gap-2.5 font-body text-[0.875rem] text-[#C2BAAB] hover:text-[var(--color-gold-300)] transition-colors duration-200"
                  aria-label={`Call ${phone.label} number: ${phone.number}`}
                >
                  <Phone size={13} weight="light" aria-hidden="true" className="text-[var(--color-gold-400)] flex-shrink-0" />
                  {phone.number}
                </a>
              ))}
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 font-body text-[0.875rem] text-[#C2BAAB] hover:text-[var(--color-gold-300)] transition-colors duration-200"
                aria-label="Email Aurixa Capital"
              >
                <EnvelopeSimple size={13} weight="light" aria-hidden="true" className="text-[var(--color-gold-400)] flex-shrink-0" />
                {SITE.email}
              </a>
              <a
                href={SITE.url}
                className="font-body text-[0.875rem] text-[#C2BAAB] hover:text-[var(--color-gold-300)] transition-colors duration-200"
              >
                {SITE.url.replace("https://", "")}
              </a>
            </div>
          </div>
        </div>

        {/* ── Disclaimer & legal bar ── */}
        <Divider type="hairline" className="mt-14 mb-8" />

        <p className="font-body text-[0.75rem] text-[#9E9585] leading-relaxed mb-6 max-ch-62">
          Aurixa Capital provides investment advisory and property management services. Investment in real estate
          and financial instruments involves risk. Past performance is not indicative of future results.
          All information provided is for informational purposes only and does not constitute financial advice.
          Please consult with a qualified financial advisor before making any investment decisions.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-body text-[0.75rem] text-[#8E8575]">
            © {year} Aurixa Capital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-body text-[0.75rem] text-[#8E8575] hover:text-[#D8D1C2] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-[0.75rem] text-[#8E8575] hover:text-[#D8D1C2] transition-colors duration-200"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
