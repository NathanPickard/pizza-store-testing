angular.module('pizzaStore').controller('OrderStatusController', function($scope, $interval, OrderService) {
    $scope.orderStatus = 'pizza is on the way!';
    // $scope.coupon = null;

    // OrderService.getCoupon().then(function(coupon) {
    //   $scope.coupon = coupon;
    // });

    var checkOrderStatus = $interval(function() {
      $scope.$broadcast('check-order-status');
    }, 1000);

    $scope.$on('destroy', function() {
      $interval.cancel(checkOrderStatus);
    });
  });
