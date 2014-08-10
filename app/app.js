angular.module('icesapp',[
    'localytics.directives',
    'ngRoute', 
    'firebase', 
    'ui.bootstrap', 
    'checklist-model',
    'routeSecurity',
    'simpleLoginTools'
  ])

.value('fbURL', 'https://icesbeta.firebaseio.com/')
.value('business_table', 'brgy_business')
.value('municipalitylist', 'Municipality')
.value('barangaylist', 'Barangay')
.value('brgyjudicial_table', 'brgy_judicial')
.value('brgy_clearance_table', 'brgy_clearance')
.value('brgy_residence_profile', 'brgy_residence_profile')
.value('constituent_profile', 'constituent_details')
.value('loginRedirectPath', '/login')


.factory('municipality', function($firebase, fbURL, municipalitylist) {
    return $firebase(new Firebase(fbURL + municipalitylist));
})
.factory('barangay', function($firebase, fbURL, barangaylist) {
    return $firebase(new Firebase(fbURL + barangaylist));
})
.factory('Phbarangay', function($http) { 

    var obj = {content:null};

    $http.get('app/barangayjson/Barangays.json').success(function(data) {
        // you can do some processing here
        obj.content = data;
        console.log(data);
    });    

    return obj;    
})

.config(function($routeProvider) {


    $routeProvider
        .when('/', {
            templateUrl: 'app/main.html',
            authRequired : false
        })
        .when('/mainpage', {
            templateUrl: 'app/main2.html',
            authRequired : true
        })
        .when('/login', {
            controller : 'loginCtrl',
            templateUrl: 'app/userlogin/view/login.html',
            authRequired : false
        })
        .when('/register', {
          templateUrl: 'app/userlogin/view/register.html',
          controller : 'registerCtrl',
          authRequired : false
        })
        .when('/logout', {
            controller: 'logoutCtrl',
            templateUrl: 'app/main.html',
            authRequired : false
        })
        .when('/businesslist', {
            controller : 'BusinessPermitCtrl',
            templateUrl: 'app/brgy_business/view/businesslist.html',
            authRequired : true
        })
        .when('/Judicial_list', {
            controller: 'JudicialistCtrl',
            templateUrl: 'app/brgy_judicial/view/judicialist.html',
            authRequired : true
        })
        .when('/brgyclearance', {
            controller: 'createBrgyClearanceCtrl',
            templateUrl: 'app/brgy_clearance/view/clearancelist.html',
            authRequired : true
        })
        .when('/brgyprofile', {
            controller: 'ProfilelistCtrl',
            templateUrl: 'app/brgy_residence/view/residencelist.html',
            authRequired : true
        })
        .when('/Constituent', {
            controller: 'ConstituentCtrl',
            templateUrl: 'app/brgy_constituents/view/constituentlist.html',
            authRequired : true
        })
        .otherwise({
            redirectTo: '/'
        });
})

