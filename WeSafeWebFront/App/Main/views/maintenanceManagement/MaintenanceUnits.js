(function () {
    var controllerId = 'app.views.MaintenanceUnits';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //MaintenanceUnits logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/VenderManger.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();