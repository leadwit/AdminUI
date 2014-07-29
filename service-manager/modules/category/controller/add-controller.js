(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.categoryService"]);

    ngmod.controller("category.add",function($scope,categoryRES){

        $scope.project = {};
        $scope.project.status="1";
        $scope.project.synProduct="0";
        $scope.project.opType="1";

        $scope.save = function(invalid) {
            if(invalid){
                alert('请检查表单项!');
                return;
            }
            categoryRES.save({'method':"save"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('操作成功');
                }else {
                    alert(project.respDesc);
                }
            });
        };


    });

})(jQuery);