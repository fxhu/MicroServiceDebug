$(function () {
    //1 搜索框事件
    $("#txtSearch").keyup(function () {
        if (delayHolder != null) {
            clearTimeout(delayHolder);
        }
        delayHolder = setTimeout("doSearch()", 500);
    });
    //2 触发一次查询
    doSearch();
    //3 加载地图
    $("#mapIframe").css("height", $(window).height()-10);
    $("#rightPanel").css("height", $(window).height());
    $("#mapIframe").attr("src", "BuildingMap.html?backto="+GetUrlParam("backto")+"&ParkId=" + GetUrlParam("ParkId"));
})
var delayHolder = null;
function doSearch() {
    $("#buildList").load('/visualarea/BuildingListHTML?ParkId=' + GetUrlParam("ParkId") + '&w=' + $("#txtSearch").val(),
        function () {
            $("#buildList li").mouseover(function () {
                $(this).addClass("hh");
            }).mouseout(function () {
                $(this).removeClass("hh");
            }).click(function () {
                $("#buildList li").removeClass("choosed");
                $(this).addClass("choosed");
                //加载详情
                $("#descript").css("display", "none");
                var parkLocate = $(this).attr("lon") + "," + $(this).attr("lat");
                var buildingName = $(this).text();
                $("#descContainer").load('/visualarea/AreaDescription?id=' + $(this).attr("buildingId"), function () {
                    $("#descript").fadeIn();
                    //地图上对应标注获取焦点
                    if (typeof ($("#mapIframe").get(0).contentWindow.Focus) == "function") {
                        $("#mapIframe").get(0).contentWindow.Focus(parkLocate, buildingName);
                    }
                });

            });

        });

}
function OpenInDoor() {
    var buildingId = $("#buildList").find(".choosed").attr("buildingId");
    var backto=GetUrlParam("backto");
    //当前页面没有要求返回
    if(backto==""){backto="desktop";}
    else if(backto=="onemap"){
        backto="back";
    }
    ToIndoorMap(backto,buildingId,"1");
}