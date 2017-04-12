angular.module('pizzaStore').service('OrderService', function($q, $resource) {
    

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
      params: {controller: 'coupon' }
    }
  });


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
