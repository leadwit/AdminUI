(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.simpleDataService"]);

    ngmod.controller("simpleDataList",function($scope,simpleDataRES){
        $scope.gridUrl = framework.getFinalURL('simple/list.do?method=list','api/simpleData.json');
        $scope.search = function(){
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        }
        $scope.search2 = function($event){
            if ($event.keyCode != 13) {
                return;
            }
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        }
    });


})(jQuery);