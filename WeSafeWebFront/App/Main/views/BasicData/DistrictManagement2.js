(function () {
    appModule.controller('app.views.DistrictManagement2', [
        '$scope', '$uibModal', '$timeout', '$http', 'abp.services.app.officeAreaCharge', 'abp.services.app.organizationUnit', 'abp.services.app.commonLookup', 'lookupModal',
        function ($scope, $uibModal, $timeout, $http, officeAreaChargeService, organizationUnitService, commonLookupService, lookupModal) {
            var vm = this;
            vm.myclass = 'hasPermission';
            window.DistrictManagement=vm;
            var nowid = null;
            vm.serchinfo = null;

            vm.search = function (reSerch) {
                var searchdata = [];
                if (vm.serchinfo == null) {
                    searchdata = vm.NowTableData;
                    return;
                }
                $.each(vm.NowTableData, function () {
                    if (this.displayName.indexOf(vm.serchinfo) != -1 || this.shortName.indexOf(vm.serchinfo) != -1
                        || this.areTypeStr.indexOf(vm.serchinfo) != -1 || this.organizationName.indexOf(vm.serchinfo) != -1) {
                        searchdata.push(this);
                    }
                });
                RenderTable(searchdata);
            }
            vm.reset = function () {
                vm.serchinfo = null;
                vm.LoadArea("", 4);
            };
            //------------------------------------------------//
            vm.NowTableData = [];
            vm.areas = [];
            var maxtype = -1;
            vm.LoadArea = function (parentId, level, fromclick, btnname) {
                if (!parentId) { parentId = ""; }
                //修改按钮的文本
                if (fromclick) {
                    $('#lv_' + (level + 1)).html(btnname + ' <span class="caret"></span>')
                }
                //加载下拉内容
                $http({ method: 'GET', url: abp.appPath +"FireMan/GetAllKeyOfficeArea?ParentId=" + parentId }).then(function (result) {
                    var data = result.data;
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
                        $http({ method: 'GET', url: abp.appPath +"FireMan/GetAllKeyOfficeArea?Id=" + parentId }).then(function (result) {
                            vm.NowTableData = result.data;
                            RenderTable(result.data);
                        });
                    }
                });
            }
            vm.addpark = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/main/views/BasicData/creatOrEditDistrictModal.html',
                    controller: 'app.views.BasicData.creatOrEditDistrictModal as vm',
                    backdrop: 'static',
                    resolve: {
                        area: function () {
                            return { parentId: null, organizationUnitId: null };
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    vm.LoadArea("", 4);
                });
            }
            vm.VisualSet=function(){
                window.open("/datavisual/AreaVisual.html");
            }
            //事件绑定
            function BindEvent(){
                $(".nameclick").click(function () {
                    var idx = $(this).attr("val");
                    var area = $("#tb_data").bootstrapTable('getData')[idx];
                    if (area == null) {
                        return;
                    };
                    vm.LoadArea(area.id, area.areaType - 1, true, area.displayName);
                });
                $(".addeara").click(function () {
                    var idx = $(this).attr("val");
                    var area = $("#tb_data").bootstrapTable('getData')[idx];
                    if (area == null) {
                        return;
                    };
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/main/views/BasicData/creatOrEditDistrictModal.html',
                        controller: 'app.views.BasicData.creatOrEditDistrictModal as vm',
                        backdrop: 'static',
                        resolve: {
                            area: function () {
                                return { parentId: area.id, organizationUnitId: area.organizationId };
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {

                    });
                });
                $(".eidtarea").click(function () {
                    var idx = $(this).attr("val");
                    var area = $("#tb_data").bootstrapTable('getData')[idx];
                    if (area == null) {
                        return;
                    };
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/main/views/BasicData/creatOrEditDistrictModal.html',
                        controller: 'app.views.BasicData.creatOrEditDistrictModal as vm',
                        backdrop: 'static',
                        resolve: {
                            area: function () {
                                return {
                                    id: area.id,
                                    displayName: area.displayName, organizationUnitId: area.organizationId
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        var data = result;
                        area.areaType = data.areaType;
                        area.displayName = data.displayName;
                        area.level = data.level;
                        area.organizationName = data.organizationName;
                        area.organizationId = data.organizationUnitId;
                        area.shortName = data.shortName;
                        RenderTable(vm.NowTableData);

                    });
                });
                $(".deletearea").click(function () {
                    var idx = $(this).attr("val");
                    var area = $("#tb_data").bootstrapTable('getData')[idx];
                    if (area == null) {
                        return;
                    };
                    abp.message.confirm("是否确定删除当前场所及其所有子级场所？", function (isConfirmed) {
                        if (isConfirmed) {
                            //删除
                            officeAreaChargeService.deleteOfficeArea({ Id: area.id }).then(function () {
                                for (var i = 0; i < vm.NowTableData.length; i++) {//删除内存中的数据
                                    if (vm.NowTableData[i].id == area.id) {
                                        vm.NowTableData.splice(i, 1);
                                        break;
                                    }
                                }
                                //删除列表中的数据
                                for (var i = 0; i < vm.areas.length; i++) {
                                    var isfind = 0;
                                    for (var j = 0; j < vm.areas[i].childAreas.length; j++) {
                                        if (vm.areas[i].childAreas[j].id == area.id) {
                                            isfind = 1;
                                            vm.areas[i].childAreas.splice(j, 1);
                                            break;
                                        }
                                    }
                                    if (isfind == 1) break;
                                }
                                RenderTable(vm.NowTableData);
                                abp.notify.info("删除成功");
                            });
                        }
                    })
                });
                $(".addplan").click(function () {
                    var idx = $(this).attr("val");
                    var area = $("#tb_data").bootstrapTable('getData')[idx];
                    if (area == null) {
                        return;
                    };
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/main/views/BasicData/EditAreaPlan.html',
                        controller: 'app.views.BasicData.editAreaPlan as vm',
                        backdrop: 'static',
                        resolve: {
                            area: function () {
                                return {
                                    id: area.id,
                                    displayName: area.displayName, organizationUnitId: area.organizationId
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        
                    });
                });
            }
            //加载列表注册事件
            function RenderTable(data) {
                $('#tb_data').bootstrapTable("load", data);
                setTimeout(function () {
                    BindEvent();
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
                    info[index].childAreas[i].id = data[i].id;
                    info[index].childAreas[i].nextlevel = level - 1;
                    info[index].childAreas[i].displayName = data[i].displayName;
                }
                info[index].pid = data[0].parentId;
                info[index].levelName = GetAreaTypeName(level);
                info[index].level = level;
                vm.areas = info;
            }
            function BuildButtons(row,index){
                var areaTypeName = (row.areaType==4?"建筑":(row.areaType==3?"楼层":"科室"));
                var html=[];
                /* if (row.areaType <= 1) {
                    html.push('<a href="javascript:;" class=" eidtarea" val=' + index + '><i class="iconfont icon-icon6"></i>编辑</a>');
                    html.push('<a href="javascript:;" class=" deletearea"  val=' + index + '><i class="iconfont icon-shanchu"></i>删除</a>');
                } 
                else {
                    html.push('<a href="javascript:;" class="addeara" val=' + index + '><i class="iconfont icon-tianjia"></i>添加' + areaTypeName + '</a>');
                    html.push('<a href="javascript:;" class="eidtarea" val=' + index + '><i class="iconfont icon-icon6"></i>编辑</a>');
                    html.push('<a href="javascript:;" class=" deletearea"  val=' + index + '><i class="iconfont icon-shanchu""></i>删除</a>');
                }
                html.push('<a href="javascript:;" class=" addplan"  val=' + index + '><i class="iconfont tianjia"></i>添加预案</a>'); */
                if (row.areaType <= 1) {
                    html.push('<a href="javascript:;" class=" eidtarea" val=' + index + '><i class="iconfont icon-icon6"></i></a>');
                    html.push('<a href="javascript:;" class=" deletearea"  val=' + index + '><i class="iconfont icon-shanchu"></i></a>');
                } 
                else {
                    html.push('<a href="javascript:;" class="addeara" val=' + index + '><i class="iconfont icon-tianjia"></i></a>');
                    html.push('<a href="javascript:;" class="eidtarea" val=' + index + '><i class="iconfont icon-icon6"></i></a>');
                    html.push('<a href="javascript:;" class=" deletearea"  val=' + index + '><i class="iconfont icon-shanchu""></i></a>');
                }
                html.push('<a href="javascript:;" class=" addplan"  val=' + index + '><i class="iconfont tianjia"></i></a>');
                return html.join("");
            }
            vm.openEditModal = function (editUrl,width,height) {
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
                    if (width) {
                        $(".modal-dialog").css("width", width);
                    }
                    if (height) {
                        $(".modal-body").css("height", height);
                    }
                });
                modalInstance.result.then(function (result) {
                    
                }, function () { });
            }
            $timeout(function () {
                vm.LoadArea("", 4);
            });
            //------------------------------------------------//
            $('#tb_data').bootstrapTable({
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
                    BindEvent();
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
                        field: 'displayName',
                        title: '场所名称',
                        align: 'center',
                        valign: "middle",
                        width: '20%',
                        formatter: function (val, row, index) {
                            return '<a href="javascript:void(0)" val="' + index + '",true)" class="nameclick">' + row.displayName + '</a>';
                        }
                    }, {
                        field: 'shortName',
                        title: '简称',
                        align: 'center',
                        valign: "middle",
                        width: '20%'
                    }, {
                        field: 'areTypeStr',
                        title: '区域类型',
                        align: 'center',
                        valign: "middle",
                        width: '20%'
                    },
                    {
                        field: 'organizationName',
                        title: '组织机构',
                        align: 'center',
                        valign: "middle",
                        width: '20%'
                    }, {
                        title: '操作',
                        align: 'center',
                        valign: "middle",
                        width: '20%',
                        formatter: function (val, row, index) {
                           return BuildButtons(row,index);
                        }
                    }]
            });
        }
    ]);
})();