declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const meta: import('@/content/types').PostMeta;
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
