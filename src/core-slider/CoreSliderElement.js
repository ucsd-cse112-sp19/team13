import CoreElement from '../core-element/CoreElement';
import TEMPLATE from './CoreSliderElement.html';
import STYLE from './CoreSliderElement.css';

const CoreSliderTemplate = CoreElement.templateNode(TEMPLATE, STYLE);

function setupInputEventListeners(e, upEvent, upListener, moveEvent, moveListener) {
  document.addEventListener(upEvent, upListener);
  document.addEventListener(moveEvent, moveListener);
  e.preventDefault();
  e.stopPropagation();
}

function cleanupInputEventListeners(e, upEvent, upListener, moveEvent, moveListener) {
  document.removeEventListener(upEvent, upListener);
  document.removeEventListener(moveEvent, moveListener);
}

/**
 * An element that selects a range of values by sliding... It's a slider.
 * @property {number} step the size of the intervals for the value's valid range.
 * @property {number} min the minimum value.
 * @property {number} max the maximum value.
 * @property {number} value the current value.
 * @property {boolean} disabled whether this can be used.
 * @property {boolean} vertical whether to display vertically.
 * @property {boolean} rainbow whether to display in a bunch of colors.
 */
class CoreSliderElement extends CoreElement {
  /** @private */
  static get properties() {
    return {
      step: { type: Number },
      min: { type: Number },
      max: { type: Number },
      value: { type: Number, reflect: true },
      disabled: { type: Boolean },
      vertical: { type: Boolean },
      rainbow: { type: Boolean },
    };
  }

  /** Creates a CoreSlider element. */
  constructor() {
    super(CoreSliderTemplate);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.sliderThumb = this.shadowRoot.querySelector('#slider-thumb');
    this.sliderThumb.addEventListener('mousedown', this.onMouseDown);
    this.sliderThumb.addEventListener('touchstart', this.onTouchStart);

    this.sliderBar = this.shadowRoot.querySelector('#slider-bar');
    this.sliderBar.addEventListener('mousedown', this.onMouseDown);
    this.sliderBar.addEventListener('touchstart', this.onTouchStart);

    this.slider = this.shadowRoot.querySelector('#slider');

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
          let result = Math.floor(newValue / stepSize) * stepSize;
          if (result < minValue) result = minValue;
          if (result > maxValue) result = maxValue;
          this.value = result;

          this.updateThumbPosition(result);
        }
        break;
      default:
    }
  }

  /** @override */
  connectedCallback() {
    super.connectedCallback();
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
    let result = Math.floor(value / stepSize) * stepSize;
    if (result < minValue) result = minValue;
    if (result > maxValue) result = maxValue;

    // Calculates the pixel position of the thumb from this.value
    const valueRange = maxValue - minValue;
    let progress = (result - minValue) / valueRange;
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;
    const thumbWidth = this.sliderThumb.clientWidth;

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
   *
   * @param {Event} e the input event
   */
  onMouseDown(e) {
    setupInputEventListeners(e,
      'mouseup', this.onMouseUp,
      'mousemove', this.onMouseMove);

    this.onThumbStart();
    this.onThumbMove(e);
  }

  /**
   * Is called when the mouse moves. This is only registered when onMouseDown is called.
   *
   * @param {Event} e the input event
   */
  onMouseMove(e) {
    this.onThumbMove(e);
  }

  /**
   * Is called when the mouse is released anywhere.
   *
   * @param {Event} e the input event
   */
  onMouseUp(e) {
    cleanupInputEventListeners(e,
      'mouseup', this.onMouseUp,
      'mousemove', this.onMouseMove);

    this.onThumbStop(e);
  }

  /**
   * Is called when a touch is on the thumb.
   *
   * @param {Event} e the input event
   */
  onTouchStart(e) {
    setupInputEventListeners(e,
      'touchend', this.onTouchEnd,
      'touchmove', this.onTouchMove);

    this.onThumbStart();
    this.onTouchMove(e);
  }

  /**
   * Is called when the touch moves. This is only registered when onTouchStart is called.
   *
   * @param {Event} e the input event
   */
  onTouchMove(e) {
    const touchEvent = e.changedTouches[0];
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

    this.onThumbStop(e);
  }

  /**
   * Is called when the thumb should move (for both the mouse AND touch)
   */
  onThumbStart() {
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
   *
   * @param {Event} e the input event that moved the thumb
   */
  onThumbMove(e) {
    const sliderRatio = this.getSliderProgressRatio(e);
    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    const lengthValue = maxValue - minValue;
    const result = lengthValue * sliderRatio + minValue;
    if (this.value !== result) {
      this.value = result;

      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  /**
   * Is called when the thumb should stop moving (for both the mouse AND touch)
   */
  onThumbStop() {
    this.sliderThumb.classList.remove('focus');
  }
}

CoreElement.customTag('core-slider', CoreSliderElement);

export default CoreSliderElement;
