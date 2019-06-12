import CoreElement from '../core-element/CoreElement';

import TEMPLATE from './CoreTooltipElement.html';
import STYLE from './CoreTooltipElement.css';

const CoreTooltipTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * An element that shows a tooltip for another element... It's a tooltip.
 * @property {number} openDelay the delay of appearance, in millisecond
 * @property {number} closeDelay the delay of disappearance, in millisecond
 *
 * @property {number} openTimeout the timer created by the call to setTimeout() for
 * openDelay, can be passed to clearTimeout() to cancel the timeout.
 *
 * @property {number} closeTimeout the timer created by the call to setTimeout() for
 * closeDelay, can be passed to clearTimeout() to cancel the timeout.
 */
class CoreTooltipElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      placement: { type: String },
      content: { type: String },
      openDelay: { type: Number },
      closeDelay: { type: Number },
    };
  }

  /** Creates a CoreTooltip element and attaches the shadow root. */
  constructor() {
    super(CoreTooltipTemplate);

    this.tooltipSlot = this.shadowRoot.querySelector('#tooltip-content');

    this.target = null;
    this.openTimeout = null;
    this.closeTimeout = null;

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.onTooltipOpen = this.onTooltipOpen.bind(this);
    this.onTooltipClose = this.onTooltipClose.bind(this);

    this.openDelay = 0;
    this.closeDelay = 1000;
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'content':
        this.tooltipSlot.textContent = newValue;
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
    this.clearTimeout();
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

  /** To cancel the timeout */
  clearTimeout() {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  /** Called when mouse enters the parent. */
  onMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.openTimeout = setTimeout(this.onTooltipOpen, this.openDelay);
  }

  /** Called when mouse leaves the parent. */
  onMouseLeave() {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    setTimeout(this.onTooltipClose, this.closeDelay);
  }

  /**
   * Called when the tooltip should open (after a set delay). The
   * timer is triggered by onMouseEnter().
   */
  onTooltipOpen() {
    this.shadowRoot.host.style.opacity = 1;
  }

  /**
   * Called when the tooltip should close (after a set delay). The
   * timer is triggered by onMouseLeave().
   */
  onTooltipClose() {
    this.shadowRoot.host.style.opacity = 0;
  }
}
/*
  // TODO: We'll worry about this later, this is for the "tooltip" mode that Shardul wanted.
  CoreTooltipElement.timeout = null;
  CoreTooltipElement.active = false;
*/

CoreElement.customTag('core-tooltip', CoreTooltipElement);

export default CoreTooltipElement;
