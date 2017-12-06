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

	    angular.module('app').factory('AuthenticationService', AuthenticationService);

	    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
	    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
	        var service = {};

	        service.Login = Login;
	        service.SetCredentials = SetCredentials;
	        service.ClearCredentials = ClearCredentials;

	        return service;

	        function Login(username, password, callback) {

	            /* Dummy authentication for testing, uses $timeout to simulate api call
	             ----------------------------------------------*/
	            $timeout(function () {
	                var response;
	                UserService.GetByUsername(username).then(function (user) {
	                    if (user !== null && user.password === password) {
	                        response = { success: true };
	                    } else {
	                        response = { success: false, message: 'Username or password is incorrect' };
	                    }
	                    callback(response);
	                });
	            }, 1000);

	            /* Use this for real authentication
	             ----------------------------------------------*/
	            //$http.post('/api/authenticate', { username: username, password: password })
	            //    .success(function (response) {
	            //        callback(response);
	            //    });
	        }

	        function SetCredentials(username, password) {
	            var authdata = Base64.encode(username + ':' + password);

	            $rootScope.globals = {
	                currentUser: {
	                    username: username,
	                    authdata: authdata
	                }
	            };

	            // set default auth header for http requests
	            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

	            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
	            var cookieExp = new Date();
	            cookieExp.setDate(cookieExp.getDate() + 7);
	            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
	        }

	        function ClearCredentials() {
	            $rootScope.globals = {};
	            $cookies.remove('globals');
	            $http.defaults.headers.common.Authorization = 'Basic';
	        }
	    }

	    // Base64 encoding service used by AuthenticationService
	    var Base64 = {

	        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

	        encode: function encode(input) {
	            var output = "";
	            var chr1,
	                chr2,
	                chr3 = "";
	            var enc1,
	                enc2,
	                enc3,
	                enc4 = "";
	            var i = 0;

	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);

	                enc1 = chr1 >> 2;
	                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	                enc4 = chr3 & 63;

	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }

	                output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        },

	        decode: function decode(input) {
	            var output = "";
	            var chr1,
	                chr2,
	                chr3 = "";
	            var enc1,
	                enc2,
	                enc3,
	                enc4 = "";
	            var i = 0;

	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            var base64test = /[^A-Za-z0-9\+\/\=]/g;
	            if (base64test.exec(input)) {
	                window.alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
	            }
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	            do {
	                enc1 = this.keyStr.indexOf(input.charAt(i++));
	                enc2 = this.keyStr.indexOf(input.charAt(i++));
	                enc3 = this.keyStr.indexOf(input.charAt(i++));
	                enc4 = this.keyStr.indexOf(input.charAt(i++));

	                chr1 = enc1 << 2 | enc2 >> 4;
	                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
	                chr3 = (enc3 & 3) << 6 | enc4;

	                output = output + String.fromCharCode(chr1);

	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }

	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);

	            return output;
	        }
	    };
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25zZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlP2E3MzAiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2Fzc2V0cy9yZWdpc3RyYXRpb24vYXBwLXNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uc2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjY3OGQ3MmJkOTQ5OGUyY2U0NmUiLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmZhY3RvcnkoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIEF1dGhlbnRpY2F0aW9uU2VydmljZSk7XG5cbiAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGNvb2tpZXMnLCAnJHJvb3RTY29wZScsICckdGltZW91dCcsICdVc2VyU2VydmljZSddO1xuICAgIGZ1bmN0aW9uIEF1dGhlbnRpY2F0aW9uU2VydmljZSgkaHR0cCwgJGNvb2tpZXMsICRyb290U2NvcGUsICR0aW1lb3V0LCBVc2VyU2VydmljZSkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xuXG4gICAgICAgIHNlcnZpY2UuTG9naW4gPSBMb2dpbjtcbiAgICAgICAgc2VydmljZS5TZXRDcmVkZW50aWFscyA9IFNldENyZWRlbnRpYWxzO1xuICAgICAgICBzZXJ2aWNlLkNsZWFyQ3JlZGVudGlhbHMgPSBDbGVhckNyZWRlbnRpYWxzO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIExvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCwgY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgLyogRHVtbXkgYXV0aGVudGljYXRpb24gZm9yIHRlc3RpbmcsIHVzZXMgJHRpbWVvdXQgdG8gc2ltdWxhdGUgYXBpIGNhbGxcbiAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgVXNlclNlcnZpY2UuR2V0QnlVc2VybmFtZSh1c2VybmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyICE9PSBudWxsICYmIHVzZXIucGFzc3dvcmQgPT09IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnVXNlcm5hbWUgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAvKiBVc2UgdGhpcyBmb3IgcmVhbCBhdXRoZW50aWNhdGlvblxuICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgLy8kaHR0cC5wb3N0KCcvYXBpL2F1dGhlbnRpY2F0ZScsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSlcbiAgICAgICAgICAgIC8vICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBTZXRDcmVkZW50aWFscyh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHZhciBhdXRoZGF0YSA9IEJhc2U2NC5lbmNvZGUodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuZ2xvYmFscyA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXNlcjoge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhkYXRhOiBhdXRoZGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCBkZWZhdWx0IGF1dGggaGVhZGVyIGZvciBodHRwIHJlcXVlc3RzXG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgKyBhdXRoZGF0YTtcblxuICAgICAgICAgICAgLy8gc3RvcmUgdXNlciBkZXRhaWxzIGluIGdsb2JhbHMgY29va2llIHRoYXQga2VlcHMgdXNlciBsb2dnZWQgaW4gZm9yIDEgd2VlayAob3IgdW50aWwgdGhleSBsb2dvdXQpXG4gICAgICAgICAgICB2YXIgY29va2llRXhwID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGNvb2tpZUV4cC5zZXREYXRlKGNvb2tpZUV4cC5nZXREYXRlKCkgKyA3KTtcbiAgICAgICAgICAgICRjb29raWVzLnB1dE9iamVjdCgnZ2xvYmFscycsICRyb290U2NvcGUuZ2xvYmFscywgeyBleHBpcmVzOiBjb29raWVFeHAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBDbGVhckNyZWRlbnRpYWxzKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS5nbG9iYWxzID0ge307XG4gICAgICAgICAgICAkY29va2llcy5yZW1vdmUoJ2dsb2JhbHMnKTtcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSAnQmFzaWMnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQmFzZTY0IGVuY29kaW5nIHNlcnZpY2UgdXNlZCBieSBBdXRoZW50aWNhdGlvblNlcnZpY2VcbiAgICB2YXIgQmFzZTY0ID0ge1xuXG4gICAgICAgIGtleVN0cjogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JyxcblxuICAgICAgICBlbmNvZGU6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgY2hyMSwgY2hyMiwgY2hyMyA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgZW5jMSwgZW5jMiwgZW5jMywgZW5jNCA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBjaHIxID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgICAgICAgICAgIGNocjIgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgICAgICAgICAgY2hyMyA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcblxuICAgICAgICAgICAgICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICAgICAgICAgICAgZW5jMiA9ICgoY2hyMSAmIDMpIDw8IDQpIHwgKGNocjIgPj4gNCk7XG4gICAgICAgICAgICAgICAgZW5jMyA9ICgoY2hyMiAmIDE1KSA8PCAyKSB8IChjaHIzID4+IDYpO1xuICAgICAgICAgICAgICAgIGVuYzQgPSBjaHIzICYgNjM7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oY2hyMikpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuYzQgPSA2NDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jMSkgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jMikgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jMykgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVN0ci5jaGFyQXQoZW5jNCk7XG4gICAgICAgICAgICAgICAgY2hyMSA9IGNocjIgPSBjaHIzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBlbmMxID0gZW5jMiA9IGVuYzMgPSBlbmM0ID0gXCJcIjtcbiAgICAgICAgICAgIH0gd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlY29kZTogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBjaHIxLCBjaHIyLCBjaHIzID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0ID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCArLCAvLCBvciA9XG4gICAgICAgICAgICB2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcbiAgICAgICAgICAgIGlmIChiYXNlNjR0ZXN0LmV4ZWMoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlcmUgd2VyZSBpbnZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGluIHRoZSBpbnB1dCB0ZXh0LlxcblwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJWYWxpZCBiYXNlNjQgY2hhcmFjdGVycyBhcmUgQS1aLCBhLXosIDAtOSwgJysnLCAnLycsYW5kICc9J1xcblwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJFeHBlY3QgZXJyb3JzIGluIGRlY29kaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpO1xuXG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZW5jMSA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuICAgICAgICAgICAgICAgIGVuYzIgPSB0aGlzLmtleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcbiAgICAgICAgICAgICAgICBlbmMzID0gdGhpcy5rZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgICAgICAgICAgZW5jNCA9IHRoaXMua2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuXG4gICAgICAgICAgICAgICAgY2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNCk7XG4gICAgICAgICAgICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xuICAgICAgICAgICAgICAgIGNocjMgPSAoKGVuYzMgJiAzKSA8PCA2KSB8IGVuYzQ7XG5cbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVuYzMgIT0gNjQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVuYzQgIT0gNjQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaHIxID0gY2hyMiA9IGNocjMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSBcIlwiO1xuXG4gICAgICAgICAgICB9IHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9yZWdpc3RyYXRpb24vYXBwLXNlcnZpY2VzL2F1dGhlbnRpY2F0aW9uc2VydmljZS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQTlFQTtBQWlGQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==