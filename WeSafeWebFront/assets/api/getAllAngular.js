(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.menuCustomService', [
		'$http',
		function($http) {
			return new function() {
				this.getMenu = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/menuCustomService/GetMenu',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getCurrentLoginInRoleId = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/menuCustomService/GetCurrentLoginInRoleId',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.userTask', [
		'$http',
		function($http) {
			return new function() {
				this.getUserTask = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetUserTask',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};
 				this.getUserOrgsR = function (httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'UserTask/GetAllOrgs',
                        method: 'GET',
                        data: JSON.stringify({})
                    }, httpParams));
                };
				this.getUserTasks = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetUserTasks',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createUserTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/CreateUserTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateUserTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/UpdateUserTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getUserTaskById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetUserTaskById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteUserTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/DeleteUserTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getDetail = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetDetail',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.create = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Create',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllTest = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetAllTest',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.cancel = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Cancel',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOne = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/CreateOne',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateOne = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/UpdateOne',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.enabled = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Enabled',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.disabled = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Disabled',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.get = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Get?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this['delete'] = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/Delete',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getCurrentUserTask = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userTask/GetCurrentUserTask',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.timing', [
		'$http',
		function($http) {
			return new function() {
				this.getTimezones = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/timing/GetTimezones',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTimezoneComboboxItems = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/timing/GetTimezoneComboboxItems',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.deviceAccessNodeInfo', [
		'$http',
		function($http) {
			return new function() {
				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.get = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Get?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.create = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Create',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getById = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/GetById?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.update = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Update',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.deviceInfo', [
		'$http',
		function($http) {
			return new function() {
				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.get = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/Get?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.create = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/Create',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getById = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/GetById?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.update = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/Update',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createDeviceInfo = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/deviceInfo/CreateDeviceInfo',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.terminal', [
		'$http',
		function($http) {
			return new function() {
				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.get = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/Get?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getTerminalDto = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/GetTerminalDto',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.update = function(model, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/Update',
						method: 'POST',
						data: JSON.stringify(model)
					}, httpParams));
				};

				this.create = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/Create',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createDeviceInfo = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/CreateDeviceInfo',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createTerminalAndDeviceInfo = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/terminal/CreateTerminalAndDeviceInfo',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.tenantDashboard', [
		'$http',
		function($http) {
			return new function() {
				this.getMemberActivity = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenantDashboard/GetMemberActivity',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.notification', [
		'$http',
		function($http) {
			return new function() {
				this.getUserNotifications = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/GetUserNotifications',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.setAllNotificationsAsRead = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/SetAllNotificationsAsRead',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.setNotificationAsRead = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/SetNotificationAsRead',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getNotificationSettings = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/GetNotificationSettings',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.updateNotificationSettings = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/UpdateNotificationSettings',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.notificationUsersWhoHaveOpenTask = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notification/NotificationUsersWhoHaveOpenTask',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.tenant', [
		'$http',
		function($http) {
			return new function() {
				this.getTenants = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/GetTenants',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createTenant = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/CreateTenant',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTenantForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/GetTenantForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateTenant = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/UpdateTenant',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteTenant = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/DeleteTenant',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTenantFeaturesForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/GetTenantFeaturesForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateTenantFeatures = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/UpdateTenantFeatures',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.resetTenantSpecificFeatures = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/ResetTenantSpecificFeatures',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.unlockTenantAdmin = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenant/UnlockTenantAdmin',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.webLog', [
		'$http',
		function($http) {
			return new function() {
				this.getLatestWebLogs = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/webLog/GetLatestWebLogs',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.downloadWebLogs = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/webLog/DownloadWebLogs',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.language', [
		'$http',
		function($http) {
			return new function() {
				this.getLanguages = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/GetLanguages',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getLanguageForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/GetLanguageForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOrUpdateLanguage = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/CreateOrUpdateLanguage',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteLanguage = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/DeleteLanguage',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.setDefaultLanguage = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/SetDefaultLanguage',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getLanguageTexts = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/GetLanguageTexts',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateLanguageText = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/language/UpdateLanguageText',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.webSiteConfigService', [
		'$http',
		function($http) {
			return new function() {
				this.getWebSiteLinkstarHostAddress = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/webSiteConfigService/GetWebSiteLinkstarHostAddress',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getWebSiteVedioHostAddress = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/webSiteConfigService/GetWebSiteVedioHostAddress',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAlarmEventPushHubAddress = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/webSiteConfigService/GetAlarmEventPushHubAddress',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
                };
                
                this.getManageEventPushHubAddress = function (httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'api/services/app/webSiteConfigService/GetManageEventPushHubAddress',
                        method: 'POST',
                        data: JSON.stringify({})
                    }, httpParams));
                };
			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.assestType', [
		'$http',
		function($http) {
			return new function() {
				this.getRemoteGetTypes = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assestType/GetRemoteGetTypes',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.session', [
		'$http',
		function($http) {
			return new function() {
				this.getCurrentLoginInformations = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/session/GetCurrentLoginInformations',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getCurrentLoginInRoleId = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/session/GetCurrentLoginInRoleId',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.plan', [
		'$http',
		function($http) {
			return new function() {
				this.save = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/Save',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.addPlan = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/AddPlan',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getSection = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/GetSection?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.delPlan = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/DelPlan?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
                };

				this.delSection = function(folderName, sectionName, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/DelSection?folderName=' + encodeURIComponent(folderName) + '&sectionName=' + encodeURIComponent(sectionName) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.renamePlan = function(id, name, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/RenamePlan?id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getPlan = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/GetPlan?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAreas = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/plan/GetAreas',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

                this.getUserAreas = function (httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'api/services/app/plan/GetUserAreas',
                        method: 'POST',
                        data: JSON.stringify({})
                    }, httpParams));
                };
			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.planTemplate', [
		'$http',
		function($http) {
			return new function() {
				this.getTemplateList = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/GetTemplateList',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getList = function(searchInfo, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/GetList?searchInfo=' + encodeURIComponent(searchInfo) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
                };

				this.getTmplate = function(folderName, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/GetTmplate?folderName=' + encodeURIComponent(folderName) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.save = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/Save',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

                this.createPlanFromTemplate = function (name, httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'api/services/app/plan/CreatePlanFromTemplate?planName=' + encodeURIComponent(name) + '',
                        method: 'POST',
                        data: JSON.stringify({})
                    }, httpParams));
                };

				this.getSections = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/GetSections',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.renamePlanTemplate = function(oldName, newName, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/RenamePlanTemplate?oldName=' + encodeURIComponent(oldName) + '&newName=' + encodeURIComponent(newName) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.delTemplate = function(folderName, name, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/DelTemplate?folderName=' + encodeURIComponent(folderName) + '&name=' + encodeURIComponent(name) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.delTemplateFolder = function(folderName, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/DelTemplateFolder?folderName=' + encodeURIComponent(folderName) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.addTemplate = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/planTemplate/AddTemplate',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.patrol', [
		'$http',
		function($http) {
			return new function() {
				this.getAssests = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetAssests',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getPointList = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetPointList',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getPathList = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetPathList',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.addPoint = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AddPoint',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deletePoint = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/DeletePoint',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deletePath = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/DeletePath',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deletePlan = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/DeletePlan',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateTypeGroup = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/UpdateTypeGroup',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.addPlan = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AddPlan',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.creatOrGetGroupByAreaId = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/CreatOrGetGroupByAreaId',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getPointById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetPointById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editPoint = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/EditPoint',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getPathById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetPathById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editPath = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/EditPath',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getPlanById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetPlanById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editPlan = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/EditPlan',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTaskById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.auditTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AuditTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.isHaveCheckItem = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/IsHaveCheckItem',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTaskAndItemsById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskAndItemsById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.savePointItem = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/SavePointItem',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.setTaskStatus = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/SetTaskStatus',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.reviewTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/ReviewTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAessetInPoint = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetAessetInPoint',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAllKeyAreas = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetAllKeyAreas',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAllUsers = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetAllUsers',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.creatTypeGroup = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/CreatTypeGroup',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteTypeGroup = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/DeleteTypeGroup',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.autoCreatGroup = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AutoCreatGroup',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.autoCreatTypeGroup = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AutoCreatTypeGroup',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.autoCreatPlan = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AutoCreatPlan',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTaskStatistics = function(startTime, endTime, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskStatistics?startTime=' + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getTaskUserStatistics = function(startTime, endTime, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskUserStatistics?startTime=' + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getTaskAreaStatistics = function(startTime, endTime, areaId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskAreaStatistics?startTime=' + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + '&areaId=' + areaId,
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getGroupById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetGroupById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updatePlanActive = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/UpdatePlanActive',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getTaskListAndAllItems = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/GetTaskListAndAllItems',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.addTemporaryTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/AddTemporaryTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editTask = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/patrol/EditTask',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.troubles', [
		'$http',
		function($http) {
			return new function() {
				this.getAllTroubles = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetAllTroubles',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.addHiddenTrouble = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/AddHiddenTrouble',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editHiddenTrouble = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/EditHiddenTrouble',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.rectifyHiddenTrouble = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/RectifyHiddenTrouble',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.reviewHiddenTrouble = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/ReviewHiddenTrouble',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllUses = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetAllUses',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAllKeyAreas = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetAllKeyAreas',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getOneTrouble = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetOneTrouble',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getFilePaths = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetFilePaths',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editTroubleStauts = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/EditTroubleStauts',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllAreaUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/GetAllAreaUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};
				this.assignPerson = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/troubles/AssignPerson',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.dangerous', [
		'$http',
		function($http) {
			return new function() {
				this.serchDgGoodAsync = function(info, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/SerchDgGoodAsync',
						method: 'POST',
						data: JSON.stringify(info)
					}, httpParams));
				};

				this.getAllGoodAsync = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/GetAllGoodAsync',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.editDgGoodAsync = function(dg, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/EditDgGoodAsync',
						method: 'POST',
						data: JSON.stringify(dg)
					}, httpParams));
				};

				this.addDgGoodAsync = function(dg, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/AddDgGoodAsync',
						method: 'POST',
						data: JSON.stringify(dg)
					}, httpParams));
				};

				this.serchDgOperationAsync = function(info, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/SerchDgOperationAsync',
						method: 'POST',
						data: JSON.stringify(info)
					}, httpParams));
				};

				this.getallOperationAsync = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/GetallOperationAsync',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.editDgOperationAsync = function(dgo, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/EditDgOperationAsync',
						method: 'POST',
						data: JSON.stringify(dgo)
					}, httpParams));
				};

				this.addDgOperationAsync = function(dgo, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/dangerous/AddDgOperationAsync',
						method: 'POST',
						data: JSON.stringify(dgo)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.organizationUnit', [
		'$http',
		function($http) {
			return new function() {
				this.getOrganizationUnits = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnits',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getOrganizationUnitsById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnitsById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getOrganizationUnitUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnitUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/CreateOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/UpdateOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.moveOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/MoveOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/DeleteOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.addUserToOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/AddUserToOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.removeUserFromOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/RemoveUserFromOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.isInOrganizationUnit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/organizationUnit/IsInOrganizationUnit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.notice', [
		'$http',
		function($http) {
			return new function() {
				this.getNotice = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetNotice',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getNotices = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetNotices',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createNotice = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/CreateNotice',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateNotice = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/UpdateNotice',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getNoticeById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetNoticeById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteNotice = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/DeleteNotice',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getDetail = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetDetail',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.create = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Create',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllTest = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetAllTest',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.cancel = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Cancel',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOne = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/CreateOne',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateOne = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/UpdateOne',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.enabled = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Enabled',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.disabled = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Disabled',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.get = function(id, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Get?id=' + encodeURIComponent(id) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this['delete'] = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/Delete',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getCurrentUserNotice = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetCurrentUserNotice',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getNoticeById = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/GetNoticeById',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.checkRiskStatus = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/notice/CheckRiskStatus',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.friendship', [
		'$http',
		function($http) {
			return new function() {
				this.createFriendshipRequest = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/friendship/CreateFriendshipRequest',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createFriendshipRequestByUserName = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/friendship/CreateFriendshipRequestByUserName',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.blockUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/friendship/BlockUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.unblockUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/friendship/UnblockUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.acceptFriendshipRequest = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/friendship/AcceptFriendshipRequest',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.edition', [
		'$http',
		function($http) {
			return new function() {
				this.getEditions = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/edition/GetEditions',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getEditionForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/edition/GetEditionForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOrUpdateEdition = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/edition/CreateOrUpdateEdition',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteEdition = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/edition/DeleteEdition',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getEditionComboboxItems = function(selectedEditionId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/edition/GetEditionComboboxItems?selectedEditionId=' + encodeURIComponent(selectedEditionId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.tenantSettings', [
		'$http',
		function($http) {
			return new function() {
				this.getAllSettings = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenantSettings/GetAllSettings',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.updateAllSettings = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenantSettings/UpdateAllSettings',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.clearLogo = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenantSettings/ClearLogo',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.clearCustomCss = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/tenantSettings/ClearCustomCss',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.hostSettings', [
		'$http',
		function($http) {
			return new function() {
				this.getAllSettings = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/hostSettings/GetAllSettings',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.updateAllSettings = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/hostSettings/UpdateAllSettings',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.sendTestEmail = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/hostSettings/SendTestEmail',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.commonLookup', [
		'$http',
		function($http) {
			return new function() {
				this.getEditionsForCombobox = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/commonLookup/GetEditionsForCombobox',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.findUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/commonLookup/FindUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getDefaultEditionName = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/commonLookup/GetDefaultEditionName',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.chat', [
		'$http',
		function($http) {
			return new function() {
				this.getUserChatFriendsWithSettings = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/chat/GetUserChatFriendsWithSettings',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getUserChatMessages = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/chat/GetUserChatMessages',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.markAllUnreadMessagesOfUserAsRead = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/chat/MarkAllUnreadMessagesOfUserAsRead',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.caching', [
		'$http',
		function($http) {
			return new function() {
				this.getAllCaches = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/caching/GetAllCaches',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.clearCache = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/caching/ClearCache',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.clearAllCaches = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/caching/ClearAllCaches',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.officeAreaResponsible', [
		'$http',
		function($http) {
			return new function() {
				this.getAllTest = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaResponsible/GetAllTest',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAll = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaResponsible/GetAll',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this['delete'] = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaResponsible/Delete',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.officeAreaCharge', [
		'$http',
		function($http) {
			return new function() {
				this.getOfficeAreas = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeAreas',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getOfficeChargeUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeChargeUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOfficeArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/CreateOfficeArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateOfficeArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/UpdateOfficeArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
                };

                this.getAllOfficeAreaPlan = function (id, httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllOfficeAreaPlan?id=' + encodeURIComponent(id) + '',
                        method: 'POST',
                        data: JSON.stringify({})
                    }, httpParams));
                };

                this.saveOfficeAreaPlan = function (input, httpParams) {
                    return $http(angular.extend({
                        url: abp.appPath + 'api/services/app/officeAreaCharge/SaveOfficeAreaPlan',
                        method: 'POST',
                        data: JSON.stringify(input)
                    }, httpParams));
                };

				this.getOfficeAreaById = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeAreaById',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteOfficeArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/DeleteOfficeArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.addChargeToOfficeArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/AddChargeToOfficeArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllUsers = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllUsers',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAllOrganizationUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllOrganizationUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateKeyArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/UpdateKeyArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllChildArea = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllChildArea',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.camera', [
		'$http',
		function($http) {
			return new function() {
				this.addCamera = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/camera/AddCamera',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.editCamera = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/camera/EditCamera',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.userLink', [
		'$http',
		function($http) {
			return new function() {
				this.linkToUser = function(linkToUserInput, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userLink/LinkToUser',
						method: 'POST',
						data: JSON.stringify(linkToUserInput)
					}, httpParams));
				};

				this.getLinkedUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userLink/GetLinkedUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getRecentlyUsedLinkedUsers = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userLink/GetRecentlyUsedLinkedUsers',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.unlinkUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userLink/UnlinkUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.userLogin', [
		'$http',
		function($http) {
			return new function() {
				this.getRecentUserLoginAttempts = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/userLogin/GetRecentUserLoginAttempts',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.user', [
		'$http',
		function($http) {
			return new function() {
				this.getUsers = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/PostGetUsers',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getUsersToExcel = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/GetUsersToExcel',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getUserForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/GetUserForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getUserPermissionsForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/GetUserPermissionsForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.resetUserSpecificPermissions = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/ResetUserSpecificPermissions',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateUserPermissions = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/UpdateUserPermissions',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOrUpdateUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/CreateOrUpdateUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/DeleteUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.unlockUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/UnlockUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.lockoutEnabledUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/LockoutEnabledUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.lockoutDisabledUser = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/LockoutDisabledUser',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getUserName = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/user/GetUserName',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.profile', [
		'$http',
		function($http) {
			return new function() {
				this.getCurrentUserProfileForEdit = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/profile/GetCurrentUserProfileForEdit',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.updateCurrentUserProfile = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/profile/UpdateCurrentUserProfile',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.changePassword = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/profile/ChangePassword',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateProfilePicture = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/profile/UpdateProfilePicture',
						method: 'POST',
						headers: {
							"Authorization": tokens
						},
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getPasswordComplexitySetting = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/profile/GetPasswordComplexitySetting',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.role', [
		'$http',
		function($http) {
			return new function() {
				this.getRoles = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/role/PostGetRoles',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getRoleForEdit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/role/GetRoleForEdit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.createOrUpdateRole = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/role/CreateOrUpdateRole',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.deleteRole = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/role/DeleteRole',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.permission', [
		'$http',
		function($http) {
			return new function() {
				this.getAllPermissions = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/permission/GetAllPermissions',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.auditLog', [
		'$http',
		function($http) {
			return new function() {
				this.getAuditLogs = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/auditLog/GetAuditLogs',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAuditLogsToExcel = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/auditLog/GetAuditLogsToExcel',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.assertDetialsService', [
		'$http',
		function($http) {
			return new function() {
				this.getLatestAssertDetial = function(dId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assertDetialsService/GetLatestAssertDetial?dId=' + encodeURIComponent(dId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDeviceCheckHis = function(dId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceCheckHis?dId=' + encodeURIComponent(dId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDeviceReplaceHis = function(dId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceReplaceHis?dId=' + encodeURIComponent(dId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDeviceMaintainHis = function(dId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceMaintainHis?dId=' + encodeURIComponent(dId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDeviceInspectHis = function(dId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceInspectHis?dId=' + encodeURIComponent(dId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.alarms', [
		'$http',
		function($http) {
			return new function() {
				this.getRangeData = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/GetRangeData',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllPieData = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/GetAllPieData',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getAllArea = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/GetAllArea',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.alarmAudit = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/AlarmAudit',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.receiveAlarmEvent = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/ReceiveAlarmEvent',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.notConfirmEventsPopupWindow = function(connectionId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/NotConfirmEventsPopupWindow?connectionId=' + encodeURIComponent(connectionId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.confirmAlarmEvent = function(alarmId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/ConfirmAlarmEvent?alarmId=' + encodeURIComponent(alarmId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.falseReportAlarmEvent = function(alarmId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/FalseReportAlarmEvent?alarmId=' + encodeURIComponent(alarmId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.alarmHandle = function(alarmId, falseReport, auditMessage, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/AlarmHandle?alarmId=' + encodeURIComponent(alarmId) + '&falseReport=' + encodeURIComponent(falseReport) + '&auditMessage=' + encodeURIComponent(auditMessage) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.brokenDelayCheck = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/BrokenDelayCheck',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAlarmInfo = function(alarmId, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/alarms/GetAlarmInfo?alarmId=' + encodeURIComponent(alarmId) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));

(function(abp, angular) {

	if(!angular) {
		return;
	}

	var abpModule = angular.module('abp');

	abpModule.factory('abp.services.app.safeAssess', [
		'$http',
		function($http) {
			return new function() {
				this.reAssess = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/ReAssess',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateAreaAssess = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/UpdateAreaAssess',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.updateRatio = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/UpdateRatio',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getParents = function(input, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetParents',
						method: 'POST',
						data: JSON.stringify(input)
					}, httpParams));
				};

				this.getCheckItem = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetCheckItem',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getGoodsStatusScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetGoodsStatusScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getCheckResultScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetCheckResultScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDangerousGoodsScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetDangerousGoodsScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getDangerousOperationsScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetDangerousOperationsScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getPatrolTaskScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetPatrolTaskScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getTrainNumberScore = function(httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetTrainNumberScore',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

				this.getAreaScore = function(areaIds, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetAreaScore',
						method: 'POST',
						data: JSON.stringify(areaIds)
					}, httpParams));
				};

				this.getAreaAssess = function(areaID, httpParams) {
					return $http(angular.extend({
						url: abp.appPath + 'api/services/app/safeAssess/GetAreaAssess?areaID=' + encodeURIComponent(areaID) + '',
						method: 'POST',
						data: JSON.stringify({})
					}, httpParams));
				};

			};
		}
	]);

})((abp || (abp = {})), (angular || undefined));