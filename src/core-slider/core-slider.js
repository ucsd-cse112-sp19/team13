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

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'value':
        {
          // Calculates the value with respect to the defined range (from this.min and this.max)
          const minValue = parseInt(this.min, 10);
          const maxValue = parseInt(this.max, 10);
          const valueRange = maxValue - minValue;
          const prevValue = parseInt(oldValue, 10);
          const nextValue = parseInt(newValue, 10);

          // Calculates the pixel position of the thumb from this.value
          let progress = (nextValue - minValue) / valueRange;
          if (progress > 1) progress = 1;
          if (progress < 0) progress = 0;
          const thumbWidth = this.sliderThumb.clientWidth;
          this.sliderThumb.style.left = `calc(${(progress) * 100}% - ${thumbWidth / 2}px)`;

          if (nextValue !== prevValue) {
            this.dispatchEvent(new Event('change', {
              bubbles: true,
              composed: true,
            }));
          }
        }
        break;
      default:
    }
  }

  /** @override */
  static get observedAttributes() { return ['value']; }

  /**
   * Is called when the mouse is clicked on the thumb.
   *
   * @param {Event} e the input event
   */
  // eslint-disable-next-line no-unused-vars
  onMouseDown(e) {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    e.preventDefault();
    e.stopPropagation();
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
    const result = lengthValue * sliderRatio + minValue;
    if (this.value !== result) {
      this.value = result;
    }
  }

  /**
   * Is called when the mouse is released anywhere.
   *
   * @param {Event} e the input event
   */
  // eslint-disable-next-line no-unused-vars
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
   * The min value of the slider. This is the lower bound for this.value.
   *
   * @type {Number}
   */
  get min() { return this.getAttribute('min'); }

  set min(value) { this.setAttribute('min', value); }

  /**
   * The max value of the slider. This is the upper bound for this.value.
   *
   * @type {Number}
   */
  get max() { return this.getAttribute('max'); }

  set max(value) { this.setAttribute('max', value); }

  /**
   * The current value of the slider. This will ALWAYS be within this.min and this.max.
   *
   * @type {Number}
   */
  get value() { return this.getAttribute('value'); }

  set value(value) {
    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    const stepSize = parseInt(this.step, 10);
    let result = Math.floor(parseInt(value, 10) / stepSize) * stepSize;
    if (result < minValue) result = minValue;
    if (result > maxValue) result = maxValue;
    this.setAttribute('value', `${result}`);
  }


  /**
   * Disables the elements from receiving inputs. In other words, this will disable all
   * user interactions with the element.
   *
   * @type {Boolean}
   */
  get disabled() { return this.hasAttribute('value'); }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * The step value of the slider. The value will always be some multiple of this,
   * starting from this.min.
   *
   * @type {Number}
   */
  get step() { return this.getAttribute('step'); }

  set step(value) { this.setAttribute('step'); }
}

registerCustomTag('core-slider', CoreSliderElement);

export default CoreSliderElement;
