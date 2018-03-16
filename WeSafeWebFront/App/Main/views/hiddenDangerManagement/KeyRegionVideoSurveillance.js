(function () {
    var controllerId = 'app.views.keyregionvideosurveillance';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
            var vm = this;
            vm.myclass = 'hasPermission';

            //------------------------------------------------//
            vm.NowTableData = [];
            vm.areas = [];
            var maxtype = -1;
            vm.thisAreaID = -1;
            var video_srvUrl = abp.appPath+"Camera/GetAllCamera?ImportantArea=1";
            vm.LoadArea = function (parentId, level, fromclick) {
                if (!parentId) { parentId = ""; }
                //修改按钮的文本
                if (fromclick) {
                    $(event.srcElement).parents("ul").prev().html($(event.srcElement).text() + ' <span class="caret"></span>')
                }
                else {
                    vm.BindList();
                }
                //加载下拉内容
                $http({ method: 'GET', url: "/FireMan/GetAllOfficeAreaNoPagePer?ParentId=" + parentId }).then(function (result) {
                    var data = result.data;
                    if (maxtype == -1) {
                        $.each(data, function () {
                            if (this.AreaType > maxtype) maxtype = this.AreaType;
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
                        if (fromclick) {
                            vm.thisAreaID = parentId;
                            vm.Reload();
                        }
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        $http({ method: 'GET', url: "/FireMan/GetAllOfficeAreaNoPagePer?Id=" + parentId }).then(function (result) {
                            vm.NowTableData = result.data;
                            if (fromclick) {
                                vm.thisAreaID = parentId;
                                vm.Reload();
                            }
                        });
                    }
                });
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
                    info[index].childAreas[i].displayName = data[i].DisplayName;
                }
                info[index].pid = data[0].ParentId;
                info[index].levelName = GetAreaTypeName(level);
                info[index].level = level;
                vm.areas = info;
            }

            vm.Reload = function () {
                var newUrl = video_srvUrl + "&assetip=" + vm.thisAreaID;
                $('#tb_video').bootstrapTable("refresh", { url: newUrl });
            };


            vm.BindList = function () {
                $('#tb_video').bootstrapTable({
                    url: abp.appPath + video_srvUrl,//请求后台的URL（*）
                    method: 'get',
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）                      
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       //初始化加载第一页，默认第一页
                    pageSize: 8,                       //每页的记录行数（*）
                    pageList: Common.PageList,        //可供选择的每页的行数（*）                    
                    strictSearch: false,
                    showHeader: false,
                    idField: "Id",
                    rowStyle: function (row, index) {
                        return {
                            classes: "col-md-3",
                            css: {
                                "height": "260px"
                            }
                        };
                    },
                    onLoadSuccess: function (data) {
                        $timeout(function () {
                            $("#tb_video").find("canvas").each(function (idx, item) {
                                var url = $(this).attr("val");
                                var player1 = new JSMpeg.Player(url, { canvas: this });
                            });
                        });
                    },
                    columns: [{
                        field: 'CameraName',
                        align: "center",
                        title: '摄像头名称',
                        formatter: function (val, row) {
                            var html = "<canvas style=\"width: 100%;height: 100%\" val=\"" + row.ServerAdress + "\"></canvas>";
                            html += "<p class=\"text-center\" style=\"font-size:16px;\">" + val + "</p>";
                            return html;
                        }
                    }]
                });
            }



            $timeout(function () {
                vm.LoadArea("", 4);
            });


            $scope.$on('$destroy', function () {
                $("#tb_video").find("canvas").each(function (idx, item) {
                    console.log("释放视频");
                    item.remove();
                });
            });

        }
    ]);
})();