import TEMPLATE from './core-hello.html';
import STYLE from './core-hello.css';
import { createTemplate, attachShadowRoot, registerCustomTag } from '../wcutil';

const template = createTemplate(TEMPLATE, STYLE);

const HELLO_STRING = {
  en: 'Hello',
  es: 'Hola',
  jp: 'こんにちは',
  fr: 'Bonjour',
};

/**
 * An element that displays "Hello" with the passed-in name.
 */
class CoreHelloElement extends HTMLElement {
  /**
   * Creates a CoreHello element and attaches the shadow root
   */
  constructor() {
    super();
    attachShadowRoot(this, template);

    this.helloElement = this.shadowRoot.querySelector('#hello');
    this.nameElement = this.shadowRoot.querySelector('#name');
  }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'name':
        this.nameElement.textContent = newValue;
        break;
      case 'lang':
        this.helloElement.textContent = HELLO_STRING[newValue] || HELLO_STRING.en;
        break;
      default:
    }
  }

  /** @override */
  static get observedAttributes() { return ['name', 'lang']; }

  /**
   * The attribute that represents the name that will be displayed.
   *
   * @type {String}
   */
  get name() { return this.getAttribute('name'); }

  set name(opts) { this.setAttribute('name', opts); }

  /**
   * The attribute that represents whether the name should be colorfully animated.
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

  /**
   * Get the attribute that represents the language to display in.
   *
   * @type {String}
   */
  get lang() { return this.getAttribute('lang'); }

  /**
   * Set the attribute that represents the language to display in.
   *
   * @type {String}
   */
  set lang(opts) { this.setAttribute('lang', opts); }
}

registerCustomTag('core-hello', CoreHelloElement);

export default CoreHelloElement;
