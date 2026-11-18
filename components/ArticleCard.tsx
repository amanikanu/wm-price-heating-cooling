import Link from 'next/link';
import type { PostMeta } from '@/content/types';
import { ArrowIcon } from './Icons';

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="card flex flex-col p-5">
      <time dateTime={post.date} className="text-sm font-medium text-brand">{formatDate(post.date)}</time>
      <h3 className="mt-2 text-lg font-bold leading-6 text-brand-dark">
        <Link href={`/${post.slug}/`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="mt-2 flex-1 text-[0.94rem] leading-6 text-muted">{post.description}</p>
      <Link href={`/${post.slug}/`} className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">
        Read article <ArrowIcon width={17} height={17} />
      </Link>
    </article>
  );
}
