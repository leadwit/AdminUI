(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.systemParamService"]);
    ngmod.controller("systemParamAddCtrl",function($scope,systemParamRES,systemParamTRES){
        $scope.project = new Object();
        $scope.project.status="1";
        $scope.project.required="1";
        $scope.project.direction="0";

        systemParamTRES.get({
            method:"tlist",
            category : "SIMPLE"
        }, function(project) {
            $scope.typeList = project.models;
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('错误信息：必填信息不能为空,请检查表单项!');
                return;
            }
            systemParamRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('温馨提示：操作成功');
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };
    });

})(jQuery);