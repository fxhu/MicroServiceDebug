//var authorityHost = "http://localhost:5000/";
var tokens = window.localStorage.getItem("applictionToken");
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", tokens);
    }
});