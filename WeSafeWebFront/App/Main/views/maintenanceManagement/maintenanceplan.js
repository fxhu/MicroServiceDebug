(function () {
    var controllerId = 'app.views.maintenanceplan';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            //maintenanceplan logic...
            vm.plans = [
                { planname: '消火栓维修', plantype: '维修', starttime: '2017-07-21 09:00:00', endtime: '2017-07-21 09:30:00', plancontent: '消火栓维修', creatpeople: '负责人' },
                { planname: '消火栓保养', plantype: '保养', starttime: '2017-07-22 09:00:00', endtime: '2017-07-21 09:30:00', plancontent: '消火栓保养', creatpeople: '负责人' },
                { planname: '灭火器检测', plantype: '维修', starttime: '2017-07-22 09:00:00', endtime: '2017-07-21 09:30:00', plancontent: '灭火器检测', creatpeople: '负责人' },
                { planname: '消火栓保养', plantype: '保养', starttime: '2017-07-22 09:00:00', endtime: '2017-07-21 09:30:00', plancontent: '消火栓保养', creatpeople: '负责人' }
            ];

            $('#tb_plan').bootstrapTable({
                data: vm.plans,         //请求后台的URL（*）
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
                columns: [{
                    field: 'planname',
                    title: '计划名称'
                }, {
                    field: 'plantype',
                    title: '计划类型'
                }, {
                    field: 'starttime',
                    title: '开始时间'
                }, {
                    field: 'endtime',
                    title: '截止时间'
                }, {
                    field: 'plancontent',
                    title: '计划内容'
                }, {
                    field: 'creatpeople',
                    title: '创建人'
                }, {
                    field: '',
                    title: '操作',
                    formatter: function (val, row, index) {
                        return '<a href="javascript:;" class="btn btn-outline btn-circle btn-sm purple edit" val=' + index + '><i class="fa fa-edit"></i>编辑</a><a href="javascript:;" class="btn btn-outline btn-circle dark btn-sm black"><i class="fa fa-trash-o"></i>删除</a>';
                    }
                }]
            });
            
            //vm.serchinfo = null;
            //var baseinfos = vm.plans;
            //vm.serch = function () {
            //    var serchdata = [];
            //    for (var i in baseinfos) {
            //        if (baseinfos[i].planname.indexOf(vm.serchinfo) != -1) {
            //            serchdata.push(baseinfos[i]);
            //        }
            //    }
            //    vm.plans = serchdata;
            //}
        }
    ]);
})();