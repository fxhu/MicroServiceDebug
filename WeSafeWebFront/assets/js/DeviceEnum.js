var DeviceType = {
    Enum: [
        {
            "name": "故障",
            "val": 1
        },
        {
            "name": "销毁",
            "val": 2
        },
        {
            "name": "完好",
            "val": 3
        }],
    GetDeviceTypeTxt: function (val) {
        var obj = this.Enum.find(function (x) {
            return x.val == val;
        });
        var txt = "";
        if (obj != undefined) {
            txt = obj.name;
        }
        return txt;
    }
}