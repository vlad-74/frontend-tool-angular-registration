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

	    angular.module('app').factory('FlashService', FlashService);

	    FlashService.$inject = ['$rootScope'];
	    function FlashService($rootScope) {
	        var service = {};

	        service.Success = Success;
	        service.Error = Error;

	        initService();

	        return service;

	        function initService() {
	            $rootScope.$on('$locationChangeStart', function () {
	                clearFlashMessage();
	            });

	            function clearFlashMessage() {
	                var flash = $rootScope.flash;
	                if (flash) {
	                    if (!flash.keepAfterLocationChange) {
	                        delete $rootScope.flash;
	                    } else {
	                        // only keep for a single location change
	                        flash.keepAfterLocationChange = false;
	                    }
	                }
	            }
	        }

	        function Success(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'success',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }

	        function Error(message, keepAfterLocationChange) {
	            $rootScope.flash = {
	                message: message,
	                type: 'error',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }
	    }
		})();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhc2hzZXJ2aWNlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlP2E3MzAqIiwid2VicGFjazovLy9mcm9udGVuZC9hc3NldHMvcmVnaXN0cmF0aW9uL2FwcC1zZXJ2aWNlcy9mbGFzaHNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2NzhkNzJiZDk0OThlMmNlNDZlIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5mYWN0b3J5KCdGbGFzaFNlcnZpY2UnLCBGbGFzaFNlcnZpY2UpO1xuXG4gICAgRmxhc2hTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcbiAgICBmdW5jdGlvbiBGbGFzaFNlcnZpY2UoJHJvb3RTY29wZSkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHt9O1xuXG4gICAgICAgIHNlcnZpY2UuU3VjY2VzcyA9IFN1Y2Nlc3M7XG4gICAgICAgIHNlcnZpY2UuRXJyb3IgPSBFcnJvcjtcblxuICAgICAgICBpbml0U2VydmljZSgpO1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRTZXJ2aWNlKCkge1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRsb2NhdGlvbkNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyRmxhc2hNZXNzYWdlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJGbGFzaE1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsYXNoID0gJHJvb3RTY29wZS5mbGFzaDtcbiAgICAgICAgICAgICAgICBpZiAoZmxhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFzaC5rZWVwQWZ0ZXJMb2NhdGlvbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlICRyb290U2NvcGUuZmxhc2g7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGtlZXAgZm9yIGEgc2luZ2xlIGxvY2F0aW9uIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhc2gua2VlcEFmdGVyTG9jYXRpb25DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIFN1Y2Nlc3MobWVzc2FnZSwga2VlcEFmdGVyTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgICAgICAgICRyb290U2NvcGUuZmxhc2ggPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsIFxuICAgICAgICAgICAgICAgIGtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlOiBrZWVwQWZ0ZXJMb2NhdGlvbkNoYW5nZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIEVycm9yKG1lc3NhZ2UsIGtlZXBBZnRlckxvY2F0aW9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmZsYXNoID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBrZWVwQWZ0ZXJMb2NhdGlvbkNoYW5nZToga2VlcEFmdGVyTG9jYXRpb25DaGFuZ2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2Fzc2V0cy9yZWdpc3RyYXRpb24vYXBwLXNlcnZpY2VzL2ZsYXNoc2VydmljZS5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFFQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==