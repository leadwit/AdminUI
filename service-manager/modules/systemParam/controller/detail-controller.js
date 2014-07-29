(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.systemParamService"]);

    ngmod.controller("systemParamDetailCtrl",function($scope,systemParamRES){
        systemParamRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
        });
    });
})(jQuery);