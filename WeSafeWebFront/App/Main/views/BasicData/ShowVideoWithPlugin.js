(function () {
    appModule.controller('app.views.BasicData.ShowVideoWithPlugin', [
        '$scope', '$uibModalInstance', '$timeout', 'editSource',
        function ($scope, $uibModalInstance, $timeout , editSource) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var itemId = 0;
            function doGo(mrl) {
                //var vlc = document.embeds.vlc;
                itemId = document.embeds.vlc.playlist.add(mrl);
                document.embeds.vlc.playlist.playItem(itemId);
            }
            $timeout(function () {
                doGo(editSource);
            });
            
            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();