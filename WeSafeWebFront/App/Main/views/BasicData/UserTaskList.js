(function () {
    angular.module('app').controller('app.views.BasicData.UserTaskList', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.userTask',
        function ($scope, $timeout, $uibModal, usertaskService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.serchinfo = null;

            //vm.Tasktype = [{ id: 0, type: "全部" },{ id: 1, type: "资产处理" }, { id: 2, type: "维护保养" }, { id: 3, type: "巡检任务" }];
            //vm.OpState = [{ id: 0, state: "全部" }, { id: 1, state: "已完成" }, { id: 2, state: "未完成" }];
            var _url = abp.appPath+'UserTask/GetCurrentUserTaskByQueryType';
            var _urlFinished = 'UserTask/MarkFinished';
            var _table = $('#tb_task');

            console.log(window.location.href);
            vm.curQueryType = 0;//我的待办0，我的已办1，全部待办2
            var queryStr = Common.getQueryString("curQueryType");
            if (queryStr != null && queryStr != "") {
                vm.curQueryType = queryStr;
                $("#switchNav li").removeClass("active");
                if (queryStr == "2") {
                    $("#switchNav li").eq(0).addClass("active");
                }
                else {
                    $("#switchNav li").eq(1).addClass("active");
                }
            }

            vm.myWaitingThingBtnClick = function () {
                vm.curQueryType = 0;
                btnQuery();
            }

            vm.myDoneThingBtnClick=function () {
                vm.curQueryType = 1;
                btnQuery();
            }

            vm.allWaitingThingBtnClick =function () {
                vm.curQueryType = 2;
                btnQuery();
            }

            function btnQuery() {
                opt = {
                    url: _url + "?&curQueryType=" + vm.curQueryType,
                    pageNumber: 0
                }
                $('#tb_task').bootstrapTable("refresh", opt);
            }

            _table.bootstrapTable({
                url: _url + "?&curQueryType=" + vm.curQueryType,
                method: 'get',
                striped: true,                      //是否显示行间隔色
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
                //responseHandler: function (res) {
                //    return res.result;
                //},
                onLoadSuccess: function () {
                    $(".finished").click(function () {
                        finished();
                    });
                    $(".delete").click(function () {
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        abp.message.confirm(
                            "删除此任务?",
                            function (result) {
                                if (result) {
                                    $.ajax({
                                        async: false,
                                        url: abp.appPath + 'UserTask/Delete/',
                                        beforeSend: function (request) {
                                            request.setRequestHeader("Authorization", tokens);
                                        },
                                        type: 'POST',
                                        data: { id: item.id },
                                        success: function (result) {
                                            if (result.success) {
                                                abp.notify.info("已删除");
                                                refreshTable();
                                            } else {
                                                abp.notify.info(result.msg);
                                            }
                                        },
                                        error: function (err) {
                                            alert(err);
                                        }
                                    });
                                }
                            });
                    });

                },
                columns: [
                     {
                        field: 'description',
                        title: '任务描述',
                        sortable: true,
                        width:"30%",
                        align:"center",
                        valign:"middle",
                    }, {
                        field: 'createModule',
                        title: '任务类型',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function(val, row, index) {
                            if (val == "0") {
                                return "巡检任务";
                            } else if (val == "1") {
                                return "维修任务";
                            } else if (val == "2") {
                                return "保养任务";
                            }
                            else {
                                return "";
                            }
                        }
                    }, {
                        field: 'creationTime',
                        title: '接收时间',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                             var date =  val.replace(/T/,' ');
                            return date;
                        }
                    }, {
                        field: 'assignedPersonName',
                        title: '责任人',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            return val;
                        }
                    }, {
                        field: 'state',
                        title: '处理状态',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            if (val == 1) {
                                return '<span class="label bg-red">未处理</span>'
                            } else {
                                return '<span class="label bg-green">已完成</span>'
                            }
                        }
                    }, {
                        field: 'url',
                        title: '操作',
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            return '<a style="box-shadow:none;" href="'+val+'" class="btn btn-sm "><i style="font-size:20px" class="iconfont icon-chakan1" title="查看"></i></a>';
                        //    <a href="javascript:;" class="btn btn-outline btn-circle btn-sm blue delete" val=' + index + '><i class="fa fa-trash-o"></i>删除</a>
                        }
                    }]
            });

            vm.search = function (reSearch) {
                var pagenum = $('#tb_task').bootstrapTable('getOptions').pageNumber;
                var strurl = vm.serchinfo == null ? 'UserTask/GetCurrentUserTaskByQueryType/' + "?&curQueryType=" + vm.curQueryType : 'UserTask/GetCurrentUserTaskByQueryType/?searchinfo=' + vm.serchinfo + "&curQueryType=" + vm.curQueryType;
                var opt = reSearch ?
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
                $('#tb_task').bootstrapTable("refresh", opt);
                if (reSearch) {
                    $('#tb_task').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }

            vm.reset = function () {
                this.serchinfo = null;
                this.search(true);
            };

            //mark a task as being fished
            function finished() {
                var e = window.event;
                var srcElem = e.target || e.srcElement;
                if (!srcElem) return;
                _idx = $(srcElem).attr("val");
                var item = _table.bootstrapTable('getData')[_idx];
                if (item == null) {
                    return;
                }
                $.ajax({
                    url: abp.appPath + _urlFinished,
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    type: 'POST',
                    data: { id: item.id },
                    success: function (res) {
                        var result = res.result;
                        if (result.success) {
                            //$(this).parentsUntil("tr").find("a:first").removeClass("unread");
                            //_table.bootstrapTable('updateRow', { index: _idx, row: result.newrow });
                            refreshTable();
                            _idx = -1;
                        } else {
                            abp.notify.info(result.msg);
                        }
                    }
                });
            }

            /** help methods **/
            //refresh task table
            function refreshTable() {
                var opt = {
                    url: _url + "?&curQueryType=" + vm.curQueryType,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                _table.bootstrapTable("refresh", opt);
            }


        }
    ]);
})();