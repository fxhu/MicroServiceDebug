var Items = [
    {
        "id": "1",
        "title": "危险品",
        "score":100
    },
    {
        "id": "2",
        "title": "危险作业",
        "score": 100
    },
    {
        "id": "3",
        "title": "培训次数",
        "score": 100
    },
    {
        "id": "4",
        "title": "考核成绩",
        "score": 100
    },
    {
        "id": "5",
        "title": "资产状态",
        "score": 100
    },
    {
        "id": "6",
        "title": "任务执行",
        "score": 100
    }
];
var internval = 25;
var progressObj = {};
$(document).ready(function () {
    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);

    //var radialObj = $('#prgTotal').radialIndicator({
    //    barColor: '#2196F3',
    //    barWidth: 10,
    //    radius: 70,
    //    initValue: 100,
    //    roundCorner: true,
    //    percentage: false
    //}).data('radialIndicator');
    
    //var oCheckItem = new Checkitem();
    //oCheckItem.Init();

    var oProgress = new ProgressItem();
    oProgress.Reset();
    oProgress.Start();

    $("#btnSysChecked").click(function () {
        oProgress.Reset();
        oProgress.Start();
    });
});

var Checkitem = function () {
    var oCheck = new Object();
    oCheck.Init = function () {
        var html = "";
        $.each(Items, function (idx, item) {
            html += "<h4>" + item.title + ":&nbsp;&nbsp;<small id=\"status" + item.id + "\">正在就绪</small></h4>";
        });
        $("#checkList").html(html);
    };
    return oCheck;
}

var ProgressItem = function () {
    var oProgress = new Object();
    var checkIdx = 0;//当前进度条检查项索引编号
    var totalCheckIdx = 0;//总进度索引
    var totalNum = 100 * Items.length;
    var radialObj = $('#prgTotal').radialIndicator({
        barColor: '#2196F3',
        barWidth: 10,
        radius:80,
        initValue: 100,
        roundCorner: true,
        percentage: false
    }).data('radialIndicator');
    oProgress.Start = function () {//开始检测  
        $("#btnSysChecked").attr("disabled", "disabled");
        $("#btnSysChecked").html("正在评估");
        if (checkIdx == Items.length) {//评估完成
            $("#progRow").hide();
            $("#status" + Items[checkIdx - 1].id).html("评估完成");
            $("#btnSysChecked").removeAttr("disabled");
            $("#btnSysChecked").html("重新评估");
            oProgress.SetStar();
            return;
        }
        var item = Items[checkIdx];
        oProgress.Create(item.id, item.title);
        oProgress.CheckStatus(item, 100);
    };
    oProgress.CheckStatus = function (item, scoreNum, identity) {
        $("#status" + item.id).html("正在评估...");
        if (identity == undefined) {
            identity = 1;
        }
        else identity++;
        var status = oProgress.CheckItemStatus();
        if (!status) {
            scoreNum--;
            item.score = scoreNum;
        }
        oProgress.SetTotalProgress(totalCheckIdx);
        totalCheckIdx++;
        oProgress.SetItemStatus(item.id, scoreNum);
        progressObj[item.id].animate(scoreNum);
        setTimeout(function () {
            if (identity > 100) {
                checkIdx++;
                oProgress.Start();
                return;
            }
            oProgress.CheckStatus(item, scoreNum, identity);
        }, internval);
    };
    oProgress.Create = function (id, title) {
        //创建检查标题
        var html = "<h2>" + title + ":&nbsp;&nbsp;<small id=\"status" + id + "\">准备就绪</small></h2>";
        $("#checkList").html(html);

        //创建检测项计分图
        var html = "<div class=\"col-md-3\"><div class=\"prg-cont rad-prg\" id=\"progress" + id + "\"></div>"
            + "<p class=\"col-md-offset-1\">" + title + "</p></div>";
        $("#ItemList").append(html);
        var obj = $("#progress" + id + "").radialIndicator({
            barColor: '#2196F3',
            barWidth: 10,
            initValue: 100,
            roundCorner: true,
            percentage: false
        }).data('radialIndicator');
        progressObj[id] = obj;
    };
    oProgress.SetItemStatus = function (id, score) {//设置评分状态
        if (score >= 80) {
            progressObj[id].option('barColor', "#4CAF50");
        }
        else if (score >= 60 && score < 80)
        {
            progressObj[id].option('barColor', "#8BC34A");
        }
        else if (score >= 30 && score < 60) {
            progressObj[id].option('barColor', "#FF9800");
        }
        else if (score >= 0 && score < 30) {
            progressObj[id].option('barColor', "#F44336");
        }
    };
    oProgress.CheckItemStatus = function () {
        var num = Math.ceil(Math.random() * 100);
        if (num > 0 && num <= 10) {//取10以内的数字，表示状态为false
            return false;
        }
        return true;
    };
    oProgress.SetTotalProgress = function (idx) {        
        var value = parseInt(idx * 100 / totalNum);
        
        $("#prog").css("width", value + "%").text(value + "%");//设置进度条

        var total = 0;
        $.each(Items, function (idx, item) {
            total += item.score;
        });
        var percent = parseInt(total * 100 / totalNum);

        radialObj.animate(percent);
    };
    oProgress.Reset = function () {
        $("#ItemList").html("");
        $("#checkList").html("");
        checkIdx = 0;
        totalCheckIdx = 0;
        $("#prog").css("width", "0%").text("0%");
        radialObj.value(100);
        $.each(Items, function (idx, item) {
            item.score = 100;
        });
        $("#ResultScore").html("");
        $("#progRow").show();
    };
    oProgress.SetStar = function (score) {
        if (score >= 0 && score < 20) {
            var star = GetStarHtml(1);            
            $("#ResultScore").html(star);
        }
        else if (score >= 20 && score < 40) {
            var star = GetStarHtml(2);
            $("#ResultScore").html(star);
        }
        else if (score >= 40 && score < 60) {
            var star = GetStarHtml(3);
            $("#ResultScore").html(star);
        }
        else if (score >= 60 && score < 80) {
            var star = GetStarHtml(4);
            $("#ResultScore").html(star);
        }
        else {
            var star = GetStarHtml(5);
            $("#ResultScore").html(star);
        }
        function GetStarHtml(times) {
            var star = "";
            for (var i = 0; i < times; i++)
            {
                star += "<i class=\"material-icons\" style=\"color: #fd9701\">grade</i>";
            }
            return star;
        }
    };
    return oProgress;
};