(function () {
    appModule.controller('common.views.profile.changePassword', [
        '$scope', 'appSession', '$uibModalInstance', 'abp.services.app.profile',
        function ($scope, appSession, $uibModalInstance, profileService) {
            var vm = this;

            vm.saving = false;
            vm.passwordInfo = null;
            vm.passwordComplexitySetting = {};
            vm.passwordComplexityMessages = {};
            vm.appPath=abp.appPath;
            var init = function () {
                profileService.getPasswordComplexitySetting().then(function (result) {
                    vm.passwordComplexitySetting = result.data.setting;

                    vm.passwordComplexityMessages = {
                        minLenght: abp.utils.formatString(app.localize("复杂密码长度不足提示"), vm.passwordComplexitySetting.minLength),
                        maxLenght: abp.utils.formatString(app.localize("复杂密码长度超长提示"), vm.passwordComplexitySetting.maxLength),
                        useUpperCaseLetters: app.localize("复杂密码需使用大写提示"),
                        useLowerCaseLetters: app.localize("复杂密码需使用小写提示"),
                        useNumbers: app.localize("复杂密码需使用数字提示"),
                        usePunctuations: app.localize("复杂密码需使用标点符号提示")
                    }
                });
            };

            vm.save = function () {
                vm.saving = true;
                profileService.changePassword(vm.passwordInfo)
                    .then(function () {
                        abp.notify.info(app.localize('你的密码修改成功'));
                        $uibModalInstance.close();
                    }).finally(function () {
                        vm.saving = false;
                    });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            init();
        }
    ]);
})();