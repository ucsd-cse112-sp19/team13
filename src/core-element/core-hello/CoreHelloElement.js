import CoreElement from '../CoreElement';

import TEMPLATE from './CoreHelloElement.html';
import STYLE from './CoreHelloElement.css';

const STYLED_TEMPLATE = CoreElement.template(TEMPLATE, STYLE);

const HELLO_STRING = {
  en: 'Hello',
  es: 'Hola',
  jp: 'こんにちは',
  fr: 'Bonjour',
};

/**
 * An element that displays "Hello" with the passed-in name.
 * @property {string} name the string that will be displayed.
 * @property {boolean} rainbow whether the name should be colorfully animated.
 * @property {String} lang the language to display in.
 */
class CoreHelloElement extends CoreElement {
  /**
   * Creates a CoreHello element and attaches the shadow root
   */
  constructor() {
    super(STYLED_TEMPLATE);

    this.helloElement = this.shadowRoot.querySelector('#hello');
    this.nameElement = this.shadowRoot.querySelector('#name');
  }

  /** @private */
  static get properties() {
    return {
      name: {
        type: String,
        value: 'World',
      },
      rainbow: { type: Boolean },
      lang: { type: String },
    };
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'name':
        this.nameElement.textContent = newValue;
        break;
      case 'lang':
        this.helloElement.textContent = HELLO_STRING[newValue] || HELLO_STRING.en;
        break;
      default:
    }
  }
}

CoreElement.customTag('core-hello', CoreHelloElement);

export default CoreHelloElement;
