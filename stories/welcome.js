import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
//import { withLinks } from '@storybook/addon-links';

import welcome from './welcome.html';

storiesOf('Beginner\'s Guide', module)
  //.addDecorator(withLinks)
  .add('Welcome', () => welcome);
