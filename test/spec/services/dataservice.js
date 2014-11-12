'use strict';

describe('Service: Dataservice', function () {

  // load the service's module
  beforeEach(module('angularPlayerApp'));

  // instantiate service
  var Dataservice;
  beforeEach(inject(function (_Dataservice_) {
    Dataservice = _Dataservice_;
  }));

  it('should be created successfully', function () {
    expect(Dataservice).toBeTruthy();
  });

  it('should initialize requried fields', function () {
    expect(Dataservice.endpoint_url).toBeTruthy();
    expect(Dataservice.mediabase).toBeTruthy();
  });
});
