/*
多级下拉框插件
实例化：var dropdownAreas =  new LocalAreaDropDown(dropdownBtnId, callback);
初始化：dropdownAreas.init();
api:
1 dropdownAreas.selectAreaId 获取当前选中的区域id，数据类型为int
2 dropdownAreas.areas 获取当前下拉菜单区域集合,数据类型为array
*/

/*dropdownBtnId:加载下拉菜单的按钮容器，eg:<button id="patrol{{area.level}}" />，则容器id为 'patrol'
    selectChanged:下拉菜单选择完后触发的回调函数
*/
var LocalAreaDropDown = function (dropdownBtnId, selectChanged) {
    var oLocal = new Object();
    oLocal.selectAreaId = -1;
    oLocal.areas = [];
    oLocal.btnId = dropdownBtnId;
    oLocal.callback = selectChanged;
    oLocal.maxtype = -1;
    oLocal.init = function () {
        this.LoadArea("", 4);//加载全部园区
    };
    oLocal.LoadArea = function (parentId, level, fromclick, btnname) {
        if (!parentId) { parentId = ""; }
        //修改按钮的文本
        if (fromclick) {
            $('#' + this.btnId + (level + 1)).html(btnname + ' <span class="caret"></span>')
        }

        //加载下拉内容

        $.ajax({
                url: abp.appPath + "FireMan/GetAllKeyOfficeArea?ParentId=" + parentId,
                type: "get",
                dataType: "json",
                success: function (data) {
                    if (!isNaN(parseInt(parentId))) {
                        oLocal.selectAreaId = parentId;
                    }
                    else {
                        oLocal.selectAreaId = -1;
                    }
                    var maxtype = oLocal.maxtype;
                    if (maxtype == -1) {
                        $.each(data, function () {
                            if (this.areaType > maxtype) maxtype = this.areaType;
                        });
                        level = maxtype;
                        oLocal.maxtype = maxtype;
                    }
                    //把子级下拉框干掉
                    if (oLocal.areas != null && oLocal.areas[maxtype - level] != null) {
                        oLocal.areas.splice(maxtype - level, level);
                    }
                    //有子级，加载子级
                    if (data.length > 0) {
                        RenderAreaDropDown(data, level);
                        if (oLocal.callback) {
                            oLocal.callback();
                        }
                    }
                    else if (fromclick) {
                        //没有子级的话加载当前
                        $.ajax({
                            url: abp.appPath + "FireMan/GetAllKeyOfficeArea?Id=" + parentId,
                            type: "get",
                            dataType: "json",
                            success: function (result) {
                                if (oLocal.callback) {
                                    oLocal.callback();
                                }
                            },
                            error: function (res) {
                                console.log(res);
                            }
                        });
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });
        
        function RenderAreaDropDown(data, level, showClear) {
            var info = oLocal.areas;
            var index = oLocal.maxtype - level;
            if (info[index] == null) {
                var areainfo = { level: 0, levelName: '', pid: 0, childAreas: [], btnName: '' };
                info.push(areainfo);
            }
            info[index].btnName = GetAreaTypeName(level);
            for (var i = 0; i < data.length; i++) {
                var careainfo = { id: 0, nextlevel: 0, displayName: '' };
                info[index].childAreas.push(careainfo);
                info[index].childAreas[i].id = data[i].id;
                info[index].childAreas[i].nextlevel = level - 1;
                info[index].childAreas[i].displayName = data[i].displayName;
            }
            info[index].pid = data[0].parentId;
            info[index].levelName = GetAreaTypeName(level);
            info[index].level = level;
            oLocal.areas = info;
        }

        function GetAreaTypeName(typeId) {
            switch (parseInt(typeId, 10)) {
                case 4: { return "全部园区"; }
                case 3: { return "全部建筑"; }
                case 2: { return "全部楼层"; }
                case 1: { return "全部科室"; }
                default: { return ""; }
            }
        }
    }
    return oLocal;
}