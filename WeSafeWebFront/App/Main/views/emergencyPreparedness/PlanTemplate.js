(function () {
    var controllerId = 'app.views.PlanTemplate';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.planTemplate', function ($scope, $uibModal, planTemplateService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.serchinfo = null;
            vm.init = function () {
                planTemplateService.getList(vm.serchinfo).then(function (d) {
                    var thisTd = $('#tb_plantemplate');                    
                    thisTd.bootstrapTable({
                        data: d.data,
                        striped: false,                      //是否显示行间隔色
                        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                        pagination: true,                   //是否显示分页（*）
                        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                        pageSize: Common.PageSize,                       //每页的记录行数（*）
                        pageList: Common.PageList,        //可供选择的每页的行数（*）
                        sortable: true,                     //是否启用排序
                        sortOrder: "asc",                   //排序方式
                        idField: "name",
                        detailView: false,                   //是否显示父子表                        
                        onPostBody: function (params) {
                            $(".edit").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                window.location.href = "/default.html#!/WriteTemplate?pid=" + d.name;
                            });
                            $(".del").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                abp.message.confirm(
                                    "删除预案模板'" + d.name + "'?",
                                    function (result) {
                                        if (result) {
                                            vm.delPlan(d.name, function () {
                                                abp.notify.info("删除预案模板: " + d.name + "成功!");
                                                thisTd.bootstrapTable("remove", {
                                                    field: 'name',
                                                    values: [d.name]
                                                });
                                            });
                                        }
                                    });
                            });
                            $(".view").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                window.location.href = "/default.html#!/TemplateDemo?id=" + d.name;
                            });
                            $(".create").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                planTemplateService.createPlanFromTemplate(d.name).then(function (result) {
                                    if (result.data == "True") {
                                        abp.notify.info(app.localize('创建成功'));
                                    }
                                    else if (result.data == "False"){
                                        abp.notify.error("创建失败!无法重复生成该预案!");
                                    }
                                    else {
                                        abp.notify.error("创建失败!" + result.data);
                                    }
                                }); 
                            });
                        },                        
                        columns: [{
                            field: 'name',
                            title: '预案模板名称',
                            width:"40%",
                            align:"center",
                            valign:"middle",
                        }, {
                            field: '',
                            title: '操作',
                            width:"60%",
                            align:"center",
                            valign:"middle",
                            formatter: function (val, row, index) {
                                /* return '<a href="javascript:;" class="btn btn-sm blue edit" val=' + index + '><i class="fa fa-edit"></i>编辑模板</a>' +
                                    '<a href="javascript:;" class="btn btn-sm blue del" val=' + index + '><i class="fa fa-trash-o"></i>删除模板</a>' +
                                    '<a href="javascript:;" class="btn btn-sm blue view" val=' + index + '><i class="fa fa-search"></i>查看预案</a>' +
                                    '<a href="javascript:;" class="btn btn-sm blue create" val=' + index + '><i class="fa fa-plus"></i>生成预案</a>'; */
                                    return '<a style="box-shadow:none;" href="javascript:;" class="btn btn-sm edit" val=' + index + '><i class="iconfont icon-icon6" style="font-size:20px;" title="编辑模板"></i></a>' +
                                    '<a style="box-shadow:none;" href="javascript:;" class="btn btn-sm del" val=' + index + '><i class="iconfont icon-shanchu" style="font-size:20px;" title="删除模板"></i></a>' +
                                    '<a style="box-shadow:none;" href="javascript:;" class="btn btn-sm  view" val=' + index + '><i class="iconfont icon-chakan" style="font-size:20px;" title="查看模板"></i></a>' +
                                    '<a style="box-shadow:none;" href="javascript:;" class="btn btn-sm  create" val=' + index + '><i class="iconfont icon-shengchengmulu" style="font-size:22px;" title="生成预案"></i></a>';
                            
                                }
                        }]
                    });
                });  
            };
            
            vm.search = function () {
                planTemplateService.getList(vm.serchinfo).then(function (d) {
                    var thisTd = $('#tb_plantemplate');
                                       
                    thisTd.bootstrapTable('load', d);
                });  
            }
            
            vm.reset = function () {
                this.serchinfo = null
                this.search();
            };

            function resultSearch() {
                vm.search();
            }

            vm.add = function () {
                //var modalInstance = $uibModal.open({
                //    templateUrl: '/App/Main/views/emergencyPreparedness/addPlanTemplate.cshtml',
                //    controller: 'app.views.emergencyPreparedness.addPlanTemplate as vm',
                //    backdrop: 'static',
                //    size: 'md',
                //    resolve: {
                //        item: function () {
                //            return null;
                //        }
                //    }
                //});

                //modalInstance.result.then(function () {                    
                //    resultSearch();
                //});
                window.location.href = "/default.html#!/WriteTemplate";
            };

            vm.rename = function (d) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/emergencyPreparedness/addPlanTemplate.cshtml',
                    controller: 'app.views.emergencyPreparedness.addPlanTemplate as vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return d;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    resultSearch();
                });
            };

            vm.delPlan = function (folderName, callback) {
                planTemplateService.delTemplateFolder(folderName).then(function (result) {
                    if (result.data == "") {
                        if (callback)
                            callback();
                    }
                    else {
                        abp.notify.error("删除失败!" + result.data);
                    }
                });
            };

            vm.init();
        }
    ]);
})();