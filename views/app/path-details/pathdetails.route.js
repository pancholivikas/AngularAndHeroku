(function() {
  'use strict';

    angular.module( 'app' )
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('path-details',
                    {
                        url: '/path-details/:id',
                        templateUrl: '/views/app/path-details/pathdetails.html',
                        controller: 'PathDetailsController',
                        controllerAs: 'vm'
                    }
                );
        });
})();