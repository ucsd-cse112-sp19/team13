/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */

import * as ElementProperty from './ElementProperty';

/**
 * The key for the map of properties associated with the class.
 * @private
 */
export const classProperties = Symbol('classProperties');

/**
 * Checks whether the class has initialized class properties.
 * @private
 */
export function hasClassProperties(elementClass) {
  return elementClass.hasOwnProperty(classProperties);
}

/**
 * Adds a property to the class properties. These are used to define the properties
 * of its children and instances.
 * @private
 */
export function addClassProperty(elementClass, property, opts) {
  // Define attribute name for property...
  if (typeof opts.attribute === 'undefined') {
    opts.attribute = ElementProperty.getAttributeNameFromProperty(property);
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
export function defineClassProperties(elementClass) {
  let optionMap;
  let attributeMap;

  // Build properties for parents too...
  const superClass = Object.getPrototypeOf(elementClass);
  if (typeof superClass.buildProperties === 'function') {
    superClass.buildProperties();
  }

  if (superClass && hasClassProperties(superClass)) {
    // Derive class properties from parent...
    const superClassProperties = superClass[classProperties];
    optionMap = new Map(superClassProperties.options);
    attributeMap = new Map(superClassProperties.attributes);
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
 * Builds the property map and properly initializes the class. This is only done once by
 * observedAttributes().
 * @private
 */
export function buildClassProperties(elementClass) {
  if (hasClassProperties(elementClass)) return;

  // Initialize current property map (with parent's properties).
  defineClassProperties(elementClass);

  // Add new properties to the hierarchy (don't re-add old ones).
  if (elementClass.hasOwnProperty('properties')) {
    for (const property of Object.getOwnPropertyNames(elementClass.properties)) {
      addClassProperty(elementClass, property, elementClass.properties[property]);
    }
  }
}

/**
 * Load and initialize the properties for the element. This should be called
 * in the constructor. Otherwise, some browsers may auto-insert their own
 * property-attribute entries, which will incur infinite loops.
 *
 * This does the same thing as calling addProperty() for every property.
 * @private
 */
export function constructProperties(element) {
  const elementClass = element.constructor;
  const elementClassProperties = elementClass[classProperties];
  for (const [property, opts] of elementClassProperties.options.entries()) {
    ElementProperty.addProperty(element, property, opts);
  }
}

export function handleAttributeChange(element, attribute, oldValue, newValue) {
  // Don't bother parsing if the attribute data string is the same.
  if (oldValue === newValue) return;

  const elementClass = element.constructor;
  // Not all attributes are added/handled in class properties...
  const elementClassProperties = elementClass[classProperties];
  if (elementClassProperties.attributes.has(attribute)) {
    // Gets the property linked to the attribute.
    const property = elementClassProperties.attributes.get(attribute);
    const opts = elementClassProperties.options.get(property);

    // Parse the attribute data strings to property values of valid type.
    const oldPropertyValue = opts.attributeOnly
      ? ElementProperty.attributeToPropertyData(opts.type, oldValue)
      : element[property];
    const newPropertyValue = ElementProperty.attributeToPropertyData(opts.type, newValue);

    // Will cause the element to update data. Since this is called
    // whenever a change occurs on the tag, even at the beginning,
    // the data will always be synchronized when attribute is set.
    ElementProperty.requestPropertyUpdate(element, property, opts,
      oldPropertyValue, newPropertyValue, ElementProperty.ATTRIBUTE_SIDE);
  }
}
