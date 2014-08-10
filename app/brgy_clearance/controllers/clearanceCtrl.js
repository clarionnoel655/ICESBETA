angular.module('icesapp')
.controller('createBrgyClearanceCtrl', function($scope, $modal, $location, Brgyclearance, municipality, barangay, $firebase, fbURL, $routeParams, brgy_clearance_table, filterFilter) {
    // Define valriables
    $scope.alerts = [];     // array of alert message objects.
    $scope.brgyclearance = Brgyclearance;
    
    // Remove user
    $scope.removeRecord = function(clearanceId) {
        var clearanceUrl = fbURL + brgy_clearance_table + '/' + clearanceId;
        $scope.clearance = $firebase(new Firebase(clearanceUrl));
        $scope.clearance.$remove()
        $scope.alerts.splice(0, 1);
        $scope.alerts.push({
            type: 'success',
            msg: "User removed successfully!"
        });
    };
    // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    // Modal: called by edit(clearanceId) and Add new clearance
    $scope.open = function(clearanceId, size) {
        var modalInstance = $modal.open({
            templateUrl: 'add_user_modal',
            controller: $scope.model,
            windowClass: 'app-modal-window',
            resolve: {
                id: function() {
                    return clearanceId;
                }
            }
        });
    };
    $scope.model = function($scope, $modalInstance, Brgyclearance, municipality, id, $firebase, fbURL, brgy_clearance_table) {
        $scope.clearance = {};
        $scope.municipality = municipality;   // result object from firebase
        $scope.barangay = barangay;       // result object from firebase
        $scope.alerts = [];         // array of alert message objects.
        $scope.municipality_array = [];  // holdes removed functioned data i.e. only result array of County obj of firebase in formate of angularjs
        $scope.barangay_array = [];    // holdes removed functioned data i.e. only result array of barangay obj of firebase in formate of angularjs
        $scope.filteredArray = [];  // holdes filterd data for dependent municipality-barangay dropdown
        $scope.cities = [{
            name:'Cebu City',
            value:"Cebu City"
        }, {
            name: 'Banilad City',
            value: "Banilad City"
        }, {
            name: 'Lahug City',
            value: "Lahug City"
        },  {
            name: 'Talamban City',
            value: "Talamban City"
        },  {
            name: 'Talisay City',
            value: "Talisay City"
        },  {
            name: 'Mandaue City',
            value: "Mandaue City"
        },

            $scope.provinces = [{
                name: 'Cebu',
                value: "Cebu"
            }, {
                name: 'Lanao del Norte',
                value: "Lanao del Norte"
            }, {
                name: 'Lanao del Sur',
                value: "Lanao del Sur"
            }, {
                name: 'Zambuanga del Sur',
                value: "Zambuanga del Sur"
            }, {
                name: 'Cagayan de Oro',
                value: "Cagayan de Oro"
            }]
        ];
        
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
        $scope.$watch("clearance.municipality", function(newValue) {
            $scope.filteredArray = filterFilter($scope.barangay_array, newValue);
            $scope.clearance.barangay = $scope.filteredArray[0].id;
            if ($scope.filteredArray.length != 0 && $scope.filteredArray[0].municipal_id != newValue) {
                $scope.clearance.barangay = $scope.filteredArray[0].id;
            }
        }, true);
        // if clicked edit. id comes from $scope.modal->clearanceId
        if (angular.isDefined(id)) {
            var clearanceUrl = fbURL + brgy_clearance_table + '/' + id;
            $scope.clearance = $firebase(new Firebase(clearanceUrl));
            $scope.clearance.id = id;
        } else {
            $scope.clearance.city = $scope.cities[0].name;
            $scope.clearance.province = $scope.provinces[0].name;
            $scope.clearance.municipality = $scope.municipality_array[0].id;
        }
        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        // Add new clearance
        $scope.add = function() {
            Brgyclearance.$add($scope.clearance)
            $modalInstance.dismiss('cancel');
        };
        // Save edited clearance.
        $scope.save = function() {
            $scope.clearance.$save();
            $modalInstance.dismiss('cancel');
        };
    };
}) 