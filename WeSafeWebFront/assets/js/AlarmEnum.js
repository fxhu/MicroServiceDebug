var AlarmType = {
    Enum: [
        {
            "name": "火警",
            "val": 1
        },
        {
            "name": "故障",
            "val": 2
        },
        {
            "name": "误报",
            "val": 3
        },
        {
            "name": "火警未处理",
            "val": 4
        },
        {
            "name": "火警已处理",
            "val": 5
        },
        {
            "name": "故障未处理",
            "val": 6
        },
        {
            "name": "故障已处理",
            "val": 7
        }],
    GetAlarmTypeTxt: function (val) {
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