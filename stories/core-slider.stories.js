import { storiesOf } from '@storybook/html';
import '../dist/core-slider';

storiesOf('Core Slider', module)
  .add('default', () => '<core-slider></core-slider>')
  .add('value', () => '<core-slider value="50"></core-slider>')
  .add('disabled', () => '<core-slider disabled></core-slider>')
  .add('min', () => '<core-slider min="10"></core-slider>')
  .add('max', () => '<core-slider max="20"></core-slider>')
  .add('step', () => '<core-slider step="10" value="50"></core-slider>')
  .add('vertical', () => '<div style="height: 10rem;"><core-slider vertical></core-slider></div>')
  .add('rainbow', () => '<core-slider rainbow></core-slider>')
  .add('color', () => '<core-slider color="var(--primary, blue)"></core-slider>');
