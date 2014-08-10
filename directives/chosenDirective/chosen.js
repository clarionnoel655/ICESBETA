angular.module('icesapp')
.directive('chosen', function(){
            var linker = function(scope,element,attr){
                scope.$watch('problemstest', function(){
                    element.trigger('chosen:updated');
                })
                element.chosen();
            };
            return {
                restrict:'A',
                link: linker
            }
})