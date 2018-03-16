$(function(){
    require(["./kinetic-map"],function(main){
        KineticMap=main.KineticMap;
        scene=main.scene;
        //加载楼栋下拉框
        LoadBuildings(function(){
            //初始化导航栏，并绑定切换楼层回掉函数
            InitFloorList(areaMNG, layerInfo, function (_layerInfo) {
                layerInfo=_layerInfo;
                //初始化区域
                KineticMap.changeFloorByFloorNum(layerInfo.id);
                LoadFloorAssest(layerInfo.id);
            });
            //1 楼层展示初始化
            //初始化map
            if(layerInfo.name!=null){
                var imagesJson=areaMNG.GetListGroups();
                var images = [];//底图图片资源，项目实际情况修改
                for(var i in imagesJson){
                    images.push({id:imagesJson[i].gid,src:imagesJson[i].gsrc})
                };//底图图片资源，项目实际情况修改
                if(images.length==0) return;
                images.push({id:"area",src:"./images/area.png"});
                images.push({id:"patrol",src:"./images/patrol.png"});
                fillDivToWindow(mapDivId);
                view = KineticMap.init(mapDivId,images,layerInfo.id);
                view.on("click",function(e){
                    viewClickEvent(e);
                });
                var layerGraph = {
                    layerProp: {
                        id: "layerGragh",
                        name: "layer",
                        x: 0, //x和y是相对于div的左上角的坐标
                        y: 0,
                        width: $("#"+mapDivId).width(),
                        height: $("#"+mapDivId).height(),
                        visible: true,
                        clearBeforeDraw: true
                    },
                };
                //新建存放文本标记的图层
                var lay1 = new scene.GraphLayer(layerGraph,view);
                view.addLayer(lay1);
                //初始化资产
                LoadFloorAssest(layerInfo.id);
            }
        });
    })
})
var mapDivId="fengMap";
var view;
var scene;
var layerInfo={id:0,name:null};
var areaMNG;
var _curBuildingId=null;
var cachedAssests=undefined;
function clearAllGraghs(){
    for(var i =1 ;i<view.children.length;i++){
        view.children[i].destroyChildren();
    }
    view.draw();
}
//是否从巡更模块打开
function OpenByPatrol() {
    return GetUrlParam("Entrance") == "1";
}
//是否从安全分布打开
function OpenBySafeArea() {
    return GetUrlParam("Entrance") == "2";
}
//加载子区域

function LoadChildArea(id)
{
    var areaId=areaMNG.GetAreaIdByFloorId(id);
    //加载区域
    $.getJSON(authorityHost+"VisualArea/AreaTree?Id=" + areaId, function (data) {
        //清除所有区域文本标识
        view.children[2].destroyChildren();
        labels=[];
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
        //HideIcon();
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
function LoadFloorAssest(curLayer)
{
    if (curLayer == null) {
        curLayer = layerInfo.id;
    }
    //清除所有标记
    clearAllGraghs();
    //清除popwindow
    var popwindow=document.getElementById("popWind");
    if(popwindow){
        popwindow.parentNode.removeChild(popwindow);
    }
    CancelActiveState();
    //当前区域ID
    CurrAreaID = areaMNG.GetAreaIdByFloorId(curLayer);
    if (CurrAreaID ==null || CurrAreaID == "")
    {
        ClearAssestType("请在办公场所可视化中设置当前楼层对应的层号！");
        return;
    }
    if (OpenByPatrol()) {
        ShowPatrol();
    }
    else if (OpenBySafeArea()) {
        ShowSafeArea();
    }
    else {
        LoadSearchPanel();
        LoadChildArea(curLayer);
    }
}
//显示安全区域
function ShowSafeArea()
{
    EnableQuery(false);
    $.getJSON(authorityHost+"SafeCheck/GetSafeDistribute?AreaId=" + CurrAreaID, function (data) {
        labels=[];
        for (var i = 0; i < data.length; i++) {
            //科室才显示
            if(data[i].areaType==1){
                RenderSafeArea(data[i]);
            }
        }
        view.draw();
        EnableQuery(true);
    })
}
var defaultAreaMarkerWidth=40;
var defaultAreaMarkerHeight=40;
//检测区域图标遮挡的常量
var areaMarkers=[];//文字坐标数组
var areaDeltaX=30;
var areaDeltaY=5;
var areaAddY=12;
var laterAreaMarkerPosition=null;//离点位最近的点
function RenderSafeArea(data)
{
    var floor = GetFloorId(data);
    if (view.children[1].getGraphbyId(data.id) != null) { return;}
    //1 绘制轮廓
    CreatePolygon(floor, data.outline, GetColorByScore(data.assessScore));
    //2 绘制标记
    DrawLabel(floor, data.name, data.longitude, data.latitude);
    var xyJson=KineticMap.simpleTransformCoor(data.longitude,data.latitude);
    //检测文字遮挡问题
    for(var i in areaMarkers){
        var p1=areaMarkers[i];
        if(Math.abs(p1.y-xyJson.y)<areaDeltaY&&Math.abs(p1.x-xyJson.x)<areaDeltaX){
            if(laterAreaMarkerPosition==null){
                laterAreaMarkerPosition=p1;
            }else{
                if(Math.abs(p1.x-xyJson.x)<Math.abs(laterAreaMarkerPosition.x-xyJson.x)){
                    laterAreaMarkerPosition=p1;
                }
            }
        }
    }
    if(laterAreaMarkerPosition!=null){
        xyJson={x:xyJson.x,y:laterAreaMarkerPosition.y+areaAddY};
    }
    laterAreaMarkerPosition=null;
    areaMarkers.push(xyJson);
    var imageProp= {
        typeName: "image",
        shapeProp: {
            id:data.id,//id必须指定，并且不能重复
            name:data.name,
            x: xyJson.x,//此x和y是相对于div左上角的坐标，并且必须为数字类型
            y: xyJson.y-10,
            width: defaultAreaMarkerWidth,//根据实际情况调整，有放大缩小效果
            height: defaultAreaMarkerHeight,
            offsetX:defaultAreaMarkerWidth/2,
            offsetY:defaultAreaMarkerHeight,
            srcId: "area",//图片路径
            draggable:false //false为不能抓取移动
        }
    }
    var g=scene.GraphFactory.create(imageProp, view, view.children[1]);
    g.on("click",function(e){
        ShowAreaPopup(e.target);
    })
}
function ShowAreaPopup(t)
{
    var id=t.getAttr("id");
    $.getJSON(authorityHost+"SafeCheck/GetSafeDistribute?AreaId=" + id, function (data) {
        data=data[0];
        var html = ["<h4>" + data.name + "</h4>"];
        html.push("安全评分" + "：" + data.assessScore + "<br/>");
        html.push("所属部门" + "：" + data.unitName + "<br/>");
        html.push("责任人" + "：" + (data.userName ? data.userName : "暂无") + "<br/>");
        var popWindowDom=createPopWindow(t,html);
        //调整下样式
        $(popWindowDom).css("padding", "10px");
        $(popWindowDom).find("input").css("top", "3px").css("right", "3px").css("cursor", "pointer");
        $(popWindowDom).find("div").css("height", "100%");
    })
}
function createPopWindow(t,h) {
    var popwindow=document.getElementById("popWind");
    if(popwindow){
        popwindow.innerHTML= '<input id="closebutton" type="button" value="✖" class="close-button"><span class="popmarker-bot" ></span><span class="popmarker-top" > </span>'+h.join("");
        $(popwindow).show();
    }else{
        var popWnd = document.createElement("div");
        popWnd.id = "popWind";
        popWnd.className = "popmarker";
        popWnd.style.display = "block";
        popWnd.style.position="absolute";
        popWnd.style.marginTop="10px";
        popWnd.style.width="230px";
        popWnd.style.height="150px";
        var p=scene.Util.calPopWndPos(t,popWnd);
        popWnd.style.left = p.x;
        popWnd.style.top = p.y;
        // popWnd.style.left = t.getAbsolutePosition().x - 230 / 2 + t.getWidth() / 2 -4+ "px";
        // popWnd.style.top = t.getAbsolutePosition().y - 150 - 50 + "px";
        popWnd.innerHTML= '<input id="closebutton" type="button" value="✖" class="close-button"><span class="popmarker-bot" ></span><span class="popmarker-top" > </span>'+h.join("");
        var closebt = popWnd.firstChild;
        $(closebt).on("click", function () {
            var popwindow=document.getElementById("popWind");
            $(popwindow).hide();
        });
        popwindow=popWnd;
    }
    t.rootView.popWnd = popwindow;
    var container = t.rootView.getAttr("container");
    var parent = container.parentElement;
    parent.insertBefore(t.rootView.popWnd, container);
    //关联当前图元
    t.rootView.popWnd.ghObj = t;
    return popwindow;
}
function GetColorByScore(factor) {
    factor=100-factor;
    var r=parseInt(factor<=50?(255*factor/50):255,10);
    var g=parseInt(factor<=50?255:255-(255*((factor-50)/50)),10);
    return "rgb(" + r + "," + g + ",0)";
}
//创建多边形
function CreatePolygon(groupId, outline, color) {
    if (!outline) { return; }
    var points = [];
    var coords = outline.split(";");
    for (var i = 0; i < coords.length; i++) {
        var xy=coords[i].split(",");
        var xyJson=KineticMap.simpleTransformCoor(xy[0],xy[1]);
        points.push(xyJson.x);
        points.push(xyJson.y);
    }
    var lineProp = {
        typeName: "line",
        shapeProp: {
            id: groupId+"polygon",
            name: "",
            points: points, //坐标为x1,y1,x2,y2…依次往下排
            closed: true, //是否闭合
            stroke: color,
            fill:color, //当线闭合时候，有效
            opacity:0.4, //同上
            draggable: false
        }
    }
    scene.GraphFactory.create(lineProp, view, view.children[0]);
    view.draw();

}
function viewClickEvent(e){
    CancelActiveState();
}
//关闭激活状态
function CancelActiveState() {
    //关闭当前的弹框
    ClosePopWindow();
    //关闭属性窗口
    $('#assestDesc').hide(200);
    InfoPanel.hide();
}
//关闭当前弹窗
function ClosePopWindow() {

}
//显示弹框
function ShowPopupWindow(t) {
    if(t.assetTemplate.popWindow.showType=="map"){
        KineticMap.getPopWindow(t);
        setTimeout("RenewData()",100);
    }else{
        var template=t.assetTemplate;
        if (template.popWindow && template.popWindow.content) {
            var content = SynaxText(template.popWindow.content, t.assetDetail);
            if (template.popWindow.showType != "map") {
                $(".videobox-body").html(content);
                $(".videobox").modal({ backdrop:false})
            }
        }
    }
}
//加载过滤面板
function LoadSearchPanel() {
    $.getJSON(authorityHost+"VisualAssests/AssestType?AreaID=" + CurrAreaID,
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
//开始报警状态刷新
var alarmTimer = null;
function AlarmRefresh() {
    if (alarmTimer != null) { clearTimeout(alarmTimer); }
    try {
        var graghs=view.children[1].children;
        //刷新报警状态
        for(var i = 0; i<graghs.length;i++){
            //故障
            if(graghs[i].assetDetail.state=="1"){
                graghs[i].setAttrs({width:defaultWidth*2,height:defaultHeight*2,image:KineticMap.getImageJsonById(graghs[i].assetTemplate.name+"_icon_warn").image})
            }else if(graghs[i].assetDetail.state=="2"){
                //损坏
                graghs[i].setAttrs({width:defaultWidth*2,height:defaultHeight*2,image:KineticMap.getImageJsonById(graghs[i].assetTemplate.name+"_icon_broken").image})
            }else{
                //正常情况
                graghs[i].setAttrs({width:defaultWidth,height:defaultHeight,image:KineticMap.getImageJsonById(graghs[i].assetTemplate.name+"_icon").image})
            }
        }
        view.children[1].draw();
    } catch (e) { }
    alarmTimer = setTimeout("AlarmRefresh()", 1000);
}
//开始报警和实时数据刷新
var dataTimer = null;
function DataRefresh() {
    if (dataTimer != null) { clearTimeout(dataTimer); }
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
function GetAssestById(id) {
    var allAssests = GetCachedAssests();
    //从模板中解析
    for (var i = 0; i < allAssests.length; i++) {
        if (allAssests[i].id == id) {
            return allAssests[i];
        }
    }
}
var cachedAssests;
function GetCachedAssests() {
    if (cachedAssests == null) {
        DoQuery();
    }
    return cachedAssests;
}
var lastQueryAssetType=null;
//查询并加载图标
function DoQuery(callback) {
    //缓存资产类型，并且判断是否隐藏详情框
    var assestType=$("#assestTypeContainer").find(".choosed").map(function () { return $(this).attr("typeId") }).get().join(",");
    if(lastQueryAssetType==null||lastQueryAssetType!=assestType){
        $("#popWind").hide();
        lastQueryAssetType=assestType;
    }
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: callback!=null,
        data: {
            AssestType: assestType,
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
var helper=DVHelper();
var GetTemplateByName=helper.GetTemplateByName;
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
    AssestTypePanelToogle(true);
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
//显示巡更区域
var PatrolCount = 0;
function ShowPatrol()
{
    $.getJSON(authorityHost+"visualarea/AreaList?ParentId=" + GetCurBuildingId(), function (data) {
        for (var i = 0; i < data.length; i++)
        {
            if (GetExtAttrValue(data[i], "Patrol") == "1")
            {
                PatrolCount++;
                RenderPatrol(data[i]);
            }
        }
    })
}
function RenderPatrol(data) {
    var floor = GetFloorId(data);
    if (view.children[1].getGraphbyId(data.id) != null) { return;}
    //1 绘制轮廓
    CreatePolygon(floor, data.outline, GetColorByScore(GetAssestExtAttr(data, "HeatNum")));
    //2 绘制标记
    var xyJson=KineticMap.simpleTransformCoor(data.longitude,data.latitude);
    var imageProp= {
        typeName: "image",
        shapeProp: {
            id:data.id,//id必须指定，并且不能重复
            name:data.name,
            x: xyJson.x,//此x和y是相对于div左上角的坐标，并且必须为数字类型
            y: xyJson.y,
            width: defaultWidth,//根据实际情况调整，有放大缩小效果
            height: defaultHeight,
            offsetX:defaultWidth/2,
            offsetY:defaultHeight,
            srcId: "patrol",//图片路径
            draggable:false //false为不能抓取移动
        }
    }
    scene.GraphFactory.create(imageProp, view, view.children[1]);
    view.draw();
    PatrolMarkerAddComplete();
}
//图片标记添加完成
function PatrolMarkerAddComplete() {
    //如果是巡更进入
    if (OpenByPatrol()) {
        //将所有图标都用线连起来
        LineAllImgMarkers();
    }
}
function LineAllImgMarkers() {
    //清除所有标线
    map.clearLineMark();
    //遍历每个楼层
    var group = map.getFMGroup(1);
    var layer = group.getOrCreateLayer('imageMarker');
    var points = [];
    //遍历每个标记
    for (var j = 0; j < layer.markers.length; j++) {
        var curobj = layer.markers[j];
        if (curobj.visible) {
            //点的坐标
            points.push({ x: curobj.x_, y: curobj.y_, z: 0, seq: curobj.opts_.sequence });
        }
    }
    drawLines(points, 1);
}
//加载图片标记
var defaultWidth=24;
var defaultHeight=24;
function LoadImgMarkers(data, callback) {
    //1 获取图形交互层
    var layer=view.children[1];
    //2 先将图形交互层所有的元素干掉
    layer.destroyChildren();
    //3 添加图片标记
    for(var i=0;i<data.length;i++){
        var template=GetTemplateByName(data[i]["templateName"]);
        var coor=KineticMap.simpleTransformCoor(parseInt(data[i].x),parseInt(data[i].y));
        //定义图片单元参数
        var imageProp= {
            typeName: "image",
            shapeProp: {
                id:data[i].id,//id必须指定，并且不能重复
                name:data[i].name,
                x: coor.x,
                y: coor.y,
                offsetX:defaultWidth/2,
                offsetY:defaultHeight,
                width: defaultWidth,//根据实际情况调整，有放大缩小效果
                height: defaultHeight,
                srcId: template.name+"_icon",//图片路径
                draggable:false //false为不能抓取移动
            },
        }
        //新建图片图元对象（所有图形定义均需要以下代码生成图形对象，并加入到view中，后续省略）
        var graph = scene.GraphFactory.create(imageProp, view, layer);

        var scale=layer.getAttr("scale");
        graph.setAttrs({scaleX:1/scale.x,scaleY:1/scale.y});

        graph.assetTemplate=template;
        graph.assetDetail=data[i];
        //marker绑定事件
        graph.on("click",function(e){
            e.cancelBubble = true;
            markerBindEvent(e.target);
        })
    }
    layer.draw();
    callback();
}
//marker绑定事件
function markerBindEvent(t){
    //获取模板中的afterClick事件，并且进行语法转换
    var code=SynaxText(t.assetTemplate.afterClick,t.assetDetail);
    eval(code);
    //加载popwindow
    ShowPopupWindow(t);
}

//获取当前buildingId
function GetCurBuildingId()
{
    if (_curBuildingId != null) {
        return _curBuildingId;
    }
    else {
        return GetUrlParam("BuildingId");
    }
}
//加载楼栋下拉框
function LoadBuildings(callback)
{
    /*$.ajax({
        type: "get",
        url: authorityHost+"VisualArea/AreaListByType?AreaType=3",
        async: false,
        success: function (data) {
            //未指定哪个楼栋
            if (GetUrlParam("BuildingId") == "") {
                //定位到第一个
                if (data.length > 0) {
                    $("#btnSwitch button").html(data[0].name + ' <span class="caret"></span>');
                    _curBuildingId = data[0].id;
                }
            }
            else
            {
                var curBuildingId = GetUrlParam("BuildingId");
                for (var i = 0; i < data.length; i++)
                {
                    if (data[i].id == curBuildingId)
                    {
                        $("#btnSwitch button").html(data[i].name + ' <span class="caret"></span>');
                        break;
                    }
                }
            }
            //初始化areaMng，并且根据地图类型判断使用哪种地图
            var mapInfo=changeMapTypeByAreaMNG(GetCurBuildingId());
            if(mapInfo!=null&&mapInfo.mapType!="kinetic"){
                window.location.href=mapInfo.mapAddr;
                return;
            }
            //下拉内容
            var html = $(data).map(function () {
                return '<li><a href="#" onclick="SwitchBuilding(\'' + this.id + '\')">' + this.name + '</a></li>';
            }).get().join("");
            $("#btnSwitch ul").html(html);
            //处理回调
            if (callback != null && typeof (callback) == "function")
            {
                callback();
            }
            if(GetUrlParam("disableBuildingSwitch")=="1"){
                $("#btnSwitch button").attr("data-toggle","");
                $("#btnSwitch button").find(".caret").addClass("hide");
                //$("#btnSwitch button")[0].disabled=true;
            }
        }
    });*/
    //初始化areaMng，并且根据地图类型判断使用哪种地图
    var mapInfo=changeMapTypeByAreaMNG(GetCurBuildingId());
    if(mapInfo!=null&&mapInfo.mapType!="kinetic"){
        window.location.href=mapInfo.mapAddr;
        return;
    }
    var areaObj=areaMNG.GetAreaInfo();
    //2 加载下拉选择框
    var areaDropDown=new AreaDropDown(".topleft2",null,areaObj.parentId);
    areaDropDown.init(function(areaId){
        window.location.href=getAreaViewUrl(areaId);
    },areaObj.id);
    //3 加载返回按钮
    loadBackButton("#backButtonContainer",areaObj.parentId);
    //处理回调
    if (callback != null && typeof (callback) == "function")
    {
        callback();
    }
}
//切换楼栋
SwitchBuilding=function (id)
{
    window.location.href = "/DataVisual/roommap1.html?backto=" + GetUrlParam("backto") + "&BuildingId=" + id + "&Entrance=" + GetUrlParam("Entrance");
}
