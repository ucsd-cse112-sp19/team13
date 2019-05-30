import CoreElement from '../CoreElement';

import TEMPLATE from './CoreTooltipElement.html';
import STYLE from './CoreTooltipElement.css';

const STYLED_TEMPLATE = CoreElement.template(TEMPLATE, STYLE);

/**
 * An element that shows a tooltip for another element... It's a tooltip.
 */
class CoreTooltipElement extends CoreElement {
  /**
   * Creates a CoreTooltip element and attaches the shadow root
   */
  constructor() {
    super(STYLED_TEMPLATE);

    this.target = null;
  }

  /** @private */
  static get properties() {
    return {
      for: { type: String },
      placement: { type: String },
    };
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'for':
        this.target = document.querySelector(`#${newValue}`);
        break;
      default:
    }
  }
}

CoreElement.customTag('core-tooltip', CoreTooltipElement);

export default CoreTooltipElement;
