angular
  .module('pizzaStore')
  .controller('SelectPizzaController', function($scope, OrderService, $location) {
    $scope.choices = ['canadian', 'pepperoni', 'vegetarian'];
    $scope.pizzaType = '';

    $scope.orderInProgress = false;
    $scope.placeOrder = function() {
      $scope.orderInProgress = false;
      if ($scope.pizzaType !== '') {
        $scope.orderInProgress = true;
        OrderService.placeOrder($scope.pizzaType).then(function(data) {
          $location.path('/order-status');
          $scope.orderInProgress = false;
        });
      }
    };
  });
