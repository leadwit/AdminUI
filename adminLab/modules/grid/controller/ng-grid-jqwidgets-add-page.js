(function($) {
    var ngmod = angular.module("framework.controllers", []);

    ngmod.controller("pageCtrl",function($scope,$rootScope){

        $scope.abc = "aaaa";

        //modal_onLoad是父controller里的虚方法（面向对象里类的概念）。
        // 在这里的实际中是父controller里调用$rootScope.modal_onLoad，在子controller里提供modal_onLoad，并写入到$rootScope中。
        $rootScope.modal_onLoad = function(config){
            console.info("modal_onLoad",window.location.href,config);
            $scope.data = config.data;

            //添加提交按钮的处理事件
            config.onSubmitForModal(function(){
                console.log("窗口内的提交事件");
                config.resultData = {id:10000,msg:"回传数据"};

                return true;
            });
        }



    });

})(jQuery);