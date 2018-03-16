(function () {
    var controllerId = 'app.views.safetyPropaganda';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
            //safetyPropaganda logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Training/Datum/H5_DatumList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();