(function () {
    var controllerId = 'app.views.PaperManagement';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
            //PaperManagement logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Training/Subject/H5_SubjectList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();