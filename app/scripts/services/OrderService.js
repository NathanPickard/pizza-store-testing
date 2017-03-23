angular
.module('pizzaStore')
// section 4.1.7 add $resource as dependency
.service('OrderService', function($q, $resource) {

  // section 4.1.7 create order $resource
  var Order = $resource('/api/order/:id/:controller', {
    id: '@id',
    controller: '@controller'
  }, {
    place: {
      method: 'POST',
      params: { controller: 'place' }
    },
    getStatus: {
      method: 'GET',
      params: { controller: 'status' }
    },
    getCoupon: {
      method: 'GET',
      params: { controller: 'coupon' }
    }
  });

  // section 4.1.8 implement placeOrder with $resource
  var orderPlaced = false;
  this.placeOrder = function(pizzaType) {
    var deferred = $q.defer();
    var order = new Order({ pizzaType: pizzaType });
    order.$place(function(order) {
      orderPlaced = true;
      deferred.resolve(order.status);
    });
    return deferred.promise;
  };

  // section 4.1.9 implement getOrderStatus with $resource
  this.getOrderStatus = function() {
    var deferred = $q.defer();
    if (orderPlaced) {
      Order.getStatus({ id: 1 }, function(order) {
        deferred.resolve(order.status);
      });
      return deferred.promise;
    }
    return $q.when(null);
  };

  this.getCoupon = function() {
    var deferred = $q.defer();
    Order.getCoupon(function(coupon) {
      deferred.resolve(coupon);
    });
    return deferred.promise;
  }
});
