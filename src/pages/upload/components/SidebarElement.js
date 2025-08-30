import {
  faComments,
  faEnvelope,
  faFile,
  faHome,
  faLightbulb,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import { faArrowUpRightDots, faMusic } from '@fortawesome/free-solid-svg-icons';

export const sidebarElements = [
  {
    name: 'MANAGE',
    elements: [
      { icon: faHome, content: 'Home' },
      { icon: faFile, content: 'Post' },
      { icon: faArrowUpRightDots, content: 'Analystics' },
      { icon: faComments, content: 'Comments' },
    ],
  },
  {
    name: 'TOOLS',
    elements: [
      { icon: faLightbulb, content: 'Inspiration' },
      { icon: faStar, content: 'Create Academy' },
      { icon: faMusic, content: 'Unlimited Sounds' },
    ],
  },
  {
    name: 'OTHERS',
    elements: [{ icon: faEnvelope, content: 'Feedback' }],
  },
];
