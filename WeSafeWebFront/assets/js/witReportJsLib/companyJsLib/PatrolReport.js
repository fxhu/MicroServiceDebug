$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);
    $.getJSON(RptCommon.Host + "api/company/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });

    var oPatrol = new PatrolLineChart(areaId);
    oPatrol.drawOverDue();
    oPatrol.drawFinish();
    oPatrol.drawException();
    oPatrol.drawWaitForSure();
    oPatrol.drawWorking();

    var oCompareChart = new CompareChart(areaId);
    oCompare.CreateSelects();
    oCompareChart.drawChart();
    oCompare.CreateBtns();

    var oPieChart = new PieChart(areaId);
    oPieChart.drawChart();
});

var PatrolLineChart = function (areaId) {
    var oPatrol = new Object();
    oPatrol.svrUrl = RptCommon.Host + "api/company/PatrolReport/FindDailyRate/" + areaId + "/";
    oPatrol.drawOverDue = function () {
        var contentId = "line_OverDue";
        var statusVal = "5";//已逾期
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(oPatrol.svrUrl + statusVal, function (data) {

            data = ReportDataTransformList(data);

            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawFillLine(contentId, arr2, EchartsHelper.FillLine.red, {
                title: "已逾期",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oPatrol.drawFinish = function () {
        var contentId = "line_Finish";
        var statusVal = "4";//已完成
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(oPatrol.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawFillLine(contentId, arr2, EchartsHelper.FillLine.blue, {
                title: "已完成",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oPatrol.drawException = function () {
        var contentId = "line_Exception";
        var statusVal = "2";//有异常
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(oPatrol.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawFillLine(contentId, arr2, EchartsHelper.FillLine.yellow, {
                title: "未开始",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oPatrol.drawWaitForSure = function () {
        var contentId = "line_WaitForSure";
        var statusVal = "1";//待确认
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(oPatrol.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawFillLine(contentId, arr2, EchartsHelper.FillLine.grey, {
                title: "待审核",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oPatrol.drawWorking = function () {
        var contentId = "line_Working";
        var statusVal = "3";//进行中
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(oPatrol.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawFillLine(contentId, arr2, EchartsHelper.FillLine.green, {
                title: "进行中",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    return oPatrol;
};

var CompareChart = function (areaId) {
    oCompare = new Object();
    oCompare.status = PatrolType.Enum[0].val;
    oCompare.svrUrl = RptCommon.Host + "api/company/PatrolReport/FindTHRateCompare/" + areaId;
    oCompare.myChart = echarts.init(document.getElementById("mix"));
    oCompare.drawChart = function () {
        $.getJSON(this.svrUrl + "/" + this.startYear + "/" + this.endYear + "/" + this.status, function (data) {
            data = ReportDataTransformSingle(data);
            var arrX = [];
            var arrY1 = [];
            var arrY2 = [];
            var ratetb = [];
            var ratehb = [];
            var dataYc = data.yearCompare;
            var dataTb = data.tb;
            var dataHb = data.hb;
            
            var obj = dataYc.find(function (x) {
                return x.year == oCompare.startYear;
            });
            if (obj) {
                arrY1 = obj.items;
                $.each(arrY1, function (idx, item) {
                    arrX.push(item.name);
                });
            }
            obj = dataYc.find(function (x) {
                return x.year == oCompare.endYear;
            });
            if (obj) {
                arrY2 = obj.items;
            }

            for (let i = 0; i < dataTb.length; i++) {
                ratetb.push(dataTb[i].rate);
            }
            for (let i = 0; i < dataHb.length; i++) {
                ratehb.push(dataHb[i].rate);
            }
            var yearStart = {
                year: oCompare.startYear,
                data: arrY1
            };
            var yearEnd = {
                year: oCompare.endYear,
                data: arrY2
            };
            EchartsHelper.drawTB_HBChart(oCompare.myChart, arrX, yearStart, yearEnd, ratetb, ratehb);
        });
    };
    oCompare.CreateSelects = function () {
        var years = RptCommon.GetYears();
        $.each(years, function (idx, item) {
            $("#selEndYear").append("<option value='" + item + "'>" + item + "年</option>");
            $("#selStartYear").append("<option value='" + item + "'>" + item + "年</option>");
        });
        var defaultEndYear = new Date().getFullYear();
        var defaultStartYear = defaultEndYear - 1;
        $("#selEndYear").val(defaultEndYear);
        $("#selStartYear").val(defaultStartYear);
        oCompare.startYear = defaultStartYear;
        oCompare.endYear = defaultEndYear;
        $("#selStartYear").change(function () {
            oCompare.SetChart();
        });
        $("#selEndYear").change(function () {
            oCompare.SetChart();
        });
    };
    oCompare.CreateBtns = function () {
        var html = "";
        $.each(PatrolType.Enum, function (idx, item) {
            html += "<button class=\"btns\" val=\"" + item.val + "\">" + item.name + "</button>";
        });
        $("#btnBox").html(html);
        $(".btns").click(function () {
            $(".btns").removeClass("active");
            $(this).addClass("active");
            oCompare.SetChart();
        });
        $(".btns").eq(0).addClass("active");
    };
    oCompare.SetChart = function () {
        oCompare.startYear = $("#selStartYear").val();
        oCompare.endYear = $("#selEndYear").val();
        oCompare.status = $("button.active").attr("val");
        oCompare.drawChart();
        RptCommon.ValidateYear(oCompare.endYear, oCompare.startYear);
    };
    return oCompare;
};

var PieChart = function (areaId) {
    var oPie = new Object();
    oPie.svrUrl = RptCommon.Host + "api/company/PatrolReport/FindLatestWarningCount/" + areaId;
    oPie.drawChart = function () {
        $.getJSON(this.svrUrl, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            jsonData = [];
            //data = data.sort(function (a, b) {
            //    return parseInt(b.name) - parseInt(a.name)
            //});
            $.each(data, function (idx, item) {
                var val = item.name;
                var txt = PatrolType.GetPatrolTypeTxt(val);
                if (txt != "") {
                    arrName.push(txt);
                    arrVal.push(item.value);
                    jsonData.push({
                        name: txt,
                        value: item.value
                    });
                    $("#PatrolpieItems").append("<li><p>" + txt + "</p><div>" + item.value + "</div></li>");
                }
            });

            EchartsHelper.drawRing("Patrol_pie", arrName, jsonData, {
                title: "巡检",
                Colors: EchartsHelper.Colors.Patrol
            }, function (myChart) {
                //myChart.dispatchAction({
                //    type: 'pieSelect',
                //    dataIndex: checkedIdx
                //});
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 4
                });
            });

        });
    };
    return oPie;
};