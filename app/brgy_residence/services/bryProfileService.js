angular.module('icesapp')
.factory('Brgyprofile', function($firebase, fbURL, brgy_residence_profile) {
    return $firebase(new Firebase(fbURL + brgy_residence_profile));
})