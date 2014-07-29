(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantCertService"]);

    ngmod.controller("merchantCertDetailCtrl",function($scope,merchantCertRES){
        merchantCertRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
        });
    });
})(jQuery);