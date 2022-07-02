!function(){var t={155:function(t){var e,n,i=t.exports={};function r(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function u(t){if(e===setTimeout)return setTimeout(t,0);if((e===r||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:r}catch(t){e=r}try{n="function"==typeof clearTimeout?clearTimeout:c}catch(t){n=c}}();var o,s=[],l=!1,h=-1;function f(){l&&o&&(l=!1,o.length?s=o.concat(s):h=-1,s.length&&a())}function a(){if(!l){var t=u(f);l=!0;for(var e=s.length;e;){for(o=s,s=[];++h<e;)o&&o[h].run();h=-1,e=s.length}o=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===c||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function y(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new p(t,e)),1!==s.length||l||u(a)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=y,i.addListener=y,i.once=y,i.off=y,i.removeListener=y,i.removeAllListeners=y,i.emit=y,i.prependListener=y,i.prependOnceListener=y,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var c=e[i]={exports:{}};return t[i](c,c.exports,n),c.exports}n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};!function(){"use strict";n.r(i),n.d(i,{Arr:function(){return C},ArrLike:function(){return F},Bool:function(){return L},Component:function(){return H},Datetime:function(){return t},Debug:function(){return e},Env:function(){return c},Factory:function(){return u},Func:function(){return D},Html:function(){return o},Integer:function(){return R},Json:function(){return s},Nav:function(){return l},Num:function(){return I},Obj:function(){return q},Pojo:function(){return B},Scalar:function(){return M},Shortcut:function(){return K},Str:function(){return W},Test:function(){return _},TestSuite:function(){return h},Tool:function(){return U},Validate:function(){return f},Vari:function(){return a}});var t={now:function(){return(new Date).getTime()},localeFormat:function(t,e,n){return W.typecheck(t),(e=W.isNotEmpty(e)?new Date(e):new Date).toLocaleString(t,n)},year:function(){return(new Date).getFullYear()},ymd:function(t,e,n,i){let r=R.is(t)?new Date(1e3*t):new Date;return r.setHours(0,0,0),R.is(i)&&r.setDate(i),R.is(n)&&r.setMonth(n-1),R.is(e)&&r.setFullYear(e),r.toISOString().substr(0,10)},his:function(t){return(R.is(t)?new Date(1e3*t):new Date).toTimeString().split(" ")[0]}},e=new function(){let t=!1;this.status=function(e){return M.is(e)&&(t=e),t},this.is=function(e){return!0===t||t===e},this.assertThrow=function(t){if(!0!==t)throw new Error},this.logError=function(t){console.error("Catched",t)}},r=n(155),c={isNode:function(){return void 0!==r&&void 0!==r.release&&"node"===r.release.name},isBrowser:function(){return!this.isNode()},isWindow:function(t){let e=!1;return this.isBrowser()&&q.is(t)&&(e=t instanceof Window||t.window===t),e},isTarget:function(t){let e=!1;return this.isBrowser()&&q.is(t)&&(e=t instanceof HTMLElement||t instanceof HTMLTemplateElement||t instanceof DocumentFragment||t===document||this.isWindow(t)||C.in(t.nodeType,[Node.TEXT_NODE,Node.DOCUMENT_TYPE_NODE])),e}};function u(t){const e=Object.create(!0===t?{}:t||null),n=Array.prototype.slice.call(arguments,1);return Object.assign.apply(null,[e].concat(n)),e}var o={valueAttr:{br:"data-value",hr:"data-value",img:"src",meta:"content",link:"href",input:"value"},htmlEscapes:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},isSelfClosing:function(t){return C.in(t,["br","hr","img","meta","link","input"])},escape:function(t){const e=this;return W.typecheck(t),t.replace(/[&<>"']/g,(function(t){return e.htmlEscapes[t]}))},start:function(t,e,n){let i="";W.typecheck(t,!0);const r=this.isSelfClosing(t),c=this.attr(n,t,e);return i+="<",i+=t,W.isNotEmpty(c)&&(i+=" ",i+=c),!0===r?i+="/>":(i+=">",i+=this.value(e)),i},end:function(t){let e="";W.typecheck(t,!0);return!1===this.isSelfClosing(t)&&(e+="</",e+=t,e+=">"),e},value:function(t,e){return!0===t?t=!0===e?1:"&nbsp;":!1===t&&(t=!0===e?0:""),!0!==e&&(B.is(t)&&(t=B.values(t)),C.is(t)&&(t=t.join(", "))),W.cast(t,!0)},attr:function(t,e,n){let i="";const r=this.isSelfClosing(e);if(t=this.attrToPojo(t),!0===r&&B.keyExists(e,this.valueAttr)){const i=B.get(e,this.valueAttr);if(null!=i){null!=B.get(i,t)&&null==n||(t[i]=this.value(n,!0))}}return t=this.prepareAttr(t),i=B.str(t,"="," ",!0),i},attrToPojo:function(t){let e={};return W.isNotEmpty(t)&&(e={class:t}),B.is(t)&&(e=t),e},prepareAttr:function(t){let e={};B.typecheck(t);const n=function(t,e){return{key:W.fromCamelCase("-",t),value:L.is(e)?L.toInt(e):e}};return B.each(t,(function(t,i){const r=n(i,t);i=r.key,t=r.value,"class"===i&&C.is(t)?t=t.join(" "):"data"===i&&B.is(t)&&(B.each(t,(function(t,i){const r=n(i,t),c="data-"+r.key;e[c]=r.value})),t=null),null!=t&&(e[i]=t)})),e},tag:function(t,e,n){return this.start(t,e,n)+this.end(t)},tagCond:function(t,e,n){return a.isNotEmpty(this.value(e))?this.tag(t,e,n):""},div:function(t,e){return this.tag("div",t,e)},span:function(t,e){return this.tag("span",t,e)},ul:function(t,e){return this.tag("ul",t,e)},li:function(t,e){return this.tag("li",t,e)},input:function(t,e){return this.tag("input",t,B.replace({type:"text"},this.attrToPojo(e)))},button:function(t,e){return this.tag("button",t,B.replace({type:"button"},this.attrToPojo(e)))}},s={encode:function(t){return JSON.stringify(t)},decode:function(t){return JSON.parse(W.typecheck(t))},recode:function(t){return this.decode(this.encode(t))}},l={isFirst:function(t,e){return t===this.getFirst(e)},hasPrev:function(t,e,n){return null!=this.getPrev(t,e,n)},hasNext:function(t,e,n){return null!=this.getNext(t,e,n)},isLast:function(t,e){return t===this.getLast(e)},isIndex:function(t,e){return this.getIndex(t,e)===t},getFirst:function(t){return R.isPositive(t)?0:null},getPrev:function(t,e,n){let i=null;if(R.isPositive(e)){const r=e-1,c=(t=R.is(t)?t:r)-1;c<0?!0===n&&(i=r):i=c}return i},getNext:function(t,e,n){let i=null;if(R.isPositive(e)){const r=e-1,c=(t=R.is(t)?t:-1)+1;c>r?!0===n&&(i=0):i=c}return i},getLast:function(t){return R.isPositive(t)?t-1:null},getIndex:function(t,e){return R.is(t)&&t>=0&&R.isPositive(e)&&t<e?t:null},index:function(t,e,n,i){let r=null;return R.isPositive(n)&&("first"===t?r=this.getFirst(n):"last"===t?r=this.getLast(n):"prev"===t?r=this.getPrev(e,n,i):"next"===t?r=this.getNext(e,n,i):R.is(t)&&(r=this.getIndex(t,n))),r},indexObj:function(t,e,n,i){let r=null;if(q.typechecks(n,!1),null!=n){const c=C.length(n);q.is(t)&&(t=C.search(t,n)),q.is(e)&&(e=C.search(e,n));const u=this.index(t,e,c,i);R.is(u)&&(r=C.get(u,n))}return r}};function h(t){return B.each(t,(function(t,e){return t()}))}var f={isNumericDash:function(t){return this.regex(t,"^[0-9-]+$")},isEmail:function(t){return this.regex(t,/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,4})+$/)},isRegexStr:function(t){return W.isNotEmpty(t)||t instanceof RegExp},regex:function(t,e){let n=!1;if(W.is(t)&&this.isRegexStr(e)){new RegExp(e).test(t)&&(n=!0)}return n},trigger:function(t,e,n){let i=this.required(t,e);return!0===i&&(i=this.pattern(t,n)),i},required:function(t,e){let n=!0;return L.is(e)&&(e=L.toInt(e)),I.isPositive(e)&&(t=W.cast(t),(t=W.trim(t)).length||(n=!1)),n},pattern:function(t,e){let n=!0;return W.isNotEmpty(e)&&(t=W.cast(t)).length&&!this.regex(t,e)&&(n=!1),n}},a={is:function(t){return void 0!==t},isEmpty:function(t){let e=!0;return C.is(t)||W.is(t)?e=!(t.length>0):M.is(t)?e=!t:c.isTarget(t)?e=!1:null!=t&&this.eachProto(t,(function(){return e=!1,!1})),e},isNotEmpty:function(t){return!this.isEmpty(t)},isReallyEmpty:function(t){return!I.is(t)&&!L.is(t)&&this.isEmpty(t)},isNotReallyEmpty:function(t){return!this.isReallyEmpty(t)},isNull:function(t){return null===t},isUndefined:function(t){return void 0===t},isEqual:function(){let t,e=!1,n=null;return e=F.each(arguments,(function(e){if(n=s.encode(e),void 0!==t)return n===t;t=n})),e},isEqualStrict:function(){let t,e=!1;return e=F.each(arguments,(function(e){if(void 0!==t)return Object.is(t,e);t=e})),e},type:function(t){let e=typeof t;const n={};if(null==t)e=t+"";else if("function"===e){const i=n.toString.call(t);e=n[i]||"object"}return e},check:function(t,e){if(t!==e)throw new Error([t,e]);return t},eachProto:function(t,e){let n=null;if(D.is(e)){var i,r;let c;for(i in n=!0,t)if(r=t[i],c=e.call(r,r,i,t),!1===c){n=!1;break}}return n}};const p={is:function(t){return Array.isArray(t)},in:function(t,e){return this.is(e)?Array.prototype.includes.call(e,t):null},keys:function(t){return this.typecheck(t),Array.from(Array.prototype.keys.call(t))},valueFirst:function(t){return this.typecheck(t),t.length?t[0]:void 0},valueLast:function(t){return this.typecheck(t),t.length?t[t.length-1]:void 0},keyFirst:function(t){return this.typecheck(t),t.length?0:void 0},keyLast:function(t){return this.typecheck(t),t.length?t.length-1:void 0},search:function(t,e){let n=null;return this.typecheck(e),n=Array.prototype.indexOf.call(e,t),n=-1===n?null:n,n},slice:function(t,e,n){let i=null;return this.typecheck(n),t=R.is(t)?t:0,e=R.is(e)?e:void 0,i=Array.prototype.slice.call(n,t,e),i},sliceStart:function(t,e){return this.slice(t,!0,e)},merge:function(t){let e=null;this.typecheck(t);const n=F.sliceStart(1,arguments);return e=Array.prototype.concat.apply(t,n),e},clean:function(t){return this.filter(t,(function(t){return a.isNotReallyEmpty(t)}))},valueStrip:function(t,e){return this.filter(e,(function(e){return e!==t}))},find:function(t,e){return this.typecheck(t),D.typecheck(e),Array.prototype.find.call(t,e)},some:function(t,e){return this.typecheck(t),D.typecheck(e),Array.prototype.some.call(t,e)},every:function(t,e){return this.typecheck(t),D.typecheck(e),Array.prototype.every.call(t,e)},map:function(t,e){return this.typecheck(t),D.typecheck(e),Array.prototype.map.call(t,e)},filter:function(t,e){return this.typecheck(t),D.typecheck(e),Array.prototype.filter.call(t,e)},reduce:function(t,e,n){return this.typecheck(e),D.typecheck(n),Array.prototype.reduce.call(e,n,t)},column:function(t,e){const n=[];return W.typecheck(t,!0),this.each(e,(function(e){B.is(e)&&B.keyExists(t,e)&&n.push(e[t])})),n},new:function(){return[]}},y={mergeRef:function(t){this.typecheck(t);let e=t;const n=F.sliceStart(1,arguments);return this.each(n,(function(t){C.is(t)||(t=[t]),Array.prototype.push.apply(e,t)})),e},reverseRef:function(t){return this.typecheck(t),t.reverse()},spliceValue:function(t,e,n){let i=null,r=this.search(t,e);this.typecheck(e);let c=[r,1];return void 0!==n&&c.push(n),i=Array.prototype.splice.apply(e,c),i}},d={timeouts:function(t,e,n,i){return R.typecheck(e),R.typecheck(n),D.typecheck(i),C.each(t,(function(t,r){const c=e+r*n;D.timeout(c,(function(){i(t,r,c)}))}))},oddEven:function(t,e,n){return D.typechecks([e,n],!1),C.each(t,(function(t,i){const r=i+1;I.isOdd(r)?null!=e&&e(t,i):null!=n&&n(t,i)}))}};var g={is:function(t){let e=!1;if(!(C.is(t)||M.is(t)||D.is(t)||c.isWindow(t))){const n=a.type(t),i=!!t&&"length"in t&&t.length;e="array"===n||0===i||"number"==typeof i&&i>0&&i-1 in t}return e},toArray:function(t){return C.is(t)?t:this.is(t)?Array.from(t):null}},k={is:function(t){return"function"==typeof t&&"number"!=typeof t.nodeType},noop:function(){return function(){}},async:function(t,e){return this.timeout(0,t,e)},timeout:function(t,e,n){return this.typecheck(e),R.is(t)||(t=0),setTimeout(e.bind(n),t)},debounce:function(t,e){R.typecheck(t),this.typecheck(e);const n=this;let i;return function(){const r=this,c=arguments;i&&clearTimeout(i),i=n.timeout(t,(function(){e.apply(r,c)}))}},debounceOnce:function(t,e){let n=!1;return Func.typecheck(e),this.debounce(t,(function(){const t=arguments;!1===n&&(e.apply(this,t),n=!0)}))},throttle:function(t,e){R.typecheck(t),this.typecheck(e);const n=this;let i=!0;return function(){const r=this;!0===i&&(e.apply(r,arguments),i=!1,n.timeout(t,(function(){i=!0})))}}},m={is:function(t){return I.is(t)&&parseInt(t)===t},cast:function(t){return M.isNotBool(t)&&""!==t?parseInt(t):null},toBool:function(t){let e=null;return this.typecheck(t),1===t?e=!0:0===t&&(e=!1),e},toggle:function(t){let e=null;return this.typecheck(t),1===t?e=0:0===t&&(e=1),e},range:function(t,e,n){let i=null;if(t=null==t?1:t,n=null==n?1:n,this.isPositive(t,!0)&&this.isPositive(e,!0)&&this.isPositive(n)){const r=Math.floor((e-t)/n)+1,c=Array(r).fill(t);i=C.map(c,(function(t,e){return t+e*n}))}return i},unique:function(t){let e=0;return function(){return e++}}()};const v={is:function(t){let e=!1;const n=a.type(t);return"number"!==n&&"string"!==n||(e=!isNaN(t-parseFloat(t))),e},isEmpty:function(t){return!!this.is(t)&&a.isEmpty(this.cast(t))},isNotEmpty:function(t){return!!this.is(t)&&a.isNotEmpty(this.cast(t))},isPositive:function(t,e){let n=!1;return this.is(t)&&((t=this.cast(t))>0||!0===e&&0===t)&&(n=!0),n},isNegative:function(t,e){let n=!1;return this.is(t)&&((t=this.cast(t))<0||!0===e&&0===t)&&(n=!0),n},isOdd:function(t){return this.is(t)&&!R.is(t/2)},isEven:function(t){return this.is(t)&&R.is(t/2)},isNan:function(t){return isNaN(t)},cast:function(t){return M.isNotBool(t)&&""!==t?parseFloat(t):null},str:function(t){return this.typecheck(t),Number(t).toString()}},E={decimal:function(t,e){return this.typecheck(t),e=R.is(e)?e:2,t.toFixed(e)},round:function(t){return t=this.cast(t),this.typecheck(t),Math.round(t)},floor:function(t){return t=this.cast(t),this.typecheck(t),Math.floor(t)},ceil:function(t){return t=this.cast(t),this.typecheck(t),Math.ceil(t)}},w={is:function(t){return"object"===a.type(t)},isEqual:function(){let t=!1;const e=Array.from(arguments);return e.length>1&&this.is(e[0])&&(t=a.isEqual.apply(null,e)),t},length:function(t){this.typecheck(t);return Object.keys(t).length}},b={isKey:function(t){return M.isNotBool(t)},keyExists:function(t,e){return!(!this.isKey(t)||!this.is(e))&&e.hasOwnProperty(t)},keys:function(t){return this.typecheck(t),Object.keys(t)},values:function(t){return this.typecheck(t),Object.values(t)},get:function(t,e){return this.typecheck(e),this.keyExists(t,e)?e[t]:void 0},toArray:function(t){return this.typecheck(t),Array.from(this.values(t))},valueFirst:function(t){let e;const n=this.keys(t);if(null!=n){e=t[n[0]]}return e},valueLast:function(t){let e;const n=this.keys(t);if(null!=n){e=t[n[n.length-1]]}return e},find:function(t,e){let n;return D.typecheck(e),this.each(t,(function(t,i){if(e(t,i))return n=t,!1})),n},findKey:function(t,e){let n=null;return D.typecheck(e),this.each(t,(function(t,i){if(e(t,i))return n=i,!1})),n},some:function(t,e){let n=!1;return D.typecheck(e),this.each(t,(function(t,i){if(e(t,i))return n=!0,!1})),n},every:function(t,e){let n=!0;return D.typecheck(e),this.each(t,(function(t,i){if(!e(t,i))return n=!1})),n},reduce:function(t,e,n){return D.typecheck(n),this.each(e,(function(e,i){t=n(t,e,i)})),t},accumulate:function(t,e,n){return D.typecheck(n),this.each(e,(function(e,i){const r=n(e,i);if(null==r)return!0;C.is(t)?t.push(r):B.is(t)?t[i]=r:t+=r})),t},str:function(t,e,n,i){return e=W.is(e)?e:"=",n=W.is(n)?n:" ",this.reduce("",t,(function(t,r,c){if(W.isNotEmpty(c))return r=W.cast(r,!0),!0===i&&(r=W.quote(r,!1,!0)),t.length&&(t+=n),t+=c,t+=e,t+=r}))},climb:function(t,e){W.is(t)&&(t=W.explode("/",t)),C.typecheck(t),this.typecheck(e);const n=this;return C.each(t,(function(t){if(!n.keyExists(t,e))return e=void 0,!1;e=e[t]})),e}},N={each:function(t,e){let n=!0;D.typecheck(e);let i,r,c,u=this.keys(t);for(var o=0;o<u.length;o++)if(i=u[o],r=t[i],c=e(r,i),!1===c){n=!1;break}return n}},x={copy:function(t){return this.typecheck(t),Object.assign(this.new(),t)},new:function(){return{}},filter:function(t,e){let n=this.new();D.typecheck(e);const i=!Array.isArray(n);return this.each(t,(function(t,r){const c=e(t,r);r=!1===i?n.length:r,c&&(n[r]=t)})),n},map:function(t,e){let n=this.new();return D.typecheck(e),this.each(t,(function(t,i){const r=e(t,i);n[i]=r})),n}},A={set:function(t,e,n){let i=this.copy(n);return i[t]=e,i},unset:function(t,e){let n=this.copy(e);return delete n[t],n},unsets:function(t,e){let n=this.copy(e);const i=this;return C.each(t,(function(t){i.keyExists(t,e)&&delete n[t]})),n},replace:function(){let t=this.new(),e=Array.from(arguments);if(e.length>0){const n=this;C.each(e,(function(e){n.typecheck(e,!1),null!=e&&(t=Object.assign(t,e))}))}return t}},T={setRef:function(t,e,n){return this.typecheck(n),n[t]=e,n},unsetRef:function(t,e){return this.typecheck(e),this.keyExists(t,e)&&delete e[t],e},unsetsRef:function(t,e){this.typecheck(e);const n=this;return C.each(t,(function(t){n.keyExists(t,e)&&delete e[t]})),e}};var O={is:function(t){return null!=t&&"object"==typeof t&&Object.getPrototypeOf(t)===Object.prototype&&"[object Object]"===t.toString()},gets:function(t,e){let n={};this.typecheck(e);const i=this;return C.each(t,(function(t){n[t]=i.keyExists(t,e)?e[t]:void 0})),n},replaceRecursive:function(){let t=null,e=Array.from(arguments);if(e.length>0){t=this.copy(e[0]);const n=this,i=C.sliceStart(1,e);C.each(i,(function(e){null!=e&&n.each(e,(function(e,i){n.is(t[i])&&n.keyExists(i,t)?t[i]=n.replaceRecursive(t[i],e):t[i]=e}))}))}return t}},S={is:function(t){let e=!1;const n=typeof t;return"boolean"!==n&&"number"!==n&&"string"!==n||(e=!0),e},isNotBool:function(t){return this.is(t)&&!L.is(t)},cast:function(t,e){return null!=t&&null!=e&&(C.in(e,[!0,"json"])?t=s.decode(t):"int"===e?t=R.cast(t):"num"===e?t=I.cast(t):"bool"===e&&this.is(t)&&(t=this.toBool(t))),t},toBool:function(t){let e=null;return this.typecheck(t),C.in(t,[1,"1",!0,"true"])?e=!0:C.in(t,[0,"0",!1,"false"])&&(e=!1),e}},j={is:function(t){return"string"==typeof t},isStart:function(t,e){return this.is(t)&&this.is(e)?e.startsWith(t):null},isEnd:function(t,e){return this.is(t)&&this.is(e)?e.endsWith(t):null},isEqual:function(t,e){return this.cast(t)===this.cast(e)},in:function(t,e){return this.is(e)&&this.is(t)?e.includes(t):null},icompare:function(t,e){return!(!this.is(t)||!this.is(e))&&t.toUpperCase()===e.toUpperCase()},cast:function(t,e){let n="";return null!=t&&(n=q.is(t)&&!0===e?s.encode(t):String(t)),n},toNum:function(t){return this.typecheck(t),I.cast(t)},toInt:function(t){return this.typecheck(t),R.cast(t)},pos:function(t,e){this.typecheck(e);let n=e.indexOf(t);return n=-1===n?null:n,n},lower:function(t){return this.typecheck(t),t.toLowerCase()},lowerFirst:function(t){return this.typecheck(t),this.isNotEmpty(t)?t.charAt(0).toLowerCase()+t.slice(1):null},upper:function(t){return this.typecheck(t),t.toUpperCase()},upperFirst:function(t){return this.typecheck(t),this.isNotEmpty(t)?t.charAt(0).toUpperCase()+t.slice(1):null},trim:function(t){return this.typecheck(t),t.trim()},quote:function(t,e,n){let i=null;this.typecheck(t);const r=!0===e?'"':"'";return!0===n&&(t=o.escape(t)),i=r+t+r,i},sub:function(t,e,n){return this.typecheck(n),R.typecheck(t),n.substring(t,!0===e?void 0:e)},excerpt:function(t,e,n){let i=this.sub(0,t,e);return i!==e&&this.isNotEmpty(n)&&(i+=n),i},explode:function(t,e,n){this.typechecks([t,e]);let i=e.split(t);return!0===n&&(i=C.clean(i)),i},explodeIndex:function(t,e,n){let i;const r=this.explode(e,n);return R.is(t)&&this.isNotEmpty(r[t])&&(i=r[t]),i},removeAllWhitespace:function(t){return this.typecheck(t),t.replace(/\s/g,"")},fromCamelCase:function(t,e){return this.typecheck(t),(e=this.trim(e)).replace(/[\w]([A-Z])/g,(function(e){return e[0]+t+e[1]})).toLowerCase()},toCamelCase:function(t,e){let n=null;const i=this;e=this.trim(e);let r=this.explode(t,e,!0);return r=C.map(r,(function(t,e){return 0==e?i.lower(t):i.upperFirst(t)})),n=r.join(""),n=this.removeAllWhitespace(n),n},slug:function(t){return(t=this.lower(t)).replace(/ /g,"-").replace(/[^\w-]+/g,"").replace(/--/g,"-")},keepNumber:function(t){return this.typecheck(t),t.replace(/[^0-9]/g,"")},replace:function(t,e){return this.typecheck(e),B.each(t,(function(t,n){e=e.replace(n,t)})),e}},P={is:function(t){return"object"!==a.type(t)},are:function(t){const e=this;return!!C.is(t)&&C.each(t,(function(t){return e.is(t)}))},isEmpty:function(t){return!!this.is(t)&&a.isEmpty(t)},isNotEmpty:function(t){return!!this.is(t)&&a.isNotEmpty(t)},typecheck:function(t,e){if((!0===e&&!this.isNotEmpty(t)||!0!==e&&!this.is(t))&&(!1!==e||null!=t))throw new Error(t);return t},typechecks:function(t,e){if(!C.is(t))throw new Error(t);{const n=this;C.each(t,(function(t){n.typecheck(t,e)}))}return t}};const C=u(P,w,b,N,x,A,T,p,y,d),F=u(P,w,b,N,x,p,g,d),L=u(P,{is:function(t){return"boolean"==typeof t},toInt:function(t){let e=null;return this.typecheck(t),!0===t?e=1:!1===t&&(e=0),e},toggle:function(t){let e=null;return this.typecheck(t),!0===t?e=!1:!1===t&&(e=!0),e}}),D=u(P,w,k),R=u(P,v,m),I=u(P,v,E),q=u(P,w,b,N,x,A,T,{keyExists:function(t,e){return!(!this.isKey(t)||!this.is(e))&&t in e}}),B=u(P,w,b,N,x,A,T,O),M=u(P,S),W=u(P,w,b,N,j),U={Type:P,ArrLoop:d},_={},H={},K={d:console.log,assert:e.assertThrow.bind(e),logError:e.logError.bind(e)}}(),window.Quid=i}();