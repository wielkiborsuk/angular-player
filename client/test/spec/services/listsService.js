'use strict';

describe('Service: Listsservice', function () {

  // load the service's module
  beforeEach(module('ClientApp'));

  // instantiate service
  var Listsservice;
  beforeEach(inject(function (_Listsservice_) {
    Listsservice = _Listsservice_;
  }));

  it('should do something', function () {
    expect(!!Listsservice).toBe(true);
  });

});
