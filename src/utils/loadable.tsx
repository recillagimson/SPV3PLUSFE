import React, { lazy, Suspense } from 'react';
import Loading from 'app/components/Loading';

interface Opts {
  fallback: React.ReactNode;
}
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

export const lazyLoad = <
  T extends Promise<any>,
  U extends React.ComponentType<any>
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: <Loading position="fixed" big /> },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={opts.fallback!}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
