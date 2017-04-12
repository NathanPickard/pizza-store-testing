describe('orderStatus directive', function() {
  beforeEach(module('pizzaStore'));

  var OrderService;
  beforeEach(inject(function($q, _OrderService_) {
    OrderService = _OrderService_;
    var callCount = 0;
    var fakeGetOrderStatus = function() {
      callCount += 1;
      switch (callCount) {
        case 1:
          return $q.when('not ordered');
        case 2:
          return $q.when('in progress');
        default:
          return $q.when('complete');
      }
    };
    spyOn(OrderService, 'getOrderStatus').and.callFake(fakeGetOrderStatus);
  }));

  var scope;
  var element;
  var html = '<order-status></order-status>';
  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(html)(scope);
    scope.$digest();
  }));

  it('displays order status whenever status changes', function() {
    var statusElement = element.find('ul').find('li');
    expect(statusElement.length).toBe(1);
    expect(statusElement.text()).toBe('not ordered');

    scope.$broadcast('check-order-status');
    scope.$digest();
    statusElement = element.find('ul').find('li');
    expect(statusElement.length).toBe(2);
    expect(statusElement.text()).toBe('not ordered' + 'in progress');

    scope.$broadcast('check-order-status');
    scope.$digest();
    statusElement = element.find('ul').find('li');
    expect(statusElement.length).toBe(3);
    expect(statusElement.text()).toBe('not ordered' + 'in progress' + 'complete');
  });
});