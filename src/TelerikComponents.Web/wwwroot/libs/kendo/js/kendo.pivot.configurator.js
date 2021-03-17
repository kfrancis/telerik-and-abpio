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

	module.exports = __webpack_require__(1359);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1046:
/***/ (function(module, exports) {

	module.exports = require("./kendo.dom");

/***/ }),

/***/ 1359:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1046) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	var __meta__ = { // jshint ignore:line
	    id: "pivot.configurator",
	    name: "PivotConfigurator",
	    category: "web",
	    depends: [ "dropdownlist", "treeview", "pivot.fieldmenu" ],
	    hidden: true
	};

	/*jshint eqnull: true*/
	(function($, undefined) {
	    var kendo = window.kendo,
	        ui = kendo.ui,
	        Widget = ui.Widget,
	        ns = ".kendoPivotConfigurator",
	        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
	        SETTING_CONTAINER_TEMPLATE = kendo.template('<p class="k-reset"><span class="k-icon #=icon#"></span>${name}</p>' +
	                '<div class="k-list-container k-reset"></div>');

	    function addKPI(data) {
	        var found;
	        var idx = 0;
	        var length = data.length;

	        for (; idx < length; idx++) {
	            if (data[idx].type == 2) {
	                found = true;
	                break;
	            }
	        }

	        if (found) {
	            data.splice(idx + 1, 0, {
	                caption: "KPIs",
	                defaultHierarchy: "[KPIs]",
	                name: "KPIs",
	                uniqueName: "[KPIs]"
	            });
	        }
	    }

	    function kpiNode(node) {
	        return {
	            name: node.uniqueName,
	            type: node.type
	        };
	    }

	    function normalizeKPIs(data) {
	        for (var idx = 0, length = data.length; idx < length; idx++) {
	            data[idx].uniqueName = data[idx].name;
	            data[idx].type = "kpi";
	        }

	        return data;
	    }

	    function settingTargetFromNode(node) {
	        var target = $(node).closest(".k-pivot-setting");

	        if (target.length) {
	            return target.data("kendoPivotSettingTarget");
	        }
	        return null;
	    }

	    var PivotConfigurator = Widget.extend({
	        init: function(element, options) {
	            Widget.fn.init.call(this, element, options);

	            this.element.addClass("k-widget k-fieldselector k-alt k-edit-form-container");

	            this._dataSource();

	            this._layout();

	            this.refresh();

	            kendo.notify(this);
	        },

	        events: [],

	        options: {
	            name: "PivotConfigurator",
	            filterable: false,
	            sortable: false,
	            messages: {
	                measures: "Drop Data Fields Here",
	                columns: "Drop Column Fields Here",
	                rows: "Drop Rows Fields Here",
	                measuresLabel: "Measures",
	                columnsLabel: "Columns",
	                rowsLabel: "Rows",
	                fieldsLabel: "Fields"
	            }
	        },

	        _dataSource: function() {
	            var that = this;

	            if (that.dataSource && that._refreshHandler) {
	                that.dataSource.unbind("change", that._refreshHandler)
	                               .unbind("error", that._errorHandler)
	                               .unbind("progress", that._progressHandler);
	            } else {
	                that._errorHandler = $.proxy(that._error, that);
	                that._refreshHandler = $.proxy(that.refresh, that);
	                that._progressHandler = $.proxy(that._requestStart, that);
	            }

	            that.dataSource = kendo.data.PivotDataSource.create(that.options.dataSource);
	            that.dataSource.bind("change", that._refreshHandler)
	                           .bind("error", that._errorHandler)
	                           .bind("progress", that._progressHandler);
	        },

	        setDataSource: function(dataSource) {
	            this.options.dataSource = dataSource;

	            this._dataSource();

	            if (this.measures) {
	                this.measures.setDataSource(dataSource);
	            }

	            if (this.rows) {
	                this.rows.setDataSource(dataSource);
	            }

	            if (this.columns) {
	                this.columns.setDataSource(dataSource);
	            }

	            this.refresh();
	        },

	        _treeViewDataSource: function() {
	            var that = this;

	            return kendo.data.HierarchicalDataSource.create({
	                schema: {
	                    model: {
	                        id: "uniqueName",
	                        hasChildren: function(item) {
	                            return !("hierarchyUniqueName" in item) && !("aggregator" in item);
	                        }
	                    }
	                },
	                transport: {
	                    read: function(options) {
	                        var promise;
	                        var node;
	                        var kpi;

	                        if ($.isEmptyObject(options.data)) {
	                            promise = that.dataSource.schemaDimensions();

	                            promise.done(function(data) {
	                                        if (!that.dataSource.cubeBuilder) {
	                                            addKPI(data);
	                                        }
	                                        options.success(data);
	                                    })
	                                    .fail(options.error);
	                        } else {
	                            //Hack to get the actual node as the HierarchicalDataSource does not support passing it
	                            node = that.treeView.dataSource.get(options.data.uniqueName);

	                            if (node.uniqueName === "[KPIs]") {
	                                kpi = true;
	                                promise = that.dataSource.schemaKPIs();
	                                promise.done(function (data) {
	                                            options.success(normalizeKPIs(data));
	                                       })
	                                       .fail(options.error);
	                            } else if (node.type == "kpi") {
	                                kpi = true;
	                                options.success(buildKPImeasures(node));
	                            }

	                            if (!kpi) {
	                                if (node.type == 2) { //measure
	                                    promise = that.dataSource.schemaMeasures();
	                                } else if (node.dimensionUniqueName) { // hierarchy
	                                    promise = that.dataSource.schemaLevels(options.data.uniqueName);
	                                } else { // dimension
	                                    promise = that.dataSource.schemaHierarchies(options.data.uniqueName);
	                                }

	                                promise.done(options.success)
	                                        .fail(options.error);
	                            }
	                        }
	                    }
	                }
	            });
	        },

	        _progress: function(toggle) {
	            kendo.ui.progress(this.element, toggle);
	        },

	        _error: function() {
	            this._progress(false);
	        },

	        _requestStart: function() {
	            this._progress(true);
	        },

	        _layout: function() {
	            this.form = $('<div class="k-columns k-state-default k-floatwrap"/>').appendTo(this.element);
	            this._fields();
	            this._targets();
	        },

	        _fields: function() {
	            var container = $('<div class="k-state-default"><p class="k-reset"><span class="k-icon k-i-group"></span>' + this.options.messages.fieldsLabel + '</p></div>').appendTo(this.form);

	            var template = '# if (item.type == 2 || item.uniqueName == "[KPIs]") { #' +
	                           '<span class="k-icon k-i-#= (item.type == 2 ? \"sum\" : \"kpi\") #"></span>' +
	                           '# } else if (item.type && item.type !== "kpi") { #' +
	                           '<span class="k-icon k-i-arrows-dimensions"></span>' +
	                           '# } #' +
	                           '#: item.caption || item.name #';

	            this.treeView = $("<div/>").appendTo(container)
	                .kendoTreeView({
	                    template: template,
	                    dataTextField: "caption",
	                    dragAndDrop: true,
	                    autoBind: false,
	                    dataSource: this._treeViewDataSource(),
	                    dragstart: function(e) {
	                        var dataItem = this.dataItem(e.sourceNode);
	                        if ((!dataItem.hasChildren && !dataItem.aggregator && !dataItem.measure) || (dataItem.type == 2) || dataItem.uniqueName === "[KPIs]") {
	                            e.preventDefault();
	                        }
	                    },
	                    drag: function(e) {
	                        var status = "k-i-cancel";

	                        var setting = settingTargetFromNode(e.dropTarget);
	                        if (setting && setting.validate(this.dataItem(e.sourceNode))) {
	                            status = "k-i-plus";
	                        }

	                        e.setStatusClass(status);
	                    },
	                    drop: function(e) {
	                        e.preventDefault();

	                        var setting = settingTargetFromNode(e.dropTarget);
	                        var node = this.dataItem(e.sourceNode);
	                        var idx, length, measures;
	                        var name;

	                        if (setting && setting.validate(node)) {
	                            name = node.defaultHierarchy || node.uniqueName;

	                            if (node.type === "kpi") {
	                                measures = buildKPImeasures(node);
	                                length = measures.length;
	                                name = [];

	                                for (idx = 0; idx < length; idx++) {
	                                    name.push(kpiNode(measures[idx]));
	                                }
	                            } else if (node.kpi) {
	                                name = [kpiNode(node)];
	                            }

	                            setting.add(name);
	                        }
	                    }
	                 })
	                .data("kendoTreeView");
	        },

	        _createTarget: function(element, options) {
	            var template = '<li class="k-item k-header" data-' + kendo.ns + 'name="${data.name}">${data.name}';
	            var sortable = options.sortable;
	            var icons = "";

	            if (sortable) {
	                icons += '#if (data.sortIcon) {#';
	                icons += '<span class="k-icon ${data.sortIcon}-sm"></span>';
	                icons += '#}#';
	            }

	            if (options.filterable || sortable) {
	                icons += '<span class="k-icon k-i-more-vertical k-setting-fieldmenu"></span>';
	            }

	            icons += '<span class="k-icon k-i-close k-setting-delete"></span>';
	            template += '<span class="k-field-actions">' + icons + '</span></li>';

	            return new kendo.ui.PivotSettingTarget(element, $.extend({
	                dataSource: this.dataSource,
	                hint: function(element) {
	                    var wrapper = $('<div class="k-fieldselector"><ul class="k-list k-reset"></ul></div>');

	                    wrapper.find(".k-list").append(element.clone());

	                    return wrapper;
	                },
	                template: template,
	                emptyTemplate: '<li class="k-item k-empty">${data}</li>'
	            }, options));
	        },

	        _targets: function() {
	            var container = $('<div class="k-state-default"/>').appendTo(this.form);

	            var columnsContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.columnsLabel, icon: "k-i-columns" })).appendTo(container);
	            var columns = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(columnsContainer.last());

	            var rowsContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.rowsLabel, icon: "k-i-rows" })).appendTo(container);
	            var rows = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(rowsContainer.last());

	            var measuresContainer = $(SETTING_CONTAINER_TEMPLATE({ name: this.options.messages.measuresLabel, icon: "k-i-sum"})).appendTo(container);
	            var measures = $('<ul class="k-pivot-configurator-settings k-list k-reset" />').appendTo(measuresContainer.last());

	            var options = this.options;

	            this.columns = this._createTarget(columns, {
	                filterable: options.filterable,
	                sortable: options.sortable,
	                connectWith: rows,
	                messages: {
	                    empty: options.messages.columns,
	                    fieldMenu: options.messages.fieldMenu
	                }
	            });

	            this.rows = this._createTarget(rows, {
	                filterable: options.filterable,
	                sortable: options.sortable,
	                setting: "rows",
	                connectWith: columns,
	                messages: {
	                    empty: this.options.messages.rows,
	                    fieldMenu: this.options.messages.fieldMenu
	                }
	            });

	            this.measures = this._createTarget(measures, {
	                setting: "measures",
	                messages: {
	                    empty: options.messages.measures
	                }
	            });

	            columns
	                .add(rows)
	                .add(measures)
	                .on(HOVEREVENTS, ".k-item:not(.k-empty)", this._toggleHover);
	        },

	        _toggleHover: function(e) {
	            $(e.currentTarget).toggleClass("k-state-hover", e.type === "mouseenter");
	        },

	        _resize: function() {
	            var element = this.element;
	            var height = this.options.height;
	            var border, fields;
	            var outerHeight = kendo._outerHeight;

	            if (!height) {
	                return;
	            }

	            element.height(height);

	            if (element.is(":visible")) {
	                fields = element.children(".k-columns")
	                                .children("div.k-state-default");

	                height = element.innerHeight();

	                border = (outerHeight(element) - height) / 2;
	                height = height - (outerHeight(fields, true) - fields.height()) - border;

	                fields.height(height);
	            }
	        },

	        refresh: function() {
	            var dataSource = this.dataSource;

	            if (dataSource.cubeBuilder || this._cube !== dataSource.cube() || this._catalog !== dataSource.catalog()) {
	                this.treeView.dataSource.fetch();
	            }

	            this._catalog = this.dataSource.catalog();
	            this._cube = this.dataSource.cube();

	            this._resize();

	            this._progress(false);
	        },

	        destroy: function() {
	            Widget.fn.destroy.call(this);

	            this.dataSource.unbind("change", this._refreshHandler);

	            this.form.find(".k-list").off(ns);

	            this.rows.destroy();
	            this.columns.destroy();
	            this.measures.destroy();
	            this.treeView.destroy();

	            this.element = null;
	            this._refreshHandler = null;
	        }
	    });

	    function kpiMeasure(name, measure, type) {
	        return {
	            hierarchyUniqueName: name,
	            uniqueName: measure,
	            caption: measure,
	            measure: measure,
	            name: measure,
	            type: type,
	            kpi: true
	        };
	    }

	    function buildKPImeasures(node) {
	        var name = node.name;
	        return [
	            kpiMeasure(name, node.value, "value"),
	            kpiMeasure(name, node.goal, "goal"),
	            kpiMeasure(name, node.status, "status"),
	            kpiMeasure(name, node.trend, "trend")
	        ];
	    }

	    ui.plugin(PivotConfigurator);

	})(window.kendo.jQuery);

	return window.kendo;

	}, __webpack_require__(3));


/***/ })

/******/ });