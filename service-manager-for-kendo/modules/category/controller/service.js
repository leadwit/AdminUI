angular.module('framework.services', [ 'ngResource' ])
.factory('categoryRES',
    function($resource) {
        var url = framework.getFinalURL('category/info.do','api/category_detail.json');
        var json = $resource(url,{
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