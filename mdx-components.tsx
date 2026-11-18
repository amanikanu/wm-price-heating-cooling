import type { MDXComponents } from 'mdx/types';

/** Shared MDX component map for the migrated blog (PRD 16.2). */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <a {...props} className="text-brand underline underline-offset-2 hover:no-underline" />,
    h2: (props) => <h2 {...props} className="mt-10 mb-3 font-bold text-2xl text-brand-dark" />,
    h3: (props) => <h3 {...props} className="mt-8 mb-2 font-bold text-xl text-brand-dark" />,
    p: (props) => <p {...props} className="my-4 leading-7 text-ink" />,
    ul: (props) => <ul {...props} className="my-4 list-disc space-y-2 pl-6 text-ink" />,
    ol: (props) => <ol {...props} className="my-4 list-decimal space-y-2 pl-6 text-ink" />,
    strong: (props) => <strong {...props} className="font-bold text-brand-dark" />,
    ...components,
  };
}
