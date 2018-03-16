(function () {
    var controllerId = 'app.views.AssetTypeLinkstar';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //AssetType logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/CategoryList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();