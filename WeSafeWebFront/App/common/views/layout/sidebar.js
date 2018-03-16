(function () {
    appModule.controller('common.views.layout.sidebar', [
        '$scope', '$state',
        function ($scope, $state) {

            var vm = this;
            vm.menu = [];
            vm.flag = 0;
            vm.secondMenu = "";
            vm.firstMenu = "";
            vm.firstMenuUrl = "";
            vm.menu = abp.nav.menus.MainMenu;
            vm.leftMenuBar = "";
            $scope.searchContent = "";
            vm.showTitle = function (displayName,url,parentDisplayName) {
                wtwebsafeglobalbread.splice(0,wtwebsafeglobalbread.length);
                wtwebsafeglobalbread.push({"name":parentDisplayName,"url":null});
                wtwebsafeglobalbread.push({"name":displayName,"url":"/default.html#!/"+url});
               var  storage = window.sessionStorage;
                storage.clear();
                var arrDisplay = [{"name":parentDisplayName,"url":null},{"name":displayName,"url":"/default.html#!/"+url}];
                var temp = JSON.stringify(arrDisplay);
                storage.setItem("menuTitle", temp);
            };
            vm.tootip = function ($event,e) {
            if(e == ""){
                $("#menusLeft li").css("display","block");
                $("#menusLeft ul").css("display","block");
                $("#menusLeft  #menuInleft > li").each(function (i,n) {
                    $(n).find("ul").css("display","none")
                });
            }

            };
            //单独给我的桌面添加移除 .open属性
            
            //王涛搜索菜单功能函数

           vm.searchMenu = function(e) {
               if(e.trim() == ""){
                   return ;
               }
               $("#menusLeft li").css("display","block");
               $("#menusLeft ul").css("display","block");
                var sear=new RegExp(e);
                var lis = $("#menusLeft").find("#menuInleft > li");

                var len = lis.length;
                for (var i = 0; i < len; i++) {

                    var uls = $(lis[i]).find("ul");

                    for (var j = 0; j < uls.find("li").length; j++) {
                        if (!sear.test($(uls.find("li")[j]).children("a:first-child").find("span").html())) {
                            $(uls.find("li")[j]).css("display", "none");
                        }
                    }

                }


                for(var k = 0 ; k < len ; k ++ ){
                    var total = $(lis[k]).find("ul").find("li").length;
                    var part = $(lis[k]).find("ul").find("li:hidden").length;
                    if(total == part){
                        $(lis[k]).css("display","none");
                    }
                    if (total == 0) {
                        if (sear.test($(lis[k]).children("a:first-child").children("span").html())) {
                            $(lis[k]).css("display", "block");
                        }
                    }

                }
                $("#menusLeft li[level='two']").click(function () {
                   //vm.showTitle(childMenuItem.displayName,childMenuItem.url,menuItem.displayName)

                   console.log($(this).find("a").attr("ui-sref")+","+$(this).find("a").find("span").html());
                   console.log($(this).parent().parent("li").children("a:first-child").find("span").html());
                   vm.showTitle($(this).find("a").find("span").html(),$(this).find("a").attr("ui-sref"),$(this).parent().parent("li").children("a:first-child").find("span").html());
               });


            };

            vm.menu2 = [];
            vm.menu2 = AppMenuServiceRemoveHiddenItem();
            $scope.$on('$includeContentLoaded', function () {
                setTimeout(function () {
                    Layout.initSidebar($state); // init sidebar
                    $(window).trigger('resize');
                }, 0);
            });

            function deepCopy(o) {
                if (o instanceof Array) {
                    var n = [];
                    for (var i = 0; i < o.length; ++i) {
                        n[i] = deepCopy(o[i]);
                    }
                    return n;

                } else if (o instanceof Object) {
                    var n = {}
                    for (var i in o) {
                        n[i] = deepCopy(o[i]);
                    }
                    return n;
                } else {
                    return o;
                }
            }

            //直接通过后端接口获取app菜单服务
            function AppMenuServiceRemoveHiddenItem() {
                var menulist = "";
                $.ajax({
                    type: "get",
                    dataType: "json",
                    async: false,
                    url: abp.appPath + 'MenuCustom/GetSidebarJsMenu',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    success: function (data) {
                        if (data != null) {
                            menulist = data.result;
                            console.log(menulist);
                        }
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                });
                //abp.services.app.menuCustomService.getMenu({}).then(function(result) {
                //    menulist = $.parseJSON(result);
                //});
                return menulist;
            }
        }
    ]);
})();