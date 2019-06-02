import CoreElement from '../core-element/CoreElement';

import TEMPLATE from './CoreGreetElement.html';
import STYLE from './CoreGreetElement.css';

const STYLED_TEMPLATE = CoreElement.template(TEMPLATE, STYLE);

/**
 * An element that displays some greeting from the language mapping with the passed-in name,
 * Currently supports 4 languages - Japanese, English, Spanish and French
 * @property {string} name the string that will be displayed.
 * @property {boolean} rainbow whether the name should be colorfully animated.
 * @property {String} lang the language to display in.
 */
class CoreGreetElement extends CoreElement {
  /**
   * Creates a CoreGreet element and attaches the shadow root
   */
  constructor(langMap = null) {
    super(STYLED_TEMPLATE);

    this.langMapping = langMap || { en: 'Greet' };

    this.greetElement = this.shadowRoot.querySelector('#greet');
    this.nameElement = this.shadowRoot.querySelector('#name');
  }

  /** @private */
  static get properties() {
    return {
      name: { type: String, value: 'World' },
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
        this.greetElement.textContent = this.langMapping[newValue] || this.langMapping.en;
        break;
      default:
    }
  }
}

CoreElement.customTag('core-greet', CoreGreetElement);

export default CoreGreetElement;
