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
 * @param {Object?} opts         The options passed to attachShadow()
 * @return {Node}                The attached shadow root
 */
export function attachShadowRoot(element, childElement = null, opts = { mode: 'open' }) {
  // Attach the shadow root to this element.
  const shadowRoot = element.attachShadow(opts);
  // Attach the template node to the shadow root, if it exists.
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

/*
// The basic web component.

const templateNode = ...
class CoreElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appenChild(templateNode.content.cloneNode(true));
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    this[attribute] = newValue;
  }

  set disabled(value) {
    if (this.__disabled === value) return;
    this.__disabled = value;

    // ... then update if necessary ...
  }

  get disabled() {
    return this.__disabled;
  }
}
*/

// ... and here is an abstraction of that.

/**
 * The key for the map of properties associated with the class.
 * @private
 */
const classProperties = Symbol('classProperties');

/**
 * The key for whether to stop propagating update requests with the element.
 * @private
 */
const stopPropagateUpdate = Symbol('stopPropagateUpdate');

/**
 * Gets the lowercase, dash-separated attribute name from the property name.
 * Any uppercase characters are prepended with a dash. In other words, it
 * transforms the property name, which is in camelCase, to valid attribute
 * name, in dash-case.
 * @private
 */
function getAttributeNameFromProperty(property) {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Adds a property to the class properties. These are used to define the properties
 * of its children and instances.
 * @private
 */
function addClassProperty(elementClass, property, opts) {
  // Define attribute name for property...
  if (typeof opts.attribute === 'undefined') {
    opts.attribute = getAttributeNameFromProperty(property);
  }

  // Add the property to the class.
  const elementClassProperties = elementClass[classProperties];
  elementClassProperties.options.set(property, opts);
  if (opts.attribute) {
    elementClassProperties.attributes.set(opts.attribute, property);
  }
}

/**
 * Creates a new class properties for the class.
 * @private
 */
function defineClassProperties(elementClass, srcClass = null) {
  let optionMap;
  let attributeMap;

  if (srcClass && srcClass.hasOwnProperty(classProperties)) {
    // Derive class properties from parent...
    const srcClassProperties = srcClass[classProperties];
    optionMap = new Map(srcClassProperties.options);
    attributeMap = new Map(srcClassProperties.attributes);
  } else {
    // Standalone class properties...
    optionMap = new Map();
    attributeMap = new Map();
  }

  // Actually assign class properties to result.
  elementClass[classProperties] = {
    options: optionMap,
    attributes: attributeMap,
  };
}

/**
 * Gets the converted property value from string to its expected type.
 * @private
 */
function attributeToPropertyData(propertyType, attributeData) {
  switch (propertyType || String) {
    case Object:
      return JSON.parse(attributeData);
    default:
      if (typeof propertyType === 'function') return propertyType(attributeData);
      return attributeData;
  }
}

/**
 * Gets the converted attribute value from its property type to a string.
 * @private
 */
function propertyToAttributeData(propertyType, propertyData) {
  switch (propertyType || String) {
    case Object:
      return JSON.stringify(propertyData);
    default:
      return propertyData;
  }
}

/**
 * Gets the property value from the current attribute value.
 *
 * Note: This is currently unused due to the fact that the data is now stored in the
 * element instance, rather than in the attributes.
 * @private
 */
function getAttributeData(element, attribute, opts) {
  const propertyType = opts.type;
  if (propertyType === Boolean) {
    return element.hasAttribute(attribute);
  }

  const attributeData = element.getAttribute(attribute);
  return attributeToPropertyData(propertyType, attributeData);
}

/**
 * Sets the current attribute value to the property value.
 * @private
 */
function setAttributeData(element, attribute, opts, value = null) {
  const propertyType = opts.type;
  // Booleans are special. As an attribute, they can be defined simply
  // by whether they exist and not by their actual data.
  if (propertyType === Boolean) {
    if (value) {
      element.setAttribute(attribute, '');
    } else {
      element.removeAttribute(attribute);
    }

    // If it's a boolean, its data is irrelevant. So stop here.
    return;
  }

  // Process the data, based on type.
  const attributeData = propertyToAttributeData(opts.type, value);
  element.setAttribute(attribute, attributeData);
}

function requestPropertyUpdate(element, property, opts, oldValue, newValue) {
  // NOTE: Not used if using attribute as data.
  /*
  // If reflect, change attribute to match.
  if (opts.reflect) {
    setAttributeData(this, opts.attribute, opts, value);
  }
  */

  // If element has callback, call it.
  if (typeof element.propertyChangedCallback === 'function' && !element[stopPropagateUpdate]) {
    element[stopPropagateUpdate] = true;
    element.propertyChangedCallback(property, oldValue, newValue);
    element[stopPropagateUpdate] = false;
  }
}

/**
 * Creates object property descriptor for property.
 * @private
 */
function createPropertyDescriptor(property, opts) {
  // NOTE: Not used if using attribute as data.
  // const dataKey = `__${property}`;

  return {
    get() {
      return getAttributeData(this, opts.attribute, opts);

      // NOTE: Not used if using attribute as data.
      // return this[dataKey];
    },
    set(value) {
      const prevValue = getAttributeData(this, opts.attribute, opts);
      if (prevValue === value) return;
      setAttributeData(this, opts.attribute, opts, value);

      // NOTE: Not used if using attribute as data.
      /*
      if (this[dataKey] === value) return;

      const prevValue = this[dataKey];
      this[dataKey] = value;
      */

      // ... then update if necessary ...
      requestPropertyUpdate(property, opts);
    },

    // This is by default...
    configurable: true,
    enumerable: true,
  };
}

/**
 * Creates a property for the element linked with an attribute, along with data.
 * This will also setup any getters and setters needed to maintain the data link.
 * @private
 */
function addPropertyToElement(element, property, opts) {
  const propertyDescriptor = createPropertyDescriptor(property, opts);

  // Upgrade initially set property. So any properties defined in the constructor (or earlier by
  // other frameworks) are treated as default values for the new created property.
  if (element.hasOwnProperty(property)) {
    const defaultValue = element[property];
    delete element[property];

    // Call setter on element for default value. This allows reflection and other type handling.
    propertyDescriptor.set.call(element, defaultValue);
  }

  // FIXME: this may cause issues, cause this would allow users to define
  // properties and accessors with the same name...

  // Do not override user-defined getters and setters.
  const existingDescriptor = Object.getOwnPropertyDescriptor(element, property);
  if (existingDescriptor) {
    if (typeof existingDescriptor.get === 'function') {
      throw new Error('Found conflicting getter for instance.');
      // delete propertyDescriptor.get;
    }
    if (typeof existingDescriptor.set === 'function') {
      throw new Error('Found conflicting setter for instance.');
      // delete propertyDescriptor.set;
    }
  }

  // Add the property to the element.
  Object.defineProperty(element, property, propertyDescriptor);
}

/**
 * Load and initialize the properties from element's class properties.
 * @private
 */
function loadProperties(element) {
  const elementClass = element.constructor;
  if (elementClass.hasOwnProperty(classProperties)) {
    elementClass[classProperties].options.forEach((opts, property) => {
      addPropertyToElement(element, property, opts);
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

    // Initialize current property map (with parent's properties)
    defineClassProperties(this, superConstructor);

    // Add new properties to the hierarchy (don't re-add old ones).
    if (this.hasOwnProperty('properties')) {
      for (const property of Object.getOwnPropertyNames(this.properties)) {
        addClassProperty(this, property, this.properties[property]);
      }
    }
  }

  /** @override */
  static get observedAttributes() {
    this.buildProperties();
    return Array.from(this[classProperties].attributes.keys());
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
    attachShadowRoot(this, templateNode);
  }

  /** @override */
  attributeChangedCallback(attribute, oldValue, newValue) {
    // Not all attributes are added/handled in class properties...
    const thisClassProperties = this.constructor[classProperties];
    if (thisClassProperties.attributes.has(attribute)) {
      // Gets the property linked to the attribute.
      const property = thisClassProperties.attributes.get(attribute);
      const opts = thisClassProperties.options.get(property);
      // Parse the new attribute data string to correct property type.
      const newPropertyValue = attributeToPropertyData(
        opts.type,
        newValue,
      );
      const oldPropertyValue = attributeToPropertyData(
        opts.type,
        oldValue,
      );

      // NOTE: Used only if data is kept on attributes.
      requestPropertyUpdate(this, property, opts, oldPropertyValue, newPropertyValue);

      // Will cause the element to update data. Since this is called
      // whenever a change occurs on the tag, even at the beginning,
      // the data will always be synchronized when attribute is set.
      // NOTE: Not used if data is kept on attributes.
      // this[property] = propertyData;
    }
  }

  /** @override */
  connectedCallback() {
    loadProperties(this);
  }

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
CoreElement.templateNode = createTemplate;
CoreElement.customTag = registerCustomTag;

export default CoreElement;
