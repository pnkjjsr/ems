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

    // Check object Key
    this.checkObjectKey = function(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key) ) size++;
      }
      return size;
    };
  }

  // Initiate on Load
  $onInit() {
    this.$http.get('/api/games')
      .then(response => {
        this.games = response.data;
        this.originalGames = response.data;
        this.socket.syncUpdates('game', this.games);
      });
  }

  // Add New Game
  addNewGame() {
    var GamesObj = this.newGame;
    var getValue = this.checkObjectKey(GamesObj);
    if (getValue < 3) {
      console.log(getValue);
      return false;
    } else if (this.newGame) {
      this.$http.post('/api/games', {
        name: this.newGame.name,
        platform: this.newGame.platform,
        genre: this.newGame.genre
      });
      this.newGame = [];
    }
  }

  deleteGame(index) {
    this.$http.delete('/api/games/' + this.games[index]._id);
  }

  toggleEditGame(index) {
    this.games[index].edit = !this.games[index].edit;
  };

  saveGame(index) {
    this.$http.put('/api/games/' + this.games[index]._id, this.games[index])
    this.games[index].edit = false;
  }

  resetGames() {
    this.games = this.originalGames;
    this.filter = 'none';
  }

  filterByGenre(genre) {
    this.resetGames();
    this.games = this.games.filter(function(game) {
      return game.genre === genre;
    });
    this.filter = 'Genre: ' + genre;
  };

  filterByPlatform(platform) {
    this.resetGames();
    this.games = this.games.filter(function(game) {
      return game.platform === platform;
    });
    this.filter = 'Platform: ' + platform;
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
