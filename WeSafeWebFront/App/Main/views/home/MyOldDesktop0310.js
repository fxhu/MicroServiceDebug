(function () {
    var controllerId = 'app.views.myOldDesktop';
    angular.module('app').controller(controllerId, [
        '$scope', function ($scope) {

            var vm = this;
            vm.desktopData = {};
            vm.desktopData.safeStar = null;
            vm.desktopData.safeStarprogress = null;
            vm.desktopData.userTask = null;
            vm.desktopData.userTaskprogress = null;
            vm.desktopData.vsualAssest = null;
            vm.desktopData.vsualAssestprogress = null;
            vm.desktopData.alarmEvent = null;
            vm.desktopData.alarmEventprogress = null;
            function RealTimeTestContainer() {
                var dom = document.getElementById("pingcecontainer");
                var myChart = echarts.init(dom);
                var app = {};
                app.title = '实时评测';


                $.get(abp.appPath + 'Data/data.json',
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

            };

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
                        map: 'china',
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
                                borderWidth: 4
                            },
                            emphasis: {
                                areaColor: '#00ACFD',
                                borderColor: '#fff',
                                borderWidth: 4
                            }
                        },
                        width: '55%',
                        heiht: '55%',
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
                            map: 'china'
                        }
                    ]
                });
                myParkChart.on('click',
                    function (param) {
                        SwitchParkTab(param.data.uuid);
                        window.open("/datavisual/BuildingPanel.html?ParkId=" + param.data.uuid);
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
                    window.open("/DataVisual/BuildingPanel.html?ParkId=" + uuid);
                    console.log(name);
                });
                myParkChart.setOption(options);
                window.onresize = myParkChart.resize;
            };

            //切换园区页签
            function SwitchParkTab(parkId) {
                $("[parkid=" + parkId + "]").trigger("click");
            };

            //展示园区列表
            function ShowParkTable(data) {
                var headHtml = [];
                var bodyHtml = [];


                //headHtml.push("<li class='active'><a href='#Area1' data-toggle='tab' aria-expanded='true'> 数据统计 </a></li>");
                //bodyHtml.push("<div class='tab-pane active' id='Area1' style='height: 530px;'>");
                //bodyHtml.push("<iframe src='/report/report.html' style='height: 530px;border: solid 1px #eee; width: 100%; height: 100%; box-shadow: 4px 4px 4px #ccc' frameborder='0'></iframe>");
                //bodyHtml.push("</div>");



                for (var i = 0; i < data.length; i++) {
                    //tab标题 
                    headHtml.push('<li><a href="#Area' + (i + 2) + '" index="' + (i + 2) + '" parkId="' + data[i].id + '" data-toggle="tab" aria-expanded="false">' + data[i].name + '</a></li>');
                    //tab内容
                    bodyHtml.push('<div class="tab-pane" id="Area' + (i + 2) + '" style="height: 530px;">');
                    bodyHtml.push('<iframe style="height: 530px;border: solid 1px #eee; width: 100%; height: 100%; box-shadow: 4px 4px 4px #ccc" frameborder="0"></iframe>');
                    bodyHtml.push('</div>');
                }
                $("#mydesktopTap").append(headHtml.join(""));
                $("#myTabContent").append(bodyHtml.join(""));

                $('#mydesktopTap a').click(function (e) {
                    e.preventDefault()
                    //加载地图显示

                    if (!$("#Area" + $(this).attr("index")).find("iframe").attr("src")) {
                        $("#Area" + $(this).attr("index")).find("iframe").attr("src", "/datavisual/BuildingMap.html?ParkId=" + $(this).attr("parkId"));
                    }

                    $(this).tab('show')
                })
            };

            function GetExtAttrValue(obj, name) {
                for (var i = 0; i < obj.extAttrs.length; i++) {
                    var item = obj.extAttrs[i];
                    if (item.name == name) {
                        return item.value;
                    }
                }
                return "";
            };

            //拼接得分的html
            function GetScoreHtml(score) {
                var html = [];
                for (var i = 0; i < score; i++) {
                    html.push('<i class="material-icons" style="color: #fd9701; font - size: 16px !important; ">grade</i>');
                }
                return html.join("");
            };
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
            };

            $.getJSON(abp.appPath + "VisualArea/ParkAreaList", function (data) {
                currentData = data;
                //展示园区地图
                ShowParkMap(data);
                //展示园区列表
                ShowParkTable(data);
                console.log(data);
            });

            function GoToCheck() {
                window.location.href = '/default.html#!/RiskDistribution';
                $('.menu-active-true  a[ui-sref="RiskDistribution"]')[0].parentNode.parentNode.style.display = "block";
            };
            function GoToTask() {
                window.location.href = '/default.html#!/UserTask';
                $('.menu-active-true  a[ui-sref="UserTask"]')[0].parentNode.parentNode.style.display = "block";
            };
            function GoToPossession() {
                window.location.href = '/default.html#!/EquipmentArchivesExpire';
                $('.menu-active-true  a[ui-sref="EquipmentArchivesExpire"]')[0].parentNode.parentNode.style.display = "block";
            };
            function GoToRealtimemonitoring() {
                window.location.href = '/default.html#!/AlarmStatistics';
                $('.menu-active-true  a[ui-sref="AlarmStatistics"]')[0].parentNode.parentNode.style.display = "block";
            };
            function showUserTask() {
                var tempHtml = [];
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: abp.appPath + 'UserTask/GetMyDesktopTaskInfo',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    success: function (data) {
                        for (var i = 0; i < data.rows.length; i++) {
                            var state = "<span class=\"label bg-red\">待处理</span>";
                            if (data.rows[i].state === 2) {
                                state = "<span class=\"label bg-blue\">已处理</span>";
                            }
                            var crdate = data.rows[i].creationTime.toString();
                            crdate = crdate.split('T')[0];
                            tempHtml.push('<tr>');
                            tempHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 100px;" title="' + data.rows[i].description + '">' + data.rows[i].description + '</td>');
                            tempHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 60px;" title="' + crdate + '">' + crdate + '</td>');
                            tempHtml.push('<td >' + state + '</td>');
                            tempHtml.push('<td style="min-width:50px;"><a target=\"_self\" href=\"' + data.rows[i].url + '">查看</a></td>');
                            tempHtml.push('</tr>');
                        };
                        $("#todoTask").append(tempHtml.join(""));
                        console.log("待办任务请求成功");
                    },
                    error: function () {
                        console.log("待办任务请求失败");
                    },
                    complete: function () {
                        console.log("待办任务请求完成");
                    }
                });
            };
            function GetNowPossession() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    async: false,
                    url: abp.appPath + 'Application/GetMyDesktopInfo',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    //data: { "para": Id },
                    success: function (data) {
                        //setRiskDistributionData(90);
                        //setUserTaskData(data.result.userTaskCount);
                        //setVsualAssestData(data.result.vsualAssestCount);
                        //setAlarmEventData(data.result.alarmEventCount);


                        vm.desktopData.userTask = data.result.userTaskCount;
                        vm.desktopData.userTaskprogress = GetPercent(data.result.userTaskCount - data.result.userTaskActiveCount, data.result.userTaskCount);
                        vm.desktopData.userTaskActiveprogress = GetPercent(data.result.userTaskActiveCount, data.result.userTaskCount);
                        vm.desktopData.vsualAssest = data.result.vsualAssestCount;
                        vm.desktopData.vsualAssestprogress = GetPercent(data.result.vsualAssestExpireCount, data.result.vsualAssestCount);
                        vm.desktopData.vsualAssestUnExpireprogress = GetPercent(data.result.vsualAssestCount - data.result.vsualAssestExpireCount, data.result.vsualAssestCount);
                        vm.desktopData.alarmEvent = data.result.alarmEventCount;
                        vm.desktopData.alarmEventprogress = GetPercent(data.result.alarmEventFireCount, data.result.alarmEventCount);
                        vm.desktopData.alarmEventOtherprogress = GetPercent(data.result.alarmEventCount - data.result.alarmEventFireCount, data.result.alarmEventCount);


                        console.log("请求成功");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("请求失败");
                    },
                    complete: function () {
                        console.log("请求完成");
                    }
                });
                var keytbodyHtml = [];
                $.ajax({
                    type: "get",
                    dataType: "json",
                    url: abp.appPath + 'Application/GetTopOfficeAreas',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    success: function (data) {
                        for (var i = 0; i < data.result.list.length; i++) {
                            keytbodyHtml.push('<tr>');
                            keytbodyHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 100px;" title="' + data.result.list[i].fullName + '">' + data.result.list[i].fullName + '</td>');
                            keytbodyHtml.push('<td  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 80px;">' + data.result.list[i].organizationUnitName + '</td>');
                            keytbodyHtml.push('<td style="min-width:50px;"><a target=\"_self\" href=\"default.html#!/KeyArea/' + data.result.list[i].parentId + '\">查看</a></td>');
                            keytbodyHtml.push('</tr>');
                        };
                        if (data.result.list.length >= 5) {
                            $("#moreforkeyArea").css('display', 'block');
                        }
                        $("#keytbody").append(keytbodyHtml.join(""));
                        console.log("请求成功");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("请求失败");
                    },
                    complete: function () {
                        console.log("请求完成");
                    }
                });

                $.ajax({
                    url: abp.appPath + "OneMap/GetSysScore",
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", tokens);
                    },
                    type: 'get',
                    dataType: "json",
                    async: false,
                    success: function (d) {
                        var score = parseInt(d.result);
                        vm.desktopData.safeStar = score;
                        $("#expireRate").html(score);
                        var scorehtml = SetStar(score);
                        vm.desktopData.safeStar = score;
                        $("#safeStar").html(scorehtml);

                        vm.desktopData.safeStar = score;
                        vm.desktopData.safeStarprogress = GetPercent(score, 100);
                    },
                    error: function (err) {

                    }
                });

            }

            function SetStar(score) {
                var level = Common.GetScoreLevel(score);
                var html = GetStarHtml(level);
                return html;
            };

            function GetStarHtml(times) {
                var star = "";
                for (var i = 0; i < times; i++) {
                    star += "<i style=\"color: #fd9701\" class=\"material-icons\">grade</i>";
                }
                return star;
            }

            function GoToYuanqu(city) {
                window.open("VisualData/VisualData.html" + '#' + city);
            }

            $('#mydesktopTap a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            $('#mydesktopTap a[href="#Area1"]').tab('show');



            GetNowPossession();
            showUserTask();

            $('.easy-pie-chart .number.transactions').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: "rgb(1, 150, 252)"
            });

            $('.easy-pie-chart .number.visits').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: "#59d4d4"
            });

            $('.easy-pie-chart .number.bounce').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: "#8d44ad"
            });

            $('.easy-pie-chart-reload').click(function () {
                $('.easy-pie-chart .number').each(function () {
                    var newValue = Math.floor(100 * Math.random());
                    $(this).data('easyPieChart').update(newValue);
                    $('span', this).text(newValue);
                });
            });

            function GetPercent(num, total) {
                num = parseFloat(num);
                total = parseFloat(total);
                if (isNaN(num) || isNaN(total)) {
                    return "-";
                }
                return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
            }
        }
    ]);
})();