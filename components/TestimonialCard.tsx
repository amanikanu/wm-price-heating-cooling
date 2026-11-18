import type { Testimonial } from '@/content/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.approved) return null;
  return (
    <blockquote className="card p-5">
      <p className="text-[0.97rem] leading-7 text-ink">“{testimonial.quote}”</p>
      <footer className="mt-3 text-sm font-bold text-brand-dark">— {testimonial.author}</footer>
    </blockquote>
  );
}
