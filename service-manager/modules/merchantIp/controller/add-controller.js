(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantIpService"]);
    ngmod.controller("merchantIpAddCtrl",function($scope,merchantIpRES){
        $scope.project = new Object();
        merchantIpRES.get({
            method:"getClient"
        }, function(projects) {
            $scope.project=projects.model;
            $scope.project.status="1";
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('错误信息：必填信息不能为空,请检查表单项!');
                return;
            }
            merchantIpRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('温馨提示：操作成功');
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };
    });

})(jQuery);