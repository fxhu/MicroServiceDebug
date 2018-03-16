(function () {
    appModule.controller('common.views.layout.header', [
        '$rootScope', '$scope', '$uibModal', 'appSession', 'appUserNotificationHelper', 'abp.services.app.notification', 'abp.services.app.userLink', 'abp.services.app.userTask', 'abp.services.app.notice',
        function ($rootScope, $scope, $uibModal, appSession, appUserNotificationHelper, notificationService, userLinkService, userTaskService, noticeService) {
            var vm = this;
            vm.consts = {
                appPath: abp.appPath,
                friendshipState: app.consts.friendshipState
            };
            $scope.$on('$includeContentLoaded', function () {
                Layout.initHeader(); // init header
            });
            $scope.$on('noticeChangeEvent', function () {
                vm.loadUserNotices();
            });
            //var alarmEventPushHub = $.connection.alarmEventPushHub;
            //alarmEventPushHub.client.noticeCountChange = function (message) {
            //    vm.loadUserNotices();
            //};
            //获取用户头像
            var xmlhttp;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", abp.appPath + "Profile/GetProfilePicture", true);
            xmlhttp.responseType = "blob";
            xmlhttp.onload = function () {
                console.log(this);
                if (this.status == 200) {
                    var blob = this.response;
                    var img = document.getElementById("HeaderProfilePicture");
                    img.src = window.URL.createObjectURL(blob);
                }
            }
            xmlhttp.setRequestHeader("Authorization", tokens);
            xmlhttp.send();


            vm.languages = abp.localization.languages;
            vm.currentLanguage = abp.localization.currentLanguage;
            vm.isImpersonatedLogin = abp.session.impersonatorUserId;
            vm.notifications = [];
            vm.usertasks = [];
            vm.reportcompany = [];
            //witReport_blue/company/ReportHome.html?areaId=13
            vm.reporturl ="witReport_blue/company/ReportHome.html?areaId=";
            vm.unreadNotificationCount = 0;
            vm.unreadChatMessageCount = 0;
            vm.recentlyUsedLinkedUsers = [];
            vm.tenant = appSession.tenant;
            vm.username = "";
            vm.getShownUserName = function () {

                if (!abp.multiTenancy.isEnabled) {
                    return vm.username;
                    //return appSession.user.userName;
                } else {
                    if (appSession.tenant) {
                        return appSession.tenant.tenancyName + '.\\' + vm.username;
                        //return appSession.tenant.tenancyName + '\\' + appSession.user.userName;
                    } else {
                        return '.\\' + vm.username;
                        //return '.\\' + appSession.user.userName;
                    }
                }
            };

            vm.getShownLinkedUserName = function (linkedUser) {
                return app.getShownLinkedUserName(linkedUser);
            };

            vm.editMySettings = function () {
                $uibModal.open({
                    templateUrl: '/App/common/views/profile/mySettingsModal.html',
                    controller: 'common.views.profile.mySettingsModal as vm',
                    backdrop: 'static'
                });
            };


            //退出登录
            vm.logoutMyAccount = function () {
                abp.message.confirm(
                    '即将退出系统',
                    '',
                    function (isConfirmed) {

                        if (isConfirmed) {
                            window.localStorage.removeItem("applictionToken");
                            window.localStorage.removeItem("abpSessionUserId");
                            window.localStorage.removeItem("abpSessionUserRoles");
                            sessionStorage.clear();
                            localStorage.clear();
                            $.cookie('WeSafe.SessionId', null);
                            $.ajax({
                                url: authorityHost + "Account/Logout",
                                type: "post",
                                dataType: "json",
                                success: function (res) {
                                    console.log(res);
                                    window.location.href = "/index.html";
                                },
                                error: function (res) {
                                    console.log(res);
                                    window.location.href = "/index.html";
                                }
                            });
                            window.location.href = "/index.html";
                        }
                    }
                );

            };

            vm.changePassword = function () {
                $uibModal.open({
                    templateUrl: '/App/common/views/profile/changePassword.html',
                    controller: 'common.views.profile.changePassword as vm',
                    backdrop: 'static'
                });
            };

            vm.changePicture = function () {
                $uibModal.open({
                    templateUrl: '/App/common/views/profile/changePicture.html',
                    controller: 'common.views.profile.changePicture as vm',
                    backdrop: 'static'
                });
            };

            vm.changeLanguage = function (languageName) {
                location.href = abp.appPath + 'AbpLocalization/ChangeCulture?cultureName=' + languageName + '&returnUrl=' + window.location.pathname + window.location.hash;
            };

            vm.loadReportCompany = function () {
                userTaskService.getUserOrgsR({}).then(function (result) {
                    vm.reportcompany = result.data;
                });

            };

            vm.backToMyAccount = function () {
                abp.ajax({
                    url: abp.appPath + 'Account/BackToImpersonator'
                });
            }

            vm.loadUserTasks = function () {
                userTaskService.getCurrentUserTask({
                    maxResultCount: 5
                }).then(function (result) {
                    vm.undoUserTaskCount = result.data.undoCount;
                    vm.curTotaltasks = result.data.totalCount;
                    if (result.data.undoCount == 0) {
                        vm.undoStyle = "font-weight:900;color:white;";
                    } else {
                        vm.undoStyle = "font-weight:900;color:red;";
                    }
                    vm.usertasks = [];
                    $.each(result.data.items, function (index, item) {
                        item["userName"] = result.data.assignedPersonName[index];
                        vm.usertasks.push(item);

                    });
                });
            }


            vm.loadUserNotices = function () {
                noticeService.getCurrentUserNotice({
                    maxResultCount: 5
                }).then(function (result) {
                    vm.unreadUserNoticeCount = result.data.unreadCount;
                    vm.curTotalnotices = result.data.totalCount;
                    if (result.data.unreadCount == 0) {
                        vm.unredStyle = "font-weight:900;color:white;margin-right:3px;";
                    } else {
                        vm.unredStyle = "font-weight:900;color:orange;margin-right:3px;";
                    }
                    vm.usernotices = [];
                    $.each(result.data.items, function (index, item) {
                        item["userName"] = result.data.assignedPersonName[index];
                        vm.usernotices.push(item);
                    });

                });
            }

            var _urlMarkRead = 'Notice/MarkRead';
            var curNoticeId = 0;
            var curNoticeUrl = '';

            $(function(){
                $(document).click(function (e) {                   
                    if(e.target.className.includes('alink')===true)
                    {
                        //通过noticeid获取是否为外部链接或者内部链接，然后执行不同的跳转绑定；
                        //然后emit通知；
                        curNoticeId = e.target.id;
                        curNoticeUrl = e.target.value;
                        $.ajax({
                            url:abp.appPath + 'Notice/GetNoticeConfigInfomationByNoticeId/',
                            type:'POST',
                            data:{noticeId:e.target.id},
                            success:function(res){
                                if(res.success)
                                {
                                    //更新消息，发送更新通知
                                    $.ajax({
                                        url: abp.appPath +_urlMarkRead,
                                        type: 'POST',
                                        data: { id: curNoticeId },
                                        success: function (res) {
                                            var result = res.result;
                                            if (result.success) {
                                                //当前用户未读通知减1
                                                $rootScope.$emit("noticeChange");
                                            } else {
                                                abp.notify.info(result.msg);
                                            }
                                        }
                                    });
                                    
                                    //跳转
                                    var result = res.result;
                                    if(result.viewRedirect == "" || result == null)
                                    {
                                        window.location.href = curNoticeUrl;
                                    }
                                    else
                                    {
                                        window.location.href =window.location.pathname+ "#!/NoticeView?noticeId="+curNoticeId+"&url=" + base64encode("http://"+result.hostName + curNoticeUrl) ;
                                    }
                                    return;
                                }
                                else
                                {
                                    abp.notify.info(result.msg);
                                }
                            }
                        })
                    }
                })
            })

            vm.loadNotifications = function () {
                notificationService.getUserNotifications({
                    maxResultCount: 3
                }).then(function (result) {
                    vm.unreadNotificationCount = result.data.unreadCount;
                    vm.notifications = [];
                    $.each(result.data.items, function (index, item) {
                        vm.notifications.push(appUserNotificationHelper.format(item));
                    });
                });
            }

            vm.setAllNotificationsAsRead = function () {
                appUserNotificationHelper.setAllAsRead();
            };

            vm.setNotificationAsRead = function (userNotification) {
                appUserNotificationHelper.setAsRead(userNotification.userNotificationId);
            }

            vm.openNotificationSettingsModal = function () {
                appUserNotificationHelper.openSettingsModal();
            };

            vm.manageLinkedAccounts = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/common/views/profile/linkedAccountsModal.html',
                    controller: 'common.views.profile.linkedAccountsModal as vm',
                    backdrop: 'static'
                });

                modalInstance.result.finally(function () {
                    // vm.getRecentlyUsedLinkedUsers();
                });
            };

            vm.getRecentlyUsedLinkedUsers = function () {
                userLinkService.getRecentlyUsedLinkedUsers()
                    .then(function (result) {
                        vm.recentlyUsedLinkedUsers = result.data.items;
                    }).finally(function () {
                        vm.loading = false;
                    });
            }

            vm.switchToUser = function (linkedUser) {
                abp.ajax({
                    url: abp.appPath + 'Account/SwitchToLinkedAccount',
                    data: JSON.stringify({
                        targetUserId: linkedUser.id,
                        targetTenantId: linkedUser.tenantId
                    }),
                    success: function () {
                        app.utils.removeCookie(abp.security.antiForgery.tokenCookieName);
                    }
                });
            };

            vm.showLoginAttempts = function () {
                $uibModal.open({
                    templateUrl: '/App/common/views/users/loginAttemptsModal.html',
                    controller: 'common.views.users.loginAttemptsModal as vm',
                    backdrop: 'static'
                });
            };

            abp.event.on('abp.notifications.received', function (userNotification) {
                appUserNotificationHelper.show(userNotification);
                vm.loadNotifications();
                vm.loadUserNotices();
            });

            abp.event.on('app.notifications.refresh', function () {
                vm.loadNotifications();
            });

            abp.event.on('app.notifications.read', function (userNotificationId) {
                for (var i = 0; i < vm.notifications.length; i++) {
                    if (vm.notifications[i].userNotificationId == userNotificationId) {
                        vm.notifications[i].state = 'READ';
                    }
                }

                vm.unreadNotificationCount -= 1;
            });

            //Chat
            abp.event.on('app.chat.unreadMessageCountChanged', function (messageCount) {
                vm.unreadChatMessageCount = messageCount;
            });

            function init() {
                //vm.loadNotifications();
                //屏蔽获取最近用户
                //vm.getRecentlyUsedLinkedUsers();
                //屏蔽任务
                // vm.loadUserTasks();
                vm.loadUserNotices();
                vm.loadReportCompany();
                getUserName();
            }

            //直接通过后端接口获取用户姓名
            function getUserName() {
                vm.username=abp.session.userName;
                return;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    async: false,
                    url: abp.appPath + 'Application/GetUserName',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    success: function (data) {
                        if (data != null) {
                            vm.username = data.result.user.name;
                        }
                        console.log("请求成功");
                    },
                    error: function () {
                        console.log("请求失败");
                    },
                    complete: function () {
                        console.log("请求完成");
                    }
                });
            }

            init();

            var isConnected = false;
            var alarmEventPushHubUrl = "";

            function createNoticeAlphaSignalR() {
                abp.services.app.webSiteConfigService.getAlarmEventPushHubAddress({}).then(function (result) {
                    alarmEventPushHubUrl = result;
                    var connection;
                    connection = new signalR.HubConnection(alarmEventPushHubUrl);

                    abp.event.on('abp.signalr.connected',
                        function () {
                            alarmEventPushHub.server.sendAlarmEvent("警告消息推送连接!");
                        });


                    connection.on('OnNoticeEventPublished', data => {
                        console.log(data);
                        console.log('接收信息: ' + data);
                        //检查后再做提醒
                        if (CheckAssestOfUserDuty(data)) {
                            var obj = JSON.parse(data);
                            //做一些事情
                            NoticeEvent(obj);
                        }
                    });

                    connection.onClosed = e => {
                        if (e) {

                        } else {

                        }
                    }
                    connection.start()
                        .then(() => {
                            isConnected = true;
                        })
                        .catch(err => {

                        });
                });
            }

            createNoticeAlphaSignalR();

            function CheckAssestOfUserDuty(message) {
                var checkstate = false;
                var obj = JSON.parse(message);
                for (var i = 0; i < obj.userIds.length; i++) {
                    if (obj.userIds[i] == abp.session.userId) {
                        return true;
                    }
                }
                return checkstate;
            }


            function NoticeEvent(data) {
                //提醒动作
                vm.loadUserNotices();
                abp.notify.info(data.NoticeMessage);
            }

        }
    ]);
})();