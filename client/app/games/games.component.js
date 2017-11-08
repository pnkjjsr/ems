'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
import routes from './games.routes';

export class GamesComponent {
  games = [];
  newGame = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('game');
    });
  }

  // Initiate on Load
  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.games = response.data;
        this.socket.syncUpdates('game', this.games);
      });
  }

  // Add New Game
  addNewGame() {
    if (this.newGame) {
      this.$http.post('/api/games', {
        name: this.newGame.name,
        platform: this.newGame.platform,
        genre: this.newGame.genre
      });
      this.newGame = [];

    }
  }

  deleteGame(game) {
    console.log(game._id);
    this.$http.delete(`/api/games/${game._id}`);
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
