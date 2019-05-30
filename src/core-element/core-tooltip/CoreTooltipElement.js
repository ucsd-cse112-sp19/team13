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

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  /** @private */
  static get properties() {
    return {
      placement: { type: String },
    };
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'for':
        this.setTarget(document.querySelector(`#${newValue}`));
        break;
      default:
    }
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();
    const target = this.shadowRoot.host.parentElement;
    this.setTarget(target);
  }

  /** @override */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTarget();
  }

  setTarget(target) {
    if (this.target) this.clearTarget();

    if (target) {
      target.addEventListener('mouseenter', this.onMouseEnter);
      target.addEventListener('mouseleave', this.onMouseLeave);
      this.target = target;
      this.target.style.position = 'relative';
    }
  }

  clearTarget() {
    if (this.target) {
      this.target.removeEventListener('mouseenter', this.onMouseEnter);
      this.target.removeEventListener('mouseleave', this.onMouseLeave);
      this.target = null;
    }
  }

  onMouseEnter() {
    this.shadowRoot.host.style.opacity = 1;
  }

  onMouseLeave() {
    this.shadowRoot.host.style.opacity = 0;
  }
}

CoreElement.customTag('core-tooltip', CoreTooltipElement);

export default CoreTooltipElement;
