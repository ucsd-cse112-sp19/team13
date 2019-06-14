import { storiesOf } from '@storybook/html';

import welcome from './welcome.html';

storiesOf('Beginner\'s Guide', module)
  .add('Welcome', () => welcome);
