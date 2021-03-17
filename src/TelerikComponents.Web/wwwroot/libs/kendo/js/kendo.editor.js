module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1192);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1053:
/***/ (function(module, exports) {

	module.exports = require("./kendo.combobox");

/***/ }),

/***/ 1054:
/***/ (function(module, exports) {

	module.exports = require("./kendo.dropdownlist");

/***/ }),

/***/ 1191:
/***/ (function(module, exports) {

	module.exports = require("./kendo.numerictextbox");

/***/ }),

/***/ 1192:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1053), __webpack_require__(1054), __webpack_require__(1194), __webpack_require__(1195), __webpack_require__(1196), __webpack_require__(1197), __webpack_require__(1191),

	        __webpack_require__(1198),
	        __webpack_require__(1199),
	        __webpack_require__(1200),
	        __webpack_require__(1201),
	        __webpack_require__(1202),
	        __webpack_require__(1203),
	        __webpack_require__(1204),
	        __webpack_require__(1205),
	        __webpack_require__(1206),

	        __webpack_require__(1207),
	        __webpack_require__(1208),
	        __webpack_require__(1209),
	        __webpack_require__(1210),
	        __webpack_require__(1211),
	        __webpack_require__(1193),
	        __webpack_require__(1212),
	        __webpack_require__(1213),
	        __webpack_require__(1214),
	        __webpack_require__(1215),
	        __webpack_require__(1216),
	        __webpack_require__(1217),
	        __webpack_require__(1218),
	        __webpack_require__(1219),
	        __webpack_require__(1220),
	        __webpack_require__(1221),
	        __webpack_require__(1222),
	        __webpack_require__(1223),
	        __webpack_require__(1224),
	        __webpack_require__(1225),

	        __webpack_require__(1226),
	        __webpack_require__(1227),
	        __webpack_require__(1228),
	        __webpack_require__(1229),
	        __webpack_require__(1230),
	        __webpack_require__(1231)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	    var __meta__ = { // jshint ignore:line
	        id: "editor",
	        name: "Editor",
	        category: "web",
	        description: "Rich text editor component",
	        depends: [ "combobox", "dropdownlist", "window", "colorpicker" ],
	        features: [ {
	            id: "editor-imagebrowser",
	            name: "Image Browser",
	            description: "Support for uploading and inserting images",
	            depends: [ "imagebrowser" ]
	        }, {
	            id: "editor-resizable",
	            name: "Resize handle",
	            description: "Support for resizing the content area via a resize handle",
	            depends: [ "resizable" ]
	        }, {
	            id: "editor-tablewizard",
	            name: "Table wizard dialog",
	            description: "Support for table properties configuration",
	            depends: [ "tabstrip", "button", "numerictextbox" ]
	        }, {
	            id: "editor-pdf-export",
	            name: "PDF export",
	            description: "Export Editor content as PDF",
	            depends: [ "pdf", "drawing" ]
	        }]
	    };

		return window.kendo;

	}, __webpack_require__(3));


/***/ }),

/***/ 1193:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/import");

/***/ }),

/***/ 1194:
/***/ (function(module, exports) {

	module.exports = require("./kendo.resizable");

/***/ }),

/***/ 1195:
/***/ (function(module, exports) {

	module.exports = require("./kendo.window");

/***/ }),

/***/ 1196:
/***/ (function(module, exports) {

	module.exports = require("./kendo.colorpicker");

/***/ }),

/***/ 1197:
/***/ (function(module, exports) {

	module.exports = require("./kendo.imagebrowser");

/***/ }),

/***/ 1198:
/***/ (function(module, exports) {

	module.exports = require("./util/undoredostack");

/***/ }),

/***/ 1199:
/***/ (function(module, exports) {

	module.exports = require("./editor/main");

/***/ }),

/***/ 1200:
/***/ (function(module, exports) {

	module.exports = require("./editor/dom");

/***/ }),

/***/ 1201:
/***/ (function(module, exports) {

	module.exports = require("./editor/serializer");

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

	module.exports = require("./editor/range");

/***/ }),

/***/ 1203:
/***/ (function(module, exports) {

	module.exports = require("./editor/command");

/***/ }),

/***/ 1204:
/***/ (function(module, exports) {

	module.exports = require("./editor/components");

/***/ }),

/***/ 1205:
/***/ (function(module, exports) {

	module.exports = require("./editor/toolbar");

/***/ }),

/***/ 1206:
/***/ (function(module, exports) {

	module.exports = require("./editor/immutables");

/***/ }),

/***/ 1207:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/viewhtml");

/***/ }),

/***/ 1208:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/link");

/***/ }),

/***/ 1209:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/lists");

/***/ }),

/***/ 1210:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/formatting");

/***/ }),

/***/ 1211:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/image");

/***/ }),

/***/ 1212:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/insert");

/***/ }),

/***/ 1213:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/export");

/***/ }),

/***/ 1214:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/indent");

/***/ }),

/***/ 1215:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/linebreak");

/***/ }),

/***/ 1216:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/format");

/***/ }),

/***/ 1217:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/inlineformat");

/***/ }),

/***/ 1218:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/formatblock");

/***/ }),

/***/ 1219:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/file");

/***/ }),

/***/ 1220:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/tables");

/***/ }),

/***/ 1221:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/clipboard");

/***/ }),

/***/ 1222:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/keyboard");

/***/ }),

/***/ 1223:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/exportpdf");

/***/ }),

/***/ 1224:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/print");

/***/ }),

/***/ 1225:
/***/ (function(module, exports) {

	module.exports = require("./editor/plugins/formatpainter");

/***/ }),

/***/ 1226:
/***/ (function(module, exports) {

	module.exports = require("./editor/resizing/column-resizing");

/***/ }),

/***/ 1227:
/***/ (function(module, exports) {

	module.exports = require("./editor/resizing/row-resizing");

/***/ }),

/***/ 1228:
/***/ (function(module, exports) {

	module.exports = require("./editor/resizing/table-resizing");

/***/ }),

/***/ 1229:
/***/ (function(module, exports) {

	module.exports = require("./editor/resizing/table-resize-handle");

/***/ }),

/***/ 1230:
/***/ (function(module, exports) {

	module.exports = require("./editor/table-wizard/table-wizard-command");

/***/ }),

/***/ 1231:
/***/ (function(module, exports) {

	module.exports = require("./editor/table-wizard/table-wizard-dialog");

/***/ })

/******/ });