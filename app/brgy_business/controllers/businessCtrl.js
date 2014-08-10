angular.module('icesapp')
.controller('BusinessPermitCtrl', function($scope, $q, $http, $modal, $location, Phbarangay, Business, municipality, barangay, Constituent, $firebase, fbURL, $routeParams, business_table, filterFilter) {
    // Define valriables
    $scope.alerts = [];     // array of alert message objects.
    $scope.jsonph = Phbarangay;
    console.log($scope.jsonph);
    $scope.businessclearance = Business;
    console.log($scope.businessclearance);
  
    
    // Remove user
    $scope.removeRecord = function(businessId) {
        var businessUrl = fbURL + business_table + '/' + businessId;
        $scope.business = $firebase(new Firebase(businessUrl));
        $scope.business.$remove()
        $scope.alerts.splice(0, 1);
        $scope.alerts.push({
            type: 'success',
            msg: "Business Permit removed successfully!"
        });
    };
    // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // Modal: called by edit(businessId) and Add new business
    $scope.open = function(businessId) {
        var modalInstance = $modal.open({
            templateUrl: 'add_business_modal',
            controller: $scope.model,
            windowClass: 'app-modal-window',
            resolve: {
                id: function() {
                    return businessId;
                }
            }
        });
    };



    $scope.model = function($scope, $modalInstance, Business, municipality, Constituent, id, $firebase, fbURL, business_table) {
        $scope.business = {};
        $scope.brgyprofile = Constituent;
        $scope.municipality = municipality;   // result object from firebase
        $scope.barangay = barangay;       // result object from firebase
        $scope.alerts = [];         // array of alert message objects.
        $scope.municipality_array = [];  // holdes removed functioned data i.e. only result array of County obj of firebase in formate of angularjs
        $scope.barangay_array = [];    // holdes removed functioned data i.e. only result array of barangay obj of firebase in formate of angularjs
        $scope.filteredArray = [];  // holdes filterd data for dependent municipality-barangay dropdown
        
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
        }];

        $scope.regions = [{
            name: 'National Capital Region',
            value: 'National Capital Region'
        }, 
        {
            name: 'Cordillera Administrative Region',
            value: 'Cordillera Administrative Region'
        }, 
        {
            name: 'Ph fil ilocos.png Ilocos Region',
            value: 'Ph fil ilocos.png Ilocos Region'
        }, 
        {
            name: 'Central Luzon',
            value: 'Central Luzon'
        }, 
        {
            name: 'CALABARZON',
            value: 'CALABARZON'
        },
        {
            name: 'MIMAROPA',
            value: 'MIMAROPA'
        },
        {
            name: 'Northern Mindanao',
            value: 'Northern Mindanao'
        },
        {
            name: 'Bicol Region',
            value: 'Bicol Region'
        },
        {
            name: 'Zamboanga Peninsula',
            value: 'Zamboanga Peninsula'
        },
        {
            name: 'Davao Region',
            value: 'Davao Region'
        },
        {
            name: 'SOCCSKSARGEN',
            value: 'SOCCSKSARGEN'
        },
        {
            name: 'Caraga',
            value: 'Caraga'
        },
        {
            name: 'Autonomous Region in Muslim Mindanao',
            value: 'Autonomous Region in Muslim Mindanao'
        },
        {
            name: 'Western Visayas',
            value: 'Western Visayas'
        },
        {
            name: 'Eastern Visayas',
            value: 'Eastern Visayas'
        },
        {
            name: 'Central Visayas',
            value: 'Central Visayas'
        }];
        
        $scope.selectedOption = $scope.regions[0];

        console.log($scope.brgyprofile);

         $scope.options = [{
                    name: 'noel b clarion',
                    value: 'noel b clarion'
                  }, {
                    name: 'Rommel b Clarion',
                    value: 'Rommel b Clarion'
                  }];

                  $scope.selectedOption = $scope.options[0];
                  $scope.$watch('business.childname', function(v) {
                    for (var i in $scope.options) {
                      var option = $scope.options[i];
                      if (option.name === v) {
                        $scope.selectedOption = option;
                        break;
                      }
                    }
                  });

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
        $scope.$watch("business.municipality", function(newValue) {
            $scope.filteredArray = filterFilter($scope.barangay_array, newValue);
            $scope.business.barangay = $scope.filteredArray[0].id;
            if ($scope.filteredArray.length != 0 && $scope.filteredArray[0].municipal_id != newValue) {
                $scope.business.barangay = $scope.filteredArray[1].id;
            }
        }, true);
        // if clicked edit. id comes from $scope.modal->businessId
        if (angular.isDefined(id)) {
            var businessUrl = fbURL + business_table + '/' + id;
            $scope.business = $firebase(new Firebase(businessUrl));
            $scope.business.id = id;
        } else {
            $scope.business.province = $scope.provinces[0].name;
            $scope.business.municipality = $scope.municipality_array[0].id;
        }


        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        // Add new business
        $scope.add = function() {
            Business.$add($scope.business)
            $modalInstance.dismiss('cancel');
        };
        // Save edited business.
        $scope.save = function() {
            $scope.business.$save();
            $modalInstance.dismiss('cancel');
        };
    };
}) 