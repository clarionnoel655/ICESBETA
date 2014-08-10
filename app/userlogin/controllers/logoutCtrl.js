angular.module('icesapp')
.controller('logoutCtrl', function($scope, $firebaseSimpleLogin, fbURL, $window, $firebase) {
    var fbUrl = new Firebase(fbURL);
    $scope.userlogin = $firebaseSimpleLogin(fbUrl);

    $scope.userlogin.$logout();
    console.log('You are now logging out');
    $window.location.href = '#/';
    $window.location.reload();
})