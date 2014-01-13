'use strict';

var usersControllers = angular.module('usersControllers', [])




  .config(['$routeProvider','$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    // html5Mode will rewrite paths containing the /#/ hash element
    $locationProvider.html5Mode(true);

    // CORS support
    // set cross-domain and delete header
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/userprofile', {

        templateUrl: 'views/userprofile.html',
        controller: 'UserProfileCtrl'

      })
      .when('/userprofile/:userid', {
        templateUrl: '/views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);




usersControllers.controller('UserProfileCtrl', ['$scope', 'UserResource', function ($scope, UserResource) {

    $scope.inputfields = {
      namefirst: { title: 'First Name'},
      namelast: { title: 'Last Name'},
      gender: { title: 'Gender'},
      age: { title: 'Age'}
    };

    $scope.userprofile = {
      namefirst: '',
      namelast: '',
      gender: '',
      age: ''
    };

    $scope.title = 'User Listing';

    $scope.users = [];
    $scope.setUsers = function() {
      $scope.users = UserResource.query();
    };


    $scope.addNewUser = function() {
      //var newuser = new UserResource($scope.userprofile);

      var user = {
        namefirst: $scope.userprofile.namefirst,
        namelast: $scope.userprofile.namelast,
        gender: $scope.userprofile.gender,
        age: $scope.userprofile.age
      };

      var newuser = new UserResource(user);

      // the $save call here is configured to return the user,
      // investigate setting this up as a promise and pushing the
      // user once it returns...
      //newuser.$save();
      //$scope.users.push(user);


      UserResource.save({},newuser,function(user) {
          $scope.users.push(user);
        },
        function(error) {
          //$scope.errordebug = 'DEBUG: ' + angular.mock.dump(error);
          $scope.errormessage = 'Message: ' + error.data.message;
          $scope.error = 'ERROR: number: ' + error.status;
        }
      );

      $scope.clear();
    };


    $scope.clear = function() {
      $scope.userprofile = {
        namefirst: '',
        namelast: '',
        gender: '',
        age: ''
      };
    };


    $scope.isFormComplete = function() {
      var up = $scope.userprofile;
      return (up.namefirst !== '' && up.namelast !== '' && up.gender !== '' && up.age !== '');
    };

  }])




  .controller('UserCtrl', ['$scope', 'UserResource', '$routeParams', function( $scope, UserResource, $routeParams ) {

      $scope.inputfields = {
        namefirst: { title: 'First Name'},
        namelast: { title: 'Last Name'},
        gender: { title: 'Gender'},
        age: { title: 'Age'}
      };

      $scope.user = {
        namefirst: '',
        namelast: '',
        gender: '',
        age: ''
      };


      $scope.title = 'User Profile';
      $scope.success = false;

      $scope.setUser = function() {
        $scope.user = UserResource.get({userid:$routeParams.userid});
      };



      $scope.updateUser = function() {

        var user = {
          namefirst: $scope.user.namefirst,
          namelast: $scope.user.namelast,
          gender: $scope.user.gender,
          age: $scope.user.age
        };

        var newuser = new UserResource(user);

        // the $save call here is configured to return the user,
        // investigate setting this up as a promise and pushing the
        // user once it returns...
        //newuser.$save();
        //$scope.users.push(user);


        UserResource.save({},newuser,function() {
            $scope.success = true;
          },
          function(error) {
            //$scope.errordebug = 'DEBUG: ' + angular.mock.dump(error);
            $scope.errormessage = 'Message: ' + error.data.message;
            $scope.error = 'ERROR: number: ' + error.status;
          }
        );
      };

    }]);
