angular.module('framework.listDataService', [ 'ngResource' ])
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
    });