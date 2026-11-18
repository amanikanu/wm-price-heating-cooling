import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { business } from '@/content/business';
import { postMeta } from '@/content/posts';
import { testimonials } from '@/content/testimonials';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { EmergencyStrip } from '@/components/EmergencyStrip';
import { TrustBar } from '@/components/TrustBar';
import { ServiceCard } from '@/components/ServiceCard';
import { ReplacementCard } from '@/components/OfferCard';
import { ReviewSummary } from '@/components/ReviewSummary';
import { TestimonialCard } from '@/components/TestimonialCard';
import { PlanComparisonTable } from '@/components/PlanComparisonTable';
import { VideoFacade } from '@/components/VideoFacade';
import { CityGrid } from '@/components/CityGrid';
import { ServiceAreaDiagram } from '@/components/ServiceAreaDiagram';
import { ArticleCard } from '@/components/ArticleCard';
import { CallButton, BookButton } from '@/components/CtaButtons';
import { ShieldIcon, ArrowIcon, PhoneIcon } from '@/components/Icons';

export const metadata: Metadata = pageMetadata('/');

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with 4-image 6s smooth background crossfade */}
      <Hero />

      {/* 2. Emergency Response Strip */}
      <EmergencyStrip />

      {/* 3. Proof & Trust Bar */}
      <TrustBar />

      {/* 4. Our HVAC Services — 6 photographic corporate cards matching reference UI */}
      <section aria-labelledby="services-heading" className="section services-section bg-slate-50">
        <div className="container">
          <div className="section-heading-row mb-10">
            <div>
              <p className="eyebrow">Our HVAC Services</p>
              <h2
                id="services-heading"
                className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              >
                Comprehensive Heating &amp; Cooling Solutions for Your Home
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-slate-600">
              From emergency heating repairs to high-efficiency Carrier central AC installations,
              our certified master technicians keep your home comfortable in every season.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              image="/brand/images/hero-1-furnace.jpg"
              imageAlt="Technician servicing a high-efficiency furnace"
              badge="Heating"
              title="Heating &amp; Furnace Repair"
              description="Reliable furnace diagnostics, heat pump service, boiler repairs, and high-efficiency system replacements."
              href="/residential/#heating"
            />
            <ServiceCard
              image="/brand/images/hero-2-ac.jpg"
              imageAlt="Technician maintaining an outdoor central AC condenser"
              badge="Cooling"
              title="Air Conditioning Repair &amp; Care"
              description="Fast cooling diagnostics, refrigerant leak checks, seasonal tune-ups, and whisper-quiet Carrier AC systems."
              href="/residential/#cooling"
            />
            <ServiceCard
              image="/brand/images/hero-4-install.jpg"
              imageAlt="High-efficiency heat pump and modern equipment installation"
              badge="Hybrid Comfort"
              title="Heat Pumps &amp; Ductless Systems"
              description="Versatile, all-electric year-round heating and cooling engineered for peak Mahoning Valley efficiency."
              href="/residential/heat-pumps/"
            />
            <ServiceCard
              image="/brand/images/service-air.jpg"
              imageAlt="Technician checking whole-home indoor air filtration"
              badge="Clean Air"
              title="Indoor Air Quality &amp; Filtration"
              description="Advanced whole-home air purifiers, high-efficiency filtration, humidifiers, and air duct sanitation."
              href="/residential/indoor-air-quality/"
            />
            <ServiceCard
              image="/brand/images/hero-3-consult.jpg"
              imageAlt="Technician reviewing maintenance plan options with homeowner"
              badge="Protection Plans"
              title="Maintenance Protection Plans"
              description="Proactive semi-annual precision tune-ups, priority emergency scheduling, and 15% repair discounts."
              href="/assurance-and-security-plans/"
            />
            <ServiceCard
              image="/brand/images/family-cozy.jpg"
              imageAlt="Warm comfortable family living room during winter"
              badge="24/7 Dispatch"
              title="24/7 Emergency HVAC Repairs"
              description="Immediate emergency response when temperatures freeze or heatwaves strike. Live dispatchers ready."
              href="/emergency-service/"
            />
          </div>
        </div>
      </section>

      {/* 5. Why Mahoning Valley Trusts Wm. Price — 2-Column Corporate Layout */}
      <section aria-labelledby="why-heading" className="section bg-white border-y border-slate-200">
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow">Why Choose Wm. Price</p>
            <h2
              id="why-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Why Girard &amp; Mahoning Valley Homeowners Rely On Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Founded in 1937, our family-owned philosophy has stayed simple: treat every home like
              our own. We never sell you equipment you don’t need. Our reputation is built on doing
              the job right the first time, backed by factory authorization and master craftsmanship.
            </p>
            <div className="mt-8">
              <Link
                href="/company/"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-700/20 hover:bg-blue-800 transition-all"
              >
                <span>Read Our 85-Year Story</span>
                <ArrowIcon width={16} height={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 transition-all hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <span className="text-xl font-bold">$</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Upfront, Fixed Pricing</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Never an unexpected fee or surprise overtime charge. You see and approve the quote
                before any work begins.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 transition-all hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <span className="text-lg font-bold">24/7</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Fast 24/7 Rapid Response</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Live dispatchers answer day and night. On-call technicians arrive in fully-stocked
                vehicles ready to fix the problem.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 transition-all hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Carrier Factory Authorized</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Carrier President’s Award multi-year winner with technicians trained to the
                highest national standards.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 transition-all hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <span className="text-xl font-bold">★</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">100% Satisfaction Guarantee</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We stand behind our work. If something isn’t right, our team returns to make it
                right at no extra cost.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 6. From the First Call to the Final Handshake (Process) */}
      <section aria-labelledby="process-heading" className="section bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How We Work</p>
            <h2
              id="process-heading"
              className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              From the First Call to the Final Handshake
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              A transparent, stress-free HVAC service experience designed around your comfort and schedule.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Visual with Trust Badges */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200">
                <Image
                  src="/brand/images/service-handshake.jpg"
                  alt="Professional Wm. Price technician greeting and consulting with a homeowner"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Overlays */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2 py-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                    ✓
                  </span>
                  <span>Background-Checked Master Techs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                    ✓
                  </span>
                  <span>Clean Worksite &amp; Shoe Covers</span>
                </div>
              </div>
            </div>

            {/* 4 Step Cards */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
                    01
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">01. Schedule in 60 Seconds</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Book online with instant confirmation or call our 24/7 local dispatch team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">02. Thorough Upfront Diagnostic</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Our certified technician arrives on time in a fully-stocked truck to inspect your system thoroughly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
                    03
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">03. Clear Flat-Rate Options</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      We explain the root cause and provide clear repair vs. replacement options with zero surprise fees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-blue-300">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
                    04
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">04. Master Repair &amp; Clean Walkthrough</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      We execute the fix, test system pressures and airflow, and leave your home as clean as we found it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Key Stats Proof Bar */}
      <section aria-label="Key Performance Metrics" className="border-y border-slate-200 bg-white py-10">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-blue-900 sm:text-4xl">85+</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Years of Craftsmanship
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-blue-900 sm:text-4xl">15,000+</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Systems Kept Comfortable
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-blue-900 sm:text-4xl">A+</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              BBB Accredited Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-blue-900 sm:text-4xl">4.8★</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              250+ Google Reviews
            </div>
          </div>
        </div>
      </section>

      {/* 8. Replacement & Financing Section */}
      <section aria-labelledby="replacement-heading" className="section replacement-section">
        <div className="container">
          <div className="replacement-layout">
            <div className="replacement-intro">
              <p className="eyebrow !text-sky-300">Replacement &amp; financing</p>
              <h2
                id="replacement-heading"
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
              >
                When repair isn’t the answer, we’ll help you plan what’s next.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-white/80">
                Ask about current Carrier rebates and flexible low-monthly financing options when
                you request a free in-home estimate.
              </p>
            </div>
            <ReplacementCard />
          </div>
        </div>
      </section>

      {/* 9. Reviews Section */}
      <section aria-labelledby="reviews-heading" className="section reviews-section bg-slate-50">
        <div className="container">
          <p className="eyebrow">Customer Reviews</p>
          <h2 id="reviews-heading" className="mt-2 text-3xl font-bold text-slate-900">
            A reputation built over 85 years
          </h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
            <ReviewSummary compact />
            <div className="review-note">
              {testimonials.filter((t) => t.approved).map((t) => (
                <TestimonialCard key={t.author} testimonial={t} />
              ))}
              {!testimonials.some((t) => t.approved) && (
                <>
                  <span className="review-quote-mark" aria-hidden="true">
                    ✦
                  </span>
                  <p className="font-serif text-2xl leading-tight text-slate-900 sm:text-3xl">
                    The best service is the kind you can count on when the weather has other plans.
                  </p>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[.14em] text-blue-700">
                    A local standard since {business.founded}
                  </p>
                </>
              )}
            </div>
          </div>
          <Link
            href="/reviews/"
            className="mt-5 inline-flex min-h-[44px] items-center gap-1 font-bold text-blue-700 hover:underline"
          >
            Read more reviews <ArrowIcon width={17} height={17} />
          </Link>
        </div>
      </section>

      {/* 10. Certified, Accredited & Trusted Row */}
      <section aria-labelledby="accredited-heading" className="section bg-white border-y border-slate-200">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Credentials</p>
            <h2 id="accredited-heading" className="mt-2 text-3xl font-bold text-slate-900">
              Certified, Accredited &amp; Trusted in Ohio
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">Carrier Factory Authorized Dealer</h3>
              <p className="mt-1 text-xs text-slate-600">Highest level of dealer expertise and technical certification.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                <span className="text-xl font-bold">★</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">Carrier President’s Award</h3>
              <p className="mt-1 text-xs text-slate-600">Multi-year winner for customer service excellence (2017–present).</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <span className="text-lg font-bold">A+</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">BBB Accredited Business</h3>
              <p className="mt-1 text-xs text-slate-600">Consistently meeting rigorous standards of consumer trust.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-800">
                <span className="text-sm font-bold">LIC</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">NATE &amp; EPA Certified</h3>
              <p className="mt-1 text-xs text-slate-600">Licensed Ohio HVAC Contractor #{business.license} with master technicians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Maintenance Plans Section */}
      <section aria-labelledby="plans-heading" className="section plans-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Maintenance plans</p>
              <h2
                id="plans-heading"
                className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl"
              >
                Plan for comfort before you need it.
              </h2>
            </div>
            <p className="max-w-md leading-7 text-slate-600">
              Assurance and Security, side by side. Choose the level of care that feels right for your home.
            </p>
          </div>
          <div className="mt-6">
            <PlanComparisonTable />
          </div>
        </div>
      </section>

      {/* 12. Video Feature */}
      <section aria-labelledby="video-heading" className="section bg-slate-50">
        <div className="container grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">In the news</p>
            <h2 id="video-heading" className="mt-2 text-3xl font-bold text-slate-900">
              See us on WKBN
            </h2>
            <p className="mt-3 leading-8 text-slate-600">
              Chris shares why proper HVAC design matters. The video loads only when you press play.
            </p>
            <Link
              href="/company/"
              className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-bold text-blue-700 hover:underline"
            >
              More about our team <ArrowIcon width={17} height={17} />
            </Link>
          </div>
          <VideoFacade />
        </div>
      </section>

      {/* 13. Service Area Section */}
      <section aria-labelledby="area-heading" className="section bg-white border-t border-slate-200">
        <div className="container">
          <p className="eyebrow">Service area</p>
          <h2 id="area-heading" className="mt-2 text-3xl font-bold text-slate-900">
            Proudly serving 15 Mahoning Valley towns
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            Based in Girard, Ohio since {business.founded}. Each town has its own dedicated local service page.
          </p>
          <div className="mt-6">
            <CityGrid compact />
          </div>
          <ServiceAreaDiagram />
        </div>
      </section>

      {/* 14. Blog Articles Section */}
      <section aria-labelledby="articles-heading" className="section bg-slate-50 border-t border-slate-200">
        <div className="container">
          <p className="eyebrow">From the blog</p>
          <h2 id="articles-heading" className="mt-2 text-3xl font-bold text-slate-900">
            Latest articles from our heating &amp; cooling team
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {postMeta.slice(0, 3).map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Link
            href="/news/"
            className="mt-6 inline-flex min-h-[44px] items-center gap-1 font-bold text-blue-700 hover:underline"
          >
            Read more news <ArrowIcon width={17} height={17} />
          </Link>
        </div>
      </section>

      {/* 15. Final CTA Banner matching reference UI */}
      <section
        aria-labelledby="final-cta-heading"
        className="final-cta-section relative overflow-hidden bg-slate-950 py-16 text-white"
      >
        <div className="container relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available 24/7 For Emergency Help</span>
            </div>
            <h2
              id="final-cta-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Ready to fix your heating or cooling today?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Don’t spend another day dealing with uncomfortable temperatures. Our master technicians
              are ready to restore reliable comfort to your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookButton className="!bg-blue-600 hover:!bg-blue-500 !text-white !font-bold !min-h-[52px] !px-8 text-base shadow-lg shadow-blue-600/30" />
              <CallButton
                light
                className="!border-2 !border-white/20 !bg-white/10 !text-white hover:!bg-white/20 !min-h-[52px] !px-7 text-base backdrop-blur-sm"
              />
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {business.hours.emergency} · {business.hours.office}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-md shadow-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src="/brand/images/family-cozy.jpg"
                alt="Cozy, comfortable family in a warm home"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-slate-300">
              <span>Mahoning Valley’s Trusted HVAC Team</span>
              <span className="text-amber-400">★★★★★ 4.8 Rating</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
