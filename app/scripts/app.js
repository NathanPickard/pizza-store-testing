angular
  // section 4.1.7 add ngResource as dependency
  .module('pizzaStore', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/select-pizza.html',
        controller: 'SelectPizzaController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
