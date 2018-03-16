(function () {
	var appmodule = angular.module('app');
	appmodule.controller('app.views.hiddenTrouble.LookHiddenTrouble', [
		'$scope', '$timeout', 'abp.services.app.troubles',
		function ($scope, $timeout, troublesService) {
			var vm = this;
			vm.myclass = 'hasPermission';

			vm.risk = null;
			var riskid = getURLParam('Id');
			var riskStatus = getURLParam('RiskStatus');
			var item = riskid == null ? "add" : {
				Id: riskid,
				HiddenTroubleStatus: parseInt(riskStatus)
			};
			var backpage = getURLParam('backpage');
			var pageindex = getURLParam('pageindex');
			var type = getURLParam('type');

			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

			}
			// window.location.href = "/default.html#!/addOrLookHiddenTrouble";
			vm.islook = item != "add";
			var addid = null;
			var current = (new Date()).getTime();
			var fivedaylater = current + 5 * 24 * 3600 * 1000;
			vm.risk = {
				HiddenTroubleType: 0,
				RectifyTroubleType: 1,
				HiddenTroubleFindTime: new Date(),
				RectifyEndTime: new Date(fivedaylater)
			};

			function ReloadData() {
				vm.risk = {
					HiddenTroubleType: 0,
					RectifyTroubleType: 1,
					HiddenTroubleFindTime: new Date(),
					RectifyEndTime: new Date(fivedaylater),
					ReportUserId: abp.session.userId,
					AreaID: null,
					ChargeUserName: null,
					HiddenTroubleContent: null,
					RectifyClaim: null
				};
				clearInputFile($('#txt_file')[0]);
			}

			function clearInputFile(f) {
				if (f.value) {
					try {
						f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
					} catch (err) { }
					if (f.value) { //for IE5 ~ IE10
						var form = document.createElement('form'),
							ref = f.nextSibling;
						form.appendChild(f);
						form.reset();
						ref.parentNode.insertBefore(f, ref);
					}
				}
			}
			vm.troubleType = [{
				id: 0,
				type: "一般隐患"
			}, {
				id: 1,
				type: "重大隐患"
			}];
			vm.rectifyType = [{
				id: 0,
				type: "立即整改"
			}, {
				id: 1,
				type: "限期整改"
			}, {
				id: 2,
				type: "停工整改"
			}];

			troublesService.getAllUses().then(function (result) {
				vm.users = result.data.items;
			});
			troublesService.getAllKeyAreas().then(function (result) {
				vm.areas = result.data.items;
			});
			vm.risk.ReportUserId = abp.session.userId;
			vm.areaChanged = function (id) {
				var selectuserid = null;
				for (var i = 0; i < vm.areas.length; i++) {
					if (vm.areas[i].id == vm.risk.AreaID) {
						selectuserid = vm.areas[i].userId;
					}
				}
				for (var i = 0; i < vm.users.length; i++) {
					if (vm.users[i].id == selectuserid) {
						vm.risk.ChargeUserName = vm.users[i].userName;
						return;
					}
				}
				vm.risk.ChargeUserName = "";
				vm.risk.AreaID = null;
				abp.message.error("此区域尚没有负责人，请在职责指派内指定了责任人后，再进行上报！");
			}
			vm.abpPath = abp.appPath;
			vm.zgvisible = 0;
			vm.fcvisible = 0;
			vm.shvisible = 1;
			vm.showpeople = 0;
			vm.sbfjs = [];
			vm.zgfjs = [];
			vm.fcfjs = [];
			var PassStr = "通过";
			if (vm.islook) {
				switch (item.HiddenTroubleStatus) {
					case 0: //已闭环
						vm.zgvisible = 1;
						vm.fcvisible = 1;
						vm.showpeople = 1;
						// GetFiles(2);
						break;
					case 1: //待整改
						vm.showpeople = 1;
						//GetFiles(0);
						break;
					case 2: //未提交
						//GetFiles(2);
						break;
					case 3: //待复查
						vm.zgvisible = 1;
						vm.showpeople = 1;
						//GetFiles(1);
						break;
					case 4: //复查未通过
						vm.zgvisible = 1;
						vm.fcvisible = 1;
						vm.showpeople = 1;
						// GetFiles(2);
						break;
					case 5: //已撤销
						vm.zgvisible = 1;
						//GetFiles(2);
						break;
					case 6: //已逾期
						vm.showpeople = 1;
						//GetFiles(0);
						break;
					case 7: //待审核
						vm.shvisible = 0;
						//GetFiles(0);
						break;
					case 8: //已废弃
						PassStr = "不通过";
						//GetFiles(0);
						break;
				}
				troublesService.getOneTrouble({
					Id: item.Id
				}).then(function (result) {
					var data = result.data;
					vm.risk = {
						HiddenTroubleType: data.hiddenTroubleType,
						HiddenTroubleContent: data.hiddenTroubleContent,
						HiddenTroubleFindTime: new Date(data.hiddenTroubleFindTime),
						RectifyEndTime: new Date(data.rectifyEndTime),
						RectifyClaim: data.rectifyClaim,
						AreaID: parseInt(data.areaID),
						ReportUserId: data.reportUserId,
						ChargeUserName: data.chargeUserName,
						RectifyTroubleType: data.rectifyTroubleType,
						RiskFlow: data.riskFlow,
						ReportFileInfo: data.reportFileInfo,
						PassStr: PassStr,
						AuditUserId: data.auditUserId,
						AuditTime: (new Date(data.auditTime)).Format("yyyy-MM-dd"),
						AuditContent: data.auditContent,
						ExecuteUserName: data.executeUserName,
						ReviewUserName: data.reviewUserName,
						AssignTime: (new Date(data.assignTime)).Format("yyyy-MM-dd")
					};
					//AddDownUrl(vm.risk.ReportFileInfo);
					for (var i = 0; i < vm.risk.RiskFlow.length; i++) {
						vm.risk.RiskFlow[i].rec.rectifyTime = (new Date(vm.risk.RiskFlow[i].rec.rectifyTime)).Format("yyyy-MM-dd");
						if (vm.risk.RiskFlow[i].rev != null) {
							vm.risk.RiskFlow[i].rev.reviewTime = (new Date(vm.risk.RiskFlow[i].rev.reviewTime)).Format("yyyy-MM-dd");
						}
					}
					$("#endtime").attr('min', vm.risk.HiddenTroubleFindTime.Format("yyyy-MM-dd"));
				});
			} else {
				$timeout(function () {
					$("#endtime").attr('min', vm.risk.HiddenTroubleFindTime.Format("yyyy-MM-dd"));
				});
			}
			function AddDownUrl(arr) {
				$.each(arr, function () {
					var index = this.url.indexOf('riskFile');
					this.downUrl = this.url.substring(index);
				});
			}
			vm.clickimg = function (url) {
				window.open(url);
			}
			/////---------------------------------------///////
			vm.cancel = function () {
				if (backpage != null)
					window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			};
		}

	]);
})();