(function () {
    var controllerId = 'app.views.MaintenancePlanLinkstar';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //MaintenancePlanLinkstar logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Maintenance/MaintenanceList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();