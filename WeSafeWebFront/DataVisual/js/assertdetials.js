var $infopanelforassetdetialpop;

$(function () {    
    $infopanelforassetdetialpop = $("#assetContent");
   // $infopanelforassetdetialpop.draggable({ handle: "#draghandforassetdhead", scroll: false });;
    var left = ($(window).width() - $infopanelforassetdetialpop.width()) / 2;
    $infopanelforassetdetialpop.css("left", left);
});

function LoadAssertDetails(dId) {
    if ($infopanelforassetdetialpop.hasClass("hide")) {

        $infopanelforassetdetialpop.removeClass("hide");
    }
    $("#popIframe").attr("src", "/datavisual/PopAssetInfo.html?id=" + dId);    
}