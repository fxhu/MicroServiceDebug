(function () {
    angular.module('app').controller('app.views.emergencyPreparedness.addPlan', [
        '$scope', '$uibModalInstance', 'abp.services.app.plan','item',
        function ($scope, $uibModalInstance, planService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.name = null;
            if (item != null)
            {
                vm.name = item.PlanName;
            }
            vm.save = function () {
                if (item != null) {
                    planService.renamePlan(item.Id, vm.name)
                        .then(function (result) {
                            if (result.data != "") {
                                abp.notify.error("预案名称不允许含有特殊符号");
                            }
                            else {
                                 abp.notify.info("保存成功");
                                $uibModalInstance.close();
                            }                            
                        }); 
                }
                else {
                    planService.addPlan(vm.name)
                        .then(function (result) {
                            if (result.data != "") {
                                abp.notify.error("预案名称不允许含有特殊符号");
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