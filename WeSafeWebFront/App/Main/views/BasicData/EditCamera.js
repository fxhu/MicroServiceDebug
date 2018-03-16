(function () {
    angular.module('app').controller('app.views.camera.EditCamera', [
        '$scope', 'abp.services.app.camera',
        function ($scope, cameraService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var param = getURLParam('item');
            var item = param == null ? "add" : JSON.parse(param);
            var backpage = getURLParam('backpage');
            var pageindex = getURLParam('pageindex'); 
            var isadd = item == "add";
         
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            vm.title = isadd ? "添加摄像头信息" : "编辑摄像头信息";
            vm.streamType = [{ id: 0, type: "流媒体" }, { id: 1, type: "VLC" }, { id: 2, type: "其他" }];
            vm.camera = {
                ClientStreamType: 0
            }
            if (!isadd) vm.camera = item;
            vm.save = function () {
                if (isadd) {
                    cameraService.addCamera(vm.camera).then(function () {
                        abp.notify.info(app.localize('保存成功'));
                        vm.cancel();
                    });                    
                }
                else {
                    cameraService.editCamera(vm.camera).then(function () {
                        abp.notify.info(app.localize('保存成功'));
                        vm.cancel();
                    }); 
                }

            };

            vm.cancel = function () {
                window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex;
            };
        }

    ]);
})();