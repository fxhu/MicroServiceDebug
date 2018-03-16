(function () {
    appModule.controller('common.views.users.createOrEditModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.user', 'userId', 'FileUploader', 'abp.services.app.profile', 'abp.services.app.organizationUnit',
        function ($scope, $uibModalInstance, userService, userId, fileUploader, profileService, organizationUnitService) {
            var vm = this;
            vm.abppath = null;
            vm.saving = false;
            vm.user = null;
            vm.profilePictureId = null;
            vm.roles = [];
            vm.setRandomPassword = (userId == null);
            vm.sendActivationEmail = (userId == null);
            vm.canChangeUserName = true;
            vm.isTwoFactorEnabled = abp.setting.getBoolean("Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled");
            vm.isLockoutEnabled = abp.setting.getBoolean("Abp.Zero.UserManagement.UserLockOut.IsEnabled");
            vm.shouldChangePasswordOnNextLoginEnabled = abp.setting.getBoolean("Abp.Zero.UserManagement.ShouldChangePasswordOnNextLogin.IsEnabled");
            vm.setRandomPasswordEnabled = abp.setting.getBoolean("Abp.Zero.UserManagement.SetRandomPassword.IsEnabled");
            var $jcropImage = null;
            vm.uploadedFileName = null;
            vm.uploader = new fileUploader({

                url: abp.appPath + 'Profile/UploadProfilePicture',
                headers: {
                    "X-XSRF-TOKEN": abp.security.antiForgery.getToken(),
                    "Authorization": tokens
                },
                queueLimit: 1,
                autoUpload: true,
                removeAfterUpload: true,
                filters: [{
                    name: 'imageFilter',
                    fn: function (item, options) {
                        //File type check
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        if ('|jpg|jpeg|png|gif|'.indexOf(type) === -1) {
                            abp.message.warn(app.localize('ProfilePicture_Warn_FileType'));
                            return false;
                        }

                        //File size check
                        if (item.size > 1048576) //1MB
                        {
                            abp.message.warn(app.localize('ProfilePicture_Warn_SizeLimit'));
                            return false;
                        }

                        return true;
                    }
                }]
            });
            vm.save = function () {
                vm.user.surname = vm.user.name;

                var assignedRoleNames = _.map(
                    _.where(vm.roles, { isAssigned: true }), //Filter assigned roles
                    function (role) {
                        return role.roleName; //Get names
                    });

                if (vm.setRandomPassword) {
                    vm.user.password = null;
                }

                vm.saving = true;
                userService.createOrUpdateUser({
                    user: vm.user,
                    assignedRoleNames: assignedRoleNames,
                    sendActivationEmail: vm.sendActivationEmail,
                    setRandomPassword: vm.setRandomPassword,
                    organizationId: vm.organizationTree.selectedOu.id
                }).then(function (result) {


                    if (!vm.uploadedFileName) {
                        abp.notify.info(app.localize('保存成功'));
                        $uibModalInstance.close();
                        return;
                    }

                    var resizeParams = {};
                    if ($jcropImage) {
                        resizeParams = $jcropImage.data("Jcrop").tellSelect();
                    }
                    var uid = result.data;
                    profileService.updateProfilePicture({
                        fileName: vm.uploadedFileName,
                        x: parseInt(resizeParams.x),
                        y: parseInt(resizeParams.y),
                        width: parseInt(resizeParams.w),
                        height: parseInt(resizeParams.h),
                        UserId: uid
                    }).then(function () {

                        try {
                            $jcropImage.data('Jcrop').destroy();
                            $jcropImage = null;
                        } catch (error) {

                        }

                        //$('#HeaderProfilePicture').attr('src', app.getUserProfilePicturePath());
                        //获取用户头像
                        var xmlhttp;
                        xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", abp.appPath + "Profile/GetProfilePictureByUserId?id=" + uid, true);
                        xmlhttp.responseType = "blob";
                        xmlhttp.onload = function () {
                            console.log(this);
                            if (this.status == 200) {
                                var blob = this.response;
                                if (vm.user.id != null) {
                                    try {
                                        var img = document.getElementById("UpdateUserHeaderProfilePicture");
                                        img.src = window.URL.createObjectURL(blob);
                                    } catch (error) {

                                    }
                                    try {
                                        var img = document.getElementById("AddUserHeaderProfilePicture");
                                        img.src = window.URL.createObjectURL(blob);
                                    } catch (error) {

                                    }
                                }
                                else {
                                    try {
                                        var img = document.getElementById("UpdateUserHeaderProfilePicture");
                                        img.src = window.URL.createObjectURL(blob);
                                    } catch (error) {

                                    }
                                    try {
                                        var img = document.getElementById("AddUserHeaderProfilePicture");
                                        img.src = window.URL.createObjectURL(blob);
                                    } catch (error) {

                                    }
                                }
                            }
                        }
                        xmlhttp.setRequestHeader("Authorization", tokens);
                        xmlhttp.send();
                    });
                    abp.notify.info(app.localize('保存成功'));
                    $uibModalInstance.close();
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            vm.getAssignedRoleCount = function () {
                return _.where(vm.roles, { isAssigned: true }).length;
            };
            vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                if (response.success) {
                    var $profilePictureResize = $('#ProfilePictureResize');

                    var newCanvasHeight = response.result.height * $profilePictureResize.width() / response.result.width;
                    $profilePictureResize.height(newCanvasHeight + 'px');

                    var profileFilePath = abp.appPath + 'Temp/Downloads/' + response.result.fileName + '?v=' + new Date().valueOf();
                    vm.uploadedFileName = response.result.fileName;

                    if ($jcropImage) {
                        $jcropImage.data('Jcrop').destroy();
                    }

                    $profilePictureResize.attr('src', profileFilePath);
                    $jcropImage = $profilePictureResize.Jcrop({
                        trueSize: [response.result.width, response.result.height],
                        setSelect: [0, 0, 100, 100],
                        aspectRatio: 1
                    });
                } else {
                    abp.message.error(response.error.message);
                }
            };
            function init() {
                vm.showorganization = false;
                vm.setRandomPassword=false;
                userService.getUserForEdit({
                    id: userId
                }).then(function (result) {
                    vm.user = result.data.user;
                    vm.profilePictureId = result.data.profilePictureId;
                    vm.abppath = abp.appPath + "Profile/GetProfilePictureById?id=" + vm.profilePictureId;
                    vm.user.passwordRepeat = vm.user.password;
                    vm.roles = result.data.roles;
                    vm.canChangeUserName = vm.user.userName != app.consts.userManagement.defaultAdminUserName;

                });
                if (userId == null) {
                    vm.user = {};
                    vm.user.surname = " ";
                    vm.showorganization = true;
                }
            }
            init();

            vm.permissions = {
                manageOrganizationTree: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManageOrganizationTree'),
                manageMembers: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManageMembers'),
                manageRoot: abp.auth.hasPermission('Pages.BasicData.organizationUnits.ManagingOrganizationTreeRoot')
            };
            vm.treeContainerClassName = "col-lg-12";
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
                            vm.treeContainerClassName = vm.canShowMemberList ? "col-lg-6" : "col-lg-12";
                        }
                    }
                },
                generateTextOnTree: function (ou) {
                    return '<span attr="' + ou.code + '" class="ou-text ou-text-has-members" data-ou-id="' + ou.id + '">' + ou.displayName + ' <i class="fa fa-caret-down text-muted"></i></span>';
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

            vm.organizationTree.init();
        }
    ]);
})();