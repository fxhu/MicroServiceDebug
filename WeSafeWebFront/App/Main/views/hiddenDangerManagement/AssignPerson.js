(function() {
	angular.module('app').controller('app.views.hiddenTrouble.AssignPerson', [
		'$scope', '$http', 'abp.services.app.troubles',
		function($scope, $http, troublesService) {
			var vm = this;
			vm.myclass = 'hasPermission';
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
			// window.location.href = "/default.html#!/EditHiddenTrouble";

			var current = (new Date()).getTime();
			var fivedaylater = current + 5 * 24 * 3600 * 1000;
			vm.risk = {
				HiddenTroubleType: 0,
				RectifyTroubleType: 1,
				HiddenTroubleFindTime: (new Date()).Format("yyyy-MM-dd"),
				RectifyEndTime: (new Date(fivedaylater)).Format("yyyy-MM-dd")
			};
			vm.tb={};
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

			troublesService.getAllUses().then(function(result) {
				vm.users = result.data.items;
			});

			troublesService.getAllAreaUsers({
				Id: item.Id
			}).then(function(result) {
				vm.cusers = result.data.items;

			});
			troublesService.getAllKeyAreas().then(function(result) {
				vm.areas = result.data.items;
			});
			vm.save = function() {
				if(vm.tb.ExecuteUserId ==null||vm.tb.ExecuteUserId<=0) {
					abp.message.error("请选择整改人！");
					return;
				}
				if(vm.tb.ReviewUserId ==null||vm.tb.ReviewUserId<=0) {
					abp.message.error("请选择复查人！");
					return;
				}
				
				troublesService.assignPerson({
						Id: item.Id,
						ReviewUserId: vm.tb.ReviewUserId,
						ExecuteUserId: vm.tb.ExecuteUserId
						
					})
					.then(function() {
						//$uibModalInstance.close();
						abp.notify.info(app.localize('保存成功'));
						window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
					});

			};
			vm.rectifyTimeLimit = new Date();
			var date, jb, lx;
			troublesService.getOneTrouble({
				Id: item.Id
			}).then(function(result) {
				var data = result.data;
				vm.rectifyTimeLimit = new Date(data.hiddenTroubleFindTime).toLocaleDateString();
				vm.risk = {
					HiddenTroubleType: data.hiddenTroubleType,
					HiddenTroubleContent: data.hiddenTroubleContent,
					HiddenTroubleFindTime: (new Date(data.hiddenTroubleFindTime)).Format("yyyy-MM-dd"),
					RectifyEndTime: (new Date(data.rectifyEndTime)).Format("yyyy-MM-dd"),
					RectifyClaim: data.rectifyClaim,
					AreaID: parseInt(data.areaID),
					ReportUserId: data.reportUserId,
					ChargeUserName: data.chargeUserName,
					RectifyTroubleType: data.rectifyTroubleType,
					ReportFileInfo: data.reportFileInfo,
					AuditUserId: data.auditUserId,
					AuditTime: new Date(data.auditTime),
					AuditContent: data.auditContent,
					ReviewUserId:data.reviewUserId
				};
				$('#dt_end').datepicker({
					autoclose: true,
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
				$('#dt_end').datepicker('setStartDate', vm.risk.HiddenTroubleFindTime);
				$('#dt_end').datepicker('update', vm.risk.RectifyEndTime);
				vm.risk.IsPass = 0;
				vm.tb.ReviewUserId=vm.risk.ReviewUserId;
				//vm.risk.ExecuteUserId = abp.session.userId;
				date = vm.risk.RectifyEndTime;
				jb = vm.risk.HiddenTroubleType;
				lx = vm.risk.RectifyTroubleType;
			});
			vm.rectifyChange = function() {
				if(vm.risk.RectifyTroubleType == 1) {
					$("#recendtime")[0].style.display = "inherit";
				} else {
					$("#recendtime")[0].style.display = "none";
				}
			}
			//////--------------------------------------///////           

			vm.IsCanEdit = false;
			vm.clickPass = function() {
				vm.IsCanEdit = vm.risk.IsPass == 1;
				vm.risk.RectifyEndTime = date;
				vm.risk.HiddenTroubleType = jb;
				vm.risk.RectifyTroubleType = lx;
			}
			vm.abpPath=abp.appPath;
			vm.clickimg = function(url) {
				window.open(url);
			}
			/////---------------------------------------///////
			vm.cancel = function() {
				window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			};
		}

	]);
})();