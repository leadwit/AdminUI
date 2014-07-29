var ngmod = angular.module("framework.controllers", ["framework.services",'kendo.directives']);
ngmod.controller("angularKendoGridCtrl",["$scope","gridRES",function($scope,gridRES){

    $scope.datas = new kendo.data.DataSource({
        transport: {
            read: function(ops){
                gridRES.get({}, function(db) {
                    console.log(db,db.models);
                    ops.success(db.models);
                });
            }
        }
    });
    $scope.create_click = function(){
        console.log("create_click");
    }

    // to demonstrate event hanlding
    $scope.rowSelected = function(e) {
        var grid = e.sender;
        var selectedRows = grid.select();
        for (var i = 0; i < selectedRows.length; i++) {
            $scope.selectedItem = grid.dataItem(selectedRows[i]);
            break;
        }
    };


}]);