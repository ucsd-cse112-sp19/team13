import CoreElement from '../../core-element/CoreElement';
import CoreGreetElement from '../CoreGreetElement';

const BYE_STRING = {
  en: 'Bye',
  es: 'Adios',
  jp: 'さようなら',
  fr: 'Au revoir',
};

/** An element that displays "Bye" with the passed-in name. */
class CoreByeElement extends CoreGreetElement {
  /** Creates a CoreBye element. */
  constructor() {
    super(BYE_STRING);
  }
}

CoreElement.customTag('core-bye', CoreByeElement);

export default CoreByeElement;
