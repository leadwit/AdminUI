(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.structureService"]);
    ngmod.controller("structureAddCtrl",function($scope,structureRES){
        $scope.project ={};
        $scope.project.synProduct="1";
        $scope.project.status="1";

        $scope.save = function(invalid) {
            if(invalid){
                alert('请检查表单项!');
                return;
            }
            var rowscount =  $scope.grid1.selector.jqxGrid('getdatainformation').rowscount;
            $scope.project.fields = new Array();
            for(var i=0;i<rowscount;i++){
                var obj = new Object();
                obj.fieldName= $scope.grid1.selector.jqxGrid('getcellvalue', i, "name");
                obj.position= $scope.grid1.selector.jqxGrid('getcellvalue', i, "position");
                obj.required= $scope.grid1.selector.jqxGrid('getcellvalue', i, "isMust");
                obj.desc= $scope.grid1.selector.jqxGrid('getcellvalue', i, "description");
                obj.otherName= $scope.grid1.selector.jqxGrid('getcellvalue', i, "alias");
                if(obj.fieldName==null||obj.fieldName==""){
                    alert('属性名称不能为空');
                    return;
                }
                $scope.project.fields[i] = obj;
            }
            $scope.project.opType="1";
            structureRES.save({'method':"save"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('操作成功');
                }else {
                    alert(project.respDesc);
                }
            });
        };

        //覆盖组件内部的实现，当Grid编译和绑定完数据后，执行某项事务;
        //onInitialized是默认名字，Grid组件将直接调用。如果不使用这个名字（如在多个Grid时），可以在HTML属性中指定。
        $scope.onInitialized = function(grid) {
            //grid：是回传的当前的grid对象
            //双击修改
            grid.selector.on('rowdoubleclick', function (event)
            {
                var args = event.args;
                var row = args.rowindex;
                var rowData = $scope.grid1.selector.jqxGrid('getrowdata', row);
                rowData.rowsNum=$scope.grid1.selector.jqxGrid('getdatainformation').rowscount;
                $scope.openModal({
                    title:"修改信息"
                    ,remote: $scope.MODULE_PATH +"structure/add-page.shtml"
                    ,width:680
                    ,height:580
                    ,data:{
                        //传过去的数据
                        rowsNum: rowData.rowsNum,
                        rowData:rowData
                    }
                    ,onSubmit:function(modalConfig){
                        //这里加关闭窗口操作
                        $scope.grid1.selector.jqxGrid('updaterow', row, modalConfig.resultData);
                        return true;//返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
                    }
                });
            });

        }

        //添加
        $scope.plus = function(){
            var count =  $scope.grid1.selector.jqxGrid('getdatainformation').rowscount;
            $scope.openModal({
                title:"添加数据"
                ,remote: $scope.MODULE_PATH +"structure/add-page-new.shtml"
                ,width:680
                ,height:580
                ,data:{
                   rowsNum: count //传过去的数据
                }
                ,onSubmit:function(modalConfig){
                    //这里加关闭窗口操作
                    $scope.grid1.selector.jqxGrid('addrow', null, modalConfig.resultData);
                    return true;//返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
                }
            });
        }
        //删除
        $scope.deleteRow =function(){
            var gridTemp =$scope.grid1;
            var selectedrowindex = gridTemp.selector .jqxGrid('getselectedrowindex');
            var rowscount =gridTemp.selector.jqxGrid('getdatainformation').rowscount;
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = gridTemp.selector.jqxGrid('getrowid', selectedrowindex);
                var commit = gridTemp.selector.jqxGrid('deleterow', id);
            }
        }



    });


})(jQuery);