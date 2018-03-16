(function () {
    var controllerId = 'app.views.PatrolTask';

    /*点击回车执行搜索*/


    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.patrol',
        function ($scope, $uibModal, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var noticeid = getURLParam('id');
            var pageindex = getURLParam('pageindex');
            var backp = getURLParam('backpage');
            if (backp != null) noticeid = null;
            var type = getURLParam('type');


            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }

            switch (type) {
                case "0":
                    vm.status = 0;
                    $("#li1").removeClass("active");
                    $("#li2").addClass("active");
                    break;
                case "1":
                    vm.status = 1;
                    $("#li1").removeClass("active");
                    $("#li3").addClass("active");
                    break;
                case "2":
                    vm.status = 2;
                    $("#li1").removeClass("active");
                    $("#li4").addClass("active");
                    break;
                case "3":
                    vm.status = 3;
                    $("#li1").removeClass("active");
                    $("#li5").addClass("active");
                    break;
                case "4":
                    vm.status = 4;
                    $("#li1").removeClass("active");
                    $("#li6").addClass("active");
                    break;
                case "5":
                    vm.status = 5;
                    $("#li1").removeClass("active");
                    $("#li7").addClass("active");
                    break;
                case "6":
                    vm.status = 6;
                    $("#li1").removeClass("active");
                    $("#li8").addClass("active");
                    break;
                case "7":
                    vm.status = 7;
                    $("#li1").removeClass("active");
                    $("#li9").addClass("active");
                    break;
                default:
                    vm.status = -1;
                    break;
            }
            patrolService.autoCreatGroup({IsAutoCreat: false});//根据后台是否创建了数据，如果没创建就创建基础分组
            window.location.href = "/default.html#!/PatrolTask";
            pageindex = pageindex == null ? 1 : pageindex;
            vm.serchinfo = null;
            var bsturl = abp.appPath + 'Patrol/GetAllTask';
            if (noticeid == null) {
                bsturl += '?status=' + vm.status;
            } else {
                bsturl += '?status=-1&id=' + noticeid;
            }
            var table = $('#table');
            table.bootstrapTable({
                url: bsturl, //请求后台的URL（*）
                method: 'get',
                striped: true, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, //是否显示分页（*）
                sortable: true, //是否启用排序
                //sortOrder: "asc",                   //排序方式
                silentSort: false,
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: pageindex, //初始化加载第一页，默认第一页
                pageSize: Common.PageSize, //每页的记录行数（*）
                //pageList: Common.PageList,        //可供选择的每页的行数（*）
                search: false, //是否显示表格搜索
                strictSearch: false,
                showColumns: false, //是否显示所有的列
                showRefresh: false, //是否显示刷新按钮
                clickToSelect: false, //是否启用点击选中行
                showToggle: false, //是否显示详细视图和列表视图的切换按钮
                cardView: false, //是否显示详细视图
                detailView: false, //是否显示父子表
                idField: "id",
                onLoadSuccess: function () {
                    table.find("thead").find("th.bs-checkbox").find("label").css("padding-left", "20px");
                    table.find("input[disabled=disabled]").parent().parent().css("cursor", "not-allowed");
                    $(".look").click(function () {
                        var idx = $(this).attr("val");
                        var task = table.bootstrapTable('getData')[idx];
                        if (task == null) {
                            return;
                        }
                        //if (task.UserId != abp.session.userId) return;
                        var pageindex = table.bootstrapTable('getOptions').pageNumber;
                        window.location.href = "/default.html#!/LookTask?backpage=PatrolTask&pageindex=" + pageindex + "&id=" + task.id + "&type=" + vm.status;
                    });
                    $(".edit").click(function () {
                        var idx = $(this).attr("val");
                        var task = table.bootstrapTable('getData')[idx];
                        if (task == null) {
                            return;
                        }
                        if (task.userId !== abp.session.userId || task.status != 0) return;
                        var pageindex = table.bootstrapTable('getOptions').pageNumber;
                        window.location.href = "/default.html#!/EditTask?backpage=PatrolTask&pageindex=" + pageindex + "&id=" + task.id + "&type=" + vm.status;
                    });
                    $(".audit").click(function () {
                        var idx = $(this).attr("val");
                        var task = table.bootstrapTable('getData')[idx];
                        if (task == null) {
                            return;
                        }
                        if (task.userId !== abp.session.userId || task.status != 0) return;
                        var tasks = [];
                        tasks.push(task);
                        vm.assignTask(tasks);
                    });
                },
                rowStyle: function (row, index) {
                    var classes = ['bgGray', 'bgWhite'];

                    if (index % 2 === 0) {
                        return {
                            classes: classes[0]
                        };
                    } else {
                        return {
                            classes: classes[1]
                        };
                    }
                },
                columns: [{
                    checkbox: true,
                    valign: "middle",
                    formatter: function (val, row) {
                        var dis = row.userId === abp.session.userId && row.status == 0;
                        return {
                            disabled: !dis
                        };
                    }

                },
                    {
                        field: 'name',
                        title: '任务名称',
                        sortable: true
                    },
                    {
                        field: 'planName',
                        title: '所属计划',
                        sortable: true
                    },
                    {
                        field: 'createUserName',
                        title: '创建人',
                        sortable: true
                    }, {
                        field: 'userName',
                        title: '负责人',
                        sortable: true
                    },
                    {
                        field: 'executeUserName',
                        title: '巡检人',
                        sortable: true
                    },
                    {
                        field: 'status',
                        title: '状态',
                        sortable: true,
                        formatter: function (val) {
                            switch (val) {
                                case 0:
                                    return "待审核";
                                case 1:
                                    return "未开始";
                                case 2:
                                    return "进行中";
                                case 3:
                                    return "待审核";
                                case 4:
                                    return "已完成";
                                case 5:
                                    return "已完成";
                                case 6:
                                    return "已逾期";
                                case 7:
                                    return "已取消";
                                default:
                                    return "";
                            }
                        }
                    },
                    {
                        field: 'startTime',
                        title: '开始时间',
                        sortable: true,
                        formatter: function (val) {
                            if (val.indexOf('/Date()') == -1) {
                                date = (new Date(val)).getTime();
                            } else {
                                date = parseInt(val.replace("/Date(", "").replace(")/", ""), 10);
                            }
                            return new Date(date).Format("yyyy-MM-dd HH:mm:ss");
                        }
                    },
                    {
                        field: 'endTime',
                        title: '截止时间',
                        sortable: true,
                        formatter: function (val) {
                            if (val.indexOf('/Date()') == -1) {
                                date = (new Date(val)).getTime();
                            } else {
                                date = parseInt(val.replace("/Date(", "").replace(")/", ""), 10);
                            }
                            return new Date(date).Format("yyyy-MM-dd HH:mm:ss");
                        }
                    },
                    {
                        field: 'remark',
                        title: '巡检结果',
                        sortable: true
                    },
                    {
                        title: '操作',
                        formatter: function (val, row, index) {
                            var action = '';
                            var discolor = "";
                            var dis = row.userId === abp.session.userId && row.status == 0;
                            if (!dis) {
                                dis = "disabled";
                                discolor = "discolor";
                            }
                            else dis = '';

                            /*action = '<a  href="javascript:; "' + dis + ' class="btn-sm edit ' + discolor + '" val=' + index +
                             '><i class="fa fa-edit"></i>编辑</a>' + '<a  href="javascript:; "' + dis + ' class="btn-sm audit ' + discolor + '" val=' + index +
                             '><i class="fa fa-eye"></i>审核</a>';*/

                            action = '<a  href="javascript:; "' + dis + ' class="btn-sm edit ' + discolor + '" val=' + index +
                                '><i class="iconfont icon-icon6" title="编辑" style="font-size: 20px;"></i></a>' + '<a  href="javascript:; "' + dis + ' class="btn-sm audit ' + discolor + '" val=' + index +
                                '><i class="iconfont icon-shenhe" title="审核" style="font-size: 20px;"></i></a>';

                            //else if (row.Status == 1 || row.Status == 2) {
                            //    var dis = row.ExecuteUserId === abp.session.userId;
                            //    if (!dis) dis = "disabled = 'disabled'";
                            //    else dis = '';
                            //    action = '<a  href="javascript:; "' + dis + ' class="btn btn-outline btn-circle btn-sm blue patrol" val=' + index
                            //        + '><i class="fa fa-eye"></i>巡检</a>' ;
                            //}


                            /*return action += '<a  href="javascript:;" class="btn-sm look " val=' + index +
                             '><i class="fa fa-book"></i>查看</a>';*/

                            return action += '<a  href="javascript:;" class="btn-sm look " val=' + index +
                                '><i class="iconfont icon-chakan1" title="查看" style="font-size: 20px;"></i></a>';

                        }
                    }
                ]
            });
            //  var arrselections = $("#tb_alarmrecord").bootstrapTable('getSelections');
            vm.assignTask = function (ts) {
                var tasks = ts == null ? table.bootstrapTable('getSelections') : ts;
                if (tasks.length == 0) {
                    abp.message.error("请勾选数据！");
                    return;
                }
                var taskids = [];
                var taskneededit = "";
                $.each(tasks, function () {
                    var date = 0
                    if (this.endTime.indexOf('/Date()') == -1) {
                        date = (new Date(this.endTime)).getTime();
                    } else {
                        date = parseInt(this.endTime.replace("/Date(", "").replace(")/", ""), 10);
                    }
                    var nowdate = (new Date()).getTime();
                    if (nowdate > date) {
                        taskneededit += this.name + "，";
                    }
                    taskids.push(this.id);
                });
                if (taskneededit != "") {
                    taskneededit = taskneededit.substring(0, taskneededit.length - 1);
                    abp.message.error(taskneededit + "需要编辑截至时间，编辑后再指派！");
                    return;
                }
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/patrollingManagement/TaskFireManModal.html',
                    controller: 'app.views.patrollingManagement.TaskFireManModal as vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return {
                                TaskIds: taskids,
                                IsActive: true,
                                ExecuteUserId: 0,
                                Remark: ''
                            };
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result.data == 1) {
                        vm.search(true);
                    }
                });
            }
            vm.cancelTask = function () {
                var tasks = table.bootstrapTable('getSelections');
                if (tasks.length == 0) {
                    abp.message.error("请勾选数据！");
                    return;
                }
                var taskids = [];
                $.each(tasks, function () {
                    taskids.push(this.id);
                });
                abp.message.confirm("取消后任务不可恢复，请确定是否要取消？", function (isconfirm) {
                    if (isconfirm) {
                        patrolService.auditTask({
                            TaskIds: taskids,
                            IsActive: false,
                            ExcuteUserId: 0,
                            Remark: ''
                        }).then(function () {
                            abp.notify.info("取消巡检任务成功");
                            vm.search(true);
                        });
                    }
                });
            }
            vm.addTemporaryTask = function () {
                var pageindex = table.bootstrapTable('getOptions').pageNumber;
                window.location.href = "/default.html#!/AddTemporaryTask?backpage=PatrolTask&pageindex=" + pageindex + "&type=" + vm.status;

            }
            //vm.status = -1;
            vm.searchstatus = function (status) {
                vm.status = status;
                vm.search();
            }
            vm.search = function (reSerch) {
                // debugger;
                var pagenum = table.bootstrapTable('getOptions').pageNumber;
                var strurl = 'Patrol/GetAllTask';
                strurl = strurl + "?status=" + vm.status + "&searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
                var opt = reSerch ? {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            pageNumber: pagenum
                        }
                    } : {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2
                        }
                    };
                table.bootstrapTable("refresh", opt);
                if (reSerch) {
                    table.bootstrapTable("refreshOptions", {
                        pageNumber: pagenum
                    });
                }
            }


            vm.reset = function () {

                switch (vm.status) {
                    case 0:
                        $("#li1").addClass("active");
                        $("#li2").removeClass("active");
                        break;
                    case 1:
                        $("#li1").addClass("active");
                        $("#li3").removeClass("active");
                        break;
                    case 2:
                        $("#li1").addClass("active");
                        $("#li4").removeClass("active");
                        break;
                    case 3:
                        $("#li1").addClass("active");
                        $("#li5").removeClass("active");
                        break;
                    case 4:
                        $("#li1").addClass("active");
                        $("#li6").removeClass("active");
                        break;
                    case 5:
                        $("#li1").addClass("active");
                        $("#li7").removeClass("active");
                        break;
                    case 6:
                        $("#li1").addClass("active");
                        $("#li8").removeClass("active");
                        break;
                    case 7:
                        $("#li1").addClass("active");
                        $("#li9").removeClass("active");
                        break;
                    default:
                        $("#li1").addClass("active");
                        break;
                }
                vm.status = -1;
                this.serchinfo = null;
                this.search(true);
            };
        }
    ]);
})();