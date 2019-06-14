import { storiesOf } from '@storybook/html';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import '../dist/core-slider';

function createCoreSlider(value, min, max, step, color, vertical, rainbow, disabled) {
  const element = document.createElement('core-slider');
  element.value = number('value', value);
  element.min = number('min', min);
  element.max = number('max', max);
  element.step = number('step', step);
  element.color = text('color', color);
  element.vertical = boolean('vertical', vertical);
  element.rainbow = boolean('rainbow', rainbow);
  element.disabled = boolean('disabled', disabled);
  return element;
}

storiesOf('CoreSlider', module)
  .addDecorator(withKnobs)
  .add('default', () => createCoreSlider(0, 0, 100, 1, '', false, false, false))
  .add('value', () => createCoreSlider(50, 0, 100, 1, '', false, false, false))
  .add('min', () => createCoreSlider(0, 50, 100, 1, '', false, false, false))
  .add('max', () => createCoreSlider(0, 0, 20, 1, '', false, false, false))
  .add('step', () => createCoreSlider(0, 0, 100, 10, '', false, false, false))
  .add('color', () => createCoreSlider(0, 0, 100, 1, 'var(--primary, blue)', false, false, false))
  .add('vertical', () => '<core-slider style="height: 10rem;" vertical></core-slider>')
  .add('rainbow', () => '<core-slider color="red" rainbow></core-slider>')
  .add('disabled', () => '<core-slider disabled></core-slider>');
