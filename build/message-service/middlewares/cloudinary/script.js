'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageUploader = exports.imageParser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var imageParser = exports.imageParser = (0, _multer2.default)();
var imageUploader = exports.imageUploader = _cloudinary2.default.config(_config.config);

var imageMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return imageParser.single(req);

          case 2:
            // remember to check the extension of the file
            if (req.file) {
              imageUploader.upload(req.file, function (err, result) {
                if (err) {
                  console.log(err);
                  var e = new Error('Something went wrong trying to upload your image');
                  e.status = 422;
                  return next(e);
                }
                req.image = result.secure_url;
                req.body = _extends({}, req.body, { image: result.secure_url });
                next();
              });
            }
            next();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function imageMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();