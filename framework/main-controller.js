//Angular部分=============================================================
angular.element(document).ready(
function() {
    // 启动Angular，并注册所有模块的controller
    angular.bootstrap(document, ['framework']);
});
//创建controllers和directives对象，以免angular启动时找不到对象，同时，便于其他页面做扩展
framework.angular = {};
framework.angular.app = angular.module("framework",['framework.services','framework.controllers','framework.directives']);
framework.angular.services = angular.module("framework.services",['ngResource']);
framework.angular.directives = angular.module("framework.directives",[]);
framework.angular.controllers = angular.module("framework.controllers",['framework.services']).run(['$rootScope',function($rootScope){
    $rootScope.loading = true;      //初始化时，设置显示loading

    /**
     * 安全$Apply方法
     * @param fn
     */
    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    //notic广播测试
    $rootScope.$on("notic",function(event,para){
        if(framework.inIframe){
            console.info("iframe页面的收到广播("+ event.name +")");
        }else{
            console.info("主页面的收到广播("+ event.name +")");
        }

        $rootScope.$apply(para.fun);
        $("#inbox").append("<li>"+para.msg+"</li>");
        $("#inbox-num").text( parseInt($("#inbox-num").text()) + 1 );
    });
    //END
}])
.config(function ($httpProvider){
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
})
.factory('myHttpInterceptor',['$q','$window','$rootScope', function ($q, $window, $rootScope) {
    return function (promise){
        $rootScope.loading = true;
        return promise.then(function (response) {
            $rootScope.loading = false;
            return response;
        }, function (response) {
            $rootScope.loading = false;
            $rootScope.network_error = true;
            return $q.reject(response);
        });
    };
}]);
//----------------------------------------------------------------------------------------------------

//function mainCtrl($rootScope,$scope){
framework.angular.controllers.controller("mainCtrl",function($scope,$rootScope){
    $scope.MODULE_PATH = "kendo-ui/modules/";

    /**
     *  打开模态窗口。对boardcastToGlobal("openModal", para)的封装
     * @param event 广播名称
     * @param para 参数
     */
    $rootScope.openModal = function(para){
        framework.boardcastToGlobal("openModal", para);
    }

    $rootScope.$on("ngGridKendoui_onComplete",function(event,para){
        try{
            uiCompile.init();                //Grid加载完后，渲染UI组件
            //uiCompile.resizeFrame();        //TODO: 这里依赖于uiCompile类，对本js文件造成了污染
        }catch(e){}
    });
    $rootScope.$on("ngGridJqwidgets_onComplete",function(event,para){
        try{
            uiCompile.init();                //Grid加载完后，渲染UI组件
            //uiCompile.resizeFrame();        //TODO: 这里依赖于uiCompile类，对本js文件造成了污染
        }catch(e){}
    });
});

function endCtrlForIframe($rootScope,$scope){

    if(framework.inIframe){
        //console.info("注册广播（modal-init)");
        //当本页面加载完成后，监听调用页面的广播，接收发来的数据。
        $rootScope.$on("modal-init:"+window.location.href,function(event,para){
            if(framework.DEBUG){
                console.log("iframe 收到广播",para);
            }
            if($rootScope.modal_onLoad){
                $rootScope.modal_onLoad(para);
            }
        });

        //框架页面加载完成后，发送广播。这是实现框架之间通讯的关键一步。
        //console.log("endCtrlForIframe 发广播 iframePageLoaded:"+window.location.href);
        framework.boardcastToGlobal("iframePageLoaded:"+window.location.href, {});
        //END
    }

}

