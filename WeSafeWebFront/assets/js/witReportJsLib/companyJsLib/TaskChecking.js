$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);
    $.getJSON(RptCommon.Host + "api/company/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });

    var oCheck = new CheckLineChart(areaId);
    oCheck.drawOverdue();
    oCheck.drawNotStart();
    oCheck.drawDone();
    oCheck.drawInProgress();

    var oCompareChart = new CompareChart(areaId);
    oCompare.CreateSelects();
    oCompareChart.drawChart();
    oCompare.CreateBtns();

    var oPieChart = new PieChart(areaId);
    oPieChart.drawChart();
});

var CheckLineChart = function (areaId) {
    var oCheck = new Object();
    oCheck.svrUrl = RptCommon.Host + "api/company/CheckReport/FindCheckDailyRate/" + areaId + "/";
    oCheck.drawOverdue = function () {
        var contentId = "line_Overdue";
        var statusVal = "1";//已逾期
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }

            EchartsHelper.drawEmptyBar(contentId, arr2, EchartsHelper.Task.Overdue, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });

        });
    };
    oCheck.drawNotStart = function () {
        var contentId = "line_NotStart";
        var statusVal = "2";//未开始
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawEmptyBar(contentId, arr2, EchartsHelper.Task.NotStart, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    oCheck.drawDone = function () {
        var contentId = "line_Done";
        var statusVal = "3";//已完成
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawEmptyBar(contentId, arr2, EchartsHelper.Task.Done, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    oCheck.drawInProgress = function () {
        var contentId = "line_InProgress";
        var statusVal = "4";//进行中
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawEmptyBar(contentId, arr2, EchartsHelper.Task.InProgress, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    return oCheck;
};

var CompareChart = function (areaId) {
    oCompare = new Object();
    oCompare.status = "1";
    oCompare.svrUrl = RptCommon.Host + "api/company/CheckReport/FindTHRateCompare/" + areaId;
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
        $.each(TaskType.Enum, function (idx, item) {
            html += "<button class=\"btns\" val=\"" + item.val + "\">" + item.name + "</button>";
        });
        $("#btnBox").html(html);
        $(".btns").click(function () {
            $(".btns").removeClass("active");
            $(this).addClass("active");
            oCompare.SetChart();
        });
        $(".btns").eq(2).click();
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
    oPie.svrUrl = RptCommon.Host + "api/company/CheckReport/FindLatestCheckCount/" + areaId;
    oPie.drawChart = function () {
        $.getJSON(this.svrUrl, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            jsonData = [];
            data = data.sort(function (a, b) {
                return parseInt(a.name) - parseInt(b.name);
            });
            $.each(data, function (idx, item) {
                var val = item.name;
                var txt = TaskType.GetTaskTypeTxt(val);
                if (txt != "") {
                    arrName.push(txt);
                    arrVal.push(item.value);
                    jsonData.push({
                        name: txt,
                        value: item.value
                    });
                    $("#CheckpieItems").append("<li style='margin-top: 30px;'><p>" + txt + "</p><div>" + item.value + "</div></li>");
                }
            });

            EchartsHelper.drawRing("Check_pie", arrName, {
                radius: ['30%', '50%'],
                data: jsonData
            }, {
                    title: "检测",
                    Colors: EchartsHelper.Colors.Task
                }, function (myChart) {
                    //myChart.dispatchAction({
                    //    type: 'pieSelect',
                    //    dataIndex: checkedIdx
                    //});
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                });

        });
    };
    return oPie;
};