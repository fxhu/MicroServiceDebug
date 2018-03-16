(function () {/*
    appModule.directive('roleCombo', ['$timeout', 'abp.services.app.role',
        function ($timeout, roleService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/App/common/directives/roleCombo.html',
                scope: {
                    selectedRole: '=?'
                },
                link: function ($scope, element, attrs) {
                    $scope.roles = [];
                    $scope.emptyText = attrs.emptyText || '';

                    roleService.getRoles({}).then(function (result) { 
                    	$scope.roles = result.data.items; 
                    	console.log($scope.roles[0]);
                        //refresh combo
                        $timeout(function () {
                            $(element).selectpicker('refresh');
                        });
                    });
                }
            };
        }
    ]);
*/
	/*angular.module('app').controller('common.views.users.index', function($scope) {
	    alert("加载角色");
		$scope.names = ["请选择","Google", "Runoob", "Taobao"];
	});	
*/


})();