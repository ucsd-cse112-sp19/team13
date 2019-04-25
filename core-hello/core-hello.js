import { attachShadowRoot, createElement } from './wcutil.js';

const HELLO_STRING = "Hello World";

/**
 * An element that displays "Hello" with the passed-in name.
 */
export default class CoreHelloElement extends HTMLElement
{
    /**
     * Creates a CoreHello element and attaches the shadow root
     * @constructor
     */
    constructor()
    {
		super();

		const template = createElement('template', {}, `
            <label>
                ${HELLO_STRING} <slot name="name"></slot>
            </label>
			<style>
				:host {
					display: block;
					contain: content;
				}
			</style>
		`);
		attachShadowRoot(this, template);
    }

    /**
     * @override
     */
	static get observedAttributes() { return []; }

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
    set rainbow(opts)
    {
        if (opts)
        {
            this.setAttribute('rainbow', '');
        }
        else
        {
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

    /**
     * @override
     */
    connectedCallback() {}

    /**
     * @override
     */
    disconnectedCallback() {}

    /**
     * @override
     */
    attributeChangedCallback(attribute, oldValue, newValue) {}
}

//Define custom element for html
window.customElements.define('core-hello', CoreHelloElement);