describe('Service: geolocation', function () {
  var geolocation, $ionicPlatform, $q, $rootScope, $navigator;

  beforeEach(module('achan.ionic.geolocation'));

  beforeEach(function () {
    $navigator = {
      geolocation: {
        getCurrentPosition: jasmine.createSpy('getCurrentPosition')
      }
    };

    module(function ($provide) {
      $provide.value('$navigator', $navigator);
    });
  });

  beforeEach(inject(function (_$rootScope_,
                              _geolocation_,
                              _$ionicPlatform_,
                              _$q_) {
    geolocation = _geolocation_;
    $ionicPlatform = _$ionicPlatform_;
    $q = _$q_;
    $rootScope = _$rootScope_;

    spyOn($ionicPlatform, 'ready');
  }));

  it('getCurrentPosition resolves position returned from navigator',
     function () {
    var resolvedPosition;

    geolocation.getCurrentPosition().then(function(position) {
      resolvedPosition = position;
    });

    ionicOnReady($ionicPlatform);
    currentPositionResolved($navigator, { coords: { latitude: 13.37 } });

    $rootScope.$apply();

    expect(resolvedPosition).toEqual({ coords: { latitude: 13.37 } });
  });

  function ionicOnReady($ionicPlatform) {
    var onReadyFn = $ionicPlatform.ready.calls[0].args[0];
    onReadyFn();
  }

  function currentPositionResolved($navigator, position) {
    var onCurrentPositionResolvedFn =
        $navigator.geolocation.getCurrentPosition.calls[0].args[0];
    onCurrentPositionResolvedFn(position);
  }
});
