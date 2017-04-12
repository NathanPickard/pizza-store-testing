describe('Order Service', function() {
  var $httpBackend;
  var $rootScope;
  var OrderService;
  var placeOrderHandler;
  var getStatusHandler;

  beforeEach(module('pizzaStore'));
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _OrderService_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    OrderService = _OrderService_;

    placeOrderHandler = $httpBackend.when('POST', '/api/order/place').respond(200, {
      id: 3,
      status: 'in progress'
    });

    getStatusHandler = $httpBackend.when('GET', '/api/order/1/status').respond(200, {
      status: 'not ordered'
    });
  }));

  describe('placeOrder', function() {
    it('places an order when pizza type is given', function(done) {
      $httpBackend.expectPOST('/api/order/place');
      OrderService.placeOrder('canadian').then(function(status) {
        expect(status).toBe('in progress');
        done();
      });
      $httpBackend.flush();
      $rootScope.$apply();
    });
  });

  describe('getOrderStatus', function() {
    it('returns null when the order is not yet placed', function(done) {
      OrderService.getOrderStatus().then(function(status) {
        expect(status).toBe(null);
        done();
      });
      $rootScope.$apply();
    });

    it('returns in progress when the order is placed', function(done) {
      getStatusHandler.respond(200, {status: 'in progress'});
      $httpBackend.expectPOST('/api/order/place');
      $httpBackend.expectGET('/api/order/1/status');
      OrderService.placeOrder('vegetarian').then(function() {
        return OrderService.getOrderStatus();
      }).then(function(status) {
        expect(status).toBe('in progress');
        done();
      });
      $httpBackend.flush();
      $rootScope.$apply();
    });
  });

  describe('getCoupon', function() {
    it('returns text and couponCode in response', function(done) {
      $httpBackend.expectGET('/api/order/coupon');
      OrderService.getCoupon().then(function(coupon) {
        expect(coupon.text).toBe('save 10% off your next order');
        expect(coupon.couponCode).toBe('TESTCOUPON');
        done();
      });
      $httpBackend.flush();
      $rootScope.$apply();
    });
  });
});