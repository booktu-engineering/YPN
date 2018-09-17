'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prodConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'http://localhost:5000/'
};

var devConfig = {
  baseUrl: 'https://ypn-base-01.herokuapp.com/',
  notificationUrl: 'https://yon-notification.herokuapp.com/'
};

exports.default = function () {
  return devConfig;
};