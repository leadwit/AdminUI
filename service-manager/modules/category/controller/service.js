angular.module('framework.categoryService', [ 'ngResource' ])
.factory('categoryRES',
    function($resource) {
        var url = framework.getFinalURL('category/info.do','api/category_detail.json');
        var json = $resource(url,{
            t: _curTime
        });
        return json;
    });