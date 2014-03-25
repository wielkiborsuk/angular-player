'use strict';

describe('Filter: timeDisplay', function () {

  beforeEach(module('clientApp'));

  var timeDisplay;
  var t1, t2, t3;
  beforeEach(inject(function ($filter) {
    timeDisplay = $filter('timeDisplay');

    t1 = Math.round(new Date('2014-01-01T01:01:01.000Z').valueOf()/1000);
    t2 = Math.round(new Date('2014-01-01T01:04:03.000Z').valueOf()/1000);
    t3 = Math.round(new Date('2014-01-03T02:03:05.000Z').valueOf()/1000);
  }));

  it('should gracefully handle empty time frame', function () {
    expect(timeDisplay(t1-t1)).toEqual('00:00');
  });

  it('should handle negative values', function () {
    expect(timeDisplay(t2-t1)).toEqual(timeDisplay(t1-t2));
  });

  it('should calculate the right h:m:s values', function () {
    expect(timeDisplay(t2-t1)).toEqual('03:02');
    expect(timeDisplay(t3-t1)).toEqual('49:02:04');
  });

});
