(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantIpService"]);
    ngmod.controller("merchantIpUpdateCtrl",function($scope,merchantIpRES){
        merchantIpRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(projects) {
            $scope.project = projects.model;
        });
        $scope.save = function(invalid) {
            if(invalid){
                alert('错误!必填信息不能为空,请检查表单项!');
                return;
            }
            $scope.project.opType="1";
            merchantIpRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('操作成功');
                    location.href="list.shtml";
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };
    });

})(jQuery);