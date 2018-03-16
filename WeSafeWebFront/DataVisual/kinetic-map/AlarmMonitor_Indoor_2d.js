var map;
var layer = [],
    distance = !1;
var scene,KineticMap,view;
var images;
var layerInfo={id:0,name:null};
var mapDivId="fengMap";
//上次事件的ID
var Last_EventID;
$(function () {
    require(["./kinetic-map"],function(main){
        KineticMap=main.KineticMap;
        scene=main.scene;
        //1 获取区域信息
        var assest = GetAssestById(GetUrlParam("id"));
        if (assest != null)
        {
            LoadMap(assest.areaId);
        }
    })

});
var areaMNG;
function LoadMap(areaId) {
    areaMNG = new AreaMNG(areaId);
    areaInfo=areaMNG.GetAreaInfo();
    layerInfo={id:GetExtAttrValue(areaInfo,"层号"),name:areaInfo.name};
    var mapID=areaMNG.GetMapID();
    var pre="/DataVisual/data/"+mapID+"/";
    $("#parkName").html(areaInfo.name);
    //初始化地图
    if(layerInfo.name!=null) {
        if(layerInfo.id==0||layerInfo.id==undefined||layerInfo.id==null){
            tipMsgInChinese();
            return ;
        }
        images = [];//底图图片资源，项目实际情况修改
        images.push({id:layerInfo.id,src:pre+layerInfo.id+".png"});
        if(images.length==0)return;
        view = KineticMap.init(mapDivId, images, layerInfo.id);
        view.on("click", function (e) {
        });
        var layerGraph = {
            layerProp: {
                id: "testlayer",
                name: "layer",
                x: 0, //x和y是相对于div的左上角的坐标
                y: 0,
                width: $("#" + mapDivId).width(),//width和height需要根据div大小进行修改
                height: $("#" + mapDivId).height(),
                visible: true,
                clearBeforeDraw: true
            },
        };
        //新建存放文本标记的图层
        var lay1 = new scene.GraphLayer(layerGraph,view);
        view.addLayer(lay1);
        afterMapComplete();
    }
}
function afterMapComplete() {
    //1 加载基础数据
    var assest = GetAssestById(GetUrlParam("id"));
    var template = GetTemplateByName(assest.templateName);
    //2 加载标记
    LoadImgMarkers([assest]);
    //3 显示报警详情
    ShowDetail(template, assest);
    //4 显示联动摄像头
    ShowVideo(assest);
    //5 显示应急预案
    ShowEmergency(assest);
    ShowPositionInfo();
    //7 标记逃生路线
    //ShowExit(assest);
    //8 显示火特效
    ShowFire(assest);

    //9 开始实时数据刷新
    setTimeout("StartRefresh()", 2000);
}
//加载报警相关信息
function ShowAlarmInfo() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: authorityHost+"AlarmEventTool/GetAlarmInfo?id=" + GetUrlParam("alarmId"),
        success: function (data) {
            //按钮显示隐藏
            ShowButton(data.confirmTime != null, data.auditedTime!=null);
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
    });
}
function LoadDetail()
{

}
var gifDefaultWidth=100;
var gifDefaultHeight=100;
function ShowFire(assest)
{

   /* bubbleObj = new createBubble(map);
    var position = {
        //设置气泡的x坐标
        x: assest.x,
        //设置气泡的y坐标
        y: assest.y,
        //设置气泡的高度
        z: map.getGroupHeight(map.focusGroupID)-3,
        //设置气泡的自定义属性
        name: ""
    };
    bubbleObj.bubbledomEvent(position);*/

    var g=view.children[1].getGraphbyId(assest.id);
    //g.visible(false);
    var xyJson=KineticMap.simpleTransformCoor(assest.x,assest.y);
    var gifProp= {
        typeName: "gif",
        shapeProp: {
            id: assest.id+"gif",
            name: assest.name,
            x: xyJson.x,
            y: xyJson.y,
            offsetX:gifDefaultWidth/2,
            offsetY:gifDefaultHeight-10,
            width: gifDefaultWidth,
            height:gifDefaultHeight,
            src: "./images/fire.gif"
        }
    }
    var graph = scene.GraphFactory.create(gifProp, view, view.children[1]);
    view.children[1].draw();
}
function ShowExit(assest)
{
    var areaModel = areaMNG.GetAreaInfo();
    var exit = GetAssestExtAttr(areaModel, "出口坐标");
    if (exit != null && exit != "")
    {
        var points = exit.split(";");
        var coords = [];
        for (var i = 0; i < points.length; i++) {
            
            //导航坐标
            coords.push({ x: points[i].split(",")[0], y: points[i].split(",")[1], groupID: 1 });
        }
        //导航到出口
        NaviToExit(assest,coords);
    }
    
}
var navis = [];
function NaviToExit(assest, coord) {
    for (var i = 0; i < coord.length; i++)
    {
        navi = new fengmap.FMNavigation({
            map: map,
            locationMarkerUrl: 'images/pointer.png',
            //设置Marker尺寸
            locationMarkerSize: 43,
            speed: 5,//模拟导航定位图标行进的速度，单位m/s。默认5m/s
            //设置地图是否选择，默认false
            followAngle: false,
            //导航线与楼层之间的高度偏移设置。默认是1。
            offsetHeight: 1,
            //设置跟随定位的默认为true
            followPosition: false,
            changeTiltAngle: false,
            //导航跟随倾斜角度
            tiltAngle: 80,
            //导航跟随显示级别
            scaleLevel: 1,
            // 设置导航线的样式
            lineStyle: {
                // 导航线样式
                lineType: fengmap.FMLineType.FMARROW,
                // 设置线的宽度
                lineWidth: 6,
            }
        });
        //添加起点
        navi.setStartPoint({
            x: assest.x,
            y: assest.y,
            groupID: areaMNG.GetFloorId(),
            size: 80
        });

        //添加终点
        navi.setEndPoint({
            x: coord[i].x,
            y: coord[i].y,
            groupID: areaMNG.GetFloorId(),
            url: 'images/savety.gif',
            height:0.5,
            size: 32
        });
        // 画出导航线
        navi.drawNaviLine();
        navis.push(navi);
    }
    
}; 
function ShowPositionInfo()
{
    $.getJSON(authorityHost+"VisualArea/AreaListByType?AreaType=" + areaMNG.GetAreaInfo().areaType, function (data) {
        $(data).each(function () {
            if (this.id == areaMNG.GetAreaInfo().id)
            {
                $(".titlepanel").html(this.name + " 发生告警");
                //显示报警信息
                setTimeout("ShowAlarmInfo()");
            }
        })
    })
}
//按钮面板显示逻辑
function ShowButton(isConfirm, isAudit) {
    //标题
    $(".titlepanel").removeClass("hide");
    $(".titlepanel").css("left", ($(window).width() - $(".titlepanel").outerWidth()) / 2);

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
function confirmAlarm(type)
{
    ConfirmAlarm(type, GetUrlParam("alarmId"), GetUrlParam("id"));
}
function ShowEmergency(assest)
{    
    $("#emergency").show(200);
}
function ShowVideo(assest)
{
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
var _curBuildingId;
function GetCurBuildingId() {
    if (_curBuildingId != null) {
        return _curBuildingId;
    }
    else {
        return GetUrlParam("BuildingId");
    }
}


//关闭激活状态
function CancelActiveState() {
    //关闭当前的弹框
    ClosePopWindow();
    //关闭属性窗口
    $('#assestDesc').hide(200);
}
//开始刷新
function StartRefresh() {
    //1 报警刷新
    AlarmRefresh();
    //2 数据刷新
    DataRefresh();
}
//开始报警状态刷新
var alarmTimer = null;
function AlarmRefresh() {
    try {
        //刷新报警状态
        for (var i = 0; i < imglayers.length; i++) {
            for (var j = 0; j < imglayers[i].markers.length; j++) {
                var curobj = imglayers[i].markers[j];
                if (curobj.visible) {
                    //找到对应的资产对象
                    var assest = GetAssestById(curobj.opts_.id);
                    if (assest.state == "1") {
                        //故障
                        var url = (curobj.opts_.url == curobj.opts_.icon ? curobj.opts_.icon_broken : curobj.opts_.icon);
                        if (curobj.url != url) {
                            curobj.url = url;
                        }

                    }
                    else if (assest.state == "2") {
                        //报警
                        var url = (curobj.opts_.url == curobj.opts_.icon ? curobj.opts_.icon_warn : curobj.opts_.icon);
                        if (curobj.url != url) {
                            curobj.url = url;
                        }
                    }
                    else {
                        //正常
                        if (curobj.url != curobj.opts_.icon) {
                            curobj.url = curobj.opts_.icon;
                        }
                    }
                }
            }
        }
    } catch (e) { }
    alarmTimer = setTimeout("AlarmRefresh()", 300);
}
//开始报警和实时数据刷新
var dataTimer = null;
function DataRefresh() {
    if (dataTimer != null) { clearTimeout(dataTimer); }
    //查询最新数据并加载图标
    DoQuery(true, function () {
        RenewData();
        //定时执行
        if (dataTimer != null) { clearTimeout(dataTimer); }
        dataTimer = setTimeout("DataRefresh()", 5000)
    });
}
function RenewData() {
    $(".auto-refresh").each(function () {
        var cur = $(this);
        if (!cur.is(":hidden")) {
            cur.html(SynaxText(cur.attr("ref-content"), GetAssestById(cur.attr("ref-assestid"))));
        }
    })
}


var cachedAssests;
function GetCachedAssests() {
    if (cachedAssests == null) {
        DoQuery(false);
    }
    return cachedAssests;
}
//查询并加载图标
function DoQuery(loadMarker,callback) {
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: callback!=null,
        data: {
            AssestId: GetUrlParam("Id")
        },
        success: function (data) {
            cachedAssests = data;
            if (callback != null)
            {
                callback();
            }
        }
    });
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
function GetAssestById(id) {
    var allAssests = GetCachedAssests();
    //从模板中解析
    for (var i = 0; i < allAssests.length; i++) {
        if (allAssests[i].id.toUpperCase() == id.toUpperCase()) {
            return allAssests[i];
        }
    }
}
//添加图片标记
var defaultWidth=20;
var defaultHeight=20;
function addImgMarker(option) {
    var template = GetTemplateByName(option.templateName);
    var marker = GetMarkerById(option.id);
    if (marker != null) {
        marker.visible(true);
    }
    else {
        //已经存在，则显示，否则重新添加
        var coor=KineticMap.simpleTransformCoor(parseInt(option.x),parseInt(option.y));
        //定义图片单元参数
        var imageProp= {
            typeName: "image",
            shapeProp: {
                id:option.id,//id必须指定，并且不能重复
                name:option.name,
                x: coor.x,
                y: coor.y,//蜂鸟地图为左下角坐标系
                offsetX:defaultWidth/2,
                offsetY:defaultHeight,
                width: defaultWidth,//根据实际情况调整，有放大缩小效果
                height: defaultHeight,
                srcId: template.name+"_icon",//图片路径
                draggable:false //false为不能抓取移动
            },
        }

        marker = scene.GraphFactory.create(imageProp, view, view.children[1]);
        var scale=view.children[0].getAttr("scale");
        marker.setAttrs({scaleX:1/scale.x,scaleY:1/scale.y});
        marker.assetTemplate=template;
        marker.assetDetail=option;
        //marker绑定事件
        marker.on("click",function(e){
            e.cancelBubble = true;
            markerBindEvent(e.target);
        })
    }
    return marker;
}
function markerBindEvent(t){
    console.log(t);
}
function GetMarkerById(id) {
    var imgMarkers=view.children[1].children;
    for (var i = 0; i < imgMarkers.length; i++) {
        if(imgMarkers[i].getAttr("id")==id){
            return imgMarkers[i];
        }
    }
    return null;
}
//加载图片标记
function LoadImgMarkers(data) {
    //1 先将所有的元素隐藏
    //for (var i = 0; i < imglayers.length; i++) {
    //    for (var j = 0; j < imglayers[i].markers.length; j++) {
    //        imglayers[i].markers[j].visible = false;
    //    }
    //}
    //2 添加图片标记
    for (var i = 0; i < data.length; i++) {
        addImgMarker(data[i]);
    }
}

function SynaxText(source, assest) {
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
//触发点击后事件
function FireAfterClickEvent(event, template, assest) {
    var code = template.afterClick;
    if (code) {
        code = SynaxText(code, assest);
        if (code) {
            try {
                eval(code);
            }
            catch (e) {
                alert(e.message);
            }
        }
    }
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
//显示弹框
function ShowPopupWindow(event, template, assest) {
    var assestId = event.opts_.id;
    if (template.popWindow && template.popWindow.content) {
        var content = SynaxText(template.popWindow.content, assest);
        var width = template.popWindow.width || 200;
        var height = template.popWindow.height || 100;
        if (template.popWindow.showType == "map") {
            //在地图中显示
            var ctlOpt = new fengmap.controlOptions({
                mapCoord: {
                    x: event.opts_.x,
                    y: event.opts_.y,
                    groupID: event.opts_.groupid
                },
                width: width,
                height: height,
                marginTop: 10,
                content: content
            });
            ClosePopWindow();
            //添加弹框到地图上
            popMarker = new fengmap.FMPopInfoWindow(map, ctlOpt);
            //调整下样式
            $(".fm-control-popmarker").css("padding", "10px");
            $(".fm-control-popmarker input").css("top", "3px").css("right", "3px").css("cursor", "pointer");
            $(".fm-control-popmarker div").css("height", "100%");
            //设置可自动刷新
            SetAutoRefresh($(".fm-control-popmarker div")[0], template.popWindow.content, assestId);
        }
        else {
            $(".videobox-body").html(content);
            $(".videobox").modal({ backdrop: false })
        }
    }
}
//关闭当前弹窗
function ClosePopWindow() {
    if (popMarker != null) {
        try {
            popMarker.close();
        }
        catch (e) {
        }
    }
}
var popMarker;
var polygonLlayer, markerLayerArr = [],
    naviLines = [],
    infoLayer = null,
    viewMode = !1;

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