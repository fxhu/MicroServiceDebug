var HiddenDanger = {
    Enum: [{
        name: "待审核",
        val: "1"
    }, {
        name: "待指派",
        val: "2"
    }, {
        name: "待整改",
        val: "3"
    }, {
        name: "待复查",
        val: "4"
    }, {
        name: "复查未通过",
        val: "5"
    }, {
        name: "已闭环",
        val: "6"
    }, {
        name: "已逾期",
        val: "7"
    }],
    GetHiddenDangerTxt: function (hiddenVal) {
        var obj = this.Enum.find(function (x) {
            return x.val == hiddenVal;
        });
        var txt = "";
        if (obj != undefined) {
            txt = obj.name;
        }
        return txt;
    }
}