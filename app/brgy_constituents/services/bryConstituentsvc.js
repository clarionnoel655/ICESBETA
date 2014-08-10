angular.module('icesapp')
.factory('Constituent', function($firebase, fbURL, constituent_profile) {
    return $firebase(new Firebase(fbURL + constituent_profile));
})