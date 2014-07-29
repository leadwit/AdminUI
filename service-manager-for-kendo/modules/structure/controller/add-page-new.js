framework.angular.controllers.controller("pageCtrl",function($scope,$rootScope,structureFlistRES,categoryListRES){
    $rootScope.loading = false;     //关闭loading提示
    $scope.flistData = null;
    $scope.selFlist=null ;
    //页面数据，回传数据
    //modal_onLoad是父controller里的虚方法（面向对象里类的概念）。
    // 在这里的实际中是父controller里调用$rootScope.modal_onLoad，在子controller里提供modal_onLoad，并写入到$rootScope中。
    $rootScope.modal_onLoad = function(config){
        $scope.data = config.data;
        if(config.data.rowsNum || config.data.rowsNum==0)
        {
            $(".J_position").val(config.data.rowsNum);
        }
        if(config.data.rowData)
        {
            $scope.flistData = config.data.rowData;
            $scope.selFlist = config.data.rowData.fieldName;
            var radiosel =$scope.flistData.category;
            $(".J_radio[value='"+radiosel+"']").attr("checked",true);
            $(".J_keyWord").val($scope.selFlist);
            $(".J_position").val($scope.flistData.position);
        }
        //添加提交按钮的处理事件
        config.onSubmitForModal(function(){
            if(!$scope.flistData)
            {
                alert("请输入相关数据");
                return false;
            }
            $scope.flistData.required  =$(".J_isMust option:checked").text();
            $scope.flistData.position = $(".J_position").val();
            if(!$scope.flistData.fieldName)
            {
                alert("属性名字不能为空");
                return false;
            }

            if(isNaN($(".J_position").val()))
            {
                alert("请输入正确的位置(位置为整数)");
                return false;
            }
            if(!$scope.flistData.desc)
            {
                alert("描述不能为空");
                return false;
            }
            config.resultData = $scope.flistData;
            return true;
        });

    }
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
        //console.log(flistjson);
        $scope.flistData = flistjson[0];
        $scope.flistData.fieldName=flistjson[0].name;
        //$scope.flistData.desc=flistjson[0].description;
        $scope.flistData.otherName =flistjson[0].name;
        $scope.flistData.required=$(".J_isMust option:checked").text();
        $scope.flistData.position= $(".J_position").val();

        //console.log("选择22，",flistjson[0].description,"model", $scope.flistData.desc);
        //$scope.flistData.position= $scope.data.rowsNum;
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
                        filter: "contains",
                        change:function(){
                            if(!this.value())
                            {
                                return false;
                            }
                            var _data = Enumerable.From(categoryList.models)
                                .Where("$.id == "+ this.value())
                                .ToArray();

                            $scope.flistChange(_data);

                            $(".J_position").val($scope.flistData.position);
                            $(".J_desc").val(_data[0].description);
                            $(".J_otherName").val(_data[0].name);
                        }
                    });
                    var combobox = $("#J_SIMPLE_SEL").data("kendoComboBox");

                    var _data = Enumerable.From(categoryList.models)
                        .Where("$.id == "+ combobox.value())
                        .ToArray();

                    $scope.flistChange(_data);

                    $(".J_position").val($scope.flistData.position);
                    $(".J_desc").val(_data[0].description);
                    $(".J_otherName").val(_data[0].name);
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

                    $(".J_position").val($scope.flistData.position);
                    $(".J_desc").val(_data[0].description);
                    $(".J_otherName").val(_data[0].name);
                }
            }

        });
    }
});