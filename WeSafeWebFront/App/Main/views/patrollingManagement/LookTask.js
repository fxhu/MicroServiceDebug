(function () {
    var controllerId = 'app.views.LookTask';
    angular.module('app').controller(controllerId, [
        '$scope','$uibModal', '$timeout', 'abp.services.app.troubles', 'abp.services.app.patrol', function ($scope,$uibModal, $timeout, troublesService, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var backpage = getURLParam('backpage');
            var pageindex = getURLParam('pageindex');
            var id = parseInt(getURLParam('id'));
            var type = getURLParam('type');
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;
            }
            cancel=function() {
                window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
            } 
            vm.abpPath = abp.appPath;
            vm.task = {};
            patrolService.getAllUsers().then(function (result) {``
                vm.users = result.data.items;
            });
            patrolService.getTaskAndItemsById({ Id: id }).then(function (result) {
                var data = result.data;
                vm.task = {
                    name: data.name,
                    startTime: data.startTime, endTime: data.endTime, UserId: data.userId, IsActive: data.isActive?0:1,
                    ExecuteUserId: data.executeUserId, Remark: data.remark, AuditOpinion: data.auditOpinion,Status:data.status,IsHaveException:"无"
                };
                vm.plan = data.plan;
                $.each(data.points, function () {
                    $.each(this.checkItem.items, function () {
                        if (this.type == 3) {
                            var val = this.value;
                            this.value = this.selectItems[val];
                        }
                    });
                });
                vm.points = data.points;
                vm.isshowremark = vm.task.Status > 0 ? 1 : 0;
                vm.isshowaudit = (vm.task.Status == 3 || vm.task.Status == 4) ? 1 : 0;
                $.each(vm.points, function () {
                    //vm.addPoint(this,true);
                    this.isNormal=this.checkItem.isNormal;
                });
                LoadData(vm.points);
            });
            function LoadData(data){
                $('#tb_data').bootstrapTable("load", data);
                setTimeout(function(){
                    BindEvent();
                },100);
            }
            function BindEvent(){
                $(".looktask").click(function () {
                    var idx = $(this).attr("val");
                    var point = $("#tb_data").bootstrapTable('getData')[idx];
                    if (point == null) {
                        return;
                    }
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/Main/views/patrollingManagement/PointDetail.html',
                        controller: 'app.views.patrollingManagement.PointDetail as vm',
                        backdrop: 'static',
                        size: 'md',
                        resolve: {
                            item: function () {
                                return point;
                            }
                        }
                    });
                });
            }
            $('#tb_data').bootstrapTable({
                //url: '/FireMan/GetAllOfficeArea/',//请求后台的URL（*）
                //method: 'get',
                data: [],
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: Common.PageSize,                       //每页的记录行数（*）
                pageList: Common.PageList,        //可供选择的每页的行数（*）
                search: true,                       //是否显示表格搜索
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
                    BindEvent();
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
                        field: 'name',
                        title: '资产名称'
                    }, {
                        field: 'areaName',
                        title: '场所名称'
                    }, {
                        field: 'typeName',
                        title: '巡检方式'
                    },
                    {
                       field: 'isChecked',
                       title: '是否已检',
                       formatter:function(val){
                           if(val) return '已检';
                           else return '未检';
                       }
                    },
                    {
                        field: 'isNormal',
                        title: '巡检结果',
                        formatter:function(val,row){
                            if(!row.isChecked) return '';
                            if(val) return '正常';
                            else return '有异常';
                        }
                    }, {
                        title: '操作',
                        formatter: function (val, row, index) {
                            // var dis = row.isChecked;
                            // if (!dis) {
                            //     dis = "disabled";
                            // }
                            // else 
                            var dis = '';
                            return '<a href="javascript:;" ' + dis + ' class="btn-sm looktask " val=' + index +'><i class="iconfont icon-chakan" title="查看" style="font-size: 20px;"></i></a>';
                        }
                    }]
            });
            vm.isOnlyShowExceptionPoint = false;  
            vm.clickimg = function (url) {
				window.open(url);
			}
               
        }
    ]);
})();