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
  window.customElements.define(customTagName, elementClass);
}

/**
 * Attach the shadow DOM root, with a childElement if specified, to the
 * element. This should be called in the constructor.
 *
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
