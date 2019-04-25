/**
 * Attach the shadow DOM root, with a childElement if specified, to the
 * element. This should be called in the constructor.
 * 
 * @param {Node} element         The element to attach to
 * @param {Node?} childElement   The child element in the shadow DOM root
 * @return {Node}                The attached shadow root
 */
export function attachShadowRoot(element, childElement = null)
{
    const shadowRoot = element.attachShadow({ mode: 'open' });
    if (childElement)
    {
        shadowRoot.appendChild(childElement.content.cloneNode(true));
    }
    return shadowRoot;
}

export function createElement(tagName, props = {}, ...children)
{
    const element = document.createElement(tagName);
    Object.assign(element, props);
    children.forEach(child =>
    {
        if (child instanceof Node)
        {
            element.appendChild(child);
        }
        else
        {
            element.appendChild(document.createTextNode(child));
        }
    });
    return element;
}

export function html(strings, ...args)
{
    let result = '';
    strings.forEach((string, i) => {
        result += string + (args[i] || '');
    });
    return result;
}