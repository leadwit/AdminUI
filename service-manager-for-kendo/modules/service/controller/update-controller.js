framework.angular.controllers.controller("serviceUpCtrl",function($scope,serviceRES){
    serviceRES.get({
        method:"detail",
        id :$.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        //$scope.projectFields = projects.model.inputList;
        var dataSource = {
            data: projects.model.inputList,
            schema: {
                model: {
                    fields: {
                        position: { type: 'number' }
                    }
                }
            },
            sort: { field: "position", dir: "asc" }
        };
        $scope.projectFields = dataSource;

        var dataSource2 = {
            data: projects.model.outputList,
            schema: {
                model: {
                    fields: {
                        position: { type: 'number' }
                    }
                }
            },
            sort: { field: "position", dir: "asc" }
        };
        $scope.projectFieldsOut = dataSource2;

    });
     serviceRES.get({
            method:"clist"
         }, function(categoryProject) {
             $scope.categoryList = categoryProject.models;
    });

    $scope.save = function(invalid) {
        if(invalid){
            alert('请检查表单项!');
            return;
        }
        var entityGrid = $scope.grid1.selector.data("kendoGrid");
        var data = entityGrid.dataSource.data();
        var entityGrid2 = $scope.grid2.selector.data("kendoGrid");
        var data2 = entityGrid2.dataSource.data();

        $scope.project.inputList=new Array();
        $scope.project.outputList=new Array();
        for(var i=0;i<data.length;i++){
            var obj = new Object();
            obj.fieldName = data[i].fieldName;
            obj.required = data[i].required;
            obj.position = data[i].position;
            obj.otherName = data[i].otherName;
            obj.desc = data[i].desc;
            obj.typeName = data[i].typeName;
            obj.category = data[i].category;
            obj.typeId = data[i].typeId;
            if(obj.fieldName===null||obj.fieldName===""){
                alert('属性名称不能为空');
                return;
            }
            if(obj.position===null||obj.position===""){
                alert('位置不能为空');
                return;
            }
            if(obj.typeName===null||obj.typeName===""){
                alert('类型不能为空');
                return;
            }
//            $scope.project.fields.usedToTest = data[i].required;
//            $scope.project.fields.typeVo = data[i].required;
            $scope.project.inputList[i] =  obj;
        }
        for(var i=0;i<data2.length;i++){
            var obj2 = new Object();
            obj2.fieldName = data2[i].fieldName;
            obj2.required = data2[i].required;
            obj2.position = data2[i].position;
            obj2.otherName = data2[i].otherName;
            obj2.desc = data2[i].desc;
            obj2.typeName = data2[i].typeName;
            obj2.category = data2[i].category;
            obj2.typeId = data2[i].typeId;
            if(obj2.fieldName===null||obj2.fieldName===""){
                alert('属性名称不能为空');
                return;
            }
            if(obj2.position===null||obj2.position===""){
                alert('位置不能为空');
                return;
            }
            if(obj2.typeName===null||obj2.typeName===""){
                alert('类型不能为空');
                return;
            }
//            $scope.project.fields.usedToTest = data2[i].required;
//            $scope.project.fields.typeVo = data2[i].required;
            $scope.project.outputList[i] =  obj2;
        }

        var arr_position_in = [];
        var arr_position_out = [];
        for(var i =0;i<$scope.project.inputList.length;i++){
            arr_position_in.push($scope.project.inputList[i].position);
        }
        for(var i =0;i<$scope.project.outputList.length;i++){
            arr_position_in.push($scope.project.outputList[i].position);
        }
        var arr_re_position_in=$scope.validateposition(arr_position_in);
        var arr_re_position_out=$scope.validateposition(arr_position_out);

        if(arr_re_position_in.length>0 && arr_re_position_out.length>0){
            alert("输入参数列表输入有误,请输入位置为 "+arr_re_position_in.toString()+" 的内容;\n" +
                  "输出参数列表输入有误,请输入位置为 "+arr_re_position_out.toString()+" 的内容");
            return false;
        }
        else if(arr_re_position_in.length>0){
            alert("输入参数列表输入有误,请输入位置为 "+arr_re_position_in.toString()+" 的内容");
            return false;
        }
        else if(arr_re_position_out.length>0){
            alert("输出参数列表输入有误,请输入位置为 "+arr_re_position_in.toString()+" 的内容");
            return false;
        }

            $scope.project.opType="2";
        serviceRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                location.href="list.shtml"
            }else {
                alert(project.respDesc);
            }
        }, function (err) {
            alert('服务器端返回错误，提交失败');
        });
    };

    //覆盖组件内部的实现，当Grid编译和绑定完数据后，执行某项事务;
    //onInitialized是默认名字，Grid组件将直接调用。如果不使用这个名字（如在多个Grid时），可以在HTML属性中指定。
    $scope.onInitialized = function(grid) {
        //grid：是回传的当前的grid对象
        grid.dbclick(function(event){
            var rowCount =  grid.selector.data("kendoGrid").dataSource.data().length;
            var dataRow =grid.getSelectedRowData(0);
            $scope.openModal({
                title:"修改信息"
                ,remote: $scope.MODULE_PATH +"service/add-page-new.shtml"
                ,width:680
                ,height:350
                ,data:{
                    //传过去的数据
                    rowsNum: rowCount,
                    rowData:dataRow
                }
                ,onSubmit:function(modalConfig){
                    //这里加关闭窗口操作
                    var grid_ =   grid.selector.data("kendoGrid");
                    grid_.dataSource.remove(dataRow);
                    grid_.dataSource.insert(modalConfig.resultData);

                    var dataSource = {
                        data: grid_.dataSource.data(),
                        schema: {
                            model: {
                                fields: {
                                    position: { type: 'number' }
                                }
                            }
                        } ,
                        sort: { field: "position", dir: "asc" }
                    };
                    var dataSource2 = new kendo.data.DataSource(dataSource);
                    grid_.setDataSource(dataSource2);
                    return true;//返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
                }
            });

        });
    }

    //添加
    $scope.plus = function(){
        var rowCount =  $scope.grid1.selector.data("kendoGrid").dataSource.data().length;
        $scope.openModal({
            title:"添加数据"
            ,remote: $scope.MODULE_PATH +"service/add-page-new.shtml"
            ,width:680
            ,height:350
            ,data:{
                //传过去的数据
                rowsNum: rowCount
            }
            ,onSubmit:function(modalConfig){
                //这里加关闭窗口操作
                var grid =   $scope.grid1.selector.data("kendoGrid");
                grid.dataSource.insert(modalConfig.resultData);

                var dataSource = {
                    data: grid.dataSource.data(),
                    schema: {
                        model: {
                            fields: {
                                position: { type: 'number' }
                            }
                        }
                    } ,
                    sort: { field: "position", dir: "asc" }
                };
                var dataSource2 = new kendo.data.DataSource(dataSource);
                grid.setDataSource(dataSource2);
                return true;//返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
            }
        });
    }
    //删除
    $scope.deleteRow =function(){
        var grid = $scope.grid1.selector.data("kendoGrid");
        var selectedRows = grid.select();
        var dataRow =grid.dataItem(selectedRows[0]);
        $scope.grid1.selector.data("kendoGrid").dataSource.remove(dataRow);
    }
    //添加
    $scope.plusOut = function(){
        var rowCount =  $scope.grid2.selector.data("kendoGrid").dataSource.data().length;

        $scope.openModal({
            title:"添加数据"
            ,remote: $scope.MODULE_PATH +"service/add-page-new.shtml"
            ,width:680
            ,height:350
            ,data:{
                //传过去的数据
                rowsNum: rowCount
            }
            ,onSubmit:function(modalConfig){
                //这里加关闭窗口操作
                var grid =   $scope.grid2.selector.data("kendoGrid");
                grid.dataSource.insert(modalConfig.resultData);

                var dataSource = {
                    data: grid.dataSource.data(),
                    schema: {
                        model: {
                            fields: {
                                position: { type: 'number' }
                            }
                        }
                    } ,
                    sort: { field: "position", dir: "asc" }
                };
                var dataSource2 = new kendo.data.DataSource(dataSource);
                grid.setDataSource(dataSource2);
                return true;//返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
            }
        });
    }
    //删除
    $scope.deleteRowOut =function(){
        var grid = $scope.grid2.selector.data("kendoGrid");
        var selectedRows = grid.select();
        var dataRow =grid.dataItem(selectedRows[0]);
        $scope.grid2.selector.data("kendoGrid").dataSource.remove(dataRow);
    }

    //验证位置，是否为合格的数字,从0开始,递增1,
    $scope.validateposition=function(arr){
        arr.sort();
        var arr_temp = [];
        for(var i=0;i<=arr[arr.length-1];i++)
        {
            arr_temp.push(i);
        }
        var isequ = false;
        var returned = [];
        for(var i = 0 ;i<arr_temp.length;i++){
            for(var j=0;j<arr.length;j++){
                if (arr_temp[i] === arr[j]){
                    isequ = true;
                    break;
                }
            }
            if (!isequ)
            {
                returned.push(arr_temp[i]);
            }
            isequ = false;
        }
        return returned;
    }

});