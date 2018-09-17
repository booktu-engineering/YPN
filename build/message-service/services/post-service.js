'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _conversationService = require('./conversation-service');

var _conversationService2 = _interopRequireDefault(_conversationService);

var _keys = require('../helpers/keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ref = {};
var data = void 0;
var nt_token = void 0;
var notifications = void 0;
var notification = void 0;
var filler = void 0;
var body = void 0;
var access = void 0;

/* eslint no-useless-constructor: 0, no-await-in-loop: 0, no-return-await: 0, no-underscore-dangle: 0, object-curly-newline: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, camelcase: 0 */

var PostServiceObject = function (_BaseService) {
  _inherits(PostServiceObject, _BaseService);

  function PostServiceObject() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, PostServiceObject);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostServiceObject.__proto__ || Object.getPrototypeOf(PostServiceObject)).call.apply(_ref, [this].concat(args))), _this), _this.updateOne = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value, changes) {
        var map, update;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!changes.content) {
                  _context.next = 12;
                  break;
                }

                ref.content = changes.content;
                map = {};

                map['' + key] = value;
                _context.next = 6;
                return _this.model.findOne(map);

              case 6:
                data = _context.sent;

                data.content = ref.content;
                _context.next = 10;
                return data.save();

              case 10:
                update = _context.sent;
                return _context.abrupt('return', update);

              case 12:
                _context.next = 14;
                return _this.fetchOne(key, value);

              case 14:
                return _context.abrupt('return', _context.sent);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.create = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body, access) {
        var post;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!body || body.constructor !== Object) {
                  _this.__unprocessableEntity('Please pass in the right values for the body');
                }
                _context2.next = 3;
                return _this.model.create(body);

              case 3:
                post = _context2.sent;

                if (!(post.referenceID !== null)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 7;
                return _this.__dispatchComment(_extends({}, post._doc, { subject: 'Someone replied to your post' }));

              case 7:
                _this.__examineForMentions(post._doc, access);
                if (post.destination !== null) _this.__dispatchMessage(post._doc);
                return _context2.abrupt('return', post);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.__formatNotification = function () {}, _this.__dispatchComment = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ref.content = data.content;
                ref.origin = data.origin;
                ref.id = data._id;
                notification = {
                  type: data.type,
                  message: data.origin.username + ' replied your ' + (data.destination ? 'message' : 'post'),
                  referenceID: data._id,
                  body: ref,
                  time: Date.now(),
                  destination: data.referenceObject.origin.username,
                  destinationID: data.referenceObject.origin.id
                };
                data = _extends({}, data, { destination: data.referenceObject.origin.email, subject: data.subject });
                _context3.next = 7;
                return _this.__updateReference(data.referenceObject, 1);

              case 7:
                _this.__dispatchToNotificationServer(data, _extends({}, notification), 5, data.origin);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x6) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.__updateReference = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, key) {
        var generateCount, target;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                generateCount = function generateCount(target) {
                  if (!target.commentCount) {
                    if (key === 1) return 1;
                    return 0;
                  }
                  return key === 1 ? target.commentCount + 1 : target.commentCount - 1;
                };

                _context4.next = 3;
                return _this.model.findOneAndUpdate({ _id: data._id }, { $set: { commentCount: generateCount(data) } }, { new: true });

              case 3:
                target = _context4.sent;

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.deleteOne = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.__checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context5.next = 5;
                return _this.model.findOne(ref);

              case 5:
                data = _context5.sent;

                if (data.referenceID) {
                  _this.__updateReference(data.referenceObject, 2);
                }
                _context5.next = 9;
                return _this.model.findOneAndDelete(ref);

              case 9:
                return _context5.abrupt('return', true);

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }(), _this.__dispatchMessage = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(message) {
        var convo, members;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _conversationService2.default.fetchOne('_id', message.destination);

              case 2:
                convo = _context6.sent;

                if (!(!convo || convo.type !== 1)) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return');

              case 5:
                // doing this so that he/she doesnt send a mail to himself/herself
                members = convo.members.filter(function (item) {
                  return item.id !== message.origin.id;
                });

                members.forEach(function (item) {
                  return _this.__dispatchToNotificationServer(_extends({}, message, { destination: item.email, subject: message.origin.username + ' sent you a message on Youth Party Nigeria' }), { destination: item.username, destinationID: item.id, message: message.origin.username + ' sent you a message on Youth Party Nigeria' }, 4);
                }, message.origin);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x11) {
        return _ref7.apply(this, arguments);
      };
    }(), _this.__updateNotifications = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(token, notification, destination) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _jsonwebtoken2.default.verify(token, _keys.key);

              case 2:
                notifications = _context7.sent;

                notifications = [notification].concat(_toConsumableArray(notifications.notifications));
                _context7.next = 6;
                return _jsonwebtoken2.default.sign({ notifications: notifications }, _keys.key);

              case 6:
                nt_token = _context7.sent;

                access = _jsonwebtoken2.default.sign({ id: destination.id, role: destination.role }, _keys.key);
                _this.__updateUser({ nt_token: nt_token }, access);
                return _context7.abrupt('return', nt_token);

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));

      return function (_x12, _x13, _x14) {
        return _ref8.apply(this, arguments);
      };
    }(), _this.__examineForMentions = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(body, access) {
        var newdata, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, e;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                newdata = [];

                data = body.content.split(' ');
                data = data.filter(function (item) {
                  return item.charAt(0) === '@';
                });

                if (!(data.length > 0 && body.type !== 2)) {
                  _context9.next = 34;
                  break;
                }

                /* eslint-disable no-restricted-syntax */
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context9.prev = 7;
                _iterator = data[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context9.next = 18;
                  break;
                }

                item = _step.value;
                _context9.next = 13;
                return _this.__fetchUser(item.substring(1, item.length), access);

              case 13:
                e = _context9.sent;

                newdata.push(e);

              case 15:
                _iteratorNormalCompletion = true;
                _context9.next = 9;
                break;

              case 18:
                _context9.next = 24;
                break;

              case 20:
                _context9.prev = 20;
                _context9.t0 = _context9['catch'](7);
                _didIteratorError = true;
                _iteratorError = _context9.t0;

              case 24:
                _context9.prev = 24;
                _context9.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context9.prev = 27;

                if (!_didIteratorError) {
                  _context9.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context9.finish(27);

              case 31:
                return _context9.finish(24);

              case 32:

                data = newdata.filter(function (item) {
                  return item;
                }).map(function (item) {
                  return item.data;
                });
                if (data.length > 0) {
                  data.forEach(function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(item) {
                      return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              ref.content = body.content;
                              ref.origin = body.origin;
                              ref.id = body._id;
                              notification = { type: body.type, message: 'You were mentioned in ' + body.origin.username + '\'s post', referenceID: body._id, body: ref, destination: item.username, destinationID: item.id, time: Date.now() };
                              _this.__dispatchToNotificationServer(_extends({}, body, { destination: item.email, subject: 'New mention by ' + body.origin.username + ' on Youth Party Nigeria App' }), _extends({}, notification, { nt_token: nt_token }), 5, body.origin);
                              return _context8.abrupt('return', body);

                            case 6:
                            case 'end':
                              return _context8.stop();
                          }
                        }
                      }, _callee8, _this2);
                    }));

                    return function (_x17) {
                      return _ref10.apply(this, arguments);
                    };
                  }());
                }

              case 34:
                return _context9.abrupt('return', body);

              case 35:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this2, [[7, 20, 24, 32], [25,, 27, 31]]);
      }));

      return function (_x15, _x16) {
        return _ref9.apply(this, arguments);
      };
    }(), _this.getTimeline = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(username, access) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _this.__fetchUser(username, access);

              case 2:
                data = _context10.sent;

                body = data.friends.map(function (item) {
                  return item.id;
                });
                body.push(data.data.id);
                _context10.next = 7;
                return _conversationService2.default.getTimeline(body);

              case 7:
                return _context10.abrupt('return', _context10.sent);

              case 8:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this2);
      }));

      return function (_x18, _x19) {
        return _ref11.apply(this, arguments);
      };
    }(), _this.like = function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(key, value, user, type) {
        var dataX;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _this.fetchOne('_id', value);

              case 2:
                data = _context11.sent;

                if (!(type === 0)) {
                  _context11.next = 10;
                  break;
                }

                data.likes.count += 1;
                data.likes.data.push(user);
                notification = { type: data.type, message: user.username + ' liked your ' + (data.destination ? 'message' : 'post'), referenceID: data._id, body: { id: data._id, content: data.content, origin: data.origin }, time: Date.now(), destination: data.origin.username, destinationID: data.origin.id };
                _this.__dispatchToNotificationServer(_extends({}, data._doc, { origin: { username: user.username }, destination: data.origin.email, subject: user.username + ' liked your post on Youth Party Nigeria' }), _extends({}, notification, { nt_token: nt_token }), 5, user);
                _context11.next = 16;
                break;

              case 10:
                if (!(type === 1)) {
                  _context11.next = 16;
                  break;
                }

                filler = data.likes.data.filter(function (item) {
                  return item.id === user.id;
                });

                if (!(filler.length < 1)) {
                  _context11.next = 14;
                  break;
                }

                return _context11.abrupt('return', data);

              case 14:
                data.likes.count -= 1;
                data.likes.data = data.likes.data.filter(function (item) {
                  return item.id !== user.id;
                });

              case 16:
                _context11.next = 18;
                return _this.model.findOneAndUpdate({ _id: data._id }, { $set: { likes: data.likes } }, { new: true });

              case 18:
                dataX = _context11.sent;
                return _context11.abrupt('return', data);

              case 20:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this2);
      }));

      return function (_x20, _x21, _x22, _x23) {
        return _ref12.apply(this, arguments);
      };
    }(), _this.fetchAllPosts = function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(id) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _this.model.find({ 'origin.id': parseInt(id), destination: null, referenceID: null }).sort({ createdAt: -1 });

              case 2:
                data = _context12.sent;
                return _context12.abrupt('return', data);

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, _this2);
      }));

      return function (_x24) {
        return _ref13.apply(this, arguments);
      };
    }(), _this.fetchComments = function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(data) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _this.model.find({ referenceID: data._id });

              case 2:
                data = _context13.sent;
                return _context13.abrupt('return', data);

              case 4:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, _this2);
      }));

      return function (_x25) {
        return _ref14.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PostServiceObject;
}(_base2.default);

var PostService = new PostServiceObject(_post2.default);
exports.default = PostService;