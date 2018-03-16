(function () {
    appModule.controller('common.views.users.loginAttemptsModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.userLogin',
        function ($scope, $uibModalInstance, userLoginService) {
            var vm = this;

            vm.loginAttempts = [];

            vm.getUserLoginAttempts = function () {
                userLoginService.getRecentUserLoginAttempts({}).then(function (result) {
                    vm.loginAttempts = result.data.items;

                    angular.forEach(vm.loginAttempts, function (loginAttempt) {
                        loginAttempt.profileImageUrl = (loginAttempt.result === 'Success' ?
                            (abp.appPath + 'Profile/GetProfilePictureById?+v=' + new Date().valueOf()) : // 三元表达式
                            '/assets/Common/Images/default-profile-picture.png');
                    });


                });
            };

            vm.getLoginAttemptClass = function (loginAttempt) {
                return loginAttempt.result === 'Success' ? 'label-success' :
                    'label-danger';
            }

            vm.getCreationTime = function (loginAttempt) {
                var crtTime = new Date(loginAttempt.creationTime);
                var creationTime = dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
                return moment(loginAttempt.creationTime).startOf('Second').fromNow() + ' (' + creationTime + ')';
            };

            vm.formatLoginAttemptResult = function (loginAttemt) {
                return loginAttemt.result === 'Success' ? app.localize('Success') :
                    app.localize('Failed');
            }

            vm.close = function () {
                $uibModalInstance.close();
            };

            function init() {
                vm.getUserLoginAttempts();
            }

            /**************************************时间格式化处理************************************/
            function dateFtt(fmt, date) { //author: meizz   
                var o = {
                    "M+": date.getMonth() + 1,                 //月份   
                    "d+": date.getDate(),                    //日   
                    "h+": date.getHours(),                   //小时   
                    "m+": date.getMinutes(),                 //分   
                    "s+": date.getSeconds(),                 //秒   
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                    "S": date.getMilliseconds()             //毫秒   
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            init();
        }
    ]);
})();