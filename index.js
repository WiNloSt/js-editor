'use strict';

exports.__esModule = true;

require('rxjs');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

require('normalize.css');

require('./global.scss');

var _configureStore = require('./configureStore.js');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _handleWorker = require('./handleWorker');

var _handleWorker2 = _interopRequireDefault(_handleWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var store = (0, _configureStore2['default'])(); // required to use with redux-observable

(0, _handleWorker2['default'])(store);

var enhancedApp = _react2['default'].createElement(
  _reactRedux.Provider,
  { store: store },
  _react2['default'].createElement(_App2['default'], null)
);

exports['default'] = enhancedApp;
