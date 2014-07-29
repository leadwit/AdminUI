angular.module('framework.services', [ 'ngResource' ])
.factory('gridCRUDRES',
    function($resource) {
        var json = $resource('api/gridCRUDDetail.json',{
            t: _curTime
        });
        return json;
    })
    .factory('gridRES',
    function($resource) {
        var json = $resource('api/grid.json',{
            t: _curTime
        });
        return json;
    });