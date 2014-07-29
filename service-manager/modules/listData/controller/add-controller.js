(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.listDataService"]);

    ngmod.controller("listDataAddCtrl",function($scope,listDataRES,listDataTRES){
        $scope.project = new Object();
        $scope.project.status="1";
        $scope.project.opType="1";
        $scope.project.synProduct="0";

        listDataTRES.get({
            method:"tlist"
        }, function(project) {
            $scope.typeList = project.models;
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('错误！必填信息不能为空,请检查表单项!');
                return;
            }
            listDataRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('温馨提示：操作成功');
                    location.href="list.shtml";
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };
    });

})(jQuery);