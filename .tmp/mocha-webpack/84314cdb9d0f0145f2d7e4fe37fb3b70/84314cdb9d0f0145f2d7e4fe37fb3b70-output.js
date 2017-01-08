/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var testsContext = __webpack_require__(1);
	
	var runnable = testsContext.keys();
	
	runnable.forEach(testsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./matrixUtil.test.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _chai = __webpack_require__(3);
	
	var _chai2 = _interopRequireDefault(_chai);
	
	var _matrixUtil = __webpack_require__(4);
	
	var matrixUtil = _interopRequireWildcard(_matrixUtil);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_chai2.default.should();
	
	describe('matrixUtil', function () {
	  describe('createEmptyArray()', function () {
	    var emptyArray = matrixUtil.createEmptyArray(10);
	    emptyArray.should.have.lengthOf(11);
	    emptyArray.every(function (element) {
	      return element === 0;
	    }).should.equal(true);
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rotateLeft = exports.rotateRight = exports.flip = exports.combineMatrices = exports.createEmptyMatrix = exports.removeRowAndShiftRemaining = exports.removeColumn = exports.removeRow = exports.createEmptyArray = exports.getMatrixWidth = exports.getMatrixHeight = undefined;
	
	var _cloneDeep2 = __webpack_require__(5);
	
	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);
	
	var _inRange2 = __webpack_require__(6);
	
	var _inRange3 = _interopRequireDefault(_inRange2);
	
	var _times2 = __webpack_require__(7);
	
	var _times3 = _interopRequireDefault(_times2);
	
	var _constant2 = __webpack_require__(8);
	
	var _constant3 = _interopRequireDefault(_constant2);
	
	var _partial2 = __webpack_require__(9);
	
	var _partial3 = _interopRequireDefault(_partial2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getMatrixHeight = exports.getMatrixHeight = function getMatrixHeight(matrix) {
	  return matrix.length;
	};
	
	var getMatrixWidth = exports.getMatrixWidth = function getMatrixWidth(matrix) {
	  return matrix[0].length;
	};
	
	var createEmptyArray = exports.createEmptyArray = function createEmptyArray(length) {
	  return (0, _times3.default)(length, (0, _constant3.default)(0));
	};
	
	var removeRow = exports.removeRow = function removeRow(matrix, rowIndex) {
	  matrix = (0, _cloneDeep3.default)(matrix);
	  matrix.splice(rowIndex, 1);
	  return matrix;
	};
	
	var removeColumn = exports.removeColumn = function removeColumn(matrix, columnIndex) {
	  return matrix.map(function (row, rowIndex) {
	    row = (0, _cloneDeep3.default)(row);
	    row.splice(columnIndex, 1);
	    return row;
	  });
	};
	
	var removeRowAndShiftRemaining = exports.removeRowAndShiftRemaining = function removeRowAndShiftRemaining(matrix, rowIndex) {
	  var W = getMatrixWidth(matrix);
	  var emptyRowMatrix = [createEmptyArray(W)];
	  return emptyRowMatrix.concat(removeRow(matrix, rowIndex));
	};
	
	var createEmptyMatrix = exports.createEmptyMatrix = function createEmptyMatrix(width, height) {
	  var columns = createEmptyArray(height);
	  var createRow = (0, _partial3.default)(createEmptyArray, width);
	  return columns.map(createRow);
	};
	
	var combineMatrices = exports.combineMatrices = function combineMatrices(destinationMatrix, sourceMatrix, offsetX, offsetY) {
	  var overwrite = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	
	  if (!getMatrixHeight(sourceMatrix) || !getMatrixWidth(sourceMatrix) || !getMatrixHeight(destinationMatrix) || !getMatrixWidth(destinationMatrix)) {
	    throw new Error('\'sourceMatrix\' and \'destinationMatrix\' must be arrays with length > 0 containing arrays with length > 0.');
	  }
	
	  var lastYIndex = getMatrixHeight(sourceMatrix) + offsetY - 1;
	  var lastXIndex = getMatrixWidth(sourceMatrix) + offsetX - 1;
	
	  if ((0, _inRange3.default)(lastYIndex, 0, getMatrixHeight(destinationMatrix)) === false || (0, _inRange3.default)(lastXIndex, 0, getMatrixWidth(destinationMatrix)) === false) {
	    throw new Error('\'pattern\' is out of bounds.');
	  }
	
	  var newMatrix = destinationMatrix.map(function (rows, y) {
	    return rows.map(function (value, x) {
	      if ((0, _inRange3.default)(x, offsetX, lastXIndex + 1) && (0, _inRange3.default)(y, offsetY, lastYIndex + 1)) {
	        if (overwrite || !value) {
	          return sourceMatrix[y - offsetY][x - offsetX];
	        }
	      }
	      return value;
	    });
	  });
	
	  return newMatrix;
	};
	
	var flip = exports.flip = function flip(matrix) {
	  var H = matrix.length;
	  var W = matrix[0].length;
	
	  var newMatrix = createEmptyMatrix(H, W);
	
	  (0, _times3.default)(H, function (row) {
	    (0, _times3.default)(W, function (column) {
	      newMatrix[column][row] = matrix[row][column];
	    });
	  });
	  return newMatrix;
	};
	
	var rotateRight = exports.rotateRight = function rotateRight(matrix) {
	  return flip(matrix).map(function (row) {
	    return row.reverse();
	  });
	};
	
	var rotateLeft = exports.rotateLeft = function rotateLeft(matrix) {
	  return flip(matrix).reverse();
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash/cloneDeep");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("lodash/inRange");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("lodash/times");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("lodash/constant");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("lodash/partial");

/***/ }
/******/ ]);
//# sourceMappingURL=84314cdb9d0f0145f2d7e4fe37fb3b70-output.js.map