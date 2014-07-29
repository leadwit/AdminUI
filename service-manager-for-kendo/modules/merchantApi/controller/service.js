angular.module('framework.services', [ 'ngResource' ])
.factory('merchantApiRES',
    function($resource) {
        var url = framework.getFinalURL('merchant/api.do','api/merchantApi_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('serviceRES',
    function($resource) {
        var url = framework.getFinalURL('service/info.do','api/merchantApi_service_list.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });