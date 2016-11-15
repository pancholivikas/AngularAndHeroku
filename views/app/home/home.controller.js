(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$http', '$state',  '$q', 'learningPathService', 'sortkeys'];
  /* @ngInject */
  function HomeController($http, $state, $q, learningPathService, sortkeys) {
    var vm = this;
    console.log('controller');
    vm.language;
    activate();

    vm.click = function click() {
        console.log(vm.language);
    }

    vm.gotoDetails = function gotoDetails(pathId) {
        $state.go('path-details', {
            id: pathId
        });
    }

    vm.setOrderProperty = function setOrderProperty(propertyName) {
        vm.orderProperty = '-' + propertyName;
        vm.activeMenu = propertyName;
    }

    function activate() {
        var promises = [getLearningPaths(), getSortKeys()];
        return $q.all(promises).then(function() {
            console.log('Activated Home View');
        });
    }

    function getLearningPaths() {
        return learningPathService.getLearningPaths().then(function(data) {
            var votes = { 'upVotes': 0, 'downVotes': 0 };
            angular.forEach(data.paths, function(value, key) {
                if (localStorage.getItem(value.id) === null) {
                    localStorage.setItem(value.id, JSON.stringify(votes));
                    value.upVotes = votes.upVotes;
                    value.downVotes = votes.downVotes;
                }
                else {
                    var retrievedObject = JSON.parse(localStorage.getItem(value.id));
                    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
                    value.upVotes = retrievedObject.upVotes;
                    value.downVotes = retrievedObject.downVotes;
                }
            });
            vm.data = data.paths;
            return vm.data;
        });
    }

    function getSortKeys() {
        return sortkeys.getSortKeys().then(function(data) {
            vm.keyData = data.sortKeys;
			vm.activeMenu = vm.keyData[0].id;
			vm.orderProperty = '-' + vm.keyData[0].id;
            return vm.keyData;
        });
    }
    
  }
  
})();