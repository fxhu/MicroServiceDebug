(function () {
    var controllerId = 'app.views.RemindListLinkstar';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //AssetType logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/RemindList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();