import CoreElement from '../../core-element/CoreElement';
import CoreGreetElement from '../CoreGreetElement';

const HELLO_STRING = {
  en: 'Hello World',
  es: 'Hola',
  jp: 'こんにちは',
  fr: 'Bonjour',
};

/**
 * An element that displays "Hello" with the passed-in name.
 * @property {string} new_name the string that will be displayed that I was here.
 * @property {boolean} rainbow whether the name should be colorfully animated.
 * @property {String} lang the language to display in.
 */
class CoreHelloElement extends CoreGreetElement {
  /** Creates a CoreHello element. */
  constructor() {
    super(HELLO_STRING);
    function dummy() {
      console.log("dummy");
      console.log("dummy");
      console.log("dummy");
      console.log("dummy");
      console.log("dummy");
      console.log("dummy");
      console.log("dummy");
    }
    dummy();
    console.log("dummy");
    console.log("dummy");
    console.log("dummy");
    console.log("dummy");
    console.log("dummy");
    console.log("dummy");
    console.log("dummy");
  }
}

CoreElement.customTag('core-hello', CoreHelloElement);

export default CoreHelloElement;
