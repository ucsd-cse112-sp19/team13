import CoreElement from '../core-element/CoreElement';

import TEMPLATE from './CoreTooltipElement.html';
import STYLE from './CoreTooltipElement.css';

const CoreTooltipTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * An element that shows a tooltip for another element... It's a tooltip.
 * @property {String} placement the side of the parent which the tooltip is shown
 * @property {String} content the content of the tooltip
 * @property {Number} openDelay the delay of appearance, in millisecond
 * @property {Number} closeDelay the delay of disappearance, in millisecond
 * @property {String} for the id of the target. If none specified, then it defaults to the parent
 * @property {Boolean} focusable whether to allow focus to show tooltip
 * @property {Boolean} manual whether mouseenter and mouseleave change the tooltip
 */
class CoreTooltipElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      placement: { type: String },
      content: { type: String },
      openDelay: { type: Number },
      closeDelay: { type: Number },
      for: { type: String },
      focusable: { type: Boolean },
      manual: { type: Boolean },
    };
  }

  /** Creates a CoreTooltip element and attaches the shadow root. */
  constructor() {
    super(CoreTooltipTemplate);

    this.tooltipSlot = this.shadowRoot.querySelector('#tooltip-content');

    this.target = null;

    // The timer created by the call to setTimeout() for openDelay, can be passed
    // to clearTimeout() to cancel the timeout.
    this.openTimeout = null;
    // The timer created by the call to setTimeout() for closeDelay, can be passed
    // to clearTimeout() to cancel the timeout.
    this.closeTimeout = null;

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.onTooltipOpen = this.onTooltipOpen.bind(this);
    this.onTooltipClose = this.onTooltipClose.bind(this);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.openDelay = 0;
    this.closeDelay = 1000;
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'content':
        this.tooltipSlot.textContent = newValue;
        break;
      case 'for':
        {
          const target = document.querySelector(`#${newValue}`);
          if (target) {
            this.setTarget(target);
          } else {
            this.setTarget(this.shadowRoot.host.parentElement);
          }
        }
        break;
      default:
    }
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();

    const parent = this.shadowRoot.host.parentElement;
    parent.style.position = 'relative';

    if (!this.for) {
      this.setTarget(parent);
    }
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
      // mouse listeners
      target.addEventListener('mouseenter', this.onMouseEnter);
      target.addEventListener('mouseleave', this.onMouseLeave);
      // focus listeners
      target.addEventListener('focus', this.onFocus);
      target.addEventListener('blur', this.onBlur);
      this.target = target;
    }
  }

  clearTarget() {
    if (this.target) {
      // mouse listeners
      this.target.removeEventListener('mouseenter', this.onMouseEnter);
      this.target.removeEventListener('mouseleave', this.onMouseLeave);
      // focus listeners
      this.target.removeEventListener('focus', this.onFocus);
      this.target.removeEventListener('blur', this.onBlur);
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
    if (this.manual) {
      // Exit if manual is true.
      return;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.openTimeout = setTimeout(this.onTooltipOpen, this.openDelay);
  }

  /** Called when mouse leaves the parent. */
  onMouseLeave() {
    if (this.manual) {
      // Exit if manual is true.
      return;
    }
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    setTimeout(this.onTooltipClose, this.closeDelay);
  }

  /** Called when target is in focus. */
  onFocus() {
    if (this.manual) {
      // Exit if manual is true.
      return;
    }
    if (this.focusable) this.onTooltipOpen();
  }

  /** Called when target is out of focus. */
  onBlur() {
    if (this.manual) {
      // Exit if manual is true.
      return;
    }
    if (this.focusable) this.onTooltipClose();
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
