(function () {
    var controllerId = 'app.views.visualassests';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', function ($scope, $uibModal) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.import = function () {
                $.ajax({
                    async: false,
                    url: abp.appPath + 'VisualAssests/Import/',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    type: 'get',
                    success: function (result) {
                        if (result=="OK") {
                            abp.notify.info("同步成功！");
                        }
                        else
                        {
                            abp.notify.error(result);
                        }
                        vm.reset();
                    },
                    error: function (err) {
                        abp.notify.error(err);
                    }
                });
            }
            //设置扩展属性
            vm.setExtAttr = function () {
                var arrselections = $("#tb_visualAssests").bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    abp.notify.info("请选择需要编辑的资产");
                    return;
                }
                var editUrl = "/datavisual/assestextattr_edit.html?id=" + arrselections[0].id;
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
                    $(".modal-dialog").css("width", "640px");
                    $(".modal-body").css("height", "480px");
                });
            };

            var assests_srvUrl = "VisualAssests/QueryPageVisualAssests";
            vm.init = function () {
                $('#tb_visualAssests').bootstrapTable({
                    url: abp.appPath + assests_srvUrl,//请求后台的URL（*）
                    method: 'get',
                    striped: false,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）
                    sortable: true,                     //是否启用排序
                    sortOrder: "asc",                   //排序方式                
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       //初始化加载第一页，默认第一页
                    pageSize: Common.PageSize,                       //每页的记录行数（*）
                    pageList: Common.PageList,        //可供选择的每页的行数（*）
                    showColumns: false,                  //是否显示所有的列
                    showRefresh: false,                  //是否显示刷新按钮
                    clickToSelect: false,                //是否启用点击选中行
                    uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                    onLoadSuccess: function (data) {
                        $('#tb_visualAssests').find("thead").find("th.bs-checkbox").find("label").css("padding-left", "20px");
                        $('#tb_visualAssests').find("input[disabled=disabled]").parent().parent().css("cursor", "not-allowed");
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
                            field: 'code',
                            title: '资产编号'
                    }, {
                        field: 'assestTypeName',
                        title: '资产类型'
                    }, {
                        field: 'specific',
                        title: '规格型号'
                    }, {
                        field: 'areaName',
                        title: '所属位置'
                    }
                    ]
                });
            };
            
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

            vm.serchinfo = null;

            vm.search = function (reSerch) {
                var pagenum = $('#tb_visualAssests').bootstrapTable('getOptions').pageNumber;
                var strurl = assests_srvUrl;
                if (vm.serchinfo != null && vm.serchinfo != "") {
                    strurl += "?s=" + vm.serchinfo;
                }
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
                $('#tb_visualAssests').bootstrapTable("refresh", opt);
                if (reSerch) {
                    $('#tb_visualAssests').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null
                this.search(false);
            };
            vm.init();            
        }
    ]);
})();