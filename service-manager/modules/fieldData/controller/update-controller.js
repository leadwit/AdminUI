(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.fieldDataService"]);

    ngmod.controller("fieldDataUpdateCtrl",function($scope,fieldDataRES,fieldDataTRES){
        fieldDataRES.get({
            method:"detail",
            id :$.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
        });

        fieldDataTRES.get({
            method:"tlist"
        }, function(project) {
            $scope.typeList = project.models;
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('错误!必填信息不能为空,请检查表单项!');
                return;
            }
            fieldDataRES.save({'method':"update"},$scope.project, function(project) {
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