framework.angular.controllers.controller("simpleDataList",function($scope,simpleDataRES){
    $scope.gridUrl = framework.getFinalURL('simple/list.do?method=list','api/simpleData.json?1=1');
    $scope.search = function(){
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.loadUrl(url);
    }
    $scope.search2 = function($event){
        if ($event.keyCode != 13) {
            return;
        }
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.loadUrl(url);
    }
});