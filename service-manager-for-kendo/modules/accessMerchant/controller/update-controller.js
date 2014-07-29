framework.angular.controllers.controller("accessMerchantUpdateCtrl",function($scope,$rootScope,accessMerchantRES){
    accessMerchantRES.get({
        method:"detail",
        id :$.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;
        $rootScope.loading = false;      //返回数据，关闭显示loading
    });


    $scope.save = function(invalid) {
        if(invalid){
            alert('错误!必填信息不能为空,请检查表单项!');
            return;
        }
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        accessMerchantRES.save({'method':"update"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
                $rootScope.loading = false;      //返回数据，关闭显示loading
            }
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;      //返回数据，关闭显示loading
        });
    };
})