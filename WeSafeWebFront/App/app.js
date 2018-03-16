/* 'app' MODULE DEFINITION */
var appModule = angular.module("app", [
    "ui.router",
    "ui.bootstrap",
    'ui.utils',
    "ui.jq",
    'ui.grid',
    'ui.grid.pagination',
    "oc.lazyLoad",
    "ngSanitize",
    'angularFileUpload',
    'daterangepicker',
    'angularMoment',
    'frapontillo.bootstrap-switch',
    'abp'
]);
/*appModule.factory('breadService', function () {
    return {list:[]};
});*/
/* LAZY LOAD CONFIG */

/* This application does not define any lazy-load yet but you can use $ocLazyLoad to define and lazy-load js/css files.
 * This code configures $ocLazyLoad plug-in for this application.
 * See it's documents for more information: https://github.com/ocombe/ocLazyLoad
 */
appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before', // load the css files before a LINK element with this ID.
        debug: false,
        events: true,
        modules: []
    });
}]);

/* THEME SETTINGS */
App.setAssetsPath(abp.appPath + 'assets/plugins/metronic/');
appModule.factory('settings', ['$rootScope', function ($rootScope) {

    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: true, // solid body color state
            pageAutoScrollOnLoad: 1500 // auto scroll to top on page load
        },
        layoutImgPath: App.getAssetsPath() + 'admin/layout4/img/',
        layoutCssPath: App.getAssetsPath() + 'admin/layout4/css/',
        assetsPath: abp.appPath + 'assets/plugins/metronic/',
        globalPath: abp.appPath + 'assets/plugins/metronic/global',
        layoutPath: abp.appPath + 'assets/plugins/metronic/layouts/layout4'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* ROUTE DEFINITIONS */
//自定义菜单
function addMenu($stateProvider, menulist) {

    for (var o in menulist) {
        if (menulist[o].subMenuList != null) {
            if (menulist[o].subMenuList.length > 0) {
                addMenu($stateProvider, menulist[o].subMenuList);
            }
        }
        $stateProvider.state(menulist[o].menu, {
            url: menulist[o].url,
            templateUrl: menulist[o].templateUrl
        });
        if (menulist[o].subMenuList != null) {
            console.log(menulist[o].subMenuList.length);
        }
        console.log(menulist[o].menuName);
        console.log(menulist[o].menu);
        console.log(menulist[o].url);
        console.log(menulist[o].templateUrl);
    }
}
//采用MenuItem创建菜单
function addMenuItem($stateProvider, menulist) {

    try {
        for (var o in menulist) {
            $stateProvider.state(menulist[o].name, {
                url: "/" + menulist[o].name,
                templateUrl: menulist[o].templateUrl
            });
        }
    }
    catch (error) {
        console.log(error);
    }

}
var tokens = window.localStorage.getItem("applictionToken");
appModule.config(function ($httpProvider) {
    //删除后请求头里不再有 X-Requested-With 属性
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //为请求头添加Authorization属性为'code_bunny'
    $httpProvider.defaults.headers.common['Authorization'] = tokens;
    //全局注册abp.session.userId
    abp.session.userId = parseInt(window.localStorage.getItem("abpSessionUserId"));
    abp.session.userName = window.localStorage.getItem("abpSessionUserName");
    abp.session.userRoles = JSON.parse(window.localStorage.getItem("abpSessionUserRoles"));
    console.log(abp.session.userId);
})
// if(!abp.session.userId){
//     window.location.href = "/index.html";
// }



$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", tokens);

    }
});

appModule.config([
    '$stateProvider', '$urlRouterProvider', '$qProvider',
    function ($stateProvider, $urlRouterProvider, $qProvider) {
        abp.auth = abp.auth || {};
        abp.auth.allPermissions = abp.auth.allPermissions || {};
        abp.auth.grantedPermissions = abp.auth.grantedPermissions || {};
        console.log(tokens);
        if (abp.authVerification) {
            $.ajax({
                type: "get",
                url: abp.appPath + "MenuCustom/GetUserPermissionsResult",
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", tokens);
                },
                dataType: "json",
                async: false,
                success: function (res) {
                    abp.auth.allPermissions = res.result.result.value.allPermissions;
                    abp.auth.grantedPermissions = res.result.result.value.grantedPermissions;
                },
                error: function (res) {
                    console.log(res);
                }
            });
            AppMenuCreate($stateProvider, $urlRouterProvider, $qProvider);
        }
    }
]);

appModule.run(["$rootScope", "settings", "$state", 'i18nService', '$uibModalStack', function ($rootScope, settings, $state, i18nService, $uibModalStack) {
    $rootScope.$state = $state;
    $rootScope.$settings = settings;
    $rootScope.$on("noticeChange", function () {
        $rootScope.$broadcast("noticeChangeEvent");
    });
    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });

    //Set Ui-Grid language
    if (i18nService.get(abp.localization.currentCulture.name)) {
        i18nService.setCurrentLang(abp.localization.currentCulture.name);
    } else {
        i18nService.setCurrentLang("en");
    }

    $rootScope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
}]);


function AppMenuCreate($stateProvider, $urlRouterProvider, $qProvider) {
    $urlRouterProvider.otherwise("/Welcome");
    $stateProvider.state('Welcome', {
        url: '/Welcome',
        templateUrl: '/App/Main/views/home/MyOldDesktop.html'
    });

    //我的桌面old
    $stateProvider.state('mydesktopold', {
     url: '/mydesktopold',
        templateUrl: '/App/Main/views/home/home.html'
   });


    //动态创建自定义菜单
    var menulist = AppMenuService();
    addMenuItem($stateProvider, menulist);



    $stateProvider.state('notifications', {
        url: '/notifications',
        templateUrl: '/App/common/views/notifications/index.html'
    });
}

function AppMenuService() {

    var menulist = "";
    if (abp.authVerification) {
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            url: abp.appPath + 'MenuCustom/GetAppAngularJsMenu',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", tokens);
            },
            success: function (data) {

                //if (data != null) {
                // menulist = data.result.items;
                //}
                menulist = data.result;
                console.log("请求成功");
            },
            error: function () {
console.log('error--------------');
            },
            complete: function () {
            }
        });
    }
    return menulist;
}


var wtwebsafeglobalbread = [];
//全局面包屑保存数组变量
appModule.service('hexafy', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});




function getAreaViewUrl(id)
{
    var mapDefineObj=null;
    function getMapDefine()
    {
        if(mapDefineObj==null)
        {
            $.ajax({
                type: "get",
                url: "/DataVisual/MapDefine.json",
                async:false,
                success: function (data) 
                {
                    mapDefineObj=data;
                }
            });
        }
        return mapDefineObj;
    }
    var areaObj=null;
    var mapAreaObj=null;
    function loadAreaObj(id)
    {
        $.ajax({
            type: "get",
            url: authorityHost+"visualarea/GetAreaInfo?id=" + id,
            async: false,
            success: function (data) {
                areaObj = data;
                mapAreaObj=data;
            }
        });
        if(areaObj!=null && areaObj.areaType<3){
            $.ajax({
                type: "get",
                url: authorityHost+"visualarea/GetBuildingInfo?id=" + id,
                async: false,
                success: function (data) {
                    mapAreaObj = data;
                }
            });
        }
    }
    function getVisualAreaViewUrl(id)
    {
        //获取区域信息
        loadAreaObj(id);
        if(mapAreaObj!=null)
        {
            var mapDefineObj= $(getMapDefine()).map(function(){
                if(this.id==mapAreaObj.mapType){return this;}
            }).get()[0];
            //地图定义对象
            if(mapDefineObj!=null)
            {
                var url= mapDefineObj["viewurl_"+areaObj.areaType];
                if(url){
                    return url.replace("{id}",id);
                }
                else{
                    url= mapDefineObj["viewurl"];
                    if(url){
                        return url.replace("{id}",id);
                    }
                }
            }
        }
        return "";
    }
    return getVisualAreaViewUrl(id);
}