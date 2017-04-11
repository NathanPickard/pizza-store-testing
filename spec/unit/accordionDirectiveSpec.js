describe('Accordion Directive', function() {
  var scope;
  var element;
  var html = '<accordion>'
  + '<h2>Panel 1 Title</h2>'
  + '<div>Panel 1 Text</div>'
  + '<h2>Panel 2 Title</h2>'
  + '<div>Panel 2 Text</div>'
  + '</accordion';

  var getPanels = function() {
    return element.children.find('div');
  };

  var isHidden = function(panel) {
    return angular.element(panel).css('display') === 'none';
  };

  beforeEach(module('pizzaStore'));
  beforeEach(inject(function($compile, $rootScope) {
    var linkingFn = $compile(html);
    scope = $rootScope;
    element = linkingFn(scope);
  }));

  it('starts with all panels closed', function() {
    var panels = getPanels();
    for(var i=0; i < panels.length; i += 1) {
      expect(isHidden(panels[i])).toBe(true);
    }
  });

  it('opens one panel at a time', function() {
    var panels = getPanels();
    expect(isHidden(panels[0])).toBe(true);
    element.find('h2')[0].click();
    expect(isHidden(panels[0])).toBe(false);
    expect(isHidden(panels[1])).toBe(true);
    element.find('h2')[1].click();
    expect(isHidden(panels[0])).toBe(true);
    expect(isHidden(panels[1])).toBe(false);

  })
})