'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { business } from '@/content/business';
import { CallButton, BookButton } from './CtaButtons';
import { ShieldIcon, PhoneIcon } from './Icons';

interface Slide {
  src: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
}

const SLIDES: Slide[] = [
  {
    src: '/brand/images/hero-1-furnace.jpg',
    alt: 'Wm. Price certified master technician performing precision furnace diagnostics',
    tag: 'Heating & Furnace Specialists',
    title: 'Precision Diagnostics & Furnace Repair',
    caption: 'Factory-trained technicians pinpoint issues fast with upfront, flat-rate pricing.',
  },
  {
    src: '/brand/images/hero-2-ac.jpg',
    alt: 'Certified HVAC technician servicing an outdoor central AC and heat pump condenser',
    tag: 'Carrier Factory Authorized',
    title: 'High-Efficiency Cooling & Heat Pumps',
    caption: 'Peak efficiency tune-ups and multi-year Carrier President’s Award craftsmanship.',
  },
  {
    src: '/brand/images/hero-3-consult.jpg',
    alt: 'Friendly professional HVAC technician consulting with homeowners using a digital tablet',
    tag: 'Transparent Upfront Quotes',
    title: 'Honest Guidance with Zero Sales Pressure',
    caption: 'Clear repair vs. replacement options with fixed pricing before any work starts.',
  },
  {
    src: '/brand/images/hero-4-install.jpg',
    alt: 'Expert HVAC technician fine-tuning modern high-efficiency HVAC equipment and controls',
    tag: 'Master Craftsmanship Since 1937',
    title: 'Precision Equipment & Clean Installations',
    caption: 'Installed to strict manufacturer specs and backed by our complete warranty.',
  },
];

const ROTATION_INTERVAL = 6000; // 6 seconds per slide as requested

/**
 * Modern Corporate Hero — matches high-end HVAC enterprise reference UI.
 * Features a professional 4-image background crossfade rotating every 6 seconds,
 * accessible slide controls, 6-second progress indicators, and WCAG AAA contrast overlays.
 */
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // 6-second interval rotation
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, ROTATION_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentSlide]);

  return (
    <section
      aria-label="Welcome to Wm. Price Heating & Cooling"
      className="relative min-h-[640px] overflow-hidden bg-slate-950 text-white lg:min-h-[720px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with 6-second Smooth Crossfade */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Sophisticated Corporate Gradient Overlays for Razor-Sharp Readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div
          className="absolute inset-0 z-20 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 25%, rgba(56, 189, 248, 0.25), transparent 45%)',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-30 grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-24">
        {/* Left Column: Authoritative Corporate Value Proposition */}
        <div className="flex flex-col items-start">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span>Mahoning &amp; Trumbull County · Since {business.founded}</span>
          </div>

          {/* Primary High-Impact Headline */}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:leading-[1.1]">
            Heat or AC Acting Up?{' '}
            <span className="block text-white">We’ll Fix It Right —</span>
            <span className="mt-1 block text-sky-400 drop-shadow-sm">The First Time.</span>
          </h1>

          {/* Reassuring Corporate Subheadline */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8">
            Fast diagnostics, upfront flat-rate pricing, and master-certified technicians who treat
            your home with care. Proudly keeping Mahoning Valley families comfortable 24/7/365.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            <BookButton
              className="!bg-blue-600 hover:!bg-blue-500 !text-white !font-bold !shadow-lg !shadow-blue-600/30 !min-h-[52px] !px-7 text-base w-full sm:w-auto transition-all"
            />
            <CallButton
              light
              className="!border-2 !border-white/25 !bg-white/10 !text-white hover:!bg-white/20 !backdrop-blur-sm !min-h-[52px] !px-6 text-base w-full sm:w-auto transition-all"
            />
          </div>

          {/* Trust Snippet / Hours */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300/80">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {business.hours.emergency}
            </span>
            <span className="hidden text-slate-500 sm:inline">|</span>
            <span>Office: {business.hours.office}</span>
          </div>

          {/* Credibility & Google Reviews Proof Row */}
          <div className="mt-10 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-400">
                <span className="text-base font-bold text-white">{business.google.rating}</span>
                <span className="text-sm">★★★★★</span>
              </div>
              <span className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {business.google.reviewCount}+ Google Reviews
              </span>
            </div>

            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-base font-bold text-white">{business.towns.length} Towns</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                Mahoning Valley
              </span>
            </div>

            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-base font-bold text-white">Carrier</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                Factory Authorized
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 4-Slide Corporate Showcase & Carousel Controls */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 p-6 backdrop-blur-xl shadow-2xl">
            {/* Header: Slide Counter & Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShieldIcon className="h-5 w-5 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  {SLIDES[currentSlide].tag}
                </span>
              </div>
              <div className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-white/80">
                0{currentSlide + 1} / 0{SLIDES.length}
              </div>
            </div>

            {/* Active Slide Feature Details */}
            <div className="py-5">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {SLIDES[currentSlide].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {SLIDES[currentSlide].caption}
              </p>
            </div>

            {/* 6-Second Segmented Progress Indicators */}
            <div className="mt-2 grid grid-cols-4 gap-2">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.tag}
                    onClick={() => goToSlide(idx)}
                    className="group flex flex-col gap-1.5 text-left focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      {isActive && (
                        <div
                          key={`progress-${currentSlide}-${isPaused}`}
                          className={`h-full rounded-full bg-sky-400 ${
                            isPaused ? 'w-full' : 'animate-progress'
                          }`}
                          style={{
                            animationDuration: `${ROTATION_INTERVAL}ms`,
                            animationTimingFunction: 'linear',
                          }}
                        />
                      )}
                      {!isActive && (
                        <div
                          className={`h-full w-full rounded-full transition-opacity ${
                            idx < currentSlide ? 'bg-white/40' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-semibold transition-colors ${
                        isActive ? 'text-sky-300' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Corporate Value Checklist */}
            <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Upfront flat-rate pricing — no surprise overtime fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Fully stocked service vehicles for immediate single-trip repairs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Satisfaction Guarantee on all parts and labor</span>
              </div>
            </div>

            {/* Live Dispatch Badge */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-950/70 p-3 border border-blue-500/30">
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">
                  Emergency Dispatch: <strong className="text-white">{business.phoneDisplay}</strong>
                </span>
              </div>
              <span className="rounded-md bg-sky-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                24/7 Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
