$(document).ready(function () {
    LoadArea("", 4);

    window.onresize = function () {
        InitPlayerSize();
    };
    
});

var thisAreaId = 0;
var pageNumber = 1;
var totalPageCount = 0;

var preParentId = "";
var perPageNum = 8;
var numNumberCount = 5;


function InitPlayerSize() {
    //动态设置教师风采样式
    $('.videobox').css({
        'width': document.body.clientWidth * 0.23 + "px",
        'height': (document.body.clientHeight * 0.6*0.5 -3) + "px"
    });
}
/****
创建分页html片段:
pageIndex:当前页码
perPageNum:每页显示数量
numNumberCount：分页按钮显示个数，超过该数量则用"..."来显示
totalRecord：数据总数
**/
function ParsePage(pageIndex, perPageNum, numNumberCount, totalRecord) {
    totalPageCount = totalRecord % perPageNum == 0 ? parseInt(totalRecord / perPageNum) : (parseInt(totalRecord / perPageNum) + 1);//总页码
    var strTmp = "";
    var numIndexNumber;//当前选中页码的前后按钮数量，保证选中页码在按钮中间
    var numEndNumber;

   

    if (numNumberCount % 2 != 0) {
        numIndexNumber = parseInt(numNumberCount / 2) + 1;
        numEndNumber = parseInt(numNumberCount / 2);
    }
    else {
        numIndexNumber = parseInt(numNumberCount / 2);
        numEndNumber = parseInt(numNumberCount / 2);
    }

    if (totalPageCount < numNumberCount) {
        if (totalPageCount == 0) strTmp += "<a class=\"box active\" href=\"#\"  style=\"position:center\"  onclick=\"clickEvent("+0+")\">1</a>";
        else {
            for (var i = 1; i <= totalPageCount; i++) {
                if (i == pageIndex) {
                    strTmp += "<a href=\"#\" class=\"box active\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
                }
                else {
                    strTmp += "<a href=\"#\" class=\"box\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
                }
            }
        }
    }
    else if (pageIndex - numIndexNumber <= 0) {
        for (var i = 1; i <= numNumberCount; i++) {
            if (i == pageIndex) {
                strTmp += "<a href=\"#\" class=\"box active\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
            else {
                strTmp += "<a href=\"#\" class=\"box\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
        }
    //    strTmp += "<a href=\"#\" class=\"box\">...</a>";
    //    strTmp += "<a href=\"#\" class=\"box\">" + totalPageCount + "</a>";
    }
    else if (pageIndex + numEndNumber >= totalPageCount) {
      //  strTmp += "<a href=\"#\" class=\"box\">...</a>";
        for (var i = totalPageCount - numNumberCount + 1; i <= totalPageCount; i++) {
            if (i == pageIndex) {
                strTmp += "<a href=\"#\" class=\"box active\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
            else {
                strTmp += "<a href=\"#\" class=\"box\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
        }
    }
    else {
     //   strTmp += "<a href=\"#\" class=\"box\">...</a>";
        for (var i = pageIndex - numIndexNumber + 1; i <= pageIndex + numEndNumber; i++) {
            if (i == pageIndex) {
                strTmp += "<a href=\"#\" class=\"box active\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
            else {
                strTmp += "<a href=\"#\" class=\"box\"   style=\"position:center\"  onclick=\"clickEvent(" + i +")\">" + i + "</a>";
            }
        }
     //   strTmp += "<a href=\"#\" class=\"box\">...</a>";
     //   strTmp += "<a href=\"#\" class=\"box\">" + totalPageCount + "</a>";
    }
    return strTmp;
}

function clickEvent(pageindex) {
    pageNumber = pageindex;
    
    RenderTable(preParentId);
}

function pagepreclickEvent() {
    pageNumber--;
    if (pageNumber < 1) {
        pageNumber = 1;
    }
    RenderTable(preParentId);
}

function pagenextclickEvent() {
    pageNumber++;
    if (pageNumber > totalPageCount) {
        pageNumber = totalPageCount;
    }
    RenderTable(preParentId);
}

function LoadArea(parentId, level, fromclick) {
    if (preParentId != parentId) {
        pageNumber = 1;
    }

    if (!parentId) { parentId = ""; }
    //修改按钮的文本
    if (fromclick) {
        $("[areatype=" + (level + 1) + "]").find("button").html($(event.srcElement).text() + ' <span class="caret"></span>')
        //$(event.srcElement).parents("ul").prev().html($(event.srcElement).text() + ' <span class="caret"></span>')
    }
    //加载下拉内容
    $.getJSON(authorityHost+"VisualArea/AreaList?ParentId=" + parentId, function (data) {
        //把子级下拉框干掉
        var i = level;
        while (i > 0) {
            $("#filterContainer").find("[areaType='" + i + "']").remove();
            i--;
        }
        //有子级，加载子级
        if (data.length > 0) {
            RenderAreaDropDown(data, level);
            RenderTable(parentId);
        }
        else if (fromclick) {
            //没有子级的话加载当前
            RenderTable(parentId);
        }
        preParentId = parentId;
    })
}



//加载列表
function RenderTable(parentId) {
    $("#pagelist").html("");
    $("#videolist").html("");
    $.getJSON(abp.appPath+"Camera/GetAllCamera/?ImportantArea=1&assetip=" + parentId + "&limit=" + perPageNum + "&offset=" + (pageNumber-1) * perPageNum, function (result) {
        var html = ['<tr><th>区域名称</th><th>类型</th><th width="500">操作</th></tr>'];
        if (result && result.total > 0) {
            var html = "";

            var count = result.rows.length;
            for (var i = 0; i < count; i++) {
                html += "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\">"
                    + "<div class=\"videobox\">"
                    + "<canvas id=\"" + result.rows[i].ServerAdress + "\" style=\"width:100%;height:100%; margin:0 auto;position: relative;left: 50%;transform: translateX(-50%);cursor:pointer;\"></canvas>"
                    + "</div>"
                    + "<p class=\"text-center videotitle\">" + result.rows[i].CameraName + "</p>"
                    + "</div>";
            }
            
            $("#videolist").html(html);

            SetPageNum(result.total, perPageNum, numNumberCount);

            BindPageClick(result.total, perPageNum, numNumberCount);

            BindPlayers();

            InitPlayerSize();
        }
    })
}


function SetPageNum(totalRecord, perPageNum, numNumberCount) {
    $("#pagelist").html("");
    var pageHtml = ParsePage(pageNumber, perPageNum, numNumberCount, totalRecord);
    $("#pagelist").html(pageHtml);
}

function BindPageClick(totalRecord, perPageNum, numNumberCount) {
    $("#pagelist").find("a").click(function () {
        var pageHtml = ParsePage(pageNumber, perPageNum, numNumberCount, totalRecord);
        $("#pagelist").html(pageHtml);
        BindPageClick();
    });
}

function BindPlayers() {
   
    var canvases = document.getElementsByClassName("canvas");
    $("canvas").each(function () {
       var player = new JSMpeg.Player(this.id, { canvas: this });
      
    })
    
}

function GetAreaTypeName(typeId) {
    switch (parseInt(typeId, 10)) {
        case 4: { return "园区"; }
        case 3: { return "建筑"; }
        case 2: { return "楼层"; }
        case 1: { return "科室"; }
        default: { return ""; }
    }
}

function RenderAreaDropDown(data, level, showClear) {
    //后加
    var html = ['<div class="btn-group" areaType="' + level + '" style="margin-left:5px">'];
    html.push('<button type="button"  class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">全部' + GetAreaTypeName(level) + ' <span class="caret"></span></button>');
    html.push('<ul class="dropdown-menu" style="max-height:400px;overflow-y:auto;">');

    $(data).each(function () {
        html.push('<li><a onclick="LoadArea(' + this.id + ',' + (level - 1) + ',true)">' + this.name + '</a></li>');
    });
    html.push('<li role="separator" class="divider"></li>');
    html.push('<li><a onclick="LoadArea(' + data[0].parentId + ',' + level + ',false)">全部' + GetAreaTypeName(level) + '</a></li>');


    html.push('</ul></div>');
    $("#filterContainer").append(html.join(""));
}