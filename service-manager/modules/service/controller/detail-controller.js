(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.serviceService"]);
    ngmod.controller("serviceDetailCtrl",function($scope,serviceRES){
        serviceRES.get({
            method:"detail",
            id :$.query.get("id")
        }, function(projects) {
            $scope.project = projects.model;
            $scope.projectFields =projects.model.inputList;
            $scope.projectFieldsOut =projects.model.outputList;

        });
    });

})(jQuery);