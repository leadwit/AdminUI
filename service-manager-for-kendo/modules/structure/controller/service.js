angular.module('framework.services', [ 'ngResource' ])
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
.factory('categoryListRES',
    function($resource) {
        var json = $resource('../../../field/list.do?method=categorylist',{
            t: _curTime
        });
        return json;
    })
.factory('categoryList_ListRES',
    function($resource) {
        var json = $resource('../../../field/list.do?method=categorylist',{
            t: _curTime
        });
        return json;
    })
.factory('categoryList_CateRES',
    function($resource) {
        var json = $resource('../../../field/list.do?method=categorylist',{
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