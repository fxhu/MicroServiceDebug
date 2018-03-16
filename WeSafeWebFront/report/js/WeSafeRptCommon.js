var RptCommon = {
    Host: reportHost,
    GetYears: function () {
        var startYear = 2015;
        var endYear = new Date().getFullYear();
        var years = [];
        for (var i = endYear; i >= startYear; i--) {
            years.push(i);
        }
        return years;
    },
    formatData: function (model) {
        model = model.toString();
        var m = model.substring(0, 4) + '-' + model.substring(4, 6) + '-' + model.substring(6, 8);
        return m;
    },
    InitialSlide: function (array,ci) {
        var myobj = { current: ci, data: array };
        return myobj;
    },
    getNextIndex: function (slide) {
        slide.current++;

        if (slide.current > (slide.data.length - 1))
        {
            slide.current = 0;
        }
           
        return slide.current;
    },
    GetQuery: function() {

        var url = window.location.search; 
        var theRequest = new Object();

        if (url.indexOf("?") != -1) {

            var str = url.substr(1);

            strs = str.split("&");

            for (var i = 0; i < strs.length; i++) {

                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

            }

        }

        return theRequest;
    },
    GetAreaId: function () {
        var r = this.GetQuery();

        var tar = r["areaId"];

        if (tar)
            return tar;
        else
            alert("areaId为必须参数");
    },
    ApplyAreaId: function (areaId) {
        var rptlinklist = document.getElementsByName("detailrptlink");
        rptlinklist.forEach(function (item, idx) {
            item.href = (item.href + '?areaId=' + areaId);
        });
    },
    ValidateYear: function (year1,year2) {
        if (year1 > year2) { }
        else
            alert("年份1必须大于年份2");
    }
};