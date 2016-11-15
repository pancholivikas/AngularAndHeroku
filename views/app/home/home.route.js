(function() {
  'use strict';

    angular.module( 'app' )
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('paths',
                    {
                        url: '/paths',
                        templateUrl: '/views/app/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                );
            $urlRouterProvider.otherwise('/paths');
            $locationProvider.html5Mode(true);
        });
})();