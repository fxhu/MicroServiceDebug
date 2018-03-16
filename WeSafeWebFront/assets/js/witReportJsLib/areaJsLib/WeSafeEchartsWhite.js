var EchartsHelper = {
    Hills: {
        blue: {
            img: "image://./../../assets/images/witReportImg/hill_blue.png"

        }
        , green: {
            img: "image://./../../assets/images/witReportImg/hill_green.png"
        }
        , orange: {
            img: "image://./../../assets/images/witReportImg/hill_orange.png"
        }
        , pink: {
            img: "image://./../../assets/images/witReportImg/hill_pink.png"
        }
        , purple: {
            img: "image://./../../assets/images/witReportImg/hill_purple.png"
        }
        , yellow: {
            img: "image://./../../assets/images/witReportImg/hill_yellow.png"
        }
    },
    Bars: {
        red: {//红色
            color: "#ef5665"
        }
        , coffee: {//咖啡色
            color: "#dc751f"
        }
        , grey: {//灰色
            color: "#999999"
        }
    },
    FillLine: {
        red: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.37,
                color: 'rgba(239, 86, 101, 0.69)'
            }, {
                offset: 0.68,
                color: 'rgba(238, 86, 170, 0.41)'
            }, {
                offset: 1,
                color: 'rgba(237, 86, 239, 0.14)'
            }])
        },
        blue: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.37,
                color: 'rgba(24, 165, 245, 0.69)'
            }, {
                offset: 0.68,
                color: 'rgba(131, 126, 242, 0.41)'
            }, {
                offset: 1,
                color: 'rgba(237, 86, 239, 0.14)'
            }])
        },
        yellow: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.37,
                color: 'rgba(227, 178, 6, 0.69)'
            }, {
                offset: 0.68,
                color: 'rgba(232, 132, 123, 0.41)'
            }, {
                offset: 1,
                color: 'rgba(237, 86, 239, 0.14)'
            }])
        },
        grey: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.37,
                color: 'rgba(153, 153, 153, 0.69)'
            }, {
                offset: 0.68,
                color: 'rgba(195, 120, 196, 0.41)'
            }, {
                offset: 1,
                color: 'rgba(237, 86, 239, 0.14)'
            }])
        },
        green: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.37,
                color: 'rgba(86, 239, 86, 0.69)'
            }, {
                offset: 0.68,
                color: 'rgba(162, 163, 163, 0.41)'
            }, {
                offset: 1,
                color: 'rgba(237, 86, 239, 0.14)'
            }])
        }
    },
    Lines: {
        Broken: {
            color: "#EE5665"
        },
        Normal: {
            color: "#0EAAF7"
        },
        Destroy: {
            color: "#999999"
        }
    },
    Task: {
        Overdue: {
            color: "#ef5665"
        },
        NotStart: {
            color: "#f4a869"
        },
        Done: {
            color: "#18a5f5"
        },
        InProgress: {
            color: "#56ef56"
        }
    },
    Colors: {
        WhiteBoder:'#fff',
        BlueBoder:'#012D6C',
        Device: ['#1aa5f5', '#32c5d2', '#EE5665'],
        Alarm: ["#32c5d2", "#2ea1f8", "#ef5665"],//报警颜色序列,
        HiddenDanger: ["#2ea1f8", "#ef5665", "#32c5d2", "#9a5eb6", "#ffa71d", "#67809f", "#0097a7"],//隐患图例颜色
        Patrol: ["#2ea1f8", "#32c5d2", "#f4a869", "#9a5eb6", "#ef5665"],//巡检图例颜色
        Task: ["#ef5665", "#f4a869", "#18a5f5", "#56ef56"]//任务状态图例颜色
    },
    HomeChartLable:
    {
        normal: {
            show: false,
            position: 'outside',
            textStyle: {
                fontSize: '14',
                fontWeight: 'normal'
            }
        },
        emphasis: {
            show: true,
            formatter: function (params) {
                return params.percent.toFixed(1) + '%';
            },
            textStyle: {
                fontSize: '14',
                fontWeight: 'bold',
                // color: 'white'
            }
        }
    },
    drawLine: function (contentId, xData, LinesObj, seriesData, options) {
        var option = {
            title: {
                text: "",
                backgroundColor: '#02a4fd',
                padding: [6, 40],
                borderRadius: [0, 0, 12, 0],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 18,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48,
                }
            },
            color: [LinesObj.color],
            tooltip: {

                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                },
                padding: 1,
                position: function (point, params, dom, rect, size) {
                    return [point[0], '20%'];
                },
                extraCssText: 'height:18%;width:35%;'
            },
            dataZoom: {
                type: 'slider',
                height: 13,
                bottom: 12,
                zoomLock: true,  //只能平移，不能缩放
                handleSize: '100%',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                borderColor: '#02a4fd'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 1
                    }
                },
                axisTick:{
                    alignWithLabel:true
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#333'
                },
                data: xData
            },
            yAxis: [{
                type: 'value',
                scale: true,
                //offset: -12,
                
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 2
                    }
                },

                splitLine: {
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color:'#333',
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(3)) + "%";
                    }
                }
            }],
            series: [
                {
                    name: seriesData.title,
                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 4
                        }
                    },
                    data: seriesData.data
                }
            ]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    },
    drawHillBar: function (contentId, xData, HillsObj, seriesData, options) {
        var option = {
            title: {
                text: options.title,
                backgroundColor: '#02a4fd',
                padding: [6, 40],
                borderRadius: [0, 0, 12, 0],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 18,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48,
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                },
                padding: 1,
                position: function (point, params, dom, rect, size) {
                    return [point[0], '20%'];
                },
                extraCssText: 'height:18%;width:35%;'
            },
            dataZoom: {
                type: 'slider',
                height: 13,
                bottom: 12,
                zoomLock: false,  //只能平移，不能缩放
                handleSize: '100%',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                borderColor: '#02a4fd'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#333'
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                //offset: -12,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                axisLabel: {
                    color: '#333',
                    fontSize: 12,
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(2)) + "%";
                    }
                }
            },
            series: [{
                name: seriesData.title,
                type: 'pictorialBar',
                barCategoryGap: '-20%',
                symbol: HillsObj.img,
                data: seriesData.data
            }]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
            if (typeof legendData == "object") {
                for (var key in legendData) {
                    option.legend[key] = legendData[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    },
    drawTB_HBChart: function (myChart, xData, yearStart, yearEnd, arrTb, arrHb) {
        var option = {
            color: ['#1596de', '#9f1093'],
            legend: {
                data: [yearStart.year, yearEnd.year, '同比', '环比'],
                left: 'center',
                top: 10,
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fffefe',
                    fontSize: 14
                },
            },
            tooltip: {
                trigger: 'axis'
            },
            dataZoom: [
                {
                    type: 'slider',
                    bottom: 13,
                    height: 13,
                    /* zoomLock: true, */ //只能平移，不能缩放
                    handleSize: '100%',
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    borderColor: '#02a4fd'
                }

            ],
            toolbox: {
                show: true
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 16,
                },
                type: 'category',
                boundaryGap: true,
                data: xData
            },
            yAxis: [{
                type: 'value',
                //name: '数量',
                splitLine: {
                    lineStyle: {
                        opacity: 0.2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 2
                    }
                },
                axisLabel: {
                    fontSize: 16,
                    formatter: '{value} '
                }
            }
                ,
            {   //position：y轴的位置，默认 grid 中的第一个 y 轴在 grid 的左侧（'left'），
                //第二个 y 轴视第一个 y 轴的位置放在另一侧
                type: 'value',
                //name: '环比',
                splitLine: { show: false },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 16,
                    formatter: function (value) {
                        var texts = value * 100;
                        return texts + "%";
                    }
                }
            }
            ],
            series: [
                {
                    name: yearStart.year,
                    type: 'bar',
                    data: yearStart.data,
                    barWidth: 20

                },
                {
                    name: yearEnd.year,
                    type: 'bar',
                    data: yearEnd.data,
                    barWidth: 20
                },
                {   //第1个同比的数据
                    name: '同比',
                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 4
                        }
                    },
                    yAxisIndex: 1,
                    data: arrTb
                },
                {   //第二个Y轴的数据
                    name: '环比',
                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 4
                        }
                    },
                    yAxisIndex: 1,
                    data: arrHb
                }
            ]
        };
        myChart.setOption(option);
    },
    drawRing: function (contentId, legendData, seriesData, options, callback) {

       for(var i = 0 ; i < legendData.data.length ; i ++ ){
           legendData.data[i]={
               "name":legendData.data[i],
               "textStyle":{
                   "color":  this.Colors.HiddenDanger[i]
               }
           };

       }
        var option = {
            color: options.Colors,
            title: {
                show: true,
                text: options.title,
                backgroundColor: '#02a4fd',
                padding: [12, 48],
                borderRadius: [0, 0, 12, 0],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 24,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48
                }
            },
            //yAxis: {
            //   offset: -12,
            //},
      
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br />{b}: {c} ({d}%)",
                show: false
            },
            legend: {
                bottom: 0,
                icon: 'circle',
                left: 'center',
                itemWidth: 6,
                padding: [0, 10, 0, 10],
                selectedMode:true,
                textStyle: {
                    color: '#000',
                    fontSize: 14
                },
                data: legendData
            },
            series: {
                name: options.title,
                type: 'pie',
                radius: ['25%', '45%'],
                startAngle: 90,
                selectedMode: 'single',
                minAngle: 10,
                legendHoverLink: false,
                hoverAnimation: true,
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        borderColor: '#fff', 
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
                            return params.percent.toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold',
                            // color: 'white'
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
                            // color: 'white'
                        }
                    }
                },
                data: seriesData
            }
        };
        if (typeof legendData == "object") {
            for (var key in legendData) {
                option.legend[key] = legendData[key];
            }
        }
        if (typeof seriesData == "object") {
            for (var key in seriesData) {
                option.series[key] = seriesData[key];
            }
        }
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
        // myChart.setOption(option_blue);


        var lldata = option.legend.data;

        var slid = RptCommon.InitialSlide(lldata, 0);

        var myinterval = this.GetmyInterval(slid, lldata, myChart);

        myChart.on('mouseover', function (params) {
            clearInterval(myinterval);

            lldata.forEach(function (value, idx) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: idx
                });
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        });
        myChart.on('mouseout', function (params) {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        });



        if (callback) {
            callback(myChart);
        }
    },
    GetmyInterval: function (slid, legendData, myChart) {
        return setInterval(function () {
            var nextitem = RptCommon.getNextIndex(slid);
            legendData.forEach(function (value, idx) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: idx
                });
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: nextitem
            });
        }, 4000);
    },
    drawPie: function (contentId, legendData, colors, seriesData, options, callback) {
       var tempLegend = [];
        for(var i =0 ; i < legendData.length ; i ++){

            tempLegend.push({
                "name":legendData[i],
                "textStyle":{
                    "color": colors[i]
                }
            });

        }
        legendData = tempLegend;
        var option = {
            color: colors,
            legend: {
                type: 'scroll',
                icon: 'circle',// 设置图形为圆。            
                height: '50%',
                orient: 'horizontal',
                itemWidth: 6,
                itemGap: 10,
                bottom: 30,
                left: 'center',
                //padding: 10,
                textStyle: {
                    // color: '#ffffff',
                    fontSize: 12
                },
                data: legendData
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['55%', '40%'],
                    radius: ['0%', '55%'],
                    selectedMode: 'single',
                    minAngle: 10,
                    legendHoverLink: false,
                    hoverAnimation: true,
                    avoidLabelOverlap: true,
                    itemStyle: {
                        //normal: {
                        //    borderColor: '#09202E',
                        //    borderWidth: '5'
                        //}
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'normal'
                            }
                        },
                        emphasis: {
                            show: true,
                            formatter: function (params) {
                                return params.percent.toFixed(1) + '%';
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold',
                                // color: 'white'
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
                                opacity: 1,
                                // color: 'white'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: seriesData
                }
            ]
        };
        var option_white = {
            color: colors,
            legend: {
                type: 'scroll',
                icon: 'circle',// 设置图形为圆。            
                height: '50%',
                orient: 'horizontal',
                itemWidth: 8,
                itemGap: 20,
                bottom: 20,
                left: 'center',
                //padding: 10,
                textStyle: {
                    color: '#333',
                    fontSize: 14
                },
                data: legendData
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['55%', '40%'],
                    radius: ['0%', '55%'],
                    selectedMode: 'single',
                    minAngle: 10,
                    startAngle:45,
                    clockwise:true,                 
                    legendHoverLink: false,
                    hoverAnimation: true,
                    avoidLabelOverlap: true,
                    itemStyle: {
                        normal: {
                           borderColor: '#fff',
                           borderWidth: '2'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'normal'
                            }
                        },
                        emphasis: {
                            show: true,
                            formatter: function (params) {
                                return params.percent.toFixed(1) + '%';
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold',
                                // color: 'white'
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
                                opacity: 1,
                                // color: 'white'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: seriesData
                }
            ]
        };
        var option_blue = {
            color: colors,
            legend: {
                type: 'scroll',
                icon: 'circle',// 设置图形为圆。            
                height: '50%',
                orient: 'horizontal',
                itemWidth: 8,
                itemGap: 20,
                bottom: 20,
                left: 'center',
                //padding: 10,
                textStyle: {
                    color: '#333',
                    fontSize: 14
                },
                data: legendData
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    center: ['55%', '40%'],
                    radius: ['0%', '55%'],
                    selectedMode: 'single',
                    minAngle: 10,
                    startAngle:45,
                    clockwise:true,                 
                    legendHoverLink: false,
                    hoverAnimation: true,
                    avoidLabelOverlap: true,
                    itemStyle: {
                        normal: {
                           borderColor: '#fff',
                           borderWidth: '2'
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'outside',
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'normal'
                            }
                        },
                        emphasis: {
                            show: true,
                            formatter: function (params) {
                                return params.percent.toFixed(1) + '%';
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold',
                                // color: 'white'
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
                                opacity: 1,
                                // color: 'white'
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: seriesData
                }
            ]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        // myChart.setOption(option);
        // myChart.setOption(option_white);
        myChart.setOption(option_blue);
        

        var lldata = option.legend.data;

        myChart.on('mouseover', function (params) {
            lldata.forEach(function (value, idx) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: idx
                });
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        });
        myChart.on('mouseout', function (params) {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        });


        if (callback) {
            callback(myChart);
        }
    },
    drawBar: function (contentId, xData, BarsObj, seriesData, options) {
        var option = {
            title: {
                text: options.title,
                backgroundColor: '#02a4fd',
                borderRadius: [0, 0, 12, 0],
                padding: [6, 40],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 18,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48,
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                }
            },
            dataZoom: {
                type: 'slider',
                height: 13,
                bottom: 12,
                zoomLock: false,  //只能平移，不能缩放
                handleSize: '100%',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                borderColor: '#02a4fd'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#333'
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                //offset: -12,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#333',
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(2)) + "%";
                    }
                }
            },
            series: [{
                name: seriesData.title,
                type: 'bar',
                barWidth: '60%',//调整图中柱子宽度
                data: seriesData.data
            }]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    },
    drawFillLine: function (contentId, xData, ColorsObj, seriesData, options) { 
        var option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                },
                padding: 1,
                position: function (point, params, dom, rect, size) {
                    return [point[0], '20%'];
                },
                extraCssText: 'height:18%;width:35%;'
            },
            dataZoom: [
                {
                    type: 'slider',
                    height: 13,
                    bottom: 12,
                    zoomLock: false,  //只能平移，不能缩放
                    handleSize: '100%',
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    borderColor: '#02a4fd'
                }
            ],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color:'#333',
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                offset: -5,
                axisLine: {
                    lineStyle: {
                        color: '#D8D8D8',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    color:'#333',
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(2)) + "%";
                    }
                }
            },
            series: [{
                name: seriesData.title,
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                lineStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                areaStyle: {
                    normal: {
                        color: ColorsObj.color
                    }
                },
                data: seriesData.data
            }]
        };
        if (options) {
            if (options.title) {
                option.title = {
                    text: options.title,
                    backgroundColor: '#02a4fd',
                    borderRadius: [0, 0, 12, 0],
                    padding: [6, 40],
                    textStyle: {
                        color: '#fafbfc',
                        fontWeight: 'normal',
                        fontFamily: 'MicrosoftYaHei',
                        fontSize: 18,
                        align: 'center',
                        verticalAlign: 'middle',
                        lineHeight: 48,
                    }
                };
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    },
    drawTemp: function (contentId, xData, BarsObj, seriesData, options) {
        var contxtBoxData = [];
        $.each(seriesData.data, function (idx, item) {
            contxtBoxData.push(1 - parseFloat(item));
        });
        var option = {
            title: {
                text: options.title,
                backgroundColor: '#02a4fd',
                borderRadius: [0, 0, 12, 0],
                padding: [6, 40],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 18,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48,
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                },
                padding: 1,
                position: function (point, params, dom, rect, size) {
                    return [point[0], '20%'];
                },
                extraCssText: 'height:18%;width:35%;'
            },
            dataZoom: {
                type: 'slider',
                height: 13,
                bottom: 12,
                zoomLock: false,  //只能平移，不能缩放
                handleSize: '100%',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                borderColor: '#02a4fd'
            },
            color: [BarsObj.color],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 12,
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                min: 0,
                offset: -8,
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        opacity: 0.2
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(2)) + "%";
                    }
                }
            },
            series: [{
                name: seriesData.title,
                type: 'bar',
                stack: 'sum',
                barWidth: '20%',//调整图中柱子宽度
                barCategoryGap: '50%',
                itemStyle: {
                    normal: {
                        shadowBlur: 7,
                        shadowColor: BarsObj.color,
                        barBorderColor: BarsObj.color,
                        barBorderWidth: 2
                    }
                },
                data: seriesData.data
            },
            {
                name: seriesData.title,
                type: 'bar',
                barWidth: '20%',//调整图中柱子宽度
                stack: 'sum',
                itemStyle: {
                    normal: {
                        color: '#09202e',
                        shadowBlur: 7,
                        shadowColor: BarsObj.color,
                        barBorderColor: BarsObj.color,
                        barBorderWidth: 2
                    }
                },
                data: contxtBoxData
            }
            ]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    },
    drawEmptyBar: function (contentId, xData, BarsObj, seriesData, options) {
        var option = {
            title: {
                text: options.title,
                backgroundColor: '#02a4fd',
                borderRadius: [0, 0, 12, 0],
                padding: [6, 40],
                textStyle: {
                    color: '#fafbfc',
                    fontWeight: 'normal',
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 18,
                    align: 'center',
                    verticalAlign: 'middle',
                    lineHeight: 48,
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                },
                padding: 1,
                position: function (point, params, dom, rect, size) {
                    return [point[0], '20%'];
                },
                extraCssText: 'height:18%;width:35%;'
            },
            dataZoom: {
                type: 'slider',
                height: 13,
                bottom: 12,
                zoomLock: false,  //只能平移，不能缩放
                handleSize: '100%',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                borderColor: '#02a4fd'
            },
            color: [BarsObj.color],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 1
                    }
                },
                axisLabel: {
                    fontSize: 12,
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                min: 0,
                //offset: -12,
                axisLine: {
                    lineStyle: {
                        color: '#eff4fb',
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        opacity: 0.2
                    }
                },
                axisLabel: {
                    fontSize: 12,
                    formatter: function (value, index) {
                        return parseFloat((value * 100).toFixed(2)) + "%";
                    }
                }
            },
            series: [
                {
                    name: seriesData.title,
                    type: 'bar',
                    barWidth: '20%',//调整图中柱子宽度
                    itemStyle: {
                        normal: {
                            color: '#09202e',
                            shadowBlur: 8,
                            shadowColor: BarsObj.color,
                            barBorderColor: BarsObj.color,
                            barBorderWidth: 3
                        }
                    },
                    data: seriesData.data
                }
            ]
        };
        if (options) {
            if (options.title) {
                switch (typeof options.title) {
                    case "object": {
                        for (var key in options.title) {
                            option.title[key] = options.title[key];
                        }
                    }; break;
                    case "string": {
                        option.title.text = options.title;
                    }; break;
                }
            }
            if (options.dataZoom && typeof options.dataZoom == "object") {
                for (var key in options.dataZoom) {
                    option.dataZoom[key] = options.dataZoom[key];
                }
            }
        }
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option);
    }
};