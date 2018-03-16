(function () {
    var controllerId = 'app.views.videosurveillance';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', function ($scope, $timeout) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.haveRead = 0;

            vm.allCamera = function () {
                vm.IsImportant = false;
                this.Reload();
            }
            vm.IsImportant = false;
            vm.imPortantAreaCamera = function () {
                vm.IsImportant = true;
                this.Reload();
            }

            //------------------------------------------------//
            vm.NowTableData = [];           
            var video_srvUrl = abp.appPath + "Camera/GetAllCameraByAreaType";      

            vm.Reload = function (str) {         
                var newUrl = video_srvUrl;
                var IsAddSearch = false;
                if (vm.IsImportant)
                {
                    IsAddSearch = true;
                    newUrl = video_srvUrl + "?ImportantArea=1";
                }
                var areaId = vm.areasObj.selectAreaId;
                if (areaId > 0)
                {
                    if (IsAddSearch) {
                        newUrl += "&assetip=" + areaId;
                    }
                    else {
                        newUrl += "?assetip=" + areaId;
                    }
                }
                $('#tb_video').bootstrapTable("refresh", { url: newUrl });
            };
                        
            vm.BindList = function () {
                $('#tb_video').bootstrapTable({
                    data: [],
                    method: 'get',
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）                      
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       //初始化加载第一页，默认第一页
                    pageSize: 8,                       //每页的记录行数（*）
                    pageList: Common.PageList,        //可供选择的每页的行数（*）                    
                    strictSearch: false,
                    showHeader:false,                    
                    idField: "Id",
                    rowStyle: function (row, index) {                       
                        return {
                            classes: "col-md-3",
                            css: {
                                "height": "260px"
                            }
                        };
                    },
                    onLoadSuccess: function (data) {
                        $timeout(function () {
                            $("#tb_video").find("canvas").each(function (idx, item) {
                                var url = $(this).attr("val");
                                var player1 = new JSMpeg.Player(url, { canvas: this });
                            });
                        });                        
                    },
                    columns: [{
                        field: 'cameraName',
                        align: "center",                        
                        title: '摄像头名称',                        
                        formatter: function (val, row) {
                            var html = "<canvas style=\"width: 100%;height: 100%\" val=\"" + row.serverAdress+"\"></canvas>";
                            html += "<p class=\"text-center\" style=\"font-size:16px;\">" + val + "</p>";
                            return html;
                        }
                    }]
                });
            }

            var IsImportant = getURLParam('IsImportant');
            if (IsImportant != "" && IsImportant != null) {
                vm.IsImportant = true;
            }
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }

            
            $timeout(function () {   
                vm.BindList();
                //解析当前url，查看是否有参数是重点还是非重点
                
                vm.areasObj = new LocalAreaDropDown("videoSurv_", vm.Reload);
                vm.areasObj.init();
            });
         
        }
    ]);
})();