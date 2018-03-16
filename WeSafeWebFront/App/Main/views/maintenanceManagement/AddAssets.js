(function () {
    angular.module('app').controller('app.views.addAssetsForm', [
        '$scope', '$uibModalInstance', 'abp.services.app.deviceInfo', 'item',
        function ($scope, $uibModalInstance, deviceInfoService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.islook = item != "add";
            vm.assets = {};
            vm.save = function () {
                var deviceInfo = {
                    Address: vm.assets.Address,
                    ClassId: vm.assets.ClassId,
                    ClientId: vm.assets.ClientId,
                    Coordinate: vm.assets.Coordinate,
                    Name: vm.assets.Name
                };
                deviceInfoService.create(deviceInfo).then(function () {
                    $uibModalInstance.close();
                });
            };
            if (vm.islook) {
                vm.assets = {
                    Id: item.Id,
                    Address: item.Address,
                    ClassId: item.ClassId,
                    ClientId: item.ClientId,
                    Coordinate: item.Coordinate,
                    Name: item.Name
                };
                //deviceInfoService.getById({ Id: item.Id }).then(function (result) {
                //    
                //});
            }
            vm.cancel = function () {
                $uibModalInstance.dismiss({});
            };
        }
    ]);
})();