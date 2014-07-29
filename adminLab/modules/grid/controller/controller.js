    /**
     * 使用jqWidgets组件的全功能Grid演示
     */
    framework.angular.controllers.controller("gridListCtrl",function($scope,gridCRUDRES){
        //实例化Grid组件
        var _compileGrid = new $scope.compileGrid({
            uigrid:"#thegrid"
            ,url:"api/grid.json"
            ,"datafields":[
                { name: 'id' },
                { name: 'name'},
                { name: 'loginName'},
                { name: 'categoryName'},
                { name: 'methodName' },
                { name: 'methodVersion' },
                { name: 'startDate'},
                { name: 'endDate'},
                { name: 'status'},
                { name: 'description'},
                { name: 'createTime'},
                { name: 'createBy'}
            ]
            ,pageable:true
            ,showtoolbar:true
            ,showstatusbar:true                            //是否显示底部状态栏
            ,renderstatusbar: function (statusbar) {        //底部状态栏的按钮显示与事件处理
                //删除按按事件
                var bt_del = function(){
                    var index =  _compileGrid.gridObj.jqxGrid('selectedrowindex');
                    if(index <0){
                        $.messager.alert('提示信息','选择待删除的行');
                    }else{
                        var value =  _compileGrid.gridObj.jqxGrid('getcellvalue', index, "id");
                        $.messager.confirm('提示信息', '您确定要删除吗？', function(r){
                            if (r){
                                gridCRUDRES.get({
                                    method:"delete",
                                    id : value
                                }, function(project) {
                                    if(true){
                                        $.messager.alert('提示信息','操作成功','success');
                                        _compileGrid.reload();
                                    }else{
                                        $.messager.alert('操作失败',project.message,'error');
                                    }
                                });
                            }
                        });
                    }
                }
                //复杂按钮事件
                var bt_copy = function(){
                    var index =  _compileGrid.gridObj.jqxGrid('selectedrowindex');
                    if(index <0){
                        $.messager.alert('提示信息','选择待复制的行');
                    }else{
                        var value =  _compileGrid.gridObj.jqxGrid('getcellvalue', index, "id");
                        window.location.href="#/gridCRUD/copy/"+value;
                    }
                };
                //修改按钮事件
                var bt_update = function(){
                    var index =  _compileGrid.gridObj.jqxGrid('selectedrowindex');
                    if(index <0){
                        $.messager.alert('提示信息','选择待修改的行');
                    }else{
                        var value =  _compileGrid.gridObj.jqxGrid('getcellvalue', index, "id");
                        window.location.href="#/gridCRUD/update/"+value;
                    }
                };
                var container = $( _compileGrid.uigrid+ "-statusbar").tmpl();    //按钮的容器
                $(".J_bt_del",container).click(function(){ bt_del() });
                $(".J_bt_cp",container).click(function(){ bt_copy()});
                $(".J_bt_up",container).click(function(){ bt_update()});
                statusbar.append(container);
            }
        });
        //设置Grid各列
         _compileGrid.setColumns([
            { text: '名称', datafield: 'name', width: "7%"},
            { text: '帐号', datafield: 'loginName', width: "7%"},
            { text: '类别', datafield: 'categoryName', width: "8%"},
            { text: '方法', datafield: 'methodName', width: "10%"},
            { text: '版本', datafield: 'methodVersion', width: "3%"},
            { text: '生效时间', datafield: 'startDate', width: "8%"},
            { text: '结束时间', datafield: 'endDate', width: "8%"},
            { text: '状态', datafield: 'status', width: "8%" ,cellsrenderer: function(row, column, value){
                //这部分是相应列的字段值显示转换处理。即将0，1的值转换为文本显示
                if(value=='1'){
                    return "有效";
                }else if(value =='0'){
                    return "无效/作废";
                }
            }},
            { text: '描述', datafield: 'description', width: "15%" },
            { text: '创建时间', datafield: 'createTime', width: "10%" },
            { text: '创建人', datafield: 'createBy', width: "8%" },
            { text: '详情', datafield: 'id', width: "8%",cellsrenderer:_compileGrid.cellManage  }
        ]);
        _compileGrid.doCompile();        //编译执行Grid
    });

    /**
     * 演示最简单Grid的调用
     */
    framework.angular.controllers.controller("baseListCtrl",function($scope,gridCRUDRES){

            //实例化Grid组件
            var _compileGrid = new $scope.compileGrid({
                url:"api/grid.json"
                ,"datafields":[
                    { name: 'id' },
                    { name: 'name'},
                    { name: 'loginName'},
                    { name: 'categoryName'},
                    { name: 'methodName' },
                    { name: 'methodVersion' },
                    { name: 'startDate'},
                    { name: 'endDate'},
                    { name: 'status'},
                    { name: 'description'},
                    { name: 'createTime'},
                    { name: 'createBy'}
                ]
                ,
                columns:[
                    { text: '名称',       datafield: 'name',           width: "7%"},
                    { text: '帐号',       datafield: 'loginName',     width: "7%"},
                    { text: '类别',       datafield: 'categoryName',  width: "8%"},
                    { text: '方法',       datafield: 'methodName',    width: "10%"},
                    { text: '版本',       datafield: 'methodVersion', width: "3%"},
                    { text: '生效时间',   datafield: 'startDate',     width: "8%"},
                    { text: '结束时间',   datafield: 'endDate',       width: "8%"},
                    { text: '状态',       datafield: 'status',         width: "8%"},
                    { text: '描述',       datafield: 'description',   width: "15%" },
                    { text: '创建时间',   datafield: 'createTime',    width: "10%" },
                    { text: '创建人',     datafield: 'createBy',      width: "16%" }
                ]
            });
            _compileGrid.doCompile();        //编译执行Grid
        });

    /**
     * KendoUI Grid演示
     */
    framework.angular.controllers.controller("kendoListCtrl",function($scope,gridCRUDRES){
        $(".kendo-grid,#thegrid").kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: "api/grid.json"
                },
                schema: {
                    total:"totalRows",
                    data:"models",
                    model: {
                        fields: {
                            id: { type: "number" },
                            name: { type: "string" },
                            categoryName: { type: "string" },
                            status:{type: "number"},
                            createTime:{type: "date"}
                        }
                    }
                },
                pageSize: 20,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 430,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [
                {
                    field:"id",
                    filterable: false
                },
                {
                    field:"name"
                },
                {
                    field: "createTime",
                    title: "create Time",
                    width: 120,
                    format: "{0:MM/dd/yyyy}"
                }
                , {
                    field: "status",
                    title: "状态",
                    template: function(dataItem) {
                        if(dataItem.status=='1'){
                            return "有效";
                        }else if(dataItem.status =='0'){
                            return "无效/作废";
                        }
                    }
                }
                ,
                {
                    field:"categoryName",
                    width: 200
                }
            ]
        });
    });

    framework.angular.controllers.controller("angularListCtrl",function($scope,$rootScope,gridCRUDRES){
        //console.log("angularListCtrl",$scope.jqxGrid);
        $scope.gridUrl="api/grid.json";     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911

        $scope.testWatch = [{id:"1",name:"test"}];

        //覆盖组件内部的实现，当Grid编译和绑定完数据后，执行某项事务;
        //onComplete是默认名字，Grid组件将直接调用。如果不使用这个名字（如在多个Grid时），可以在HTML属性中指定。
        $scope.onComplete = function(grid) {
            //grid：是回传的当前的grid对象
            console.info($scope.grid1.id," onComplete");
        }

        $scope.search = function(){
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        }
        $scope.search2 = function($event){
            if ($event.keyCode != 13) {
                return;
            }
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        }

        $scope.del = function(){
            $scope.testWatch = [{id:"2",name:"test2"}];
        }
    });

    framework.angular.controllers.controller("ngKendoGridCtrl",function($scope,gridCRUDRES){
        //console.log("ngKendoGridCtrl",$scope.kendoGrid);
        $scope.gridUrl="api/grid.json";

        $scope.onComplete = function(grid) {
            //grid：是回传的当前的grid对象
            console.info($scope.grid2.id," onComplete");
        }

        $scope.copy = function(){
            console.log("copy");
        }


    });
