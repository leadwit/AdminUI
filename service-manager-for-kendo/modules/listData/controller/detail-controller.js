framework.angular.controllers.controller("listDataDetailCtrl",function($scope,listDataRES,listDataTRES){
    listDataRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(detailPproject) {
        $scope.project = detailPproject.model;

        var radiosel =$scope.project.elementCategory;
        $(".J_radio[value='"+radiosel+"']").attr("checked",true);
    });
//    listDataTRES.get({
//        method:"tlist"
//    },function(project) {
//        $scope.typeList= project.models;
//    });
});