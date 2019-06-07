import CoreElement from '../core-element/CoreElement';

import TEMPLATE from './CoreTooltipElement.html';
import STYLE from './CoreTooltipElement.css';

// Create the template node specified by the imported html file, embedded with the imported style.
const CoreTooltipTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * An element that shows a tooltip for another element... It's a tooltip.
 * @property {String} placement       the side of the parent which the tooltip is shown.
 *                                    The attribute name is 'placement'.
 * @property {String} content         the content of the tooltip.
 *                                    The attribute name is 'content'.
 * @property {Number} openDelay       the delay of appearance, in millisecond.
 *                                    The attribute name is 'open-delay'.
 * @property {Number} closeDelay      the delay of disappearance, in millisecond.
 *                                    The attribute name is 'close-delay'.
 * @property {String} for             the id of the target. If none specified, then it
 *                                    defaults to the parent. The attribute name is 'for'.
 * @property {Boolean} focusable      whether to allow focus to show tooltip.
 *                                    The attribute name is 'focusable'.
 * @property {Boolean} manual         whether mouseenter and mouseleave change the tooltip.
 *                                    The attribute name is 'manual'.
 * @property {Boolean} noVisibleArrow whether to remove the arrow.
 *                                    The attribute name is 'no-visible-arrow'.
 */
class CoreTooltipElement extends CoreElement {
  /**
   * Registers the properties and their type. An equivalent attribute will be generated
   * for use in CSS and HTML. It will however, be in dash-case, NOT camelCase.
   * @private
   */
  static get properties() {
    return {
      placement: { type: String },
      content: { type: String },
      openDelay: { type: Number },
      closeDelay: { type: Number },
      for: { type: String },
      focusable: { type: Boolean },
      manual: { type: Boolean },
      noVisibleArrow: { type: Boolean },
    };
  }

  /** Creates a CoreTooltip element and attaches the shadow root. */
  constructor() {
    super(CoreTooltipTemplate);

    this.target = null;

    // The timer created by the call to setTimeout() for openDelay, can be passed
    // to clearTimeout() to cancel the timeout.
    this.openTimeout = null;
    // The timer created by the call to setTimeout() for closeDelay, can be passed
    // to clearTimeout() to cancel the timeout.
    this.closeTimeout = null;

    // The listeners to handle tooltip showing/hiding on input hover
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    // The listeners to directly handle showing/hiding the tooltip element from anywhere
    this.onTooltipOpen = this.onTooltipOpen.bind(this);
    this.onTooltipClose = this.onTooltipClose.bind(this);

    // The listeners to handle tooltip show/hide on input focus
    // (only if focusable AND if the 'for' attribute is valid)
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    // Retreives the slot for the tooltip content in the shadow root by id.
    this.tooltipSlot = this.shadowRoot.querySelector('#tooltip-content');

    // Sets the default open delay to 0
    this.openDelay = 0;
    // Sets the default close delay to 1000
    this.closeDelay = 1000;
  }

  /**
   * @override
   * @private
   */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'content':
        // Update the slot content if using the 'content' attribute to set text content.
        this.tooltipSlot.textContent = newValue;
        break;
      case 'for':
        {
          // Update the focusable target with the new 'for' value (which should be the id)
          // If none is specified or valid, it'll just use the parent.
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
