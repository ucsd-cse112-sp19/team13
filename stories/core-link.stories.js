import { storiesOf } from '@storybook/html';
import '../dist/core-link';

storiesOf('CoreLink', module)
  .add('default', () => '<core-link>Link</core-link>')
  .add('href', () => '<core-link href="#">Link</core-link>')
  .add('type="primary"', () => '<core-link type="primary">Link</core-link>')
  .add('type="warning"', () => '<core-link type="warning">Link</core-link>')
  .add('type="success"', () => '<core-link type="success">Link</core-link>')
  .add('type="danger"', () => '<core-link type="danger">Link</core-link>')
  .add('type="info"', () => '<core-link type="info">Link</core-link>')
  .add('underline', () => '<core-link underline>Link</core-link>')
  .add('disabled', () => '<core-link disabled>Link</core-link>');
