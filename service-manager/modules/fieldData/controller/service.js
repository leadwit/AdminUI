angular.module('framework.fieldDataService', [ 'ngResource' ])
.factory('fieldDataRES',
    function($resource) {
        var url = framework.getFinalURL('field/list.do','api/fieldData_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
   .factory('fieldDataTRES',
    function($resource) {
        var url = framework.getFinalURL('field/list.do','api/fieldData_tlist.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });