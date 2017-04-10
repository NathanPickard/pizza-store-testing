describe('main controller', function() {
  it('should display a welcome message', function() {
    homepage.get();
    expect(homepage.pageHeading.getText()).toEqual('welcome to the pizza store!');
  });
});