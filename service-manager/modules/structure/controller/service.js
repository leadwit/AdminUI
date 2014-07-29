angular.module('framework.structureService', [ 'ngResource' ])
.factory('structureRES',
    function($resource) {
        var url = framework.getFinalURL('structure/info.do','api/structure_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    })
    .factory('structureFlistRES',
    function($resource) {
        var json = $resource('api/structure_flist.json',{
            t: _curTime
        });
        return json;
    })
;