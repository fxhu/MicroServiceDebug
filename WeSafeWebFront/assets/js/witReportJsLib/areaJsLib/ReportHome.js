$(document).ready(function () {
    var areaId = RptCommon.GetAreaId();
    RptCommon.ApplyAreaId(areaId);

    document.getElementById("wesafedesktopa").href = RptCommon.WeSafeHost;

    $.getJSON(RptCommon.Host + "/api/BasicData/GetAreaName/" + areaId, function (data) {
        data = ReportDataTransformSingle(data);
        $("#areaName").html(data);
    });

    
 

    var oDevice = new HomeDevice(areaId);
    oDevice.ShowDevicePie();
    oDevice.ShowDeviceLine();

    var oAlarm = new HomeAlarm(areaId);
    oAlarm.ShowAlarmPie();
    oAlarm.ShowAlarmLine();

    var oHidden = new HomeHidden(areaId);
    oHidden.ShowHiddenPie();
    oHidden.ShowHiddenLine();

    var oPartrol = new HomePartrol(areaId);
    oPartrol.ShowPartrolPie();
    oPartrol.ShowPartrolLine();

    var oRepair = new HomeRepair(areaId);
    oRepair.ShowRepairPie();
    oRepair.ShowRepairLine();

    var oCheck = new HomeCheck(areaId);
    oCheck.ShowCheckPie();
    oCheck.ShowCheckLine();

    var oMaintain = new HomeMaintain(areaId);
    oMaintain.ShowMaintainPie();
    oMaintain.ShowMaintainLine();

});

var HomeDevice = function (areaId) {
    var oDevice = new Object();
    oDevice.svrUrl = RptCommon.Host + "/api/DeviceReport";
    oDevice.ShowDevicePie = function () {
        $.getJSON(this.svrUrl + "/FindLatestDeviceCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
            data = data.sort(function (a, b) {
                return parseInt(b.name) - parseInt(a.name)
            });
            var checkedVal = "3";//正常
            var checkedIdx = 0;
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
                }
                if (checkedVal == val) {
                    checkedIdx = idx;
                }
            });

            EchartsHelper.drawPie("pieDevice", arrName, EchartsHelper.Colors.Device, jsonData, undefined, function (myChart) {
                //myChart.dispatchAction({
                //    type: 'pieSelect',
                //    dataIndex: checkedIdx
                //});
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: checkedIdx
                });
            });
        })
    };

    oDevice.ShowDeviceLine = function () {
        var statusVal = "3";//正常
        var txt = DeviceType.GetDeviceTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawLine("lineDevice", arr2, EchartsHelper.Lines.Normal, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oDevice;
}

var HomeAlarm = function (areaId) {
    var oAlarm = new Object();
    oAlarm.svrUrl = RptCommon.Host + "/api/WarningReport";
    oAlarm.ShowAlarmPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestWarningCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
            data = data.sort(function (a, b) {
                return parseInt(b.name) - parseInt(a.name)
            });
            var checkedVal = "1";//火警
            var checkedIdx = 0;
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
                if (checkedVal == val) {
                    checkedIdx = idx;
                }
            });

            EchartsHelper.drawPie("pieAlarm", arrName, EchartsHelper.Colors.Alarm, jsonData, undefined, function (myChart) {
                //myChart.dispatchAction({
                //    type: 'pieSelect',
                //    dataIndex: checkedIdx
                //});
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: checkedIdx
                });
            });
        })
    };

    oAlarm.ShowAlarmLine = function () {
        var statusVal = "5";//火警已处理
        var txt = AlarmType.GetAlarmTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawBar("lineAlarm", arr2, EchartsHelper.Bars.red, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oAlarm;
}

var HomeHidden = function (areaId) {
    oHidden = new Object();
    oHidden.svrUrl = RptCommon.Host + "/api/HiddenDangerReport";
    oHidden.ShowHiddenPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestHiddenDangerCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
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
                }
            });

            EchartsHelper.drawRing("HiddenPieChart", {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                },
                data: arrName
            }, {
                    label: EchartsHelper.HomeChartLable,
                    center: ['45%', '50%'],
                    radius: ['30%', '50%'],
                    data: jsonData
                }, {
                    title: {
                        show: false
                    },
                    Colors: EchartsHelper.Colors.HiddenDanger
                }, function (myChart) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: 2
                    });
                });
        })
    };


    oHidden.ShowHiddenLine = function () {
        var statusVal = "6";//已闭环
        var txt = HiddenDanger.GetHiddenDangerTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawHillBar("HiddenLineChart", arr2, EchartsHelper.Hills.blue, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oHidden;
}

var HomePartrol = function (areaId) {
    oPartrol = new Object();
    oPartrol.svrUrl = RptCommon.Host + "/api/PatrolReport";
    oPartrol.ShowPartrolPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestWarningCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
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
                }
            });

            EchartsHelper.drawRing("patrolPieChart", {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                },
                data: arrName
            }, {
                    label: EchartsHelper.HomeChartLable,
                    center: ['45%', '50%'],
                    radius: ['30%', '50%'],
                    data: jsonData
                }, {
                    title: {
                        show: false
                    },
                    Colors: EchartsHelper.Colors.Patrol
                }, function (myChart) {
                    //myChart.dispatchAction({
                    //    type: 'pieSelect',
                    //    dataIndex: checkedIdx
                    //});
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: jsonData.length - 1
                    });
                });
        })
    };

    oPartrol.ShowPartrolLine = function () {
        var statusVal = "4";//已完成
        var txt = PatrolType.GetPatrolTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }


            EchartsHelper.drawFillLine("patrolLineChart", arr2, EchartsHelper.FillLine.blue, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: [{
                        show: false
                    }]
                });
        })
    };
    return oPartrol;
}

var HomeRepair = function (areaId) {
    oRepair = new Object();
    oRepair.svrUrl = RptCommon.Host + "/api/RepairReport";
    oRepair.ShowRepairPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestRepairCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
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
                }
            });

            EchartsHelper.drawRing("RepairPieChart", {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                },
                data: arrName
            }, {
                    label: EchartsHelper.HomeChartLable,
                    center: ['45%', '50%'],
                    radius: ['30%', '50%'],
                    data: jsonData
                }, {
                    title: {
                        show: false
                    },
                    Colors: EchartsHelper.Colors.Task
                }, function (myChart) {
                    //myChart.dispatchAction({
                    //    type: 'pieSelect',
                    //    dataIndex: checkedIdx
                    //});
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: jsonData.length - 1
                    });
                });
        })
    };

    oRepair.ShowRepairLine = function () {
        var statusVal = "3";//已完成
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindRepairDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawTemp("RepairLineChart", arr2, EchartsHelper.Task.Done, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oRepair;
}


var HomeCheck = function (areaId) {
    oCheck = new Object();
    oCheck.svrUrl = RptCommon.Host + "/api/CheckReport";
    oCheck.ShowCheckPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestCheckCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
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
                }
            });

            EchartsHelper.drawRing("CheckPieChart", {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                },
                data: arrName
            }, {
                    label: EchartsHelper.HomeChartLable,
                    center: ['45%', '50%'],
                    radius: ['30%', '50%'],
                    data: jsonData
                }, {
                    title: {
                        show: false
                    },
                    Colors: EchartsHelper.Colors.Task
                }, function (myChart) {
                    //myChart.dispatchAction({
                    //    type: 'pieSelect',
                    //    dataIndex: checkedIdx
                    //});
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: jsonData.length - 1
                    });
                });
        })
    };

    oCheck.ShowCheckLine = function () {
        var statusVal = "3";//已完成
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindCheckDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawEmptyBar("CheckLineChart", arr2, EchartsHelper.Task.Done, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oCheck;
}



var HomeMaintain = function (areaId) {
    oMaintain = new Object();
    oMaintain.svrUrl = RptCommon.Host + "/api/MaintainReport";
    oMaintain.ShowMaintainPie = function () {
        $.getJSON(this.svrUrl + "/FindLatestMaintainCount/" + areaId, function (data) {
            data = ReportDataTransformList(data);
            var arrName = [];
            var arrVal = [];
            var jsonData = [];
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
                }
            });

            EchartsHelper.drawRing("MaintainPieChart", {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                },
                data: arrName
            }, {
                    label: EchartsHelper.HomeChartLable,
                    center: ['45%', '50%'],
                    radius: ['30%', '50%'],
                    data: jsonData
                }, {
                    title: {
                        show: false
                    },
                    Colors: EchartsHelper.Colors.Task
                }, function (myChart) {
                    //myChart.dispatchAction({
                    //    type: 'pieSelect',
                    //    dataIndex: MaintainedIdx
                    //});
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: jsonData.length - 1
                    });
                });
        })
    };

    oMaintain.ShowMaintainLine = function () {
        var statusVal = "3";//已完成
        var txt = TaskType.GetTaskTypeTxt(statusVal);
        $.getJSON(this.svrUrl + "/FindMaintainDailyRate/" + areaId + "/" + statusVal, function (data) {
            data = ReportDataTransformList(data);
            var arr1 = [];
            var arr2 = [];
            lineData = data;
            for (var i = 0; i < data.length; i++) {
                arr1.push(data[i].rate);
                ymd = RptCommon.formatData(data[i].timestamp);
                arr2.push(ymd);
            }
            EchartsHelper.drawLine("MaintainLineChart", arr2, EchartsHelper.Task.Done, {
                title: txt + "率",
                data: arr1
            }, {
                    dataZoom: {
                        show: false
                    },
                    title: {
                        show: false
                    }
                });
        })
    };
    return oMaintain;
}