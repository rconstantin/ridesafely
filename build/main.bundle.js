'use strict';

// require('babelify/polyfill');

var _scene3d = require('./scene3d');

var _scene3d2 = _interopRequireDefault(_scene3d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {

  _scene3d2.default.init();
};
