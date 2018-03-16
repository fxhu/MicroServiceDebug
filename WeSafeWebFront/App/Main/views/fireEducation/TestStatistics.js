(function () {
    var controllerId = 'app.views.TestStatistics';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
            //TestScore logic...
            vm.vedioHost = "";
            vm.linkstarHost = "";
            vm.viewUrl = function () {
                LinkStarViewUrl("/Training/AllScore/H5_StatisticalList.aspx");
            };
            vm.viewUrl();
        }
    ]);
})();