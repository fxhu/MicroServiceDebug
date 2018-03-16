(function () {
    appModule.controller('common.views.welcome.mydesktop', [
        '$scope',
        function ($scope) {
            var vm = this;

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            //...
        }]);
})();