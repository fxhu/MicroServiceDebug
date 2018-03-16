(function () {
    var controllerId = 'app.views.PatrolGroup';
    angular.module('app').controller(controllerId, [
        '$scope', 'abp.services.app.alarms', 'abp.services.app.patrol', function ($scope, alarmsService, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var pageindex = getURLParam('pageindex');
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            patrolService.autoCreatGroup({ IsAutoCreat: false });//根据后台是否创建了数据，如果没创建就创建基础分组
            pageindex = pageindex == null ? 1 : pageindex;
            var bsturl =abp.appPath + 'Patrol/GetAllGroup';
            var table = $('#table')
            var IsInit = false;
            InitTable();
            function InitTable() {
                table.bootstrapTable({
                    url: bsturl,//请求后台的URL（*）
                    method: 'get',
                    striped: true,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）
                    sortable: true,                     //是否启用排序
                    //sortOrder: "asc",                   //排序方式
                    silentSort: false,
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: pageindex,                       //初始化加载第一页，默认第一页
                    pageSize: Common.PageSize,                       //每页的记录行数（*）
                    //pageList: Common.PageList,        //可供选择的每页的行数（*）
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
                        $(".edit").click(function () {
                            var idx = $(this).attr("val");
                            var group = table.bootstrapTable('getData')[idx];
                            if (group == null) {
                                return;
                            }
                            var pageindex = table.bootstrapTable('getOptions').pageNumber;
                            window.location.href = "/default.html#!/BuildGroup?backpage=PatrolGroup&pageindex=" + pageindex + "&id=" + group.id + "&action=edit";
                        });
                        $(".delete").click(function () {
                            var idx = $(this).attr("val");
                            var group = table.bootstrapTable('getData')[idx];
                            if (group == null) {
                                return;
                            }
                            abp.message.confirm("是否确定删除此分组？", function (isconfirm) {
                                if (isconfirm) {
                                    patrolService.deleteTypeGroup({ Id: group.id }).then(function () {
                                        abp.notify.info("删除成功");
                                        vm.search(true);
                                    });
                                }
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
                            field: 'typeGroupName',
                            title: '名称',
                            width: '35%',
                            sortable: true
                        },
                        //{
                        //    field: 'AssestTag',
                        //    title: '类型',
                        //    sortable: true
                        //},
                        {
                            field: 'childNames',
                            title: '分组详情',
                            sortable: true,
                            formatter: function (val) {
                                var str = val;
                                if (val.length > 60) {
                                    str = val.substring(0, 60) + "……";
                                }
                                return str;
                            }
                        },
                        {
                            title: '操作',
                            formatter: function (val, row, index) {
                                return '<a  href="javascript:;" class="btn btn-sm blue edit" val=' + index
                                    + '><i class="fa fa-edit"></i>编辑</a>' + '<a  href="javascript:;" class="btn btn-sm blue delete" val=' + index
                                    + '><i class="fa fa-trash-o"></i>删除</a>';
                            }
                        }
                    ]
                });
            }
            vm.autoCreatTypeGroup = function () {
                patrolService.autoCreatTypeGroup({ IsAutoCreat: false }).then(function (result) {
                    var msg = "";
                    if (result.data == "nocreate") {
                        msg = "此功能将按照建筑把设备分类进行统一的分组，自动创建的分组不会影响其他分组，请确定是否创建？";
                    }
                    if (result.data == "created") {
                        msg = "分组已自动创建，请确定是否更新？";
                    }
                    abp.message.confirm(msg, function (isconfirm) {
                        if (isconfirm) {
                            patrolService.autoCreatTypeGroup({ IsAutoCreat: true }).then(function (result) {
                                if (result.data == "success") {
                                    abp.notify.info("创建成功");
                                    vm.search(true);
                                }
                            });
                        }
                    });
                });
            }
            vm.addPath = function () {
                var pageindex = $('#table').bootstrapTable('getOptions').pageNumber;
                window.location.href = "/default.html#!/BuildGroup?backpage=PatrolGroup&pageindex=" + pageindex + "&action=add";
            }

            vm.search = function (reSerch, areaid) {
                var pagenum = table.bootstrapTable('getOptions').pageNumber;
                var strurl = 'Patrol/GetAllGroup';
                strurl = strurl + "?searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
                var opt = reSerch ?
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
                table.bootstrapTable("refresh", opt);
                if (reSerch) {
                    table.bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null;
                this.search(true);
            };
            //--------------------------------------------------------------------------//
            var nowAreaId = null;
            sercharea = function (areaid) {
                nowAreaId = areaid;
                if (!IsInit) {
                    bsturl =abp.appPath + 'Patrol/GetAllGroup?areaid=' + JSON.stringify(areaid);
                    InitTable();
                    IsInit = true;
                } else {
                    vm.search(false, areaid);
                }
            }
            var areadata = [];
            var idsOfMax = [],
                maxParentId = 0,
                maxtype = 0;
            //加载楼栋下拉框
            function LoadAreas() {
                alarmsService.getAllArea().then(function (result) {
                    var data = result.data.items;
                    //if (GetUrlParam("BuildingId") == "") {
                    //定位到第一个
                    areadata = data;
                    $.each(data, function () {
                        if (this.areaType > maxtype) {
                            maxtype = this.areaType;
                            maxParentId = this.parentId;
                        }
                    });
                    $.each(data, function () {
                        if (this.areaType == maxtype) {
                            idsOfMax.push(this.id);
                        }
                    });
                    vm.LoadArea(null, maxtype, null);
                });
            }


            //------------------------------------------------//
            vm.NowTableData = [];
            vm.areas = [];
            vm.LoadArea = function (parentId, level, fromclick) {
                //修改按钮的文本
                if (fromclick) {
                    $(event.srcElement).parents("ul").prev().html($(event.srcElement).text() + ' <span class="caret"></span>')
                }
                //加载下拉内容
                SearchAreas(1, parentId, function (result) {
                    var data = result;
                    //把子级下拉框干掉
                    if (vm.areas != null && vm.areas[maxtype - level] != null) {
                        vm.areas.splice(maxtype - level, level);
                    }
                    //有子级，加载子级
                    if (data.length > 0) {
                        vm.NowTableData = data;
                        RenderAreaDropDown(data, level);
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        SearchAreas(2, parentId, function (result) {
                            vm.NowTableData = data;
                        });
                    }
                    sercharea(parentId == null ? idsOfMax : [parentId]);
                });
            }
            function SearchAreas(which, id, callback) {
                if (id == null && maxtype != 4) id = maxParentId;
                var result = [];
                if (which == 1) {
                    $.each(areadata, function () {
                        if (this.parentId == id) {
                            result.push(this);
                        }
                    });
                } else if (which == 2) {
                    $.each(areadata, function () {
                        if (this.id == id) {
                            result.push(this);
                        }
                    });
                } else {
                    $.each(areadata, function () {
                        if (this.parentId == null) {
                            result.push(this);
                        }
                    });
                }
                if (callback != null && typeof (callback) == "function") {
                    callback(result);
                }
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
                info[index].pid = level == maxtype ? null : data[0].parentId;
                info[index].levelName = GetAreaTypeName(level);
                info[index].level = level;
                vm.areas = info;
            }
            LoadAreas();
        }
    ]);
})();