ConcertPlanner
.factory('ApiHandler', function ($http) {
	var handler = {
		doRequest: function (endpoint, method, data, callback) {
			$http({
				url: 'http://localhost:3000' + endpoint,
				method: method,
				data: data,
			});
		},
	};
});