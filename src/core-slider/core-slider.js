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

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.sliderThumb = this.shadowRoot.querySelector('#slider-thumb');
    this.sliderThumb.addEventListener('mousedown', this.onMouseDown);
    this.sliderThumb.addEventListener('touchstart', this.onTouchStart);

    this.slider = this.shadowRoot.querySelector('#slider');
  }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'value':
        {
          const nextValue = parseInt(newValue, 10);
          this.updateThumbPosition(nextValue);

          const prevValue = parseInt(oldValue, 10);
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

  /** @override */
  connectedCallback() {
    // Sets the default value for attributes
    if (!this.hasAttribute('step')) {
      this.setAttribute('step', 1);
    }
    if (!this.hasAttribute('min')) {
      this.setAttribute('min', 0);
    }
    if (!this.hasAttribute('max')) {
      this.setAttribute('max', 100);
    }
    if (!this.hasAttribute('value')) {
      this.setAttribute('value', 0);
    } else {
      this.updateThumbPosition(parseInt(this.value, 10));
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

    this.onThumbStart(e);
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

    this.onThumbStart(e);
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
   * Updates the thumb position to reflect the slider value.
   *
   * @private
   * @param {Number} value the current slider value
   */
  updateThumbPosition(value) {
    // Calculates the value with respect to the defined range (from this.min and this.max)
    const minValue = parseInt(this.min, 10);
    const maxValue = parseInt(this.max, 10);
    const valueRange = maxValue - minValue;

    // Calculates the pixel position of the thumb from this.value
    let progress = (value - minValue) / valueRange;
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

  /**
   * Whether the slider is orientated vertically.
   *
   * @type {Boolean}
   */
  get vertical() { return this.hasAttribute('vertical'); }

  set vertical(value) {
    if (value) {
      this.setAttribute('vertical', '');
    } else {
      this.removeAttribute('vertical');
    }
  }

  /**
   * The attribute that represents whether the bar should be colorfully animated.
   *
   * @type {String}
   */
  get rainbow() { return this.hasAttribute('rainbow'); }

  set rainbow(opts) {
    if (opts) {
      this.setAttribute('rainbow', '');
    } else {
      this.removeAttribute('rainbow');
    }
  }
}

registerCustomTag('core-slider', CoreSliderElement);

export default CoreSliderElement;
