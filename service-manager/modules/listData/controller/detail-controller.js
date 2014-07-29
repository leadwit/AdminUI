(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.listDataService"]);

    ngmod.controller("listDataDetailCtrl",function($scope,listDataRES,listDataTRES){
        listDataRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
        });
        listDataTRES.get({
            method:"tlist"
        },function(project) {
            $scope.typeList= project.models;
        });

    });
})(jQuery);