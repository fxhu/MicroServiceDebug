//列表
(function ($) {
    $.fn.extend({
        datagrid: function(option) {
            var $this = $(this);
            var _columns = [];
            var _url, _method, _param;
            //设置
            if (option != null) {
                $this.data("option", option);
            }
            //刷新
            $this.refresh = function() {
                $this.loadData($this.data("url"), $this.data("method"), $this.data("param"));
                return $this;
            }
            //加载数据
            $this.loadData = function(url, method, param) {
                $this.data("url", url);
                $this.data("method", method);
                $this.data("param", param);
                //列
                var _columns = [];
                var option = $this.data("option");
                if (option && option.columns) {
                    _columns = option.columns;
                }
                var rowArray = [];
                if (!option.hideHeader)
                {
                    var colsHtml = ["<tr class='info'><th width='20'></td>"];
                    for (var j = 0; j < _columns.length; j++) {
                        colsHtml.push("<th>");
                        colsHtml.push(_columns[j].name);
                        colsHtml.push("</th>");
                    }
                    colsHtml.push("</tr>");
                    rowArray.push($(colsHtml.join("")));
                }
                
                //行
                if (!method) {
                    method = "get";
                }
                if (!param) {
                    param = {};
                }

                $.ajax({
                    url: url,
                    type: method,
                    data: param,
                    success: function(data) {
                        for (var i = 0; i < data.length; i++) {
                            var rowHtml = [];
                            rowHtml.push("<tr><td width='20'><input type='checkbox'/></td>");
                            for (var j = 0; j < _columns.length; j++) {
                                rowHtml.push("<td>");
                                if (_columns[j].formatter) {
                                    rowHtml.push(_columns[j].formatter(data[i][_columns[j].field]));
                                } else {
                                    rowHtml.push(data[i][_columns[j].field]);
                                }
                                rowHtml.push("</td>");
                            }
                            rowHtml.push("</tr>");
                            var jobj = $(rowHtml.join(""));
                            jobj.data("tag", data[i]);
                            rowArray.push(jobj);
                        }
                        $this.html("");
                        $this.append(rowArray);
                        //单击事件
                        $this.find("tr").click(function() {
                            if ($(this).find("th").length > 0) {
                                return;
                            }
                            if ($this.find(".danger").find("input").length > 0) {
                                $this.find(".danger").find("input")[0].checked = false;
                            }
                            $this.find(".danger").removeClass("danger");
                            $(this).addClass("danger");
                            $(this).find("input")[0].checked = true;
                            //单击事件
                            if (typeof (option.click) == "function") {
                                option.click();
                            }
                        });
                        //双击事件
                        $this.find("tr").dblclick(function() {
                            if ($(this).find("th").length > 0) {
                                return;
                            }
                            $this.find(".danger").removeClass("danger");
                            $(this).addClass("danger");
                            //双击事件
                            if (typeof (option.dblclick) == "function") {
                                option.dblclick();
                            }
                        });
                        return $this;
                    }
                });

            }
            $this.getSelected = function() {
                return $this.find(".danger").map(function() { return $(this).data("tag"); }).get();
            }
            return $this;
        }
    });
})(jQuery);
//菜单
(function ($) {
    $.fn.extend({
        menu: function(option) {
            var $this = $(this);
            var _items = [];
            //列定义
            if (option.items) {
                _items = option.items;
            }
            var menuHtml = [];
            for (var i = 0; i < _items.length; i++) {
                menuHtml.push('<button class="btn ' +
                    _items[i].css +
                    '" onclick="' +
                    _items[i].action +
                    '">' +
                    _items[i].name +
                    '</button>');
            }
            $this.html(menuHtml.join(""));
            return $this;
        }
    });
})(jQuery);
//表单
(function ($) {
    $.fn.extend({
        form: function(option) {
            var $this = $(this);

            function _buildCell(cell) {
                var html = '<div class="form-group">' +
                    '<label for="' +
                    cell.name +
                    '" class="col-xs-3 control-label">' +
                    cell.title +
                    '</label>' +
                    '<div class="col-xs-9">' +
                    '   <input type="' +
                    cell.type +
                    '" ' +
                    (cell.readonly ? "readonly" : "") +
                    ' field="' +
                    cell.field +
                    '" class="form-control" id="' +
                    cell.name +
                    '" name="' +
                    cell.name +
                    '" placeholder="' +
                    cell.title +
                    '">' +
                    '</div>' +
                    '</div>';
                return html;
            }

            function _buildHidden(cell) {
                return '<input type="hidden" id="' + cell.name + '" name="' + cell.name + '"/>';
            }

            function _buildSelect(cell) {
                var html = '<div class="form-group">' +
                    '<label for="' +
                    cell.name +
                    '" class="col-xs-3 control-label">' +
                    cell.title +
                    '</label>' +
                    '<div class="col-xs-9">';
                var obj = eval('(' + cell.source + ')');
                var shtml = '<div class="dropdown"><select field="' + cell.field +
                    '" name="' +cell.name +'" class="form-control">';
                for (var i = 0; i < obj.length; i++) {
                    shtml += '<option value="' + obj[i].Value + '">' + obj[i].Text + '</option>';
                }
                shtml += '</select></div>';
                html += shtml +
                    '</div>' +
                    '</div>';
                return html;
            }

            //初始化
            function init(option) {
                var html = [];
                var fields = option.items;
                if (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].type == "hidden") {
                            html.push(_buildHidden(fields[i]));
                        } else if (fields[i].type == "select") {
                            html.push(_buildSelect(fields[i]));
                        } else {
                            html.push(_buildCell(fields[i]));
                        }
                    }
                }
                $this.html(html.join(""));
            }

            //加载数据
            function loadData(data) {
                $(".form-control").each(function() {
                    var $this = $(this);
                    $(this).val($(data).attr($this.attr("field")));
                });
            }

            //初始化
            if (option) {
                init(option);
            }
            //显示
            $this.load = function(param, callback) {
                if (typeof (param) == "object") {
                    loadData(param);
                    if (typeof (callback) == "function") {
                        callback();
                    }
                } else {
                    $.ajax({
                        type: "get",
                        url: param,
                        success: function(data) {
                            loadData(data);
                            if (typeof (callback) == "function") {
                                callback();
                            }
                        }
                    });

                }
                return $this;
            }
            $this.save = function (url) {
                var result;
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: url,
                    data: $this.serialize(),
                    async: false,
                    error: function(request) {
                        result = request;
                    },
                    success: function(data) {
                        result = data;
                    }
                });
                return result;
            }
            return $this;
        }
    });
})(jQuery);