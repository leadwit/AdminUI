framework.angular.controllers.controller("category.detail",function($scope,categoryRES){
    categoryRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(categoryProject) {
        $scope.project = categoryProject.model;
    });
});