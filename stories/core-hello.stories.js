import { storiesOf } from '@storybook/html';
import { boolean } from '@storybook/addon-knobs/polymer';
import '../src/core-greet/core-hello/CoreHelloElement';

storiesOf('Core Hello', module)
  .add('English', () => '<core-hello lang="en">Peter</core-hello>')
  .add('Rainbow', () => {
    const coreHello0 = document.createElement('core-hello');
    coreHello0.innerText = 'Peter';
    coreHello0.lang = 'en';
    coreHello0.rainbow = boolean('rainbow', true);
    return coreHello0;
  })
  .add('Spanish', () => {
    const coreHello1 = document.createElement('core-hello');
    coreHello1.innerText = 'Peter';
    coreHello1.lang = 'es';
    return coreHello1;
  })
  .add('French', () => {
    const coreHello2 = document.createElement('core-hello');
    coreHello2.innerText = 'Peter';
    coreHello2.lang = 'fr';
    return coreHello2;
  })
  .add('Japanese', () => {
    const coreHello3 = document.createElement('core-hello');
    coreHello3.innerText = 'Peter';
    coreHello3.lang = 'jp';
    return coreHello3;
  });
