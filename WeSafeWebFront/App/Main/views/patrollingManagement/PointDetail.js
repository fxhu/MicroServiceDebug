(function () {
    appModule.controller('app.views.patrollingManagement.PointDetail', [
        '$scope', '$uibModalInstance', 'abp.services.app.patrol', 'item',
        function ($scope, $uibModalInstance, patrolService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.point = item;
            vm.cancel = function (num) {
                $uibModalInstance.close({data:num});
            };
            vm.abpPath = abp.appPath;
            vm.clickimg = function (url) {
				window.open(url);
			}
        }
    ]);
})();