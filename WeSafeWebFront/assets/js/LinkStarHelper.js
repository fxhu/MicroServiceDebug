var vedioHost = "";
var linkstarHost = "";
function LinkStarViewUrl(urlpart) {
    abp.services.app.webSiteConfigService.getWebSiteVedioHostAddress({}).then(function (result) {
        vedioHost = result;
    });
    abp.services.app.webSiteConfigService.getWebSiteLinkstarHostAddress({}).then(function (result) {
        //var userinfo = GetLinkstarUserInfo();
        //var urlpara = "?id=" + userinfo.result.id + "&name=" + userinfo.result.name + "&role=" + "&eid=";
        var code = GetLinkstarCode();
        var href = window.parent.location.href;
        var noticeid = getURLParam("id", href);
        var urlpara = "?code=" + code.result + "&noticeId=" + noticeid;
        linkstarHost = result;
        var bodyHtml = [];
        bodyHtml.push('<div id="Linkstar" style="height:100%;">');
        bodyHtml.push('<iframe style="height: 100%;border: solid 0px #eee; width: 100%;" frameborder="0" width="100%"  border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>');
        bodyHtml.push('</div>');
        $("#cardContent").append(bodyHtml.join(""));
        if (!$("#Linkstar").find("iframe").attr("src")) {
            $("#Linkstar").find("iframe").attr("src", linkstarHost + urlpart + urlpara);
        }
    });
};
function getURLParam(name, href) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(href) || [, ""])[1].replace('/\+/g', '%20')) || null;

}
function GetLinkstarUserInfo() {
    var userinfo = [];
    $.ajax({
        type: "get",
        dataType: "json",
        url: abp.appPath + 'LinkStarRequest/GetLinkstarUserInfo',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        async: false,
        success: function (data) {
            userinfo = data;
            console.log("零时网络用户身份请求成功");
        },
        error: function () {
            console.log("零时网络用户身份请求失败");
        },
        complete: function () {
            console.log("零时网络用户身份请求完成");
        }
    });
    return userinfo;
}
function GetLinkstarCode() {
    var userinfo = [];
    $.ajax({
        type: "get",
        dataType: "json",
        url: abp.appPath + 'LinkStarRequest/GetLinkstarCode',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", tokens);
        },
        async: false,
        success: function (data) {
            userinfo = data;
        },
        error: function () {

        },
        complete: function () {

        }
    });
    return userinfo;
}
