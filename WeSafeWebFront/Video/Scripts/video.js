$(document).ready(function () {
    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    
    var oTool = new Tool();
    oTool.Init();    
});

var Tool = function () {
    var oTool = new Object();
    oTool.Init = function () {
        oTool.BindSelect();
        oTool.BindMulSelect();
    };
    oTool.BindSelect = function () {
        $("#selView").change(function () {
            var val = $(this).val();
            switch (val) {
                case "1": {
                    $("#videolist").find("div").removeClass();
                    $("#videolist").find("div").addClass("col-md-12");
                }; break;
                case "2": {
                    $("#videolist").find("div").removeClass();
                    $("#videolist").find("div").addClass("col-md-6");
                }; break;
                case "3": {
                    $("#videolist").find("div").removeClass();
                    $("#videolist").find("div").addClass("col-md-3");
                }; break;
                default: break;
            }
        });
    };
    oTool.BindMulSelect = function () {
        var d = [
            {
                "val": "1",
                "name": "武汉园区",
                "s": [
                    {
                    "val": "1",
                    "name": "烽火科技大楼",
                    "s": [
                        {
                            "val": "1",
                            "name":"一楼"
                        },
                        {
                            "val": "2",
                            "name": "二楼"
                        },
                        {
                            "val": "3",
                            "name": "三楼"
                        },
                        {
                            "val": "4",
                            "name": "四楼"
                        },
                        {
                            "val": "5",
                            "name": "五楼"
                        }
                    ]
                    },{
                        "val": "2",
                        "name": "烽火未来科技楼",
                        "s": [
                            {
                                "val": "1",
                                "name": "一楼"
                            },
                            {
                                "val": "2",
                                "name": "二楼"
                            },
                            {
                                "val": "3",
                                "name": "三楼"
                            },
                            {
                                "val": "4",
                                "name": "四楼"
                            },
                            {
                                "val": "5",
                                "name": "五楼"
                            }
                        ]
                    }]
            },
            {
                "val": "2",
                "name": "西安园区",
                "s": [
                    {
                        "val": "3",
                        "name": "西安烽火科技大楼",
                        "s": [
                            {
                                "val": "1",
                                "name": "一楼"
                            },
                            {
                                "val": "2",
                                "name": "二楼"
                            },
                            {
                                "val": "3",
                                "name": "三楼"
                            },
                            {
                                "val": "4",
                                "name": "四楼"
                            },
                            {
                                "val": "5",
                                "name": "五楼"
                            }
                        ]
                    }, {
                        "val": "4",
                        "name": "西安烽火未来科技楼",
                        "s": [
                            {
                                "val": "1",
                                "name": "一楼"
                            },
                            {
                                "val": "2",
                                "name": "二楼"
                            },
                            {
                                "val": "3",
                                "name": "三楼"
                            },
                            {
                                "val": "4",
                                "name": "四楼"
                            },
                            {
                                "val": "5",
                                "name": "五楼"
                            }
                        ]
                    }]
            }
        ]
        $('#tool').cxSelect({
            selects: ["park", "build", "floor"],
            required: true,
            jsonValue: 'val',
            jsonName: "name",
            data: d
        });

        $('#floor').change(function () {
            var parkId = $("#park").val();
            var buildId = $("#build").val();
            var floorId = $("#floor").val();
            alert(parkId + " " + buildId + " " + floorId);
        });
    };
    return oTool;
}