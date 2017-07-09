"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function rethrow() {
  return function (error) {
    if (error) {
      throw error;
    }
  };
}

exports.default = rethrow;