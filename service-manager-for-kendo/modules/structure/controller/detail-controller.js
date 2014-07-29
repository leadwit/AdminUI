framework.angular.controllers.controller("structureUpdateCtrl",function($scope,structureRES){
    structureRES.get({
        method:"detail",
        id :$.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        //$scope.projectFields =projects.model.fields;
        var dataSource = {
            data: projects.model.fields,
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
    });
});