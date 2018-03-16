(function () {
    angular.module('app').controller('app.views.safecheck.safearemanager ', [
        '$scope', '$timeout', '$uibSafeAre', '$http',
        function ($scope, $timeout, $uibSafeAre, $http) {
            var vm = this;
            vm.myclass = 'hasPermission';


            var page = 0;
            vm.safeares = [];

            function getsafeares() {
                $http({ method: 'GET', url: abp.appPath+'Safecheck/GetSafeList/' }).success(function (data) {
                    vm.safeares = data;
                });
            }
            vm.SetAndGetPage = function (pagenum) {
                page = pagenum;
                getsafeares();
            }

            vm.addsafeare = function (safeareitem) {
                var modalInstance = $uibSafeAre.open({
                    templateUrl: '/App/Main/views/safecheck/createModal.cshtml',
                    controller: 'app.views.safecheck.createModal as vm',
                    backdrop: 'static'
                });

                modalInstance.rendered.then(function () {
                    $.AdminBSB.input.activate();
                });

                modalInstance.result.then(function () {
                    getsafeares();
                });
            };

            vm.editsafeare = function (safeareitem) {
                var modalInstance = $uibSafeAre.open({
                    templateUrl: '/App/Main/views/safecheck/editModal.cshtml',
                    controller: 'app.views.safecheck.editModal as vm',
                    backdrop: 'static',
                    resolve: {
                        item: function () {
                            return safeareitem;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    $timeout(function () {
                        $.AdminBSB.input.activate();
                    }, 0);
                });

                modalInstance.result.then(function () {
                    getsafeares();
                });
            };

            vm.delete = function (safeare) {
                abp.message.confirm(
                    "删除 '" + safeare.AreName + "'?",
                    function (result) {
                        if (result) {
                            organizationService.delete({ id: organization.id })
                                .then(function () {
                                    abp.notify.info("删除 " + safeare.AreName);
                                    getsafeares();
                                });
                        }
                    });
            }

            vm.refresh = function () {
                getsafeares();
            };

            getsafeares();
        }
    ]);
})();