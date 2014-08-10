angular.module('icesapp')
.factory('Brgyjudicial', function($firebase, fbURL, brgyjudicial_table) {
    return $firebase(new Firebase(fbURL + brgyjudicial_table));
})