import { storiesOf } from '@storybook/html';
import '../dist/core-hello';

storiesOf('CoreHello', module)
  .add('default', () => '<core-hello></core-hello>')
  .add('lang="en"', () => '<core-hello lang="en">Peter</core-hello>')
  .add('lang="es"', () => '<core-hello lang="es">Peter</core-hello>')
  .add('lang="fr"', () => '<core-hello lang="fr">Peter</core-hello>')
  .add('lang="jp"', () => '<core-hello lang="jp">Peter</core-hello>')
  .add('name', () => '<core-hello name="Peter"></core-hello>')
  .add('rainbow', () => '<core-hello rainbow>Peter</core-hello>');
