import type { Metadata } from 'next';
import Link from 'next/link';
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
import { ShieldIcon, ArrowIcon } from '@/components/Icons';

export const metadata: Metadata = pageMetadata('/');

export default function HomePage() {
  return (
    <>
      <Hero />
      <EmergencyStrip />
      <TrustBar />

      <section aria-labelledby="services-heading" className="section services-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">The right place to start</p>
              <h2 id="services-heading" className="mt-2 max-w-xl text-3xl font-bold text-brand-dark sm:text-4xl">Comfort problems have a way of becoming urgent.</h2>
            </div>
            <p className="max-w-md leading-7 text-muted">Whether your system needs a quick fix, a thoughtful replacement, or better air, our team can help you find the next right step.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard icon="heat" title="Heating" description="Furnaces, boilers, oil furnaces and heat pumps." href="/residential/#heating" />
            <ServiceCard icon="cool" title="Cooling" description="Air conditioning, ductless and zone control systems." href="/residential/#cooling" />
            <ServiceCard icon="air" title="Indoor Air Quality" description="Filtration and air duct services for your home." href="/residential/indoor-air-quality/" />
            <ServiceCard icon="plan" title="Maintenance" description="Compare the Assurance and Security plans." href="/assurance-and-security-plans/" />
          </div>
        </div>
      </section>

      <section aria-labelledby="replacement-heading" className="section replacement-section">
        <div className="container">
          <div className="replacement-layout">
            <div className="replacement-intro">
              <p className="eyebrow !text-[#ffdf5e]">Replacement &amp; financing</p>
              <h2 id="replacement-heading" className="mt-3 text-3xl font-bold text-white sm:text-4xl">When repair isn’t the answer, we’ll help you plan what’s next.</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/70">Ask about current Carrier rebates and financing options when you request an estimate.</p>
            </div>
            <ReplacementCard />
          </div>
        </div>
      </section>

      <section aria-labelledby="reviews-heading" className="section reviews-section bg-surface">
        <div className="container">
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-heading" className="mt-2 text-3xl font-bold text-brand-dark">A reputation built over time</h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
            <ReviewSummary compact />
            <div className="review-note">
              {testimonials.filter((t) => t.approved).map((t) => <TestimonialCard key={t.author} testimonial={t} />)}
              {!testimonials.some((t) => t.approved) && <>
                <span className="review-quote-mark" aria-hidden="true">✦</span>
                <p className="font-serif text-2xl leading-tight text-brand-dark sm:text-3xl">The best service is the kind you can count on when the weather has other plans.</p>
                <p className="mt-5 text-sm font-bold uppercase tracking-[.14em] text-brand">A local standard since {business.founded}</p>
              </>}
            </div>
          </div>
          <Link href="/reviews/" className="mt-5 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">Read more reviews <ArrowIcon width={17} height={17} /></Link>
        </div>
      </section>

      <section aria-labelledby="plans-heading" className="section plans-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Maintenance plans</p>
              <h2 id="plans-heading" className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">Plan for comfort before you need it.</h2>
            </div>
            <p className="max-w-md leading-7 text-muted">Assurance and Security, side by side. Choose the level of care that feels right for your home.</p>
          </div>
          <div className="mt-6"><PlanComparisonTable /></div>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="section bg-surface">
        <div className="container">
          <p className="eyebrow">Why choose us</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold text-brand-dark">Why Mahoning Valley homeowners choose us</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              { title: 'Safety and Security', body: 'We go above and beyond to create a secure environment, providing you with the confidence you deserve in every service we offer.' },
              { title: 'We Hire the Best', body: 'Excellence is non-negotiable. Our team is composed of industry-leading professionals, meticulously selected for their expertise and dedication.' },
              { title: 'Well Prepared', body: 'Preparation is key to success. Trust in our meticulous preparation to deliver superior results, every time.' },
            ].map((item) => (
              <article key={item.title} className="card p-6">
                <ShieldIcon className="text-brand" />
                <h3 className="mt-3 text-lg font-bold text-brand-dark">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="video-heading" className="section">
        <div className="container grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">In the news</p>
            <h2 id="video-heading" className="mt-2 text-3xl font-bold text-brand-dark">See us on WKBN</h2>
            <p className="mt-3 leading-8 text-muted">Chris shares why proper HVAC design matters. The video loads only when you press play.</p>
            <Link href="/company/" className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">More about our team <ArrowIcon width={17} height={17} /></Link>
          </div>
          <VideoFacade />
        </div>
      </section>

      <section aria-labelledby="area-heading" className="section bg-surface">
        <div className="container">
          <p className="eyebrow">Service area</p>
          <h2 id="area-heading" className="mt-2 text-3xl font-bold text-brand-dark">Proudly serving 15 Mahoning Valley towns</h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">Based in Girard, Ohio since {business.founded}. Each town has its own page.</p>
          <div className="mt-6"><CityGrid compact /></div>
          <ServiceAreaDiagram />
        </div>
      </section>

      <section aria-labelledby="articles-heading" className="section">
        <div className="container">
          <p className="eyebrow">From the blog</p>
          <h2 id="articles-heading" className="mt-2 text-3xl font-bold text-brand-dark">Latest articles</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {postMeta.slice(0, 3).map((post) => <ArticleCard key={post.slug} post={post} />)}
          </div>
          <Link href="/news/" className="mt-6 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">Read more news <ArrowIcon width={17} height={17} /></Link>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="final-cta-section bg-brand-dark py-12 text-white">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow !text-[#ffdf5e]">Your next step</p>
            <h2 id="final-cta-heading" className="mt-2 text-3xl font-bold">Let’s get your home comfortable again.</h2>
            <p className="mt-2 text-white/70">{business.hours.emergency} · {business.hours.office}</p>
          </div>
          <div className="flex flex-wrap gap-3"><CallButton light /><BookButton light /></div>
        </div>
      </section>
    </>
  );
}
