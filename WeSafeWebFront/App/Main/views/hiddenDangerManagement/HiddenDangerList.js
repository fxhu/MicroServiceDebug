(function () {
    var controllerId = 'app.views.HiddenDangerList';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.troubles', '$state',
        function ($scope, $uibModal, troublesService, $state) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var noticeid = getURLParam('troubleid');
            var pageindex = getURLParam('pageindex');
            var type = getURLParam('type');

            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            vm.serchinfo = {};
            switch (type) {
                case "6":
                    vm.serchinfo.HiddenTroubleStatus = 6;
                    $("#li1").removeClass("active");
                    $("#li2").addClass("active");
                    break;
                case "1":
                    vm.serchinfo.HiddenTroubleStatus = 1;
                    $("#li1").removeClass("active");
                    $("#li3").addClass("active");
                    break;
                case "3":
                    vm.serchinfo.HiddenTroubleStatus = 3;
                    $("#li1").removeClass("active");
                    $("#li4").addClass("active");
                    break;
                case "4":
                    vm.serchinfo.HiddenTroubleStatus = 4;
                    $("#li1").removeClass("active");
                    $("#li5").addClass("active");
                    break;
                case "0":
                    vm.serchinfo.HiddenTroubleStatus = 0;
                    $("#li1").removeClass("active");
                    $("#li6").addClass("active");
                    break;
                case "7":
                    vm.serchinfo.HiddenTroubleStatus = 7;
                    $("#li1").removeClass("active");
                    $("#li7").addClass("active");
                    break;
                case "8":
                    vm.serchinfo.HiddenTroubleStatus = 8;
                    $("#li1").removeClass("active");
                    $("#li8").addClass("active");
                    break;
                case "9":
                    vm.serchinfo.HiddenTroubleStatus = 9;
                    $("#li1").removeClass("active");
                    $("#li9").addClass("active");
                    break;
                default:
                    vm.serchinfo.HiddenTroubleStatus = -1;
                    break;
            }
            pageindex = pageindex == null ? 1 : parseInt(pageindex);

            vm.troubleTypes = [{
                id: 0,
                type: "一般隐患"
            }, {
                id: 1,
                type: "重大隐患"
            }];
            vm.datasFrom = [{
                id: 0,
                type: "PC端"
            }, {
                id: 1,
                type: "移动端"
            }, {
                id: 2,
                type: "微信端"
            }, {
                id: 3,
                type: "举报"
            }];
            vm.troubleStatus = [{
                    id: 0,
                    type: "已闭环"
                }, {
                    id: 1,
                    type: "待整改"
                }, {
                    id: 2,
                    type: "未提交"
                }, {
                    id: 3,
                    type: "待复查"
                },
                {
                    id: 4,
                    type: "复查未通过"
                }, {
                    id: 5,
                    type: "已撤销"
                }, {
                    id: 6,
                    type: "已逾期"
                }
            ];
            //          troublesService.getAllUses().then(function (result) {
            //              vm.users = result.data.items;
            //          });
            var initSearchInfo = JSON.stringify(vm.serchinfo);
            //$state.go("HiddenDangerList");
            window.location.href = "/default.html#!/HiddenDangerList";
            var bsturl = abp.appPath + 'HiddenTrouble/GetAllTroublesByInfo';
            //var bsturl = '/HiddenTrouble/GetAllTroublesByInfo';
            if (noticeid == null) {
                bsturl += '?searchinfo=' + initSearchInfo;
            } else {
                bsturl += '?id=' + noticeid;
            }
            $('#tb_goods').bootstrapTable({
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
                showPaginationSwitch: false,
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
                    $(".check").click(function () {
                        var idx = $(this).attr("val");
                        var tb = $("#tb_goods").bootstrapTable('getData')[idx];
                        if (tb == null) {
                            return;
                        }
                        var pageindex = $('#tb_goods').bootstrapTable('getOptions').pageNumber;
                        var tbtype = vm.serchinfo === null ? -1 : vm.serchinfo.HiddenTroubleStatus;
                        window.location.href = "/default.html#!/LookHiddenTrouble?backpage=HiddenDangerList&RiskStatus=" + tb.hiddenTroubleStatus + "&Id=" + tb.id + "&pageindex=" + pageindex + "&type=" + tbtype;

                    });
                    $(".edit").click(function () {
                        var idx = $(this).attr("val");
                        var tb = $("#tb_goods").bootstrapTable('getData')[idx];
                        if (tb == null) {
                            return;
                        }
                        if (tb.reportUserId != abp.session.userId || (tb.hiddenTroubleStatus != 7)) return;
                        var pageindex = $('#tb_goods').bootstrapTable('getOptions').pageNumber;
                        var tbtype = vm.serchinfo === null ? -1 : vm.serchinfo.HiddenTroubleStatus;
                        window.location.href = "/default.html#!/EditHiddenTrouble?backpage=HiddenDangerList&RiskStatus=" + tb.hiddenTroubleStatus + "&Id=" + tb.id + "&pageindex=" + pageindex + "&type=" + tbtype;
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
                columns: [
                    //{
                    //checkbox: true,
                    //title: ''
                    //},
                    {
                        field: 'hiddenTroubleContent',
                        title: '隐患描述',
                        width: '30%',
                        valign: "middle",
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'areaName',
                        width: '15%',
                        title: '隐患场所',
                        valign: "middle",
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'reportUserName',
                        title: '上报人',
                        valign: "middle",
                        align: 'center',
                        sortable: true
                    },
                    {
                        field: 'chargeUserName',
                        title: '负责人',
                        valign: "middle",
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'hiddenTroubleFindTimeStr',
                        title: '隐患发现时间',
                        valign: "middle",
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'rectifyEndTimeStr',
                        title: '整改期限',
                        valign: "middle",
                        align: 'center',
                        sortable: true,
                        formatter: function (val, row, index) {
                            if (row.hiddenTroubleStatus != 7 && row.hiddenTroubleStatus != 8 && row.isOverDue) {
                                return "<label  style=\"padding-bottom:0px;color:red;\">" + val + "</label>";
                            } else {
                                return "<label  style=\"padding-bottom:0px;\">" + val + "</label>";
                            }
                        }
                    }, {
                        field: 'hiddenTroubleType',
                        title: '隐患级别',
                        valign: "middle",
                        align: 'center',
                        formatter: function (val) {
                            if (val == 0) {
                                return "<label  style=\"padding-bottom:0px\">一般隐患</label>";
                            } else {
                                return "<label  style=\"padding-bottom:0px\">重大隐患</label>";
                            }
                        },
                        sortable: true
                    }, {
                        field: 'hiddenTroubleStatus',
                        title: '隐患状态',
                        valign: "middle",
                        align: 'center',
                        formatter: function (val) {
                            //if (val == 0) {
                            //    return "<label class=\"label label-success\" style=\"padding-bottom:0px\">已闭环</label>";
                            //}
                            //else {
                            //    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待整改</label>";
                            //}
                            switch (val) {
                                case 0:
                                    return "<label class=\"label label-success\" style=\"padding-bottom:0px\">已闭环</label>";
                                case 1:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待整改</label>";
                                case 2:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">未提交</label>";
                                case 3:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待复查</label>";
                                case 4:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">复查未通过</label>";
                                case 5:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">已撤销</label>";
                                case 6:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">已逾期</label>";
                                case 7:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待审核</label>";
                                case 8:
                                    return "<label class=\"label label-info\" style=\"padding-bottom:0px\">已废弃</label>";
                                case 9:
                                    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待指派</label>";
                            }
                        },
                        sortable: true
                    }, {
                        title: '操作',
                        valign: "middle",
                        align: 'center',
                        formatter: function (val, row, index) {
                            //abp.session.userId
                            var dis = row.reportUserId == abp.session.userId && row.hiddenTroubleStatus == 7;
                            if (!dis) dis = "disabled = 'disabled'";
                            else dis = '';
                            return '<a  href="javascript:;" class=" check" val=' + index +
                                '><i class="iconfont icon-chakan1"></i></a>' + '<a  href="javascript:; "' + dis + ' class="edit" val=' + index +
                                '><i class="iconfont icon-icon6"></i></a>';

                        }
                    }
                ]
            });
            vm.searchstatus = function (status) {
                vm.serchinfo = vm.serchinfo == null ? {} : vm.serchinfo;
                vm.serchinfo.HiddenTroubleStatus = status;
                vm.search();
            }
            vm.search = function () {
                var info = JSON.stringify(vm.serchinfo);
                var strurl = vm.serchinfo == null ? 'HiddenTrouble/GetAllTroublesByInfo/' : 'HiddenTrouble/GetAllTroublesByInfo/?searchinfo=' + info;
                var opt = {
                    url: abp.appPath + strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                $('#tb_goods').bootstrapTable("refresh", opt);

            }
            vm.reset = function () {
                if (vm.serchinfo) {
                    switch (vm.serchinfo.HiddenTroubleStatus) {
                        case 6:
                            $("#li2").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 1:
                            $("#li3").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 3:
                            $("#li4").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 4:
                            $("#li5").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 0:
                            $("#li6").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 7:
                            $("#li7").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 8:
                            $("#li8").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        case 9:
                            $("#li9").removeClass("active");
                            $("#li1").addClass("active");
                            break;
                        default:
                            $("#li1").addClass("active");
                            break;
                    }
                }
                this.serchinfo = null
                this.search();
            };
            //*************************尾部*********************************************//
        }
    ]);
})();