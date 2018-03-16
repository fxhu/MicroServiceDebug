var scene,KineticMap,view;
var areaMNG;
var images;
var layerInfo={id:0,name:null};
var mapDivId="fengMap";
var coords = [];

$(function () {
    require(["./kinetic-map"],function(main){
        KineticMap=main.KineticMap;
        scene=main.scene;
        console.log(window.location.href);
        LoadMap(GetUrlParam("id"));
    })
})
function LoadMap(areaId)
{
    fillDivToWindow(mapDivId);
    areaMNG = new AreaMNG(areaId);
    areaInfo=areaMNG.GetAreaInfo();
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

    //初始化地图
    var pre="/DataVisual/data/"+mapID+"/";
    images = [];//底图图片资源，项目实际情况修改
    if(layerInfo.id==0||layerInfo.id==undefined||layerInfo.id==null){
        tipMsgInChinese();
        return ;
    }
    images.push({id:layerInfo.id,src:pre+layerInfo.id+".png"});
    if(images.length==0)return;
    view = KineticMap.init(mapDivId, images, layerInfo.id);
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

    $.getJSON(authorityHost+"visualarea/GetAreaInfo?id=" + GetCurBuildingId(), function (data) {
        //园区名称
        $("#parkName").html(data.displayName);
        if (data && data.outline) {
            var points = data.outline.split(";");
            coords = [];
            for (var i = 0; i < points.length; i++) {
                var xyJson=KineticMap.simpleTransformCoor(points[i].split(",")[0],points[i].split(",")[1]);
                coords.push(xyJson.x);
                coords.push(xyJson.y);
            }
            //园区轮廓
            drawing();
        }
    })
}
function doSave() {
    var outline=[];
    for(var i=0;i<coords.length;i++){
        var x=coords[i];
        i++;
        var y=coords[i];
        var xyJson=KineticMap.simpleReTransformCoor(x,y);
        var s="";
        s+=xyJson.x;
        s+=",";
        s+=xyJson.y;
        outline.push(s);
    }
    outline=outline.join(";");
    //根据轮廓计算中心点
    var center = CalcCenter(outline);
    $.ajax({
        type: "post",
        url: authorityHost+"visualarea/SaveAreaInfo",
        data: {
            Latitude: center.y,
            Longitude: center.x,
            Outline: outline,
            AreaId: Common.getQueryString("id")
        },
        dataType: "JSON",
        success: function (data) {
            drawState=false;
            view.children[0].off("click",draw1);
            $(document).unbind("contextmenu",defaultRightClick);
            coords=[];
            if (data.result) {
                $("#saveResult").html("保存成功");
                setTimeout('$("#saveResult").html("")', 1000);
            }
            else {
                $("#errorResult").html("保存失败");
                setTimeout('$("#errorResult").html("")', 2000);
            }
        },
        error: function (err) {
        },
        complete: function () {
        }
    });
}
//清除轮廓
function clearOutline() {
    view.children[0].off("click",draw1);
    view.children[0].removeGraph("outline");
    drawState=false;
    $(document).unbind("contextmenu",defaultRightClick);
    coords=[];
}

//开始绘制轮廓
var tempObj=null;
var drawState=false;
function drawing(){
    var lineProp = {
        typeName: "line",
        shapeProp: {
            id: "outline",
            name: "",
            points: coords, //坐标为x1,y1,x2,y2…依次往下排
            closed: true, //是否闭合
            stroke: "red",
            fill:"red", //当线闭合时候，有效
            opacity:0.3, //同上
            draggable: false
        }
    }
    tempObj= scene.GraphFactory.create(lineProp, view, view.children[0]);
    view.children[0].draw();
}
function startDrawOutline() {
    if(!drawState){
        clearOutline();
        drawState=true;
        view.children[0].on("click",draw1);
        //阻止默认右击事件
        $(document).bind("contextmenu",defaultRightClick);
        $(document).bind("mousedown",function(e){
            //画图完成事件
            if(e.button ==2){
                e.stopPropagation();
                view.children[0].off("click",draw1);
                view.children[0].removeGraph("outline");
                drawing();
                $(document).unbind("mousedown");
                drawState=false;
            }
        })
    }
}
function draw1(e){
    var t =view.children[0].getAbsoluteTransform();
    t.invert();
    var xyJson=t.point({x:e.evt.x,y:e.evt.y});
    coords.push(xyJson.x);
    coords.push(xyJson.y);
    view.children[0].removeGraph("outline");
    drawing();
}
function defaultRightClick(){
    $(document).unbind("contextmenu",defaultRightClick);
    return false;
}
function GetCurBuildingId()
{
    return GetUrlParam("id");
}