angular.module('icesapp')

.controller('loginCtrl', function ($scope, $firebaseSimpleLogin, fbURL, $window, $rootScope) {
    var fbRef = new Firebase(fbURL);
    $scope.errors = [];
    $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
    $scope.brgyuser = {
        email : '',
        password: ''
    }

    $scope.login = function(){

    $scope.errors = [];
    if($scope.brgyuser.email === ''){
        $scope.errors.push('Please enter your email');
    }
    if($scope.brgyuser.password === ''){
        $scope.errors.push('Please enter your password');
    }
    if($scope.errors.length > 0){
        return;
    }
    var promise = $scope.simpleLogin.$login('password',{
        email: $scope.brgyuser.email,
        password: $scope.brgyuser.password
    });

    promise.then(function(brgyuser){
        console.log(brgyuser);
        //rootscope is the parent scope
        $rootScope.brgyuser = brgyuser;
        console.log($rootScope.brgyuser.email);
        $window.location.href = '#/mainpage'
        console.log("You're now logging in");
    }, function(error){
        console.log(error);
        if(error.code === 'INVALID_EMAIL'){
            $scope.errors.push('The email was invalid');
        }
        if(error.code === 'INVALID_PASSWORD'){
            $scope.errors.push('The password was invalid');
        }
    });
 }

});