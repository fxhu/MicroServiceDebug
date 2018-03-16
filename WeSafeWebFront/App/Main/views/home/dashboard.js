(function () {

    angular.module('app').controller('app.views.dashboard', [
        '$scope', function ($scope) {

            var vm = this;
            $scope.parks = [];
            $scope.$watch('selectedName',  function(newValue, oldValue) {
                console.log(newValue);
                if (newValue) {
                    getDeskInfoByUrl(abp.appPath+"AreaInfomation/GetDeskReportInfoByIdAndType?areaId="+newValue+"&level=zoon");
                }

            });
          $.get(abp.appPath+"AreaInfomation/GetTopOrganizationInfo",function(data){
                if(data.result.placeInfo != null && data.result.placeInfo.length > 0){
                    var itemSelecte = 0;
                    $("#compangId").html(data.result.placeInfo[itemSelecte].displayName);

                    getDeskInfoByUrl(abp.appPath + "AreaInfomation/GetDeskReportInfoByCompanyId?areaId="+ data.result.placeInfo[itemSelecte].id);
                    if(data.result.placeInfo[itemSelecte].childPlace != null && data.result.placeInfo[itemSelecte].childPlace.length > 0){

                        for(var j = 0 ; j < data.result.placeInfo[itemSelecte].childPlace.length ; j ++ ){
                            var temp = {
                                "id": data.result.placeInfo[itemSelecte].childPlace[j].id,
                                "text":data.result.placeInfo[itemSelecte].childPlace[j].displayName
                            };
                            $scope.parks.push(temp);
                        }

                    }

                }
            });
        }
    ]);
})();