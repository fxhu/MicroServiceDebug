var $imgs = [
    { area: '创业街园区', txt: '创业街园区，点击跳转至场景' },
    { area: '关南园区', txt: '关南园区，点击跳转至场景' },
    { area: '理工光科科技园', txt: '理工光科科技园，点击跳转至场景' },
    { area: '光迅科技园', txt: '光迅科技园，点击跳转至场景' },
    { area: '虹信通信科技园', txt: '虹信通信科技园，点击跳转至场景' }
];

var myParkChart;
var myEquipmentReport;
$("#mainmap").resize(function () {
    myParkChart.resize();
});
$("#equipmentReport").resize(function () {
    myEquipmentReport.resize();
});

function getDeskInfoByUrl(url){
    var options={
        title:"nihao"
    };
    var  equipmentReportChart = echarts.init(document.getElementById('equipmentReport'));
    var  inspectionReportChart = echarts.init(document.getElementById('inspectionReport'));
    var  hiddenTroubleReportChart = echarts.init(document.getElementById('hiddenTroubleReport'));
    var  alarmReportChart = echarts.init(document.getElementById('alarmReport'));


    //url = abp.appPath + "AreaInfomation/GetDeskReportInfoByCompanyId?areaId=78";
    $.getJSON(url, function (data) {
        if(data == null){
            abp.message.info('数据不存在', '系统提醒');
            return ;
        }
        var equipmentOption={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                data: []
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        };
        var alarmOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                data: []
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    //data:[
                    //    {value:335, name:'直接访问'},
                    //    {value:310, name:'邮件营销'},
                    //    {value:234, name:'联盟广告'},
                    //    {value:135, name:'视频广告'},
                    //    {value:1548, name:'搜索引擎'}
                    //],
                    data: []
                }
            ]
        };
        var inspectionOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                data: []
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [],

                }
            ]
        };
        var hiddenTroubleOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                data: []
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    //data:[
                    //    {value:335, name:'直接访问'},
                    //    {value:310, name:'邮件营销'},
                    //    {value:234, name:'联盟广告'},
                    //    {value:135, name:'视频广告'},
                    //    {value:1548, name:'搜索引擎'}
                    //],
                    data: []
                }
            ]
        };


        var arr0 = data.deviceReport.items;
        for (let i = 0; i < arr0.length; i++){
            var dtext = DeviceType.GetDeviceTypeTxt(arr0[i].name);
            equipmentOption.legend.data.push(dtext);
            equipmentOption.series[0].data.push({ name: dtext, value: arr0[i].value });

        }


        var arr1 = data.patrolReport.items;
        for (let i = 0; i < arr1.length; i++) {
            var ptext = PatrolType.GetPatrolTypeTxt(arr1[i].name);
            inspectionOption.legend.data.push(ptext);
            inspectionOption.series[0].data.push({ name: ptext, value: arr1[i].value })
        };




        var arr2 = data.hiddenDangerReport.items;
        for (let i = 0; i < arr2.length; i++) {
            var htext = HiddenDanger.GetHiddenDangerTxt(arr2[i].name);
            hiddenTroubleOption.legend.data.push(htext);
            hiddenTroubleOption.series[0].data.push({ name: htext, value: arr2[i].value });
        };



        var arr3 = data.warningReport.items;
        for (let i = 0; i < arr3.length; i++) {
            var wtext = AlarmType.GetAlarmTypeTxt(arr3[i].name);
            alarmOption.legend.data.push(wtext);
            alarmOption.series[0].data.push({ name: wtext, value: arr3[i].value });
        };


        //渲染四个任务数量
        $('.inspectionTask>div').text(data.patrolTaskCount);
        $('.repairTask>div').text(data.repairTaskCount);
        $('.maintenanceTask>div').text(data.secuirtyTaskCount);
        $('.detectionTask>div').text(data.checkTaskCount);

        drawRing(equipmentReportChart, equipmentOption.legend.data, equipmentOption.series[0].data, options);
        drawRing(inspectionReportChart, inspectionOption.legend.data, inspectionOption.series[0].data,options);
        drawRing(hiddenTroubleReportChart, hiddenTroubleOption.legend.data, hiddenTroubleOption.series[0].data,options);
        drawRing(alarmReportChart, alarmOption.legend.data, alarmOption.series[0].data,options);

    });

}


//渲染4个饼图

function drawRing (myChart, legendData, seriesData, options, callback) {
    myChart.clear();
/*    var option = {
        color:['#ef5665','#999999','#f4a869','#56ef56','#ed56ef','#01acfc'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br />{b}: {c} ({d}%)",
            show: false
        },
        legend: {
            orient: 'vertical',
            icon: 'circle',
            itemGap:4,
            itemWidth:6,
            right:'18%',
            top:'center',
            padding: [0, 0, 0, 0],
            textStyle: {
                color: '#999999',
                fontSize: 12
            },
            data: legendData
        },
        series: [{
            name: options.title,
            type: 'pie',
            radius: ['55%', '80%'],
            startAngle: 90,
            selectedMode: 'single',
            minAngle: 10,
            center: ['30%', '50%'],
            legendHoverLink: false,
            hoverAnimation: true,
            avoidLabelOverlap: false,
            itemStyle: {
                normal: {
                    borderColor: '#ffffff',
                    borderWidth: '2'
                }
            },
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'normal'
                    }
                },
                emphasis: {
                    show: true,
                    formatter: function (params) {
                        return  params.percent.toFixed(1) + '%';
                    },
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length: 20,
                    length2: 35,
                    smooth: false,
                    lineStyle: {
                        width: '2',
                        type: 'solid',
                        opacity: 1
                    }
                },
                emphasis: {
                    show: true,
                    lineStyle: {
                        color: 'white'
                    }
                }
            },
            data: seriesData
        }]
    };*/
    var option = {
        series : [
            {
                name: '数据来源',
                type: 'pie',
                radius: ['40%', '50%'],
                data:seriesData,
                itemStyle: {
                    normal:{
                        label:{
                            show:true,
                            fontSize:10,
                            formatter: '{b} : {c} ({d}%)'
                        },
                        labelLine:{
                            show:true
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)']
    };
    myChart.setOption(option);


    //延时器别取消
    setTimeout(function(){
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
        myChart.on("mouseover",function(params){
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        })
        myChart.on("mouseout",function(params){
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        })
    },0)
    window.onresize = myChart.resize;
}

var currentData = [];
//展示园区地图
function ShowParkMap(data) {
    var options = {
        backgroundColor: '#ffffff',
        title: {
            text: '',
            subtext: '',
            sublink: '',
            left: 'center',
            textStyle: {
                color: '#010402'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                var $pna = params.name;
                var res = "";
                for (var i = 0; i < $imgs.length; i++) {
                    if ($imgs[i].area == $pna) {
                        break;
                    }
                }
                setTimeout(function () {
                        callback(ticket, res);
                    },
                    15);
            }
        },
        geo: {
            map: '湖北',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#01ACFC',
                    borderColor: '#fff',
                    borderWidth:4
                },
                emphasis: {
                    areaColor: '#00ACFD',
                    borderColor: '#fff',
                    borderWidth: 4
                }
            },
            width: '55%',
            heiht:'55%',
            left: '20%',
            top: '3%',
            //center: [103, 36],
            zoom: 1.0
        },
        series: BuildSeries(data)
    };
    myParkChart = echarts.init(document.getElementById('mainmap'));
    myParkChart.setOption({
        series: [
            {
                type: 'map',
                map: '湖北'
            }
        ]
    });
    myParkChart.on('click',
        function (param) {
            SwitchParkTab(param.data.uuid);
            //window.open("/datavisual/BuildingPanel.html?ParkId=" + param.data.uuid);
        });
    myParkChart.on('legendselectchanged', function (param) {
        var name = "";
        var uuid = 0;
        for (var k = 0, length = currentData.length; k < length; k++) {
            name = currentData[k].name;
            if (name == param.name) {
                uuid = currentData[k].id;
            }
        }
        SwitchParkTab(uuid);
        //window.open("/datavisual/BuildingPanel.html?ParkId=" + uuid);
        //console.log(name);
    });
    myParkChart.setOption(options);
    window.onresize = myParkChart.resize;
}
//切换园区页签
function SwitchParkTab(parkId)
{
    $("[parkid=" + parkId + "]").trigger("click");
}
//展示园区列表
function ShowParkTable(data) {
    var headHtml = [];
    var bodyHtml = [];
    for (var i = 0; i < data.length; i++) {
        //tab标题
        headHtml.push('<li><a href="#Area' + (i + 2) + '" index="' + (i + 2) + '" parkId="' + data[i].id + '" data-toggle="tab" aria-expanded="false">' + data[i].name + '</a></li>');
        //tab内容
        bodyHtml.push('<div class="tab-pane " id="Area' + (i + 2) + '" style="height: 530px;">');
        bodyHtml.push('<iframe style="height: 530px;border: solid 1px #eee; width: 100%; height: 100%; box-shadow: 4px 4px 4px #ccc" frameborder="0"></iframe>');
        bodyHtml.push('</div>')
    }
    $("#myTab").append(headHtml.join(""));
    $("#myTabContent").append(bodyHtml.join(""));

    $('#myTab a').click(function (e) {
        e.preventDefault()
        //加载地图显示

        if (!$("#Area" + $(this).attr("index")).find("iframe").attr("src")) {
            $("#Area" + $(this).attr("index")).find("iframe").attr("src", "/datavisual/BuildingMap.html?ParkId=" + $(this).attr("parkId"));
        }

        $(this).tab('show')
    })
}
function GetExtAttrValue(obj, name) {
    for (var i = 0; i < obj.extAttrs.length; i++) {
        var item = obj.extAttrs[i];
        if (item.name == name) {
            return item.value;
        }
    }
    return "";
}
//拼接得分的html
function GetScoreHtml(score) {
    var html = [];
    for (var i = 0; i < score; i++) {
        html.push('<i class="material-icons" style="color: #fd9701; font - size: 16px !important; ">grade</i>');
    }
    return html.join("");
}
function BuildSeries(data) {
    var series = [];
    var fullData = $(data).map(function () {
        return {
            name: $(this).attr("name"), value: [$(this).attr("longitude"), $(this).attr("latitude"), 100], uuid: $(this).attr("id")
        }
    }).get();
    for (var i = 0; i < data.length; i++) {
        var obj = {
            name: data[i].name,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: fullData,
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#59d4d4'
                }
            }
        };
        series.push(obj);
    }
    series.push({
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: fullData,
        symbolSize: function (val) {
            return val[2] / 10;
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#fd9701',
                shadowBlur: 10,
                shadowColor: '#ffffff'
            }
        },
        zlevel: 1
    });
    return series;
}
$.getJSON(abp.appPath +"VisualArea/ParkAreaList", function (data) {
    currentData = data;
    //展示园区地图
    ShowParkMap(data);
    //展示园区列表
    ShowParkTable(data);
});