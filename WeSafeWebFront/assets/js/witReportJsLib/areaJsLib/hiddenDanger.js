$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);
    $.getJSON(RptCommon.Host + "/api/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });
    var oHillChart = new HillChart(areaId);
    oHillChart.drawFinish();
    oHillChart.drawNotPassed();
    oHillChart.drawWaitForCheck();
    oHillChart.drawWaitForCorrect();
    oHillChart.drawWaitForApproval();
    oHillChart.drawOerdue();

    var oCompareChart = new CompareChart(areaId);
    oCompare.CreateSelects();
    oCompareChart.drawChart();
    oCompare.CreateBtns();

    var oPieChart = new PieChart(areaId);
    oPieChart.drawChart();
});

var HillChart = function (areaId) {
    var oHill = new Object();
    oHill.svrUrl = RptCommon.Host + "/api/HiddenDangerReport/FindDailyRate/" + areaId + "/";
    oHill.drawFinish = function () {
        var contentId = "line_Finish";
        var statusVal = "6";//已闭环
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {

            data = ReportDataTransformList(data);

            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.blue, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oHill.drawNotPassed = function () {
        var contentId = "line_NotPassed";
        var statusVal = "2";//待指派
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.yellow, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oHill.drawWaitForCheck = function () {
        var contentId = "line_WaitForCheck";
        var statusVal = "4";//待复查
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.orange, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oHill.drawWaitForCorrect = function () {
        var contentId = "line_WaitForCorrect";
        var statusVal = "3";//待整改
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.green, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });

    };
    oHill.drawWaitForApproval = function () {
        var contentId = "line_WaitForApproval";
        var statusVal = "1";//待审核
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.purple, {
                title: txt + "率",
                data: arr1
            }, {
                    title: "待审核"
                });
        });
    };
    oHill.drawOerdue = function () {
        var contentId = "line_Overdue";
        var statusVal = "7";//已逾期
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(oHill.svrUrl + statusVal, function (data) {
            data = ReportDataTransformList(data);

            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar(contentId, arr2, EchartsHelper.Hills.pink, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    return oHill;
};

var CompareChart = function (areaId) {
    oCompare = new Object();
    oCompare.status = "1";
    oCompare.svrUrl = RptCommon.Host + "/api/HiddenDangerReport/FindTHRateCompare/" + areaId;
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
        $.each(HiddenDanger.Enum, function (idx, item) {
            if (item.val !== "5")
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
    oPie.svrUrl = RptCommon.Host + "/api/HiddenDangerReport/FindLatestHiddenDangerCount/" + areaId;
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
                var txt = HiddenDanger.GetHiddenDangerTxt(val);
                if (txt != "") {
                    arrName.push(txt);
                    arrVal.push(item.value);
                    if (val == "7") { }
                    else
                        jsonData.push({
                            name: txt,
                            value: item.value
                        });
                    $("#pieItems").append("<li><p>" + txt + "</p><div>" + item.value + "</div></li>");
                }
            });

            EchartsHelper.drawRing("hiddenDanger_pie", arrName, jsonData, {
                title: "隐患",
                Colors: EchartsHelper.Colors.HiddenDanger
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
    return oPie;
};