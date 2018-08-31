'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var url = 'https://ypn-node-service.herokuapp.com/api/v1/posts';

var PostServiceBase = function PostServiceBase(model, fetcher) {
  var _this = this;

  _classCallCheck(this, PostServiceBase);

  this.internalCreate = function (body) {
    _this.model.create(body, function (err, data) {
      if (err) return err.message;
      console.log('Successfully created the ' + data._id);
    });
  };

  this.externalCreate = function (data) {
    _axios2.default.request({
      url: url,
      data: data,
      method: 'post',
      headers: {
        Authorization: data.token
      }
    }).then(function () {
      console.log('Data created from the external api');
    }).catch(function () {
      // some message got lost in the db
      console.log('Yo the external service couldnt create the guy');
    });
  };

  if (!model) {
    throw new Error('Please send in the right model');
  }
  this.model = model;
  this.fetcher = fetcher;
};

var PostService = new PostServiceBase(_model2.default, _axios2.default);
exports.default = PostService;