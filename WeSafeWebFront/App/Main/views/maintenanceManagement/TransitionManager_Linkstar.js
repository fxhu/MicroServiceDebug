(function () {
    var controllerId = 'app.views.TransitionManager';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/AssetManage/ParkCheckItem.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();