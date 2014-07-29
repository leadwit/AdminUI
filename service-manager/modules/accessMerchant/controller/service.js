angular.module('framework.accessMerchantService', [ 'ngResource' ])
.factory('accessMerchantRES',function($resource) {
    var url = framework.getFinalURL('apilist/api.do','api/accessMerchant_detail.json');
    var json = $resource(url,{
        t: _curTime
    });

    return json;
});