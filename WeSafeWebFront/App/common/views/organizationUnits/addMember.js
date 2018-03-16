(function () {
    /* This is a generic modal that can be used to select an entity.
     * It can work with a remote service method that gets
     * PagedAndFilteredInputDto as input and returns PagedResultDto<NameValueDto> as output.
     * Example: CommonLookupAppService.FindUsers
     */
    appModule.controller('common.views.organizationUnits.addMember', [
        '$scope', '$q', 'abp.services.app.organizationUnit', 'abp.services.app.commonLookup',
        function ($scope, $q, organizationUnitService, commonLookupService) {
            var vm = this;
            vm.title = "选择一个用户";
            vm.maxResultCount = 999;

            vm.loading = false;
            vm.OuId = getURLParam('selectOuId');

            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;
            }

            var backpage = getURLParam('backpage');


            vm.cancel = function () {
                if (backpage != null)
                    window.location.href = "/default.html#!/" + backpage;
            };

            vm.refreshGrid = function () {
                var prms = angular.extend({
                    skipCount: 0,
                    maxResultCount: app.consts.grid.defaultPageSize,
                    filter: ''
                }, '');

                //vm.loading = true;
                //vm.serviceMethod(prms).then(function (result) {
                //    //vm.gridOptions.totalItems = result.data.totalCount;
                //    //vm.gridOptions.data = result.data.items;
                //    var treeData = _.map(result.data.items, function (item) {
                //        return {
                //            Name: item.name,
                //            value: item.value
                //        };
                //    });
                //    RenderTable(treeData);
                //}).finally(function () {
                //    vm.loading = false;
                //});
                vm.loading = true;
                commonLookupService.findUsers({ filter: vm.filterText, MaxResultCount: vm.maxResultCount })
                    .then(function (result) {
                        var treeData = _.map(result.data.items, function (item) {
                            return {
                                Name: item.name,
                                value: item.value
                            };
                        });
                        RenderTable(treeData);
                    }).finally(function () {
                        vm.loading = false;
                    });

            }

            $('#tb_data').bootstrapTable({
                //url: '/FireMan/GetAllOfficeArea/',//请求后台的URL（*）
                //method: 'get',
                data: [],
                striped: false,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "asc",                   //排序方式                
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
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
                idField: "value",
                onPageChange: function () {
                    $(".addeara").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        return $q(function (resolve, reject) {
                            organizationUnitService.isInOrganizationUnit({
                                userId: area.value,
                                organizationUnitId: vm.OuId
                            }).then(function (result) {
                                if (result.data) {
                                    abp.message.warn(app.localize('用户已存在'));
                                }
                                else {
                                    organizationUnitService.addUserToOrganizationUnit({
                                        organizationUnitId: vm.OuId,
                                        userId: area.value
                                    }).then(function () {
                                        abp.notify.success(app.localize('成功添加'));
                                    });
                                }
                                resolve(!result.data);
                            }).catch(function () {
                                reject();
                            });
                        });
                    });
                },
                onLoadSuccess: function () {
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
                    {
                        field: 'Name',
                        width: '35%',
                        title: '名称'
                    },
                    {
                        field: 'value',
                        width: '35%',
                        title: '编号',
                        visible: false
                    },
                    {
                        title: '操作',
                        width: '30%',
                        formatter: function (val, row, index) {
                            var str = '';
                            return '<a href="javascript:;" class="btn btn-outline btn-circle btn-sm blue addeara" val=' + index + '><i class="fa fa-plus"></i>添加' + str + '</a>';
                        }
                    }]
            });


            vm.LoadArea = function () {
                //commonLookupService.findUsers({ tenantId:"1" }, vm.requestParams)
                commonLookupService.findUsers({ MaxResultCount: vm.maxResultCount })
                    .then(function (result) {
                        var treeData = _.map(result.data.items, function (item) {
                            return {
                                Name: item.name,
                                value: item.value
                            };
                        });
                        RenderTable(treeData);
                    });
            }

            //加载列表注册事件
            function RenderTable(data) {
                $('#tb_data').bootstrapTable("load", data);
                setTimeout(function () {
                    $(".addeara").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        return $q(function (resolve, reject) {
                            organizationUnitService.isInOrganizationUnit({
                                userId: area.value,
                                organizationUnitId: vm.OuId
                            }).then(function (result) {
                                if (result.data) {
                                    abp.message.warn(app.localize('用户已存在'));
                                }
                                else {
                                    organizationUnitService.addUserToOrganizationUnit({
                                        organizationUnitId: vm.OuId,
                                        userId: area.value
                                    }).then(function () {
                                        abp.notify.success(app.localize('成功添加'));
                                    });
                                }
                                resolve(!result.data);
                            }).catch(function () {
                                reject();
                            });
                        });
                    });
                }, 100);
            }

            vm.LoadArea();
        }
    ]);

})();