framework.angular.controllers.controller("fieldDataAddCtrl",function($scope,$rootScope,fieldDataRES,categoryListRES){
    $scope.project = new Object();
    $scope.project.status="1";
    $rootScope.loading = false;      //返回数据，关闭显示loading
    $scope.save = function(invalid) {
        if(invalid){
            alert('错误！必填信息不能为空,请检查表单项!');
            return;
        }
        $scope.project.opType="1";
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        fieldDataRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('温馨提示：操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
            $rootScope.loading = false;      //返回数据，关闭显示loading
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;      //返回数据，关闭显示loading
        });
    };

    //enter
    $scope.search2=function($event){
        if ($event.keyCode != 13) {
            return;
        }
        $scope.QueryKey();
    }
    //选择属性事件
    $scope.flistChange=function(flistjson)
    {
        if(!flistjson)
        {
            return;
        }
        $scope.project.category =   flistjson[0].category;
        $scope.project.typeId = flistjson[0].id;
        $scope.project.typeName = flistjson[0].name;
    };
    //查询
    var tempcombox = 0;
    $scope.QueryKey=function(){
        var keyword=$(".J_keyWord").val();
        if(!keyword)
        {
            alert("请输入关键字进行属性查询!");
            return false;
        }
        //绑定
        categoryListRES.get({
            category:$("input[name=type]:checked").val() ,
            name:keyword
        },function(categoryList){
            $scope.categoryList = categoryList;
            if(categoryList.totalRows!=0)
            {
                if(tempcombox===0)
                {
                    tempcombox=tempcombox+1;
                    $("#J_SIMPLE_SEL").kendoComboBox({
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: categoryList.models,
                        filter: "contains" ,
                        change:function(){
                            if(!this.value())
                            {
                                return false;
                            }
                            var _data = Enumerable.From(categoryList.models)
                                .Where("$.id == "+ this.value())
                                .ToArray();

                            $scope.flistChange(_data);
                        }
                    });
                    var combobox = $("#J_SIMPLE_SEL").data("kendoComboBox");
                    var _data = Enumerable.From(categoryList.models)
                        .Where("$.id == "+ combobox.value())
                        .ToArray();
                    $scope.flistChange(_data);
                }
                else
                {
                    var dataSource = new kendo.data.DataSource({
                        data: categoryList.models
                    });
                    var combobox = $("#J_SIMPLE_SEL").data("kendoComboBox");
                    combobox.setDataSource(dataSource);
                    combobox.select(combobox.ul.children().eq(0));

                    var _data = Enumerable.From(categoryList.models)
                        .Where("$.id == "+ combobox.value())
                        .ToArray();

                    $scope.flistChange(_data);
                }
            }
        });
    }


});