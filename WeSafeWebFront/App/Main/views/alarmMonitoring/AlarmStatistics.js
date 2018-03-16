(function () {
    var controllerId = 'app.views.AlarmStatistics';
    angular.module('app').controller(controllerId, [
        '$scope', 'abp.services.app.alarms', function ($scope, alarmsService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var nowAreaId = null;
            var troubleBarData = {
                titleText: '故障', color: ['#ff8c00', '#ff4200'], legendData: ['全部', '当天'], xData: [],
                seriesData: [{ name: '全部', data: [] }, { name: '当天', data: [] }]
            };
            var troubleLineData = {
                titleText: '故障处理', legendData: ['未处理', '已处理'], xData: [],
                seriesData: [{ name: '未处理', data: [] }, { name: '已处理', data: [] }]
            };
            var troublePieData = {
                titleText: '故障', legendData: ['灭火器', '消防栓', '电线', '插头', '电缆'],
                seriesData: {
                    name: '故障详情', data: [
                        { value: 335, name: '灭火器' },
                        { value: 310, name: '消防栓' },
                        { value: 234, name: '电线' },
                        { value: 135, name: '插头' },
                        { value: 1548, name: '电缆' }
                    ]
                }
            };
            var fireBarData = {
                titleText: '火警', color: ['#ff0000', '#d32bec'], legendData: ['全部', '当天'], xData: [],
                seriesData: [{ name: '全部', data: [] }, { name: '当天', data: [] }]
            };
            var fireLineData = {
                titleText: '火警处理', legendData: ['未处理', '已处理'], xData: [],
                seriesData: [{ name: '未处理', data: [] }, { name: '已处理', data: [] }]
            };
            var firePieData = {
                titleText: '火警', legendData: ['服务器', '插头', '电线', '插头', '电缆'],
                seriesData: {
                    name: '火警详情', data: [
                        { value: 335, name: '灭火器' },
                        { value: 310, name: '消防栓' },
                        { value: 234, name: '电线' },
                        { value: 135, name: '插头' },
                        { value: 1548, name: '电缆' }
                    ]
                }
            };
            vm.selectdate = {
                tbbar: { select: 0, timeStart: new Date(), timeEnd: new Date() },
                tbline: { select: 0, timeStart: new Date(), timeEnd: new Date() },
                firebar: { select: 0, timeStart: new Date(), timeEnd: new Date() },
                fireline: { select: 0, timeStart: new Date(), timeEnd: new Date() }
            };
            vm.timeSpan = [{ id: 0, type: '一周内' }, { id: 1, type: '一个月内' }, { id: 2, type: '二个月内' }, { id: 3, type: '三个月内' }, { id: 4, type: '自定义' }];
            function drawBar(containerID, uidata) {
                option = {
                    title: {
                        text: uidata.titleText
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: uidata.legendData
                    },
                    //toolbox: {
                    //    show: true,
                    //    feature: {
                    //        dataView: { show: true, readOnly: false },
                    //        magicType: { show: true, type: ['line', 'bar'] },
                    //        restore: { show: true },
                    //        saveAsImage: { show: true }
                    //    }
                    //},
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100,
                        xAxisIndex: [0],
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: uidata.xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: uidata.seriesData[0].name,
                            type: 'bar',
                            data: uidata.seriesData[0].data,
                            //markPoint: {
                            //    data: [
                            //        { type: 'max', name: '最大值' },
                            //        { type: 'min', name: '最小值' }
                            //    ]
                            //},
                            //markLine: {
                            //    data: [
                            //        { type: 'average', name: '平均值' }
                            //    ]
                            //},
                            itemStyle: {
                                //通常情况下：
                                normal: { //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params) {
                                        return uidata.color[0];
                                    }
                                }
                            }
                        },
                        {
                            name: uidata.seriesData[1].name,
                            type: 'bar',
                            data: uidata.seriesData[1].data,
                            //markPoint: {
                            //    data: [
                            //        { type: 'max', name: '最大值' },
                            //        { type: 'min', name: '最小值' }
                            //    ]
                            //},
                            //markLine: {
                            //    data: [
                            //        { type: 'average', name: '平均值' }
                            //    ]
                            //},
                            itemStyle: {
                                //通常情况下：
                                normal: { //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params) {
                                        return uidata.color[1];
                                    }
                                }
                            }
                        }
                    ]
                };

                var myChart = echarts.init(document.getElementById(containerID));
                myChart.setOption(option);
            }
            function drawOneBar(containerID, uidata) {
                option = {
                    title: {
                        text: uidata.titleText
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: uidata.legendData
                    },
                    //toolbox: {
                    //    show: true,
                    //    feature: {
                    //        dataView: { show: true, readOnly: true },
                    //        magicType: { show: true, type: ['line', 'bar'] },
                    //        restore: { show: true },
                    //        saveAsImage: { show: true }
                    //    }
                    //},
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100,
                        xAxisIndex: [0],
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: uidata.xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: uidata.seriesData[0].name,
                            type: 'bar',
                            data: uidata.seriesData[0].data,
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            },
                            itemStyle: {
                                //通常情况下：
                                normal: { //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params) {
                                        return uidata.color;
                                    }
                                }
                            },
                        }
                        //,
                        //{
                        //    name: uidata.seriesData[1].name,
                        //    type: 'bar',
                        //    data: uidata.seriesData[1].data,
                        //    markPoint: {
                        //        data: [
                        //            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                        //            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                        //        ]
                        //    },
                        //    markLine: {
                        //        data: [
                        //            { type: 'average', name: '平均值' }
                        //        ]
                        //    }
                        //}
                    ]
                };

                var myChart = echarts.init(document.getElementById(containerID));
                myChart.setOption(option);
            }
            function drawLine(containerID, uidata) {
                option = {
                    tooltip: {
                        trigger: 'axis'
                        //,
                        //position: function (pt) {
                        //    return [pt[0], '10%'];
                        //}
                    },
                    title: {
                        text: uidata.titleText
                        //,
                        //textStyle: {
                        //    color: '#888888',
                        //    fontSize: 16,
                        //    fontWeight: 500,
                        //    fontFamily: 'Microsoft YaHei',
                        //}
                    },
                    grid: {
                        left: 60,
                        right: 20,
                        top: 70,
                        bottom: 70
                    },
                    legend: {
                        data: uidata.legendData
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: uidata.xData
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 0,
                        end: 100
                    },
                    {
                        start: 0,
                        end: 100,
                        xAxisIndex: [0],
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            name: uidata.seriesData[0].name,
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#2ec7c9'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#2ec7c9'
                                    }, {
                                        offset: 1,
                                        color: '#2ec7c9'
                                    }])
                                }
                            },
                            data: uidata.seriesData[0].data
                        },
                        {
                            name: uidata.seriesData[1].name,
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#00008B'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00008B'
                                    }, {
                                        offset: 1,
                                        color: '#00008B'
                                    }])
                                }
                            },
                            data: uidata.seriesData[1].data
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById(containerID));
                myChart.setOption(option);
            }
            function drawPie(containerID, uidata) {
                option = {
                    title: {
                        text: uidata.titleText,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: uidata.legendData
                    },
                    series: [
                        {
                            name: uidata.seriesData.name,
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: uidata.seriesData.data,
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
                var myChart = echarts.init(document.getElementById(containerID));
                myChart.setOption(option);
            }
            vm.selectedChange = function (num) {
                switch (num) {
                    case 0:
                        if (vm.selectdate.tbbar.select != 4)
                            SerchData(0, vm.selectdate.tbbar);
                        break;
                    case 1:
                        if (vm.selectdate.tbline.select != 4)
                            SerchData(1, vm.selectdate.tbline);
                        break;
                    case 2:
                        if (vm.selectdate.firebar.select != 4)
                            SerchData(2, vm.selectdate.firebar);
                        break;
                    case 3:
                        if (vm.selectdate.fireline.select != 4)
                            SerchData(3, vm.selectdate.fireline);
                        break;
                    default:
                        break;
                }
            }
            vm.serchRange = function (num) {
                switch (num) {
                    case 0:
                        SerchData(0, vm.selectdate.tbbar);
                        break;
                    case 1:
                        SerchData(1, vm.selectdate.tbline);
                        break;
                    case 2:
                        SerchData(2, vm.selectdate.firebar);
                        break;
                    case 3:
                        SerchData(3, vm.selectdate.fireline);
                        break;
                    default:
                        break;
                }
            }

            function SerchData(which, selectedrange) {
                alarmsService.getRangeData({ AreaIds: nowAreaId, AssistType: which, TimeType: selectedrange.select, StartTime: selectedrange.timeStart, EndTime: selectedrange.timeEnd })
                    .then(function (result) {
                        switch (which) {
                            case 0:
                                troubleBarData.xData = result.data.items[0].xData;
                                troubleBarData.seriesData[0].data = result.data.items[0].yData;
                                troubleBarData.seriesData[1].data = result.data.items[1].yData;
                                drawBar("bar_trouble", troubleBarData);
                                break;
                            case 1:
                                troubleLineData.xData = result.data.items[0].xData;
                                troubleLineData.seriesData[0].data = result.data.items[0].yData;
                                troubleLineData.seriesData[1].data = result.data.items[1].yData;
                                drawLine("line_trouble", troubleLineData);
                                break;
                            case 2:
                                fireBarData.xData = result.data.items[0].xData;
                                fireBarData.seriesData[0].data = result.data.items[0].yData;
                                fireBarData.seriesData[1].data = result.data.items[1].yData;
                                drawBar("bar_fire", fireBarData);
                                break;
                            case 3:
                                fireLineData.xData = result.data.items[0].xData;
                                fireLineData.seriesData[0].data = result.data.items[0].yData;
                                fireLineData.seriesData[1].data = result.data.items[1].yData;
                                drawLine("line_fire", fireLineData);
                                break;
                            default:
                                break;
                        }
                    });
            }
            function SerchPie(which) {
                alarmsService.getAllPieData({ PieType: which })
                    .then(function (result) {
                        switch (which) {
                            case 0:
                                troublePieData.legendData = result.data.pieColunms;
                                troublePieData.seriesData.data = result.data.pieData;
                                drawPie("pie_trouble", troublePieData);
                                break;
                            case 1:
                                firePieData.legendData = result.data.pieColunms;
                                firePieData.seriesData.data = result.data.pieData;
                                drawPie("pie_fire", firePieData);
                                break;
                            default:
                                break;
                        }
                    });
            }

            vm.sercharea = function (areaid) {
                nowAreaId = areaid;
                SerchData(0, vm.selectdate.tbbar);
                SerchData(1, vm.selectdate.tbline);
                SerchData(2, vm.selectdate.firebar);
                SerchData(3, vm.selectdate.fireline);
                //SerchPie(0);
                //SerchPie(1);
            }
            sercharea1 = function (areaid) {
                //for (var i = 0; i < areadata.length; i++) {
                //    if (areadata[i].id == areaid) {
                //        $("#btnSwitch button").html(areadata[i].displayName + ' <span class="caret"></span>');
                //        break;
                //    }
                //}
                nowAreaId = areaid;
                SerchData(0, vm.selectdate.tbbar);
                SerchData(1, vm.selectdate.tbline);
                SerchData(2, vm.selectdate.firebar);
                SerchData(3, vm.selectdate.fireline);
                //SerchPie(0);
                //SerchPie(1);
            }
            var areadata = [];
            var idsOfMax = [],
                maxParentId = 0,
                maxtype = 0;
            //加载楼栋下拉框
            function LoadAreas() {
                alarmsService.getAllArea().then(function (result) {
                    var data = result.data.items;
                    //if (GetUrlParam("BuildingId") == "") {
                    //定位到第一个
                    areadata = data;
                    $.each(data, function () {
                        if (this.areaType > maxtype) {
                            maxtype = this.areaType;
                            maxParentId = this.parentId;
                        }
                    });
                    $.each(data, function () {
                        if (this.areaType == maxtype) {
                            idsOfMax.push(this.id);
                        }
                    });
                    vm.LoadArea(null, maxtype, null);
                });
            }


            //------------------------------------------------//
            vm.NowTableData = [];
            vm.areas = [];
            vm.LoadArea = function (parentId, level, fromclick) {
                //修改按钮的文本
                if (fromclick) {
                    $(event.srcElement).parents("ul").prev().html($(event.srcElement).text() + ' <span class="caret"></span>')
                }
                //加载下拉内容
                SearchAreas(1, parentId, function (result) {
                    var data = result;
                    //把子级下拉框干掉
                    if (vm.areas != null && vm.areas[maxtype - level] != null) {
                        vm.areas.splice(maxtype - level, level);
                    }
                    //有子级，加载子级
                    if (data.length > 0) {
                        vm.NowTableData = data;
                        RenderAreaDropDown(data, level);
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        SearchAreas(2, parentId, function (result) {
                            vm.NowTableData = data;
                        });
                    }
                    sercharea1(parentId == null ? idsOfMax : [parentId]);
                });
            }
            function SearchAreas(which, id, callback) {
                if (id == null && maxtype != 4) id = maxParentId;
                var result = [];
                if (which == 1) {
                    $.each(areadata, function () {
                        if (this.parentId == id) {
                            result.push(this);
                        }
                    });
                } else if (which == 2) {
                    $.each(areadata, function () {
                        if (this.id == id) {
                            result.push(this);
                        }
                    });
                } else {
                    $.each(areadata, function () {
                        if (this.parentId == null) {
                            result.push(this);
                        }
                    });
                }
                if (callback != null && typeof (callback) == "function") {
                    callback(result);
                }
            }
            function GetAreaTypeName(typeId) {
                switch (parseInt(typeId, 10)) {
                    case 4: { return "全部园区"; }
                    case 3: { return "全部建筑"; }
                    case 2: { return "全部楼层"; }
                    case 1: { return "全部科室"; }
                    default: { return ""; }
                }
            }

            function RenderAreaDropDown(data, level, showClear) {
                var info = vm.areas;
                var index = maxtype - level;
                if (info[index] == null) {
                    var areainfo = { level: 0, levelName: '', pid: 0, childAreas: [], btnName: '' };
                    info.push(areainfo);
                }
                info[index].btnName = GetAreaTypeName(level);
                for (var i = 0; i < data.length; i++) {
                    var careainfo = { id: 0, nextlevel: 0, displayName: '' };
                    info[index].childAreas.push(careainfo);
                    info[index].childAreas[i].id = data[i].id;
                    info[index].childAreas[i].nextlevel = level - 1;
                    info[index].childAreas[i].displayName = data[i].displayName;
                }
                info[index].pid = level == maxtype ? null:data[0].parentId;
                info[index].levelName = GetAreaTypeName(level);
                info[index].level = level;
                vm.areas = info;
            }
            LoadAreas();
            //$timeout(function () {
            //    vm.LoadArea("", 4);
            //});
            //LoadAreas(function (areaid) {
            //    sercharea1(areaid);
            //});
            //------------------------------------------------//
        }
    ]);
})();