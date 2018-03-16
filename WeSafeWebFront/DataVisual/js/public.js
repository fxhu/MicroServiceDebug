var FengMap_Key = "2a8d5717efd52295619fea3a0c1f9b21";
var FengMap_AppName = "智慧消防01";
var Default_MapScaleLevel = 21;
var Default_MapName = "wutos001";
var DefaultGroupSpace = 20;
var DefaultIconHeight = 1.5;
var loadFloors = [];
var parkStyle = {
    strokeColor: "green",    //边线颜色。
    fillColor: "",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 1,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.2,	   //边线透明度，取值范围0 - 1。
    fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'dotted' //边线的样式，solid或dashed。
}
var styleOptions = {
    strokeColor: "blue",    //边线颜色。
    fillColor: "",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 1,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.6,	   //边线透明度，取值范围0 - 1。
    fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
}
var hoverStyle = {
    strokeColor: "blue",    //边线颜色。
    fillColor: "white",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 1,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.6,	   //边线透明度，取值范围0 - 1。
    fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
}
//获取扩展属性
function GetExtAttrValue(obj, name) {
    if (obj == null || obj.extAttrs == null) { return ""; }
    for (var i = 0; i < obj.extAttrs.length; i++) {
        var item = obj.extAttrs[i];
        if (item.name == name) {
            return item.value;
        }
    }
    return "";
}
//获取Url中的参数内容
function GetUrlParam(name) {
    if (!name) { return ""; }
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');
        if (hash[0].toUpperCase() == name.toUpperCase()) {
            return hash[1];
        }
    }
    return "";
}
//根据轮廓计算中心点
function CalcCenter(outline) {
    var x = 0, y = 0;
    if (outline) {
        var arr = outline.split(';');
        for (var i = 0; i < arr.length; i++) {
            x = x + parseFloat(arr[i].split(",")[0]);
            y = y + parseFloat(arr[i].split(",")[1]);
        }
        var exp = x.toString().indexOf(".") < 0 ? 0 : (x.toString().length - x.toString().indexOf(".") - 1);
        return {
            x: (x / arr.length).toFixed(exp), y: (y / arr.length).toFixed(exp)
        };
    }
    else {
        return { x: 0, y: 0 };
    }

}
//单层多层显示切换
function SwitchMutiFloor() {
    var img = $("#btnMutiFloor").find("img");
    //多层
    if (img.attr("src").indexOf("duoceng") > -1) {
        map.visibleGroupIDs = [parseInt(map.focusGroupID, 10)];
        img.attr("src", "images/danceng.png");
    }
    else {
        map.visibleGroupIDs = $(map.listGroups).map(function () { return $(this).attr("gid") }).get();
        img.attr("src", "images/duoceng.png");
    }
}
//二维三维切换
function SwitchMode() {
    //3D
    if (map.viewMode == fengmap.FMViewMode.MODE_3D) {
        map.viewMode = fengmap.FMViewMode.MODE_2D;
        $(event.srcElement).html("2D").removeClass("btn-primary").addClass("btn-default");
    }
    else {
        map.viewMode = fengmap.FMViewMode.MODE_3D;
        $(event.srcElement).html("3D").removeClass("btn-default").addClass("btn-primary");
    }
}
function FloorScrollIntoView()
{
    var pageIndex = $(".starit").attr("pageindex");
    if (pageIndex == null || pageIndex=="") {
        pageIndex = 1;
    }
    var pageStart = (pageIndex - 1) * 15 + 1;
    var pageEnd = (pageIndex) * 15;
    var curFloorId = $(".starit").find(".layer.btn-primary").attr("layerid");
    while (curFloorId < pageStart) {
        $(".pageDown").trigger("click");
        pageIndex = $(".starit").attr("pageindex");
        pageStart = (pageIndex - 1) * 15 + 1;
    }
    while (curFloorId > pageEnd) {
        $(".pageUp").trigger("click");
        pageIndex = $(".starit").attr("pageindex");
        pageEnd = (pageIndex) * 15;
    }
}
//加载楼层列表
function InitFloorList(areaMNG, defaultLayer, floorChange) {
    var stairStart = 1;
    var stairEnd = 15;
    //0 添加楼层的翻页按钮
    $(".starit").append('<button class="btn btn-default btn-sm pageUp"><span class="glyphicon glyphicon-chevron-up"></span></button>');
    //1 添加楼层
    var groups =null;
    var layerClass =null;
    if(typeof (map) =="object"){
        groups = areaMNG.GetListGroups();
        groups.sort(function(a,b){
            return parseInt(a.gid,10)-parseInt(b.gid,10);
        });
        if(defaultLayer==null&&groups.length>0){
            defaultLayer=groups[0].gid;
        }
        for (var i = groups.length - 1; i >= 0; i--) {
            var groupName = groups[i].gname;
            layerClass="btn-default";
            if (defaultLayer != null && defaultLayer == groups[i].gid) {
                layerClass = "btn-primary";
            }
            var sty = ((groups[i].gid >= stairStart && groups[i].gid <= stairEnd) ? '' : 'style="display:none"');
            $(".starit").append('<button class="btn ' + layerClass + ' btn-sm layer" ' + sty + ' layerId="' + groups[i].gid + '">' + groupName.toUpperCase() + '</button>');
        }
    }else{
        groups=areaMNG.GetListGroups();
        groups.sort(function(a,b){
            return parseInt(a.gid,10)-parseInt(b.gid,10);
        });
        if(defaultLayer.name==null&&groups.length>0){
            defaultLayer.id=groups[0].gid;
            defaultLayer.name=groups[0].gname;
        }
        for(var i=groups.length-1;i>=0;i--){
            layerClass="btn-default";
            if (defaultLayer.id == groups[i].gid) {
                layerClass = "btn-primary";
            }
            var sty = ((groups[i].gid >= stairStart && groups[i].gid <= stairEnd) ? '' : 'style="display:none"');
            $(".starit").append('<button class="btn ' + layerClass + ' btn-sm layer" ' + sty + ' layerName="' + groups[i].gname+ '"  layerId="' + groups[i].gid + '">' + groups[i].gname.toUpperCase() + '</button>');
        }
    }
    $(".starit").append('<button class="btn btn-default btn-sm pageDown"><span class="glyphicon glyphicon-chevron-down"></span></button>');
    //2 楼层事件
    if(typeof (map) =="object"){
        $(".starit").find(".layer").click(function () {
            $(".starit").find(".layer").removeClass("btn-primary").addClass("btn-default");
            if (!$(this).hasClass("btn-primary")) {
                $(this).removeClass("btn-default").addClass("btn-primary");
            }
            //当前模式是多层
            if ($("#btnMutiFloor").find("img").attr("src").indexOf("duoceng") > -1) {
                map.focusGID = $(this).attr("layerId");
                map.focusGroupID = $(this).attr("layerId");
            }
            else {
                map.focusGID = $(this).attr("layerId");
                map.focusGroupID = $(this).attr("layerId");
                map.visibleGroupIDs = [parseInt($(this).attr("layerId"), 10)];
            }
            //楼层切换
            if (floorChange != null && typeof (floorChange) == "function") {
                floorChange(parseInt($(this).attr("layerId"), 10));
            }
        });
    }else {
        $(".starit").find(".layer").click(function () {
            $(".starit").find(".layer").removeClass("btn-primary").addClass("btn-default");
            if (!$(this).hasClass("btn-primary")) {
                $(this).removeClass("btn-default").addClass("btn-primary");
            }
            //楼层切换
            if (floorChange != null && typeof (floorChange) == "function") {
                floorChange({id:($(this).attr("layerId")),name:($(this).attr("layerName"))});
            }
        });
    }

    //3 楼层翻页事件
    $(".starit").find(".pageUp").click(function () {
        var pageSize = 15;
        var pageIndex = $(".starit").attr("pageIndex");
        if (pageIndex == null) {
            pageIndex = 1;
        }
        var alllayer = $(".starit").find(".layer");
        var pageCount = (alllayer.length % pageSize == 0 ? alllayer.length / pageSize : parseInt(alllayer.length / pageSize, 10) + 1);
        pageIndex = parseInt(pageIndex, 10);
        if (pageIndex >= pageCount) {
            $(".starit").attr("pageIndex", pageCount);
            return;
        }
        pageIndex++;
        $(".starit").attr("pageIndex", pageIndex);
        var startStair = (pageIndex - 1) * pageSize + 1;
        var endStair = pageIndex * pageSize;
        //遍历楼层
        var alllayer = $(".starit").find(".layer");
        for (var i = 0; i < alllayer.length; i++) {
            var curLayerId = parseInt($(alllayer[i]).attr("layerid"), 10);
            if (curLayerId >= startStair && curLayerId <= endStair) {
                alllayer[i].style.display = "";
            }
            else {
                alllayer[i].style.display = "none";
            }
        }
    });
    //向下翻页
    $(".starit").find(".pageDown").click(function () {
        var pageSize = 15;
        var pageIndex = $(".starit").attr("pageIndex");
        if (pageIndex == null) {
            pageIndex = 1;
        }
        pageIndex = parseInt(pageIndex, 10);
        if (pageIndex <= 1) {
            $(".starit").attr("pageIndex", "1");
            return;
        }
        pageIndex--;
        $(".starit").attr("pageIndex", pageIndex);
        var startStair = (pageIndex - 1) * pageSize + 1;
        var endStair = pageIndex * pageSize;
        //遍历楼层
        var alllayer = $(".starit").find(".layer");
        for (var i = 0; i < alllayer.length; i++) {
            var curLayerId = parseInt($(alllayer[i]).attr("layerid"), 10);
            if (curLayerId >= startStair && curLayerId <= endStair) {
                alllayer[i].style.display = "";
            }
            else {
                alllayer[i].style.display = "none";
            }
        }
    });
}
//图标加载器
function MarkLoader(loadFunction, oneStepNum) {
    //加载函数
    var _loadFunction = function (data) { console.log(data); }
    //一次加载的数量
    var _oneStepNum = 1;
    var _callback = function () { console.log("marker load complete!"); }
    if (loadFunction) { _loadFunction = loadFunction; }
    if (oneStepNum) { _oneStepNum = oneStepNum; }

    var _data = null;
    var _workerTimer = null;

    var _cursor = 0;
    function doWork() {
        var i = 0;
        while (i < _oneStepNum && _cursor < _data.length) {
            //执行函数
            try {
                _loadFunction(_data[_cursor]);
            }
            catch (e) {
                console.log(e);
            }
            i = i + 1;
            _cursor = _cursor + 1;
        }
        //游标还没有走到最后
        if (_cursor < _data.length) {
            setTimeout(doWork);
        }
        else {
            //已经加载完成
            if (_callback != null && typeof (_callback) == "function") {
                _callback();
            }
        }
    }
    return {
        load: function (data, callback) {
            if (callback) { _callback = callback; }
            _data = data;
            _cursor = 0;
            doWork();
        },
        isBusing: function () {
            return _cursor < _data.length;
        }
    }
}
//区域信息
function AreaMNG(param) {
    var areaModel = null;
    var parentAreaModel = null;
    var floorAreaMap = [];
    if (typeof (param) == "string" || typeof (param) == "number") {
        $.ajax({
            type: "get",
            url: authorityHost+"visualarea/GetAreaInfo?id=" + param,
            async: false,
            success: function (data) {
                areaModel = data;
            }
        });
    }
    else if (typeof (param) == "object") {
        areaModel = param;
    }
    else {
        throw Error("参数param既不是string/number，又不是object!");
    }
    function GetBuildModel() {
        if (parentAreaModel == null) {
            $.ajax({
                type: "get",
                url: authorityHost+"visualarea/GetBuildingInfo?id=" + areaModel.id,
                async: false,
                success: function (data) {
                    parentAreaModel = data;
                }
            });
        }
        return parentAreaModel;
    }
    function getMapScaleLevel() {
        var m = areaModel;
        //楼层
        if (m.areaType == 2) {
            m = GetBuildModel();
        }
        var scaleLevel = GetExtAttrValue(m, "缩放级别");
        if (scaleLevel != "") {
            return scaleLevel;
        }
        else {
            return Default_MapScaleLevel;
        }
    }
    function getMapID() {
        var m = areaModel;
        //楼层
        if (m.areaType == 2) {
            m = GetBuildModel();
        }
        var mapName = m.mapID;
        if (mapName != "") {
            return mapName;
        }
        else {
            return Default_MapName;
        }
    }
    return {
        GetBuildModel:GetBuildModel,
        GetMapScaleLevel: getMapScaleLevel,
        GetMapID: getMapID,
        GetAreaInfo: function () {
            return areaModel;
        },
        GetShowGroups: function () {
            //楼层
            if (areaModel.areaType == "2") {
                var floorIndex = GetExtAttrValue(areaModel, "层号");
                if (floorIndex == "") { return [1]; }
                else {
                    return [parseInt(floorIndex, 10)];
                }
            }
            else {
                return $(map.listGroups).map(function () { return $(this).attr("gid") }).get();
            }
        },
        GetFloorId: function () {
            var floorIndex = GetExtAttrValue(areaModel, "层号");
            if (floorIndex == "") { return 1; }
            else {
                return parseInt(floorIndex, 10);
            }
        },
        IsFloorMaped: function () {
            var floorIndex = GetExtAttrValue(areaModel, "层号");
            return floorIndex != "";
        },
        GetAreaIdByFloorId: function (id) {
            if (floorAreaMap.length == 0) {
                $.ajax({
                    type: "get",
                    url: authorityHost+"visualarea/AreaList?ParentId=" + areaModel.id,
                    async: false,
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var floorId = GetExtAttrValue(data[i], "层号");
                            if (floorId != "") {
                                floorAreaMap.push({ floorId: floorId, areaId: data[i].id });
                            }
                        }
                    }
                });
            }
            //遍历映射表
            for (var i = 0; i < floorAreaMap.length; i++) {
                if (parseInt(id, 10) == parseInt(floorAreaMap[i].floorId, 10)) {
                    return floorAreaMap[i].areaId;
                }
            }
            return "";
        },
        GetListGroups: function () {
            var mapId=getMapID();
            var pre="/DataVisual/data/"+mapId+"/";
            var t=[];
            $.ajax({
                type: "get",
                url: authorityHost+"visualarea/AreaList?ParentId=" + areaModel.id,
                async: false,
                success: function (data) {
                    for(var i=0;i<data.length;i++){
                        var gid=GetExtAttrValue(data[i],"层号");
                        if(gid!=null && gid>=0 && gid!=""){
                            t.push({gid:gid,gname:data[i].name,gsrc:pre+gid+".png"})
                        }
                    }
                }
            });
            return t;
        },
        GetIsSeparate: function (fmapID) {
            return fmapID.toUpperCase() == "WUTOS001";
        }
    }
}
function getParentAreaInfoByChildId(id){
    var info=null;
    $.ajax({
        type: "get",
        url: authorityHost+"visualarea/GetParentAreaInfo?id="+id,
        async:false,
        success: function (data)
        {
            info=data;
        }
    });
    return info;
}
//根据areaMNG切换地图类型
function changeMapTypeByAreaMNG(buildingId){
    areaMNG = new AreaMNG(buildingId);
    var mapType=areaMNG.GetAreaInfo().mapType; 
    if(mapType=="2D"){
        return {
            mapType:"kinetic",
            mapAddr:"/DataVisual/roommap1.html?backto=" + GetUrlParam("backto") + "&BuildingId=" + buildingId + "&Entrance=" + GetUrlParam("Entrance")
        };
    }else if(mapType=="FengMap"){
        return {
            mapType:"fengmap",
            mapAddr:"/DataVisual/roommap.html?backto=" + GetUrlParam("backto") + "&BuildingId=" + buildingId + "&Entrance=" + GetUrlParam("Entrance")
        };
    }
    return {
        mapType:"fengmap",
        mapAddr:"/DataVisual/roommap.html?backto=" + GetUrlParam("backto") + "&BuildingId=" + buildingId + "&Entrance=" + GetUrlParam("Entrance")
    };
}
//检测文字遮挡的常量
var labels=[];//文字坐标数组
var deltaX=30;
var deltaY=5;
var addY=12;
var laterPosition=null;//离点位最近的点
function DrawLabel(group, txt, x, y) {
    if(typeof (map) =="object"){
        if (x == null || x == "" || x == "0" || y == null || y == "" || y == "0") { return; }
        var group = map.getFMGroup(group);
        var layer = group.getOrCreateLayer('textMarker');
        var tm = new fengmap.FMTextMarker({
            x: x,
            y: y,
            z: 0.5,
            name: txt,
            //填充色
            fillcolor: "0,0,0",
            //字体大小
            fontsize: 12,
            //边框色
            strokecolor: "255,255,255",
            callback: function () {
                // 在图片载入完成后，设置 "一直可见"
                tm.alwaysShow();
            }
        });
        //文本标注层添加文本Marker
        layer.addMarker(tm);
    }else{
        var xyjson=KineticMap.simpleTransformCoor(parseFloat(x),parseFloat(y));
        //检测文字遮挡问题
        for(var i in labels){
            var p1=labels[i];
            if(Math.abs(p1.y-xyjson.y)<deltaY&&Math.abs(p1.x-xyjson.x)<deltaX){
                if(laterPosition==null){
                    laterPosition=p1;
                }else{
                    if(Math.abs(p1.x-xyjson.x)<Math.abs(laterPosition.x-xyjson.x)){
                        laterPosition=p1;
                    }
                }
            }
        }
        if(laterPosition!=null){
            xyjson={x:xyjson.x,y:laterPosition.y+addY};
        }
        labels.push(xyjson);
        laterPosition=null;
        var textProp = {
            typeName: "text",
            shapeProp: {
                id: group?group:""+"text",
                name: "",
                x: xyjson.x-5,//使x坐标适应文字长度，略微居中显示
                y: xyjson.y-15,//使y坐标偏上显示，适应文字遮挡的偏移问题
                text: txt,  //文本内容
                fontSize: 13,
                fontFamily: '微软雅黑',
                fill: 'black',
                stroke: 'rgba(255,255,255,0.9)',
                strokeWidth: 2,
                draggable: false
            }
        }
        //存入文本图层，避免标记图层清除掉。
        var graph=scene.GraphFactory.create(textProp, view, view.children[2]);
        var scale=view.children[2].getAttr("scale");
        graph.setAttrs({scaleX:1/scale.x,scaleY:1/scale.y});
        view.children[2].draw();
    }
}
//绘制多边形
function DrawPolygon(group, outline) {
    if(typeof (map) =="object"){
        if (outline == null || outline == "") { return; }
        var points = outline.split(";");
        coords = [];
        for (var i = 0; i < points.length; i++) {
            coords.push({ x: points[i].split(",")[0], y: points[i].split(",")[1] });
        }
        var group = map.getFMGroup(group);
        var polygonMarkerLayer = group.getOrCreateLayer('polygonMarker');
        var polygonMarker = new fengmap.FMPolygonMarker({
            //设置透明度
            alpha: .5,
            //设置边框线的宽度
            lineWidth: 1,
            //设置高度
            height: 0.5,
            //设置多边形坐标点
            points: coords
        });
        polygonMarkerLayer.addMarker(polygonMarker);
    }else{
        if(outline!=null&&outline!=undefined){
            var coors=outline.split(";");
            var transformedPoints=[];
            for(var i =0 ;i<coors.length;i++){
                var xy=coors[i].split(",");
                var xyjson=KineticMap.simpleTransformCoor(parseFloat(xy[0]),parseFloat(xy[1]));
                transformedPoints.push(xyjson.x);
                transformedPoints.push(xyjson.y);
            }
            var lineProp = {
                typeName: "line",
                shapeProp: {
                    id: group+"line",
                    name: "",
                    points: transformedPoints, //坐标为x1,y1,x2,y2…依次往下排
                    closed: true, //是否闭合
                    stroke: "black",
                    fill:"red", //当线闭合时候，有效
                    opacity:0.3, //同上
                    draggable: false
                }
            }
            //存入底图图层，跟随底图放大缩小
            var graph=scene.GraphFactory.create(lineProp, view, view.children[0]);

            view.draw();
        }
    }
}
function urlMap(x, y, zoom) {
    if (zoom == 19) {
        if (x >= 99516 && x <= 99521 && y <= 27658 && y >= 27652) {
            var prefix = "196_";
            var num = "0" + ((27658 - y) * 6 + (x - 99515));
            num = num.substring(num.length - 2);
            return prefix + num;
        }
    }
}
//蜂鸟和2d地图坐标转化
//坐标转换的相关系数
var xbeishu=14.36;
var ybeishu=-14.5;
var xoffset=-99685;
var yoffset=9830;
var x1=0;
var y1=0;
var xzhengshu=0;
var yzhengshu=0;
function transformCoorFromFengmap(x,y){
    if(x1==0){
        //iframe压缩界面之后的系数
        x1=$("#"+mapDivId).width()/1920;
        y1=$("#"+mapDivId).height()/1080;
        xzhengshu=parseInt(x/10000);
        yzhengshu=parseInt(y/1000);
    }
    return {x:(x%10000*xbeishu+xoffset)*x1,y:(y%1000*ybeishu+yoffset)*y1}
}
function reverseCoorToFengMap(x,y){
    var x0=(x/x1-xoffset)/xbeishu+xzhengshu*10000;
    var y0=(y/y1-yoffset)/ybeishu+yzhengshu*1000;
    return {"x":x0,"y":y0};
}

function LoadExtPic() {
    var tileLayer = new BMap.TileLayer({ isTransparentPng: true });
    tileLayer.getTilesUrl = function (tileCoord, zoom) {
        var pic = urlMap(tileCoord.x, tileCoord.y, zoom);
        if (pic != null) {
            return '/datavisual/tiles/' + zoom + "/" + pic + '.png';
        }
        else {
            return "";
        }
    }
    map.addTileLayer(tileLayer);
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
var InfoPanel = {
    show: function (id, typeName, deviceNum) {
        if ($(".infopanel").hasClass("hide")) {
            var left = ($(window).width() - $(".infopanel").width()) / 2;
            $(".infopanel").css("left", left);
            $(".infopanel").find(".panel-heading").find("span:first").html("巡检信息【" + typeName + " - " + deviceNum + "】");
            $(".infopanel").removeClass("hide");
        }
    },
    hide: function () {
        if (!$(".infopanel").hasClass("hide")) {
            $(".infopanel").addClass("hide");
        }
    }
}
function BMapDrawCenter(data,noLabel) {
    if (data.longitude && data.latitude && data.longitude != 0 && data.latitude != 0) {
        lastMarker = new BMap.Marker(new BMap.Point(data.longitude, data.latitude)); // 创建点
        if (!noLabel) {
            var label = new BMap.Label(data.name, {
                position: new BMap.Point(data.x, data.y),
                offset: new BMap.Size(0, -40)
            });
            label.setStyle({
                color: "black",
                backgroundColor: "white",
                maxWidth: "300px",
                padding: "5px",
                border: "solid 2px green",
                borderRadius: "5px",
                boxShadow: "#222 1px 1px 1px"
            });
            lastMarker.setLabel(label);
        }
        map.addOverlay(lastMarker);
        lastMarker.disableMassClear();
        var scaleLevel = 19;
        var level = GetExtAttrValue(data, "缩放级别");
        if (level != "") {
            scaleLevel = parseInt(level, 10);
        }
        map.centerAndZoom(new BMap.Point(data.longitude, data.latitude), scaleLevel);
    }
}
//数据可视化辅助对象
function DVHelper() {
    var cachedAreaModel = null;
    var cachedTemplate = null;
    var cachedPoints = [];
    //默认配置
    var defaultConfig = {
        IconSize_OutDoor: 32,
        //室外地图默认缩放级别
        ScaleLevel_OutDoor: 5,
        //室内地图默认缩放级别
        ScaleLevel_InDoor: 21,
        //室外地图中心点
        Center_OutDoor: { x: 114.429826, y: 30.45377 }
    };
    return {
        Default: defaultConfig,
        DrawBMapLabel: function (x, y, txt) {
            var marker = new BMap.Marker(new BMap.Point(x, y)); // 创建点
            var label = new BMap.Label(txt, {
                position: new BMap.Point(x, y),
                offset: new BMap.Size(0, -40)
            });
            label.setStyle({
                color: "black",
                backgroundColor: "white",
                maxWidth: "300px",
                padding: "5px",
                border: "solid 2px green",
                borderRadius: "5px",
                boxShadow: "#222 1px 1px 1px"
            });
            marker.setLabel(label);
            marker.disableMassClear();
            map.addOverlay(marker);
        },
        QueryAreaInfo: function (areaId, callback) {
            $.ajax({
                type: "get",
                url: authorityHost+"visualarea/GetAreaInfo?id=" + areaId,
                async: callback != null,
                success: function (data) {
                    cachedAreaModel = data;
                    if (callback != null && typeof (callback) == "function") {
                        callback(data);
                    }
                }
            });
            return cachedAreaModel;
        },
        GetCenter: function () {
            if (cachedAreaModel.longitude && cachedAreaModel.latitude && cachedAreaModel.longitude != 0 && cachedAreaModel.latitude != 0) {
                return { x: cachedAreaModel.longitude, y: cachedAreaModel.latitude };
            }
            else {
                return defaultConfig.Center_OutDoor;
            }
        },
        //获取缩放级别
        GetScaleLevel: function (inDoor) {
            var scaleLevel = this.GetExtra(cachedAreaModel, "缩放级别");
            if (scaleLevel != "") {
                var level = parseInt(scaleLevel, 10);
                if (!isNaN(level)) {
                    return level;
                }
            }
            return inDoor ? defaultConfig.ScaleLevel_InDoor : defaultConfig.ScaleLevel_OutDoor;
        },
        //获取缩放级别
        //根据名称获取对象的模板对象
        GetExtra: function (obj, name) {
            if (obj == null || obj.extAttrs == null) { return ""; }
            for (var i = 0; i < obj.extAttrs.length; i++) {
                var item = obj.extAttrs[i];
                if (item.name == name) {
                    return item.value;
                }
            }
            return "";
        },
        GetTemplateByName: function (templateName) {
            if (cachedTemplate == null) {
                $.ajax({
                    type: "get",
                    url: "VisualTemplate.json",
                    async: false,
                    success: function (data) {
                        cachedTemplate = data;
                    }
                });
            }
            //从模板中解析
            for (var i = 0; i < cachedTemplate.length; i++) {
                if (cachedTemplate[i].name == templateName) {
                    return cachedTemplate[i];
                }
            }
        },
        //查询点位信息
        QueryAssestPoint: function (areaId, pointType, assestTypes, level, callback) {
            //查询
            $.ajax({
                type: "post",
                url: authorityHost+"AssestsPoint/QueryAssestPoints",
                async: callback != null,
                data:
                {
                    AreaId: areaId,
                    PointType: pointType,
                    AssestType: assestTypes,
                    Outdoor: assestTypes == null ? "1" : "",
                    Layer: level
                },
                success: function (data) {
                    cachedPoints = data;
                    if (callback != null && typeof (callback) == "function") {
                        callback(data);
                    }
                }
            });
            return cachedPoints;
        },
        GetAssestPointById: function (pointId) {
            for (var i = 0; i < cachedPoints.length; i++) {
                if (cachedPoints[i].id.toUpperCase() == pointId.toUpperCase()) {
                    return cachedPoints[i];
                }
            }
        }
    }
}
function BackToMain() 
{
    parent.window.location.href = "/default.html#!/MyDesktop";
}
function BackToOneMap()
{
    parent.window.location.href = "/oneMap/RealTimeMonitoring";
}
function ToIndoorMap(backto,buildingId,disableBuildingSwitch)
{
    var url= "/datavisual/roommap.html?backto="+backto+"&BuildingId=" + buildingId;
    if(disableBuildingSwitch!=null){
        url=url+"&disableBuildingSwitch="+disableBuildingSwitch;
    }
    parent.window.location.href =url;
}
function ToOuterMap(backto,parkId)
{
    parent.window.location.href="/datavisual/buildingpanel.html?backto="+backto+"&parkid="+parkId;
}
function ToggleHis(ids) {
    $(ids).toggle();
}
//打开灭火救援
function ShowRecure() {
    window.location.href = rescueHost+"wuhancontrolcenter/warnInfo/rescue.html";
}
function ConfirmAlarm(type,alarmId,assestId) {
    if (type == "2") {
        $.ajax({
            type: "get",
            url: authorityHost+"AlarmEventTool/ConfirmAlarmEvent?id=" + alarmId,
            async: false,
            success: function (data) {
                if (data == "OK") {
                    //向第三方推送数据
                    $.ajax({
                        type: "get",
                        url: rescueHost+"wuhancontrolcenter/CalInterfaceWarnJwd?id=" + assestId,
                        async: false,
                        success: function (data) {

                        },
                        error: function (err) {

                        },
                        complete: function () {

                        }
                    });
                    //打开灭火救援
                    ShowRecure();
                }
                else {
                    swal(data);
                }
            }
        });
    }
    else {
        $.ajax({
            type: "get",
            url: authorityHost+"AlarmEventTool/FalseReportAlarmEvent?id=" + alarmId,
            async: false,
            success: function (data) {
                if (data == "OK") {
                    if (GetUrlParam("noback") == "1") {
                        window.location.href = window.location.href;
                    }
                    else {
                        var returnUrl = GetUrlParam("returnUrl");
                        if (returnUrl == "") {
                            window.history.back();
                        }
                        else {
                            window.location.href = returnUrl;
                        }
                    }
                }
                else {
                    swal(data);
                }
            }
        });
    }
}
function SaveModelId(areaId,modelId)
{
    var result="OK";
    $.ajax({
        type: "post",
        async:false,
        url: authorityHost+"VisualArea/SaveVisualAreaModelInfo",
        data:{
            Id:areaId,
            ModelId:modelId
        },
        success: function (info) {
            result=info;
        },
        error: function (err) {
            result=err;
        }
    });
    return result;
}
function ShowFirePlan(id) {
    $("#planModal").find(".modal-body").css("height", $(document).height() * 0.7);
    $("#planModal").modal();
    var url = "/Plans/PlanDetail/" + id;
    $('#planModal').on('shown.bs.modal', function () {
        $("#planModalIfm").attr("src", url);
    })
}
//角标生成
function TooltipMNG(container)
{
    var choosedItems=[];
    var obj=$('<div class="panel panel-primary" id="panel_tooltip" style="width:200px">'+
            '   <div class="panel-heading" style="padding:5px">物联序号<span style="font-size:25px;line-height:20px;float:right;cursor:pointer">×</span></div>'+
            '<div class="panel-body" style="padding:5px"><label for="iptIotNo">起始序号</label><input type="number" value="1" id="iptIotNo" style="width:50px"/>'+
            ' </div><div class="panel-footer" style="text-align:right;padding:5px"><label id="labelAllNum" class="pull-left"></label>'+
            '<label id="resultLabel" class="label label-success"></label><button class="btn btn-primary btn-sm">保存</button></div></div>');
    function refreshCount(){
        $("#labelAllNum").html("已选数量："+choosedItems.length);
    }
    function doClear(){
        choosedItems=[];
        refreshCount();
        
    }
    function doSave(){
        //处理数据
        var startNo=parseInt($("#iptIotNo").val(),10);
        var data=[];
        for(var i=0;i<choosedItems.length;i++){
            data.push({
                Name:choosedItems[i],
                Value:startNo+i
            });
        }
        if(data.length==0){return;}
        //异步保存
        $.ajax({
            type: "post",
            url: authorityHost+"AssestsPoint/SaveAssestPointExtra",
            data:{
                ExtraName:"物联序号",
                Data:$.toJSON(data)
            },
            success: function (info) {
                if(info=="OK"){
                    $("#resultLabel").html("保存成功").show().fadeOut('slow');
                }
                else
                {
                    $("#resultLabel").html(info);
                }
            },
            error: function (err) {
                $("#resultLabel").html(err.statusText);
            }
        });
    }
    return {
        show:function(onSave,onClose){
            if($("#panel_tooltip").length>0){
                $("#panel_tooltip").remove();
                choosedItems=[];
            }
            $(container).append(obj);
            //关闭事件
            obj.find(".panel-heading span").click(function(){
                $("#iptIotNo").val("1");
                $("#panel_tooltip").remove();
                choosedItems=[];
                if(onClose!=null && typeof(onClose)=="function"){
                    onClose();
                }
            })
            //保存事件
            obj.find(".btn-primary").click(function(){
                doSave();
                if(onSave!=null && typeof(onSave)=="function"){
                    onSave();
                }
            });
            obj.find(".btn-danger").click(function(){
                doClear();
            });
            refreshCount();
        },
        add:function(id,callback){
            if($("#panel_tooltip").length==0){
                return;
            }
            var index=$.inArray(id,choosedItems);
            var no=1;
            if(index>-1){
                no= index+parseInt($("#iptIotNo").val(),10);
            }
            else{
                choosedItems.push(id);
                refreshCount();
                no= parseInt($("#iptIotNo").val(),10)+choosedItems.length-1;
            } 
            if(callback!=null && typeof(callback)=="function"){
                callback(no);
            }
        },
        isActive:function(){
            return $("#panel_tooltip").length>0;
        }
    }
}
//扩展属性管理
function ExtraMNG()
{
    var _ifram_id="ifm_pointextra";
    function showWindow(id)
    {
        var url="/datavisual/assestpointextra.html?id="+(id==null?"":id);
        var html="<iframe src='"+url+"' id='ifm_pointextra' frameborder='0' style='position:absolute;bottom:10px;right:10px;width:360px;height:248px'></iframe>";
        $("body").append(html);
    }
    function closeWindow()
    {
        if($("#"+_ifram_id).length>0){
            $("#"+_ifram_id).remove();
        }
    }
    return {
        show:function(id){
            closeWindow();
            showWindow(id);
        },
        hide:function(){
            closeWindow();
        }
    }
}
function BatchAccessMNG()
{
    var _ifram_id="ifm_pointsort";
    var opened=false;
    function showWindow()
    {
        var url="/datavisual/assestpointsort.html";
        var html="<iframe src='"+url+"' id='"+_ifram_id+"' frameborder='0' style='position:absolute;bottom:10px;left:10px;width:340px;height:628px'></iframe>";
        $("body").append(html);
    }
    function closeWindow()
    {
        if($("#"+_ifram_id).length>0){
            $("#"+_ifram_id).remove();
        }
    }
    return {
        show:function(){
            if(!opened){
                showWindow();
                opened=true;
            }
        },
        hide:function(){
            if(opened){
                closeWindow();
                opened=false;
            }
        },
        add:function(id){
            if(!opened){return;}
            $("#"+_ifram_id)[0].contentWindow.AddToList(id);
        }
    }
}
//区域下拉框
function AreaDropDown(container,areaType,rootAreaId)
{
    var _data=[];
    var _container=$(container);
    var _dropdown=null;
    var _val;
    var _text;
    var rootId=(rootAreaId==null?"":rootAreaId);
    areaType=(areaType==null?4:areaType);
    function _render(onAreaChange,val)
    {
        //创建下拉的html
        var listHtml=[];
        for(var i=0;i<_data.length;i++){
            listHtml.push('<li areaId="'+_data[i].id+'"><a href="javascript:void(0)" >' + _data[i].name + '</a></li>');
            if(val!=null && _data[i].id==val){
                _val=_data[i].id;
                _text=_data[i].name;
            }
        }
        if(_val==null){
            _val=_data[0].id;
            _text=_data[0].name;
        }
        //主html
        var html='<div class="btn-group">'+
            '  <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+_text+
            '      <span class="caret"></span>'+
            ' </button>'+
            '  <ul class="dropdown-menu">'+listHtml.join("")+'</ul>'+
            ' </div>';
        _dropdown=$(html);
        //绑定事件
        _dropdown.find(".dropdown-menu li").click(function(){
            _val=$(this).attr("areaId");
            _text=$(this).text();
            //设置text
            $(this).parent().prev().html(_text+'      <span class="caret"></span>');
            if(onAreaChange!=null && typeof(onAreaChange)=="function"){
                
                onAreaChange($(this).attr("areaId"));
            }
        })
        //追加到容器
        _container.append(_dropdown);    
    }
    function _init(onAreaChange,val)
    {
        var url=authorityHost + "VisualArea/AreaListByType?AreaType="+areaType+"&AreaId="+rootId;
        $.ajax({
            type: "get",
            url: url,
            success: function (data) {
                _data=data;
                //1 呈现内容
                if(_data.length>0){
                    _render(onAreaChange,val);
                }
            }
        })
    }
    return {
        init:function(onAreaChange,val)
        {
            _init(onAreaChange,val);
        },
        getValue:function(){
            return _val;
        }
    }
}
function getAreaViewUrl(id)
{
    var mapDefineObj=null;
    function getMapDefine()
    {
        if(mapDefineObj==null)
        {
            $.ajax({
                type: "get",
                url: "/DataVisual/MapDefine.json",
                async:false,
                success: function (data) 
                {
                    mapDefineObj=data;
                }
            });
        }
        return mapDefineObj;
    }
    var areaObj=null;
    var mapAreaObj=null;
    function loadAreaObj(id)
    {
        $.ajax({
            type: "get",
            url: authorityHost+"visualarea/GetAreaInfo?id=" + id,
            async: false,
            success: function (data) {
                areaObj = data;
                mapAreaObj=data;
            }
        });
        if(areaObj!=null && areaObj.areaType<3){
            $.ajax({
                type: "get",
                url: authorityHost+"visualarea/GetBuildingInfo?id=" + id,
                async: false,
                success: function (data) {
                    mapAreaObj = data;
                }
            });
        }
    }
    function getVisualAreaViewUrl(id)
    {
        //获取区域信息
        loadAreaObj(id);
        if(mapAreaObj!=null)
        {
            var mapDefineObj= $(getMapDefine()).map(function(){
                if(this.id==mapAreaObj.mapType){return this;}
            }).get()[0];
            //地图定义对象
            if(mapDefineObj!=null)
            {
                var url= mapDefineObj["viewurl_"+areaObj.areaType];
                if(url){
                    return url.replace("{id}",id);
                }
                else{
                    url= mapDefineObj["viewurl"];
                    if(url){
                        return url.replace("{id}",id);
                    }
                }
            }
        }
        return "";
    }
    return getVisualAreaViewUrl(id);
}
//处理退出按钮逻辑
function loadBackButton(container,areaId)
{
    var html='<button class="btn btn-primary btn-sm" style="margin-bottom:15px;display:block"><span class="glyphicon glyphicon-share-alt rollover" aria-hidden="true"></span>  返回</button>';
    var btn=$(html);
    $(btn).click(function(){
        window.location.href=getAreaViewUrl(areaId);
    })
    $(container).append(btn);
}
function openDetailInfo(id)
{
    var obj=$("#ifm_areaStatInfo");
    if(obj.length>0){
        obj.remove();
    }
    
    var height=$(window).height();
    var width=373;
    var html='<iframe id="ifm_areaStatInfo" frameborder="0" src="/DataVisual/AreaStat.html?id='+id+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:0px;right:-'+width+'px"></iframe>';
    var ifmObj=$(html);
    $("body").append(ifmObj);
    ifmObj.animate({right:"0px"});
}
function tipMsgInChinese(msg){
    if(msg==null){
        msg="请设置层号";
    }
    var div=$(".topleft2");
    if(!div){
        div='<div class="topleft2"><h1>'+msg+'</h1></div>';
        $(document).append($(div));
    }else{
        div.append($("<h1>"+msg+"</h1>"));
    }
}
function fillDivToWindow(divID){
    $("#"+divID).css("width",$(window).width());
    $("#"+divID).css("height",$(window).height());
}
function GetColorByScore(factor) {
    factor=100-factor;
    var r=parseInt(factor<=50?(255*factor/50):255,10);
    var g=parseInt(factor<=50?255:255-(255*((factor-50)/50)),10);
    return "rgb(" + r + "," + g + ",0)";
}
//区域统计信息
function AreaStatMNG()
{
    var ifmObj=$("#ifm_areaStatInfo");
    return {
        init:function(id){
            if(ifmObj.length>0){
                ifmObj.remove();
            }
            var top=20;
            var right=20;
            var height=$(window).height()-top*2;
            var width=373;
            var style='width:'+width+'px;height:'+height+'px;position:absolute;top:'+top+'px;right:-'+width+'px;box-shadow:2px 2px 7px #999';
            var html='<iframe id="ifm_areaStatInfo" frameborder="0" src="/DataVisual/AreaStatisticsPanel.html?id='+id+'" style="'+style+'"></iframe>';
            ifmObj=$(html);
            $("body").append(ifmObj);
            ifmObj.animate({right:right+"px"});
        }
    }
}
//地图类型切换
function MapTypeSwitch(container){
    var html='<div class="btn-group" id="btnMapTypeSwitch" role="group">'+
            '   <button type="button" class="btn btn-sm">3D</button>'+
            '   <button type="button" class="btn btn-sm">2D</button>'+
            '</div>';
    return{
        init:function(type)
        {
            var btnGroup=$(html);
            //默认样式
            btnGroup.find("button").each(function(){
                if($(this).text()==type){
                    $(this).addClass("btn-primary");
                }
                else{
                    $(this).addClass("btn-default");
                }
            }).click(function(){
                //样式调整
                $("#btnMapTypeSwitch button").removeClass("btn-primary").removeClass("btn-default").addClass("btn-primary");
                //当前区域Id
                var areaId=GetUrlParam("ParkId")||GetUrlParam("id");
                if($(this).text()=="3D"){
                    window.location.href="/dataVisual/bim.html?use=view&id="+areaId;
                }
                else{
                    window.location.href="/datavisual/BuildingMap.html?ParkId="+areaId;
                }
            })
            //添加到容器
            $(container).append(btnGroup);
        }
    }
}