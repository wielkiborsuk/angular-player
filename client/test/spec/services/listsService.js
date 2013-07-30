'use strict';

describe('Service: listsService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var listsService;
  beforeEach(inject(function (_listsService_) {
    listsService = _listsService_;
  }));

  it('should do something', function () {
    expect(!!listsService).toBe(true);
  });

});
