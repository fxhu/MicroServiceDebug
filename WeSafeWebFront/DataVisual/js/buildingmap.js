var tubiaojson;
var currentAreaId;
var currentTarget = undefined; //当前选中标记
var normalIcons = {};
var warningIcon = {};
$.ajax({
    type: "get",
    url: 'VisualTemplate.json',
    async: false,
    success: function (data) {
        //初始化assetType;
        tubiaojson = eval(data);
        //初始化图标
        initIcons();
    }
})
//初始化所有正常图标
function initIcons() {
    $.each(tubiaojson, function (i, n) {
        var tubiaourl = "/dataVisual/" + n.icon;
        var tubiao = new BMap.Icon(tubiaourl, new BMap.Size(32, 32));
        tubiao.setImageSize(new BMap.Size(16, 16));
        normalIcons[n.name] = tubiao;
    }
    )
}

function getTubiaoByName(name) {
    for (var i = 0; i < tubiaojson.length; i++) {
        if (tubiaojson[i].name == name) {
            return tubiaojson[i];
        }
    }
}
// 创建信息窗口对象
var opts = {
    width: 200,     // 信息窗口宽度
    height: 100,     // 信息窗口高度
};
var infoWindow = new BMap.InfoWindow(opts);
function LoadAssets(areaId) {
    currentAreaId = areaId
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: true,
        data: {
            AreaId: currentAreaId,
            AssestType: "all",
            Layer: map.getZoom()
        },
        success: function (data) {
            var point;
            map.clearOverlays();
            for (var i = 0; i < data.length; i++) {
                if (data[i].x == 0 && data[i].y == 0) {
                    point = new BMap.Point(114.402755, 30.453669);
                } else {
                    point = new BMap.Point(data[i].x, data[i].y);
                }
                cc = new BMap.Icon("images/park.png", new BMap.Size(128, 128));
                var marker = new BMap.Marker(point, {
                    title: data[i].assestTypeName
                });
                // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
                marker.setIcon(normalIcons[data[i].templateName]);
                marker.setShadow(null);
                marker.asset = data[i];
                marker.assetType = getTubiaoByName(data[i].templateName);
                map.addOverlay(marker);
                assets.push(marker);
                marker.addEventListener('click', showAccessDetails);
            }
            setTimeout("refreshAll()", 3000);
        }
    });

}
var refreshTimer = null;
function refreshAll() {
    if (refreshTimer != null) {
        clearTimeout(refreshTimer);
    }
    reloadAsset(function () {
        if (refreshTimer != null) {
            clearTimeout(refreshTimer);
        }
        RenewData();
        if (refreshTimer != null) {
            clearTimeout(refreshTimer);
        }
        refreshTimer = setTimeout("refreshAll()", 5000);
    });
}
function reloadAsset(callback) {
    $.ajax({
        type: "post",
        url: authorityHost+"VisualAssests/QueryVisualAssests",
        async: true,
        data: {
            AreaId: currentAreaId,
            AssestType: "all",
            Layer: map.getZoom()

        },
        success: function (data) {
            var tubiaourl;
            var tubiao;
            //所有图标复原
            for (var i = 0; i < assets.length; i++) {
                assets[i].setIcon(normalIcons[assets[i].assetType.name]);
                assets[i].setAnimation(null);
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].state != 0 && data[i].state != null && data[i].state != undefined) {
                    if (data[i].state == 1) {
                        tubiaourl = "/dataVisual/" + getTubiaoByName(data[i].templateName).icon_broken;
                        tubiao = new BMap.Icon(tubiaourl, new BMap.Size(32, 32));
                    }
                    if (data[i].state == 2) {
                        tubiaourl = "/dataVisual/" + getTubiaoByName(data[i].templateName).icon_warn;
                        tubiao = new BMap.Icon(tubiaourl, new BMap.Size(32, 32));
                    }
                    tubiao.setImageSize(new BMap.Size(32, 32));
                    for (var j = 0; j < assets.length; j++) {
                        if (assets[j].asset.id == data[i].id) {
                            tubiao.setImageSize(new BMap.Size(32, 32));
                            assets[j].setIcon(tubiao);
                            assets[j].setAnimation(BMAP_ANIMATION_BOUNCE);
                            assets[j].asset = data[i];
                            assets[j].assetType = getTubiaoByName(data[i].templateName);
                        }
                    }
                }
            }

            if (callback != null && typeof (callback) == "function") {
                callback();
            }

        }
    })

}
function showAccessDetails(e) {
    if (currentTarget != undefined) {
        currentTarget.setAnimation(null);
    }
    currentTarget = e.target;
    infoWindow.setContent(SynaxText(currentTarget.assetType.popWindow.content, currentTarget.asset));
    map.openInfoWindow(infoWindow, currentTarget.getPosition());
    var infoWindowDom = $(".BMap_bubble_content")[0];
    SetAutoRefresh(infoWindowDom, currentTarget.assetType.popWindow.content, currentTarget.asset.id);
    currentTarget.setAnimation(BMAP_ANIMATION_DROP);
    //执行afterClick方法
    var afterClick = currentTarget.assetType.afterClick;
    if (!(afterClick == undefined || afterClick == '' || afterClick == null)) {
        afterClick = SynaxText(afterClick, currentTarget.asset);
        try {
            eval(afterClick);
        } catch (e) {
            console.log(e)
        }
    }
    //修改面板panel
    console.log(currentTarget.asset.assestTypeName);
    $("#details_panel_table").html(SynaxText(currentTarget.assetType.description, currentTarget.asset));
    $('#assestDesc').fadeIn();
    SetAutoRefresh($("#details_panel_table"), currentTarget.assetType.description, currentTarget.asset.id);
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
            var val = GetExtAttrValue(assest, result[i].substring(2, result[i].length - 1));
            source = source.replace(attrReg, val);
        }
    }
    return source;
}
//实时数据刷新
function RenewData() {
    $(".auto-refresh").each(function () {
        var cur = $(this);
        if (!cur.is(":hidden")) {
            cur.html(SynaxText(cur.attr("ref-content"), GetAssestById(cur.attr("ref-assestid"))));
        }
    })
}
function GetAssestById(id) {
    for (var i = 0; i < assets.length; i++) {
        if (assets[i].asset.id == id) {
            return assets[i].asset;
        }
    }
}
var assets = []; //百度地图资产图标
var map;
var dvHelper = null;
var areaDropDown=null;
$(function () {
    //区域切换下拉框
    areaDropDown=new AreaDropDown(".topleft");
    areaDropDown.init(function(areaId){
       window.location.href= getAreaViewUrl(areaId);
    },GetUrlParam("ParkId"))
    //右侧统计信息下拉框
    new AreaStatMNG().init(GetUrlParam("ParkId"));
    dvHelper = new DVHelper();
    //查询区域信息
    dvHelper.QueryAreaInfo(GetUrlParam("ParkId"), function (areaInfo) {
        //1 加载百度地图
        map = new BMap.Map("allmap", { enableMapClick: false, mapType: BMAP_SATELLITE_MAP });
        map.enableScrollWheelZoom(true);
        map.setMapStyle({ style: 'bluish' });
        //2 定位
        var center = dvHelper.GetCenter();
        var defaultLevel = dvHelper.GetScaleLevel();
        if (defaultLevel == dvHelper.Default.ScaleLevel_OutDoor) {
            defaultLevel = 19;
        }
        map.centerAndZoom(new BMap.Point(center.x, center.y), defaultLevel);
        map.addControl(new BMap.MapTypeControl({
            offset: new BMap.Size(440, 20)
        }));
        //3 加载自定义瓦片
        LoadExtPic();
        $.getJSON(authorityHost+"visualarea/AreaList?ParentId=" + areaInfo.id, function (data) {
            //4 显示热力图数据
            //ShowHeatMap(data);
            for (var i = 0; i < data.length; i++) {
                //建筑轮廓
                drawOutline(data[i]);
                //建筑标记
                ShowLabel(data[i].longitude, data[i].latitude, data[i].name, data[i].id);
            }
            //加载资产
            LoadAssets(Common.getQueryString("ParkId"));

        })

        //4 查询点位
        map.addEventListener("zoomend", function () {
            assets = [];
            LoadAssets(Common.getQueryString("ParkId"));

        })
        //5 加载地图切换组件
        if(areaInfo.mapType=="3D"){
            new MapTypeSwitch(".topleft3").init("2D");
        }
    })
    //热力图按钮切换事件绑定
    $("#btnSwitchHeat").click(function () {
        //开启状态
        if ($(this).hasClass("btn-success")) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-default");
            $(this).html("显示热力图");
            HideHeatMap();
        }
        else {
            $(this).removeClass("btn-default");
            $(this).addClass("btn-success");
            $(this).html("隐藏热力图");
            ShowHeatMap();
        }
    })
})
function drawOutline(data) {
    if (data.outline) {
        var points = [];
        var allPoints = data.outline.split(";");
        for (var i = 0; i < allPoints.length; i++) {
            points.push(new BMap.Point(allPoints[i].split(",")[0], allPoints[i].split(",")[1]));
        }
        var building = new BMap.Polygon(points, styleOptions);   //创建多边形
        building.addEventListener("click", function () {
            jumpToFengMap(data.id);
        });
        building.addEventListener("mouseover", function (obj) {
            obj.target.setFillColor(hoverStyle.fillColor);
        })
        building.addEventListener("mouseout", function (obj) {
            obj.target.setFillColor(styleOptions.fillColor);
        })
        building.disableMassClear();
        map.addOverlay(building);   //增加多边形
    }
}
function Focus(position, name) {
    //定位到指定地点
    var lng = position.split(",")[0];
    var lat = position.split(",")[1];
    map.panTo(new BMap.Point(lng, lat));
    //打开信息窗口
    showPopup(new BMap.Point(lng, lat), name);
}
function ShowLabel(x, y, name, buildingId) {
    var label = new BMap.Label(name, { position: new BMap.Point(x, y), offset: new BMap.Size(0, -10) });
    label.setStyle({
        color: "black",
        backgroundColor: "white",
        maxWidth: "300px",
        padding: "5px",
        border: "solid 2px green",
        borderRadius: "5px",
        boxShadow: "#222 1px 1px 1px"
    });
    label.disableMassClear();
    label.addEventListener("click", function () {
        jumpToFengMap(buildingId);
    });
    map.addOverlay(label);
}
var lastMarker;
function showPopup(position, name) {
    if (lastMarker != null) {
        map.removeOverlay(lastMarker);
    }
    //添加点
    lastMarker = new BMap.Marker(position); // 创建点
    map.addOverlay(lastMarker);
    lastMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
    lastMarker.setAnimation(null);
}

//跳转到蜂鸟地图
function jumpToFengMap(id) {
    new AreaStatMNG().init(id);
}

function HideHeatMap() {
    if (heatmapOverlay != null) {
        heatmapOverlay.hide();
    }
}

var heatmapOverlay;
function ShowHeatMap(data) {
    //异步获取
    if (data != null) {
        DrawHeatMapByData(data);
    }
    else {
        $.get(authorityHost+"visualarea/AreaList?ParentId=" + Common.getQueryString("ParkId"), function (data) {
            DrawHeatMapByData(data);
        })
    }
}
function DrawHeatMapByData(data) {
    if (heatmapOverlay == null) {
        heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 50 });
        map.addOverlay(heatmapOverlay);
    }
    var points = [];
    for (var i = 0; i < data.length; i++) {
        points.push(
            {
                lng: data[i].longitude,
                lat: data[i].latitude,
                count: GetExtAttrValue(data[i], "_heatMapNum")
            })
    }
    heatmapOverlay.setDataSet({ data: points, max: 100 });
    heatmapOverlay.show();
}
//隐藏右下角面板
function hidePanel() {
    $('#assestDesc').fadeOut();
}