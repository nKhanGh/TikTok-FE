import Activity from '../pages/activity/Activity';
import Explore from '../pages/explore/Explore';
import Following from '../pages/following/Following';
import ForYou from '../pages/forYou/ForYou';
import Friend from '../pages/friend/Friend';
import Message from '../pages/message/Message';
import Profile from '../pages/profile/Profile';
import Upload from '../pages/upload/Upload';

export const AppRoutes = [
  {
    path: '/',
    element: <ForYou />
  },
  {
    path: '/following',
    element: <Following />
  },
  {
    path: '/activity',
    element: <Activity />
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/friends',
    element: <Friend />
  },
  {
    path: '/messages',
    element: <Message />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/upload',
    element: <Upload />
  }
];
