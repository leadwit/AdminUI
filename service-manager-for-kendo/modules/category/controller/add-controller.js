framework.angular.controllers.controller("category.add",function($scope,$rootScope,categoryRES){
    $rootScope.loading = false;      //返回数据，关闭显示loading
    $scope.project = {};
    $scope.project.status="1";
    $scope.project.synProduct="1";
    $scope.project.opType="1";

    $scope.save = function(invalid) {
        if(invalid){
            alert('请检查表单项!');
            return;
        }
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        categoryRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败 '+project.respDesc);
            }
            $rootScope.loading = false;      //返回数据，关闭显示loading
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;      //返回数据，关闭显示loading
        });
    };


});