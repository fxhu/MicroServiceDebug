(function () {
    var controllerId = 'app.views.assertReport';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.troubles', '$location',
        function ($scope, $uibModal, troublesService, $location) {
            var vm = this;

            var dId = $location.search().dId;
            var dNum = $location.search().dNum;
            var dName = $location.search().dName;

            vm.dNum = dNum;
            vm.dName = dName;

            vm.activetab = function (tabindex) {

                switch (tabindex) {
                    case 1: activeassetdetialschecklist(dId); break;
                    case 2: activeassetdetialsmaintainlist(dId); break;
                    case 3: activeassetdetialschangelist(dId); break;
                    case 4: activeassetdetialsinspectlist(dId); break;
                    default: break;
                };

            };

            activeassetdetialschecklist(dId);
        }
    ]);

    function activeassetdetialschecklist(dId) {
        $('#tb_assetdetials').bootstrapTable('destroy');
        $('#tb_assetdetials').bootstrapTable({
            url: authorityHost+"AssertDetails/GetAssetDetials",
            classes: "table table-condensed assetreportdeta",
            queryParams: function (pa) { pa.deviceId = dId; pa.dtype = 1; return pa; },
            pageSize: 20,
            pagination: true,
            columns: [
                {
                    field: 'checkDateDesc',
                    title: '巡检日期',
                    sortable: true
                }, {
                    field: 'checkedBy',
                    title: '巡检人',
                    sortable: true
                },
                {
                    field: 'status',
                    title: '状态',
                    sortable: true
                }]
        });
    }

    function activeassetdetialsmaintainlist(dId) {
        $('#tb_assetdetials').bootstrapTable('destroy');
        $('#tb_assetdetials').bootstrapTable({
            url: authorityHost+"AssertDetails/GetAssetDetials",
            classes: "table table-condensed assetreportdeta",
            queryParams: function (pa) { pa.deviceId = dId; pa.dtype = 2; return pa; },
            pageSize: 20,
            pagination: true,
            columns: [
                {
                    field: 'planName',
                    title: '计划名称',
                    sortable: true
                },{
                    field: 'itemName',
                    title: '维保项',
                    sortable: true
                }, {
                    field: 'itemContent',
                    title: '维保内容',
                    sortable: true
                },{
                    field: 'checkTimeDesc',
                    title: '维保日期',
                    sortable: true
                }, {
                    field: 'dutyPeopleName',
                    title: '维保人',
                    sortable: true
                },
                {
                    field: 'status',
                    title: '状态',
                    sortable: true
                }]
        });
    }

    function activeassetdetialschangelist(dId) {
        $('#tb_assetdetials').bootstrapTable('destroy');
        $('#tb_assetdetials').bootstrapTable({
            url: authorityHost+"AssertDetails/GetAssetDetials",
            classes: "table table-condensed assetreportdeta",
            queryParams: function (pa) { pa.deviceId = dId; pa.dtype = 3; return pa; },
            pageSize: 20,
            pagination: true,
            columns: [
                {
                    field: 'ReplaceDateDesc',
                    title: '更换日期',
                    sortable: true
                }, {
                    field: 'ReplacePerson',
                    title: '更换人',
                    sortable: true
                },
                {
                    field: 'Before',
                    title: '更换前',
                    sortable: true
                },
                {
                    field: 'After',
                    title: '更换后',
                    sortable: true
                }]
        });
    }

    function activeassetdetialsinspectlist(dId) {
        $('#tb_assetdetials').bootstrapTable('destroy');
        $('#tb_assetdetials').bootstrapTable({
            url: authorityHost+"AssertDetails/GetAssetDetials",
            classes: "table table-condensed assetreportdeta",
            queryParams: function (pa) { pa.deviceId = dId; pa.dtype = 4; return pa; },
            pageSize: 20,
            pagination: true,
            columns: [
                {
                    field: 'planName',
                    title: '计划名称',
                    sortable: true
                }, {
                    field: 'itemName',
                    title: '检测项',
                    sortable: true
                }, {
                    field: 'itemContent',
                    title: '检测内容',
                    sortable: true
                },{
                    field: 'checkTimeDesc',
                    title: '检测日期',
                    sortable: true
                }, {
                    field: 'dutyPeopleName',
                    title: '检测人',
                    sortable: true
                },
                {
                    field: 'status',
                    title: '状态',
                    sortable: true
                }]
        });
    }
})();


