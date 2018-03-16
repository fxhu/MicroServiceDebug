(function () {
    appModule.controller('common.views.organizationUnits.index', [
        '$scope', '$uibModal', '$q', 'uiGridConstants', 'abp.services.app.organizationUnit', 'abp.services.app.commonLookup', 'lookupModal',
        function ($scope, $uibModal, $q, uiGridConstants, organizationUnitService, commonLookupService, lookupModal) {
            var vm = this;
            vm.canShowMemberList = false;
            vm.treeContainerClassName = "col-lg-12";
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.permissions = {
                manageOrganizationTree: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManageOrganizationTree'),
                manageMembers: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManageMembers'),
                manageRoot: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManagingOrganizationTreeRoot')
            };

            vm.requestParams = {
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: null
            };

            vm.organizationTree = {

                $tree: null,

                unitCount: 0,

                setUnitCount: function (unitCount) {
                    $scope.safeApply(function () {
                        vm.organizationTree.unitCount = unitCount;
                    });
                },

                refreshUnitCount: function () {
                    vm.organizationTree.setUnitCount(vm.organizationTree.$tree.jstree('get_json').length);
                },

                selectedOu: {
                    id: null,
                    displayName: null,
                    code: null,

                    set: function (ouInTree) {
                        if (!ouInTree) {
                            vm.organizationTree.selectedOu.id = null;
                            vm.organizationTree.selectedOu.displayName = null;
                            vm.organizationTree.selectedOu.code = null;
                            vm.organizationTree.selectedOu.memberCount = null;
                            vm.canShowMemberList = false;
                            vm.treeContainerClassName = "col-lg-12";
                        } else {
                            vm.organizationTree.selectedOu.id = ouInTree.id;
                            vm.organizationTree.selectedOu.displayName = ouInTree.original.displayName;
                            vm.organizationTree.selectedOu.code = ouInTree.original.code;
                            vm.organizationTree.selectedOu.memberCount = ouInTree.original.memberCount;
                            vm.canShowMemberList = vm.organizationTree.canAddMembers(ouInTree); 
                            vm.treeContainerClassName = vm.canShowMemberList ? "col-lg-6" : "col-lg-12";
                        }

                        vm.members.load();
                    }
                },
                canEditTree: function (node) {
                    //根节点
                    if (node.parent == "#") {
                        return vm.permissions.manageRoot;
                    }
                    else {
                        return vm.permissions.manageOrganizationTree;
                    }
                },
                canAddMembers: function (node) {
                    //根节点
                    if (node.parent == "#") {
                        return vm.permissions.manageRoot && vm.permissions.manageMembers;
                    }
                    else {
                        return vm.permissions.manageMembers;
                    }
                },
                contextMenu: function (node) {
                    if (!vm.organizationTree.canEditTree(node)) {
                        return {};
                    }
                    var items = {
                        editUnit: {
                            label: '编辑',
                            action: function (data) {
                                var instance = $.jstree.reference(data.reference);

                                vm.organizationTree.openCreateOrEditUnitModal({
                                    id: node.id,
                                    displayName: node.original.displayName
                                }, function (updatedOu) {
                                    node.original.displayName = updatedOu.displayName;
                                    instance.rename_node(node, vm.organizationTree.generateTextOnTree(updatedOu));
                                });
                            }
                        },

                        addSubUnit: {
                            label: '添加子机构',
                            action: function () {
                                vm.organizationTree.addUnit(node.id);
                            }
                        },

                        addMember: {
                            label: '添加用户',
                            action: function () {
                                vm.members.openAddModal();
                            }
                        },

                        'delete': {
                            label: '删除',
                            action: function (data) {
                                var instance = $.jstree.reference(data.reference);

                                abp.message.confirm(
                                    app.localize('删除警告', node.original.displayName),
                                    function (isConfirmed) {
                                        if (isConfirmed) {
                                            organizationUnitService.deleteOrganizationUnit({
                                                id: node.id
                                            }).then(function (result) {
                                                if (result.data == "success") {
                                                    abp.notify.success(app.localize('成功删除'));
                                                    instance.delete_node(node);
                                                    vm.organizationTree.refreshUnitCount();
                                                    vm.organizationTree.reload();
                                                }
                                                else {
                                                    if (result.data == "haveofficearea") {
                                                        setTimeout(function () {
                                                            abp.message.warn("此组织机构下尚有场所存在，如果要删除此组织机构，请删除这些场所或者编辑这些场所的组织机构！");
                                                        }, 500);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    }

                    return items;
                },

                addUnit: function (parentId) {
                    var instance = $.jstree.reference(vm.organizationTree.$tree);
                    vm.organizationTree.openCreateOrEditUnitModal({
                        parentId: parentId
                    }, function (newOu) {
                        instance.create_node(
                            parentId ? instance.get_node(parentId) : '#',
                            {
                                id: newOu.id,
                                parent: newOu.parentId ? newOu.parentId : '#',
                                code: newOu.code,
                                displayName: newOu.displayName,
                                memberCount: 0,
                                text: vm.organizationTree.generateTextOnTree(newOu),
                                state: {
                                    opened: true
                                }
                            });

                        vm.organizationTree.refreshUnitCount();
                    });
                },

                openCreateOrEditUnitModal: function (organizationUnit, closeCallback) {
                    var modalInstance = $uibModal.open({
                        templateUrl: '/App/common/views/organizationUnits/createOrEditUnitModal.html',
                        controller: 'common.views.organizationUnits.createOrEditUnitModal as vm',
                        backdrop: 'static',
                        resolve: {
                            organizationUnit: function () {
                                return organizationUnit;
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        closeCallback && closeCallback(result);
                    });
                },

                generateTextOnTree: function (ou) {
                    return '<span attr="' + ou.code + '" class="ou-text ou-text-has-members" data-ou-id="' + ou.id + '">' + ou.displayName + ' <i class="fa fa-caret-down text-muted"></i></span>';
                },

                incrementMemberCount: function (ouId, incrementAmount) {
                    var treeNode = vm.organizationTree.$tree.jstree('get_node', ouId);
                    treeNode.original.memberCount = treeNode.original.memberCount + incrementAmount;
                    vm.organizationTree.$tree.jstree('rename_node', treeNode, vm.organizationTree.generateTextOnTree(treeNode.original));
                },

                getTreeDataFromServer: function (callback) {
                    organizationUnitService.getOrganizationUnits({}).then(function (result) {
                        var treeData = _.map(result.data.items, function (item) {
                            return {
                                id: item.id,
                                parent: item.parentId ? item.parentId : '#',
                                code: item.code,
                                displayName: item.displayName,
                                memberCount: item.memberCount,
                                text: vm.organizationTree.generateTextOnTree(item),
                                state: {
                                    opened: item.parentId ? false : true
                                }
                            };
                        });

                        callback(treeData);
                    });
                },

                init: function () {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);
                        vm.organizationTree.$tree = $('#OrganizationUnitEditTree');

                        var jsTreePlugins = [
                            'types',
                            'contextmenu',
                            'wholerow',
                            'sort'
                        ];

                        vm.organizationTree.$tree
                            .on('changed.jstree', function (e, data) {
                                $scope.safeApply(function () {
                                    if (data.selected.length != 1) {
                                        vm.organizationTree.selectedOu.set(null);
                                    } else {
                                        var selectedNode = data.instance.get_node(data.selected[0]);
                                        vm.organizationTree.selectedOu.set(selectedNode);
                                    }
                                });

                            })
                            .jstree({
                                'core': {
                                    data: treeData,
                                    multiple: false,
                                    check_callback: function (operation, node, node_parent, node_position, more) {
                                        return true;
                                    }
                                },
                                types: {
                                    "default": {
                                        "icon": "fa fa-folder tree-item-icon-color icon-lg"
                                    },
                                    "file": {
                                        "icon": "fa fa-file tree-item-icon-color icon-lg"
                                    }
                                },
                                contextmenu: {
                                    items: vm.organizationTree.contextMenu
                                },
                                sort: function (node1, node2) {
                                    if (this.get_node(node2).original.displayName < this.get_node(node1).original.displayName) {
                                        return 1;
                                    }

                                    return -1;
                                },
                                plugins: jsTreePlugins
                            });

                        vm.organizationTree.$tree.on('click', '.ou-text .fa-caret-down', function (e) {
                            e.preventDefault();

                            var ouId = $(this).closest('.ou-text').attr('data-ou-id');
                            setTimeout(function () {
                                vm.organizationTree.$tree.jstree('show_contextmenu', ouId);
                            }, 100);
                        });
                    });
                },

                reload: function () {
                    vm.organizationTree.getTreeDataFromServer(function (treeData) {
                        vm.organizationTree.setUnitCount(treeData.length);
                        vm.organizationTree.$tree.jstree(true).settings.core.data = treeData;
                        vm.organizationTree.$tree.jstree('refresh');
                    });
                }
            };

            vm.members = {

                gridOptions: {
                    enableSorting: false,
                    enableFiltering: false,
                    enableColumnMenus: false,
                    enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                    enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                    paginationPageSizes: app.consts.grid.defaultPageSizes,
                    paginationPageSize: app.consts.grid.defaultPageSize,
                    useExternalPagination: true,
                    useExternalSorting: true,
                    appScopeProvider: vm,
                    columnDefs: [
                        {
                            name: app.localize('用户名'),
                            field: 'userName',
                            cellTemplate:
                            '<div class=\"ui-grid-cell-contents\" title="{{row.entity.name +  \' (\' + row.entity.emailAddress + \')\'}}">' +
                            '  <img ng-if="row.entity.profilePictureId" ng-src="' + abp.appPath + 'Profile/GetProfilePictureById?id={{row.entity.profilePictureId}}" width="22" height="22" class="img-rounded img-profile-picture-in-grid" />' +
                            '  <img ng-if="!row.entity.profilePictureId" src="/assets/Common/Images/default-profile-picture.png" width="22" height="22" class="img-rounded" />' +
                            '  {{COL_FIELD CUSTOM_FILTERS}} &nbsp;' +
                            '</div>',
                            minWidth: 140
                        },
                        //{
                        //    name: app.localize('姓'),
                        //    field: 'surname',
                        //    minWidth: 140
                        //},
                        {
                            name: app.localize('姓名'),
                            field: 'name',
                            minWidth: 140
                        },
                        {
                            name: '添加时间',
                            field: 'addedTime',
                            cellFilter: 'momentFormat: \'L\'',
                            minWidth: 100
                        },
                        {
                            name: '操作',
                            enableSorting: false,
                            width: 100,
                            cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <button ng-if="grid.appScope.permissions.manageMembers" class="btn btn-default btn-xs" ng-click="grid.appScope.members.remove(row.entity)" title="' + app.localize('删除') + '"><i class="fa fa-trash-o"></i></button>' +
                            '</div>'
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

                            vm.members.load();
                        });
                        gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                            vm.requestParams.skipCount = (pageNumber - 1) * pageSize;
                            vm.requestParams.maxResultCount = pageSize;

                            vm.members.load();
                        });
                    },
                    data: []
                },

                load: function () {
                    if (!vm.organizationTree.selectedOu.id) {
                        vm.members.gridOptions.totalItems = 0;
                        vm.members.gridOptions.data = [];
                        return;
                    }

                    organizationUnitService.getOrganizationUnitUsers($.extend({ id: vm.organizationTree.selectedOu.id }, vm.requestParams))
                        .then(function (result) {
                            vm.members.gridOptions.totalItems = result.data.totalCount;
                            vm.members.gridOptions.data = result.data.items;
                        });
                },

                add: function (userId) {
                    var ouId = vm.organizationTree.selectedOu.id;
                    if (!ouId) {
                        return;
                    }

                    organizationUnitService.addUserToOrganizationUnit({
                        organizationUnitId: ouId,
                        userId: userId
                    }).then(function () {
                        abp.notify.success(app.localize('成功添加'));
                        vm.organizationTree.incrementMemberCount(ouId, 1);
                        vm.members.load();
                    });
                },

                remove: function (user) {
                    var ouId = vm.organizationTree.selectedOu.id;
                    if (!ouId) {
                        return;
                    }

                    abp.message.confirm(
                        app.localize('移除用户警告', user.userName, vm.organizationTree.selectedOu.displayName),
                        function (isConfirmed) {
                            if (isConfirmed) {
                                organizationUnitService.removeUserFromOrganizationUnit({
                                    organizationUnitId: ouId,
                                    userId: user.id
                                }).then(function () {
                                    abp.notify.success(app.localize('成功移除'));
                                    vm.organizationTree.incrementMemberCount(ouId, -1);
                                    vm.members.load();
                                    vm.organizationTree.reload();
                                });
                            }
                        }
                    );
                },

                openAddModal: function () {
                    var ouId = vm.organizationTree.selectedOu.id;
                    if (!ouId) {
                        return;
                    }

                    lookupModal.open({

                        title: app.localize('选择一个用户'),
                        serviceMethod: commonLookupService.findUsers,

                        canSelect: function (item) {
                            return $q(function (resolve, reject) {
                                organizationUnitService.isInOrganizationUnit({
                                    userId: item.value,
                                    organizationUnitId: ouId
                                }).then(function (result) {
                                    if (result.data) {
                                        abp.message.warn(app.localize('用户已存在'));
                                    }

                                    resolve(!result.data);
                                }).catch(function () {
                                    reject();
                                });
                            });
                        },

                        callback: function (selectedItem) {
                            vm.members.add(selectedItem.value);
                            vm.organizationTree.reload();
                        }
                    });
                },

                init: function () {
                    if (!vm.permissions.manageMembers) {
                        vm.members.gridOptions.columnDefs.shift();
                    }
                }
            }

            vm.members.init();
            vm.organizationTree.init();
            console.log(vm);
        }
    ]);
})();