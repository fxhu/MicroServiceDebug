(function () {
    angular.module('app').controller('app.views.hiddenTrouble.checkFile', [
        '$scope', '$uibModalInstance', 'abp.services.app.troubles', 'item',
        function ($scope, $uibModalInstance, troublesService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.risk = {
                TroubleId: item.Id
            }
            troublesService.getAllUses().then(function (result) {
                vm.users = result.data.items;
            });
            vm.sbvisble = 0;
            vm.fcvisble = 0;
            vm.sbfjs = [];
            vm.zgfjs = [];
            vm.fcfjs = [];
            function GetFiles(type) {
                $.ajax({
                    type: "get",
                    url: abp.appPath + "HiddenTrouble/GetAllFiles/?tbid=" + item.Id + "&type=" + type,
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    success: function (data) {
                        switch (type) {
                            case 0:
                                vm.sbfjs = data.files[0];
                                break;
                            case 1:
                                vm.sbfjs = data.files[0];
                                vm.zgfjs = data.files[1];
                                break;
                            case 2:
                                vm.sbfjs = data.files[0];
                                vm.zgfjs = data.files[1];
                                vm.fcfjs = data.files[2];
                                break;
                        }
                    },
                    error: function (err) {
                    }
                });
            }
            switch (item.HiddenTroubleStatus) {
                case 0://已闭环
                    vm.zgvisble = 1;
                    vm.fcvisble = 1;
                    GetFiles(2);
                    break;
                case 1://待整改
                    GetFiles(0);
                    break;
                case 2://未提交
                    GetFiles(2);
                    break;
                case 3://待复查
                    vm.zgvisble = 1;
                    GetFiles(1);
                    break;
                case 4://复查未通过
                    vm.zgvisble = 1;
                    vm.fcvisble = 1;
                    GetFiles(2);
                    break;
                case 5://已撤销
                    vm.zgvisble = 1;
                    GetFiles(2);
                    break;
                case 6://已逾期
                    GetFiles(0);
                    break;
            }
            vm.down = function (url) {
                window.open(url);
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss({});
            };
        }

    ]);
})();