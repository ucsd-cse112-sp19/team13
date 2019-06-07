import { storiesOf } from '@storybook/html';
import '../src/core-greet/core-hello/CoreHelloElement';
import '../src/core-greet/CoreGreetElement';

storiesOf('Core Hello', module)
  .add('English', () => '<core-hello lang="en">PETER</core-hello>')
  .add('Rainbow', () => '<core-hello lang="en" rainbow>PETER</core-hello>')
  .add('Spanish', () => '<core-hello lang="es">PETER</core-hello>')
  .add('Japanese', () => '<core-hello lang="js">PETER</core-hello>')
  .add('French', () => '<core-hello lang="fr">PETER</core-hello>');
