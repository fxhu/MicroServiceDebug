var Items = [
    {
        "id": "1",
        "title": "危险品",
        "score": 100,
        "rate": 0.1
    },
    {
        "id": "2",
        "title": "危险作业",
        "score": 100,
        "rate": 0.2
    },
    {
        "id": "3",
        "title": "培训次数",
        "score": 100,
        "rate": 0.3
    },
    {
        "id": "4",
        "title": "考核成绩",
        "score": 100,
        "rate": 0.1
    },
    {
        "id": "5",
        "title": "资产状态",
        "score": 100,
        "rate": 0.1
    },
    {
        "id": "6",
        "title": "巡检任务",
        "score": 100,
        "rate": 0.2
    }
];
var internval = 25;
var progressObj = {};
var internval = 100;
var progressObj = {};
var checkIdx = 0;//当前进度条检查项索引编号
var totalCheckIdx = 0;//总进度索引
var totalNum = 100 * Items.length;
var radialObj;
$(document).ready(function () {
    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
   
    oProgressReset();
    oProgressStart();

    $("#btnRiskSysChecked").click(function () {
        oProgressReset();
        oProgressStart();
    });
});

function oProgressStart() {//开始检测  
    $("#btnSysChecked").attr("disabled", "disabled");
    $("#btnSysChecked").html("正在评估");
    if (checkIdx == Items.length) {//评估完成        
        oProgressFinish();
        return;
    }
    var item = Items[checkIdx];
    var scoreNum = 100;
    oProgressCreate(item.id, item.title);
    switch (checkIdx) {
        case 3: {
            oProgressGetAPIScore(Common.api.GetExamineSorce + "?id=" + vm.item.UserId, function (scoreNum) {
                oProgressCheckStatus(item, scoreNum);
            });
        }; break;
        default: {
            oProgressGetScore(item, checkIdx, function (result) {
                scoreNum = result.data.score;
                oProgressCheckStatus(item, scoreNum);
            });
        }; break;
    }
};

//获取服务器得分
function oProgressGetScore(item, checkIdx, callback) {
    return;
    safeAssessService.reAssess({ id: item.id, whichItem: checkIdx, UserId: vm.item.UserId, AreaId: vm.item.AreaId, OrganizationUnitId: vm.item.OrganizationUnitId }).then(function (result) {
        if (callback) {
            callback(result);
        }
    });
};
//通过API获取得分
function oProgressGetAPIScore(apiUrl, callback) {
    return;
    $.ajax({
        type: "get",
        url: apiUrl,
        dataType: "jsonp",
        success: function (data) {
            if (callback) {
                if (data.msg != "") {
                    callback(100);
                }
                else {
                    var score = parseInt(result.data[0].pse_score);
                    callback(score);
                }
            }
        },
        error: function (err) {
            if (callback) {
                //当服务器得分异常时，设置临时数据
                callback(99);
            }
        },
        complete: function () {

        }

    });
};

function oProgressCheckStatus(item, scoreNum) {
    $("#status" + item.id).html("正在评估...");
    oProgressSetTotalProgress(totalCheckIdx);
    var rate = oProgressGetScoreRate(scoreNum);
    totalCheckIdx += rate;
    setTimeout(function () {
        if (item.score >= scoreNum) {
            oProgressSetItemStatus(item.id, item.score);
            progressObj[item.id].animate(item.score);
            oProgressCheckStatus(item, scoreNum);
            item.score--;
        }
        else {
            item.score++;//当前监测项得分和实际得分一致时，得分多减了一次，需要加回来
            checkIdx++;
            oProgressStart();
        }
    }, internval);
};
function oProgressCreate(id, title) {
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

function oProgressGetScoreRate(scoreNum) {//获取进度条加分频率
    if (scoreNum == 100) {
        return 100;
    }
    else {
        var rate = parseInt(100 / (100 - scoreNum));
        return rate;
    }
};
function oProgressSetItemStatus(id, score) {//设置评分状态
    if (score >= 80) {
        progressObj[id].option('barColor', "#4CAF50");
    }
    else if (score >= 60 && score < 80) {
        progressObj[id].option('barColor', "#8BC34A");
    }
    else if (score >= 30 && score < 60) {
        progressObj[id].option('barColor', "#FF9800");
    }
    else if (score >= 0 && score < 30) {
        progressObj[id].option('barColor', "#F44336");
    }
};

function oProgressSetTotalProgress(idx) {
    var value = parseInt(idx * 100 / totalNum);

    $("#prog").css("width", value + "%").text(value + "%");//设置进度条

    var total = 0;
    $.each(Items, function (idx, item, that) {
        total += item.score * item.rate;
    });
    
    var percent = parseInt(total);

    radialObj.animate(percent);
};
function oProgressReset() {
    $("#ItemList").html("");
    $("#checkList").html("");
    checkIdx = 0;
    totalCheckIdx = 0;
    $("#prog").css("width", "0%").text("0%");
    if (radialObj) {
        radialObj.value(100);
    }
    else {
        radialObj = $('#prgTotal').radialIndicator({
            barColor: '#2196F3',
            barWidth: 10,
            radius: 80,
            initValue: 100,
            roundCorner: true,
            percentage: false
        }).data('radialIndicator');
    }
    $.each(Items, function (idx, item) {
        item.score = 100;
    });
    $("#ResultScore").html("");
    $("#progRow").show();
};
function oProgressSetStar(score) {
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
        for (var i = 0; i < times; i++) {
            star += "<i class=\"fa fa-star\"  style=\"color: #fd9701\"></i>";
        }
        return star;
    }
};

function oProgressFinish() {
    $("#progRow").hide();
    $("#status" + Items[checkIdx - 1].id).html("评估完成");
    $("#btnSysChecked").removeAttr("disabled");
    $("#btnSysChecked").html("重新评估");

    var total = 0;
    $.each(Items, function (idx, item, that) {
        total += item.score * item.rate;
    });
    oProgressSetStar(total);
    oProgress.UpdateSafeAssess(total);
}