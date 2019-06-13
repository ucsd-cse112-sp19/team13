import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../dist/core-link';

function createCoreLink(textContent, href, type, underline, disabled) {
  const element = document.createElement('core-link');
  element.textContent = textContent;
  element.text = text('href', href);
  element.type = text('type', type);
  element.underline = boolean('underline', underline);
  element.disabled = boolean('disabled', disabled);
  return element;
}

storiesOf('CoreLink', module)
  .addDecorator(withKnobs)
  .add('default', () => createCoreLink('Link', '#', '', false, false))
  .add('href', () => createCoreLink('Link', 'google.com', 'primary', false, false))
  .add('type="primary"', () => createCoreLink('Link', '#', 'primary', false, false))
  .add('type="warning"', () => createCoreLink('Link', '#', 'warning', false, false))
  .add('type="success"', () => createCoreLink('Link', '#', 'success', false, false))
  .add('type="danger"', () => createCoreLink('Link', '#', 'danger', false, false))
  .add('type="info"', () => createCoreLink('Link', '#', 'info', false, false))
  .add('underline', () => createCoreLink('Link', '#', '', true, false))
  .add('disabled', () => createCoreLink('Link', '#', '', false, true));
