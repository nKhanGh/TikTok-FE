import { lazy } from 'react';

export const pages = [
  {
    path: '/',
    component: lazy(() => import('../pages/forYou/ForYou')),
    isPrivate: false,
  },
  {
    path: '/following',
    component: lazy(() => import('../pages/following/Following')),
    isPrivate: true,
  },
  {
    path: '/activity',
    component: lazy(() => import('../pages/activity/Activity')),
    isPrivate: true,
  },
  {
    path: '/explore',
    component: lazy(() => import('../pages/explore/Explore')),
    isPrivate: false,
  },
  {
    path: '/friends',
    component: lazy(() => import('../pages/friend/Friend')),
    isPrivate: true,
  },
  {
    path: '/messages',
    component: lazy(() => import('../pages/message/Message')),
    isPrivate: true,
  },
  {
    path: `/:username`,
    component: lazy(() => import('../pages/profile/Profile')),
    isPrivate: false,
  },
  {
    path: '/upload',
    component: lazy(() => import('../pages/upload/Upload')),
    isPrivate: true,
  },
  {
    path: '/auth/callback',
    component: lazy(() => import('../pages/authCallBack/AuthCallBack')),
    isPrivate: false,
  },
];
