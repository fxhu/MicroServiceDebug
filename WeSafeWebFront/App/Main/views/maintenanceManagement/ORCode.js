(function () {
    var controllerId = 'app.views.orcode';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModalInstance', '$timeout', 'item', function ($scope, $uibModalInstance, $timeout, item) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.eqname = null;
            vm.back = function () {
                $uibModalInstance.close();
            }
            $timeout(function () {
                vm.eqname = item.eqname;                
            });
        }
    ]);

})();

