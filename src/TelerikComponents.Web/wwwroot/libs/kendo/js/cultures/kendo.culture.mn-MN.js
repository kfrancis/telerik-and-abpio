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

	__webpack_require__(563);
	module.exports = __webpack_require__(563);


/***/ }),

/***/ 563:
/***/ (function(module, exports) {

	(function( window, undefined ) {
	    kendo.cultures["mn-MN"] = {
	        name: "mn-MN",
	        numberFormat: {
	            pattern: ["-n"],
	            decimals: 2,
	            ",": ",",
	            ".": ".",
	            groupSize: [3],
	            percent: {
	                pattern: ["-n%","n%"],
	                decimals: 2,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "%"
	            },
	            currency: {
	                name: "Mongolian Tugrik",
	                abbr: "MNT",
	                pattern: ["-$ n","$ n"],
	                decimals: 2,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "₮"
	            }
	        },
	        calendars: {
	            standard: {
	                days: {
	                    names: ["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"],
	                    namesAbbr: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"],
	                    namesShort: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"]
	                },
	                months: {
	                    names: ["Нэгдүгээр сар","Хоёрдугаар сар","Гуравдугаар сар","Дөрөвдүгээр сар","Тавдугаар сар","Зургаадугаар сар","Долоодугаар сар","Наймдугаар сар","Есдүгээр сар","Аравдугаар сар","Арван нэгдүгээр сар","Арван хоёрдугаар сар"],
	                    namesAbbr: ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"]
	                },
	                AM: ["ү.ө.","ү.ө.","Ү.Ө."],
	                PM: ["ү.х.","ү.х.","Ү.Х."],
	                patterns: {
	                    d: "yyyy.MM.dd",
	                    D: "yyyy.MM.dd, dddd",
	                    F: "yyyy.MM.dd, dddd HH:mm:ss",
	                    g: "yyyy.MM.dd HH:mm",
	                    G: "yyyy.MM.dd HH:mm:ss",
	                    m: "MMMM'ын' d",
	                    M: "MMMM'ын' d",
	                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
	                    t: "HH:mm",
	                    T: "HH:mm:ss",
	                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
	                    y: "yyyy 'оны' MMMM",
	                    Y: "yyyy 'оны' MMMM"
	                },
	                "/": ".",
	                ":": ":",
	                firstDay: 1
	            }
	        }
	    }
	})(this);


/***/ })

/******/ });