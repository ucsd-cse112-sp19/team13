import CoreElement from '../CoreElement';
import TEMPLATE from './CoreSliderElement.html';
import STYLE from './CoreSliderElement.css';

const STYLED_TEMPLATE = CoreElement.template(TEMPLATE, STYLE);

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
  /**
   * Creates a CoreSlider element and attaches the shadow root
   */
  constructor() {
    super(STYLED_TEMPLATE);

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
  }

  /** @private */
  static get properties() {
    return {
      step: { type: Number, value: 1 },
      min: { type: Number, value: 0 },
      max: { type: Number, value: 100 },
      value: { type: Number, value: 0 },
      disabled: { type: Boolean },
      vertical: { type: Boolean },
      rainbow: { type: Boolean },
    };
  }

  /**
   * Updates the value. Ensures that the value is always within bounds.
   * @override
   * @param {*} value the new value
   */
  set value(value) {
    const minValue = this.min;
    const maxValue = this.max;
    const stepSize = this.step;
    let result = Math.floor(value / stepSize) * stepSize;
    if (result < minValue) result = minValue;
    if (result > maxValue) result = maxValue;
    this.setAttribute('value', `${result}`);
  }

  /** @private */
  propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
      case 'value':
        this.updateThumbPosition(newValue);
        this.dispatchEvent(new CustomEvent('input', {
          bubbles: true,
          composed: true,
        }));
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
    } else {
      this.sliderThumb.style.top = `calc(${(progress) * 100}% - ${thumbWidth / 2}px)`;
    }
  }

  /**
   * Is called when the mouse is clicked on the thumb.
   *
   * @param {Event} e the input event
   */
  onMouseDown(e) {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    e.preventDefault();
    e.stopPropagation();

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
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    this.onThumbStop(e);
  }

  /**
   * Is called when a touch is on the thumb.
   *
   * @param {Event} e the input event
   */
  onTouchStart(e) {
    document.addEventListener('touchend', this.onTouchEnd);
    document.addEventListener('touchmove', this.onTouchMove);
    e.preventDefault();
    e.stopPropagation();

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
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener('touchmove', this.onTouchMove);

    this.onThumbStop(e);
  }

  /**
   * Is called when the thumb should move (for both the mouse AND touch)
   */
  onThumbStart() {
    this.sliderThumb.classList.add('focus');
  }

  /**
   * Is called when the thumb is moving (for both the mouse AND touch)
   *
   * @param {Event} e the input event that moved the thumb
   */
  onThumbMove(e) {
    let sliderRatio;

    // Depending on whether it is vertical, calculate the proportional value from the slider
    if (!this.vertical) {
      const sliderX = this.slider.getBoundingClientRect().left;
      const sliderWidth = this.slider.clientWidth;
      const sliderPosition = e.clientX - sliderX;
      sliderRatio = sliderPosition / sliderWidth;
    } else {
      const sliderY = this.slider.getBoundingClientRect().top;
      const sliderHeight = this.slider.clientHeight;
      const sliderPosition = e.clientY - sliderY;
      sliderRatio = sliderPosition / sliderHeight;
    }

    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    const lengthValue = maxValue - minValue;
    const result = lengthValue * sliderRatio + minValue;
    if (this.value !== result) {
      this.value = result;
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
