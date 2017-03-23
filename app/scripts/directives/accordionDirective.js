angular
  .module('pizzaStore')
  .directive('accordion', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      template: '<div ng-transclude></div>',
      link: function(scope, element) {
        element.children().find('div').css('display', 'none');
        element.find('h2').on('click', function(event) {
          element.children().find('div').css('display', 'none');
          var panel = angular.element(event.target).next();
          panel.css('display', 'block');
        });
      }
    };
  });
