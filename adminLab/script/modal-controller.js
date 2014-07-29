function modalCtrl($rootScope,$scope){

    //接收打开窗口广播
    $rootScope.$on("openModal",function(event,para){
        var _para = {
            $cur:null                               //当前窗口的对象
            ,title:"窗口"                           //窗口标题
            ,remote:""                              //使用URL方式加载窗口的内容
            ,data:{}                                 //传入到modal页面的数据
            ,resultData:{}                          //modal页面回传的数据
            ,width:""                                //窗口的宽度
            ,height:""                               //窗口的高度
            ,keyboard:true                          //按下esc键时关闭模态对话框
            ,onShow:null                            //当show方法被调用时，此事件将被立即触发
            ,onShwn:null                            //当模态对话框呈现到用户面前时（会等待过渡效果执行结束）此事件被触发
            ,onHide:null                            //当hide方法被调用时，此事件被立即触发。
            ,onHidden:null                          //当模态对话框被隐藏（而且过渡效果执行完毕）之后，此事件将被触发
            ,onSubmit:null                              //调用Modal页面的处理方法.此方法在onSubmitArr里最后执行；返回true，就自动关闭窗口，否则不关闭。可用于手工控制窗口的打开与关闭
            ,_onSubmitArr:[]                             //所有处理方法
            ,onSubmitForModal:function(fun){       //一次性添加一组提交事件处理函数。每次调用会清空以前的数组
                if(!fun) return;
                this._onSubmitArr = [];      //清空之前的数组

                if(angular.isFunction(fun)){
                    this._onSubmitArr.push(fun);
                }else if(angular.isArray(fun)){
                    this._onSubmitArr = onSubmitArr.concat(fun);
                }
                if(this.onSubmit){
                    this._onSubmitArr.push(this.onSubmit);
                }
            }
        };
        $.extend(_para,para);
        _para.$cur  = $('#main-modal');

        var timestamp = (new Date()).valueOf();
        if(_para.remote.indexOf("?")>-1){
            _para.remote += "&__t="+ timestamp;
        }else{
            _para.remote += "?__t="+ timestamp;
        }

        $('#main-modal #modal-frame').attr("src",_para.remote);
        $('#main-modal #modal-title').html(_para.title);
        if(_para.width) { $('#main-modal').css({width:_para.width,"margin-left":0,left:( ($(window).width() - _para.width )) /2  }); }
        if(_para.height) { $('#modal-body').css({"max-height":_para.height}); }
        var modal_config = {keyboard:_para.keyboard};
        $('#main-modal').modal(modal_config);
        $('#main-modal').on("hidden",function(){
            //console.log("main-modal hide");
            $('#main-modal #modal-frame').attr("src","about:blank");
        });

        var url = framework.getHost() + _para.remote;
        if(!$(window).data("iframePageLoaded:"+url)){
            if(_para.onHidden){
                $('#main-modal').on("hidden",function(){
                    _para.onHidden($(this));
                });
            }
            if(_para.onShow){
                $('#main-modal').on("show",function(){
                    //console.log("main-modal show");
                    _para.onShow($(this));
                });
            }
            if(_para.onShwn){
                $('#main-modal').on("shwn",function(){
                    //console.log("main-modal shwn");
                    _para.onShwn($(this));
                });
            }
            if(_para.onHide){
                $('#main-modal').on("hide",function(){
                    //console.log("main-modal hide");
                    _para.onHide($(this));
                });
            }
            //$('#main-modal #modal-submit').click(function(){
            $scope.modalSubmit = function(){
                var result = false;
                $.each(_para._onSubmitArr,function(i){
                    if(i==_para._onSubmitArr.length-1){
                        result = _para._onSubmitArr[i](_para);
                    }else{
                        result = _para._onSubmitArr[i]();
                    }
                    if(!result){
//                        console.log("onSubmit return false.");
                        return false;
                    }
                });

                if(result){
                    //所有submit事件都返回true后，可以处理一些后序操作，比较关闭Modal
                    console.info("ALL onSubmit return OK.",_para);
                    _para.$cur.modal("hide");
                }
            };

            //待iframe加载完成后，向页面发送初始数据的广告
            console.info("注册广播（iframePageLoaded:"+url+")");
            $rootScope.$on("iframePageLoaded:"+url , function(event,para){
                //console.log("监听到iframePageLoaded，并发送广播modal-boardcast");
                framework.boardcastToGlobal("modal-init:"+url, _para);
            });

           $(window).data("iframePageLoaded:"+url,"1");
        }

        //$("#main-modal form").attr("action",_para.remote).find(":input[name='data']").val(_para);
    });
    //END
}