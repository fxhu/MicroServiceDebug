(function () {
    var controllerId = 'app.views.preplanmanagement';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.plan', function ($scope, $timeout, $uibModal, planService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var plan_srvUrl = abp.appPath + "UEditorHandler/GetPlanTemplatePageList";

            var thisTd = $('#tb_plan');

            vm.serchinfo = null;

            vm.rename = function (d) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/emergencyPreparedness/addPlan.html',
                    controller: 'app.views.emergencyPreparedness.addPlan as vm',
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
            vm.del = function (id, callback) {
                planService.delPlan(id).then(function (result) {
                    if (callback)
                        callback();
                });
            };

            vm.search = function (reSerch) {
                var pagenum = thisTd.bootstrapTable('getOptions').pageNumber;
                var strurl = plan_srvUrl;
                if (vm.serchinfo != null && vm.serchinfo != "") {
                    strurl += "?s=" + vm.serchinfo;                    
                }
                if (vm.thisType != undefined) {
                    if (vm.serchinfo != null && vm.serchinfo != "") {
                        strurl += "&t=" + vm.thisType;
                    }
                    else strurl += "?t=" + vm.thisType;
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
                thisTd.bootstrapTable("refresh", opt);
                if (reSerch) {
                    thisTd.bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null
                this.search(true);
            };

            function resultSearch() {
                vm.search(true);
            }

            vm.add = function () {
                //var modalInstance = $uibModal.open({
                //    templateUrl: '/App/Main/views/emergencyPreparedness/addPlan.cshtml',
                //    controller: 'app.views.emergencyPreparedness.addPlan as vm',
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

                window.location.hash = "#!/WriteThePlan";
            };

            vm.types = [];

            vm.searchType = function (idx) {
                vm.thisType = idx;
                vm.search(false);
            };

            vm.init = function () {
                $.getJSON("/Plan/PlanType.json", function (types) {
                    vm.types = types;                    
                    $timeout(function () {
                        $scope.list = types;
                    });                    
                    thisTd.bootstrapTable({
                        url: plan_srvUrl,//请求后台的URL（*）
                        method: 'get',
                        striped: false,                      //是否显示行间隔色
                        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                        pagination: true,                   //是否显示分页（*）
                        sortable: true,                     //是否启用排序
                        sortOrder: "asc",                   //排序方式                
                        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                        pageSize: Common.PageSize,                       //每页的记录行数（*）
                        pageList: Common.PageList,        //可供选择的每页的行数（*）
                        search: false,                       //是否显示表格搜索
                        strictSearch: false,
                        showColumns: false,                  //是否显示所有的列
                        showRefresh: false,                  //是否显示刷新按钮
                        clickToSelect: false,                //是否启用点击选中行
                        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                        cardView: false,                    //是否显示详细视图
                        idField: "id",
                        detailView: false,                   //是否显示父子表
                        
                        

                        onLoadSuccess: function (data) {
                            $(".edit").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                window.location.hash = "#!/WriteThePlan?id=" + d.id;
                            });                            
                            $(".del").click(function () {
                                var idx = $(this).attr("val");
                                var d = thisTd.bootstrapTable('getData')[idx];
                                if (d == null) {
                                    return;
                                }
                                abp.message.confirm(
                                    "删除预案'" + d.planName + "'?",
                                    function (result) {
                                        if (result) {
                                            vm.del(d.id, function () {
                                                abp.notify.info("删除预案: " + d.planName + "成功!");
                                                vm.search(true);
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
                                window.location.hash = "#!/PlansDemo?id=" + d.id;
                            });
                        },
                        columns: [{
                            field: 'planName',
                            title: '预案名称',
                            align:"center",
                            width:"20%",
                        }, {
                            field: 'planTypeID',
                            title: '预案类型',
                            align:"center",
                            width:"20%",
                            valign: "middle",
                            formatter: function (val, row, index) {
                                var typeName = "-";
                                $.each(vm.types, function (idx, t) {
                                    if (t.id == val) {
                                        typeName = t.name;
                                        return;
                                    }
                                });
                                return typeName;
                            }
                        }, {
                            field: 'createUserName',
                            title: '创建人',
                            align:"center",
                            width:"20%",
                        }, {
                            field: 'creationTimeStr',
                            title: '创建时间',
                            align:"center",
                            width:"20%",
                        }, {
                            field: '',
                            title: '操作',
                            align:"center",
                            width:"20%",
                            
                            formatter: function (val, row, index) {
                                return '<a href="javascript:;" style="box-shadow:none" class="btn btn-sm  edit" val=' + index + '><i class="iconfont icon-icon6" style="font-size:20px" title="编辑预案"></i></a>' +
                                    '<a href="javascript:;" style="box-shadow:none" class="btn btn-sm  del" val=' + index + '><i class="iconfont icon-shanchu" style="font-size:20px" title="删除预案"></i></a>' +
                                    '<a href="javascript:;" style="box-shadow:none" class="btn btn-sm  view" val=' + index + '><i style="font-size:20px" class="iconfont icon-chakan" title="查看预案"></i></a>';
                            }
                        }]
                    });
                }) 
            };

            vm.init();
        }
    ]);
})();