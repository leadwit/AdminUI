framework.angular.controllers.controller("fieldDataDetailCtrl",function($scope,fieldDataRES){
    fieldDataRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;

        var radiosel =$scope.project.category;
        $(".J_radio[value='"+radiosel+"']").attr("checked",true);
    });
});