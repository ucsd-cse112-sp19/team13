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
 * @property {Boolean} disabled       whether it is disabled.
 *                                    The attribute name is 'disabled'.
 * @property {Boolean} offset         The tooltip offset from the target, which is also dependent
 *                                    on placement position. It is in pixels.
 *                                    The attribute name is 'offset'.
 * @property {String} effect          Sets the color theme, or effect, of the tooltip.
 *                                    This is either "light" or "dark".
 *                                    The attribute name is 'effect'.
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
      disabled: { type: Boolean },
      offset: { type: Number },
      effect: { type: String },
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

    // Whether the tooltip is open. This is managed by this instance, and is NOT an attribute.
    this.open = false;

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
      case 'disabled':
        this.clearTarget();
        break;
      case 'offset':
        this.shadowRoot.host.style.setProperty('--offset', `${this.offset}px`);
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

  /**
   * Opens the tooltip if closed.
   * This can usually be used in tandem with the "manual"
   * attribute. From where you want to trigger the tooltip,
   * such as "onclick", call this to open it.
   */
  open() {
    if (!this.open) {
      this.onTooltipOpen();
    }
  }


  /**
   * Closes the tooltip if opened.
   * This can usually be used in tandem with the "manual"
   * attribute. From where you want to trigger the tooltip,
   * such as "onclick", call this to close it.
   */
  close() {
    if (this.open) {
      this.onTooltipClose();
    }
  }

  /**
   * Toggles the tooltip to be opened or closed.
   * This can usually be used in tandem with the "manual"
   * attribute. From where you want to trigger the tooltip,
   * such as "onclick", call this to toggle between the states.
   */
  toggle() {
    if (!this.open) {
      this.onTooltipOpen();
    } else {
      this.onTooltipClose();
    }
  }

  /** Sets the target that is being listened to for mouse events. */
  setTarget(target) {
    if (this.target) this.clearTarget();

    if (target && !this.disabled) {
      // mouse listeners
      target.addEventListener('mouseenter', this.onMouseEnter);
      target.addEventListener('mouseleave', this.onMouseLeave);
      // focus listeners
      target.addEventListener('focus', this.onFocus);
      target.addEventListener('blur', this.onBlur);
      this.target = target;
    }
  }

  /** Clears the target that is being listened to. */
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
    // Remove any existing timeouts, so we don't trigger it again.
    this.clearTimeouts();

    // Only delay if moving from NOT a tooltip...
    if (!CoreTooltipElement.activeElement) {
      this.openTimeout = setTimeout(this.onTooltipOpen, this.openDelay);
    } else {
      this.onTooltipOpen();
    }
  }

  /** Called when mouse leaves the parent. */
  onMouseLeave() {
    if (this.manual) {
      // Exit if manual is true.
      return;
    }
    // Remove any existing timeouts, so we don't trigger it again.
    this.clearTimeouts();

    // Only delay if moving out of ALL tooltips...
    if (CoreTooltipElement.activeElement === this) {
      this.closeTimeout = setTimeout(this.onTooltipClose, this.closeDelay);
    } else {
      this.onTooltipClose();
    }
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

  /** Remove any existing close timeouts, so we don't trigger it again. */
  clearTimeouts() {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = null;
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  /**
   * Called when the tooltip should open (after a set delay). The
   * timer is triggered by onMouseEnter().
   */
  onTooltipOpen() {
    // Only manage tooltip show/hide if NOT manually controlled...
    if (!this.manual) {
      // Force open now.
      if (CoreTooltipElement.activeElement
        && CoreTooltipElement.activeElement !== this) {
        // Close previous active element.
        const element = CoreTooltipElement.activeElement;
        element.onTooltipClose();
      }
      // Make this the active element.
      CoreTooltipElement.activeElement = this;
    }

    // Actually open the tooltip...
    this.shadowRoot.host.style.opacity = 1;
    // Remove any existing timeouts, so we don't trigger it again.
    this.clearTimeouts();

    this.open = true;
  }

  /**
   * Called when the tooltip should close (after a set delay). The
   * timer is triggered by onMouseLeave().
   */
  onTooltipClose() {
    // Actually close the tooltip...
    this.shadowRoot.host.style.opacity = 0;
    // Remove any existing timeouts, so we don't trigger it again.
    this.clearTimeouts();

    // Only manage tooltip show/hide if NOT manually controlled...
    if (!this.manual) {
      if (CoreTooltipElement.activeElement === this) {
        CoreTooltipElement.activeElement = null;
      }
    }

    this.open = false;
  }
}
// The currently open tooltip element such that only 1 is every "active" at one time.
CoreTooltipElement.activeElement = null;

CoreElement.customTag('core-tooltip', CoreTooltipElement);

export default CoreTooltipElement;
