(function () {
    angular.module('app').controller('app.views.riskProfile.editRatio', [
        '$scope', 'abp.services.app.safeAssess', '$timeout',
        function ($scope, safeAssessService, $timeout) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.Id = Common.getQueryString("id");
            if (isNaN(parseInt(vm.Id))) return;
            vm.serchinfo = Common.getQueryString("s");
            
            $timeout(function () {
                Inputmask("0.99").mask(".ratioNum");
                safeAssessService.getAreaAssess(vm.Id).then(function (result) {
                    var item = result.data;
                    vm.ratio = item;

                    if (vm.ratio.patrolTaskPer != undefined) {
                        vm.ratio.patrolTaskPer = parseFloat(vm.ratio.patrolTaskPer).toFixed(2);
                    }
                    if (vm.ratio.checkResultPer != undefined) {
                        vm.ratio.checkResultPer = parseFloat(vm.ratio.checkResultPer).toFixed(2);
                    }
                    if (vm.ratio.goodsStatusPer != undefined) {
                        vm.ratio.goodsStatusPer = parseFloat(vm.ratio.goodsStatusPer).toFixed(2);
                    }
                    if (vm.ratio.dangerousGoodsPer != undefined) {
                        vm.ratio.dangerousGoodsPer = parseFloat(vm.ratio.dangerousGoodsPer).toFixed(2);
                    }
                    if (vm.ratio.dangerousOperationsPer != undefined) {
                        vm.ratio.dangerousOperationsPer = parseFloat(vm.ratio.dangerousOperationsPer).toFixed(2);
                    }
                    if (vm.ratio.trainNumberPer != undefined) {
                        vm.ratio.trainNumberPer = parseFloat(vm.ratio.trainNumberPer).toFixed(2);
                    }
                });
            });

            vm.save = function () {
                if (vm.ratio.patrolTaskPer == undefined || vm.ratio.checkResultPer == undefined || vm.ratio.goodsStatusPer == undefined || vm.ratio.dangerousGoodsPer == undefined || vm.ratio.dangerousOperationsPer == undefined || vm.ratio.trainNumberPer == undefined) {
                    abp.message.error("请完善权重值");
                    return false;
                }
                var PatrolTaskPer = parseFloat(vm.ratio.patrolTaskPer.replace("_", "0"));
                var CheckResultPer = parseFloat(vm.ratio.checkResultPer.replace("_", "0"));
                var GoodsStatusPer = parseFloat(vm.ratio.goodsStatusPer.replace("_", "0"));
                var DangerousGoodsPer = parseFloat(vm.ratio.dangerousGoodsPer.replace("_", "0"));
                var DangerousOperationsPer = parseFloat(vm.ratio.dangerousOperationsPer.replace("_", "0"));
                var TrainNumberPer = parseFloat(vm.ratio.trainNumberPer.replace("_", "0"));
                var count = (PatrolTaskPer + CheckResultPer + GoodsStatusPer
                    + DangerousGoodsPer + DangerousOperationsPer + TrainNumberPer).toFixed(2);
                if (count != "1.00") {
                    abp.message.error("编辑的权重总和不为1，请确认后再保存!");
                    return;
                }
                var ratio = {
                    Id: vm.ratio.areaId, DangerousGoodsPer: DangerousGoodsPer,
                    PatrolTaskPer: PatrolTaskPer, DangerousOperationsPer: DangerousOperationsPer,
                    TrainNumberPer: TrainNumberPer, CheckResultPer: CheckResultPer, GoodsStatusPer: GoodsStatusPer
                };
                safeAssessService.updateRatio(ratio).then(function () {
                    abp.notify.info("修改成功");
                    vm.cancel();
                });
            };
            vm.cancel = function () {
                var url = "#!/DistrictSet";
                if (vm.serchinfo != null && vm.serchinfo != "") {
                    url += "?s=" + vm.serchinfo;
                }
                window.location.hash = url;
            };
        }
    ]);
})();