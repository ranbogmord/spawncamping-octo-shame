var ConcertPlanner = window.ConcertPlanner = angular.module('ConcertPlanner', ['ngRoute'])
.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'HomeController'
	})
	.when('/login', {
		templateUrl: 'app/views/login.html',
		controller: 'LoginController',
	})
	.when('/events/:eid', {
		templateUrl: 'app/views/singleevent.html',
		controller: 'SingleEventController'
	})
	.when('/add-event', {
		templateUrl: 'app/views/addevent.html',
		controller: 'AddEventController'
	})
	.otherwise({
		redirectTo: '/login',
	});
});