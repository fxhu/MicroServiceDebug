(function () {
    var controllerId = 'app.views.realtimemonitoring';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';
            //获取园区列表
            $.ajax({
                type: "get",
                url: abp.appPath + "VisualArea/AreaListByType?AreaType=4",
                async:false,
                success: function (data) {
                    console.log(data);
                    if(data.length>0){
                        vm.ifmsrc=getAreaViewUrl(data[0].id);
                    }
                }
            })
        }
    ]);
})();