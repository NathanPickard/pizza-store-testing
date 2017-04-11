describe('Place An Order', function() {
  it('should navigate to the order status page when a user places an order', function() {
    browser.get('/#/');

    expect(browser.getLocationAbsUrl()).toBe('/');

    var panels = element.all(by.tagName('h2'));
    panels.get(1).click();
    browser.sleep(1000);
    panels.get(0).click();
    browser.sleep(1000);
    panels.get(1).click();
    browser.sleep(1000);

    var pizzaTypeOptions = element.all(by.tagName('option'));
    pizzaTypeOptions.get(1).click();

    var selectedPizzaType = element(by.css('option:checked'));
    expect(selectedPizzaType.getText()).toBe(pizzaTypeOptions.get(0).getText());

    var placeOrderButton = element(by.buttonText('Place Order'));
    placeOrderButton.click();

    expect(browser.getLocationAbsUrl()).toBe('/order-status');

  });
});