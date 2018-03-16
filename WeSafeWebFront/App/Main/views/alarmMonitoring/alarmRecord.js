(function () {
    var controllerId = 'app.views.alarmrecord';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.alarms',
        function ($scope, $uibModal, alarmsService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.alarms = null;
            var alarm_srvUrl =abp.appPath+ "AlarmEventTool/GetPageList";
            vm.eventTypes = Common.GetAlarmEventTypes().valsDic;

            $('#tb_alarmrecord').bootstrapTable({
                url: alarm_srvUrl,//请求后台的URL（*）
                method: 'get',
                striped: false,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "asc",                   //排序方式                
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: Common.PageSize,                       //每页的记录行数（*）
                pageList: Common.PageList,        //可供选择的每页的行数（*）
                search: false,                       //是否显示表格搜索
                strictSearch: false,
                showColumns: false,                  //是否显示所有的列
                showRefresh: false,                  //是否显示刷新按钮
                clickToSelect: false,                //是否启用点击选中行
                showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                   //是否显示父子表     
                idField: "id",
                rowStyle: function (row, index) {
                    return {
                        css: { "height": "46px" }
                    };
                },
                onLoadSuccess: function (data) {
                    $('#tb_alarmrecord').find("thead").find("th.bs-checkbox").find("label").css("padding-left", "20px");
                    $('#tb_alarmrecord').find("input[disabled=disabled]").parent().parent().css("cursor", "not-allowed");
                    $("i[alarmId]").unbind().click(function(){
                        vm.viewLog($(this).attr("alarmId"));
                    })
                    $("i[monitorAlarmId]").unbind().click(function(){
                        vm.viewAlarmMonitor($(this).attr("monitorAlarmId"));
                    })
                },
                columns: [{
                    checkbox: true,
                    valign: "middle",
                    align: 'center',
                    formatter: function (val, row, index) {
                        if (row.isAudit) {
                            return {
                                disabled: true
                            };
                        }
                    }
                }, {
                    field: 'name',
                    align: 'center',
                    valign: "middle",
                    title: '报警点'
                    
                }, {
                    field: 'areaName',
                    align: 'center',
                    valign: "middle",
                    title: '报警区域'
                }, {
                    field: 'creationTimeStr',
                    align:'center',
                    valign: "middle",
                    title: '时间'
                }, {
                    field: 'eventType',
                    title: '告警事件',
                    align:'center',
                    valign: "middle",
                    formatter: function (val) {
                        return vm.eventTypes[val];
                    }
                }, {
                    field: 'isAudit',
                    title: '报警状态',
                    align:'center',
                    valign: "middle",
                    formatter: function (val,row) {
                        if (val) {
                            return "<label class=\"label label-success\" style=\"padding-bottom:0px\">已处理</label>";
                        }
                        else if(row.confirmUserID!=null) {
                            return "<label class=\"label label-info\" style=\"padding-bottom:0px\">已确认</label>";
                        }
                        else{
                            return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">未处理</label>";
                        }
                    }
                }, {
                    field: 'auditUser',
                    align:'center',
                    valign: "middle",
                    title: '处警人'
                }, {
                    field: 'auditMessage',
                    align:'center',
                    valign: "middle",
                    title: '处理方式'
                }, {
                    field: 'auditedTimeStr',
                    align:'center',
                    valign: "middle",
                    title: '处理时间'
                }, {
                    field: 'id',
                    valign: "middle",
                    align:'center',
                    title: '处理记录',
                   /*  formatter: function (val) {
                        return "<button class=\"btn blue btn-xs\" alarmId=\""+val+"\">查看</button>";
                    }, */
                    formatter: function (val, row, index) {
                        return '<i class=\"iconfont icon-chakan1\" alarmId=' + val + '></i>';
                    }
                }, {
                    field: 'id',
                    valign: "middle",
                    align:'center',
                    title: '报警详情',
                    formatter: function (val, row) {
                        /* if (row.eventType == 2) { return "<button class=\"btn blue btn-xs\" " + (row.isAudit ? "disabled" : "") + " monitorAlarmId=\"" + val + "\">查看</button>"; }
                        else {
                            return "";
                        } */
                        if (row.eventType == 2) { return "<i class=\"iconfont icon-chakan1\" " + (row.isAudit ? "disabled" : "") + " monitorAlarmId=\"" + val + "\"></i>"; }
                        else {
                            return "";
                        }
                        
                        
                    }
                }
            ]
            });            
            vm.search = function (reSerch) {
                var pagenum = $('#tb_alarmrecord').bootstrapTable('getOptions').pageNumber;
                var strurl = alarm_srvUrl;
                if (vm.serchinfo != null && vm.serchinfo != "") {
                    strurl += "?s=" + vm.serchinfo;
                    var dic = Common.GetAlarmEventTypes().namesDic;
                    if (dic[vm.serchinfo] != undefined) {
                        strurl += "&event=" + dic[vm.serchinfo];
                    }
                    if (vm.serchinfo == "已处理") {
                        strurl += "&isAudit=1";
                    }
                    else if (vm.serchinfo == "未处理") {
                        strurl += "&isAudit=0";
                    }
                }
                var opt = reSerch ?
                    {
                        url:strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            pageNumber: pagenum
                        }
                    } : {
                        url:strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2
                        }
                    };
                $('#tb_alarmrecord').bootstrapTable("refresh", opt);
                if (reSerch) {
                    $('#tb_alarmrecord').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null
                this.search(true);
            };

            vm.alarmAudit = function () {
                var arrselections = $("#tb_alarmrecord").bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    abp.notify.error("请选择有效数据");
                    return;
                }
                //判断是否有确认状态不一致的记录
                if (arrselections.length > 1) {
                    var state = (arrselections[0].confirmUserID == null);
                    var notEqual = false;
                    for (var i = 0; i < arrselections.length; i++)
                    {
                        if (state != (arrselections[i].confirmUserID == null)) {
                            notEqual = true;
                        }
                    }
                    //存在不一致的
                    if (notEqual) {
                        abp.message.confirm("是否继续?", "所选择的报警记录的确认状态不一致！", function (isConfirmed) {
                            if (isConfirmed) {
                                ShowModal(arrselections) 
                            }
                        });
                        return;
                    }
                }
                ShowModal(arrselections);
            };
            function ShowModal(arrselections) {
                var ids = [];
                $.each(arrselections, function (idx, arr) {
                    ids.push(arr.id);
                });
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/main/views/alarmMonitoring/AlarmAuditModal.html',
                    controller: 'app.views.alarmMonitoring.AlarmAuditModal as vm',
                    backdrop: 'static',
                    resolve: {
                        alarmEvent: function () {
                            return ids;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    vm.search(true);
                });
            }
            vm.viewLog = function (id) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/main/views/alarmMonitoring/AlarmLogModal.html',
                    controller: 'app.views.alarmMonitoring.AlarmLogModal as vm',
                    backdrop: 'static',
                    resolve: {
                        alarmEvent: function () {
                            return id;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    vm.search(true);
                });
            };
            vm.viewAlarmMonitor = function (id) {
                $.getJSON(abp.appPath+"AlarmEventTool/GetAlarmEventDetail?Id="+id,function(data){
                    var editUrl = "/DataVisual/AlarmMonitor.html?noback=1&id=" + data.visualAssestId + "&alarmid=" + data.id;
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/main/views/BasicData/ModalWarpper.html',
                        controller: 'app.views.BasicData.ModalWarpper as vm',
                        backdrop: true,
                        size: "lg",
                        resolve:
                        {
                            editSource: function () { return editUrl }
                        }
                    });
                    modalInstance.rendered.then(function () {
                        $(".modal-dialog").css("width", "90%");
                        $(".modal-body").css("height", $(window).height()*0.9);
                        
                    });
                    modalInstance.result.then(function (result) {
                        vm.search(true);
                    }, function () { vm.search(true);});
                });
            };
        }
    ]);
})();