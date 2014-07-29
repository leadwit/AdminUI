    function inputFunc(){
        $("#addrowbutton").jqxButton({ theme: "bootstrap" });
        $("#deleterowbutton").jqxButton({ theme: "bootstrap" });

        // create new row.
        $("#addrowbutton").on('click', function () {
            var rowscount = $(".uitable2").jqxGrid('getdatainformation').rowscount;
            var datarow = {"required":"非必须","position":rowscount};
            var commit = $(".uitable2").jqxGrid('addrow', null, datarow);
        });

        $("#deleterowbutton").on('click', function () {
            var selectedrowindex = $(".uitable2").jqxGrid('getselectedrowindex');
            var rowscount = $(".uitable2").jqxGrid('getdatainformation').rowscount;
            for(var i=rowscount-1;i>selectedrowindex;i--){
                $(".uitable2").jqxGrid('setcellvalue', i, "position",i-1);
            }
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $(".uitable2").jqxGrid('getrowid', selectedrowindex);
                var commit = $(".uitable2").jqxGrid('deleterow', id);
            }
        });
    }
    function outputFunc(){
        $("#addrowbuttonOut").jqxButton({ theme: "bootstrap" });
        $("#deleterowbuttonOut").jqxButton({ theme: "bootstrap" });

        // create new row.
        $("#addrowbuttonOut").on('click', function () {
            var rowscount = $(".uitable3").jqxGrid('getdatainformation').rowscount;
            var datarow = {"required":"非必须","position":rowscount};
            var commit = $(".uitable3").jqxGrid('addrow', null, datarow);
        });

        $("#deleterowbuttonOut").on('click', function () {
            var selectedrowindex = $(".uitable3").jqxGrid('getselectedrowindex');
            var rowscount = $(".uitable3").jqxGrid('getdatainformation').rowscount;
            for(var i=rowscount-1;i>selectedrowindex;i--){
                $(".uitable3").jqxGrid('setcellvalue', i, "position",i-1);
            }
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $(".uitable3").jqxGrid('getrowid', selectedrowindex);
                var commit = $(".uitable3").jqxGrid('deleterow', id);
            }
        });
    }

    ngmod.controller("tabBoxCtrl",["$scope",function($scope){
        $scope.compileGrid = function (_para){
            //默认参数
            var _default = {controller:"",uigrid:"",url:"",datafields:[],columns:[]
                ,pagesize:15
                ,pagesizeoptions: ['15', '50', '100']
                ,width:"98%"
                ,heigh:400
                ,toolbarheight:55
                ,editable: false
                ,pageable:true
                ,showstatusbar: false
                ,renderstatusbar: function (statusbar) {}
            };
            //格式化URL
            if(_para.url.indexOf("?")>-1) {
                _para.url += "&";
            }else{
                _para.url += "?";
            }
            _para = jQuery.extend(_default,_para);          //首次调用时，默认值的初始化

            var source = {
                datatype: "json",
                pagesize: _para.pagesize,
                sortcolumn: 'id',
                sortdirection: 'desc',
                cache: false,
                datafields: _para.datafields,
                beforeprocessing: function (data) {
                    if(data==null){
                        source.totalrecords=0;
                    }else {
                        source.totalrecords = data.totalRows;
                    }
                },
                pager: function (pagenum, pagesize, oldpagenum) { },
                filter: function () {
                    source.url = _para.url + $(".J_toolbar :input", "[ng-controller='"+ _para.controller +"']").serialize();
                    cms.ui_grid.jqxGrid('databind', source);
                },
                sort: function (column, direction) {
                    source.url = _para.url + $(".J_toolbar :input", "[ng-controller='"+ _para.controller +"']").serialize();
                    cms.ui_grid.jqxGrid('databind', source);
                }
            };
            if(_para.url.indexOf("localdata") > -1){
                source.localdata =_para.localdata
            }else{
                source.url = _para.url;
            }
            var grid=$(_para.uigrid,"[ng-controller='"+ _para.controller +"']");

            //Grid的各字段设置
            this.setColumns = function(columns){
                _para = jQuery.extend(_default,_para);              //setColumns时再对_para的值进行处理
                _para.columns = columns;
            };

            //自定义列样式
            this.cellManage = function (row, column, value){
                var dataRecord = grid.jqxGrid('getrowdata', row);

                var html = $("<div></div>").append( $('#'+ _para.controller +'-cellManage-'+ column).tmpl(dataRecord,{
                    getData:function(){
                        return cms.O2String(this.data);
                    }
                }) ).html();
                return html;
            };
            //编译Grid
            this.doCompile = function(){
                var dataAdapter = new $.jqx.dataAdapter(source);
                $(grid).jqxGrid({
                    columns: _para.columns,
                    source: dataAdapter,
                    width: _para.width,
                    theme: "bootstrap",
                    filterable: false,
                    sortable: false,
                    editable: _para.editable,
                    sorttogglestates: 1,
                    pageable: _para.pageable,
                    pagesizeoptions: _para.pagesizeoptions,
                    columnsresize: true,
                    autoheight:false,
                    altrows: true,
                    virtualmode: true,
                    rendergridrows: function (args) {
                        return args.data;
                    },
                    showtoolbar: true,
                    toolbarheight:_para.toolbarheight,
                    rendertoolbar: function (toolbar) {
                        var html = $('#'+ _para.controller  +'-toolbar').tmpl();
                        toolbar.append(html);
                        var search_fun = function(event){
                            source.url = _para.url + $(".J_toolbar :input", "[ng-controller='"+ _para.controller +"']").serialize();
                            grid.jqxGrid('gotopage', 0);
                            grid.jqxGrid('databind', source);
                        };
                        $("button.J_bt_search",toolbar).click(function(event){
                            search_fun(event);
                        });
                        $(".J_search",toolbar).keydown(function(event){
                            if (event.keyCode == 13) {
                                search_fun(event);
                            }
                        });
                    }
                    ,showstatusbar: _para.showstatusbar
                    ,renderstatusbar:_para.renderstatusbar
                });
            };
            //刷新Grid
            this.reload = function(){
                var paginginformation = grid.jqxGrid('getpaginginformation');
                grid.jqxGrid('gotopage', paginginformation.pagenum);
                //$grid.jqxGrid({ source: source });          //这也是一种刷新Grid的方法，但要处理分页问题。目前一刷就回到第一页了     LinWenLong on 20130606
                grid.jqxGrid('databind', source);
            };
        };
        //END compileGrid
    }]);
    ngmod.controller("tab2Ctrl",["$scope","serviceRES",function($scope,serviceRES){
        $scope.$on("copyDataLoaded",function(event,data){
            serviceRES.get({
                method:"flist"
            }, function(fproject) {
                var flist=fproject.models;
                var opMethod = data.opMethod;
                var editAble = true;
                if(opMethod == "detail"){
                    editAble = false;
                }
                //console.log("flist.length====",flist);
                var dropDatasource ={localdata: flist,datatype: "array"};
                var dropDataAdapter = new $.jqx.dataAdapter(dropDatasource);
                var _compileGrid  = new $scope.compileGrid({
                    "controller":'tab2Ctrl',
                    "uigrid":".uitable2",
                    url : "localdata",
                    localdata : data.inputJson,
                    datatype: "json",
                    "datafields": [
                        { name: 'fieldName'  },
                        { name: 'category'   },
                        { name: 'typeName'   },
                        { name: 'required'   },
                        { name: 'position'   },
                        { name: 'desc'       } ,
                        { name: 'otherName'  }
                    ]
                    ,width : 900
                    ,editable:editAble
                    ,pageable:false
                    ,showstatusbar:false
                    ,toolbarheight:0
                    ,autoheight:true
                    ,addrow: function (rowid, rowdata, position, commit) {
                        commit(true);
                    }
                    ,deleterow: function (rowid, commit) {
                        commit(true);
                    }
                });

                inputFunc();
                var requiredText = function(row,column,value){
                    if(value=='1'){
                        return "必须";
                    }else if(value=='0'){
                        return "非必须";
                    }
                };
                var elementInfoChange = function (row, column, columntype, oldvalue, newvalue) {
                    var len = flist.length;
                    for(var i=0;i<len;i++){
                        var obj = flist[i];
                        if(obj.name==newvalue){
                            $(".uitable2").jqxGrid('setcellvalue', row, "desc",obj.description);
                            $(".uitable2").jqxGrid('setcellvalue', row, "typeName",obj.typeName);
                            $(".uitable2").jqxGrid('setcellvalue', row, "category",obj.category);
                            $(".uitable2").jqxGrid('setcellvalue', row, "otherName",obj.name);
                        }
                    }
                    return newvalue;
                };
                _compileGrid.setColumns([
                    { text: '属性', datafield: 'fieldName', width:'30%',editable: true ,columntype:'dropdownlist',
                        createeditor: function (row, column, editor) {
                            editor.jqxDropDownList({source: dropDataAdapter, displayMember: "name", valueMember: "id",
                                renderer: function (index, label, value) {
                                    var datarecord = flist[index];
                                    var table = '<table style="min-width: 150px;"><tr><td style="width: 55px;" align="left">' + datarecord.name + '</td><td align="right">' + datarecord.typeName + '</td></tr></table>';
                                    return table;
                                }});
                        },cellvaluechanging:elementInfoChange},
                    { text: '类型', datafield: 'typeName', width:'15%',editable: false },
                    { text: '类别', datafield: 'category', width:'15%',editable: false },
                    { text: '是否必须', datafield: 'required', width:'10%',columntype:'dropdownlist',
                        createeditor: function (row, column, editor) {
                            var list = ['必须', '非必须'];
                            editor.jqxDropDownList({ source: list });
                        }
                    },
                    { text: '位置', datafield: 'position', width:'5%', cellsalign: 'right' },
                    { text: '描述', datafield: 'desc' , width:'15%', cellsalign: 'right' },
                    { text: '别名', datafield: 'otherName', width:'10%' }
                ]);
                _compileGrid.doCompile();
            });
        });
    }]);
    ngmod.controller("tab3Ctrl",["$scope","serviceRES",function($scope,serviceRES){
        $scope.$on("copyDataLoaded",function(event,data){
            serviceRES.get({
                method:"flist"
            }, function(fproject) {
                var flist=fproject.models;
                var opMethod = data.opMethod;
                var editAble = true;
                if(opMethod == "detail"){
                    editAble = false;
                }
                var dropDatasource ={localdata: flist,datatype: "array"};
                var dropDataAdapter = new $.jqx.dataAdapter(dropDatasource);
                var _compileGrid  = new $scope.compileGrid({
                    "controller":'tab3Ctrl',
                    "uigrid":".uitable3",
                    url : "localdata",
                    localdata : data.outputJson,
                    datatype: "json",
                    "datafields": [
                        { name: 'fieldName'  },
                        { name: 'category'   },
                        { name: 'typeName'   },
                        { name: 'required'   },
                        { name: 'position'   },
                        { name: 'desc'       } ,
                        { name: 'otherName'  }
                    ]
                    ,width : 900
                    ,editable:editAble
                    ,pageable:false
                    ,showstatusbar:false
                    ,toolbarheight:0
                    ,autoheight:false
                    ,addrow: function (rowid, rowdata, position, commit) {
                        commit(true);
                    }
                    ,deleterow: function (rowid, commit) {
                        commit(true);
                    }
                });
                outputFunc();
                var requiredText = function(row,column,value){
                    if(value=='1'){
                        return "必须";
                    }else if(value=='0'){
                        return "非必须";
                    }
                };
                var elementInfoChange = function (row, column, columntype, oldvalue, newvalue) {
                    var len = flist.length;
                    for(var i=0;i<len;i++){
                        var obj = flist[i];
                        if(obj.name==newvalue){
                            $(".uitable3").jqxGrid('setcellvalue', row, "desc",obj.description);
                            $(".uitable3").jqxGrid('setcellvalue', row, "typeName",obj.typeName);
                            $(".uitable3").jqxGrid('setcellvalue', row, "category",obj.category);
                            $(".uitable3").jqxGrid('setcellvalue', row, "otherName",obj.name);
                        }
                    }
                    return newvalue;
                };
                _compileGrid.setColumns([
                    { text: '属性', datafield: 'fieldName', width:'30%',editable: true ,columntype:'dropdownlist',
                        createeditor: function (row, column, editor) {
                            editor.jqxDropDownList({source: dropDataAdapter, displayMember: "name", valueMember: "id",
                                renderer: function (index, label, value) {
                                    var datarecord = flist[index];
                                    var table = '<table style="min-width: 150px;"><tr><td style="width: 55px;" align="left">' + datarecord.name + '</td><td align="right">' + datarecord.typeName + '</td></tr></table>';
                                    return table;
                                }});
                        },cellvaluechanging:elementInfoChange},
                    { text: '类型', datafield: 'typeName', width:'15%',editable: false },
                    { text: '类别', datafield: 'category', width:'15%',editable: false },
                    { text: '是否必须', datafield: 'required', width:'10%',columntype:'dropdownlist',
                        createeditor: function (row, column, editor) {
                            var list = ['必须', '非必须'];
                            editor.jqxDropDownList({ source: list });
                        }
                    },
                    { text: '位置', datafield: 'position', width:'5%', cellsalign: 'right' },
                    { text: '描述', datafield: 'desc' , width:'15%', cellsalign: 'right' },
                    { text: '别名', datafield: 'otherName', width:'10%' }
                ]);
                _compileGrid.doCompile();
            });
        });
    }]);
