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

/**
 * Creates a template DOM node that contains the parsed HTML and style string.
 * @function
 * @name templateNode
 * @param {String} templateString the html content
 * @param {String} styleString the style content
 */
CoreElement.templateNode = WebComponent.createTemplate;
/**
 * Registers the class to the specified custom tag name. The tag name must contain a dash.
 * @function
 * @name customTag
 * @param {String} tag the custom tag
 * @param {HTMLElement} elementClass the class to register the tag with
 */
CoreElement.customTag = WebComponent.registerCustomTag;
/**
 * Attaches the shadow DOM to the passed-in element. If using CoreElement, this is already
 * handled by the constructor if passed-in the tempate DOM node.
 * @function
 * @name shadowRoot
 * @param {HTMLElement} element the element root to attach the shadow DOM to
 * @param {Node} childNode the child of the shadow root to append
 */
CoreElement.shadowRoot = WebComponent.attachShadowRoot;

export default CoreElement;
