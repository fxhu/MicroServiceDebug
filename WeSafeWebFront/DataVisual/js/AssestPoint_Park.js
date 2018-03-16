var map;
var dvHelper = null;
var batchAccessMNG=null;
$(function () {
    batchAccessMNG=new BatchAccessMNG();
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.shiftKey && e.altKey)
        {
            batchAccessMNG.show();
        }
        
    });

    dvHelper = new DVHelper();
    //查询区域信息
    dvHelper.QueryAreaInfo(GetUrlParam("id"), function (areaInfo) {
        
        //1 加载百度地图
        map = new BMap.Map("allmap", { enableMapClick: false });
        map.enableScrollWheelZoom(true);
        map.setMapStyle({ style: 'bluish' });
        //2 定位
        var scaleLevel = dvHelper.GetScaleLevel();
        if (scaleLevel == dvHelper.Default.ScaleLevel_OutDoor) {
            scaleLevel = 19;
        }
        var center = dvHelper.GetCenter();
        map.centerAndZoom(new BMap.Point(center.x, center.y),scaleLevel);
        dvHelper.DrawBMapLabel(center.x, center.y, areaInfo.name);
        map.addControl(new BMap.MapTypeControl({
            mapTypes: [
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]
        }));

        //3 加载自定义瓦片
        LoadExtPic();
        //4 查询点位
        map.addEventListener("zoomend", function () {
            
            DoQuery(true);
        })
        
        DoQuery(true);
    })
})
//查询
function DoQuery(loadImg) {
    if (loadImg) {

        dvHelper.QueryAssestPoint(GetUrlParam("id"), 0, null, map.getZoom(), LoadAssets);
    }
    else {
        dvHelper.QueryAssestPoint(GetUrlParam("id"), 0, null, map.getZoom());
    }

}
function AddMarker(data) {
    //坐标
    var center = map.getCenter();
    var point = null;
    if (data.x == 0 || data.y == 0) {
        point = new BMap.Point(center.lng, center.lat);
    } else {
        point = new BMap.Point(data.x, data.y);
    }
    //标记
    var marker = new BMap.Marker(point);
    marker.pointId = data.id;
    //图标
    var iconUrl = dvHelper.GetTemplateByName(data.templateName).icon;
    var defaultSize = dvHelper.Default.IconSize_OutDoor;
    var icon = new BMap.Icon(iconUrl, new BMap.Size(defaultSize, defaultSize));
    icon.setImageSize(new BMap.Size(defaultSize, defaultSize));
    marker.setIcon(icon);
    return marker;
}
function ShowLabel(e) {
    var marker = e.target;
    var data = dvHelper.GetAssestPointById(marker.pointId);
    var label = new BMap.Label(data.assestTypeName, {
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
    marker.setLabel(label);
}
function HideLabel(e) {
    var marker = e.target;
    map.removeOverlay(marker.getLabel());

}
function OnMarkerDragend(e) {
    $.ajax({
        type: "post",
        url: authorityHost+"AssestsPoint/UpdateAssestPoint",
        async: true,
        data: {
            id: e.target.pointId,
            Latitude: e.target.getPosition().lat,
            Longitude: e.target.getPosition().lng
        },
        success: function (data) {
            if (data != "OK") {
                alert("保存出错");
            }
        }
    })
}
function LoadAssets(data) {
    map.clearOverlays();
    for (var i = 0; i < data.length; i++) {
        var marker = AddMarker(data[i]);
        marker.addEventListener('mouseover', ShowLabel);
        marker.addEventListener('mouseout', HideLabel);
        marker.addEventListener('click', onAssestPointClick);
        //编辑模式
        marker.enableDragging();
        marker.addEventListener('dragend', OnMarkerDragend)
        map.addOverlay(marker);
    }
}
var currentTarget;
function onAssestPointClick(e) {
    //缓存选中
    if (currentTarget != undefined) {
        currentTarget.setAnimation(null);
    }
    currentTarget = e.target;
    extraMNG.show(e.target.pointId);
    batchAccessMNG.add(e.target.pointId);
}
var extraMNG=new ExtraMNG();