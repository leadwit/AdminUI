framework.angular.controllers.controller("merchantIpUpdateCtrl",function($scope,merchantIpRES){
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
        merchantIpRES.save({'method':"update"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
        }, function (err) {
            alert('服务器端返回错误，提交失败');
        });
    };
});