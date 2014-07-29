angular.module('framework.services', [ 'ngResource' ])
.factory('fieldDataRES',
    function($resource) {
        var url = framework.getFinalURL('field/info.do','api/fieldData_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('categoryListRES',
    function($resource) {
        var url = framework.getFinalURL('dataType/list.do?method=query','api/fieldData_detail.json');
        var json =$resource(url,{
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