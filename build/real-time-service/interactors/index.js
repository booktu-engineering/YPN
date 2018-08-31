'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _exec = require('./internal/exec');

var _exec2 = _interopRequireDefault(_exec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatchToDb = function dispatchToDb(data) {
  var arr = [_exec2.default.internalCreate, _exec2.default.externalCreate];
  var index = Math.floor(Math.random() * 2);
  return arr[index](data);
};

exports.default = dispatchToDb;