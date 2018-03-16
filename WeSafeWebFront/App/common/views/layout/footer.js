(function () {
    appModule.controller('common.views.layout.footer', [
        '$rootScope', 'appSession',
        function ($scope, appSession) {
            var vm = this;

            $scope.$on('$includeContentLoaded', function () {
                Layout.initFooter(); // init footer
            });
            var myDate = new Date();
            var myYear = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
            var myMon = (myDate.getMonth() + 1).toString();       //获取当前月份(0-11,0代表1月)
            var myDay = (myDate.getDate()).toString();        //获取当前日(1-31)
            myMon = myMon.length < 2 ? ("0" + myMon ): myMon;
            myDay = myDay.length < 2 ? ("0" + myDay ): myDay;
            vm.str = myYear + myMon + myDay;

            vm.getProductNameWithEdition = function() {
                var productName = '© 2017 WUTOS';
                if (appSession.tenant && appSession.tenant.editionDisplayName) {
                    //console.log(appSession.tenant.editionDisplayName);
                    productName = productName;
                }

                return productName;
            }
        }
    ]);
})();