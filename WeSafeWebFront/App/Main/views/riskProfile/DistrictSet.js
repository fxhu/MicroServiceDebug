(function () {
    var controllerId = 'app.views.districtset';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.safeAssess',
        function ($scope, $uibModal, safeAssessService) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.safechecks = null;

            var district_srvUrl = abp.appPath + "Safecheck/GetSafePerList";

            $('#tb_district').bootstrapTable({
                url: district_srvUrl, //请求后台的URL（*）
                method: 'get',
                striped: true, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, //是否显示分页（*）
                sortable: true, //是否启用排序
                //  sortOrder: "asc",                   //排序方式   
                silentSort: false,
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1, //初始化加载第一页，默认第一页
                pageSize: Common.PageSize, //每页的记录行数（*）
                pageList: Common.PageList, //可供选择的每页的行数（*）
                search: false, //是否显示表格搜索
                strictSearch: false,
                showColumns: false, //是否显示所有的列
                showRefresh: false, //是否显示刷新按钮
                clickToSelect: false, //是否启用点击选中行
                showToggle: false, //是否显示详细视图和列表视图的切换按钮
                cardView: false, //是否显示详细视图
                detailView: false, //是否显示父子表
                idField: "areaId",
                onLoadSuccess: function () {
                    $(".setper").click(function () {
                        var idx = $(this).attr("val");
                        var area = $("#tb_district").bootstrapTable('getData')[idx];
                        if (area == null) {
                            return;
                        }
                        window.location.hash = "#!/EditRatio?id=" + area.areaId;
                    });

                },
                rowStyle: function (row, index) {
                    var classes = ['bgGray', 'bgWhite'];

                    if (index % 2 === 0) {
                        return {
                            classes: classes[0]
                        };
                    } else {
                        return {
                            classes: classes[1]
                        };
                    }
                },
                columns: [{
                    field: 'areaName',
                    title: '区域',
                    align: 'center',
                    valign: "middle",
                    width: '20%',
                    sortable: true
                }, {
                    field: 'unitName',
                    title: '所属部门',
                    align: 'center',
                    valign: "middle",
                    width: '10%',
                    sortable: true
                }, {
                    field: 'patrolTaskPer',
                    title: '巡检任务',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: 'checkResultPer',
                    title: '考核成绩',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: 'goodsStatusPer',
                    title: '资产状态',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: 'dangerousGoodsPer',
                    title: '危险物品',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: 'dangerousOperationsPer',
                    title: '危险作业',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: 'trainNumberPer',
                    title: '培训次数',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    sortable: true
                }, {
                    field: '',
                    title: '操作',
                    align:'center',
                    valign: "middle",
                    width:'10%',
                    formatter: function (val, row, index) {
                        // return '<a href="javascript:;" class="btn btn-sm blue setper" val=' + index + '><i class="fa fa-cog"></i></a>';
                        return '<a href="javascript:;" class="setper" val=' + index + '><i class="iconfont icon-shezhi1"></i></a>';
                        
                    }
                }]
            });

            vm.serchinfo = null;

            vm.search = function (reSerch) {
                var pagenum = $('#tb_district').bootstrapTable('getOptions').pageNumber;
                var strurl = district_srvUrl;
                if (vm.serchinfo != null && vm.serchinfo != "") {
                    strurl += "?s=" + vm.serchinfo;
                }
                var opt = reSerch ? {
                    url: strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2,
                        pageNumber: pagenum
                    }
                } : {
                    url: strurl,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2
                    }
                };
                $('#tb_district').bootstrapTable("refresh", opt);
                if (reSerch) {
                    $('#tb_district').bootstrapTable("refreshOptions", {
                        pageNumber: pagenum
                    });
                }
            }
            vm.reset = function () {
                this.serchinfo = null
                this.search(false);
            };
        }
    ]);
})();