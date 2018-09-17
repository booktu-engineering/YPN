'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3400;
var app = (0, _express2.default)();

// mongoose.connect(`mongodb://localhost/ypn-dev`, {
// });

_mongoose2.default.connect('mongodb://base:Hasstrup1234@ds219051.mlab.com:19051/youthpartynigeria');

app.use((0, _cors2.default)()).use((0, _morgan2.default)('dev')).use(_bodyParser2.default.urlencoded({ extended: false })).use(_bodyParser2.default.json()).use('/api/v1', _routes2.default);

app.listen(PORT, function () {
  console.log('The Post service is listening on ' + PORT);
});

exports.default = app;