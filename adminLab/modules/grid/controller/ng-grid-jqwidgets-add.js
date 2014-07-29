framework.angular.controllers.controller("pageCtrl",function($scope,$rootScope){
    $scope.plus = function(){
        //console.log("openModal");
        $scope.openModal({
            title:"添加一行"
            ,remote: $scope.MODULE_PATH +"grid/ng-grid-jqwidgets-add-page.shtml"
            ,width:800
            ,height:600
            ,data:{id:10086}
            ,onSubmit:function(modalConfig){
                //这里加关闭窗口操作
                console.log("提交了。回传的数据:",modalConfig.resultData);

                //modalConfig.$cur.modal("hide");     //关闭窗口操作
                return false;                //返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
            }
        });

    }
});