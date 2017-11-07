'use strict';

describe('Component: GamesComponent', function() {
  // load the controller's module
  beforeEach(module('emsApp.games'));

  var GamesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    GamesComponent = $componentController('games', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
