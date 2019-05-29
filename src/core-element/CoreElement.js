/**
 * Creates the template element for the passed-in template and style content.
 * @private
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
 * @private
 * @param {String} customTagName  The tag name that represents the class in HTML
 * @param {Class} elementClass    The class to represent
 */
export function registerCustomTag(customTagName, elementClass) {
  window.customElements.define(customTagName, elementClass);
}

/**
 * Attach the shadow DOM root, with a childElement if specified, to the
 * element. This should be called in the constructor.
 * @private
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
 * @private
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

const classProperties = Symbol('classProperties');

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

function getPropertyAttribute(element, attributeName, propOpts) {
  if (propOpts.type === Boolean) {
    return element.hasAttribute(attributeName);
  }
  const attributeValue = element.getAttribute(attributeName);
  return getConvertedPropertyValue(attributeValue, propOpts.type);
}

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

function updateProperty(element, attributeName, oldValue, newValue) {
  let oldPropValue = oldValue;
  let newPropValue = newValue;

  // eslint-disable-next-line no-prototype-builtins
  if (element.constructor.hasOwnProperty('properties')) {
    const propOpts = element.constructor.properties[attributeName];
    oldPropValue = getConvertedPropertyValue(oldValue, propOpts.type);
    newPropValue = getConvertedPropertyValue(newValue, propOpts.type);
  }

  if (typeof element.propertyChangedCallback === 'function') {
    element.propertyChangedCallback(attributeName, oldPropValue, newPropValue);
  }
}

function createProperty(elementClass, name, opts) {
  elementClass[classProperties].set(name, opts);

  const result = {
    get() {
      return getPropertyAttribute(this, name, opts);
    },
    set(value) {
      setPropertyAttribute(this, name, opts, value);
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

class CoreElement extends HTMLElement {
  static buildProperties() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty(classProperties)) { return; }

    // Build properties for parents
    const superConstructor = Object.getPrototypeOf(this);
    if (typeof superConstructor.buildProperties === 'function') {
      superConstructor.buildProperties();
    }

    // Initialie current property map
    const result = new Map();
    // ... with parent's properties ...
    // eslint-disable-next-line no-prototype-builtins
    if (superConstructor.hasOwnProperty(classProperties)) {
      superConstructor[classProperties].forEach((value, key) => {
        result.set(key, value);
      });
    }
    // ... actually add it to the class ...
    this[classProperties] = result;

    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty('properties')) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props),
      ];
      // eslint-disable-next-line no-restricted-syntax
      for (const prop of propKeys) {
        createProperty(this, prop, props[prop]);
      }
    }
  }

  /** @override */
  static get observedAttributes() {
    const attributes = [];

    this.buildProperties();
    this[classProperties].forEach((value, key) => {
      attributes.push(key);
    });

    return attributes;
  }

  constructor(templateString = null) {
    super();

    if (templateString) {
      attachShadowRoot(this, templateString);
    }
  }

  /** @override */
  connectedCallback() {
    // Set default values from props for the element if no attribute values were specified

    // eslint-disable-next-line no-prototype-builtins
    if (this.constructor.hasOwnProperty('properties')) {
      const props = this.constructor.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props),
      ];
      // eslint-disable-next-line no-restricted-syntax
      for (const prop of propKeys) {
        // eslint-disable-next-line no-prototype-builtins
        if (props[prop].hasOwnProperty('value')) {
          if (!this.hasAttribute(prop)) {
            this[prop] = props[prop].value;
          }
        }
      }
    }
  }

  /** @override */
  // disconnectedCallback() { }

  /** @override */
  // adoptedCallback() { }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    if (oldValue !== newValue) {
      updateProperty(this, attribute, oldValue, newValue);
    }
  }

  /**
   * Called by attributeChangedCallback with values conforming set prop type.
   * @interface propertyChangedCallback
   * @param {String|Symbol} property the property key
   * @param {*} oldValue the previous value for the property
   * @param {*} newValue the next value for the property
   */
}

// Aliases for template and custom tag functions
CoreElement.template = createTemplate;
CoreElement.customTag = registerCustomTag;

export default CoreElement;
