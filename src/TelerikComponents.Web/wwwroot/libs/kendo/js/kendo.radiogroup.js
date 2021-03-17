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

	module.exports = __webpack_require__(1366);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1049:
/***/ (function(module, exports) {

	module.exports = require("./kendo.core");

/***/ }),

/***/ 1085:
/***/ (function(module, exports) {

	module.exports = require("./kendo.inputgroupbase");

/***/ }),

/***/ 1366:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1049), __webpack_require__(1085) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	var __meta__ = { // jshint ignore:line
	    id: "radiogroup",
	    name: "RadioGroup",
	    category: "web",
	    description: "The RadioGroup component.",
	    depends: [ "core", "inputgroupbase" ]
	};

	(function($, undefined) {
	    var kendo = window.kendo,
	        ui = kendo.ui,
	        InputGroupBase = ui.InputGroupBase,
	        CHANGE = "change",
	        DOT = ".",
	        CHECKED = "checked",
	        VERTICAL = "vertical",
	        AFTER = "after";

	    var RadioGroup = InputGroupBase.extend({
	        options: {
	            name: "RadioGroup",
	            inputName: "",
	            enabled: true,
	            labelPosition: AFTER,
	            layout: VERTICAL,
	            items: []
	        },

	        ITEM_TEMPLATE: '<li class="k-radio-item">' +
	            '<input type="radio" class="k-radio" >' +
	            '<label class="k-radio-label" ></label>' +
	        '</li>',

	        NS: ".kendoRadioGroup",
	        GROUP_ROLE: "radiogroup",

	        groupStyles: {
	            item: "k-radio-item",
	            input: "k-radio",
	            label: "k-radio-label",
	            list: "k-radio-list",
	            vertical: "k-list-vertical",
	            horizontal: "k-list-horizontal",
	            disabled: "k-state-disabled"
	        },

	        item: function(index) {
	            var checked = this.wrapper.find("input:checked");

	            if(this._indexIsPresent(index)) {
	                return $(this.items().get(index));
	            } else if(checked.length) {
	                return checked;
	            }
	        },

	        value: function(value) {
	            var that = this,
	                selectedElement = that.element.find("[value='" + value + "']");

	            if(value === undefined) {
	                return that._value;
	            } else if(value === null) {
	                that._value = null;
	                that.element.find(DOT + that.groupStyles.input).prop(CHECKED, false);
	            }

	            if(selectedElement.length > 0) {
	                that._value = value;
	                that.element.find(DOT + that.groupStyles.input).prop(CHECKED, false);
	                selectedElement.prop(CHECKED, true);
	            }
	        },

	        _changeHandler: function(e) {
	            var target = $(e.target),
	                oldValue = this._value;

	            if(this._targetForPreventedChange === e.target) {
	                this._targetForPreventedChange = null;
	                return;
	            }

	            this._value = target.val();

	            this.trigger(CHANGE, {
	                oldValue: oldValue,
	                newValue: this._value,
	                target: target
	            });
	        },

	        _dataValRequired: function(validationAttributes) {
	            validationAttributes["data-val-required"] = this.wrapper.attr("data-val-required");
	        }
	    });

	    ui.plugin(RadioGroup);
	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));

/***/ })

/******/ });