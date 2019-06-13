import CoreElement from '../../core-element/CoreElement';
import CoreGreetElement from '../CoreGreetElement';

const BYE_STRING = {
  en: 'Bye',
  es: 'Adios',
  jp: 'さようなら',
  fr: 'Au revoir',
};

/**
 * An element that displays "Bye" with the passed-in name.
 * @property {string} name the string that will be displayed.
 * @property {boolean} rainbow whether the name should be colorfully animated.
 * @property {String} lang the language to display in.
 */
class CoreByeElement extends CoreGreetElement {
  /** Creates a CoreBye element. */
  constructor() {
    super(BYE_STRING);
  }
}

CoreElement.customTag('core-bye', CoreByeElement);

export default CoreByeElement;
