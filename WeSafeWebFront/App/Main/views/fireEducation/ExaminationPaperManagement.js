(function () {
    var controllerId = 'app.views.ExaminationPaperManagement';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
            //ExaminationPaperManagement logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Training/Paper/H5_PaperList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();