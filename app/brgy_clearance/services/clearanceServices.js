angular.module('icesapp')
.factory('Brgyclearance', function($firebase, fbURL, brgy_clearance_table) {
    return $firebase(new Firebase(fbURL + brgy_clearance_table));
})