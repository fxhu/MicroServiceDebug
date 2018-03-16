$(function(){
    //1 获取与本次报警有关的信息
    $.ajax({
        type: "get",
        dataType: "json",
        url: authorityHost+"AlarmEventTool/GetAlarmInfo?id=" + GetUrlParam("alarmid"),
        success: function (data) {
            if (data.areaType == 2) {
                var asset=GetAssestById(GetUrlParam("id"));                
                var parentAreaInfo=getParentAreaInfoByChildId(asset.areaId);
                if(parentAreaInfo.mapType=="2D"){
                    window.location.href = "AlarmMonitor_Indoor_2d.html?id=" + GetUrlParam("id") + "&alarmid=" + GetUrlParam("alarmid") + "&returnUrl=" + GetUrlParam("returnUrl") + "&noback=" + GetUrlParam("noback");
                    return;
                }else{
                    //室内地图，跳转
                    window.location.href = "AlarmMonitor_Indoor.html?id=" + GetUrlParam("id") + "&alarmid=" + GetUrlParam("alarmid") + "&returnUrl=" + GetUrlParam("returnUrl") + "&noback=" + GetUrlParam("noback");
                    return ;
                }
            }
            else {
                //加载报警状态
                LoadAlarm();
                //显示报警详情
                ShowAlarmInfo(data);
                $("#emergency").show(200);
                //报警按钮
                ShowButton(data.confirmTime != null, data.auditedTime != null);
            }
        }
    });
})
function ShowAlarmInfo(data) {
    $("#alarmTime").html();
    var users = [];
    $.each(data.users, function (idx, item) {
        users.push(item.name + " " + (item.phoneNumber==null?"":item.phoneNumber));
    });
    $("#alarmUsers").html(users.join("<br />"));
    $("#alarmTime").html(data.createTimeStr);
    var plans = [];
    $.each(data.plans, function (idx, item) {
        plans.push("<a href='javascript:void(0)' onclick='ShowFirePlan(\"" + item.id + "\")'>" + item.planName + "</a>");
    });
    $("#alarmPlan").html(plans.join("<br />"));
}
//加载报警状态
function LoadAlarm()
{
    $.ajax({
        type: "get",
        dataType: "json",
        url: authorityHost+"AlarmEventTool/GetAlarmMonitor?alarmid=" + GetUrlParam("alarmid"),
        success: function (data) {
            //1 加载百度地图
            map = new BMap.Map("allmap", { enableMapClick: false, mapType: BMAP_SATELLITE_MAP });
            map.enableScrollWheelZoom(true);
            //map.addControl(new BMap.NavigationControl());
            map.setMapStyle({ style: 'bluish' });
            LoadExtPic();
            map.centerAndZoom(new BMap.Point(data.x, data.y), 19);
            //2 加载着火点
            LoadFireMarker(data);
            //3 闪动
            LabelFlash();
            //4 定位到报警位置
            map.panTo(new BMap.Point(data.x, data.y));
            //4 加载资产数据
            GetAssestById(GetUrlParam("Id"), function (assest) {
                var template = GetTemplateByName(assest.templateName);
                //3 显示报警详情
                ShowDetail(template, assest);
                //4 显示联动摄像头
                ShowVideo(assest);
                
                //7 实时数据刷新
                setTimeout("DataRefresh()", 5000);
            });
        }
    });
}
function LabelFlash()
{
    $(".BMapLabel").each(function () {
        var $this = $(this);
        if ($this.hasClass("bg-warning")) {
            $this.removeClass("bg-warning");
            $this.css("backgroundColor", "white");
        }
        else {
            $this.addClass("bg-warning");
            $this.css("backgroundColor", "rgb(240,173,78)");
        }
    });
    setTimeout("LabelFlash()",500);
}
function confirmAlarm(type) {
    ConfirmAlarm(type, GetUrlParam("alarmId"), GetUrlParam("Id"));
}
function BuildLabelText(data) {
    var html = []
    html.push(data.fullName + "发生告警！<br/>");
    html.push("来源：" + data.assestTypeName + " - " + GetExtAttrValue(data, "资产编号") +"<br/>");
    return html.join("");
}
var dataTimer = null;
function DataRefresh() {
    if (dataTimer != null) { clearTimeout(dataTimer); }
    //查询最新数据并加载图标
    if (GetUrlParam("Id") != "") {
        RenewData();
        //定时执行
        if (dataTimer != null) { clearTimeout(dataTimer); }
        dataTimer = setTimeout("DataRefresh()", 5000)
    }
    else {
        dataTimer = setTimeout("DataRefresh()", 5000);
    }
}
//查询并加载图标
function DoQuery(callback) {
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: callback != null,
        data: {
            AssestId: GetUrlParam("Id")
        },
        success: function (data) {
            cachedAssests = data;
            if (callback != null) {
                callback();
            }
        }
    });
}
//设置可自动刷新,添加标记
function SetAutoRefresh(obj, content, assestId) {
    try {
        if (!$(obj).hasClass("auto-refresh")) {
            $(obj).addClass("auto-refresh");
        }
        $(obj).attr("ref-content", content);
        $(obj).attr("ref-assestid", assestId);
    }
    catch (e) {
        console.log(e.message);
    }
}
function RenewData() {
    $(".auto-refresh").each(function () {
        var cur = $(this);
        if (!cur.is(":hidden")) {
            cur.html(SynaxText(cur.attr("ref-content"), GetAssestById(cur.attr("ref-assestid"))));
        }
    })
}
//按钮面板显示逻辑
function ShowButton(isConfirm, isAudit) {
    
    if (!isAudit) {
        //按钮
        if (isConfirm) {
            $("#btnRecure").removeClass("hide");
        }
        else {
            $("#btnConfirm").removeClass("hide");
            $("#btnFalseReport").removeClass("hide");
        }
        
        //1 操作面板
        $(".handlepanel").removeClass("hide");
        $(".handlepanel").css("left", ($(window).width() - $(".handlepanel").outerWidth()) / 2);
    }
    //3 显示返回按钮
    if (GetUrlParam("noback") != "1") {
        $("#btnBack").removeClass("hide");
    }
}
function ToIndoor(id, alarmid) {
    window.location.href = "AlarmMonitor_Indoor.html?id=" + id + "&alarmid=" + alarmid + "&returnUrl=" + GetUrlParam("returnUrl");
}
function LoadFireMarker(data)
{
    marker = new BMap.Marker(new BMap.Point(data.x, data.y));
    var icon = new BMap.Icon("images/fire.gif", new BMap.Size(70, 100));
    icon.setImageSize(new BMap.Size(70, 100));
    //图标
    marker.setIcon(icon);
    marker.setShadow(icon);
    $(".titlepanel").html(data.fullName + "发生告警");
    //标题
    $(".titlepanel").removeClass("hide");
    $(".titlepanel").css("left", ($(window).width() - $(".titlepanel").outerWidth()) / 2);

    //描述
    var label = new BMap.Label(BuildLabelText(data), {
        position: new BMap.Point(data.x, data.y),
        offset: new BMap.Size(30, 100)
    });
    label.setStyle({
        color: "red",
        fontSize: "12px",
        padding:"10px",
        fontFamily: "微软雅黑",
        display: "block",
        maxWidth:"900px",
        border: "solid 1px #440099",
        borderRadius: "5px",
        boxShadow:"#222 1px 1px 1px"
    });
    marker.setLabel(label);

    map.addOverlay(marker);
    
}
function ShowDetail(template, assest) {
    if (template.description) {
        var html = SynaxText(template.description, assest);
        $("#assestDesc table").html(html);
        $("#assestDesc").css("display", "none");
        $("#assestDesc").show(200);
        //设置可自动刷新
        SetAutoRefresh($("#assestDesc table")[0], template.description, assest.id);
    }
}
function SynaxText(source, assest) {
    if(assest==null){return;}
    //1 替换对象属性
    var regex = new RegExp("#\{([^\}]*)\}", "g");
    var result = source.match(regex);
    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            var attrReg = new RegExp(result[i], "g");
            var attrValue = assest[result[i].substring(2, result[i].length - 1)];
            source = source.replace(attrReg, attrValue == null ? "" : attrValue);
        }
    }
    //2 替换扩展属性
    regex = new RegExp('@\{([^\}]*)\}', "g");
    result = source.match(regex);
    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            var attrReg = new RegExp(result[i], "g");
            var val = GetAssestExtAttr(assest, result[i].substring(2, result[i].length - 1));
            source = source.replace(attrReg, val);
        }
    }
    return source;
}
//获取资产的扩展属性
function GetAssestExtAttr(assest, attrName) {
    if (assest.extAttrs == null) {
        return "";
    }
    for (var i = 0; i < assest.extAttrs.length; i++) {
        if (assest.extAttrs[i].name == attrName) {
            return assest.extAttrs[i].value;
        }
    }
    return "";
}
var CacheVisualTemplate;
function GetTemplateByName(templateName) {
    if (CacheVisualTemplate == null) {
        $.ajax({
            type: "get",
            url: "VisualTemplate.json",
            async: false,
            success: function (data) {
                CacheVisualTemplate = data;
            },
            error: function (err) {

            },
            complete: function () {

            }
        });
    }
    //从模板中解析
    for (var i = 0; i < CacheVisualTemplate.length; i++) {
        if (CacheVisualTemplate[i].name == templateName) {
            return CacheVisualTemplate[i];
        }
    }
}
function GetAssestById(id, callback) {
    var rt = null;
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: callback!=null,
        data: {
            AssestId: id
        },
        success: function (data) {
            if (callback != null && typeof (callback) == "function") {
                callback(data[0]);
            }
            rt = data[0];
        }
    });
    return rt;
}
function ShowVideo(assest) {
    try {
        $.ajax({
            type: "get",
            url: authorityHost+"Camera/GetNearByCameras",
            data: {
                AssestPointCode: assest.code
            },
            success: function (data) 
            {
                if(data.length>0)
                {
                    var canvas1 = document.getElementById('videoCanvas');
                    var player1 = new JSMpeg.Player(data[0].serverAdress, { canvas: canvas1 });
                    $("#videobox").show();
                    $("#videobox").find(".video-title").html(data[0].cameraName + "-实时监控");
                }
            }
        });
    }
    catch (e) {
        console.error(e);
    }
    
}