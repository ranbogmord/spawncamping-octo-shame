ConcertPlanner
.controller('HomeController', ['$scope', '$window', '$http', function (sc, w, ht) {
	if (!sessionStorage.appToken) {
		w.location = '#/login';
	}

	sc.user = JSON.parse(sessionStorage.user).username;

	ht.get('http://localhost:3000/events', {headers: {
		'x-app-token': sessionStorage.appToken
	}})
	.success(function (data, status) {
		if (status == 200) {
			sc.events = data;
		}
	})
	.error(function (data, status) {
		console.log(status);
	});
}])

.controller('LoginController', ['$scope', '$http', '$window', function (sc, ht, w) {
	if (sessionStorage.appToken) {
		w.location = '#/';
	}

	sc.submitForm = function (isValid) {
		console.dir(isValid);
		console.dir(sc.login);

		if (isValid) {
			console.log(sc.login.username);
			console.log(sc.login.password);

			ht.get('http://localhost:3000/auth', {headers: {
				'x-app-username': sc.login.username,
				'x-app-password': sc.login.password
			}})
			.success(function (data, status, headers) {
				if (data.token) {
					sessionStorage.appToken = data.token;
					sessionStorage.user = JSON.stringify(data.user);
					w.location = '/';
				}
			})
			.error(function (data, status) {
				console.dir(data);
				console.log(status);
			});
		}
	};
}])
.controller('SingleEventController', ['$scope', '$window', '$http', '$routeParams', function (sc, w, ht, rp) {
	if (!sessionStorage.appToken) {
		w.location = '#/login';
	}

	sc.user = JSON.parse(sessionStorage.user).username;

	ht.get('http://localhost:3000/events/' + rp.eid, {headers: {
		'x-app-token': sessionStorage.appToken,
	}})
	.success(function (data, status) {
		sc.event = data;
		console.dir(data);
	})
	.error(function (data, status) {
		console.log(status);
	});
}])
.controller('AddEventController', ['$scope', '$window', '$http', function (sc, w, ht) {
	if (!sessionStorage.appToken) {
		w.location = "#/login";
	}

	sc.user = JSON.parse(sessionStorage.user).username;
	
	sc.addEvent = function (isValid) {
		if (isValid) {
			console.dir(sc.event);

			ht.post('http://localhost:3000/events', sc.event, {headers: {
				'x-app-token': sessionStorage.appToken,
			}})
			.success(function (data, status) {
				w.location = '#/events/' + data._id;
			})
			.error(function (data, status) {
				console.dir(data);
				console.log(status);
			});
		}
	};
}]);
