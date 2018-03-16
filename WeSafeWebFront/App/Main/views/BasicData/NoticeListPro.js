(function () {
    angular.module('app').controller('app.views.BasicData.NoticeListPro', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.notice',
        function ($scope, $timeout, $uibModal, noticeService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var view = abp.auth.hasPermission('WeSafe.Pages.Notice');
            if (!view) {
                vm.myclass = 'nothasPermission';
            }
            vm.permissions = {
                Notice: abp.auth.hasPermission('WeSafe.Pages.Notice')
            };

            vm.serchinfo = null;

            var _urlGetAll = 'Notice/GetNoticeProByCurUserInfo/isRead=' + vm.haveRead;
            var _urlMarkRead = 'Notice/MarkRead';
            var _urlDelete = 'Notice/Delete';
            var _table = $('#tb_notice');
            var _idx = -1;
            _table.bootstrapTable({
                url: abp.appPath + _urlGetAll,
                method: 'get',
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                //sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                      //初始化加载第一页，默认第一页
                pageSize: Common.PageSize,          //每页的记录行数（*）
                pageList: Common.PageList,          //可供选择的每页的行数（*）
                search: false,                      //是否显示表格搜索
                strictSearch: false,
                showColumns: false,                 //是否显示所有的列
                showRefresh: false,                 //是否显示刷新按钮
                clickToSelect: false,               //是否启用点击选中行
                showToggle: false,                  //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                  //是否显示父子表
                idField: "id",

                onLoadSuccess: function () {
                    $(".look").click(function () {
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        else {
                            look(item);
                        }
                    });
                    $(".edit").click(function () {
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        else {
                            edit(item);
                        }
                    });                  
                    $(".delete").click(function () {
        
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        abp.message.confirm(
                            "删除此通知?",
                            function (result) {
                                if (result) {
                                    $.ajax({
                                        url: abp.appPath + _urlDelete,
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
                        field: 'content',
                        title: '名称',
                        sortable: true
                    },
                    {
                        field: 'creationTime',
                        title: '接收时间',
                        sortable: true,
                        formatter: function (val, row, index) {
                            var date = val.replace(/T/, ' ');
                            return date;
                        }
                    },
                    {
                        field: 'url',
                        title: '操作',
                        formatter: function (val, row, index) {

                            return '<a  href="javascript:void(0)" class="btn btn-sm blue look" val=' + index + '><i class="fa fa-book"></i>查看</a>' +
                                '<a  href="javascript:void(0)" class="btn btn-sm blue edit" val=' + index + '><i class="fa fa-book"></i>编辑</a>' +
                                '<a href="javascript:;" class="btn btn-outline btn-circle btn-sm blue delete" val=' + index + '><i class="fa fa-trash-o"></i>删除</a>';
                        }

                    }]
            });
            /**************************************时间格式化处理************************************/
            vm.search = function (reSearch) {
                var pagenum = $('#tb_notice').bootstrapTable('getOptions').pageNumber;
                var strurl = vm.serchinfo == null ? 'Notice/GetNoticeProByCurUserInfo/' : 'Notice/GetNoticeProByCurUserInfo/?searchinfo=' + vm.serchinfo;
                var opt = reSearch ?
                    {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            pageNumber: pagenum,
                            isRead: vm.haveRead
                        }
                    } : {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            isRead: vm.haveRead
                        }
                    };
                $('#tb_notice').bootstrapTable("refresh", opt);
                if (reSearch) {
                    $('#tb_notice').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null;
                this.search(true);
            };

            vm.haveRead = 0;

            vm.unRead = function () {
                if (vm.haveRead == 1) {
                    vm.haveRead = 0;
                    this.search(true);
                }
            }

            vm.IsRead = function () {
                if (vm.haveRead == 0) {
                    vm.haveRead = 1;
                    this.search(true);
                }
            }
            /******** help methods ********/

            //refresh notice table
            function refreshTable() {
                var opt = {
                    url: abp.appPath + _urlGetAll,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2,
                        isRead: vm.haveRead
                    }
                };
                _table.bootstrapTable("refresh", opt);
            }
            function CheckIsRectify(tbid) {
                noticeService.checkRiskStatus({ Id: tbid }).then(function (result) {
                    if (result.data == "error") {
                        abp.message.error("找不到此条记录！");
                    } else {
                        window.location.href = result.data + "?troubleid=" + tbid;
                    }
                });
            }

            function look(item) {
                if (item.id != "") {
                    window.location.href = "/default.html#!/NoticeDetails?id=" + item.id;
                }
                else if (item.url != "") {
                    window.location.href = item.url;
                }
            }

            function edit(item) {
                if (item.id != "") {
                    window.location.href = "/default.html#!/NoticeDetails?edit=true&id=" + item.id;
                }
            }
        }
    ]);
})();