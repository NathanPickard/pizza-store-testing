angular
  // section 4.1.7 add ngResource as dependency
  .module('pizzaStore', ['ngRoute', 'ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/select-pizza.html',
        controller: 'SelectPizzaController'
      })
      .when('/order-status', {
        templateUrl: 'views/order-status.html',
        controller: 'OrderStatusController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
