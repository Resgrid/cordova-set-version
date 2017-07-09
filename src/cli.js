#!/usr/bin/env node
'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _index = require('./index');
var _index2 = _interopRequireDefault(_index);

var _rethrow = require('./rethrow');
var _rethrow2 = _interopRequireDefault(_rethrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var help = '\n    Usage\n      $ cordova-set-version [-v|--version <version>] [-b|--build-number <build-number>] [config.xml]\n    \n    Options\n      -v, --version Version to set\n      -b, --build-number Build number to set\n      \n    Examples\n      $ cordova-set-version -v 2.4.9\n      $ cordova-set-version -b 86\n      $ cordova-set-version -v 2.4.9 -b 86\n';

var cli = (0, _meow2.default)({
  version: false,
  help: help
}, {
  alias: {
    v: 'version',
    b: 'buildNumber'
  }
});

var filename = cli.input[0] || './config.xml';
var version = String(cli.flags.version) || null;
var buildNumber = +cli.flags.buildNumber || null;
var callback = _rethrow2.default;

(0, _index2.default)(filename, version, buildNumber, callback);