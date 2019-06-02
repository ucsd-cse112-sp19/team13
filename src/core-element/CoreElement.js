/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/**
 * Useful utility functions for creating web components.
 * @module CoreElement
 */

import * as WebComponent from './WebComponent';
import * as ClassProperty from './ClassProperty';

/** The base element for web components to handle as much boilerplate code as possible. */
class CoreElement extends HTMLElement {
  /**
   * Builds the property map and properly initializes the class. This is only done once by
   * observedAttributes().
   */
  static buildProperties() {
    ClassProperty.buildClassProperties(this);
  }

  /** @override */
  static get observedAttributes() {
    this.buildProperties();
    return Array.from(this[ClassProperty.classProperties].attributes.keys());
  }

  /**
   * Creates a core element.
   * @param {Node} templateString the html template node to attach to the shadow root.
   */
  constructor(templateNode = null) {
    super();

    // Why shadow root? Encapsulation and separation of style.
    // Why initialize here? Cause no one can mess with this.

    // Attach the shadow root to this element and appends the templateNode as a child, if it exists.
    WebComponent.attachShadowRoot(this, templateNode);

    // Create all properties for this instance.
    ClassProperty.constructProperties(this);
  }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    ClassProperty.handleAttributeChange(this, attribute, oldValue, newValue);
  }

  /** @override */
  // eslint-disable-next-line class-methods-use-this
  connectedCallback() {}

  /** @override */
  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {}

  /** @override */
  // eslint-disable-next-line class-methods-use-this
  adoptedCallback() {}

  /**
   * Called by property setters (and attributeChangedCallback) with new values of property type.
   * Any further changes to properties will not re-call propertyChangedCallback(), therefore any
   * transformations to data should be handled here.
   * @param {String|Symbol} property the property key
   * @param {*} oldValue the previous value for the property
   * @param {*} newValue the next value for the property
   */
  // eslint-disable-next-line class-methods-use-this
  propertyChangedCallback() {}
}

// Aliases for template and custom tag functions
CoreElement.templateNode = WebComponent.createTemplate;
CoreElement.customTag = WebComponent.registerCustomTag;
CoreElement.shadowRoot = WebComponent.attachShadowRoot;

export default CoreElement;
