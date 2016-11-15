(function() {
  'use strict';

  angular
    .module('app')
    .controller('PathDetailsController', PathDetailsController);

  PathDetailsController.$inject = ['$q', '$stateParams', '$state', 'learningPathService'];
  /* @ngInject */
  function PathDetailsController($q, $stateParams, $state, learningPathService) {
    var vm = this;
    vm.currentTabID = $stateParams.id;
    console.log(vm.currentTabID)
    activate();

    vm.setUpVotes = function setUpVotes(id, upVotes, downVotes) {
			upVotes = upVotes + 1;
			vm.data.upVotes = upVotes;
			var votes = { 'upVotes': upVotes, 'downVotes': downVotes};
			localStorage.setItem(id, JSON.stringify(votes));
		}

		vm.setDownVotes = function setDownVotes(id, upVotes, downVotes) {
			downVotes = downVotes + 1;
			vm.data.downVotes = downVotes;
			var votes = { 'upVotes': upVotes, 'downVotes': downVotes};
			localStorage.setItem(id, JSON.stringify(votes));
		}

    function activate() {
        var promises = [getLearningPaths()];
        return $q.all(promises).then(function() {
            console.log('Activated Home View');
        });
    }

    function getLearningPaths() {
        return learningPathService.getLearningPaths().then(function(data) {
          angular.forEach(data.paths, function(value, key) {
            if(value.id === $stateParams.id){
                var retrievedObject = JSON.parse(localStorage.getItem(value.id));
                vm.data =value;
                vm.data.upVotes = retrievedObject.upVotes;
                vm.data.downVotes = retrievedObject.downVotes;
                return;
            }
				});
        return vm.data;
        });
    }
  }
  
})();