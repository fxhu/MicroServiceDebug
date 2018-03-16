(function () {
    var controllerId = 'app.views.equipmentArchivesExpirelinkstar';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.LinkstarUrl = [];
            vm.LinkstarUrl = {
                LinkstarUrl: app.consts.Linkstar.LinkstarUrl,
            };
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/ReduceDeviceList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();