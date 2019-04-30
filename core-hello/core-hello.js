import { attachShadowRoot, createElement } from './wcutil';

const HELLO_STRING = {
  en: 'Hello World',
  es: 'Hola Mundo',
  jp: 'こんにちは世界',
  fr: 'Bonjour le monde',
};

/**
 * An element that displays "Hello" with the passed-in name.
 */
class CoreHelloElement extends HTMLElement {
  /**
   * Creates a CoreHello element and attaches the shadow root
   * @constructor
   */
  constructor() {
    super();

    const template = createElement('template', {}, `
            <label>
                <span id="hello">${HELLO_STRING.en}</span>
                <slot></slot>
            </label>
            <style>
              :host {
                display: block;
                contain: content;
            
                font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                color: black;
              }
              
              :host([rainbow]) {
                animation: rainbow 6s infinite; 
              }
              
              @keyframes rainbow {
                0%  { color: red }
                15% { color: orange }
                30% { color: yellow }
                45% { color: green }
                60% { color: blue }
                75% { color: indigo }
                90% { color: violet }
                100%{ color: red }
              }
            </style>
        `);
    attachShadowRoot(this, template);

    this.helloElement = this.shadowRoot.querySelector('#hello');
  }

  /**
   * @override
   */
  // connectedCallback() { }

  /**
    * @override
    */
  // disconnectedCallback() { }

  /**
    * @override
    */
  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case 'lang':
        this.helloElement.textContent = HELLO_STRING[newValue] || HELLO_STRING.en;
        break;
      default:
    }
  }

  /**
   * @override
   */
  static get observedAttributes() { return ['lang']; }

  /**
   * Get the attribute that represents the name that will be displayed.
   *
   * @type {String}
   */
  get name() { return this.getAttribute('name'); }

  /**
   * Set the attribute that represents the name that will be displayed.
   *
   * @type {String}
   */
  set name(opts) { this.setAttribute('name', opts); }

  /**
   * Get the attribute that represents whether the name should be colorfully animated.
   *
   * @type {String}
   */
  get rainbow() { return this.hasAttribute('rainbow'); }

  /**
   * Set the attribute that represents whether the name should be colorfully animated.
   *
   * @type {String}
   */
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

// Define custom element for html
window.customElements.define('core-hello', CoreHelloElement);
export default CoreHelloElement;
