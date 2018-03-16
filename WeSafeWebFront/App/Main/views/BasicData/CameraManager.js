(function () {
    var controllerId = 'app.views.camera.CameraManager';
    angular.module('app').controller(controllerId, [
        '$scope', '$sce', '$uibModal', '$timeout', '$http', function ($scope, $sce, $uibModal, $timeout, $http) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var pageindex = getURLParam('pageindex');

            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            pageindex = pageindex == null ? 1 : parseInt(pageindex);
            vm.serchinfo = null;
            vm.cameraAdress = '';

            vm.NowTableData = [];
            vm.areas = [];
            var maxtype = -1;

            vm.assetip = "-1";

            vm.search = function () {
                var strurl = 'Camera/GetAllCamera/';
                strurl = strurl + "?&assetip=" + vm.assetip + "&searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
                var opt = {
                    url:abp.appPath+ strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                $('#areaTable').bootstrapTable("refresh", opt);

            }
            vm.reset = function () {
                vm.serchinfo = null;
                vm.LoadArea("", 4);
            };

            vm.LoadArea = function (parentId, level, fromclick, btnname, selectedarea) {
                vm.assetip = parentId;
                if (!parentId) { parentId = ""; }
                //修改按钮的文本
                if (fromclick) {
                    $('#lv_' + (level + 1)).html(btnname + ' <span class="caret"></span>')
                }
                
                //加载下拉内容
                $http({ method: 'GET', url: abp.appPath + "FireMan/GetAllKeyOfficeArea?ParentId=" + parentId }).then(function (result) {
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
                        RenderTable(data, level);
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        $http({ method: 'GET', url: abp.appPath + "FireMan/GetAllKeyOfficeArea?Id=" + parentId }).then(function (result) {
                            vm.NowTableData = result.data;
                            RenderTable(result.data,level);
                        });
                    }

                    
                });

                
            }

            //加载列表注册事件
            function RenderTable(data,level) {
                var strurl = 'Camera/GetAllCamera/';
                strurl = strurl + "?&assetip=" + vm.assetip + "&searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
                var opt = {
                    url:abp.appPath+ strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                var obj = $('#areaTable').bootstrapTable("refresh", opt);
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

            vm.addCamera = function () {
                var pageindex = $('#areaTable').bootstrapTable('getOptions').pageNumber;
                window.location.href = "/default.html#!/EditCamera?backpage=CameraManager" + "&pageindex=" + pageindex;
            };

            $timeout(function () {
                vm.LoadArea("", 4);
            });

            $('#areaTable').bootstrapTable({
                url: abp.appPath+'Camera/GetAllCamera?&assetip=-1',//请求后台的URL（*）
                method: 'get',
                data: [],
                striped: false,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: pageindex,                       //初始化加载第一页，默认第一页
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
                        var tb = $("#areaTable").bootstrapTable('getData')[idx];
                        if (tb == null) {
                            return;
                        }
                        if (tb.clientStreamType == 0) {
                            var url = tb.clientStreamType == 0 ? '/App/main/views/BasicData/ModalWarpper.html' : '/App/main/views/BasicData/ShowVideoWithPlugin.html'
                            var ctrl = tb.clientStreamType == 0 ? 'app.views.BasicData.ModalWarpper as vm' : 'app.views.BasicData.ShowVideoWithPlugin as vm';
                            var editUrl = tb.clientStreamType == 0 ? 'DataVisual/Video.html?Address=' + tb.serverAdress : tb.serverAdress;
                            var modalInstance = $uibModal.open({
                                templateUrl: url,
                                controller: ctrl,
                                backdrop: true,
                                size: "lg",
                                resolve:
                                {
                                    editSource: function () { return editUrl }
                                }
                            });
                            modalInstance.rendered.then(function () {
                                if (tb.clientStreamType == 0) {
                                    $(".modal-dialog").css("width", "665px");
                                    $(".modal-body").css("height", "510px");
                                }
                            });
                        } else {
                            window.open("App/main/views/BasicData/ShowVideoWithPlugin.html?Address=" + tb.serverAdress, "_blank",
                                "height=650,width=600,scrollbars=no,location=no");
                        }

                    });
                    $(".edit").click(function () {
                        var idx = $(this).attr("val");
                        var tb = $("#areaTable").bootstrapTable('getData')[idx];
                        if (tb == null) {
                            return;
                        }
                        var pageindex = $('#areaTable').bootstrapTable('getOptions').pageNumber;
                        window.location.href = "/default.html#!/EditCamera?backpage=CameraManager&item=" + JSON.stringify(tb) + "&pageindex=" + pageindex;
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
                    {
                        field: 'cameraName',
                        title: '名称',
                        align:"center",
                        width:"20%"
                    }, {
                        field: 'officeareaFullName',
                        title: '地址',
                        align:"center",
                        width:"20%"
                    }, {
                        field: 'serverAdress',
                        title: '摄像头地址',
                        align:"center",
                        width:"20%"
                    },
                    {
                        field: 'clientStreamType',
                        title: '显示方式',
                        align:"center",
                        width:"20%",
                        formatter: function (val) {
                            switch (val) {
                                case 0:
                                    return "使用流媒体服务器显示";
                                case 1:
                                    return "VLC插件显示";
                                case 2:
                                    return "其他插件显示";
                                default:
                                    return "";
                            }
                        }
                    }, {
                        field: 'assestID',
                        title: '操作',
                        align:"center",
                        width:"20%",
                        formatter: function (val, row, index) {

                            return '<a  href="javascript:; " style="box-shadow:none;" class="btn btn-sm  check" val=' + index
                                + '><i style="font-size:20px;" class="iconfont icon-chakan"></i></a>' + '<a  href="javascript:; " style="box-shadow:none;color:#2EA1F8;"  class="btn btn-sm  edit" val=' + index
                                + '><i class="iconfont icon-icon6"></i></a>';

                        }
                    }]
            });


            //*************************尾部*********************************************//
        }
    ]);
})();