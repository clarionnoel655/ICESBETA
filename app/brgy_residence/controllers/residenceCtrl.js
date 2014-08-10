angular.module('icesapp')
.controller('ProfilelistCtrl', function($scope, $modal, $location, Brgyprofile, municipality, barangay, $firebase, fbURL, $routeParams, brgy_residence_profile, filterFilter) {
    // Define valriables
    $scope.alerts = [];     // array of alert message objects.
    $scope.brgyprofiles = Brgyprofile;
    
    // Remove user
    $scope.removeRecord = function(profileId) {
        var brgyprofileUrl = fbURL + brgy_residence_profile + '/' + profileId;
        $scope.brgyprofile = $firebase(new Firebase(brgyprofileUrl));
        $scope.brgyprofile.$remove()
        $scope.alerts.splice(0, 1);
        $scope.alerts.push({
            type: 'success',
            msg: "Residence Profile removed successfully!"
        });
    };
    // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    // Modal: called by edit(profileId) and Add new brgyprofile
    $scope.open = function(profileId, size) {
        var modalInstance = $modal.open({
            templateUrl: 'add_user_modal',
            controller: $scope.model,
            windowClass: 'app-modal-window',
            resolve: {
                id: function() {
                    return profileId;
                }
            }
        });
    };
    $scope.model = function($scope, $modalInstance, Brgyprofile, municipality, id, $firebase, fbURL, brgy_residence_profile) {
        $scope.brgyprofile = {};
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
            }]
        ];

        $scope.immunizations = [
            'BCG',
            'Hepatitis',
            'TT',
            'Polio'
        ];

        $scope.brgyprofile = {
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

        $scope.brgyprofile = {
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

        $scope.brgyprofile = {
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

        $scope.brgyprofile = {
            others: []
        };

        $scope.waters = [
            'MCWD',
            'Pump',
            'Artesian Well',
            'Others',
        ];

        $scope.brgyprofile = {
            waters: []
        };

        $scope.supplies = [
            'Always available',
            'Sometimes no water',
            'Most of the time',
            'no water available'
        ];

        $scope.brgyprofile = {
            supplies: []
        };

        $scope.facilities = [
            'Always available',
            'Sometimes no water',
            'Most of the time',
            'no water available'
        ];

        $scope.brgyprofile = {
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

        $scope.brgyprofile = {
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
        $scope.$watch("brgyprofile.municipality", function(newValue) {
            $scope.filteredArray = filterFilter($scope.barangay_array, newValue);
            $scope.brgyprofile.barangay = $scope.filteredArray[0].id;
            if ($scope.filteredArray.length != 0 && $scope.filteredArray[0].municipal_id != newValue) {
                $scope.brgyprofile.barangay = $scope.filteredArray[1].id;
            }
        }, true);
        // if clicked edit. id comes from $scope.modal->profileId
        if (angular.isDefined(id)) {
            var brgyprofileUrl = fbURL + brgy_residence_profile + '/' + id;
            $scope.brgyprofile = $firebase(new Firebase(brgyprofileUrl));
            $scope.brgyprofile.id = id;
        } else {
            $scope.brgyprofile.languagefamily = $scope.languagesfamily[0].name;
            $scope.brgyprofile.languagedialect = $scope.languagesdialect[0].name;
            $scope.brgyprofile.municipality = $scope.municipality_array[0].id;
        }


        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        // Add new brgyprofile
        $scope.add = function() {
            Brgyprofile.$add($scope.brgyprofile)
            $modalInstance.dismiss('cancel');
        };
        // Save edited brgyprofile.
        $scope.save = function() {
            $scope.brgyprofile.$save();
            console.log("data entry");
            $modalInstance.dismiss('cancel');
        };
    };
}) 