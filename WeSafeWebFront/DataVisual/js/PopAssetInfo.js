var $loadassertisbusyindi;
var $infopanelforassetdetialpop;

$(function () {
    $loadassertisbusyindi = $("#assertdetialsloadingimg");
    $infopanelforassetdetialpop = $("#assetContent");
    var assetId = Common.getQueryString("id");   
    var oAsset = new AssetRecordObj(assetId);
    oAsset.init();    
});

var AssetRecordObj = function (assetId) {
    var oAsset = new Object();
    oAsset.assetId = assetId;
    oAsset.init = function () {
        this.LoadingShow();
        if (!assetId) {
            this.reset();
        }
        else {
            $("#assertdetialsloadingimg").html('').removeClass("nobg");
        }
        var id = this.assetId;
        var callback = this.LoadingHide;
        $.ajax({
            method: "GET",
            url: authorityHost + "AssertDetails/GetLatestCheckRecord",
            data: { assestId: id },
            success: function (data, textStatus, jqXHR) {
                var checkdatasample = oAsset.FormatCheckRecord(data);
                var maintain = oAsset.FormatMaintainRecord(data);
                var change = oAsset.FormatChangeRecord(data);
                var inspect = oAsset.FormatInspectRecord(data);

                var $infopanelheadera = $infopanelforassetdetialpop.find(".panel-heading").find("span:first");
                $infopanelheadera.html(data.device.deviceName + " - " + data.device.code);

                if (checkdatasample == null && maintain == null && change == null && inspect == null) {
                    $("#assetdetialreport").html("");
                }
                else {
                    $("#assetdetialreport").html("详细");
                    $("#assetdetialreport").click(function () {
                        window.top.location.href = "/default.html#!/assertReport?dId=" + data.device.deviceId + "&dNum=" + data.device.code + "&dName=" + data.device.deviceName;
                    });
                }

                function CreateRecordTable(data) {
                    if (data == null) {
                        return "没有数据";
                    }
                    else {
                        var tb = '<table class="table table-striped table-bordered table-condensed assettabledetial" style="margin-bottom:8px;">';
                        $.each(data, function (idx, item) {
                            tb += "<tr><td>" + item.title + "</td><td>" + item.data + "</td></tr>";
                        });
                        tb += "</table>";
                        return tb;
                    }
                };
                var html = CreateRecordTable(checkdatasample);
                $("#checklistdiv").html(html);
                html = CreateRecordTable(maintain);
                $("#miantainlistdiv").html(html);
                html = CreateRecordTable(change);
                $("#changelistdiv").html(html);
                html = CreateRecordTable(inspect);
                $("#inspectlistdiv").html(html);
            },
            error: function (jqXHR, textStatus, errorThrow) { },
            complete: function (jqXHR, textStatus) {
                if (callback) {
                    callback();
                }
            }
        });
    };
    oAsset.reset = function () {
        $("#checklistdiv").html("");
        $("#miantainlistdiv").html("");
        $("#changelistdiv").html("");
        $("#inspectlistdiv").html("");
        $("#assertdetialsloadingimg").html('<span class="label label-primary" style="line-height:100px;font-size:30px">当前资产暂未安装！</span>').removeClass("nobg").addClass("nobg");
    };
    oAsset.LoadingShow = function () {
        $loadassertisbusyindi.show();
    };
    oAsset.LoadingHide = function () {
        $loadassertisbusyindi.hide();        
    };
    //巡检记录
    oAsset.FormatCheckRecord = function (data) {
        if (data.latestDeviceCheck != null) {
            var d = [];
            d.push({
                title: "最后巡检",
                data: data.latestDeviceCheck.checkDateDesc
            });
            d.push({
                title: "巡检人",
                data: data.latestDeviceCheck.checkedBy
            });
            d.push({
                title: "状态",
                data: data.latestDeviceCheck.status
            });
            return d;
        }
        else {
            return null;
        }
    };
    //维保记录
    oAsset.FormatMaintainRecord = function (data) {
        if (data.latestDeviceMaintain != null) {
            var d = [];
            d.push({
                title: "最后维保",
                data: data.latestDeviceMaintain.checkTimeDesc
            });
            d.push({
                title: "维保人",
                data: data.latestDeviceMaintain.dutyPeopleName
            });
            d.push({
                title: "状态",
                data: data.latestDeviceMaintain.status
            });
            return d;
        }
        else {
            return null;
        }
    };
    //更换记录
    oAsset.FormatChangeRecord = function (data) {
        if (data.latestDeviceReplace != null) {
            var d = [];
            d.push({
                title: "最后更换",
                data: data.latestDeviceReplace.replaceDateDesc
            });
            d.push({
                title: "更换人",
                data: data.latestDeviceReplace.replacePerson
            });
            d.push({
                title: "更换前",
                data: data.latestDeviceReplace.before
            });
            d.push({
                title: "更换后",
                data: data.latestDeviceReplace.after
            });
            return d;
        }
        else {
            return null;
        }
    };
    //检测记录
    oAsset.FormatInspectRecord = function (data) {
        if (data.latestDeviceInspect != null) {
            var d = [];
            d.push({
                title: "最后检测",
                data: data.latestDeviceInspect.checkTimeDesc
            });
            d.push({
                title: "检测人",
                data: data.latestDeviceInspect.dutyPeopleName
            });
            d.push({
                title: "状态",
                data: data.latestDeviceInspect.status
            });
            return d;
        }
        else {
            return null;
        }
    };
    return oAsset;
};

function CloseIframeBox() {
    var url = window.location.pathname + window.location.search;
    var iframes = $(parent.window.document).find("iframe");
    $.each(iframes, function (idx,item) {
        var ifmUrl = $(item).attr("src");
        if (ifmUrl == url) {
            $(item).parent().addClass("hide");
        }
    });
}