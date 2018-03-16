(function () {
    var controllerId = 'app.views.MaintenanceTask';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Maintenance/MaintenanceTask.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();