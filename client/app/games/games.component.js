'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './games.routes';

export class GamesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('emsApp.games', [ngRoute])
  .config(routes)
  .component('games', {
    template: require('./games.html'),
    controller: GamesComponent,
    controllerAs: 'gamesCtrl'
  })
  .name;
