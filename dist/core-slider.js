!function(t,e,r,n,o,i){if("customElements"in t)i();else{if(t.WC_ENV)return void t.WC_ENV.then(i);var a=function(t,r){var n=e.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!=n.readyState&&"complete"!=n.readyState||(n.onreadystatechange=null,r())}:n.onload=function(){r()},n.src=t,e.getElementsByTagName("head")[0].appendChild(n)},u=t.WC_ENV=(d=function(t){try{t()}catch(t){console.error(t)}},(h=[]).isDone=!1,h.exec=function(){h.splice(0).forEach(d)},h.then=function(t){return h.isDone?t():h.push(t),h},h);u.then(i);var c=t.WC_POLYFILL||"//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js",s=0,l=function(){--s||(u.isDone=!0,u.exec())};"Reflect"in t||t.SKIP_ES_POLYFILL?(s++,a(c,l)):(s++,a(t.ES_POLYFILL||"//cdnjs.cloudflare.com/ajax/libs/core-js/2.5.3/core.min.js",function(){a(c,l)}),function(){try{new Function("function* test() {}")()}catch(t){return!1}return!0}()||t.regeneratorRuntime||(s++,a(window.GE_POLYFILL||n,l)))}var h,d}(window,document,0,"//unpkg.com/regenerator-runtime@0.12.1/runtime.js",0,function(){!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=13)}([function(t,e,r){"use strict";function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{mode:"open"},n=t.attachShadow(r);return e&&n.appendChild(e.content.cloneNode(!0)),n}var o=Symbol("stopPropagateUpdate"),i=Symbol("ATTRIBUTE_SIDE"),a=Symbol("PROPERTY_SIDE");function u(t,e){switch(t||String){case Object:return JSON.parse(e);case Boolean:return null!==e||void 0!==e;default:return"function"==typeof t?t(e):e}}function c(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;if(r.type!==Boolean){var o=function(t,e){switch(t||String){case Object:return JSON.stringify(e);default:return e}}(r.type,n);t.setAttribute(e,o)}else n?t.setAttribute(e,""):t.removeAttribute(e)}function s(t,e,r,n,u,s){t[o]||(t[o]=!0,s===i?t[e]=u:s===a&&t.isConnected&&r.reflect&&c(t,r.attribute,r,u),"function"==typeof t.propertyChangedCallback&&t.propertyChangedCallback(e,n,u),t[o]=!1)}function l(t,e){var r="__".concat(t);return{get:function(){var t;return t=e.attributeOnly?function(t,e,r){var n=r.type;return n===Boolean?t.hasAttribute(e):u(n,t.getAttribute(e))}(this,e.attribute,e):this[r],e.get&&(t=e.get.call(this,t)),t},set:function(n){var o=this[t];e.set&&(n=e.set.call(this,n,o)),o!==n&&(e.attributeOnly?c(this,e.attribute,e,n):this[r]=n,s(this,t,e,o,n,a))},configurable:!0,enumerable:!0}}function h(t,e,r){var n=l(e,r);if(t.hasOwnProperty(e)){var o=t[e];delete t[e],n.set.call(t,o)}var i=Object.getOwnPropertyDescriptor(t,e);if(i){if("function"==typeof i.get)throw new Error("Found conflicting getter for instance.");if("function"==typeof i.set)throw new Error("Found conflicting setter for instance.")}Object.defineProperty(t,e,n)}function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function v(t,e,r){return e&&b(t.prototype,e),r&&b(t,r),t}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(){return Reflect.construct(HTMLElement,[],this.__proto__.constructor)}function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.setPrototypeOf(y.prototype,HTMLElement.prototype),Object.setPrototypeOf(y,HTMLElement);var w=Symbol("classProperties");function k(t){return t.hasOwnProperty(w)}function S(t,e,r){void 0===r.attribute&&(r.attribute=function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}(e));var n=t[w];n.options.set(e,r),r.attribute&&n.attributes.set(r.attribute,e)}function O(t){if(!k(t)&&(function(t){var e,r,n=Object.getPrototypeOf(t);if("function"==typeof n.buildProperties&&n.buildProperties(),n&&k(n)){var o=n[w];e=new Map(o.options),r=new Map(o.attributes)}else e=new Map,r=new Map;t[w]={options:e,attributes:r}}(t),t.hasOwnProperty("properties"))){var e=!0,r=!1,n=void 0;try{for(var o,i=Object.getOwnPropertyNames(t.properties)[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var a=o.value;S(t,a,t.properties[a])}}catch(t){r=!0,n=t}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}}}var T=function(t){function e(){var t,r,o,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,t=!(o=f(e).call(this))||"object"!==d(o)&&"function"!=typeof o?p(r):o,n(p(t),i),function(t){var e=t.constructor[w],r=!0,n=!1,o=void 0;try{for(var i,a=e.options.entries()[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var u=g(i.value,2);h(t,u[0],u[1])}}catch(t){n=!0,o=t}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}}(p(t)),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(e,y),v(e,null,[{key:"buildProperties",value:function(){O(this)}},{key:"observedAttributes",get:function(){return this.buildProperties(),Array.from(this[w].attributes.keys())}}]),v(e,[{key:"attributeChangedCallback",value:function(t,e,r){!function(t,e,r,n){if(r!==n){var o=t.constructor[w];if(o.attributes.has(e)){var a=o.attributes.get(e),c=o.options.get(a);s(t,a,c,c.attributeOnly?u(c.type,r):t[a],u(c.type,n),i)}}}(this,t,e,r)}},{key:"connectedCallback",value:function(){}},{key:"disconnectedCallback",value:function(){}},{key:"adoptedCallback",value:function(){}},{key:"propertyChangedCallback",value:function(){}}]),e}();T.templateNode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r="<template><style>".concat(e.toString(),"</style>").concat(t,"</template>"),n=document.createRange().createContextualFragment(r),o=n.firstElementChild;return document.head.appendChild(n),o},T.customTag=function(t,e){window.customElements.get(t)||window.customElements.define(t,e)},T.shadowRoot=n;e.a=T},function(t,e,r){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=function(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"==typeof btoa){var o=(a=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=n.sources.map(function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"});return[r].concat(i).concat([o]).join("\n")}var a;return[r].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(n[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];null!=a[0]&&n[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),e.push(a))}},e}},,,,function(t,e){t.exports=" <div id=slider role=slider> <span id=slider-bar> <span id=slider-progress></span> </span> <span id=slider-thumb></span> </div>"},function(t,e,r){(t.exports=r(1)(!1)).push([t.i,":host {\r\n    display: inline-block;\r\n    contain: content;\r\n    \r\n    width: 100%;\r\n    height: auto;\r\n    color: var(--primary, white);\r\n    \r\n    --thumb-color: currentColor;\r\n    --thumb-size: 1rem;\r\n    --thumb-border-width: 1px;\r\n\r\n    --track-color: var(--light, lightgray);\r\n    --track-height: 0.5rem;\r\n\r\n    --outline-color: var(--secondary, gray);\r\n    --progress-color: var(--thumb-color);\r\n}\r\n\r\n:host([disabled]) {\r\n    --thumb-color: var(--outline-color);\r\n    --progress-color: var(--track-color);\r\n    pointer-events: none;\r\n    cursor: default;\r\n}\r\n\r\n#slider {\r\n    position: relative;\r\n    margin: calc(var(--thumb-size) + var(--thumb-border-width));\r\n    width: calc(100% - (var(--thumb-size) + var(--thumb-border-width)) * 2 - 2px); /* 2px for border-width */\r\n    height: calc(var(--track-height) + 2px);/* 2px for border-width */\r\n}\r\n\r\n#slider-bar {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    width: 100%;\r\n    height: var(--track-height);\r\n    background-color: var(--track-color);\r\n    border: 1px solid var(--outline-color);\r\n    border-radius: var(--track-height);\r\n    cursor: pointer;\r\n}\r\n\r\n#slider-thumb {\r\n    display: block;\r\n    position: absolute;\r\n    top: 0px;/* Will be controlled in updateThumbPosition() */\r\n    left: 0px;/* Will be controlled in updateThumbPosition() */\r\n    cursor: pointer;\r\n\r\n    width: var(--thumb-size);\r\n    height: var(--thumb-size);\r\n    transform: translate(-50%, -50%);\r\n\r\n    background-color: var(--thumb-color);\r\n    border-color: var(--outline-color);\r\n    border-style: solid;\r\n    border-radius: 100%;\r\n    border-width: var(--thumb-border-width);\r\n\r\n    margin-top: calc(var(--track-height) / 2 + 1px);/* 1px for border-width */\r\n    margin-left: 0px;\r\n\r\n    transition: background-color 0.15s ease-in-out,\r\n        box-shadow 0.15s ease-in-out;\r\n}\r\n\r\n#slider-progress {\r\n    position: absolute;\r\n    display: block;\r\n    width: 100%;\r\n    height: 100%;\r\n    min-width: var(--track-height);\r\n    max-width: 100%;\r\n    min-height: var(--track-height);\r\n    max-height: 100%;\r\n    background: var(--progress-color);\r\n    border-radius: var(--track-height);\r\n}\r\n\r\n:host([vertical]) {\r\n    /* Same as default, but flipped width and height */\r\n    width: auto;\r\n    height: 100%;\r\n}\r\n:host([vertical]) div#slider {\r\n    /* Same as default, but flipped width and height */\r\n    width: calc(var(--track-height) + 2px);\r\n    height: calc(100% - (var(--thumb-size) + var(--thumb-border-width)) * 2 - 2px);\r\n}\r\n:host([vertical]) span#slider-bar {\r\n    /* Same as default, but flipped width and height */\r\n    width: var(--track-height);\r\n    height: 100%;\r\n}\r\n:host([vertical]) span#slider-thumb {\r\n    /* Same as default, but flipped width and height */\r\n    margin-top: 0px;\r\n    margin-left: calc(var(--track-height) / 2 + 1px);\r\n}\r\n:host([vertical]) span#slider-progress {\r\n    position: absolute;\r\n    bottom: 0px;\r\n}\r\n\r\n\r\n/* Bootstrap support for form-control-range */\r\n:host(.form-control-range) {\r\n    display: block;\r\n}\r\n/* Bootstrap support for custom-range */\r\n:host(.custom-range) {\r\n    --outline-color: transparent;\r\n\r\n    --thumb-border-width: 0.4rem;\r\n    --thumb-size: 0.6rem;\r\n\r\n    --track-color: #dee2e6;\r\n}\r\n:host(.custom-range[disabled]) {\r\n    --thumb-color: #adb5bd!important;\r\n}\r\n:host(.custom-range:not([color])) {\r\n    --thumb-color:#007bff;\r\n}\r\n:host(.custom-range[color]) {\r\n    --thumb-color: currentColor;\r\n    --progress-color: currentColor;\r\n    --track-color: #dee2e6;\r\n}\r\n:host(.custom-range) span#slider-thumb {\r\n    border-color: var(--thumb-color);\r\n    background: var(--white, white);\r\n}\r\n:host(.custom-range) span#slider-thumb.focus {\r\n    --thumb-color: #b3d7ff;\r\n    box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\r\n}\r\n@media (prefers-reduced-motion: reduce) {\r\n  :host(.custom-range) span#slider-thumb {\r\n    transition: none;\r\n  }\r\n}\r\n\r\n@keyframes rainbow {\r\n    0%  { color: var(--red, 'red'); }\r\n    15% { color: var(--orange, 'orange'); }\r\n    30% { color: var(--yellow, 'yellow'); }\r\n    45% { color: var(--green, 'green') }\r\n    60% { color: var(--blue, 'blue'); }\r\n    75% { color: var(--indigo, 'indigo'); }\r\n    90% { color: var(--pink, 'pink'); }\r\n    100%{ color: var(--red, 'red'); }\r\n}\r\n",""])},,,,,,,function(t,e,r){"use strict";r.r(e);var n=r(0),o=r(5),i=r.n(o),a=r(6),u=r.n(a);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t,e,r){return(l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=h(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,e,r){return e&&d(t.prototype,e),r&&d(t,r),t}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=n.a.templateNode(i.a,u.a);function v(t,e,r,n,o){document.addEventListener(e,r),document.addEventListener(n,o),t.preventDefault(),t.stopPropagation()}function m(t,e,r,n,o){document.removeEventListener(e,r),document.removeEventListener(n,o)}var y=function(t){function e(){var t,r,n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,(t=!(n=h(e).call(this,b))||"object"!==c(n)&&"function"!=typeof n?s(r):n).onMouseDown=t.onMouseDown.bind(s(t)),t.onMouseUp=t.onMouseUp.bind(s(t)),t.onMouseMove=t.onMouseMove.bind(s(t)),t.onTouchStart=t.onTouchStart.bind(s(t)),t.onTouchEnd=t.onTouchEnd.bind(s(t)),t.onTouchMove=t.onTouchMove.bind(s(t)),t.sliderThumb=t.shadowRoot.querySelector("#slider-thumb"),t.sliderThumb.addEventListener("mousedown",t.onMouseDown),t.sliderThumb.addEventListener("touchstart",t.onTouchStart),t.sliderBar=t.shadowRoot.querySelector("#slider-bar"),t.sliderBar.addEventListener("mousedown",t.onMouseDown),t.sliderBar.addEventListener("touchstart",t.onTouchStart),t.sliderProgress=t.shadowRoot.querySelector("#slider-progress"),t.slider=t.shadowRoot.querySelector("#slider"),t.step=1,t.min=0,t.max=100,t.value=0,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,n["a"]),f(e,null,[{key:"properties",get:function(){return{step:{type:Number},min:{type:Number},max:{type:Number},value:{type:Number,reflect:!0},disabled:{type:Boolean},vertical:{type:Boolean},rainbow:{type:Boolean},color:{type:String}}}}]),f(e,[{key:"propertyChangedCallback",value:function(t,e,r){switch(t){case"value":var n=this.min,o=this.max,i=this.step,a=Math.floor(r/i)*i;a<n&&(a=n),a>o&&(a=o),this.value=a,this.slider.setAttribute("aria-valuenow","".concat(this.value)),this.updateThumbPosition(a);break;case"color":this.slider.style.color=this.color;break;case"min":this.slider.setAttribute("aria-valuemin","".concat(this.min));break;case"max":this.slider.setAttribute("aria-valuemax","".concat(this.max))}}},{key:"connectedCallback",value:function(){l(h(e.prototype),"connectedCallback",this).call(this),this.updateThumbPosition(this.value)}},{key:"updateThumbPosition",value:function(t){var e=this.step,r=this.min,n=this.max,o=Math.floor(t/e)*e;o<r&&(o=r),o>n&&(o=n);var i=(o-r)/(n-r);i>1&&(i=1),i<0&&(i=0),this.vertical?(this.sliderThumb.style.left="0px",this.sliderThumb.style.top="calc(".concat(100*(1-i),"%)"),this.sliderProgress.style.width="100%",this.sliderProgress.style.height="".concat(100*i,"%")):(this.sliderThumb.style.left="calc(".concat(100*i,"%)"),this.sliderThumb.style.top="0px",this.sliderProgress.style.width="".concat(100*i,"%"),this.sliderProgress.style.height="100%")}},{key:"onMouseDown",value:function(t){v(t,"mouseup",this.onMouseUp,"mousemove",this.onMouseMove),this.onThumbStart(),this.onThumbMove(t)}},{key:"onMouseMove",value:function(t){this.onThumbMove(t)}},{key:"onMouseUp",value:function(t){m(0,"mouseup",this.onMouseUp,"mousemove",this.onMouseMove),this.onThumbStop(t)}},{key:"onTouchStart",value:function(t){v(t,"touchend",this.onTouchEnd,"touchmove",this.onTouchMove),this.onThumbStart(),this.onTouchMove(t)}},{key:"onTouchMove",value:function(t){var e=t.changedTouches[0];this.onThumbMove(e)}},{key:"onTouchEnd",value:function(t){m(0,"touchend",this.onTouchEnd,"touchmove",this.onTouchMove),this.onThumbStop(t)}},{key:"onThumbStart",value:function(){this.sliderThumb.classList.add("focus")}},{key:"getSliderProgressRatio",value:function(t){var e=this.slider.getBoundingClientRect();return this.vertical?1-(t.clientY-e.top)/this.slider.clientHeight:(t.clientX-e.left)/this.slider.clientWidth}},{key:"onThumbMove",value:function(t){var e=this.getSliderProgressRatio(t),r=this.min,n=(this.max-r)*e+r;this.value!==n&&(this.value=n,this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0})))}},{key:"onThumbStop",value:function(){this.sliderThumb.classList.remove("focus")}}]),e}();n.a.customTag("core-slider",y),e.default=y}])});