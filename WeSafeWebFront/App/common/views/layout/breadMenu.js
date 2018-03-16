(function () {
    appModule.controller('common.views.layout.breadMenu', [
        '$scope',
        function ($scope) {

            var vm = this;
            //面包屑功能
            var storage = window.sessionStorage;
            vm.bMenu = wtwebsafeglobalbread;
            if (storage.getItem("menuTitle")) {
                if (eval(storage.getItem("menuTitle")).length) {
                    console.log(eval(storage.getItem("menuTitle"))[1]);
                    for (var i = 0; i < eval(storage.getItem("menuTitle")).length; i++) {
                        wtwebsafeglobalbread.push(eval(storage.getItem("menuTitle"))[i]);
                    }
                }
            }
        }

    ]);
})();