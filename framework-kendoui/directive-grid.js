/**
 * 对 Kendoui 的Angular封装。依赖Angular、LAB，即当前的页面中，Angular、LAB必须已被引入
 */
(function(jQuery) {
    //默认配置参数
    var config = {
        path:""       //组件路径
        ,selector:""
        ,dataAdapter:""
        ,culture:"zh-CN"
        ,autoCloseLoading:true
        ,loadUrl:function(url){
            this.dataAdapter.transport = {
                read : url,
                parameterMap : function(options, operation) {
                    if (operation == "read") {
                        var parameter = {
                            pagenum : options.page-1,
                            pagesize : options.pageSize
                        };
                        return parameter;
                    }
                }
            };
            var grid = this.selector.data("kendoGrid");
            var dataSource = new kendo.data.DataSource(this.dataAdapter);
            grid.setDataSource(dataSource);
        },
        reload:function(){
            var grid = this.selector.data("kendoGrid");
            var dataSource = new kendo.data.DataSource(this.dataAdapter);
            grid.setDataSource(dataSource);
        },
        getSelectedRowData:function(_index){
            var grid = this.selector.data("kendoGrid");
            var selectedRows = grid.select();
            var selectedItem;
            for (var i = 0; i < selectedRows.length; i++) {
                selectedItem = grid.dataItem(selectedRows[i]);
                break;
            }
            return selectedItem;
        },
        getSelectedAllRowData:function(_index){
            var grid = this.selector.data("kendoGrid");
            var selectedRows = grid.select();
            var selectedItem=[];
            for (var i = 0; i < selectedRows.length; i++) {
                selectedItem.push(grid.dataItem(selectedRows[i]));
            }
            return selectedItem;
        },
        dbclick:function(fun){
            //TODO: 这里的live方法要换掉，jQuery1.8以后的版本不再支持live了。
            $(".k-grid-content tr",$("#"+this.id)).live("dblclick", function (event){
                fun(event);
            });
        }
    };

    //获取当前组件路径
    var filenameAndPath = "/directive-grid.js";    //当前文件名及上一级路径，必须与这里的变量相同
    config.path = $("script[src$='"+ filenameAndPath +"']").attr("src").replace(filenameAndPath,"");
    //========================================================================================================

    var ngdrt_kendo = angular.module("framework.directives",[]);
    ngdrt_kendo.directive("ngGridKendoui", ['$window','$parse','$rootScope','$compile',function (win,$parse,$rootScope,$compile) {
        return {
            restrict: 'A',
            controller:function($scope, $element, $attrs){

                // 加载组件相关资源。  controller 是在link之前执行的，在这里加载CSS，可以更快的呈现内容
                var jqx_base_css =config.path + "/kendoui/styles/kendo.common.min.css";
                var jqx_bootstrap_css = config.path + "/kendoui/styles/kendo.default.min.css";
                if ($("link[href='"+jqx_base_css+"']").length==0){
                    var styleTag = document.createElement("link");
                    styleTag.setAttribute('type', 'text/css');
                    styleTag.setAttribute('rel', 'stylesheet');
                    styleTag.setAttribute('href', jqx_base_css);
                    $("head")[0].appendChild(styleTag);
                    styleTag = document.createElement("link");
                    styleTag.setAttribute('type', 'text/css');
                    styleTag.setAttribute('rel', 'stylesheet');
                    styleTag.setAttribute('href', jqx_bootstrap_css);
                    styleTag.setAttribute('media', 'screen');
                    $("head")[0].appendChild(styleTag);
                }
                //END

            },
            link: function (scope, element, attr){
                var _config = $.extend(config,_config);

                //处理当前组件的配置参数
                var options = "{"+ attr.ngGridKendoui.replace(/'/g,"\"") +"}";
                options = $.parseJSON(options);
                options.datafields = {};
                options.columns = [];

                _config.autoCloseLoading = options.autoCloseLoading != undefined ? options.autoCloseLoading : _config.autoCloseLoading;
                _config = $.extend(options, _config);
                _config = $.extend(attr, _config);          //TODO: 这两个extend操作的先后顺序，还要再考虑下

                if(element.find("tbody")){
                    element.find("tbody th").each(function(index,ele){
                        var _row = { fieldname:"",fieldtype:"",title:"",width:null };
                        var columns_row = { field:'',title:'',template:null };
                        var sort = {};

                        if($(ele).data("option")){
                            var td_option = "{"+ $(ele).data("option").replace(/'/g,"\"") +"}";
                            td_option = $.parseJSON(td_option);
                            _row.fieldname = td_option.fieldName || td_option.fieldname || "";
                            _row.fieldtype = td_option.fieldType || td_option.fieldtype || "";
                            _row.width = td_option.width || "";
                            _row.template = td_option.template || null;
                            _row.format = td_option.format || null;

                            //_config.datafields[td_option.fieldName] = {type: td_option.fieldType || ""};
                        }else{
                            _row.fieldname = $(ele).data("fieldName") || $(ele).data("fieldname") || "";
                            _row.fieldtype = $(ele).data("fieldType") || $(ele).data("fieldtype") || "";
                            _row.width = $(ele).data("width") || "";
                            _row.template = $(ele).data("template") || null;
                            _row.format = $(ele).data("format") || null;

                            //_config.datafields[_fieldname] = {type: _fieldtype};
                        }
                        if(_row.template && (_row.template.indexOf("\\\"") || _row.template.indexOf("\\\'")) ) {
                            _row.template = _row.template.replace(/\\\"/g,"'").replace(/\\\'/g,"'");
                        }
                        _config.datafields[_row.fieldname] = {type: _row.fieldtype};

                        columns_row.field = _row.fieldname;
                        columns_row.title = $(ele).text() || _row.fieldname;;
                        columns_row.width = $(ele).data("width") || "";
                        columns_row.format = _row.format;
//                        if(_row.width){ columns_row.width = _row.width; }

                        if($(ele).data("renderer")){ //自定义字段
                            //renderer方法必须使用 字段名+Renderer 的命名形式
                            var renderer = eval($(ele).data("renderer"));
                            var fun_name = _row.fieldname +"Renderer";
                            try{
                                columns_row.template = eval(fun_name);
                            }catch(e){}
                        }
                        _config.columns.push(columns_row);
                        //_config.datafields.push(datafields_row);
                    });
                }
                if(_config.url){
                    _config.dataAdapter = {
                        transport : {
                            read : _config.url,
                               parameterMap : function(options, operation) {
                                if (operation == "read") {
                                    var parameter = {
                                        pagenum : options.page-1,
                                        pagesize : options.pageSize
                                    };
                                    return parameter;
                                }
                            }
                        },
                        type: "json",
                        schema: {
                            total:"totalRows",
                            data:"models",
                            model: { fields: _config.datafields }
                        },
                        sort: _config.sort,
                        pageSize: _config.pagesize || 10,
                        serverPaging: true,
                        serverFiltering: false,
                        serverSorting: false
                    };
                }else if(_config.data){
                    _config.dataAdapter = _config.data;
                }
                if(attr.ngData){      //动态绑定scope中的本地数据源
                     _config.dataAdapter = scope[attr.ngData] || {} ;
                }

                //加载必须的类库，并执行
                $LAB.script(_config.path + "/kendoui/js/kendo.web.min.js").wait()
                .script(_config.path + "/kendoui/js/cultures/kendo.culture."+_config.culture+".min.js")
                .wait(function(){
                    var grid_source = {
                        culture: _config.culture || "zh-CN",
                        dataSource: _config.dataAdapter,
                        height: _config.height,
                        filterable:(_config.filterable && _config.filterable !='true') ? false: kendo.cultures[_config.culture].filterable ||true,
                        sortable: (_config.sortable && _config.sortable !='true') ? false: true,
                        pageable:  ((_config.pageable && _config.pageable !='true') || isNaN(_config.pagesize)) ? false : kendo.cultures[_config.culture].pageable ||true,
                        resizable: (_config.resizable && _config.resizable !='true') ? false: true,
                        scrollable:(_config.scrollable && _config.scrollable !='true') ? false: true,
                        columns: _config.columns,
                        columnResizeHandleWidth: 6,
                        selectable: _config.selectable || "row",//Grid单选或者多选
                        dataBinding: function(e) {
                            $rootScope.$broadcast("ngGridKendoui_onDataBinding_"+ _config.id,null);
                        },
                        dataBound: function(e) {
                            //当Grid编译完成后，发送广播
                            $rootScope.$broadcast("ngGridKendoui_onComplete",_config.id);
                            $rootScope.$broadcast("ngGridKendoui_onComplete_"+ _config.id,null);

                            if(_config.onComplete){       //HTML属性方式传入   优先级最高
                                scope[_config.onComplete](_config);
                            }else if(scope.onComplete){                //重载方式调用
                                scope.onComplete(_config);
                            }

                            if(_config.autoCloseLoading){         //loading控制
                                $rootScope.safeApply(function() {
                                    $rootScope.loading = false;
                                });
                            }
                        }
                    };

                    var _thead,_tfoot;
                    if(element.find("thead").length){
                        _thead = element.find("thead td").html();
                        _thead = $('<div class="toolbar J_toolbar"></div>').append(_thead);
                        _thead = $('<div class="k-toolbar k-grid-toolbar J_k-grid-toolbar-box"></div>').append(_thead);
                    }
                    if(element.find("tfoot").length){
                        _tfoot = element.find("tfoot td").clone().html();
                        _tfoot = $('<div class="statusbar"></div>').append(_tfoot);
                        _tfoot = $('<div class="k-toolbar k-grid-toolbar J_k-grid-toolbar-box"></div>').append(_tfoot);
                    }

                    element = element.wrap('<div class="ngGridkendo" id="'+ _config.id +'"></div>').parent().html("<div></div>");       //替换掉当前元素
                    _config.selector = element.find("div");
                    _config.selector.kendoGrid(grid_source);    //调用组件的编译方法
                    scope[_config.id] = _config;                 //在当前scope中创建Grid对象，并传入这个Grid的配置参数

                    //模拟初始化事件
                    var initialized = function () {
                        //当Grid编译完成后，发送广播
                        $rootScope.$broadcast("ngGridKendoui_initialized",_config);

                        if(_config.oninitialized){       //HTML属性方式传入   优先级最高
                            scope[_config.oninitialized](_config);
                        }else if(scope.onInitialized){                //重载方式调用
                            scope.onInitialized(_config);
                        }

                        $("#"+ _config.id).find(".k-grid-content").css("min-height",60);        //数据区域的最小高度
                        if(_thead){
                            $compile(_thead)(scope);
                            $("#"+ _config.id).find(".k-grid-header").before(_thead);            //添加thead工具栏
                        }
                        if(_tfoot){
                            $compile(_tfoot)(scope);
                            $("#"+ _config.id).find(".k-grid-content").after(_tfoot);           //添加tbood工具栏
                        }
                    };
                    initialized();

                    //监视数据源的变化，重新加载Grid。必须放在_config.selector后面。
                    //特别注意：这里的数据格式与列表不同，应该直接传入数据的数组
                    if(attr.ngData){
                        var watchGrid_ = function(newData){
                            if(newData && newData.data){
                                _config.dataAdapter = newData;
                            }
                            else{
                                _config.dataAdapter = {data:newData};
                            }

                            var grid = _config.selector.data("kendoGrid");
                            var dataSource = new kendo.data.DataSource(_config.dataAdapter);
                            grid.setDataSource(dataSource);
                        };
                        watchGrid_(scope[attr.ngData]);     //直接应用数据，用于应用在本插件还没有载入（执行），上层controller已经apply数据的情况
                        scope.$watch(attr.ngData, function(newData, oldData) {      //这里监听本插件载入后apply数据的情况
                            watchGrid_(newData);
                        });
                    }
                });
            }
        }
    }]);
})(jQuery);