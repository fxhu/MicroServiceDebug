﻿//<reference path="oidc-client.js" />  
//var authorityHost = "http://local host:5000/";
//var jsClientHost = "http://local host:5003/";
//var apiHost = "http://local host:5011/";
//这个文件已经不再使用
function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("api").addEventListener("click", api, false);
document.getElementById("logout").addEventListener("click", logout, false);

var config = {
    authority: authorityHost,
    client_id: "js",
    redirect_uri: jsClientHost + "callback.html",
    response_type: "id_token token",
    scope: "openid api1",
    post_logout_redirect_uri: jsClientHost + "index.html",
};
var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function (user) {
    if (user) {
        log("User logged in", user.profile);
    }
    else {
        log("User not logged in");
    }
});

function login() {
    debugger;
    mgr.signinRedirect();
}

function api() {
    mgr.getUser().then(function (user) {
        var url = authorityHost + "identity";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function logout() {
    mgr.signoutRedirect();
}