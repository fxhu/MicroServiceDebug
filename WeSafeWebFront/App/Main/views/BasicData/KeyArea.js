(function () {
    var firemodel = angular.module('app');
    firemodel.controller('app.views.BasicData.KeyArea', [
        '$scope', '$timeout', '$uibModal', '$http', 'abp.services.app.officeAreaCharge',
        function ($scope, $timeout, $uibModal, $http, officeAreaChargeService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var nowid = null;
            vm.serchinfo = null;


            vm.search = function (reSerch) {
                //var pagenum = $('#tb_data').bootstrapTable('getOptions').pageNumber;
                //var strurl = vm.serchinfo == null ? '/FireMan/GetAllOfficeArea/' : '/FireMan/GetAllOfficeArea/' + vm.serchinfo;
                //var opt = reSerch ?
                //    {
                //        url:abp.appPath+ strurl,
                //        silent: true,
                //        query: {
                //            type: 1,
                //            level: 2,
                //            pageNumber: pagenum
                //        }
                //    } : {
                //        url:abp.appPath+ strurl,
                //        silent: true,
                //        query: {
                //            type: 1,
                //            level: 2
                //        }
                //    };
                //$('#tb_data').bootstrapTable("refresh", opt);
                //if (reSerch) {
                //    $('#tb_data').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                //}
                var searchdata = [];
                if (vm.serchinfo == null) {
                    searchdata = vm.NowTableData;
                    return;
                }
                $.each(vm.NowTableData, function () {

                    if (this.DisplayName.indexOf(vm.serchinfo) != -1 || this.ShortName.indexOf(vm.serchinfo) != -1
                        || this.AreTypeStr.indexOf(vm.serchinfo) != -1 || this.UserName.indexOf(vm.serchinfo) != -1) {
                        searchdata.push(this);
                    }
                });
                RenderTable(searchdata);
            }


            vm.reset = function () {
                vm.serchinfo = null
                //this.search(true);
                vm.LoadArea("", 4);
            };
            //------------------------------------------------//
            vm.NowTableData = [];
            var maxtype = -1;
            vm.LoadArea = function (parentId, level, fromclick, btnname) {
                vm.serchinfo = null;
                if (!parentId) { parentId = ""; }
                //修改按钮的文本
                if (fromclick) {
                    $('#lv_' + (level + 1)).html(btnname + ' <i class="fa fa-angle-down"></i>')
                }
                //加载下拉内容
                $http({ method: 'GET', url: abp.appPath +"FireMan/GetAllKeyOfficeArea?ParentId=" + parentId }).then(function (result) {
                    var data = result.data;
                    console.log(77777777777777777777777777);
                    console.log(data);
                    if (maxtype == -1) {
                        $.each(data, function () {
                            if (this.areaType > maxtype) maxtype = this.areaType;
                        });
                        level = maxtype;
                    }
                    //把子级下拉框干掉
                    if (vm.areas != null && vm.areas[maxtype - level] != null) {
                        vm.areas.splice(maxtype - level, level);
                    }


                    //有子级，加载子级
                    if (data.length > 0) {
                        vm.NowTableData = data;
                        RenderAreaDropDown(data, level);
                        RenderTable(data);
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        $http({ method: 'GET', url: abp.appPath+"FireMan/GetAllKeyOfficeArea?Id=" + parentId }).then(function (result) {
                            console.log('keykeykeykeykeykeykeykeykeykeykeykey');
                            console.log(result.data);
                            vm.NowTableData = result.data;
                            RenderTable(result.data);
                        });
                    }
                });
            }
            //加载列表
            function RenderTable(data) {
                //$('#tb_data').bootstrapTable("destroy");
                $('#tb_data').bootstrapTable("load", data);
                setTimeout(function () {
                    $(".nameclick").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        vm.LoadArea(area.id, area.areaType - 1, true, area.displayName);
                    });
                    $(".unkey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        area.level = 0;
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 0 }).then(function () {
                            RenderTable(data);
                        });
                    });
                    $(".firekey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        area.level = 5;
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 5 }).then(function () {
                            RenderTable(data);
                        });
                    });
                }, 100);
            }
            function GetAreaTypeName(typeId) {
                switch (parseInt(typeId, 10)) {
                    case 4: { return "全部园区"; }
                    case 3: { return "全部建筑"; }
                    case 2: { return "全部楼层"; }
                    case 1: { return "全部科室"; }
                    default: { return ""; }
                }
            }

            function RenderAreaDropDown(data, level, showClear) {
                var info = vm.areas;
                var index = maxtype - level;
                if (info[index] == null) {
                    var areainfo = { level: 0, levelName: '', pid: 0, childAreas: [], btnName: '' };
                    info.push(areainfo);
                }
                info[index].btnName = GetAreaTypeName(level);
                for (var i = 0; i < data.length; i++) {
                    var careainfo = { id: 0, nextlevel: 0, displayName: '' };
                    info[index].childAreas.push(careainfo);
                    info[index].childAreas[i].id = data[i].Id;
                    info[index].childAreas[i].nextlevel = level - 1;
                    info[index].childAreas[i].displayName = data[i].displayName;

                }
                info[index].pid = data[0].parentId;
                info[index].levelName = GetAreaTypeName(level);
                info[index].level = level;
                vm.areas = info;
            }
            vm.areas = [];
            $timeout(function () {
                //var areainfo = { level: 0, levelName: '', pid: 0, childAreas: [], btnName: '' };
                //vm.areas.push(areainfo);
                vm.LoadArea("", 4);
            });

            //------------------------------------------------//
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
                idField: "id",
                onPageChange: function () {
                    $(".nameclick").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        vm.LoadArea(area.id, area.areaType - 1, true, area.displayName);
                    });
                    $(".unkey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        area.level = 0;
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 0 }).then(function () {
                            RenderTable(vm.NowTableData);
                        });
                    });
                    $(".firekey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        area.level = 5;
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 5 }).then(function () {
                            RenderTable(vm.NowTableData);
                        });
                    });
                },
                onLoadSuccess: function () {
                    $(".unkey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 0 }).then(function () {
                            vm.search(true);
                        });
                    });
                    $(".firekey").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_data").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        };
                        officeAreaChargeService.updateKeyArea({ Id: area.id, Level: 5 }).then(function () {
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
                        field: 'displayName',
                        title: '场所名称',
                        formatter: function (val, row, index) {
                            return '<a href="javascript:void(0)" val="' + index + '",true)" class="nameclick">' + row.displayName + '</a>';
                        }
                    }, {
                        field: 'shortName',
                        title: '简称'
                    }, {
                        field: 'areTypeStr',
                        title: '区域类型'
                    },
                    //{
                    //    field: 'Level',
                    //    title: '区域等级'
                    //},
                    {
                        field: 'userName',
                        title: '安全负责人'
                    }, {
                        title: '操作',
                        formatter: function (val, row, index) {
                            if (row.level == 5) {
                                /*return '<a href="javascript:;" style="border: none;box-shadow: none" class="btn  btn-sm unkey"  val=' + index + '><img src="/assets/images/Inspection_tasks/house.png" alt="" title="取消指定"></a>';*/
                                return '<a href="javascript:;" style="border: none;box-shadow: none" class="btn  btn-sm unkey"  val=' + index + '><img src="/assets/images/Inspection_tasks/disable.png" alt="" title="取消指定"></a>';
                            }
                            else {
                                /*return '<a href="javascript:;" class="btn btn-sm blue firekey" val=' + index + '><i class="fa fa-circle"></i>指定为重点场所</a>';*/
                                /*return '<a href="javascript:;" style="border: none;box-shadow: none" class="btn btn-sm firekey" val=' + index + '><img src="/assets/images/Inspection_tasks/specified.png" alt="" title="指定为重点场所"></a>';*/
                                return '<a href="javascript:;" style="border: none;box-shadow: none" class="btn btn-sm firekey" val=' + index + '><img src="/assets/images/Inspection_tasks/enable.png" alt="" title="指定为重点场所"></a>';
                            }
                        }
                    }]
            });
        }
    ]);
})();