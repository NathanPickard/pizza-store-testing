angular.module('pizzaStore').directive('orderStatus', function(OrderService) {
    return {
      restrict: 'E',
      scope: {},
      template: '<ul></ul>',
      link: function(scope, element, attr) {
        var checkStatus = function() {
          OrderService.getOrderStatus().then(function(status) {
            element.find('ul').append('<li>' + status + '</li>');
          });
        };
        checkStatus();
        scope.$on('check-order-status', function() {
          checkStatus();
        });
      }
    };
  });
