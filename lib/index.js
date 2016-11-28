module.exports =
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
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(9);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _App = __webpack_require__(10);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(37);

	__webpack_require__(31);

	var _configureStore = __webpack_require__(16);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _handleWorker = __webpack_require__(18);

	var _handleWorker2 = _interopRequireDefault(_handleWorker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _configureStore2.default)(); // required to use with redux-observable

	(0, _handleWorker2.default)(store);

	var JsEditor = function JsEditor() {
	  return _react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_App2.default, null)
	  );
	};

	exports.default = JsEditor;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateCode = updateCode;
	exports.appendConsoleOutput = appendConsoleOutput;
	exports.runCode = runCode;
	exports.clearConsole = clearConsole;
	exports.toggleAutorun = toggleAutorun;
	var UPDATE_CODE = exports.UPDATE_CODE = 'UPDATE_CODE';
	function updateCode(code) {
	  return {
	    type: UPDATE_CODE,
	    code: code
	  };
	}

	var APPEND_CONSOLE_OUTPUT = exports.APPEND_CONSOLE_OUTPUT = 'APPEND_CONSOLE_OUTPUT';
	function appendConsoleOutput(consoleOutput) {
	  return {
	    type: APPEND_CONSOLE_OUTPUT,
	    consoleOutput: consoleOutput
	  };
	}

	var RUN_CODE = exports.RUN_CODE = 'RUN_CODE';
	function runCode() {
	  return {
	    type: RUN_CODE
	  };
	}

	var CLEAR_CONSOLE = exports.CLEAR_CONSOLE = 'CLEAR_CONSOLE';
	function clearConsole() {
	  return {
	    type: CLEAR_CONSOLE
	  };
	}

	var TOGGLE_AUTORUN = exports.TOGGLE_AUTORUN = 'TOGGLE_AUTORUN';
	function toggleAutorun() {
	  return {
	    type: TOGGLE_AUTORUN
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(36);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function isStateless(component) {
	  return !component.prototype.render;
	}

	var AcceptStyleAndClassName = function AcceptStyleAndClassName(WrappedComponent) {
	  var NewWrappedComponent = WrappedComponent;
	  if (isStateless(WrappedComponent)) {
	    NewWrappedComponent = function (_React$Component) {
	      _inherits(NewWrappedComponent, _React$Component);

	      function NewWrappedComponent() {
	        _classCallCheck(this, NewWrappedComponent);

	        return _possibleConstructorReturn(this, (NewWrappedComponent.__proto__ || Object.getPrototypeOf(NewWrappedComponent)).apply(this, arguments));
	      }

	      _createClass(NewWrappedComponent, [{
	        key: 'render',
	        value: function render() {
	          return WrappedComponent(_extends({}, this.props));
	        }
	      }]);

	      return NewWrappedComponent;
	    }(_react2.default.Component);
	  }

	  var EnhancedComponent = function (_NewWrappedComponent) {
	    _inherits(EnhancedComponent, _NewWrappedComponent);

	    function EnhancedComponent() {
	      _classCallCheck(this, EnhancedComponent);

	      return _possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).apply(this, arguments));
	    }

	    _createClass(EnhancedComponent, [{
	      key: 'render',
	      value: function render() {
	        var element = _get(EnhancedComponent.prototype.__proto__ || Object.getPrototypeOf(EnhancedComponent.prototype), 'render', this).call(this);
	        var enhancedElement = _react2.default.cloneElement(element, {
	          style: _extends({}, element.props.style || {}, this.props.style || {}),
	          className: (0, _classnames2.default)(element.props.className, this.props.className)
	        });

	        return enhancedElement;
	      }
	      // Display correct ReactElement name in React devtools

	    }]);

	    return EnhancedComponent;
	  }(NewWrappedComponent);

	  EnhancedComponent.displayName = WrappedComponent.displayName || WrappedComponent.name;


	  return EnhancedComponent;
	};

	exports.default = AcceptStyleAndClassName;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _worker = __webpack_require__(33);

	var _worker2 = _interopRequireDefault(_worker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _worker2.default();

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("rxjs");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _EditorApp = __webpack_require__(14);

	var _EditorApp2 = _interopRequireDefault(_EditorApp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function App() {
	  return _react2.default.createElement(_EditorApp2.default, null);
	};

	exports.default = App;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(26);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CodeKelvin = function CodeKelvin() {
	  return _react2.default.createElement(
	    'div',
	    { className: _style2.default.banner },
	    _react2.default.createElement(
	      'div',
	      { className: _style2.default.text },
	      'Powered by CodeKelvin \xA9 2016'
	    ),
	    _react2.default.createElement(
	      'a',
	      { href: '//codekelvin.com', target: '_blank' },
	      _react2.default.createElement('img', { src: '/codekelvin-logo.png', alt: 'CodeKelvin Logo', className: _style2.default.logo })
	    )
	  );
	};

	exports.default = CodeKelvin;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(6);

	var _reactRedux = __webpack_require__(5);

	var _AcceptStyleAndClassName = __webpack_require__(7);

	var _AcceptStyleAndClassName2 = _interopRequireDefault(_AcceptStyleAndClassName);

	var _actions = __webpack_require__(4);

	var actions = _interopRequireWildcard(_actions);

	var _style = __webpack_require__(27);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Console = function Console(_ref) {
	  var consoleOutput = _ref.consoleOutput;
	  var isAutorun = _ref.isAutorun;
	  var clearConsole = _ref.clearConsole;
	  var runCode = _ref.runCode;
	  var toggleAutorun = _ref.toggleAutorun;
	  return _react2.default.createElement(
	    'div',
	    { className: _style2.default.container },
	    _react2.default.createElement(
	      'div',
	      { className: _style2.default.containerFlex },
	      _react2.default.createElement(
	        'header',
	        { className: _style2.default.header },
	        _react2.default.createElement(
	          'h1',
	          { className: _style2.default.headerName },
	          'Console'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _style2.default.consoleControl },
	          _react2.default.createElement(
	            'label',
	            { className: _style2.default.autorun, htmlFor: 'autorun-cb' },
	            _react2.default.createElement(
	              'span',
	              { className: _style2.default.autorunLabel },
	              'Autorun'
	            ),
	            _react2.default.createElement('input', { id: 'autorun-cb', type: 'checkbox', className: _style2.default.autorunCheckbox, checked: isAutorun, onChange: toggleAutorun })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: _style2.default.button, onClick: runCode },
	            'Run'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: _style2.default.button, onClick: clearConsole },
	            'Clear log'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'ul',
	        { className: _style2.default.outputList },
	        consoleOutput.map(function (outputLine, index) {
	          return _react2.default.createElement(
	            'li',
	            { key: index, className: _style2.default.outputItem },
	            _react2.default.createElement(
	              'pre',
	              { className: _style2.default.preOutput },
	              outputLine
	            )
	          );
	        })
	      )
	    )
	  );
	};

	function mapStateToProps(state) {
	  return {
	    consoleOutput: state.consoleOutput,
	    isAutorun: state.isAutorun
	  };
	}

	function mapDispatchToProps(dispatch) {
	  var bindedActions = (0, _redux.bindActionCreators)(actions, dispatch);
	  return _extends({}, bindedActions);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _AcceptStyleAndClassName2.default)(Console));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(6);

	var _reactRedux = __webpack_require__(5);

	var _style = __webpack_require__(28);

	var _style2 = _interopRequireDefault(_style);

	var _AcceptStyleAndClassName = __webpack_require__(7);

	var _AcceptStyleAndClassName2 = _interopRequireDefault(_AcceptStyleAndClassName);

	var _actions = __webpack_require__(4);

	var actions = _interopRequireWildcard(_actions);

	var _reactAce = __webpack_require__(38);

	var _reactAce2 = _interopRequireDefault(_reactAce);

	__webpack_require__(34);

	__webpack_require__(35);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Console = function (_React$Component) {
	  _inherits(Console, _React$Component);

	  function Console() {
	    _classCallCheck(this, Console);

	    return _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).apply(this, arguments));
	  }

	  _createClass(Console, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.updateCode(this.props.code);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var aceCommands = [{
	        name: 'Run code',
	        bindKey: { win: 'Ctrl-enter', mac: 'Command-enter' },
	        exec: this.props.runCode
	      }];
	      return _react2.default.createElement(
	        'div',
	        { className: _style2.default.container },
	        _react2.default.createElement(_reactAce2.default, {
	          mode: 'javascript',
	          theme: 'monokai',
	          editorProps: { $blockScrolling: 'Infinity' },
	          className: _style2.default.editor,
	          focus: true,
	          style: {
	            height: '100%',
	            width: '100%',
	            fontFamily: 'Inconsolata',
	            fontSize: '1.2em'
	          },
	          value: this.props.code,
	          onChange: this.props.updateCode,
	          commands: aceCommands
	        })
	      );
	    }
	  }]);

	  return Console;
	}(_react2.default.Component);

	function mapStateToProps(state) {
	  return {
	    code: state.code
	  };
	}

	function mapDispatchToProps(dispatch) {
	  var bindedActions = (0, _redux.bindActionCreators)(actions, dispatch);
	  return _extends({}, bindedActions);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _AcceptStyleAndClassName2.default)(Console));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Editor = __webpack_require__(13);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _Console = __webpack_require__(12);

	var _Console2 = _interopRequireDefault(_Console);

	var _Resizer = __webpack_require__(15);

	var _Resizer2 = _interopRequireDefault(_Resizer);

	var _CodeKelvin = __webpack_require__(11);

	var _CodeKelvin2 = _interopRequireDefault(_CodeKelvin);

	var _style = __webpack_require__(29);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, App);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      resizerPositionPercentage: 60
	    }, _this.setResizerPosition = function (percentage) {
	      var screenWidth = screen.availWidth;
	      var editorSize = percentage / 100 * screenWidth;
	      var consoleSize = (100 - percentage) / 100 * screenWidth;
	      if (editorSize < 100 || consoleSize < 250) return;
	      _this.setState({
	        resizerPositionPercentage: percentage
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: _style2.default.container },
	        _react2.default.createElement(_Editor2.default, { style: {
	            display: 'inline-block',
	            width: this.state.resizerPositionPercentage + '%',
	            verticalAlign: 'top'
	          } }),
	        _react2.default.createElement(_Resizer2.default, { left: this.state.resizerPositionPercentage + '%', setResizerPosition: this.setResizerPosition }),
	        _react2.default.createElement(_Console2.default, { style: {
	            display: 'inline-block',
	            width: 100 - this.state.resizerPositionPercentage + '%',
	            verticalAlign: 'top'
	          } }),
	        _react2.default.createElement(_CodeKelvin2.default, null)
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(30);

	var _style2 = _interopRequireDefault(_style);

	var _rxjs = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Resizer = function (_React$Component) {
	  _inherits(Resizer, _React$Component);

	  function Resizer() {
	    _classCallCheck(this, Resizer);

	    return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
	  }

	  _createClass(Resizer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var resizer = this.refs.resizer;

	      var mousedown$ = _rxjs.Observable.fromEvent(resizer, 'mousedown');
	      var mouseup$ = _rxjs.Observable.fromEvent(document, 'mouseup');
	      var mousemove$ = _rxjs.Observable.fromEvent(document, 'mousemove');
	      var mousedrag$ = mousedown$.flatMap(function () {
	        return mousemove$.map(function (mm) {
	          mm.preventDefault();
	          return mm;
	        }).takeUntil(mouseup$);
	      });

	      var touchstart$ = _rxjs.Observable.fromEvent(resizer, 'touchstart');
	      var touchend$ = _rxjs.Observable.fromEvent(document, 'touchend');
	      var touchmove$ = _rxjs.Observable.fromEvent(document, 'touchmove');
	      var touchdrag$ = touchstart$.flatMap(function () {
	        return touchmove$.map(function (tm) {
	          tm.preventDefault();
	          return tm.targetTouches[0];
	        }).takeUntil(touchend$);
	      });

	      var drag$ = mousedrag$.merge(touchdrag$);

	      this.subscription = drag$.subscribe(function (mdrag) {
	        return _this2.props.setResizerPosition(mdrag.clientX / screen.availWidth * 100);
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.subscription.unsubscribe();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', {
	        ref: 'resizer',
	        className: _style2.default.resizer,
	        style: { left: this.props.left } });
	    }
	  }]);

	  return Resizer;
	}(_react2.default.Component);

	exports.default = Resizer;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(6);

	var _reduxObservable = __webpack_require__(39);

	var _reducers = __webpack_require__(19);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _epics = __webpack_require__(17);

	var _epics2 = _interopRequireDefault(_epics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var epicMiddleware = (0, _reduxObservable.createEpicMiddleware)(_epics2.default);

	function configureStore() {
	  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
	  var store = (0, _redux.createStore)(_reducers2.default, composeEnhancers((0, _redux.applyMiddleware)(epicMiddleware)));
	  return store;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _actions = __webpack_require__(4);

	var epic = function epic(action$, store) {
	  return action$.ofType(_actions.UPDATE_CODE).filter(function () {
	    return store.getState().isAutorun;
	  }).debounceTime(1500).mapTo((0, _actions.runCode)());
	};

	exports.default = epic;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webWorker = __webpack_require__(8);

	var _webWorker2 = _interopRequireDefault(_webWorker);

	var _actions = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureWorker(store) {
	  _webWorker2.default.onmessage = function (message) {
	    var data = message.data;

	    store.dispatch((0, _actions.appendConsoleOutput)(data));
	  };
	}

	exports.default = configureWorker;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _actions = __webpack_require__(4);

	var _webWorker = __webpack_require__(8);

	var _webWorker2 = _interopRequireDefault(_webWorker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var initialState = {
	  code: '// edit your code here\nconsole.log(\'hello world\')\n',
	  consoleOutput: [],
	  isAutorun: true
	};

	function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case _actions.UPDATE_CODE:
	      return _extends({}, state, {
	        code: action.code
	      });
	    case _actions.APPEND_CONSOLE_OUTPUT:
	      return _extends({}, state, {
	        consoleOutput: [].concat(_toConsumableArray(state.consoleOutput), _toConsumableArray(action.consoleOutput))
	      });
	    case _actions.RUN_CODE:
	      runCode(state.code);
	      return state;
	    case _actions.CLEAR_CONSOLE:
	      return _extends({}, state, {
	        consoleOutput: []
	      });
	    case _actions.TOGGLE_AUTORUN:
	      return _extends({}, state, {
	        isAutorun: !state.isAutorun
	      });
	    default:
	      return state;
	  }
	}

	function runCode(code) {
	  _webWorker2.default.postMessage(code);
	}

	exports.default = reducer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".style__banner___3FxQZ {\n  position: absolute;\n  padding: 0.4em 0.6em;\n  bottom: 0.5em;\n  right: 1em;\n  border-radius: 1em;\n  opacity: 0.5; }\n  .style__banner___3FxQZ:hover {\n    opacity: 1; }\n\n.style__text___1ljc7 {\n  display: inline-block;\n  margin-right: 1em;\n  padding-bottom: 0.2em;\n  color: #333;\n  vertical-align: bottom; }\n\n.style__logo___2LnO- {\n  width: 60px;\n  height: 60px;\n  vertical-align: bottom;\n  border-radius: 0.5em; }\n  .style__logo___2LnO-:hover {\n    box-shadow: 0 0 0.5em #4bf; }\n  .style__logo___2LnO-:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px); }\n", ""]);

	// exports
	exports.locals = {
		"banner": "style__banner___3FxQZ",
		"text": "style__text___1ljc7",
		"logo": "style__logo___2LnO-"
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".style__container___4ZPk9 {\n  background: #91d7ff;\n  height: 100%; }\n\n.style__containerFlex___26pws {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100%; }\n\n.style__header___1EaR1 {\n  background: #0090e3;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.style__headerName___zUnTI {\n  margin: 0.2em 0;\n  margin-left: 0.4em;\n  color: white; }\n\n.style__consoleControl___3G8uG {\n  margin-left: 0.4em;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-family: sans-serif; }\n\n.style__autorun___2hgb7 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 0.2em; }\n\n.style__autorunLabel___3Lrxo {\n  color: white;\n  margin-right: 0.4em; }\n\n.style__autorunCheckbox___39nsb {\n  margin-right: 0.4em; }\n\n.style__button___2BbmK {\n  font-family: inherit;\n  margin-right: 0.4em;\n  padding: 0.2em 0.6em;\n  background: none;\n  border: 0.15em solid white;\n  border-radius: 1em;\n  color: white;\n  -webkit-transition: all 0.15s;\n  transition: all 0.15s;\n  outline: none; }\n  .style__button___2BbmK:hover {\n    color: #0090e3;\n    background: white; }\n  .style__button___2BbmK:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px); }\n\n.style__outputList___Q2vFA {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 0px;\n      -ms-flex: 1 0 0px;\n          flex: 1 0 0px;\n  overflow: auto; }\n\n.style__outputItem___1P3jG {\n  padding: 0 1em;\n  border-bottom: 0.1em solid #0090e3;\n  color: #333; }\n\n.style__preOutput___3_erN {\n  font-size: 1.2em;\n  font-family: inherit;\n  margin: 0.5em 0; }\n", ""]);

	// exports
	exports.locals = {
		"container": "style__container___4ZPk9",
		"containerFlex": "style__containerFlex___26pws",
		"header": "style__header___1EaR1",
		"headerName": "style__headerName___zUnTI",
		"consoleControl": "style__consoleControl___3G8uG",
		"autorun": "style__autorun___2hgb7",
		"autorunLabel": "style__autorunLabel___3Lrxo",
		"autorunCheckbox": "style__autorunCheckbox___39nsb",
		"button": "style__button___2BbmK",
		"outputList": "style__outputList___Q2vFA",
		"outputItem": "style__outputItem___1P3jG",
		"preOutput": "style__preOutput___3_erN"
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".style__container___1PAq7 {\n  height: 100%; }\n\n.style__editor___11kBr {\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  background: #282828;\n  color: #00c181;\n  font-family: 'Inconsolata', monospace;\n  font-size: 1.5rem;\n  resize: none; }\n", ""]);

	// exports
	exports.locals = {
		"container": "style__container___1PAq7",
		"editor": "style__editor___11kBr"
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".style__container___IPwHH {\n  height: 100%;\n  background: #4bf;\n  white-space: nowrap; }\n", ""]);

	// exports
	exports.locals = {
		"container": "style__container___IPwHH"
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.id, ".style__resizer___3Q2iw {\n  position: absolute;\n  top: 0;\n  margin: 0 -5px;\n  width: 10px;\n  height: 100%;\n  background: #666;\n  z-index: 9;\n  cursor: -webkit-grab;\n  cursor: grab; }\n  .style__resizer___3Q2iw:active {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n    background: #555; }\n", ""]);

	// exports
	exports.locals = {
		"resizer": "style__resizer___3Q2iw"
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Inconsolata);", ""]);

	// module
	exports.push([module.id, "html,\nbody {\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  font-family: 'Inconsolata', monospace; }\n\n#root {\n  height: 100%; }\n", ""]);

	// exports


/***/ },
/* 26 */
[40, 20],
/* 27 */
[40, 21],
/* 28 */
[40, 22],
/* 29 */
[40, 23],
/* 30 */
[40, 24],
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./global.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./global.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

	var URL = window.URL || window.webkitURL;
	module.exports = function(content, url) {
		try {
			try {
				var blob;
				try { // BlobBuilder = Deprecated, but widely implemented
					var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
					blob = new BlobBuilder();
					blob.append(content);
					blob = blob.getBlob();
				} catch(e) { // The proposed API
					blob = new Blob([content]);
				}
				return new Worker(URL.createObjectURL(blob));
			} catch(e) {
				return new Worker('data:application/javascript,' + encodeURIComponent(content));
			}
		} catch(e) {
			return new Worker(url);
		}
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(32)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n\n\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t'use strict';\n\n\tvar _stringify = __webpack_require__(1);\n\n\tvar _stringify2 = _interopRequireDefault(_stringify);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n\tonmessage = function onmessage(message) {\n\t  // eslint-disable-line\n\t  var code = message.data;\n\t  try {\n\t    eval(code); // eslint-disable-line\n\t  } catch (error) {\n\t    console.error(error);\n\t  }\n\t};\n\n\t(function configureProxyConsoleLog() {\n\t  var originalConsoleLog = console.log.bind(console);\n\n\t  console.log = function () {\n\t    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {\n\t      rest[_key] = arguments[_key];\n\t    }\n\n\t    var args = rest.map(function (arg) {\n\t      if (typeof arg === 'undefined') {\n\t        return 'undefined';\n\t      }\n\n\t      return (0, _stringify2.default)(arg);\n\t    });\n\t    postMessage(args);\n\t    originalConsoleLog.apply(undefined, rest);\n\t  };\n\t})();\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\t'use strict';\n\n\tObject.defineProperty(exports, \"__esModule\", {\n\t  value: true\n\t});\n\t/**\n\t * Stringify.\n\t * Inspect native browser objects and functions.\n\t */\n\tvar stringify = function () {\n\n\t  var sortci = function sortci(a, b) {\n\t    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;\n\t  };\n\n\t  var htmlEntities = function htmlEntities(str) {\n\t    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n\t  };\n\n\t  /**\n\t   * Recursively stringify an object. Keeps track of which objects it has\n\t   * visited to avoid hitting circular references, and a buffer for indentation.\n\t   * Goes 2 levels deep.\n\t   */\n\t  return function stringify(o, visited, buffer) {\n\t    var i,\n\t        vi,\n\t        type = '',\n\t        parts = [];\n\t    buffer = buffer || '';\n\t    visited = visited || [];\n\n\t    // Get out fast with primitives that don't like toString\n\t    if (o === null) {\n\t      return 'null';\n\t    }\n\t    if (typeof o === 'undefined') {\n\t      return 'undefined';\n\t    }\n\n\t    // Determine the type\n\t    try {\n\t      type = {}.toString.call(o);\n\t    } catch (e) {\n\t      // only happens when typeof is protected (...randomly)\n\t      type = '[object Object]';\n\t    }\n\n\t    // Handle the primitive types\n\t    if (type === '[object Number]') {\n\t      return '' + o;\n\t    }\n\t    if (type === '[object Boolean]') {\n\t      return o ? 'true' : 'false';\n\t    }\n\t    if (type === '[object Function]') {\n\t      return o.toString().split('\\n  ').join('\\n' + buffer);\n\t    }\n\t    if (type === '[object String]') {\n\t      return '\"' + htmlEntities(o.replace(/\"/g, '\\\\\"')) + '\"';\n\t    }\n\n\t    // Check for circular references\n\t    for (vi = 0; vi < visited.length; vi++) {\n\t      if (o === visited[vi]) {\n\t        // Notify the user that a circular object was found and, if available,\n\t        // show the object's outerHTML (for body and elements)\n\t        return '[circular ' + type.slice(1) + ('outerHTML' in o ? ' :\\n' + htmlEntities(o.outerHTML).split('\\n').join('\\n' + buffer) : '');\n\t      }\n\t    }\n\n\t    // Remember that we visited this object\n\t    visited.push(o);\n\n\t    // Stringify each member of the array\n\t    if (type === '[object Array]') {\n\t      for (i = 0; i < o.length; i++) {\n\t        parts.push(stringify(o[i], visited));\n\t      }\n\t      return '[' + parts.join(', ') + ']';\n\t    }\n\n\t    // Fake array – very tricksy, get out quickly\n\t    if (type.match(/Array/)) {\n\t      return type;\n\t    }\n\n\t    var typeStr = type + ' ',\n\t        newBuffer = buffer + '  ';\n\n\t    // Dive down if we're less than 2 levels deep\n\t    if (buffer.length / 2 < 2) {\n\n\t      var names = [];\n\t      // Some objects don't like 'in', so just skip them\n\t      try {\n\t        for (i in o) {\n\t          // eslint-disable-line\n\t          names.push(i);\n\t        }\n\t      } catch (e) {}\n\n\t      names.sort(sortci);\n\t      for (i = 0; i < names.length; i++) {\n\t        try {\n\t          parts.push(newBuffer + names[i] + ': ' + stringify(o[names[i]], visited, newBuffer));\n\t        } catch (e) {}\n\t      }\n\t    }\n\n\t    // If nothing was gathered, return empty object\n\t    if (!parts.length) return typeStr + '{ ... }';\n\n\t    // Return the indented object with new lines\n\t    return typeStr + '{\\n' + parts.join(',\\n') + '\\n' + buffer + '}';\n\t  };\n\t}();\n\n\texports.default = stringify;\n\n/***/ }\n/******/ ]);", __webpack_require__.p + "e47544d9f806e1ff5a47.worker.js");
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("brace/mode/javascript");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("brace/theme/monokai");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("normalize.css");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("react-ace");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("redux-observable");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(__webpack_module_template_argument_0__);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }
/******/ ])));