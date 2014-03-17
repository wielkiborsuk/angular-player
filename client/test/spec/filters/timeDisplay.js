'use strict';

describe('Filter: timeDisplay', function () {

  beforeEach(module('clientApp'));

  var timeDisplay;
  var t1, t2, t3;
  beforeEach(inject(function ($filter) {
    timeDisplay = $filter('timeDisplay');

    t1 = new Date('2014-01-01T01:01:01.000Z').valueOf();
    t2 = new Date('2014-01-01T01:04:03.000Z').valueOf();
    t3 = new Date('2014-01-03T02:03:05.000Z').valueOf();
  }));

  it('should gracefully handle empty time frame', function () {
    // expect(timeDisplay(text)).toBe('timeDisplay filter: ' + text);
    expect(timeDisplay(t1-t1)).toEqual('00:00');
  });

});
