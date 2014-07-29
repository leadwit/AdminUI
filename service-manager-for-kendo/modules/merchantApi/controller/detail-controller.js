framework.angular.controllers.controller("merchantApiDetailCtrl",function($scope,merchantApiRES){
    merchantApiRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        $scope.$broadcast("allproject",$scope.project);
    });
})
.controller("tab2Ctrl",function($scope){
    $scope.$on("allproject",function(event,data){
        var serviceDefinitionIds=new Array();
        if(data.serviceDefinitionVo!=null)
        {
            serviceDefinitionIds = data.serviceDefinitionVo;
            $scope.serviceDefinitionVo = data.serviceDefinitionVo;
        }
        var dropDataAdapter= new $.jqx.dataAdapter({localdata: serviceDefinitionIds ,datatype: "array"});
        $(".gridselected").jqxGrid({
            width: "100%",
            height:350,
            autoheight:false,
            source: dropDataAdapter,
            theme: "bootstrap",
            sortable: false,
            pagesize:10 ,
            pagesizeoptions: ['10', '20'] ,
            pageable:true,
            showstatusbar:false,
            columns: [
                { text: '类别', datafield: 'category', width:'35%'},
                { text: '方法', datafield: 'methodName', width:'35%' },
                { text: '版本', datafield: 'methodVersion' , width:'30%' }
            ]
        });
    });
});