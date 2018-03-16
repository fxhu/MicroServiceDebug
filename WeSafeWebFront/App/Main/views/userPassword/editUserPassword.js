(function () {
    angular.module('app').controller('app.views.userPassword.editUserPassword', [
        '$scope', 'abp.services.app.user', 
        function ($scope, userService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.user = {
                isActive: true
            };

            vm.userName ="";
            vm.password = "";
            var init = function () {
                userService.getUserName()
                    .then(function (result) {
                        vm.userName = result.data;
                    });
            }

            vm.save = function () { 
                userService.setUserPassword(vm.password)
                    .then(function () {
                        abp.notify.info(App.localize('保存成功'));
                        window.location.href = "/";
                    });
            };

            vm.cancel = function () {
                window.location.href = "/";
            };

            init();
        }
    ]);
})();