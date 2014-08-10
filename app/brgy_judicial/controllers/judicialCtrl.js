angular.module('icesapp')

.directive('chosen', function(){
            var linker = function(scope,element,attr){
                scope.$watch('brgy_obj', function(){
                    element.trigger('chosen:updated');
                })
                element.chosen();
            };
            return {
                restrict:'A',
                link: linker
            }
})

.controller('JudicialistCtrl', function($scope, $q, $timeout, $modal, $location, $http, Brgyjudicial, municipality, Constituent, barangay, $firebase, fbURL, $routeParams, brgyjudicial_table, filterFilter) {
    // Define valriables
    $scope.alerts = [];     // array of alert message objects.
    $scope.brgyjudicials = Brgyjudicial;
    // Remove user
    $scope.removeRecord = function(judicialId) {
        var userUrl = fbURL + brgyjudicial_table + '/' + judicialId;
        $scope.judicial = $firebase(new Firebase(userUrl));
        $scope.judicial.$remove()
        $scope.alerts.splice(0, 1);
        $scope.alerts.push({
            type: 'success',
            msg: "Barangay Judicial removed successfully!"
        });
    };
    // Close alert message
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    // Modal: called by edit(judicialId) and Add new judicial
    $scope.open = function(judicialId) {
        var modalInstance = $modal.open({
            templateUrl: 'add_user_modal',
            controller: $scope.model,
            windowClass: 'app-modal-window',
            resolve: {
                id: function() {
                    return judicialId;
                }
            }
        });
    };

    var simulateAjax;

          simulateAjax = function(result) {
            var deferred, fn;

            deferred = $q.defer();
            fn = function() {
              return deferred.resolve(result);
            };
            $timeout(fn, 1000);
            return deferred.promise;
          };
          simulateAjax([
            {"name" : "noel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "rommel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "nico clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "armand clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "rey clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "cornel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "mano clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "leor clarion", "phone" : [234242424, 234234243, 234234234], "age": 23}
            ])

          .then(function(result) {
            return $scope.optionsFromQuery = result;
          });

        $scope.brgy_constituents = [];

        $scope.brgy_obj = function(){

            $http.get('https://icesbeta.firebaseio.com/constituent_details.json')
            .then(function(result){
            $scope.brgy_constituents = result.data;
            console.log($scope.brgy_constituents);
        });

        }

        $scope.brgy_obj();
        

    $scope.model = function($scope, $modalInstance, $q, $timeout, Brgyjudicial, municipality, id, Constituent, $firebase, fbURL, brgyjudicial_table) {
   
        $scope.judicial = {};
        $scope.childname = Constituent;
        // console.log( $scope.childnames);
        $scope.municipality = municipality;   // result object from firebase
        $scope.barangay = barangay;       // result object from firebase
        $scope.alerts = [];         // array of alert message objects.
        $scope.municipality_array = [];  // holdes removed functioned data i.e. only result array of County obj of firebase in formate of angularjs
        $scope.barangay_array = [];    // holdes removed functioned data i.e. only result array of barangay obj of firebase in formate of angularjs
        $scope.filteredArray = [];  // holdes filterd data for dependent municipality-barangay dropdown
        $scope.childnames = [];
        

        var simulateAjax;

          simulateAjax = function(result) {
            var deferred, fn;

            deferred = $q.defer();
            fn = function() {
              return deferred.resolve(result);
            };
            $timeout(fn, 1000);
            return deferred.promise;
          };

          simulateAjax([
            {"name" : "noel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "rommel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "nico clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "armand clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "rey clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "cornel clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "mano clarion", "phone" : [234242424, 234234243, 234234234], "age": 23},
            {"name" : "leor clarion", "phone" : [234242424, 234234243, 234234234], "age": 23}
            ])

          .then(function(result) {
            return $scope.optionsFromQuery = result;
          });

        $scope.brgy_constituents = [];

        $scope.brgy_obj = function(){

            $http.get('https://icesbeta.firebaseio.com/constituent_details.json')
            .then(function(result){
            $scope.brgy_constituents = result.data;
            console.log($scope.brgy_constituents);
        });

        }

        $scope.brgy_obj();

        $scope.languagesfamily = [{
            name: 'English',
            value: "English"
        }, {
            name: 'Chinese',
            value: "Chinese"
        }, {
            name: 'Pilipino',
            value: "Pilipino"
        }];
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
            }];

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
                ];

        $scope.problems = [
            'Garbage Disposal', 
            'Drainage', 
            'Water', 
            'Health And Sanitation',
            'Drug Addiction',
            'Infrastructure',
            'Political',
            'Education',
            'Safety and Security'
        ];

        $scope.judicial = {
            problems: []
        };

        $scope.problemstest = [
          {'id' : 1, "name" : "Problem 1"},
          {'id' : 2, "name" : "Problem 2"},
          {'id' : 3, "name" : "Problem 3"},
          {'id' : 4, "name" : "Problem 4"},
          {'id' : 5, "name" : "Problem 5"},
          {'id' : 6, "name" : "Problem 6"},
          {'id' : 7, "name" : "Problem 7"}
        ];

        $scope.judicial = {
            problemstest: []
        };

       var config = {
          '.chosen-select'           : {},
          '.chosen-select-deselect'  : {allow_single_deselect:true},
          '.chosen-select-no-single' : {disable_search_threshold:10},
          '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
          '.chosen-select-width'     : {width:"95%"}
        }
        for (var selector in config) {
          $(selector).chosen(config[selector]);
        };

        $scope.incomes = [
            'Below P10K',
            'P10K - P30K',
            'P30K - P50K',
            'More than P50K'
        ];

        $scope.judicial = {
            incomes: []
        };

        $scope.cottages = [
            'Food Preservation',
            'Food Processing',
            'Handicraft',
            'Others',
        ];

        $scope.judicial = {
            cottages: []
        };

        $scope.OEAs = [
            'Sari - sari Store',
            'Barbecue Stall',
            'Meat Stall',
            'Vegetable Stall',
            'Fishing Vending',
            'Others'
        ];

        $scope.judicial = {
            OEAs: []
        };

          $scope.checkAll = function() {
            $scope.judicial.problems = angular.copy($scope.problems);
          };
          $scope.uncheckAll = function() {
            $scope.judicial.problems = [];
          };
          $scope.checkFirst = function() {
            $scope.judicial.problems.splice(0, $scope.judicial.problems.length); 
            $scope.judicial.problems.push('Garbage Disposal');
          };

          $scope.childrens = [];

          $scope.judicial = {
            childrens: []
          };

          $scope.addchildren = function(){

            console.log('Children Added');
            $scope.childrens.push({'name': $scope.judicial.childrens})
            $scope.judicial.childrens = '';

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
        $scope.$watch("judicial.municipality", function(newValue) {
            $scope.filteredArray = filterFilter($scope.barangay_array, newValue);
            $scope.judicial.barangay = $scope.filteredArray[0].id;
            if ($scope.filteredArray.length != 0 && $scope.filteredArray[0].municipal_id != newValue) {
                $scope.judicial.barangay = $scope.filteredArray[1].id;
            }
        }, true);
        // if clicked edit. id comes from $scope.modal->judicialId
        if (angular.isDefined(id)) {
            var userUrl = fbURL + brgyjudicial_table + '/' + id;
            $scope.judicial = $firebase(new Firebase(userUrl));
            $scope.judicial.id = id;
        } else {
            $scope.judicial.languagefamily = $scope.languagesfamily[0].name;
            $scope.judicial.languagedialect = $scope.languagesdialect[0].name;
            $scope.judicial.religion     = $scope.religions[0].name;
            $scope.judicial.municipality = $scope.municipality_array[0].id;
        }
        // close modal
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        // Add new judicial
        $scope.add = function() {
            Brgyjudicial.$add($scope.judicial)
            $modalInstance.dismiss('cancel');
        };
        // Save edited judicial.
        $scope.save = function() {
            $scope.judicial.$save();
            $modalInstance.dismiss('cancel');
        };
    };
}) 