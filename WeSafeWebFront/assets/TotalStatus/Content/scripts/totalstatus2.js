//var mapName = "福建";
$(document).ready(function () {     
        
		   drawEnvironmentIndex('environment_index');
	       drawSecurityIndex('security_index');
	       drawFireIndex('fire_index');
	       drawTotalIndex('total_index'); 
	       drawAlarmSum('alarm_sum');
	       drawDeviceSum('device_sum');
	       drawEnEvent('en_event');
	       drawSecEvent('sec_event');
           drawFirEvent('fir_event');
           drawOthers('others');
}); 
        
        //绘制曲线图
        function drawEnvironmentIndex(containerID) {			
option = {
	backgroundColor: '#181a30',
	color:['#2ec7c9','rgba(0,0,0,0.2)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show:false,
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    fontSize:15,
					color:'#ccc'
					
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
			
            data:[
                {value:335, name:'防火'},
                {value:310, name:''},
            ]
        }
    ]
};
        var myChart = echarts.init(document.getElementById(containerID));   

            myChart.setOption(option);
        }
        
        function drawSecurityIndex(containerID) {			
option = {
	backgroundColor: '#181a30',
	color:['#d87a80','rgba(0,0,0,0.2)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show:false,
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    fontSize:15,
					color:'#ccc'
					
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:350, name:'灭火'},
                {value:200, name:''},
            ]
        }
    ]
};
        var myChart = echarts.init(document.getElementById(containerID));   

            myChart.setOption(option);
        }
       
        function drawFireIndex(containerID) {			
option = {
	backgroundColor: '#181a30',
	color:['#5ab1ef','rgba(0,0,0,0.2)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show:false,
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    fontSize:15,
					color:'#ccc'
					
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:150, name:'资产'},
                {value:300, name:''},
            ]
        }
    ]
};
        var myChart = echarts.init(document.getElementById(containerID));   

            myChart.setOption(option);
        }

function drawOthers(containerID) {
    option = {
        backgroundColor: '#181a30',
        color: ['#5ab1ef', 'rgba(0,0,0,0.2)', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        fontSize: 15,
                        color: '#ccc'

                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 30, name: '其他' },
                    { value: 300, name: '' },
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(containerID));

    myChart.setOption(option);
}
       
//绘制综合评分
        function drawTotalIndex(containerID){
			option = {
    backgroundColor: '#181a30',
    tooltip : {
        formatter: "{a} <br/>{c}"
    },
    series : [
        {
            name:'资产总数',
            type:'gauge',
            min:0,
            max:100,
            endAngle:0,
            startAngle:180,
            splitNumber:10,
            radius: '95%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, '#2ec709'],[0.82, '#5ab1ef'],[1, '#d87a80']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {
               backgroundColor: 'rgba(90,217,239,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 3,
                offsetCenter: [0, '0%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize:20,
                }
            },
            data: [{ value: 68, name: '资产总数'}]
        },
    ]
};
  var myChart = echarts.init(document.getElementById(containerID));   
/*setInterval(function (){
    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
    myChart.setOption(option);
},2000);*/	
  myChart.setOption(option);
		
	}

        function drawAlarmSum(containerID){
			
var base = +new Date(2015, 0, 1);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 50];

for (var i = 1; i < 1096; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.abs(Math.round((Math.random() - 0.5) * 5 + data[i - 1])));
}

var data1 =[Math.random() * 20];
for (var i = 1; i < 1096; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data1.push(Math.abs(Math.round((Math.random() - 0.5) * 5 + data1[i - 1])));
}
var data2 =[Math.random() * 5];
for (var i = 1; i < 1096; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data2.push(Math.abs(Math.round((Math.random() - 0.5) * 5 + data2[i - 1])));
}

option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        text: '资产状况评估',
		textStyle:{
		    color:'#888888',
			fontSize:16,
			fontWeight:500,
			fontFamily:'Microsoft YaHei',
	       }
    },
	grid:{
		left:30,
		right:20,
		top:70,
		bottom:70
	},
     legend: {
         data: ['保养', '更换', '过期']
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
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
            name:'保养',
            type:'line',
            smooth:true,
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
            data: data
        },
                {
            name:'更换',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: '#5ab1ef'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#5ab1ef'
                    }, {
                        offset: 1,
                        color: '#5ab1ef'
                    }])
                }
            },
            data: data1
        },
         {
            name:'过期',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: '#d87a80'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#d87a80'
                    }, {
                        offset: 1,
                        color: '#d87a80'
                    }])
                }
            },
            data: data2
        }
    ]
};
        var myChart = echarts.init(document.getElementById(containerID));   
        myChart.setOption(option);
		}

        function drawDeviceSum(containerID){
			option = {
    color:['#59c4e6','#fad860', '#c4ccd3', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
	title: {
        text: '设备状态统计',
		textStyle:{
		    color:'#888888',
			fontSize:16,
			fontWeight:500,
			fontFamily:'Microsoft YaHei',
	       }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
		orient:'vertical',
		top:40,
		right:20,
        data: ['正常', '故障','离线']
    },
    grid: {
        left: 0,
        right: 20,
		top:40,
		bottom:20,
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['疏散','灭火','防火']
    },
    series: [
        {
            name: '正常',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301]
        },
        {
            name: '故障',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101]
        },
        {
            name: '离线',
            type: 'bar',
            stack: '总量',
			barMaxWidth:20,
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191]
        }
      
    ]
};
		var myChart = echarts.init(document.getElementById(containerID));   
        myChart.setOption(option);
		}
         
        function drawEnEvent(containerID){
			
		
			option = {	
				
    color:['#59c4e6','#5ab1ef', '#d87a80', '#516b91', '#d0648a','#93b7e3',  '#cbb0e3', '#bda29a','#6e7074', '#546570', '#c4ccd3'],	
    title : {
        text: '防火资产统计',
		textStyle:{
			fontSize:12,
		},
		x:'center'

    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
/*    legend: {
        x : 'center',
        y : 'bottom',
        data:['CO浓度高','通风设备故障','防火门故障','水位过高','视频故障','O2浓度低']
    },*/
  
    calculable : true,
    series : [
        {
            name: '报警资产',
            type:'pie',
            radius : [10,60],
            roseType : 'area',
            data:[
                {value:20, name:'烟感'},
                {value:22, name:'手报'},
                {value:20, name:'电气火灾监控器'},
                {value:35, name:'摄像头'},
            ]
        }
    ]
};
		var myChart = echarts.init(document.getElementById(containerID));   
        myChart.setOption(option);
		}

        function drawSecEvent(containerID){
			
		
			option = {	
				
    color:['#59c4e6','#5ab1ef', '#d87a80', '#516b91', '#d0648a','#93b7e3',  '#cbb0e3', '#bda29a','#6e7074', '#546570', '#c4ccd3'],	
    title : {
        text: '灭火资产统计',
		textStyle:{
			fontSize:12,
		},
		x:'center'

    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
/*    legend: {
        x : 'center',
        y : 'bottom',
        data:['CO浓度高','通风设备故障','防火门故障','水位过高','视频故障','O2浓度低']
    },*/
  
    calculable : true,
    series : [
        {
            name: '报警资产',
            type:'pie',
            radius : [10,60],
            roseType : 'area',
            data:[
                {value:30, name:'灭火器'},
                {value:28, name:'消防栓'},
                {value:29, name:'喷淋'},
            ]
        }
    ]
};
		var myChart = echarts.init(document.getElementById(containerID));   
        myChart.setOption(option);
		}

        function drawFirEvent(containerID){
			
		
			option = {	
				
    color:['#59c4e6','#5ab1ef', '#d87a80', '#516b91', '#d0648a','#93b7e3',  '#cbb0e3', '#bda29a','#6e7074', '#546570', '#c4ccd3'],	
    title : {
        text: '疏散资产统计',
		textStyle:{
			fontSize:12,
		},
		x:'center'

    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
/*    legend: {
        x : 'center',
        y : 'bottom',
        data:['CO浓度高','通风设备故障','防火门故障','水位过高','视频故障','O2浓度低']
    },*/
  
    calculable : true,
    series : [
        {
            name: '报警资产',
            type:'pie',
            radius : [10,60],
            roseType : 'area',
            data:[
                {value:30, name:'控制器'},
                {value:25, name:'防火门'},
                {value:20, name:'指示牌'},
            ]
        }
    ]
};
		var myChart = echarts.init(document.getElementById(containerID));   
        myChart.setOption(option);
		}

    /*
     * END CHART
     */



function InitDate(d)
{
    earthJson = d;
}