angular.module('framework.services', [ 'ngResource' ])
.factory('listDataRES',
    function($resource) {
        var url = framework.getFinalURL('list/info.do','api/listData_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('listDataTRES',
    function($resource) {
        var url = framework.getFinalURL('list/info.do','api/listData_tlist.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
.factory('categoryListRES',
    function($resource) {
        var json = $resource('../../../dataType/list.do?method=query',{
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