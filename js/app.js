/* global angular */
'use strict';

(function () {
  angular
  .module('wdinstagram', [
    'ui.router',
    'ngResource'
  ])
  .config([
    '$stateProvider',
    RouterFunction
  ])
  .controller('GrumbleIndexController', [
    'Grumble',
    GrumbleIndexControllerFunction
  ])
  .controller('GrumbleShowController', [
    'Grumble',
    '$stateParams',
    GrumbleShowControllerFunction
  ])
  .controller('GrumbleNewController', [
    '$state',
    'Grumble',
    GrumbleNewControllerFunction
  ])
  .controller('GrumbleEditController', [
    '$state',
    'Grumble',
    GrumbleEditControllerFunction
  ])
  .factory('Grumble', [
    '$resource',
    grumbleService
  ])

  function grumbleService ($resource) {
    return $resource('http://localhost:3000/entries/:id', {}, {
      update: {
        method: 'PUT'
      }
    })
  }

  function RouterFunction ($stateProvider) {
    $stateProvider
  .state('grumbleIndex', {
    url: '/entries',
    templateUrl: 'js/ng-views/index.html',
    controller: 'GrumbleIndexController',
    controllerAs: 'vm'
  })
  .state('grumbleNew', {
    url: '/entries/new',
    templateUrl: '/js/ng-views/new.html',
    controller: 'GrumbleNewController',
    controllerAs: 'vm'
  })
  .state('grumbleEdit', {
    url: '/entries/:id/edit',
    templateUrl: 'js/ng-views/edit.html',
    controller: 'GrumbleEditController',
    controllerAs: 'vm'
  })
  .state('grumbleShow', {
    url: '/entries/:id',
    templateUrl: 'js/ng-views/show.html',
    controller: 'GrumbleShowController',
    controllerAs: 'vm'
  })
  }

  function GrumbleIndexControllerFunction (Grumble) {
    this.grumbles = Grumble.query()
  }

  function GrumbleNewControllerFunction ($state, Grumble) {
    this.grumble = new Grumble()
    this.create = function () {
      this.grumble.$save((grumble) => {
        $state.go('grumbleShow', {id: grumble.id})
      })
    }
  }

  function GrumbleShowControllerFunction (Grumble, $stateParams) {
    this.grumble = Grumble.get({id: $stateParams.id})
  }

  function GrumbleEditControllerFunction ($state, Grumble) {
    this.grumble = Grumble.get({id: $state.params.id})
    this.update = function () {
      this.grumble.$update({id: $state.params.id}, (grumble) => {
        $state.go('grumbleShow', {id: this.grumble.id})
      })
    }
    this.destroy = function () {
      this.grumble.$delete({id: $state.params.id}, () => {
        $state.go('grumbleIndex')
      })
    }
  }
})()
