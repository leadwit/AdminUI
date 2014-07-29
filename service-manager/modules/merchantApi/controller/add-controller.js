(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantApiService"]);
    ngmod.controller("merchantApiAddCtrl",function($scope,$rootScope,merchantApiRES){
        merchantApiRES.get({
            method:"clientList"
        }, function(projects) {
            $scope.project=projects.model;
            $scope.project.status="1";
            $scope.project.serviceDefinitionIds="";
            $scope.gridJson=projects.model.serviceDefinitionVo;
        });


        $scope.save = function(invalid) {
            if(invalid){
                alert('错误信息：必填信息不能为空,请检查表单项!');
                return;
            }
            var tab_scope = angular.element("#portlet_tab2").scope();
            //console.log("回传回来的值：",tab_scope.serviceDefinitionVo)
            var _serviceDefinitionIds=new Array();
            $.each( tab_scope.serviceDefinitionVo, function(i,n){
                _serviceDefinitionIds.push(n.id);
            });
            $scope.project.serviceDefinitionIds=_serviceDefinitionIds;
            merchantApiRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('温馨提示：操作成功');
                    location.href="list.shtml";
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };

        //Grid1数据源
        var url = framework.getFinalURL('service/info.do?method=list','api/merchantApi_service_list.json');
        $scope.gridUrl=url;

        //Grid1搜索
        $scope.search = function(){
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        };
        //Grid1搜索
        $scope.search2 = function($event){
            if ($event.keyCode != 13) {
                return;
            }
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        };



        //选择接口事件
        $scope.copy = function(){
            var _rowindexes = $scope.grid1.selector.jqxGrid('getselectedrowindexes');
            var  rows=[]
            if(_rowindexes.length>0)
            {
                $scope.grid1.selector.jqxGrid('beginupdate');
                for(var i=0;i<_rowindexes.length;i++)
                {
                    var details = $scope.grid1.selector.jqxGrid('getrowdata',_rowindexes[i]);
                    rows.push(details);
                }
                //把被选中的数据插入到已选的Grid2列表
                $scope.grid2.selector.jqxGrid('addrow', null, rows);
                //删除Grid1被选中的行
                $scope.grid1.selector.jqxGrid('deleterow', _rowindexes);
                $scope.grid1.selector.jqxGrid('endupdate');
                $scope.grid1.selector.jqxGrid('clearselection');
            }
            else{
                alert("您没有选择要选得接口！");
            }
        };
        //删除已选择的2
        $scope.delete = function(){
            var _rowindexes = $scope.grid2.selector.jqxGrid('getselectedrowindexes');
            var  rows=[]
            if(_rowindexes.length>0)
            {
                $scope.grid2.selector.jqxGrid('beginupdate');
                //console.log("被删除的行ID", _rowindexes);
                for(var i=0;i<_rowindexes.length;i++)
                {
                    var details = $scope.grid2.selector.jqxGrid('getrowdata',_rowindexes[i]);
                    console.log(" details["+i+"]", details);
                    rows.push(details);
                }
                //把被选中的数据插入到已选的Grid1列表
                $scope.grid1.selector.jqxGrid('addrow', null, rows);
                //删除Grid2被选中的行
                $scope.grid2.selector.jqxGrid('deleterow', _rowindexes);
                $scope.grid2.selector.jqxGrid('endupdate');
                $scope.grid2.selector.jqxGrid('clearselection');
            }
            else
            {
                alert("您没有选择要删除的接口！");
            }

        };
    });

})(jQuery);