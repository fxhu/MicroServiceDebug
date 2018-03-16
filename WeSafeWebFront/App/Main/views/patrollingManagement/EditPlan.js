(function () {
    var controllerId = 'app.views.EidtPlan';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', 'abp.services.app.patrol', function ($scope, $timeout, patrolService) {
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
            vm.points = [];
            vm.areas = [];
            vm.details = [];
            vm.Periods = vm.PatrolType = [{ id: 0, type: '每天' }/*, { id: 1, type: '三天' }, { id: 2, type: '五天' }*/, { id: 3, type: '每周' }, { id: 4, type: '每月' }/*, { id: 5, type: '自定义' }*/];
            //vm.Periods = vm.PatrolType = [{ id: 0, type: '每天' }, { id: 1, type: '三天' }, { id: 2, type: '五天' }, { id: 3, type: '每周' }, { id: 4, type: '每月' }, { id: 5, type: '自定义' }];
            vm.patrol.Period = 0;
            var current = (new Date("2012-01-01")).getTime();
            var staticdate = (new Date("2012-01-01")).getTime();
            var onemonth = 1 * 24 * 3600 * 1000;
            var arrtgid = [],arrgid=[];
            var selecteditems = [];
            var mselecet0 = $('#mselect0'), mselecet1 = $('#mselect1');
            var isLoadedUser = false;
            var initialdata = [];
            initMsSelect(mselecet0);
            initMsSelect(mselecet1);
            patrolService.getAllUsers().then(function (result) {
                vm.users = result.data.items;
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
                if (vm.patrol.UserId != null) {
                    $('#mselect_user').multiselect('select', vm.patrol.UserId.toString());
                }
                isLoadedUser = true;
            });
            patrolService.getAllKeyAreas().then(function (result) {
                vm.selectareas = result.data.items;
            });
            patrolService.getPlanById({ Id: id }).then(function (result) {
                InitDatePicker();
                var data = result.data;
                vm.patrol.Name = data.name;
                vm.patrol.Period = data.period;
                vm.patrol.UserId = data.userId;
                if (isLoadedUser) $('#mselect_user').multiselect('select', data.userId.toString());
                vm.patrol.PathId = data.pathId;
                vm.patrol.IsSequence = data.isSquence;
                vm.patrol.IsActive = data.isActive;
                selecteditems = data.groupObject;
                initialdata = JSON.parse(JSON.stringify(data.groupObject));
                arrtgid = data.typeGroupIds;
                switch (data.period) {
                    case 0: case 1: case 2:
                        SetTime(data.startTime, data.endTime);
                        break;
                    case 3:
                        SetDateAndTime(data.startTime, data.endTime, allTime.times2)
                        break;
                    case 4:
                        SetDateAndTime(data.startTime, data.endTime, allTime.times3)
                        break;
                    case 5:
                        var st = new Date(data.startTime);
                        var et = new Date(data.endTime);
                        $('#dt_end').datetimepicker('update', et);
                        $('#dt_start').datetimepicker('update', st);
                        vm.patrol.EndTime = data.endTime;
                        vm.patrol.StartTime = data.startTime;
                        $("#selfsettime")[0].style.display = "inherit";
                        break;
                    default:
                        break;
                }
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
                    onDeselectAll: function () {
                        var index = FindItemIndex();
                        if (this.$select[0].id == "mselect0") {
                            selecteditems[index].groups = [];
                            $.each(this.originalOptions, function () {
                                var val = this.value;
                                FindGroupAndRemove(val);
                            });
                        } else {
                            selecteditems[index].typegroups = [];
                            $.each(this.originalOptions, function () {
                                var val = this.value;
                                FindTypeGroupAndRemove(val);
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
                var a = [], b = [];
                $.each(selecteditems, function () {
                    $.each(this.typegroups, function () {
                        var ids = FindGroupIds(this.id);
                        a = a.concat(ids);
                    });
                    $.each(this.groups, function () {
                        b.push(this.id);
                    });
                });
                var intg = [];
                for (var i = 0; i < b.length; i++) {
                    if ($.inArray(b[i], a) >= 0) {
                        intg.push(b[i].toString());
                        FindGroupAndRemove(b[i]);
                    }
                }
                if (checked != null && !checked && option[0].parentNode.id == 'mselect0') {
                    var val = option[0].value;
                    FindGroupAndRemove(parseInt(val));
                }
                if (checked != null && !checked && option[0].parentNode.id == 'mselect1') {
                    var val = option[0].value;
                    FindTypeGroupAndRemove(parseInt(val));
                }
                mselecet0.multiselect('deselect', intg);
                selecteditems[index].groups = GetAllItems("#mselect0 option:selected");
                selecteditems[index].typegroups = GetAllItems("#mselect1 option:selected");
                SetAllSelectText();
                if (this.$select[0].id == "mselect1") {//过滤类型
                    FilterGroup();
                }
            }
            function FilterGroup() {
                //刷新节点
                AddItems(arrgid, -1, mselecet0);
                //添加上已经勾选的
                var s1 = [];
                $.each(selecteditems, function () {
                    $.each(this.groups, function () {
                        s1.push(this.id.toString());
                    });
                });
                mselecet0.multiselect('select', s1);
            }
            vm.reset = function () {
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
                $.each(selecteditems, function () {
                    var index = -1;
                    $.each(this.groups, function (num) {
                        if (this.id == id) {
                            index = num;
                        }
                    });
                    if (index != -1) {
                        this.groups.splice(index, 1);
                    }
                });
            }
            function FindTypeGroupAndRemove(id) {
                $.each(selecteditems, function () {
                    var index = -1;
                    $.each(this.typegroups, function (num) {
                        if (this.id == id) {
                            index = num;
                        }
                    });
                    if (index != -1) {
                        this.typegroups.splice(index, 1);
                    }
                });
            }
            function FindGroupIds(id) {
                for (var i = 0; i < arrtgid.length; i++) {
                    if (arrtgid[i].id == id) {
                        return arrtgid[i].tgids;
                    }
                }
            }
            function GetSelectedIds(selector) {
                var ids = [];
                $.each($(selector), function () {
                    ids.push(parseInt(this.value));
                });
                return ids;
            }
            function GetAllItems(selector) {
                var items = [];
                $.each($(selector), function () {
                    items.push({ id: parseInt(this.value), text: this.text });
                });
                return items;
            }
            vm.seletedTexts = [];
            function SetAllSelectText() {
                var texts = [];
                $.each(selecteditems, function () {
                    $.each(this.typegroups, function () {
                    	if(texts.indexOf(this.text)!=-1)return true;
                        texts.push(this.text);
                    });
                    $.each(this.groups, function () {
                    	if(texts.indexOf(this.text)!=-1)return true;
                        texts.push(this.text);
                    });
                });

                $('#selectedlist').html('');
                $.each(texts, function () {
                    $('#selectedlist').append('<li>' + this + '</li>');
                });
            }
            function creatOrGetGroup() {
                patrolService.creatOrGetGroupByAreaId({ AreaId: vm.patrol.AreaId, IsCreat: false }).then(function (result) {
                    $.each(result.data.typeGroups, function () {
                        var ishave = false;
                        for (var i = 0; i < arrtgid.length; i++) {
                            if (arrtgid[i].id == this.id) {
                                ishave = true;
                            }
                        }
                        if (!ishave) {
                            arrtgid.push({ id: this.id, tgids: this.groupIds });
                        }
                    });
                    arrgid = result.data.groups;
                    AddItems(result.data.groups, -1, mselecet0);
                    AddItems(result.data.typeGroups, -1, mselecet1);
                    var s1 = [], s2 = [];
                    $.each(selecteditems, function () {
                        $.each(this.groups, function () {
                            s1.push(this.id.toString());
                        });
                        $.each(this.typegroups, function () {
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
                if (ele[0].id == "mselect0") {
                    $.each(selecteditems, function () {
                        $.each(this.typegroups, function () {
                            var ids = FindGroupIds(this.id);
                            a = a.concat(ids);
                        });
                    });
                }
                $.each(arr, function () {
                    if (ele[0].id == "mselect0" && a.indexOf(this.id) != -1) return true;
                    ele.append("<option value='" + this.id + "'>" + this.name + "</option>");
                });
                initMsSelect(ele);
            }
            vm.areaChanged = function () {
                var index = FindItemIndex();
                if (index == -1) {
                    selecteditems.push({ areaid: vm.patrol.AreaId, groups: [], typegroups: [] });
                }
                creatOrGetGroup(false);
            }
            function FindItemIndex() {
                var index = -1;
                $.each(selecteditems, function (num) {
                    if (this.areaid == vm.patrol.AreaId) {
                        index = num;
                        return false;
                    }
                });
                return index;
            }
            function SetDateAndTime(st, et, arr) {
                vm.changep();
                var a1 = st.split(' '), a2 = et.split(' ');
                SetTime(a1[1], a2[1]);
                $.each(arr, function () {
                    if (this.type == a1[0]) {
                        vm.patrol.date = this.id;
                        return false;
                    }
                });
            }
            function SetTime(st, et) {
                $.each(vm.times, function () {
                    if (this.type == st) {
                        vm.patrol.StartTime = this.id;
                    }
                    if (this.type == et) {
                        vm.patrol.EndTime = this.id;
                    }
                });
            }
            vm.timeChanged = function () {
                if (vm.patrol.StartTime > vm.patrol.EndTime) {
                    var end = vm.patrol.StartTime + 1;
                    if (end > vm.times.length) {
                        vm.patrol.StartTime--;
                        end = vm.times.length;
                    }
                    vm.patrol.EndTime = end;
                }
            }
            vm.dateTimeChange = function () {
                var st = new Date(vm.patrol.StartTime).getTime();
                var et = new Date(vm.patrol.EndTime).getTime();
                var m30 = 1800 * 1000;
                if (st > et) {
                    et = st + m30;
                }
                et = new Date(et);
                $('#dt_end').datetimepicker('update', et);
                vm.patrol.EndTime = et.Format("yyyy-MM-dd HH:mm")
            }
            vm.changep = function () {
                if (vm.patrol.Period == 3) {
                    vm.dates = allTime.times2;
                } else if (vm.patrol.Period == 4) {
                    vm.dates = allTime.times3;
                }
                vm.patrol.EndTime = 2;
                vm.patrol.StartTime = 1;

                if (vm.patrol.Period == 5) {
                    $("#selfsettime")[0].style.display = "inherit";
                    vm.patrol.StartTime = null;
                    vm.patrol.EndTime = null;
                }
                else {
                    $("#selfsettime")[0].style.display = "none";
                }
            }

            function InitDatePicker() {
                $('.mydate').datetimepicker({
                    format: "yyyy-mm-dd hh:ii",
                    autoclose: true,
                    minView: 0,
                    minuteStep: 30,
                    language: "zh-CN"
                });
            }
            function creatTime() {
                var t = [];
                var id = 1;
                var pad = "00";
                for (var i = 0; i <= 23; i++) {
                    var str = i.toString();
                    var hour = pad.substring(0, pad.length - str.length) + str;
                    t.push({ id: id, type: (hour + ":" + "00") });
                    id++;
                    t.push({ id: id, type: (hour + ":" + "30") });
                    id++;
                }
                return t;
            }
            function creatDays() {
                var t = [];
                var id = 1;
                for (var i = 1; i <= 25; i++) {
                    t.push({ id: id, type: (i.toString() + "日") });
                    id++;
                }
                return t;
            }
            function FindType(arr, id) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == id) {
                        return arr[i].type;
                    }
                }
            }
            var t1 = creatTime(), t2 = creatDays();
            var allTime = {
                times1: t1,
                times2: [{ id: 1, type: '周一' }, { id: 2, type: '周二' }, { id: 3, type: '周三' }, { id: 4, type: '周四' }, { id: 5, type: '周五' }, { id: 6, type: '周六' }, { id: 7, type: '周日' }],
                times3: t2
            };
            vm.times = allTime.times1;
            vm.patrol.EndTime = 2;
            vm.patrol.StartTime = 1;
            vm.patrol.IsSequence = false;
            vm.patrol.IsActive = true;
            vm.save = function () {
                var selectgs = [];
                var selecttgs = [];
                var areaids = [];
                $.each(selecteditems, function () {
                    $.each(this.typegroups, function () {
                        selecttgs.push(this.id);
                    });
                    $.each(this.groups, function () {
                        selectgs.push(this.id);
                    });
                    if (this.typegroups.length > 0 || this.groups.length > 0) {
                        if (areaids.indexOf(this.areaid) == -1) areaids.push(this.areaid);
                    }
                });
                var selectUser = GetSelectedIds('#mselect_user option:selected');
                if (vm.patrol.Name == null || vm.patrol.Name.trim() == '') {
                    abp.message.error("请输入计划名称！");
                    return;
                }
                if (selectUser.length == 0) {
                    abp.message.error("请选择负责人！");
                    return;
                }
                if (selectgs.length == 0 && selecttgs.length == 0) {
                    abp.message.error("请选择巡检组！");
                    return;
                }
                var endtime = FindType(vm.times, vm.patrol.EndTime);
                var starttime = FindType(vm.times, vm.patrol.StartTime);
                if (vm.patrol.Period > 2 && vm.patrol.Period < 5) {
                    var date = FindType(vm.dates, vm.patrol.date)
                    endtime = date + ' ' + endtime;
                    starttime = date + ' ' + starttime;
                }
                else if (vm.patrol.Period == 5) {
                    endtime = vm.patrol.EndTime;
                    starttime = vm.patrol.StartTime;
                }
                var p = {
                    Id: id, GroupIds: selectgs, TypeGroupIds: selecttgs, AreaIds: JSON.stringify(areaids),
                    Name: vm.patrol.Name, UserId: selectUser[0], Period: vm.patrol.Period,
                    StartTime: starttime, EndTime: endtime, IsSequence: vm.patrol.IsSequence, IsActive: vm.patrol.IsActive
                };
                patrolService.editPlan(p).then(function () {
                    abp.notify.info(app.localize('保存成功'));
                    window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
                });
            }
            vm.cancel = function () {
                window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
            }
            ///------------------------------------------------------------///
        }
    ]);
})();