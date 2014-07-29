framework.angular.controllers.controller("accessMerchantAddCtrl",function($scope,$rootScope,accessMerchantRES){
    $rootScope.loading = false;      //返回数据，关闭显示loading
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
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        accessMerchantRES.save({'method':"add"},$scope.project, function(project) {
            $rootScope.loading = false;      //返回数据，关闭显示loading
            if(project.respCode=="00"){
                alert('温馨提示：操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
        }, function (err) {
            $rootScope.loading = false;      //返回数据，关闭显示loading
            alert('服务器端返回错误，提交失败');
        });
    };
});