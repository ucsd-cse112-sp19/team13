import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../dist/core-hello';

function createCoreHello(name, lang, rainbow) {
  const element = document.createElement('core-hello');
  if (name) {
    element.name = text('name', name);
  }
  if (lang) {
    element.lang = text('lang', lang);
  }
  if (rainbow) {
    element.rainbow = boolean('rainbow', rainbow);
  }
  return element;
}

storiesOf('CoreHello', module)
  .addDecorator(withKnobs)
  .add('default', () => createCoreHello('Peter', 'en', false))
  .add('lang="en"', () => createCoreHello('Peter', 'en', false))
  .add('lang="es"', () => createCoreHello('Peter', 'es', false))
  .add('lang="fr"', () => createCoreHello('Peter', 'fr', false))
  .add('lang="jp"', () => createCoreHello('Peter', 'jp', false))
  .add('name', () => createCoreHello('Peter', 'en', false))
  .add('rainbow', () => '<core-hello rainbow>Peter</core-hello>');
