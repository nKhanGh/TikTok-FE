import { pages } from './Page';
import { Suspense } from 'react';
import PrivateRoute from './PrivateRoute';

const withSuspense = (element) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
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
