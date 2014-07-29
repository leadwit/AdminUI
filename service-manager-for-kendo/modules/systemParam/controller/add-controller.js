framework.angular.controllers.controller("systemParamAddCtrl",function($scope,systemParamRES,systemParamTRES){
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
        $scope.project.opType="1";
        systemParamRES.save({'method':"save"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('温馨提示：操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
        }, function (err) {
            alert('服务器端返回错误，提交失败');
        });
    };
});