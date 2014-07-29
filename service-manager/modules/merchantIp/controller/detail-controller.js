(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantIpService"]);

    ngmod.controller("merchantIpDetailCtrl",function($scope,merchantIpRES){
        merchantIpRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(projects) {
            $scope.project = projects.model;
        });
    });
})(jQuery);