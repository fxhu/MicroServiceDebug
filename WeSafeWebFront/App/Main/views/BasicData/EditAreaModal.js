(function () {
    appModule.controller('app.views.BasicData.EditAreaModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.organizationUnit','item',
        function ($scope, $uibModalInstance, organizationUnitService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.area = item;
            vm.saving = false;
            vm.units = null;
            vm.areas = [{ id: 2, name: '楼层' }, { id: 3, name: '建筑' }, { id: 4, name: '园区'}];
            organizationUnitService.getOrganizationUnits({}).then(function (result) {
                vm.units = result.data.items;
            });
            //vm.unit = vm.area.
            vm.save = function () {
                $.ajax({
                    async: false,
                    url:abp.appPath+ 'FireMan/EditArea/',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);               
                    },
                    type: 'POST',
                    data: JSON.stringify(vm.area),
                    success: function (result) {
                        $uibModalInstance.dismiss();
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();