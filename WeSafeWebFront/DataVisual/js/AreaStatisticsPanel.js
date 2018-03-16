$(function(){
    $(window).resize(function(){setHeight();})
    setHeight();
    //获取区域信息
    $.ajax({
        type: "get",
        url: authorityHost+"VisualArea/GetAreaInfo?id="+GetUrlParam("id"),
        success: function (data) 
        {
            loadData(data);
        }
    });
})
function setHeight(){
    $("#container").css("height", $(window).height());
}
//加载数据
function loadData(data){
    switch(parseInt(data.areaType,10))
    {
        case 4:
        {
            
            loadDescription(data,"div1");
            loadSafeScore(data,"div2");
            loadDeviceStatistics(data,"div3");
            loadAreaLink(data,false,"div4");
            break;
        }
        case 3:
        {
            
            loadDescription(data,"div1");
            loadSafeScore(data,"div2");
            loadDeviceStatistics(data,"div3");
            loadAreaLink(data,true,"div4");
            break;
        }
        default:
        {
            loadDescription(data);
            loadAssetType(data);
        }
    }
}
//加载基本信息
function loadDescription(data,containerId)
{
    var fireManInfo;
    $.ajax({
        type: "get",
        url: authorityHost+"FireMan/GetFireManInfo?id="+data.id,
        success: function (result) 
        {
            fireManInfo=result;
            var address=GetExtAttrValue(data,"地址");
            var html='<div class="row">'+
            '<span class="label label-danger">基本信息</span>'+
            '</div>'+
            '<div class="row">'+
            '<div class="md-12">'+
            '   <table class="table table-bordered table-condensed">'+
            '       <tr><td>名称</td><td>'+data.fullName+'</td></tr>'+
            '       <tr><td>地址</td><td>'+((address==null || address=="")?"暂无":address)+'</td></tr>'+
            '       <tr><td>消防责任人</td><td>'+((fireManInfo==null||fireManInfo.name==null)?"暂无":fireManInfo.name)+'</td></tr>'+
            '       <tr><td>联系电话</td><td>'+((fireManInfo==null || fireManInfo.phoneNumber==null)?"暂无":fireManInfo.phoneNumber)+'</td></tr>'+
            '   </table>   '+
            '</div>'+
            '</div>';
            $("#"+containerId).append($(html));
        }
    });
    
}
//加载安全评测
function loadSafeScore(data,containerId)
{
    var safeObj=null;
    $.ajax({
        type: "get",
        url: authorityHost+"SafeCheck/GetAreaAssess?areaid="+data.id,
        success: function (result) 
        {
            fireManInfo=result;
            var allColor=Common.GetScoreColor(fireManInfo.assessScore);
            var html='<div class="row">'+
            '<span class="label label-danger">安全评测</span>'+
            '</div>'+
            '<div class="row">'+
                '<div class="md-12">'+
                '   <table class="table table-bordered table-condensed">'+
                '       <tr>'+
                '           <td rowspan="6" width="130" align="center" style="vertical-align:middle">'+
                '           <div style="color:'+allColor+';border:solid 10px '+allColor+';border-radius:50% 50%;width:100px;height:100px;text-align:center;line-height:80px;font-size:40px">'+fireManInfo.assessScore+
                '           </div>总得分'+
                '           </td>'+
                '       <td>危险物品</td><td style="color:'+Common.GetScoreColor(fireManInfo.dangerousGoods)+'">'+fireManInfo.dangerousGoods+'</td></tr>'+
                '       <tr><td>危险作业</td><td style="color:'+Common.GetScoreColor(fireManInfo.dangerousOperations)+'">'+fireManInfo.dangerousOperations+'</td></tr>'+
                '       <tr><td>培训次数</td><td style="color:'+Common.GetScoreColor(fireManInfo.trainNumber)+'">'+fireManInfo.trainNumber+'</td></tr>'+
                '       <tr><td>考核成绩</td><td style="color:'+Common.GetScoreColor(fireManInfo.checkResult)+'">'+fireManInfo.checkResult+'</td></tr>'+
                '       <tr><td>资产状态</td><td style="color:'+Common.GetScoreColor(fireManInfo.goodsStatus)+'">'+fireManInfo.goodsStatus+'</td></tr>'+
                '       <tr><td>巡检任务</td><td style="color:'+Common.GetScoreColor(fireManInfo.patrolTask)+'">'+fireManInfo.patrolTask+'</td></tr>'+
                '   </table>'+
                '</div>'+
            '</div>';
            $("#"+containerId).append($(html));
        }
    });
    
}
//加载设备统计
function loadDeviceStatistics(data,containerId)
{
    var html='<div class="row">'+
            '   <span class="label label-danger">设备统计</span>'+
            '</div>'+
            '<div class="row">'+
            '   <div class="md-12">'+
            '       <div id="pieDevice" style="width:350px;height:200px;border:solid 1px #ddd;"></div>'+
            '   </div>'+
            '</div>'
    $("#"+containerId).append($(html));
    var jsonData=[];
    $.ajax({
        type: "get",
        url: authorityHost+"AssestsPoint/GetDeviceSumInfo?Id="+data.id,
        success: function (result) 
        {
            jsonData=result;

            drawPie("pieDevice", ["完好","销毁","故障"], jsonData, undefined, function (myChart) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            });
        }
    });
   
   
}
function buildButton(id,txt){
    return '<button class="btn btn-success btn-sm" onclick="gotoArea('+id+')">'+txt+'</button>';
}
//加载区域链接
function loadAreaLink(data,selfOnly,containerId)
{
    var html="";
    if(selfOnly)
    {
        html=buildButton(data.id,"进入");
        $("#"+containerId).append('<div class="row">'+html+'</button>');
    }
    else
    {
        var areas=[];
        $.ajax({
            type: "get",
            url: authorityHost+"VisualArea/AreaTree?id="+data.id,
            success: function (result) 
            {
                areas=result;
                var arrHtml=[];
                for(var i=0;i<areas.length;i++){
                    if(areas[i].id==data.id){
                        continue;
                    }
                    if(parseInt(areas[i].areaType,10)==(parseInt(data.areaType,10)-1))
                    {
                        arrHtml.push(buildButton(areas[i].id,areas[i].name));
                    }
                }
                html=arrHtml.join("");
                $("#"+containerId).append('<div class="row">'+html+'</button>');
            }
        });
        
        
    }
   
}
//加载资产类型
function loadAssetType(data)
{

}
//加载资产维护信息
function loadAssetDetail(data)
{

}
//跳转到指定区域
function gotoArea(id){
    var url=getAreaViewUrl(id);
    if(url==""){return;}
    parent.window.location.href=url;
}
//绘制饼图
function drawPie(contentId, legendData, seriesData, options, callback) {
    var colors=['#1aa5f5', '#32c5d2', '#EE5665'];
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
                            show: true,
                            position: 'outside',
                            formatter: function (params) {
                                return params.name + '('+params.value+')';
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'normal'
                            }
                        },
                        emphasis: {
                            show: true,
                            formatter: function (params) {
                                return params.name + '('+params.value+')';
                            },
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 5,
                            length2: 5 ,
                            smooth: false,
                            lineStyle: {
                                width: '2',
                                type: 'solid',
                                opacity: 1,
                                // color: 'white'
                            }
                        }
                    },
                    data: seriesData
                }
            ]
        };
        
        var myChart = echarts.init(document.getElementById(contentId));
        myChart.setOption(option_blue);
        
}
function closePanel(){
    parent.$("#ifm_areaStatInfo").fadeOut();
}