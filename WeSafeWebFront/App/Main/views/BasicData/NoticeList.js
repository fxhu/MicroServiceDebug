(function () {
    angular.module('app').controller('app.views.BasicData.NoticeList', [
        '$rootScope','$scope', '$timeout', '$uibModal', 'abp.services.app.notice',
        function ($rootScope,$scope, $timeout, $uibModal, noticeService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            vm.haveRead = 0;

            vm.unRead=function(){
                if(vm.haveRead==1)
                {
                    vm.haveRead = 0;
                    this.search(true);
                }
            }

            vm.IsRead=function(){
                if(vm.haveRead==0)
                {
                    vm.haveRead = 1;
                    this.search(true);
                }
            }

            

            $timeout(function () {
                //加载数据
                vm.noticeId = Common.getQueryString("noticeId");
                if(vm.noticeId == -1 || vm.noticeId == null || vm.noticeId == "")
                {
                    vm.haveRead = 1;
                    vm.unRead();
                }
                else
                {
                    vm.haveRead = 0;
                    $.ajax({
                            url: abp.appPath +_urlMarkRead,
                            type: 'POST',
                            data: { id: vm.noticeId },
                            success: function (res) {
                                var result = res.result;
                                if (result.success) {
                                    document.querySelector('#isread').click();

                                   // vm.IsRead();
                            }
                        }});
                    
                }
             });

            vm.serchinfo = null;
            //vm.State = [{ id: 0, state: "全部" }, { id: 1, state: "已读" }, { id: 2, state: "未读" }];
            var _urlGetAll = 'Notice/GetNoticeByCurUserInfo/isRead=' + vm.haveRead ;
            var _urlMarkRead = 'Notice/MarkRead';
            var _urlDelete = 'Notice/Delete';
            var _table = $('#tb_notice');
            var _idx = -1;

            _table.bootstrapTable({
                //url: abp.appPath + _urlGetAll,
                method: 'get',
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: true,                     //是否启用排序
                //sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                      //初始化加载第一页，默认第一页
                pageSize: Common.PageSize,          //每页的记录行数（*）
                pageList: Common.PageList,          //可供选择的每页的行数（*）
                search: false,                      //是否显示表格搜索
                strictSearch: false,
                showColumns: false,                 //是否显示所有的列
                showRefresh: false,                 //是否显示刷新按钮
                clickToSelect: false,               //是否启用点击选中行
                showToggle: false,                  //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                  //是否显示父子表
                idField: "id",
                //responseHandler: function (res) {
                //    return res.result;
                //},
                onLoadSuccess: function () {
                    $(".markread").click(function () {
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        else {
                            markRead(item);
                        }
                    });
                    $(".unread").click(function () {
                        markRead();
                    });
                    $(".delete").click(function () {
                        var idx = $(this).attr("val");
                        var item = _table.bootstrapTable('getData')[idx];
                        if (item == null) {
                            return;
                        }
                        abp.message.confirm(
                            "删除此通知?",
                            function (result) {
                                if (result) {
                                    $.ajax({
                                        url: abp.appPath + _urlDelete,
                                        type: 'POST',
                                        data: { id: item.id },
                                        success: function (result) {
                                            if (result.success) {
                                                abp.notify.info("已删除");
                                                refreshTable();
                                            } else {
                                                abp.notify.info(result.msg);
                                            }
                                        },
                                        error: function (err) {
                                            alert(err);
                                        }
                                    });
                                }
                            });
                    });
                },
                columns: [
                    {
                        field: 'content',
                        title: '通知名称',
                        sortable: true,
                        width:"30%",
                        align:"center",
                        valign:"middle",
                    }, {
                        field: 'noticeTypeName',
                        title: '通知类型',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                    }, {
                        field: 'dutyUserName',
                        title: '责任人',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                    }, {
                        field: 'creationTime',
                        title: '接收时间',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            var date =  val.replace(/T/,' ');
                            return date;
                        }
                    }, {
                        field: 'readTime',
                        title: '查看时间',
                        sortable: true,
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            var date = parseInt(val.replace(/T/,' ').substring(0,4));
                            if (date <= 1) {
                                return '<span style="color:#3598dc;">消息未查看</span>';
                            }
                            else {
                                return val.replace(/T/,' ');
                            }
                        }
                    }, {
                        field: 'url',
                        title: '操作',
                        width:"14%",
                        align:"center",
                        valign:"middle",
                        formatter: function (val, row, index) {
                            return '<a  href="javascript:void(0)" style="box-shadow:none;" class="btn btn-sm  markread" val=' + index + '><i class="iconfont icon-chakan1" style="font-size:20px;"></i></a>';
                            //    <a href="javascript:;" class="btn btn-outline btn-circle btn-sm blue delete" val=' + index + '><i class="fa fa-trash-o"></i>删除</a>
                        }
                        //formatter: function (val, row, index) {
                        //    return '<a  href="javascript:;" class="btn btn-outline btn-circle btn-sm blue markread" val=' + index
                        //        + '><i class="fa fa-envelope-open-o"></i>已读</a><a href="javascript:;" class="btn btn-outline btn-circle  btn-sm blue delete" val=' + index + '><i class="fa fa-trash-o"></i>删除</a>';
                        //}
                    }]
            });
            /**************************************时间格式化处理************************************/
            vm.search = function (reSearch) {
                var pagenum = $('#tb_notice').bootstrapTable('getOptions').pageNumber;
                var strurl = vm.serchinfo == null ? 'Notice/GetNoticeByCurUserInfo/': 'Notice/GetNoticeByCurUserInfo/?searchinfo=' + vm.serchinfo;
                var opt = reSearch ?
                    {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            pageNumber: pagenum,
                            isRead:vm.haveRead
                        }
                    } : {
                        url: abp.appPath + strurl,
                        silent: true,
                        query: {
                            type: 1,
                            level: 2,
                            isRead:vm.haveRead
                        }
                    };
                $('#tb_notice').bootstrapTable("refresh", opt);
                if (reSearch) {
                    $('#tb_notice').bootstrapTable("refreshOptions", { pageNumber: pagenum });
                }
            }
            vm.reset = function () {
                this.serchinfo = null;
                this.search(true);
            };

            
            /******** help methods ********/

            //refresh notice table
            function refreshTable() {
                var opt = {
                    url: abp.appPath +_urlGetAll,
                    silent: true,
                    query: {
                        type: 1,
                        level: 2,
                        isRead:vm.haveRead
                    }
                };
                _table.bootstrapTable("refresh", opt);
            }
            function CheckIsRectify(tbid) {
                noticeService.checkRiskStatus({ Id: tbid }).then(function (result) {
                    if (result.data == "error") {
                        abp.message.error("找不到此条记录！");
                    } else {
                        window.location.href = result.data + "?troubleid=" + tbid;
                    }
                });
            }
            //mark a notice as being read
            function markRead(item) {
                $.ajax({
                    url:abp.appPath + 'Notice/GetNoticeConfigInfomation/',
                    type:'POST',
                    data:{refType:item.refType},
                    success:function(res){
                        
                        if(res.success)
                        {
                            var readTime = parseInt(item.readTime.replace(/T/,'').substring(0,4));
                            //当前消息责任人为登录用户本人 且消息未读
                            if (abp.session.userId == item.dutyUserId && readTime <= 1) {
                                //标记消息为已读
                                $.ajax({
                                    url: abp.appPath +_urlMarkRead,
                                    type: 'POST',
                                    data: { id: item.id },
                                    success: function (res) {
                                        var result = res.result;
                                        if (result.success) {
                                            refreshTable();
                                            //当前用户未读通知减1
                                            $rootScope.$emit("noticeChange");
                                        } else {
                                            abp.notify.info(result.msg);
                                        }
                                    }
                                });
                            }

                            var result = res.result;
                            if(result.viewRedirect == "" || result == null)
                            {
                                window.location.href = item.url;
                            }
                            else
                            {
                                window.location.href =window.location.pathname+ "#!/NoticeView?noticeId="+item.id+"&url=" + base64encode("http://"+result.hostName + item.url) ;
                            }
                            return;
                        }
                        else
                        {
                            abp.notify.info(result.msg);
                        }
                    }
                });
                
            }

            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            
            //客户端Base64编码
            function base64encode(str) {
                var out, i, len;
                var c1, c2, c3;

                len = str.length;
                i = 0;
                out = "";
                while(i < len) {
             c1 = str.charCodeAt(i++) & 0xff;
             if(i == len)
             {
                 out += base64EncodeChars.charAt(c1 >> 2);
                 out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                 out += "==";
                 break;
             }
             c2 = str.charCodeAt(i++);
             if(i == len)
             {
                 out += base64EncodeChars.charAt(c1 >> 2);
                 out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                 out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                 out += "=";
                 break;
             }
             c3 = str.charCodeAt(i++);
             out += base64EncodeChars.charAt(c1 >> 2);
             out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
             out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
             out += base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            }

        }
    ]);
})();