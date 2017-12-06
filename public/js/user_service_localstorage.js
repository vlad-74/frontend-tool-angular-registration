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

	    angular.module('app').factory('UserService', UserService);

	    UserService.$inject = ['$timeout', '$filter', '$q'];
	    function UserService($timeout, $filter, $q) {

	        var service = {};

	        service.GetAll = GetAll;
	        service.GetById = GetById;
	        service.GetByUsername = GetByUsername;
	        service.Create = Create;
	        service.Update = Update;
	        service.Delete = Delete;

	        return service;

	        function GetAll() {
	            var deferred = $q.defer();
	            deferred.resolve(getUsers());
	            return deferred.promise;
	        }

	        function GetById(id) {
	            var deferred = $q.defer();
	            var filtered = $filter('filter')(getUsers(), { id: id });
	            var user = filtered.length ? filtered[0] : null;
	            deferred.resolve(user);
	            return deferred.promise;
	        }

	        function GetByUsername(username) {
	            var deferred = $q.defer();
	            var filtered = $filter('filter')(getUsers(), { username: username });
	            var user = filtered.length ? filtered[0] : null;
	            deferred.resolve(user);
	            return deferred.promise;
	        }

	        function Create(user) {
	            var deferred = $q.defer();

	            // simulate api call with $timeout
	            $timeout(function () {
	                GetByUsername(user.username).then(function (duplicateUser) {
	                    if (duplicateUser !== null) {
	                        deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
	                    } else {
	                        var users = getUsers();

	                        // assign id
	                        var lastUser = users[users.length - 1] || { id: 0 };
	                        user.id = lastUser.id + 1;

	                        // save to local storage
	                        users.push(user);
	                        setUsers(users);

	                        deferred.resolve({ success: true });
	                    }
	                });
	            }, 1000);

	            return deferred.promise;
	        }

	        function Update(user) {
	            var deferred = $q.defer();

	            var users = getUsers();
	            for (var i = 0; i < users.length; i++) {
	                if (users[i].id === user.id) {
	                    users[i] = user;
	                    break;
	                }
	            }
	            setUsers(users);
	            deferred.resolve();

	            return deferred.promise;
	        }

	        function Delete(id) {
	            var deferred = $q.defer();

	            var users = getUsers();
	            for (var i = 0; i < users.length; i++) {
	                var user = users[i];
	                if (user.id === id) {
	                    users.splice(i, 1);
	                    break;
	                }
	            }
	            setUsers(users);
	            deferred.resolve();

	            return deferred.promise;
	        }

	        // private functions

	        function getUsers() {
	            if (!localStorage.users) {
	                localStorage.users = JSON.stringify([]);
	            }

	            return JSON.parse(localStorage.users);
	        }

	        function setUsers(users) {
	            localStorage.users = JSON.stringify(users);
	        }
	    }
	})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9zZXJ2aWNlX2xvY2Fsc3RvcmFnZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNjc4ZDcyYmQ5NDk4ZTJjZTQ2ZT9hNzMwKioqKioiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9yZWdpc3RyYXRpb24vYXBwLXNlcnZpY2VzL3VzZXJfc2VydmljZV9sb2NhbHN0b3JhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5mYWN0b3J5KCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTtcblxuICAgIFVzZXJTZXJ2aWNlLiRpbmplY3QgPSBbJyR0aW1lb3V0JywgJyRmaWx0ZXInLCAnJHEnXTtcbiAgICBmdW5jdGlvbiBVc2VyU2VydmljZSgkdGltZW91dCwgJGZpbHRlciwgJHEpIHtcblxuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xuXG4gICAgICAgIHNlcnZpY2UuR2V0QWxsID0gR2V0QWxsO1xuICAgICAgICBzZXJ2aWNlLkdldEJ5SWQgPSBHZXRCeUlkO1xuICAgICAgICBzZXJ2aWNlLkdldEJ5VXNlcm5hbWUgPSBHZXRCeVVzZXJuYW1lO1xuICAgICAgICBzZXJ2aWNlLkNyZWF0ZSA9IENyZWF0ZTtcbiAgICAgICAgc2VydmljZS5VcGRhdGUgPSBVcGRhdGU7XG4gICAgICAgIHNlcnZpY2UuRGVsZXRlID0gRGVsZXRlO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIEdldEFsbCgpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGdldFVzZXJzKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBHZXRCeUlkKGlkKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gJGZpbHRlcignZmlsdGVyJykoZ2V0VXNlcnMoKSwgeyBpZDogaWQgfSk7XG4gICAgICAgICAgICB2YXIgdXNlciA9IGZpbHRlcmVkLmxlbmd0aCA/IGZpbHRlcmVkWzBdIDogbnVsbDtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodXNlcik7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIEdldEJ5VXNlcm5hbWUodXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSAkZmlsdGVyKCdmaWx0ZXInKShnZXRVc2VycygpLCB7IHVzZXJuYW1lOiB1c2VybmFtZSB9KTtcbiAgICAgICAgICAgIHZhciB1c2VyID0gZmlsdGVyZWQubGVuZ3RoID8gZmlsdGVyZWRbMF0gOiBudWxsO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlKHVzZXIpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIGFwaSBjYWxsIHdpdGggJHRpbWVvdXRcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBHZXRCeVVzZXJuYW1lKHVzZXIudXNlcm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkdXBsaWNhdGVVc2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVwbGljYXRlVXNlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ1VzZXJuYW1lIFwiJyArIHVzZXIudXNlcm5hbWUgKyAnXCIgaXMgYWxyZWFkeSB0YWtlbicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VycyA9IGdldFVzZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ24gaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFVzZXIgPSB1c2Vyc1t1c2Vycy5sZW5ndGggLSAxXSB8fCB7IGlkOiAwIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZCA9IGxhc3RVc2VyLmlkICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdG8gbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJzLnB1c2godXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VXNlcnModXNlcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gVXBkYXRlKHVzZXIpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIHZhciB1c2VycyA9IGdldFVzZXJzKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJzW2ldLmlkID09PSB1c2VyLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJzW2ldID0gdXNlcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VXNlcnModXNlcnMpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIERlbGV0ZShpZCkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgdmFyIHVzZXJzID0gZ2V0VXNlcnMoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHVzZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICB1c2Vycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuXG4gICAgICAgIGZ1bmN0aW9uIGdldFVzZXJzKCkge1xuICAgICAgICAgICAgaWYoIWxvY2FsU3RvcmFnZS51c2Vycyl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnVzZXJzID0gSlNPTi5zdHJpbmdpZnkoW10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UudXNlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0VXNlcnModXNlcnMpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS51c2VycyA9IEpTT04uc3RyaW5naWZ5KHVzZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9yZWdpc3RyYXRpb24vYXBwLXNlcnZpY2VzL3VzZXJfc2VydmljZV9sb2NhbHN0b3JhZ2UuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=