//地图对象
var map;
//当前选中区域ID
var CurrAreaID;
//上次事件的ID
var Last_EventID;
$(function () {
    var areaId=GetUrlParam("BuildingId");
    //安全分布新的功能出来前的临时方案
    if(!areaId){areaId="2";}
    //1 监听快捷键
    ListenAccessKey();
    areaMNG=new AreaMNG(areaId);
    var areaObj=areaMNG.GetAreaInfo();
    //2 加载下拉选择框
    var areaDropDown=new AreaDropDown(".topleft2",null,areaObj.parentId);
    areaDropDown.init(function(areaId){
        window.location.href=getAreaViewUrl(areaId);
    },areaId);
    //3 加载返回按钮
    if (!OpenBySafeArea()) {
        loadBackButton("#backButtonContainer",areaObj.parentId);
    }
    
    //加载地图
    LoadMap();
});
var areaMNG;
function LoadMap()
{
    var fmapID = areaMNG.GetMapID();
    map = new fengmap.FMMap({
        container: $("#fengMap")[0],
        mapServerURL: "./data/" + fmapID,
        mapThemeURL: "data/theme",
        focusAlphaMode: !0,
        focusAnimateMode: !0,
        modelSelectedEffect: false,
        focusAlpha: .3,
        viewModeAnimateMode: !0,
        defaultMapScaleLevel: areaMNG.GetMapScaleLevel(),
        defaultTiltAngle: 30,
        defaultMinTiltAngle: 10,
        defaultGroupSpace: DefaultGroupSpace,
        key: FengMap_Key,
        appName: FengMap_AppName,
        isSeparate: areaMNG.GetIsSeparate(fmapID),
        groupLoadedCallback: function (layer) {
            loadFloors.push(layer);
            if (map.focusGID == layer) {
                LoadFloorAssest(layer);
            }
        }
    });
    map.openMapById(fmapID);
    map.on("loadComplete",
        function () {
            map.visibleGroupIDs = [1];
            map.focusGID=1;
            map.focusGroupID = 1;
            //1 楼层展示初始化
            InitFloorList(areaMNG, 1, function (curLayer) {
                if ($.inArray(curLayer, loadFloors)>-1)
                {
                    LoadFloorAssest(curLayer);
                }
            });
           
        });
    map.on("mapClickNode",
        function (event) {
            //选择的是标记
            if (event.nodeType == fengmap.FMNodeType.IMAGE_MARKER) {
                CancelActiveState();
                Last_EventID = event.eventInfo.eventID;
                GG = event;
                switch (event.opts_.markerType) {
                    case 2:
                        {
                            //巡更
                            ShowAreaPopup(event.opts_.id);
                            break;
                        }
                    case 3:
                        {
                            //区域
                            ShowAreaPopup(event.opts_.id);
                            break;
                        }
                    default:
                        {
                            //资产
                            //0 获取对应的显示模板和资产对象
                            var template = GetTemplateByName(event.opts_.showTemplate);
                            var assest = GetAssestById(event.opts_.id);
                            event.flash();
                            //1 展示弹出窗口
                            ShowPopupWindow(event, template, assest);
                            //2 展示详细信息
                            ShowDetail(event, template, assest);
                            //3 执行点击后事件
                            FireAfterClickEvent(event, template, assest);
                            break;
                        }
                }

            }
            else if (event.eventInfo.eventID != Last_EventID) {
                //取消激活状态
                CancelActiveState();
                //点击跳转楼层
                try {
                    if (event.groupID != map.focusGroupID && (markLoader==null || !markLoader.isBusing())) {
                        $("[layerid=" + event.groupID + "]").trigger("click");
                        FloorScrollIntoView();
                    }
                } catch (e) { console.log(e);}
            }
        });
}
var GG;
function LoadFloorAssest(curLayer)
{
    if (curLayer == null) {
        curLayer = map.focusGroupID;
    }
    CancelActiveState();
    //当前区域ID
    CurrAreaID = areaMNG.GetAreaIdByFloorId(curLayer);
    if (CurrAreaID ==null || CurrAreaID == "")
    {
        ClearAssestType("请在场所定义-可视化设置中设置对应楼层的层号！");
        return;
    }
    if (OpenBySafeArea()) {
        ShowSafeArea();
    }
    else {
        LoadSearchPanel();
    }
}
function GetCurBuildingId()
{
    return GetUrlParam("BuildingId");
}
function ShowAreaPopup(id)
{
    $.getJSON(authorityHost+"SafeCheck/GetSafeDistribute?AreaId=" + id, function (data) {
        data=data[0];
        var html = ["<h4>" + data.name + "</h4>"];
        html.push("安全评分" + "：" + data.assessScore + "<br/>");
        html.push("所属部门" + "：" + data.unitName + "<br/>");
        html.push("责任人" + "：" + (data.userName ? data.userName : "暂无") + "<br/>");
        var ctlOpt = new fengmap.controlOptions({
            mapCoord: {
                x: data.longitude,
                y: data.latitude,
                groupID: 1
            },
            width: 230,
            height: 150,
            marginTop: 10,
            content: html.join("")
        });
        ClosePopWindow();
        //添加弹框到地图上
        popMarker = new fengmap.FMPopInfoWindow(map, ctlOpt);
        //调整下样式
        $(".fm-control-popmarker").css("padding", "10px");
        $(".fm-control-popmarker input").css("top", "3px").css("right", "3px").css("cursor", "pointer");
        $(".fm-control-popmarker div").css("height", "100%");
    })
}
//显示安全区域
function ShowSafeArea()
{
    EnableQuery(false);
    $.getJSON(authorityHost+"SafeCheck/GetSafeDistribute?AreaId=" + CurrAreaID, function (data) {
        for (var i = 0; i < data.length; i++) {
            //科室才显示
            if(data[i].areaType==1){
                RenderSafeArea(data[i]);
            }
        }
        EnableQuery(true);
    })

}
function RenderSafeArea(data)
{
    var floor = map.focusGroupID;
    var group = map.getFMGroup(floor);
    var layer = group.getOrCreateLayer('imageMarker');
    if (GetMarkerById(data.id) != null) { return;}
    //1 绘制轮廓
    CreatePolygon(floor, data.outline, GetColorByScore(data.assessScore));
    //2 绘制标记
    DrawLabel(floor, data.name, data.longitude, data.latitude);
    var marker = new fengmap.FMImageMarker({
        id: data.id,
        name: data.name,
        x: data.longitude,
        y: data.latitude,
        url: "images/area.png",
        size: 34,
        height: DefaultIconHeight,
        groupid: floor,
        markerType:3,
    });
    layer.addMarker(marker);
    imglayers.push(layer);
}
//关闭激活状态
function CancelActiveState() {
    //关闭当前的弹框
    ClosePopWindow();
    //关闭属性窗口
    //$('#assestDesc').hide(200);
    InfoPanel.hide();
}
//开始报警状态刷新
var alarmTimer = null;
function AlarmRefresh() {
    if (alarmTimer != null) { clearTimeout(alarmTimer); }
    if (markLoader.isBusing()) {
        dataTimer = setTimeout("AlarmRefresh()", 1000);
        return;
    }
    try {
        //刷新报警状态
        for (var i = 0; i < imglayers.length; i++) {
            for (var j = 0; j < imglayers[i].markers.length; j++) {
                if (alarmTimer != null) { clearTimeout(alarmTimer); }
                var curobj = imglayers[i].markers[j];
                if (curobj.visible) {
                    //找到对应的资产对象
                    var assest = GetAssestById(curobj.opts_.id);
                    var template = GetTemplateByName(curobj.opts_.showTemplate);
                    if (assest.state == "1") {
                        //故障
                        curobj = ChangeSize(curobj, 40);
                        var url = (curobj.opts_.url == curobj.opts_.icon ? template.icons[1] : curobj.opts_.icon);
                        if (curobj.url != url) {
                            curobj.url = url;
                        }

                        imglayers[i].markers[j] = curobj;
                        //curobj.flash();
                    }
                    else if (assest.state == "2") {
                        //报警
                        curobj = ChangeSize(curobj, 40);
                        var url = (curobj.opts_.url == curobj.opts_.icon ? template.icons[2] : curobj.opts_.icon);
                        if (curobj.url != url) {
                            curobj.url = url;
                        }

                        imglayers[i].markers[j] = curobj;
                        //curobj.flash();
                    }
                    else {
                        //正常
                        curobj = ChangeSize(curobj, 14);
                        if (curobj.url != curobj.opts_.icon) {
                            curobj.url = curobj.opts_.icon;
                        }

                        imglayers[i].markers[j] = curobj;
                    }
                }
            }
        }
    } catch (e) { }
    alarmTimer = setTimeout("AlarmRefresh()", 1000);
}
//开始报警和实时数据刷新
var dataTimer = null;
function DataRefresh() {
    if (dataTimer != null) { clearTimeout(dataTimer); }
    if (markLoader.isBusing()) {
        dataTimer = setTimeout("DataRefresh()", 5000)
        return;
    }
    //查询最新数据并加载图标
    DoQuery(function () {
        //弹框及属性窗口自动刷新
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
            var asset = GetAssestById(cur.attr("ref-assestid"));
            if (asset != null) {
                cur.html(SynaxText(cur.attr("ref-content"), asset));
            }
        }
    })
}

//加载过滤面板
function LoadSearchPanel() {
    $.getJSON(authorityHost+"VisualAssests/AssestType?HideNullPoint=1&AreaID=" + CurrAreaID,
        function (data) {
            //1 加载类型
            LoadAssestType(data);
            //禁用查询
            EnableQuery(false);
            //2 触发查询
            DoQuery(function (data) {
                //3 结果出来后加载图标
                LoadImgMarkers(data, function () {
                    //3.1 报警刷新
                    AlarmRefresh();
                    //3.2 数据刷新
                    setTimeout("DataRefresh()",5000);
                    //启用查询
                    EnableQuery(true);
                });
            });
        });
}
var cachedAssests;
function GetCachedAssests() {
    if (cachedAssests == null) {
        DoQuery();
    }
    return cachedAssests;
}
function BuildAssestTypeItem(data)
{
    var template = GetTemplateByName(data.visualTemplate);
    var btnText=data.name;
    
    return '<button class="btn btn-default btn-xs mg" style="position:relative" title="点击加载'+btnText+'" typeId="' + data.id + '"><div class="typebage">'+data.assestPointNum+'</div><img src="' + template.icon + '" width="25" height="25"><br />' + btnText + '</button>';
}
function ClearAssestType(info)
{
    if (info == null) {
        info = "当前楼层下暂无资产信息！";
    }
    $("#assestTypeContainer .panel-body").html("<div style='height:104px'>" + info + "</div>");
    $("#assestTypeContainer .panel-footer").html("").hide();
    AssestTypePanelToogle(true);
}
function LoadAssestType(data)
{
    if(data.length==0){
        ClearAssestType();
        return;
    }
    //1 获取所有大类
    var html = [];
    var numCount = 0;
    for (var i = 0; i < data.length; i++) {
        html.push(BuildAssestTypeItem(data[i]));
        if ((i + 1) % 4 == 0) {
            html.push("<br/>");
        }
        numCount = numCount + data[i].assestPointNum;
    }

    $("#assestTypeContainer .panel-body").html(html.join(""));
    $("#assestTypeContainer .panel-footer").html("资产总数：<label class='label label-warning' style='background-color:rgb(51,122,183)'>" + numCount+"</label>").show();
    //显示资产类型选择窗口
    AssestTypePanelToogle(true);
    //2 绑定事件
    $("#assestTypeContainer button").click(function () {
        if ($(this).hasClass("choosed")) {
            $(this).removeClass("choosed").removeClass("btn-primary").addClass("btn-default");
            $(this).blur();
        }
        else {
            $(this).removeClass("btn-default").addClass("choosed").addClass("btn-primary");
        }
        CancelActiveState();
        //禁止查询
        EnableQuery(false);
        //1 触发查询
        DoQuery(function (data) {
            //2 结果出来后加载图标
            LoadImgMarkers(data, function () {
                //重新启用查询查询
                EnableQuery(true);
            });

        });
    })
}
//收起或展开资产类型面板
//参数：true 展开，false 收起
function AssestTypePanelToogle(isShow)
{
    
    //获取收起状态
    var typePanel=$(".topright");
    var panelHandler= $("#typePanelHandler");
    if(isShow==null)
    {
        isShow=panelHandler.find(".glyphicon").hasClass("glyphicon-backward");
    }
    
    //当前是打开状态
    if(isShow)
    {
        typePanel.animate({right:0},200,function(){
            panelHandler.html('<span class="glyphicon glyphicon-forward" aria-hidden="true"></span>选<br/>择<br/>资<br/>产');
        });
        $(".topright").show();
    }
    else
    {
        typePanel.animate({right:-1*$(".topright").width()},200,function(){
            panelHandler.html('<span class="glyphicon glyphicon-backward" aria-hidden="true"></span>展<br/>开');
        });
    }
}
//查询并加载图标
function DoQuery(callback) {
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: callback!=null,
        data: {
            AssestType: $("#assestTypeContainer").find(".choosed").map(function () { return $(this).attr("typeId") }).get().join(","),
            AreaId: CurrAreaID
        },
        success: function (data) {
            cachedAssests = data;
            //处理回调
            if (callback != null && typeof (callback) == "function")
            {
                callback(data);
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
        if (allAssests[i].id == id) {
            return allAssests[i];
        }
    }
}
function GetImgIcon(template, state) {
    var template = GetTemplateByName(template);
    if (state == "1") {
        return template.icons[1];
    }
    else if (state == "2") {
        return template.icons[2];
    }
    else {
        return template.icons[0];
    }
}
//添加图片标记
var imglayers = [];
function addImgMarker(option, size) {
    if (size == null) {
        size = 14;
    }
    var template = GetTemplateByName(option.templateName);
    var marker = GetMarkerById(option.id);
    if (marker != null) {
        marker.visible = true;
    }
    else {
        //已经存在，则显示，否则重新添加
        var group = map.getFMGroup(map.focusGroupID);
        var layer = group.getOrCreateLayer('imageMarker');
        if (!(option.x == null || option.x == 0 || option.y == null || option.y == 0))
        {
            var marker = new fengmap.FMImageMarker({
                id: option.id,
                name: option.name,
                x: option.x,
                y: option.y,
                url: template.icon,
                size: size,
                height: DefaultIconHeight,
                groupid: map.focusGroupID,
                showTemplate: option.templateName,
                icon: template.icons[0],
                icon_broken: template.icons[1],
                icon_warn: template.icons[2]
            });
            layer.addMarker(marker);
        }
        //缓存
        if ($.inArray(layer, imglayers) < 0) {
            imglayers.push(layer);
        }
    }
    return marker;
}
//调整图标大小
function ChangeSize(marker,size)
{
    var layer = marker.group.getOrCreateLayer('imageMarker');
    if (marker.size_ != size)
    {
        var id = marker.id_;
        //未提供直接更改size的api，因此只能先移除，再添加
        layer.removeMarker(marker);
        addImgMarker(GetAssestById(id), size);
    }
    return marker;
}
function GetMarkerById(id) {
    for (var i = 0; i < imglayers.length; i++) {
        for (var j = 0; j < imglayers[i].markers.length; j++) {
            if (imglayers[i].markers[j].ID == id) {
                return imglayers[i].markers[j];
            }
        }
    }
    return null;
}
//加载图片标记
var markLoader = null;
function LoadImgMarkers(data, callback) {
    //1 先将所有的元素隐藏
    for (var i = 0; i < imglayers.length; i++) {
        for (var j = 0; j < imglayers[i].markers.length; j++) {
            imglayers[i].markers[j].visible = false;
        }
    }
    if (markLoader == null) {
        //addImgMarker(data);
        markLoader = new MarkLoader(addImgMarker, 5);
    }
    //2 添加图片标记
    markLoader.load(data, callback);
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
                marginTop: 5,
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
            $(".videobox").modal({ backdrop:false})
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

function HideIcon() {
    //遍历图层
    map.callAllLayersByAlias('facility', function (layer) {
        layer.visible = false;
    });

}
function ShowDetail(event, template, assest) {
    if (template.description) {
        var html = SynaxText(template.description, assest);
        
    }
}
var heatmapInstance = null;
function ShowHeatMap() {
    if (heatmapInstance != null) {
        groupLayer = map.getFMGroup(map.focusGroupID);
        groupLayer.removeHeatMap(heatmapInstance);
        heatmapInstance = null;
        $(event.srcElement).removeClass("btn-primary").addClass("btn-default");
        return;
    }
    $(event.srcElement).removeClass("btn-default").addClass("btn-primary");
    if (!heatmapInstance) heatmapInstance = fengmap.FMHeatMap.create(map, {
        //热点半径
        radius: 20,
        //热力图透明度
        opacity: .5,
        //热力点value的最大值
        max: 100
        //渐变色值，可配置
        //gradient:{ 0.45: "rgb(201,135,255)", 0.55: "rgb(189,97,255)", 0.65: "rgb(155,49,255)", 0.95: "yellow", 1.0: "rgb(157,53,255)" }  
    });
    var points = [];
    var allAssests = GetCachedAssests();

    for (var i = 0; i < allAssests.length; i++) {
        var val = GetAssestExtAttr(allAssests[i], "HeatNum");
        if (val != "") {
            points.push({ x: allAssests[i].x, y: allAssests[i].y, value: val });
        }
    }
    //移除热力点
    heatmapInstance.clearPoints();
    heatmapInstance.addPoints(points);

    //热力图应用到哪一楼层
    groupLayer = map.getFMGroup(1);
    groupLayer.applyHeatMap(heatmapInstance);
}
//是否从安全分布打开
function OpenBySafeArea() {
    return GetUrlParam("Entrance") == "2";
}
//创建多边形
function CreatePolygon(groupId, outline, color) {
    if (!outline) { return; }
    var points = [];
    var coords = outline.split(";");
    for (var i = 0; i < coords.length; i++) {
        points.push({ x: coords[i].split(",")[0], y: coords[i].split(",")[1], z: 55 });
    }
    var group = map.getFMGroup(groupId);
    var polylayer = group.getOrCreateLayer('polygonMarker');
    var polygonMarker = new fengmap.FMPolygonMarker({
        color:color,
        //设置透明度
        alpha: .3,
        //设置边框线的宽度
        lineWidth: 1,
        //设置高度
        height: 0.5,
        //设置多边形坐标点
        points: points
    });
    polylayer.addMarker(polygonMarker);
}
function EnableQuery(enable)
{
    if (enable) {
        $(".starit").find(".layer").removeAttr("disabled");
        $("#assestTypeContainer button").removeAttr("disabled");
        $("#btnMutiFloor").removeAttr("disabled");
    }
    else {
        $(".starit").find(".layer").attr("disabled", true);
        $("#assestTypeContainer button").attr("disabled", true);
        $("#btnMutiFloor").attr("disabled", true);
    }
    
}
var labelVisiable = false;
function ListenAccessKey() {
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.shiftKey && e.altKey) {
            //在资产上显示编号信息
            labelVisiable = !labelVisiable;
            ToogleAllLabel();
        }
    });
}
var labelLayers = [];
function AddLabel(groupId,x,y,txt)
{
    var group = map.getFMGroup(groupId);
    var labelLayer = group.getOrCreateLayer('textMarker');
    labelLayers.push(labelLayer);
    var tm = new fengmap.FMTextMarker({
        x: x,
        y:y,
        name: txt,
        //填充色
        fillcolor: "0,0,0",
        //字体大小
        fontsize:12,
        //边框色
        strokecolor: "255,255,255"
    });
    
    //文本标注层添加文本Marker
    labelLayer.addMarker(tm);  
}
function ToogleAllLabel()
{
HideIcon();
map.getLayerByAlias([map.focusGroupID], 'label', function(layer) {
	                layer.visible = false;
	            });
    for (var i = 0; i < labelLayers.length; i++) {
        labelLayers[i].removeAll();
    }
    if (!labelVisiable) { return;}
    for (var i = 0; i < imglayers.length; i++) {
        for (var j = 0; j < imglayers[i].markers.length; j++) {
            var curobj = imglayers[i].markers[j];
            if (curobj.visible) {
                //找到对应的资产对象
                var assest = GetAssestById(curobj.opts_.id);
                AddLabel(map.focusGroupID, assest.x, assest.y, assest.code);
            }
        }
    }
}