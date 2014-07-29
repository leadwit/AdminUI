framework.angular.controllers.controller("merchantIpDetailCtrl",function($scope,merchantIpRES){
    merchantIpRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
    });
});