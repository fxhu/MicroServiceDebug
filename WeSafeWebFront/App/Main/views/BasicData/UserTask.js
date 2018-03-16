(function () {
    var controllerId = 'app.views.UserTask';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
        }
    ]);
})();