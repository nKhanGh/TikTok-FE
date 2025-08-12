import Home from '../pages/home';
import Following from '../pages/following';

export const AppRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/following',
    element: <Following />
  }
];
