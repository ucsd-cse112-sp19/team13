/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */

/*
// Feast your eyes upon the basic web component.

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
 * The key for whether to stop propagating update requests with the element.
 * @private
 */
export const stopPropagateUpdate = Symbol('stopPropagateUpdate');

/**
 * The key for requestPropertyUpdate to determine if the data is set from attribute side.
 * @private
 */
export const ATTRIBUTE_SIDE = Symbol('ATTRIBUTE_SIDE');

/**
 * The key for requestPropertyUpdate to determine if the data is set from property side.
 * @private
 */
export const PROPERTY_SIDE = Symbol('PROPERTY_SIDE');

/**
 * Gets the converted property value from string to its expected type.
 * @private
 */
export function attributeToPropertyData(propertyType, attributeData) {
  switch (propertyType || String) {
    case Object:
      return JSON.parse(attributeData);
    case Boolean:
      // Although this is usually handled in getAttributeData(), sometimes
      // you need to parse attribute data directly without access to the
      // element. The only valid FALSE value for an attribue is to not
      // declare it. Therefore, it's value could either be undefined or null.
      return attributeData !== null || typeof attributeData !== 'undefined';
    default:
      // This should not only handle custom type functions, but also
      // String, Number, etc.
      if (typeof propertyType === 'function') return propertyType(attributeData);
      return attributeData;
  }
}

/**
 * Gets the converted attribute value from its property type to a string.
 * @private
 */
export function propertyToAttributeData(propertyType, propertyData) {
  switch (propertyType || String) {
    case Object:
      return JSON.stringify(propertyData);
    default:
      return propertyData;
  }
}

/**
 * Gets the property value from the current attribute value.
 * @private
 */
export function getAttributeData(element, attribute, opts) {
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
export function setAttributeData(element, attribute, opts, value = null) {
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

/**
 * Called by property setters to signify a change in value. This will usually update the
 * attribute or allow the user to handle the change.
 * @private
 */
export function requestPropertyUpdate(element, property, opts, oldValue, newValue, side) {
  // Don't propagate changes until the end of ALL the changes here.
  if (element[stopPropagateUpdate]) return;

  // Stop changes from propagating! :(
  element[stopPropagateUpdate] = true;

  // Handle changes only if this is a connected element...
  if (side === ATTRIBUTE_SIDE) {
    element[property] = newValue;
  } else if (side === PROPERTY_SIDE && element.isConnected && opts.reflect) {
    setAttributeData(element, opts.attribute, opts, newValue);
  }

  // If element has callback, call it.
  if (typeof element.propertyChangedCallback === 'function') {
    element.propertyChangedCallback(property, oldValue, newValue);
  }

  // Allow changes to propagate again! :D
  element[stopPropagateUpdate] = false;
}

/**
 * Creates object property descriptor for property.
 * @private
 */
export function createPropertyDescriptor(property, opts) {
  const dataKey = `__${property}`;
  return {
    get() {
      let value;
      if (opts.attributeOnly) {
        value = getAttributeData(this, opts.attribute, opts);
      } else {
        value = this[dataKey];
      }

      if (opts.get) {
        value = opts.get.call(this, value);
      }
      return value;
    },
    set(value) {
      const prevValue = this[property];
      if (opts.set) {
        value = opts.set.call(this, value, prevValue);
      }

      // It's already up-to-date.
      if (prevValue === value) return;

      // If it is attributeOnly, data will be handled in requested property update.
      if (opts.attributeOnly) {
        setAttributeData(this, opts.attribute, opts, value);
      } else {
        this[dataKey] = value;
      }

      // ... then update if necessary ...
      requestPropertyUpdate(this, property, opts, prevValue, value, PROPERTY_SIDE);
    },

    // This is by default...
    configurable: true,
    enumerable: true,
  };
}

/**
 * Creates a property for the element linked with an attribute, along with data.
 * This will also setup any getters and setters needed to maintain the data link.
 * However, this does not handle attribute data changes. To be fully effective,
 * the changed property should be set in attributeChangedCallback(). For example:
 *
 * @example
 * attributeChangedCallback(attribute, oldValue, newValue) {
 *  // Assumes the property name is the same as the attribute name.
 *  // This may not always be the case for camelCase properties.
 *  this[attribute] = newValue;
 * }
 *
 * @private
 * @param {HTMLElement} element     the element to add the property to.
 * @param {String} property         the property name
 * @param {Object} opts             the additional property options
 * @param {*|Function} opts.type    the type of the property. If a function, it will be
 *                                  called with the attribute data string to parse to a valid
 *                                  property value.
 * @param {Boolean} [opts.reflect]  whether to reflect the property changes to attributes
 * @param {String} [opts.attribute] the attribute name linked to the property. If undefined,
 *                                  it will convert the property name to dash-case and use
 *                                  that instead. If null, no changes to any attribute will
 *                                  update this property.
 * @param {Function} [opts.set]     if set, called before the property setter for a
 *                                  chance to alter the value before change.
 * @param {Function} [opts.get]       if set, called after the property getter for a
 *                                  chance to alter the value before return.
 */
export function addProperty(element, property, opts) {
  const propertyDescriptor = createPropertyDescriptor(property, opts);

  // Upgrade initially set property. So any properties defined in the constructor (or earlier by
  // other frameworks) are treated as default values for the new created property.
  if (element.hasOwnProperty(property)) {
    const defaultValue = element[property];
    delete element[property];

    // Call setter on element for default value. This allows reflection and other type handling.
    propertyDescriptor.set.call(element, defaultValue);
  }

  // TODO: If Angular didn't set values BEFORE the constructor, we could allow
  // users to modify the getters and setters. But, assuming they use defineProperty(),
  // any user-defined changes will be overriden by Angular. Therefore, for now,
  // existing accessors with the same name as properties are errors.

  // Do not override user-defined getters and setters. Tell them it's wrong!
  // If they want to modify the data as it is set, they should use
  // propertyChangedCallback() instead.
  const existingDescriptor = Object.getOwnPropertyDescriptor(element, property);
  if (existingDescriptor) {
    if (typeof existingDescriptor.get === 'function') {
      throw new Error('Found conflicting getter for instance.');
    }
    if (typeof existingDescriptor.set === 'function') {
      throw new Error('Found conflicting setter for instance.');
    }
  }

  // Add the property to the element.
  Object.defineProperty(element, property, propertyDescriptor);
}

/**
 * Load and initialize the properties for the element. This should be called
 * in the constructor. Otherwise, some browsers may auto-insert their own
 * property-attribute entries, which will incur infinite loops.
 *
 * An alternative to this would be to call addProperty() for every property.
 * @private
 */
export function constructProperties(element, properties) {
  Object.keys(properties).forEach((property) => {
    addProperty(element, property, properties[property]);
  });
}

/**
 * Gets the lowercase, dash-separated attribute name from the property name.
 * Any uppercase characters are prepended with a dash. In other words, it
 * transforms the property name, which is in camelCase, to valid attribute
 * name, in dash-case.
 * @private
 */
export function getAttributeNameFromProperty(property) {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
}
