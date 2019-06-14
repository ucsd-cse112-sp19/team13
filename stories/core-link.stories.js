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
  .add('type="primary"', () => '<core-link type="primary">Some Link</core-link>')
  .add('type="warning"', () => '<core-link type="warning">Some Link</core-link>')
  .add('type="success"', () => '<core-link type="success">Some Link</core-link>')
  .add('type="danger"', () => '<core-link type="danger">Some Link</core-link>')
  .add('type="info"', () => '<core-link type="info">Some Link</core-link>')
  .add('underline', () => '<core-link underline>Some Link</core-link>')
  .add('disabled', () => '<core-link disabled>Some Link</core-link>');
