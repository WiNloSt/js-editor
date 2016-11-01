/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(1);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	onmessage = function onmessage(message) {
	  // eslint-disable-line
	  var code = message.data;
	  try {
	    eval(code); // eslint-disable-line
	  } catch (error) {
	    console.error(error);
	  }
	};

	(function configureProxyConsoleLog() {
	  var originalConsoleLog = console.log.bind(console);

	  console.log = function () {
	    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	      rest[_key] = arguments[_key];
	    }

	    var args = rest.map(function (arg) {
	      if (typeof arg === 'undefined') {
	        return 'undefined';
	      }

	      return (0, _stringify2.default)(arg);
	    });
	    postMessage(args);
	    originalConsoleLog.apply(undefined, rest);
	  };
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Stringify.
	 * Inspect native browser objects and functions.
	 */
	var stringify = function () {

	  var sortci = function sortci(a, b) {
	    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
	  };

	  var htmlEntities = function htmlEntities(str) {
	    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	  };

	  /**
	   * Recursively stringify an object. Keeps track of which objects it has
	   * visited to avoid hitting circular references, and a buffer for indentation.
	   * Goes 2 levels deep.
	   */
	  return function stringify(o, visited, buffer) {
	    var i,
	        vi,
	        type = '',
	        parts = [];
	    buffer = buffer || '';
	    visited = visited || [];

	    // Get out fast with primitives that don't like toString
	    if (o === null) {
	      return 'null';
	    }
	    if (typeof o === 'undefined') {
	      return 'undefined';
	    }

	    // Determine the type
	    try {
	      type = {}.toString.call(o);
	    } catch (e) {
	      // only happens when typeof is protected (...randomly)
	      type = '[object Object]';
	    }

	    // Handle the primitive types
	    if (type === '[object Number]') {
	      return '' + o;
	    }
	    if (type === '[object Boolean]') {
	      return o ? 'true' : 'false';
	    }
	    if (type === '[object Function]') {
	      return o.toString().split('\n  ').join('\n' + buffer);
	    }
	    if (type === '[object String]') {
	      return '"' + htmlEntities(o.replace(/"/g, '\\"')) + '"';
	    }

	    // Check for circular references
	    for (vi = 0; vi < visited.length; vi++) {
	      if (o === visited[vi]) {
	        // Notify the user that a circular object was found and, if available,
	        // show the object's outerHTML (for body and elements)
	        return '[circular ' + type.slice(1) + ('outerHTML' in o ? ' :\n' + htmlEntities(o.outerHTML).split('\n').join('\n' + buffer) : '');
	      }
	    }

	    // Remember that we visited this object
	    visited.push(o);

	    // Stringify each member of the array
	    if (type === '[object Array]') {
	      for (i = 0; i < o.length; i++) {
	        parts.push(stringify(o[i], visited));
	      }
	      return '[' + parts.join(', ') + ']';
	    }

	    // Fake array – very tricksy, get out quickly
	    if (type.match(/Array/)) {
	      return type;
	    }

	    var typeStr = type + ' ',
	        newBuffer = buffer + '  ';

	    // Dive down if we're less than 2 levels deep
	    if (buffer.length / 2 < 2) {

	      var names = [];
	      // Some objects don't like 'in', so just skip them
	      try {
	        for (i in o) {
	          // eslint-disable-line
	          names.push(i);
	        }
	      } catch (e) {}

	      names.sort(sortci);
	      for (i = 0; i < names.length; i++) {
	        try {
	          parts.push(newBuffer + names[i] + ': ' + stringify(o[names[i]], visited, newBuffer));
	        } catch (e) {}
	      }
	    }

	    // If nothing was gathered, return empty object
	    if (!parts.length) return typeStr + '{ ... }';

	    // Return the indented object with new lines
	    return typeStr + '{\n' + parts.join(',\n') + '\n' + buffer + '}';
	  };
	}();

	exports.default = stringify;

/***/ }
/******/ ]);