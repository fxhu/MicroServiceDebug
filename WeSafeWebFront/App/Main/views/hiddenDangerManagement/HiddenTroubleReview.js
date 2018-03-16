(function () {
	var controllerId = 'app.views.HiddenTroubleReview';
	angular.module('app').controller(controllerId, [
		'$scope', '$uibModal', '$state',
		function ($scope, $uibModal, $state) {
			var vm = this;
			vm.myclass = 'hasPermission';


			var pageindex = getURLParam('pageindex');

			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

			}
			//$state.go("HiddenTroubleReview");
			window.location.href = "/default.html#!/HiddenTroubleReview";
			pageindex = pageindex == null ? 1 : parseInt(pageindex);
			vm.serchinfo = null;
			$('#tb_review').bootstrapTable({
				url: abp.appPath + 'HiddenTrouble/GetAllReviewTroubles', //请求后台的URL（*）
				method: 'get',
				striped: true, //是否显示行间隔色
				cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination: true, //是否显示分页（*）
				sortable: true, //是否启用排序
				silentSort: false,
				//sortOrder: "asc",                   //排序方式
				sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
				pageNumber: pageindex, //初始化加载第一页，默认第一页
				pageSize: Common.PageSize, //每页的记录行数（*）
				//pageList: Common.PageList,        //可供选择的每页的行数（*）
				search: false, //是否显示表格搜索
				strictSearch: false,
				showColumns: false, //是否显示所有的列
				showRefresh: false, //是否显示刷新按钮
				clickToSelect: false, //是否启用点击选中行
				showToggle: false, //是否显示详细视图和列表视图的切换按钮
				cardView: false, //是否显示详细视图
				detailView: false, //是否显示父子表
				idField: "id",
				onLoadSuccess: function () {
					$(".check").click(function () {
						var idx = $(this).attr("val");
						var tb = $("#tb_review").bootstrapTable('getData')[idx];
						if (tb == null) {
							return;
						}
						var pageindex = $('#tb_review').bootstrapTable('getOptions').pageNumber;
						window.location.href = "/default.html#!/LookHiddenTrouble?backpage=HiddenTroubleReview&RiskStatus=" + tb.hiddenTroubleStatus + "&Id=" + tb.id + "&pageindex=" + pageindex;
						//var modalInstance = $uibModal.open({
						//    templateUrl: '/App/Main/views/hiddenDangerManagement/AddOrLookHiddenTrouble.cshtml',
						//    controller: 'app.views.hiddenTrouble.addOrLookHiddenTrouble as vm',
						//    backdrop: 'static',
						//    size: 'md',
						//    resolve: {
						//        item: function () {
						//            return tb;
						//        }
						//    }
						//});
						//modalInstance.result.then(function () {

						//});
					});
					$(".review").click(function () {
						var idx = $(this).attr("val");
						var tb = $("#tb_review").bootstrapTable('getData')[idx];
						if (tb == null) {
							return;
						}
						if (tb.reviewUserId != abp.session.userId) return;
						var pageindex = $('#tb_review').bootstrapTable('getOptions').pageNumber;
						window.location.href = "/default.html#!/ReviewTrouble?backpage=HiddenTroubleReview&RiskStatus=" + tb.hiddenTroubleStatus + "&Id=" + tb.id + "&pageindex=" + pageindex;
						//var modalInstance = $uibModal.open({
						//    templateUrl: '/App/Main/views/hiddenDangerManagement/ReviewTrouble.cshtml',
						//    controller: 'app.views.hiddenTrouble.reviewTrouble as vm',
						//    backdrop: 'static',
						//    size: 'md',
						//    resolve: {
						//        item: function () {
						//            return tb;
						//        }
						//    }
						//});
						//modalInstance.result.then(function () {
						//    vm.search(true);
						//});
					});
					$(".checkfiles").click(function () {
						var idx = $(this).attr("val");
						var tb = $("#tb_rectifys").bootstrapTable('getData')[idx];
						if (tb == null) {
							return;
						}
						var modalInstance = $uibModal.open({
							templateUrl: '/App/Main/views/hiddenDangerManagement/CheckUpLoadFile.html',
							controller: 'app.views.hiddenTrouble.checkFile as vm',
							backdrop: 'static',
							size: 'md',
							resolve: {
								item: function () {
									return tb;
								}
							}
						});

						modalInstance.result.then(function () {

						});
					});
				},
				rowStyle: function (row, index) {
					var classes = ['bgGray', 'bgWhite'];

					if (index % 2 === 0) {
						return {
							classes: classes[0]
						};
					} else {
						return {
							classes: classes[1]
						};
					}
				},
				columns: [
					//{
					//checkbox: true,
					//title: ''
					//},
					{
						field: 'hiddenTroubleContent',
						title: '隐患描述',
						align: 'center',
						valign: "middle",
						width: '35%',
						sortable: true
					}, {
						field: 'areaName',
						align: 'center',
						valign: "middle",
						title: '隐患场所',
						sortable: true
					},
					{
						field: 'reportUserName',
						title: '上报人',
						align: 'center',
						valign: "middle",
						sortable: true
					},
					{
						field: 'chargeUserName',
						title: '负责人',
						align: 'center',
						valign: "middle",
						sortable: true
					}, {
						field: 'hiddenTroubleFindTimeStr',
						title: '隐患发现时间',
						align: 'center',
						valign: "middle",
						sortable: true
					}, {
						field: 'rectifyEndTimeStr',
						title: '整改期限',
						align: 'center',
						valign: "middle",
						sortable: true,
						formatter: function (val, row, index) {
							if (row.hiddenTroubleStatus != 7 && row.hiddenTroubleStatus != 8 && row.isOverDue) {
								return "<label  style=\"padding-bottom:0px;color:red;\">" + val + "</label>";
							} else {
								return "<label  style=\"padding-bottom:0px;\">" + val + "</label>";
							}
						}
					}, {
						field: 'hiddenTroubleType',
						title: '隐患级别',
						align: 'center',
						valign: "middle",
						formatter: function (val) {
							if (val == 0) {
								return "<label  style=\"padding-bottom:0px\">一般隐患</label>";
							} else {
								return "<label  style=\"padding-bottom:0px\">重大隐患</label>";
							}
						},
						sortable: true
					}, {
						field: 'hiddenTroubleStatus',
						title: '隐患状态',
						align: 'center',
						valign: "middle",
						formatter: function (val) {
							//if (val==0) {
							//    return "<label class=\"label label-success\" style=\"padding-bottom:0px\">已闭环</label>";
							//}
							//else {
							//    return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待整改</label>";
							//}
							switch (val) {
								case 0:
									return "<label class=\"label label-success\" style=\"padding-bottom:0px\">已闭环</label>";
								case 1:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待整改</label>";
								case 2:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">未提交</label>";
								case 3:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">待复查</label>";
								case 4:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">复查未通过</label>";
								case 5:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">已撤销</label>";
								case 6:
									return "<label class=\"label label-danger\" style=\"padding-bottom:0px\">已逾期</label>";
							}
						},
						sortable: true
					}, {
						title: '操作',
						width:'8%',
						align: 'center',
						valign: "middle",
						formatter: function (val, row, index) {
							var dis = row.reviewUserId == abp.session.userId;
							dis = dis ? "" : "disabled";
							/* return '<a  href="javascript:;" ' + dis + ' class="btn btn-sm blue review" val=' + index +
								'><i class="fa fa-check-circle"></i>复查</a>' + '<a  href="javascript:;" class="btn btn-sm blue check" val=' + index +
								'><i class="fa fa-book"></i>查看</a>'; */
							return '<a  href="javascript:;" ' + dis + ' class="review" val=' + index +
								'><i class="iconfont icon-tongyijiancha"></i></a>' + '<a  href="javascript:;" class="check" val=' + index +
								'><i class="iconfont icon-chakan1"></i></a>';
						}
					}
				]
			});
			vm.search = function (reSerch) {
				var pagenum = $('#tb_review').bootstrapTable('getOptions').pageNumber;
				var strurl = 'HiddenTrouble/GetAllReviewTroubles/';
				strurl = strurl + "?status=" + vm.status + "&searchinfo=" + (vm.serchinfo == null ? "" : vm.serchinfo);
				var opt = reSerch ? {
					url: abp.appPath + strurl,
					silent: true,
					query: {
						type: 1,
						level: 2,
						pageNumber: pagenum
					}
				} : {
					url: abp.appPath + strurl,
					silent: true,
					query: {
						type: 1,
						level: 2
					}
				};
				$('#tb_review').bootstrapTable("refresh", opt);
				if (reSerch) {
					$('#tb_review').bootstrapTable("refreshOptions", {
						pageNumber: pagenum
					});
				}
			}
			vm.reset = function () {
				this.serchinfo = null
				this.search(true);
			};
			//*************************尾部*********************************************//
		}
	]);
})();