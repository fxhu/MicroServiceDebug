(function () {
    appModule.controller('app.views.patrollingManagement.TaskFireManModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.patrol', 'item',
        function ($scope, $uibModalInstance, patrolService, item) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.man = item;
            patrolService.getAllUsers().then(function (result) {
                vm.users = result.data.items;
                var idhave = 0;
                $.each(vm.users, function () {
                    if (this.id == item.UserId) idhave = 1;
                })
                vm.selectuser = (item.UserId == -1 || vm.users.length == 0 || idhave == 0) ? null : item.UserId;
               
                if (vm.users.length == 0) {
                    abp.message.error("所属机构暂无人员，请在组织机构下添加责任人后再进行指派！");
                    return;
                }
                $.each(vm.users, function () {
                    $('#mselect_user').append("<option value='" + this.id + "'>" + this.userName + "</option>");
                });
                $('#mselect_user').val('').multiselect({
                    // 自定义参数，按自己需求定义  
                    buttonWidth: '100%',
                    enableCaseInsensitiveFiltering: true, //对大小写不敏感  
                    enableFiltering: true, //提供搜索  
                    maxHeight: 300,
                    nonSelectedText: '请选择',
                    allSelectedText: '全部被选择',
                    filterPlaceholder: ' 请输入……',
                    nSelectedText: ' 个被选择'
                });
               // document.getElementById("mantype")[vm.man.Type].selected = true;
            });  
            function GetSelectedIds(selector) {
                var ids = [];
                $.each($(selector), function () {
                    ids.push(parseInt(this.value));
                });
                return ids;
            }
            vm.cancel = function (num) {
                $uibModalInstance.close({data:num});
            };
            vm.save = function () {
                var selectUser = GetSelectedIds('#mselect_user option:selected');
                if (selectUser.length == 0) {
                	abp.message.error("请选择巡检人！");
                	return;
                }

                vm.man.ExecuteUserId = selectUser[0];
                patrolService.auditTask(vm.man).then(function () {
                    abp.notify.info("指派巡检人成功");
                    vm.cancel(1);
                });
            };
			vm.cancelTask=function(){
				abp.message.confirm("取消后任务不可恢复，请确定是否要取消？", function(isconfirm) {
					if(isconfirm) {
						patrolService.auditTask({
							TaskIds: vm.man.TaskIds,
							IsActive: false,
							ExcuteUserId: 0,
							Remark: ''
						}).then(function() {
							abp.notify.info("取消巡检任务成功");
							vm.cancel(1);
						});
					}
				});
			};
            
        }
    ]);
})();