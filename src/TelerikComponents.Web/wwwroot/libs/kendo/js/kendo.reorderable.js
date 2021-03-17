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

	module.exports = __webpack_require__(1368);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1049:
/***/ (function(module, exports) {

	module.exports = require("./kendo.core");

/***/ }),

/***/ 1113:
/***/ (function(module, exports) {

	module.exports = require("./kendo.draganddrop");

/***/ }),

/***/ 1368:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1049), __webpack_require__(1113) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	var __meta__ = { // jshint ignore:line
	    id: "reorderable",
	    name: "Reorderable",
	    category: "framework",
	    depends: [ "core", "draganddrop" ],
	    advanced: true
	};

	(function ($, undefined) {
	    var kendo = window.kendo,
	        outerWidth = kendo._outerWidth,
	        outerHeight = kendo._outerHeight,
	        getOffset = kendo.getOffset,
	        Widget = kendo.ui.Widget,
	        CHANGE =  "change",
	        KREORDERABLE = "k-reorderable";

	    function toggleHintClass(hint, denied) {
	        hint = $(hint);

	        if (denied) {
	            hint.find(".k-drag-status").removeClass("k-i-plus").addClass("k-i-cancel");
	        } else {
	            hint.find(".k-drag-status").removeClass("k-i-cancel").addClass("k-i-plus");
	        }
	    }

	    var Reorderable = Widget.extend({
	        init: function(element, options) {
	            var that = this,
	                draggable,
	                group = kendo.guid() + "-reorderable";

	            Widget.fn.init.call(that, element, options);

	            element = that.element.addClass(KREORDERABLE);
	            options = that.options;

	            that.draggable = draggable = options.draggable || new kendo.ui.Draggable(element, {
	                group: group,
	                autoScroll: true,
	                filter: options.filter,
	                hint: options.hint
	            });

	            that.reorderDropCue = $('<div class="k-reorder-cue"></div></div>');

	            element.find(draggable.options.filter).kendoDropTarget({
	                group: draggable.options.group,
	                dragenter: function(e) {
	                    if (!that._draggable) {
	                        return;
	                    }

	                    var dropTarget = this.element, offset;
	                    var denied = !that._dropTargetAllowed(dropTarget) || that._isLastDraggable();

	                    toggleHintClass(e.draggable.hint, denied);
	                    if (!denied) {
	                        offset = getOffset(dropTarget);
	                        var left = offset.left;

	                        if (options.inSameContainer && !options.inSameContainer({
	                            source: dropTarget,
	                            target: that._draggable,
	                            sourceIndex: that._index(dropTarget),
	                            targetIndex: that._index(that._draggable)
	                        })) {
	                            that._dropTarget = dropTarget;
	                        } else {
	                            if (that._index(dropTarget) > that._index(that._draggable)) {
	                                left += outerWidth(dropTarget);
	                            }
	                        }

	                        that.reorderDropCue.css({
	                             height: outerHeight(dropTarget),
	                             top: offset.top,
	                             left: left
	                        })
	                        .appendTo(document.body);
	                    }
	                },
	                dragleave: function(e) {
	                    toggleHintClass(e.draggable.hint, true);
	                    that.reorderDropCue.remove();
	                    that._dropTarget = null;
	                },
	                drop: function() {
	                    that._dropTarget = null;
	                    if (!that._draggable) {
	                        return;
	                    }
	                    var dropTarget = this.element;
	                    var draggable = that._draggable;

	                    if (that._dropTargetAllowed(dropTarget) && !that._isLastDraggable()) {
	                        that.trigger(CHANGE, {
	                            element: that._draggable,
	                            target: dropTarget,
	                            oldIndex: that._index(draggable),
	                            newIndex: that._index(dropTarget),
	                            position: getOffset(that.reorderDropCue).left > getOffset(dropTarget).left ? "after" : "before"
	                        });
	                    }
	                }
	            });

	            draggable.bind([ "dragcancel", "dragend", "dragstart", "drag" ],
	                {
	                    dragcancel: function() {
	                        that.reorderDropCue.remove();
	                        that._draggable = null;
	                        that._elements = null;
	                    },
	                    dragend: function() {
	                        that.reorderDropCue.remove();
	                        that._draggable = null;
	                        that._elements = null;
	                    },
	                    dragstart: function(e) {
	                        that._draggable = e.currentTarget;
	                        that._elements = that.element.find(that.draggable.options.filter);
	                    },
	                    drag: function(e) {
	                        if (!that._dropTarget || this.hint.find(".k-drag-status").hasClass("k-i-cancel")) {
	                            return;
	                        }

	                        var dropStartOffset = getOffset(that._dropTarget).left;
	                        var width = outerWidth(that._dropTarget);

	                        if (e.pageX > dropStartOffset + width / 2) {
	                            that.reorderDropCue.css({ left: dropStartOffset + width });
	                        } else {
	                            that.reorderDropCue.css({ left: dropStartOffset });
	                        }
	                    }
	                }
	            );
	        },

	        options: {
	            name: "Reorderable",
	            filter: "*"
	        },

	        events: [
	            CHANGE
	        ],

	        _isLastDraggable: function() {
	            var inSameContainer = this.options.inSameContainer,
	                draggable = this._draggable[0],
	                elements = this._elements.get(),
	                found = false,
	                item;

	            if (!inSameContainer) {
	                return false;
	            }

	            while (!found && elements.length > 0) {
	                item = elements.pop();
	                found = draggable !== item && inSameContainer({
	                    source: draggable,
	                    target: item,
	                    sourceIndex: this._index(draggable),
	                    targetIndex: this._index(item)
	                });
	            }

	            return !found;
	        },

	        _dropTargetAllowed: function(dropTarget) {
	            var inSameContainer = this.options.inSameContainer,
	                dragOverContainers = this.options.dragOverContainers,
	                draggable = this._draggable;

	            if (draggable[0] === dropTarget[0]) {
	                return false;
	            }

	            if (!inSameContainer || !dragOverContainers) {
	                return true;
	            }

	            if (inSameContainer({ source: draggable,
	                target: dropTarget,
	                sourceIndex: this._index(draggable),
	                targetIndex: this._index(dropTarget)
	            })) {
	                return true;
	            }

	            return dragOverContainers(this._index(draggable), this._index(dropTarget));
	        },

	        _index: function(element) {
	            return this._elements.index(element);
	        },

	        destroy: function() {
	           var that = this;

	           Widget.fn.destroy.call(that);

	           that.element.find(that.draggable.options.filter).each(function() {
	               var item = $(this);
	               if (item.data("kendoDropTarget")) {
	                   item.data("kendoDropTarget").destroy();
	               }
	           });

	           if (that.draggable) {
	               that.draggable.destroy();

	               that.draggable.element = that.draggable = null;
	           }
	           that.elements = that.reorderDropCue = that._elements = that._draggable = null;
	       }
	    });

	    kendo.ui.plugin(Reorderable);

	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));



/***/ })

/******/ });