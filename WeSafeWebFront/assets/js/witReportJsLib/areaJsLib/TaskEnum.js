var TaskType = {
    Enum: [
        {
            "name": "已逾期",
            "val": 1
        },
        {
            "name": "未开始",
            "val": 2
        },
        {
            "name": "已完成",
            "val": 3
        },
        {
            "name": "进行中",
            "val": 4
        }],
    GetTaskTypeTxt: function (val) {
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