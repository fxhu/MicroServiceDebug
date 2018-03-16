(function () {
    angular.module('app').controller('app.views.safecheck.CreatSafeAre', [
        '$scope', '$uibModalInstance',
        function ($scope, $uibsafeareInstance) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.safeare = {};
            vm.save = function () {
                $http({ method: 'POST', url: 'http://localhst:62416/Safecheck/EditSafeAre/' + page,data:vm.safeare}).success(function (data) {
                    abp.notify.info(App.localize('保存成功'));
                    $uibsafeareInstance.close();
                });
            };
            vm.cancel = function () {
                $uibsafeareInstance.dismiss({});
            };
        }
    ]);
})();