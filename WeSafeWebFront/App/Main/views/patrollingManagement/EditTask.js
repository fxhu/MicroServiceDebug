(function() {
	var controllerId = 'app.views.EditTask';
	angular.module('app').controller(controllerId, [
		'$scope', '$timeout', 'abp.services.app.patrol',
		function($scope, $timeout, patrolService) {
			var vm = this;
			vm.myclass = 'hasPermission';

			var backpage = getURLParam('backpage');
			var pageindex = getURLParam('pageindex');
			var id = parseInt(getURLParam('id'));
			var type = getURLParam('type');

			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

			}
			vm.patrol = {};
			var arrtgid = [],
				arrgid = [];
			var selecteditems = [];
			var mselecet0 = $('#mselect0'),
				mselecet1 = $('#mselect1');
			var initialdata = [];
			var isLoadedUser = false;
			initMsSelect(mselecet0);
			initMsSelect(mselecet1);
			patrolService.getAllUsers().then(function(result) {
				vm.users = result.data.items;
				$.each(vm.users, function() {
					$('#mselect_user').append("<option value='" + this.id + "'>" + this.userName + "</option>");
					$('#mselect_patroluser').append("<option value='" + this.id + "'>" + this.userName + "</option>");
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
				$('#mselect_patroluser').val('').multiselect({
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
				if(vm.patrol.UserId != null) {
					$('#mselect_user').multiselect('select', vm.patrol.UserId.toString());
					//$('#mselect_patroluser').multiselect('select', vm.patrol.ExecuteUserId.toString());
				}
				isLoadedUser = true;
			});
			patrolService.getAllKeyAreas().then(function(result) {
				vm.selectareas = result.data.items;
			});
			patrolService.getTaskById({
				Id: id
			}).then(function(result) {
				InitDatePicker();
				var data = result.data;
				vm.patrol.Name = data.name;
				vm.patrol.UserId = data.userId;
				vm.patrol.ExecuteUserId = data.executeUserId;
				if(isLoadedUser) $('#mselect_user').multiselect('select', data.userId.toString());
				selecteditems = data.groupObject;
				initialdata = JSON.parse(JSON.stringify(data.groupObject));
				arrtgid = data.typeGroupIds;

				var st = new Date(data.startTime);
				var et = new Date(data.endTime);
				$('#dt_end').datetimepicker('update', et);
				$('#dt_start').datetimepicker('update', st);
				vm.patrol.EndTime = data.endTime;
				vm.patrol.StartTime = data.startTime;

				SetAllSelectText();
			});

			//$.each($('.multiselect-selected-text'), function () { this.innerText = '请选择'; });
			function initMsSelect(ele) {
				ele.multiselect("destroy").multiselect({
					// 自定义参数，按自己需求定义  
					buttonWidth: '100%',
					enableCaseInsensitiveFiltering: true, //对大小写不敏感  
					enableFiltering: true, //提供搜索  
					maxHeight: 300,
					nonSelectedText: '请选择',
					allSelectedText: '全部被选择',
					nSelectedText: ' 个被选择',
					includeSelectAllOption: true,
					selectAllText: '全选',
					filterPlaceholder: ' 请输入……',
					onSelectAll: MuliteSelectOnChange,
					onDeselectAll: function() {
						var index = FindItemIndex();
						if(this.$select[0].id == "mselect0") {
							selecteditems[index].groups = [];
							var gitems = GetAllItems("#mselect0 option");
							$.each(gitems, function() {
								FindGroupAndRemove(this.id);
							});
						} else {
							selecteditems[index].typegroups = [];
							var tgitems = GetAllItems("#mselect1 option");
							$.each(tgitems, function() {
								FindTypeGroupAndRemove(this.id);
							});
							FilterGroup();
						}
						SetAllSelectText();
					},
					onChange: MuliteSelectOnChange
				});
			}

			function MuliteSelectOnChange(option, checked, select) {
				var val = option;
				var selectgs = GetSelectedIds("#mselect0 option:selected");
				var selecttgs = GetSelectedIds("#mselect1 option:selected");
				var index = FindItemIndex();
				selecteditems[index].groups = GetAllItems("#mselect0 option:selected");
				selecteditems[index].typegroups = GetAllItems("#mselect1 option:selected");
				var a = [],
					b = [];
				$.each(selecteditems, function() {
					$.each(this.typegroups, function() {
						var ids = FindGroupIds(this.id);
						a = a.concat(ids);
					});
					$.each(this.groups, function() {
						b.push(this.id);
					});
				});
				var intg = [];
				for(var i = 0; i < b.length; i++) {
					if($.inArray(b[i], a) >= 0) {
						intg.push(b[i].toString());
						FindGroupAndRemove(b[i]);
					}
				}
				if(checked != null && !checked && option[0].parentNode.id == 'mselect0') {
					var val = option[0].value;
					FindGroupAndRemove(parseInt(val));
				}
				if(checked != null && !checked && option[0].parentNode.id == 'mselect1') {
					var val = option[0].value;
					FindTypeGroupAndRemove(parseInt(val));
				}
				mselecet0.multiselect('deselect', intg);
				selecteditems[index].groups = GetAllItems("#mselect0 option:selected");
				selecteditems[index].typegroups = GetAllItems("#mselect1 option:selected");
				SetAllSelectText();
				if(this.$select[0].id == "mselect1") { //过滤类型
					FilterGroup();
				}
			}

			function FilterGroup() {
				//刷新节点
				AddItems(arrgid, -1, mselecet0);
				//添加上已经勾选的
				var s1 = [];
				$.each(selecteditems, function() {
					$.each(this.groups, function() {
						s1.push(this.id.toString());
					});
				});
				mselecet0.multiselect('select', s1);
			}
			vm.reset = function() {
				mselecet0.multiselect('deselectAll', false);
				mselecet0.multiselect('updateButtonText');
				mselecet1.multiselect('deselectAll', false);
				mselecet1.multiselect('updateButtonText');
				selecteditems = JSON.parse(JSON.stringify(initialdata));
				vm.patrol.AreaId = null;
				AddItems([], -1, mselecet0);
				AddItems([], -1, mselecet1);
				SetAllSelectText();
			}

			function FindGroupAndRemove(id) {
				$.each(selecteditems, function() {
					var index = -1;
					$.each(this.groups, function(num) {
						if(this.id == id) {
							index = num;
						}
					});
					if(index != -1) {
						this.groups.splice(index, 1);
					}
				});
			}

			function FindTypeGroupAndRemove(id) {
				$.each(selecteditems, function() {
					var index = -1;
					$.each(this.typegroups, function(num) {
						if(this.id == id) {
							index = num;
						}
					});
					if(index != -1) {
						this.typegroups.splice(index, 1);
					}
				});
			}

			function FindGroupIds(id) {
				for(var i = 0; i < arrtgid.length; i++) {
					if(arrtgid[i].id == id) {
						return arrtgid[i].tgids;
					}
				}
			}

			function GetSelectedIds(selector) {
				var ids = [];
				$.each($(selector), function() {
					ids.push(parseInt(this.value));
				});
				return ids;
			}

			function GetAllItems(selector) {
				var items = [];
				$.each($(selector), function() {
					items.push({
						id: parseInt(this.value),
						text: this.text
					});
				});
				return items;
			}

			function SetAllSelectText() {
				var texts = [];
				$.each(selecteditems, function() {
					$.each(this.typegroups, function() {
						if(texts.indexOf(this.text) != -1) return true;
						texts.push(this.text);
					});
					$.each(this.groups, function() {
						if(texts.indexOf(this.text) != -1) return true;
						texts.push(this.text);
					});
				});

				$('#selectedlist').html('');
				$.each(texts, function() {
					$('#selectedlist').append('<li>' + this + '</li>');
				});
			}

			function creatOrGetGroup() {
				patrolService.creatOrGetGroupByAreaId({
					AreaId: vm.patrol.AreaId,
					IsCreat: false
				}).then(function(result) {
					$.each(result.data.typeGroups, function() {
						var ishave = false;
						for(var i = 0; i < arrtgid.length; i++) {
							if(arrtgid[i].id == this.id) {
								ishave = true;
							}
						}
						if(!ishave) {
							arrtgid.push({
								id: this.id,
								tgids: this.groupIds
							});
						}
					});
					arrgid = result.data.groups;
					AddItems(result.data.groups, -1, mselecet0);
					AddItems(result.data.typeGroups, -1, mselecet1);
					var s1 = [],
						s2 = [];
					$.each(selecteditems, function() {
						$.each(this.groups, function() {
							s1.push(this.id.toString());
						});
						$.each(this.typegroups, function() {
							s2.push(this.id.toString());
						});
					});
					mselecet0.multiselect('select', s1);
					mselecet1.multiselect('select', s2);
				});
			}

			function AddItems(arr, id, ele) {
				ele.html("");
				var a = [];
				if(ele[0].id == "mselect0") {
					$.each(selecteditems, function() {
						$.each(this.typegroups, function() {
							var ids = FindGroupIds(this.id);
							a = a.concat(ids);
						});
					});
				}
				$.each(arr, function() {
					if(ele[0].id == "mselect0" && a.indexOf(this.id) != -1) return true;
					ele.append("<option value='" + this.id + "'>" + this.name + "</option>");
				});
				initMsSelect(ele);
			}
			vm.areaChanged = function() {
				var index = FindItemIndex();
				if(index == -1) {
					selecteditems.push({
						areaid: vm.patrol.AreaId,
						groups: [],
						typegroups: []
					});
				}
				creatOrGetGroup(false);
			}

			function FindItemIndex() {
				var index = -1;
				$.each(selecteditems, function(num) {
					if(this.areaid == vm.patrol.AreaId) {
						index = num;
						return false;
					}
				});
				return index;
			}
			vm.dateTimeChange = function() {
				var st = new Date(vm.patrol.StartTime).getTime();
				var et = new Date(vm.patrol.EndTime).getTime();
				if(!et) et = 0;
				var m30 = 1800 * 1000;
				if(st > et) {
					et = st + m30;
				}
				et = new Date(et);
				$('#dt_end').datetimepicker('update', et);
				vm.patrol.EndTime = et.Format("yyyy-MM-dd HH:mm")
			}

			function InitDatePicker() {
				$('.mydate').datetimepicker({
					format: "yyyy-mm-dd hh:ii",
					autoclose: true,
					minView: 0,
					minuteStep: 30,
					language: "zh-CN"
				});
				var nowday = (new Date()).Format("yyyy-MM-dd HH:mm");
				$('#dt_start').datetimepicker('setStartDate', nowday);
				$('#dt_end').datetimepicker('setStartDate', nowday);
			}
			vm.patrol.EndTime = "";
			vm.patrol.StartTime = "";
			vm.save = function() {
				var selectgs = [];
				var selecttgs = [];
				var areaids = [];
				$.each(selecteditems, function() {
					$.each(this.typegroups, function() {
						selecttgs.push(this.id);
					});
					$.each(this.groups, function() {
						selectgs.push(this.id);
					});
					if(this.typegroups.length > 0 || this.groups.length > 0) {
						if(areaids.indexOf(this.areaid) == -1) areaids.push(this.areaid);
					}
				});
				var selectUser = GetSelectedIds('#mselect_user option:selected');
				//var selectPatrolUser = GetSelectedIds('#mselect_patroluser option:selected');
				if(vm.patrol.Name == null || vm.patrol.Name.trim() == '') {
					abp.message.error("请输入任务名称！");
					return;
				}
				if(selectUser.length == 0) {
					abp.message.error("请选择负责人！");
					return;
				}
				//if (selectPatrolUser.length == 0) {
				//    abp.message.error("请选择巡检人！");
				//    return;
				//}
				if(selectgs.length == 0 && selecttgs.length == 0) {
					abp.message.error("请选择巡检组！");
					return;
				}
				var endtime = vm.patrol.EndTime;
				var starttime = vm.patrol.StartTime;
				var p = {
					Id: id,
					GroupIds: selectgs,
					TypeGroupIds: selecttgs,
					AreaIds: JSON.stringify(areaids),
					Name: vm.patrol.Name,
					UserId: selectUser[0],
					StartTime: starttime,
					EndTime: endtime
				};
				patrolService.editTask(p).then(function() {
					abp.notify.info(app.localize('保存成功'));
					window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
				});
			}
			vm.cancel = function() {
				window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			}
			///------------------------------------------------------------///
		}
	]);
})();