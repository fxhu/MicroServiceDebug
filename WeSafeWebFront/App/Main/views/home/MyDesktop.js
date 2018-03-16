﻿(function () {
    function genData(data, flag) {

        var seriesData = [];
        for (var i = 0; i < data.length; i++) {
            if (flag == 1) {
                if (data[i].name == 1) {
                    seriesData.push({
                        "name": "故障:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 2) {
                    seriesData.push({
                        "name": "销毁:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 3) {
                    seriesData.push({
                        "name": "完好:" + data[i].value,
                        "value": data[i].value
                    });
                }
            }
            if (flag == 2) {
                if (data[i].name == 1) {
                    seriesData.push({
                        "name": "火警:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 2) {
                    seriesData.push({
                        "name": "故障:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 3) {
                    seriesData.push({
                        "name": "误报:" + data[i].value,
                        "value": data[i].value
                    });
                }
            }
            if (flag == 3) {
                if (data[i].name == 1) {
                    seriesData.push({
                        "name": "待审核:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 2) {
                    seriesData.push({
                        "name": "待指派:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 3) {
                    seriesData.push({
                        "name": "待整改:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 4) {
                    seriesData.push({
                        "name": "待复查:" + data[i].value,
                        "value": data[i].value
                    });
                }
                /* if (data[i].name == 6) {
                     seriesData.push({ "name": "已闭环:" + data[i].value, "value": data[i].value });
                 }*/
                if (data[i].name == 7) {
                    seriesData.push({
                        "name": "已逾期:" + data[i].value,
                        "value": data[i].value
                    });
                }

            }
            if (flag == 4) {
                if (data[i].name == 1) {
                    seriesData.push({
                        "name": "待审核:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 2) {
                    seriesData.push({
                        "name": "未开始:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 3) {
                    seriesData.push({
                        "name": "进行中:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 4) {
                    seriesData.push({
                        "name": "已完成:" + data[i].value,
                        "value": data[i].value
                    });
                }
                if (data[i].name == 5) {
                    seriesData.push({
                        "name": "已逾期:" + data[i].value,
                        "value": data[i].value
                    });
                }

            }
            if (flag == 5) {
                if (data[i].name == 1) {
                    seriesData.push({
                        "name": "行政规章",
                        "value": data[i].value
                    });
                }
                if (data[i].name == 2) {
                    seriesData.push({
                        "name": "法律法规",
                        "value": data[i].value
                    });
                }
                if (data[i].name == 3) {
                    seriesData.push({
                        "name": "规范文件",
                        "value": data[i].value
                    });
                }
                if (data[i].name == 4) {
                    seriesData.push({
                        "name": "技术标准",
                        "value": data[i].value
                    });
                }
            }

        }
        return {
            seriesData: seriesData
        };

    }
    function getLineData(echartsInstance,subNmae, url) {

        $.ajax({
            url: url,
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                data = data.items;
                var temp = [];
                for (var i = 0; i < data.length; i++) {

                    temp.push(data[i].rate);

                }
                echartsInstance.setOption({

                    series: [
                        {
                            name: subNmae,
                            data: temp
                        }
                    ]
                });
            }
        });
    }
    var controllerId = 'app.views.myDesktop';
    angular.module('app').controller(controllerId, [
        '$scope', '$http',
        function ($scope, $http) {
            //定义折线图形中所需要的图例数据
            $scope.legendDatas=[
                [
                    //设备完好率
                    {id:3,
                        name:"完好率",
                        type: 'pictorialBar',
                        barCategoryGap: '-20%',
                        symbol:'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                       itemStyle: {
                        normal: {
                            opacity: 0.5
                        },
                        emphasis: {
                            opacity: 0.8
                        }
                      }
                    }
                ] ,
                [
                    //故障来源
                    {id:4,name:"巡检",type:'bar',stack:'broken'},
                    {id:5,name:"检测",type:'bar',stack:'broken'},
                    {id:6,name:"保养",type:'bar',stack:'broken'}
                ],
                [
                    //巡检
                    {id:2,name:"未开始",type: 'line',smooth: true},
                    {id:3,name:"进行中",type: 'line',smooth: true},
                    {id:4,name:"已完成",type: 'line',smooth: true}
                ],
                [
                    //隐患
                    {id:1,name:"上报",
                        type:'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}}
                    },
                    {id:2,name:"整改",
                        type:'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        } ,
                        areaStyle: {normal: {}}
                    }
                ],
                [
                    //报警
                    {id:1,name:"火警",type:'bar'},
                    {id:2,name:"故障",type:'bar'},
                    {id:3,name:"误报",type:'bar'}

                ]

            ];
            //获取某个总量
            $scope.getTotal = function (url, id,flag) {
                $.ajax({
                    url: url + id,
                    method: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    },
                    success: function (data) {
                        if(data.items && data.items.length > 0){
                            var obj = 0;
                            for (var i = 0 ; i < data.items.length ; i ++ ){
                                obj+= data.items[i].value;
                            }
                            //此处调用apply方法，让angularjs自己主动刷新模型
                            $scope.$apply(function(){
                                $scope["t"+flag] = obj;
                            });

                        }
                    }
                });

            };
            //画折线图
            $scope.getLine=function(url,elementId,legendData,color,textName){
                $.ajax({
                    url: url ,
                    method: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    },
                    success: function (data) {
                        data = data.items;
                        var seriesData =[];
                        for(var i = 0 ; i < data.length ; i ++ ){
                            for(var j = 0 ; j < legendData.length ; j ++ ){
                                if(legendData[j].id == data[i].code){
                                    var temp = {};
                                    temp.legend = legendData[j];
                                    temp.data = data[i].data;
                                    seriesData.push(temp);
                                }
                            }

                        }

                        var legend = [];
                        var xData = [];
                        var series =[];
                        if(seriesData.length > 0){
                        for(var h =0; h < seriesData.length ; h ++){
                            legend.push(seriesData[h].legend.name);
                            var temp ={};
                            for(var item in seriesData[h].legend){
                                if(item != "id"){
                                    temp[item] = seriesData[h].legend[item];
                                }
                            }
                            temp.data = [];
                            for(var g = 0 ; g < seriesData[h].data.length ; g ++ ){
                                temp.data.push(seriesData[h].data[g].value);
                            }
                            series.push(temp);
                        }
                        for(var j = 0 ; j < seriesData[0].data.length ; j ++ ){
                            var temp =  RptCommon.formatData(seriesData[0].data[j].timestamp);
                            xData.push({
                                value: temp,
                                textStyle:{
                                    align:'left'
                                }
                            });
                        }

                            var dom = document.getElementById(elementId);
                            var myChart = echarts.init(dom);
                            var option = {
                                color:color,
                                title : {
                                    text: textName,
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    itemWidth:10,
                                    icon:'circle',
                                    bottom:"0%",
                                    data: legend
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        saveAsImage : {show: true}
                                    },
                                    right:'8%'
                                },
                                grid:{
                                    left:'15%',
                                    bottom:'20%'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: true,
                                    data: xData
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                dataZoom: [{
                                    type: 'inside',
                                    start: 0,
                                    end: 50
                                }, {
                                    start: 0,
                                    end: 50,
                                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                    handleSize: '80%',
                                    handleStyle: {
                                        color: '#fff',
                                        shadowBlur: 3,
                                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                                        shadowOffsetX: 2,
                                        shadowOffsetY: 2
                                    },
                                    bottom:'6%'
                                }],
                                series: series
                            };
                            myChart.clear();
                            myChart.setOption(option);

                        }


                    }
                });

            };
            $scope.drawPie =  function (url,id,elementId,flag) {

              /*  var data = [
                    {
                        "name":1,
                        value:100
                    },
                    {
                        "name":2,
                        value:100
                    },
                    {
                        "name":3,
                        value:100
                    },
                    {
                        "name":4,
                        value:100
                    }
                ];*/

               var data = {
                    "code": "1",
                    "items": [{
                    "name": "1",
                    "value": "9"
                },  {
                    "name": "4",
                    "value": "22"
                }, {
                    "name": "2",
                    "value": "8"
                }, {
                    "name": "3",
                    "value": "11"
                }],
                    "data": "null",
                    "message": "null"
                };


                var series = genData(data.items,flag);

                var ledendData = [];
                for(var i = 0 ; i < series.seriesData.length ; i ++ ){
                    ledendData.push(series.seriesData[i].name);
                }
                var dom = document.getElementById(elementId);
                var myChart = echarts.init(dom);
                var   option = {
                    color:['#32c5d2','#2ea1f8','#ef5665','#ffa71d'],
                    title : {
                        text: '消防资料',
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        itemWidth:10,
                        icon:'circle',
                        bottom:'0%',
                        data: ledendData
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        },
                        right:'8%'
                    },
                    series : [
                        {
                            name: '消防资料',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '45%'],
                            data:series.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.clear();
                myChart.setOption(option);

            };
            $scope.drawFine = function(url,elementId,legendData,color,textName){
                console.log(url+legendData.id);
                $.ajax({
                    url: url + legendData.id,
                    method: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    },
                    success: function (data) {
                        var xData = [];
                        var series = [];
                        if(data.items != null && data.items.length > 0){
                            var temp ={};
                            for(var item in legendData){
                                if(item != "id"){
                                    temp[item] = legendData[item];
                                }
                            }
                            temp.data = [];
                            for(var m =0 ; m < data.items.length; m ++ ){

                                //获取x轴数据
                                xData.push({
                                    value:  RptCommon.formatData(data.items[m].timestamp),
                                    textStyle:{
                                        align:'left'
                                    }
                                });
                                //获取data.items里的data,封装到temp
                                temp.data.push(data.items[m].rate);
                            }

                            series.push(temp);

                        }

                        console.log(series);
                         var dom = document.getElementById(elementId);
                        var myChart = echarts.init(dom);
                        var option = {
                            color:color,
                            title : {
                                text: textName,
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params, ticket, callback) {
                                    return params[0].name + '<br />' + params[0].seriesName + ' : ' + (params[0].value * 100).toFixed(2) + '%';
                                }
                            },
                            legend: {
                                itemWidth:10,
                                icon:'circle',
                                bottom:"0%",
                                data: [legendData.name]
                            },
                            toolbox: {
                                show : true,
                                feature : {
                                    saveAsImage : {show: true}
                                },
                                right:'8%'
                            },
                            grid:{
                                left:'15%',
                                bottom:'20%'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: true,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    formatter: function (value, index) {
                                        return parseFloat((value * 100).toFixed(2)) + "%";
                                    }
                                }
                            },
                            dataZoom: [{
                                type: 'inside',
                                start: 0,
                                end: 50
                            }, {
                                start: 0,
                                end: 50,
                                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                handleSize: '80%',
                                handleStyle: {
                                    color: '#fff',
                                    shadowBlur: 3,
                                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                                    shadowOffsetX: 2,
                                    shadowOffsetY: 2
                                },
                                bottom:'6%'
                            }],
                            series: series
                        };
                        myChart.clear();
                        myChart.setOption(option);




                    }
                });


            }
            $scope.changeTotalNums = function(id){
                $scope.getTotal(reportHost + "api/company/DeviceReport/FindLatestDeviceCount/", "["+id+"]",1);
                $scope.getTotal(reportHost + "api/company/WarningReport/FindLatestWarningCount/", "["+id+"]",2);
                $scope.getTotal(reportHost + "api/company/HiddenDangerReport/FindLatestHiddenDangerCount/","["+id+"]",3);
                $scope.getTotal(reportHost + "api/company/PatrolReport/FindLatestWarningCount/", "["+id+"]",4);

            };

            $scope.changeLine = function (id) {
               /* $scope.getLine(reportHost+"api/company/DeviceReport/FindDailyRate/["+id+"]","deviceReport",$scope.legendDatas[0],$scope.color[0],'设备完好率');
                */
                /*$scope.getLine(reportHost+"api/company/WarningReport/FindDailyRate/","["+id+"]","brokenReport",$scope.legendDatas[1],$scope.color[1],$scope.name[1]);
 */

                $scope.getLine(reportHost+"api/company/PatrolReport/FindDailyValue/["+id+"]","patrolReport",$scope.legendDatas[2],$scope.color[2],'巡检任务');
                $scope.getLine(reportHost+"api/company/HiddenDangerReport/FindDailyValue/["+id+"]","hiddenReport",$scope.legendDatas[3],$scope.color[3],'隐患统计');
                $scope.getLine(reportHost+"api/company/WarningReport/FindDailyValue/["+id+"]","warnReport",$scope.legendDatas[4],$scope.color[4],'报警统计');
                $scope.drawFine(reportHost+"api/company/DeviceReport/FindDailyRate/["+id+"]/","deviceReport",$scope.legendDatas[0][0],$scope.color[0],'设备完好率');
                                            /*api/company/DeviceReport/FindDailyRate/[13]/3*/
                $scope.drawPie(null,null,"firePaper",5);

            };

            //定义title名称
            $scope.name=[
                '设备完好率','故障来源','巡检任务','隐患统计','报警统计'
            ]
            //定义需要的颜色
            $scope.color = [
                ['#7BCD4C'],
                ['#8d43ad', '#ffa71d', '#32c5d2', '#00a8ec', '#f7ca18'],
                ['#32a3f8', '#ffa71d', '#32c5d2', '#00a8ec', '#f7ca18'],
                ['#2ea1f8', '#7f53e3',  '#9a5eb6', '#ef5665', '#00a8ec', '#f7ca18'],
                ['#32c5d2', '#2ea1f8',  '#ef5665', '#ef5665', '#00a8ec', '#f7ca18']
            ];

            $http({
                method: 'GET',
                url: authorityHost+'UserTask/GetAllOrgs'
            }).then(function(response){
                $scope.list= response.data;
                $scope.showDetil(response.data[0].parentId,response.data[0].id,response.data[0].displayName);
            });

            $scope.showDetil =function (parentid,id,zoneName) {
                $scope.company = zoneName;
                $scope.changeTotalNums(id);
                $scope.changeLine(id);
            };

        }
    ]);
})();