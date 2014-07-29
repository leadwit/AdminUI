$(function(){
    $(".J_broadcastToGlobal").click(function(){
        framework.boardcastToGlobal("notic", {msg:"welcome page",fun:function(){console.log("这段消息被广播到所有页面!");}} );
    });
    $(".J_broadcast").click(function(){
        framework.boardcast("notic", {msg:"welcome page",fun:function(){console.log("这段消息只向当前页面广播!");}} );
    });
});
