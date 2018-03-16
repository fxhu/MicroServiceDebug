(function () {
    var controllerId = 'app.views.syschecked';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {           
            var vm = this;
            vm.myclass = 'hasPermission';
 
        }
    ]);
})();