(function () {
    var controllerId = 'app.views.HiddenTroubleReport';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', function ($scope, $uibModal) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.serchinfo = null;
            $('#tb_goods').bootstrapTable({
                url: '/HiddenTrouble/GetAllTroubles',//请求后台的URL（*）
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
                onLoadSuccess: function () {
                    $(".check").click(function () {
                        var idx = $(this).attr("val");
                        var tb = $("#tb_goods").bootstrapTable('getData')[idx];
                        if (tb == null) {
                            return;
                        }
                        var modalInstance = $uibModal.open({
                            templateUrl: '/App/Main/views/hiddenDangerManagement/AddOrLookHiddenTrouble.cshtml',
                            controller: 'app.views.hiddenTrouble.addOrLookHiddenTrouble as vm',
                            backdrop: 'static',
                            size: 'md',
                            resolve: {
                                item: function () {
                                    return tb;
                                }
                            }
                        });

                        //modalInstance.rendered.then(function () {
                        //    $timeout(function () {
                        //        $.AdminBSB.input.activate();
                        //    }, 0);
                        //});

                        modalInstance.result.then(function () {
                            
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
                        field: 'hiddenTroubleContent',
                        title: '隐患描述'
                    }, {
                        field: 'areaName',
                        title: '隐患场所'
                    }, {
                        field: 'hiddenTroubleFindTimeStr',
                        title: '隐患发现时间'
                    }, {
                        field: 'rectifyEndTimeStr',
                        title: '整改期限'
                    }, {
                        field: 'hiddenTroubleType',
                        title: '隐患级别',
                        formatter: function (val) {
                            if (val==0) {
                                return "<label  style=\"padding-bottom:0px\">一般隐患</label>";
                            }
                            else {
                                return "<label  style=\"padding-bottom:0px\">重大隐患</label>";
                            }
                        }
                    }, {
                        field: 'hiddenTroubleStatus',
                        title: '隐患状态',
                        formatter: function (val) {
                            //if (val==0) {
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
                            }
                        }
                    }, {
                        title: '操作',
                        formatter: function (val, row, index) {
                            return '<a  href="javascript:;" class="btn btn-outline btn-circle btn-sm purple check" val=' + index
                                + '><i class="fa fa-book"></i>查看</a>';
                        }
                    }]
            });
            vm.addtb = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/hiddenDangerManagement/AddOrLookHiddenTrouble.cshtml',
                    controller: 'app.views.hiddenTrouble.addOrLookHiddenTrouble as vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return "add";
                        }
                    }
                });

                //modalInstance.rendered.then(function () {
                //    $timeout(function () {
                //        $.AdminBSB.input.activate();
                //    }, 0);
                //});

                modalInstance.result.then(function () {
                    vm.serch();
                });
            };
            vm.serch = function () {
                var strurl = vm.serchinfo == null ? 'HiddenTrouble/GetAllTroubles/' : 'HiddenTrouble/GetAllTroubles/' + vm.serchinfo;
                var opt = {
                    url:abp.appPath+ strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                $('#tb_goods').bootstrapTable("refresh", opt);

            }
            //*************************尾部*********************************************//
        }
    ]);
})();