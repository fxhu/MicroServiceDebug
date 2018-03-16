(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.menuCustomService');

    serviceNamespace.getMenu = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/menuCustomService/GetMenu',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams)); createPlanFromTemplate
    };

    serviceNamespace.getCurrentLoginInRoleId = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/menuCustomService/GetCurrentLoginInRoleId',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.userTask');

    serviceNamespace.getUserTask = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetUserTask',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserTasks = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetUserTasks',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createUserTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/CreateUserTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateUserTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/UpdateUserTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getUserTaskById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetUserTaskById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteUserTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/DeleteUserTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getDetail = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetDetail',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.create = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Create',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllTest = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetAllTest',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.cancel = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Cancel',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOne = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/CreateOne',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateOne = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/UpdateOne',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.enabled = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Enabled',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.disabled = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Disabled',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.get = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Get?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace['delete'] = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/Delete',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getCurrentUserTask = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userTask/GetCurrentUserTask',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.timing');

    serviceNamespace.getTimezones = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/timing/GetTimezones',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTimezoneComboboxItems = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/timing/GetTimezoneComboboxItems',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.deviceAccessNodeInfo');

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.get = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Get?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.create = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Create',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getById = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/GetById?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.update = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceAccessNodeInfo/Update',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.deviceInfo');

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.get = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/Get?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.create = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/Create',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getById = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/GetById?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.update = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/Update',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createDeviceInfo = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/deviceInfo/CreateDeviceInfo',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.terminal');

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.get = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/Get?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getTerminalDto = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/GetTerminalDto',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.update = function(model, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/Update',
            type: 'POST',
            data: JSON.stringify(model)
        }, ajaxParams));
    };

    serviceNamespace.create = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/Create',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createDeviceInfo = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/CreateDeviceInfo',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createTerminalAndDeviceInfo = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/terminal/CreateTerminalAndDeviceInfo',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.tenantDashboard');

    serviceNamespace.getMemberActivity = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenantDashboard/GetMemberActivity',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.notification');

    serviceNamespace.getUserNotifications = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/GetUserNotifications',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.setAllNotificationsAsRead = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/SetAllNotificationsAsRead',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.setNotificationAsRead = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/SetNotificationAsRead',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getNotificationSettings = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/GetNotificationSettings',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateNotificationSettings = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/UpdateNotificationSettings',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.notificationUsersWhoHaveOpenTask = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notification/NotificationUsersWhoHaveOpenTask',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.tenant');

    serviceNamespace.getTenants = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/GetTenants',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createTenant = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/CreateTenant',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTenantForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/GetTenantForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateTenant = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/UpdateTenant',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteTenant = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/DeleteTenant',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTenantFeaturesForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/GetTenantFeaturesForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateTenantFeatures = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/UpdateTenantFeatures',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.resetTenantSpecificFeatures = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/ResetTenantSpecificFeatures',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.unlockTenantAdmin = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenant/UnlockTenantAdmin',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.webLog');

    serviceNamespace.getLatestWebLogs = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webLog/GetLatestWebLogs',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.downloadWebLogs = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webLog/DownloadWebLogs',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.language');

    serviceNamespace.getLanguages = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/GetLanguages',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getLanguageForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/GetLanguageForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOrUpdateLanguage = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/CreateOrUpdateLanguage',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteLanguage = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/DeleteLanguage',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.setDefaultLanguage = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/SetDefaultLanguage',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getLanguageTexts = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/GetLanguageTexts',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateLanguageText = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/language/UpdateLanguageText',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.webSiteConfigService');

    serviceNamespace.getWebSiteLinkstarHostAddress = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webSiteConfigService/GetWebSiteLinkstarHostAddress',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getWebSiteVedioHostAddress = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webSiteConfigService/GetWebSiteVedioHostAddress',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAlarmEventPushHubAddress = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webSiteConfigService/GetAlarmEventPushHubAddress',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getManageEventPushHubAddress = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/webSiteConfigService/GetManageEventPushHubAddress',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };
})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.assestType');

    serviceNamespace.getRemoteGetTypes = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assestType/GetRemoteGetTypes',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.session');

    serviceNamespace.getCurrentLoginInformations = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/session/GetCurrentLoginInformations',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCurrentLoginInRoleId = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/session/GetCurrentLoginInRoleId',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.plan');

    serviceNamespace.save = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/Save',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addPlan = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/AddPlan',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getSection = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/GetSection?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.delPlan = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/DelPlan?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.delSection = function(folderName, sectionName, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/DelSection?folderName=' + encodeURIComponent(folderName) + '&sectionName=' + encodeURIComponent(sectionName) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.renamePlan = function(id, name, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/RenamePlan?id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };
    
    serviceNamespace.getPlan = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/GetPlan?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAreas = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/GetAreas',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserAreas = function (ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/GetUserAreas',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };
})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.planTemplate');

    serviceNamespace.getTemplateList = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/GetTemplateList',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getList = function(searchInfo, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/GetList?searchInfo=' + encodeURIComponent(searchInfo) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getTmplate = function(folderName, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/GetTmplate?folderName=' + encodeURIComponent(folderName) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.save = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/Save',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createPlanFromTemplate = function (name, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/plan/CreatePlanFromTemplate?planName=' + encodeURIComponent(name) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getSections = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/GetSections',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.renamePlanTemplate = function(oldName, newName, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/RenamePlanTemplate?oldName=' + encodeURIComponent(oldName) + '&newName=' + encodeURIComponent(newName) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.delTemplate = function(folderName, name, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/DelTemplate?folderName=' + encodeURIComponent(folderName) + '&name=' + encodeURIComponent(name) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.delTemplateFolder = function(folderName, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/DelTemplateFolder?folderName=' + encodeURIComponent(folderName) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addTemplate = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/planTemplate/AddTemplate',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.patrol');

    serviceNamespace.getAssests = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetAssests',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPointList = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetPointList',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getPathList = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetPathList',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addPoint = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AddPoint',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deletePoint = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/DeletePoint',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deletePath = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/DeletePath',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deletePlan = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/DeletePlan',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateTypeGroup = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/UpdateTypeGroup',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addPlan = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AddPlan',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.creatOrGetGroupByAreaId = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/CreatOrGetGroupByAreaId',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPointById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetPointById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editPoint = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/EditPoint',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPathById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetPathById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editPath = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/EditPath',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPlanById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetPlanById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editPlan = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/EditPlan',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTaskById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetTaskById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.auditTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AuditTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.isHaveCheckItem = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/IsHaveCheckItem',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTaskAndItemsById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetTaskAndItemsById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.savePointItem = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/SavePointItem',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.setTaskStatus = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/SetTaskStatus',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.reviewTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/ReviewTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAessetInPoint = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetAessetInPoint',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAllKeyAreas = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetAllKeyAreas',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAllUsers = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetAllUsers',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.creatTypeGroup = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/CreatTypeGroup',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteTypeGroup = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/DeleteTypeGroup',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.autoCreatGroup = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AutoCreatGroup',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.autoCreatTypeGroup = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AutoCreatTypeGroup',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.autoCreatPlan = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AutoCreatPlan',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTaskStatistics = function(startTime, endTime, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetTaskStatistics?startTime=' + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getGroupById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetGroupById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updatePlanActive = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/UpdatePlanActive',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getTaskListAndAllItems = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/GetTaskListAndAllItems',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addTemporaryTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/AddTemporaryTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editTask = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/patrol/EditTask',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.troubles');

    serviceNamespace.getAllTroubles = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetAllTroubles',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.addHiddenTrouble = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/AddHiddenTrouble',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editHiddenTrouble = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/EditHiddenTrouble',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.rectifyHiddenTrouble = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/RectifyHiddenTrouble',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.reviewHiddenTrouble = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/ReviewHiddenTrouble',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllUses = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetAllUses',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAllKeyAreas = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetAllKeyAreas',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getOneTrouble = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetOneTrouble',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getFilePaths = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetFilePaths',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editTroubleStauts = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/EditTroubleStauts',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllAreaUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/troubles/GetAllAreaUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.dangerous');

    serviceNamespace.serchDgGoodAsync = function(info, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/SerchDgGoodAsync',
            type: 'POST',
            data: JSON.stringify(info)
        }, ajaxParams));
    };

    serviceNamespace.getAllGoodAsync = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/GetAllGoodAsync',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.editDgGoodAsync = function(dg, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/EditDgGoodAsync',
            type: 'POST',
            data: JSON.stringify(dg)
        }, ajaxParams));
    };

    serviceNamespace.addDgGoodAsync = function(dg, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/AddDgGoodAsync',
            type: 'POST',
            data: JSON.stringify(dg)
        }, ajaxParams));
    };

    serviceNamespace.serchDgOperationAsync = function(info, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/SerchDgOperationAsync',
            type: 'POST',
            data: JSON.stringify(info)
        }, ajaxParams));
    };

    serviceNamespace.getallOperationAsync = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/GetallOperationAsync',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.editDgOperationAsync = function(dgo, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/EditDgOperationAsync',
            type: 'POST',
            data: JSON.stringify(dgo)
        }, ajaxParams));
    };

    serviceNamespace.addDgOperationAsync = function(dgo, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/dangerous/AddDgOperationAsync',
            type: 'POST',
            data: JSON.stringify(dgo)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.organizationUnit');

    serviceNamespace.getOrganizationUnits = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnits',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getOrganizationUnitsById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnitsById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getOrganizationUnitUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/GetOrganizationUnitUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/CreateOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/UpdateOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.moveOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/MoveOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/DeleteOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addUserToOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/AddUserToOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.removeUserFromOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/RemoveUserFromOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.isInOrganizationUnit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/organizationUnit/IsInOrganizationUnit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.notice');

    serviceNamespace.getNotice = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetNotice',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getNotices = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetNotices',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createNotice = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/CreateNotice',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateNotice = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/UpdateNotice',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getNoticeById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetNoticeById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteNotice = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/DeleteNotice',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getDetail = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetDetail',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.create = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Create',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllTest = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetAllTest',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.cancel = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Cancel',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOne = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/CreateOne',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateOne = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/UpdateOne',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.enabled = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Enabled',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.disabled = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Disabled',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.get = function(id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Get?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace['delete'] = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/Delete',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getCurrentUserNotice = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetCurrentUserNotice',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getNoticeById = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/GetNoticeById',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.checkRiskStatus = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/notice/CheckRiskStatus',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.friendship');

    serviceNamespace.createFriendshipRequest = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/friendship/CreateFriendshipRequest',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createFriendshipRequestByUserName = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/friendship/CreateFriendshipRequestByUserName',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.blockUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/friendship/BlockUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.unblockUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/friendship/UnblockUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.acceptFriendshipRequest = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/friendship/AcceptFriendshipRequest',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.edition');

    serviceNamespace.getEditions = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/edition/GetEditions',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getEditionForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/edition/GetEditionForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOrUpdateEdition = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/edition/CreateOrUpdateEdition',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteEdition = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/edition/DeleteEdition',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getEditionComboboxItems = function(selectedEditionId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/edition/GetEditionComboboxItems?selectedEditionId=' + encodeURIComponent(selectedEditionId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.tenantSettings');

    serviceNamespace.getAllSettings = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenantSettings/GetAllSettings',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateAllSettings = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenantSettings/UpdateAllSettings',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.clearLogo = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenantSettings/ClearLogo',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.clearCustomCss = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/tenantSettings/ClearCustomCss',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.hostSettings');

    serviceNamespace.getAllSettings = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/hostSettings/GetAllSettings',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateAllSettings = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/hostSettings/UpdateAllSettings',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.sendTestEmail = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/hostSettings/SendTestEmail',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.commonLookup');

    serviceNamespace.getEditionsForCombobox = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/commonLookup/GetEditionsForCombobox',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.findUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/commonLookup/FindUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getDefaultEditionName = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/commonLookup/GetDefaultEditionName',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.chat');

    serviceNamespace.getUserChatFriendsWithSettings = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/chat/GetUserChatFriendsWithSettings',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserChatMessages = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/chat/GetUserChatMessages',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.markAllUnreadMessagesOfUserAsRead = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/chat/MarkAllUnreadMessagesOfUserAsRead',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.caching');

    serviceNamespace.getAllCaches = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/caching/GetAllCaches',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.clearCache = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/caching/ClearCache',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.clearAllCaches = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/caching/ClearAllCaches',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.officeAreaResponsible');

    serviceNamespace.getAllTest = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaResponsible/GetAllTest',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAll = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaResponsible/GetAll',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace['delete'] = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaResponsible/Delete',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.officeAreaCharge');

    serviceNamespace.getOfficeAreas = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeAreas',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getOfficeChargeUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeChargeUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOfficeArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/CreateOfficeArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateOfficeArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/UpdateOfficeArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllOfficeAreaPlan = function (id, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllOfficeAreaPlan?id=' + encodeURIComponent(id) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getOfficeAreaById = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetOfficeAreaById',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteOfficeArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/DeleteOfficeArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.addChargeToOfficeArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/AddChargeToOfficeArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllUsers = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllUsers',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAllOrganizationUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllOrganizationUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateKeyArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/UpdateKeyArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllChildArea = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/officeAreaCharge/GetAllChildArea',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.camera');

    serviceNamespace.addCamera = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/camera/AddCamera',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.editCamera = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/camera/EditCamera',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.userLink');

    serviceNamespace.linkToUser = function(linkToUserInput, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userLink/LinkToUser',
            type: 'POST',
            data: JSON.stringify(linkToUserInput)
        }, ajaxParams));
    };

    serviceNamespace.getLinkedUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userLink/GetLinkedUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getRecentlyUsedLinkedUsers = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userLink/GetRecentlyUsedLinkedUsers',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.unlinkUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userLink/UnlinkUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.userLogin');

    serviceNamespace.getRecentUserLoginAttempts = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/userLogin/GetRecentUserLoginAttempts',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.user');

    serviceNamespace.getUsers = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/PostGetUsers',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getUsersToExcel = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/GetUsersToExcel',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getUserForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/GetUserForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getUserPermissionsForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/GetUserPermissionsForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.resetUserSpecificPermissions = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/ResetUserSpecificPermissions',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateUserPermissions = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/UpdateUserPermissions',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOrUpdateUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/CreateOrUpdateUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/DeleteUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.unlockUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/UnlockUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.lockoutEnabledUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/LockoutEnabledUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.lockoutDisabledUser = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/LockoutDisabledUser',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getUserName = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/user/GetUserName',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.profile');

    serviceNamespace.getCurrentUserProfileForEdit = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/profile/GetCurrentUserProfileForEdit',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.updateCurrentUserProfile = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/profile/UpdateCurrentUserProfile',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.changePassword = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/profile/ChangePassword',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateProfilePicture = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/profile/UpdateProfilePicture',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getPasswordComplexitySetting = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/profile/GetPasswordComplexitySetting',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.role');

    serviceNamespace.getRoles = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/role/PostGetRoles',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getRoleForEdit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/role/GetRoleForEdit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.createOrUpdateRole = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/role/CreateOrUpdateRole',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.deleteRole = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/role/DeleteRole',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.permission');

    serviceNamespace.getAllPermissions = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/permission/GetAllPermissions',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.auditLog');

    serviceNamespace.getAuditLogs = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/auditLog/GetAuditLogs',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAuditLogsToExcel = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/auditLog/GetAuditLogsToExcel',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.assertDetialsService');

    serviceNamespace.getLatestAssertDetial = function(dId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assertDetialsService/GetLatestAssertDetial?dId=' + encodeURIComponent(dId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDeviceCheckHis = function(dId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceCheckHis?dId=' + encodeURIComponent(dId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDeviceReplaceHis = function(dId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceReplaceHis?dId=' + encodeURIComponent(dId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDeviceMaintainHis = function(dId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceMaintainHis?dId=' + encodeURIComponent(dId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDeviceInspectHis = function(dId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/assertDetialsService/GetDeviceInspectHis?dId=' + encodeURIComponent(dId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.alarms');

    serviceNamespace.getRangeData = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/GetRangeData',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllPieData = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/GetAllPieData',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getAllArea = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/GetAllArea',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.alarmAudit = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/AlarmAudit',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.receiveAlarmEvent = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/ReceiveAlarmEvent',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.notConfirmEventsPopupWindow = function(connectionId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/NotConfirmEventsPopupWindow?connectionId=' + encodeURIComponent(connectionId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.confirmAlarmEvent = function(alarmId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/ConfirmAlarmEvent?alarmId=' + encodeURIComponent(alarmId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.falseReportAlarmEvent = function(alarmId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/FalseReportAlarmEvent?alarmId=' + encodeURIComponent(alarmId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.alarmHandle = function(alarmId, falseReport, auditMessage, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/AlarmHandle?alarmId=' + encodeURIComponent(alarmId) + '&falseReport=' + encodeURIComponent(falseReport) + '&auditMessage=' + encodeURIComponent(auditMessage) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.brokenDelayCheck = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/BrokenDelayCheck',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAlarmInfo = function(alarmId, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/alarms/GetAlarmInfo?alarmId=' + encodeURIComponent(alarmId) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();


(function(){

    var serviceNamespace = abp.utils.createNamespace(abp, 'services.app.safeAssess');

    serviceNamespace.reAssess = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/ReAssess',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateAreaAssess = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/UpdateAreaAssess',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.updateRatio = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/UpdateRatio',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getParents = function(input, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetParents',
            type: 'POST',
            data: JSON.stringify(input)
        }, ajaxParams));
    };

    serviceNamespace.getCheckItem = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetCheckItem',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getGoodsStatusScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetGoodsStatusScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getCheckResultScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetCheckResultScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDangerousGoodsScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetDangerousGoodsScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getDangerousOperationsScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetDangerousOperationsScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getPatrolTaskScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetPatrolTaskScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getTrainNumberScore = function(ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetTrainNumberScore',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };

    serviceNamespace.getAreaScore = function(areaIds, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetAreaScore',
            type: 'POST',
            data: JSON.stringify(areaIds)
        }, ajaxParams));
    };

    serviceNamespace.getAreaAssess = function(areaID, ajaxParams) {
        return abp.ajax($.extend({
            url: abp.appPath + 'api/services/app/safeAssess/GetAreaAssess?areaID=' + encodeURIComponent(areaID) + '',
            type: 'POST',
            data: JSON.stringify({})
        }, ajaxParams));
    };


})();

