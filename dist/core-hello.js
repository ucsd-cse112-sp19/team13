!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}([function(t,n,e){"use strict";function o(t="",n=""){const e=`<template><style>${n.toString()}</style>${t}</template>`,o=document.createRange().createContextualFragment(e),r=o.firstElementChild;return document.head.appendChild(o),r}function r(t,n){window.customElements.define(t,n)}function i(t,n=null){const e=t.attachShadow({mode:"open"});return n&&e.appendChild(n.content.cloneNode(!0)),e}e.d(n,"b",function(){return o}),e.d(n,"c",function(){return r}),e.d(n,"a",function(){return i})},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var e=function(t,n){var e=t[1]||"",o=t[3];if(!o)return e;if(n&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[e].concat(i).concat([r]).join("\n")}var a;return[e].join("\n")}(n,t);return n[2]?"@media "+n[2]+"{"+e+"}":e}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];null!=a[0]&&o[a[0]]||(e&&!a[2]?a[2]=e:e&&(a[2]="("+a[2]+") and ("+e+")"),n.push(a))}},n}},function(t,n){t.exports="<label> <span id=hello>Hello World</span> <slot></slot> </label>"},function(t,n,e){(t.exports=e(1)(!1)).push([t.i,":host {\n    display: block;\n    contain: content;\n\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 16px;\n    color: black;\n}\n\n:host([rainbow]) {\n    animation: rainbow 6s infinite; \n}\n\n@keyframes rainbow {\n    0%  { color: red }\n    15% { color: orange }\n    30% { color: yellow }\n    45% { color: green }\n    60% { color: blue }\n    75% { color: indigo }\n    90% { color: violet }\n    100%{ color: red }\n}\n",""])},,,function(t,n,e){"use strict";e.r(n);var o=e(2),r=e.n(o),i=e(3),a=e.n(i),l=e(0);const u=Object(l.b)(r.a,a.a),c={en:"Hello World",es:"Hola Mundo",jp:"こんにちは世界",fr:"Bonjour le monde"};class s extends HTMLElement{constructor(){super(),Object(l.a)(this,u),this.helloElement=this.shadowRoot.querySelector("#hello")}attributeChangedCallback(t,n,e){switch(t){case"lang":this.helloElement.textContent=c[e]||c.en}}static get observedAttributes(){return["lang"]}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get rainbow(){return this.hasAttribute("rainbow")}set rainbow(t){t?this.setAttribute("rainbow",""):this.removeAttribute("rainbow")}get lang(){return this.getAttribute("lang")}set lang(t){this.setAttribute("lang",t)}}Object(l.c)("core-hello",s),n.default=s}]);