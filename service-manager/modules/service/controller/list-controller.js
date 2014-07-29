(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.serviceService"]);

    ngmod.controller("serviceList",function($scope,$rootScope,serviceRES){
        var url = framework.getFinalURL('service/info.do?method=list','api/service.json');
        $scope.gridUrl=url;     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911
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


        var getSelectedData = function (){
            var data = $scope.grid1.getSelectedRowData();
            if(!data){
                alert("请选择要操作的记录");
                return false;
            }
            return data;
        }
        $scope.update = function(){
            var _data = getSelectedData();
            if(_data){
                location.href='update.shtml?id='+_data.id;
            }
        }
        $scope.copy = function(){
            var _data = getSelectedData();
            if(_data){
                location.href='copy.shtml?id='+_data.id;
            }
        }
        $scope.del = function(){
            var _data = getSelectedData();
            if(_data){
                if(confirm('您确定要删除吗？')){
                    serviceRES.get({
                        method:"delete",
                        id : _data.id
                    }, function(project) {
                        if(true){
                            alert('操作成功');
                            $scope.grid1.reload();
                        }else{
                            alert(project.message);
                        }
                    });
                }
            }
        }

    });


})(jQuery);