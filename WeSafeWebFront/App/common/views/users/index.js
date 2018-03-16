(function () {

    appModule.controller('common.views.users.index', [
        '$scope', '$uibModal','$timeout', '$stateParams', 'uiGridConstants', 'abp.services.app.user','abp.services.app.role',
        function ($scope, $uibModal,$timeout, $stateParams, uiGridConstants, userService,roleService) {
            var vm = this;
            $scope.names=[];
            //$scope.names = [{"name":"请选择"}];
            roleService.getRoles({}).then(function (result) { 
            	 $scope.names=result.data.items;  
                /* for(var i = 0; i < result.data.items.length ; i ++ ){
                	 console.log(result.data.items);
                } */
                
            });
            $scope.$on('$viewContentLoaded', function () {
                App.initAjax();
            });

            vm.loading = false;
            vm.advancedFiltersAreShown = false;
            vm.filterText = $stateParams.filterText || '';
            vm.currentUserId = abp.session.userId;

            vm.permissions = {
                create: abp.auth.hasPermission('Pages.Administration.Users.Create'),
                edit: abp.auth.hasPermission('Pages.Administration.Users.Edit'),
                changePermissions: abp.auth.hasPermission('Pages.Administration.Users.ChangePermissions'),
                impersonation: abp.auth.hasPermission('Pages.Administration.Users.Impersonation'),
                'delete': abp.auth.hasPermission('Pages.Administration.Users.Delete'),
                roles: abp.auth.hasPermission('Pages.Administration.Roles')
            };

            vm.requestParams = {
                permission: '',
                role: '',
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: null
            };

            vm.userGridOptions = {
                enableColumnMenus: false,
                enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                paginationPageSizes: app.consts.grid.defaultPageSizes,
                paginationPageSize: app.consts.grid.defaultPageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                appScopeProvider: vm,
                rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'text-muted\': !row.entity.isActive }"  ui-grid-cell></div>',
                columnDefs: [
                    
                    {
                        name: app.localize('用户名'),
                        field: 'userName',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <img ng-if="row.entity.profilePictureId" ng-src="' + abp.appPath + 'Profile/GetProfilePictureById?id={{row.entity.profilePictureId}}" width="22" height="22" class="img-rounded img-profile-picture-in-grid" />' +
                            '  <img ng-if="!row.entity.profilePictureId" src="/assets/Common/Images/default-profile-picture.png" width="22" height="22" class="img-rounded" />' +
                            '  {{COL_FIELD CUSTOM_FILTERS}} &nbsp;' +
                            '</div>',
                        minWidth: 140
                    },
                    {
                        name: app.localize('姓名'),
                        field: 'name',
                        minWidth: 120
                    },
                    //{
                    //    name: app.localize('姓'),
                    //    field: 'surname',
                    //    minWidth: 120
                    //},
                    {
                        name: app.localize('角色'),
                        field: 'getRoleNames()',
                        enableSorting: false,
                        minWidth: 160
                    },
                    {
                        name: app.localize('邮箱'),
                        field: 'emailAddress',
                        minWidth: 200
                    },
                    {
                        name: app.localize('邮箱确认'),
                        field: 'isEmailConfirmed',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <span ng-show="row.entity.isEmailConfirmed" class="label label-success">' + '是'+ '</span>' +
                            '  <span ng-show="!row.entity.isEmailConfirmed" class="label label-default">' + '否' + '</span>' +
                            '</div>',
                        minWidth: 80
                    },
                    {
                        name: app.localize('账户状态'),
                        field: 'isActive',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <span ng-show="row.entity.isActive" class="label label-success">' + '启用' + '</span>' +
                            '  <span ng-show="!row.entity.isActive" class="label label-default">' +'禁用' + '</span>' +
                            '</div>',
                        minWidth: 80
                    },
                    {
                        name: app.localize('最后登录时间'),
                        field: 'lastLoginTime',
                        cellFilter: 'momentFormat: \'L\'',
                        minWidth: 100
                    },
                    {
                        name: app.localize('创建时间'),
                        field: 'creationTime',
                        cellFilter: 'momentFormat: \'L\'',
                        minWidth: 100
                    },
                    {
                        name: app.localize('操作'),
                        enableSorting: false,
                        width: 120,
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                                '  <div class="btn-group dropdown" uib-dropdown="" dropdown-append-to-body>' +
                                '    <button class="btn btn-xs btn-primary blue" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog"></i> ' + app.localize('操作') + ' <span class="caret"></span></button>' +
                                '    <ul uib-dropdown-menu>' +
                                '      <li><a ng-if="grid.appScope.permissions.edit" ng-click="grid.appScope.editUser(row.entity)">' + app.localize('编辑') + '</a></li>' +
                                '      <li><a ng-if="grid.appScope.permissions.delete" ng-click="grid.appScope.deleteUser(row.entity)">' + app.localize('删除') + '</a></li>' +
                                '    </ul>' +
                                '  </div>' +
                                '</div>'
                    },
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        if (!sortColumns.length || !sortColumns[0].field) {
                            vm.requestParams.sorting = null;
                        } else {
                            vm.requestParams.sorting = sortColumns[0].field + ' ' + sortColumns[0].sort.direction;
                        }

                        vm.getUsers();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        vm.requestParams.skipCount = (pageNumber - 1) * pageSize;
                        vm.requestParams.maxResultCount = pageSize;

                        vm.getUsers();
                    });
                },
                data: []
            };

            vm.getUsers = function () {
            	 
            	 
            	 if($("#userByRole").val()){  
            			 vm.requestParams.role = $("#userByRole").val().split(":")[1];
            		 }
            		 
            		  
            	 
               
            	vm.loading = true;
               
                userService.getUsers($.extend({ filter: vm.filterText }, vm.requestParams))
                    .then(function (result) {
                        vm.userGridOptions.totalItems = result.data.totalCount;
                        vm.userGridOptions.data = addRoleNamesField(result.data.items);
                    }).finally(function () {
                        vm.loading = false;
                    });
            };
            vm.reset = function () {
            	/*  $scope.names=[];
                 
                  roleService.getRoles({}).then(function (result) { 
                  	 $scope.names=result.data.items;  
                       
                      
                  });*/
                 $('#formName')[0].reset();  
            	vm.filterText = null; 
            	vm.requestParams.role ='';
            	vm.loading = true; 
                userService.getUsers($.extend({ filter: vm.filterText }, vm.requestParams))
                    .then(function (result) {
                        vm.userGridOptions.totalItems = result.data.totalCount;
                        vm.userGridOptions.data = addRoleNamesField(result.data.items);
                    }).finally(function () {
                        vm.loading = false;
                    });
            };
            $timeout(function () {
                $('.ui-grid-pager-control-input').attr('readonly', 'true');
                //$('.ui-grid-pager-control-input').on('keydown', function (event) {
                //   var s = event;
                //});
            });
            function addRoleNamesField(users) {
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    user.getRoleNames = function () {
                        var roleNames = '';
                        for (var j = 0; j < this.roles.length; j++) {
                            if (roleNames.length) {
                                roleNames = roleNames + ', ';
                            }
                            roleNames = roleNames + this.roles[j].roleName;
                        };

                        return roleNames;
                    }
                }

                return users;
            }

            vm.editUser = function (user) {
                openCreateOrEditUserModal(user.id);
            };

            vm.createUser = function () {
                openCreateOrEditUserModal(null);
            };

            vm.editPermissions = function (user) {
                $uibModal.open({
                    templateUrl: '/App/common/views/users/permissionsModal.html',
                    controller: 'common.views.users.permissionsModal as vm',
                    backdrop: 'static',
                    resolve: {
                        user: function () {
                            return user;
                        }
                    }
                });
            };

            vm.impersonate = function (user) {
                app.utils.removeCookie(abp.security.antiForgery.tokenCookieName);
                abp.ajax({
                    url: abp.appPath + 'Account/Impersonate',
                    data: JSON.stringify({
                        tenantId: abp.session.tenantId,
                        userId: user.id
                    })
                });
            };

            vm.deleteUser = function (user) {
                if (user.userName == app.consts.userManagement.defaultAdminUserName) {
                    abp.message.warn(app.localize("{0}UserCannotBeDeleted", app.consts.userManagement.defaultAdminUserName));
                    return;
                }

                abp.message.confirm(
                    app.localize('此角色将会被删除', user.userName),
                    function (isConfirmed) {
                        if (isConfirmed) {
                            userService.deleteUser({
                                id: user.id
                            }).then(function () {
                                vm.getUsers();
                                abp.notify.success(app.localize('成功删除'));
                            });
                        }
                    }
                );
            };

            vm.unlockUser = function (user) {
                userService.unlockUser({
                        id: user.id
                    })
                    .then(function() {
                        abp.notify.success("成功解锁用户", user.userName);
                    });
            };

            vm.lockoutEnabledUser = function (user) {
                userService.lockoutEnabledUser({
                        id: user.id
                    })
                    .then(function () {
                        abp.notify.success("成功启用登录保护", user.userName);
                    });
            };

            vm.lockoutDisabledUser = function (user) {
                userService.lockoutDisabledUser({
                        id: user.id
                    })
                    .then(function () {
                        abp.notify.success("成功禁用登录保护", user.userName);
                    });
            };
            vm.exportToExcel = function () {
                userService.getUsersToExcel({})
                    .then(function (result) {
                        app.downloadTempFile(result.data);
                    });
            };

            function openCreateOrEditUserModal(userId) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/common/views/users/createOrEditModal.html',
                    controller: 'common.views.users.createOrEditModal as vm',
                    backdrop: 'static',
                    resolve: {
                        userId: function () {
                            return userId;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    vm.getUsers();
                });
            }

            vm.getUsers();
        }]);
})();