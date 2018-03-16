(function () {
    appModule.controller('app.views.BasicData.ModalWarpper', [
        '$scope', '$uibModalInstance', 'editSource',
        function ($scope, $uibModalInstance, editSource) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.editSource = editSource;
            vm.save = function () {
                $uibModalInstance.close();
            };

            vm.cancel = function () {
                $uibModalInstance.close();
            };
            $uibModalInstance.opened.then = function () {
                
            }
            
        }
    ]);
    
})();