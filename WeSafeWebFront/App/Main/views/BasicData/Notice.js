(function () {

    appModule.controller('app.views.BasicData.Notice', [
        '$scope', '$uibModal', 'uiGridConstants', 'abp.services.app.notice',
        function ($scope, $uibModal, uiGridConstants, noticeService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.loading = false;
            vm.advancedFiltersAreShown = false;

            vm.requestParams = {
                userName: '',
                Id: '',
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: null
            };

            vm.dateRangeOptions = app.createDateRangePickerOptions();
            vm.dateRangeModel = {
                startDate: moment().startOf('day'),
                endDate: moment().endOf('day')
            };

            vm.gridOptions = {
                enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                paginationPageSizes: app.consts.grid.defaultPageSizes,
                paginationPageSize: app.consts.grid.defaultPageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                appScopeProvider: vm,
                columnDefs: [
                    {
                        name: 'Actions',
                        enableSorting: false,
                        width: 50,
                        headerCellTemplate: '<span></span>',
                        cellTemplate:
                        '<div class=\"ui-grid-cell-contents text-center\">' +
                        '  <button class="btn btn-default btn-xs" ng-click="grid.appScope.showDetails(row.entity)"><i class="fa fa-search"></i></button>' +
                        '</div>'
                    },
                    {
                        name: app.localize('Time'),
                        field: 'creationTime',
                        cellFilter: 'momentFormat: \'YYYY-MM-DD HH:mm:ss\'',
                        minWidth: 150
                    },
                    {
                        name: app.localize('通知名称'),
                        field: 'Content',
                        minWidth: 150
                    },
                    {
                        name: app.localize('任务接收者'),
                        enableSorting: false,
                        field: 'dutyUserId',
                        minWidth: 200
                    },
                    {
                        name: app.localize('任务类型名称'),
                        enableSorting: false,
                        field: 'noticeTypeName',
                        minWidth: 200
                    }

                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        if (!sortColumns.length || !sortColumns[0].field) {
                            vm.requestParams.sorting = null;
                        } else {
                            vm.requestParams.sorting = sortColumns[0].field + ' ' + sortColumns[0].sort.direction;
                        }

                        vm.getNotices();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        vm.requestParams.skipCount = (pageNumber - 1) * pageSize;
                        vm.requestParams.maxResultCount = pageSize;

                        vm.getNotices();
                    });
                },
                data: []
            };

            vm.getNotices = function () {
                vm.loading = true;
                noticeService.getNotices($.extend({}, vm.requestParams, vm.dateRangeModel))
                    .then(function (result) {
                        vm.gridOptions.totalItems = result.data.totalCount;
                        vm.gridOptions.data = result.data.items;
                    }).finally(function () {
                        vm.loading = false;
                    });
            };

            vm.exportToExcel = function () {
                noticeService.getAuditLogsToExcel($.extend({}, vm.requestParams, vm.dateRangeModel))
                    .then(function (result) {
                        app.downloadTempFile(result.data);
                    });
            };

            vm.showDetails = function (auditLog) {
                $uibModal.open({
                    templateUrl: '~/App/common/views/auditLogs/detailModal.cshtml',
                    controller: 'common.views.auditLogs.detailModal as vm',
                    backdrop: 'static',
                    resolve: {
                        auditLog: function () {
                            return auditLog;
                        }
                    }
                });
            };

            vm.getNotices();
        }
    ]);
})();