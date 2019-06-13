import CoreElement from '../core-element/CoreElement';

import TEMPLATE from './CoreLinkElement.html';
import STYLE from './CoreLinkElement.css';

const CoreLinkTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * An element that allows the user to go to a link, with style.
 * @property {String} href          the link to go to
 * @property {String} type          the type of link; these include primary, success, warning,
 *                                  danger, or info
 * @property {Boolean} disabled     whether the link is disabled
 * @property {Boolean} underline    whether the link has an underline
 */
class CoreLinkElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      href: { type: String },
      type: { type: String },
      disabled: { type: Boolean },
      underline: { type: Boolean },
    };
  }

  /** Constructs the core-link element with the template and style */
  constructor() {
    super(CoreLinkTemplate);

    this.linkElement = this.shadowRoot.querySelector('#link');
    this.linkSlot = this.shadowRoot.querySelector('#link-content');
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'href':
        this.linkElement.href = newValue;
        break;
      case 'disabled':
        this.linkElement.disabled = newValue;
        break;
      default:
    }
  }
}
CoreElement.customTag('core-link', CoreLinkElement);

export default CoreLinkElement;
