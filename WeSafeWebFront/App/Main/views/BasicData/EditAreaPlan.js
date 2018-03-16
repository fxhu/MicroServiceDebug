(function () {
    appModule.controller('app.views.BasicData.editAreaPlan', [
        '$scope', '$uibModalInstance', 'abp.services.app.officeAreaCharge','area',
        function ($scope, $uibModalInstance, officeAreaChargeService, area) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.area = area;
            vm.saving = false;
           
           
            vm.save = function () {
                vm.saving = true;
                var nodes = $("#areaPlanTree").jstree("get_checked");
                var planIds = [];
                $.each(nodes, function (idx, node) {
                    var nodeObj = $("#areaPlanTree").jstree('get_node', node);
                    if (nodeObj.parent != "#") {                        
                        planIds.push(nodeObj.data.id);
                    }
                });
                var input = {
                    areaId: vm.area.id,
                    planIds: planIds
                };
                officeAreaChargeService.saveOfficeAreaPlan(input).then(function (result) {
                    if (result.data == "") {
                        abp.notify.info(app.localize('保存成功'));
                        $uibModalInstance.dismiss();
                    }
                    else {
                        abp.notify.error("保存失败!" + result.data);
                    }
                    vm.saving = false;
                });                
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            officeAreaChargeService.getAllOfficeAreaPlan(vm.area.id).then(function (treedata) {
                var tree = [];
                var childTree = [];
                $.each(treedata.data.items, function (idx, item) {                    
                    childTree.push({
                        text: item.planName,
                        data: item,
                        "state": { "selected": item.isActive }
                    });
                });
                tree.push({
                    "text": "预案列表",
                    "state": { "opened": true },
                    "children": childTree
                });
                treeObj = $("#areaPlanTree").jstree(
                    {
                        plugins: ["wholerow", "checkbox", "types"],
                        core: {
                            themes: {
                                responsive: !1
                            },
                            data: tree
                        }
                    });
            });
        }
    ]);
})();