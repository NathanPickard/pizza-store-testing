angular.module('pizzaStore').controller('SelectPizzaController', function($scope, OrderService) {
    $scope.choices = ['canadian', 'pepperoni', 'vegetarian'];
    $scope.pizzaType = '';

    $scope.orderInProgress = false;

    $scope.placeOrder = function() {
      $scope.orderInProgress = false;
      if ($scope.pizzaType !== '') {
        $scope.orderInProgress = true;
        OrderService.placeOrder($scope.pizzaType).then(function(data) {
          $scope.orderInProgress = false;
        });
      }
    };
  });
