(()=>{var t={155:t=>{var e,n,r=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function u(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(t){n=o}}();var c,s=[],a=!1,h=-1;function l(){a&&c&&(a=!1,c.length?s=c.concat(s):h=-1,s.length&&f())}function f(){if(!a){var t=u(l);a=!0;for(var e=s.length;e;){for(c=s,s=[];++h<e;)c&&c[h].run();h=-1,e=s.length}c=null,a=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function y(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new p(t,e)),1!==s.length||a||u(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=y,r.addListener=y,r.once=y,r.off=y,r.removeListener=y,r.removeAllListeners=y,r.emit=y,r.prependListener=y,r.prependOnceListener=y,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{Arr:()=>D,ArrLike:()=>R,Bool:()=>I,Component:()=>Z,Datetime:()=>t,Debug:()=>e,Env:()=>o,Factory:()=>u,Func:()=>q,Html:()=>c,Integer:()=>B,Json:()=>s,Nav:()=>a,Num:()=>M,Obj:()=>W,Pojo:()=>U,Scalar:()=>_,Shortcut:()=>z,Str:()=>H,Test:()=>K,TestSuite:()=>h,Tool:()=>J,Validate:()=>l,Vari:()=>p});const t={now:function(){return(new Date).getTime()},localeFormat:function(t,e,n){return H.typecheck(t),(e=H.isNotEmpty(e)?new Date(e):new Date).toLocaleString(t,n)},year:function(){return(new Date).getFullYear()},ymd:function(t,e,n,r){var i=B.is(t)?new Date(1e3*t):new Date;return i.setHours(0,0,0),B.is(r)&&i.setDate(r),B.is(n)&&i.setMonth(n-1),B.is(e)&&i.setFullYear(e),i.toISOString().substr(0,10)},his:function(t){return(B.is(t)?new Date(1e3*t):new Date).toTimeString().split(" ")[0]}},e=new function(){var t=!1;this.status=function(e){return _.is(e)&&(t=e),t},this.is=function(e){return!0===t||t===e},this.assertThrow=function(t){if(!0!==t)throw new Error},this.logError=function(t){console.error("Catched",t)}};var i=n(155);const o={isNode:function(){return void 0!==i&&void 0!==i.release&&"node"===i.release.name},isBrowser:function(){return!this.isNode()},isWindow:function(t){var e=!1;return this.isBrowser()&&W.is(t)&&(e=t instanceof Window||t.window===t),e},isTarget:function(t){var e=!1;return this.isBrowser()&&W.is(t)&&(e=t instanceof HTMLElement||t instanceof HTMLTemplateElement||t instanceof DocumentFragment||t===document||this.isWindow(t)||D.in(t.nodeType,[Node.TEXT_NODE,Node.DOCUMENT_TYPE_NODE])),e}};function u(t){var e=Object.create(!0===t?{}:t||null),n=Array.prototype.slice.call(arguments,1);return Object.assign.apply(null,[e].concat(n)),e}const c={valueAttr:{br:"data-value",hr:"data-value",img:"src",meta:"content",link:"href",input:"value"},htmlEscapes:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},isSelfClosing:function(t){return D.in(t,["br","hr","img","meta","link","input"])},escape:function(t){var e=this;return H.typecheck(t),t.replace(/[&<>"']/g,(function(t){return e.htmlEscapes[t]}))},start:function(t,e,n){var r="";H.typecheck(t,!0);var i=this.isSelfClosing(t),o=this.attr(n,t,e);return r+="<",r+=t,H.isNotEmpty(o)&&(r+=" ",r+=o),!0===i?r+="/>":(r+=">",r+=this.value(e)),r},end:function(t){var e="";return H.typecheck(t,!0),!1===this.isSelfClosing(t)&&(e+="</",e+=t,e+=">"),e},value:function(t,e){return!0===t?t=!0===e?1:"&nbsp;":!1===t&&(t=!0===e?0:""),!0!==e&&(U.is(t)&&(t=U.values(t)),D.is(t)&&(t=t.join(", "))),H.cast(t,!0)},attr:function(t,e,n){var r=this.isSelfClosing(e);if(t=this.attrToPojo(t),!0===r&&U.keyExists(e,this.valueAttr)){var i=U.get(e,this.valueAttr);if(null!=i)null!=U.get(i,t)&&null==n||(t[i]=this.value(n,!0))}return t=this.prepareAttr(t),U.str(t,"="," ",!0)},attrToPojo:function(t){var e={};return H.isNotEmpty(t)&&(e={class:t}),U.is(t)&&(e=t),e},prepareAttr:function(t){var e={};U.typecheck(t);var n=function(t,e){return{key:H.fromCamelCase("-",t),value:I.is(e)?I.toInt(e):e}};return U.each(t,(function(t,r){var i=n(r,t);r=i.key,t=i.value,"class"===r&&D.is(t)?t=t.join(" "):"data"===r&&U.is(t)&&(U.each(t,(function(t,r){var i=n(r,t),o="data-"+i.key;e[o]=i.value})),t=null),null!=t&&(e[r]=t)})),e},tag:function(t,e,n){return this.start(t,e,n)+this.end(t)},tagCond:function(t,e,n){return p.isNotEmpty(this.value(e))?this.tag(t,e,n):""},div:function(t,e){return this.tag("div",t,e)},span:function(t,e){return this.tag("span",t,e)},ul:function(t,e){return this.tag("ul",t,e)},li:function(t,e){return this.tag("li",t,e)},input:function(t,e){return this.tag("input",t,U.replace({type:"text"},this.attrToPojo(e)))},button:function(t,e){return this.tag("button",t,U.replace({type:"button"},this.attrToPojo(e)))}},s={encode:function(t){return JSON.stringify(t)},decode:function(t){return JSON.parse(H.typecheck(t))},recode:function(t){return this.decode(this.encode(t))}},a={isFirst:function(t,e){return t===this.getFirst(e)},hasPrev:function(t,e,n){return null!=this.getPrev(t,e,n)},hasNext:function(t,e,n){return null!=this.getNext(t,e,n)},isLast:function(t,e){return t===this.getLast(e)},isIndex:function(t,e){return this.getIndex(t,e)===t},getFirst:function(t){return B.isPositive(t)?0:null},getPrev:function(t,e,n){var r=null;if(B.isPositive(e)){var i=e-1,o=(t=B.is(t)?t:i)-1;o<0?!0===n&&(r=i):r=o}return r},getNext:function(t,e,n){var r=null;if(B.isPositive(e)){var i=e-1,o=(t=B.is(t)?t:-1)+1;o>i?!0===n&&(r=0):r=o}return r},getLast:function(t){return B.isPositive(t)?t-1:null},getIndex:function(t,e){return B.is(t)&&t>=0&&B.isPositive(e)&&t<e?t:null},index:function(t,e,n,r){var i=null;return B.isPositive(n)&&("first"===t?i=this.getFirst(n):"last"===t?i=this.getLast(n):"prev"===t?i=this.getPrev(e,n,r):"next"===t?i=this.getNext(e,n,r):B.is(t)&&(i=this.getIndex(t,n))),i},indexObj:function(t,e,n,r){var i=null;if(W.typechecks(n,!1),null!=n){var o=D.length(n);W.is(t)&&(t=D.search(t,n)),W.is(e)&&(e=D.search(e,n));var u=this.index(t,e,o,r);B.is(u)&&(i=D.get(u,n))}return i}};function h(t){return U.each(t,(function(t,e){return t()}))}const l={isNumericDash:function(t){return this.regex(t,"^[0-9-]+$")},isEmail:function(t){return this.regex(t,/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/)},isRegexStr:function(t){return H.isNotEmpty(t)||t instanceof RegExp},regex:function(t,e){var n=!1;if(H.is(t)&&this.isRegexStr(e)){var r=new RegExp(e);r.test(t)&&(n=!0)}return n},trigger:function(t,e,n){var r=this.required(t,e);return!0===r&&(r=this.pattern(t,n)),r},required:function(t,e){var n=!0;return I.is(e)&&(e=I.toInt(e)),M.isPositive(e)&&(t=H.cast(t),(t=H.trim(t)).length||(n=!1)),n},pattern:function(t,e){var n=!0;return H.isNotEmpty(e)&&(t=H.cast(t)).length&&!this.regex(t,e)&&(n=!1),n}};function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}const p={is:function(t){return void 0!==t},isEmpty:function(t){var e=!0;return D.is(t)||H.is(t)?e=!(t.length>0):_.is(t)?e=!t:o.isTarget(t)?e=!1:null!=t&&this.eachProto(t,(function(){return e=!1,!1})),e},isNotEmpty:function(t){return!this.isEmpty(t)},isReallyEmpty:function(t){return!M.is(t)&&!I.is(t)&&this.isEmpty(t)},isNotReallyEmpty:function(t){return!this.isReallyEmpty(t)},isNull:function(t){return null===t},isUndefined:function(t){return void 0===t},isEqual:function(){var t=null,e=void 0;return R.each(arguments,(function(n){if(t=s.encode(n),void 0!==e)return t===e;e=t}))},isEqualStrict:function(){var t=void 0;return R.each(arguments,(function(e){if(void 0!==t)return Object.is(t,e);t=e}))},type:function(t){var e=f(t),n={};if(null==t)e=t+"";else if("function"===e){var r=n.toString.call(t);e=n[r]||"object"}return e},check:function(t,e){if(t!==e)throw new Error([t,e]);return t},eachProto:function(t,e){var n,r,i=null;if(q.is(e))for(n in i=!0,t)if(r=t[n],!1===e.call(r,r,n,t)){i=!1;break}return i}};var y={is:function(t){return Array.isArray(t)},in:function(t,e){return this.is(e)?Array.prototype.includes.call(e,t):null},keys:function(t){return this.typecheck(t),Array.from(Array.prototype.keys.call(t))},valueFirst:function(t){return this.typecheck(t),t.length?t[0]:void 0},valueLast:function(t){return this.typecheck(t),t.length?t[t.length-1]:void 0},keyFirst:function(t){return this.typecheck(t),t.length?0:void 0},keyLast:function(t){return this.typecheck(t),t.length?t.length-1:void 0},search:function(t,e){var n=null;return this.typecheck(e),n=-1===(n=Array.prototype.indexOf.call(e,t))?null:n},slice:function(t,e,n){return this.typecheck(n),t=B.is(t)?t:0,e=B.is(e)?e:void 0,Array.prototype.slice.call(n,t,e)},sliceStart:function(t,e){return this.slice(t,!0,e)},merge:function(t){this.typecheck(t);var e=R.sliceStart(1,arguments);return Array.prototype.concat.apply(t,e)},clean:function(t){return this.filter(t,(function(t){return p.isNotReallyEmpty(t)}))},valueStrip:function(t,e){return this.filter(e,(function(e){return e!==t}))},find:function(t,e){return this.typecheck(t),q.typecheck(e),Array.prototype.find.call(t,e)},some:function(t,e){return this.typecheck(t),q.typecheck(e),Array.prototype.some.call(t,e)},every:function(t,e){return this.typecheck(t),q.typecheck(e),Array.prototype.every.call(t,e)},map:function(t,e){return this.typecheck(t),q.typecheck(e),Array.prototype.map.call(t,e)},filter:function(t,e){return this.typecheck(t),q.typecheck(e),Array.prototype.filter.call(t,e)},reduce:function(t,e,n){return this.typecheck(e),q.typecheck(n),Array.prototype.reduce.call(e,n,t)},column:function(t,e){var n=[];return H.typecheck(t,!0),this.each(e,(function(e){U.is(e)&&U.keyExists(t,e)&&n.push(e[t])})),n},new:function(){return[]}},v={timeouts:function(t,e,n,r){return B.typecheck(e),B.typecheck(n),q.typecheck(r),D.each(t,(function(t,i){var o=e+i*n;q.timeout(o,(function(){r(t,i,o)}))}))},oddEven:function(t,e,n){return q.typechecks([e,n],!1),D.each(t,(function(t,r){var i=r+1;M.isOdd(i)?null!=e&&e(t,r):null!=n&&n(t,r)}))}};const m={is:function(t){var e=!1;if(!(D.is(t)||_.is(t)||q.is(t)||o.isWindow(t))){var n=p.type(t),r=!!t&&"length"in t&&t.length;e="array"===n||0===r||"number"==typeof r&&r>0&&r-1 in t}return e},toArray:function(t){return D.is(t)?t:this.is(t)?Array.from(t):null}},d={is:function(t){return"function"==typeof t&&"number"!=typeof t.nodeType},noop:function(){return function(){}},async:function(t,e){return this.timeout(0,t,e)},timeout:function(t,e,n){return this.typecheck(e),B.is(t)||(t=0),setTimeout(e.bind(n),t)},debounce:function(t,e){B.typecheck(t),this.typecheck(e);var n,r=this;return function(){var i=this,o=arguments;n&&clearTimeout(n),n=r.timeout(t,(function(){e.apply(i,o)}))}},debounceOnce:function(t,e){var n=!1;return Func.typecheck(e),this.debounce(t,(function(){var t=arguments;!1===n&&(e.apply(this,t),n=!0)}))},throttle:function(t,e){B.typecheck(t),this.typecheck(e);var n=this,r=!0;return function(){var i=this;!0===r&&(e.apply(i,arguments),r=!1,n.timeout(t,(function(){r=!0})))}}},g={is:function(t){return M.is(t)&&parseInt(t)===t},cast:function(t){return _.isNotBool(t)&&""!==t?parseInt(t):null},toBool:function(t){var e=null;return this.typecheck(t),1===t?e=!0:0===t&&(e=!1),e},toggle:function(t){var e=null;return this.typecheck(t),1===t?e=0:0===t&&(e=1),e},range:function(t,e,n){var r=null;if(t=null==t?1:t,n=null==n?1:n,this.isPositive(t,!0)&&this.isPositive(e,!0)&&this.isPositive(n)){var i=Math.floor((e-t)/n)+1,o=Array(i).fill(t);r=D.map(o,(function(t,e){return t+e*n}))}return r},unique:(k=0,function(){return k++})};var k,b={is:function(t){var e=!1,n=p.type(t);return"number"!==n&&"string"!==n||(e=!isNaN(t-parseFloat(t))),e},isEmpty:function(t){return!!this.is(t)&&p.isEmpty(this.cast(t))},isNotEmpty:function(t){return!!this.is(t)&&p.isNotEmpty(this.cast(t))},isPositive:function(t,e){var n=!1;return this.is(t)&&((t=this.cast(t))>0||!0===e&&0===t)&&(n=!0),n},isNegative:function(t,e){var n=!1;return this.is(t)&&((t=this.cast(t))<0||!0===e&&0===t)&&(n=!0),n},isOdd:function(t){return this.is(t)&&!B.is(t/2)},isEven:function(t){return this.is(t)&&B.is(t/2)},isNan:function(t){return isNaN(t)},cast:function(t){return _.isNotBool(t)&&""!==t?parseFloat(t):null},str:function(t){return this.typecheck(t),Number(t).toString()}},E={decimal:function(t,e){return this.typecheck(t),e=B.is(e)?e:2,t.toFixed(e)},round:function(t){return t=this.cast(t),this.typecheck(t),Math.round(t)},floor:function(t){return t=this.cast(t),this.typecheck(t),Math.floor(t)},ceil:function(t){return t=this.cast(t),this.typecheck(t),Math.ceil(t)}},w={is:function(t){return"object"===p.type(t)},isEqual:function(){var t=!1,e=Array.from(arguments);return e.length>1&&this.is(e[0])&&(t=p.isEqual.apply(null,e)),t},length:function(t){return this.typecheck(t),Object.keys(t).length}},N={isKey:function(t){return _.isNotBool(t)},keyExists:function(t,e){return!(!this.isKey(t)||!this.is(e))&&e.hasOwnProperty(t)},keys:function(t){return this.typecheck(t),Object.keys(t)},values:function(t){return this.typecheck(t),Object.values(t)},get:function(t,e){return this.typecheck(e),this.keyExists(t,e)?e[t]:void 0},toArray:function(t){return this.typecheck(t),Array.from(this.values(t))},valueFirst:function(t){var e=void 0,n=this.keys(t);null!=n&&(e=t[n[0]]);return e},valueLast:function(t){var e=void 0,n=this.keys(t);null!=n&&(e=t[n[n.length-1]]);return e},find:function(t,e){var n=void 0;return q.typecheck(e),this.each(t,(function(t,r){if(e(t,r))return n=t,!1})),n},findKey:function(t,e){var n=null;return q.typecheck(e),this.each(t,(function(t,r){if(e(t,r))return n=r,!1})),n},some:function(t,e){var n=!1;return q.typecheck(e),this.each(t,(function(t,r){if(e(t,r))return n=!0,!1})),n},every:function(t,e){var n=!0;return q.typecheck(e),this.each(t,(function(t,r){if(!e(t,r))return n=!1})),n},reduce:function(t,e,n){return q.typecheck(n),this.each(e,(function(e,r){t=n(t,e,r)})),t},accumulate:function(t,e,n){return q.typecheck(n),this.each(e,(function(e,r){var i=n(e,r);if(null==i)return!0;D.is(t)?t.push(i):U.is(t)?t[r]=i:t+=i})),t},str:function(t,e,n,r){return e=H.is(e)?e:"=",n=H.is(n)?n:" ",this.reduce("",t,(function(t,i,o){if(H.isNotEmpty(o))return i=H.cast(i,!0),!0===r&&(i=H.quote(i,!1,!0)),t.length&&(t+=n),t+=o,t+=e,t+=i}))},climb:function(t,e){H.is(t)&&(t=H.explode("/",t)),D.typecheck(t),this.typecheck(e);var n=this;return D.each(t,(function(t){if(!n.keyExists(t,e))return e=void 0,!1;e=e[t]})),e}},x={each:function(t,e){var n=!0;q.typecheck(e);for(var r,i=this.keys(t),o=0;o<i.length;o++)if(!1===e(t[r=i[o]],r)){n=!1;break}return n}},S={copy:function(t){return this.typecheck(t),Object.assign(this.new(),t)},new:function(){return{}},filter:function(t,e){var n=this.new();q.typecheck(e);var r=!Array.isArray(n);return this.each(t,(function(t,i){var o=e(t,i);i=!1===r?n.length:i,o&&(n[i]=t)})),n},map:function(t,e){var n=this.new();return q.typecheck(e),this.each(t,(function(t,r){var i=e(t,r);n[r]=i})),n}},A={set:function(t,e,n){var r=this.copy(n);return r[t]=e,r},unset:function(t,e){var n=this.copy(e);return delete n[t],n},unsets:function(t,e){var n=this.copy(e),r=this;return D.each(t,(function(t){r.keyExists(t,e)&&delete n[t]})),n},replace:function(){var t=this.new(),e=Array.from(arguments);if(e.length>0){var n=this;D.each(e,(function(e){n.typecheck(e,!1),null!=e&&(t=Object.assign(t,e))}))}return t}},T={setRef:function(t,e,n){return this.typecheck(n),n[t]=e,n},unsetRef:function(t,e){return this.typecheck(e),this.keyExists(t,e)&&delete e[t],e},unsetsRef:function(t,e){this.typecheck(e);var n=this;return D.each(t,(function(t){n.keyExists(t,e)&&delete e[t]})),e}};function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}const j={is:function(t){return null!=t&&"object"===O(t)&&Object.getPrototypeOf(t)===Object.prototype&&"[object Object]"===t.toString()},gets:function(t,e){var n={};this.typecheck(e);var r=this;return D.each(t,(function(t){n[t]=r.keyExists(t,e)?e[t]:void 0})),n},replaceRecursive:function(){var t=null,e=Array.from(arguments);if(e.length>0){t=this.copy(e[0]);var n=this,r=D.sliceStart(1,e);D.each(r,(function(e){null!=e&&n.each(e,(function(e,r){n.is(t[r])&&n.keyExists(r,t)?t[r]=n.replaceRecursive(t[r],e):t[r]=e}))}))}return t}};function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}const C={is:function(t){var e=!1,n=P(t);return"boolean"!==n&&"number"!==n&&"string"!==n||(e=!0),e},isNotBool:function(t){return this.is(t)&&!I.is(t)},cast:function(t,e){return null!=t&&null!=e&&(D.in(e,[!0,"json"])?t=Json.decode(t):"int"===e?t=B.cast(t):"num"===e?t=M.cast(t):"bool"===e&&this.is(t)&&(t=this.toBool(t))),t},toBool:function(t){var e=null;return this.typecheck(t),D.in(t,[1,"1",!0,"true"])?e=!0:D.in(t,[0,"0",!1,"false"])&&(e=!1),e}},F={is:function(t){return"string"==typeof t},isStart:function(t,e){return this.is(t)&&this.is(e)?e.startsWith(t):null},isEnd:function(t,e){return this.is(t)&&this.is(e)?e.endsWith(t):null},isEqual:function(t,e){return this.cast(t)===this.cast(e)},in:function(t,e){return this.is(e)&&this.is(t)?e.includes(t):null},icompare:function(t,e){return!(!this.is(t)||!this.is(e))&&t.toUpperCase()===e.toUpperCase()},cast:function(t,e){var n="";return null!=t&&(n=W.is(t)&&!0===e?s.encode(t):String(t)),n},toNum:function(t){return this.typecheck(t),M.cast(t)},toInt:function(t){return this.typecheck(t),B.cast(t)},pos:function(t,e){this.typecheck(e);var n=e.indexOf(t);return n=-1===n?null:n},lower:function(t){return this.typecheck(t),t.toLowerCase()},lowerFirst:function(t){return this.typecheck(t),this.isNotEmpty(t)?t.charAt(0).toLowerCase()+t.slice(1):null},upper:function(t){return this.typecheck(t),t.toUpperCase()},upperFirst:function(t){return this.typecheck(t),this.isNotEmpty(t)?t.charAt(0).toUpperCase()+t.slice(1):null},trim:function(t){return this.typecheck(t),t.trim()},quote:function(t,e,n){this.typecheck(t);var r=!0===e?'"':"'";return!0===n&&(t=c.escape(t)),r+t+r},sub:function(t,e,n){return this.typecheck(n),B.typecheck(t),n.substring(t,!0===e?void 0:e)},excerpt:function(t,e,n){var r=this.sub(0,t,e);return r!==e&&this.isNotEmpty(n)&&(r+=n),r},explode:function(t,e,n){this.typechecks([t,e]);var r=e.split(t);return!0===n&&(r=D.clean(r)),r},explodeIndex:function(t,e,n){var r=void 0,i=this.explode(e,n);return B.is(t)&&this.isNotEmpty(i[t])&&(r=i[t]),r},removeAllWhitespace:function(t){return this.typecheck(t),t.replace(/\s/g,"")},fromCamelCase:function(t,e){return this.typecheck(t),(e=this.trim(e)).replace(/[\w]([A-Z])/g,(function(e){return e[0]+t+e[1]})).toLowerCase()},toCamelCase:function(t,e){var n=null,r=this;e=this.trim(e);var i=this.explode(t,e,!0);return n=(i=D.map(i,(function(t,e){return 0==e?r.lower(t):r.upperFirst(t)}))).join(""),n=this.removeAllWhitespace(n)},slug:function(t){return(t=this.lower(t)).replace(/ /g,"-").replace(/[^\w-]+/g,"").replace(/--/g,"-")},keepNumber:function(t){return this.typecheck(t),t.replace(/[^0-9]/g,"")},replace:function(t,e){return this.typecheck(e),U.each(t,(function(t,n){e=e.replace(n,t)})),e}},L={is:function(t){return"object"!==p.type(t)},are:function(t){var e=this;return!!D.is(t)&&D.each(t,(function(t){return e.is(t)}))},isEmpty:function(t){return!!this.is(t)&&p.isEmpty(t)},isNotEmpty:function(t){return!!this.is(t)&&p.isNotEmpty(t)},typecheck:function(t,e){if((!0===e&&!this.isNotEmpty(t)||!0!==e&&!this.is(t))&&(!1!==e||null!=t))throw new Error(t);return t},typechecks:function(t,e){if(!D.is(t))throw new Error(t);var n=this;return D.each(t,(function(t){n.typecheck(t,e)})),t}};var D=u(L,w,N,x,S,A,T,y,{mergeRef:function(t){this.typecheck(t);var e=t,n=R.sliceStart(1,arguments);return this.each(n,(function(t){D.is(t)||(t=[t]),Array.prototype.push.apply(e,t)})),e},reverseRef:function(t){return this.typecheck(t),t.reverse()},spliceValue:function(t,e,n){var r=this.search(t,e);this.typecheck(e);var i=[r,1];return void 0!==n&&i.push(n),Array.prototype.splice.apply(e,i)}},v),R=u(L,w,N,x,S,y,m,v),I=u(L,{is:function(t){return"boolean"==typeof t},toInt:function(t){var e=null;return this.typecheck(t),!0===t?e=1:!1===t&&(e=0),e},toggle:function(t){var e=null;return this.typecheck(t),!0===t?e=!1:!1===t&&(e=!0),e}}),q=u(L,w,d),B=u(L,b,g),M=u(L,b,E),W=u(L,w,N,x,S,A,T,{keyExists:function(t,e){return!(!this.isKey(t)||!this.is(e))&&t in e}}),U=u(L,w,N,x,S,A,T,j),_=u(L,C),H=u(L,w,N,x,F),J={Type:L,ArrLoop:v},K={},Z={},z={d:console.log,assert:e.assertThrow.bind(e),logError:e.logError.bind(e)}})(),window.Quid=r})();