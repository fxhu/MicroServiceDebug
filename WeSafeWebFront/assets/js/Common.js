var Common = {
    PageSize: 10,//每页显示数量
    //PageList: [10, 25, 50, 100],//可选择的每页显示数量集合
    PageList: [],//不显示可供选择的记录条数选择项
    VideoHost: "ws://172.16.99.40:2808/",
    MaxImageSize: 512000,
    getQueryString: function (name)//根据参数获取url参数值
    {
        var reg = new RegExp('[?|&]' + name.toLocaleLowerCase() + '=([^&;]+?)(&|#|;|$)', "ig");

        var r = (reg.exec(window.location.href) || [, ""])[1].replace('/\+/g', '%20');

        r = decodeURIComponent(r);
        return r;
    },
    api: {
        "GetDeviceList": "http://172.16.93.37:8086/API/GetDeviceList.aspx",
        "GetExamineSorce": "http://172.16.93.37:8086/API/GetExamineSorce.aspx"
    },
    AlarmEventType: [
        {
            "name": "故障",
            "val": 1
        },
        {
            "name": "火警",
            "val": 2
        },
        {
            "name": "误报",
            "val": 3
        }
    ],
    GetScoreLevel: function (score) {//获取安全评分等级
        var level = 1;
        if (score >= 70 && score < 80) {
            level = 2;
        }
        else if (score >= 80 && score < 90) {
            level = 3;
        }
        else if (score >= 90 && score < 100) {
            level = 4;
        }
        else if (score >= 100) {
            level = 5;
        }
        return level;
    },
    GetScoreColor: function (score) {//根据得分获取当前颜色等级
        var level = Common.GetScoreLevel(score);
        var color = "#2196F3";//默认蓝色
        switch (level) {
            case 1: color = "#F44336"; break;//红色
            case 2: color = "#FF9800"; break;//橙色
            case 3: color = "#8BC34A"; break;//浅绿色
            case 4: color = "#4CAF50"; break;//绿色
            default: break;
        }
        return color;
    },
    GetAlarmEventTypes: function () {
        //创建报警键值对
        var eventTypes = {
            "namesDic": {},//报警类型名称为key的键值对，eg: eventTypes.namesDic["火警"] 结果：2
            "valsDic": {}  //报警类型值为key的键值对,eg: eventTypes.namesDic[1] 结果：故障
        };
        $.each(this.AlarmEventType, function (idx, alarmItem) {
            eventTypes.namesDic[alarmItem.name] = alarmItem.val;
            eventTypes.valsDic[alarmItem.val] = alarmItem.name;
        });
        return eventTypes;
    },
    SetDays: function (date, days) {
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + p(month) + '-' + p(day);
    },
    SetMonth: function (date, month) {
        date.setMonth(date.getMonth() + month);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + p(month) + '-' + p(day);
    },
    formatDataTime: function (model, formatStr) {//格式化数据，默认格式化为yyyy-MM-dd HH:mm:ss
        if (model == null) return "";
        var t = new Date(model);
        if (isNaN(t))//兼容手机端，IE浏览器
        {
            t = new Date(Date.parse(model.replace(/-/g, "/")));
        }
        if (!formatStr) {
            formatStr = "yyyy-MM-dd HH:mm:ss";
        }
        var o = {
            "yyyy": t.getFullYear(), //年 
            "MM": p(t.getMonth() + 1), //月 
            "dd": p(t.getDate()), //日
            "HH": p(t.getHours()), //小时
            "mm": p(t.getMinutes()), //分钟
            "ss": p(t.getSeconds())//秒
        };
        for (var k in o) {
            formatStr = formatStr.replace(k, o[k]);
        }
        return formatStr;
    },
    dealImage: function (fileobj,obj, filename, callback) {
        var img = new Image();
        var format = "";
        if (typeof (fileobj) == "string") {
            img.src = path;
            var index1 = fileobj.lastIndexOf(".");
            var index2 = fileobj.length;
            var suffix = fileobj.substring(index1 + 1, index2);//后缀名
            format = "image/" + suffix;
        } else {
            if (fileobj.size <= Common.MaxImageSize) {
                callback(fileobj, '')
                return;
            }
            var num = Common.MaxImageSize / fileobj.size;
            obj.quality =Math.floor(num*100)/100;// num.toFixed(3);
            if (obj.quality < 0.01) obj.quality = 0.01;
            img.src = window.URL.createObjectURL(fileobj);
            format = fileobj.type;
        }
        img.onload = function () {
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.7;  // 默认图片质量为0.7
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            var blobdata = convertImgDataToBlob(base64, format);
            callback(blobdata, filename);
        }
    }
};
function convertImgDataToBlob(base64Data, format) {
    //var format = "image/jpeg";  
    var base64 = base64Data;
    var code = window.atob(base64.split(",")[1]);
    var aBuffer = new window.ArrayBuffer(code.length);
    var uBuffer = new window.Uint8Array(aBuffer);
    for (var i = 0; i < code.length; i++) {
        uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    var blob = null;
    try {
        blob = new Blob([uBuffer], { type: format });
    }
    catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new window.BlobBuilder();
            bb.append(uBuffer.buffer);
            blob = bb.getBlob("image/jpeg");

        }
        else if (e.name == "InvalidStateError") {
            blob = new Blob([aBuffer], { type: format });
        }
        else {

        }
    }
    //alert(blob.size);  
    return blob;

}
function p(s) {
    return s < 10 ? '0' + s : s;
}

Date.prototype.Format = function (fmt) {
    if (!CheckDateTime(this)) return "";
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//功能介绍：检查对象是否为合法的日期时间格式
function CheckDateTime(o) {
    if (typeof (o) === "undefined") {
        return false;
    }
    if (!o.getDate) {
        o = new Date(o);
    }
    var d = o.getFullYear();
    if (isNaN(d) || d < 1753) {
        return false;
    }
    return true;
}

function formatDate(str) {
    if (!str || str.length < 8) return "";
    var d = new Date(str).getFullYear();
    if (isNaN(d)) return "";
    var y = str.substring(0, 4);
    if (y === "0000" || y === "0001") return "";
    str = str.replace(/T/g, ' ').replace(/Z/g, '');
    return str;
}
