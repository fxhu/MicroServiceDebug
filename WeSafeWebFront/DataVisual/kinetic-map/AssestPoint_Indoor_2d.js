var mapDivId="fengMap1";
var scene,KineticMap,view;
var layerInfo={id:0,name:null};
var areaMNG;
var images;
var areaInfo;
var focusImgMarker = null;//当前选中的图片标记
var cachedAssests=undefined;
$(function () {
    require(["./kinetic-map"],function(main){
        KineticMap=main.KineticMap;
        scene=main.scene;
        if (IsSetUpMode()) {
            $(".pointType").removeClass("hide");
            document.title = "资产安装";
            $('#myModal').on('shown.bs.modal', function (e) {
                $("#txtKeyword").keyup(function () {
                    if (delayHolder != null) {
                        clearTimeout(delayHolder);
                    }
                    delayHolder = setTimeout("onAssestSearch()", 200);
                });
                onAssestSearch();
            })
        }
        else {
            ListenCtrlPress();
        }
        console.log(window.location.href);
        //加载地图
        LoadMap();
    })
})

var delayHolder = null;
function LoadMap() {
    fillDivToWindow(mapDivId);
    areaMNG = new AreaMNG(GetCurBuildingId());
    areaInfo=areaMNG.GetAreaInfo();
    var areaId=areaInfo.id;
    var mapID;
    if(areaInfo.areaType==4){
        tipMsgInChinese("2d室内地图不支持园区级别");
        return ;
    }else if(areaInfo.areaType==3){
        var fs=areaMNG.GetListGroups();
        mapID=areaInfo.mapID;
        if(fs==null||fs.length==0){
            tipMsgInChinese("此楼栋下无楼层信息");
            return ;
        }else{
            for(var i in fs){
                if(fs[i].gid==1){
                    layerInfo={id:1,name:fs[i].gname};
                    break;
                }
            }
        }
    }else if(areaInfo.areaType==1){
        var floorAreaInfo=getParentAreaInfoByChildId(areaId);
        var buildingAreaInfo=getParentAreaInfoByChildId(floorAreaInfo.id);
        mapID=buildingAreaInfo.mapID;
        layerInfo={id:GetExtAttrValue(floorAreaInfo,"层号"),name:floorAreaInfo.name};
    }else{
        var buildingAreaInfo=getParentAreaInfoByChildId(areaId);
        mapID=buildingAreaInfo.mapID;
        layerInfo={id:GetExtAttrValue(areaInfo,"层号"),name:areaInfo.name};
    }

    if(GetUrlParam("use")=="show"){
        $("#parkName").html(areaInfo.name);
    }

    var pre="/DataVisual/data/"+mapID+"/";

    //初始化地图
    if(layerInfo.id==0||layerInfo.id==undefined||layerInfo.id==null){
        tipMsgInChinese();
        return ;
    }
    if(GetUrlParam("use")=="view"){
        $("#parkName").html(areaInfo.name);
    }
    images = [];//底图图片资源，项目实际情况修改
    images.push({id:layerInfo.id,src:pre+layerInfo.id+".png"});
    if(images.length==0)return;
    view = KineticMap.init(mapDivId, images, layerInfo.id);
    view.on("click", function (e) {
        viewClickEvent(e);
    });
    var layerGraph = {
        layerProp: {
            id: "layerGragh",
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
    //初始化资产
    LoadSearchPanel(true);
}
function viewClickEvent(e){
    //取消激活状态
    CancelActiveState();
    //还原点位的动画效果
    var imagelayer=view.children[1];
    var graghs=imagelayer.children;
    for(var i=0;i<graghs.length;i++){
        graghs[i].setAttrs({scaleX:xyScale.x,scaleY:xyScale.y});
    }
    view.draw();
}


function saveMarker(t){
    var coor=KineticMap.simpleReTransformCoor(t.attrs.x,t.attrs.y);
    $.ajax({
        type: "post",
        url: authorityHost+"AssestsPoint/UpdateAssestPoint",
        data: {
            id: t.attrs.id,
            Latitude: coor.y,
            Longitude: coor.x
        },
        success: function (data) {
            if(data=="OK"){
                t.setAttrs({scaleX:xyScale.x,scaleY:xyScale.y});
                view.draw();
            }else{
                alert("点位保存失败！");
            }
        },
        error: function (err) {
            alert("点位保存失败！");
        },
        complete: function () {

        }
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
function LoadChildArea() {

    //加载区域
    $.getJSON(authorityHost + "VisualArea/AreaTree?Id=" + GetUrlParam("id"), function (data) {
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
function GetFloorId(areaModel) {
    var floorIndex = GetExtAttrValue(areaModel, "层号");
    if (floorIndex == "") { return 1; }
    else {
        return parseInt(floorIndex, 10);
    }
}

var cachedAssests;
//是否资产安装模式
function IsSetUpMode() {
    return GetUrlParam("Entrance") == "1";
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
            PointType: pointType
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
function removeMarker(marker) {
    var floorId = areaMNG.GetFloorId();
    var group = map.getFMGroup(floorId);
    var layer = group.getOrCreateLayer('imageMarker');
    layer.removeMarker(marker);
}
var xyScale=null;
//加载图片标记
function LoadImgMarkers(data) {
    //1 获取图形交互层
    var layer=view.children[1];
    //2 先将图形交互层所有的元素干掉
    layer.destroyChildren();
    //3 添加图片标记
    for(var i=0;i<data.length;i++){
        var template=GetTemplateByName(data[i]["templateName"]);
        var coor;
        if(data[i].x==null||data[i].x==undefined||data[i].x==''||data[i].x==0){
            //设置默认位置
            coor=KineticMap.simpleTransformCoor(900,100);
        }else{
            coor=KineticMap.simpleTransformCoor(parseFloat(data[i].x),parseFloat(data[i].y));
        }
        //定义图片单元参数
        var imageProp= {
            typeName: "image",
            shapeProp: {
                id:data[i].id,//id必须指定，并且不能重复
                name:data[i].name,
                x: coor.x,
                y: coor.y,
                offsetX:10,
                offsetY:20,
                width: 20,//根据实际情况调整，有放大缩小效果
                height: 20,
                srcId: template.name+"_icon",//图片路径
                draggable:true //false为不能抓取移动
            }
        }
        //新建图片图元对象（所有图形定义均需要以下代码生成图形对象，并加入到view中，后续省略）
        var graph = scene.GraphFactory.create(imageProp, view, layer);

        var scale=view.children[0].getAttr("scale");
        graph.setAttrs({scaleX:1/scale.x,scaleY:1/scale.y});

        graph.assetTemplate=template;
        graph.assetDetail=data[i];
        //marker绑定事件
        graph.on("click",function(e){
            if(focusImgMarker!=null){
                if(focusImgMarker!=e.target&&xyScale){
                    focusImgMarker.setAttrs({scaleX:xyScale.x,scaleY:xyScale.y});
                }
            }
            focusImgMarker=e.target;
            e.cancelBubble = true;
            xyScale=e.target.getAttr("scale");
            e.target.setAttrs({scaleX:xyScale.x*1.5,scaleY:xyScale.y*1.5});
            view.draw();
            markerBindEvent(e.target);
        })
        graph.on("dragstart",function(e){
            xyScale=e.target.getAttr("scale");
            e.target.setAttrs({scaleX:xyScale.x*1.5,scaleY:xyScale.y*1.5});
            view.draw();
        })
        graph.on("dragend",function(e){
            saveMarker(e.target);
        })
    }
    layer.draw();
}
function markerBindEvent(t){
    extraMNG.show(t.assetDetail.id);
    batchAccessMNG.add(t.assetDetail.id);
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
var naviLines = [],
    viewMode = !1;

var pointType = 0;
var batchAccessMNG=new BatchAccessMNG();
var extraMNG=new ExtraMNG();
function ListenCtrlPress()
{
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.shiftKey && e.altKey)
        {
            batchAccessMNG.show();
        }

    });
}
