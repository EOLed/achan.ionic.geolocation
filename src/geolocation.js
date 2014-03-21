angular.module('achan.ionic.geolocation', ['ionic', 'achan.cordova.navigator'])
    .factory('geolocation', function ($rootScope, $ionicPlatform, $q, $navigator) {
  function getCurrentPosition() {
    var deferred = $q.defer();

    function onCurrentPositionResolved(position) {
      deferred.resolve(position);
    }

    function onCurrentPositionFailedToResolve(error) {
      deferred.reject('Failed to retrieve current position because: ' +
                      error.message + ' (' + error.code + ')');
    }

    $ionicPlatform.ready(function () {
      deferred.notify('ionic platform ready, now requesting current position...');
      $navigator.geolocation.getCurrentPosition(onCurrentPositionResolved,
                                                onCurrentPositionFailedToResolve);
    });

    return deferred.promise;
  }

  return {
    getCurrentPosition: getCurrentPosition
  };
});
