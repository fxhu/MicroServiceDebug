(function() {
	angular.module('app').controller('app.views.hiddenTrouble.rectifyTrouble', [
		'$scope', 'abp.services.app.troubles',
		function($scope, troublesService) {
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
			vm.islook = true;
			vm.risk = {
				TroubleId: item.Id
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
			troublesService.getAllUses().then(function(result) {
				vm.users = result.data.items;
			});
			troublesService.getAllKeyAreas().then(function(result) {
				vm.areas = result.data.items;
			});
			troublesService.getOneTrouble({
				Id: item.Id
			}).then(function(result) {
				var data = result.data;
				vm.Trouble = {
					HiddenTroubleType: data.hiddenTroubleType,
					HiddenTroubleContent: data.hiddenTroubleContent,
					HiddenTroubleFindTime: new Date(data.hiddenTroubleFindTime),
					RectifyEndTime: new Date(data.rectifyEndTime), // new Date((new Date(data.rectifyEndTime)).getTime() - 24 * 3600 * 1000),
					RectifyClaim: data.rectifyClaim,
					AreaID: parseInt(data.areaID),
					ReportUserId: data.reportUserId,
					ChargeUserName: data.chargeUserName,
					RectifyTroubleType: data.rectifyTroubleType,
					RiskFlow: data.riskFlow,
					ReportFileInfo: data.reportFileInfo,
					AuditUserId: data.auditUserId,
					AuditTime: new Date(data.auditTime),
					AuditContent: data.auditContent,
					ExecuteUserName: data.executeUserName,
					ReviewUserName:data.reviewUserName,
					AssignTime:(new Date(data.assignTime)).Format("yyyy-MM-dd")
					
				};
				for(var i = 0; i < vm.Trouble.RiskFlow.length; i++) {
					vm.Trouble.RiskFlow[i].rec.rectifyTime = new Date(vm.Trouble.RiskFlow[i].rec.rectifyTime);
					if(vm.Trouble.RiskFlow[i].rev != null) {
						vm.Trouble.RiskFlow[i].rev.reviewTime = new Date(vm.Trouble.RiskFlow[i].rev.reviewTime);
					}
				}
			});
			vm.risk.RectifyUserId = abp.session.userId;
			//function GetFiles(type) {
			//    $.ajax({
			//        type: "get",
			//        url: "/HiddenTrouble/GetAllFiles/?tbid=" + item.Id + "&type=" + type,
			//        success: function (data) {
			//            switch (type) {
			//                case 0:
			//                    vm.sbfjs = data.files[0];
			//                    break;
			//                case 1:
			//                    vm.sbfjs = data.files[0];
			//                    vm.zgfjs = data.files[1];
			//                    break;
			//                case 2:
			//                    vm.sbfjs = data.files[0];
			//                    vm.zgfjs = data.files[1];
			//                    vm.fcfjs = data.files[2];
			//                    break;
			//            }
			//        },
			//        error: function (err) {
			//        }
			//    });
			//}
			vm.abpPath=abp.appPath;
			vm.clickimg = function(url) {
				window.open(url);
			}
			vm.zgvisible = 0;
			vm.fcvisible = 0;
			vm.sbfjs = [];
			vm.zgfjs = [];
			vm.fcfjs = [];
			switch(item.HiddenTroubleStatus) {
				case 1: //待整改
					//GetFiles(0);
					break;
				case 4: //复查未通过
					vm.zgvisible = 1;
					vm.fcvisible = 1;
					//GetFiles(2);
					break;

			}
			vm.save = function() {
				if(vm.risk.RectifyContent == null || $.trim(vm.risk.RectifyContent) == "") {
					return;
				}
				var files = $('#txt_file')[0].files;
				var rectify = vm.risk;
				var myform = new FormData();				
				if(files.length == 0) {
					rectify["filePaths"] = [];
					troublesService.rectifyHiddenTrouble(rectify).then(function() {
						abp.notify.info(app.localize('保存成功'));
						window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
					});
				} else {
					var dealcount=0;
					for(var i = 0; i < files.length; i++) {
						Common.dealImage(files[i], {},files[i].name, function (data,name) {
							if(name==''){
								myform.append('file' + i, data);
							}else{
								myform.append('file' + i, data, name);
							}	
							dealcount++;
							if (dealcount == files.length) {
								$.ajax({
									type: "post",
									url: abp.appPath + "File/UploadRiskFile",
									beforeSend: function(request) {
										request.setRequestHeader("Authorization", tokens);
									},
									data: myform,
									contentType: false,
									processData: false,
									success: function(data) {
										rectify["filePaths"] = data.filepaths;
										troublesService.rectifyHiddenTrouble(rectify).then(function() {
											abp.notify.info(app.localize('保存成功'));
											window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
										});
			
									},
									error: function(err) {
										abp.message.error("保存失败!");
									}
								});
							}
						});
					}					
				}
			};

			vm.cancel = function() {
				//$uibModalInstance.dismiss({});
				window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			};
		}

	]);
})();