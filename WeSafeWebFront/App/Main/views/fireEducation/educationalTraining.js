(function () {
    var controllerId = 'app.views.educationalTraining';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';

            //educationalTraining logic...
            vm.LinkstarUrl = [];
            vm.LinkstarUrl = {
                LinkstarUrl: app.consts.Linkstar.LinkstarUrl,
            };
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/10PublicEnd/Pages/WEB_zxksList.html");
            };
            vm.viewUrl();
        }
    ]);
})();