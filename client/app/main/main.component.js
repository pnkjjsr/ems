import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/categories')
      .then(response => {
        this.categories = response.data;
        this.socket.syncUpdates('categories', this.categories);
      });
    this.$http.get('/api/years/')
      .then(response => {
        return this.years = response.data;
        this.socket.syncUpdates('years', this.years);
      });
  }

  loadMake(category) {
    var category = category;
    if (category) {
      this.$http.get('/api/makes')
        .then(response => {
          this.makes = response.data.filter(function(index) {
            return index.category === category;
          });
          this.socket.syncUpdates('makes', this.makes);
        });
    }
  }

  loadModal(make) {
    var make = make;
    if (make) {
      this.$http.get('/api/modals')
        .then(response => {
          this.models = response.data.filter(function(index) {
            return index.make === make;
          });
          this.socket.syncUpdates('models', this.models);
        });
    }
  }

  loadTrim(modal) {
    var modal = model;
    if (model) {
      this.$http.get('/api/trims?make='+make)
        .then(response => {
          this.trims = response.data.filter(function(index) {
            return index.make === make;
          });
          this.socket.syncUpdates('trims', this.trims);
        });
    }
  }


}

export default angular.module('emsApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
