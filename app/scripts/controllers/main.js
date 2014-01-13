'use strict';


angular.module('thirdNgAppMainCtl', [])

  .config(['$routeProvider','$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    // html5Mode will rewrite paths containing the /#/ hash element
    $locationProvider.html5Mode(true);

    // CORS support
    // set cross-domain and delete header
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])


.controller('MainCtrl', ['$scope', 'UserResource', function ($scope, UserResource) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Richard Test Registrations'
    ];

    $scope.title = 'Main Page';
    $scope.users = [];
    $scope.debug = 'some debug';


    $scope.setUsers = function() {
      $scope.users = UserResource.query();
    };


    $scope.awesomeThing = 'Nothing Selected';
    $scope.setAwesomeThing = function(thing) {
      $scope.awesomeThing = thing;
    };


  }]);


