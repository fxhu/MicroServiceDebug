(function () {
    appModule.controller('app.views.alarmMonitoring.AlarmAuditModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.alarms', 'alarmEvent',
        function ($scope, $uibModalInstance, AlarmsService, ids) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.AlarmIds = ids;
            vm.AuditMessage = null;
            vm.selectAlarmType = null;
            vm.alarmTypes = Common.AlarmEventType;
            vm.save = function () {
                $.ajax({
                    type: "post",
                    url: abp.appPath + "AlarmEventTool/AlarmHandle",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    data: {
                        Ids: ids.join(","),
                        falseReport: $("#cbxIsFalseReport").get(0).checked?"1":"0",
                        auditMessage: vm.AuditMessage
                    },
                    success: function (data) {
                        if (data != "OK") {
                            abp.notify.info(data);
                        }
                        else {
                            abp.notify.error(app.localize('处警成功'));
                            $uibModalInstance.close();
                        }
                    },
                    error: function (err) {

                    },
                    complete: function () {

                    }
                });

            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();