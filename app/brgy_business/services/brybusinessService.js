angular.module('icesapp')
.factory('Business', function($firebase, fbURL, business_table) {
    return $firebase(new Firebase(fbURL + business_table));
})