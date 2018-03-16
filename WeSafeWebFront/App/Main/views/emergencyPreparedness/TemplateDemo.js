(function () {
    var controllerId = 'app.views.templatedemo';
    angular.module('app').filter('to_trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }])
        .controller(controllerId, [
            '$scope', '$location', '$anchorScroll', 'abp.services.app.planTemplate', function ($scope, $location, $anchorScroll, planTempService) {
          //  $anchorScroll.yOffset = 300;
            var vm = this;
            vm.myclass = 'hasPermission';
            vm.click = function (index) {                
               // $location.hash('div' + idx);
               // $anchorScroll();
                var scrollTopHeight = 0;
                $(".scorllercontent").each(function (idx, item) {
                    var height = $(item).height();
                    if (index == idx) {
                        return false;
                    }
                    else {
                        scrollTopHeight += height;
                    }
                });
                if (index != 0) {
                    scrollTopHeight -= 10;
                }
                $("#planScroller").animate({ scrollTop: scrollTopHeight }, 800);
                var scrollTop = $("#planScroller").next().offset().top;
                var pageContentHeight = $("#planScroller").height();
                var boxHeight = $("#planScroller").find(".pre-box").height();
                var height = (scrollTopHeight / boxHeight) * pageContentHeight;
                $("#planScroller").next().animate({ top: height }, 800);
            };

            var id = Common.getQueryString("id");
           
            if (id == "") return;
            //加载数据
            vm.PlanName = id;
            planTempService.getTmplate(vm.PlanName).then(function (result) {
                vm.PlanName = result.data.planName;
                var list = [];
                $.each(result.data.tmp.contents, function (idx, item) {
                    var model = {
                        name: item.secName,
                        content: item.secContent
                    };
                    list.push(model);
                });
                $scope.list = list;
            }); 

            var ScorllerBtn = function () {
                var oScorllerBtn = new Object();
                var btnHeight = 40;//当前按钮的高度
                var scorllerTopHeight = 225;//按钮到顶部的固定高度       
                var btnLineheight = 3;//按钮之间的行高
                var sectionLineHeight = 30;//段落之间的行高
                //根据当前章节编号设置按钮样式
                oScorllerBtn.SetBtns = function () {                    
                    var thisNum = 0;//当前正在浏览的章节索引号
                    var IsCurrentNum = false;
                    $(".scorllercontent").each(function (idx, item) {
                        var currentTop = $(item).offset().top;                        
                        var btnItem = $("button.btnNum").eq(idx);                        
                        if ((scorllerTopHeight + idx * (btnHeight + btnLineheight)) >= currentTop) {
                            $(btnItem).css({
                                position: "fixed",
                                top: (scorllerTopHeight + idx * (btnHeight + btnLineheight)).toString() + "px"
                            });                           
                        }
                        else {
                            $(btnItem).css({
                                position: "absolute",
                                top: ""
                            });
                        }
                        //获取正在浏览的第一个章节编号
                        if (currentTop + $(item).height() - scorllerTopHeight - sectionLineHeight  > 0 && !IsCurrentNum) {
                            thisNum = idx;
                            IsCurrentNum = true;
                        }
                    });
                    
                    //设置按钮active状态
                    $("button.btnNum").each(function (idx, btnItem) {
                        if (idx < thisNum) {
                            $(btnItem).removeClass("activing");
                            $(btnItem).addClass("actived");
                        }
                        else {
                            $(btnItem).removeClass("actived");
                            $(btnItem).addClass("activing");
                        }
                    });
                };                
                return oScorllerBtn;
            };

            var oScorller = new ScorllerBtn();
            angular.element('#planScroller').bind('scroll', function (event) {
                oScorller.SetBtns();
            });
           
            
        }
    ]);
})();