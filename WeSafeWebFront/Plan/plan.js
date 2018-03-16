$(document).ready(function () {
    var id = $("#v_planName").attr("val");
    var oPlanObj = new PlanObj();
    oPlanObj.LoadPlan(id);
    
    var oScorller = new ScorllerBtn();
    $('#planScroller').bind('scroll', function (event) {
        oScorller.SetBtns();
    });
});

var PlanObj = function () {
    var oPlan = new Object();
    oPlan.LoadPlan = function (id) {
        var url = "/api/services/app/plan/GetPlan?id=" + id;
        $.post(url).done(function (d) {
            var data = d.result;
            $("#v_planName").html(data.planName);

            var menu = "<li style=\"font-size:18px;\">目录</li>";
            var content = "";
            $.each(data.sections, function (idx,item) {
                menu += "<li><a href=\"javascript:BtnClick(" + idx + ");\" class=\"\">" + item.sectionName + "</a></li>";
                content += ModelHtml(idx, item);
            });
            $("#planmenu").html(menu);
            $("#planContent").html(content);

            function ModelHtml(idx,sec) {
                var html = "<div class=\"scorllercontent\">"
                    + "<button type=\"button\" onclick=\"BtnClick(" + idx + ")\" class=\"btn btn-circle btn-default btnNum activing\">"
                    + "<span class=\"num\" style=\"" + (idx > 8 ? "margin-left:-5px" : "") + " id=\"div" + (idx + 1) + "\">" + (idx + 1) + "</span>"
                    + "</button >"
                    + "<div class=\"pre-content\">"
                    + "<div class=\"pre-title\">"
                    + "<span class=\"title-arrow\"></span>"
                    + "<span class=\"title-content\">" + sec.sectionName + "</span>"
                    + "</div>"
                    + "<div class=\"content-clear\"></div>"
                    + "<div>" + sec.content + "</div>"
                    + "</div>"
                    + "</div >";
                return html;
            }
        });
    };


    return oPlan;
};

function BtnClick(index) {
    var scrollTopHeight = 0;
    $(".scorllercontent").each(function (idx, item) {
        var height = $(item).height();
        if (index == idx) {
            return false;
        }
        else {
            scrollTopHeight += height + 20;
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
}

var ScorllerBtn = function () {
    var oScorllerBtn = new Object();
    var btnHeight = 40;//当前按钮的高度
    var scorllerTopHeight = 101;//按钮到顶部的固定高度       
    var btnLineheight = 3;//按钮之间的行高
    var sectionLineHeight = 40;//段落之间的行高
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
            if (currentTop + $(item).height() - scorllerTopHeight > 0 && !IsCurrentNum) {
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