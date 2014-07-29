(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.fieldDataService"]);

    ngmod.controller("fieldDataDetailCtrl",function($scope,fieldDataRES,fieldDataTRES){
        fieldDataRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
        });
        fieldDataTRES.get({
            method:"tlist"
        },function(project) {
            $scope.typeList= project.models;
        });

    });
})(jQuery);