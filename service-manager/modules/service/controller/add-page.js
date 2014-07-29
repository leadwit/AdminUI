/**
 * Created with JetBrains WebStorm.
 * User: yuzhechang
 * Date: 13-9-24
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.serviceService"]);

    ngmod.controller("pageCtrl",function($scope,$rootScope,service_clist_FlistRES){
        $scope.abc = "test-data";
        $scope.flistData = null;
        $scope.selFlist=null ;
        //页面数据，回传数据
        //modal_onLoad是父controller里的虚方法（面向对象里类的概念）。
        // 在这里的实际中是父controller里调用$rootScope.modal_onLoad，在子controller里提供modal_onLoad，并写入到$rootScope中。
        $rootScope.modal_onLoad = function(config){
            $scope.data = config.data;
            if(config.data.rowData)
            {
                $scope.flistData = config.data.rowData;
                $scope.selFlist = config.data.rowData.fieldName;
                console.log( $scope.selFlist);
            }
             // $scope.flistData.position = config.data.rowsNum;
            //添加提交按钮的处理事件
            config.onSubmitForModal(function(){
                console.log("窗口内的提交事件");
//              config.resultData = {id:10000,msg:"回传数据"};
                config.resultData = $scope.flistData;
                return true;
            });
        }

        //获取属性数据
        service_clist_FlistRES.get({
        },function(structureFlist){
            $scope.structureFlist=structureFlist;
            console.log(structureFlist);
        });

        //选择属性事件
        $scope.flistChange=function(flistId)
        {
           var flistjson =eval('('+flistId+')');
            $scope.flistData = flistjson;
            $scope.flistData.fieldName=flistjson.name;
            $scope.flistData.desc=flistjson.description;
            $scope.flistData.otherName =flistjson.name;
            $scope.flistData.required=$(".J_isMust option:checked").text();
            $scope.flistData.position= $scope.data.rowsNum;


        }

    });

})(jQuery);