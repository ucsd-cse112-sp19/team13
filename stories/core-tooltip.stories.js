import { storiesOf } from '@storybook/html';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import '../dist/core-tooltip';

function createCoreTooltip(content, openDelay, closeDelay, placement,
  focusable, forID, offset, effect, noVisibleArrow, manual, disabled) {
  const element = document.createElement('core-tooltip');
  element.content = text('content', content);
  element.openDelay = number('open-delay', openDelay);
  element.closeDelay = number('close-delay', closeDelay);
  element.placement = text('placement', placement);
  element.focusable = boolean('focusable', focusable);
  if (forID) {
    element.for = text('for', forID);
  }
  element.offset = number('offset', offset);
  element.effect = text('effect', effect);
  element.noVisibleArrow = text('no-visible-arrow', noVisibleArrow);
  element.manual = boolean('manual', manual);
  element.disabled = boolean('disabled', disabled);

  const parent = document.createElement('label');
  parent.style.display = 'inline-block';
  parent.style.marginTop = '4rem';
  parent.style.marginLeft = '4rem';
  parent.textContent = 'Text';
  parent.appendChild(element);
  return parent;
}

storiesOf('CoreTooltip', module)
  .addDecorator(withKnobs)
  .add('default', () => createCoreTooltip('Boo!', 0, 1000, 'top', false, '', 0, '', false, false, false))
  .add('content', () => createCoreTooltip('A tooltip description', 0, 1000, 'top', false, '', 0, '', false, false, false))
  .add('open-delay', () => createCoreTooltip('Hello!', 1000, 1000, 'top', false, '', 0, '', false, false, false))
  .add('close-delay', () => createCoreTooltip('Hello!', 0, 0, 'top', false, '', 0, '', false, false, false))
  .add('placement="left"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip placement="left">Hello!</core-toolip></a>')
  .add('placement="right"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip placement="right">Hello!</core-toolip></a>')
  .add('placement="top"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip placement="top">Hello!</core-toolip></a>')
  .add('placement="bottom"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip placement="bottom">Hello!</core-toolip></a>')
  .add('focusable', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;"><input type="text" id="text-input"/><core-tooltip for="text-input" focusable>Hello!</core-tooltip></a>')
  .add('for', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;"><input type="text" id="text-input"/><core-tooltip for="text-input" focusable>Hello!</core-tooltip></a>')
  .add('offset', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 10, '', false, false, false))
  .add('no-visible-arrow', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip no-visible-arrow>Hello!</core-toolip></a>')
  .add('disabled', () => createCoreTooltip('You will never see me!', 0, 0, 'bottom', false, '', 0, '', false, false, true))
  .add('manual', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip manual>Hello!</core-tooltip></a><button onclick="document.querySelector(\'core-tooltip\').toggle()">Toggle tooltip</button>')
  .add('effect="light"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip effect="light">Hello!</core-toolip></a>')
  .add('effect="dark"', () => '<a style="display: inline-block; margin-left: 4rem; margin-top: 4rem;">Some Text<core-tooltip effect="dark">Hello!</core-toolip></a>');
