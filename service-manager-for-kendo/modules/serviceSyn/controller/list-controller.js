framework.angular.controllers.controller("serviceList",function($scope,$rootScope,serviceRES,service_doc_RES){
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


    var getSelectedAllData = function (grid){
        var data = grid.getSelectedAllRowData();
        if(!data){
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
            //删除操作
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
                location.href="../../../doc/api.do?method=exp&ids="+ids+"&impDataType=S";
            }
        }
    }
    //导出
    $scope.leadingIn=function()
    {
        location.href='list-upload-new.shtml';
    }



});