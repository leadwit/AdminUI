//前端核心类库
var Framework = function(){
    this.DEBUG = true;     //false or true

    //构造函数，实例化时执行
    this.init = function(){ }

    //判断当前页面是否在iFrame中
    this.inIframe = window.self.frameElement && window.self.frameElement.tagName=="IFRAME";

    /*
     * 得到当前HOST
     */
    this.getHost = function(){
        if(this.inIframe){
            return window.parent.framework.getHost();
        } else{
            var host = window.location.href.substring(0,window.location.href.lastIndexOf("/")+1);
            return host;
        }
    }

    return this.init();        //实例化时执行
}
/**
 * 向当前页面发广播
 * @param notic 广播事件标识
 * @param para 广播参数
 */
Framework.prototype.boardcast = function(notic,para){
    //console.info(notic,para);
    var injector = angular.element(document).injector();
    if(injector){
        var rootScope = injector.get("$rootScope");
        //两种方式都可以
        //angular.element(document).scope().$broadcast(notic,para);
        rootScope.$broadcast(notic,para);
    }
}
/**
 * 向所有页面广播
 * @param notic 广播事件标识
 * @param para 广播参数
 */
Framework.prototype.boardcastToGlobal = function(notic,para){
    if(this.DEBUG){
        console.info("向所有页面广播（"+ notic +"） -->>");
    }

    if(this.inIframe){
        if(this.DEBUG){
            console.log("            框架内发起的广播（"+ notic +"） -->>");
        }
        if(window.parent.framework){
            window.parent.framework.boardcast(notic,para);      //主页面发广播
        }
        //所有 iframe 发广播
        $.each(window.parent.frames,function(index){
            if(window.parent.frames[index].framework){
                window.parent.frames[index].framework.boardcast(notic,para);
            }
        });
    } else {
        if(this.DEBUG){
            console.log("            主页面发起的广播（"+ notic +"） -->>");
        }

        this.boardcast(notic,para);                           //主页面发广播

        //所有 iframe 发广播
        $.each(window.frames,function(index){
//            console.log("iframe id:",index);
            if(window.frames[index].framework){
                window.frames[index].framework.boardcast(notic,para);
            }
        });
    }
}

/**
 * 得到最终的URL
 * @param url_debug DEBUG时的URL
 * @param url_release release时的URL
 * @param is_debug [非必填]当前系统状态
 * @param api_path_prefix [非必填]调用API数据的前缀地址
 * @returns {*|string}
 */
Framework.prototype.getFinalURL = function(url_release,url_debug,is_debug,api_path_prefix){
    var _is_debug = is_debug || IS_DEBUG,
        _api_path_prefix = api_path_prefix || API_PATH_PREFIX;

    var url = _api_path_prefix;
    if(_is_debug){
        url += url_debug;
    }else{
        url += url_release;
    }

    return url;
}

//实例化
var framework = new Framework();