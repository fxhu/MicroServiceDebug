(function () {
    var controllerId = 'app.views.ledgermanagement';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.ledgers = [
                { securityname: '《建筑消防设施巡查记录表》', uploadtime: '2017-09-09 10:00:00', uploadpeople: '管理员', belongplan: '巡查计划' },
                { securityname: '《建筑消防设施检测记录表》', uploadtime: '2017-09-09 10:00:00', uploadpeople: '管理员', belongplan: '检测计划' },
                { securityname: '《建筑消防设施故障维修记录表》', uploadtime: '2017-09-09 10:00:00', uploadpeople: '管理员', belongplan: '维修计划' },
                { securityname: '《建筑消防设施维护保养记录表》', uploadtime: '2017-09-09 10:00:00', uploadpeople: '管理员', belongplan: '保养及换' }
            ];

            $('#tb_ledger').bootstrapTable({
                data: vm.ledgers,         //请求后台的URL（*）
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
                        field: 'securityname',
                        title: '单据名称'
                }, {
                        field: 'uploadtime',
                        title: '上传日期'
                }, {
                        field: 'uploadpeople',
                        title: '上传人'
                }, {
                        field: 'belongplan',
                        title: '所属计划'
                }, {
                    field: '',
                    title: '操作',
                    formatter: function (val, row, index) {
                        return '<a href="javascript:;" class="btn btn-outline btn-circle btn-sm purple edit" val=' + index + '><i class="fa fa-edit"></i>编辑</a><a href="javascript:;" class="btn btn-outline btn-circle dark btn-sm black"><i class="fa fa-trash-o"></i>删除</a>';
                    }
                }]
            });
            //vm.serchinfo = null;
            //var baseinfos = vm.ledgers;
            //vm.serch = function () {
            //    var serchdata = [];
            //    for (var i in baseinfos) {
            //        if (baseinfos[i].securityname.indexOf(vm.serchinfo) != -1) {
            //            serchdata.push(baseinfos[i]);
            //        }
            //    }
            //    vm.ledgers = serchdata;
            //}
        }
    ]);
})();