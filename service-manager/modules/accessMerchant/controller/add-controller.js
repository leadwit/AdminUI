(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.accessMerchantService"]);

    ngmod.controller("accessMerchantAddCtrl",function($scope,accessMerchantRES){
        $scope.project = new Object();
        $scope.project.status="1";
        $scope.project.isLimitIp="1";
        $scope.project.isMerchant="1";
        $scope.project.accessType="TCP";
        $scope.project.signatureMode="MD5";
        $scope.save = function(invalid) {
            if(invalid){
                alert('错误！必填信息不能为空,请检查表单项!');
                return;
            }
            accessMerchantRES.save({'method':"add"},$scope.project, function(project) {
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