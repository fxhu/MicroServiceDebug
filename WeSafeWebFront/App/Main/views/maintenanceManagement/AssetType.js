(function () {
    var controllerId = 'app.views.AssetType';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //AssetType logic...
            vm.assetType = "";
            abp.services.app.webSiteConfigService.getWebSiteVedioHostAddress({}).then(function (result) {
                vm.assetType = result;
            });
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/CategoryManage.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();