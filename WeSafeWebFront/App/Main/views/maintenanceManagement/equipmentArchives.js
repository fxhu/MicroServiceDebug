(function () {
    var controllerId = 'app.views.equipmentArchives';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', function ($scope, $uibModal) {
            var vm = this;
            vm.myclass = 'hasPermission';


            var srvUrl = "http://117.41.186.196:8052/API/GetDeviceList.aspx";
            //var srvUrl = "/Archive/GetArchives";
            $.ajax({
                type: "get",
                url: srvUrl,
                dataType: "jsonp",
                success: function (d) {
                  
                    $('#tb_archive').bootstrapTable({
                     //   url: srvUrl,         //请求后台的URL（*）
                      //  method: 'get',                      //请求方式（*）
                        //  dataType: 'jsonp',
                        data: d.data,
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
                        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                        cardView: false,                    //是否显示详细视图
                        detailView: false,                   //是否显示父子表
                        onLoadSuccess: function (data) {
                            $(".edit").click(function () {
                                var idx = $(this).attr("val");
                                alert(idx);
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
                        columns: [{
                            checkbox: true,
                            width: "36"
                        }, {
                            field: 'Number',
                            title: '序号',
                            width: "40",
                            formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },  {
                            field: 'DeviceName',
                            title: '设备名称'
                        }, {
                                field: 'Position',
                            title: '位置'
                        }, {
                                field: 'CategoryName',
                            title: '设备类型'
                        }, {
                                field: 'BeginTime',
                            title: '开始时间'
                        }, {
                                field: 'EndTime',
                            title: '失效时间'
                        }
                        //    , {
                        //    field: '',
                        //    title: '操作',
                        //    formatter: function (val, row, index) {
                        //        return '<a href="javascript:;" class="btn btn-outline btn-circle btn-sm purple edit" val=' + index + '><i class="fa fa-edit"></i>编辑</a><a href="javascript:;" class="btn btn-outline btn-circle dark btn-sm black"><i class="fa fa-trash-o"></i>删除</a>';
                        //    }
                        //}
                        ]
                    });
                },
                error: function (err) {
                },
                complete: function () {

                }

            });


           
            
            vm.add = function (equipment) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/maintenanceManagement/CreateArchive.cshtml',
                    controller: 'app.views.archive.create as vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return equipment;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    
                });

                modalInstance.result.then(function () {
                    //getsafeares();
                });
            };

            vm.del = function (equipment) {
                var arrselections = $("#tb_archive").bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    alert("error");
                    return;
                }

                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/maintenanceManagement/ORCode.cshtml',
                    controller: 'app.views.orcode as vm',
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return equipment;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    $timeout(function () {
                        $.AdminBSB.input.activate();
                    }, 0);
                });

                modalInstance.result.then(function () {
                    //getsafeares();
                });
            };

            vm.serchinfo = null;
            var baseinfos = vm.equipments;
            vm.serch = function () {
                var serchdata = [];
                for (var i in baseinfos) {
                    if (baseinfos[i].eqname.indexOf(vm.serchinfo) != -1) {
                        serchdata.push(baseinfos[i]);
                    }
                }
                vm.equipments = serchdata;
            }
        }
    ]);
})();