!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=12)}([function(t,e,o){"use strict";function n(t,e=null,o={mode:"open"}){const n=t.attachShadow(o);return e&&n.appendChild(e.content.cloneNode(!0)),n}const r=Symbol("stopPropagateUpdate"),s=Symbol("ATTRIBUTE_SIDE"),i=Symbol("PROPERTY_SIDE");function a(t,e){switch(t||String){case Object:return JSON.parse(e);case Boolean:return null!==e||void 0!==e;default:return"function"==typeof t?t(e):e}}function l(t,e,o,n=null){if(o.type===Boolean)return void(n?t.setAttribute(e,""):t.removeAttribute(e));const r=function(t,e){switch(t||String){case Object:return JSON.stringify(e);default:return e}}(o.type,n);t.setAttribute(e,r)}function c(t,e,o,n,a,c){t[r]||(t[r]=!0,c===s?t[e]=a:c===i&&t.isConnected&&o.reflect&&l(t,o.attribute,o,a),"function"==typeof t.propertyChangedCallback&&t.propertyChangedCallback(e,n,a),t[r]=!1)}function u(t,e){const o=`__${t}`;return{get(){let t;return t=e.attributeOnly?function(t,e,o){const n=o.type;return n===Boolean?t.hasAttribute(e):a(n,t.getAttribute(e))}(this,e.attribute,e):this[o],e.get&&(t=e.get.call(this,t)),t},set(n){const r=this[t];e.set&&(n=e.set.call(this,n,r)),r!==n&&(e.attributeOnly?l(this,e.attribute,e,n):this[o]=n,c(this,t,e,r,n,i))},configurable:!0,enumerable:!0}}function p(t,e,o){const n=u(e,o);if(t.hasOwnProperty(e)){const o=t[e];delete t[e],n.set.call(t,o)}const r=Object.getOwnPropertyDescriptor(t,e);if(r){if("function"==typeof r.get)throw new Error("Found conflicting getter for instance.");if("function"==typeof r.set)throw new Error("Found conflicting setter for instance.")}Object.defineProperty(t,e,n)}const h=Symbol("classProperties");function f(t){return t.hasOwnProperty(h)}function d(t,e,o){void 0===o.attribute&&(o.attribute=function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}(e));const n=t[h];n.options.set(e,o),o.attribute&&n.attributes.set(o.attribute,e)}function b(t){if(!f(t)&&(function(t){let e,o;const n=Object.getPrototypeOf(t);if("function"==typeof n.buildProperties&&n.buildProperties(),n&&f(n)){const t=n[h];e=new Map(t.options),o=new Map(t.attributes)}else e=new Map,o=new Map;t[h]={options:e,attributes:o}}(t),t.hasOwnProperty("properties")))for(const e of Object.getOwnPropertyNames(t.properties))d(t,e,t.properties[e])}class m extends HTMLElement{static buildProperties(){b(this)}static get observedAttributes(){return this.buildProperties(),Array.from(this[h].attributes.keys())}constructor(t=null){super(),n(this,t),function(t){const e=t.constructor[h];for(const[o,n]of e.options.entries())p(t,o,n)}(this)}attributeChangedCallback(t,e,o){!function(t,e,o,n){if(o===n)return;const r=t.constructor[h];if(r.attributes.has(e)){const i=r.attributes.get(e),l=r.options.get(i);c(t,i,l,l.attributeOnly?a(l.type,o):t[i],a(l.type,n),s)}}(this,t,e,o)}connectedCallback(){}disconnectedCallback(){}adoptedCallback(){}propertyChangedCallback(){}}m.templateNode=function(t="",e=""){const o=`<template><style>${e.toString()}</style>${t}</template>`,n=document.createRange().createContextualFragment(o),r=n.firstElementChild;return document.head.appendChild(n),r},m.customTag=function(t,e){window.customElements.get(t)||window.customElements.define(t,e)},m.shadowRoot=n;e.a=m},function(t,e,o){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=function(t,e){var o=t[1]||"",n=t[3];if(!n)return o;if(e&&"function"==typeof btoa){var r=(i=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),s=n.sources.map(function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"});return[o].concat(s).concat([r]).join("\n")}var i;return[o].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},r=0;r<this.length;r++){var s=this[r][0];null!=s&&(n[s]=!0)}for(r=0;r<t.length;r++){var i=t[r];null!=i[0]&&n[i[0]]||(o&&!i[2]?i[2]=o:o&&(i[2]="("+i[2]+") and ("+o+")"),e.push(i))}},e}},,,,,,function(t,e){t.exports="<span id=tooltip-back> <slot id=tooltip-content></slot> </span>"},function(t,e,o){(t.exports=o(1)(!1)).push([t.i,':host {\n    display: inline-block;\n    position: absolute;\n    top: 0%;\n    left: 50%;\n    transform: translate(-50%, calc(-100% - var(--arrow-size)));\n\n    opacity: 0;\n    transition: opacity 0.3s ease;\n\n    z-index: 1000;\n\n    pointer-events: none;\n\n    --back-color: white;\n    --border-color: black;\n    --arrow-size: 0.5rem;\n}\n\n#tooltip-back {\n    min-width: var(--arrow-size);\n    min-height: var(--arrow-size);\n\n    border-style: solid;\n    border-radius: 0.5rem;\n    border-color: var(--border-color);\n\n    display: flex;\n    flex-direction: row;\n    padding: 0.5rem;\n    background: var(--back-color);\n}\n\n#tooltip-back::after {\n    content: " ";\n    position: absolute;\n    top: 100%; /* At the bottom of the tooltip */\n    left: 50%;\n    border-width: var(--arrow-size);\n    border-style: solid;\n    border-color: var(--border-color) transparent transparent transparent;\n    transform: translate(-50%, 0%);\n}\n\n:host([effect=light]) {\n    color: black;\n    --border-color: black;\n    --back-color: white;\n}\n\n:host([effect=dark]) {\n    color: white;\n    --border-color: black;\n    --back-color: black;\n}\n\n:host([placement=right]) {\n    top: 50%;\n    left: 100%;\n    transform: translate(var(--arrow-size), -50%);\n}\n:host([placement=right]) span#tooltip-back::after {\n    top: 50%;\n    left: 0%; /* At the left of the tooltip */\n    border-color: transparent var(--border-color) transparent transparent;\n    transform: translate(-100%, -50%);\n}\n\n:host([placement=left]) {\n    top: 50%;\n    left: 0%;\n    transform: translate(calc(-100% - var(--arrow-size)), -50%);\n}\n:host([placement=left]) span#tooltip-back::after {\n    top: 50%;\n    left: 100%; /* At the right of the tooltip */\n    border-color: transparent transparent transparent var(--border-color);\n    transform: translate(0%, -50%);\n}\n\n:host([placement=bottom]) {\n    top: 100%;\n    left: 50%;\n    transform: translate(-50%, var(--arrow-size));\n}\n:host([placement=bottom]) span#tooltip-back::after {\n    top: 0%; /* At the top of the tooltip */\n    left: 50%;\n    border-color: transparent transparent var(--border-color) transparent;\n    transform: translate(-50%, -100%);\n}',""])},,,,function(t,e,o){"use strict";o.r(e);var n=o(0),r=o(7),s=o.n(r),i=o(8),a=o.n(i);const l=n.a.templateNode(s.a,a.a);class c extends n.a{static get properties(){return{placement:{type:String},content:{type:String},openDelay:{type:Number},closeDelay:{type:Number},for:{type:String},focusable:{type:Boolean}}}constructor(){super(l),this.tooltipSlot=this.shadowRoot.querySelector("#tooltip-content"),this.target=null,this.openTimeout=null,this.closeTimeout=null,this.onMouseEnter=this.onMouseEnter.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this),this.onTooltipOpen=this.onTooltipOpen.bind(this),this.onTooltipClose=this.onTooltipClose.bind(this),this.onFocus=this.onFocus.bind(this),this.onBlur=this.onBlur.bind(this),this.openDelay=0,this.closeDelay=1e3}propertyChangedCallback(t,e,o){switch(t){case"content":this.tooltipSlot.textContent=o;break;case"for":{const t=document.querySelector(`#${o}`);t?this.setTarget(t):this.setTarget(this.shadowRoot.host.parentElement)}}}connectedCallback(){super.connectedCallback();const t=this.shadowRoot.host.parentElement;t.style.position="relative",this.for||this.setTarget(t)}disconnectedCallback(){super.disconnectedCallback(),this.clearTarget(),this.clearTimeout()}setTarget(t){this.target&&this.clearTarget(),t&&(t.addEventListener("mouseenter",this.onMouseEnter),t.addEventListener("mouseleave",this.onMouseLeave),t.addEventListener("focus",this.onFocus),t.addEventListener("blur",this.onBlur),this.target=t)}clearTarget(){this.target&&(this.target.removeEventListener("mouseenter",this.onMouseEnter),this.target.removeEventListener("mouseleave",this.onMouseLeave),this.target.removeEventListener("focus",this.onFocus),this.target.removeEventListener("blur",this.onBlur),this.target=null)}clearTimeout(){this.openTimeout&&(clearTimeout(this.openTimeout),this.openTimeout=null),this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)}onMouseEnter(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null),this.openTimeout=setTimeout(this.onTooltipOpen,this.openDelay)}onMouseLeave(){this.openTimeout&&(clearTimeout(this.openTimeout),this.openTimeout=null),setTimeout(this.onTooltipClose,this.closeDelay)}onFocus(){this.focusable&&this.onTooltipOpen()}onBlur(){this.focusable&&this.onTooltipClose()}onTooltipOpen(){this.shadowRoot.host.style.opacity=1}onTooltipClose(){this.shadowRoot.host.style.opacity=0}}n.a.customTag("core-tooltip",c),e.default=c}]);