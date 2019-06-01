/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/**
 * Useful utility functions for creating web components.
 * @module CoreElement
 */

/**
 * Creates the template element for the passed-in template and style content.
 * @param {String} templateString   The template html string representation
 * @param {String} styleString      The style css string representation
 * @returns {Node} the created template element
 */
export function createTemplate(templateString = '', styleString = '') {
  const contentString = `<template><style>${styleString.toString()}</style>${templateString}</template>`;
  const fragment = document.createRange().createContextualFragment(contentString);
  const templateElement = fragment.firstElementChild;
  document.head.appendChild(fragment);
  return templateElement;
}

/**
 * Register the passed-in element class with the passed-in tag name for the document.
 * @param {String} customTagName  The tag name that represents the class in HTML
 * @param {Class} elementClass    The class to represent
 */
export function registerCustomTag(customTagName, elementClass) {
  if (!window.customElements.get(customTagName)) {
    window.customElements.define(customTagName, elementClass);
  }
}

/**
 * Attach the shadow DOM root, with a childElement if specified, to the
 * element. This should be called in the constructor.
 * @param {Node} element         The element to attach to
 * @param {Node?} childElement   The child element in the shadow DOM root
 * @return {Node}                The attached shadow root
 */
export function attachShadowRoot(element, childElement = null) {
  const shadowRoot = element.attachShadow({ mode: 'open' });
  if (childElement) {
    shadowRoot.appendChild(childElement.content.cloneNode(true));
  }
  return shadowRoot;
}

/**
 * Creates an element of the passed-in tag name with the passed-in props and children.
 * @param {String} tagName        The element tag to create
 * @param {Object} [props = {}]   The props to assign to the created element
 * @param  {...Node} children     The children to append to the created element
 * @returns {Node} the created element
 */
export function createElement(tagName, props = {}, ...children) {
  const element = document.createElement(tagName);
  Object.assign(element, props);
  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
    } else {
      element.appendChild(document.createTextNode(child));
    }
  });
  return element;
}

/**
 * The key for the map of properties associated with the class.
 * @private
 */
const classProperties = Symbol('classProperties');

/**
 * The key for the attribute-to-property name map for the class.
 * @private
 */
const attributePropertyMap = Symbol('attributePropertyMap');

/**
 * Gets the lowercase, dash-separated attribute name from the property name.
 * Any uppercase characters are prepended with a dash. In other words, it
 * transforms the property name, which is in camelCase, to valid attribute
 * name, in dash-case.
 */
function getAttributeNameFromProperty(property) {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Gets the converted property value from string to its expected type.
 * @private
 */
function getConvertedPropertyValue(value, type = null) {
  switch (type || String) {
    case Number:
      return Number(value);
    case Object:
      return JSON.parse(value);
    case Boolean:
    case String:
      return value;
    default:
      if (typeof type === 'function') return type(value);
      return value;
  }
}

/**
 * Gets the property value from the current attribute value.
 * @private
 */
function getPropertyAttribute(element, attributeName, propOpts) {
  if (propOpts.type === Boolean) {
    return element.hasAttribute(attributeName);
  }
  const attributeValue = element.getAttribute(attributeName);
  return getConvertedPropertyValue(attributeValue, propOpts.type);
}

/**
 * Sets the current attribute value to the property value.
 * @private
 */
function setPropertyAttribute(element, attributeName, propOpts, value) {
  const type = propOpts.type || String;
  if (type === Boolean) {
    if (value) {
      element.setAttribute(attributeName, '');
    } else {
      element.removeAttribute(attributeName);
    }
  } else if (type === Object) {
    element.setAttribute(attributeName, JSON.stringify(value));
  } else if (type === String || type === Number || typeof type === 'function') {
    element.setAttribute(attributeName, value);
  } else {
    element.setAttribute(attributeName, `${value}`);
  }
}

/**
 * Updates the property once attribute has changed.
 * @private
 */
function updateProperty(element, propertyName, oldValue, newValue) {
  let oldPropValue = oldValue;
  let newPropValue = newValue;

  if (element.constructor.hasOwnProperty('properties')) {
    const propOpts = element.constructor.properties[propertyName];
    oldPropValue = getConvertedPropertyValue(oldValue, propOpts.type);
    newPropValue = getConvertedPropertyValue(newValue, propOpts.type);
  }

  if (typeof element.propertyChangedCallback === 'function') {
    element.propertyChangedCallback(propertyName, oldPropValue, newPropValue);
  }
}

/**
 * Create the property with its associated getters and setters.
 * @private
 */
function createProperty(elementClass, name, opts) {
  if (typeof opts.attribute === 'undefined') {
    opts.attribute = getAttributeNameFromProperty(name);
  }
  const attributeName = opts.attribute;
  elementClass[classProperties].set(name, opts);
  elementClass[attributePropertyMap].set(attributeName, name);

  const result = {
    get() {
      return getPropertyAttribute(this, attributeName, opts);
    },
    set(value) {
      setPropertyAttribute(this, attributeName, opts, value);
    },
    configurable: true,
    enumerable: true,
  };

  const propDescriptor = Object.getOwnPropertyDescriptor(elementClass.prototype, name);
  if (propDescriptor) {
    if (typeof propDescriptor.get === 'function') {
      delete result.get;
    }
    if (typeof propDescriptor.set === 'function') {
      delete result.set;
    }
  }
  Object.defineProperty(elementClass.prototype, name, result);
}

/** Retrieves a list of all property keys, strings and symbols included. */
function getPropertyKeys(object) {
  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
  ];
}

/** Prepares the default prop values for the element */
function setupDefaultProps(element, props) {
  for (const prop of getPropertyKeys(props)) {
    const propOpt = props[prop];
    if (propOpt.hasOwnProperty('value') && !element.hasAttribute(propOpt.attribute)) {
      element[prop] = propOpt.value;
    }
  }
}

/** Copies the class props from the passed-in srcClass to the dstClass. */
function copyClassProperties(srcClass, dstClass) {
  if (srcClass.hasOwnProperty(classProperties)) {
    const dstProps = dstClass[classProperties];
    const dstAttribs = dstClass[attributePropertyMap];
    srcClass[classProperties].forEach((value, key) => {
      dstProps.set(key, value);
    });
    srcClass[attributePropertyMap].forEach((value, key) => {
      dstAttribs.set(key, value);
    });
  }
}

/** The base element for web components to handle as much boilerplate code as possible. */
class CoreElement extends HTMLElement {
  /**
   * Builds the property map and properly initializes the class. This is only done once by
   * observedAttributes().
   */
  static buildProperties() {
    if (this.hasOwnProperty(classProperties)) { return; }

    // Build properties for parents
    const superConstructor = Object.getPrototypeOf(this);
    if (typeof superConstructor.buildProperties === 'function') {
      superConstructor.buildProperties();
    }

    // Initialize current property map
    this[classProperties] = new Map();
    this[attributePropertyMap] = new Map();
    // ... with parent's properties ...
    copyClassProperties(superConstructor, this);

    // Add new properties to the hierarchy (don't re-add old ones).
    if (this.hasOwnProperty('properties')) {
      const props = this.properties;
      const propKeys = getPropertyKeys(props);
      for (const prop of propKeys) {
        createProperty(this, prop, props[prop]);
      }
    }
  }

  /** @override */
  static get observedAttributes() {
    this.buildProperties();
    return Array.from(this[classProperties].keys());
  }

  /**
   * Creates a core element.
   * @param {String} templateString the html template string to attach to the
   *                                DOM and create a shadow root from.
   */
  constructor(templateString = null) {
    super();
    if (templateString) {
      attachShadowRoot(this, templateString);
    }
  }

  /** @override */
  connectedCallback() {
    // Set default values from props for the element if no attribute values were specified
    if ('properties' in this.constructor) {
      setupDefaultProps(this, this.constructor.properties);
    }
  }

  /** @override */
  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() {}

  /** @override */
  // eslint-disable-next-line class-methods-use-this
  adoptedCallback() {}

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue !== newValue) {
      updateProperty(this, attribute, oldValue, newValue);
    }
  }

  /**
   * Called by attributeChangedCallback with values conforming to set prop type.
   * @param {String|Symbol} property the property key
   * @param {*} oldValue the previous value for the property
   * @param {*} newValue the next value for the property
   */
  // eslint-disable-next-line class-methods-use-this
  propertyChangedCallback() {}
}

// Aliases for template and custom tag functions
CoreElement.template = createTemplate;
CoreElement.customTag = registerCustomTag;

export default CoreElement;
