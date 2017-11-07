'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/games', {
      template: '<games></games>'
    });
}
