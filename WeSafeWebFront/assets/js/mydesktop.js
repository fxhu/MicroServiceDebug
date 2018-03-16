function playVideo() {
 
    var url = 'ws://172.16.99.40:8082/';
    //var canvas1 = document.getElementById('video1');
    //var player1 = new JSMpeg.Player(url + "?1", { canvas: canvas1 });

    //var canvas2 = document.getElementById('video2');
    //var player2 = new JSMpeg.Player(url + "?2", { canvas: canvas2 });

    //var canvas3 = document.getElementById('video3');
    //var player3 = new JSMpeg.Player(url + "?1", { canvas: canvas3 });

    //var canvas4 = document.getElementById('video4');
    //var player4 = new JSMpeg.Player(url + "?2", { canvas: canvas4 });

    //var canvas5 = document.getElementById('video5');
    //var player5 = new JSMpeg.Player(url + "?1", { canvas: canvas5 });

    //var canvas6 = document.getElementById('video6');
    //var player6 = new JSMpeg.Player(url + "?2", { canvas: canvas6 });

    //var canvas7 = document.getElementById('video7');
    //var player7 = new JSMpeg.Player(url + "?2", { canvas: canvas7 });

    //var canvas8 = document.getElementById('video8');
    //var player8 = new JSMpeg.Player(url + "?1", { canvas: canvas8 });
};

function CarouselVideo() {
     
    $('#carousel-videos').carousel();
};

function RealTimeTestContainer() {
    var dom = document.getElementById("pingcecontainer");
    var myChart = echarts.init(dom);
    var app = {};
    app.title = '实时评测';


    $.get(abp.appPath +'Data/data.json',
        function (data) {

            var points = [].concat.apply([],
                data.map(function (track) {
                    return track.map(function (seg) {
                        return seg.coord.concat([1]);
                    });
                }));
            myChart.setOption(option = {
                animation: false,
                bmap: {
                    center: [120.13066322374, 30.240018034923],
                    zoom: 14,
                    roam: true
                },
                visualMap: {
                    show: false,
                    top: 'top',
                    min: 0,
                    max: 5,
                    seriesIndex: 0,
                    calculable: true,
                    inRange: {
                        color: ['blue', 'blue', 'green', 'yellow', 'red']
                    }
                },
                series: [
                    {
                        type: 'heatmap',
                        coordinateSystem: 'bmap',
                        data: points,
                        pointSize: 5,
                        blurSize: 6
                    }
                ]
            });
            if (!app.inNode) {
                // 添加百度地图插件
                var bmap = myChart.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
            }
        });

}
$(".checkDetails>.toggleParks").click(function(){
    $(".dropDownMenu>.selectMenu").toggle("fast");
    
})