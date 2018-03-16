(function () {
    var controllerId = 'app.views.commandanddispatch';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
        }
    ]);
})();