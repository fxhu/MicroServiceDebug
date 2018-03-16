var map; 
//上次事件的ID
var Last_EventID;
var focusImgMarker = null;//当前选中的图片标记
$(function () {
    ListenCtrlPress();
    //加载地图
    LoadMap();
});
var areaMNG;
function LoadMap() {
    areaMNG = new AreaMNG(GetCurBuildingId());
    if(!areaMNG.IsFloorMaped()){
        document.write("请在属性设置中设置层号！");
        return;
    }
    var fmapID = areaMNG.GetMapID();
    map = new fengmap.FMMap({
        container: $("#fengMap")[0],
        mapServerURL: "./data/" + fmapID,
        mapThemeURL: "data/theme",
        focusAlphaMode: !0,
        focusAnimateMode: !0,
        modelSelectedEffect: false,
        focusAlpha: .7,
        viewModeAnimateMode: !0,
        defaultMapScaleLevel: areaMNG.GetMapScaleLevel(),
        defaultTiltAngle: 30,
        defaultMinTiltAngle: 10,
        defaultGroupSpace: DefaultGroupSpace,
        key: FengMap_Key,
        appName: FengMap_AppName,
        isSeparate: areaMNG.GetIsSeparate(fmapID),
        groupLoadedCallback: function (layer) {
            LoadSearchPanel(true);
        }
    });
    map.openMapById(fmapID);
    map.on("loadComplete",
        function () {
            map.visibleGroupIDs = [areaMNG.GetFloorId()];
            map.focusGroupID = areaMNG.GetFloorId();
        });
    map.on("mapClickNode",
        function (event) {
            //选择的是标记
            if (event.nodeType == fengmap.FMNodeType.IMAGE_MARKER) {
                Last_EventID = event.eventInfo.eventID;
                var template = GetTemplateByName(event.opts_.showTemplate);
                var assest = GetAssestById(event.opts_.id);
                //1 展示详细信息
                ShowDetail(event, template, assest);
                
                //2 将选中标记弹跳
                if (focusImgMarker != null)
                {
                    focusImgMarker.stopJump(focusImgMarker.jumpobj);
                    focusImgMarker.jumpobj = null;
                    if (focusImgMarker.ID == event.ID) {
                        focusImgMarker = null;
                        return;
                    }
                    else {
                        focusImgMarker = null;
                    } 
                }
                event.jumpobj=event.jump({
                    times: 0,
                    duration: 1,
                    delay: 0.5,
                    height: 10
                });
                focusImgMarker = event;
            }
            else if (event.eventInfo.eventID != Last_EventID) {
                //取消激活状态
                CancelActiveState();
                var thisDate = new Date();
                if (focusImgMarker == null)
                {
                    return;
                }
                else {
                    var currentGid = map.focusGroupID;
                    var coord = {
                        x: event.eventInfo.coord.x,
                        y: event.eventInfo.coord.y
                    }
                    $.ajax({
                        type: "post",
                        url: authorityHost+"AssestsPoint/UpdateAssestPoint",
                        data: {
                            id: focusImgMarker.ID,
                            Latitude: coord.y,
                            Longitude: coord.x
                        },
                        success: function (data) {
                            if (data == "OK") {
                                focusImgMarker.stopJump(focusImgMarker.jumpobj);
                                focusImgMarker.jumpobj = null;
                                focusImgMarker.x = coord.x;
                                focusImgMarker.y = coord.y;
                                focusImgMarker.z = 0;
                                focusImgMarker.height = DefaultIconHeight;
                                focusImgMarker.url=focusImgMarker.opts_.icon;
                                //刷新对象中的位置信息
                                var assestObj=GetAssestById(focusImgMarker.ID);
                                assestObj.x= coord.x;
                                assestObj.y= coord.y;
                                //添加文字标记
                                tooltipMNG.add(focusImgMarker.ID,function(iotNo){
                                    RemoveLabel(focusImgMarker.ID);
                                    AddLabel(focusImgMarker.ID,iotNo+"",focusImgMarker.x,focusImgMarker.y);
                                })
                                focusImgMarker = null;
                                
                            }
                            else {
                                layer.msg("添加失败!" + data, {
                                    btn: ['关闭']
                                });
                            }
                        },
                        error: function (err) {

                        },
                        complete: function () {

                        }
                    });
                    // }
                }
            }
            event.eventInfo.domEvent.preventDefault();//阻止同时触发其他点击事件
        });
}
function GetCurBuildingId() {
    return GetUrlParam("id");
}
//关闭激活状态
function CancelActiveState() {
    //关闭当前的弹框
    ClosePopWindow();
    //关闭属性窗口
    $('#assestDesc').hide(200);
}

//加载过滤面板
function LoadSearchPanel(loadSubArea) {

    $.getJSON(authorityHost+"VisualAssests/AssestType?AreaID=" + GetUrlParam("id"),
        function (data) {
            if (loadSubArea) {
                LoadChildArea();
            }
            //1 加载类型
            LoadAssestType(data);
            //2 触发查询
            DoQuery(true);
        });
}
//加载子区域
function LoadChildArea()
{
    
    //加载区域
    $.getJSON(authorityHost+"VisualArea/AreaTree?Id=" + GetUrlParam("id"), function (data) {
        for (var i = 0; i < data.length; i++) {
            //显示科室
            if (data[i].areaType == "1") {
                var floorId = GetFloorId(data[i]);
                //绘制区域轮廓
                DrawPolygon(floorId, data[i].outline);
                //绘制区域名称
                DrawLabel(floorId, data[i].name, data[i].longitude, data[i].latitude);
            }
        }
        //隐藏图标
        HideIcon();
    })
}
function GetFloorId(areaModel)
{
    var floorIndex = GetExtAttrValue(areaModel, "层号");
    if (floorIndex == "") { return 1; }
    else {
        return parseInt(floorIndex, 10);
    }
}

var cachedAssests=[];
function GetCachedAssests() {
    if (cachedAssests == null) {
        DoQuery(false);
    }
    return cachedAssests;
}
function BuildAssestTypeItem(data) {
    var template = GetTemplateByName(data.visualTemplate);
    var btnText = data.name;

    return '<button class="btn btn-default btn-xs mg" title="点击加载' + btnText + '" typeId="' + data.id + '"><img src="' + template.icon + '" width="25" height="25"><br />' + btnText + '</button>';
}
function LoadAssestType(data) {
    if (data.length == 0) {
        $("#assestTypeContainer .panel-body").html("<div>当前楼层下暂无点位信息！</div>");
        $("#assestTypeContainer").show(100);
        return;
    }
    //1 获取所有大类
    var html = [];
    for (var i = 0; i < data.length; i++) {
        html.push(BuildAssestTypeItem(data[i]));
        if ((i + 1) % 4 == 0) {
            html.push("<br/>");
        }
    }
    $("#assestTypeContainer .panel-body").html(html.join(""));
    $("#assestTypeContainer").show(100);
    //2 绑定事件
    $("#assestTypeContainer button").click(function () {
        if ($(this).hasClass("choosed")) {
            $(this).removeClass("choosed").removeClass("btn-primary").addClass("btn-default");
            $(this).blur();
        }
        else {
            $(this).removeClass("btn-default").addClass("choosed").addClass("btn-primary");
        }
        //触发查询
        DoQuery(true);
    })
}
//查询并加载图标
function DoQuery(loadMarker) {
    $.ajax({
        type: "post",
        url: authorityHost+"AssestsPoint/QueryAssestPoints",
        async: true,
        data: {
            AssestType: $("#assestTypeContainer").find(".choosed").map(function () { return $(this).attr("typeId") }).get().join(","),
            AreaId: GetCurBuildingId(),
            PointType: 0
        },
        success: function (data) {
            cachedAssests = data;
            if (loadMarker) {
                //将图标在地图上展示
                LoadImgMarkers(data);
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


//添加图片标记
var imglayers = [];
function addImgMarker(option) {
    var template = GetTemplateByName(option.templateName);
    var marker = GetMarkerById(option.id);
    if (marker != null) {
        marker.visible = true;
        marker.opts_.setupState = option.setupState;
        marker.opts_.deviceNum = option.deviceNum;
    }
    else {
        //已经存在，则显示，否则重新添加
        var floorId = areaMNG.GetFloorId();
        var group = map.getFMGroup(floorId);
        var layer = group.getOrCreateLayer('imageMarker');
        var zeroCoord=(option.x == null || option.x == 0);
        var marker = new fengmap.FMImageMarker({
            id: option.id,
            name: option.name,
            x: zeroCoord ? group.mapCoord.x : option.x,
            y: zeroCoord ? group.mapCoord.y : option.y,
            url: zeroCoord?template.icon_warn:template.icon,
            size: 32,
            height: DefaultIconHeight,
            groupid: floorId,
            showTemplate: option.templateName,
            icon: template.icon,
            icon_broken: template.icon_broken,
            icon_warn: template.icon_warn,
            assestTypeId: option.assestTypeId,
            assestTypeName: option.assestTypeName,
            setupState: option.setupState,
            deviceNum: option.code
        });
        layer.addMarker(marker);
        //缓存
        if ($.inArray(layer, imglayers) < 0) {
            imglayers.push(layer);
        }
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
function LoadImgMarkers(data) {
    //1 先将所有的元素隐藏
    for (var i = 0; i < imglayers.length; i++) {
        for (var j = 0; j < imglayers[i].markers.length; j++) {
            imglayers[i].markers[j].visible = false;
        }
    }
    if(labelLayer!=null){
        labelLayer.removeAll();
    }
    //2 添加图片标记
    for (var i = 0; i < data.length; i++) {
        addImgMarker(data[i]);
        AddLabel(data[i].id,GetExtAttrValue(data[i],"物联序号"),data[i].x,data[i].y);
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
    map.callAllLayersByAlias('label', function (layer) {
        layer.visible = false;
    });
}
function ShowDetail(event, template, assest) 
{
    extraMNG.show(assest.id);
    batchAccessMNG.add(assest.id);
    //物联序号
    tooltipMNG.add(assest.id,function(iotNo){
        RemoveLabel(assest.id);
        AddLabel(assest.id,iotNo+"",assest.x,assest.y);
    })
}
function RemoveLabel(id){
    //文本图层
    if(labelLayer==null){
        var group = map.getFMGroup(map.focusGroupID);
        labelLayer = group.getOrCreateLayer('textMarker');
    }
    //先移除对应label
    var label=GetLabelById("label"+id);
    if(label!=null){
        labelLayer.removeMarker(label);
    }
}
var labelLayer;
function AddLabel(id,txt,x,y)
{
    if(!tooltipMNG.isActive()){
        return;
    }
    if(txt==null || txt==""){
        return;
    }
    if(x==null || y==null || x==0 || y==0){
        return;
    }
    //文本图层
    if(labelLayer==null){
        var group = map.getFMGroup(map.focusGroupID);
        labelLayer = group.getOrCreateLayer('textMarker');
    }
    var tm = new fengmap.FMTextMarker({
        id:"label"+id,
        x: x,
        y:y,
        z:5,
        name: txt,
        //填充色
        fillcolor: "0,0,0",
        //字体大小
        fontsize:14,
        //边框色
        strokecolor: "255,255,255"
    });
    //文本标注层添加文本Marker
    labelLayer.addMarker(tm);  
}
function GetLabelById(id)
{
    if(labelLayer==null){return null;}
    for (var j = 0; j < labelLayer.markers.length; j++) {
        if (labelLayer.markers[j].ID == id) {
            return labelLayer.markers[j];
        }
    }
    return null;
}
var batchAccessMNG=new BatchAccessMNG();
var extraMNG=new ExtraMNG();
var tooltipMNG=new TooltipMNG(".top2left");
function ListenCtrlPress()
{
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.shiftKey && e.altKey)
        {
            batchAccessMNG.show();
        }
        if(e.ctrlKey && e.altKey){
            if(tooltipMNG.isActive()){
                return;
            }
            tooltipMNG.show(function(){
                DoQuery(false);
            },function(){
                if(labelLayer!=null){
                    labelLayer.removeAll();
                }
            });
            //显示文字
            for(var i=0;i<cachedAssests.length;i++){
                RemoveLabel(cachedAssests[i].id);
                AddLabel(cachedAssests[i].id,GetExtAttrValue(cachedAssests[i],"物联序号"),cachedAssests[i].x,cachedAssests[i].y);
            }
        }
    });
    
}