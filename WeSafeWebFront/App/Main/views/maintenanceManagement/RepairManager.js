(function () {
    var controllerId = 'app.views.RepairManager';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Maintenance/MaintenanceManage.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();