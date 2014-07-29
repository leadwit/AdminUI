framework.angular.controllers.controller("merchantApiList",function($scope,merchantApiRES){
    var url = framework.getFinalURL('merchant/api.do?method=list','api/merchantApi.json?1=1');
    $scope.gridUrl=url;     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911

    $scope.search = function(){
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.selector.loadUrl(url);
    };
    $scope.search2 = function($event){
        if ($event.keyCode != 13) {
            return;
        }
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.loadUrl(url);
    };
    var getSelectedData = function (grid){
        var data = grid.getSelectedRowData();
        if(!data){
            alert("请选择要操作的记录");
            return false;
        }
        return data;
    }
    // 删除delete
    $scope.delete=function()
    {
        var _data = getSelectedData($scope.grid1);
        if(_data){
            //删除操作
            if ( confirm('您确定要删除吗？')){
                merchantApiRES.get({
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
        var _data = getSelectedData($scope.grid1);
        if(_data){
            location.href='update.shtml?id='+_data.id;
        }
    }
    //复制
    $scope.copy = function(){
        var _data = getSelectedData($scope.grid1);
        if(_data){
            location.href='copy.shtml?id='+_data.id;
        }
    }
    //Grid双击修改
    $scope.onInitialized = function(grid) {
        //grid：是回传的当前的grid对象
        grid.dbclick(function(event){
            var _data = getSelectedData($scope.grid1);
            if(_data){
                location.href='update.shtml?id='+_data.id;
            }
        });
    }
});