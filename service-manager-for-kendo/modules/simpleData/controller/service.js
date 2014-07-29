angular.module('framework.services', [ 'ngResource' ])
.factory('simpleDataRES',
    function($resource) {
        var url = framework.getFinalURL('simple/list.do','api/simpleData.json');
        var json = $resource(url,{
        });
        return json;
    });