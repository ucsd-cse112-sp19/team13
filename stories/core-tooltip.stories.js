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
  .add('placement="left"', () => createCoreTooltip('Hello!', 0, 0, 'left', false, '', 0, '', false, false, false))
  .add('placement="right"', () => createCoreTooltip('Hello!', 0, 0, 'right', false, '', 0, '', false, false, false))
  .add('placement="top"', () => createCoreTooltip('Hello!', 0, 0, 'top', false, '', 0, '', false, false, false))
  .add('placement="bottom"', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 0, '', false, false, false))
  .add('focusable', () => {
    const element = createCoreTooltip('Hello!', 0, 0, 'top', true, 'text-input', 0, '', false, false, false);
    const parentElement = document.createElement('div');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'text-input';
    parentElement.appendChild(inputElement);
    parentElement.appendChild(element);
    return parentElement;
  })
  .add('for', () => {
    const element = createCoreTooltip('Bye!', 0, 0, 'top', true, 'text-input', 0, '', false, false, false);
    const parentElement = document.createElement('div');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'text-input';
    parentElement.appendChild(inputElement);
    parentElement.appendChild(element);
    return parentElement;
  })
  .add('offset', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 10, '', false, false, false))
  .add('no-visible-arrow', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 0, '', true, false, false))
  .add('disabled', () => createCoreTooltip('You will never see me!', 0, 0, 'bottom', false, '', 0, '', false, false, true))
  .add('manual', () => {
    const element = createCoreTooltip('Hi there!', 0, 0, 'bottom', false, '', 0, '', false, true, false);
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Toggle Tooltip';
    buttonElement.addEventListener('click', () => {
      element.toggle();
    });
    const parentElement = document.createElement('div');
    parentElement.textContent = 'Some More Text';
    parentElement.appendChild(element);
    parentElement.appendChild(buttonElement);
    return parentElement;
  })
  .add('effect="light"', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 0, 'light', false, false, false))
  .add('effect="dark"', () => createCoreTooltip('Hello!', 0, 0, 'bottom', false, '', 10, 'dark', false, false, false));
