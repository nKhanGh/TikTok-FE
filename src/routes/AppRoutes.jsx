import { Suspense } from 'react';
import PrivateRoute from './PrivateRoute';
import { pages } from './Page';

const withSuspense = (el) => (
  <Suspense fallback={<div>Loading...</div>}>{el}</Suspense>
);

export const AppRoutes = pages.map(
  ({ path, component: Component, isPrivate }) => ({
    path,
    element: isPrivate
      ? withSuspense(
          <PrivateRoute>
            <Component />
          </PrivateRoute>,
        )
      : withSuspense(<Component />),
  }),
);
