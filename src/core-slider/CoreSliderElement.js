import CoreElement from '../core-element/CoreElement';
import TEMPLATE from './CoreSliderElement.html';
import STYLE from './CoreSliderElement.css';

// Create the template node specified by the imported html file, embedded with the imported style.
const CoreSliderTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

/**
 * Sets up the event listeners to handle touch and mouse release/move events.
 * @private
 * @param {Event} e               the input event that triggered this; it will be consumed.
 * @param {String} upEvent        the up event name
 *                                (for mouse = 'mouseup', for touch = 'touchend')
 * @param {Function} upListener   the listener for the named up event, will be called with
 *                                new input event
 * @param {String} moveEvent      the move event name
 *                                (for mouse = 'mousemove', for touch = 'touchmove')
 * @param {Function} moveListener the listener for the named move event, will be called
 *                                with new input event
 */
function setupInputEventListeners(e, upEvent, upListener, moveEvent, moveListener) {
  document.addEventListener(upEvent, upListener);
  document.addEventListener(moveEvent, moveListener);
  e.preventDefault();
  e.stopPropagation();
}

/**
 * Cleans up the event listeners that were registered by setupInputEventListeners().
 * This is usually called on the up/release event, when those listeners are not longer needed.
 * @private
 * @param {Event} e               the input event that triggered this; it will be consumed.
 * @param {String} upEvent        the up event name
 *                                (for mouse = 'mouseup', for touch = 'touchend')
 * @param {Function} upListener   the registered listener for the named up event, will be removed
 * @param {String} moveEvent      the move event name
 *                                (for mouse = 'mousemove', for touch = 'touchmove')
 * @param {Function} moveListener the registered listener for the named move event, will be removed
 */
function cleanupInputEventListeners(e, upEvent, upListener, moveEvent, moveListener) {
  document.removeEventListener(upEvent, upListener);
  document.removeEventListener(moveEvent, moveListener);
}

/**
 * An element that selects a range of values by sliding... it's a slider.
 * @property {Number} step      the size of the intervals for the value's valid range.
 *                              The attribute name is 'step'.
 * @property {Number} min       the minimum value.
 *                              The attribute name is 'min'.
 * @property {Number} max       the maximum value.
 *                              The attribute name is 'max'.
 * @property {Number} value     the current value.
 *                              The attribute name is 'value'.
 * @property {Boolean} disabled whether this can be used.
 *                              The attribute name is 'disabled'.
 * @property {Boolean} vertical whether to display vertically.
 *                              The attribute name is 'vertical'.
 * @property {Boolean} rainbow  whether to display in a bunch of colors.
 *                              The attribute name is 'rainbow'.
 * @property {String} color     the color of the slider.
 *                              The attribute name is 'color'.
 */
class CoreSliderElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      step: { type: Number },
      min: { type: Number },
      max: { type: Number },
      value: { type: Number },
      disabled: { type: Boolean },
      vertical: { type: Boolean },
      rainbow: { type: Boolean },
      color: { type: String },
    };
  }

  /** Creates a CoreSlider element. */
  constructor() {
    super(CoreSliderTemplate);

    // For any callback function passed out to someone else must be bound to 'this' context.
    // Otherwise, you cannot use 'this' within the function.

    // These are the callback functions that handle mouse input for the thumb slider.
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    // These are equivalent callbacks for touch instead.
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    // Retreives the slider thumb element from the shadow root by id.
    this.sliderThumb = this.shadowRoot.querySelector('#slider-thumb');
    // Registers the callback functions.
    this.sliderThumb.addEventListener('mousedown', this.onMouseDown);
    this.sliderThumb.addEventListener('touchstart', this.onTouchStart);

    // Gets the slider bar element from the shadow root by id.
    this.sliderBar = this.shadowRoot.querySelector('#slider-bar');
    // Registers the callback functions.
    this.sliderBar.addEventListener('mousedown', this.onMouseDown);
    this.sliderBar.addEventListener('touchstart', this.onTouchStart);

    // Gets the parent slider container from the shadow root by id.
    this.slider = this.shadowRoot.querySelector('#slider');

    // Sets the default values for properties...
    this.step = 1;
    this.min = 0;
    this.max = 100;
    this.value = 0;
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'value':
        {
          // Updates the value. Ensures that the value is always within bounds.
          const minValue = this.min;
          const maxValue = this.max;
          const stepSize = this.step;
          // Makes sure value is a multiple of stepSize.
          let result = Math.floor(newValue / stepSize) * stepSize;
          if (result < minValue) result = minValue;
          if (result > maxValue) result = maxValue;

          // Update the new value.
          this.value = result;

          // Update the thumb position to the new value.
          this.updateThumbPosition(result);
        }
        break;
      case 'color':
        this.slider.style.color = this.color;
        break;
      default:
        // Everything is should be handled by CoreElement automatically.
        // Nothing special should happen other than attribute data updates.
    }
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();

    // Makes sure that the thumb is set at the correct position on startup.
    this.updateThumbPosition(this.value);
  }

  /**
   * Updates the thumb position to reflect the slider value.
   * @private
   * @param {Number} value the current slider value
   */
  updateThumbPosition(value) {
    // Calculates the value with respect to the defined range (from this.min and this.max)
    const stepSize = this.step;
    const minValue = this.min;
    const maxValue = this.max;
    // ... also that the value is a multiple of stepSize ...
    let result = Math.floor(value / stepSize) * stepSize;
    if (result < minValue) result = minValue;
    if (result > maxValue) result = maxValue;

    // Calculates the pixel position of the thumb from this.value
    const valueRange = maxValue - minValue;
    let progress = (result - minValue) / valueRange;
    // You must have a progress between 0 and 1.
    // The thumb position should not be allowed to leave the "bar".
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;
    const thumbWidth = this.sliderThumb.clientWidth;

    // Depending on whether it is vertical, the position may be left->right or top->bottom.
    if (!this.vertical) {
      this.sliderThumb.style.left = `calc(${(progress) * 100}% - ${thumbWidth / 2}px)`;
      this.sliderThumb.style.top = 'calc(50% - 0.5rem)';
    } else {
      this.sliderThumb.style.left = 'calc(50% - 0.5rem)';
      this.sliderThumb.style.top = `calc(${(progress) * 100}% - ${thumbWidth / 2}px)`;
    }
  }

  /**
   * Is called when the mouse is clicked on the thumb.
   * @param {Event} e the input event
   */
  onMouseDown(e) {
    setupInputEventListeners(e,
      'mouseup', this.onMouseUp,
      'mousemove', this.onMouseMove);

    // Actually handle the input logic (abstracted for touch input)
    this.onThumbStart();
    this.onThumbMove(e);
  }

  /**
   * Is called when the mouse moves. This is only registered when onMouseDown is called.
   * @param {Event} e the input event
   */
  onMouseMove(e) {
    // Actually handle the input logic (abstracted for touch input)
    this.onThumbMove(e);
  }

  /**
   * Is called when the mouse is released anywhere.
   * @param {Event} e the input event
   */
  onMouseUp(e) {
    cleanupInputEventListeners(e,
      'mouseup', this.onMouseUp,
      'mousemove', this.onMouseMove);

    // Actually handle the input logic (abstracted for touch input)
    this.onThumbStop(e);
  }

  /**
   * Is called when a touch is on the thumb.
   * @param {Event} e the input event
   */
  onTouchStart(e) {
    setupInputEventListeners(e,
      'touchend', this.onTouchEnd,
      'touchmove', this.onTouchMove);

    // Actually handle the input logic (abstracted for mouse input)
    this.onThumbStart();
    this.onTouchMove(e);
  }

  /**
   * Is called when the touch moves. This is only registered when onTouchStart is called.
   *
   * @param {Event} e the input event
   */
  onTouchMove(e) {
    // We only handle the first touch, any subsequent touches are simply ignored.
    const touchEvent = e.changedTouches[0];
    // Actually handle the input logic (abstracted for mouse input)
    this.onThumbMove(touchEvent);
  }

  /**
   * Is called when the touch is released anywhere.
   *
   * @param {Event} e the input event
   */
  onTouchEnd(e) {
    cleanupInputEventListeners(e,
      'touchend', this.onTouchEnd,
      'touchmove', this.onTouchMove);

    // Actually handle the input logic (abstracted for mouse input)
    this.onThumbStop(e);
  }

  /**
   * Is called when the thumb should move (for both the mouse AND touch)
   */
  onThumbStart() {
    // The thumb should be "in focus" now. We cannot manipulate pseudo-classes (which 'focus' is).
    // So we settle for class names. The CSS will mimic the pseudo-class.
    this.sliderThumb.classList.add('focus');
  }

  /**
   * Depending on whether it is vertical, calculates the proportional
   * value from the slider to the moving thumb.
   * @param {Event} e   the input event
   * @returns {Number}  the progress along the bar for the thumb. The value ranges
   *                    between [0, 1] and goes top-to-bottom and left-to-right.
   */
  getSliderProgressRatio(e) {
    const sliderBoundingRect = this.slider.getBoundingClientRect();
    return !this.vertical
      ? (e.clientX - sliderBoundingRect.left) / this.slider.clientWidth
      : (e.clientY - sliderBoundingRect.top) / this.slider.clientHeight;
  }

  /**
   * Is called when the thumb is moving (for both the mouse AND touch)
   * @param {Event} e the input event that moved the thumb
   */
  onThumbMove(e) {
    const sliderRatio = this.getSliderProgressRatio(e);
    const minValue = this.min;
    const maxValue = this.max;
    const lengthValue = maxValue - minValue;
    const result = lengthValue * sliderRatio + minValue;

    // Only update the value if it is not the same...
    if (this.value !== result) {
      this.value = result;

      // ... also let anyone else listening for the 'input' event,
      // with addEventListener('event', () => {...}), to have a crack
      // at handling this event ...
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true, // Makes sure this event can bubble up to the parents...
        composed: true, // Makes sure that this event can be handled outside the shadow DOM...
      }));
    }
  }

  /**
   * Is called when the thumb should stop moving (for both the mouse AND touch)
   */
  onThumbStop() {
    // Added by onThumbStart()... so get rid of it. It should not be in focus anymore.
    this.sliderThumb.classList.remove('focus');
  }
}

// Registers the class with the custom tag
CoreElement.customTag('core-slider', CoreSliderElement);

export default CoreSliderElement;
