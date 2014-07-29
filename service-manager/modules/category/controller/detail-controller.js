(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.categoryService"]);

    ngmod.controller("category.detail",function($scope,categoryRES){

        categoryRES.get({
            method:"detail",
            id : $routeParams.id
        }, function(categoryProject) {
            $scope.project = categoryProject.model;
        });

    });

})(jQuery);