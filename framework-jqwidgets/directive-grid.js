/**
 * 对 jqwidgets 的Angular封装。依赖Angular、LAB，即当前的页面中，Angular、LAB必须已被引入
 */
(function(jQuery) {
    //默认配置参数
    var config = {
        path:""       //组件路径
        ,theme:"bootstrap"
        ,selector:""
        ,dataAdapter:""
        ,pagesize:10
        ,pagesizeoptions: [10,20,50]
        ,pageable:true
        ,autoheight: true
        ,autoCloseLoading:true
        ,loadUrl:function(url){
            if(url){
                this.dataAdapter.url = url;
            }
            this.selector.jqxGrid('gotopage', 0);
            this.selector.jqxGrid('databind', this.dataAdapter);
        },
        getSelectedRowIndex:function(){
            return this.selector.jqxGrid('selectedrowindex');
        },
        getSelectedRowData:function(_index){
            var index = _index || this.getSelectedRowIndex();
            return this.selector.jqxGrid('getrowdata',index);
        },
        reload:function(){
            var paginginformation = this.selector.jqxGrid('getpaginginformation');
            this.selector.jqxGrid('databind', this.dataAdapter);
            this.selector.jqxGrid('gotopage', paginginformation.pagenum);
        }
    };

    //获取当前组件路径
    var filenameAndPath = "/directive-grid.js";    //当前文件名，必须与这里的变量相同
    config.path = $("script[src$='"+ filenameAndPath +"']").attr("src").replace(filenameAndPath,"");
    //========================================================================================================


    var ngdrt_jqwidgets = angular.module("framework.directives",[]);
    ngdrt_jqwidgets.directive("ngGridJqwidgets", ['$window','$parse','$rootScope','$compile',function (win,$parse,$rootScope,$compile) {
        return {
            restrict: 'CA',
            controller:function($scope, $element, $attrs){
                //console.log("ngGridKendoui controller");

                // 加载组件相关资源。  controller 是在link之前执行的，在这里加载CSS，可以更快的呈现内容
                var jqx_base_css = config.path + "/jqwidgets/styles/jqx.base.css";
                var jqx_bootstrap_css = config.path + "/jqwidgets/styles/jqx.bootstrap.css";
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
            link: function (scope, element, attr) {
                //console.log(scope,scope.testColumn());
            	
                var _config = $.extend(config,_config);

                //处理当前组件的配置参数
                var options = "{"+ attr.ngGridJqwidgets.replace(/'/g,"\"") +"}";
                options = $.parseJSON(options);
                _config = $.extend(options,_config);
                _config = $.extend(attr,_config);
                _config.datafields = [];
                _config.columns = [];

                if(element.find("tbody").length){
                    element.find("tbody th").each(function(index,ele){
                        var datafields_row = { name: '', type: '' };
                        var columns_row = { datafield:'',text:''};

                        if($(ele).data("option")){
                            var td_option = "{"+ $(ele).data("option").replace(/'/g,"\"") +"}";
                            td_option = $.parseJSON(td_option);

                            datafields_row.name = td_option.fieldName || "";
                            datafields_row.type = td_option.fieldType || "";

                            columns_row.cellsalign=td_option.cellsalign||"";
                            columns_row.width = td_option.width || "";

                        }else{
                            //列的绑定数据，和数据类型
                            datafields_row.name = $(ele).data("fieldName") || $(ele).data("fieldname") || "";
                            datafields_row.type = $(ele).data("fieldType") || $(ele).data("fieldtype") || "";
                            //列的属性
                            columns_row.cellsalign= $(ele).data("cellsalign") || "";
                            columns_row.width = $(ele).data("width") || "";
                            //自定义字段
                            if($(ele).data("renderer")){
                                //renderer方法必须使用 字段名+Renderer 的命名形式
                                var renderer = eval($(ele).data("renderer"));
                                var fun_name = datafields_row.name +"Renderer";
                                try{
                                    columns_row.cellsrenderer = eval(fun_name);
                                }catch(e){}
                            }

                        }
                        columns_row.datafield = datafields_row.name;
                        columns_row.text = $(ele).text();

                        _config.datafields.push(datafields_row);
                        _config.columns.push(columns_row);
                    });
                }

                //准备好Grid的dataAdapter
                _config.dataAdapter = {
                    datatype: "json",
                    //url: _config.url,
                    pagesize: _config.pagesize || 10,
                    sortcolumn: 'id',
                    sortdirection:'desc',
                    datafields: _config.datafields,
                    beforeprocessing: function (data) {
                        if(data!=null)
                        {
                            _config.dataAdapter.totalrecords = data.totalRows;
                        }
                        else{
                            _config.dataAdapter.totalrecords = 0;
                        }
                    }
                };
                if(_config.url){
                    _config.dataAdapter.url = _config.url;
                }else if(_config.data){
                    _config.dataAdapter.localdata = _config.data;
                }
                if(attr.ngData){      //动态绑定scope中的本地数据源
                    _config.dataAdapter.localdata = scope[attr.ngData];
                }

                //加载必须的类库，并执行
                $LAB.script(_config.path + "/jqwidgets/globalization/globalize.js")
                    .script(_config.path + "/jqwidgets/jqx-all.js")
                    .wait(function(){

                        var dataAdapter = new $.jqx.dataAdapter(_config.dataAdapter);
                        var grid_source = {
                            width: _config.width,
                            source: dataAdapter,
                            theme: _config.theme,
                            selectionmode:_config.selectionmode||"singlerow",
                            pagesizeoptions: _config.pagesizeoptions,
                            pageable: true,
                            autoheight: true,
                            altrows: true,
                            virtualmode: true,
                            rendergridrows: function (args) {
                                return args.data;
                            },
                            columns: _config.columns
                        };
                        if(element.find("thead").length){
                            var html = element.find("thead td").html();
                            html = $('<div class="toolbar J_toolbar"></div>').append(html);
                            grid_source.showtoolbar = true;
                            grid_source.toolbarheight = 35;
                            grid_source.rendertoolbar = function(toolbar){
                                $(html).appendTo(toolbar);
                                $compile(toolbar)(scope);
                            };
                        }else{
                            grid_source.showtoolbar = false;
                        }
                        if(element.find("tfoot").length){
                            var _html = element.find("tfoot td").html();
                            _html = $('<div class="statusbar"></div>').append(_html);
                            grid_source.showstatusbar = true;
                            grid_source.renderstatusbar = function(statusbar){
                                $(_html).appendTo(statusbar);
                                $compile(statusbar)(scope);
                            };
                        }
                        element = element.wrap('<div id="'+ _config.id +'" class="ngGridJqwidgets"></div>').parent().html("<div></div>");
                        _config.selector = element.find("div");
                        _config.selector.jqxGrid(grid_source);
                        scope[_config.id] = _config;        //在当前scope中创建Grid对象，并传入这个Grid的配置参数

                        //当grid的状态OK时，将grid与外部发生关系
                        _config.selector.on("bindingcomplete", function (event) {
                            //console.log("scope.jqxGrid.bindingcomplete");
                            //当Grid编译完成后，发送广播
                            $rootScope.$broadcast("ngGridJqwidgets_onComplete",_config);

                            if(_config.oncomplete){       //HTML属性方式传入   优先级最高
                                scope[_config.oncomplete](_config);
                            }else if(scope.onComplete){                //重载方式调用
                                scope.onComplete(_config);
                            }

                            if(_config.autoCloseLoading){         //loading控制
                                $rootScope.safeApply(function() {
                                    $rootScope.loading = false;
                                });
                            }
                        });

                        //模拟初始化事件
                        var initialized = function () {
                            //console.log("scope.jqxGrid.initialized");
                            //当Grid编译完成后，发送广播
                            $rootScope.$broadcast("ngGridJqwidgets_initialized",_config);

                            if(_config.oninitialized){       //HTML属性方式传入   优先级最高
                                scope[_config.oninitialized](_config);
                            }else if(scope.onInitialized){                //重载方式调用
                                scope.onInitialized(_config);
                            }
                        };
                        initialized();

                        //监视数据源的变化，重新加载Grid
                        if(attr.ngData){
                            scope.$watch(attr.ngData, function(newData, oldData) {
                                _config.dataAdapter.localdata = newData;
                                _config.selector.jqxGrid('databind', _config.dataAdapter);
                            });
                        }

                    });
            }
        }
    }]);
})(jQuery);