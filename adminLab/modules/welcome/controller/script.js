(function($) {
    $(".J_broadcastToGlobal").click(function(){
        framework.boardcastToGlobal("notic", {msg:"welcome page from broadcastToGlobal",fun:function(){console.log("这段消息被广播到所有页面!");}} );
    });
    $(".J_broadcast").click(function(){
        framework.boardcast("notic", {msg:"welcome page",fun:function(){
            console.log("这段消息只向当前页面广播!");
        }} );
    });


    framework.angular.directives.controller("pageCtrl",function($scope){

        $(".J_openWindow").click(function(){
            $scope.openModal({
                title:"窗口测试"
                ,remote: "login.html"
                ,width:800
                ,height:600
                ,onSubmit:function(modalConfig){
                    return true;                //返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
                }
            });
        });

        $scope.$on("notic",function(event,para){
            $(".J_broadcast_msg").append("<li>"+para.msg+"</li>").show();
            $scope.$apply(para.fun);
        });

    });


})(jQuery);