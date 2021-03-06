framework.angular.controllers.controller("listDataUpdateCtrl",function($scope,$rootScope,listDataRES,categoryListRES){
    listDataRES.get({
        method:"detail",
        id :$.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;

        //console.log($scope.project);
         var radiosel =$scope.project.elementCategory;
         $(".J_radio[value='"+radiosel+"']").attr("checked",true);
         $(".J_keyWord").val($scope.project.elementName);
        $rootScope.loading = false;     //关闭loading提示
    });


    $scope.save = function(invalid) {
        if(invalid){
            alert('错误!必填信息不能为空,请检查表单项!');
            return;
        }
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        $scope.project.opType="2";
        listDataRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败 '+project.respDesc);
            }
            $rootScope.loading = false;     //关闭loading提示
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;     //关闭loading提示
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

         $scope.project.elementCategory = flistjson[0].category;
         $scope.project.category =   flistjson[0].category;
         $scope.project.elementId = flistjson[0].id;
         $scope.project.elementName = flistjson[0].name;

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