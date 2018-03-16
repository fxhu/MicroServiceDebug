(function () {
    var controllerId = 'app.views.districtvisual';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', function ($scope, $uibModal) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.openEditModal = function (editUrl,width,height) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/main/views/BasicData/ModalWarpper.html',
                    controller: 'app.views.BasicData.ModalWarpper as vm',
                    backdrop: true,
                    size: "lg",
                    resolve:
                    {
                        editSource: function () { return editUrl }
                    }
                });
                modalInstance.rendered.then(function () {
                    if (width) {
                        $(".modal-dialog").css("width", width);
                    }
                    if (height) {
                        $(".modal-body").css("height", height);
                    }
                });
                modalInstance.result.then(function (result) {
                    
                }, function () { });
            }
            window.vm = vm;
        }
    ]);
})();