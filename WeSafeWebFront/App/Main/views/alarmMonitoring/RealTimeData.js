(function () {
    var controllerId = 'app.views.RealTimeData';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', '$interval', 'abp.services.app.alarms', function ($scope, $timeout, $interval, alarmsService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            
            var query = "?iotonly=1";
            var realtime_srvUrl = abp.appPath + "VisualAssests/QueryPageVisualAssests";
            realtime_srvUrl = realtime_srvUrl + query;
            vm.timeout = null;
            vm.oldPageNum = 1;
            vm.Refresh = function () {    
                vm.Stop();//刷新前停止上一次的更新动作
                var arrs = $("#tb_realtimedata").bootstrapTable('getData');              
                if (arrs.length > 0)
                {
                    $.ajax({
                        type: "post",
                        url:abp.appPath+ "VisualAssests/RefreshVisualAssestData",
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", tokens);               
                        },
                        data: {
                            "data": JSON.stringify(arrs)
                        },
                        dataType: "json",
                        success: function (data) {
                            var opt = $("#tb_realtimedata").bootstrapTable('getOptions');
                            data.total = opt.totalRows;
                            $("#tb_realtimedata").bootstrapTable('load', data);
                        },
                        error: function (err) {

                        },
                        complete: function () {
                            vm.timeout = $timeout(function () {
                                vm.Refresh();
                            }, 5000);
                        }
                    });
                }
                else {
                    vm.timeout = $timeout(function () {
                        vm.Refresh();
                    }, 5000);
                }
            };

            vm.run = function () {

            };

            $scope.$on('$destroy', function () {
                if (vm.timeout != null) {
                    $timeout.cancel(vm.timeout);
                }                
            });

            vm.Stop = function () {
                if (vm.timeout != null) {
                    $timeout.cancel(vm.timeout);
                }
            };

            $('#tb_realtimedata').bootstrapTable({
                url: realtime_srvUrl,//请求后台的URL（*）
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
                rowStyle: function (row, index) {
                    return {
                        css: { "height": "49px" }
                    };
                },
                detailView: false,
                onPageChange: function (number, size) { 
                    vm.oldPageNum = number;
                    vm.Stop();
                },
                onLoadSuccess: function (data) {                   
                    //验证刷新前页码和返回的数据页面是否一致，如果不一致，则不更新当前数据
                    if (vm.oldPageNum == data.pageNum) {
                        vm.Refresh();
                    }                   
                },
                columns: [{
                    field: 'code',
                    title: '资产编号',
                    align: 'center',
                    valign: "middle"
                }, {
                    field: 'assestTypeName',
                    valign: "middle",
                    align: 'center',
                    title: '资产类型'
                }, {
                    field: 'specific',
                    valign: "middle",
                    align: 'center',
                    title: '规格型号'
                }, {
                    field: 'areaName',
                    valign: "middle",
                    align: 'center',
                    title: '位置'
                }, {
                    field: 'extAttrStr',
                    title: '实时数据',
                    align: 'center',
                    valign: "middle",
                    formatter: function (val, row, index) {
                        var attrs = eval(val);
                        var type = "-";

                        $.each(attrs, function (idx, attr) {
                            if ((attr.Name == "温度" || attr.Name == "状态") && attr.Value != "") {
                                type = attr.Value;
                                return;
                            }
                        });
                        return type;
                    }
                }]
            });

            vm.serchinfo = null;

            vm.search = function (reSerch) {            
                vm.Stop();
                var pagenum = $('#tb_realtimedata').bootstrapTable('getOptions').pageNumber;
                var strurl = vm.serchinfo == null ? realtime_srvUrl : realtime_srvUrl + "&s=" + vm.serchinfo;
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
                $('#tb_realtimedata').bootstrapTable("refresh", opt);
                if (reSerch) {
                    $('#tb_realtimedata').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null
                this.search(false);
            };
        }
    ]);
})();