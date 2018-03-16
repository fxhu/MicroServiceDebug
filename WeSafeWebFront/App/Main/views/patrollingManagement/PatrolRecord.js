(function () {
    var controllerId = 'app.views.PatrolRecord';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', '$http', 'abp.services.app.patrol', function ($scope, $timeout, $http, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.selectdate = {
                patrolIdx: 0,
                personIdx: 0,
                areaIdx: 0
            };
            
            var now = new Date();
            vm.selectStart = {
                patrol: now,
                person: now,
                area: now
            };
            vm.selectEnd = {
                patrol: now,
                person: now,
                area: now
            };
            vm.timeSpan = [{
                id: 0,
                type: '一周内',
                startTime: Common.SetDays(new Date(), -7),
                endTime: Common.formatDataTime(now, "yyyy-MM-dd")
            },
            {
                id: 1,
                type: '一个月内',
                startTime: Common.SetMonth(new Date(), -1),
                endTime: Common.formatDataTime(now, "yyyy-MM-dd")
            },
            {
                id: 2,
                type: '二个月内',
                startTime: Common.SetMonth(new Date(), -2),
                endTime: Common.formatDataTime(now, "yyyy-MM-dd")
            },
            {
                id: 3,
                type: '三个月内',
                startTime: Common.SetMonth(new Date(), -3),
                endTime: Common.formatDataTime(now, "yyyy-MM-dd")
            },
            {
                id: 4,
                type: '自定义'
            }];

            vm.statusObj = {
                names: ["待确认", "待执行", "执行中", "巡检完毕", "已超时", "已取消"],
                vals: [0, 1, 2, 4, 6, 7]
            };
            
            vm.seriesData = {
                total: {},//统计总数
                patrol: [],
                person: [],
                area: []
            };
            $.each(vm.statusObj.names, function (idx, item) {
                vm.seriesData.patrol.push({
                    name: item,
                    val: vm.statusObj.vals[idx],
                    type: 'bar',
                    data: []
                });
                vm.seriesData.person.push({
                    name: item,
                    val: vm.statusObj.vals[idx],
                    type: 'bar',
                    data: []
                });
                vm.seriesData.area.push({
                    name: item,
                    type: 'bar',
                    val: vm.statusObj.vals[idx],
                    data: []
                });
                vm.seriesData.total[item] = 0;              
            });

            vm.search = function (st, et) {
                vm.seriesData.patrol = [];
                $.each(vm.statusObj.names, function (idx, item) {  
                    vm.seriesData.patrol.push({
                        name: item,
                        val: vm.statusObj.vals[idx],
                        type: 'bar',
                        data: []
                    });
                    vm.seriesData.total[item] = 0;
                });
                patrolService.getTaskStatistics(st, et).then(function (result) {
                    var xData = [];                    
                    var mySt = new Date(st);
                    var myEt = new Date(et);
                    var days = 0;
                    while (mySt <= myEt)
                    {
                        var timeStr = Common.formatDataTime(mySt, "yyyy-MM-dd");
                        var items = result.data.filter(function (x) {
                            return x.creationTimeStr == timeStr;
                        });
                        if (xData.indexOf(timeStr) < 0) {
                            xData.push(timeStr);
                        }
                        if (items.length == 0)
                        {
                            $.each(vm.seriesData.patrol, function (statusIdx, data) {
                                var num = vm.seriesData.total[data.name];
                                data.data.push(num);
                            });
                        }
                        else {
                            $.each(vm.seriesData.patrol, function (statusIdx, data) {
                                var num = vm.seriesData.total[data.name];                                
                                $.each(items, function (idx, item) { 
                                    if (item.status == 5) {
                                        item.status = 4;//将状态为5的数据统计到状态为4的数据中
                                    }
                                    if (data.val == item.status) {
                                        num += item.taskNum;
                                        vm.seriesData.total[data.name] = num;
                                    }
                                });
                                data.data.push(num);                                
                            });
                        }
                        mySt = new Date(mySt.setTime(mySt.getTime() + 24 * 60 * 60 * 1000));
                    }
                    drawBar("按日统计", xData, vm.seriesData.patrol, "bar_patrol");
                });
            };

            vm.searchPerson = function (st, et) {
                vm.seriesData.person = [];
                $.each(vm.statusObj.names, function (idx, item) {                    
                    vm.seriesData.person.push({
                        name: item,
                        val: vm.statusObj.vals[idx],
                        type: 'bar',
                        data: []
                    });
                });
                patrolService.getTaskUserStatistics(st, et).then(function (result) {
                    var xNameData = [];
                    var xData = [];
                    $.each(vm.statusObj.names, function (idx, item) {
                        vm.seriesData.person[idx].data = [];
                    });
                    
                    $.each(result.data, function (idx, item) {
                        if (item.status == 5) {
                            item.status = 4;//将状态为5的数据统计到状态为4的数据中
                        }
                        var idx = xNameData.indexOf(item.userID);
                        if (idx < 0) {
                            xNameData.push(item.userID);
                            xData.push(item.userName);
                            $.each(vm.seriesData.person, function (statusIdx, data) {
                                if (data.val == item.status) {
                                    data.data.push(item.taskNum);
                                }
                                else {
                                    data.data.push(0);
                                }
                            });
                        }
                        else {
                            var obj = vm.seriesData.person.find(function (x) {
                                return x.val == item.status;
                            });
                            if (obj != undefined) {
                                obj.data[idx] += item.taskNum;
                            }
                        }
                    });
                    drawBar("按责任人统计", xData, vm.seriesData.person, "bar_person");
                });
            };

            vm.searchArea = function (st, et) {
                var areaId = vm.areasObj.selectAreaId;
                if (areaId == "") areaId = -1;
                vm.seriesData.area = [];
                $.each(vm.statusObj.names, function (idx, item) {
                    vm.seriesData.area.push({
                        name: item,
                        type: 'bar',
                        val: vm.statusObj.vals[idx],
                        data: []
                    });
                });
                patrolService.getTaskAreaStatistics(st, et, areaId).then(function (result) {
                    var xNameData = [];
                    var xData = [];
                    $.each(vm.statusObj.names, function (idx, item) {
                        vm.seriesData.area[idx].data = [];
                    });
                    $.each(result.data, function (idx, item) {
                        if (item.status == 5) {
                            item.status = 4;//将状态为5的数据统计到状态为4的数据中
                        }
                        var idx = xNameData.indexOf(item.areaID);
                        if (idx < 0) {
                            xNameData.push(item.areaID);
                            xData.push(item.areaName);
                            $.each(vm.seriesData.area, function (statusIdx, data) {
                                if (data.val == item.status) {
                                    data.data.push(item.taskNum);
                                }
                                else {
                                    data.data.push(0);
                                }
                            });
                        }
                        else {
                            var obj = vm.seriesData.area.find(function (x) {
                                return x.val == item.status;
                            });
                            if (obj != undefined) {
                                obj.data[idx] += item.taskNum;
                            }
                        }
                    });                   
                    drawBar("按区域统计", xData, vm.seriesData.area, "bar_area");
                });
            };

            vm.GetTimeSpan = function (idx) {
                var obj = vm.timeSpan.find(function (x) {
                    return x.id == idx;
                });
                return obj;
            };
            
            vm.selectedChange = {
                patrol: function () {                    
                    var obj = vm.GetTimeSpan(vm.selectdate.patrolIdx);
                    if (obj != undefined && vm.selectdate.patrolIdx != 4) {
                        vm.search(obj.startTime, obj.endTime);
                    }
                },
                person: function () {
                    var obj = vm.GetTimeSpan(vm.selectdate.personIdx);
                    if (obj != undefined && vm.selectdate.personIdx != 4) {
                        vm.searchPerson(obj.startTime, obj.endTime);
                    }
                },
                area: function () {
                    var obj = vm.GetTimeSpan(vm.selectdate.personIdx);
                    if (obj != undefined && vm.selectdate.personIdx != 4) {
                        vm.searchArea(obj.startTime, obj.endTime);
                    }
                },
            }
           
            vm.serchRange = {
                patrol: function () {                    
                    var startTime = new Date(vm.selectStart.patrol);
                    var endTime = new Date(vm.selectEnd.patrol);
                    if (startTime > endTime) {
                        abp.message.error("起始时间不能大于截止时间！");
                    }
                    else {
                        var st = Common.formatDataTime(vm.selectStart.patrol, "yyyy-MM-dd");
                        var et = Common.formatDataTime(vm.selectEnd.patrol, "yyyy-MM-dd");
                        vm.search(st, et);
                    }                    
                },
                person: function () {                    
                    var startTime = new Date(vm.selectStart.person);
                    var endTime = new Date(vm.selectEnd.person);
                    if (startTime > endTime) {
                        abp.message.error("起始时间不能大于截止时间！");
                    }
                    else {
                        var st = Common.formatDataTime(vm.selectStart.person, "yyyy-MM-dd");
                        var et = Common.formatDataTime(vm.selectEnd.person, "yyyy-MM-dd");
                        vm.searchPerson(st, et);
                    }     
                },
                area: function () {
                    var startTime = new Date(vm.selectStart.area);
                    var endTime = new Date(vm.selectEnd.area);
                    if (startTime > endTime) {
                        abp.message.error("起始时间不能大于截止时间！");
                    }
                    else {
                        var st = Common.formatDataTime(vm.selectStart.area, "yyyy-MM-dd");
                        var et = Common.formatDataTime(vm.selectEnd.area, "yyyy-MM-dd");
                        vm.searchArea(st, et);
                    }     
                }
            }

            function drawBar(title, xData, seriesData, barId) {
                option = {
                    title: {
                        text: title
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble'
                    },
                    legend: {
                        left :"right",
                        data: vm.statusObj.names
                    },
                    grid: {
                        left: '3%',
                        right: '4%', 
                        bottom: '3%',
                        containLabel: true
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
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            interval: 1,
                            min:0,
                            type: 'value'
                        }
                    ],
                    series: seriesData
                };
                var myChart = echarts.init(document.getElementById(barId));
                myChart.setOption(option);
            }

            $timeout(function () {
                vm.areasObj = new LocalAreaDropDown("patrol_", vm.selectedChange.area);
                vm.areasObj.init();
                vm.selectedChange.patrol();
                vm.selectedChange.person();
            });            
        }
    ]);
})();