'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
import routes from './games.routes';

export class GamesComponent {
  games = [];
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('games');
    });
  }

  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.games = response.data;        
        this.socket.syncUpdates('games', this.games);
      })
      .error(function(err) {
        alert('Error! Something went wrong');
      });;
  }

}

export default angular.module('emsApp.games', [ngRoute])
  .config(routes)
  .component('games', {
    template: require('./games.html'),
    controller: GamesComponent
    // controllerAs: 'gamesCtrl'
  })
  .name;
