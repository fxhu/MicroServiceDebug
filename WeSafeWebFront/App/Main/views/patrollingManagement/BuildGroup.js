(function() {
	var controllerId = 'app.views.BuildGroup';
	angular.module('app').controller(controllerId, [
		'$scope', '$timeout', 'abp.services.app.patrol',
		function($scope, $timeout, patrolService) {
			var vm = this;
			vm.myclass = 'hasPermission';

			var backpage = getURLParam('backpage');
			var pageindex = getURLParam('pageindex');
			var action = getURLParam('action');
			var id = getURLParam('id');

			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

			}
			//patrolService.autoCreatGroup();
			vm.isadd = action == "add";
			vm.title = vm.isadd ? "新增" : "编辑";
			vm.patrol = {};
			var initData = [];
			var initName = "";
			var selecteditems = [];
			var mselecet0 = $('#mselect0');
			initMsSelect(mselecet0);

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
					onSelectAll: OnSelectedChanged,
					onDeselectAll: function() {
						var index = FindItemIndex();
						selecteditems[index].groups = GetAllItems("#mselect0 option:selected");
						var items = GetAllItems("#mselect0 option");
						$.each(items, function() {
							FindGroupAndRemove(this.id);
						});
						SetAllSelectText();
					},
					onChange: OnSelectedChanged
				});
			}

			function OnSelectedChanged(option, checked, select) {
				//var selectgs = GetSelectedIds("#mselect0 option:selected");
				var index = FindItemIndex();
				//selecteditems[index].groups = GetSelectedItems("#mselect0 option:selected");

				if(checked != null && !checked && option[0].parentNode.id == 'mselect0') {
					var val = option[0].value;
					FindGroupAndRemove(parseInt(val));
				}
				selecteditems[index].groups = GetAllItems("#mselect0 option:selected");
				SetAllSelectText();
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

			function SetAllSelectText() {
				var texts = [],
					ids = [];
				$.each(selecteditems, function() {
					$.each(this.groups, function() {
						if(ids.indexOf(this.id) == -1) {
							texts.push(this.text);
							ids.push(this.id);
						}
					});
				});

				$('#selectedlist').html('');
				$.each(texts, function() {
					$('#selectedlist').append('<li>' + this + '</li>');
				});
			}
			patrolService.getAllKeyAreas().then(function(result) {
				vm.selectareas = result.data.items;
			});
			if(!vm.isadd) {
				//获取单个的group
				patrolService.getGroupById({
					Id: id
				}).then(function(result) {
					selecteditems = result.data.items;
					initData = JSON.parse(JSON.stringify(result.data.items));
					initName = result.data.name;
					vm.patrol.GroupName = result.data.name;
					SetAllSelectText();
				});

			}
			vm.areaChanged = function() {
				var index = FindItemIndex();
				if(index == -1) {
					selecteditems.push({
						areaid: vm.patrol.AreaId,
						groups: []
					});
				}
				//vm.groups = null;
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
			vm.creatGroup = function() {
				if(vm.patrol.AreaId == null) return;
				creatOrGetGroup(true);
			}

			function creatOrGetGroup(bl) {
				patrolService.creatOrGetGroupByAreaId({
					AreaId: vm.patrol.AreaId,
					IsCreat: true
				}).then(function(result) {
					AddItems(result.data.groups, -1);
					//vm.groups = result.data.typeGroups;
					var s = [];

					$.each(selecteditems, function() {
						$.each(this.groups, function() {
							s.push(this.id.toString());
						});
					});
					mselecet0.multiselect('select', s);

				});
			}

			function AddItems(arr, id) {
				mselecet0.html("");
				var s0 = [];
				$.each(arr, function() {
					mselecet0.append("<option value='" + this.id + "'>" + this.name + "</option>");
					if(this.mergeId == id) s0.push(this.id.toString());
				});

				initMsSelect(mselecet0);
				if(s0.length > 0) mselecet0.multiselect("select", s0);

			}
			vm.creatTypeGroup = function() {
				var ids = GetIds();
				if(vm.patrol.GroupName == null || vm.patrol.GroupName.trim() == '') {
					abp.message.error("请输入分组名称！")
					return;
				}
				if(ids.gids.length == 0) {
					abp.message.error("请选择巡检点！")
					return;
				}
				patrolService.creatTypeGroup({
					Name: vm.patrol.GroupName,
					GroupIds: ids.gids,
					AreaIds: ids.aids
				}).then(function() {
					abp.notify.info("创建成功");
					vm.cancel();
				});
			}
			vm.eidtTypeGroup = function() {
				var ids = GetIds();
				if(ids.gids.length == 0) {
					abp.message.error("请选择巡检点！")
					return;
				}
				patrolService.updateTypeGroup({
					Id: id,
					Name: vm.patrol.GroupName,
					GroupIds: ids.gids,
					AreaIds: ids.aids
				}).then(function(result) {
					if(result.data == "success") {
						abp.notify.info("保存成功");
						vm.cancel();
					} else {
						abp.message.confirm("当前分组已在("+result.data+")计划中，是否更改？", function(isconfirm) {
							if(isconfirm) {
								patrolService.updateTypeGroup({
									Id: id,
									Name: vm.patrol.GroupName,
									GroupIds: ids.gids,
									AreaIds: ids.aids,
									Update: "Update"
								}).then(function(result) {
									if(result.data == "success") {
										abp.notify.info("保存成功");
										vm.cancel();
									}
								});
							}
						});
					}
				});
			}

			function GetIds() {
				var ids = {
					gids: [],
					aids: []
				};
				$.each(selecteditems, function() {
					$.each(this.groups, function() {
						if(ids.gids.indexOf(this.id) == -1) {
							ids.gids.push(this.id);
						}
					});
					if(this.groups.length > 0) {
						ids.aids.push(this.areaid);
					}
				});
				return ids;
			}
			vm.removeGroup = function(group) {
				abp.message.confirm("是否确定删除此分组？", function(isconfirm) {
					if(isconfirm) {
						patrolService.deleteTypeGroup({
							Id: group.id
						}).then(function() {
							abp.notify.info("删除成功");
							creatOrGetGroup(false);
						});
					}
				});
			}

			vm.isEdit = 0;
			vm.selectedGroup = null;
			vm.editGroup = function(group) {
				vm.isEdit = 1;
				vm.selectedGroup = group;
				mselecet0.multiselect('deselectAll', false);
				var s = [];
				$.each(group.groupIds, function() {
					s.push(this.toString());
				})
				vm.patrol.GroupName = group.name;
				if(s.length > 0) mselecet0.multiselect("select", s);
				mselecet0.multiselect('updateButtonText');
			}
			vm.reset = function(fromareachange) {
				vm.isEdit = 0;
				vm.selectedGroup = null;
				mselecet0.multiselect('deselectAll', false);
				mselecet0.multiselect('updateButtonText');
				vm.patrol.GroupName = initName;
				vm.patrol.AreaId = null;
				selecteditems = JSON.parse(JSON.stringify(initData));
				AddItems([], -1);
				SetAllSelectText();
			}
			vm.cancel = function() {
				window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex;
			}
			///------------------------------------------------------------///
		}
	]);
})();