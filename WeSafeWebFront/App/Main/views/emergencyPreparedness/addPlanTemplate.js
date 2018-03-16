(function () {
    angular.module('app').controller('app.views.emergencyPreparedness.addPlanTemplate', [
        '$scope', '$uibModalInstance', 'abp.services.app.planTemplate', 'item',
        function ($scope, $uibModalInstance, planTemplateService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.name = null;
            var oldName = null;
            if (item != null) {
                vm.name = item.name;
                oldName = item.name;
            }
            vm.save = function () {
                if (item != null) {
                    planTemplateService.renamePlanTemplate(oldName, vm.name)
                        .then(function (result) {
                            if (result.data != "") {
                                abp.notify.error(result.data);
                            }
                            else {
                                abp.notify.info("保存成功");
                                $uibModalInstance.close();
                            }
                        });
                }
                else {
                    planTemplateService.addPlanTemplate(vm.name)
                        .then(function (result) {
                            if (result.data != "") {
                                abp.notify.error(result.data);
                            }
                            else {
                                abp.notify.info("保存成功");
                                $uibModalInstance.close();
                            }
                        });
                }
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss({});
            };
        }
    ]);
})();