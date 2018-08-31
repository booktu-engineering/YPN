'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'http://localhost:5000/'
};

var devConfig = {
  baseUrl: 'http://localhost:3000/',
  notificationUrl: 'http://localhost:5000/'
};

exports.default = function () {
  return devConfig;
};