
function drawEnEvent(containerID) {


    option = {

        color: ['#59c4e6', '#5ab1ef', '#d87a80', '#516b91', '#d0648a', '#93b7e3', '#cbb0e3', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        title: {
            text: '设备统计',
            textStyle: {
                fontSize: 12,
            },
            x: 'center'

        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /*    legend: {
                x : 'center',
                y : 'bottom',
                data:['CO浓度高','通风设备故障','防火门故障','水位过高','视频故障','O2浓度低']
            },*/

        calculable: true,
        series: [
            {
                name: '设备统计',
                type: 'pie',
                radius: [10, 60],
                roseType: 'area',
                data: [
                    { value: 20, name: '管道' },
                    { value: 22, name: '火灾' },
                    { value: 20, name: '周界' },
                    { value: 35, name: '视频摄像头' },
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(containerID));
    myChart.setOption(option);
}

function drawSecEvent(containerID) {


    option = {

        color: ['#59c4e6', '#5ab1ef', '#d87a80', '#516b91', '#d0648a', '#93b7e3', '#cbb0e3', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        title: {
            text: '设备状态统计',
            textStyle: {
                fontSize: 12,
            },
            x: 'center'

        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /*    legend: {
                x : 'center',
                y : 'bottom',
                data:['CO浓度高','通风设备故障','防火门故障','水位过高','视频故障','O2浓度低']
            },*/

        calculable: true,
        series: [
            {
                name: '设备状态统计',
                type: 'pie',
                radius: [10, 60],
                roseType: 'area',
                data: [
                    { value: 30, name: '正常' },
                    { value: 28, name: '已过期' },
                    { value: 29, name: '即将过期' },
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(containerID));
    myChart.setOption(option);
}

