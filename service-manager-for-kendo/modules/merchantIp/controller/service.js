angular.module('framework.services', [ 'ngResource' ])
.factory('merchantIpRES',
    function($resource) {
        var url = framework.getFinalURL('merchant/ip.do','api/merchantIp_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });