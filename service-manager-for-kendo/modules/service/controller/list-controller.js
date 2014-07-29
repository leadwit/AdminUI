framework.angular.controllers.controller("serviceList",function($scope,$rootScope,serviceRES){
    var url = framework.getFinalURL('service/info.do?method=list','api/service.json?1=1');
    $scope.gridUrl=url;     //这里演示的是从Angular的controller中输入url参数，在HTML中也是可以的     LinWenLong on 20130911
    $scope.search = function(){
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.loadUrl(url);
    }
    $scope.search2 = function($event){
        if ($event.keyCode != 13) {
            return;
        }
        var url = $scope.gridUrl+ "&" + $(".J_toolbar :input","#"+$scope.grid1.id).serialize();
        $scope.grid1.loadUrl(url);
    }


    var getSelectedData = function (grid){
        var data = grid.getSelectedRowData();
        if(!data){
            alert("请选择要操作的记录");
            return false;
        }
        if(data.length>1){
            alert("请不要选择多条记录");
            return false;
        }
        return data;
    }
    $scope.update = function(){
        var _data = getSelectedData($scope.grid1);
        if(_data){
            location.href='update.shtml?id='+_data.id;
        }
    }
    $scope.copy = function(){
        var _data = getSelectedData($scope.grid1);
        if(_data){
            location.href='copy.shtml?id='+_data.id;
        }
    }
    // 删除delete
    $scope.del=function()
    {
        var _data = getSelectedData($scope.grid1);
        if(_data){
            //删除操作
            if ( confirm('您确定要删除吗？')){
                serviceRES.get({
                    method:"delete",
                    id : _data.id
                }, function(project) {
                    if(true){
                        alert('操作成功');
                        location.reload();
                    }else{
                        alert('操作失败,'+project.respDesc);
                    }
                });
            }
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

    //导入、导出
    var getSelectedAllData = function (grid){
        var data = grid.getSelectedAllRowData();
        if(!data){
            alert("请选择要操作的记录");
            return false;
        }
        if(data.length<=0){
            alert("请选择要操作的记录");
            return false;
        }
        return data;
    }
    // 导出
    $scope.leadingOut=function()
    {
        var _data = getSelectedAllData($scope.grid1);
        if(_data.length>0){
            //导出操作
            if ( confirm('您确定要导出您选择的数据吗？')){
                var ids="";
                for (i=0;i<_data.length;i++)
                {
                    if(i>0)
                    {
                        ids+=",";
                    }
                    ids+=_data[i].id;
                }
                location.href="../../../doc/api.do?method=exp&ids="+ids+"&expDataType=S";
            }
        }
    }
    //导出
    $scope.leadingIn=function()
    {
        if ( confirm('您确定要导入数据？')){
           location.href='list-upload-new.shtml';
        }
    }

});