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

	module.exports = __webpack_require__(1392);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1198:
/***/ (function(module, exports) {

	module.exports = require("./util/undoredostack");

/***/ }),

/***/ 1263:
/***/ (function(module, exports) {

	module.exports = require("./kendo.pdf");

/***/ }),

/***/ 1281:
/***/ (function(module, exports) {

	module.exports = require("./kendo.excel");

/***/ }),

/***/ 1283:
/***/ (function(module, exports) {

	module.exports = require("./kendo.progressbar");

/***/ }),

/***/ 1392:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1198),
	        __webpack_require__(1394),
	        __webpack_require__(1395),
	        __webpack_require__(1281),
	        __webpack_require__(1283),
	        __webpack_require__(1263),
	        __webpack_require__(1396),
	        __webpack_require__(1397),
	        __webpack_require__(1398),
	        __webpack_require__(1399),
	        __webpack_require__(1400),
	        __webpack_require__(1401),
	        __webpack_require__(1402),
	        __webpack_require__(1403),
	        __webpack_require__(1404),
	        __webpack_require__(1405),
	        __webpack_require__(1406),
	        __webpack_require__(1407),
	        __webpack_require__(1408),
	        __webpack_require__(1409),
	        __webpack_require__(1410),
	        __webpack_require__(1393),
	        __webpack_require__(1411),
	        __webpack_require__(1412),
	        __webpack_require__(1413),
	        __webpack_require__(1414),
	        __webpack_require__(1415),
	        __webpack_require__(1416),
	        __webpack_require__(1417),
	        __webpack_require__(1418),
	        __webpack_require__(1419),
	        __webpack_require__(1420),
	        __webpack_require__(1421),
	        __webpack_require__(1422),
	        __webpack_require__(1423),
	        __webpack_require__(1424),
	        __webpack_require__(1425),
	        __webpack_require__(1426),
	        __webpack_require__(1427),
	        __webpack_require__(1428),
	        __webpack_require__(1429),
	        __webpack_require__(1430)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){
	    var __meta__ = { // jshint ignore:line
	        id: "spreadsheet",
	        name: "Spreadsheet",
	        category: "web",
	        description: "Spreadsheet component",
	        depends: [
	            "core", "binder", "colorpicker", "combobox", "data", "dom", "dropdownlist",
	            "menu", "ooxml", "popup", "sortable", "tabstrip", "toolbar", "treeview",
	            "window", "validator", "excel", "pdf", "drawing" ]
	    };

	    (function(kendo, undefined) {
	        if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
	            return;
	        }

	        var $ = kendo.jQuery;
	        var keys = $.extend({F10: 121, F11: 122, B: 66, I: 73, U: 85, N: 78, H: 72, A: 65, PAGEDOWN: 34, PAGEUP: 33, DELETE: 46, R: 82}, kendo.keys);
	        var Widget = kendo.ui.Widget;
	        var Workbook = kendo.spreadsheet.Workbook;
	        var Controller = kendo.spreadsheet.Controller;
	        var View = kendo.spreadsheet.View;
	        var NS = ".kendoSpreadsheet";

	        var ALL_REASONS = {
	            recalc: true,
	            selection: true,
	            activeCell: true,
	            layout: true,
	            sheetSelection: true,
	            resize: true,
	            editorChange: false,
	            editorClose: false
	        };

	        var classNames = {
	            wrapper: "k-widget k-spreadsheet"
	        };

	        var Spreadsheet = kendo.ui.Widget.extend({
	            init: function(element, options) {
	                Widget.fn.init.call(this, element, options);

	                this.element.addClass(Spreadsheet.classNames.wrapper);

	                this._view = new View(this.element, {
	                    messages: this.options.messages.view,
	                    toolbar: this.options.toolbar,
	                    sheetsbar:this.options.sheetsbar
	                });

	                this._workbook = new Workbook(this.options, this._view);

	                this._controller = new Controller(this._view, this._workbook);

	                this._autoRefresh = true;

	                this._bindWorkbookEvents();

	                this._view.workbook(this._workbook);

	                this._view.enableClipboard(false);
	                this.refresh();
	                this._view.enableClipboard(true);

	                this._resizeHandler = function() { this.resize(); }.bind(this);
	                $(window).on("resize" + NS, this._resizeHandler);

	                this.element.on("keydown" + NS, this._keyDown.bind(this));
	            },

	            _keyDown: function(e) {
	                var key = e.keyCode;
	                var redoTool = $(".k-spreadsheet-quick-access-toolbar [title=Redo]");
	                if (key === keys.F11 && e.shiftKey) {
	                    this._view.sheetsbar._onAddSelect();
	                    e.preventDefault();
	                    return;
	                } else if (e.altKey && key === keys.PAGEDOWN) {
	                    this._view.sheetsbar.trigger("select", {
	                                    name: this._view.sheetsbar._sheets[this._view.sheetsbar._selectedIndex + 1].name(),
	                                    isAddButton: false
	                    });
	                } else if (e.altKey && key === keys.PAGEUP) {
	                    this._view.sheetsbar.trigger("select", {
	                                    name: this._view.sheetsbar._sheets[this._view.sheetsbar._selectedIndex - 1].name(),
	                                    isAddButton: false
	                    });
	                } else if (e.altKey && key === keys.DELETE) {
	                    var closeCallback = function(e) {
	                        var dlg = e.sender;

	                        if (dlg.isConfirmed()) {
	                            this._view.sheetsbar.trigger("remove", { name: this.activeSheet()._name(), confirmation: true });
	                        }
	                    }.bind(this);

	                    this._view.sheetsbar._openDialog("confirmation", {
	                        close: closeCallback
	                    });
	                    e.preventDefault();
	                    return;
	                } else if (e.altKey && key === keys.R) {
	                    this._view.sheetsbar._createEditor();
	                    e.preventDefault();
	                    return;
	                } else if (key === keys.F10 && this._view.tabstrip || (key === keys.TAB && !e.shiftKey && $(document.activeElement).is(redoTool))) {
	                    this._view.tabstrip.toolbars[this._view.tabstrip.element.find("li.k-state-active").text().toLowerCase()].element.find(":not(.k-overflow-anchor):kendoFocusable:first").focus();
	                    this._view.tabstrip.toolbars[this._view.tabstrip.element.find("li.k-state-active").text().toLowerCase()].element.find(".k-toolbar-first-visible").addClass("k-state-focused");
	                    e.preventDefault();
	                    return;
	                } else if (e.ctrlKey && key === keys.B) {
	                    $("[data-tool=bold]")[0].click();
	                } else if (e.ctrlKey && key === keys.I) {
	                    $("[data-tool=italic]")[0].click();
	                } else if (e.ctrlKey && key === keys.U) {
	                    $("[data-tool=underline]")[0].click();
	                } else if (e.altKey && key === keys.H) {
	                    this._view.tabstrip.select(0);
	                    e.preventDefault();
	                    return;
	                } else if (e.altKey && key === keys.N) {
	                    this._view.tabstrip.select(1);
	                    e.preventDefault();
	                    return;
	                } else if (e.altKey && key === keys.A) {
	                    this._view.tabstrip.select(2);
	                    e.preventDefault();
	                    return;
	                }
	            },

	            _resize: function() {
	                this.refresh({ layout: true });
	            },

	            _workbookChanging: function(e) {
	                if (this.trigger("changing", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookChange: function(e) {
	                if (this._autoRefresh) {
	                    this.refresh(e);
	                }

	                if (e.recalc && e.ref) {
	                    var range = e.range || new kendo.spreadsheet.Range(e.ref, this.activeSheet());
	                    this.trigger("change", { range: range });
	                }
	            },

	            _workbookCut: function(e) {
	                this.trigger("cut", e);
	            },

	            _workbookCopy: function(e) {
	                this.trigger("copy", e);
	            },

	            _workbookPaste: function(e) {
	                this.trigger("paste", e);
	            },

	            activeSheet: function(sheet) {
	                return this._workbook.activeSheet(sheet);
	            },

	            moveSheetToIndex: function (sheet, index) {
	                return this._workbook.moveSheetToIndex(sheet, index);
	            },

	            insertSheet: function(options) {
	                return this._workbook.insertSheet(options);
	            },

	            sheets: function() {
	                return this._workbook.sheets();
	            },

	            removeSheet: function(sheet) {
	                return this._workbook.removeSheet(sheet);
	            },

	            sheetByName: function(sheetName) {
	                return this._workbook.sheetByName(sheetName);
	            },

	            sheetIndex: function(sheet) {
	                return this._workbook.sheetIndex(sheet);
	            },

	            sheetByIndex: function(index) {
	                return this._workbook.sheetByIndex(index);
	            },

	            renameSheet: function(sheet, newSheetName) {
	                return this._workbook.renameSheet(sheet, newSheetName);
	            },

	            refresh: function(reason) {
	                if (!reason) {
	                    reason = ALL_REASONS;
	                }

	                if (!reason.editorClose) {
	                    this._view.sheet(this._workbook.activeSheet());
	                    this._controller.sheet(this._workbook.activeSheet());

	                    this._workbook.refresh(reason);
	                }

	                if (!reason.editorChange) {
	                    this._view.refresh(reason);
	                    this._controller.refresh();

	                    this._view.render(reason);
	                    this.trigger("render");
	                }

	                return this;
	            },

	            openDialog: function(name, options) {
	                return this._view.openDialog(name, options);
	            },

	            autoRefresh: function(value) {
	                if (value !== undefined) {
	                    this._autoRefresh = value;

	                    if (value === true) {
	                        this.refresh();
	                    }

	                    return this;
	                }

	                return this._autoRefresh;
	            },

	            toJSON: function() {
	                return this._workbook.toJSON();
	            },

	            fromJSON: function(json) {
	                if (json.sheets) {
	                    this._workbook.destroy();

	                    this._workbook = new Workbook($.extend({}, this.options, json));

	                    this._bindWorkbookEvents();

	                    this._view.workbook(this._workbook);
	                    this._controller.workbook(this._workbook);

	                    this.activeSheet(this.activeSheet());
	                } else {
	                    this.refresh();
	                }
	            },

	            saveJSON: function() {
	                return this._workbook.saveJSON();
	            },

	            fromFile: function(blob, name) {
	                return this._workbook.fromFile(blob, name);
	            },

	            saveAsPDF: function(options) {
	                this._workbook.saveAsPDF(
	                    $.extend({}, this.options.pdf, options, { workbook: this._workbook })
	                );
	            },

	            saveAsExcel: function(options) {
	                this._workbook.saveAsExcel(options);
	            },

	            draw: function(options, callback) {
	                this._workbook.draw(options, callback);
	            },

	            _workbookExcelExport: function(e) {
	                if (this.trigger("excelExport", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookExcelImport: function(e) {
	                if (this.trigger("excelImport", e)) {
	                    e.preventDefault();
	                } else {
	                    this._initProgress(e.promise);
	                }
	            },

	            _initProgress: function(deferred) {
	                var loading =
	                    $("<div class='k-loading-mask' " +
	                           "style='width: 100%; height: 100%; top: 0;'>" +
	                        "<div class='k-loading-color'></div>" +
	                    "</div>")
	                    .appendTo(this.element);

	                var pb = $("<div class='k-loading-progress'>")
	                .appendTo(loading)
	                .kendoProgressBar({
	                    type: "chunk", chunkCount: 10,
	                    min: 0, max: 1, value: 0
	                }).data("kendoProgressBar");

	                deferred.progress(function(e) {
	                    pb.value(e.progress);
	                })
	                .always(function() {
	                    kendo.destroy(loading);
	                    loading.remove();
	                });
	            },

	            _workbookPdfExport: function(e) {
	                if (this.trigger("pdfExport", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookInsertSheet: function(e) {
	                if (this.trigger("insertSheet", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookRemoveSheet: function(e) {
	                if (this.trigger("removeSheet", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookSelectSheet: function(e) {
	                if (this.trigger("selectSheet", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookRenameSheet: function(e) {
	                if (this.trigger("renameSheet", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookInsertRow: function(e) {
	                if (this.trigger("insertRow", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookInsertColumn: function(e) {
	                if (this.trigger("insertColumn", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookDeleteRow: function(e) {
	                if (this.trigger("deleteRow", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookDeleteColumn: function(e) {
	                if (this.trigger("deleteColumn", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookHideRow: function(e) {
	                if (this.trigger("hideRow", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookHideColumn: function(e) {
	                if (this.trigger("hideColumn", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookUnhideRow: function(e) {
	                if (this.trigger("unhideRow", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookUnhideColumn: function(e) {
	                if (this.trigger("unhideColumn", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookSelect: function(e) {
	                this.trigger("select", e);
	            },

	            _workbookChangeFormat: function(e) {
	               this.trigger("changeFormat", e);
	            },

	            _workbookDataBinding: function(e) {
	                if (this.trigger("dataBinding", e)) {
	                    e.preventDefault();
	                }
	            },

	            _workbookDataBound: function(e) {
	                this.trigger("dataBound", e);
	            },

	            _bindWorkbookEvents: function() {
	                this._workbook.bind("cut", this._workbookCut.bind(this));
	                this._workbook.bind("copy", this._workbookCopy.bind(this));
	                this._workbook.bind("paste", this._workbookPaste.bind(this));
	                this._workbook.bind("changing", this._workbookChanging.bind(this));
	                this._workbook.bind("change", this._workbookChange.bind(this));
	                this._workbook.bind("excelExport", this._workbookExcelExport.bind(this));
	                this._workbook.bind("excelImport", this._workbookExcelImport.bind(this));
	                this._workbook.bind("pdfExport", this._workbookPdfExport.bind(this));
	                this._workbook.bind("insertSheet", this._workbookInsertSheet.bind(this));
	                this._workbook.bind("removeSheet", this._workbookRemoveSheet.bind(this));
	                this._workbook.bind("selectSheet", this._workbookSelectSheet.bind(this));
	                this._workbook.bind("renameSheet", this._workbookRenameSheet.bind(this));
	                this._workbook.bind("insertRow", this._workbookInsertRow.bind(this));
	                this._workbook.bind("insertColumn", this._workbookInsertColumn.bind(this));
	                this._workbook.bind("deleteRow", this._workbookDeleteRow.bind(this));
	                this._workbook.bind("deleteColumn", this._workbookDeleteColumn.bind(this));
	                this._workbook.bind("hideRow", this._workbookHideRow.bind(this));
	                this._workbook.bind("hideColumn", this._workbookHideColumn.bind(this));
	                this._workbook.bind("unhideRow", this._workbookUnhideRow.bind(this));
	                this._workbook.bind("unhideColumn", this._workbookUnhideColumn.bind(this));
	                this._workbook.bind("select", this._workbookSelect.bind(this));
	                this._workbook.bind("changeFormat", this._workbookChangeFormat.bind(this));
	                this._workbook.bind("dataBinding", this._workbookDataBinding.bind(this));
	                this._workbook.bind("dataBound", this._workbookDataBound.bind(this));
	            },

	            destroy: function() {
	                kendo.ui.Widget.fn.destroy.call(this);

	                this._workbook.destroy();
	                this._controller.destroy();
	                this._view.destroy();

	                if (this._resizeHandler) {
	                    $(window).off("resize" + NS, this._resizeHandler);
	                }
	            },

	            options: {
	                name: "Spreadsheet",
	                toolbar: true,
	                sheetsbar: true,
	                rows: 200,
	                columns: 50,
	                rowHeight: 20,
	                columnWidth: 64,
	                headerHeight: 20,
	                headerWidth: 32,
	                excel: {
	                    proxyURL: "",
	                    fileName: "Workbook.xlsx"
	                },
	                messages: {},
	                pdf: {
	                    // which part of the workbook to be exported
	                    area      : "workbook",
	                    fileName  : "Workbook.pdf",
	                    proxyURL  : "",
	                    // paperSize can be an usual name, i.e. "A4", or an array of two Number-s specifying the
	                    // width/height in points (1pt = 1/72in), or strings including unit, i.e. "10mm".  Supported
	                    // units are "mm", "cm", "in" and "pt".  The default "auto" means paper size is determined
	                    // by content.
	                    paperSize : "a4",
	                    // True to reverse the paper dimensions if needed such that width is the larger edge.
	                    landscape : true,
	                    // An object containing { left, top, bottom, right } margins with units.
	                    margin    : null,
	                    // Optional information for the PDF Info dictionary; all strings except for the date.
	                    title     : null,
	                    author    : null,
	                    subject   : null,
	                    keywords  : null,
	                    creator   : "Kendo UI PDF Generator v." + kendo.version,
	                    // Creation Date; defaults to new Date()
	                    date      : null
	                },
	                defaultCellStyle: {
	                    fontFamily: "Arial",
	                    fontSize: 12
	                },
	                useCultureDecimals: false
	            },

	            defineName: function(name, value, hidden) {
	                return this._workbook.defineName(name, value, hidden);
	            },

	            undefineName: function(name) {
	                return this._workbook.undefineName(name);
	            },

	            nameValue: function(name) {
	                return this._workbook.nameValue(name);
	            },

	            forEachName: function(func) {
	                return this._workbook.forEachName(func);
	            },

	            cellContextMenu: function() {
	                return this._view.cellContextMenu;
	            },

	            rowHeaderContextMenu: function() {
	                return this._view.rowHeaderContextMenu;
	            },

	            colHeaderContextMenu: function() {
	                return this._view.colHeaderContextMenu;
	            },

	            addImage: function(image) {
	                return this._workbook.addImage(image);
	            },

	            cleanupImages: function() {
	                return this._workbook.cleanupImages();
	            },

	            events: [
	                "cut",
	                "copy",
	                "paste",
	                "pdfExport",
	                "excelExport",
	                "excelImport",
	                "changing",
	                "change",
	                "render",
	                "removeSheet",
	                "selectSheet",
	                "renameSheet",
	                "insertRow",
	                "insertColumn",
	                "deleteRow",
	                "insertSheet",
	                "deleteColumn",
	                "hideRow",
	                "hideColumn",
	                "unhideRow",
	                "unhideColumn",
	                "select",
	                "changeFormat",
	                "dataBinding",
	                "dataBound"
	            ]
	        });

	        kendo.spreadsheet.ALL_REASONS = ALL_REASONS;
	        kendo.ui.plugin(Spreadsheet);
	        $.extend(true, Spreadsheet, { classNames: classNames });
	    })(window.kendo);

	    return window.kendo;

	}, __webpack_require__(3));


/***/ }),

/***/ 1393:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/formulacontext");

/***/ }),

/***/ 1394:
/***/ (function(module, exports) {

	module.exports = require("./util/text-metrics");

/***/ }),

/***/ 1395:
/***/ (function(module, exports) {

	module.exports = require("./util/parse-xml");

/***/ }),

/***/ 1396:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/commands");

/***/ }),

/***/ 1397:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/formulabar");

/***/ }),

/***/ 1398:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/formulainput");

/***/ }),

/***/ 1399:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/eventlistener");

/***/ }),

/***/ 1400:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/rangelist");

/***/ }),

/***/ 1401:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/propertybag");

/***/ }),

/***/ 1402:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/references");

/***/ }),

/***/ 1403:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/navigator");

/***/ }),

/***/ 1404:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/axismanager");

/***/ }),

/***/ 1405:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/clipboard");

/***/ }),

/***/ 1406:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/range");

/***/ }),

/***/ 1407:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/sheet");

/***/ }),

/***/ 1408:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/sheetsbar");

/***/ }),

/***/ 1409:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/excel-reader");

/***/ }),

/***/ 1410:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/workbook");

/***/ }),

/***/ 1411:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/controller");

/***/ }),

/***/ 1412:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/view");

/***/ }),

/***/ 1413:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/customeditors");

/***/ }),

/***/ 1414:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/grid");

/***/ }),

/***/ 1415:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/axis");

/***/ }),

/***/ 1416:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/filter");

/***/ }),

/***/ 1417:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/sorter");

/***/ }),

/***/ 1418:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/runtime");

/***/ }),

/***/ 1419:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/calc");

/***/ }),

/***/ 1420:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/numformat");

/***/ }),

/***/ 1421:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/runtime.functions");

/***/ }),

/***/ 1422:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/runtime.functions.2");

/***/ }),

/***/ 1423:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/toolbar");

/***/ }),

/***/ 1424:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/dialogs");

/***/ }),

/***/ 1425:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/sheetbinder");

/***/ }),

/***/ 1426:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/filtermenu");

/***/ }),

/***/ 1427:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/editor");

/***/ }),

/***/ 1428:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/autofill");

/***/ }),

/***/ 1429:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/nameeditor");

/***/ }),

/***/ 1430:
/***/ (function(module, exports) {

	module.exports = require("./spreadsheet/print");

/***/ })

/******/ });