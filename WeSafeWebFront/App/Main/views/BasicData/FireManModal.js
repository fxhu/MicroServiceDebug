(function () {
    appModule.controller('app.views.BasicData.FirmManModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.officeAreaCharge', 'item',
        function ($scope, $uibModalInstance, officeAreaChargeService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.man = item;
            vm.man.Position = "消防负责人";
            vm.saving = false;
            officeAreaChargeService.getAllOrganizationUsers({ OrganizationId: vm.man.organizationId }).then(function (result) {
                vm.users = result.data.items;
                var idhave = 0;
                $.each(vm.users, function () {
                    if (this.id == item.userId) idhave = 1;
                })
                vm.selectuser = (item.userId == -1 || vm.users.length == 0 || idhave==0) ? null : item.userId;
            });           
            vm.save = function () {
                vm.man.userId = vm.selectuser;
                var type = document.getElementById("mantype");
                vm.man.Type= 0;
                $.ajax({
                    async: false,
                    url: abp.appPath + 'FireMan/AddOrEditCharge/',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    type: 'POST',
                    data: {
                           JsonStr: JSON.stringify(vm.man)
                        },
                    success: function (result) {
                        var username = '';
                        $.each(vm.users, function () {
                            if (this.id == vm.man.userId) {
                                username = this.userName;
                            }
                        });
                        $uibModalInstance.close(username);
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