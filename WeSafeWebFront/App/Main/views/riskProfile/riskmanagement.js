(function () {
    var controllerId = 'app.views.riskmanagement';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //riskmanagement logic...
        }
    ]);
})();