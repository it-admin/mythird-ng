'use strict';

var myThirdNgServices = angular.module('myThirdNgServices', ['ngResource']);

// inject endpoint host & port provided from thirdNgConfig constants module
myThirdNgServices.factory('UserResource', ['$resource','ENDPOINT_HOST','ENDPOINT_PORT',
	function ($resource, ephost, epport) {
		return $resource('http://' + ephost + ':' + epport + '/users/:userid', {});
	}
  ]);
