!function(t,e,n,o,r,i){if("customElements"in t)i();else{if(t.WC_ENV)return void t.WC_ENV.then(i);var a=function(t,n){var o=e.createElement("script");o.type="text/javascript",o.readyState?o.onreadystatechange=function(){"loaded"!=o.readyState&&"complete"!=o.readyState||(o.onreadystatechange=null,n())}:o.onload=function(){n()},o.src=t,e.getElementsByTagName("head")[0].appendChild(o)},l=t.WC_ENV=(p=function(t){try{t()}catch(t){console.error(t)}},(f=[]).isDone=!1,f.exec=function(){f.splice(0).forEach(p)},f.then=function(t){return f.isDone?t():f.push(t),f},f);l.then(i);var c=t.WC_POLYFILL||"//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js",s=0,u=function(){--s||(l.isDone=!0,l.exec())};"Reflect"in t||t.SKIP_ES_POLYFILL?(s++,a(c,u)):(s++,a(t.ES_POLYFILL||"//cdnjs.cloudflare.com/ajax/libs/core-js/2.5.3/core.min.js",function(){a(c,u)}),function(){try{new Function("function* test() {}")()}catch(t){return!1}return!0}()||t.regeneratorRuntime||(s++,a(window.GE_POLYFILL||o,u)))}var f,p}(window,document,0,"//unpkg.com/regenerator-runtime@0.12.1/runtime.js",0,function(){!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=14)}([function(t,e,n){"use strict";function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{mode:"open"},o=t.attachShadow(n);return e&&o.appendChild(e.content.cloneNode(!0)),o}var r=Symbol("stopPropagateUpdate"),i=Symbol("ATTRIBUTE_SIDE"),a=Symbol("PROPERTY_SIDE");function l(t,e){switch(t||String){case Object:return JSON.parse(e);case Boolean:return null!==e||void 0!==e;default:return"function"==typeof t?t(e):e}}function c(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(n.type!==Boolean){var r=function(t,e){switch(t||String){case Object:return JSON.stringify(e);default:return e}}(n.type,o);t.setAttribute(e,r)}else o?t.setAttribute(e,""):t.removeAttribute(e)}function s(t,e,n,o,l,s){t[r]||(t[r]=!0,s===i?t[e]=l:s===a&&t.isConnected&&n.reflect&&c(t,n.attribute,n,l),"function"==typeof t.propertyChangedCallback&&t.propertyChangedCallback(e,o,l),t[r]=!1)}function u(t,e){var n="__".concat(t);return{get:function(){var t;return t=e.attributeOnly?function(t,e,n){var o=n.type;return o===Boolean?t.hasAttribute(e):l(o,t.getAttribute(e))}(this,e.attribute,e):this[n],e.get&&(t=e.get.call(this,t)),t},set:function(o){var r=this[t];e.set&&(o=e.set.call(this,o,r)),r!==o&&(e.attributeOnly?c(this,e.attribute,e,o):this[n]=o,s(this,t,e,r,o,a))},configurable:!0,enumerable:!0}}function f(t,e,n){var o=u(e,n);if(t.hasOwnProperty(e)){var r=t[e];delete t[e],o.set.call(t,r)}var i=Object.getOwnPropertyDescriptor(t,e);if(i){if("function"==typeof i.get)throw new Error("Found conflicting getter for instance.");if("function"==typeof i.set)throw new Error("Found conflicting setter for instance.")}Object.defineProperty(t,e,o)}function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function d(t,e,n){return e&&b(t.prototype,e),n&&b(t,n),t}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(){return Reflect.construct(HTMLElement,[],this.__proto__.constructor)}function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],o=!0,r=!1,i=void 0;try{for(var a,l=t[Symbol.iterator]();!(o=(a=l.next()).done)&&(n.push(a.value),!e||n.length!==e);o=!0);}catch(t){r=!0,i=t}finally{try{o||null==l.return||l.return()}finally{if(r)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.setPrototypeOf(v.prototype,HTMLElement.prototype),Object.setPrototypeOf(v,HTMLElement);var w=Symbol("classProperties");function T(t){return t.hasOwnProperty(w)}function O(t,e,n){void 0===n.attribute&&(n.attribute=function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}(e));var o=t[w];o.options.set(e,n),n.attribute&&o.attributes.set(n.attribute,e)}function k(t){if(!T(t)&&(function(t){var e,n,o=Object.getPrototypeOf(t);if("function"==typeof o.buildProperties&&o.buildProperties(),o&&T(o)){var r=o[w];e=new Map(r.options),n=new Map(r.attributes)}else e=new Map,n=new Map;t[w]={options:e,attributes:n}}(t),t.hasOwnProperty("properties"))){var e=!0,n=!1,o=void 0;try{for(var r,i=Object.getOwnPropertyNames(t.properties)[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var a=r.value;O(t,a,t.properties[a])}}catch(t){n=!0,o=t}finally{try{e||null==i.return||i.return()}finally{if(n)throw o}}}}var E=function(t){function e(){var t,n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,t=!(r=h(e).call(this))||"object"!==p(r)&&"function"!=typeof r?y(n):r,o(y(t),i),function(t){var e=t.constructor[w],n=!0,o=!1,r=void 0;try{for(var i,a=e.options.entries()[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var l=g(i.value,2);f(t,l[0],l[1])}}catch(t){o=!0,r=t}finally{try{n||null==a.return||a.return()}finally{if(o)throw r}}}(y(t)),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(e,v),d(e,null,[{key:"buildProperties",value:function(){k(this)}},{key:"observedAttributes",get:function(){return this.buildProperties(),Array.from(this[w].attributes.keys())}}]),d(e,[{key:"attributeChangedCallback",value:function(t,e,n){!function(t,e,n,o){if(n!==o){var r=t.constructor[w];if(r.attributes.has(e)){var a=r.attributes.get(e),c=r.options.get(a);s(t,a,c,c.attributeOnly?l(c.type,n):t[a],l(c.type,o),i)}}}(this,t,e,n)}},{key:"connectedCallback",value:function(){}},{key:"disconnectedCallback",value:function(){}},{key:"adoptedCallback",value:function(){}},{key:"propertyChangedCallback",value:function(){}}]),e}();E.templateNode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="<template><style>".concat(e.toString(),"</style>").concat(t,"</template>"),o=document.createRange().createContextualFragment(n),r=o.firstElementChild;return document.head.appendChild(o),r},E.customTag=function(t,e){window.customElements.get(t)||window.customElements.define(t,e)},E.shadowRoot=o;e.a=E},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(i).concat([r]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];null!=a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},,,,,,function(t,e){t.exports="<span id=tooltip-back> <slot id=tooltip-content></slot> </span>"},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,':host {\r\n    --back-color: white;\r\n    --border-color: black;\r\n    --arrow-size: 0.5rem;\r\n    --offset: 0px;\r\n\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: calc(0% - var(--offset));\r\n    left: 50%;\r\n    transform: translate(-50%, calc(-100% - var(--arrow-size)));\r\n\r\n    opacity: 0;\r\n    transition: opacity 0.3s ease;\r\n\r\n    z-index: 1000;\r\n\r\n    pointer-events: none;\r\n}\r\n\r\n#tooltip-back {\r\n    min-width: var(--arrow-size);\r\n    min-height: var(--arrow-size);\r\n\r\n    border-style: solid;\r\n    border-radius: 0.5rem;\r\n    border-color: var(--border-color);\r\n\r\n    display: flex;\r\n    flex-direction: row;\r\n    padding: 0.5rem;\r\n    background: var(--back-color);\r\n}\r\n\r\n#tooltip-back::after {\r\n    content: " ";\r\n    position: absolute;\r\n    top: 100%; /* At the bottom of the tooltip */\r\n    left: 50%;\r\n    border-width: var(--arrow-size);\r\n    border-style: solid;\r\n    border-color: var(--border-color) transparent transparent transparent;\r\n    transform: translate(-50%, 0%);\r\n}\r\n\r\n:host([effect=light]) {\r\n    color: black;\r\n    --border-color: black;\r\n    --back-color: white;\r\n}\r\n\r\n:host([effect=dark]) {\r\n    color: white;\r\n    --border-color: black;\r\n    --back-color: black;\r\n}\r\n\r\n:host([placement=right]) {\r\n    top: 50%;\r\n    left: calc(100% + var(--offset));\r\n    transform: translate(var(--arrow-size), -50%);\r\n}\r\n:host([placement=right]) span#tooltip-back::after {\r\n    top: 50%;\r\n    left: 0%; /* At the left of the tooltip */\r\n    border-color: transparent var(--border-color) transparent transparent;\r\n    transform: translate(-100%, -50%);\r\n}\r\n\r\n:host([placement=left]) {\r\n    top: 50%;\r\n    left: calc(0% - var(--offset));\r\n    transform: translate(calc(-100% - var(--arrow-size)), -50%);\r\n}\r\n:host([placement=left]) span#tooltip-back::after {\r\n    top: 50%;\r\n    left: 100%; /* At the right of the tooltip */\r\n    border-color: transparent transparent transparent var(--border-color);\r\n    transform: translate(0%, -50%);\r\n}\r\n\r\n:host([placement=bottom]) {\r\n    top: calc(100% + var(--offset));\r\n    left: 50%;\r\n    transform: translate(-50%, var(--arrow-size));\r\n}\r\n:host([placement=bottom]) span#tooltip-back::after {\r\n    top: 0%; /* At the top of the tooltip */\r\n    left: 50%;\r\n    border-color: transparent transparent var(--border-color) transparent;\r\n    transform: translate(-50%, -100%);\r\n}\r\n\r\n:host([no-visible-arrow]) {\r\n    --arrow-size : 0rem;\r\n}',""])},,,,,,function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(7),i=n.n(r),a=n(8),l=n.n(a);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t,e,n){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function h(t,e,n){return e&&p(t.prototype,e),n&&p(t,n),t}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=o.a.templateNode(i.a,l.a),d=function(t){function e(){var t,n,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,(t=!(o=f(e).call(this,b))||"object"!==c(o)&&"function"!=typeof o?s(n):o).target=null,t.openTimeout=null,t.closeTimeout=null,t.onMouseEnter=t.onMouseEnter.bind(s(t)),t.onMouseLeave=t.onMouseLeave.bind(s(t)),t.onTooltipOpen=t.onTooltipOpen.bind(s(t)),t.onTooltipClose=t.onTooltipClose.bind(s(t)),t.onFocus=t.onFocus.bind(s(t)),t.onBlur=t.onBlur.bind(s(t)),t.tooltipSlot=t.shadowRoot.querySelector("#tooltip-content"),t.open=!1,t.openDelay=0,t.closeDelay=1e3,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(e,o["a"]),h(e,null,[{key:"properties",get:function(){return{placement:{type:String},content:{type:String},openDelay:{type:Number},closeDelay:{type:Number},for:{type:String},focusable:{type:Boolean},manual:{type:Boolean},noVisibleArrow:{type:Boolean},disabled:{type:Boolean},offset:{type:Number},effect:{type:String}}}}]),h(e,[{key:"propertyChangedCallback",value:function(t,e,n){switch(t){case"content":this.tooltipSlot.textContent=n;break;case"for":var o=document.querySelector("#".concat(n));o?this.setTarget(o):this.setTarget(this.shadowRoot.host.parentElement);break;case"disabled":this.clearTarget();break;case"offset":this.shadowRoot.host.style.setProperty("--offset","".concat(this.offset,"px"))}}},{key:"connectedCallback",value:function(){u(f(e.prototype),"connectedCallback",this).call(this);var t=this.shadowRoot.host.parentElement;t.style.position="relative",this.for||this.setTarget(t)}},{key:"disconnectedCallback",value:function(){u(f(e.prototype),"disconnectedCallback",this).call(this),this.clearTarget(),this.clearTimeout()}},{key:"open",value:function(){this.open||this.onTooltipOpen()}},{key:"close",value:function(){this.open&&this.onTooltipClose()}},{key:"toggle",value:function(){this.open?this.onTooltipClose():this.onTooltipOpen()}},{key:"setTarget",value:function(t){this.target&&this.clearTarget(),t&&!this.disabled&&(t.addEventListener("mouseenter",this.onMouseEnter),t.addEventListener("mouseleave",this.onMouseLeave),t.addEventListener("focus",this.onFocus),t.addEventListener("blur",this.onBlur),this.target=t)}},{key:"clearTarget",value:function(){this.target&&(this.target.removeEventListener("mouseenter",this.onMouseEnter),this.target.removeEventListener("mouseleave",this.onMouseLeave),this.target.removeEventListener("focus",this.onFocus),this.target.removeEventListener("blur",this.onBlur),this.target=null)}},{key:"clearTimeout",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){this.openTimeout&&(clearTimeout(this.openTimeout),this.openTimeout=null),this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)})},{key:"onMouseEnter",value:function(){this.manual||(this.clearTimeouts(),e.activeElement?this.onTooltipOpen():this.openTimeout=setTimeout(this.onTooltipOpen,this.openDelay))}},{key:"onMouseLeave",value:function(){this.manual||(this.clearTimeouts(),e.activeElement===this?this.closeTimeout=setTimeout(this.onTooltipClose,this.closeDelay):this.onTooltipClose())}},{key:"onFocus",value:function(){this.manual||this.focusable&&this.onTooltipOpen()}},{key:"onBlur",value:function(){this.manual||this.focusable&&this.onTooltipClose()}},{key:"clearTimeouts",value:function(){this.openTimeout&&(clearTimeout(this.openTimeout),this.openTimeout=null),this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)}},{key:"onTooltipOpen",value:function(){if(!this.manual){if(e.activeElement&&e.activeElement!==this)e.activeElement.onTooltipClose();e.activeElement=this}this.shadowRoot.host.style.opacity=1,this.clearTimeouts(),this.open=!0}},{key:"onTooltipClose",value:function(){this.shadowRoot.host.style.opacity=0,this.clearTimeouts(),this.manual||e.activeElement===this&&(e.activeElement=null),this.open=!1}}]),e}();d.activeElement=null,o.a.customTag("core-tooltip",d),e.default=d}])});
