angular.module('framework.systemParamService', [ 'ngResource' ])
.factory('systemParamRES',
    function($resource) {
        var url = framework.getFinalURL('system/param.do','api/systemParam_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
    .factory('systemParamTRES',
        function($resource) {
            var url = framework.getFinalURL('system/param.do','api/systemParam_tlist.json');
            var json = $resource(url,{
                t: _curTime
            });
            return json;
        })
;
