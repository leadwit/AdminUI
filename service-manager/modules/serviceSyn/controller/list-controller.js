(function(jQuery) {
    var ngmod = angular.module("framework.controllers", ["framework.serviceSynService"]);

    ngmod.controller("serviceSynList",function($scope,$rootScope,serviceSynRES){
        var url = framework.getFinalURL('serviceSyn/info.do?method=list','api/serviceSyn.json');
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
        //关闭同步
        $scope.close = function(){
            var _data = getSelectedData();
            if(_data){
                serviceSynRES.get({
                    method:"syn",
                    id : _data.id
                }, function(project) {
                    if(true){
                        alert('关闭同步成功');
                        $scope.grid1.reload();
                    }else{
                        alert(project.message);
                    }
                });
            }
        };
        //打开同步
        $scope.open = function(){
            var _data = getSelectedData();
            if(_data){
                serviceSynRES.get({
                    method:"syn",
                    id : _data.id
                }, function(project) {
                    if(true){
                        alert('打开同步成功');
                        $scope.grid1.reload();
                    }else{
                        alert(project.message);
                    }
                });
            }
        };

        //单笔同步
        $scope.single = function(){
            var _data = getSelectedData();
            if(_data){
                serviceSynRES.get({
                    method:"syn",
                    id : _data.id
                }, function(project) {
                    if(true){
                        alert('单笔同步成功');
                        $scope.grid1.reload();
                    }else{
                        alert(project.message);
                    }
                });
            }
        };
        //全部同步.
        $scope.all = function(){
            serviceSynRES.get({
                method:"syn"            //TODO：原方法里是有传ID的，应该是错的。这里将ID去掉了，但也不一定是对的。  linwenlong on 20130923
            }, function(project) {
                if(true){
                    alert('全部同步成功');
                    $scope.grid1.reload();
                }else{
                    alert(project.message);
                }
            });
        };

    });


})(jQuery);