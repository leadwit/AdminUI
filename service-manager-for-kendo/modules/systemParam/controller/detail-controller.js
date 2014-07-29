framework.angular.controllers.controller("systemParamDetailCtrl",function($scope,systemParamRES){
    systemParamRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;
    });
});