$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);
    $.getJSON(RptCommon.Host + "/api/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });

    var oAlarm = new AlarmBarChart(areaId);
    oAlarm.drawFinish();
    oAlarm.drawUnFinish();
    oAlarm.drawErrorFinish();
    oAlarm.drawErrorUnFinish();

    var oCompareChart = new CompareChart(areaId);
    oCompare.CreateSelects();
    oCompareChart.drawChart();
    oCompare.CreateBtns();

    var oPieChart = new PieChart(areaId);
    oPieChart.drawChart();
    oPieChart.drawCount();
});

var AlarmBarChart = function (areaId) {
    var oAlarm = new Object();
    oAlarm.svrUrl = RptCommon.Host + "/api/WarningReport/FindDailyRate/" + areaId + "/";
    oAlarm.drawFinish = function () {
        var contentId = "line_AlarmFinish";
        var statusVal = "5";//火警已处理
        var txt = AlarmType.GetAlarmTypeTxt(statusVal);
        $.getJSON(oAlarm.svrUrl + statusVal, function (data) {

            data = ReportDataTransformList(data);

            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawBar(contentId, arr2, EchartsHelper.Bars.red, {
                title: "处理率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oAlarm.drawUnFinish = function () {
        var contentId = "line_AlarmUnFinish";
        var statusVal = "4";//未通过
        var txt = AlarmType.GetAlarmTypeTxt(statusVal);
        $.getJSON(oAlarm.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawBar(contentId, arr2, EchartsHelper.Bars.grey, {
                title: "未处理率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oAlarm.drawErrorFinish = function () {
        var contentId = "line_ErrorFinish";
        var statusVal = "7";//故障已处理
        var txt = AlarmType.GetAlarmTypeTxt(statusVal);
        $.getJSON(oAlarm.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawBar(contentId, arr2, EchartsHelper.Bars.coffee, {
                title: "故障已处理率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oAlarm.drawErrorUnFinish = function () {
        var contentId = "line_ErrorUnFinish";
        var statusVal = "6";//故障未处理
        var txt = AlarmType.GetAlarmTypeTxt(statusVal);
        $.getJSON(oAlarm.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawBar(contentId, arr2, EchartsHelper.Bars.grey, {
                title: "故障未处理率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };    
    return oAlarm;
};

var CompareChart = function (areaId) {
    oCompare = new Object();
    oCompare.status = "1";
    oCompare.svrUrl = RptCommon.Host + "/api/WarningReport/FindTHRateCompare/" + areaId;
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
        $.each(AlarmType.Enum, function (idx, item) {
            if (parseInt(item.val) <= 3)//只添加前三项按钮
            {
                html += "<button class=\"btns\" val=\"" + item.val + "\">" + item.name + "</button>";
            }            
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
    oPie.svrUrl = RptCommon.Host + "/api/WarningReport/FindLatestWarningCount/" + areaId;
    oPie.drawChart = function () {
        $.getJSON(this.svrUrl, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            jsonData = [];
            data = data.sort(function (a, b) {
                return parseInt(b.name) - parseInt(a.name)
            });
            $.each(data, function (idx, item) {
                var val = item.name;
                var txt = AlarmType.GetAlarmTypeTxt(val);
                if (txt != "") {
                    arrName.push(txt);
                    arrVal.push(item.value);
                    jsonData.push({
                        name: txt,
                        value: item.value
                    });                   
                }
            });

            EchartsHelper.drawRing("Alarm_pie", arrName, jsonData, {
                title: "报警",
                Colors: EchartsHelper.Colors.Alarm
            }, function (myChart) {
                //myChart.dispatchAction({
                //    type: 'pieSelect',
                //    dataIndex: checkedIdx
                //});
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 2
                });
            });

        });
    };
    oPie.drawCount = function () {
        var url = RptCommon.Host + "/api/WarningReport/FindLatestWarningCountList/" + areaId;
        $.getJSON(url, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            jsonData = [];
            $.each(data, function (idx, item) {
                var val = item.name;
                var txt = AlarmType.GetAlarmTypeTxt(val);
                if (txt != "") {
                    $("#txt" + val).html(txt);
                    $("#count" + val).html(item.value);
                }
            });
        });
    };
    return oPie;
};

//$('.aside,.lines li,.lines>.mixLines ').mouseover(function () {
//    $(this).siblings().removeClass("shadowChange");
//    $(this).addClass("shadowChange")
//}).mouseout(function () {
//    $(this).removeClass("shadowChange")
//})