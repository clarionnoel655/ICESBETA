angular.module('icesapp')
.controller('ConstituentCtrl', function($scope, $modal, $http, $location, Constituent, municipality, barangay, $firebase, fbURL, $routeParams, constituent_profile, filterFilter) {
    // Define valriables
    $scope.alerts = [];     // array of alert message objects.
    $scope.consprofiles = Constituent;

    $scope.brgy_obj = $http.get('app/barangayjson/Barangays.json').success(function(data) {

     jQuery.each(data, function(i, val) {

          for (var key in val) {
           var obj = val[key];
           for (var prop in obj) {
                console.log(obj[prop]);       
            }
          }
    }); 

    });  
    
    // Remove user
    $scope.removeRecord = function(consId) {
        var consprofileUrl = fbURL + constituent_profile + '/' + consId;
        $scope.consprofile = $firebase(new Firebase(consprofileUrl));
        $scope.consprofile.$remove()
        $scope.alerts.splice(0, 1);
        $scope.alerts.push({
            type: 'success',
            msg: "Barangay Profile removed successfully!"
        });
    };
    // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    // Modal: called by edit(consId) and Add new consprofile
    $scope.open = function(consId) {
        var modalInstance = $modal.open({
            templateUrl: 'add_user_modal',
            controller: $scope.model,
            windowClass: 'app-modal-window',
            resolve: {
                id: function() {
                    return consId;
                }
            }
        });
    };
    $scope.model = function($scope, $modalInstance, Constituent, municipality, id, $firebase, fbURL, constituent_profile) {
        $scope.consprofile = {};
        $scope.municipality = municipality;   // result object from firebase
        $scope.barangay = barangay;       // result object from firebase
        $scope.alerts = [];         // array of alert message objects.
        $scope.municipality_array = [];  // holdes removed functioned data i.e. only result array of County obj of firebase in formate of angularjs
        $scope.barangay_array = [];    // holdes removed functioned data i.e. only result array of barangay obj of firebase in formate of angularjs
        $scope.filteredArray = [];  // holdes filterd data for dependent municipality-barangay dropdown
        $scope.languagesfamily = [{
            name: 'English',
            value: "English"
        }, {
            name: 'Chinese',
            value: "Chinese"
        }, {
            name: 'Pilipino',
            value: "Pilipino"
        },
            $scope.languagesdialect = [{
                name: 'Tagalog',
                value: "Tagalog"
            }, {
                name: 'Ilocano',
                value: "Ilocano"
            }, {
                name: 'Waray',
                value: "Waray"
            }, {
                name: 'Ilongo',
                value: "Ilongo"
            }, {
                name: 'Cebuano',
                value: "Cebuano"
            },
                $scope.religions = [{
                    name: 'Roman Catholic',
                    value: "Roman Catholic"
                }, {
                    name: 'Islam',
                    value: "Islam"
                }, {
                    name: 'Protestants',
                    value: "Protestants"
                }, {
                    name: 'Evangelical Christian',
                    value: "Evangelical Christian"
                }, {
                    name: 'Igleisa ni Cristo',
                    value: "Igleisa ni Cristo"
                }, {
                    name: 'Jehovahs witness',
                    value: "Jehovahs witness"
                }
                ]
            ]

        ];

        $scope.immunizations = [
            'BCG',
            'Hepatitis',
            'TT',
            'Polio',
            'Others Pls. Specify'
        ];

        $scope.consprofile = {
            immunizations: []
        };

        $scope.nutritions = [
            'Home Visit',
            'Bench Conference',
            'Mother Class',
            'Cooking, food preparation',
            'Pabasa',
            'BNC Meeting',
            'Ind. Consultation',
            'Supplemental Feeding'
        ];

        $scope.consprofile = {
            nutritions: []
        };

        $scope.healths = [
            'Barangay Health Center',
            'Private Doctors Clinic',
            'Government Hospitals',
            'Lot Ownership',
            'Owned',
            'Rented',
            'Leased',
            'Amortizing'
        ];

        $scope.consprofile = {
            healths: []
        };

        $scope.others = [
            'House Ownership',
            'Owned',
            'Rented',
            'Leased',
            'Amortizing',
            'Others'
        ];

        $scope.consprofile = {
            others: []
        };

        $scope.waters = [
            'MCWD',
            'Pump',
            'Artesian Well',
            'Others',
        ];

        $scope.consprofile = {
            waters: []
        };

        $scope.cottages = [
            'Food Preservation',
            'Food Processing',
            'Handicraft',
            'Others',
        ];

        $scope.consprofile = {
            cottages: []
        };

        $scope.supplies = [
            'Always available',
            'Sometimes no water',
            'Most of the time',
            'no water available'
        ];

        $scope.consprofile = {
            supplies: []
        };

        $scope.facilities = [
            'Always available',
            'Sometimes no water',
            'Most of the time',
            'no water available'
        ];

        $scope.consprofile = {
            facilities: []
        };

        $scope.otherones = [
            'Garbage Disosal',
            'Always available',
            'Sometimes no water',
            'Most of the time',
            'no water available',
            'Others'
        ];

        $scope.consprofile = {
            otherones: []
        };



        
        // Convert firebase result object into angularjs object array all other deafault functions of firebase gets removed
        $.each(angular.fromJson(angular.toJson(municipality)), function(key, val) {
            val.id = parseInt(key);
            $scope.municipality_array.push(val);
        });
        $.each(angular.fromJson(angular.toJson(barangay)), function(key, val) {
            val.id = parseInt(key);
            $scope.barangay_array.push(val);
        });
        // Watch function for municipality-barangay dropdown
        $scope.$watch("consprofile.municipality", function(newValue) {
            $scope.filteredArray = filterFilter($scope.barangay_array, newValue);
            $scope.consprofile.barangay = $scope.filteredArray[0].id;
            if ($scope.filteredArray.length != 0 && $scope.filteredArray[0].municipal_id != newValue) {
                $scope.consprofile.barangay = $scope.filteredArray[1].id;
            }
        }, true);
        // if clicked edit. id comes from $scope.modal->consId
        if (angular.isDefined(id)) {
            var consprofileUrl = fbURL + constituent_profile + '/' + id;
            $scope.consprofile = $firebase(new Firebase(consprofileUrl));
            $scope.consprofile.id = id;
        } else {
            $scope.consprofile.languagefamily = $scope.languagesfamily[0].name;
            $scope.consprofile.languagedialect = $scope.languagesdialect[0].name;
            $scope.consprofile.religion     = $scope.religions[0].name;
            $scope.consprofile.municipality = $scope.municipality_array[0].id;
        }


        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        // Add new consprofile
        $scope.add = function() {
            Constituent.$add($scope.consprofile)
            $modalInstance.dismiss('cancel');
        };
        // Save edited consprofile.
        $scope.save = function() {
            $scope.consprofile.$save();
            console.log("data entry");
            $modalInstance.dismiss('cancel');
        };
    };
}) 