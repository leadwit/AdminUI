angular.module('framework.services', [ 'ngResource' ])
.factory('serviceRES',
    function($resource) {
        var url = framework.getFinalURL('service/info.do','api/service_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('service_clist_RES',
    function($resource) {
        var url = framework.getFinalURL('service/info.do','api/service_clist.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('service_clist_FlistRES',
    function($resource) {
        var url = framework.getFinalURL('service/info.do','api/service_flist.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('categoryListRES',
    function($resource) {
        var json = $resource('../../../field/list.do?method=categorylist',{
            t: _curTime
        });
        return json;
    })
.factory('uploadRES',
    function($resource) {
        var json = $resource('../../../doc/api.do?method=imp',{
            t: _curTime
        });
        return json;
    })
;