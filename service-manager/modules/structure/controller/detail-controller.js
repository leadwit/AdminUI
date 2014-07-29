(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.structureService"]);
    ngmod.controller("structureUpdateCtrl",function($scope,structureRES){
        structureRES.get({
            method:"detail",
            id :$.query.get("id")
        }, function(projects) {
            $scope.project = projects.model;
            $scope.projectFields =projects.model.fields;

        });

    });


})(jQuery);