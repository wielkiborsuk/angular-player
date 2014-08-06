'use strict';

describe('Filter: timeDisplay', function () {

  // load the filter's module
  beforeEach(module('angularPlayerApp'));

  // initialize a new instance of the filter before each test
  var timeDisplay;
  beforeEach(inject(function ($filter) {
    timeDisplay = $filter('timeDisplay');
  }));

  it('should return the input prefixed with "timeDisplay filter:"', function () {
    var text = 'angularjs';
    expect(timeDisplay(text)).toBe('timeDisplay filter: ' + text);
  });

});
