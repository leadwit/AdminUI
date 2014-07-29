(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.structureService"]);

    ngmod.controller("structureList",function($scope,$rootScope,structureRES){
        $scope.gridUrl="api/structure.json";     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911

        //覆盖组件内部的实现，当Grid编译和绑定完数据后，执行某项事务;
        //onComplete是默认名字，Grid组件将直接调用。如果不使用这个名字（如在多个Grid时），可以在HTML属性中指定。
        $scope.onComplete = function(grid) {
            //grid：是回传的当前的grid对象
            console.info($scope.grid1.id," onComplete");
        }

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