var internval = 25;
var progressObj = {};
$(document).ready(function () {   
    
    var route = "/ParkList";
    var srvUrl = host + route;
    $.get(srvUrl).done(function (doc) {
        var oCheck = new CheckStatus();
        oCheck.SetParks(doc);
        oCheck.InitMap();
        oCheck.Start();
    });    

    var oAlarm = new Alarm();
    oAlarm.Init();

    var oWork = new Work();
    oWork.Init();

    $('.dowebok').liMarquee({
        direction: 'up',
        scrollamount: 20
    });       
});

var CheckStatus = function () {
    var oCheck = new Object();
    var Internal = 5000;
    var myChart;
    var convertedData;
    var mapData;
    var convertData = [];
    var timer;
    var checkNum = 0;
    oCheck.SetParks = function (data) {
        mapData = data;

        $.each(mapData, function (idx, item) {
            var devmin = 100;
            var devmax = 200;
            var devNum = parseInt(Math.random() * (devmax - devmin + 1) + devmin, 10);
            var workMin = 10;
            var workMax = 20;
            var workNum = parseInt(Math.random() * (workMax - workMin + 1) + workMin, 10);
            convertData.push({
                id: item.id,
                name: item.name,
                address: item.address,
                dev: devNum + "/" + workNum,
                work: 12,
                deviceNum: devNum,
                alarmNum: parseInt(Math.random() * (15 - 5 + 1) + 5, 10),
                value: [item.longitude, item.latitude, parseInt(Math.random() * (100 - 90 + 1) + 90, 10)]
            });
        });
    };
    oCheck.InitMap = function () {
        var dom = document.getElementById("container");
        myChart = echarts.init(dom);
        var option = {
            //  backgroundColor: '#404a59',
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',

            geo: {
                type: "map",
                roam: true,
                map: 'china',
                top: '1%',
                left: '2%',
                center: [95.98561551896913, 38.205000490896193],//地图中心点位置
                zoom: 1,//地图缩放比
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: '#afadad'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: 'lightskyblue',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (item) {
                    if (!item) return "";
                    if (item.componentType == "series") {
                        var html = item.name + "(" + item.value[2] + ")" + "<br />工作任务：" + item.data.work + "<br />资产数量：" + item.data.deviceNum + "<br />报警数量：" + item.data.alarmNum;
                        return html;
                    }
                }
            },
            grid: {
                right: 40,
                top: 100,
                bottom: 40,
                width: '20%'
            },
            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitLine: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
            },
            yAxis: {
                type: 'category',
                name: '',
                nameGap: 16,
                axisLine: { show: false, lineStyle: { color: '#ddd' } },
                axisTick: { show: false, lineStyle: { color: '#ddd' } },
                axisLabel: { interval: 0, textStyle: { color: '#ddd' } },
                data: []
            },
            series: [
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData,
                    symbolSize: function (val) {
                        return 10;
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            textStyle: {
                                fontSize: '20'
                            },
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F44336',
                            shadowBlur: 10,
                            textStyle: {
                                fontSize: 30
                            },
                            shadowColor: '#333'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);

        myChart.on('click', function (params, a, b, c) {
            //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
        });
    }
    oCheck.Start = function () {
        SetChecking();

        //设置园区检查状态
        function SetChecking(score) {
            if (score == undefined) score = 100;
            var otherItem = [];//未被选中评估的数据点
            var thisItem;//正在进行评估的数据点
            $.each(convertData, function (idx, item) {
                if (idx == checkNum) {
                    thisItem = item;
                }
                else {
                    otherItem.push(item);
                }
            });

            var data = [
                {
                    name: thisItem.name + "评估中...",
                    value: thisItem.value,
                    symbolSize: 20,
                    showEffectOn: 'render',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            offset: [10, 0],
                            textStyle: {
                                fontSize: '20'
                            },
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#009688',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    }
                }
            ];
            data = data.concat(otherItem);

            myChart.setOption({
                series: [
                    {
                        name: '检测',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: data,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,

                        markPoint: {
                            symbol: checkNum == 0 ? "pin" : "arrow",
                            symbolSize: [500, 300],
                            label: {
                                normal: {
                                    fontSize: 20,
                                    formatter: [
                                        '{name|名称：' + thisItem.name + '}',
                                        '{address|地址：' + thisItem.address + '}',
                                        '{dev|资产总数/故障：' + thisItem.dev + '}',
                                        '{safeScore|安全评分：' + score + '}',
                                        '{map|三维分布}'
                                    ].join('\n'),
                                    rich: {
                                        name: {
                                            fontSize: 18,
                                            color: "#fff",
                                            align: 'left'
                                        },
                                        address: {
                                            fontSize: 18,
                                            color: "#fff",
                                            padding: [0, 0, 5, 0],
                                            align: 'left'
                                        },
                                        dev: {
                                            fontSize: 18,
                                            color: "#fff",
                                            padding: [0, 0, 5, 0],
                                            align: 'left'
                                        },
                                        safeScore: {
                                            fontSize: 18,
                                            color: "#fff",
                                            padding: [0, 0, 5, 0],
                                            align: 'left'
                                        },
                                        video: {
                                            fontSize: 18,
                                            color: 'rgb(199,86,83)',
                                            padding: [0, 20, 0, 20]
                                        },
                                        map: {
                                            fontSize: 18,
                                            color: 'yellow',
                                            padding: 5
                                        }
                                    }
                                }
                            },
                            data: [
                                {
                                    name: '监测点',
                                    coord: [thisItem.value[0], thisItem.value[1]],
                                    value: thisItem.value[2],
                                    itemStyle: {
                                        normal: {
                                            color: 'rgb(41,60,85)'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            });

            oCheck.SetMarkPoint(thisItem, score);

            //if (score <= 80) {
            //    checkNum++;
            //    if (checkNum == convertData.length) {
            //        checkNum = 0;
            //    }
            //}
            //else {
            //    oCheck.SetMarkPoint(thisItem, score);
            //}

            //checkNum++;
            //if (checkNum == convertData.length) {
            //    checkNum = 0;
            //}
            //timer = setTimeout(function () {
            //    SetChecking();
            //}, Internal);
        }
    };
    //打开指定园区的检查状态
    oCheck.CheckItem = function (itemNum) {
        if (timer) {
            clearTimeout(timer);
        }
        checkNum = itemNum;
        oCheck.Start();
    };
    oCheck.SetMarkPoint = function (item, score) {
        var scoreUpInternal = 2000;//第一次展示时，完全展示好冒泡图形后，再来进行评分计算
        if (score < 100) {
            scoreUpInternal = 500;
        }
        score--;
        if (score <= 80) {
            checkNum++;
            if (checkNum == convertData.length) {
                checkNum = 0;
            }

            oCheck.Start();
            return;
        }
        myChart.setOption({
            series: [
                {
                    markPoint: {
                        label: {
                            normal: {
                                formatter: [
                                    '{name|名称：' + item.name + '}',
                                    '{address|地址：' + item.address + '}',
                                    '{dev|资产总数/故障：' + item.dev + '}',
                                    '{safeScore|安全评分：' + score + '}',
                                    '{map|三维分布}'
                                ].join('\n'),
                                rich: {
                                    name: {
                                        fontSize: 18,
                                        color: "#fff",
                                        align: 'left'
                                    },
                                    address: {
                                        fontSize: 18,
                                        color: "#fff",
                                        padding: [0, 0, 5, 0],
                                        align: 'left'
                                    },
                                    dev: {
                                        fontSize: 18,
                                        color: "#fff",
                                        padding: [0, 0, 5, 0],
                                        align: 'left'
                                    },
                                    safeScore: {
                                        fontSize: 18,
                                        color: "#fff",
                                        padding: [0, 0, 5, 0],
                                        align: 'left'
                                    },
                                    video: {
                                        fontSize: 18,
                                        color: 'rgb(199,86,83)',
                                        padding: [0, 20, 0, 20]
                                    },
                                    map: {
                                        fontSize: 18,
                                        color: 'yellow',
                                        padding: 5
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        });

        setTimeout(function () {
            oCheck.SetMarkPoint(item, score);
        }, scoreUpInternal);
    };
    oCheck.SetFinish = function () {
        // var myOption = myChart.getOption();
        // myOption.series[0].data[0].name = "评估完成";
    };
    return oCheck;
};

var Alarm = function () {
    var oAlarm = new Object();
    oAlarm.Init = function () {
        var data = [
            {
            "name": "理工光科科技园",
            "time": "2017-09-01",
            "type": "设备故障"
        }, {
                "name": "创业街园区",
            "time": "2017-09-02",
            "type": "设备故障"
            }, {
                "name": "创业街园区",
                "time": "2017-09-03",
                "type": "设备故障"
        }, {
            "name": "理工光科科技园",
            "time": "2017-09-04",
            "type": "设备故障"
            }];
        var html = "";
        $.each(data, function (idx, item) {
            html += "<tr>"
                + "<td>" + item.name + "</td>"
                + "<td>" + item.time + "</td>"
                + "<td align=\"center\">" + item.type + "</td>"
                + "</tr >";
        });
        $("#alarmList").html(html);
    };
    return oAlarm;
};

var Work = function () {
    var oWork = new Object();
    oWork.Init = function () {
        var data = [
            {
                "name": "理工光科科技园",
                "work": "9月10日日常巡检",
                "userName": "张一",
                "time": "2017-01-10"
            }, {
                "name": "创业街园区",
                "work": "9月11日日常巡检",
                "userName": "张一",
                "time": "2017-01-11"
            }, {
                "name": "创业街园区",
                "work": "9月12日日常巡检",
                "userName": "张二",
                "time": "2017-01-12"
            }, {
                "name": "理工光科科技园",
                "work": "9月13日日常巡检",
                "userName": "张一",
                "time": "2017-01-13"
            }, {
                "name": "理工光科科技园",
                "work": "9月13日设备检修",
                "userName": "张三",
                "time": "2017-01-13"
            }, {
                "name": "理工光科科技园",
                "work": "9月14日设备检修",
                "userName": "张三",
                "time": "2017-01-14"
            }, {
                "name": "理工光科科技园",
                "work": "9月15日设备检修",
                "userName": "张四",
                "time": "2017-01-15"
            }];
        var html = "";
        $.each(data, function (idx, item) {            
            html += "<tr>"
                + "<td width=\"30%\">" + item.name + "</td>"
                + "<td width=\"35%\">" + item.work + "</td>"
                + "<td width=\"12%\" align=\"center\">" + item.userName + "</td>"
                + "<td width=\"23%\">" + item.time + "</td>"
                + "</tr >";
        });
        $("#worklist").html(html);
    };
    return oWork;
};