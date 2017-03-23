describe('Order Status controller', function() {
  var scope;
  var ctrl;
  var mockOrderService;
  var rootScope;
  var interval;

  beforeEach(module('pizzaStore'));
  beforeEach(inject(function($q) {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getCoupon']);
    var coupon = { text: 'hello world', couponCode: 'FREEPIZZA' };
    var status = 'in progress';

    mockOrderService.getCoupon.and.returnValue($q.when(coupon));
  }));

  beforeEach(inject(function($rootScope, $controller, $interval) {
    rootScope = $rootScope;
    interval = $interval;
    spyOn(rootScope, '$broadcast').and.callThrough();
    scope = $rootScope.$new();
    ctrl = $controller('OrderStatusController', {
      $scope: scope,
      OrderService: mockOrderService
    });
  }));

  it('loads a coupon from the server', function() {
    expect(mockOrderService.getCoupon).toHaveBeenCalled();
    scope.$apply();
    expect(scope.coupon.text).toEqual('hello world');
    expect(scope.coupon.couponCode).toEqual('FREEPIZZA');
  });

  it('checks the order status from the server every minute', function() {
    interval.flush(5 * 60 * 1000);
    expect(rootScope.$broadcast.calls.count()).toEqual(5);
    expect(rootScope.$broadcast).toHaveBeenCalledWith('check-order-status');
  });
});
