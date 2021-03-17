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

	module.exports = __webpack_require__(1290);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1048:
/***/ (function(module, exports) {

	module.exports = require("jquery");

/***/ }),

/***/ 1049:
/***/ (function(module, exports) {

	module.exports = require("./kendo.core");

/***/ }),

/***/ 1290:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(jQuery) {(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1049) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	var __meta__ = { // jshint ignore:line
	    id: "inputgroupbase",
	    name: "InputGroupBase",
	    category: "web",
	    description: "The InputGroupBase component.",
	    depends: [ "core" ]
	};

	(function($, undefined) {
	    var kendo = window.kendo,
	        ui = kendo.ui,
	        Widget = ui.Widget,
	        extend = $.extend,
	        proxy = $.proxy,
	        CHANGE = "change",
	        FOCUS = "focus",
	        CLICK = "click",
	        SELECT = "select",
	        DOT = ".",
	        DISABLED = "disabled",
	        ROLE = "role",
	        VERTICAL = "vertical",
	        AFTER = "after";

	    var InputGroupBase = Widget.extend({
	        init: function(element, options) {
	            var that = this;

	            Widget.fn.init.call(that, element, options);

	            that.options = extend({}, that.options, options);

	            that._iterateMarkupItems();

	            that._parseItems(that.options.items);

	            that._wrapper();

	            that.value(that.options.value);

	            that._attachEvents();
	        },

	        options: {
	            name: "InputGroupBase"
	        },

	        events: [
	            CHANGE,
	            FOCUS,
	            SELECT
	        ],

	        ITEM_TEMPLATE: '',
	        NS: ".kendoInputGroupBase",
	        GROUP_ROLE: "",

	        groupStyles: {},

	        destroy: function() {
	            var that = this;

	            that.element.off(that.NS);

	            Widget.fn.destroy.call(that);
	        },

	        item: function(index) {
	            if(this._indexIsPresent(index)) {
	                return $(this.items().get(index));
	            }
	        },

	        items: function() {
	            return this.wrapper.find(DOT + this.groupStyles.input);
	        },

	        enable: function(shouldEnable) {
	            var items;

	            if(shouldEnable !== false && shouldEnable !== true) {
	                return;
	            }

	            items = this.element.find(DOT + this.groupStyles.item);

	            this._disabledOnElements(items, !shouldEnable);
	        },

	        enableItem: function(shouldEnable, item) {
	            if(shouldEnable !== false && shouldEnable !== true) {
	                return;
	            }

	            if(this._indexIsPresent(item)) {
	                item = $(this.element.find(DOT + this.groupStyles.item).get(item));
	            } else if(item instanceof jQuery) {
	                if(item.is("input")) {
	                    item = item.closest(DOT + this.groupStyles.item);
	                } else if(!item.is("li")) {
	                    return;
	                }
	            } else {
	                return;
	            }

	            this._disabledOnElements(item, !shouldEnable);
	        },

	        value: function() {
	            return false;
	        },

	        _attachEvents: function() {
	            var that = this;

	            that.element
	                .on(FOCUS + that.NS, DOT + that.groupStyles.input, proxy(that._focusHandler, that))
	                .on(CHANGE + that.NS, DOT + that.groupStyles.input, proxy(that._changeHandler, that))
	                .on(CLICK + that.NS, DOT + that.groupStyles.input, proxy(that._clickHandler, that));
	        },

	        _clickHandler: function(e) {
	            var target = $(e.target);

	            if(this.trigger(SELECT, {
	                target: target
	            })) {
	                e.preventDefault();
	                e.stopPropagation();

	                this._targetForPreventedChange = e.target;
	            }
	        },

	        _changeHandler: function() {
	            return false;
	        },

	        _dataValRequired: function() {
	            return false;
	        },

	        _disabledOnElements: function(items, disabled) {
	            var inputs = items.find("input");

	            if(disabled) {
	                inputs.attr(DISABLED, "");
	                items.addClass(this.groupStyles.disabled);
	            } else {
	                inputs.removeAttr(DISABLED);
	                items.removeClass(this.groupStyles.disabled);
	            }
	        },

	        _focusHandler: function(e) {
	            var target = $(e.target);

	            this.trigger(FOCUS, {
	                target: target
	            });
	        },

	        _indexIsPresent: function(index) {
	            return !isNaN(index) && index !== null && index !== true && index !== false && this.wrapper.find(DOT + this.groupStyles.input).length > index;
	        },

	        _initializeItem: function(item, index) {
	            var itemElement = $(this.wrapper.find(DOT + this.groupStyles.item).get(index) || this.ITEM_TEMPLATE),
	                label = itemElement.find(DOT + this.groupStyles.label),
	                input = itemElement.find(DOT + this.groupStyles.input);

	            if(item.value) {
	                input.val(item.value);
	            }
	            if(item.name) {
	                input.attr("name", item.name);
	            }
	            if(item.id){
	                input.attr("id", item.id);
	                label.attr("for", item.id);
	            }

	            if(item.label) {
	                if(item.encoded) {
	                    label.text(item.label);
	                } else {
	                    label.html(item.label);
	                }
	            }

	            if(!item.labelAfter) {
	                label.after(input);
	            }
	            if(item.attributes) {
	                itemElement.attr(item.attributes);
	            }
	            if(item.cssClass) {
	                itemElement.addClass(item.cssClass);
	            }
	            if(!item.enabled) {
	                this._disabledOnElements(itemElement, true);
	            }

	            if(item.validation) {
	                input.attr(item.validation);
	            }

	            if(itemElement.closest(DOT + this.groupStyles.list).length === 0) {
	                this.element.append(itemElement);
	            }
	        },

	        _iterateMarkupItems: function() {
	            var element = this.element;

	            if(element.children("li").length > 0) {
	                element.find("li").each(proxy(this._markupItem, this));
	            }
	        },

	        _markupItem: function(i, el) {
	            var input = el.querySelector("input");

	            if(input.hasAttribute("disabled")) {
	                $(el).addClass(this.groupStyles.disabled);
	            }
	        },

	        _parseItem: function(item, index) {
	            var options = this.options,
	                items = this._items;

	            if(typeof item === "string") {
	                item = {
	                    value: item,
	                    label: item
	                };
	            }
	            if(item.encoded !== false) {
	                item.encoded = true;
	            }
	            if(options.labelPosition === AFTER) {
	                item.labelAfter = true;
	            }
	            if(item.enabled === undefined) {
	                item.enabled = options.enabled;
	            }
	            if(!item.id) {
	                item.id = kendo.guid();
	            }

	            item.name = options.inputName || this.element.attr("id");

	            if(items.length > index) {
	                items[index] = extend({}, items[index], item);
	            } else {
	                items.push(item);
	            }
	        },

	        _parseItems: function(items) {
	            if(!this._items) {
	                this._items = [];
	            }
	            if(items) {
	                items.forEach(proxy(this._parseItem, this));
	            }
	        },

	        _validationSettings: function() {
	            var wrapper = this.wrapper,
	                items = this._items,
	                validationAttributes = {},
	                setValidation = function(item) {
	                    item.validation = validationAttributes;
	                },
	                createItem = function() {
	                    items.push({});
	                };

	            if(wrapper.is("[required]")) {
	                validationAttributes.required = "required";
	                wrapper.removeAttr("required");
	            }
	            if(wrapper.is("[data-val=true]")) {
	                validationAttributes["data-val"] = "true";
	                wrapper.removeAttr("data-val");
	            }
	            if(wrapper.is("[data-val-required]")) {
	                this._dataValRequired(validationAttributes);
	                wrapper.removeAttr("data-val-required");
	            }
	            if(wrapper.is("[data-val-server]")) {
	                validationAttributes["data-val-server"] = wrapper.attr("data-val-server");
	            }
	            if(Object.keys(validationAttributes).length > 0 && (!items || items.length === 0)) {
	                wrapper.find("li").each(createItem);
	            }

	            items.forEach(setValidation);
	        },

	        _wrapper: function() {
	            var wrapper = this.wrapper = this.element,
	                items = this._items,
	                itemElements = wrapper.find("li"),
	                inputs = wrapper.find("input");

	            wrapper.attr(ROLE, this.GROUP_ROLE)
	                .addClass(this.groupStyles.list);

	            if(this.options.layout === VERTICAL) {
	                wrapper.addClass(this.groupStyles.vertical);
	            } else {
	                wrapper.addClass(this.groupStyles.horizontal);
	            }

	            if(itemElements.length > 0 && inputs.length > 0) {
	                itemElements.addClass(this.groupStyles.item);
	                inputs.addClass(this.groupStyles.input);
	                wrapper.find("label").addClass(this.groupStyles.label);
	            }

	            this._validationSettings();

	            items.forEach(proxy(this._initializeItem, this));
	        }
	    });

	    ui.plugin(InputGroupBase);
	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1048)))

/***/ })

/******/ });