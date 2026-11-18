'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business } from '@/content/business';
import { PlayIcon } from './Icons';

/** F11: no iframe or third-party script until the visitor clicks (LCP protection). */
export function VideoFacade() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-brand-dark">
      {playing ? (
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${business.video.youtubeId}?autoplay=1`}
          title={business.video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group flex aspect-video w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#00305e] to-[#0a5fae] p-6 text-center text-white"
          aria-label={`Play video: ${business.video.title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 transition group-hover:scale-105">
            <PlayIcon width={34} height={34} />
          </span>
          <span className="text-xl font-bold sm:text-2xl">Chris Shares Why Proper HVAC Design Matters</span>
          <span className="text-sm text-white/80">Watch our WKBN feature · click to play</span>
        </button>
      )}
      <p className="bg-white p-4 text-sm text-muted">
        <Link href={business.video.articleUrl} rel="noopener noreferrer" target="_blank" className="font-semibold text-brand underline underline-offset-2">
          Read the WKBN feature article
        </Link>
      </p>
    </div>
  );
}
