(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.categoryService"]);

    ngmod.controller("category.copy",function($scope,categoryRES){
        categoryRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(categoryProject) {
            $scope.project = categoryProject.model;
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('请检查表单项!');
                return;
            }
            $scope.project.opType="1";
            categoryRES.save({'method':"save"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('操作成功');
                    window.location.href="list.shtml";
                }else {
                    alert(project.respDesc);
                }
            });
        };
    });

})(jQuery);