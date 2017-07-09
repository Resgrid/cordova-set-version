'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _xml2js = require('xml2js');

var _rethrow = require('./rethrow');
var _rethrow2 = _interopRequireDefault(_rethrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xmlParser = new _xml2js.Parser();
var xmlBuilder = new _xml2js.Builder();
var DefaultConfigPath = './config.xml';

/**
 * Set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 * @param {function} callback
 */
function cordovaSetVersion() {
  var _parseArguments = parseArguments.apply(undefined, arguments),
      _parseArguments2 = _slicedToArray(_parseArguments, 4),
      configPath = _parseArguments2[0],
      version = _parseArguments2[1],
      buildNumber = _parseArguments2[2],
      callback = _parseArguments2[3];

  console.log(JSON.stringify(_parseArguments));
  console.log(JSON.stringify(_parseArguments2));

  configPath = configPath || DefaultConfigPath;
  version = version || null;
  buildNumber = buildNumber || null;
  callback = callback || (0, _rethrow2.default)();

  if (typeof callback !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }

  if (typeof configPath !== 'string') {
    callback(new TypeError('"configPath" argument must be a string'));
    return;
  }

  if (version && typeof version !== 'string') {
    callback(new TypeError('"version" argument must be a string'));
    return;
  }

  if (buildNumber && typeof buildNumber !== 'number') {
    callback(new TypeError('"buildNumber" argument must be an integer'));
    return;
  }

  _fs2.default.readFile(configPath, 'UTF-8', function (error, data) {
    if (error) {
      callback(error);
      return;
    }

    if (!version && !buildNumber) {
      _fs2.default.readFile('./package.json', 'UTF-8', function (error, data) {
        if (error) {
          callback(error);
          return;
        }

        try {
          var pkg = JSON.parse(data);
          updateConfigXml(pkg.version);
        } catch (exception) {
          callback(exception);
        }
      });
    } else {
      updateConfigXml(version);
    }

    function updateConfigXml(version) {
      xmlParser.parseString(data, function (error, xml) {
        if (error) {
          callback(error);
          return;
        }

        if (version) {
          xml.widget.$.version = version;
          xml.widget.$['ios-CFBundleVersion'] = version;
          xml.widget.$['osx-CFBundleVersion'] = version;
        }

        if (buildNumber) {
          xml.widget.$['android-versionCode'] = buildNumber;
        }

        var newData = xmlBuilder.buildObject(xml);
        _fs2.default.writeFile(configPath, newData, { encoding: 'UTF-8' }, callback);
      });
    }
  });
}

function parseArguments() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    return [null, null, null, null];
  }

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      if (args[0].indexOf('.xml') >= 0) {
        return [args[0], null, null, null];
      } else {
        return [null, args[0], null, null];
      }
    } else if (typeof args[0] === 'number') {
      return [null, null, args[0], null];
    } else if (typeof args[0] === 'function') {
      return [null, null, null, args[0]];
    }

    return [args[0], null, null, null];
  }

  if (args.length === 2) {
    if (typeof args[0] === 'string') {
      if (args[0].indexOf('.xml') >= 0) {
        if (typeof args[1] === 'number') {
          return [args[0], null, args[1], null];
        } else if (typeof args[1] === 'function') {
          return [args[0], null, null, args[1]];
        } else {
          return [args[0], args[1], null, null];
        }
      } else {
        if (typeof args[1] === 'function') {
          return [null, args[0], null, args[1]];
        }

        return [null, args[0], args[1], null];
      }
    } else if (typeof args[0] === 'number') {
      return [null, null, args[0], args[1]];
    } else if (typeof args[1] === 'number') {
      return [args[0], null, args[1], null];
    } else if (typeof args[1] === 'function') {
      return [args[0], null, null, args[1]];
    }

    return [args[0], args[1], null, null];
  }

  if (args.length === 3) {
    if (typeof args[0] === 'string') {
      if (args[0].indexOf('.xml') >= 0) {
        if (typeof args[1] === 'number') {
          return [args[0], null, args[1], args[2]];
        } else if (typeof args[2] === 'function') {
          return [args[0], args[1], null, args[2]];
        }

        return [args[0], args[1], args[2], null];
      }

      return [null, args[0], args[1], args[2]];
    } else if (typeof args[1] === 'number') {
      return [args[0], null, args[1], args[2]];
    } else if (typeof args[2] === 'function') {
      return [args[0], args[1], null, args[2]];
    }

    return args;
  }

  return args;
}

exports.default = cordovaSetVersion;