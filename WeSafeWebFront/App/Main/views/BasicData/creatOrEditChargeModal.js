(function () {
    appModule.controller('app.views.BasicData.creatOrEditChargeModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.officeAreaCharge', 'area',
        function ($scope, $uibModalInstance, officeAreaChargeService, area) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.areaId = area;
            vm.area = null;

            vm.saving = false;
            vm.selectuser = null;
            officeAreaChargeService.getAllUsers({}).then(function (result) {
                vm.users = result.data.items;
            });
            vm.types = [{ id: 0, type: '安全' }, { id: 1, type: '消防' }];
            vm.save = function () {
                if (vm.area.id) {
                    officeAreaChargeService
                        .updateOrganizationUnit(vm.area)
                        .then(function (result) {
                            abp.notify.info(app.localize('保存成功'));
                            $uibModalInstance.close(result.data);
                        });
                } else {
                    vm.area['userId'] = vm.selectuser;
                    vm.area['areaId'] = vm.areaId;
                    officeAreaChargeService
                        .addChargeToOfficeArea(vm.area)
                        .then(function (result) {
                            abp.notify.info(app.localize('保存成功'));
                            $uibModalInstance.close(result.data);
                        });
                }
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();