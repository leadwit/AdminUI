framework.angular.controllers.controller("category.update",function($scope,$rootScope,categoryRES){
    categoryRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(categoryProject) {
        $scope.project = categoryProject.model;
        $rootScope.loading = false;      //返回数据，关闭显示loading
    });

    $scope.save = function(invalid) {
        if(invalid){
            alert('请检查表单项!');
            return;
        }
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        $scope.project.opType="2";
        categoryRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                window.location.href="list.shtml";
            }else {
                alert(project.respDesc);
            }
            $rootScope.loading = false;      //返回数据，关闭显示loading
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;      //返回数据，关闭显示loading
        });
    };
});