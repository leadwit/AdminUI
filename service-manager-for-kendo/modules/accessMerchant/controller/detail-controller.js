framework.angular.controllers.controller("accessMerchantDetailCtrl",function($scope,accessMerchantRES){
    accessMerchantRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;
    });
});