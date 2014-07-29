angular.module('framework.serviceService', [ 'ngResource' ])
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
;