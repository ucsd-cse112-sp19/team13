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

  static get properties() {
    return {
      /**
       * The attribute that represents the name that will be displayed.
       * @type {String}
       */
      name: {
        type: String,
        value: 'World',
      },

      /**
       * The attribute that represents whether the name should be colorfully animated.
       * @type {Boolean}
       */
      rainbow: { type: Boolean },

      /**
       * The attribute that represents the language to display in.
       * @type {String}
       */
      lang: { type: String },
    };
  }

  /** @override */
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
