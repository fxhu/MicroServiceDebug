$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);
    $.getJSON(RptCommon.Host + "api/company/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });

    var oDevice = new DeviceLineChart(areaId);
    oDevice.drawNormal();
    oDevice.drawBroken();
    oDevice.drawDestory();

    var oCompareChart = new CompareChart(areaId);
    oCompare.CreateSelects();
    oCompareChart.drawChart();
    oCompare.CreateBtns();

    var oPieChart = new PieChart(areaId);
    oPieChart.drawChart();
});

var DeviceLineChart = function (areaId) {
    var oDevice = new Object();
    oDevice.svrUrl = RptCommon.Host + "api/company/DeviceReport/FindDailyRate/" + areaId + "/";
    oDevice.drawNormal = function () {
        var contentId = "line_Normal";
        var statusVal = "3";//正常
        var txt = DeviceType.GetDeviceTypeTxt(statusVal);
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
            EchartsHelper.drawLine(contentId, arr2, EchartsHelper.Lines.Normal, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    oDevice.drawBroken = function () {
        var contentId = "line_Broken";
        var statusVal = "1";//故障
        var txt = DeviceType.GetDeviceTypeTxt(statusVal);
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
            EchartsHelper.drawLine(contentId, arr2, EchartsHelper.Lines.Broken, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    oDevice.drawDestory = function () {
        var contentId = "line_Destory";
        var statusVal = "2";//销毁
        var txt = DeviceType.GetDeviceTypeTxt(statusVal);
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
            EchartsHelper.drawLine(contentId, arr2, EchartsHelper.Lines.Destroy, {
                title: txt + "率",
                data: arr1
            }, {
                    title: txt
                });
        });
    };
    return oDevice;
};

var CompareChart = function (areaId) {
    oCompare = new Object();
    oCompare.status = "1";
    oCompare.svrUrl = RptCommon.Host + "api/company/DeviceReport/FindTHRateCompare/" + areaId;
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
        $.each(DeviceType.Enum, function (idx, item) {
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
    oPie.svrUrl = RptCommon.Host + "api/company/DeviceReport/FindLatestDeviceCount/" + areaId;
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
                var txt = DeviceType.GetDeviceTypeTxt(val);
                if (txt != "") {
                    arrName.push(txt);
                    arrVal.push(item.value);
                    jsonData.push({
                        name: txt,
                        value: item.value
                    });
                    $("#DevicepieItems").append("<li><p>" + txt + "</p><div>" + item.value + "</div></li>");
                }
            });

            EchartsHelper.drawRing("Device_pie", arrName, {
                radius: ['30%', '50%'],
                //label: {
                //    normal: {
                //        show: true,
                //        position: 'outside',
                //        textStyle: {
                //            fontSize: '16',
                //            fontWeight: 'bold'
                //        }
                //    },
                //    emphasis: {
                //        show: true,
                //        formatter: '{d}%',
                //        textStyle: {
                //            fontSize: '16',
                //            fontWeight: 'bold'
                //        }
                //    }
                //},             
                data: jsonData
            }, {
                    title: "资产",
                    Colors: EchartsHelper.Colors.Device
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