angular.module('icesapp')
.controller('registerCtrl', function($scope, $firebaseSimpleLogin, $window, fbURL, $location, $timeout, $firebase) {
    var appUrl = new Firebase(fbURL);
    $scope.errors = [];

    $scope.loginUrl = $firebaseSimpleLogin(appUrl);
    $scope.registerUser = {
        email: '',
        password: '',
        confirmPassword : ''
    };

    $scope.register = function(){

        console.log("Entering registration...")
        var errors = [], user = $scope.registerUser;
        if(user.email === ''){
            errors.push('Please enter an email');
        }
        if(user.password === ''){
            errors.push('Password must not be blank');
        }
        else if(user.password !== user.confirmPassword){
            errors.push('Password must match');
        }
        if(errors.length > 0){
            $scope.errors = errors;
            return;
        }
        var promise = $scope.loginUrl
        .$createUser(user.email, user.password);
        console.log(promise);
        console.log('You are now logging in');
        $window.location.href = '#/mainpage';
        promise.then(function(user){
            console.log(user);
        }, function(error){
            console.log(error);
        });
    };
  })