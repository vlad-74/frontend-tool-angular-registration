/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	(function () {
	    'use strict';

	    angular.module('app', ['ngRoute', 'ngCookies']).config(config).run(run);

	    config.$inject = ['$routeProvider', '$locationProvider'];
	    function config($routeProvider, $locationProvider) {
	        $routeProvider.when('/', {
	            controller: 'HomeController',
	            templateUrl: 'registration/home/home.view.html',
	            controllerAs: 'vm'
	        }).when('/login', {
	            controller: 'LoginController',
	            templateUrl: 'registration/login/login.view.html',
	            controllerAs: 'vm'
	        }).when('/register', {
	            controller: 'RegisterController',
	            templateUrl: 'registration/register/register.view.html',
	            controllerAs: 'vm'
	        }).otherwise({ redirectTo: '/login' });
	    }

	    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
	    function run($rootScope, $location, $cookies, $http) {
	        // keep user logged in after page refresh
	        $rootScope.globals = $cookies.getObject('globals') || {};
	        if ($rootScope.globals.currentUser) {
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
	        }

	        $rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in and trying to access a restricted page
	            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
	            var loggedIn = $rootScope.globals.currentUser;
	            if (restrictedPage && !loggedIn) {
	                $location.path('/login');
	            }
	        });
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlIiwid2VicGFjazovLy9mcm9udGVuZC9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZScsICduZ0Nvb2tpZXMnXSlcbiAgICAgICAgLmNvbmZpZyhjb25maWcpXG4gICAgICAgIC5ydW4ocnVuKTtcblxuICAgIGNvbmZpZy4kaW5qZWN0ID0gWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlciddO1xuICAgIGZ1bmN0aW9uIGNvbmZpZygkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZWdpc3RyYXRpb24vaG9tZS9ob21lLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0cmF0aW9uL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAud2hlbignL3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckNvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0cmF0aW9uL3JlZ2lzdGVyL3JlZ2lzdGVyLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy9sb2dpbicgfSk7XG4gICAgfVxuXG4gICAgcnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGxvY2F0aW9uJywgJyRjb29raWVzJywgJyRodHRwJ107XG4gICAgZnVuY3Rpb24gcnVuKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJGNvb2tpZXMsICRodHRwKSB7XG4gICAgICAgIC8vIGtlZXAgdXNlciBsb2dnZWQgaW4gYWZ0ZXIgcGFnZSByZWZyZXNoXG4gICAgICAgICRyb290U2NvcGUuZ2xvYmFscyA9ICRjb29raWVzLmdldE9iamVjdCgnZ2xvYmFscycpIHx8IHt9O1xuICAgICAgICBpZiAoJHJvb3RTY29wZS5nbG9iYWxzLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgKyAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXIuYXV0aGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIG5leHQsIGN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIHJlZGlyZWN0IHRvIGxvZ2luIHBhZ2UgaWYgbm90IGxvZ2dlZCBpbiBhbmQgdHJ5aW5nIHRvIGFjY2VzcyBhIHJlc3RyaWN0ZWQgcGFnZVxuICAgICAgICAgICAgdmFyIHJlc3RyaWN0ZWRQYWdlID0gJC5pbkFycmF5KCRsb2NhdGlvbi5wYXRoKCksIFsnL2xvZ2luJywgJy9yZWdpc3RlciddKSA9PT0gLTE7XG4gICAgICAgICAgICB2YXIgbG9nZ2VkSW4gPSAkcm9vdFNjb3BlLmdsb2JhbHMuY3VycmVudFVzZXI7XG4gICAgICAgICAgICBpZiAocmVzdHJpY3RlZFBhZ2UgJiYgIWxvZ2dlZEluKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2pzL2FwcC5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBSEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Iiwic291cmNlUm9vdCI6IiJ9