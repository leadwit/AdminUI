(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.accessMerchantService"]);

    ngmod.controller("accessMerchantList",function($scope,accessMerchantRES){
        var url = framework.getFinalURL('apilist/api.do?method=list','api/accessMerchant.json');
        $scope.gridUrl=url;     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911

        $scope.onInitialized = function(grid) {
            //grid：是回传的当前的grid对象
            console.info(" onInitialized");
        }
        $scope.onComplete = function(grid) {
            //grid：是回传的当前的grid对象
            console.info(" onComplete");
        }

        $scope.search = function(){
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        };
        $scope.search2 = function($event){
            if ($event.keyCode != 13) {
                return;
            }
            var url = $scope.grid1.url.split("?")[0] + "?" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
            $scope.grid1.loadUrl(url);
        };
        var getSelectedData = function (){
            var data = $scope.grid1.getSelectedRowData();
            if(!data){
                alert("请选择要操作的行");
                return false;
            }
            return data;
        }
        // 删除delete
        $scope.delete=function()
        {
            var _data = getSelectedData();
            if(_data){
               //删除操作
                if ( confirm('您确定要删除吗？')){
                    accessMerchantRES.get({
                        method:"delete",
                        id : _data.id
                    }, function(project) {
                        if(true){
                            alert('删除操作成功');
                            location.reload();
                        }else{
                            alert('操作失败'+project.message);
                        }
                    });
                }
            }
        }
        //修改
        $scope.update = function(){
            var _data = getSelectedData();
            if(_data){
                location.href='update.shtml?id='+_data.id;
            }
        }
        //复制
        $scope.copy = function(){
            var _data = getSelectedData();
            if(_data){
                location.href='copy.shtml?id='+_data.id;
            }
        }
    });



})(jQuery);