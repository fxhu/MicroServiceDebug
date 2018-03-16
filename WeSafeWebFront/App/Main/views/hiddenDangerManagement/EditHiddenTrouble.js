(function() {
	angular.module('app').controller('app.views.hiddenTrouble.EditHiddenTrouble', [
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
			var current = (new Date()).getTime();
			var fivedaylater = current + 5 * 24 * 3600 * 1000;
			vm.risk = {
				HiddenTroubleType: 0,
				RectifyTroubleType: 1,
				HiddenTroubleFindTime: (new Date()).Format("yyyy-MM-dd"),
				RectifyEndTime: (new Date(fivedaylater)).Format("yyyy-MM-dd")
			};
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
			vm.risk.ReportUserId = abp.session.userId;
			vm.areaChanged = function(id) {
				var selectuserid = null;
				for(var i = 0; i < vm.areas.length; i++) {
					if(vm.areas[i].id == vm.risk.AreaID) {
						selectuserid = vm.areas[i].userId;
					}
				}
				for(var i = 0; i < vm.users.length; i++) {
					if(vm.users[i].id == selectuserid) {
						vm.risk.ChargeUserName = vm.users[i].userName;
						return;
					}
				}
				vm.risk.ChargeUserName = "";
			}
			vm.save = function() {
				if (vm.risk.HiddenTroubleFindTime==null) {
					abp.message.error("请完善隐患信息!");
					return;
				}
				if (vm.risk.RectifyEndTime==null) {
					abp.message.error("请完善隐患信息!");
					return;
				}
				if(vm.risk.HiddenTroubleFindTime > vm.risk.RectifyEndTime) {
					return;
				}
				if(vm.risk.AreaID == null || vm.risk.HiddenTroubleContent == null||
					$.trim(vm.risk.HiddenTroubleContent) == '') {
					//abp.message.error("请完善隐患信息!");
					return;
				}
				var claim = vm.risk.RectifyClaim;
				if (vm.risk.RectifyClaim == null) claim = '';
				var files = $('#txt_file')[0].files;
				var trouble = {
					Id: item.Id,
					HiddenTroubleType: vm.risk.HiddenTroubleType,
					HiddenTroubleContent: vm.risk.HiddenTroubleContent,
					HiddenTroubleFindTime: new Date(vm.risk.HiddenTroubleFindTime),
					RectifyEndTime: new Date(vm.risk.RectifyEndTime),
					RectifyClaim: vm.risk.RectifyClaim,
					AreaID: vm.risk.AreaID,
					ReportUserId: vm.risk.ReportUserId,
					RectifyTroubleType: vm.risk.RectifyTroubleType
				};
				var myform = new FormData();
				
				if(files.length == 0) {
					trouble["filePaths"] = [];
					troublesService.editHiddenTrouble(trouble).then(function() {
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
										trouble["filePaths"] = data.filepaths;
										troublesService.editHiddenTrouble(trouble).then(function() {
											abp.notify.info(app.localize('保存成功'));
											window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
										});
			
									},
									error: function(err) {
										abp.message.error("保存失败!");
									},
									complete: function() {
			
									}
								});
							}
						});
					}				
				}
			};
			vm.rectifyTimeLimit = new Date();
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
					ReportFileInfo: data.reportFileInfo
				};
				$('#dt_end').datepicker({
					autoclose: true,
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
				$('#dt_end').datepicker('setStartDate', vm.risk.HiddenTroubleFindTime);
				$('#dt_end').datepicker('update', vm.risk.RectifyEndTime);
			});
			vm.rectifyChange = function() {
				if(vm.risk.RectifyTroubleType == 1) {
					$("#recendtime")[0].style.display = "inherit";
				} else {
					$("#recendtime")[0].style.display = "none";
				}
			}
			//////--------------------------------------///////  
			vm.abpPath=abp.appPath;
			vm.clickimg = function(url) {
				window.open(url);
			}
			vm.deletefile = function(url) {
				abp.message.confirm("是否要删除此文件？", function(isconfirm) {
					if(isconfirm) {
						$http({
							method: 'GET',
							url: abp.appPath +"File/DeleteFile?FileName=" + url
						}).then(function(result) {
							var index = 0;
							var fjs = vm.risk.ReportFileInfo;
							for(var i = 0; i < fjs.length; i++) {
								if(fjs[i].url == url) {
									index = i;
									break;
								}
							}
							fjs.splice(index, 1);
							vm.risk.ReportFileInfo = fjs;
						});
					}
				});
			}
			/////---------------------------------------///////
			vm.cancel = function() {
				window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			};
		}

	]);
})();