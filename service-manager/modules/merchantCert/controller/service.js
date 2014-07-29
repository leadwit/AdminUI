angular.module('framework.merchantCertService', [ 'ngResource' ])
.factory('merchantCertRES',
    function($resource) {
        var url = framework.getFinalURL('merchant/cert.do','api/merchantCert_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('merchantCertGRES',
    function($resource) {
        var url = framework.getFinalURL('merchant/cert.do','api/merchantCert_getClient.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });
