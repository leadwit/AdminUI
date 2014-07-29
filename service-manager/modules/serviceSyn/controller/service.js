angular.module('framework.serviceSynService', [ 'ngResource' ])
.factory('serviceSynRES',
    function($resource) {
        var url = framework.getFinalURL('serviceSyn/info.do','api/serviceSyn_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });