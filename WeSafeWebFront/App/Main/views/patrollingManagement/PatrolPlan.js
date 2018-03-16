 (function () {
    var controllerId = 'app.views.PatrolPlan';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', '$timeout', 'abp.services.app.patrol', function ($scope, $uibModal, $timeout, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var noticeid = getURLParam('id');
            var pageindex = getURLParam('pageindex');
            var type = getURLParam('type');
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            //vm.status = -1;
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
                default:
                    vm.status = -1;
                    break;
            }
            vm.addPlan = function () {
                var pageindex = table.bootstrapTable('getOptions').pageNumber;
                window.location.href = "/default.html#!/AddPlan?backpage=PatrolPlan&pageindex=" + pageindex + "&type=" + vm.status;
            }
            patrolService.autoCreatGroup({ IsAutoCreat: false });//根据后台是否创建了数据，如果没创建就创建基础分组
            window.location.href = "/default.html#!/PatrolPlan";
            pageindex = pageindex == null ? 1 : parseInt(pageindex);
            vm.serchinfo = null;
            var bsturl = abp.appPath +'Patrol/GetAllPlan';
            if (noticeid == null) {
                bsturl += '?status=' + vm.status;
            } else {
                bsturl += '?status=-1&id=' + noticeid;
            }
            var table = $('#table');
            table.bootstrapTable({
                url: bsturl,//请求后台的URL（*）
                method: 'get',
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                //sortOrder: "asc",                   //排序方式
                silentSort: false,
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: pageindex,                       //初始化加载第一页，默认第一页
                pageSize: Common.PageSize,                       //每页的记录行数（*）
                //pageList: Common.PageList,        //可供选择的每页的行数（*）
                search: false,                       //是否显示表格搜索
                strictSearch: false,
                showColumns: false,                  //是否显示所有的列
                showRefresh: false,                  //是否显示刷新按钮
                clickToSelect: false,                //是否启用点击选中行
                showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表
                idField: "id",
                onLoadSuccess: function () {
                    $(".edit").click(function () {
                        var idx = $(this).attr("val");
                        var plan = table.bootstrapTable('getData')[idx];
                        if (plan == null) {
                            return;
                        }
                        if(plan.userId!=abp.session.userId) return;
                        var pageindex = table.bootstrapTable('getOptions').pageNumber;
                        window.location.href = "/default.html#!/EditPlan?backpage=PatrolPlan&pageindex=" + pageindex + "&id=" + plan.id + "&type=" + vm.status;
                    });
                    $(".delete").click(function () {
                        var idx = $(this).attr("val");
                        var plan = table.bootstrapTable('getData')[idx];
                        if (plan == null) {
                            return;
                        }
                        if(plan.userId!=abp.session.userId) return;
                        abp.message.confirm("是否确定删除此计划？", function (isconfirm) {
                            if (isconfirm) {
                                patrolService.deletePlan({ Id: plan.id }).then(function (result) {
                                    if (result.data == "success") {
                                        abp.notify.info("删除成功");
                                        vm.search(true);
                                    } else {
                                        if (result.data == "haveworkrunning") {
                                            setTimeout(function () {
                                                abp.notify.warn("有任务正在运行中，暂时不能删除此计划！");
                                            }, 500);
                                        }
                                    }
                                });
                            }
                        });
                    });
                    $(".ban").click(function () {
                        var idx = $(this).attr("val");
                        var plan = table.bootstrapTable('getData')[idx];
                        if (plan == null) {
                            return;
                        }
                        if(plan.userId!=abp.session.userId) return;
                        patrolService.updatePlanActive({ Id: plan.id, IsActive: false }).then(function () {
                            abp.notify.info("禁用成功");
                            vm.search(true);
                        });
                    });
                    $(".check").click(function () {
                        var idx = $(this).attr("val");
                        var plan = table.bootstrapTable('getData')[idx];
                        if (plan == null) {
                            return;
                        }
                        if(plan.userId!=abp.session.userId) return;
                        patrolService.updatePlanActive({ Id: plan.id, IsActive: true }).then(function () {
                            abp.notify.info("启用成功");
                            vm.search(true);
                        });
                    });
                },
                rowStyle: function (row, index) {
                    var classes = ['bgGray', 'bgWhite'];

                    if (index % 2 === 0) {
                        return {
                            classes: classes[0]
                        };
                    }
                    else {
                        return {
                            classes: classes[1]
                        };
                    }
                },
                columns: [
                    //{
                    //checkbox: true,
                    //title: ''
                    //},
                    {
                        field: 'name',
                        title: '名称',
                        width: '36%',
                        align:"center",
                        sortable: true
                    }, {
                        field: 'period',
                        title: '周期',
                        width:"7%",
                        align:"center",
                        formatter: function (val) {
                            switch (val) {
                                case 0:
                                    return "每天";
                                case 1:
                                    return "三天";
                                case 2:
                                    return "五天";
                                case 3:
                                    return "每周";
                                case 4:
                                    return "每月";
                                case 5:
                                    return "自定义";
                            }
                        },
                        sortable: true
                    },
                    {
                        field: 'startTime',
                        title: '开始时间',
                        sortable: true,
                        width:"7%",
                        align:"center",
                    },
                    {
                        field: 'endTime',
                        title: '截止时间',
                        sortable: true,
                        width:"7%",
                        align:"center",
                    },{
						field: 'createUserName',
						title: '创建人',
                        sortable: true,
                        width:"7%",
                        align:"center",
					},
                    {
                        field: 'userName',
                        title: '负责人',
                        sortable: true,
                        width:"7%",
                        align:"center",
                    },
                    //{
                    //    field: 'PathName',
                    //    title: '路线名称',
                    //    sortable: true
                    //},
                    //{
                    //    field: 'IsSequence',
                    //    title: '按照路线',
                    //    sortable: true,
                    //    formatter: function (val) {
                    //        return val ? "是" : "否";
                    //    }
                    //},
                    {
                        field: 'isActive',
                        title: '生效',
                        sortable: true,
                        width:"7%",
                        align:"center",
                        formatter: function (val) {
                            return val ? "是" : "否";
                        }
                    },
                    {
                        title: '操作',
                        width:"22%",
                        align:"center",
                        formatter: function (val, row, index) {
                            var discolor = "";
                        	var dis=row.userId==abp.session.userId;
                            // dis=dis?"":"disabled";
                            if (!dis) {
                                dis = "disabled";
                                discolor = "discolor";
                            }
                            else dis = '';
                           /*  var action = '<a  href="javascript:;" '+dis+' class="btn btn-sm blue edit" val=' + index
                                + '><i class="fa fa-edit"></i>编辑</a>' + '<a  href="javascript:;" '+dis+'  class="btn btn-sm blue delete" val=' + index
                                + '><i class="fa fa-trash-o"></i>删除</a>';
                            if (row.isActive) {
                                action += '<a  href="javascript:;" '+dis+'  class="btn dark btn-sm black ban" val=' + index
                                    + '><i class="fa fa-ban"></i>禁用</a>';
                            } else {
                                action += '<a  href="javascript:;" '+dis+'  class="btn btn-sm blue check" val=' + index
                                    + '><i class="fa fa-check"></i>启用</a>';
                            } */
                            var action = '<a  style="box-shadow:none;" href="javascript:;" '+dis+' class="btn  btn-sm  edit ' + discolor + '" val=' +index
                            + '><i class="iconfont icon-icon6"></i></a>' + '<a  style="box-shadow:none;" href="javascript:;" '+dis+'  class="btn btn-sm  delete ' + discolor + '" val=' + index
                            + '><i class="iconfont icon-shanchu"></i></a>';
                        if (row.isActive) {
                            action += '<a  style="box-shadow:none;" href="javascript:;" '+dis+'  class="btn  btn-sm  ban" val=' + index
                                + '><i class="iconfont icon-ban"></i></a>';
                        } else {
                            action += '<a  style="box-shadow:none;" href="javascript:;" '+dis+'  class="btn btn-sm   check" val=' + index
                                + '><i class="iconfont icon-duigou"></i></a>';
                        }
                            return action;
                        }
                    }]
            });
            vm.autoCreatPlan = function () {
                patrolService.autoCreatPlan({ IsAutoCreat: false }).then(function (result) {
                    var msg = "";
                    if (result.data == "nocreate") {
                        msg = "此功能将按照分组信息自动创建周计划，计划生成后并不会启用，您可以对其进行详细的编辑，请确定是否创建？";
                    }
                    if (result.data == "created") {
                        msg = "计划已自动创建，请确定是否更新？";
                    }
                    abp.message.confirm(msg, function (isconfirm) {
                        if (isconfirm) {
                            patrolService.autoCreatPlan({ IsAutoCreat: true }).then(function (result) {
                                if (result.data == "success") {
                                    abp.notify.info("创建成功");
                                    vm.search(true);
                                }
                            });
                        }
                    });
                });
            }
            vm.searchstatus = function (status) {
                vm.status = status;
                vm.search();
            }
            vm.search = function (reSerch) {
                var pagenum = table.bootstrapTable('getOptions').pageNumber;
                var strurl = 'Patrol/GetAllPlan';
                strurl = strurl + "?status=" + vm.status + "&searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
                var opt = reSerch ?
                    {
                        url:abp.appPath+ strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            pageNumber: pagenum
                        }
                    } : {
                        url:abp.appPath+ strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2
                        }
                    };
                table.bootstrapTable("refresh", opt);
                if (reSerch) {
                    table.bootstrapTable("refreshOptions", { pageNumber: pagenum });
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
                    default:
                        $("#li1").addClass("active");
                        break;
                }
                vm.status = -1;
                this.serchinfo = null;
                this.search(true);
            };
            //*************************尾部*********************************************//
        }
    ]);
})();