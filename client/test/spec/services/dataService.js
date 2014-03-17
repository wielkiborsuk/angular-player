'use strict';

describe('Service: dataservice', function () {

  beforeEach(module('clientApp'));

  var dataService;
  beforeEach(inject(function (_dataService_) {
    dataService = _dataService_;
  }));

  it('should be successfuly created', function () {
     expect(dataService).toBeTruthy();
  });

  it('should defined the key configuration values for the application', function () {
     expect(dataService.endpoint_url).toBeTruthy();
     expect(dataService.upload_base_url).toBeTruthy();
  });

});
