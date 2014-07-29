framework.angular.controllers.controller("serviceDetailCtrl",function($scope,serviceRES){
    serviceRES.get({
        method:"detail",
        id :$.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        var dataSource = {
            data: projects.model.inputList,
            schema: {
                model: {
                    fields: {
                        position: { type: 'number' }
                    }
                }
            },
            sort: { field: "position", dir: "asc" }
        };
        $scope.projectFields = dataSource;

        var dataSource2 = {
            data: projects.model.outputList,
            schema: {
                model: {
                    fields: {
                        position: { type: 'number' }
                    }
                }
            },
            sort: { field: "position", dir: "asc" }
        };
        $scope.projectFieldsOut = dataSource2;

    });
});