(function () {
    var controllerId = 'app.views.DetectionList';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Detection/DetectionList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();