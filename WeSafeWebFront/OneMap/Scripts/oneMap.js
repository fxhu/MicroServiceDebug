var internval = 25;
var progressObj = {};
var srvUrl = "/OneMap/GetParks";
$(document).ready(function () {    
    var oServer = new oneMapServer();
    //加载安全评分
    oServer.LoadSafeScore();
    //加载资产数量
    oServer.LoadAssestsNum();

    var oParks = new oneMapParks();
    oParks.InitMap();
    $.get(srvUrl).done(function (doc) {        
        oParks.SetParks(doc);        
        oParks.Start();
    });

    var oAlarm = new oneMapAlarm();
    oAlarm.InitBox();
    var oWork = new oneMapWork();
    oWork.InitBox();
    oAlarm.Init();
    oWork.Init();

    var IsShow = false;
    var thisTime = 5000;
    var initTime = new Date();
    var refreshTime = 60;//重新获取数据的时间间隔,单位秒
    
    (function (range, target) {
        var _now = new Date();
        if (!target) {
            //第一次加载
            oWork.Init(function () {
                $(".fade").fadeOut(5000);                
            });
            oAlarm.Init(function () {
                $(".fade").fadeOut(5000);
            });
            _now = new Date();
            target = _now.setTime(_now.getTime() + range * 1000);
        } else if (_now < target) {
            //等待
            IsShow = !IsShow;            
            if (IsShow) {
                oWork.Show();
                oAlarm.Show();
                $(".fade").hide();
                $(".fade").fadeIn(1000);
            }
            else {                
                $(".fade").fadeOut(5000);
            }            
        } else {
            //重置
            oWork.Init(function () {
                $(".fade").fadeOut(5000);
            });
            oAlarm.Init(function () {
                $(".fade").fadeOut(5000);
            });
            _now = new Date();
            target = _now.setTime(_now.getTime() + range * 1000);
        }
        var _args = arguments;
        var that = this;
        setTimeout(function () {
            _args.callee.call(that, range, target);
        }, 2000);
    })(refreshTime);

    var oSafetyPark = new oneMapParkSafety();
    oSafetyPark.init();

    //加载视频
    var oVideo = new oneMapVideoPanel();
    oVideo.init();
});

var oneMapServer = function (Parks) {
    var oServer = new Object();
    //加载安全评分
    oServer.LoadSafeScore = function () {       
        $.ajax({
            url: "/OneMap/GetSysScore",
            type: 'get',
            dataType: "json",
            success: function (d) {
                var score = parseInt(d);
                $("#safeScore").html(score);
            },
            error: function (err) {
                //alert(err);
            }
        });
    };
    //加载资产数量
    oServer.LoadAssestsNum = function () {        
        $.ajax({
            url: "/OneMap/GetAssestNum",
            type: 'get',
            dataType: "json",
            success: function (d) {
                var num = d;
                $("#assestNum").html(num);
            },
            error: function (err) {
                //alert(err);
            }
        });        
    };
    return oServer;
};

var oneMapParks = function () {
    var oParks = new Object();
    var Internal = 5000;
    var myChart;
    var convertedData;
    var mapData;
    var convertData = [];
    var timer;
    var checkNum = 0;
    oParks.SetParks = function (data) {
        mapData = data;
        convertData = [];//清空缓存数据
        $.each(mapData, function (idx, item) {            
            var exts = eval('(' + item.extAttrStr + ')');
            convertData.push({
                id: item.id,
                name: item.name,
                address: oParks.GetExtAttrVal(exts, "地址"),
                dev: item.devNum + "/" + item.errNum,
                deviceNum: item.devNum,
                score: parseInt(item.score),
                value: [item.longitude, item.latitude, 0]
            });
        });
    };
    oParks.RefreshData = function () {
        $.get(srvUrl).done(function (doc) {
            oParks.SetParks(doc);
        });    
    };
    oParks.GetExtAttrVal = function (exts, name) {
        var val = "-";
        $.each(exts, function (idx, item) {
            if (item.Name == name) {
                val = item.Value;
                return;
            }
        });
        return val;
    };
    oParks.InitMap = function () {
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
                map: 'china',
                top: '15%',
                left: '0',
                silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
                center: [98.98561551896913, 38.205000490896193],//地图中心点位置
                zoom: 1.2,//地图缩放比
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: '#716e6e'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#1A4057',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
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
                    symbol: "image://css/oneMap/img/marker.png",
                    symbolSize:20,
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

        myChart.on('click', function (params) {
            window.open('/datavisual/buildingpanel.html?backto=onemap&parkid=' + params.data.areaid,"_self");
        });
    }
    oParks.Start = function () {
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
                    symbol: "image://css/oneMap/img/marker_checked.png",
                    symbolSize: 20,                    
                    showEffectOn: 'render',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            offset: [10, 0],
                            textStyle: {
                                fontSize: '20'
                            },
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            fontWeight: 'bold',
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
                            symbol: checkNum % 2== 0 ? "image://css/oneMap/img/bg_checking1.png" : "image://css/oneMap/img/bg_checking2.png",
                            symbolSize: [300, 200],
                            symbolOffset: [0, '-60%'],
                            label: {
                                normal: {
                                    fontSize: 16,
                                    color: "#fff",
                                    lineHeight:30,
                                    formatter: [
                                        '{name|名称：' + thisItem.name + '}',
                                        '{address|地址：' + Common.SubString(thisItem.address, 13) + '}',
                                        '{dev|资产总数/故障：' + thisItem.dev + '}',
                                        '{safeScore|安全评分：' + score + '}',
                                        '{map|实景地图 >>}'
                                    ].join('\n'),
                                    rich: {
                                        name: {
                                            align: 'left'
                                        },
                                        address: {
                                            align: 'left'
                                        },
                                        dev: {
                                            align: 'left'
                                        },
                                        safeScore: {
                                            align: 'left'                                            
                                        },
                                        map: {
                                            align: 'center',
                                            verticalAlign:'bottom',
                                            color: '#fff'
                                        }
                                    }
                                }
                            },
                            data: [
                                {
                                    areaid: thisItem.id,
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

            oParks.SetMarkPoint(thisItem, score, thisItem.score);

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
    oParks.CheckItem = function (itemNum) {
        if (timer) {
            clearTimeout(timer);
        }
        checkNum = itemNum;
        oParks.Start();
    };
    oParks.SetMarkPoint = function (item, score, thisScore) {
        var scoreUpInternal = 2000;//第一次展示时，完全展示好冒泡图形后，再来进行评分计算
        if (score < 100) {
            scoreUpInternal = 500;
        }        
        
        if (score < thisScore) {
            setTimeout(function () {
                checkNum++;
                if (checkNum == convertData.length) {
                    checkNum = 0;
                }
                oParks.Start();
            }, 5000);
            return;
        }        
        myChart.setOption({
            series: [
                {
                    markPoint: {
                        symbol: checkNum == 0 ? "image://css/oneMap/img/bg_checking1.png" : "image://css/oneMap/img/bg_checking2.png",
                        lineHeight: 30,                        
                        symbolSize: [300, 150],
                        label: {
                            normal: {
                                formatter: [
                                    '{name|名称：' +  Common.SubString(item.name, 13) + '}',
                                    '{address|地址：' + Common.SubString(item.address, 13) + '}',
                                    '{dev|资产总数/故障：' + item.dev + '}',
                                    '{safeScore|安全评分：' + score + '}',
                                    '{map|实景地图 >>}'
                                ].join('\n'),
                                rich: {
                                    name: {
                                        fontSize: 18,
                                        color: "#fff",
                                        align: 'left',
                                    },
                                    address: {
                                        fontSize: 18,
                                        color: "#fff",
                                        align: 'left',
                                    },
                                    dev: {
                                        fontSize: 18,
                                        color: "#fff",
                                        align: 'left',
                                    },
                                    safeScore: {
                                        fontSize: 18,
                                        color: "#fff",
                                        align: 'left',
                                    },
                                    map: {
                                        align: 'center',
                                        fontSize: 18,
                                        padding: [10, 0, 0, 0]
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        });
        score--;
        setTimeout(function () {
            oParks.SetMarkPoint(item, score, thisScore);
        }, scoreUpInternal);
    };
    oParks.SetFinish = function () {
        // var myOption = myChart.getOption();
        // myOption.series[0].data[0].name = "评估完成";
    };
    return oParks;
};

var oneMapAlarm = function () {
    var oAlarm = new Object();
    oAlarm.ShowNum = 3;//一次显示3条记录
    oAlarm.PageNum = 1;//当前显示页码
    oAlarm.TotalPageNum = 1;//总页码
    oAlarm.data;
    oAlarm.Init = function (callback) {
        $.ajax({
            url: "/OneMap/GetAlarms",
            type: 'get',
            dataType: "json",
            success: function (d) {
                //计算总页数
                if (d.length > oAlarm.ShowNum) {
                    oAlarm.TotalPageNum = d.length % oAlarm.ShowNum == 0 ? parseInt(d.length / oAlarm.ShowNum) : (parseInt(d.length / oAlarm.ShowNum) + 1);
                }
                oAlarm.data = d;
                oAlarm.Show();
                if (callback) {
                    callback();
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    };
    oAlarm.InitBox = function () {
        var html = "";
        for (var i = 0; i < oAlarm.ShowNum; i++) {
            html += "<tr class=\"box-yellow\">"
                + "<td width=\"40%\" class=\"box-left fade\"></td>"
                + "<td width=\"35%\" class=\"fade\"></td>"
                + "<td width=\"25%\" class=\"fade\"></td>"
                + "</tr>";
        }
        $("#alarmList").html(html);
    };
    oAlarm.Show = function () {
        var num = 0;
        var d = oAlarm.data;
        if (!d) return;
        var html = "";
        for (var i = (oAlarm.PageNum - 1) * oAlarm.ShowNum; i < d.length; i++) {
            var type = Common.GetAlarmEventTypes().valsDic[d[i].EventType];
            html += "<tr class=\"box-yellow\" valign=\"top\">"
                + "<td width=\"40%\" class=\"box-left fade\">" + Common.SubString(d[i].areaName, 9) + "</td>"
                + "<td width=\"35%\" class=\"fade\">" + d[i].Date + "</td>"
                + "<td width=\"25%\" class=\"fade\">" + type + "</td>"
                + "</tr>";
            num++;
            if (num >= oAlarm.ShowNum)
                break;
        }
        for (var i = num; i < oAlarm.ShowNum; i++) {
            html += "<tr class=\"box-yellow\">"
                + "<td width=\"40%\" class=\"box-left fade\"></td>"
                + "<td width=\"35%\" class=\"fade\"></td>"
                + "<td width=\"25%\" class=\"fade\"></td>"
                + "</tr>";
        }
        oAlarm.PageNum++;
        if (oAlarm.PageNum > oAlarm.TotalPageNum) {
            oAlarm.PageNum = 1;
        }
        $("#alarmList").html(html);
    };
    return oAlarm;
};

var oneMapWork = function () {
    var oWork = new Object();
    oWork.ShowNum = 5;//一次显示5条记录
    oWork.PageNum = 1;//当前显示页码
    oWork.TotalPageNum = 1;//总页码
    oWork.data;
    oWork.Init = function (callback) {
        oWork.PageNum = 1;//当前显示页码
        oWork.TotalPageNum = 1;//总页码        
        $.ajax({
            url: "/OneMap/GetPatrolTask",
            type: 'get',
            dataType: "json",
            success: function (d) {
                //计算总页数
                if (d.length > oWork.ShowNum) {
                    oWork.TotalPageNum = d.length % oWork.ShowNum == 0 ? parseInt(d.length / oWork.ShowNum) : (parseInt(d.length / oWork.ShowNum) + 1);
                }
                oWork.data = d;
                //  oWork.Show();
                if (callback) {
                    callback();
                }
            },
            error: function (err) {
                //alert(err);
            }
        });
    };
    oWork.InitBox = function () {
        //加载巡检任务显示框
        var html = "";
        for (var i = 0; i < oWork.ShowNum; i++) {
            html += "<tr class=\"box-blue\">"
                + "<td width=\"40%\" class=\"box-left fade\"></td>"
                + "<td width=\"32%\" class=\"fade\"></td>"
                + "<td width=\"28%\" class=\"fade\"></td>"
                + "</tr>";
        }
        $("#worklist").html(html);
    }
    oWork.Show = function () {
        var num = 0;
        var d = oWork.data;
        if (!d) return;
        var html = "";
        for (var i = (oWork.PageNum - 1) * oWork.ShowNum; i < d.length; i++) {
            html += "<tr class=\"box-blue\">"
                + "<td width=\"40%\" class=\"box-left fade\">" + Common.SubString(d[i].AreaName, 9) + "</td>"
                + "<td width=\"32%\" class=\"fade\">" + Common.SubString(d[i].Name, 16) + "</td>"
                + "<td width=\"28%\"  class=\"fade\" valign=\"top\" style=\"padding-top:4px;\">" + d[i].EndTimeStr + "<br />" + d[i].UserName + "</td>"
                + "</tr>";
            num++;
            if (num >= oWork.ShowNum)
                break;
        }
        for (var i = num; i < oWork.ShowNum; i++) {
            html += "<tr class=\"box-blue\">"
                + "<td width=\"40%\" class=\"box-left fade\"></td>"
                + "<td width=\"32%\" class=\"fade\"></td>"
                + "<td width=\"28%\" class=\"fade\"></td>"
                + "</tr>";
        }
        oWork.PageNum++;
        if (oWork.PageNum > oWork.TotalPageNum) {
            oWork.PageNum = 1;
        }
        $("#worklist").html(html);
    };
    return oWork;
};

//园区安全等级
var oneMapParkSafety = function () {
    var oParkSafety = new Object();
    oParkSafety.init = function () {
        var limit = 5;//获取前5个安全园区
        var safeParkUrl = "/OneMap/GetAllOfficeArea?limit=" + limit;
        $.get(safeParkUrl).done(function (d) {
            var parks = d.data;
            //parks = parks.sort(function (a, b) {
            //    return b.Score - a.Score;
            //});
            var html = "";
            var parkName = "-";
            var userName = "-";
            var grade = "-";
            var score = "";
            for (var i = 1; i <= limit; i++) {
                parkName = "-";
                userName = "-";
                grade = "-";
                score = "";
                var item = parks[i - 1];
                if (item)
                {
                    parkName = Common.SubString(item.Name, 10);
                    userName = (item.UserName == "" ? "-" : item.UserName);
                    grade = oParkSafety.SetStar(item.Score);
                    score = "(<span style=\"color: #a8ff00\">" + item.Score + "</span>)";
                }
                html += "<tr class=\"box-material\">"
                    + "<td width=\"5%\" class=\"num\">" + i + "</td >"
                    + "<td width=\"36%\">" + parkName + "</td>"
                    + "<td width=\"28%\" style=\"color: rgba(56, 206, 255, 1)\">" + grade + "</td>"
                    + "<td width=\"14%\" class=\"score\" valign=\"top\">" + score + "</td>"
                    + "<td width=\"17%\" align=\"left\">" + userName + "</td>"
                    + "</tr>";
            }
            $("#safetyParklist").html(html);
        });    
    };
    oParkSafety.SetStar = function (score) {
        var level = Common.GetScoreLevel(score);
        var html = GetStarHtml(level);
        //html += "(<span>" + score + "</span>)";
        function GetStarHtml(times) {
            var star = "";
            for (var i = 0; i < times; i++) {
                star += "<i class=\"material-icons\">grade</i>";
            }
            return star;
        }
        return html;
    };
    return oParkSafety;
};

//视频区域初始化
var oneMapVideoPanel = function () {
    var oPanel = new Object();
    oPanel.init = function () {
        var videoUrl = "/OneMap/GetAllMainAreaCamera";
        $.ajax({
            url: videoUrl,
            type: 'get',
            dataType: "json",
            success: function (d) {
                var pageNum = 4;//一页显示4条记录
                var html = "";
                var contentBoxNum = d.rows.length % pageNum == 0 ? parseInt(d.rows.length / pageNum) : parseInt(d.rows.length / pageNum) + 1;
                for (var i = 0; i < contentBoxNum; i++) {
                    if (i == 0) {
                        html += "<div class=\"item active\">";
                    }
                    else {
                        html += "<div class=\"item\">";
                    }                    
                    var n = 1;
                    for (var j = i * pageNum; j < d.rows.length; j++)
                    {
                        html += "<div class=\"video-col\" width=\"233\" height=\"174\"><canvas style=\"width: 100%;height: 100%\" val=\"" + d.rows[j].ServerAdress + "\"></canvas></div>";                   
                        if (n >= pageNum)
                            break;
                        else
                            n++;
                    }
                    for (var j = n; j < pageNum; j++) {
                        html += "<div class=\"video-col\" width=\"233\" height=\"174\"><canvas style=\"width: 100%;height: 100%\"></canvas></div>";    
                    }
                    html += "</div>";
                }
                $("#videoBox").html(html);
                oPanel.Play();               
            },
            error: function (err) {
                //alert(err);
            }
        });
    };

    oPanel.Play = function () {
        $('#carousel-videos').carousel();
        $("#videoBox").find("canvas").each(function (idx, item) {
            var url = $(this).attr("val");
            if (url != undefined) {
                var player1 = new JSMpeg.Player(url, { canvas: this });
            }            
        });        
    };
    return oPanel;
};