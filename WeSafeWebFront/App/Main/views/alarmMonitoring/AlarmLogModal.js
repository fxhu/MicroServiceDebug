(function () {
    appModule.controller('app.views.alarmMonitoring.AlarmLogModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.alarms', 'alarmEvent',
        function ($scope, $uibModalInstance, AlarmsService, id) {
            var vm = this;
            vm.myclass = 'hasPermission';
            $.getJSON(abp.appPath +"AlarmEventTool/GetAlarmLogs?Id="+id,function(data){
                var html=[];
                for(var i=0;i<data.length;i++){
                    html.push('<div class="alert alert-danger" role="alert" style="margin-bottom:10px">'+data[i].logDetail+'</div>');
                   // html.push('<p class="bg-primary" style="padding:10px 20px;margin-top:10px">'+data[i].LogDetail    +'</p>');
                }
                $("#logContainer").html(html.join(""));
            })
            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();