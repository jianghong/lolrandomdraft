'use strict';

describe('Filter: champPoolFilter', function () {

  // load the filter's module
  beforeEach(module('lolrdApp'));

  // initialize a new instance of the filter before each test
  var champPoolFilter;
  beforeEach(inject(function ($filter) {
    champPoolFilter = $filter('champPoolFilter');
  }));

  it('should return the input prefixed with "champPoolFilter filter:"', function () {
    var text = 'angularjs';
    expect(champPoolFilter(text)).toBe('champPoolFilter filter: ' + text);
  });

});
