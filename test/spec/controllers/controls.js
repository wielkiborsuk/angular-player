'use strict';

ddescribe('Controller: ControlsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularPlayerApp'));

  var ControlsCtrl,
    playerservice,
    scope,
    dataservice,
    url,
    hb;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Playerservice, Dataservice, $httpBackend) {
    hb = $httpBackend;
    playerservice = Playerservice;
    dataservice = Dataservice;
    scope = $rootScope.$new();
    scope.state = {};
    url = dataservice.endpoint_url;
    ControlsCtrl = $controller('ControlsCtrl', {
      $scope: scope
    });

    hb.when('GET', url+'smscan/').respond(200);
    hb.when('GET', url+'scanned/').respond([{
      name: 'list1',
      path: '/path/to/list',
      files: [
        {name: 'name.mp3', path: '/path/to/list/name.mp3'},
        {name: 'name2.mp3', path: '/path/to/list/name2.mp3'}
      ]
    }]);
  }));

  it('should initialize controller fields', function () {
    expect(scope.timeLabel).toEqual({time:0, duration:0});
    expect(scope.gradation).toBe(playerservice.gradation);
  });

  it('calls backend (twice) on rescan action trigger', function () {
    hb.expectGET(url+'smscan/');
    hb.expectGET(url+'scanned/');
    scope.rescan();
    hb.flush();

    expect(scope.state.mediadirs).toBeTruthy();
  });

  it('starts and stops player on play/stop button presses', function () {
    scope.play_pause();

    expect(playerservice).toBeTruthy();
  });
});
