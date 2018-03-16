function GoToCheck() {
    window.location.href = '/default.html#!/RiskDistribution';
    $('.menu-active-true  a[ui-sref="RiskDistribution"]')[0].parentNode.parentNode.style.display = "block";
}
function GoToTask() {
    window.location.href = '/default.html#!/UserTask';
    $('.menu-active-true  a[ui-sref="UserTask"]')[0].parentNode.parentNode.style.display = "block";
}
function GoToPossession() {
    window.location.href = '/default.html#!/EquipmentArchivesExpire';
    $('.menu-active-true  a[ui-sref="EquipmentArchivesExpire"]')[0].parentNode.parentNode.style.display = "block";
}
function GoToRealtimemonitoring() {
    window.location.href = '/default.html#!/AlarmStatistics';
    $('.menu-active-true  a[ui-sref="AlarmStatistics"]')[0].parentNode.parentNode.style.display = "block";
}
function showUserTask() {
    var tempHtml = [];
    $.ajax({
        type: "get",
        dataType: "json",
        url: abp.appPath + 'UserTask/GetMyDesktopTaskInfo',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                var state = "<span class=\"label bg-red\">待处理</span>";
                if (data.rows[i].state === 2) {
                    state = "<span class=\"label bg-blue\">已处理</span>";
                }
                var crdate = data.rows[i].creationTime.toString();
                crdate = crdate.split('T')[0];
                tempHtml.push('<tr>');
                tempHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 100px;" title="'+data.rows[i].description+'">' + data.rows[i].description + '</td>');
                tempHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 60px;" title="'+crdate+'">' + crdate + '</td>');
                tempHtml.push('<td >' + state + '</td>');
                tempHtml.push('<td style="min-width:50px;"><a target=\"_self\" href=\"' + data.rows[i].url + '">查看</a></td>');
                tempHtml.push('</tr>');
            };
            $("#todoTask").append(tempHtml.join(""));
            console.log("待办任务请求成功");
        },
        error: function () {
            console.log("待办任务请求失败");
        },
        complete: function () {
            console.log("待办任务请求完成");
        }
    });
}
function GetNowPossession() {

    var userTaskCount = $("#UserTaskCount");
    var userTaskRate = $("#UserTaskRate");
    var vsualAssestCount = $("#VsualAssestCount");
    var vsualAssestRate = $("#VsualAssestRate");
    var alarmEventCount = $("#AlarmEventCount");
    var alarmEventRate = $("#AlarmEventRate");

    $.ajax({
        type: "get",
        dataType: "json",
        url: abp.appPath + 'Application/GetHomeInfo',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        //data: { "para": Id },
        success: function (data) {
            //setRiskDistributionData(90);
            //setUserTaskData(data.result.userTaskCount);
            //setVsualAssestData(data.result.vsualAssestCount);
            //setAlarmEventData(data.result.alarmEventCount);
            userTaskRate.html(data.result.userTaskRate);
            userTaskCount.html(data.result.userTaskCount);

            vsualAssestRate.html(data.result.vsualAssestRate);
            vsualAssestCount.html(data.result.vsualAssestCount);

            alarmEventRate.html(data.result.alarmEventRate);
            alarmEventCount.html(data.result.alarmEventCount);
            console.log("请求成功");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("请求失败");
        },
        complete: function () {
            console.log("请求完成");
        }
    });
    var keytbodyHtml = [];
    $.ajax({
        type: "get",
        dataType: "json",
        url: abp.appPath + 'Application/GetTopOfficeAreas',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        success: function (data) {
            for (var i = 0; i < data.result.list.length; i++) {
                keytbodyHtml.push('<tr>');
                keytbodyHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 100px;" title="'+data.result.list[i].fullName+'">' + data.result.list[i].fullName + '</td>');
                keytbodyHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 80px;">' + data.result.list[i].organizationUnitName + '</td>');
                keytbodyHtml.push('<td style="min-width:50px;"><a target=\"_self\" href=\"/Mpa/VideoCanvas/Index?ParkId=' + data.result.list[i].parentId + '\">查看</a></td>');
                keytbodyHtml.push('</tr>');
            };
            if (data.result.list.length >= 5) {
                $("#moreforkeyArea").css('display', 'block');
            }
            $("#keytbody").append(keytbodyHtml.join(""));
            console.log("请求成功");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("请求失败");
        },
        complete: function () {
            console.log("请求完成");
        }
    });

    $.ajax({
        url: abp.appPath + "OneMap/GetSysScore",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        type: 'get',
        dataType: "json",
        success: function (d) {
            var score = parseInt(d);
            $("#expireRate").html(score);
            var scorehtml = SetStar(score);
            $("#safeStar").html(scorehtml);
        },
        error: function (err) {

        }
    });

}

function SetStar(score) {
    var level = Common.GetScoreLevel(score);
    var html = GetStarHtml(level);
    return html;
};

function GetStarHtml(times) {
    var star = "";
    for (var i = 0; i < times; i++) {
        star += "<i style=\"color: #fd9701\" class=\"material-icons\">grade</i>";
    }
    return star;
}

function GoToYuanqu(city) {
    window.open("VisualData/VisualData.html" + '#' + city);
}

$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});
$('#myTab a[href="#Area1"]').tab('show');