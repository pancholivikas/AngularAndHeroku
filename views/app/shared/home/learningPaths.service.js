(function() {
  'use strict';

  angular
    .module('app')
    .factory('learningPathService', learningPathService);

  learningPathService.$inject = ['$http', '$q'];
  /* @ngInject */
  function learningPathService($http, $q) {
    var service = {
      getLearningPaths: getLearningPaths
    };

    return service;
    
    function getLearningPaths() {
      return $http.get('https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
    
  }
})();