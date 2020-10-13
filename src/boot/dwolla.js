var dwolla =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var __VERSION__ = '1.6.0';
	var __BUILD_TAG__ = '1';
	
	window.dwolla = {
	  config: __webpack_require__(1),
	  configure: __webpack_require__(2),
	  iav: __webpack_require__(3),
	  fundingSources: __webpack_require__(8),
	  version: __VERSION__,
	  buildTag: __BUILD_TAG__
	};
	
	exports['default'] = window.dwolla;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	
	  dwollaUrl: 'https://www.dwolla.com',
	
	  apiUrl: 'https://api.dwolla.com'
	
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	function configure(fn) {
	  if (fn === 'sandbox') fn = 'uat';
	  if (typeof fn === 'string') configure.CONFIGS[fn.toLowerCase()](_config2['default']);else fn(_config2['default']);
	}
	
	configure.CONFIGS = {
	  uat: function uat(cfg) {
	    cfg.dwollaUrl = 'https://sandbox.dwolla.com';
	    cfg.apiUrl = 'https://api-sandbox.dwolla.com';
	  },
	
	  prod: function prod(cfg) {
	    cfg.dwollaUrl = 'https://www.dwolla.com';
	    cfg.apiUrl = 'https://api.dwolla.com';
	  }
	};
	
	exports['default'] = configure;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dwollaConfig = __webpack_require__(1);
	
	var _dwollaConfig2 = _interopRequireDefault(_dwollaConfig);
	
	var _lodashEndswith = __webpack_require__(4);
	
	var _lodashEndswith2 = _interopRequireDefault(_lodashEndswith);
	
	function COMMUNICATION_ERROR(protocol) {
	  return {
	    code: 'CommunicationError',
	    message: ['Unable to communicate with iframe.', 'Serving this page over `https` instead of `' + protocol + '` should fix the problem.'].join(' ')
	  };
	}
	
	var HEARTBEAT_EXPIRED_ERROR = {
	  code: 'UnexpectedPage',
	  message: 'IAV navigated to an unexpected page and was cancelled.'
	};
	
	var iOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
	
	var iav = {
	
	  _HEARTBEAT_TTL: iOS ? 10000 : 1000,
	
	  _iframe: null,
	
	  _iframeHeight: null,
	
	  _callback: null,
	
	  _subscriber: null,
	
	  _heartbeatTimeoutId: null,
	
	  _protocol: window.location.protocol.replace(':', ''),
	
	  start: function start(token, opts, callback) {
	    if (typeof opts !== 'object') {
	      var containerId = token;
	      token = opts;
	      opts = { container: containerId };
	    }
	
	    var container = getContainerOrThrow(opts.container);
	    ensureValidTokenOrThrow(token);
	    ensureValidCallbackOrThrow(callback);
	
	    if (iav._iframe !== null) {
	      try {
	        container.removeChild(iav._iframe);
	      } catch (e) {}
	    }
	
	    iav._iframe = document.createElement('iframe');
	    iav._iframe.onload = iav._onLoad;
	    iav._iframe.src = getIframeUrl(token, opts);
	    iav._iframe.style.visibility = 'hidden';
	    iav._iframe.style.overflow = 'hidden';
	    iav._iframe.style.minWidth = '100%';
	    iav._iframe.frameBorder = '0';
	    iav._iframe.width = '1px';
	    iav._iframe.scrolling = 'no';
	
	    container.appendChild(iav._iframe);
	
	    iav._iframeHeight = null;
	
	    iav._callback = callback;
	    iav._subscriber = opts.subscriber;
	
	    window.addEventListener('message', iav._onMessage);
	  },
	
	  _onLoad: function _onLoad() {
	    iav._heartbeatTimeoutId = window.setTimeout(iav._onHeartbeatExpired, iav._HEARTBEAT_TTL, null);
	
	    iav._iframe.contentWindow.postMessage({
	      topic: 'iav.heartbeat'
	    }, iav._iframeDomain());
	  },
	
	  _onMessage: function _onMessage(message) {
	    if (!messageFromDwolla(message)) return;
	
	    if (messageTopicIs(message, 'heartbeat')) {
	      window.clearTimeout(iav._heartbeatTimeoutId);
	      iav._iframe.style.visibility = 'visible';
	    }
	
	    if (messageTopicIs(message, 'response')) iav._callback.apply(null, message.data.payload);
	
	    if (messageTopicIs(message, 'height') && message.data.payload !== iav._iframeHeight) iav._iframe.style.height = message.data.payload + 'px';
	
	    if (messageTopicIs(message, 'state') && 'function' === typeof iav._subscriber) iav._subscriber.apply(null, message.data.payload);
	  },
	
	  _onHeartbeatExpired: function _onHeartbeatExpired() {
	    var isHttps = iav._protocol === 'https';
	    iav._callback(isHttps ? HEARTBEAT_EXPIRED_ERROR : COMMUNICATION_ERROR(iav._protocol));
	    iav._iframe.style.visibility = 'hidden';
	  },
	
	  _iframeDomain: function _iframeDomain() {
	    return iav._iframe.src.split('/').slice(0, 3).join('/');
	  }
	
	};
	
	function getContainerOrThrow(containerId) {
	  var container = document.getElementById(containerId);
	  if (container) return container;else throw new Error('[dwolla.iav.start] Element not found with id: ' + containerId);
	}
	
	function ensureValidTokenOrThrow(token) {
	  if (typeof token !== 'string') throw new Error('[dwolla.iav.start] Invalid token: ' + token);
	}
	
	function ensureValidCallbackOrThrow(callback) {
	  if (typeof callback !== 'function') throw new Error('[dwolla.iav.start] Invalid callback: ' + callback);
	}
	
	function messageFromDwolla(message) {
	  return message.origin === _dwollaConfig2['default'].dwollaUrl;
	}
	
	function messageTopicIs(message, topic) {
	  return message.data.topic === 'iav.' + topic;
	}
	
	function getIframeUrl(token, opts) {
	  var url = _dwollaConfig2['default'].dwollaUrl + '/fi/token/' + token + '?' + getIframeQuery(opts);
	  return (0, _lodashEndswith2['default'])(url, '?') || (0, _lodashEndswith2['default'])(url, '&') ? url.slice(0, -1) : url;
	}
	
	function getIframeQuery(opts) {
	  return getQuery({
	    stylesheets: typeof opts.stylesheets === 'object' ? opts.stylesheets : null,
	    microDeposits: opts.microDeposits,
	    fallbackToMicroDeposits: opts.fallbackToMicroDeposits || opts.fallbackToMicrodeposits,
	    backButton: opts.backButton
	  });
	}
	
	function getQuery(params) {
	  var query = '';
	  for (var j in params) {
	    if (params[j]) {
	      if (typeof params[j] === 'object') {
	        query += j + '=' + params[j].map(encodeURIComponent).join('&' + j + '=') + '&';
	      } else {
	        query += j + '=' + encodeURIComponent(params[j]) + '&';
	      }
	    }
	  }
	  return query;
	}
	
	exports['default'] = iav;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	'use strict';
	
	var baseToString = __webpack_require__(5),
	    toString = __webpack_require__(7);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} number The number to clamp.
	 * @param {number} [lower] The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the clamped number.
	 */
	function baseClamp(number, lower, upper) {
	  if (number === number) {
	    if (upper !== undefined) {
	      number = number <= upper ? number : upper;
	    }
	    if (lower !== undefined) {
	      number = number >= lower ? number : lower;
	    }
	  }
	  return number;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? remainder ? result - remainder : result : 0;
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	
	/**
	 * Checks if `string` ends with the given target string.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to search.
	 * @param {string} [target] The string to search for.
	 * @param {number} [position=string.length] The position to search from.
	 * @returns {boolean} Returns `true` if `string` ends with `target`,
	 *  else `false`.
	 * @example
	 *
	 * _.endsWith('abc', 'c');
	 * // => true
	 *
	 * _.endsWith('abc', 'b');
	 * // => false
	 *
	 * _.endsWith('abc', 'b', 2);
	 * // => true
	 */
	function endsWith(string, target, position) {
	  string = toString(string);
	  target = baseToString(target);
	
	  var length = string.length;
	  position = position === undefined ? length : baseClamp(toInteger(position), 0, length);
	
	  position -= target.length;
	  return position >= 0 && string.indexOf(target, position) == position;
	}
	
	module.exports = endsWith;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	'use strict';
	
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType ? exports : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = objectTypes[typeof module] && module && !module.nodeType ? module : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof undefined] && undefined);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	
	module.exports = baseToString;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module), (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	'use strict';
	
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _fundingSourcesValidator = __webpack_require__(9);
	
	var _fundingSourcesValidator2 = _interopRequireDefault(_fundingSourcesValidator);
	
	var _api = __webpack_require__(10);
	
	var _api2 = _interopRequireDefault(_api);
	
	var fundingSources = {
	
	  create: function create(token, params, callback) {
	    var errors = _fundingSourcesValidator2['default'].validate(token, params, callback);
	    if (errors) return callback(errors);
	
	    _api2['default'].post(token, '/funding-sources', params, callback);
	  }
	
	};
	
	exports['default'] = fundingSources;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ROUTING_NUMBER_REGEX = /^[0-9]{9}$/,
	    ACCOUNT_NUMBER_REGEX = /^[0-9]+$/;
	
	var validator = {
	  validate: function validate(token, params, callback) {
	    var errors = [];
	
	    if (invalidToken(token)) errors.push(buildValidationError('Token invalid.', '/token'));
	
	    if (invalidRoutingNumber(params.routingNumber)) errors.push(buildValidationError('Routing number invalid.', '/routingNumber'));
	
	    if (invalidAccountNumber(params.accountNumber)) errors.push(buildValidationError('Account number invalid.', '/accountNumber'));
	
	    if (invalidType(params.type)) errors.push(buildValidationError('Type invalid.', '/type'));
	
	    if (invalidName(params.name)) errors.push(buildValidationError('Name invalid.', '/name'));
	
	    if (invalidCallback(callback)) errors.push(buildValidationError('Callback invalid.', '/callback'));
	
	    return errors.length > 0 ? validationErrors(errors) : null;
	  }
	};
	
	function buildValidationError(message, path) {
	  return {
	    code: 'Invalid',
	    message: message,
	    path: path
	  };
	}
	
	function validationErrors(errors) {
	  return {
	    code: 'ValidationError',
	    message: 'Validation error(s) present. See embedded errors list for more details.',
	    _embedded: {
	      errors: errors
	    }
	  };
	}
	
	function invalidToken(token) {
	  return typeof token !== 'string';
	}
	
	function invalidRoutingNumber(routingNumber) {
	  return typeof routingNumber !== 'string' || !ROUTING_NUMBER_REGEX.test(routingNumber) || !validABA(routingNumber);
	}
	
	function invalidAccountNumber(accountNumber) {
	  return typeof accountNumber !== 'string' || !ACCOUNT_NUMBER_REGEX.test(accountNumber);
	}
	
	function invalidType(type) {
	  return typeof type !== 'string' || ['checking', 'savings'].indexOf(type.toLowerCase()) === -1;
	}
	
	function invalidName(name) {
	  return typeof name !== 'string';
	}
	
	function invalidCallback(callback) {
	  return typeof callback !== 'function';
	}
	
	// http://www.brainjar.com/js/validation/
	function validABA(s) {
	  if (s.length !== 9) return false;
	
	  var n = 0;
	  for (var i = 0; i < s.length; i += 3) {
	    n += pInt(s.charAt(i)) * 3 + pInt(s.charAt(i + 1)) * 7 + pInt(s.charAt(i + 2));
	  }
	
	  return n !== 0 && n % 10 === 0;
	}
	
	function pInt(int) {
	  return parseInt(int, 10);
	}
	
	exports['default'] = validator;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _xhr = __webpack_require__(11);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _config = __webpack_require__(1);
	
	var _config2 = _interopRequireDefault(_config);
	
	var DWOLLA_CONTENT_TYPE = 'application/vnd.dwolla.v1.hal+json',
	    UNKNOWN_ERROR = {
	  code: 'UnknownError',
	  message: 'Could not connect to server.'
	};
	
	var api = {
	  post: function post(token, url, body, callback) {
	    var fullUrl = _config2['default'].apiUrl + url,
	        options = {
	      headers: {
	        Authorization: 'Bearer ' + token,
	        Accept: DWOLLA_CONTENT_TYPE,
	        'Content-Type': DWOLLA_CONTENT_TYPE
	      },
	      body: JSON.stringify(body),
	      useXDR: true
	    };
	
	    _xhr2['default'].post(fullUrl, options, responseHandler(callback));
	  }
	};
	
	function responseHandler(callback) {
	  return function (err, res, body) {
	    body = tryParseJson(body);
	
	    if (res.statusCode >= 400) callback(body);else if (res.statusCode === 201) callback(null, transformCreated(res));else if (res.statusCode >= 200) callback(null, body);else callback(UNKNOWN_ERROR);
	  };
	}
	
	function transformCreated(res) {
	  return {
	    _links: {
	      'funding-source': { href: res.headers.location }
	    }
	  };
	}
	
	function tryParseJson(body) {
	  try {
	    body = JSON.parse(body);
	  } catch (e) {
	    if (true) console.warn('Could not parse json: ' + body);
	  }
	
	  return body;
	}
	
	exports['default'] = api;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var window = __webpack_require__(12);
	var once = __webpack_require__(13);
	var isFunction = __webpack_require__(14);
	var parseHeaders = __webpack_require__(15);
	var xtend = __webpack_require__(38);
	
	module.exports = createXHR;
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop;
	createXHR.XDomainRequest = "withCredentials" in new createXHR.XMLHttpRequest() ? createXHR.XMLHttpRequest : window.XDomainRequest;
	
	forEachArray(["get", "put", "post", "patch", "head", "delete"], function (method) {
	    createXHR[method === "delete" ? "del" : method] = function (uri, options, callback) {
	        options = initParams(uri, options, callback);
	        options.method = method.toUpperCase();
	        return _createXHR(options);
	    };
	});
	
	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i]);
	    }
	}
	
	function isEmpty(obj) {
	    for (var i in obj) {
	        if (obj.hasOwnProperty(i)) return false;
	    }
	    return true;
	}
	
	function initParams(uri, options, callback) {
	    var params = uri;
	
	    if (isFunction(options)) {
	        callback = options;
	        if (typeof uri === "string") {
	            params = { uri: uri };
	        }
	    } else {
	        params = xtend(options, { uri: uri });
	    }
	
	    params.callback = callback;
	    return params;
	}
	
	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback);
	    return _createXHR(options);
	}
	
	function _createXHR(options) {
	    var callback = options.callback;
	    if (typeof callback === "undefined") {
	        throw new Error("callback argument missing");
	    }
	    callback = once(callback);
	
	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc();
	        }
	    }
	
	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined;
	
	        if (xhr.response) {
	            body = xhr.response;
	        } else if (xhr.responseType === "text" || !xhr.responseType) {
	            body = xhr.responseText || xhr.responseXML;
	        }
	
	        if (isJson) {
	            try {
	                body = JSON.parse(body);
	            } catch (e) {}
	        }
	
	        return body;
	    }
	
	    var failureResponse = {
	        body: undefined,
	        headers: {},
	        statusCode: 0,
	        method: method,
	        url: uri,
	        rawRequest: xhr
	    };
	
	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer);
	        if (!(evt instanceof Error)) {
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error"));
	        }
	        evt.statusCode = 0;
	        callback(evt, failureResponse);
	    }
	
	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return;
	        var status;
	        clearTimeout(timeoutTimer);
	        if (options.useXDR && xhr.status === undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200;
	        } else {
	            status = xhr.status === 1223 ? 204 : xhr.status;
	        }
	        var response = failureResponse;
	        var err = null;
	
	        if (status !== 0) {
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            };
	            if (xhr.getAllResponseHeaders) {
	                //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders());
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error");
	        }
	        callback(err, response, response.body);
	    }
	
	    var xhr = options.xhr || null;
	
	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest();
	        } else {
	            xhr = new createXHR.XMLHttpRequest();
	        }
	    }
	
	    var key;
	    var aborted;
	    var uri = xhr.url = options.uri || options.url;
	    var method = xhr.method = options.method || "GET";
	    var body = options.body || options.data || null;
	    var headers = xhr.headers = options.headers || {};
	    var sync = !!options.sync;
	    var isJson = false;
	    var timeoutTimer;
	
	    if ("json" in options) {
	        isJson = true;
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json"); //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json"); //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json);
	        }
	    }
	
	    xhr.onreadystatechange = readystatechange;
	    xhr.onload = loadFunc;
	    xhr.onerror = errorFunc;
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    };
	    xhr.ontimeout = errorFunc;
	    xhr.open(method, uri, !sync, options.username, options.password);
	    //has to be after open
	    if (!sync) {
	        xhr.withCredentials = !!options.withCredentials;
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0) {
	        timeoutTimer = setTimeout(function () {
	            aborted = true; //IE9 may still call readystatechange
	            xhr.abort("timeout");
	            var e = new Error("XMLHttpRequest timeout");
	            e.code = "ETIMEDOUT";
	            errorFunc(e);
	        }, options.timeout);
	    }
	
	    if (xhr.setRequestHeader) {
	        for (key in headers) {
	            if (headers.hasOwnProperty(key)) {
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object");
	    }
	
	    if ("responseType" in options) {
	        xhr.responseType = options.responseType;
	    }
	
	    if ("beforeSend" in options && typeof options.beforeSend === "function") {
	        options.beforeSend(xhr);
	    }
	
	    xhr.send(body);
	
	    return xhr;
	}
	
	function noop() {}

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var win;
	
	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof global !== "undefined") {
	    win = global;
	} else if (typeof self !== "undefined") {
	    win = self;
	} else {
	    win = {};
	}
	
	module.exports = win;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = once;
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function value() {
	      return once(this);
	    },
	    configurable: true
	  });
	});
	
	function once(fn) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    return fn.apply(this, arguments);
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = isFunction;
	
	var toString = Object.prototype.toString;
	
	function isFunction(fn) {
	  var string = toString.call(fn);
	  return string === '[object Function]' || typeof fn === 'function' && string !== '[object RegExp]' || typeof window !== 'undefined' && (
	  // IE8 and below
	  fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var trim = __webpack_require__(16),
	    forEach = __webpack_require__(37),
	    isArray = function isArray(arg) {
	  return Object.prototype.toString.call(arg) === '[object Array]';
	};
	
	module.exports = function (headers) {
	  if (!headers) return {};
	
	  var result = {};
	
	  forEach(trim(headers).split('\n'), function (row) {
	    var index = row.indexOf(':'),
	        key = trim(row.slice(0, index)).toLowerCase(),
	        value = trim(row.slice(index + 1));
	
	    if (typeof result[key] === 'undefined') {
	      result[key] = value;
	    } else if (isArray(result[key])) {
	      result[key].push(value);
	    } else {
	      result[key] = [result[key], value];
	    }
	  });
	
	  return result;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(17);
	var define = __webpack_require__(19);
	
	var implementation = __webpack_require__(23);
	var getPolyfill = __webpack_require__(35);
	var shim = __webpack_require__(36);
	
	var boundTrim = bind.call(Function.call, getPolyfill());
	
	define(boundTrim, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});
	
	module.exports = boundTrim;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var implementation = __webpack_require__(18);
	
	module.exports = Function.prototype.bind || implementation;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/* eslint no-invalid-this: 1 */
	
	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';
	
	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);
	
	    var bound;
	    var binder = function binder() {
	        if (this instanceof bound) {
	            var result = target.apply(this, args.concat(slice.call(arguments)));
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(that, args.concat(slice.call(arguments)));
	        }
	    };
	
	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }
	
	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
	
	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }
	
	    return bound;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys = __webpack_require__(20);
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
	
	var toStr = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;
	
	var isFunction = function isFunction(fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};
	
	var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
		var obj = {};
		try {
			origDefineProperty(obj, 'x', { enumerable: false, value: obj });
			// eslint-disable-next-line no-unused-vars, no-restricted-syntax
			for (var _ in obj) {
				// jscs:ignore disallowUnusedVariables
				return false;
			}
			return obj.x === obj;
		} catch (e) {
			/* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();
	
	var defineProperty = function defineProperty(object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			origDefineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};
	
	var defineProperties = function defineProperties(object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};
	
	defineProperties.supportsDescriptors = !!supportsDescriptors;
	
	module.exports = defineProperties;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(21);
	
	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys(o) {
		return origKeys(o);
	} : __webpack_require__(22);
	
	var originalKeys = Object.keys;
	
	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			})(1, 2);
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) {
					// eslint-disable-line func-name-matching
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};
	
	module.exports = keysShim;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr = Object.prototype.toString;
		var isArgs = __webpack_require__(21); // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
		var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') {
				return false;
			}
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		})();
		var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};
	
		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr.call(object) === '[object String]';
			var theKeys = [];
	
			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}
	
			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}
	
			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}
	
			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	
				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	module.exports = keysShim;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(17);
	var ES = __webpack_require__(24);
	var replace = bind.call(Function.call, String.prototype.replace);
	
	var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
	var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
	
	module.exports = function trim() {
		var S = ES.ToString(ES.CheckObjectCoercible(this));
		return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var GetIntrinsic = __webpack_require__(25);
	
	var $Object = GetIntrinsic('%Object%');
	var $TypeError = GetIntrinsic('%TypeError%');
	var $String = GetIntrinsic('%String%');
	
	var assertRecord = __webpack_require__(26);
	var $isNaN = __webpack_require__(28);
	var $isFinite = __webpack_require__(29);
	
	var sign = __webpack_require__(30);
	var mod = __webpack_require__(31);
	
	var IsCallable = __webpack_require__(32);
	var toPrimitive = __webpack_require__(33);
	
	var has = __webpack_require__(27);
	
	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,
	
		ToBoolean: function ToBoolean(value) {
			return !!value;
		},
		ToNumber: function ToNumber(value) {
			return +value; // eslint-disable-line no-implicit-coercion
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) {
				return 0;
			}
			if (number === 0 || !$isFinite(number)) {
				return number;
			}
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) {
				return 0;
			}
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return $String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return $Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new $TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) {
				// 0 === -0, but they are not identical.
				if (x === 0) {
					return 1 / x === 1 / y;
				}
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		},
	
		// https://www.ecma-international.org/ecma-262/5.1/#sec-8
		Type: function Type(x) {
			if (x === null) {
				return 'Null';
			}
			if (typeof x === 'undefined') {
				return 'Undefined';
			}
			if (typeof x === 'function' || typeof x === 'object') {
				return 'Object';
			}
			if (typeof x === 'number') {
				return 'Number';
			}
			if (typeof x === 'boolean') {
				return 'Boolean';
			}
			if (typeof x === 'string') {
				return 'String';
			}
		},
	
		// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
		IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
			if (this.Type(Desc) !== 'Object') {
				return false;
			}
			var allowed = {
				'[[Configurable]]': true,
				'[[Enumerable]]': true,
				'[[Get]]': true,
				'[[Set]]': true,
				'[[Value]]': true,
				'[[Writable]]': true
			};
	
			for (var key in Desc) {
				// eslint-disable-line
				if (has(Desc, key) && !allowed[key]) {
					return false;
				}
			}
	
			var isData = has(Desc, '[[Value]]');
			var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
			if (isData && IsAccessor) {
				throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
			}
			return true;
		},
	
		// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
		IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
			if (typeof Desc === 'undefined') {
				return false;
			}
	
			assertRecord(this, 'Property Descriptor', 'Desc', Desc);
	
			if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
				return false;
			}
	
			return true;
		},
	
		// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
		IsDataDescriptor: function IsDataDescriptor(Desc) {
			if (typeof Desc === 'undefined') {
				return false;
			}
	
			assertRecord(this, 'Property Descriptor', 'Desc', Desc);
	
			if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
				return false;
			}
	
			return true;
		},
	
		// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
		IsGenericDescriptor: function IsGenericDescriptor(Desc) {
			if (typeof Desc === 'undefined') {
				return false;
			}
	
			assertRecord(this, 'Property Descriptor', 'Desc', Desc);
	
			if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
				return true;
			}
	
			return false;
		},
	
		// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
		FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
			if (typeof Desc === 'undefined') {
				return Desc;
			}
	
			assertRecord(this, 'Property Descriptor', 'Desc', Desc);
	
			if (this.IsDataDescriptor(Desc)) {
				return {
					value: Desc['[[Value]]'],
					writable: !!Desc['[[Writable]]'],
					enumerable: !!Desc['[[Enumerable]]'],
					configurable: !!Desc['[[Configurable]]']
				};
			} else if (this.IsAccessorDescriptor(Desc)) {
				return {
					get: Desc['[[Get]]'],
					set: Desc['[[Set]]'],
					enumerable: !!Desc['[[Enumerable]]'],
					configurable: !!Desc['[[Configurable]]']
				};
			} else {
				throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
			}
		},
	
		// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
		ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
			if (this.Type(Obj) !== 'Object') {
				throw new $TypeError('ToPropertyDescriptor requires an object');
			}
	
			var desc = {};
			if (has(Obj, 'enumerable')) {
				desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
			}
			if (has(Obj, 'configurable')) {
				desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
			}
			if (has(Obj, 'value')) {
				desc['[[Value]]'] = Obj.value;
			}
			if (has(Obj, 'writable')) {
				desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
			}
			if (has(Obj, 'get')) {
				var getter = Obj.get;
				if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
					throw new TypeError('getter must be a function');
				}
				desc['[[Get]]'] = getter;
			}
			if (has(Obj, 'set')) {
				var setter = Obj.set;
				if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
					throw new $TypeError('setter must be a function');
				}
				desc['[[Set]]'] = setter;
			}
	
			if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
				throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
			}
			return desc;
		}
	};
	
	module.exports = ES5;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	/* globals
		Set,
		Map,
		WeakSet,
		WeakMap,
	
		Promise,
	
		Symbol,
		Proxy,
	
		Atomics,
		SharedArrayBuffer,
	
		ArrayBuffer,
		DataView,
		Uint8Array,
		Float32Array,
		Float64Array,
		Int8Array,
		Int16Array,
		Int32Array,
		Uint8ClampedArray,
		Uint16Array,
		Uint32Array,
	*/
	
	var undefined; // eslint-disable-line no-shadow-restricted-names
	
	var ThrowTypeError = Object.getOwnPropertyDescriptor ? (function () {
		return Object.getOwnPropertyDescriptor(arguments, 'callee').get;
	})() : function () {
		throw new TypeError();
	};
	
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	
	var getProto = Object.getPrototypeOf || function (x) {
		return x.__proto__;
	}; // eslint-disable-line no-proto
	
	var generator; // = function * () {};
	var generatorFunction = generator ? getProto(generator) : undefined;
	var asyncFn; // async function() {};
	var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
	var asyncGen; // async function * () {};
	var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
	var asyncGenIterator = asyncGen ? asyncGen() : undefined;
	
	var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);
	
	var INTRINSICS = {
		'$ %Array%': Array,
		'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
		'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
		'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
		'$ %ArrayPrototype%': Array.prototype,
		'$ %ArrayProto_entries%': Array.prototype.entries,
		'$ %ArrayProto_forEach%': Array.prototype.forEach,
		'$ %ArrayProto_keys%': Array.prototype.keys,
		'$ %ArrayProto_values%': Array.prototype.values,
		'$ %AsyncFromSyncIteratorPrototype%': undefined,
		'$ %AsyncFunction%': asyncFunction,
		'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
		'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
		'$ %AsyncGeneratorFunction%': asyncGenFunction,
		'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
		'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
		'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
		'$ %Boolean%': Boolean,
		'$ %BooleanPrototype%': Boolean.prototype,
		'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
		'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
		'$ %Date%': Date,
		'$ %DatePrototype%': Date.prototype,
		'$ %decodeURI%': decodeURI,
		'$ %decodeURIComponent%': decodeURIComponent,
		'$ %encodeURI%': encodeURI,
		'$ %encodeURIComponent%': encodeURIComponent,
		'$ %Error%': Error,
		'$ %ErrorPrototype%': Error.prototype,
		'$ %eval%': eval, // eslint-disable-line no-eval
		'$ %EvalError%': EvalError,
		'$ %EvalErrorPrototype%': EvalError.prototype,
		'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
		'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
		'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
		'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
		'$ %Function%': Function,
		'$ %FunctionPrototype%': Function.prototype,
		'$ %Generator%': generator ? getProto(generator()) : undefined,
		'$ %GeneratorFunction%': generatorFunction,
		'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
		'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
		'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
		'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
		'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
		'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
		'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
		'$ %isFinite%': isFinite,
		'$ %isNaN%': isNaN,
		'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
		'$ %JSON%': JSON,
		'$ %JSONParse%': JSON.parse,
		'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
		'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
		'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
		'$ %Math%': Math,
		'$ %Number%': Number,
		'$ %NumberPrototype%': Number.prototype,
		'$ %Object%': Object,
		'$ %ObjectPrototype%': Object.prototype,
		'$ %ObjProto_toString%': Object.prototype.toString,
		'$ %ObjProto_valueOf%': Object.prototype.valueOf,
		'$ %parseFloat%': parseFloat,
		'$ %parseInt%': parseInt,
		'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
		'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
		'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
		'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
		'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
		'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
		'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
		'$ %RangeError%': RangeError,
		'$ %RangeErrorPrototype%': RangeError.prototype,
		'$ %ReferenceError%': ReferenceError,
		'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
		'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
		'$ %RegExp%': RegExp,
		'$ %RegExpPrototype%': RegExp.prototype,
		'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
		'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
		'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
		'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
		'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
		'$ %String%': String,
		'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
		'$ %StringPrototype%': String.prototype,
		'$ %Symbol%': hasSymbols ? Symbol : undefined,
		'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
		'$ %SyntaxError%': SyntaxError,
		'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
		'$ %ThrowTypeError%': ThrowTypeError,
		'$ %TypedArray%': TypedArray,
		'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
		'$ %TypeError%': TypeError,
		'$ %TypeErrorPrototype%': TypeError.prototype,
		'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
		'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
		'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
		'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
		'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
		'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
		'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
		'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
		'$ %URIError%': URIError,
		'$ %URIErrorPrototype%': URIError.prototype,
		'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
		'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
		'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
		'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
	};
	
	module.exports = function GetIntrinsic(name, allowMissing) {
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new TypeError('"allowMissing" argument must be a boolean');
		}
	
		var key = '$ ' + name;
		if (!(key in INTRINSICS)) {
			throw new SyntaxError('intrinsic ' + name + ' does not exist!');
		}
	
		// istanbul ignore if // hopefully this is impossible to test :-)
		if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
			throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}
		return INTRINSICS[key];
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var GetIntrinsic = __webpack_require__(25);
	
	var $TypeError = GetIntrinsic('%TypeError%');
	var $SyntaxError = GetIntrinsic('%SyntaxError%');
	
	var has = __webpack_require__(27);
	
	var predicates = {
	  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	  'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
	    if (ES.Type(Desc) !== 'Object') {
	      return false;
	    }
	    var allowed = {
	      '[[Configurable]]': true,
	      '[[Enumerable]]': true,
	      '[[Get]]': true,
	      '[[Set]]': true,
	      '[[Value]]': true,
	      '[[Writable]]': true
	    };
	
	    for (var key in Desc) {
	      // eslint-disable-line
	      if (has(Desc, key) && !allowed[key]) {
	        return false;
	      }
	    }
	
	    var isData = has(Desc, '[[Value]]');
	    var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
	    if (isData && IsAccessor) {
	      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	    }
	    return true;
	  }
	};
	
	module.exports = function assertRecord(ES, recordType, argumentName, value) {
	  var predicate = predicates[recordType];
	  if (typeof predicate !== 'function') {
	    throw new $SyntaxError('unknown record type: ' + recordType);
	  }
	  if (!predicate(ES, value)) {
	    throw new $TypeError(argumentName + ' must be a ' + recordType);
	  }
	//   console.log(predicate(ES, value), value);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(17);
	
	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	var $isNaN = Number.isNaN || function (a) {
	  return a !== a;
	};
	
	module.exports = Number.isFinite || function (x) {
	  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	var fnToStr = Function.prototype.toString;
	
	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};
	
	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) {
				return false;
			}
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isCallable(value) {
		if (!value) {
			return false;
		}
		if (typeof value !== 'function' && typeof value !== 'object') {
			return false;
		}
		if (typeof value === 'function' && !value.prototype) {
			return true;
		}
		if (hasToStringTag) {
			return tryFunctionObject(value);
		}
		if (isES6ClassFn(value)) {
			return false;
		}
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	var isPrimitive = __webpack_require__(34);
	
	var isCallable = __webpack_require__(32);
	
	// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
	var ES5internalSlots = {
		'[[DefaultValue]]': function DefaultValue(O) {
			var actualHint;
			if (arguments.length > 1) {
				actualHint = arguments[1];
			} else {
				actualHint = toStr.call(O) === '[object Date]' ? String : Number;
			}
	
			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};
	
	// http://ecma-international.org/ecma-262/5.1/#sec-9.1
	module.exports = function ToPrimitive(input) {
		if (isPrimitive(input)) {
			return input;
		}
		if (arguments.length > 1) {
			return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
		}
		return ES5internalSlots['[[DefaultValue]]'](input);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function isPrimitive(value) {
		return value === null || typeof value !== 'function' && typeof value !== 'object';
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var implementation = __webpack_require__(23);
	
	var zeroWidthSpace = 'â€‹';
	
	module.exports = function getPolyfill() {
		if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
			return String.prototype.trim;
		}
		return implementation;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(19);
	var getPolyfill = __webpack_require__(35);
	
	module.exports = function shimStringTrim() {
		var polyfill = getPolyfill();
		define(String.prototype, { trim: polyfill }, { trim: function trim() {
				return String.prototype.trim !== polyfill;
			} });
		return polyfill;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isCallable = __webpack_require__(32);
	
	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var forEachArray = function forEachArray(array, iterator, receiver) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            if (receiver == null) {
	                iterator(array[i], i, array);
	            } else {
	                iterator.call(receiver, array[i], i, array);
	            }
	        }
	    }
	};
	
	var forEachString = function forEachString(string, iterator, receiver) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        if (receiver == null) {
	            iterator(string.charAt(i), i, string);
	        } else {
	            iterator.call(receiver, string.charAt(i), i, string);
	        }
	    }
	};
	
	var forEachObject = function forEachObject(object, iterator, receiver) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            if (receiver == null) {
	                iterator(object[k], k, object);
	            } else {
	                iterator.call(receiver, object[k], k, object);
	            }
	        }
	    }
	};
	
	var forEach = function forEach(list, iterator, thisArg) {
	    if (!isCallable(iterator)) {
	        throw new TypeError('iterator must be a function');
	    }
	
	    var receiver;
	    if (arguments.length >= 3) {
	        receiver = thisArg;
	    }
	
	    if (toStr.call(list) === '[object Array]') {
	        forEachArray(list, iterator, receiver);
	    } else if (typeof list === 'string') {
	        forEachString(list, iterator, receiver);
	    } else {
	        forEachObject(list, iterator, receiver);
	    }
	};
	
	module.exports = forEach;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = extend;
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {};
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i];
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }
	
	    return target;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=dwolla.js.map