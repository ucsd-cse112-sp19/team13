import CoreElement from '../core-element/CoreElement';
import TEMPLATE from './CoreGreetElement.html';
import STYLE from './CoreGreetElement.css';

const CoreGreetTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * An element that displays some greeting from the language mapping with the passed-in name,
 * Currently supports 4 languages - Japanese, English, Spanish and French
 * @property {string} random_variable the string that will be displayed randomly.
 * @property {boolean} rainbow whether the name should be colorfully animated.
 * @property {String} lang the language to display in.
 */
class CoreGreetElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      name: { type: String },
      rainbow: { type: Boolean },
      lang: { type: String },
    };
  }

  /** Creates a CoreGreet element and attaches the shadow root. */
  constructor(langMap = null) {
    super(CoreGreetTemplate);

    this.langMapping = langMap || { en: 'Greet' };

    this.greetElement = this.shadowRoot.querySelector('#greet');
    this.nameElement = this.shadowRoot.querySelector('#name');

    this.name = 'World';
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
