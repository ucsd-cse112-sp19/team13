import TEMPLATE from './core-slider.html';
import STYLE from './core-slider.css';
import { createTemplate, attachShadowRoot, registerCustomTag } from '../wcutil';

const template = createTemplate(TEMPLATE, STYLE);

/**
 * An element that selects a range of values by sliding... It's a slider.
 */
class CoreSliderElement extends HTMLElement {
  /**
   * Creates a CoreSlider element and attaches the shadow root
   */
  constructor() {
    super();

    attachShadowRoot(this, template);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.sliderThumb = this.shadowRoot.querySelector('#slider-thumb');
    this.sliderThumb.addEventListener('mousedown', this.onMouseDown);

    this.slider = this.shadowRoot.querySelector('#slider');
  }

  /**
   * Is called when the mouse is clicked on the thumb.
   *
   * @param {Event} e the input event
   */
  onMouseDown(e) {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  /**
   * Is called when the mouse moves. This is only registered when onMouseDown is called.
   *
   * @param {Event} e the input event
   */
  onMouseMove(e) {
    const sliderX = this.slider.getBoundingClientRect().left;
    const sliderWidth = parseInt(this.slider.clientWidth, 10);
    const sliderPosition = e.clientX - sliderX;
    const sliderRatio = sliderPosition / sliderWidth;

    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    const lengthValue = maxValue - minValue;
    this.value = lengthValue * sliderRatio;
  }

  /**
   * Is called when the mouse is released anywhere.
   *
   * @param {Event} e the input event
   */
  onMouseUp(e) {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  /** @override */
  connectedCallback() {
    // Sets the default value for this.step
    if (!this.hasAttribute('step')) {
      this.setAttribute('step', 1);
    }
  }

  /**
   * Gets the min value of the slider. This is the lower bound for this.value.
   *
   * @type {Number}
   */
  get min() { return this.getAttribute('min'); }

  /**
   * Sets the min value of the slider. This is the lower bound for this.value.
   *
   * @type {Number}
   */
  set min(value) { this.setAttribute('min', value); }

  /**
   * Gets the max value of the slider. This is the upper bound for this.value.
   *
   * @type {Number}
   */
  get max() { return this.getAttribute('max'); }

  /**
   * Sets the max value of the slider. This is the upper bound for this.value.
   *
   * @type {Number}
   */
  set max(value) { this.setAttribute('max', value); }

  /**
   * Gets the value of the slider. This will ALWAYS be within this.min and this.max.
   *
   * @type {Number}
   */
  get value() { return this.getAttribute('value'); }

  /**
   * Sets the value of the slider. This is bounded by this.min and this.max.
   *
   * @type {Number}
   */
  set value(value) {
    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    let result = parseInt(value, 10);
    if (result < minValue) result = minValue;
    if (result > maxValue) result = maxValue;
    this.setAttribute('value', `${result}`);
  }


  /**
   * Gets whether the element is disabled. This will disable all user interactions with the element.
   *
   * @type {Boolean}
   */
  get disabled() { return this.hasAttribute('value'); }


  /**
   * Disables the element from inputs.
   *
   * @type {Boolean}
   */
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }


  /**
   * Gets the step value of the slider.
   *
   * @type {Number}
   */
  get step() { return this.getAttribute('step'); }


  /**
   * Sets the step value of the slider.
   *
   * @type {Number}
   */
  set step(value) { this.setAttribute('step'); }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'value':
        {
          // Calculates the value with respect to the defined range (from this.min and this.max)
          const minValue = parseInt(this.min, 10);
          const maxValue = parseInt(this.max, 10);
          const valueRange = maxValue - minValue;
          const stepSize = parseInt(this.step, 10);
          const value = Math.floor(parseInt(newValue, 10) / stepSize) * stepSize;

          // Calculates the pixel position of the thumb from this.value
          let progress = value / valueRange;
          if (progress > 1) progress = 1;
          if (progress < 0) progress = 0;
          const thumbWidth = this.sliderThumb.clientWidth;
          this.sliderThumb.style.left = `calc(${(progress) * 100}% - ${thumbWidth / 2}px)`;
        }
        break;
      default:
    }
  }

  /** @override */
  static get observedAttributes() { return ['value']; }
}

registerCustomTag('core-slider', CoreSliderElement);

export default CoreSliderElement;
