import CoreElement from '../CoreElement';

import TEMPLATE from './CoreByeElement.html';
import STYLE from './CoreByeElement.css';

const STYLED_TEMPLATE = CoreElement.template(TEMPLATE, STYLE);

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
class CoreByeElement extends CoreElement {
  /**
   * Creates a CoreBye element and attaches the shadow root
   */
  constructor() {
    super(STYLED_TEMPLATE);

    this.byeElement = this.shadowRoot.querySelector('#bye');
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
        this.byeElement.textContent = BYE_STRING[newValue] || BYE_STRING.en;
        break;
      default:
    }
  }
}

CoreElement.customTag('core-bye', CoreByeElement);

export default CoreByeElement;
